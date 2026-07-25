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

/* ── Animated hamburger / close icon ── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div style={{ width: 18, height: 14, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <span style={{
        display: "block", height: 2, borderRadius: 2, background: accent,
        transformOrigin: "left center",
        transform: open ? "rotate(45deg) translateY(-1px)" : "rotate(0)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        width: "100%",
      }} />
      <span style={{
        display: "block", height: 2, borderRadius: 2, background: accent,
        opacity: open ? 0 : 1,
        transform: open ? "scaleX(0)" : "scaleX(1)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
        width: "100%",
      }} />
      <span style={{
        display: "block", height: 2, borderRadius: 2, background: accent,
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Close drawer when a chapter is selected */
  const scrollTo = (id: string) => {
    window.dispatchEvent(new CustomEvent("openChapter", { detail: id }));
    setDrawerOpen(false);
  };

  useEffect(() => {
    if (!isMashrabiya) return;

    const onOpen = (e: Event) => {
      setActive((e as CustomEvent<string>).detail);
    };
    window.addEventListener("openChapter", onOpen);

    const updateActive = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      const order = ["conservation", "characterization", "documentation", "history"];
      for (const id of order) {
        const el = document.getElementById(`section-${id}`);
        if (
          el &&
          el.style.display !== "none" &&
          el.getBoundingClientRect().top + window.scrollY <= scrollY
        ) {
          setActive(id);
          return;
        }
      }
    };
    window.addEventListener("scroll", updateActive, { passive: true });

    const trigger = document.getElementById("chapters-nav-trigger");
    if (trigger) {
      const showObs = new IntersectionObserver(
        ([entry]) => setChaptersVisible(!entry.isIntersecting),
        { threshold: 0 }
      );
      showObs.observe(trigger);
      return () => {
        window.removeEventListener("openChapter", onOpen);
        window.removeEventListener("scroll", updateActive);
        showObs.disconnect();
      };
    }
    return () => {
      window.removeEventListener("openChapter", onOpen);
      window.removeEventListener("scroll", updateActive);
    };
  }, [isMashrabiya]);

  /* Close drawer on outside scroll */
  useEffect(() => {
    if (!drawerOpen) return;
    const close = () => setDrawerOpen(false);
    window.addEventListener("scroll", close, { once: true, passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [drawerOpen]);

  const backLink = getBackLink(pathname);
  const centerTitle = getCenterTitle(pathname);

  return (
    <>
      {/* ══════════════════════════════════════════════
          HAMBURGER BUTTON — visible only on mobile (md:hidden)
          On desktop the nav pill is always visible
      ══════════════════════════════════════════════ */}
      {isMashrabiya && chaptersVisible && (
        <button
          onClick={() => setDrawerOpen((v) => !v)}
          aria-label={drawerOpen ? "Close chapter menu" : "Open chapter menu"}
          className="md:hidden"
          style={{
            position: "fixed",
            top: "12px",
            right: "12px",
            zIndex: 70,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: drawerOpen
              ? `rgba(${accentRgb},0.95)`
              : "rgba(10,8,0,0.75)",
            border: `1.5px solid rgba(${accentRgb},${drawerOpen ? 0 : 0.3})`,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            boxShadow: drawerOpen
              ? `0 4px 24px rgba(${accentRgb},0.4)`
              : "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          <HamburgerIcon open={drawerOpen} />
        </button>
      )}

      {/* ══════════════════════════════════════════════
          MOBILE CHAPTER DRAWER
          Slides down from below the nav pill on mobile
      ══════════════════════════════════════════════ */}
      {isMashrabiya && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            top: "68px",           /* below the nav pill (12px top + ~44px pill + 12px gap) */
            left: "12px",
            right: "12px",
            zIndex: 65,
            borderRadius: "20px",
            background: "rgba(10,8,0,0.92)",
            border: `1px solid rgba(${accentRgb},0.22)`,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            overflow: "hidden",
            /* open/close animation */
            maxHeight: drawerOpen && chaptersVisible ? "320px" : "0px",
            opacity: drawerOpen && chaptersVisible ? 1 : 0,
            transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
            pointerEvents: drawerOpen && chaptersVisible ? "auto" : "none",
          }}
        >
          <div style={{ padding: "8px" }}>
            {chapters.map((ch, i) => {
              const isActive = active === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => scrollTo(ch.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "14px",
                    background: isActive ? `rgba(${accentRgb},0.14)` : "transparent",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.25s ease",
                    marginBottom: i < chapters.length - 1 ? "2px" : "0",
                  }}
                >
                  {/* Accent dot */}
                  <span style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: isActive ? accent : `rgba(${accentRgb},0.25)`,
                    flexShrink: 0,
                    transition: "background 0.25s ease",
                  }} />
                  {/* Number */}
                  <span style={{
                    fontSize: "10px",
                    fontFamily: "monospace",
                    letterSpacing: "0.2em",
                    color: `rgba(${accentRgb},${isActive ? 0.7 : 0.35})`,
                    fontWeight: 700,
                    flexShrink: 0,
                    transition: "color 0.25s ease",
                  }}>
                    0{chapters.indexOf(ch) + 1}
                  </span>
                  {/* Label */}
                  <span style={{
                    fontSize: "12px",
                    fontFamily: "monospace",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                    fontWeight: isActive ? 700 : 400,
                    flex: 1,
                    textAlign: "left",
                    transition: "color 0.25s ease",
                  }}>
                    {ch.label}
                  </span>
                  {/* Active indicator */}
                  {isActive && (
                    <div style={{
                      height: "1px",
                      width: "20px",
                      background: accent,
                      opacity: 0.7,
                    }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom accent line */}
          <div style={{
            height: "2px",
            background: `linear-gradient(to right, transparent, rgba(${accentRgb},0.4), transparent)`,
          }} />
        </div>
      )}

      {/* ══════════════════════════════════════════════
          MAIN NAV PILL
          - Desktop: full pill with back button + chapter pills centred
          - Mobile: compact pill with back button + title only
            (chapter pills move into the drawer above)
      ══════════════════════════════════════════════ */}
      <nav
        className="fixed z-50"
        style={{
          top: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          /* On mobile leave 56px on the right for the hamburger (44px + 12px gap) */
          width: "calc(100% - 24px)",
          maxWidth: "1400px",
          borderRadius: "999px",
          background: "rgba(10,8,0,0.70)",
          border: `1px solid rgba(${accentRgb},0.18)`,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          padding: "8px 12px",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            position: "relative",
            /* On mobile: leave room on right for the floating hamburger button */
            paddingRight: isMashrabiya && chaptersVisible ? "52px" : "0",
          }}
          className="md:pr-0"
        >

          {/* ── LEFT: back button ── */}
          {backLink ? (
            <Link
              href={backLink.href}
              className="group flex items-center gap-2 flex-shrink-0"
              style={{ textDecoration: "none", minHeight: "36px" }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid rgba(${accentRgb},0.3)`,
                  background: `rgba(${accentRgb},0.07)`,
                  flexShrink: 0,
                  transition: "transform 0.2s ease",
                }}
                className="group-hover:scale-110"
              >
                <ArrowLeft size={13} color={accent} />
              </div>
              {/* Label: show on sm+ screens */}
              <span
                className="hidden sm:inline"
                style={{
                  fontSize: "9px",
                  fontFamily: "monospace",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: `rgba(${accentRgb},0.6)`,
                  whiteSpace: "nowrap",
                }}
              >
                {backLink.label}
              </span>
            </Link>
          ) : (
            <div style={{ width: "30px" }} />
          )}

          {/* ── CENTER: desktop chapter pills OR page title ── */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minWidth: 0 }}>

            {/* Desktop chapter pills — hidden on mobile (md:flex) */}
            {isMashrabiya ? (
              <div
                className="hidden md:flex"
                style={{
                  opacity: chaptersVisible ? 1 : 0,
                  transform: chaptersVisible ? "translateY(0)" : "translateY(-6px)",
                  transition: "opacity 0.45s ease, transform 0.45s ease",
                  pointerEvents: chaptersVisible ? "auto" : "none",
                  alignItems: "center",
                  gap: "2px",
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(${accentRgb},0.16)`,
                  borderRadius: "999px",
                  padding: "4px",
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
                        padding: "5px 12px",
                        transition: "background 0.3s",
                        whiteSpace: "nowrap",
                        minHeight: "unset",
                        minWidth: "unset",
                      }}
                    >
                      <span style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: isActive ? "#000" : "rgba(255,255,255,0.45)",
                        fontWeight: isActive ? 700 : 500,
                        transition: "color 0.3s",
                      }}>
                        {ch.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {/* Mobile: active chapter label (Mashrabiya page) */}
            {isMashrabiya && chaptersVisible && (
              <button
                className="md:hidden flex items-center gap-2"
                onClick={() => setDrawerOpen((v) => !v)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: "999px",
                  minHeight: "unset",
                  minWidth: "unset",
                }}
              >
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: accent, display: "block",
                  boxShadow: `0 0 6px ${accent}`,
                  flexShrink: 0,
                }} />
                <span style={{
                  fontSize: "9px",
                  fontFamily: "monospace",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: accent,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}>
                  {chapters.find(c => c.id === active)?.label ?? "Chapters"}
                </span>
                {/* Chevron */}
                <svg
                  width="10" height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={accent}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: drawerOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    flexShrink: 0,
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            )}

            {/* Non-mashrabiya pages: page title */}
            {!isMashrabiya && centerTitle && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ height: "1px", width: "16px", background: `rgba(${accentRgb},0.3)` }} />
                <span style={{
                  fontSize: "9px",
                  fontFamily: "monospace",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: `rgba(${accentRgb},0.8)`,
                  whiteSpace: "nowrap",
                }}>
                  {centerTitle}
                </span>
                <div style={{ height: "1px", width: "16px", background: `rgba(${accentRgb},0.3)` }} />
              </div>
            )}
          </div>

          {/* ── RIGHT: spacer so center stays truly centred ── */}
          <div
            className="hidden md:block"
            style={{ width: "30px", flexShrink: 0 }}
          />

        </div>
      </nav>
    </>
  );
}
