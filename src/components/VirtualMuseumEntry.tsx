"use client";

import { useState, useEffect, useRef } from "react";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

type Step = "idle" | "form" | "confirmed" | "museum";

interface TicketForm {
  name: string;
  phone: string;
  email: string;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Floating trigger button                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */
function EntryButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Pulse every 4 seconds to attract attention
  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 700);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "14px",
        padding: "18px 36px",
        border: `1px solid ${accent}`,
        borderRadius: "4px",
        background: hovered
          ? `rgba(${accentRgb},0.12)`
          : "rgba(10,8,0,0.7)",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        transition: "background 0.35s ease, box-shadow 0.35s ease, transform 0.25s ease",
        boxShadow: hovered
          ? `0 0 40px rgba(${accentRgb},0.35), 0 0 80px rgba(${accentRgb},0.15), inset 0 0 24px rgba(${accentRgb},0.06)`
          : `0 0 18px rgba(${accentRgb},0.15), inset 0 0 12px rgba(${accentRgb},0.04)`,
        transform: hovered ? "translateY(-2px) scale(1.02)" : "none",
      }}
    >
      {/* Pulsing ring */}
      {pulse && (
        <span
          style={{
            position: "absolute",
            inset: "-6px",
            borderRadius: "6px",
            border: `1px solid rgba(${accentRgb},0.5)`,
            animation: "ring-fade 0.7s ease forwards",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Icon — dome / museum */}
      <span
        style={{
          fontSize: "26px",
          lineHeight: 1,
          filter: `drop-shadow(0 0 8px rgba(${accentRgb},0.7))`,
          transition: "transform 0.3s ease",
          transform: hovered ? "rotate(-5deg) scale(1.15)" : "none",
        }}
      >
        🕌
      </span>

      <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px" }}>
        <span
          style={{
            fontSize: "9px",
            fontFamily: "monospace",
            letterSpacing: "0.5em",
            color: `rgba(${accentRgb},0.65)`,
            textTransform: "uppercase",
          }}
        >
          Virtual Museum
        </span>
        <span
          style={{
            fontSize: "1.1rem",
            fontFamily: "var(--font-headline, serif)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Enter in 3D
        </span>
      </span>

      {/* Arrow */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          marginLeft: "4px",
          transform: hovered ? "translateX(4px)" : "none",
          transition: "transform 0.3s ease",
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Ticket form modal                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */
function TicketModal({
  step,
  onClose,
  onConfirmed,
}: {
  step: Step;
  onClose: () => void;
  onConfirmed: () => void;
}) {
  const [form, setForm] = useState<TicketForm>({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<Partial<TicketForm>>({});
  const [submitting, setSubmitting] = useState(false);
  const [inner, setInner] = useState<"form" | "confirmed">("form");
  const nameRef = useRef<HTMLInputElement>(null);

  // Auto-focus name on open
  useEffect(() => {
    if (step === "form") {
      setInner("form");
      setTimeout(() => nameRef.current?.focus(), 250);
    }
  }, [step]);

  const validate = (): boolean => {
    const e: Partial<TicketForm> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Name required (min 2 chars)";
    if (!/^\+?[\d\s\-]{8,15}$/.test(form.phone.trim())) e.phone = "Valid phone required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate a brief "processing" pause
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setInner("confirmed");
  };

  if (step !== "form") return null;

  return (
    /* Backdrop */
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(6,5,0,0.88)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "fade-in 0.25s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "linear-gradient(145deg, #100d00, #0a0800)",
          border: `1px solid rgba(${accentRgb},0.25)`,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: `0 0 80px rgba(${accentRgb},0.15)`,
          animation: "slide-up 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 28px 18px",
            borderBottom: `1px solid rgba(${accentRgb},0.1)`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "8px",
                fontFamily: "monospace",
                letterSpacing: "0.5em",
                color: accent,
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Digital Museum · Free Access
            </p>
            <h2
              style={{
                fontSize: "1.4rem",
                fontFamily: "var(--font-headline, serif)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
              }}
            >
              Reserve Your<br />
              <span style={{ color: accent, fontStyle: "italic" }}>Free Ticket</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.3)",
              fontSize: "18px",
              lineHeight: 1,
              padding: "4px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "28px" }}>
          {inner === "form" ? (
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Name */}
              <Field
                label="Full Name"
                id="ticket-name"
                type="text"
                placeholder="e.g. Ahmed Hassan"
                value={form.name}
                error={errors.name}
                ref={nameRef}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              />
              {/* Phone */}
              <Field
                label="Phone Number"
                id="ticket-phone"
                type="tel"
                placeholder="e.g. +20 100 000 0000"
                value={form.phone}
                error={errors.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
              />
              {/* Email — optional */}
              <Field
                label="Email (optional)"
                id="ticket-email"
                type="email"
                placeholder="e.g. name@email.com"
                value={form.email}
                error={errors.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              />

              <button
                type="submit"
                disabled={submitting}
                style={{
                  marginTop: "4px",
                  padding: "15px",
                  background: submitting ? `rgba(${accentRgb},0.35)` : accent,
                  border: "none",
                  borderRadius: "6px",
                  color: "#000",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  cursor: submitting ? "not-allowed" : "pointer",
                  transition: "background 0.3s, opacity 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                {submitting ? (
                  <>
                    <span
                      style={{
                        display: "inline-block",
                        width: "14px",
                        height: "14px",
                        border: "2px solid #000",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spin 0.6s linear infinite",
                      }}
                    />
                    Processing…
                  </>
                ) : (
                  "Get Free Ticket →"
                )}
              </button>
            </form>
          ) : (
            /* ── Confirmation ── */
            <ConfirmationCard
              name={form.name}
              accent={accent}
              accentRgb={accentRgb}
              onEnter={() => {
                onConfirmed();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Re-usable form field                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
const Field = ({
  label, id, type, placeholder, value, error, onChange, ref: _ref,
}: {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  ref?: React.RefObject<HTMLInputElement>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        htmlFor={id}
        style={{
          fontSize: "8px",
          fontFamily: "monospace",
          letterSpacing: "0.4em",
          color: error ? "#f87171" : focused ? accent : "rgba(255,255,255,0.45)",
          textTransform: "uppercase",
          transition: "color 0.2s",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "12px 14px",
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${error ? "#f87171" : focused ? accent : "rgba(255,255,255,0.1)"}`,
          borderRadius: "6px",
          color: "#fff",
          fontSize: "0.9rem",
          outline: "none",
          fontFamily: "inherit",
          transition: "border-color 0.2s, background 0.2s",
        }}
      />
      {error && (
        <p
          style={{
            fontSize: "8px",
            fontFamily: "monospace",
            color: "#f87171",
            letterSpacing: "0.2em",
          }}
        >
          ↑ {error}
        </p>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Confirmation card                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */
function ConfirmationCard({
  name,
  accent,
  accentRgb,
  onEnter,
}: {
  name: string;
  accent: string;
  accentRgb: string;
  onEnter: () => void;
}) {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      style={{
        textAlign: "center",
        animation: "slide-up 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Big checkmark */}
      <div
        style={{
          width: "72px",
          height: "72px",
          margin: "0 auto 20px",
          borderRadius: "50%",
          border: `2px solid ${accent}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 40px rgba(${accentRgb},0.3)`,
          animation: "glow-pulse 2s ease infinite",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <p
        style={{
          fontSize: "8px",
          fontFamily: "monospace",
          letterSpacing: "0.5em",
          color: `rgba(${accentRgb},0.7)`,
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        Ticket Confirmed
      </p>

      <h3
        style={{
          fontSize: "1.4rem",
          fontFamily: "var(--font-headline, serif)",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "6px",
        }}
      >
        Welcome, {name.split(" ")[0]}!
      </h3>

      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: "320px", margin: "0 auto 8px" }}>
        Your <span style={{ color: accent, fontWeight: 600 }}>free ticket</span> to the Virtual Mashrabiya Museum has been reserved.
      </p>
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", marginBottom: "24px" }}>
        🎫 Enjoy unlimited 3D access — no expiry
      </p>

      {/* Ticket stub decoration */}
      <div
        style={{
          padding: "12px 20px",
          border: `1px dashed rgba(${accentRgb},0.3)`,
          borderRadius: "8px",
          background: `rgba(${accentRgb},0.05)`,
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <p style={{ fontSize: "7px", fontFamily: "monospace", letterSpacing: "0.4em", color: `rgba(${accentRgb},0.6)`, textTransform: "uppercase" }}>Mashrabiya Museum</p>
          <p style={{ fontSize: "8px", fontFamily: "monospace", color: "#fff", marginTop: "2px" }}>Virtual 3D Tour · Free Entry</p>
        </div>
        <span style={{ fontSize: "22px", filter: `drop-shadow(0 0 6px rgba(${accentRgb},0.6))` }}>🎟</span>
      </div>

      <button
        onClick={onEnter}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{
          width: "100%",
          padding: "15px",
          background: btnHovered ? `rgba(${accentRgb},0.2)` : "transparent",
          border: `1px solid ${accent}`,
          borderRadius: "6px",
          color: accent,
          fontSize: "11px",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "background 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "16px" }}>🕌</span>
        Enter Museum Now
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: btnHovered ? "translateX(4px)" : "none", transition: "transform 0.3s" }}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Root export – drop this anywhere in the Islamic page                      */
/* ─────────────────────────────────────────────────────────────────────────── */
export function VirtualMuseumEntry() {
  const [step, setStep] = useState<Step>("idle");

  // Inject keyframes once
  useEffect(() => {
    const id = "vme-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes fade-in   { from { opacity:0 } to { opacity:1 } }
      @keyframes slide-up  { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:none } }
      @keyframes spin       { to   { transform:rotate(360deg) } }
      @keyframes ring-fade  { from { opacity:1; transform:scale(1)     } to { opacity:0; transform:scale(1.35) } }
      @keyframes glow-pulse {
        0%,100% { box-shadow: 0 0 24px rgba(${accentRgb},0.25) }
        50%     { box-shadow: 0 0 50px rgba(${accentRgb},0.55) }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Open the 3D museum in a new tab after ticket confirmed
  const handleConfirmed = () => {
    window.open("/virtual-museum", "_blank", "noopener,noreferrer");
    setStep("idle");
  };

  return (
    <>
      {/* ── Trigger button ── */}
      <EntryButton onClick={() => setStep("form")} />

      {/* ── Ticket modal ── */}
      <TicketModal
        step={step}
        onClose={() => setStep("idle")}
        onConfirmed={handleConfirmed}
      />
    </>
  );
}
