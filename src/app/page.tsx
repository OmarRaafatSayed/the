"use client";

import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const eras = [
  {
    id: "ancient-egyptian",
    index: "I",
    title: "Ancient Egyptian",
    arabicTitle: "الحضارة المصرية القديمة",
    subtitle: "3100 BC — 30 BC",
    eraName: "The Era of Eternity",
    description:
      "Exploring 3000 years of architectural conservation, from limestone preservation to pharaonic pigment analysis.",
    image: PlaceHolderImages.find((i) => i.id === "era-egyptian")?.imageUrl,
    link: "/era/ancient-egyptian",
    accent: "#C8860A",
    accentRgb: "200, 134, 10",
    symbol: "𓂀",
    symbolLabel: "Eye of Horus",
    particles: ["𓃭", "𓆣", "𓋹", "𓂀", "𓁿", "𓆑"],
    gradient: "from-amber-950 via-stone-900 to-yellow-950",
    overlayColor: "rgba(200,134,10,0.15)",
    tag: "PHARAONIC_ARCHIVE",
  },
  {
    id: "greco-roman",
    index: "II",
    title: "Greco-Roman",
    arabicTitle: "الحضارة اليونانية الرومانية",
    subtitle: "332 BC — 641 AD",
    eraName: "Classical Antiquity",
    description:
      "Scientific documentation of Hellenistic and Roman structures within the Mediterranean basin.",
    image: PlaceHolderImages.find((i) => i.id === "era-roman")?.imageUrl,
    link: "/era/greco-roman",
    accent: "#7B9EA8",
    accentRgb: "123, 158, 168",
    symbol: "Ω",
    symbolLabel: "Omega",
    particles: ["Α", "Β", "Γ", "Δ", "Ω", "Φ"],
    gradient: "from-slate-950 via-blue-950 to-stone-900",
    overlayColor: "rgba(123,158,168,0.15)",
    tag: "CLASSICAL_ARCHIVE",
  },
  {
    id: "islamic",
    index: "III",
    title: "Islamic Era",
    arabicTitle: "الحضارة الإسلامية",
    subtitle: "641 AD — 1517 AD",
    eraName: "The Science of Geometry",
    description:
      "A digital archive of Mashrabiyas, Muqarnas, and modular geometric systems from the Mamluk and Ottoman periods.",
    image: PlaceHolderImages.find((i) => i.id === "era-islamic")?.imageUrl,
    link: "/era/islamic",
    accent: "#C9A84C",
    accentRgb: "201, 168, 76",
    symbol: "☽",
    symbolLabel: "Crescent",
    particles: ["◆", "✦", "◈", "⬡", "◇", "✧"],
    gradient: "from-yellow-950 via-stone-900 to-amber-950",
    overlayColor: "rgba(201,168,76,0.15)",
    tag: "ISLAMIC_ARCHIVE",
  },
];

