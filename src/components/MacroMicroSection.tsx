"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

interface MacroMicroSectionProps {
  macroImg: string;
  microImg: string;
  title: string;
  subtitle: string;
  macroLabel: string;
  microLabel: string;
}

const ZOOM = 4;
const LENS_SIZE = 180; // px

// ── helpers: compute actual rendered rect of backgroundSize:contain ──────────
function getContainedRect(
  containerW: number,
  containerH: number,
  naturalW: number,
  naturalH: number
): { x: number; y: number; w: number; h: number } {
  const containerRatio = containerW / containerH;
  const imageRatio = naturalW / naturalH;
  let w: number, h: number;
  if (imageRatio > containerRatio) {
    w = containerW;
    h = containerW / imageRatio;
  } else {
    h = containerH;
    w = containerH * imageRatio;
  }
  return { x: (containerW - w) / 2, y: (containerH - h) / 2, w, h };
}

function CornerBrackets({ x, y, size }: { x: number; y: number; size: number }) {
  const half = size / 2 + 6;
  const s = 16;
  const t = 2;
  const c = accent;
  const corners = [
    { top: y - half,     left: x - half,     borderTop: `${t}px solid ${c}`, borderLeft:    `${t}px solid ${c}` },
    { top: y - half,     left: x + half - s, borderTop: `${t}px solid ${c}`, borderRight:   `${t}px solid ${c}` },
    { top: y + half - s, left: x - half,     borderBottom: `${t}px solid ${c}`, borderLeft: `${t}px solid ${c}` },
    { top: y + half - s, left: x + half - s, borderBottom: `${t}px solid ${c}`, borderRight:`${t}px solid ${c}` },
  ];
  return (
    <>
      {corners.map((style, i) => (
        <div key={i} style={{ position: "absolute", width: s, height: s, pointerEvents: "none", zIndex: 11, ...style }} />
      ))}
    </>
  );
}

