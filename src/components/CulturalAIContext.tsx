"use client";

import { useState } from "react";
import { generateMashrabiyaExplanation, type GenerateMashrabiyaExplanationOutput } from "@/ai/flows/generate-mashrabiya-explanation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, BookOpen, ScrollText, Palette, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function CulturalAIContext() {
  const [mashrabiyaName, setMashrabiyaName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateMashrabiyaExplanationOutput | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!mashrabiyaName || !description) {
      toast({
        title: "Information Required",
        description: "Please provide a name and description for analysis.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const output = await generateMashrabiyaExplanation({
        mashrabiyaName,
        description,
      });
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        title: "Archive Error",
        description: "Failed to consult heritage database.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-24 bg-primary/5 relative">
      <div className="absolute inset-0 pattern-overlay opacity-5 pointer-events-none" />
      
      <div className="max-w-[1400px] w-full grid lg:grid-cols-5 gap-16 items-start relative z-10">
        {/* Left: Info */}
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Artificial Intelligence</span>
            <h2 className="text-7xl font-headline text-primary leading-tight">Heritage Explorer</h2>
            <p className="text-xl text-muted-foreground font-body leading-relaxed max-w-md">
              Cross-reference modern observations with historical architectural texts to unlock the cultural depth of any pattern.
            </p>
          </div>

          <div className="bg-white p-10 border border-primary/10 shadow-2xl space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Era Pattern Name</label>
              <Input
                placeholder="e.g. Cairene Lattice..."
                value={mashrabiyaName}
                onChange={(e) => setMashrabiyaName(e.target.value)}
                className="rounded-none border-primary/10 focus-visible:ring-accent h-12"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Pattern Details</label>
              <Textarea
                placeholder="Describe geometries, wood type..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="rounded-none border-primary/10 focus-visible:ring-accent resize-none"
              />
            </div>
            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white h-16 rounded-none text-sm font-bold tracking-widest uppercase group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Consulting Archives...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform" />
                  Analyze Artifact
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-3 h-full min-h-[600px] flex flex-col">
          {!result ? (
            <div className="flex-1 border border-primary/10 border-dashed flex flex-col items-center justify-center p-20 text-center space-y-6 bg-white/30 backdrop-blur-md">
              <div className="w-24 h-24 rounded-full border border-primary/10 flex items-center justify-center animate-pulse">
                <ScrollText size={40} className="text-primary/20" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-headline italic text-primary/40">Archive Standby</p>
                <p className="text-sm text-muted-foreground/50 uppercase tracking-widest">Input details to generate analysis</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 animate-in fade-in slide-in-from-right-10 duration-1000">
              {[
                { icon: BookOpen, title: "Historical Epoch", content: result.historicalContext },
                { icon: ScrollText, title: "Social Impact", content: result.culturalSignificance },
                { icon: Palette, title: "Artistic Technique", content: result.craftsmanshipDetails }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 border border-primary/10 shadow-lg group hover:border-accent transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-accent/5 group-hover:bg-accent group-hover:text-white transition-colors">
                      <item.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-headline text-primary">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm font-body">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}