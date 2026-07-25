"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Prologue } from "@/components/Prologue";
import { VisualizationSection } from "@/components/VisualizationSection";
import { RestorationTeam } from "@/components/RestorationTeam";
import { PhaseSection } from "@/components/PhaseSection";
import { MacroMicroSection } from "@/components/MacroMicroSection";
import { MashrabiyaSpotlight } from "@/components/MashrabiyaSpotlight";
import { MechanicalCleaningSection } from "@/components/MechanicalCleaningSection";
import { GreasedCleaningSection } from "@/components/MechanicalCleaningSection";
import { ConsolidationSection } from "@/components/ConsolidationSection";
import { AssemblySection, EmptyFrameAssemblySection } from "@/components/AssemblySection";
import { AssemblyConsolidationSection } from "@/components/AssemblyConsolidationSection";
import { CompletionSection } from "@/components/CompletionSection";
import { CompletionSection2 } from "@/components/CompletionSection2";
import { MashrabiyaAssemblySection } from "@/components/MashrabiyaAssemblySection";
import { MashrabiyaAssemblySection2 } from "@/components/MashrabiyaAssemblySection2";
import { MashrabiyaAssemblySection3 } from "@/components/MashrabiyaAssemblySection3";
import { PreviousRestorationSection } from "@/components/PreviousRestorationSection";
import { FtirSection } from "@/components/FtirSection";
import { XrdEdxIrSection } from "@/components/XrdEdxIrSection";
import { ProjectCostSection } from "@/components/ProjectCostSection";
import { AcknowledgementsSection } from "@/components/AcknowledgementsSection";
import Image from "next/image";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

const chapters = [
  {
    id: "history",
    number: "01",
    label: "History",
    title: "History",
    desc: "Historical context, structural geometries & analytical dating",
    icon: "◈",
  },
  {
    id: "documentation",
    number: "02",
    label: "Documentation",
    title: "Documentation",
    desc: "Team, macro visualization & deterioration mapping",
    icon: "⬡",
  },
  {
    id: "characterization",
    number: "03",
    label: "Characterization",
    title: "Characterization",
    desc: "Material analysis & forensic micro-visualization",
    icon: "✦",
  },
  {
    id: "conservation",
    number: "04",
    label: "Conservation",
    title: "Conservation",
    desc: "Preservation intervention & restoration methodology",
    icon: "◆",
  },
];

// ── Documentation Section 1 Gallery ──────────────────────────────────────────
const docGalleryImages = [
  { src: "/images/documentation/section1/frame.png",       label: "Mashrabiya",      key: "mashrabiya" },
  { src: "/images/documentation/section1/cross-full.jpeg", label: "صليب مليان",      key: "cross-full" },
  { src: "/images/documentation/section1/cross-empty.jpeg",label: "الصليب الفاضي",  key: "cross-empty" },
];

