"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

const ZOOM = 4;
const LENS_SIZE = 180; // px

// ── helpers: compute the actual rendered rect of an img with objectFit:contain ─
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

// ── Corner brackets around lens ───────────────────────────────────────────────
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

// ── Data ─────────────────────────────────────────────────────────────────────
const mainImage = {
  src: "/images/conservation/previous-restoration/prev_3.jpg",
  alt: "Previous Restoration — Main",
  idx: 0,
};

const sideImages = [
  { src: "/images/conservation/previous-restoration/prev_1.jpg", alt: "Previous Restoration — Detail 1", idx: 1 },
  { src: "/images/conservation/previous-restoration/prev_2.jpg", alt: "Previous Restoration — Detail 2", idx: 2 },
];

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Photo card ────────────────────────────────────────────────────────────────
function PhotoCard({
  img,
  sectionVisible,
  enableZoom = false,
  style: extraStyle = {},
}: {
  img: { src: string; alt: string; idx: number };
  sectionVisible: boolean;
  enableZoom?: boolean;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const delay = 0.12 + img.idx * 0.1;

  // load natural image dimensions once
  useEffect(() => {
    if (!enableZoom) return;
    const i = new window.Image();
    i.onload = () => setNatural({ w: i.naturalWidth, h: i.naturalHeight });
    i.src = img.src;
  }, [img.src, enableZoom]);

  // track container size
  useEffect(() => {
    if (!enableZoom) return;
    const measure = () => {
      if (containerRef.current) {
        setContainerSize({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [enableZoom]);

  const updatePos = useCallback((clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: Math.max(0, Math.min(r.width,  clientX - r.left)),
      y: Math.max(0, Math.min(r.height, clientY - r.top)),
    });
  }, []);

  const onMouseMove  = useCallback((e: React.MouseEvent) => updatePos(e.clientX, e.clientY), [updatePos]);
  const onTouchMove  = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    updatePos(e.touches[0].clientX, e.touches[0].clientY);
  }, [updatePos]);

  // ── compute lens background ─────────────────────────────────────────────────
  let lensBg: React.CSSProperties = {};
  if (enableZoom && natural.w && containerSize.w) {
    const rect = getContainedRect(containerSize.w, containerSize.h, natural.w, natural.h);
    // position relative to the rendered image area
    const relX = pos.x - rect.x;
    const relY = pos.y - rect.y;
    // zoomed size of the rendered image
    const bsW = rect.w * ZOOM;
    const bsH = rect.h * ZOOM;
    // shift so the cursor point lands at lens centre,
    // then offset back for the letterbox padding
    const bpX = -(relX * ZOOM - LENS_SIZE / 2);
    const bpY = -(relY * ZOOM - LENS_SIZE / 2);

    lensBg = {
      backgroundImage: `url(${img.src})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${bsW}px ${bsH}px`,
      backgroundPosition: `${bpX}px ${bpY}px`,
    };
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={enableZoom ? onMouseMove : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchMove={enableZoom ? onTouchMove : undefined}
      onTouchStart={enableZoom ? (e) => { setHovered(true); updatePos(e.touches[0].clientX, e.touches[0].clientY); } : undefined}
      onTouchEnd={enableZoom ? () => setHovered(false) : undefined}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible
          ? hovered ? "scale(1.01)" : "scale(1)"
          : "scale(0.96) translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${sectionVisible && !hovered ? delay : 0}s,
                     box-shadow 0.3s ease, border-color 0.3s ease`,
        border: hovered ? `1.5px solid rgba(${accentRgb},0.5)` : `1px solid rgba(${accentRgb},0.14)`,
        boxShadow: hovered
          ? `0 20px 56px rgba(0,0,0,0.24), 0 0 32px rgba(${accentRgb},0.08)`
          : `0 4px 20px rgba(0,0,0,0.1)`,
        cursor: enableZoom ? "crosshair" : "default",
        background: "#0e0c08",
        ...extraStyle,
      }}
    >
      {/* Base image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={img.alt}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "linear-gradient(to top, rgba(8,6,0,0.7) 0%, rgba(8,6,0,0.05) 35%, transparent 55%)"
          : "linear-gradient(to top, rgba(8,6,0,0.45) 0%, rgba(8,6,0,0.02) 40%, transparent 60%)",
        transition: "background 0.4s ease", pointerEvents: "none", zIndex: 2,
      }} />

      {/* Gold glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 115%, rgba(${accentRgb},0.16) 0%, transparent 55%)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none", zIndex: 2,
      }} />

      {/* Badge */}
      <div style={{
        position: "absolute", top: "12px", left: "12px", zIndex: 6,
        background: hovered ? `rgba(${accentRgb},0.92)` : "rgba(8,6,0,0.55)",
        border: `1px solid rgba(${accentRgb},${hovered ? 0 : 0.3})`,
        borderRadius: "20px", padding: "4px 10px",
        fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.16em",
        color: hovered ? "#0a0800" : accent, fontWeight: 700,
        transition: "background 0.3s, color 0.3s, border-color 0.3s",
      }}>
        {String(img.idx + 1).padStart(2, "0")}
      </div>

      {/* ── Zoom Lens ── */}
      {enableZoom && (
        <>
          {/* Lens — bg computed directly here, no child component */}
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
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.12) 100%)" }} />
        </>
      )}
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ visible }: { visible: boolean }) {
  return (
    <div
      className="flex flex-col items-center text-center mb-12"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
        <div style={{ height: "1px", width: "32px", background: `linear-gradient(to right, transparent, rgba(${accentRgb},0.5))` }} />
        <svg width="8" height="8" viewBox="0 0 10 10" style={{ opacity: 0.6 }}>
          <polygon points="5,0 10,5 5,10 0,5" fill={accent} />
        </svg>
        <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.46em", color: accent, textTransform: "uppercase" }}>
          04 — Conservation · Section I
        </span>
        <svg width="8" height="8" viewBox="0 0 10 10" style={{ opacity: 0.6 }}>
          <polygon points="5,0 10,5 5,10 0,5" fill={accent} />
        </svg>
        <div style={{ height: "1px", width: "32px", background: `linear-gradient(to left, transparent, rgba(${accentRgb},0.5))` }} />
      </div>

      <h2
        className="font-headline font-bold"
        style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: "#1a1400", lineHeight: 1.12 }}
      >
        Previous{" "}
        <span style={{ color: accent, fontStyle: "italic" }}>Restoration</span>
      </h2>

      <div style={{ marginTop: "12px", height: "1px", width: "52px", background: `rgba(${accentRgb},0.3)` }} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════════════════════════════════════════════
export function PreviousRestorationSection() {
  const { ref, visible } = useReveal(0.08);

  return (
    <div
      ref={ref}
      className="w-full py-16 px-5 sm:px-8 md:px-14"
      style={{ background: "#faf8f4", borderTop: "1px solid rgba(201,168,76,0.1)" }}
    >
      <SectionHeader visible={visible} />

      {/*
        Layout:
        ┌──────────────────┬──────────┐
        │                  │  prev_1  │
        │     prev_3       ├──────────┤
        │   (full height)  │  prev_2  │
        └──────────────────┴──────────┘
        Left column = 2/3 width, right column = 1/3 width
        Right column split into two equal rows
      */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gridTemplateRows: `clamp(260px, 45vh, 520px) clamp(260px, 45vh, 520px)`,
          gap: "20px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Large image — spans both rows on the left */}
        <div style={{ gridRow: "1 / 3" }}>
          <PhotoCard img={mainImage} sectionVisible={visible} enableZoom={true} />
        </div>

        {/* Two smaller images stacked on the right */}
        {sideImages.map((img) => (
          <PhotoCard key={img.src} img={img} sectionVisible={visible} enableZoom={false} />
        ))}
      </div>

      {/* Bottom rule */}
      <div
        style={{
          marginTop: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          opacity: visible ? 0.2 : 0,
          transition: "opacity 0.9s ease 0.8s",
        }}
      >
        <div style={{ height: "1px", flex: 1, maxWidth: "90px", background: `rgba(${accentRgb},1)` }} />
        <span style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.44em", color: "#1a1400", textTransform: "uppercase" }}>
          Phase_IV · Prior_Intervention_Record
        </span>
        <div style={{ height: "1px", flex: 1, maxWidth: "90px", background: `rgba(${accentRgb},1)` }} />
      </div>
    </div>
  );
}
