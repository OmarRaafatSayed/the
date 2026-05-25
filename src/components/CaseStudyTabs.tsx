
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComparisonSlider } from "@/components/BeforeAfterSection";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { History, Wind, Layout, PenTool, Layers, Microscope, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * @fileOverview CaseStudyTabs component for the Mashrabiya restoration project.
 * Implements a fixed-height container with internal scrolling for stable UX.
 */

export function CaseStudyTabs() {
  const m1b = PlaceHolderImages.find(i => i.id === "mashrabiya-1-before")?.imageUrl;
  const m1a = PlaceHolderImages.find(i => i.id === "mashrabiya-1-after")?.imageUrl;
  const m2b = PlaceHolderImages.find(i => i.id === "mashrabiya-2-before")?.imageUrl;
  const m2a = PlaceHolderImages.find(i => i.id === "mashrabiya-2-after")?.imageUrl;
  
  const historyImg = PlaceHolderImages.find(i => i.id === "historical-reference");
  const structuralImg = PlaceHolderImages.find(i => i.id === "structural-detail");

  return (
    <div className="h-full w-full flex flex-col bg-background relative overflow-hidden border-l border-primary/10">
      {/* Ornamental Background Pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-[0.03] pointer-events-none z-0" />
      
      {/* Fixed Header: Stay visible at all times */}
      <header className="px-12 py-8 bg-background/95 backdrop-blur-md z-30 border-b border-primary/10 flex-shrink-0">
        <div className="flex flex-col space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Analytical Case Study</span>
          <h2 className="text-4xl font-headline text-primary">Architectural Heritage Record</h2>
        </div>
      </header>

      <Tabs defaultValue="documentation" className="flex-1 flex flex-col min-h-0 z-20">
        {/* Navigation Tabs List: Fixed below header */}
        <div className="px-12 bg-white/50 backdrop-blur-sm border-b border-primary/5 flex-shrink-0">
          <TabsList className="h-14 bg-transparent gap-12 p-0">
            <TabsTrigger 
              value="documentation" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent text-[11px] font-bold uppercase tracking-[0.2em] px-0 h-full transition-all text-primary/60 data-[state=active]:text-primary"
            >
              Heritage Documentation
            </TabsTrigger>
            <TabsTrigger 
              value="characterization" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent text-[11px] font-bold uppercase tracking-[0.2em] px-0 h-full transition-all text-primary/60 data-[state=active]:text-primary"
            >
              Characterization
            </TabsTrigger>
            <TabsTrigger 
              value="conservation" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent text-[11px] font-bold uppercase tracking-[0.2em] px-0 h-full transition-all text-primary/60 data-[state=active]:text-primary"
            >
              Conservation
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Scrollable Content Area: Only this part moves */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar scroll-smooth bg-primary/[0.01]">
          
          <TabsContent value="documentation" className="m-0 p-0 outline-none">
            <div className="max-w-[1600px] mx-auto space-y-32 py-20 px-12 pb-40">
              
              {/* SLIDE 0: Visual Comparison */}
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[1px] bg-accent/40" />
                  <h3 className="text-2xl font-headline text-primary italic">Visual Metamorphosis (Before & After)</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="bg-white p-5 shadow-xl border border-primary/5 group">
                    <ComparisonSlider beforeImg={m1b} afterImg={m1a} title="Unit Alpha: Lattice Integrity" />
                  </div>
                  <div className="bg-white p-5 shadow-xl border border-primary/5 group">
                    <ComparisonSlider beforeImg={m2b} afterImg={m2a} title="Unit Beta: Joinery Restoration" />
                  </div>
                </div>
              </div>

              {/* SLIDE 1: Historical Context & Architectural Philosophy */}
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[1px] bg-accent/40" />
                  <h3 className="text-2xl font-headline text-primary italic">Historical Context & Architectural Philosophy</h3>
                </div>
                
                <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-stretch">
                  <div className="relative min-h-[600px] w-full border border-primary/10 shadow-2xl overflow-hidden group bg-muted">
                    {historyImg && (
                      <Image 
                        src={historyImg.imageUrl} 
                        alt={historyImg.description} 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        data-ai-hint={historyImg.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/5 group-hover:opacity-0 transition-opacity" />
                  </div>

                  <div className="flex flex-col justify-center space-y-6">
                    <InfoCard 
                      icon={History} 
                      title="01. Historical Overview" 
                      subtitle="Origin & Evolution"
                      text="Tracing the Mashrabiya from early Islamic urbanism. Originally a shelf for cooling porous water jars, it evolved into a sophisticated architectural facade defined by the Mamluk and Ottoman periods."
                    />
                    <InfoCard 
                      icon={Wind} 
                      title="02. Functional Significance" 
                      subtitle="Environmental Wisdom"
                      text="Passive cooling through pressure drops, sacred privacy for the family, and the visual expansion of domestic spaces without exposure to the street."
                    />
                    <InfoCard 
                      icon={Layout} 
                      title="03. Classification of Models" 
                      subtitle="Typological Forms"
                      text="Distinguishing between Flush/Wall-Aligned models and the iconic Protruding/Canted Mashrabiyas that define Islamic urban skylines."
                    />
                  </div>
                </div>
              </div>

              {/* SLIDE 2: Structural Components & Geometries */}
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[1px] bg-accent/40" />
                  <h3 className="text-2xl font-headline text-primary italic">Structural Components & Geometries</h3>
                </div>

                <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-stretch">
                  <div className="relative min-h-[600px] w-full border border-primary/10 shadow-2xl overflow-hidden group bg-muted">
                    {structuralImg && (
                      <Image 
                        src={structuralImg.imageUrl} 
                        alt={structuralImg.description} 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        data-ai-hint={structuralImg.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/5 group-hover:opacity-0 transition-opacity" />
                  </div>

                  <div className="flex flex-col justify-center space-y-6">
                    <InfoCard 
                      icon={StructuralIcon} 
                      title="01. General Structure" 
                      subtitle="Main Frame & Turnery Units"
                      text="The skeleton consists of primary support frames housing thousands of interlocking hand-turned wooden units without the use of nails."
                    />
                    <InfoCard 
                      icon={PenTool} 
                      title="02. Anatomy of a Turnery Unit" 
                      subtitle="Mandrel / Axis / Globe / Nut / Neck / Socket / Link"
                      text="A complex assembly where the axis serves as the mandrel, surrounded by the globe and neck units, creating a flexible yet rigid lattice."
                    />
                    <InfoCard 
                      icon={Layers} 
                      title="03. Types of Wood Turnery" 
                      subtitle="Fine Turnery"
                      text="Specializing in 'Fine Turnery' where hardwoods are shaped to allow natural breathing. Various patterns emerge from different geometric link assemblies."
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="characterization" className="m-0 p-0 outline-none h-full">
            <div className="min-h-[600px] flex flex-col items-center justify-center text-center p-20 space-y-8 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-accent/5 rounded-full flex items-center justify-center text-accent">
                <Microscope size={48} />
              </div>
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-4xl font-headline text-primary">Characterization Phase</h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Scientific analysis of material composition, wood species identification, and degradation assessment using advanced imaging and laboratory techniques.
                </p>
              </div>
              <div className="h-px w-32 bg-accent/20" />
            </div>
          </TabsContent>

          <TabsContent value="conservation" className="m-0 p-0 outline-none h-full">
            <div className="min-h-[600px] flex flex-col items-center justify-center text-center p-20 space-y-8 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-accent/5 rounded-full flex items-center justify-center text-accent">
                <ShieldCheck size={48} />
              </div>
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-4xl font-headline text-primary">Conservation Strategy</h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Methodologies for cleaning, consolidation, and preservation of the Mashrabiya units to ensure long-term stability while respecting original materials.
                </p>
              </div>
              <div className="h-px w-32 bg-accent/20" />
            </div>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
}

function InfoCard({ icon: Icon, title, subtitle, text }: { icon: any, title: string, subtitle: string, text: string }) {
  return (
    <div className="group space-y-4 p-8 bg-white border border-primary/5 shadow-lg hover:border-accent/40 transition-all duration-500">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
          <Icon size={22} />
        </div>
        <h4 className="text-2xl font-headline text-primary">{title}</h4>
      </div>
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent/70">{subtitle}</p>
        <p className="text-muted-foreground font-body leading-relaxed text-sm">
          {text}
        </p>
      </div>
    </div>
  );
}

// Custom Icon function defined uniquely to avoid duplicate naming errors
function StructuralIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
