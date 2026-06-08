"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

const consolidationImages = [
  {
    src: "/images/conservation/consolidation/consolidation_1.jpg",
    alt: "Consolidation — Stage 1",
    label: "Initial Application",
    caption:
      "First coat of consolidant applied to stabilise loose wood fibres and fragmented joints.",
  },
  {
    src: "/images/conservation/consolidation/consolidation_2.jpg",
    alt: "Consolidation — Stage 2",
    label: "Penetration & Absorption",
    caption:
      "Consolidant penetrates deep into degraded wood cells, restoring structural cohesion.",
  },
  {
    src: "/images/conservation/consolidation/consolidation_3.jpg",
    alt: "Consolidation — Stage 3",
    label: "Surface Treatment",
    caption:
      "Surface consolidation treatment ensuring full coverage across all exposed areas.",
  },
  {
    src: "/images/conservation/consolidation/consolidation_4.jpg",
    alt: "Consolidation — Stage 4",
    label: "Final Assessment",
    caption:
      "Post-consolidation inspection confirming material stability and structural integrity.",
  },
];

const N = consolidationImages.length;

// ── Entrance animation ────────────────────────────────────────────────────────
function AnimatedSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Coverflow Carousel ────────────────────────────────────────────────────────
function CoverflowCarousel() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (animating) return;
      setAnimating(true);
      setActive((prev) => (prev + dir + N) % N);
      setTimeout(() => setAnimating(false), 600);
    },
    [animating]
  );

  const prev = () => go(-1);
  const next = () => go(1);

  // Swipe / drag support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  // Click a side card → navigate to it
  const goTo = (idx: number) => {
    if (idx === active || animating) return;
    setAnimating(true);
    setActive(idx);
    setTimeout(() => setAnimating(false), 600);
  };

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <div style={{ width: "100%", userSelect: "none" }}>
      {/* Track */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(480px, 72vw, 820px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1200px",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {consolidationImages.map((img, i) => {
          // offset relative to active: -1, 0, +1, etc.
          let offset = i - active;
          // Wrap around for seamless loop
          if (offset > N / 2) offset -= N;
          if (offset < -N / 2) offset += N;

          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 1;

          // ── position & style per slot ──────────────────────────────────────
          const centerW = "min(62%, 500px)";
          const sideW = "min(38%, 310px)";

          // translateX: side cards sit ~46% from center
          const tx = offset === 0 ? "0%" : offset > 0 ? "82%" : "-82%";

          // Z depth
          const tz = isCenter ? "0px" : "-80px";

          // Y lift for center
          const ty = isCenter ? "-8px" : "0px";

          // Rotation tilt
          const ry = isCenter ? "0deg" : offset > 0 ? "28deg" : "-28deg";

          // Scale
          const scale = isCenter ? 1 : 0.78;

          // Opacity
          const opacity = isVisible ? 1 : 0;

          // Z-index
          const zIndex = isCenter ? 10 : Math.abs(offset) === 1 ? 5 : 1;

          const transform = isVisible
            ? `translateX(${tx}) translateY(${ty}) translateZ(${tz}) rotateY(${ry}) scale(${scale})`
            : `translateX(${offset > 0 ? "120%" : "-120%"}) scale(0.6)`;

          return (
            <div
              key={img.src}
              onClick={() => !isCenter && goTo(i)}
              style={{
                position: "absolute",
                width: isCenter ? centerW : sideW,
                aspectRatio: "4 / 5",
                borderRadius: "clamp(16px, 2vw, 28px)",
                overflow: "hidden",
                cursor: isCenter ? "default" : "pointer",
                zIndex,
                opacity,
                transform,
                transition: animating
                  ? "transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease, width 0.6s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s ease"
                  : "transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease, width 0.6s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s ease",
                boxShadow: isCenter
                  ? `0 32px 80px rgba(0,0,0,0.28), 0 0 0 1.5px rgba(${accentRgb},0.35), 0 0 60px rgba(${accentRgb},0.12)`
                  : "0 12px 32px rgba(0,0,0,0.18)",
                border: isCenter
                  ? `1.5px solid rgba(${accentRgb},0.45)`
                  : `1px solid rgba(${accentRgb},0.1)`,
                background: "#0d0b00",
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              {/* Image — object-contain so nothing gets cropped */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{ objectFit: "contain" }}
                quality={92}
                sizes="(max-width: 768px) 85vw, 52vw"
                priority={isCenter}
              />

              {/* Dark vignette bottom */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isCenter
                    ? "linear-gradient(to top, rgba(10,8,0,0.72) 0%, rgba(10,8,0,0.1) 40%, transparent 65%)"
                    : "linear-gradient(to top, rgba(10,8,0,0.85) 0%, rgba(10,8,0,0.45) 60%, rgba(10,8,0,0.2) 100%)",
                  pointerEvents: "none",
                  transition: "background 0.5s ease",
                }}
              />

              {/* Gold glow bottom — center only */}
              {isCenter && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse at 50% 105%, rgba(${accentRgb},0.25) 0%, transparent 60%)`,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Center: index badge + label + caption */}
              {isCenter && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "clamp(16px,3vw,28px) clamp(14px,2.5vw,24px) clamp(14px,2.5vw,22px)",
                    zIndex: 3,
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      background: `rgba(${accentRgb},0.15)`,
                      border: `1px solid rgba(${accentRgb},0.35)`,
                      borderRadius: "20px",
                      padding: "2px 10px",
                      fontSize: "8px",
                      fontFamily: "monospace",
                      letterSpacing: "0.3em",
                      color: accent,
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                  </div>
                  <p
                    style={{
                      fontSize: "clamp(0.75rem,2vw,1rem)",
                      fontFamily: "monospace",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: accent,
                      marginBottom: "6px",
                      lineHeight: 1.2,
                    }}
                  >
                    {img.label}
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(0.68rem,1.4vw,0.8rem)",
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.65,
                      maxWidth: "300px",
                    }}
                  >
                    {img.caption}
                  </p>
                </div>
              )}

              {/* Side card: subtle label + "click to view" hint */}
              {!isCenter && isVisible && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "12px 14px",
                    zIndex: 3,
                    pointerEvents: "none",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.58rem",
                      fontFamily: "monospace",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: `rgba(${accentRgb},0.6)`,
                    }}
                  >
                    {img.label}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* ── Prev arrow ── */}
        <button
          onClick={prev}
          aria-label="Previous image"
          style={{
            position: "absolute",
            left: "clamp(4px,2vw,16px)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            width: "clamp(36px,5vw,50px)",
            height: "clamp(36px,5vw,50px)",
            borderRadius: "50%",
            background: "rgba(10,8,0,0.55)",
            border: `1.5px solid rgba(${accentRgb},0.3)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            transition: "background 0.25s, border-color 0.25s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = `rgba(${accentRgb},0.9)`;
            (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,8,0,0.55)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = `rgba(${accentRgb},0.3)`;
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* ── Next arrow ── */}
        <button
          onClick={next}
          aria-label="Next image"
          style={{
            position: "absolute",
            right: "clamp(4px,2vw,16px)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            width: "clamp(36px,5vw,50px)",
            height: "clamp(36px,5vw,50px)",
            borderRadius: "50%",
            background: "rgba(10,8,0,0.55)",
            border: `1.5px solid rgba(${accentRgb},0.3)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            transition: "background 0.25s, border-color 0.25s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = `rgba(${accentRgb},0.9)`;
            (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,8,0,0.55)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = `rgba(${accentRgb},0.3)`;
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* ── Dot indicators ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          marginTop: "24px",
        }}
      >
        {consolidationImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to image ${i + 1}`}
            style={{
              width: active === i ? "28px" : "7px",
              height: "7px",
              borderRadius: "4px",
              background: active === i ? accent : `rgba(${accentRgb},0.28)`,
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════════════════════════════════════════════
export function ConsolidationSection() {
  return (
    <div
      className="w-full py-20 px-5 sm:px-8 md:px-14"
      style={{
        background: "#faf8f4",
        borderTop: "1px solid rgba(201,168,76,0.1)",
      }}
    >
      {/* ── Header ── */}
      <AnimatedSection>
        <div className="flex flex-col items-center text-center mb-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "40px",
                background: `linear-gradient(to right, transparent, rgba(${accentRgb},0.55))`,
              }}
            />
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" style={{ opacity: 0.7 }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span
              style={{
                fontSize: "8px",
                fontFamily: "monospace",
                letterSpacing: "0.48em",
                color: accent,
                textTransform: "uppercase",
              }}
            >
              04 — Conservation · Section III
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" style={{ opacity: 0.7 }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <div
              style={{
                height: "1px",
                width: "40px",
                background: `linear-gradient(to left, transparent, rgba(${accentRgb},0.55))`,
              }}
            />
          </div>

          <h2
            className="font-headline font-bold"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              color: "#1a1400",
              lineHeight: 1.12,
              letterSpacing: "-0.01em",
            }}
          >
            Wood{" "}
            <span style={{ color: accent, fontStyle: "italic" }}>
              Consolidation
            </span>
          </h2>

          <div
            style={{
              marginTop: "14px",
              height: "1px",
              width: "56px",
              background: `rgba(${accentRgb},0.3)`,
              borderRadius: "2px",
            }}
          />

          <p
            style={{
              marginTop: "12px",
              fontSize: "11px",
              color: "rgba(0,0,0,0.38)",
              letterSpacing: "0.05em",
              lineHeight: 1.7,
            }}
          >
            Use arrows, dots, or swipe to navigate · click a side card to jump
          </p>
        </div>
      </AnimatedSection>

      {/* ── Carousel ── */}
      <AnimatedSection delay={0.15}>
        <CoverflowCarousel />
      </AnimatedSection>

      {/* ── Bottom rule ── */}
      <AnimatedSection delay={0.3}>
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            opacity: 0.22,
          }}
        >
          <div style={{ height: "1px", flex: 1, maxWidth: "100px", background: `rgba(${accentRgb},1)` }} />
          <span style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.45em", color: "#1a1400", textTransform: "uppercase" }}>
            Phase_IV · Consolidation_Treatment
          </span>
          <div style={{ height: "1px", flex: 1, maxWidth: "100px", background: `rgba(${accentRgb},1)` }} />
        </div>
      </AnimatedSection>
    </div>
  );
}
