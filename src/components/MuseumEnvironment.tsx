"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface MuseumEnvironmentProps {
  /** Path to the EXR environment map (served from /public) */
  environmentPath?: string;
  /** Optional GLB model to place at the center of the scene */
  modelPath?: string;
  /** Height of the canvas */
  height?: string;
  /** Show orbit controls hint */
  showHint?: boolean;
  /** Auto-rotate the artifact */
  autoRotate?: boolean;
}

/**
 * MuseumEnvironment
 *
 * A Three.js scene that loads a high-dynamic-range EXR file as both
 * the scene background (360 panorama) and the IBL environment map
 * (reflections on PBR materials).
 *
 * Pipeline:
 *  EXRLoader  →  PMREMGenerator  →  scene.environment + scene.background
 *
 * Features:
 *  - ACESFilmic tone mapping for realistic HDR output
 *  - OrbitControls (mouse drag / pinch / wheel)
 *  - Optional GLB artifact at scene centre via loadArtifact()
 *  - Fully responsive canvas
 *  - Lazy-loaded Three.js (no SSR issues in Next.js)
 */
export function MuseumEnvironment({
  environmentPath = "/models/whale_skeleton_4k.exr",
  modelPath,
  height = "600px",
  showHint = true,
  autoRotate = true,
}: MuseumEnvironmentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  // ─────────────────────────────────────────────────────────────────────────
  // loadArtifact – placeholder for dropping any GLB into the scene
  // ─────────────────────────────────────────────────────────────────────────
  const loadArtifact = useCallback(
    async (scene: any, THREE: any, path: string) => {
      const { GLTFLoader } = await import(
        // @ts-ignore – three/examples types vary across versions
        "three/examples/jsm/loaders/GLTFLoader.js"
      );

      return new Promise<void>((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(
          path,
          (gltf: any) => {
            const model = gltf.scene;

            // Center the bounding box at origin
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            // Scale so the longest axis ≈ 2 units
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            model.scale.setScalar(2 / maxDim);

            scene.add(model);
            resolve();
          },
          undefined,
          (err: any) => {
            console.error("[MuseumEnvironment] artifact load failed:", err);
            reject(err);
          }
        );
      });
    },
    []
  );

  // ─────────────────────────────────────────────────────────────────────────
  // Main Three.js initialisation (runs once, client-side only)
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    let animationId: number;
    let renderer: any;
    let controls: any;
    let resizeObserver: ResizeObserver;

    const init = async () => {
      try {
        // ── Dynamic imports (keeps SSR clean) ──────────────────────────────
        const THREE = await import("three");
        const { EXRLoader } = await import(
          // @ts-ignore
          "three/examples/jsm/loaders/EXRLoader.js"
        );
        const { OrbitControls } = await import(
          // @ts-ignore
          "three/examples/jsm/controls/OrbitControls.js"
        );

        const container = containerRef.current!;

        // ── Scene ──────────────────────────────────────────────────────────
        const scene = new THREE.Scene();

        // ── Camera ─────────────────────────────────────────────────────────
        const camera = new THREE.PerspectiveCamera(
          60,
          container.clientWidth / container.clientHeight,
          0.01,
          1000
        );
        camera.position.set(0, 0, 4);

        // ── Renderer ───────────────────────────────────────────────────────
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // HDR tone mapping – prevents washed-out / blown-out look
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        // @ts-ignore – sRGBEncoding exists in three ≥ r152 as OutputColorSpace
        renderer.outputColorSpace = THREE.SRGBColorSpace ?? "srgb";

        container.appendChild(renderer.domElement);

        // ── PMREMGenerator ─────────────────────────────────────────────────
        // Converts the equirectangular EXR to a cubemap optimised for PBR
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();

        // ── Load EXR environment ───────────────────────────────────────────
        await new Promise<void>((resolve, reject) => {
          const exrLoader = new EXRLoader();
          exrLoader.load(
            environmentPath,
            (texture: any) => {
              // Process into a pre-filtered env map
              const envMap = pmremGenerator.fromEquirectangular(texture).texture;

              // 360 background visible to the camera
              scene.background = envMap;
              // IBL reflections on every PBR material in the scene
              scene.environment = envMap;

              texture.dispose();
              pmremGenerator.dispose();
              resolve();
            },
            undefined,
            (err: any) => {
              console.error("[MuseumEnvironment] EXR load failed:", err);
              reject(err);
            }
          );
        });

        // ── Supplemental lighting ──────────────────────────────────────────
        // The EXR handles most of the IBL; these add crisp shadows / fill
        const ambient = new THREE.AmbientLight(0xffeedd, 0.3);
        scene.add(ambient);

        const sun = new THREE.DirectionalLight(0xfff8e7, 1.2);
        sun.position.set(5, 8, 3);
        sun.castShadow = true;
        sun.shadow.mapSize.set(1024, 1024);
        scene.add(sun);

        const fill = new THREE.DirectionalLight(0xc8d8ff, 0.4);
        fill.position.set(-4, 2, -4);
        scene.add(fill);

        // ── Optional artifact GLB ──────────────────────────────────────────
        if (modelPath) {
          try {
            await loadArtifact(scene, THREE, modelPath);
          } catch {
            // Non-fatal – scene still shows the environment
            console.warn("[MuseumEnvironment] artifact skipped due to load error");
          }
        } else {
          // Default placeholder: a metallic sphere so you can see IBL reflections
          const geo = new THREE.SphereGeometry(0.6, 64, 64);
          const mat = new THREE.MeshStandardMaterial({
            color: 0xc9a84c,
            metalness: 0.9,
            roughness: 0.15,
          });
          scene.add(new THREE.Mesh(geo, mat));
        }

        // ── OrbitControls ──────────────────────────────────────────────────
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 1;
        controls.maxDistance = 20;
        controls.autoRotate = autoRotate;
        controls.autoRotateSpeed = 0.4;

        setStatus("ready");

        // ── Animation loop ─────────────────────────────────────────────────
        const tick = () => {
          animationId = requestAnimationFrame(tick);
          controls.update();
          renderer.render(scene, camera);
        };
        tick();

        // ── Responsive resize ──────────────────────────────────────────────
        resizeObserver = new ResizeObserver(() => {
          if (!container || !renderer) return;
          const w = container.clientWidth;
          const h = container.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        });
        resizeObserver.observe(container);
      } catch (err: any) {
        console.error("[MuseumEnvironment] init error:", err);
        setErrorMsg(err?.message ?? "Unknown error");
        setStatus("error");
      }
    };

    init();

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationId);
      controls?.dispose();
      renderer?.dispose();
      resizeObserver?.disconnect();
      if (containerRef.current && renderer?.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [environmentPath, modelPath, autoRotate, loadArtifact]);

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ height }}>
      {/* Three.js canvas target */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Loading overlay */}
      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
          <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white/70 text-sm font-mono tracking-widest uppercase">
            Loading Environment…
          </p>
          <p className="text-white/30 text-xs mt-1 font-mono">
            Processing HDR lighting
          </p>
        </div>
      )}

      {/* Error overlay */}
      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 z-20 px-6 text-center">
          <p className="text-red-400 text-sm font-mono mb-2">
            ⚠ Environment failed to load
          </p>
          <p className="text-white/40 text-xs font-mono max-w-sm">{errorMsg}</p>
          <p className="text-white/25 text-xs mt-3 font-mono">
            Make sure <code className="text-[#C9A84C]">whale_skeleton_4k.exr</code> is in{" "}
            <code className="text-[#C9A84C]">/public/models/</code>
          </p>
        </div>
      )}

      {/* Controls hint */}
      {status === "ready" && showHint && (
        <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
          <p className="text-white/30 text-xs font-mono tracking-wider">
            Drag · Scroll · Pinch
          </p>
        </div>
      )}

      {/* Top label */}
      {status === "ready" && (
        <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
          <p className="text-white/50 text-xs font-mono tracking-widest uppercase">
            IBL · Whale Skeleton 4K
          </p>
        </div>
      )}
    </div>
  );
}
