"use client";

import { MuseumEnvironment } from "@/components/MuseumEnvironment";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

export default function VirtualMuseumPage() {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", overflow: "hidden" }}>
      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: "14px 22px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>🕌</span>
          <div>
            <p
              style={{
                fontSize: "7px",
                fontFamily: "monospace",
                letterSpacing: "0.5em",
                color: `rgba(${accentRgb},0.6)`,
                textTransform: "uppercase",
              }}
            >
              Virtual Museum · 3D Environment
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                fontFamily: "serif",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Mashrabiya Hall
            </p>
          </div>
        </div>

        <button
          onClick={() => window.close()}
          style={{
            pointerEvents: "all",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "4px",
            color: "rgba(255,255,255,0.7)",
            fontSize: "9px",
            fontFamily: "monospace",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = accent;
            (e.currentTarget as HTMLElement).style.color = accent;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
          Close Tab
        </button>
      </div>

      {/* Full-screen 3D environment — no model, pure IBL */}
      <MuseumEnvironment
        environmentPath="/models/whale_skeleton_4k.exr"
        height="100vh"
        autoRotate={false}
        showHint={true}
      />
    </div>
  );
}