function MashrabiyaPanel({
  image,
  label,
  tag,
}: {
  image: string;
  label: string;
  tag: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  // load natural image dimensions once
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = image;
  }, [image]);

  // track container size — use ResizeObserver so we catch visibility changes too
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      setContainerSize({ w: el.offsetWidth, h: el.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const updatePos = useCallback((clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: Math.max(0, Math.min(r.width,  clientX - r.left)),
      y: Math.max(0, Math.min(r.height, clientY - r.top)),
    });
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => updatePos(e.clientX, e.clientY), [updatePos]);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    updatePos(e.touches[0].clientX, e.touches[0].clientY);
  }, [updatePos]);

  // ── compute lens background directly (no nested component) ─────────────────
  let lensBg: React.CSSProperties = {};
  if (natural.w && containerSize.w) {
    const rect = getContainedRect(containerSize.w, containerSize.h, natural.w, natural.h);
    const relX = pos.x - rect.x;
    const relY = pos.y - rect.y;
    const bsW = rect.w * ZOOM;
    const bsH = rect.h * ZOOM;
    const bpX = -(relX * ZOOM - LENS_SIZE / 2);
    const bpY = -(relY * ZOOM - LENS_SIZE / 2);
    lensBg = {
      backgroundImage: `url(${image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${bsW}px ${bsH}px`,
      backgroundPosition: `${bpX}px ${bpY}px`,
    };
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", flex: "1 1 0", minWidth: 0 }}>
      {/* tag */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ height: "1px", width: "20px", background: `rgba(${accentRgb},0.4)` }} />
        <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.45em", textTransform: "uppercase", color: `rgba(${accentRgb},0.7)` }}>
          {tag}
        </span>
      </div>

      {/* image container */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "133%" }}>
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchMove={onTouchMove}
          onTouchStart={(e) => { setHovered(true); updatePos(e.touches[0].clientX, e.touches[0].clientY); }}
          onTouchEnd={() => setHovered(false)}
          style={{
            position: "absolute", inset: 0,
            borderRadius: "1.75rem",
            border: `1px solid rgba(${accentRgb},${hovered ? "0.45" : "0.15"})`,
            overflow: "hidden",
            cursor: "crosshair",
            boxShadow: hovered
              ? `0 24px 64px rgba(0,0,0,0.28), 0 0 0 1.5px rgba(${accentRgb},0.35)`
              : "0 8px 32px rgba(0,0,0,0.15)",
            transition: "box-shadow 0.35s ease, border-color 0.35s ease",
            background: "#f5f2ec",
          }}
        >
          {/* Base image as background */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }} />

          {/* Lens — bg computed directly on this element */}
          <div style={{
            position: "absolute",
            width: LENS_SIZE,
            height: LENS_SIZE,
            borderRadius: "50%",
            left: pos.x - LENS_SIZE / 2,
            top:  pos.y - LENS_SIZE / 2,
            overflow: "hidden",
            border: `2px solid rgba(${accentRgb},0.9)`,
            boxShadow: `0 0 0 1px rgba(${accentRgb},0.25), 0 8px 28px rgba(0,0,0,0.55)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.18s ease",
            pointerEvents: "none",
            zIndex: 10,
            ...lensBg,
          }}>
            {/* Crosshair */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: `rgba(${accentRgb},0.5)`, transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: `rgba(${accentRgb},0.5)`, transform: "translateX(-50%)" }} />
            </div>
          </div>

          {/* Corner brackets */}
          {hovered && <CornerBrackets x={pos.x} y={pos.y} size={LENS_SIZE} />}

          {/* Hint badge */}
          <div style={{
            position: "absolute", bottom: 12, right: 12,
            background: "rgba(10,8,0,0.55)",
            border: `1px solid rgba(${accentRgb},0.3)`,
            borderRadius: "8px", padding: "4px 10px",
            backdropFilter: "blur(8px)", zIndex: 5, pointerEvents: "none",
          }}>
            <span style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.35em", textTransform: "uppercase", color: `rgba(${accentRgb},0.85)` }}>
              {hovered ? `×${ZOOM} ZOOM` : "HOVER TO ZOOM"}
            </span>
          </div>

          {/* Vignette */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.12) 100%)" }} />
        </div>
      </div>

      {/* label */}
      <p style={{ textAlign: "center", fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.35em", textTransform: "uppercase", color: `rgba(${accentRgb},0.6)` }}>
        {label}
      </p>
    </div>
  );
}

// ── Entrance animation ───────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export function MacroMicroSection({ title, subtitle }: MacroMicroSectionProps) {
  return (
    <section className="w-full bg-background py-20 px-5 sm:px-8 md:px-14">
      {/* Header */}
      <Reveal>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ height: "1px", width: "28px", background: `rgba(${accentRgb},0.35)` }} />
            <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.45em", color: accent, textTransform: "uppercase" }}>
              {subtitle}
            </span>
            <div style={{ height: "1px", width: "28px", background: `rgba(${accentRgb},0.35)` }} />
          </div>
          <h2 className="font-headline font-bold" style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", color: "#1a1400", lineHeight: 1.12, letterSpacing: "-0.01em" }}>
            Macro to Micro{" "}
            <span style={{ color: accent, fontStyle: "italic" }}>Visualization</span>
          </h2>
          <div style={{ marginTop: "14px", height: "1px", width: "56px", background: `rgba(${accentRgb},0.3)`, borderRadius: "2px" }} />
          <p style={{ marginTop: "10px", fontSize: "11px", color: "rgba(0,0,0,0.38)", letterSpacing: "0.04em" }}>
            Hover over each image to magnify and inspect damage signs
          </p>
        </div>
      </Reveal>

      {/* Two equal panels */}
      <Reveal delay={0.15}>
        <div style={{ display: "flex", gap: "2.5rem", maxWidth: "960px", margin: "0 auto", alignItems: "flex-start" }}
          className="flex-col sm:flex-row">
          <MashrabiyaPanel
            image="/images/documentation/macro/mashrabiya-ungreased.jpeg"
            label="Mashrabiya — Ungreased"
            tag="Unit 01"
          />
          <MashrabiyaPanel
            image="/images/documentation/macro/mashrabiya-greased.jpeg"
            label="Mashrabiya — Greased"
            tag="Unit 02"
          />
        </div>
      </Reveal>

      {/* Bottom rule */}
      <Reveal delay={0.3}>
        <div style={{ marginTop: "48px", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", opacity: 0.22 }}>
          <div style={{ height: "1px", flex: 1, maxWidth: "100px", background: `rgba(${accentRgb},1)` }} />
          <span style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.45em", color: "#1a1400", textTransform: "uppercase" }}>
            Phase_II · Photographic_Documentation
          </span>
          <div style={{ height: "1px", flex: 1, maxWidth: "100px", background: `rgba(${accentRgb},1)` }} />
        </div>
      </Reveal>
    </section>
  );
}
