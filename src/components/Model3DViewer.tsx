"use client";

import { useEffect, useRef, useState } from "react";

interface Model3DViewerProps {
  modelPath: string;
  title?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  height?: string;
}

/**
 * 3D Model Viewer Component
 * Displays GLB/GLTF 3D models with interactive controls
 * Supports rotation, zoom, and pan gestures
 * 
 * Usage:
 * <Model3DViewer 
 *   modelPath="/path/to/model.glb" 
 *   title="Mashrabiya Unit"
 *   autoRotate={true}
 *   interactive={true}
 * />
 */
export function Model3DViewer({
  modelPath,
  title,
  autoRotate = true,
  interactive = true,
  height = "500px",
}: Model3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Lazy load Three.js
    const loadThree = async () => {
      try {
        const THREE = await import("three");
        const GLTFLoader = (await import("three/examples/jsm/loaders/GLTFLoader.js" as any)).GLTFLoader;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf5f5f0); // خلفية فاتحة
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(
          75,
          containerRef.current!.clientWidth / containerRef.current!.clientHeight,
          0.1,
          1000
        );
        camera.position.z = 3;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        containerRef.current!.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // إضاءة محيطة أقوى
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // إضاءة موجهة أقوى
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // إضاءة إضافية من الجانب الآخر
        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight2.position.set(-5, 3, -5);
        scene.add(directionalLight2);

        // Load model
        const loader = new (GLTFLoader as any)();
        loader.load(
          modelPath,
          (gltf: any) => {
            const model = gltf.scene;
            model.scale.set(2, 2, 2);
            scene.add(model);
            modelRef.current = model;

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

            setIsLoading(false);
          },
          undefined,
          (err: any) => {
            console.error("Error loading model:", err);
            setError("Failed to load 3D model");
            setIsLoading(false);
          }
        );

        // Animation loop
        let animationId: number;
        let rotation = { x: 0, y: 0 };

        const animate = () => {
          animationId = requestAnimationFrame(animate);

          if (modelRef.current) {
            if (autoRotate) {
              modelRef.current.rotation.y += 0.005;
            }
            modelRef.current.rotation.x = rotation.x;
            modelRef.current.rotation.y = rotation.y;
          }

          renderer.render(scene, camera);
        };
        animate();

        // Mouse controls
        if (interactive) {
          let isMouseDown = false;
          let mouseX = 0;
          let mouseY = 0;

          renderer.domElement.addEventListener("mousedown", (e) => {
            isMouseDown = true;
            mouseX = e.clientX;
            mouseY = e.clientY;
          });

          renderer.domElement.addEventListener("mousemove", (e) => {
            if (isMouseDown && modelRef.current) {
              const deltaX = (e.clientX - mouseX) * 0.01;
              const deltaY = (e.clientY - mouseY) * 0.01;

              rotation.y += deltaX;
              rotation.x += deltaY;

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
        }

        // Handle resize
        const handleResize = () => {
          if (containerRef.current && rendererRef.current) {
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
          }
        };

        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
          window.removeEventListener("resize", handleResize);
          cancelAnimationFrame(animationId);
          renderer.dispose();
          containerRef.current?.removeChild(renderer.domElement);
        };
      } catch (err) {
        console.error("Failed to initialize 3D viewer:", err);
        setError("3D viewer not available");
        setIsLoading(false);
      }
    };

    loadThree();
  }, [modelPath, autoRotate, interactive]);

  return (
    <div className="w-full relative" style={{ height }}>
      {title && (
        <div className="absolute top-4 left-4 z-10">
          <h3 className="text-white font-headline font-bold text-sm opacity-80">
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
            <p className="text-white text-sm">Loading 3D Model...</p>
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

      <div ref={containerRef} className="w-full h-full" />

      {interactive && (
        <div className="absolute bottom-4 right-4 text-xs text-white/40 pointer-events-none">
          <p>Drag to rotate • Scroll to zoom</p>
        </div>
      )}
    </div>
  );
}
