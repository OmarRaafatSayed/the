"use client";

import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const hieroglyphs = ["𓂀", "𓃭", "𓆣", "𓋹", "𓁿", "𓆑", "𓇯", "𓈖", "𓉐", "𓊪", "𓌀", "𓍯"];

const facts = [
  { label: "Civilization Span", value: "3,000+ Years" },
  { label: "Monuments Documented", value: "47 Sites" },
  { label: "Pigment Samples", value: "1,200+" },
  { label: "Conservation Cases", value: "08 Active" },
];

const pillars = [
  {
    title: "Limestone Conservation",
    desc: "Analysis of weathering patterns and salt crystallization in pyramid casing stones.",
    icon: "𓉐",
  },
  {
    title: "Pigment Analysis",
    desc: "Spectroscopic identification of Egyptian Blue, Red Ochre, and Carbon Black in tomb paintings.",
    icon: "𓆣",
  },
  {
    title: "Structural Integrity",
    desc: "Non-destructive testing of mortise-and-tenon joints in wooden sarcophagi.",
    icon: "𓋹",
  },
];

export default function AncientEgyptianEra() {
  const [entered, setEntered] = useState(false);
  const [activeGlyph, setActiveGlyph] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    const glyphInterval = setInterval(() => {
      setActiveGlyph((prev) => (prev + 1) % hieroglyphs.length);
    }, 600);
    return () => {
      clearTimeout(t);
      clearInterval(glyphInterval);
    };
  }, []);

  const accent = "#C8860A";
  const accentDim = "rgba(200,134,10,0.15)";

  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #0d0a04 0%, #1a1000 40%, #0d0a04 100%)",
        color: "#fff",
      }}
    >
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.pinimg.com/736x/9d/bc/40/9dbc40349ddd9ffa1912116f27cc635f.jpg"
            alt="Ancient Egyptian Architecture"
            fill
            className="object-cover"
            priority
            style={{ opacity: 0.25 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, #0d0a04 30%, rgba(13,10,4,0.6) 60%, rgba(13,10,4,0.3) 100%)",
            }}
          />
        </div>

        {/* Animated hieroglyph strip */}
        <div
          className="absolute top-0 left-0 right-0 z-10 overflow-hidden"
          style={{ height: "3px", background: accent }}
        />
        <div
          className="absolute top-3 left-0 right-0 z-10 flex gap-6 px-8 py-3 overflow-hidden"
          style={{ borderBottom: "1px solid rgba(200,134,10,0.1)" }}
        >
          {hieroglyphs.map((g, i) => (
            <span
              key={i}
              className="font-headline text-lg select-none transition-all duration-300"
              style={{
                color: activeGlyph === i ? accent : "rgba(200,134,10,0.2)",
                transform: activeGlyph === i ? "scale(1.4)" : "scale(1)",
                textShadow: activeGlyph === i ? `0 0 12px ${accent}` : "none",
              }}
            >
              {g}
            </span>
          ))}
        </div>

        {/* Main hero content */}
        <div className="relative z-20 px-8 md:px-16 lg:px-24 pb-20 pt-40">
          <div className="max-w-screen-2xl mx-auto">
            {/* Back link */}
            <div
              style={{
                opacity: entered ? 1 : 0,
                transform: entered ? "translateY(0)" : "translateY(-10px)",
                transition: "all 0.8s ease 0.1s",
              }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-3 mb-12 group"
                style={{
                  color: "rgba(200,134,10,0.6)",
                  fontSize: "9px",
                  fontFamily: "monospace",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: "transform 0.3s ease" }}
                  className="group-hover:-translate-x-1"
                >
                  <path d="M19 12H5M5 12l7-7M5 12l7 7" />
                </svg>
                BACK_TO_ENTRANCE
              </Link>
            </div>

            <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-end">
              <div>
                {/* Era tag */}
                <div
                  style={{
                    opacity: entered ? 1 : 0,
                    transform: entered ? "translateX(0)" : "translateX(-20px)",
                    transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        letterSpacing: "0.5em",
                        color: accent,
                        textTransform: "uppercase",
                      }}
                    >
                      ERA_REF_001 — PHARAONIC_ARCHIVE
                    </span>
                    <div style={{ height: "1px", width: "60px", background: accentDim }} />
                  </div>
                </div>

                {/* Title */}
                <div
                  style={{
                    opacity: entered ? 1 : 0,
                    transform: entered ? "translateY(0)" : "translateY(50px)",
                    transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s",
                  }}
                >
                  <h1
                    className="font-headline font-bold leading-[0.85]"
                    style={{
                      fontSize: "clamp(4rem, 10vw, 9rem)",
                      color: "#fff",
                    }}
                  >
                    ANCIENT
                    <br />
                    <span style={{ color: accent, fontStyle: "italic" }}>EGYPTIAN</span>
                  </h1>
                </div>

                {/* Subtitle */}
                <div
                  style={{
                    opacity: entered ? 1 : 0,
                    transform: entered ? "translateY(0)" : "translateY(20px)",
                    transition: "all 1s ease 0.6s",
                  }}
                >
                  <div className="flex items-center gap-6 mt-8">
                    <div style={{ height: "1px", width: "40px", background: accent }} />
                    <p
                      style={{
                        fontSize: "11px",
                        fontFamily: "monospace",
                        letterSpacing: "0.4em",
                        color: "rgba(255,255,255,0.4)",
                        textTransform: "uppercase",
                      }}
                    >
                      3100 BC — 30 BC · The Era of Eternity
                    </p>
                  </div>
                </div>
              </div>

              {/* Large symbol */}
              <div
                style={{
                  opacity: entered ? 1 : 0,
                  transform: entered ? "scale(1)" : "scale(0.5)",
                  transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s",
                }}
              >
                <span
                  className="font-headline select-none"
                  style={{
                    fontSize: "clamp(6rem, 12vw, 10rem)",
                    color: accent,
                    textShadow: `0 0 80px ${accent}60, 0 0 160px ${accent}30`,
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  𓂀
                </span>
                <p
                  style={{
                    fontSize: "8px",
                    fontFamily: "monospace",
                    letterSpacing: "0.4em",
                    color: "rgba(200,134,10,0.4)",
                    textAlign: "center",
                    marginTop: "8px",
                    textTransform: "uppercase",
                  }}
                >
                  Eye of Horus
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section
        style={{
          borderTop: `1px solid rgba(200,134,10,0.15)`,
          borderBottom: `1px solid rgba(200,134,10,0.15)`,
          background: "rgba(200,134,10,0.04)",
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {facts.map((fact, i) => (
              <div
                key={i}
                style={{
                  opacity: entered ? 1 : 0,
                  transform: entered ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.8s ease ${0.8 + i * 0.1}s`,
                }}
              >
                <p
                  className="font-headline font-bold"
                  style={{ fontSize: "2rem", color: accent }}
                >
                  {fact.value}
                </p>
                <p
                  style={{
                    fontSize: "8px",
                    fontFamily: "monospace",
                    letterSpacing: "0.3em",
                    color: "rgba(255,255,255,0.3)",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {fact.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research Pillars ── */}
      <section className="px-8 md:px-16 lg:px-24 py-32">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-6 mb-16">
            <div style={{ height: "1px", width: "40px", background: accent }} />
            <h2
              style={{
                fontSize: "9px",
                fontFamily: "monospace",
                letterSpacing: "0.5em",
                color: accent,
                textTransform: "uppercase",
              }}
            >
              Research_Pillars
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="group rounded-2xl p-8 relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(200,134,10,0.1)",
                  transition: "all 0.4s ease",
                  opacity: entered ? 1 : 0,
                  transform: entered ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${1 + i * 0.15}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(200,134,10,0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(200,134,10,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.02)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(200,134,10,0.1)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <span
                  className="font-headline"
                  style={{ fontSize: "3rem", color: accent, display: "block", marginBottom: "16px" }}
                >
                  {pillar.icon}
                </span>
                <h3
                  className="font-headline font-bold mb-3"
                  style={{ fontSize: "1.4rem", color: "#fff" }}
                >
                  {pillar.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {pillar.desc}
                </p>
                <div
                  className="absolute bottom-0 left-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, ${accent}, transparent)`,
                    width: "0%",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coming Soon Banner ── */}
      <section className="px-8 md:px-16 lg:px-24 pb-32">
        <div className="max-w-screen-2xl mx-auto">
          <div
            className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, rgba(200,134,10,0.08) 0%, rgba(200,134,10,0.03) 100%)`,
              border: `1px solid rgba(200,134,10,0.2)`,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(200,134,10,0.05) 0%, transparent 70%)`,
              }}
            />
            <span
              className="font-headline"
              style={{ fontSize: "4rem", color: accent, display: "block", marginBottom: "16px" }}
            >
              𓋹
            </span>
            <h2
              className="font-headline font-bold mb-4"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", color: "#fff" }}
            >
              Archive Under Curation
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.8 }}>
              The Ancient Egyptian digital archive is currently being assembled. This section will
              feature pigment analysis, limestone conservation case studies, and 3D documentation
              of pharaonic monuments.
            </p>
            <div
              className="inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-full"
              style={{
                border: `1px solid rgba(200,134,10,0.3)`,
                color: accent,
                fontSize: "9px",
                fontFamily: "monospace",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: accent, animation: "pulse 2s infinite" }}
              />
              CURATION_IN_PROGRESS
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "24px 0",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "8px",
            fontFamily: "monospace",
            letterSpacing: "0.4em",
            color: "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
          }}
        >
          FACULTY_OF_ARCHAEOLOGY — ANCIENT_EGYPTIAN_ARCHIVE — ERA_REF_001
        </p>
      </footer>
    </main>
  );
}
