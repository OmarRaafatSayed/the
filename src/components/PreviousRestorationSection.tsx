"use client";

import React, { useState, useEffect, useRef } from "react";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

// ── Data ─────────────────────────────────────────────────────────────────────
// Layout: [prev_3 large left] | [prev_1 top-right, prev_2 bottom-right]
const mainImage = {
  src: "/images/conservation/previous-restoration/prev_3.jpg",
  alt: "Previous Restoration — Main",
  idx: 0,
};

const sideImages = [
  {
    src: "/images/conservation/previous-restoration/prev_1.jpg",
    alt: "Previous Restoration — Detail 1",
    idx: 1,
  },
  {
    src: "/images/conservation/previous-restoration/prev_2.jpg",
    alt: "Previous Restoration — Detail 2",
    idx: 2,
  },
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
  style: extraStyle = {},
}: {
  img: { src: string; alt: string; idx: number };
  sectionVisible: boolean;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.12 + img.idx * 0.1;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        border: hovered
          ? `1.5px solid rgba(${accentRgb},0.5)`
          : `1px solid rgba(${accentRgb},0.14)`,
        boxShadow: hovered
          ? `0 20px 56px rgba(0,0,0,0.24), 0 0 32px rgba(${accentRgb},0.08)`
          : `0 4px 20px rgba(0,0,0,0.1)`,
        cursor: "default",
        background: "#0e0c08",
        ...extraStyle,
      }}
    >
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
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(8,6,0,0.7) 0%, rgba(8,6,0,0.05) 35%, transparent 55%)"
            : "linear-gradient(to top, rgba(8,6,0,0.45) 0%, rgba(8,6,0,0.02) 40%, transparent 60%)",
          transition: "background 0.4s ease",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Gold glow on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 115%, rgba(${accentRgb},0.16) 0%, transparent 55%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Badge */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          zIndex: 6,
          background: hovered ? `rgba(${accentRgb},0.92)` : "rgba(8,6,0,0.55)",
          border: `1px solid rgba(${accentRgb},${hovered ? 0 : 0.3})`,
          borderRadius: "20px",
          padding: "4px 10px",
          fontSize: "9px",
          fontFamily: "monospace",
          letterSpacing: "0.16em",
          color: hovered ? "#0a0800" : accent,
          fontWeight: 700,
          transition: "background 0.3s, color 0.3s, border-color 0.3s",
        }}
      >
        {String(img.idx + 1).padStart(2, "0")}
      </div>
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
          <PhotoCard img={mainImage} sectionVisible={visible} />
        </div>

        {/* Two smaller images stacked on the right */}
        {sideImages.map((img) => (
          <PhotoCard key={img.src} img={img} sectionVisible={visible} />
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