export default function MuseumEntrance() {
  const [activeEra, setActiveEra] = useState<number | null>(null);
  const [hoveredEra, setHoveredEra] = useState<number | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [entered, setEntered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState<
    { x: number; y: number; char: string; delay: number; duration: number; size: number }[]
  >([]);
  const particleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  const displayEra = hoveredEra !== null ? hoveredEra : activeEra;

  const spawnParticles = (eraIdx: number) => {
    const era = eras[eraIdx];
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      x: 30 + Math.random() * 40,
      y: 20 + Math.random() * 60,
      char: era.particles[i % era.particles.length],
      delay: Math.random() * 0.8,
      duration: 2 + Math.random() * 2,
      size: 12 + Math.random() * 20,
    }));
    setFloatingParticles(newParticles);
    if (particleTimerRef.current) clearTimeout(particleTimerRef.current);
    particleTimerRef.current = setTimeout(() => setFloatingParticles([]), 4000);
  };

  const handleEraEnter = (idx: number) => {
    setHoveredEra(idx);
    spawnParticles(idx);
  };

  const handleEraLeave = () => {
    setHoveredEra(null);
  };

  const handleEraClick = (idx: number) => {
    setActiveEra(idx);
    setIsEntering(true);
  };

  const currentEra = displayEra !== null ? eras[displayEra] : null;

  return (
    <main
      className="h-screen overflow-hidden relative"
      style={{
        background: currentEra
          ? `radial-gradient(ellipse at 60% 50%, ${currentEra.overlayColor} 0%, #0a0a0a 60%)`
          : "#0a0a0a",
        transition: "background 1.2s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <Navbar />

      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {eras.map((era, idx) => (
          <div
            key={era.id}
            className="absolute inset-0 transition-all duration-1000 ease-in-out"
            style={{
              opacity: displayEra === idx ? 0.18 : 0,
              transform: displayEra === idx ? "scale(1)" : "scale(1.08)",
              filter: displayEra === idx ? "blur(0px)" : "blur(8px)",
            }}
          >
            <Image
              src={era.image || `https://picsum.photos/seed/${era.id}/1600/900`}
              alt={era.title}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      </div>

      {/* ── Floating Era Particles ── */}
      {mounted && (
        <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
          {floatingParticles.map((p, i) => (
            <span
              key={i}
              className="absolute font-headline select-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                fontSize: `${p.size}px`,
                color: currentEra?.accent || "#fff",
                opacity: 0,
                animation: `particleFloat ${p.duration}s ease-out ${p.delay}s forwards`,
              }}
            >
              {p.char}
            </span>
          ))}
        </div>
      )}

      {/* ── Decorative Grid ── */}
      <div
        className="fixed inset-0 pointer-events-none z-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Main Layout ── */}
      <section className="relative z-20 h-full w-full flex flex-col justify-center px-8 md:px-12 lg:px-16 pt-16 pb-4">
        <div className="max-w-screen-2xl mx-auto w-full">

          {/* Top Label */}
          <div
            className="flex items-center gap-4 mb-6"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0)" : "translateY(-20px)",
              transition: "all 1s ease 0.1s",
            }}
          >
            <div
              className="h-[1px] w-16"
              style={{
                background: currentEra?.accent || "rgba(255,255,255,0.2)",
                transition: "background 0.8s ease",
              }}
            />
            <span
              className="text-[9px] font-mono tracking-[0.5em] uppercase"
              style={{
                color: currentEra?.accent || "rgba(255,255,255,0.4)",
                transition: "color 0.8s ease",
              }}
            >
              FACULTY_OF_ARCHAEOLOGY — DIGITAL_MUSEUM
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-center">

            {/* ── Left: Hero Title ── */}
            <div className="space-y-10">
              <div
                style={{
                  opacity: entered ? 1 : 0,
                  transform: entered ? "translateY(0)" : "translateY(40px)",
                  transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                <h1
                  className="font-headline font-bold leading-[0.88] tracking-tight"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)", color: "#fff" }}
                >
                  FACULTY OF
                  <br />
                  <span
                    className="italic"
                    style={{
                      color: currentEra?.accent || "#D35400",
                      transition: "color 0.8s ease",
                    }}
                  >
                    ARCHAEOLOGY
                  </span>
                  <br />
                  MUSEUM
                </h1>
              </div>

              {/* Era Symbol Display */}
              <div
                className="relative h-20 overflow-hidden"
                style={{
                  opacity: entered ? 1 : 0,
                  transition: "opacity 1s ease 0.6s",
                }}
              >
                {eras.map((era, idx) => (
                  <div
                    key={era.id}
                    className="absolute inset-0 flex items-center gap-5"
                    style={{
                      opacity: displayEra === idx ? 1 : 0,
                      transform:
                        displayEra === idx
                          ? "translateX(0) scale(1)"
                          : "translateX(-30px) scale(0.95)",
                      transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <span
                      className="font-headline select-none"
                      style={{
                        fontSize: "3.5rem",
                        color: era.accent,
                        lineHeight: 1,
                        textShadow: `0 0 60px ${era.accent}60`,
                        filter: "drop-shadow(0 0 20px currentColor)",
                      }}
                    >
                      {era.symbol}
                    </span>
                    <div className="space-y-1">
                      <p
                        className="text-[9px] font-mono tracking-[0.5em] uppercase"
                        style={{ color: era.accent }}
                      >
                        {era.symbolLabel}
                      </p>
                      <p className="text-lg font-headline font-bold text-white/90">
                        {era.eraName}
                      </p>
                      <p className="text-xs text-white/50 font-light max-w-xs leading-relaxed">
                        {era.description}
                      </p>
                    </div>
                  </div>
                ))}
                {displayEra === null && (
                  <div className="absolute inset-0 flex items-center">
                    <p className="text-white/30 font-light text-base tracking-wide">
                      ← Hover over an era to explore
                    </p>
                  </div>
                )}
              </div>

              {/* Stats Row */}
              <div
                className="flex items-center gap-6 pt-2"
                style={{
                  opacity: entered ? 1 : 0,
                  transform: entered ? "translateY(0)" : "translateY(20px)",
                  transition: "all 1s ease 0.8s",
                }}
              >
                {[
                  { label: "Eras", value: "03" },
                  { label: "Studies", value: "12" },
                  { label: "Archive", value: "v1.0" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-6">
                    {i > 0 && (
                      <div
                        className="h-6 w-[1px]"
                        style={{ background: "rgba(255,255,255,0.1)" }}
                      />
                    )}
                    <div>
                      <p
                        className="text-xl font-headline font-bold"
                        style={{
                          color: currentEra?.accent || "rgba(255,255,255,0.8)",
                          transition: "color 0.8s ease",
                        }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-[8px] font-mono tracking-widest text-white/30 uppercase">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Era Selector ── */}
            <div
              style={{
                opacity: entered ? 1 : 0,
                transform: entered ? "translateX(0)" : "translateX(60px)",
                transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s",
              }}
            >
              <div className="space-y-3">
                {eras.map((era, idx) => (
                  <EraCard
                    key={era.id}
                    era={era}
                    idx={idx}
                    isActive={displayEra === idx}
                    isEntering={isEntering && activeEra === idx}
                    onEnter={() => handleEraEnter(idx)}
                    onLeave={handleEraLeave}
                    onClick={() => handleEraClick(idx)}
                  />
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 px-2">
                <div
                  className="h-[1px] flex-1"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <span className="text-[8px] font-mono tracking-[0.4em] text-white/20 uppercase">
                  Select_Archive_Segment
                </span>
                <div
                  className="h-[1px] flex-1"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QR Code — bottom-left corner, small & unobtrusive ── */}
      <a
        href="https://graduate-9744a.web.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 z-30 group"
        style={{ textDecoration: "none" }}
        aria-label="Scan QR to visit the live site"
      >
        <div
          style={{
            background: "rgba(10,8,0,0.65)",
            border: `1px solid rgba(255,255,255,0.12)`,
            borderRadius: "10px",
            padding: "6px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            transition: "border-color 0.3s ease, transform 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
          className="group-hover:border-white/30 group-hover:scale-105"
        >
          {/* QR image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/qr.png"
            alt="QR code"
            width={100}
            height={100}
            style={{
              display: "block",
              borderRadius: "6px",
              imageRendering: "pixelated",
            }}
          />
          {/* tiny label */}
          <span
            style={{
              fontSize: "6px",
              fontFamily: "monospace",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1,
            }}
          >
            SCAN
          </span>
        </div>
      </a>

      {/* ── CSS for particle animation ── */}
      <style jsx global>{`
        @keyframes particleFloat {
          0% {
            opacity: 0;
            transform: translateY(0px) scale(0.5);
          }
          20% {
            opacity: 0.8;
            transform: translateY(-20px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) scale(0.8) rotate(20deg);
          }
        }
        @keyframes eraReveal {
          0% {
            clip-path: inset(0 100% 0 0);
            opacity: 0;
          }
          100% {
            clip-path: inset(0 0% 0 0);
            opacity: 1;
          }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(var(--era-accent), 0.3); }
          50% { box-shadow: 0 0 40px rgba(var(--era-accent), 0.6); }
        }
      `}</style>
    </main>
  );
}

/* ── Era Card Component ── */
function EraCard({
  era,
  idx,
  isActive,
  isEntering,
  onEnter,
  onLeave,
  onClick,
}: {
  era: (typeof eras)[0];
  idx: number;
  isActive: boolean;
  isEntering: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <Link
      href={era.link}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="block relative overflow-hidden rounded-2xl cursor-pointer group"
      style={{
        background: isActive
          ? `linear-gradient(135deg, rgba(${era.accentRgb},0.12) 0%, rgba(255,255,255,0.03) 100%)`
          : "rgba(255,255,255,0.03)",
        border: isActive
          ? `1px solid rgba(${era.accentRgb},0.35)`
          : "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        transform: isActive ? "translateX(6px)" : "translateX(0)",
      }}
    >
      {/* Shimmer on hover */}
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 40%, rgba(${era.accentRgb},0.08) 50%, transparent 60%)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 2s linear infinite",
          }}
        />
      )}

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
        style={{
          background: era.accent,
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "bottom",
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      <div className="flex items-center px-5 py-3 gap-5">
        {/* Index */}
        <div className="flex-shrink-0 w-12 text-center">
          <span
            className="font-headline font-bold"
            style={{
              fontSize: "1.2rem",
              color: isActive ? era.accent : "rgba(255,255,255,0.15)",
              transition: "all 0.4s ease",
              textShadow: isActive ? `0 0 20px ${era.accent}80` : "none",
            }}
          >
            {era.index}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span
              className="text-[8px] font-mono tracking-[0.5em] uppercase"
              style={{
                color: isActive ? era.accent : "rgba(255,255,255,0.25)",
                transition: "color 0.4s ease",
              }}
            >
              {era.subtitle}
            </span>
          </div>
          <h3
            className="font-headline font-bold leading-tight"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
              transition: "all 0.4s ease",
            }}
          >
            {era.title}
          </h3>
          <p
            className="text-[10px] font-mono tracking-[0.3em] uppercase mt-1"
            style={{
              color: isActive ? era.accent : "rgba(255,255,255,0.2)",
              transition: "color 0.4s ease",
            }}
          >
            {era.eraName}
          </p>
        </div>

        {/* Arabic Title + Arrow */}
        <div className="flex-shrink-0 flex flex-col items-end gap-3">
          <span
            className="text-sm font-light"
            style={{
              color: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)",
              transition: "all 0.4s ease",
              fontFamily: "serif",
              direction: "rtl",
            }}
          >
            {era.arabicTitle}
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: isActive ? era.accent : "transparent",
              border: isActive
                ? `1px solid ${era.accent}`
                : "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              transform: isActive ? "rotate(0deg) scale(1)" : "rotate(-45deg) scale(0.8)",
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isActive ? "#fff" : "rgba(255,255,255,0.3)"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${era.accent}, transparent)`,
          width: isActive ? "100%" : "0%",
          transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </Link>
  );
}
