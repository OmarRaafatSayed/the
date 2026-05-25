"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function VisualShowcase() {
  const displayImages = PlaceHolderImages.filter(img => img.id !== "hero-mashrabiya");

  return (
    <div className="h-full w-full flex flex-col bg-background">
      <div className="px-24 py-16 flex items-end justify-between border-b border-primary/10">
        <div className="space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Artifact Gallery</span>
          <h2 className="text-7xl font-headline text-primary">The Pattern Archive</h2>
        </div>
        <p className="max-w-md text-muted-foreground text-sm font-body leading-relaxed text-right">
          A curate selection of geometric variations, from Mamluk Cairo to contemporary parametric interpretations.
        </p>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden flex items-stretch hide-scrollbar">
        {displayImages.map((img, idx) => (
          <div 
            key={idx} 
            className="group relative min-w-[500px] h-full border-r border-primary/10 overflow-hidden bg-white"
          >
            <Image
              src={img.imageUrl}
              alt={img.description}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              data-ai-hint={img.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 p-12 flex flex-col justify-end">
              <div className="space-y-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-background/20 backdrop-blur-md px-3 py-1 inline-block">Archival Record {idx + 1}</span>
                <p className="text-white text-3xl font-headline leading-snug">
                  {img.description}
                </p>
                <div className="h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-1000 delay-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}