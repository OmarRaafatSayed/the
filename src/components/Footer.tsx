"use client";

import { Landmark, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-20 px-24 border-t border-white/10 relative z-10">
      <div className="max-w-[1600px] mx-auto grid md:grid-cols-4 gap-16 items-start">
        <div className="space-y-8 col-span-1">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-accent text-white">
              <Landmark size={24} />
            </div>
            <h3 className="font-headline text-3xl font-bold">Virtual Museum</h3>
          </div>
          <p className="text-white/50 text-sm max-w-xs leading-relaxed font-body">
            A digital sanctuary for architectural wisdom. Preserving the legacy of light, geometry, and environmental harmony for future generations.
          </p>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Eras</h4>
          <ul className="space-y-4 text-sm font-medium text-white/70">
            <li className="hover:text-white transition-colors cursor-pointer opacity-40">Ancient Egypt</li>
            <li className="hover:text-white transition-colors cursor-pointer opacity-40">Greco-Roman</li>
            <li className="hover:text-white transition-colors cursor-pointer">Islamic Era</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Connect</h4>
          <ul className="space-y-4 text-sm font-medium text-white/70">
            <li className="hover:text-white transition-colors cursor-pointer">Archive Access</li>
            <li className="hover:text-white transition-colors cursor-pointer">Academic Research</li>
            <li className="hover:text-white transition-colors cursor-pointer">Museum Support</li>
          </ul>
        </div>

        <div className="text-right space-y-8">
          <button 
            onClick={() => window.scrollTo({left: 0, behavior: 'smooth'})}
            className="p-4 border border-white/20 hover:border-accent group transition-colors"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-2 transition-transform" />
          </button>
          <div className="space-y-2">
            <p className="text-white/40 text-[10px] leading-relaxed uppercase tracking-widest font-bold">
              © {new Date().getFullYear()} Mashrabiya Heritage <br />
              All Rights Reserved
            </p>
            <div className="h-[1px] w-12 bg-accent ml-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
}