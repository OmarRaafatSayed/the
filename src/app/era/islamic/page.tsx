"use client";

import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

const accent = "#C9A84C";
const accentRgb = "201,168,76";
const bg = "#0a0800";

const geometricSymbols = ["◆", "✦", "◈", "⬡", "◇", "✧", "⬢", "◉", "✦", "◆", "⬡", "◈"];

const facts = [
  { label: "Monuments Archived", value: "24+" },
  { label: "Geometric Patterns", value: "180+" },
  { label: "Wood Samples", value: "620+" },
  { label: "Active Projects", value: "02" },
];

// First entry is our Mashrabiya project, rest are Islamic heritage monuments
const monuments = [
  {
    id: "mashrabiya",
    title: "Mashrabiya",
    subtitle: "OUR PROJECT — WOOD CONSERVATION",
    location: "Cairo, Egypt",
    period: "12th Century",
    image: "/images/slide4/before.jpg",
    link: "/era/islamic/mashrabiya",
    isProject: true,
    tag: "CASE STUDY",
  },
  {
    id: "mashrabiya-2",
    title: "Mamluk Qur'an Box",
    subtitle: "WOODWORK & METALWORK · PERGAMON MUSEUM, BERLIN",
    location: "Cairo, Egypt",
    period: "14th Century AD",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Quran_box_from_Cairo%2C_Mamluk%2C_14th_cent.%3B_Pergamon_Museum%2C_Berlin_%284%29_%2840226723491%29.jpg",
    link: "#",
    isProject: false,
    tag: "ARTIFACT",
  },
  {
    id: "luster-dish",
    title: "Luster Painted Dish — Fatimid",
    subtitle: "CERAMIC · MUSEUM OF ISLAMIC ART, CAIRO",
    location: "Cairo, Egypt",
    period: "10th–12th Century AD",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/MIA002.jpg",
    link: "#",
    isProject: false,
    tag: "ARTIFACT",
  },
  {
    id: "mosque-lamp",
    title: "Gilded Glass Mosque Lamp — Mamluk",
    subtitle: "ENAMELLED GLASS · MUSEUM OF ISLAMIC ART, CAIRO",
    location: "Cairo, Egypt",
    period: "14th Century AD",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/MIA006.jpg",
    link: "#",
    isProject: false,
    tag: "ARTIFACT",
  },
  {
    id: "marble-jars",
    title: "Marble Jars with Engraved Ornamentation",
    subtitle: "STONEWORK · MUSEUM OF ISLAMIC ART, CAIRO",
    location: "Cairo, Egypt",
    period: "Islamic Period",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/97/MIA001.jpg",
    link: "#",
    isProject: false,
    tag: "ARTIFACT",
  },
  {
    id: "ceramic-tile",
    title: "Ceramic Tile Panel — Ottoman",
    subtitle: "CERAMIC · MUSEUM OF ISLAMIC ART, CAIRO",
    location: "Cairo, Egypt",
    period: "17th Century AD",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/MIA004.jpg",
    link: "#",
    isProject: false,
    tag: "ARTIFACT",
  },
  {
    id: "astrolabes",
    title: "Copper Astrolabes",
    subtitle: "SCIENTIFIC INSTRUMENT · MUSEUM OF ISLAMIC ART, CAIRO",
    location: "Cairo, Egypt",
    period: "14th–18th Century AD",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/67/MIA005.jpg",
    link: "#",
    isProject: false,
    tag: "ARTIFACT",
  },
  {
    id: "marble-medallion",
    title: "Marble Medallion — Mamluk",
    subtitle: "STONEWORK · MUSEUM OF ISLAMIC ART, CAIRO",
    location: "Cairo, Egypt",
    period: "1356 AD",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/MIA003.jpg",
    link: "#",
    isProject: false,
    tag: "ARTIFACT",
  },
  {
    id: "gilded-lamp-british",
    title: "Gilded Mosque Lamp — Mamluk",
    subtitle: "ENAMELLED GLASS · BRITISH MUSEUM, LONDON",
    location: "Cairo, Egypt",
    period: "14th Century AD",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Gilded_and_enamelled_mosque_lamp.jpg",
    link: "#",
    isProject: false,
    tag: "ARTIFACT",
  },
];