function DocGallery() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Large preview */}
      <div
        className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl"
        style={{
          border: "1px solid rgba(201,168,76,0.18)",
          aspectRatio: "4/5",
          background: "#f5f2ec",
        }}
      >
        {docGalleryImages.map((img, i) => (
          <div
            key={img.key}
            style={{
              position: "absolute", inset: 0,
              opacity: active === i ? 1 : 0,
              transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
              pointerEvents: active === i ? "auto" : "none",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              className="object-contain"
              quality={100}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ))}
        {/* Gold glow bottom */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(201,168,76,0.07) 0%, transparent 35%)",
          pointerEvents: "none",
          zIndex: 2,
        }} />
        {/* Active label badge */}
        <div style={{
          position: "absolute", bottom: "1rem", left: "1.2rem",
          zIndex: 3, display: "flex", alignItems: "center", gap: "8px",
        }}>
          <div style={{ height: "1px", width: "16px", background: "#C9A84C", opacity: 0.7 }} />
          <span style={{
            fontSize: "7px", fontFamily: "monospace",
            letterSpacing: "0.4em", textTransform: "uppercase",
            color: "#C9A84C", opacity: 0.85,
          }}>
            {docGalleryImages[active].label}
          </span>
        </div>
      </div>

      {/* Thumbnails row */}
      <div className="flex gap-3">
        {docGalleryImages.map((img, i) => (
          <button
            key={img.key}
            onClick={() => setActive(i)}
            className="flex-1 relative rounded-xl overflow-hidden focus:outline-none"
            style={{
              aspectRatio: "1/1",
              background: "#f5f2ec",
              border: active === i
                ? "2px solid rgba(201,168,76,0.85)"
                : "1.5px solid rgba(201,168,76,0.12)",
              boxShadow: active === i
                ? "0 0 0 3px rgba(201,168,76,0.18), 0 8px 24px rgba(201,168,76,0.15)"
                : "none",
              transform: active === i ? "scale(1.04)" : "scale(1)",
              transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              cursor: "pointer",
            }}
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              className="object-contain"
              quality={80}
              sizes="120px"
            />
            {/* Dim overlay for inactive */}
            <div style={{
              position: "absolute", inset: 0,
              background: active === i ? "transparent" : "rgba(10,8,0,0.38)",
              transition: "background 0.35s ease",
            }} />
            {/* Active dot indicator */}
            {active === i && (
              <div style={{
                position: "absolute", bottom: "6px", left: "50%",
                transform: "translateX(-50%)",
                width: "5px", height: "5px",
                borderRadius: "50%",
                background: "#C9A84C",
                boxShadow: "0 0 6px rgba(201,168,76,0.8)",
              }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MashrabiyaProject() {
  const chaptersRef = useRef<HTMLElement>(null);
  const chaptersScreenRef = useRef<HTMLDivElement>(null);

  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);
  const [chaptersVisible, setChaptersVisible] = useState(false);
  const [flippedImage, setFlippedImage] = useState<number | null>(null);
  const [activeGeoCard, setActiveGeoCard] = useState<number | null>(null);
  const [isGeoHovered, setIsGeoHovered] = useState(false);
  const geoScrollRef = useRef<HTMLDivElement>(null);
  const geoAnimRef = useRef<number | null>(null);
  const geoPositionRef = useRef(0);

  const geoImages = [
    {
      src: "/images/slide2-geo/ميموني عدل.jpeg",
      title: "Maimuni Upright",
      caption: "The standard upright turnery unit — the foundational geometry of Mashrabiya woodwork.",
    },
    {
      src: "/images/slide2-geo/ميموني مائل.jpeg",
      title: "Maimuni Diagonal",
      caption: "Diagonal variation creating dynamic light-filtering patterns across interior spaces.",
    },
    {
      src: "/images/slide2-geo/ميموني مائل بصليب.jpeg",
      title: "Maimuni Diagonal with Cross",
      caption: "Diagonal units interlocked with cross-bracing for enhanced structural rigidity.",
    },
    {
      src: "/images/slide2-geo/ميموني سداسي.jpeg",
      title: "Maimuni Hexagonal",
      caption: "Hexagonal geometry — a complex pattern reflecting advanced Ottoman-era craftsmanship.",
    },
    {
      src: "/images/slide2-geo/صليب مليان.jpeg",
      title: "Full Cross",
      caption: "The full cross module — a dominant motif in Cairene Mashrabiya classification.",
    },
    {
      src: "/images/slide2-geo/صليب مليان بفرخ عاده بشربيتين.jpeg",
      title: "Cross with Double Sill",
      caption: "Cross unit with standard sill and double lower screen — maximising ventilation control.",
    },
  ];

  // Auto-scroll loop
  useEffect(() => {
    const el = geoScrollRef.current;
    if (!el) return;
    const speed = 0.6; // px per frame
    const animate = () => {
      if (!isGeoHovered) {
        geoPositionRef.current += speed;
        const maxScroll = el.scrollWidth / 2;
        if (geoPositionRef.current >= maxScroll) geoPositionRef.current = 0;
        el.scrollLeft = geoPositionRef.current;
      }
      geoAnimRef.current = requestAnimationFrame(animate);
    };
    geoAnimRef.current = requestAnimationFrame(animate);
    return () => { if (geoAnimRef.current) cancelAnimationFrame(geoAnimRef.current); };
  }, [isGeoHovered]);

  const historicalImages = [
    {
      src: "/images/slide1/slide1_1.jpg",
      width: 993,
      height: 1280,
      caption1: "Origins of the Mashrabiya date back",
      caption2: "to Fatimid & Mamluk Cairo, 10th–16th c.",
    },
    {
      src: "/images/slide1/slide1_2.jpg",
      width: 1257,
      height: 1600,
      caption1: "Evolved across Islamic dynasties as a key",
      caption2: "element of privacy, light & ventilation.",
    },
  ];

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

  // Listen for navbar chapter clicks
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      openChapter(id);
    };
    window.addEventListener("openChapter", handler);
    return () => window.removeEventListener("openChapter", handler);
  }, [openChapter]);

  return (
    <main className="bg-background selection:bg-primary selection:text-white">
      <Navbar />

      {/* ── SECTION 1: Hero ── */}
      <section className="h-screen w-screen overflow-hidden">
        <Prologue />
      </section>

      {/* ── SECTION 1.5: 3D Visualization ── */}
      <section 
        className="w-screen relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0a0800 0%, #0d0b00 100%)" }}
      >
        <VisualizationSection
          title="Interactive 3D & 2D Visualization"
          description="Explore the Mashrabiya in three dimensions. Rotate, zoom, and examine the conservation process with interactive controls."
          model3DPath="/models/mashrabiya.glb"
          image2DPath="/images/slide2-geo/ميموني عدل.jpeg"
          patternType="geometric"
          defaultMode="combined"
          height="700px"
        />
      </section>

      {/* ── SECTION 2: Chapter Selector ── */}
      <section
        ref={chaptersRef}
        id="chapters-nav-trigger"
        className="min-h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden py-20"
        style={{ background: "linear-gradient(160deg, #0a0800 0%, #0d0b00 50%, #0a0800 100%)" }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(201,168,76,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `rgba(${accentRgb},0.3)` }} />

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 z-10 px-4" style={{
          opacity: chaptersVisible ? 1 : 0,
          transform: chaptersVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            <div style={{ height: "1px", width: "28px", background: `rgba(${accentRgb},0.35)` }} />
            <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.45em", color: accent, textTransform: "uppercase" }}>Archive Navigation</span>
            <div style={{ height: "1px", width: "28px", background: `rgba(${accentRgb},0.35)` }} />
          </div>
          <h2 className="font-headline font-bold" style={{ fontSize: "clamp(1.8rem,4vw,3.5rem)", color: "#fff", lineHeight: 1 }}>
            Select a <span style={{ color: accent, fontStyle: "italic" }}>Chapter</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5 sm:px-8 md:px-12 z-10 w-full max-w-6xl">
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
                  padding: "20px 18px",
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
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <span style={{
                    fontSize: "clamp(2rem,4vw,3.5rem)", fontFamily: "monospace", fontWeight: 700,
                    color: isHovered || isActive ? accent : `rgba(${accentRgb},0.18)`,
                    lineHeight: 1, transition: "color 0.3s ease",
                  }}>{ch.number}</span>
                  <span style={{
                    fontSize: "1.2rem",
                    color: isHovered || isActive ? accent : `rgba(${accentRgb},0.25)`,
                    transition: "color 0.3s, transform 0.4s",
                    transform: isHovered ? "rotate(45deg) scale(1.2)" : "rotate(0deg) scale(1)",
                    display: "block",
                  }}>{ch.icon}</span>
                </div>

                <p style={{
                  fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.4em",
                  color: isHovered || isActive ? accent : `rgba(${accentRgb},0.5)`,
                  textTransform: "uppercase", marginBottom: "8px", transition: "color 0.3s",
                }}>{ch.label}</p>

                <h3 className="font-headline font-bold" style={{
                  fontSize: "1.1rem", color: "#fff", lineHeight: 1.2, marginBottom: "10px",
                }}>{ch.title}</h3>

                <p style={{
                  fontSize: "0.72rem", color: "rgba(255,255,255,0.35)",
                  lineHeight: 1.7, fontWeight: 300,
                  opacity: isHovered ? 1 : 0.6, transition: "opacity 0.3s",
                }}>{ch.desc}</p>

                {/* Arrow */}
                <div style={{
                  marginTop: "16px", display: "flex", alignItems: "center", gap: "8px",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateX(0)" : "translateX(-8px)",
                  transition: "all 0.3s ease",
                }}>
                  <div style={{ height: "1px", width: "16px", background: accent }} />
                  <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.4em", color: accent, textTransform: "uppercase" }}>Explore</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 z-10"
          style={{ opacity: chaptersVisible ? 0.35 : 0, transition: "opacity 1s ease 1.2s" }}>
          <p style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.5em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
            Click a chapter to navigate
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HISTORY — hidden until clicked
          (Historical Context, Structural Geometries, Analytical Study)
      ══════════════════════════════════════════ */}
      <div
        id="section-history"
        style={{ display: activeChapter === "history" || activeChapter === "documentation" || activeChapter === "characterization" || activeChapter === "conservation" ? "block" : "none" }}
      >
        {/* anchor for navbar scroll */}
        <div id="history" style={{ position: "absolute", marginTop: "-80px" }} />

        {/* Research Group — Team */}
        <div className="min-h-screen w-screen bg-background border-t border-foreground/5 relative">
          <div className="flex items-center gap-3 absolute top-6 left-5 sm:top-8 sm:left-8 md:left-16 z-10">
            <div style={{ height: "1px", width: "24px", background: accent }} />
            <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.4em", color: accent, textTransform: "uppercase" }}>01 — History · Research Group</span>
          </div>
          <RestorationTeam />
        </div>

        {/* Historical Context */}
        <div className="w-screen flex flex-col px-5 sm:px-8 md:px-16 py-20 bg-background border-t border-foreground/5">
          <div className="w-full flex flex-col gap-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">Phase I: Slide 2</span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-headline font-bold text-foreground italic">
                Historical Context &amp; Architectural Philosophy
              </h2>
            </div>
            {/* Images — click to reveal caption, click again to hide */}
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 w-full">
              {historicalImages.map((img, idx) => {
                const isFlipped = flippedImage === idx;
                return (
                  <div key={idx} className="flex justify-center">
                    <div
                      className="w-full max-w-sm relative cursor-pointer select-none"
                      onClick={() => setFlippedImage(isFlipped ? null : idx)}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      {/* Image */}
                      <div
                        className="shadow-2xl rounded-[2rem] overflow-hidden border border-foreground/5 bg-card"
                        style={{
                          transform: isFlipped ? "scale(0.97)" : "scale(1)",
                          transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                        }}
                      >
                        <Image
                          src={img.src}
                          alt={`Historical reference ${idx + 1}`}
                          width={img.width}
                          height={img.height}
                          className="w-full h-auto"
                          quality={100}
                        />
                      </div>

                      {/* Caption overlay — slides up from bottom */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          borderBottomLeftRadius: "2rem",
                          borderBottomRightRadius: "2rem",
                          overflow: "hidden",
                          background: "linear-gradient(to top, rgba(10,8,0,0.92) 0%, rgba(10,8,0,0.65) 60%, transparent 100%)",
                          padding: "2rem 1.5rem 1.5rem",
                          transform: isFlipped ? "translateY(0)" : "translateY(100%)",
                          opacity: isFlipped ? 1 : 0,
                          transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
                          pointerEvents: "none",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.8rem",
                            fontFamily: "Georgia, serif",
                            color: "#C9A84C",
                            fontStyle: "italic",
                            lineHeight: 1.6,
                            transform: isFlipped ? "translateY(0)" : "translateY(12px)",
                            transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1) 0.06s",
                          }}
                        >
                          {img.caption1}
                        </p>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "rgba(255,255,255,0.7)",
                            lineHeight: 1.6,
                            marginTop: "4px",
                            transform: isFlipped ? "translateY(0)" : "translateY(16px)",
                            transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1) 0.12s",
                          }}
                        >
                          {img.caption2}
                        </p>
                      </div>

                      {/* Subtle glow ring on hover */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "2rem",
                          boxShadow: isFlipped
                            ? "0 0 0 2px rgba(201,168,76,0.55), 0 24px 60px rgba(201,168,76,0.18)"
                            : "0 0 0 1px rgba(201,168,76,0.12)",
                          transition: "box-shadow 0.4s ease",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Structural Components — horizontal auto-scroll carousel */}
        <div className="w-screen bg-background border-t border-foreground/5 py-20 overflow-hidden">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12 px-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60 mb-3">Phase I: Slide 3</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-headline font-bold leading-tight text-foreground">
              Structural Components &amp; <span style={{ color: accent, fontStyle: "italic" }}>Geometries</span>
            </h2>
            <p style={{ marginTop: "10px", fontSize: "11px", color: "rgba(0,0,0,0.35)", letterSpacing: "0.05em" }}>
              Hover to pause · Click any card to reveal description
            </p>
          </div>

          {/* Carousel track */}
          <div
            ref={geoScrollRef}
            className="flex gap-5 px-8"
            style={{
              overflowX: "hidden",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: "default",
              userSelect: "none",
            }}
            onMouseEnter={() => setIsGeoHovered(true)}
            onMouseLeave={() => setIsGeoHovered(false)}
          >
            {/* Duplicate for seamless infinite loop */}
            {[...geoImages, ...geoImages].map((img, idx) => {
              const cardIdx = idx % geoImages.length;
              const isActive = activeGeoCard === cardIdx && idx < geoImages.length;
              const isActiveDupe = activeGeoCard === cardIdx && idx >= geoImages.length;
              const showCaption = activeGeoCard === cardIdx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveGeoCard(showCaption ? null : cardIdx)}
                  style={{
                    flexShrink: 0,
                    width: "clamp(220px, 22vw, 300px)",
                    position: "relative",
                    cursor: "pointer",
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    border: showCaption
                      ? "1.5px solid rgba(201,168,76,0.6)"
                      : "1.5px solid rgba(201,168,76,0.1)",
                    boxShadow: showCaption
                      ? "0 16px 48px rgba(201,168,76,0.2), 0 0 0 1px rgba(201,168,76,0.3)"
                      : "0 4px 20px rgba(0,0,0,0.08)",
                    transform: showCaption ? "scale(1.03)" : "scale(1)",
                    transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.35s ease",
                    aspectRatio: "3/4",
                  }}
                >
                  {/* Image */}
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover"
                    quality={90}
                    sizes="300px"
                  />

                  {/* Dark gradient always on bottom */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(10,8,0,0.7) 0%, rgba(10,8,0,0.2) 40%, transparent 70%)",
                    pointerEvents: "none",
                  }} />

                  {/* Title — always visible */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "1.2rem 1rem 1rem",
                    pointerEvents: "none",
                  }}>
                    <p style={{
                      fontSize: "0.7rem",
                      fontFamily: "monospace",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: accent,
                      opacity: 0.8,
                      marginBottom: "4px",
                      transform: showCaption ? "translateY(0)" : "translateY(0)",
                    }}>{img.title}</p>

                    {/* Caption — slides up on click */}
                    <p style={{
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.6,
                      maxHeight: showCaption ? "60px" : "0px",
                      opacity: showCaption ? 1 : 0,
                      overflow: "hidden",
                      transform: showCaption ? "translateY(0)" : "translateY(10px)",
                      transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                      {img.caption}
                    </p>
                  </div>

                  {/* Click hint icon */}
                  <div style={{
                    position: "absolute", top: "12px", right: "12px",
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: showCaption ? `rgba(201,168,76,0.9)` : "rgba(0,0,0,0.35)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.3s ease, transform 0.3s ease",
                    transform: showCaption ? "rotate(45deg)" : "rotate(0deg)",
                    pointerEvents: "none",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke={showCaption ? "#0a0800" : "rgba(255,255,255,0.7)"}
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll progress bar */}
          <div className="flex justify-center mt-8 px-8">
            <div style={{
              height: "2px", width: "120px", borderRadius: "2px",
              background: "rgba(201,168,76,0.12)", overflow: "hidden",
            }}>
              <div style={{
                height: "100%", width: "40%", borderRadius: "2px",
                background: accent,
                animation: isGeoHovered ? "none" : "geoProgress 4s linear infinite",
              }} />
            </div>
          </div>
          <style>{`
            @keyframes geoProgress {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(350%); }
            }
          `}</style>
        </div>

        {/* Analytical Study */}
        <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-background border-t border-foreground/5 relative py-20">
          <div className="w-full max-w-[1200px] grid lg:grid-cols-2 items-center px-5 sm:px-8 md:px-16 gap-12 lg:gap-20">

            {/* Single image — left */}
            <div
              className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl"
              style={{
                border: "1px solid rgba(201,168,76,0.12)",
              }}
            >
              <img
                src="/images/slide3-analytical/Frame 15 (1).png"
                alt="Mashrabiya — Analytical Study"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              {/* subtle gold bottom glow */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(201,168,76,0.08) 0%, transparent 40%)",
                pointerEvents: "none",
              }} />
            </div>

            {/* Text — right */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">Phase I: Slide 4</span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-headline font-bold leading-tight text-foreground">
                  Analytical Study &amp; <span style={{ color: accent, fontStyle: "italic" }}>Proposed Dating</span>
                </h2>
              </div>

              <div style={{ height: "2px", width: "48px", background: `rgba(${accentRgb},0.3)`, borderRadius: "2px" }} />

              <div className="space-y-5">
                {[
                  {
                    n: "01",
                    text: "Morphological comparison with documented Cairene Mashrabiya units from the Ottoman period reveals strong stylistic and constructional continuity.",
                  },
                  {
                    n: "02",
                    text: "Proposed dating places the object within the late Ottoman era (18th–19th c.) based on turnery profile analysis and joinery typology.",
                  },
                  {
                    n: "03",
                    text: "Reference models: Bayt al-Sinnari, Gamal al-Din al-Dhahabi & Zaynab Khatun — all exhibit comparable geometric grammar and wood species.",
                  },
                ].map((item) => (
                  <div key={item.n} className="flex gap-4 items-start">
                    <span style={{
                      flexShrink: 0,
                      fontSize: "0.65rem",
                      fontFamily: "monospace",
                      color: accent,
                      opacity: 0.7,
                      marginTop: "3px",
                      letterSpacing: "0.1em",
                    }}>{item.n}</span>
                    <p style={{
                      fontSize: "0.82rem",
                      color: "rgba(0,0,0,0.55)",
                      lineHeight: 1.75,
                      fontWeight: 400,
                    }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>{/* end section-history */}

      {/* ══════════════════════════════════════════
          DOCUMENTATION — hidden until clicked
      ══════════════════════════════════════════ */}
      <div
        id="section-documentation"
        style={{ display: activeChapter === "documentation" || activeChapter === "characterization" || activeChapter === "conservation" ? "block" : "none" }}
      >
        {/* anchor for navbar scroll */}
        <div id="documentation" style={{ position: "absolute", marginTop: "-80px" }} />

        {/* ── Documentation Intro: Overview Image + Description ── */}
        <div className="min-h-screen w-screen bg-background border-t border-foreground/5 flex items-center">
          <div className="w-full max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 px-5 sm:px-8 md:px-16 py-20 items-center">

            {/* Left — Gallery: large preview + 3 thumbnails */}
            <DocGallery />

            {/* Right — Description */}
            <div className="space-y-8">
              {/* Label */}
              <div className="flex items-center gap-3">
                <div style={{ height: "1px", width: "24px", background: accent }} />
                <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.45em", color: accent, textTransform: "uppercase" }}>
                  02 — Documentation · Overview
                </span>
              </div>

              {/* Title */}
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold leading-tight text-foreground">
                  Documentation &amp; <span style={{ color: accent, fontStyle: "italic" }}>Field Survey</span>
                </h2>
                <div style={{ height: "2px", width: "48px", background: `rgba(${accentRgb},0.35)`, borderRadius: "2px" }} />
              </div>

              {/* Body points */}
              <div className="space-y-5">
                {[
                  {
                    n: "01",
                    title: "Condition Assessment",
                    text: "A systematic on-site survey was carried out to record the current physical state of the Mashrabiya, capturing all visible deterioration patterns, structural deformations, and material losses.",
                  },
                  {
                    n: "02",
                    title: "Photographic Documentation",
                    text: "High-resolution photography was employed across multiple scales — from overall elevation shots to close-up macro imaging — ensuring a comprehensive visual archive of the object.",
                  },
                  {
                    n: "03",
                    title: "Measured Drawing",
                    text: "Precise dimensional data was collected and translated into scaled technical drawings, forming the baseline reference for all subsequent conservation and intervention work.",
                  },
                  {
                    n: "04",
                    title: "Contextual Recording",
                    text: "The surrounding architectural context, installation setting, and environmental conditions were documented to inform a holistic conservation strategy.",
                  },
                ].map((item) => (
                  <div key={item.n} className="flex gap-4 items-start">
                    <span style={{
                      flexShrink: 0,
                      fontSize: "0.65rem",
                      fontFamily: "monospace",
                      color: accent,
                      opacity: 0.7,
                      marginTop: "3px",
                      letterSpacing: "0.1em",
                    }}>{item.n}</span>
                    <div>
                      <p style={{
                        fontSize: "0.7rem",
                        fontFamily: "monospace",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: accent,
                        opacity: 0.85,
                        marginBottom: "4px",
                      }}>{item.title}</p>
                      <p style={{
                        fontSize: "0.82rem",
                        color: "rgba(0,0,0,0.5)",
                        lineHeight: 1.75,
                        fontWeight: 400,
                      }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footnote */}
              <div className="pt-4 flex items-center gap-3 opacity-30">
                <div style={{ height: "1px", flex: 1, background: "currentColor" }} />
                <span style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.35em", textTransform: "uppercase" }}>
                  Phase_II · Field_Record
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Macro to Micro Visualization — moved here under Documentation ── */}
        <div className="w-screen bg-background border-t border-foreground/5">
          <div className="flex items-center gap-3 px-5 sm:px-8 md:px-16 pt-8">
            <div style={{ height: "1px", width: "24px", background: accent }} />
            <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.4em", color: accent, textTransform: "uppercase" }}>02 — Documentation · Macro Visualization</span>
          </div>
          <MacroMicroSection
            macroImg="/images/documentation/macro/mashrabiya-ungreased.jpeg"
            microImg="/images/documentation/macro/mashrabiya-greased.jpeg"
            title="Macro to Micro Visualization"
            subtitle="Phase II: Documentation"
            macroLabel="Mashrabiya — Ungreased"
            microLabel="Mashrabiya — Greased"
          />
        </div>

        {/* ── Deterioration Aspects ── */}
        <div className="min-h-screen w-screen bg-background border-t border-foreground/5 flex flex-col items-center justify-center py-16 px-5 sm:px-8 md:px-16">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div style={{ height: "1px", width: "24px", background: `rgba(${accentRgb},0.45)` }} />
              <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.45em", color: accent, textTransform: "uppercase" }}>
                02 — Documentation · Macro Visualization
              </span>
              <div style={{ height: "1px", width: "24px", background: `rgba(${accentRgb},0.45)` }} />
            </div>
            <h2 className="font-headline font-bold" style={{
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: "#1a1400",
              lineHeight: 1.12, letterSpacing: "-0.01em",
            }}>
              Deterioration{" "}
              <span style={{ color: accent, fontStyle: "italic" }}>Aspects</span>
            </h2>
            <div style={{ marginTop: "14px", height: "2px", width: "56px", background: `rgba(${accentRgb},0.5)`, borderRadius: "2px" }} />
          </div>

          <div style={{ maxWidth: "1100px", width: "100%" }}>
            <div style={{
              borderRadius: "1.25rem",
              overflow: "hidden",
              border: `1px solid rgba(${accentRgb},0.18)`,
              boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
              background: "#faf8f2",
              width: "100%",
              maxHeight: "65vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <img
                src="/images/documentation/amira/1.jpeg"
                alt="Deterioration Aspects"
                style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "65vh", display: "block", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════
          CHARACTERIZATION — hidden until clicked
      ══════════════════════════════════════════ */}
      <div
        id="section-characterization"
        style={{ display: activeChapter === "characterization" || activeChapter === "conservation" ? "block" : "none" }}
      >
        <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-background border-t border-foreground/5 relative" id="characterization">
          <div className="flex items-center gap-3 absolute top-6 left-5 sm:top-8 sm:left-8 md:left-16 z-10">
            <div style={{ height: "1px", width: "24px", background: accent }} />
            <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.4em", color: accent, textTransform: "uppercase" }}>03 — Characterization</span>
          </div>

          {/* ── FTIR Analysis — Mashrabiya Unit 02 ── */}
          <FtirSection />

          {/* ── XRD · EDX · IR Analysis ── */}
          <XrdEdxIrSection />
        </div>

      </div>

      {/* ══════════════════════════════════════════
          CONSERVATION — hidden until clicked
      ══════════════════════════════════════════ */}
      <div
        id="section-conservation"
        style={{ display: activeChapter === "conservation" ? "block" : "none" }}
      >
        <div className="w-screen bg-background border-t border-foreground/5 relative" id="conservation">
          <div className="flex items-center gap-3 absolute top-6 left-5 sm:top-8 sm:left-8 md:left-16 z-10">
            <div style={{ height: "1px", width: "24px", background: accent }} />
            <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.4em", color: accent, textTransform: "uppercase" }}>04 — Conservation</span>
          </div>
          {/* ── Previous Restoration — first slide of conservation ── */}
          <PreviousRestorationSection />
          {/* ── Mechanical Cleaning ── */}
          <MechanicalCleaningSection />
          {/* ── Cleaning Stages of the Greased Mashrabiya ── */}
          <GreasedCleaningSection />
          {/* ── Wood Consolidation ── */}
          <ConsolidationSection />
          {/* ── Assembly with Falling Turnery Parts ── */}
          <AssemblySection />
          {/* ── Assembly of Empty Frame ── */}
          <EmptyFrameAssemblySection />
          {/* ── Assembly Consolidation ── */}
          <AssemblyConsolidationSection />
          {/* ── Completion of Wooden Beams for Both Mashrabiyas ── */}
          <CompletionSection />
          {/* ── Completion of Wooden Beams — Section 2 ── */}
          <CompletionSection2 />
          {/* ── Assembly of Turnery for Both Mashrabiyas ── */}
          <MashrabiyaAssemblySection />
          {/* ── Assembly of Turnery — slide 2 ── */}
          <MashrabiyaAssemblySection2 />
          {/* ── Assembly of Turnery — slide 3 ── */}
          <MashrabiyaAssemblySection3 />

          {/* ── Painting Layers Gallery ── */}
          <div className="w-screen bg-background border-t border-foreground/5 py-20 px-5 sm:px-8 md:px-16">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-12">
              <div style={{ height: "1px", width: "24px", background: accent }} />
              <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.4em", color: accent, textTransform: "uppercase" }}>
                04 — Conservation · Painting Layers
              </span>
            </div>

            <div className="w-full max-w-[1300px] mx-auto">
              {/* Title */}
              <div className="text-center mb-12 space-y-3">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-headline font-bold leading-tight text-foreground">
                  Painting <span style={{ color: accent, fontStyle: "italic" }}>Layers</span>
                </h2>
                <div style={{ height: "2px", width: "48px", background: `rgba(${accentRgb},0.35)`, borderRadius: "2px", margin: "0 auto" }} />
              </div>

              {/* 6-image grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "/images/painting/layers/WhatsApp Image 2026-06-07 at 11.52.45 AM.jpeg",
                  "/images/painting/layers/WhatsApp Image 2026-06-07 at 11.52.45 AM (1).jpeg",
                  "/images/painting/layers/WhatsApp Image 2026-06-07 at 11.52.45 AM (2).jpeg",
                  "/images/painting/layers/WhatsApp Image 2026-06-07 at 11.52.46 AM.jpeg",
                  "/images/painting/layers/WhatsApp Image 2026-06-07 at 11.52.46 AM (1).jpeg",
                  "/images/painting/layers/WhatsApp Image 2026-06-07 at 11.52.46 AM (2).jpeg",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative w-full rounded-[1.5rem] overflow-hidden shadow-xl"
                    style={{
                      border: "1px solid rgba(201,168,76,0.15)",
                      aspectRatio: "4/3",
                      background: "#f5f2ec",
                    }}
                  >
                    <Image
                      src={src}
                      alt={`طبقة الدهان ${i + 1}`}
                      fill
                      className="object-cover"
                      quality={100}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* subtle gold bottom glow */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(201,168,76,0.08) 0%, transparent 35%)",
                      pointerEvents: "none",
                    }} />
                    {/* layer badge */}
                    <div style={{
                      position: "absolute", bottom: "0.9rem", left: "1rem",
                      zIndex: 3, display: "flex", alignItems: "center", gap: "8px",
                    }}>
                      <div style={{ height: "1px", width: "12px", background: "#C9A84C", opacity: 0.7 }} />
                      <span style={{
                        fontSize: "7px", fontFamily: "monospace",
                        letterSpacing: "0.4em", textTransform: "uppercase",
                        color: "#C9A84C", opacity: 0.85,
                      }}>
                        Layer_{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Mashrabiya Painting with AI — Unit 2 ── */}
          <div className="min-h-screen w-screen bg-background border-t border-foreground/5 flex flex-col items-center justify-center py-16 px-5 sm:px-8 md:px-16">

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12">
              <div className="flex items-center gap-3 mb-3">
                <div style={{ height: "1px", width: "24px", background: `rgba(${accentRgb},0.45)` }} />
                <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.45em", color: accent, textTransform: "uppercase" }}>
                  04 — Conservation · Painting
                </span>
                <div style={{ height: "1px", width: "24px", background: `rgba(${accentRgb},0.45)` }} />
              </div>
              <h2 className="font-headline font-bold" style={{
                fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: "#1a1400",
                lineHeight: 1.12, letterSpacing: "-0.01em",
              }}>
                Mashrabiya Painting{" "}
                <span style={{ color: accent, fontStyle: "italic" }}>with AI</span>
              </h2>
              <div style={{ marginTop: "14px", height: "2px", width: "56px", background: `rgba(${accentRgb},0.5)`, borderRadius: "2px" }} />
            </div>

            {/* Image */}
            <div style={{ maxWidth: "860px", width: "100%" }}>
              <div style={{
                borderRadius: "1.25rem",
                overflow: "hidden",
                border: `1px solid rgba(${accentRgb},0.18)`,
                boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
                background: "#faf8f2",
                width: "100%",
              }}>
                <img
                  src="/images/painting/Frame 18 (1).png"
                  alt="Mashrabiya Painting with AI — Unit 2"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>

          </div>

          {/* ── Mashrabiya Painting with AI — Unit 1 ── */}
          <div className="min-h-screen w-screen bg-background border-t border-foreground/5 flex flex-col items-center justify-center py-16 px-5 sm:px-8 md:px-16">

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12">
              <div className="flex items-center gap-3 mb-3">
                <div style={{ height: "1px", width: "24px", background: `rgba(${accentRgb},0.45)` }} />
                <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.45em", color: accent, textTransform: "uppercase" }}>
                  04 — Conservation · Painting
                </span>
                <div style={{ height: "1px", width: "24px", background: `rgba(${accentRgb},0.45)` }} />
              </div>
              <h2 className="font-headline font-bold" style={{
                fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: "#1a1400",
                lineHeight: 1.12, letterSpacing: "-0.01em",
              }}>
                Mashrabiya Painting{" "}
                <span style={{ color: accent, fontStyle: "italic" }}>with AI</span>
              </h2>
              <div style={{ marginTop: "14px", height: "2px", width: "56px", background: `rgba(${accentRgb},0.5)`, borderRadius: "2px" }} />
            </div>

            {/* Image */}
            <div style={{ maxWidth: "860px", width: "100%" }}>
              <div style={{
                borderRadius: "1.25rem",
                overflow: "hidden",
                border: `1px solid rgba(${accentRgb},0.18)`,
                boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
                background: "#faf8f2",
                width: "100%",
              }}>
                <img
                  src="/images/painting/Frame 17.png"
                  alt="Mashrabiya Painting with AI — Unit 1"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>

          </div>

          {/* ── Project Cost — last section inside conservation ── */}
          <ProjectCostSection />

          {/* ── Acknowledgements — final section inside conservation ── */}
          <AcknowledgementsSection />

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
