
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function MashrabiyaHero() {
  const heroImg = PlaceHolderImages.find(img => img.id === "project-hero");

  return (
    <div className="relative h-full w-full flex items-center p-24">
      <div className="grid lg:grid-cols-2 gap-20 w-full items-center">
        <div className="space-y-12 animate-in fade-in slide-in-from-left-10 duration-1000">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-accent">Islamic Era Case Study</span>
            <h1 className="text-8xl font-headline text-primary leading-none">
              Restoration <br />
              <span className="italic">Project 01</span>
            </h1>
          </div>
          
          <div className="space-y-6 max-w-xl">
            <h3 className="text-2xl font-headline text-primary/80">Revitalizing 12th Century Lattice Traditions</h3>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              This restoration initiative focuses on two historical Mashrabiya units salvaged from the Al-Fustat region. Our team employed traditional joinery techniques combined with modern preservative treatments to restore structural integrity without compromising original craftsmanship.
            </p>
          </div>

          <div className="flex gap-12 border-t border-primary/10 pt-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Location</p>
              <p className="text-sm font-bold text-primary">Historic Cairo, Egypt</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Period</p>
              <p className="text-sm font-bold text-primary">Late Mamluk Style</p>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/5] lg:aspect-auto h-full min-h-[600px] group overflow-hidden">
          <div className="absolute inset-0 bg-accent/10 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0" />
          {heroImg?.imageUrl ? (
            <Image
              src={heroImg.imageUrl}
              alt={heroImg.description || "Restoration site"}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              data-ai-hint={heroImg.imageHint || "historic wood restoration"}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
              Image not found
            </div>
          )}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] z-20 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
