"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const accent = "#C9A84C";
const accentRgb = "201,168,76";

const ZOOM = 3.5;
const LENS_SIZE = 260;

// ── Helper: get actual rendered image rect inside object-fit:contain container ─
function getContainedRect(
  imgNaturalW: number, imgNaturalH: number,
  containerW: number, containerH: number,
  containerLeft: number, containerTop: number
): { x: number; y: number; w: number; h: number } {
  const containerRatio = containerW / containerH;
  const imageRatio = imgNaturalW / imgNaturalH;
  let w: number, h: number;
  if (imageRatio > containerRatio) {
    w = containerW;
    h = containerW / imageRatio;
  } else {
    h = containerH;
    w = containerH * imageRatio;
  }
  const x = containerLeft + (containerW - w) / 2;
  const y = containerTop  + (containerH - h) / 2;
  return { x, y, w, h };
}

// ── Corner brackets ───────────────────────────────────────────────────────────
function CornerBrackets({ x, y, size }: { x: number; y: number; size: number }) {
  const half = size / 2 + 6;
  const s = 16;
  const t = 2;
  const c = accent;
  const corners = [
    { top: y - half,     left: x - half,     borderTop: `${t}px solid ${c}`, borderLeft:    `${t}px solid ${c}` },
    { top: y - half,     left: x + half - s, borderTop: `${t}px solid ${c}`, borderRight:   `${t}px solid ${c}` },
    { top: y + half - s, left: x - half,     borderBottom: `${t}px solid ${c}`, borderLeft: `${t}px solid ${c}` },
    { top: y + half - s, left: x + half - s, borderBottom: `${t}px solid ${c}`, borderRight:`${t}px solid ${c}` },
  ];
  return (
    <>
      {corners.map((style, i) => (
        <div key={i} style={{ position: "absolute", width: s, height: s, pointerEvents: "none", zIndex: 11, ...style }} />
      ))}
    </>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────
const mainImage = {
  src: "/images/conservation/previous-restoration/prev_3.jpg",
  alt: "Previous Restoration — Main",
  idx: 0,
};
const sideImages = [
  { src: "/images/conservation/previous-restoration/side_1.jpeg", alt: "Previous Restoration — Detail 1", idx: 1 },
  { src: "/images/conservation/previous-restoration/side_2.jpeg", alt: "Previous Restoration — Detail 2", idx: 2 },
];

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Zoom card (main large image only) ────────────────────────────────────────
function ZoomCard({
  img,
  sectionVisible,
}: {
  img: { src: string; alt: string; idx: number };
  sectionVisible: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef       = useRef<HTMLImageElement>(null);
  const [pos, setPos]         = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [imgRect, setImgRect] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const delay = 0.12;

  const measureImg = useCallback(() => {
    const imgEl    = imgRef.current;
    const container = containerRef.current;
    if (!imgEl || !container) return;
    const cRect = container.getBoundingClientRect();
    const rect = getContainedRect(
      imgEl.naturalWidth  || imgEl.width,
      imgEl.naturalHeight || imgEl.height,
      cRect.width, cRect.height, 0, 0
    );
    setImgRect(rect);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", measureImg);
    return () => window.removeEventListener("resize", measureImg);
  }, [measureImg]);

  const updatePos = useCallback((clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: Math.max(0, Math.min(r.width,  clientX - r.left)),
      y: Math.max(0, Math.min(r.height, clientY - r.top)),
    });
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => updatePos(e.clientX, e.clientY), [updatePos]);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    updatePos(e.touches[0].clientX, e.touches[0].clientY);
  }, [updatePos]);

  // cursor relative to the actual rendered image (strips letterbox)
  const relX = pos.x - imgRect.x;
  const relY = pos.y - imgRect.y;

  const overImage = imgRect.w > 0
    && relX >= 0 && relX <= imgRect.w
    && relY >= 0 && relY <= imgRect.h;

  const originX = imgRect.w > 0 ? Math.min(100, Math.max(0, (relX / imgRect.w) * 100)) : 50;
  const originY = imgRect.h > 0 ? Math.min(100, Math.max(0, (relY / imgRect.h) * 100)) : 50;

  // lens bg: map cursor position exactly onto zoomed image
  const bsW = imgRect.w * ZOOM;
  const bsH = imgRect.h * ZOOM;
  const bpX = -(relX * ZOOM - LENS_SIZE / 2);
  const bpY = -(relY * ZOOM - LENS_SIZE / 2);

  const lensBg: React.CSSProperties = imgRect.w ? {
    backgroundImage:    `url(${img.src})`,
    backgroundRepeat:   "no-repeat",
    backgroundSize:     `${bsW}px ${bsH}px`,
    backgroundPosition: `${bpX}px ${bpY}px`,
  } : {};

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => { setHovered(true); measureImg(); }}
      onMouseLeave={() => setHovered(false)}
      onTouchMove={onTouchMove}
      onTouchStart={(e) => { setHovered(true); measureImg(); updatePos(e.touches[0].clientX, e.touches[0].clientY); }}
      onTouchEnd={() => setHovered(false)}
      style={{
        position: "relative", width: "100%", height: "100%",
        borderRadius: "12px", overflow: "hidden",
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "scale(1)" : "scale(0.96) translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${sectionVisible ? delay : 0}s, box-shadow 0.35s ease, border-color 0.35s ease`,
        border: hovered ? `1.5px solid rgba(${accentRgb},0.55)` : `1px solid rgba(${accentRgb},0.14)`,
        boxShadow: hovered
          ? `0 24px 64px rgba(0,0,0,0.32), 0 0 40px rgba(${accentRgb},0.1)`
          : `0 4px 20px rgba(0,0,0,0.1)`,
        cursor: "crosshair",
        background: "#0e0c08",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={img.src} alt={img.alt}
        onLoad={measureImg}
        style={{
          display: "block", width: "100%", height: "100%",
          objectFit: "contain", objectPosition: "center",
          userSelect: "none", pointerEvents: "none",
          transform: (hovered && overImage) ? "scale(1.06)" : "scale(1)",
          transformOrigin: `${imgRect.x + (originX / 100) * imgRect.w}px ${imgRect.y + (originY / 100) * imgRect.h}px`,
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
        }}
      />
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",zIndex:2,
        background: hovered
          ? "linear-gradient(to top,rgba(8,6,0,0.7) 0%,rgba(8,6,0,0.05) 35%,transparent 55%)"
          : "linear-gradient(to top,rgba(8,6,0,0.45) 0%,rgba(8,6,0,0.02) 40%,transparent 60%)",
        transition:"background 0.4s ease" }} />
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",zIndex:2,
        background:`radial-gradient(ellipse at 50% 115%,rgba(${accentRgb},0.16) 0%,transparent 55%)`,
        opacity:hovered?1:0,transition:"opacity 0.4s ease" }} />
      <div style={{ position:"absolute",top:12,left:12,zIndex:6,
        background:hovered?`rgba(${accentRgb},0.92)`:"rgba(8,6,0,0.55)",
        border:`1px solid rgba(${accentRgb},${hovered?0:0.3})`,
        borderRadius:20,padding:"4px 10px",fontSize:9,fontFamily:"monospace",
        letterSpacing:"0.16em",color:hovered?"#0a0800":accent,fontWeight:700,
        transition:"background 0.3s,color 0.3s,border-color 0.3s" }}>
        {String(img.idx + 1).padStart(2, "0")}
      </div>
      {/* Lens */}
      <div style={{
        position:"absolute",
        width:LENS_SIZE,height:LENS_SIZE,borderRadius:"50%",
        left:pos.x - LENS_SIZE/2, top:pos.y - LENS_SIZE/2,
        overflow:"hidden",
        border:`2px solid rgba(${accentRgb},0.9)`,
        boxShadow:`0 0 0 1px rgba(${accentRgb},0.25),0 8px 28px rgba(0,0,0,0.55)`,
        opacity:(hovered&&overImage)?1:0,transition:"opacity 0.18s ease",
        pointerEvents:"none",zIndex:10,...lensBg,
      }}>
        <div style={{position:"absolute",top:"50%",left:0,right:0,height:1,background:`rgba(${accentRgb},0.5)`,transform:"translateY(-50%)",pointerEvents:"none"}} />
        <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:`rgba(${accentRgb},0.5)`,transform:"translateX(-50%)",pointerEvents:"none"}} />
      </div>
      {(hovered&&overImage)&&<CornerBrackets x={pos.x} y={pos.y} size={LENS_SIZE}/>}
      <div style={{ position:"absolute",bottom:12,right:12,zIndex:5,pointerEvents:"none",
        background:"rgba(10,8,0,0.55)",border:`1px solid rgba(${accentRgb},0.3)`,
        borderRadius:8,padding:"4px 10px",backdropFilter:"blur(8px)" }}>
        <span style={{fontSize:7,fontFamily:"monospace",letterSpacing:"0.35em",textTransform:"uppercase",color:`rgba(${accentRgb},0.85)`}}>
          {(hovered&&overImage)?`×${ZOOM} ZOOM`:"HOVER TO ZOOM"}
        </span>
      </div>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:1,background:"radial-gradient(ellipse at center,transparent 60%,rgba(0,0,0,0.12) 100%)"}} />
    </div>
  );
}

