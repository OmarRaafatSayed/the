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
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.06 }
    );
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

export function XrdEdxIrSection() {
  return (
    <div className="w-full flex flex-col items-center px-5 sm:px-8 md:px-14 py-16 border-t border-foreground/5">

      {/* Header */}
      <Reveal>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ height: "1px", width: "28px", background: `rgba(${accentRgb},0.35)` }} />
            <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.45em", color: accent, textTransform: "uppercase" }}>
              Phase II · Characterization
            </span>
            <div style={{ height: "1px", width: "28px", background: `rgba(${accentRgb},0.35)` }} />
          </div>
          <h2
            className="font-headline font-bold"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)", color: "#1a1400", lineHeight: 1.12, letterSpacing: "-0.01em" }}
          >
            XRD · EDX ·{" "}
            <span style={{ color: accent, fontStyle: "italic" }}>IR Analysis</span>
          </h2>
          <div style={{ marginTop: "14px", height: "2px", width: "56px", background: `rgba(${accentRgb},0.5)`, borderRadius: "2px" }} />
        </div>
      </Reveal>

      {/* Image */}
      <Reveal delay={0.15}>
        <div style={{ maxWidth: "720px", margin: "0 auto", width: "100%" }}>
          <div style={{
            borderRadius: "1.25rem",
            overflow: "hidden",
            border: `1px solid rgba(${accentRgb},0.18)`,
            boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
            background: "#faf8f2",
            width: "100%",
          }}>
            <img
              src="/images/ir/samar/Frame 11.png"
              alt="XRD - EDX - IR Analysis"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </Reveal>

      {/* Bottom rule */}
      <Reveal delay={0.3}>
        <div style={{ marginTop: "40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", opacity: 0.22 }}>
          <div style={{ height: "1px", flex: 1, maxWidth: "100px", background: `rgba(${accentRgb},1)` }} />
          <span style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.45em", color: "#1a1400", textTransform: "uppercase" }}>
            Phase_II · XRD · EDX · IR_Spectroscopy
          </span>
          <div style={{ height: "1px", flex: 1, maxWidth: "100px", background: `rgba(${accentRgb},1)` }} />
        </div>
      </Reveal>

    </div>
  );
}
