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

const people = [
  { name: "Dr. Ahmed Shebrawy",   arabic: "د. أحمد شبراوي" },
  { name: "Dr. Mahmoud El-Gohary", arabic: "د. محمود الجوهري" },
  { name: "Dr. Ghada",            arabic: "د. غادة" },
  { name: "Dr. Nahir",            arabic: "د. نهير" },
];

const institution = {
  name: "Al-Nadeem Workshop",
  arabic: "مصنع النديم",
};

export function AcknowledgementsSection() {
  return (
    <div
      className="w-full flex flex-col items-center py-20 px-5 sm:px-8 md:px-14"
      style={{
        background: "#06050000",
        backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(${accentRgb},0.06) 0%, transparent 60%), linear-gradient(180deg, #0a0800 0%, #060500 100%)`,
        borderTop: `1px solid rgba(${accentRgb},0.15)`,
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
              Gratitude &amp; Recognition
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
            Acknowledgements
          </h2>

          <div style={{ marginTop: "14px", height: "2px", width: "56px", background: `rgba(${accentRgb},0.5)`, borderRadius: "2px" }} />

          <p style={{ marginTop: "16px", fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", maxWidth: "460px", lineHeight: 1.7, fontWeight: 300 }}>
            Our sincere gratitude to everyone who contributed their expertise and support to this conservation project.
          </p>
        </div>
      </Reveal>

      {/* ── People Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          width: "100%",
          maxWidth: "900px",
          marginBottom: "24px",
        }}
      >
        {people.map((person, i) => (
          <Reveal key={person.name} delay={0.1 + i * 0.1}>
            <div
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid rgba(${accentRgb},0.15)`,
                borderRadius: "1.1rem",
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s ease, background 0.3s ease",
              }}
            >
              {/* Top glow */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                background: `linear-gradient(to right, transparent, rgba(${accentRgb},0.4), transparent)`,
              }} />

              {/* Avatar initials */}
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: `rgba(${accentRgb},0.08)`,
                border: `1.5px solid rgba(${accentRgb},0.25)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", fontFamily: "monospace",
                color: accent, fontWeight: 700, letterSpacing: "0.05em",
              }}>
                {person.name.split(" ").filter(w => w !== "Dr.").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
              </div>

              <div>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#fff", lineHeight: 1.3, marginBottom: "4px" }}>
                  {person.name}
                </p>
                <p style={{ fontSize: "0.72rem", fontFamily: "monospace", color: `rgba(${accentRgb},0.55)`, letterSpacing: "0.04em" }}>
                  {person.arabic}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── Institution Card ── */}
      <Reveal delay={0.55}>
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            background: `linear-gradient(135deg, rgba(${accentRgb},0.1) 0%, rgba(${accentRgb},0.04) 100%)`,
            border: `1.5px solid rgba(${accentRgb},0.35)`,
            borderRadius: "1.4rem",
            padding: "28px 32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at 0% 50%, rgba(${accentRgb},0.12) 0%, transparent 60%)`,
            pointerEvents: "none",
          }} />

          {/* Icon */}
          <div style={{
            width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
            background: `rgba(${accentRgb},0.1)`,
            border: `1px solid rgba(${accentRgb},0.3)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>

          <div style={{ zIndex: 1, flex: 1 }}>
            <p style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.45em", color: `rgba(${accentRgb},0.65)`, textTransform: "uppercase", marginBottom: "6px" }}>
              Partner Workshop
            </p>
            <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
              {institution.name}
            </p>
            <p style={{ fontSize: "0.78rem", fontFamily: "monospace", color: `rgba(${accentRgb},0.55)`, marginTop: "3px" }}>
              {institution.arabic}
            </p>
          </div>
        </div>
      </Reveal>

      {/* ── Closing rule ── */}
      <Reveal delay={0.7}>
        <div style={{ marginTop: "56px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", opacity: 0.25 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ height: "1px", width: "80px", background: `rgba(${accentRgb},1)` }} />
            <svg width="10" height="10" viewBox="0 0 24 24" fill={accent}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <div style={{ height: "1px", width: "80px", background: `rgba(${accentRgb},1)` }} />
          </div>
          <span style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.5em", color: "#fff", textTransform: "uppercase" }}>
            End_of_Document · Conservation_Archive
          </span>
        </div>
      </Reveal>
    </div>
  );
}