// ── Plain card (side images, with zoom lens) ──────────────────────────────────
function PlainCard({
  img,
  sectionVisible,
}: {
  img: { src: string; alt: string; idx: number };
  sectionVisible: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef       = useRef<HTMLImageElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos]         = useState({ x: 0, y: 0 });
  const [imgRect, setImgRect] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const delay = 0.12 + img.idx * 0.1;

  const measureImg = useCallback(() => {
    const imgEl    = imgRef.current;
    const container = containerRef.current;
    if (!imgEl || !container) return;
    const cRect = container.getBoundingClientRect();
    const rect = getContainedRect(
      imgEl.naturalWidth  || imgEl.width,
      imgEl.naturalHeight || imgEl.height,
      cRect.width, cRect.height, 0, 0
    );
    setImgRect(rect);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", measureImg);
    return () => window.removeEventListener("resize", measureImg);
  }, [measureImg]);

  const updatePos = useCallback((clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: Math.max(0, Math.min(r.width,  clientX - r.left)),
      y: Math.max(0, Math.min(r.height, clientY - r.top)),
    });
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => updatePos(e.clientX, e.clientY), [updatePos]);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    updatePos(e.touches[0].clientX, e.touches[0].clientY);
  }, [updatePos]);

  const relX = pos.x - imgRect.x;
  const relY = pos.y - imgRect.y;

  const overImage = imgRect.w > 0
    && relX >= 0 && relX <= imgRect.w
    && relY >= 0 && relY <= imgRect.h;

  const originX = imgRect.w > 0 ? Math.min(100, Math.max(0, (relX / imgRect.w) * 100)) : 50;
  const originY = imgRect.h > 0 ? Math.min(100, Math.max(0, (relY / imgRect.h) * 100)) : 50;

  const bsW = imgRect.w * ZOOM;
  const bsH = imgRect.h * ZOOM;
  const bpX = -(relX * ZOOM - LENS_SIZE / 2);
  const bpY = -(relY * ZOOM - LENS_SIZE / 2);

  const lensBg: React.CSSProperties = imgRect.w ? {
    backgroundImage:    `url(${img.src})`,
    backgroundRepeat:   "no-repeat",
    backgroundSize:     `${bsW}px ${bsH}px`,
    backgroundPosition: `${bpX}px ${bpY}px`,
  } : {};

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => { setHovered(true); measureImg(); }}
      onMouseLeave={() => setHovered(false)}
      onTouchMove={onTouchMove}
      onTouchStart={(e) => { setHovered(true); measureImg(); updatePos(e.touches[0].clientX, e.touches[0].clientY); }}
      onTouchEnd={() => setHovered(false)}
      style={{
        position: "relative", width: "100%", height: "100%",
        borderRadius: 12, overflow: "hidden",
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "scale(1)" : "scale(0.96) translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${sectionVisible ? delay : 0}s, box-shadow 0.35s ease, border-color 0.35s ease`,
        border: hovered ? `1.5px solid rgba(${accentRgb},0.55)` : `1px solid rgba(${accentRgb},0.14)`,
        boxShadow: hovered
          ? `0 24px 64px rgba(0,0,0,0.32), 0 0 40px rgba(${accentRgb},0.1)`
          : `0 4px 20px rgba(0,0,0,0.1)`,
        cursor: "crosshair",
        background: "#0e0c08",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={img.src} alt={img.alt}
        onLoad={measureImg}
        style={{
          display: "block", width: "100%", height: "100%",
          objectFit: "contain", objectPosition: "center",
          userSelect: "none", pointerEvents: "none",
          transform: (hovered && overImage) ? "scale(1.06)" : "scale(1)",
          transformOrigin: `${imgRect.x + (originX / 100) * imgRect.w}px ${imgRect.y + (originY / 100) * imgRect.h}px`,
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
        }}
      />
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",zIndex:2,
        background: hovered
          ? "linear-gradient(to top,rgba(8,6,0,0.7) 0%,rgba(8,6,0,0.05) 35%,transparent 55%)"
          : "linear-gradient(to top,rgba(8,6,0,0.45) 0%,rgba(8,6,0,0.02) 40%,transparent 60%)",
        transition:"background 0.4s ease" }} />
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",zIndex:2,
        background:`radial-gradient(ellipse at 50% 115%,rgba(${accentRgb},0.16) 0%,transparent 55%)`,
        opacity:hovered?1:0,transition:"opacity 0.4s ease" }} />
      <div style={{ position:"absolute",top:12,left:12,zIndex:6,
        background:hovered?`rgba(${accentRgb},0.92)`:"rgba(8,6,0,0.55)",
        border:`1px solid rgba(${accentRgb},${hovered?0:0.3})`,
        borderRadius:20,padding:"4px 10px",fontSize:9,fontFamily:"monospace",
        letterSpacing:"0.16em",color:hovered?"#0a0800":accent,fontWeight:700,
        transition:"background 0.3s,color 0.3s,border-color 0.3s" }}>
        {String(img.idx + 1).padStart(2, "0")}
      </div>
      {/* Lens */}
      <div style={{
        position:"absolute",
        width:LENS_SIZE,height:LENS_SIZE,borderRadius:"50%",
        left:pos.x - LENS_SIZE/2, top:pos.y - LENS_SIZE/2,
        overflow:"hidden",
        border:`2px solid rgba(${accentRgb},0.9)`,
        boxShadow:`0 0 0 1px rgba(${accentRgb},0.25),0 8px 28px rgba(0,0,0,0.55)`,
        opacity:(hovered&&overImage)?1:0,transition:"opacity 0.18s ease",
        pointerEvents:"none",zIndex:10,...lensBg,
      }}>
        <div style={{position:"absolute",top:"50%",left:0,right:0,height:1,background:`rgba(${accentRgb},0.5)`,transform:"translateY(-50%)",pointerEvents:"none"}} />
        <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:`rgba(${accentRgb},0.5)`,transform:"translateX(-50%)",pointerEvents:"none"}} />
      </div>
      {(hovered&&overImage)&&<CornerBrackets x={pos.x} y={pos.y} size={LENS_SIZE}/>}
      <div style={{ position:"absolute",bottom:12,right:12,zIndex:5,pointerEvents:"none",
        background:"rgba(10,8,0,0.55)",border:`1px solid rgba(${accentRgb},0.3)`,
        borderRadius:8,padding:"4px 10px",backdropFilter:"blur(8px)" }}>
        <span style={{fontSize:7,fontFamily:"monospace",letterSpacing:"0.35em",textTransform:"uppercase",color:`rgba(${accentRgb},0.85)`}}>
          {(hovered&&overImage)?`×${ZOOM} ZOOM`:"HOVER TO ZOOM"}
        </span>
      </div>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:1,background:"radial-gradient(ellipse at center,transparent 60%,rgba(0,0,0,0.12) 100%)"}} />
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ visible }: { visible: boolean }) {
  return (
    <div className="flex flex-col items-center text-center mb-12" style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ height: 1, width: 32, background: `linear-gradient(to right, transparent, rgba(${accentRgb},0.5))` }} />
        <svg width="8" height="8" viewBox="0 0 10 10" style={{ opacity: 0.6 }}><polygon points="5,0 10,5 5,10 0,5" fill={accent} /></svg>
        <span style={{ fontSize: 8, fontFamily: "monospace", letterSpacing: "0.46em", color: accent, textTransform: "uppercase" }}>
          04 — Conservation · Section I
        </span>
        <svg width="8" height="8" viewBox="0 0 10 10" style={{ opacity: 0.6 }}><polygon points="5,0 10,5 5,10 0,5" fill={accent} /></svg>
        <div style={{ height: 1, width: 32, background: `linear-gradient(to left, transparent, rgba(${accentRgb},0.5))` }} />
      </div>
      <h2 className="font-headline font-bold" style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: "#1a1400", lineHeight: 1.12 }}>
        Previous <span style={{ color: accent, fontStyle: "italic" }}>Restoration</span>
      </h2>
      <div style={{ marginTop: 12, height: 1, width: 52, background: `rgba(${accentRgb},0.3)` }} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
