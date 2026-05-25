"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Prologue } from "@/components/Prologue";
import { RestorationTeam } from "@/components/RestorationTeam";
import { PhaseSection } from "@/components/PhaseSection";
import { MacroMicroSection } from "@/components/MacroMicroSection";
import Image from "next/image";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

const chapters = [
  {
    id: "documentation",
    number: "01",
    label: "Documentation",
    title: "Documentation",
    desc: "Team, historical context, structural components & macro visualization",
    icon: "⬡",
  },
  {
    id: "characterization",
    number: "02",
    label: "Characterization",
    title: "Characterization",
    desc: "Material analysis & forensic micro-visualization",
    icon: "✦",
  },
  {
    id: "conservation",
    number: "03",
    label: "Conservation",
    title: "Conservation",
    desc: "Preservation intervention & restoration methodology",
    icon: "◆",
  },
];

export default function MashrabiyaProject() {
  const chaptersRef = useRef<HTMLElement>(null);
  const chaptersScreenRef = useRef<HTMLDivElement>(null);

  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);
  const [chaptersVisible, setChaptersVisible] = useState(false);

  // Observe when chapters section enters viewport → animate cards in
  useEffect(() => {
    const el = chaptersRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setChaptersVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // When a chapter is opened, scroll the chapter screen out of view upward
  // so the content section below is visible
  const openChapter = useCallback((id: string) => {
    setActiveChapter(id);
    // small delay so state updates first, then scroll
    setTimeout(() => {
      const target = document.getElementById(`section-${id}`);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }, []);

  return (
    <main className="bg-background selection:bg-primary selection:text-white">
      <Navbar />

      {/* ── SECTION 1: Hero ── */}
      <section className="h-screen w-screen overflow-hidden">
        <Prologue />
      </section>

      {/* ── SECTION 2: Chapter Selector ── */}
      <section
        ref={chaptersRef}
        id="chapters-nav-trigger"
        className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0a0800 0%, #0d0b00 50%, #0a0800 100%)" }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(201,168,76,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `rgba(${accentRgb},0.3)` }} />

        {/* Header */}
        <div className="text-center mb-16 z-10" style={{
          opacity: chaptersVisible ? 1 : 0,
          transform: chaptersVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div style={{ height: "1px", width: "40px", background: `rgba(${accentRgb},0.35)` }} />
            <span style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.55em", color: accent, textTransform: "uppercase" }}>Archive Navigation</span>
            <div style={{ height: "1px", width: "40px", background: `rgba(${accentRgb},0.35)` }} />
          </div>
          <h2 className="font-headline font-bold" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: "#fff", lineHeight: 1 }}>
            Select a <span style={{ color: accent, fontStyle: "italic" }}>Chapter</span>
          </h2>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 px-12 z-10 w-full max-w-6xl">
          {chapters.map((ch, i) => {
            const isHovered = hoveredChapter === ch.id;
            const isActive = activeChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => openChapter(ch.id)}
                onMouseEnter={() => setHoveredChapter(ch.id)}
                onMouseLeave={() => setHoveredChapter(null)}
                className="relative text-left overflow-hidden"
                style={{
                  background: isHovered || isActive
                    ? `linear-gradient(135deg, rgba(${accentRgb},0.12) 0%, rgba(${accentRgb},0.04) 100%)`
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid rgba(${accentRgb},${isHovered || isActive ? "0.45" : "0.12"})`,
                  borderRadius: "20px",
                  padding: "32px 28px",
                  cursor: "pointer",
                  opacity: chaptersVisible ? 1 : 0,
                  transform: chaptersVisible
                    ? isHovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)"
                    : "translateY(40px)",
                  transition: `opacity 0.8s ease ${0.2 + i * 0.1}s, transform ${isHovered ? "0.35s" : `0.8s ease ${0.2 + i * 0.1}s`}, border-color 0.3s, background 0.3s`,
                  boxShadow: isHovered || isActive
                    ? `0 20px 60px rgba(${accentRgb},0.15), 0 0 0 1px rgba(${accentRgb},0.2)`
                    : "none",
                }}
              >
                {/* Glow */}
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "20px",
                  background: `radial-gradient(ellipse at 50% 0%, rgba(${accentRgb},0.18) 0%, transparent 70%)`,
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.4s ease",
                  pointerEvents: "none",
                }} />

                {/* Number + icon */}
                <div className="flex items-start justify-between mb-6">
                  <span style={{
                    fontSize: "clamp(2.5rem,4vw,3.5rem)", fontFamily: "monospace", fontWeight: 700,
                    color: isHovered || isActive ? accent : `rgba(${accentRgb},0.18)`,
                    lineHeight: 1, transition: "color 0.3s ease",
                  }}>{ch.number}</span>
                  <span style={{
                    fontSize: "1.4rem",
                    color: isHovered || isActive ? accent : `rgba(${accentRgb},0.25)`,
                    transition: "color 0.3s, transform 0.4s",
                    transform: isHovered ? "rotate(45deg) scale(1.2)" : "rotate(0deg) scale(1)",
                    display: "block",
                  }}>{ch.icon}</span>
                </div>

                <p style={{
                  fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.45em",
                  color: isHovered || isActive ? accent : `rgba(${accentRgb},0.5)`,
                  textTransform: "uppercase", marginBottom: "10px", transition: "color 0.3s",
                }}>{ch.label}</p>

                <h3 className="font-headline font-bold" style={{
                  fontSize: "1.25rem", color: "#fff", lineHeight: 1.2, marginBottom: "12px",
                }}>{ch.title}</h3>

                <p style={{
                  fontSize: "0.75rem", color: "rgba(255,255,255,0.35)",
                  lineHeight: 1.7, fontWeight: 300,
                  opacity: isHovered ? 1 : 0.6, transition: "opacity 0.3s",
                }}>{ch.desc}</p>

                {/* Arrow */}
                <div style={{
                  marginTop: "20px", display: "flex", alignItems: "center", gap: "8px",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateX(0)" : "translateX(-8px)",
                  transition: "all 0.3s ease",
                }}>
                  <div style={{ height: "1px", width: "20px", background: accent }} />
                  <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.4em", color: accent, textTransform: "uppercase" }}>Explore</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-8 flex flex-col items-center gap-2 z-10"
          style={{ opacity: chaptersVisible ? 0.35 : 0, transition: "opacity 1s ease 1.2s" }}>
          <p style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.5em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
            Click a chapter to navigate
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DOCUMENTATION — hidden until clicked
          (includes all former History slides)
      ══════════════════════════════════════════ */}
      <div
        id="section-documentation"
        style={{ display: activeChapter === "documentation" || activeChapter === "characterization" || activeChapter === "conservation" ? "block" : "none" }}
      >
        {/* Team */}
        <div className="h-screen w-screen bg-background border-t border-foreground/5 relative" id="documentation">
          <div className="flex items-center gap-4 absolute top-8 left-8 md:left-16 z-10">
            <div style={{ height: "1px", width: "32px", background: accent }} />
            <span style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.5em", color: accent, textTransform: "uppercase" }}>01 — Documentation · Team</span>
          </div>
          <RestorationTeam />
        </div>

        {/* Historical Context */}
        <div className="h-screen w-screen flex flex-col px-8 md:px-16 py-10 bg-background border-t border-foreground/5">
          <div className="w-full h-full flex flex-col gap-6">
            <div className="text-center space-y-2 flex-shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">Phase I: Slide 2</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground italic">
                Historical Context &amp; Architectural Philosophy
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 w-full flex-1 min-h-0">
              <div className="relative shadow-2xl rounded-[2rem] overflow-hidden border border-foreground/5 bg-card h-full">
                <Image src="/images/slide1/slide1_1.jpg" alt="Historical reference 1" fill className="object-cover" />
              </div>
              <div className="relative shadow-2xl rounded-[2rem] overflow-hidden border border-foreground/5 bg-card h-full">
                <Image src="/images/slide1/slide1_2.jpg" alt="Historical reference 2" fill className="object-cover" />
              </div>
            </div>
            <div className="flex-shrink-0">
              <ul className="flex flex-wrap gap-x-12 gap-y-2 justify-center border-l-2 border-primary/20 pl-6">
                <li className="text-[12px] font-bold uppercase tracking-[0.1em] leading-relaxed text-foreground/70">1/ Historical Overview: Origin/Evolution</li>
                <li className="text-[12px] font-bold uppercase tracking-[0.1em] leading-relaxed text-foreground/70">2/ Functional &amp; Environmental Significance</li>
                <li className="text-[12px] font-bold uppercase tracking-[0.1em] leading-relaxed text-foreground/70">3/ Classification of Models</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Structural Components */}
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-background border-t border-foreground/5 relative">
          <div className="w-full max-w-[1400px] grid lg:grid-cols-[1.1fr_1fr] items-center px-8 md:px-16 gap-12 lg:gap-20">
            <div className="relative aspect-[16/10] w-full group">
              <div className="grid grid-cols-2 gap-4 h-full">
                {["/images/slide2/slide2_1.jpg", "/images/slide2/slide2_2.jpg", "/images/slide2/slide2_3.jpg"].map((img, idx) => (
                  <div key={idx} className="relative bg-black/5 overflow-hidden border border-foreground/5 shadow-2xl rounded-[1.5rem]"
                    style={{ gridColumn: idx === 2 ? "1 / -1" : undefined }}>
                    <Image src={img} alt={`Structural detail ${idx + 1}`} fill className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-10">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">Phase I: Slide 3</span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight text-foreground">Structural Components &amp; Geometries</h2>
              </div>
              <div className="h-[2px] w-16 bg-primary/20 rounded-full" />
              <ul className="space-y-4 border-l-2 border-primary/20 pl-6">
                <li className="text-[12px] font-bold uppercase tracking-[0.1em] leading-relaxed text-foreground/70">1/ General Structure: Main Frame &amp; Turnery Units</li>
                <li className="text-[12px] font-bold uppercase tracking-[0.1em] leading-relaxed text-foreground/70">2/ Anatomy of a Turnery Unit</li>
                <li className="text-[12px] font-bold uppercase tracking-[0.1em] leading-relaxed text-foreground/70">3/ Types of Wood Turnery: Fine Turnery</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Analytical Study */}
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-background border-t border-foreground/5 relative">
          <div className="w-full max-w-[1400px] grid lg:grid-cols-[1.1fr_1fr] items-center px-8 md:px-16 gap-12 lg:gap-20">
            <div className="relative aspect-[16/10] w-full group">
              <div className="grid grid-cols-2 gap-4 h-full">
                {["/images/slide3/slide3_1.jpg", "/images/slide3/slide3_2.jpg", "/images/slide3/slide3_3.jpg", "/images/slide3/slide3_4.jpg"].map((img, idx) => (
                  <div key={idx} className="relative bg-black/5 overflow-hidden border border-foreground/5 shadow-2xl rounded-[1.5rem]">
                    <Image src={img} alt={`Reference model ${idx + 1}`} fill className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-10">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">Phase I: Slide 4</span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight text-foreground">Analytical Study &amp; Proposed Dating</h2>
              </div>
              <div className="h-[2px] w-16 bg-primary/20 rounded-full" />
              <ul className="space-y-4 border-l-2 border-primary/20 pl-6">
                <li className="text-[12px] font-bold uppercase tracking-[0.1em] leading-relaxed text-foreground/70">1/ Analytical Methodology: Morphological Comparison</li>
                <li className="text-[12px] font-bold uppercase tracking-[0.1em] leading-relaxed text-foreground/70">2/ Proposed Dating: Ottoman Era</li>
                <li className="text-[12px] font-bold uppercase tracking-[0.1em] leading-relaxed text-foreground/70">3/ Reference Models: Bayt al-Sinnari / Gamal al-Din al-Dhahabi / Zaynab Khatun</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Macro to Micro */}
        <div className="h-screen w-screen bg-background border-t border-foreground/5">
          <MacroMicroSection
            title="Macro to Micro Visualization"
            subtitle="Phase I: Slide 5"
            macroImg="/images/slide5/mashrabiya_full.jpg"
            microImg="/images/slide5/mashrabiya_full.jpg"
            macroLabel="Structural_Full_Scan"
            microLabel="Magnified_Weakness_Analysis"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CHARACTERIZATION — hidden until clicked
      ══════════════════════════════════════════ */}
      <div
        id="section-characterization"
        style={{ display: activeChapter === "characterization" || activeChapter === "conservation" ? "block" : "none" }}
      >
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-background border-t border-foreground/5 relative" id="characterization">
          <div className="flex items-center gap-4 absolute top-8 left-8 md:left-16 z-10">
            <div style={{ height: "1px", width: "32px", background: accent }} />
            <span style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.5em", color: accent, textTransform: "uppercase" }}>03 — Characterization</span>
          </div>
          <MacroMicroSection
            title="Macro to Micro Visualization"
            subtitle="Phase II: Characterization"
            macroImg="/images/slide5/mashrabiya_full.jpg"
            microImg="/images/slide5/mashrabiya_full.jpg"
            macroLabel="Structural_Full_Scan"
            microLabel="Magnified_Weakness_Analysis"
          />
        </div>

        <PhaseSection
          phase="Characterization"
          slides={[{
            id: "char-1",
            title: "Material Analysis",
            subtitle: "Phase II: Analysis",
            content: "Micro-photographic analysis of transverse sections reveals the use of Dalbergia sissoo (Sheesham) and Cedrus libani.",
            image: "https://picsum.photos/seed/wood-micro/1200/800",
            imageHint: "wood micro photography",
          }]}
        />
      </div>

      {/* ══════════════════════════════════════════
          CONSERVATION — hidden until clicked
      ══════════════════════════════════════════ */}
      <div
        id="section-conservation"
        style={{ display: activeChapter === "conservation" ? "block" : "none" }}
      >
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-background border-t border-foreground/5 relative" id="conservation">
          <div className="flex items-center gap-4 absolute top-8 left-8 md:left-16 z-10">
            <div style={{ height: "1px", width: "32px", background: accent }} />
            <span style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.5em", color: accent, textTransform: "uppercase" }}>04 — Conservation</span>
          </div>
          <PhaseSection
            phase="Conservation"
            slides={[{
              id: "cons-1",
              title: "Final Preservation",
              subtitle: "Phase III: Intervention",
              content: "Non-contact laser ablation for surface carbon removal and protective coating application.",
              image: "https://picsum.photos/seed/final-result/1200/800",
              imageHint: "finished wood restoration",
            }]}
          />
        </div>
      </div>

      {/* Decorative Silhouette */}
      <div className="fixed -bottom-40 -right-40 w-[800px] h-[800px] opacity-[0.03] pointer-events-none animate-slow-rotate">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-foreground">
          <path d="M10,10 L90,10 L90,90 L10,90 Z M20,20 L80,20 L80,80 L20,80 Z M30,30 L70,30 L70,70 L30,70 Z" fillRule="evenodd" />
        </svg>
      </div>
    </main>
  );
}
