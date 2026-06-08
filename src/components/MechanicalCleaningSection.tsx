"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const accent = "#C9A84C";

// ── Data ─────────────────────────────────────────────────────────────────────

const ungeasedFrames = [
  {
    id: "ungreased-1",
    label: "Dust Removal",
    images: [
      { src: "/images/conservation/section_2/Ungreased mashrabiya/Befor.jpeg",   alt: "Before — ungreased" },
      { src: "/images/conservation/section_2/Ungreased mashrabiya/during.jpeg",  alt: "During — ungreased" },
      { src: "/images/conservation/section_2/Ungreased mashrabiya/after.jpeg",   alt: "After — ungreased" },
    ],
  },
  {
    id: "ungreased-2",
    label: "Calcification Removal",
    images: [
      { src: "/images/conservation/section_2/Ungreased mashrabiya/sec2/befor.jpeg",    alt: "Before — ungreased II" },
      { src: "/images/conservation/section_2/Ungreased mashrabiya/sec2/during .jpeg",  alt: "During — ungreased II" },
      { src: "/images/conservation/section_2/Ungreased mashrabiya/sec2/after.jpeg",    alt: "After — ungreased II" },
    ],
  },
];

const greasedFrames = [
  {
    id: "brush-cleaning",
    label: "Brush Cleaning",
    images: [
      { src: "/images/conservation/section_2/greased mashrabiya/The first stage/Brush cleaning/befor.jpeg",                                                          alt: "Before — brush cleaning" },
      { src: "/images/conservation/section_2/greased mashrabiya/The first stage/Brush cleaning/during.jpeg",                                                         alt: "During — brush cleaning" },
      { src: "/images/conservation/section_2/greased mashrabiya/The first stage/Brush cleaning/after.jpeg",                                                          alt: "After — brush cleaning" },
      { src: "/images/conservation/section_2/greased mashrabiya/The first stage/Water compresses to remove calcifications/befor1.jpeg",                              alt: "Before — water compresses" },
      { src: "/images/conservation/section_2/greased mashrabiya/The first stage/Water compresses to remove calcifications/during.jpeg",                              alt: "During — water compresses" },
      { src: "/images/conservation/section_2/greased mashrabiya/The first stage/Water compresses to remove calcifications/after.jpeg",                               alt: "After — water compresses" },
      { src: "/images/conservation/section_2/greased mashrabiya/The first stage/Water compresses to remove calcifications/Befor - after.jpeg",                       alt: "Before & After — water compresses" },
    ],
  },
  {
    id: "remove-lacquer",
    label: "Remove Lacquer Layer",
    images: [
      { src: "/images/conservation/section_2/greased mashrabiya/the secound stage- Remove the first layer of lacquer using paint removal material/1.jpeg", alt: "Lacquer removal — step 1" },
      { src: "/images/conservation/section_2/greased mashrabiya/the secound stage- Remove the first layer of lacquer using paint removal material/2.jpeg", alt: "Lacquer removal — step 2" },
      { src: "/images/conservation/section_2/greased mashrabiya/the secound stage- Remove the first layer of lacquer using paint removal material/3.jpeg", alt: "Lacquer removal — step 3" },
      { src: "/images/conservation/section_2/greased mashrabiya/the secound stage- Remove the first layer of lacquer using paint removal material/4.jpeg", alt: "Lacquer removal — step 4" },
    ],
  },
  {
    id: "remover-section",
    label: "Remover Section",
    images: [
      { src: "/images/conservation/section_2/greased mashrabiya/remover-section/1.jpeg", alt: "Remover section — step 1" },
      { src: "/images/conservation/section_2/greased mashrabiya/remover-section/2.jpeg", alt: "Remover section — step 2" },
      { src: "/images/conservation/section_2/greased mashrabiya/remover-section/3.jpeg", alt: "Remover section — step 3" },
      { src: "/images/conservation/section_2/greased mashrabiya/remover-section/4.jpeg", alt: "Remover section — step 4" },
    ],
  },
];

// ── Reusable frame component ──────────────────────────────────────────────────
type FrameData = { id: string; label: string; images: { src: string; alt: string }[] };

