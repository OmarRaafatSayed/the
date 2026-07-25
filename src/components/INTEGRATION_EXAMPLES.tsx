/**
 * Integration Examples for 3D Visualization Components
 * 
 * This file shows different ways to use the 3D visualization system
 * in your application. Copy and adapt these examples for your needs.
 */

import { Model3DViewer } from "./Model3DViewer";
import { Comparison3DViewer } from "./Comparison3DViewer";
import { Mashrabiya2DViewer } from "./Mashrabiya2DViewer";
import { VisualizationSection } from "./VisualizationSection";
import { Prologue, PrologueWith3D } from "./Prologue";

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 1: Using PrologueWith3D (Simplest - Recommended)
// ─────────────────────────────────────────────────────────────────
/**
 * Simply replace your Prologue with PrologueWith3D to get
 * the full hero section + 3D visualization automatically
 */
export function Example1_SimplePrologueWithSection() {
  return <PrologueWith3D />;
}

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 2: Individual 3D Model Viewer
// ─────────────────────────────────────────────────────────────────
/**
 * Use Model3DViewer for a simple single 3D model display
 * Perfect for gallery pages or detailed artifact views
 */
export function Example2_Simple3DViewer() {
  return (
    <div className="w-full py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-headline font-bold text-3xl text-white mb-8">
          Interactive 3D Model
        </h2>

        <Model3DViewer
          modelPath="/models/mashrabiya.glb"
          title="Mashrabiya Unit - Full Rotation"
          autoRotate={true}
          interactive={true}
          height="600px"
        />

        <div className="mt-8 text-white/70 text-sm">
          <p>
            Drag to rotate • Scroll to zoom • The model auto-rotates for easy
            viewing
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 3: Before/After Comparison
// ─────────────────────────────────────────────────────────────────
/**
 * Side-by-side 3D model comparison
 * Great for showing conservation/restoration process
 */
export function Example3_BeforeAfterComparison() {
  return (
    <div className="w-full py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-headline font-bold text-3xl text-white mb-4">
          Conservation Documentation
        </h2>
        <p className="text-white/60 mb-8">
          Examine the artifact before and after the conservation process. The
          models rotate in sync as you interact with them.
        </p>

        <Comparison3DViewer
          beforeModelPath="/models/mashrabiya-before.glb"
          afterModelPath="/models/mashrabiya-after.glb"
          title="M1 Unit - Conservation Process"
          height="650px"
        />

        <div className="mt-8 p-6 bg-[#C9A84C]/5 border border-[#C9A84C]/10 rounded-lg">
          <h3 className="text-white font-bold mb-3">📊 Conservation Details</h3>
          <ul className="text-white/70 text-sm space-y-2">
            <li>✓ Phase 1: Documentation and assessment</li>
            <li>✓ Phase 2: Cleaning and consolidation</li>
            <li>✓ Phase 3: Restoration and finishing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 4: 2D Geometric Pattern Analysis
// ─────────────────────────────────────────────────────────────────
/**
 * Display and analyze 2D geometric patterns
 * With optional overlay analysis grid
 */
export function Example4_GeometricPatternAnalysis() {
  return (
    <div className="w-full py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-headline font-bold text-3xl text-white mb-4">
          Geometric Pattern Analysis
        </h2>
        <p className="text-white/60 mb-8">
          Traditional Mashrabiya geometric patterns with interactive analysis tools
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pattern with overlay */}
          <div>
            <h3 className="text-white font-bold mb-4">Standard Pattern</h3>
            <Mashrabiya2DViewer
              imageUrl="/images/slide2-geo/ميموني عدل.jpeg"
              patternType="geometric"
              showOverlay={true}
              height="400px"
              interactive={true}
            />
          </div>

          {/* Hexagonal pattern */}
          <div>
            <h3 className="text-white font-bold mb-4">Hexagonal Variation</h3>
            <Mashrabiya2DViewer
              patternType="hexagonal"
              showOverlay={true}
              height="400px"
              interactive={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 5: Complete Unified Visualization Section
// ─────────────────────────────────────────────────────────────────
/**
 * All-in-one section with tab-based navigation
 * Shows 3D, comparison, 2D, and combined views
 * Most feature-rich option
 */
export function Example5_CompleteVisualizationSection() {
  return (
    <VisualizationSection
      title="Complete Interactive Documentation"
      description="Explore the Mashrabiya through multiple visualization modes: 3D interactive model, conservation comparison, and geometric pattern analysis."
      model3DPath="/models/mashrabiya.glb"
      model3DBeforePath="/models/mashrabiya-before.glb"
      model3DAfterPath="/models/mashrabiya-after.glb"
      image2DPath="/images/slide2-geo/ميموني عدل.jpeg"
      patternType="geometric"
      defaultMode="combined"
      height="750px"
    />
  );
}

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 6: Multi-Unit Gallery
// ─────────────────────────────────────────────────────────────────
/**
 * Display multiple units in a gallery format
 * Each with individual 3D models
 */
export function Example6_MultiUnitGallery() {
  const units = [
    {
      id: "M1",
      name: "Main Unit (M1)",
      modelPath: "/models/mashrabiya.glb",
      period: "12th Century",
      origin: "Islamic Cairo",
    },
    {
      id: "M2",
      name: "Secondary Unit (M2)",
      modelPath: "/models/mashrabiya-unit2.glb",
      period: "Ottoman Period",
      origin: "Islamic Cairo",
    },
    {
      id: "M3",
      name: "Tertiary Unit (M3)",
      modelPath: "/models/mashrabiya-unit3.glb",
      period: "Modern Reconstruction",
      origin: "Islamic Cairo",
    },
  ];

  return (
    <div className="w-full py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-headline font-bold text-3xl text-white mb-4">
          Mashrabiya Units Collection
        </h2>
        <p className="text-white/60 mb-12">
          Explore all three Mashrabiya units in interactive 3D
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((unit) => (
            <div
              key={unit.id}
              className="rounded-lg overflow-hidden border border-[#C9A84C]/10"
            >
              {/* 3D Model */}
              <div style={{ height: "300px" }}>
                <Model3DViewer
                  modelPath={unit.modelPath}
                  title={unit.name}
                  autoRotate={true}
                  height="100%"
                />
              </div>

              {/* Unit Info */}
              <div className="p-6 bg-black/40 border-t border-[#C9A84C]/10">
                <h3 className="font-headline font-bold text-white mb-2">
                  {unit.name}
                </h3>
                <p className="text-white/60 text-sm mb-3">{unit.origin}</p>
                <p className="text-[#C9A84C] text-sm font-semibold">{unit.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 7: Hero Section with Embedded Viewer
// ─────────────────────────────────────────────────────────────────
/**
 * Combine hero section with embedded 3D viewer
 * Good for presentation/narrative flow
 */
export function Example7_HeroWithEmbeddedViewer() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Prologue />

      {/* Embedded 3D Viewer */}
      <div
        className="w-full py-20 px-4 md:px-8"
        style={{
          background: "linear-gradient(180deg, rgba(10,8,0,0.5) 0%, rgba(10,8,0,0.8) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-3xl md:text-4xl text-white mb-4">
              Experience the 3D Model
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Rotate, zoom, and examine the Mashrabiya unit from every angle
            </p>
          </div>

          <Model3DViewer
            modelPath="/models/mashrabiya.glb"
            autoRotate={true}
            interactive={true}
            height="700px"
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 8: Detailed Documentation Page
// ─────────────────────────────────────────────────────────────────
/**
 * Complete documentation page with multiple visualization types
 * Sections for 3D, comparisons, patterns, and information
 */
export function Example8_DetailedDocumentationPage() {
  return (
    <div className="w-full space-y-16">
      {/* Section 1: 3D Model */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-headline font-bold text-3xl text-white mb-4">
            3D Model Examination
          </h2>
          <p className="text-white/60 mb-8">
            Full-dimensional view of the Mashrabiya unit for detailed examination
          </p>
          <div className="rounded-lg border border-[#C9A84C]/10 overflow-hidden">
            <Model3DViewer
              modelPath="/models/mashrabiya.glb"
              height="500px"
              autoRotate={true}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Conservation Process */}
      <section
        className="py-16 px-4 md:px-8"
        style={{ background: "rgba(201,168,76,0.03)" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="font-headline font-bold text-3xl text-white mb-4">
            Conservation Process
          </h2>
          <p className="text-white/60 mb-8">
            Before and after documentation of the restoration work
          </p>
          <Comparison3DViewer
            beforeModelPath="/models/mashrabiya-before.glb"
            afterModelPath="/models/mashrabiya-after.glb"
            height="550px"
          />
        </div>
      </section>

      {/* Section 3: Pattern Analysis */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-headline font-bold text-3xl text-white mb-4">
            Geometric Pattern Analysis
          </h2>
          <p className="text-white/60 mb-8">
            Study of the traditional geometric patterns used in Mashrabiya design
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Mashrabiya2DViewer
              imageUrl="/images/slide2-geo/ميموني عدل.jpeg"
              patternType="geometric"
              showOverlay={true}
              height="400px"
            />
            <Mashrabiya2DViewer
              patternType="star"
              showOverlay={true}
              height="400px"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Technical Specs */}
      <section
        className="py-16 px-4 md:px-8"
        style={{ background: "rgba(201,168,76,0.03)" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="font-headline font-bold text-3xl text-white mb-8">
            Technical Documentation
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Dimensions",
                content: "Detailed measurements and scaling",
              },
              { title: "Materials", content: "Wood type and joinery analysis" },
              {
                title: "Conservation",
                content: "Techniques and materials used",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-[#C9A84C]/10"
              >
                <h3 className="text-white font-bold mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// USAGE INSTRUCTIONS
// ─────────────────────────────────────────────────────────────────
/**
 * To use these examples in your application:
 * 
 * 1. Copy the example function you want
 * 2. Import it in your page/component
 * 3. Use it as a component
 * 
 * Example:
 * 
 * import { Example5_CompleteVisualizationSection } from "@/components/INTEGRATION_EXAMPLES";
 * 
 * export default function Page() {
 *   return <Example5_CompleteVisualizationSection />;
 * }
 * 
 * OR mix and match examples with your own code:
 * 
 * export default function CustomPage() {
 *   return (
 *     <div>
 *       <Example1_SimplePrologueWithSection />
 *       <Example4_GeometricPatternAnalysis />
 *     </div>
 *   );
 * }
 */

// Export all examples for easy importing
export const examples = {
  Example1_SimplePrologueWithSection,
  Example2_Simple3DViewer,
  Example3_BeforeAfterComparison,
  Example4_GeometricPatternAnalysis,
  Example5_CompleteVisualizationSection,
  Example6_MultiUnitGallery,
  Example7_HeroWithEmbeddedViewer,
  Example8_DetailedDocumentationPage,
};
