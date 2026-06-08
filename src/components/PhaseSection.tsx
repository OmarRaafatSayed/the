"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image?: string;
  images?: string[];
  imageHint?: string;
  isList?: boolean;
  list?: string[];
}

interface PhaseSectionProps {
  phase: string;
  slides: SlideData[];
}

export function PhaseSection({ phase, slides }: PhaseSectionProps) {
  return (
    <>
      {slides.map((slide) => (
        <section key={slide.id} className="museum-slide flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 min-h-screen px-4 sm:px-6">
          <div className="w-full max-w-[1400px] grid lg:grid-cols-[1.1fr_1fr] items-center gap-6 sm:gap-8 md:gap-12 lg:gap-20">
            
            <div className="relative w-full order-2 lg:order-1" style={{ minHeight: "200px" }}>
              {slide.images && slide.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 h-full" style={{ minHeight: "200px" }}>
                  {slide.images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="relative h-full bg-black/5 overflow-hidden border border-foreground/5 shadow-2xl rounded-xl sm:rounded-[1.5rem] transition-all duration-700"
                      style={{ minHeight: "100px" }}
                    >
                      <Image
                        src={img}
                        alt={`${slide.title} ${idx + 1}`}
                        fill
                        className="object-contain transition-all duration-1000 scale-100 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
                    </div>
                  ))}
                </div>
              ) : slide.image ? (
                <div className="relative w-full rounded-2xl sm:rounded-[3rem] overflow-hidden border border-foreground/5 shadow-2xl bg-black/5" style={{ minHeight: "200px", aspectRatio: "16/10" }}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-contain transition-all duration-1000 scale-100 group-hover:scale-105"
                    data-ai-hint={slide.imageHint}
                  />
                  <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-foreground/5 rounded-2xl sm:rounded-[3rem]" style={{ minHeight: "200px" }}>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] sm:tracking-[0.5em] opacity-10">Archive_Record_{slide.id}</span>
                </div>
              )}
            </div>

            {/* Textual Content */}
            <div className="space-y-4 sm:space-y-6 md:space-y-10 order-1 lg:order-2">
              <div className="space-y-2 sm:space-y-3">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-primary/60">{slide.subtitle}</span>
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-headline font-bold leading-tight text-foreground">{slide.title}</h2>
              </div>

              <div className="h-[2px] w-12 sm:w-16 bg-primary/20 rounded-full" />

              <div className="space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-foreground/70 max-w-lg">
                  {slide.content}
                </p>

                {slide.isList && slide.list && (
                  <ul className="space-y-2 sm:space-y-3 md:space-y-4 border-l-2 border-primary/20 pl-3 sm:pl-4 md:pl-6">
                    {slide.list.map((item, idx) => (
                      <li key={idx} className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em] leading-relaxed text-foreground/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Phase Badge — hidden on mobile */}
          <div className="hidden md:flex absolute top-1/2 right-4 lg:right-6 -translate-y-1/2 items-center gap-4 rotate-90 origin-right pointer-events-none">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.8em] sm:tracking-[1em] text-primary/20 whitespace-nowrap">{phase}</span>
          </div>
        </section>
      ))}
    </>
  );
}
