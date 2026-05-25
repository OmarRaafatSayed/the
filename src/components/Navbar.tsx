"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

const chapters = [
  { id: "documentation",    label: "Documentation" },
  { id: "characterization", label: "Characterization" },
  { id: "conservation",     label: "Conservation" },
];

/* back-link per page */
function getBackLink(pathname: string) {
  if (pathname.includes("/mashrabiya")) return { href: "/era/islamic", label: "Islamic Era" };
  if (pathname.includes("/era/islamic")) return { href: "/", label: "Entrance" };
  if (pathname.includes("/era/ancient-egyptian")) return { href: "/", label: "Entrance" };
  if (pathname.includes("/era/greco-roman")) return { href: "/", label: "Entrance" };
  return null;
}

/* center title per page */
function getCenterTitle(pathname: string) {
  if (pathname.includes("/mashrabiya")) return "Mashrabiya";
  if (pathname.includes("/era/islamic")) return "Islamic Era";
  if (pathname.includes("/era/ancient-egyptian")) return "Ancient Egyptian";
  if (pathname.includes("/era/greco-roman")) return "Greco-Roman";
  return null;
}

export function Navbar() {
  const pathname = usePathname() ?? "";
  const isMashrabiya = pathname.includes("/mashrabiya");
  const isHome = pathname === "/";

  /* don't render on home page */
  if (isHome) return null;

  return <NavbarInner pathname={pathname} isMashrabiya={isMashrabiya} />;
}

/* ── inner client component that uses hooks ── */
function NavbarInner({
  pathname,
  isMashrabiya,
}: {
  pathname: string;
  isMashrabiya: boolean;
}) {
  const [active, setActive] = useState<string>("history");
  const [chaptersVisible, setChaptersVisible] = useState(false);

  useEffect(() => {
    if (!isMashrabiya) return;
    const observers: IntersectionObserver[] = [];

    chapters.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    const trigger = document.getElementById("chapters-nav-trigger");
    if (trigger) {
      const showObs = new IntersectionObserver(
        ([entry]) => setChaptersVisible(!entry.isIntersecting),
        { threshold: 0 }
      );
      showObs.observe(trigger);
      observers.push(showObs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [isMashrabiya]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const backLink = getBackLink(pathname);
  const centerTitle = getCenterTitle(pathname);

  return (
    <nav
      className="fixed z-50"
      style={{
        /* float in the center with margin */
        top: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 48px)",
        maxWidth: "1400px",
        borderRadius: "999px",
        background: "rgba(10,8,0,0.65)",
        border: `1px solid rgba(${accentRgb},0.15)`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        padding: "8px 20px",
      }}
    >
      <div className="flex items-center justify-between gap-4" style={{ position: "relative" }}>

        {/* ── Left: back button ── */}
        {backLink ? (
          <Link
            href={backLink.href}
            className="group flex items-center gap-2 flex-shrink-0"
            style={{ textDecoration: "none" }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
              style={{
                border: `1px solid rgba(${accentRgb},0.3)`,
                background: `rgba(${accentRgb},0.06)`,
              }}
            >
              <ArrowLeft size={12} color={accent} />
            </div>
            <span style={{
              fontSize: "9px", fontFamily: "monospace",
              letterSpacing: "0.4em", textTransform: "uppercase",
              color: `rgba(${accentRgb},0.6)`,
            }}>
              {backLink.label}
            </span>
          </Link>
        ) : (
          <div className="w-24" />
        )}

        {/* ── Center: title OR chapter pills ── */}
        <div
          className="absolute left-1/2 flex items-center"
          style={{ transform: "translateX(-50%)" }}
        >
          {isMashrabiya ? (
            /* chapter pills — fade in after hero */
            <div
              style={{
                opacity: chaptersVisible ? 1 : 0,
                transform: chaptersVisible ? "translateY(0)" : "translateY(-6px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                pointerEvents: chaptersVisible ? "auto" : "none",
              }}
            >
              <div
                className="flex items-center gap-1 px-2 py-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(${accentRgb},0.18)`,
                  borderRadius: "999px",
                }}
              >
                {chapters.map((ch) => {
                  const isActive = active === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => scrollTo(ch.id)}
                      style={{
                        background: isActive ? accent : "transparent",
                        borderRadius: "999px",
                        border: "none",
                        cursor: "pointer",
                        padding: "5px 16px",
                        transition: "background 0.3s",
                      }}
                    >
                      <span style={{
                        fontSize: "10px",
                        fontFamily: "monospace",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: isActive ? "#000" : "rgba(255,255,255,0.4)",
                        fontWeight: isActive ? 700 : 500,
                        whiteSpace: "nowrap",
                        transition: "color 0.3s",
                      }}>
                        {ch.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* plain title */
            centerTitle && (
              <div className="flex items-center gap-3">
                <div style={{ height: "1px", width: "20px", background: `rgba(${accentRgb},0.3)` }} />
                <span style={{
                  fontSize: "9px", fontFamily: "monospace",
                  letterSpacing: "0.5em", textTransform: "uppercase",
                  color: `rgba(${accentRgb},0.75)`,
                  whiteSpace: "nowrap",
                }}>
                  {centerTitle}
                </span>
                <div style={{ height: "1px", width: "20px", background: `rgba(${accentRgb},0.3)` }} />
              </div>
            )
          )}
        </div>

        {/* ── Right: placeholder to balance layout ── */}
        <div className="w-24 flex-shrink-0" />

      </div>
    </nav>
  );
}
