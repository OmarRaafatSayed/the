"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Wind, Sun, EyeOff, Droplets, Landmark, Ruler } from "lucide-react";

export function ContentSection() {
  const historyImg = PlaceHolderImages.find((img) => img.id === "urban-context");
  const techImg = PlaceHolderImages.find((img) => img.id === "thermal-regulation");

  return (
    <>
      {/* Slide 1: Etymology */}
      <section className="museum-slide bg-background">
        <div className="absolute inset-0 pattern-overlay opacity-5" />
        <div className="h-full w-full grid lg:grid-cols-2 gap-0">
          <div className="flex items-center justify-center p-24">
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="space-y-4">
                <Badge>Roots & Origins</Badge>
                <h2 className="text-7xl font-headline text-primary">The Art of 'Shrab'</h2>
                <div className="h-1.5 w-32 bg-accent" />
              </div>
              
              <div className="space-y-6 text-xl text-muted-foreground font-body leading-relaxed max-w-xl">
                <p>
                  Rooted in the Arabic "shrab" (to drink), it was originally a vessel for cooling porous water jars. It evolved from a humble shelf into a <span className="text-primary font-bold">sophisticated architectural machine</span> for desert living.
                </p>
                <p>
                  A masterpiece of Mamluk and Ottoman urbanism, these lattice windows redefined the relationship between the private sanctum and the public street.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="space-y-2">
                    <Landmark className="text-accent w-6 h-6" />
                    <h4 className="font-bold text-sm uppercase tracking-wider text-primary">Epicenter</h4>
                    <p className="text-sm">Mamluk Cairo, Baghdad, and the Hejaz region.</p>
                  </div>
                  <div className="space-y-2">
                    <Ruler className="text-accent w-6 h-6" />
                    <h4 className="font-bold text-sm uppercase tracking-wider text-primary">Craft</h4>
                    <p className="text-sm">Nail-free joinery allowing wood to breathe.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-full bg-primary/5">
            {historyImg && (
              <Image
                src={historyImg.imageUrl}
                alt={historyImg.description}
                fill
                className="object-cover"
                data-ai-hint={historyImg.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* Slide 2: Thermal Wisdom */}
      <section className="museum-slide bg-primary text-white">
        <div className="h-full w-full flex flex-col justify-center px-24 space-y-20">
          <div className="max-w-4xl space-y-6">
            <Badge className="border-white/20 text-white/60">Passive Engineering</Badge>
            <h2 className="text-7xl font-headline">A Living Machine for Living</h2>
            <p className="text-2xl text-primary-foreground/70 max-w-2xl leading-relaxed italic">
              "The Mashrabiya doesn't just block light; it sculpts the environment."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Wind, title: "Ventilation", desc: "Spacing accelerates airflow through pressure drops." },
              { icon: Sun, title: "Light Sculpting", desc: "Geometric filters break harsh sun into rhythmic shadow." },
              { icon: EyeOff, title: "Privacy", desc: "One-way visual barrier for social harmony." },
              { icon: Droplets, title: "Evaporation", desc: "Cooling jars reduce interior heat by up to 10°C." }
            ].map((f, i) => (
              <div key={i} className="group p-8 border border-white/10 hover:border-accent transition-all duration-500 hover:bg-white/5 space-y-6">
                <div className="w-14 h-14 bg-white/5 flex items-center justify-center border border-white/10 group-hover:rotate-45 transition-transform">
                  <f.icon className="text-accent w-8 h-8 group-hover:-rotate-45 transition-transform" />
                </div>
                <h3 className="text-3xl font-headline">{f.title}</h3>
                <p className="text-primary-foreground/60 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  const { cn } = require("@/lib/utils");
  return (
    <span className={cn("inline-block px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] border border-primary/20 bg-background/50 backdrop-blur-sm", className)}>
      {children}
    </span>
  );
}