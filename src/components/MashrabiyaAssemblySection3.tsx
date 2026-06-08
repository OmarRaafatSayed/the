"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

const frameImages = [
  { src: "/images/conservation/mashrabiya-assembly/slide3/1.jpeg", alt: "Assembly of Turnery — step 1" },
  { src: "/images/conservation/mashrabiya-assembly/slide3/2.jpeg", alt: "Assembly of Turnery — step 2" },
  { src: "/images/conservation/mashrabiya-assembly/slide3/3.jpeg", alt: "Assembly of Turnery — step 3" },
  { src: "/images/conservation/mashrabiya-assembly/slide3/4.jpeg", alt: "Assembly of Turnery — step 4" },
  { src: "/images/conservation/mashrabiya-assembly/slide3/5.jpeg", alt: "Assembly of Turnery — step 5" },
  { src: "/images/conservation/mashrabiya-assembly/slide3/6.jpeg", alt: "Assembly of Turnery — step 6" },
  { src: "/images/conservation/mashrabiya-assembly/slide3/7.jpeg", alt: "Assembly of Turnery — step 7" },
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export function MashrabiyaAssemblySection3() {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = frameImages.length;
  const prev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const next = () => setActiveIdx((i) => (i + 1) % total);

  return (
    <div
      className="w-full py-16 px-5 sm:px-8 md:px-14"
      style={{ background: "#faf8f4", borderTop: "1px solid rgba(201,168,76,0.1)" }}
    >
      {/* ── Header ── */}
      <AnimatedSection>
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div style={{ height: "1px", width: "24px", background: `rgba(${accentRgb},0.45)` }} />
            <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.45em", color: accent, textTransform: "uppercase" }}>
              04 — Conservation · Section VII
            </span>
            <div style={{ height: "1px", width: "24px", background: `rgba(${accentRgb},0.45)` }} />
          </div>
          <h2 className="font-headline font-bold"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", color: "#1a1400", lineHeight: 1.15 }}>
            Assembly of Turnery for{" "}
            <span style={{ color: accent, fontStyle: "italic" }}>Both Mashrabiyas</span>
          </h2>
          <p style={{ marginTop: "8px", fontSize: "11px", color: "rgba(0,0,0,0.35)", letterSpacing: "0.04em" }}>
            Use the arrows or dots to navigate
          </p>
        </div>
      </AnimatedSection>

      {/* ── Single frame ── */}
      <AnimatedSection delay={0.1}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ flex: "1 1 0", maxWidth: "340px" }}>

            {/* Viewport */}
            <div className="relative w-full overflow-hidden" style={{
              borderRadius: "1.25rem",
              border: "1.5px solid rgba(201,168,76,0.18)",
              background: "#f5f2ec",
              aspectRatio: "3 / 4",
              boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
            }}>
              {frameImages.map((img, i) => (
                <div key={img.src} style={{
                  position: "absolute", inset: 0,
                  opacity: activeIdx === i ? 1 : 0,
                  transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1)",
                  pointerEvents: "none",
                }}>
                  <Image src={img.src} alt={img.alt} fill className="object-contain" quality={90} sizes="340px" />
                </div>
              ))}

              {/* Gold gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(201,168,76,0.07) 0%, transparent 30%)",
                pointerEvents: "none", zIndex: 2,
              }} />

              {/* Prev */}
              <button onClick={prev} aria-label="Previous image" style={{
                position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", zIndex: 4,
                background: "rgba(10,8,0,0.45)", border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: "50%", width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "background 0.2s, border-color 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.85)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,8,0,0.45)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.25)"; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>

              {/* Next */}
              <button onClick={next} aria-label="Next image" style={{
                position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", zIndex: 4,
                background: "rgba(10,8,0,0.45)", border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: "50%", width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "background 0.2s, border-color 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.85)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,8,0,0.45)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.25)"; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>

              {/* Dots */}
              <div style={{
                position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)",
                display: "flex", gap: "5px", zIndex: 3,
              }}>
                {frameImages.map((_, i) => (
                  <button key={i} onClick={() => setActiveIdx(i)} aria-label={`Go to image ${i + 1}`} style={{
                    width: activeIdx === i ? "20px" : "6px", height: "6px", borderRadius: "3px",
                    background: activeIdx === i ? accent : "rgba(201,168,76,0.3)",
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "width 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.25s ease",
                  }} />
                ))}
              </div>

              {/* Counter */}
              <div style={{
                position: "absolute", top: "10px", right: "10px", zIndex: 4,
                background: "rgba(10,8,0,0.5)", border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "20px", padding: "3px 9px",
                fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.1em", color: accent,
              }}>
                {activeIdx + 1} / {total}
              </div>
            </div>

            {/* Step label */}
            <p style={{
              textAlign: "center", marginTop: "10px",
              fontSize: "0.65rem", fontFamily: "monospace",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: accent, opacity: 0.8,
            }}>
              Step {activeIdx + 1} of {total}
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