function ImageFrame({ frame, sizes }: { frame: FrameData; sizes: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = frame.images.length;

  const prev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const next = () => setActiveIdx((i) => (i + 1) % total);

  return (
    <div className="flex flex-col gap-3" style={{ flex: "1 1 0", minWidth: 0 }}>

      {/* Image viewport */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: "1.25rem",
          border: "1.5px solid rgba(201,168,76,0.18)",
          background: "#f5f2ec",
          aspectRatio: "3 / 4",
          boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
        }}
      >
        {/* Stacked images */}
        {frame.images.map((img, i) => (
          <div
            key={img.src}
            style={{
              position: "absolute",
              inset: 0,
              opacity: activeIdx === i ? 1 : 0,
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1)",
              pointerEvents: "none",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain"
              quality={90}
              sizes={sizes}
            />
          </div>
        ))}

        {/* Gold gradient bottom */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(201,168,76,0.07) 0%, transparent 30%)",
          pointerEvents: "none", zIndex: 2,
        }} />

        {/* Prev arrow */}
        {total > 1 && (
          <button
            onClick={prev}
            aria-label="Previous image"
            style={{
              position: "absolute", left: "8px", top: "50%",
              transform: "translateY(-50%)", zIndex: 4,
              background: "rgba(10,8,0,0.45)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "50%", width: "32px", height: "32px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.85)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,8,0,0.45)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.25)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Next arrow */}
        {total > 1 && (
          <button
            onClick={next}
            aria-label="Next image"
            style={{
              position: "absolute", right: "8px", top: "50%",
              transform: "translateY(-50%)", zIndex: 4,
              background: "rgba(10,8,0,0.45)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "50%", width: "32px", height: "32px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.85)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,8,0,0.45)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.25)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}

        {/* Dots */}
        {total > 1 && (
          <div style={{
            position: "absolute", bottom: "10px", left: "50%",
            transform: "translateX(-50%)", display: "flex", gap: "5px", zIndex: 3,
          }}>
            {frame.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`Go to image ${i + 1}`}
                style={{
                  width: activeIdx === i ? "20px" : "6px",
                  height: "6px", borderRadius: "3px",
                  background: activeIdx === i ? accent : "rgba(201,168,76,0.3)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "width 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.25s ease",
                }}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        <div style={{
          position: "absolute", top: "10px", right: "10px", zIndex: 4,
          background: "rgba(10,8,0,0.5)",
          border: "1px solid rgba(201,168,76,0.2)",
          borderRadius: "20px", padding: "3px 9px",
          fontSize: "9px", fontFamily: "monospace",
          letterSpacing: "0.1em", color: accent,
        }}>
          {activeIdx + 1} / {total}
        </div>
      </div>

      {/* Label */}
      <p style={{
        textAlign: "center", fontSize: "0.65rem",
        fontFamily: "monospace", letterSpacing: "0.2em",
        textTransform: "uppercase", color: accent, opacity: 0.8,
      }}>
        {frame.label}
      </p>
    </div>
  );
}

// ── Reusable section wrapper with entrance animation ─────────────────────────
function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s ease ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Section header helper ─────────────────────────────────────────────────────
function SectionHeader({ tag, title, italic, subtitle }: {
  tag: string;
  title: string;
  italic: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center mb-10">
      <div className="flex items-center gap-3 mb-3">
        <div style={{ height: "1px", width: "24px", background: "rgba(201,168,76,0.45)" }} />
        <span style={{
          fontSize: "8px", fontFamily: "monospace",
          letterSpacing: "0.45em", color: accent, textTransform: "uppercase",
        }}>
          {tag}
        </span>
        <div style={{ height: "1px", width: "24px", background: "rgba(201,168,76,0.45)" }} />
      </div>

      <h2
        className="font-headline font-bold"
        style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", color: "#1a1400", lineHeight: 1.15 }}
      >
        {title}{" "}
        <span style={{ color: accent, fontStyle: "italic" }}>{italic}</span>
      </h2>

      {subtitle && (
        <p style={{ marginTop: "8px", fontSize: "11px", color: "rgba(0,0,0,0.35)", letterSpacing: "0.04em" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — Mechanical Cleaning · Ungreased Mashrabiya (single frame)
// ══════════════════════════════════════════════════════════════════════════════
export function MechanicalCleaningSection() {
  return (
    <div
      className="w-full py-16 px-5 sm:px-8 md:px-14"
      style={{ background: "#faf8f4", borderTop: "1px solid rgba(201,168,76,0.1)" }}
    >
      <AnimatedSection>
        <SectionHeader
          tag="04 — Conservation · Section I"
          title="Mechanical"
          italic="Cleaning"
          subtitle="Use the arrows or dots to navigate"
        />
      </AnimatedSection>

      {/* 2 frames side by side — fixed width matching original single frame */}
      <AnimatedSection delay={0.1}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "clamp(10px, 2vw, 22px)",
          alignItems: "flex-start",
        }}>
          {ungeasedFrames.map((frame) => (
            <div key={frame.id} style={{ width: "100%", maxWidth: "340px" }}>
              <ImageFrame frame={frame} sizes="(max-width: 768px) 90vw, 340px" />
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — Cleaning Stages of the Greased Mashrabiya (3 frames)
// ══════════════════════════════════════════════════════════════════════════════
export function GreasedCleaningSection() {
  return (
    <div
      className="w-full py-16 px-5 sm:px-8 md:px-14"
      style={{ background: "#faf8f4", borderTop: "1px solid rgba(201,168,76,0.1)" }}
    >
      <AnimatedSection>
        <SectionHeader
          tag="04 — Conservation · Section II"
          title="Cleaning Stages of the"
          italic="Greased Mashrabiya"
          subtitle="Use the arrows or dots to navigate each panel"
        />
      </AnimatedSection>

      {/* 3 frames side by side — full section width */}
      <AnimatedSection delay={0.1}>
        <div style={{
          display: "flex",
          gap: "clamp(10px, 2vw, 22px)",
          alignItems: "flex-start",
          width: "100%",
        }}>
          {greasedFrames.map((frame) => (
            <ImageFrame key={frame.id} frame={frame} sizes="(max-width: 768px) 90vw, 33vw" />
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
