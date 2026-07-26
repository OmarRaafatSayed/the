import { MuseumEnvironment } from "@/components/MuseumEnvironment";

export default function EnvironmentDemoPage() {
  return (
    <main className="min-h-screen bg-black p-6 flex flex-col gap-8">
      <div className="max-w-5xl mx-auto w-full">
        <h1 className="text-white font-bold text-2xl mb-1">
          Museum Environment — IBL Demo
        </h1>
        <p className="text-white/40 text-sm mb-6 font-mono">
          whale_skeleton_4k.exr · PMREMGenerator · ACESFilmic tone mapping
        </p>

        {/* Scene with default metallic sphere (no model) */}
        <MuseumEnvironment
          environmentPath="/models/whale_skeleton_4k.exr"
          height="70vh"
          autoRotate
          showHint
        />

        <p className="text-white/25 text-xs font-mono mt-4 text-center">
          Pass <code className="text-[#C9A84C]">modelPath="/models/mashrabiya.glb"</code> to load an artifact
        </p>
      </div>
    </main>
  );
}
