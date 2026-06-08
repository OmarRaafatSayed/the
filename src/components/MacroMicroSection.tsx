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
  // raw pixel coords relative to the container
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

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
  const onTouchMove  = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    updatePos(e.touches[0].clientX, e.touches[0].clientY);
  }, [updatePos]);

  // background-position for the zoomed image inside the lens:
  // When the lens centre is at (px, py) inside a container of (W, H),
  // we want the zoom image (ZOOM * W  ×  ZOOM * H) to be shifted so that
  // point (px*ZOOM, py*ZOOM) lands at the centre of the lens.
  const bgX = -(pos.x * ZOOM - LENS_SIZE / 2);
  const bgY = -(pos.y * ZOOM - LENS_SIZE / 2);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", flex: "1 1 0", minWidth: 0 }}>
      {/* tag */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ height: "1px", width: "20px", background: `rgba(${accentRgb},0.4)` }} />
        <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.45em", textTransform: "uppercase", color: `rgba(${accentRgb},0.7)` }}>
          {tag}
        </span>
      </div>

      {/* image container — fixed square via paddingBottom trick so both panels are identical */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "133%"/* 3:4 */ }}>
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
          {/* ── BASE IMAGE via background-image so we keep full quality without Next/Image cropping issues ── */}
          <div
            style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />

          {/* ── LENS ── */}
          <div
            style={{
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
              // zoomed background
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",   // will be overridden below after we know W/H
            }}
          >
            {/* We use a child div with exact background-size to zoom */}
            <ZoomedView image={image} bgX={bgX} bgY={bgY} containerRef={containerRef} lensSize={LENS_SIZE} />

            {/* crosshair */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: `rgba(${accentRgb},0.5)`, transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: `rgba(${accentRgb},0.5)`, transform: "translateX(-50%)" }} />
            </div>
          </div>

          {/* corner brackets around the lens */}
          {hovered && (
            <CornerBrackets x={pos.x} y={pos.y} size={LENS_SIZE} />
          )}

          {/* hint badge */}
          <div style={{
            position: "absolute", bottom: 12, right: 12,
            background: "rgba(10,8,0,0.55)",
            border: `1px solid rgba(${accentRgb},0.3)`,
            borderRadius: "8px", padding: "4px 10px",
            backdropFilter: "blur(8px)", zIndex: 5, pointerEvents: "none",
            transition: "opacity 0.2s",
          }}>
            <span style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.35em", textTransform: "uppercase", color: `rgba(${accentRgb},0.85)` }}>
              {hovered ? `×${ZOOM} ZOOM` : "HOVER TO ZOOM"}
            </span>
          </div>

          {/* vignette */}
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

// Zoomed content inside the lens — uses background-size in px once we know the container size
function ZoomedView({
  image, bgX, bgY, containerRef, lensSize,
}: {
  image: string;
  bgX: number;
  bgY: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  lensSize: number;
}) {
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setDims({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [containerRef]);

  if (!dims.w || !dims.h) return null;

  // The base image is rendered with background-size:contain inside (dims.w × dims.h).
  // We need to know the actual rendered image rect (letterboxed).
  // Assume image natural ratio close to the container — we'll use the full container dims
  // scaled by ZOOM, offset so the hovered point appears at lens centre.
  return (
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `url(${image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${dims.w * ZOOM}px ${dims.h * ZOOM}px`,
      backgroundPosition: `${bgX}px ${bgY}px`,
      imageRendering: "auto",
    }} />
  );
}

function CornerBrackets({ x, y, size }: { x: number; y: number; size: number }) {
  const half = size / 2 + 6;
  const s = 16;
  const t = 2;
  const c = accent;
  const corners = [
    { top: y - half,        left: x - half,        borderTop: `${t}px solid ${c}`, borderLeft:   `${t}px solid ${c}` },
    { top: y - half,        left: x + half - s,     borderTop: `${t}px solid ${c}`, borderRight:  `${t}px solid ${c}` },
    { top: y + half - s,    left: x - half,        borderBottom:`${t}px solid ${c}`, borderLeft:  `${t}px solid ${c}` },
    { top: y + half - s,    left: x + half - s,    borderBottom:`${t}px solid ${c}`, borderRight: `${t}px solid ${c}` },
  ];
  return (
    <>
      {corners.map((style, i) => (
        <div key={i} style={{ position: "absolute", width: s, height: s, pointerEvents: "none", zIndex: 11, ...style }} />
      ))}
    </>
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
