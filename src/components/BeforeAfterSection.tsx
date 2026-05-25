
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface ComparisonSliderProps {
  beforeImg?: string;
  afterImg?: string;
  title: string;
}

export function ComparisonSlider({ beforeImg, afterImg, title }: ComparisonSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(100, Math.max(0, pos)));
  };

  if (!beforeImg || !afterImg) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-headline text-primary text-center italic">{title}</h3>
        <div className="w-full aspect-video bg-muted flex items-center justify-center text-muted-foreground border border-dashed">
          Images for comparison missing
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      <h3 className="text-lg font-headline text-primary text-center italic flex-shrink-0">{title}</h3>
      <div 
        ref={containerRef}
        className="relative w-full flex-1 min-h-[200px] overflow-hidden group select-none cursor-ew-resize border border-primary/10"
        onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
        onMouseDown={handleMove}
        onTouchMove={handleMove}
      >
        <Image 
          src={afterImg} 
          alt="After restoration" 
          fill 
          className="object-contain bg-black/5" 
          draggable={false}
        />
        
        <div 
          className="absolute inset-0 z-10" 
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <Image 
            src={beforeImg} 
            alt="Before restoration" 
            fill 
            className="object-contain bg-black/5"
            draggable={false}
          />
        </div>

        <div 
          className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-primary/20">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-0.5 bg-primary rounded-full" />
              <div className="w-0.5 h-0.5 bg-primary rounded-full" />
              <div className="w-0.5 h-0.5 bg-primary rounded-full" />
            </div>
          </div>
        </div>

        {/* labels removed */}
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const m1b = PlaceHolderImages.find(i => i.id === "mashrabiya-1-before")?.imageUrl;
  const m1a = PlaceHolderImages.find(i => i.id === "mashrabiya-1-after")?.imageUrl;
  const m2b = PlaceHolderImages.find(i => i.id === "mashrabiya-2-before")?.imageUrl;
  const m2a = PlaceHolderImages.find(i => i.id === "mashrabiya-2-after")?.imageUrl;

  return (
    <div className="h-full w-full flex flex-col justify-center px-12 py-12 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Visual Metamorphosis</span>
        <h2 className="text-5xl font-headline text-primary">Restoration Comparison</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto w-full">
        <ComparisonSlider 
          beforeImg={m1b} 
          afterImg={m1a} 
          title="Mashrabiya Unit Alpha" 
        />
        <ComparisonSlider 
          beforeImg={m2b} 
          afterImg={m2a} 
          title="Mashrabiya Unit Beta" 
        />
      </div>
    </div>
  );
}
