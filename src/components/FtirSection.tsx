"use client";

import { useEffect, useRef, useState } from "react";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

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

export function FtirSection() {
  return (
    <section className="w-full bg-background py-20 px-5 sm:px-8 md:px-14 border-t border-foreground/5">
      {/* Header */}
      <Reveal>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ height: "1px", width: "28px", background: `rgba(${accentRgb},0.35)` }} />
            <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.45em", color: accent, textTransform: "uppercase" }}>
              Phase II · Characterization
            </span>
            <div style={{ height: "1px", width: "28px", background: `rgba(${accentRgb},0.35)` }} />
          </div>

          <h2
            className="font-headline font-bold"
            style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", color: "#1a1400", lineHeight: 1.12, letterSpacing: "-0.01em" }}
          >
            FTIR{" "}
            <span style={{ color: accent, fontStyle: "italic" }}>Analysis</span>
          </h2>

          <div style={{ marginTop: "14px", height: "1px", width: "56px", background: `rgba(${accentRgb},0.3)`, borderRadius: "2px" }} />

          <p style={{ marginTop: "12px", fontSize: "11px", color: "rgba(0,0,0,0.38)", letterSpacing: "0.04em", maxWidth: "480px", lineHeight: 1.7 }}>
            Fourier-Transform Infrared Spectroscopy — material identification and degradation
            assessment of Mashrabiya Unit 02
          </p>
        </div>
      </Reveal>

      {/* Image card */}
      <Reveal delay={0.15}>
        <div style={{ maxWidth: "860px", margin: "0 auto", width: "100%" }}>
          {/* Unit label row */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ height: "1px", width: "20px", background: `rgba(${accentRgb},0.4)` }} />
            <span style={{
              fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.45em",
              textTransform: "uppercase", color: `rgba(${accentRgb},0.7)`,
            }}>
              Unit 02 — FTIR Spectrum
            </span>
          </div>

          {/* Card */}
          <div style={{
            borderRadius: "1.75rem",
            overflow: "hidden",
            border: `1px solid rgba(${accentRgb},0.18)`,
            boxShadow: "0 12px 48px rgba(0,0,0,0.1)",
            background: "#faf8f2",
          }}>
            <img
              src="/images/ir/1.jpeg"
              alt="FTIR Analysis — Mashrabiya Unit 02"
              style={{ width: "100%", height: "auto", display: "block" }}
            />

            {/* Caption bar */}
            <div style={{
              padding: "14px 20px",
              borderTop: `1px solid rgba(${accentRgb},0.12)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}>
              <p style={{
                fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.3em",
                textTransform: "uppercase", color: `rgba(${accentRgb},0.7)`,
              }}>
                Infrared Spectroscopy · Material Analysis
              </p>
              <span style={{
                fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.25em",
                color: "rgba(0,0,0,0.3)", textTransform: "uppercase",
              }}>
                Mashrabiya — Unit 02
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Bottom rule */}
      <Reveal delay={0.3}>
        <div style={{ marginTop: "48px", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", opacity: 0.22 }}>
          <div style={{ height: "1px", flex: 1, maxWidth: "100px", background: `rgba(${accentRgb},1)` }} />
          <span style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.45em", color: "#1a1400", textTransform: "uppercase" }}>
            Phase_II · FTIR_Spectroscopy
          </span>
          <div style={{ height: "1px", flex: 1, maxWidth: "100px", background: `rgba(${accentRgb},1)` }} />
        </div>
      </Reveal>
    </section>
  );
}
