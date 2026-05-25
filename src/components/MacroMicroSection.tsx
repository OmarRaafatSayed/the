
"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";

interface MacroMicroSectionProps {
  macroImg: string;
  microImg: string;
  title: string;
  subtitle: string;
  macroLabel: string;
  microLabel: string;
}

export function MacroMicroSection({
  macroImg,
  microImg,
  title,
  subtitle,
  macroLabel,
  microLabel
}: MacroMicroSectionProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Constrain position within bounds
    setPosition({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  return (
    <section className="museum-slide flex flex-col items-center justify-center p-4 md:p-12 bg-background min-h-screen">
      <div className="w-full max-w-[1600px] space-y-12 relative px-8 md:px-16">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary/60">{subtitle}</span>
          <h2 className="text-5xl font-headline font-bold text-foreground italic">{title}</h2>
        </div>

        {/* Comparison Layout */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-center relative h-[70vh]">
          
          {/* Left Panel: Interactive Macro View */}
          <div className="relative h-full group animate-in fade-in slide-in-from-left-12 duration-1000">
            <div className="absolute -top-10 left-0 text-[10px] font-mono tracking-widest text-foreground/40 uppercase font-bold">
              {macroLabel}
            </div>
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              className="relative w-full h-full overflow-hidden rounded-[2rem] border border-foreground/5 shadow-2xl bg-black/5 cursor-crosshair"
            >
              <Image 
                src={macroImg} 
                alt="Macro View" 
                fill 
                className="object-contain transition-all duration-700"
                quality={100}
                sizes="(max-width: 1600px) 50vw, 800px"
                priority
                draggable={false}
              />
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              
              {/* Interactive Lens / Highlight Frame */}
              <div 
                className="absolute w-40 h-40 border-2 border-primary shadow-[0_0_30px_rgba(211,84,0,0.5)] z-20 pointer-events-none transition-transform duration-75 ease-out"
                style={{ 
                  left: `${position.x}%`, 
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary" />
              </div>
            </div>
            <p className="mt-4 text-[10px] font-mono tracking-widest text-foreground/50 uppercase text-center font-bold">Inspect_Protocol: Hover_to_analyze_structural_decay</p>
          </div>

          {/* Right Panel: Micro View (Zooms based on mouse) */}
          <div className="relative h-full animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
            <div className="absolute -top-10 right-0 text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
              {microLabel}
            </div>
            <div className="relative w-full h-full overflow-hidden rounded-[2rem] border-2 border-primary/20 shadow-2xl bg-black/5">
              {/* High-quality zoom using Next.js Image + CSS transform */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ borderRadius: "inherit" }}
              >
                <div
                  className="absolute w-full h-full transition-all duration-150 ease-out"
                  style={{
                    transform: `scale(4) translate(${-(position.x - 50) * 0.5}%, ${-(position.y - 50) * 0.5}%)`,
                    transformOrigin: `${position.x}% ${position.y}%`,
                    imageRendering: "auto",
                    willChange: "transform",
                  }}
                >
                  <Image
                    src={microImg}
                    alt="Micro View"
                    fill
                    className="object-cover"
                    quality={100}
                    sizes="(max-width: 1600px) 50vw, 800px"
                    draggable={false}
                    priority
                  />
                </div>
              </div>
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.2)] pointer-events-none rounded-[2rem]" />

              {/* Scale Indicator */}
              <div className="absolute bottom-8 right-8 flex flex-col items-end gap-2 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div className="h-[2px] w-16 bg-primary" />
                <span className="text-[9px] font-mono tracking-tighter text-white font-bold">500μm | MAG_400X_DYNAMIC</span>
              </div>
            </div>
            <p className="mt-4 text-[10px] font-mono tracking-widest text-primary uppercase text-center font-bold">Verified_Zoom: Forensic_characterization_active</p>
          </div>
        </div>
      </div>
        {/* Background Decorative Element */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-foreground/5 rounded-full opacity-20 pointer-events-none scale-150" />
    </section>
  );
}