export default function IslamicEraHub() {
  const [entered, setEntered] = useState(false);
  const [activeSymbol, setActiveSymbol] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    const interval = setInterval(() => {
      setActiveSymbol((p) => (p + 1) % geometricSymbols.length);
    }, 450);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, []);

  return (
    <main style={{ background: bg, color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.pinimg.com/736x/af/8c/b8/af8cb8b556679cdd8ea9079c1766b529.jpg"
            alt="Islamic Architecture"
            fill
            className="object-cover"
            priority
            style={{ opacity: 0.22 }}
          />
          <div className="absolute inset-0 mashrabiya-overlay" style={{ opacity: 0.1 }} />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to top, ${bg} 35%, rgba(10,8,0,0.55) 65%, rgba(10,8,0,0.25) 100%)`
          }} />
        </div>

        {/* Top accent bar + symbols */}
        <div className="absolute top-0 left-0 right-0 z-10" style={{ height: "3px", background: accent }} />
        <div className="absolute top-3 left-0 right-0 z-10 flex gap-5 px-8 py-3 overflow-hidden"
          style={{ borderBottom: `1px solid rgba(${accentRgb},0.1)` }}>
          {geometricSymbols.map((g, i) => (
            <span key={i} className="text-base select-none"
              style={{
                display: "inline-block",
                color: activeSymbol === i ? accent : `rgba(${accentRgb},0.18)`,
                transform: activeSymbol === i ? "scale(1.5) rotate(45deg)" : "scale(1)",
                textShadow: activeSymbol === i ? `0 0 14px ${accent}` : "none",
                transition: "all 0.35s ease",
              }}>{g}</span>
          ))}
        </div>

        <div className="relative z-20 px-8 md:px-16 lg:px-24 pb-20 pt-40">
          <div className="max-w-screen-2xl mx-auto">
            {/* Back */}
            <div style={{ opacity: entered ? 1 : 0, transform: entered ? "none" : "translateY(-10px)", transition: "all 0.8s ease 0.1s" }}>
              <Link href="/" className="inline-flex items-center gap-3 mb-12 group"
                style={{ color: `rgba(${accentRgb},0.55)`, fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.45em", textTransform: "uppercase", textDecoration: "none" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                  <path d="M19 12H5M5 12l7-7M5 12l7 7" />
                </svg>
                BACK_TO_ENTRANCE
              </Link>
            </div>

            <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-end">
              <div>
                <div style={{ opacity: entered ? 1 : 0, transform: entered ? "none" : "translateX(-20px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
                  <div className="flex items-center gap-4 mb-6">
                    <span style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.5em", color: accent, textTransform: "uppercase" }}>
                      ERA_REF_003 — ISLAMIC_ARCHIVE
                    </span>
                    <div style={{ height: "1px", width: "60px", background: `rgba(${accentRgb},0.3)` }} />
                  </div>
                </div>
                <div style={{ opacity: entered ? 1 : 0, transform: entered ? "none" : "translateY(50px)", transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s" }}>
                  <h1 className="font-headline font-bold leading-[0.85]" style={{ fontSize: "clamp(4rem,10vw,9rem)", color: "#fff" }}>
                    ISLAMIC<br />
                    <span style={{ color: accent, fontStyle: "italic" }}>HERITAGE</span>
                  </h1>
                </div>
                <div style={{ opacity: entered ? 1 : 0, transform: entered ? "none" : "translateY(20px)", transition: "all 1s ease 0.6s" }}>
                  <div className="flex items-center gap-6 mt-8">
                    <div style={{ height: "1px", width: "40px", background: accent }} />
                    <p style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.4em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
                      641 AD — 1517 AD · The Science of Geometry
                    </p>
                  </div>
                </div>
              </div>
              {/* Symbol */}
              <div style={{ opacity: entered ? 1 : 0, transform: entered ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-45deg)", transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s" }}>
                <span style={{ fontSize: "clamp(6rem,12vw,10rem)", color: accent, textShadow: `0 0 80px ${accent}60,0 0 160px ${accent}30`, display: "block", lineHeight: 1 }}>☽</span>
                <p style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.4em", color: `rgba(${accentRgb},0.4)`, textAlign: "center", marginTop: "8px", textTransform: "uppercase" }}>Crescent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ borderTop: `1px solid rgba(${accentRgb},0.12)`, borderBottom: `1px solid rgba(${accentRgb},0.12)`, background: `rgba(${accentRgb},0.04)` }}>
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {facts.map((f, i) => (
              <div key={i} style={{ opacity: entered ? 1 : 0, transform: entered ? "none" : "translateY(20px)", transition: `all 0.8s ease ${0.8 + i * 0.1}s` }}>
                <p className="font-headline font-bold" style={{ fontSize: "2.2rem", color: accent }}>{f.value}</p>
                <p style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginTop: "4px" }}>{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO TEXT ── */}
      <section className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 pt-24 pb-16">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div style={{ height: "1px", width: "32px", background: accent }} />
              <span style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.5em", color: accent, textTransform: "uppercase" }}>About_The_Era</span>
            </div>
            <h2 className="font-headline font-bold" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", lineHeight: 1.1 }}>
              The Science<br /><span style={{ color: accent, fontStyle: "italic" }}>of Geometry</span>
            </h2>
          </div>
          <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.9, fontSize: "1.05rem", paddingTop: "8px" }}>
            Islamic architecture represents one of history's most sophisticated visual languages — a fusion of mathematics, spirituality, and craft. From the intricate muqarnas of Mamluk Cairo to the geometric tile-work of Andalusian palaces, every surface encodes a system of proportion and meaning. This archive documents the monuments, elements, and conservation studies that define this era's architectural legacy.
          </p>
        </div>
      </section>

      {/* ── MONUMENTS GALLERY ── */}
      <section className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 pb-32">
        <div className="flex items-center gap-4 mb-12">
          <div style={{ height: "1px", width: "32px", background: accent }} />
          <span style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.5em", color: accent, textTransform: "uppercase" }}>Archive_Catalogue</span>
          <div style={{ height: "1px", flex: 1, background: `rgba(${accentRgb},0.1)` }} />
          <span style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>{monuments.length}_ENTRIES</span>
        </div>

        {/* All monuments in a uniform grid — Mashrabiya is just the first card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {monuments.map((m, i) => (
            <MonumentCard
              key={m.id}
              monument={m}
              index={i}
              entered={entered}
              hovered={hoveredId === m.id}
              onEnter={() => setHoveredId(m.id)}
              onLeave={() => setHoveredId(null)}
              accent={accent}
              accentRgb={accentRgb}
              tall={false}
            />
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid rgba(${accentRgb},0.1)`, padding: "40px 0 24px" }}>
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.4em", color: accent, textTransform: "uppercase", fontStyle: "italic" }}>
              Digital Forensic Record & Conservation Archive
            </p>
            <p style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginTop: "4px" }}>
              Archive Version 1.0.8 — © 2024 Heritage Systems
            </p>
          </div>
          <div className="flex gap-8">
            {["Methodology", "Ethics_Charter"].map((item) => (
              <span key={item}
                style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", cursor: "pointer", transition: "color 0.3s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = accent)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
              >{item}</span>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ── Monument Card ── */
function MonumentCard({
  monument, index, entered, hovered, onEnter, onLeave, accent, accentRgb, tall
}: {
  monument: typeof monuments[0];
  index: number;
  entered: boolean;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  accent: string;
  accentRgb: string;
  tall: boolean;
}) {
  return (
    <Link
      href={monument.link}
      className="relative overflow-hidden rounded-2xl group cursor-pointer block"
      style={{
        height: tall ? "380px" : "320px",
        border: `1px solid rgba(${accentRgb},${hovered ? "0.3" : "0.1"})`,
        opacity: entered ? 1 : 0,
        transform: entered ? "none" : "translateY(30px)",
        transition: `opacity 0.8s ease ${1.1 + index * 0.08}s, transform 0.8s ease ${1.1 + index * 0.08}s, border-color 0.3s ease`,
        textDecoration: "none",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={monument.image}
        alt={monument.title}
        className="object-cover absolute inset-0 w-full h-full"
        style={{
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      {/* Dark gradient */}
      <div className="absolute inset-0" style={{
        background: hovered
          ? "linear-gradient(to top, rgba(10,8,0,0.95) 0%, rgba(10,8,0,0.5) 60%, rgba(10,8,0,0.1) 100%)"
          : "linear-gradient(to top, rgba(10,8,0,0.85) 0%, rgba(10,8,0,0.3) 60%, transparent 100%)",
        transition: "background 0.5s ease",
      }} />
      {/* Accent tint on hover */}
      <div className="absolute inset-0" style={{
        background: `rgba(${accentRgb},0.07)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />

      {/* Tag */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full"
          style={{
            fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.3em",
            color: monument.isProject ? "#000" : `rgba(${accentRgb},0.9)`,
            background: monument.isProject ? accent : "rgba(0,0,0,0.6)",
            border: monument.isProject ? "none" : `1px solid rgba(${accentRgb},0.3)`,
            textTransform: "uppercase",
          }}>
          {monument.tag}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p style={{
          fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.4em",
          color: accent, textTransform: "uppercase", marginBottom: "6px",
          opacity: hovered ? 1 : 0.7, transition: "opacity 0.3s ease",
        }}>
          {monument.location} · {monument.period}
        </p>
        <h3 className="font-headline font-bold" style={{ fontSize: "1.5rem", color: "#fff", lineHeight: 1.1 }}>
          {monument.title}
        </h3>
        <p style={{
          fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginTop: "4px",
        }}>
          {monument.subtitle}
        </p>

        {/* Arrow on hover */}
        <div style={{
          marginTop: "12px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.3s ease",
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <div style={{ height: "1px", width: "24px", background: accent }} />
          <span style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.4em", color: accent, textTransform: "uppercase" }}>
            {monument.isProject ? "View Case Study" : "View Monument"}
          </span>
        </div>
      </div>
    </Link>
  );
}
