"use client";

import { useState } from "react";
import { Model3DViewer } from "./Model3DViewer";
import { Comparison3DViewer } from "./Comparison3DViewer";
import { Mashrabiya2DViewer } from "./Mashrabiya2DViewer";

type ViewMode = "3d" | "comparison" | "2d" | "combined";

interface VisualizationSectionProps {
  title?: string;
  description?: string;
  model3DPath?: string;
  model3DBeforePath?: string;
  model3DAfterPath?: string;
  image2DPath?: string;
  patternType?: "geometric" | "lattice" | "floral" | "hexagonal" | "star" | "none";
  defaultMode?: ViewMode;
  height?: string;
}

/**
 * Unified Visualization Section
 * Combines 3D models, comparisons, and 2D patterns
 * with tab-based navigation
 * 
 * Usage:
 * <VisualizationSection
 *   title="Mashrabiya Conservation Documentation"
 *   model3DPath="/models/mashrabiya.glb"
 *   model3DBeforePath="/models/mashrabiya-before.glb"
 *   model3DAfterPath="/models/mashrabiya-after.glb"
 *   image2DPath="/images/pattern.jpg"
 *   patternType="geometric"
 *   defaultMode="combined"
 * />
 */
export function VisualizationSection({
  title = "3D & 2D Visualization",
  description,
  model3DPath,
  model3DBeforePath,
  model3DAfterPath,
  image2DPath,
  patternType = "geometric",
  defaultMode = "combined",
  height = "700px",
}: VisualizationSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultMode);

  const accent = "#C9A84C";

  return (
    <div className="w-full py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10" style={{
        background: "linear-gradient(135deg, rgba(201,168,76,0.03) 0%, transparent 50%, rgba(201,168,76,0.02) 100%)",
      }} />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div style={{ height: "1px", flex: 1, background: `rgba(201,168,76,0.2)` }} />
          <span
            style={{
              fontSize: "7px",
              fontFamily: "monospace",
              letterSpacing: "0.45em",
              color: accent,
              textTransform: "uppercase",
            }}
          >
            Interactive Features
          </span>
          <div style={{ height: "1px", flex: 1, background: `rgba(201,168,76,0.2)` }} />
        </div>

        {title && (
          <h2
            className="font-headline font-bold mb-3"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#fff",
            }}
          >
            {title}
          </h2>
        )}

        {description && (
          <p className="text-white/60 leading-relaxed max-w-2xl">{description}</p>
        )}
      </div>

      {/* Visualization Container - 3D Model Only */}
      <div className="max-w-7xl mx-auto">
        {model3DPath && (
          <div className="rounded-lg overflow-hidden border border-[#C9A84C]/10">
            <Model3DViewer
              modelPath={model3DPath}
              title="3D Mashrabiya Model"
              autoRotate={true}
              interactive={true}
              height={height}
            />
          </div>
        )}
      </div>
    </div>
  );
}
