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
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const costItems = [
  {
    label: "Turnery Completion & Wooden Beams",
    arabic: "استكمال خرط وعوارض",
    amount: 6500,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Examinations & Analyses",
    arabic: "فحوص وتحاليل",
    amount: 3400,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
      </svg>
    ),
  },
  {
    label: "Materials & Supplies",
    arabic: "خامات",
    amount: 3000,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
];

const total = costItems.reduce((sum, item) => sum + item.amount, 0);

export function ProjectCostSection() {
  return (
    <div
      className="w-full flex flex-col items-center py-20 px-5 sm:px-8 md:px-14"
      style={{
        background: "#0a0800",
        borderTop: `1px solid rgba(${accentRgb},0.2)`,
      }}
    >
      {/* ── Header ── */}
      <Reveal>
        <div className="flex flex-col items-center text-center mb-14">
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
            <div style={{ height: "1px", width: "40px", background: `linear-gradient(to right, transparent, rgba(${accentRgb},0.55))` }} />
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" style={{ opacity: 0.7 }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.48em", color: accent, textTransform: "uppercase" }}>
              Project Budget · Financial Overview
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" style={{ opacity: 0.7 }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <div style={{ height: "1px", width: "40px", background: `linear-gradient(to left, transparent, rgba(${accentRgb},0.55))` }} />
          </div>

          <h2
            className="font-headline font-bold"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Project{" "}
            <span style={{ color: accent, fontStyle: "italic" }}>Cost</span>
          </h2>

          <div style={{ marginTop: "14px", height: "2px", width: "56px", background: `rgba(${accentRgb},0.5)`, borderRadius: "2px" }} />
        </div>
      </Reveal>

      {/* ── Cost Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "960px",
          marginBottom: "32px",
        }}
      >
        {costItems.map((item, i) => (
          <Reveal key={item.label} delay={0.1 + i * 0.12}>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(${accentRgb},0.18)`,
                borderRadius: "1.25rem",
                padding: "28px 28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow top-left */}
              <div style={{
                position: "absolute", top: 0, left: 0,
                width: "120px", height: "120px",
                background: `radial-gradient(ellipse at 0% 0%, rgba(${accentRgb},0.12) 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />

              {/* Icon */}
              <div style={{
                width: "44px", height: "44px",
                borderRadius: "12px",
                background: `rgba(${accentRgb},0.08)`,
                border: `1px solid rgba(${accentRgb},0.2)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {item.icon}
              </div>

              {/* Label */}
              <div>
                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#fff", lineHeight: 1.35, marginBottom: "4px" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: "0.68rem", fontFamily: "monospace", color: `rgba(${accentRgb},0.6)`, letterSpacing: "0.05em" }}>
                  {item.arabic}
                </p>
              </div>

              {/* Amount */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "auto" }}>
                <span style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: accent,
                  lineHeight: 1,
                }}>
                  {item.amount.toLocaleString()}
                </span>
                <span style={{ fontSize: "0.72rem", fontFamily: "monospace", color: `rgba(${accentRgb},0.55)`, letterSpacing: "0.1em" }}>
                  EGP
                </span>
              </div>

              {/* Bottom accent line */}
              <div style={{
                position: "absolute", bottom: 0, left: "28px", right: "28px",
                height: "1px",
                background: `linear-gradient(to right, transparent, rgba(${accentRgb},0.35), transparent)`,
              }} />
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── Total ── */}
      <Reveal delay={0.5}>
        <div
          style={{
            width: "100%",
            maxWidth: "960px",
            background: `linear-gradient(135deg, rgba(${accentRgb},0.12) 0%, rgba(${accentRgb},0.05) 100%)`,
            border: `1.5px solid rgba(${accentRgb},0.4)`,
            borderRadius: "1.5rem",
            padding: "32px 36px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at 50% 0%, rgba(${accentRgb},0.1) 0%, transparent 65%)`,
            pointerEvents: "none",
          }} />

          <div style={{ zIndex: 1 }}>
            <p style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.5em", color: `rgba(${accentRgb},0.7)`, textTransform: "uppercase", marginBottom: "6px" }}>
              Total Project Budget
            </p>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>
              Complete conservation &amp; restoration program
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", zIndex: 1 }}>
            <span style={{
              fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
              fontFamily: "monospace",
              fontWeight: 800,
              color: accent,
              lineHeight: 1,
              textShadow: `0 0 40px rgba(${accentRgb},0.4)`,
            }}>
              {total.toLocaleString()}
            </span>
            <span style={{ fontSize: "1rem", fontFamily: "monospace", color: `rgba(${accentRgb},0.6)`, letterSpacing: "0.15em" }}>
              EGP
            </span>
          </div>
        </div>
      </Reveal>

      {/* ── Footer rule ── */}
      <Reveal delay={0.65}>
        <div style={{ marginTop: "48px", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", opacity: 0.2 }}>
          <div style={{ height: "1px", width: "80px", background: `rgba(${accentRgb},1)` }} />
          <span style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.45em", color: "#fff", textTransform: "uppercase" }}>
            Budget_Summary · Conservation_Program
          </span>
          <div style={{ height: "1px", width: "80px", background: `rgba(${accentRgb},1)` }} />
        </div>
      </Reveal>
    </div>
  );
}
