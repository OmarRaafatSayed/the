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
        <section key={slide.id} className="museum-slide flex flex-col items-center justify-center">
          <div className="w-full max-w-[1400px] grid lg:grid-cols-[1.1fr_1fr] items-center px-8 md:px-16 gap-12 lg:gap-20">
            
            <div className="relative aspect-[16/10] w-full group">
              {slide.images && slide.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 h-full">
                  {slide.images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="relative h-full bg-black/5 overflow-hidden border border-foreground/5 shadow-2xl rounded-[1.5rem] transition-all duration-700"
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
                <div className="relative h-full w-full bg-black/5 overflow-hidden border border-foreground/5 shadow-2xl rounded-[3rem]">
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
                <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-foreground/5 rounded-[3rem]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-10">Archive_Record_{slide.id}</span>
                </div>
              )}
            </div>

            {/* Textual Content */}
            <div className="space-y-10">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">{slide.subtitle}</span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight text-foreground">{slide.title}</h2>
              </div>

              <div className="h-[2px] w-16 bg-primary/20 rounded-full" />

              <div className="space-y-6">
                <p className="text-base md:text-lg font-light leading-relaxed text-foreground/70 text-justify-academic max-w-lg">
                  {slide.content}
                </p>

                {slide.isList && slide.list && (
                  <ul className="space-y-4 border-l-2 border-primary/20 pl-6">
                    {slide.list.map((item, idx) => (
                      <li key={idx} className="text-[12px] font-bold uppercase tracking-[0.1em] leading-relaxed text-foreground/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Phase Badge */}
          <div className="absolute top-1/2 right-6 -translate-y-1/2 flex items-center gap-4 rotate-90 origin-right pointer-events-none">
            <span className="text-[9px] font-bold uppercase tracking-[1em] text-primary/20 whitespace-nowrap">{phase}</span>
          </div>
        </section>
      ))}
    </>
  );
}
