"use client";

import { useEffect, useRef, useState } from "react";

interface Mashrabiya2DViewerProps {
  imageUrl?: string;
  patternType?:
    | "geometric"
    | "lattice"
    | "floral"
    | "hexagonal"
    | "star"
    | "none";
  title?: string;
  showOverlay?: boolean;
  height?: string;
  interactive?: boolean;
}

/**
 * 2D Mashrabiya Pattern Viewer
 * Displays 2D patterns, geometric designs, and technical drawings
 * with optional interactive overlay and pattern highlighting
 * 
 * Usage:
 * <Mashrabiya2DViewer
 *   imageUrl="/images/slide2-geo/ميموني عدل.jpeg"
 *   patternType="geometric"
 *   showOverlay={true}
 *   title="Geometric Pattern: Standard Mimoni"
 * />
 */
export function Mashrabiya2DViewer({
  imageUrl,
  patternType = "geometric",
  title,
  showOverlay = false,
  height = "400px",
  interactive = true,
}: Mashrabiya2DViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(!!imageUrl);
  const [zoom, setZoom] = useState(1);

  // Draw geometric pattern overlay
  const drawPatternOverlay = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    type: string
  ) => {
    ctx.strokeStyle = "rgba(201, 168, 76, 0.4)";
    ctx.lineWidth = 1;
    ctx.fillStyle = "rgba(201, 168, 76, 0.05)";

    switch (type) {
      case "geometric":
        // Draw geometric grid
        const gridSize = 40;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        break;

      case "hexagonal":
        // Draw hexagonal pattern
        const hexSize = 50;
        for (let x = 0; x < width; x += hexSize * 1.5) {
          for (let y = 0; y < height; y += hexSize) {
            drawHexagon(ctx, x + (y / hexSize) % 2 ? hexSize * 0.75 : 0, y, hexSize / 2);
          }
        }
        break;

      case "star":
        // Draw star pattern grid
        const starSize = 60;
        for (let x = 0; x < width; x += starSize) {
          for (let y = 0; y < height; y += starSize) {
            drawStar(ctx, x, y, 5, starSize / 4, starSize / 8);
          }
        }
        break;

      case "lattice":
        // Draw diagonal lattice
        const latticeSize = 35;
        for (let x = -height; x < width; x += latticeSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + height, height);
          ctx.stroke();
        }
        for (let x = -height; x < width; x += latticeSize) {
          ctx.beginPath();
          ctx.moveTo(x, height);
          ctx.lineTo(x + height, 0);
          ctx.stroke();
        }
        break;
    }
  };

  // Helper function to draw hexagon
  const drawHexagon = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number
  ) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  // Helper function to draw star
  const drawStar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    points: number,
    outerRadius: number,
    innerRadius: number
  ) => {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const containerWidth = canvas.parentElement?.clientWidth || 600;
    const containerHeight = parseInt(height);

    canvas.width = containerWidth;
    canvas.height = containerHeight;

    if (imageUrl && imageRef.current?.complete) {
      // Draw image
      const img = imageRef.current;
      const scale = Math.min(
        (containerWidth / img.naturalWidth) * zoom,
        (containerHeight / img.naturalHeight) * zoom
      );

      const scaledWidth = img.naturalWidth * scale;
      const scaledHeight = img.naturalHeight * scale;
      const x = (containerWidth - scaledWidth) / 2;
      const y = (containerHeight - scaledHeight) / 2;

      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      // Draw overlay pattern
      if (showOverlay && patternType !== "none") {
        ctx.save();
        ctx.globalAlpha = 0.3;
        drawPatternOverlay(ctx, containerWidth, containerHeight, patternType);
        ctx.restore();
      }

      setIsLoading(false);
    } else if (!imageUrl) {
      // Draw pattern without image
      ctx.fillStyle = "rgba(10, 8, 0, 0.8)";
      ctx.fillRect(0, 0, containerWidth, containerHeight);

      if (patternType !== "none") {
        drawPatternOverlay(ctx, containerWidth, containerHeight, patternType);
      }
    }
  }, [imageUrl, patternType, showOverlay, zoom, height]);

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prev) => {
      const newZoom = direction === "in" ? prev * 1.2 : prev / 1.2;
      return Math.min(Math.max(newZoom, 0.5), 3);
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    handleZoom(e.deltaY < 0 ? "in" : "out");
  };

  return (
    <div className="w-full relative bg-black/40 rounded-lg overflow-hidden" style={{ height }}>
      {title && (
        <div className="absolute top-4 left-4 z-20">
          <h3 className="text-white font-headline font-bold text-sm opacity-90">
            {title}
          </h3>
        </div>
      )}

      {isLoading && imageUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="text-center">
            <div className="mb-3 inline-block">
              <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-white text-sm">Loading Pattern...</p>
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onWheel={interactive ? handleWheel : undefined}
      />

      {imageUrl && (
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Pattern"
          className="hidden"
          onLoad={() => setIsLoading(false)}
        />
      )}

      {interactive && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={() => handleZoom("out")}
            className="bg-black/60 hover:bg-black/80 text-white p-2 rounded border border-[#C9A84C]/20 text-sm transition"
            title="Zoom out"
          >
            −
          </button>
          <span className="text-white/60 text-xs px-2">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => handleZoom("in")}
            className="bg-black/60 hover:bg-black/80 text-white p-2 rounded border border-[#C9A84C]/20 text-sm transition"
            title="Zoom in"
          >
            +
          </button>
        </div>
      )}

      <div className="absolute bottom-4 left-4 text-xs text-white/40 pointer-events-none">
        <p>Pattern: {patternType}</p>
      </div>
    </div>
  );
}