export function PreviousRestorationSection() {
  const { ref, visible } = useReveal(0.08);
  return (
    <div ref={ref} className="w-full py-16 px-5 sm:px-8 md:px-14"
      style={{ background: "#faf8f4", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
      <SectionHeader visible={visible} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gridTemplateRows: `clamp(260px, 45vh, 520px) clamp(260px, 45vh, 520px)`,
        gap: 20, maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{ gridRow: "1 / 3" }}>
          <ZoomCard img={mainImage} sectionVisible={visible} />
        </div>
        {sideImages.map((img) => (
          <PlainCard key={img.src} img={img} sectionVisible={visible} />
        ))}
      </div>
      <div style={{
        marginTop: 44, display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
        opacity: visible ? 0.2 : 0, transition: "opacity 0.9s ease 0.8s",
      }}>
        <div style={{ height: 1, flex: 1, maxWidth: 90, background: `rgba(${accentRgb},1)` }} />
        <span style={{ fontSize: 7, fontFamily: "monospace", letterSpacing: "0.44em", color: "#1a1400", textTransform: "uppercase" }}>
          Phase_IV · Prior_Intervention_Record
        </span>
        <div style={{ height: 1, flex: 1, maxWidth: 90, background: `rgba(${accentRgb},1)` }} />
      </div>
    </div>
  );
}
