"use client";

import { cn } from "@/lib/utils";

export function PhaseIndicator({ progress }: { progress: number }) {
  const phases = ["Documentation", "Characterization", "Conservation"];
  
  return (
    <div className="fixed top-16 left-0 right-0 z-40 px-8 md:px-16 py-3">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-12 bg-card/80 backdrop-blur-md border border-foreground/5 p-6 rounded-[2rem] shadow-xl">
        
        {/* Progress Labels */}
        <div className="flex gap-12 md:gap-20">
          {phases.map((phase, idx) => {
            const isActive = progress >= (idx * (100 / phases.length));
            
            return (
              <div key={phase} className="flex flex-col gap-2 min-w-[80px]">
                <span className={cn(
                  "text-[8px] font-bold uppercase tracking-[0.3em] transition-all duration-700",
                  isActive ? "text-primary" : "text-foreground/20"
                )}>
                  {phase}
                </span>
                <div className={cn(
                  "h-[2px] w-full transition-all duration-700 rounded-full",
                  isActive ? "bg-primary" : "bg-foreground/5"
                )} />
              </div>
            );
          })}
        </div>

        {/* Global Progress Bar */}
        <div className="flex-1 h-[2px] bg-foreground/5 relative overflow-hidden hidden sm:block rounded-full">
          <div 
            className="absolute left-0 top-0 h-full bg-primary/40 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[8px] font-mono tracking-widest text-foreground/20 hidden md:block">AXIS_NAV</span>
          <div className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}