"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

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

const assemblyImages = [
  {
    src: "/images/conservation/assembly/Befor.jpg",
    alt: "Befor",
    label: "Befor",
  },
  {
    src: "/images/conservation/assembly/After.jpeg",
    alt: "After",
    label: "After",
  },
];

export function AssemblySection() {
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
        <div className="flex flex-col items-center text-center mb-14">
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
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke={accent}
              strokeWidth="1.5"
              style={{ opacity: 0.7 }}
            >
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
              04 — Conservation · Section IV
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke={accent}
              strokeWidth="1.5"
              style={{ opacity: 0.7 }}
            >
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
            Assembly with{" "}
            <span style={{ color: accent, fontStyle: "italic" }}>
              Falling Turnery Parts
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
        </div>
      </AnimatedSection>

      {/* ── Images ── */}
      <AnimatedSection delay={0.15}>
        <div
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          {assemblyImages.map((img) => (
            <div
              key={img.src}
              className="flex flex-col items-center gap-3"
              style={{ flex: "1 1 0", maxWidth: "420px", width: "100%" }}
            >
              <div
                className="relative w-full rounded-[1.5rem] overflow-hidden shadow-xl"
                style={{
                  border: `1px solid rgba(${accentRgb},0.15)`,
                  aspectRatio: "3/4",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "contain" }}
                  quality={95}
                  sizes="(max-width: 640px) 90vw, 420px"
                />
              </div>
              <span
                style={{
                  fontSize: "8px",
                  fontFamily: "monospace",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: `rgba(${accentRgb},0.7)`,
                }}
              >
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ── Bottom rule ── */}
      <AnimatedSection delay={0.3}>
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            opacity: 0.22,
          }}
        >
          <div
            style={{
              height: "1px",
              flex: 1,
              maxWidth: "100px",
              background: `rgba(${accentRgb},1)`,
            }}
          />
          <span
            style={{
              fontSize: "7px",
              fontFamily: "monospace",
              letterSpacing: "0.45em",
              color: "#1a1400",
              textTransform: "uppercase",
            }}
          >
            Phase_IV · Assembly_Treatment
          </span>
          <div
            style={{
              height: "1px",
              flex: 1,
              maxWidth: "100px",
              background: `rgba(${accentRgb},1)`,
            }}
          />
        </div>
      </AnimatedSection>
    </div>
  );
}
