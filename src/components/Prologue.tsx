"use client";

import { useEffect, useState } from "react";
import { ComparisonSlider } from "@/components/BeforeAfterSection";
import { VisualizationSection } from "@/components/VisualizationSection";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

export function Prologue() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="h-full w-full relative overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(160deg, #0a0800 0%, #120f00 50%, #0a0800 100%)" }}>

      {/* Mashrabiya texture overlay */}
      <div className="absolute inset-0 mashrabiya-overlay" style={{ opacity: 0.07 }} />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(201,168,76,0.06) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: accent }} />

      {/* ── MOBILE: single slider + centered text overlay ── */}
      <div className="relative z-10 w-full h-full flex md:hidden flex-col items-center justify-center px-6 py-16">
        {/* Full slider visible */}
        <div className="absolute inset-0 z-0">
          <ComparisonSlider
            beforeImg="/images/slide4/before.jpg"
            afterImg="/images/slide4/after.jpg"
            title=""
          />
        </div>
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(10,8,0,0.7) 0%, rgba(10,8,0,0.5) 40%, rgba(10,8,0,0.7) 100%)" }} />

        <div
          className="relative z-10 flex flex-col items-center text-center"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(30px)",
            transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div style={{ height: "1px", width: "20px", background: `rgba(${accentRgb},0.6)` }} />
            <span style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.45em", color: accent, textTransform: "uppercase", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>Digital Museum & Archive</span>
            <div style={{ height: "1px", width: "20px", background: `rgba(${accentRgb},0.6)` }} />
          </div>

          <h1 className="font-headline font-bold leading-[0.88]"
            style={{ fontSize: "clamp(3rem, 15vw, 4.5rem)", color: "#fff", marginBottom: "20px", textShadow: "0 4px 20px rgba(0,0,0,0.9)" }}>
            MASHRABIYA
          </h1>

          <div style={{ height: "1px", width: "40px", background: `rgba(${accentRgb},0.5)`, margin: "0 auto 20px" }} />

          <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.8, fontSize: "0.85rem", maxWidth: "300px", fontWeight: 400, textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
            A scientific study in the conservation and characterization of traditional Mashrabiya units.
          </p>

          <div className="flex items-center gap-5 mt-8">
            {[{ v: "02", l: "Units" }, { v: "3", l: "Phases" }, { v: "12th C.", l: "Origin" }].map((s, i) => (
              <div key={i} className="flex items-center gap-5">
                {i > 0 && <div style={{ height: "24px", width: "1px", background: "rgba(255,255,255,0.15)" }} />}
                <div className="text-center">
                  <p className="font-headline font-bold" style={{ fontSize: "1.3rem", color: accent, lineHeight: 1, textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>{s.v}</p>
                  <p style={{ fontSize: "6px", fontFamily: "monospace", letterSpacing: "0.3em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginTop: "4px" }}>{s.l}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-2"
            style={{ opacity: entered ? 0.6 : 0, transition: "opacity 1s ease 1.5s" }}>
            <p style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.5em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>Scroll to Explore</p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: three-column layout ── */}
      <div className="relative z-10 w-full h-full hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-0"
        style={{ padding: "40px 80px" }}>

        {/* ── LEFT — M1 Before/After ComparisonSlider ── */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            height: "calc(100% - 0px)",
            opacity: entered ? 1 : 0,
            transform: entered ? "translateX(0)" : "translateX(-60px)",
            transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          <div className="absolute inset-0 z-10 pointer-events-none" style={{
            background: "linear-gradient(to right, rgba(10,8,0,0.98) 0%, rgba(10,8,0,0.2) 25%, transparent 55%)",
          }} />
          <div className="absolute inset-0 z-10 pointer-events-none" style={{
            background: "linear-gradient(to bottom, rgba(10,8,0,0.7) 0%, transparent 15%, transparent 80%, rgba(10,8,0,0.8) 100%)",
          }} />
          <div className="absolute inset-0 z-0 [&>div]:h-full [&>div>div]:h-full [&>div>div]:aspect-auto">
            <ComparisonSlider
              beforeImg="/images/hero/M1_befor.jpeg"
              afterImg="/images/hero/M1_After.jpeg"
              title=""
            />
          </div>
        </div>

        {/* ── CENTER TEXT ── */}
        <div
          className="flex flex-col items-center justify-center text-center px-12 py-8 z-20 flex-shrink-0"
          style={{
            width: "clamp(300px, 36vw, 520px)",
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(30px)",
            transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div style={{ height: "1px", width: "28px", background: `rgba(${accentRgb},0.4)` }} />
            <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.55em", color: accent, textTransform: "uppercase" }}>Digital Museum & Archive</span>
            <div style={{ height: "1px", width: "28px", background: `rgba(${accentRgb},0.4)` }} />
          </div>

          <h1 className="font-headline font-bold leading-[0.88]"
            style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)", color: "#fff", marginBottom: "24px" }}>
            MASHRABIYA
          </h1>

          <div style={{ height: "1px", width: "48px", background: `rgba(${accentRgb},0.3)`, margin: "0 auto 24px" }} />

          <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.85, fontSize: "0.82rem", maxWidth: "320px", fontWeight: 300 }}>
            A scientific study in the conservation and characterization of traditional Mashrabiya units. Bridging historical craftsmanship with digital forensic recording.
          </p>

          <div className="flex items-center gap-6 mt-10">
            {[{ v: "02", l: "Units" }, { v: "3", l: "Phases" }, { v: "12th C.", l: "Origin" }].map((s, i) => (
              <div key={i} className="flex items-center gap-6">
                {i > 0 && <div style={{ height: "28px", width: "1px", background: "rgba(255,255,255,0.08)" }} />}
                <div className="text-center">
                  <p className="font-headline font-bold" style={{ fontSize: "1.4rem", color: accent, lineHeight: 1 }}>{s.v}</p>
                  <p style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginTop: "4px" }}>{s.l}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-2"
            style={{ opacity: entered ? 0.4 : 0, transition: "opacity 1s ease 1.5s", animation: entered ? "bounce 2s infinite 2s" : "none" }}>
            <p style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.5em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Scroll to Explore</p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>

        {/* ── RIGHT — ComparisonSlider copy 2 ── */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            height: "calc(100% - 0px)",
            opacity: entered ? 1 : 0,
            transform: entered ? "translateX(0)" : "translateX(60px)",
            transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          <div className="absolute inset-0 z-10 pointer-events-none" style={{
            background: "linear-gradient(to left, rgba(10,8,0,0.98) 0%, rgba(10,8,0,0.2) 25%, transparent 55%)",
          }} />
          <div className="absolute inset-0 z-10 pointer-events-none" style={{
            background: "linear-gradient(to bottom, rgba(10,8,0,0.7) 0%, transparent 15%, transparent 80%, rgba(10,8,0,0.8) 100%)",
          }} />
          <div className="absolute inset-0 z-0 [&>div]:h-full [&>div>div]:h-full [&>div>div]:aspect-auto">
            <ComparisonSlider beforeImg="/images/slide4/before.jpg" afterImg="/images/hero/M1_painted.jpeg" title="" />
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: `rgba(${accentRgb},0.15)` }} />
    </div>
  );
}

/**
 * Extended Prologue section with 3D visualization
 * Includes interactive 3D models, comparisons, and 2D patterns
 */
export function PrologueWith3D() {
  return (
    <div className="w-full">
      <Prologue />
      
      {/* 3D Visualization Section */}
      <VisualizationSection
        title="Interactive 3D & 2D Visualization"
        description="Explore the Mashrabiya in three dimensions. Rotate, zoom, and examine the before/after conservation process with interactive controls."
        model3DPath="/models/mashrabiya.glb"
        image2DPath="/images/slide2-geo/ميموني عدل.jpeg"
        patternType="geometric"
        defaultMode="combined"
        height="700px"
      />
    </div>
  );
}
