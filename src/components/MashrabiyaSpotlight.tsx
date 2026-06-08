"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  MouseEvent,
} from "react";
import Image from "next/image";

interface MashrabiyaSpotlightProps {
  /** public path to the image */
  image: string;
  /** natural width of the image in px */
  naturalWidth: number;
  /** natural height of the image in px */
  naturalHeight: number;
  alt?: string;
  label?: string;
}

interface Point {
  x: number;
  y: number;
}

export function MashrabiyaSpotlight({
  image,
  naturalWidth,
  naturalHeight,
  alt = "Mashrabiya",
  label,
}: MashrabiyaSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [livePath, setLivePath] = useState<Point[]>([]);
  const [frozenPath, setFrozenPath] = useState<Point[]>([]);

  // ── position helper ──────────────────────────────────────
  const getPos = (e: MouseEvent<HTMLDivElement>): Point => {
    const rect = containerRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  // ── mouse handlers ────────────────────────────────────────
  const onMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    setFrozenPath([]);
    setLivePath([getPos(e)]);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isDrawing) return;
      setLivePath((prev) => [...prev, getPos(e)]);
    },
    [isDrawing]
  );

  const finish = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setFrozenPath(livePath);
    setLivePath([]);
  }, [isDrawing, livePath]);

  // ── canvas: draw live stroke ──────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const w = container.offsetWidth;
    const h = container.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    const pts = isDrawing ? livePath : frozenPath;
    if (pts.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
    if (!isDrawing) ctx.closePath();

    ctx.strokeStyle = "rgba(201,168,76,0.9)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash(isDrawing ? [5, 4] : []);
    ctx.stroke();
  }, [livePath, frozenPath, isDrawing]);

  // ── clip-path polygon ─────────────────────────────────────
  const w = containerRef.current?.offsetWidth ?? 1;
  const h = containerRef.current?.offsetHeight ?? 1;

  const hasMask = frozenPath.length >= 3;
  const clipPath = hasMask
    ? `polygon(${frozenPath
        .map((p) => `${(p.x / w) * 100}% ${(p.y / h) * 100}%`)
        .join(", ")})`
    : "polygon(0% 0%)";

  // aspect ratio of the real image
  const aspectRatio = `${naturalWidth} / ${naturalHeight}`;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* label */}
      {label && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            style={{
              width: "3px",
              height: "14px",
              background: "#C9A84C",
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              fontSize: "8px",
              fontFamily: "monospace",
              letterSpacing: "0.4em",
              color: "rgba(201,168,76,0.7)",
              textTransform: "uppercase",
            }}
          >
            {label}
          </span>
        </div>
      )}

      {/*
        Outer wrapper: full width, height determined by the image's
        natural aspect ratio → image is NEVER cropped.
      */}
      <div
        style={{
          width: "100%",
          aspectRatio,
          position: "relative",
        }}
      >
        {/* Inner interactive container fills the wrapper exactly */}
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={finish}
          onMouseLeave={finish}
          className="absolute inset-0 overflow-hidden rounded-xl select-none"
          style={{ cursor: "crosshair", background: "#0a0800" }}
        >
          {/* Dimmed base — object-contain so nothing is cropped */}
          <Image
            src={image}
            alt={alt}
            fill
            className="object-contain"
            quality={100}
            draggable={false}
            priority
            style={{
              opacity: hasMask ? 0.12 : 1,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Bright layer clipped to drawn polygon */}
          {hasMask && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ clipPath }}
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-contain"
                quality={100}
                draggable={false}
                style={{ filter: "brightness(1.3) contrast(1.1)" }}
              />
            </div>
          )}

          {/* Canvas: live drawing stroke */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 5 }}
          />

          {/* Idle hint */}
          <div
            className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none"
            style={{
              opacity: hasMask || isDrawing ? 0 : 0.6,
              transition: "opacity 0.3s ease",
              zIndex: 6,
            }}
          >
            <span
              style={{
                fontSize: "8px",
                fontFamily: "monospace",
                letterSpacing: "0.45em",
                color: "rgba(201,168,76,0.9)",
                textTransform: "uppercase",
              }}
            >
              Draw to inspect
            </span>
          </div>

          {/* Reset hint */}
          {hasMask && (
            <div
              className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none"
              style={{ zIndex: 6 }}
            >
              <span
                style={{
                  fontSize: "8px",
                  fontFamily: "monospace",
                  letterSpacing: "0.4em",
                  color: "rgba(201,168,76,0.45)",
                  textTransform: "uppercase",
                }}
              >
                Draw again to reset
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
