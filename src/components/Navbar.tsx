"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

const chapters = [
  { id: "history",          label: "History" },
  { id: "documentation",    label: "Documentation" },
  { id: "characterization", label: "Characterization" },
  { id: "conservation",     label: "Conservation" },
];

function getBackLink(pathname: string) {
  if (pathname.includes("/mashrabiya")) return { href: "/era/islamic", label: "Islamic Era" };
  if (pathname.includes("/era/islamic")) return { href: "/", label: "Entrance" };
  if (pathname.includes("/era/ancient-egyptian")) return { href: "/", label: "Entrance" };
  if (pathname.includes("/era/greco-roman")) return { href: "/", label: "Entrance" };
  return null;
}

function getCenterTitle(pathname: string) {
  if (pathname.includes("/mashrabiya")) return "Mashrabiya";
  if (pathname.includes("/era/islamic")) return "Islamic Era";
  if (pathname.includes("/era/ancient-egyptian")) return "Ancient Egyptian";
  if (pathname.includes("/era/greco-roman")) return "Greco-Roman";
  return null;
}

/* ── Hamburger icon ── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div style={{ width: 16, height: 14, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <span style={{
        display: "block", height: 1.5, borderRadius: 2,
        background: accent,
        transformOrigin: "left center",
        transform: open ? "rotate(45deg) translateY(-1px)" : "rotate(0)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        width: "100%",
      }} />
      <span style={{
        display: "block", height: 1.5, borderRadius: 2,
        background: accent,
        opacity: open ? 0 : 1,
        transform: open ? "scaleX(0)" : "scaleX(1)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
        width: "100%",
      }} />
      <span style={{
        display: "block", height: 1.5, borderRadius: 2,
        background: accent,
        transformOrigin: "left center",
        transform: open ? "rotate(-45deg) translateY(1px)" : "rotate(0)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        width: "100%",
      }} />
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname() ?? "";
  const isMashrabiya = pathname.includes("/mashrabiya");
  const isHome = pathname === "/";
  if (isHome) return null;
  return <NavbarInner pathname={pathname} isMashrabiya={isMashrabiya} />;
}

function NavbarInner({
  pathname,
  isMashrabiya,
}: {
  pathname: string;
  isMashrabiya: boolean;
}) {
  const [active, setActive] = useState<string>("history");
  const [chaptersVisible, setChaptersVisible] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    if (!isMashrabiya) return;
    const updateActive = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let found = chapters[0].id;
      for (const { id } of chapters) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
          found = id;
        }
      }
      setActive(found);
    };
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();

    const trigger = document.getElementById("chapters-nav-trigger");
    if (trigger) {
      const showObs = new IntersectionObserver(
        ([entry]) => setChaptersVisible(!entry.isIntersecting),
        { threshold: 0 }
      );
      showObs.observe(trigger);
      return () => {
        window.removeEventListener("scroll", updateActive);
        showObs.disconnect();
      };
    }
    return () => window.removeEventListener("scroll", updateActive);
  }, [isMashrabiya]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const backLink = getBackLink(pathname);
  const centerTitle = getCenterTitle(pathname);

  return (
    <>
      {/* ── Hamburger toggle button — always visible ── */}
      <button
        onClick={() => setNavVisible((v) => !v)}
        aria-label={navVisible ? "Hide navigation" : "Show navigation"}
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          zIndex: 60,
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: navVisible ? `rgba(${accentRgb},0.12)` : `rgba(${accentRgb},0.9)`,
          border: `1px solid rgba(${accentRgb},${navVisible ? 0.25 : 0})`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background 0.3s ease, border-color 0.3s ease",
          boxShadow: navVisible ? "none" : `0 4px 20px rgba(${accentRgb},0.35)`,
        }}
      >
        <HamburgerIcon open={!navVisible} />
      </button>

      {/* ── Navbar ── */}
      <nav
        className="fixed z-50"
        style={{
          top: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 24px)",
          maxWidth: "1400px",
          borderRadius: "999px",
          background: "rgba(10,8,0,0.65)",
          border: `1px solid rgba(${accentRgb},0.15)`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          padding: "8px 14px",
          /* hide / show animation */
          opacity: navVisible ? 1 : 0,
          transform: navVisible
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(-14px)",
          pointerEvents: navVisible ? "auto" : "none",
          transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="flex items-center justify-between gap-2" style={{ position: "relative" }}>

          {/* ── Left: back button ── */}
          {backLink ? (
            <Link
              href={backLink.href}
              className="group flex items-center gap-1.5 flex-shrink-0"
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
              <span className="hidden sm:inline" style={{
                fontSize: "9px", fontFamily: "monospace",
                letterSpacing: "0.4em", textTransform: "uppercase",
                color: `rgba(${accentRgb},0.6)`,
              }}>
                {backLink.label}
              </span>
            </Link>
          ) : (
            <div className="w-7" />
          )}

          {/* ── Center: title OR chapter pills ── */}
          <div className="flex-1 flex items-center justify-center">
            {isMashrabiya ? (
              <div
                style={{
                  opacity: chaptersVisible ? 1 : 0,
                  transform: chaptersVisible ? "translateY(0)" : "translateY(-6px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  pointerEvents: chaptersVisible ? "auto" : "none",
                }}
              >
                <div
                  className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1"
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
                          padding: "5px 10px",
                          transition: "background 0.3s",
                        }}
                      >
                        <span style={{
                          fontSize: "9px",
                          fontFamily: "monospace",
                          letterSpacing: "0.1em",
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
              centerTitle && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div style={{ height: "1px", width: "16px", background: `rgba(${accentRgb},0.3)` }} />
                  <span style={{
                    fontSize: "8px", fontFamily: "monospace",
                    letterSpacing: "0.4em", textTransform: "uppercase",
                    color: `rgba(${accentRgb},0.75)`,
                    whiteSpace: "nowrap",
                  }}>
                    {centerTitle}
                  </span>
                  <div style={{ height: "1px", width: "16px", background: `rgba(${accentRgb},0.3)` }} />
                </div>
              )
            )}
          </div>

          {/* ── Right: spacer (hamburger is outside nav) ── */}
          <div className="w-10 flex-shrink-0" />

        </div>
      </nav>
    </>
  );
}
