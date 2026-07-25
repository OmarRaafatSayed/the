"use client";

import { useEffect, useRef, useState } from "react";

interface Comparison3DViewerProps {
  beforeModelPath: string;
  afterModelPath: string;
  title?: string;
  height?: string;
}

/**
 * 3D Before/After Comparison Viewer
 * Displays two 3D models side-by-side for conservation comparison
 * 
 * Usage:
 * <Comparison3DViewer
 *   beforeModelPath="/models/mashrabiya-before.glb"
 *   afterModelPath="/models/mashrabiya-after.glb"
 *   title="Conservation Process"
 * />
 */
export function Comparison3DViewer({
  beforeModelPath,
  afterModelPath,
  title,
  height = "600px",
}: Comparison3DViewerProps) {
  const beforeContainerRef = useRef<HTMLDivElement>(null);
  const afterContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const renderersRef = useRef<any>({ before: null, after: null });

  useEffect(() => {
    if (!beforeContainerRef.current || !afterContainerRef.current) return;

    const loadThree = async () => {
      try {
        const THREE = await import("three");
        const GLTFLoader = (await import("three/examples/jsm/loaders/GLTFLoader.js" as any)).GLTFLoader;

        const loader = new GLTFLoader();
        let loadedCount = 0;

        const createModelViewer = (
          container: HTMLDivElement,
          modelPath: string,
          isAfter: boolean
        ) => {
          return new Promise<void>((resolve, reject) => {
            // Scene setup
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x1a1510);

            // Camera
            const camera = new THREE.PerspectiveCamera(
              75,
              container.clientWidth / container.clientHeight,
              0.1,
              1000
            );
            camera.position.z = 3;

            // Renderer
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            container.appendChild(renderer.domElement);

            if (isAfter) {
              renderersRef.current.after = { renderer, scene, camera };
            } else {
              renderersRef.current.before = { renderer, scene, camera };
            }

            // Lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(5, 5, 5);
            directionalLight.castShadow = true;
            scene.add(directionalLight);

            // Load model
            const loader = new (GLTFLoader as any)();
            loader.load(
              modelPath,
              (gltf: any) => {
                const model = gltf.scene;
                model.scale.set(2, 2, 2);
                scene.add(model);

                // Center and fit model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);

                // Adjust camera to fit model
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
                cameraZ *= 1.5;
                camera.position.z = cameraZ;

                // Store model for animation
                const renderData =
                  isAfter ? renderersRef.current.after : renderersRef.current.before;
                renderData.model = model;
                renderData.rotation = { x: 0, y: 0 };

                // Shared animation loop
                const animate = () => {
                  requestAnimationFrame(animate);

                  if (model) {
                    model.rotation.y += 0.005;
                    model.rotation.x = renderData.rotation.x;
                    model.rotation.y += renderData.rotation.y;
                  }

                  renderer.render(scene, camera);
                };
                animate();

                loadedCount++;
                if (loadedCount === 2) {
                  setIsLoading(false);
                }

                resolve();
              },
              undefined,
              (err: any) => {
                console.error("Error loading model:", err);
                reject(new Error("Failed to load 3D model"));
              }
            );

            // Mouse controls
            let isMouseDown = false;
            let mouseX = 0;
            let mouseY = 0;

            renderer.domElement.addEventListener("mousedown", (e) => {
              isMouseDown = true;
              mouseX = e.clientX;
              mouseY = e.clientY;
            });

            renderer.domElement.addEventListener("mousemove", (e) => {
              if (isMouseDown && renderersRef.current.before?.model) {
                const deltaX = (e.clientX - mouseX) * 0.01;
                const deltaY = (e.clientY - mouseY) * 0.01;

                // Synchronize rotation for both models
                renderersRef.current.before.rotation.y += deltaX;
                renderersRef.current.before.rotation.x += deltaY;
                renderersRef.current.after.rotation.y += deltaX;
                renderersRef.current.after.rotation.x += deltaY;

                mouseX = e.clientX;
                mouseY = e.clientY;
              }
            });

            renderer.domElement.addEventListener("mouseup", () => {
              isMouseDown = false;
            });

            // Wheel zoom
            renderer.domElement.addEventListener("wheel", (e) => {
              e.preventDefault();
              const zoomSpeed = 0.5;
              if (e.deltaY < 0) {
                camera.position.z -= zoomSpeed;
              } else {
                camera.position.z += zoomSpeed;
              }
            });

            // Handle resize
            const handleResize = () => {
              const width = container.clientWidth;
              const height = container.clientHeight;
              camera.aspect = width / height;
              camera.updateProjectionMatrix();
              renderer.setSize(width, height);
            };

            window.addEventListener("resize", handleResize);
          });
        };

        try {
          await Promise.all([
            createModelViewer(beforeContainerRef.current!, beforeModelPath, false),
            createModelViewer(afterContainerRef.current!, afterModelPath, true),
          ]);
        } catch (err) {
          setError("Failed to load one or both 3D models");
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to initialize 3D viewer:", err);
        setError("3D viewer not available");
        setIsLoading(false);
      }
    };

    loadThree();

    return () => {
      // Cleanup
      if (renderersRef.current.before?.renderer) {
        renderersRef.current.before.renderer.dispose();
      }
      if (renderersRef.current.after?.renderer) {
        renderersRef.current.after.renderer.dispose();
      }
    };
  }, [beforeModelPath, afterModelPath]);

  return (
    <div className="w-full relative" style={{ height }}>
      {title && (
        <div className="absolute top-4 left-4 z-10">
          <h3 className="text-white font-headline font-bold text-lg opacity-80">
            {title}
          </h3>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="text-center">
            <div className="mb-3 inline-block">
              <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-white text-sm">Loading 3D Models...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="text-center">
            <p className="text-red-400 text-sm">{error}</p>
            <p className="text-white/50 text-xs mt-2">Please ensure Three.js is installed</p>
          </div>
        </div>
      )}

      <div className="w-full h-full flex gap-4 p-4">
        {/* Before */}
        <div className="flex-1 relative rounded-lg overflow-hidden border border-[#C9A84C]/20">
          <div
            ref={beforeContainerRef}
            className="w-full h-full"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded">
            <p className="text-[#C9A84C] text-xs font-semibold">BEFORE</p>
          </div>
        </div>

        {/* After */}
        <div className="flex-1 relative rounded-lg overflow-hidden border border-[#C9A84C]/20">
          <div
            ref={afterContainerRef}
            className="w-full h-full"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded">
            <p className="text-[#C9A84C] text-xs font-semibold">AFTER</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-white/40">
        <p>Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
}
