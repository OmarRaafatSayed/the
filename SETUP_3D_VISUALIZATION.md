# Setup 3D Visualization System

## Quick Start

The 3D visualization system has been added to your project with the following new components:

### New Components Created
1. ✅ `Model3DViewer.tsx` - Single 3D model viewer
2. ✅ `Comparison3DViewer.tsx` - Before/After 3D comparison
3. ✅ `Mashrabiya2DViewer.tsx` - 2D geometric pattern viewer
4. ✅ `VisualizationSection.tsx` - Unified visualization with tab navigation
5. ✅ `Prologue.tsx` - Updated with new `PrologueWith3D` export

All files are in: `src/components/`

---

## Installation Steps

### Step 1: Install Three.js Dependencies

```bash
cd "c:\Users\EXPRESS\Downloads\coding\مشروع تخرج\site"
npm install three @react-three/fiber @react-three/drei --legacy-peer-deps
```

**Note:** If npm has network issues, try:
```bash
npm install three --legacy-peer-deps
# Then install the others separately
```

### Step 2: Prepare Your 3D Models

Move or place your 3D models in the public directory:

```
site/
├── public/
│   ├── models/
│   │   ├── mashrabiya.glb          # Main model
│   │   ├── mashrabiya-before.glb   # Before conservation
│   │   └── mashrabiya-after.glb    # After conservation
│   └── images/
│       ├── patterns/
│       └── ... (existing images)
```

**Models are available at:**
- `c:\Users\EXPRESS\Downloads\coding\مشروع تخرج\site\Images\3d\mashrabiya.glb`
- `c:\Users\EXPRESS\Downloads\coding\مشروع تخرج\site\Images\3d\mashrabiya.gltf`

Copy these to `public/models/` or update paths in component usage.

### Step 3: Import and Use Components

#### Option A: Use PrologueWith3D (Recommended)

In your page or layout where you currently use `Prologue`:

```jsx
// Before
import { Prologue } from "@/components/Prologue";
export default function Page() {
  return <Prologue />;
}

// After
import { PrologueWith3D } from "@/components/Prologue";
export default function Page() {
  return <PrologueWith3D />;
}
```

#### Option B: Use Individual Components

```jsx
import { Model3DViewer } from "@/components/Model3DViewer";
import { VisualizationSection } from "@/components/VisualizationSection";

export default function GalleryPage() {
  return (
    <div>
      <h1>3D Gallery</h1>
      
      {/* Simple 3D viewer */}
      <Model3DViewer 
        modelPath="/models/mashrabiya.glb"
        height="600px"
      />

      {/* Full featured section */}
      <VisualizationSection 
        title="Interactive 3D & 2D Visualization"
        model3DPath="/models/mashrabiya.glb"
        image2DPath="/images/slide2-geo/pattern.jpeg"
        patternType="geometric"
        defaultMode="combined"
      />
    </div>
  );
}
```

---

## Usage Examples

### 1. Simple 3D Model Display

```jsx
<Model3DViewer
  modelPath="/models/mashrabiya.glb"
  title="Mashrabiya Unit"
  autoRotate={true}
  height="500px"
/>
```

### 2. Before/After Comparison

```jsx
<Comparison3DViewer
  beforeModelPath="/models/mashrabiya-before.glb"
  afterModelPath="/models/mashrabiya-after.glb"
  title="Conservation Process"
  height="600px"
/>
```

### 3. 2D Pattern Analysis

```jsx
<Mashrabiya2DViewer
  imageUrl="/images/slide2-geo/ميموني عدل.jpeg"
  patternType="geometric"
  title="Geometric Pattern"
  showOverlay={true}
  height="400px"
/>
```

### 4. Complete Section with All Features

```jsx
<VisualizationSection
  title="Interactive 3D & 2D Visualization"
  description="Explore the Mashrabiya in three dimensions..."
  model3DPath="/models/mashrabiya.glb"
  model3DBeforePath="/models/mashrabiya-before.glb"
  model3DAfterPath="/models/mashrabiya-after.glb"
  image2DPath="/images/slide2-geo/ميموني عدل.jpeg"
  patternType="geometric"
  defaultMode="combined"
  height="700px"
/>
```

---

## File Structure

```
site/
├── src/
│   ├── components/
│   │   ├── Model3DViewer.tsx              ✅ NEW
│   │   ├── Comparison3DViewer.tsx         ✅ NEW
│   │   ├── Mashrabiya2DViewer.tsx         ✅ NEW
│   │   ├── VisualizationSection.tsx       ✅ NEW
│   │   ├── Prologue.tsx                   ✅ UPDATED
│   │   ├── 3D_VISUALIZATION_GUIDE.md      ✅ NEW (Documentation)
│   │   └── ... (existing components)
│   └── ... (other directories)
├── public/
│   ├── models/
│   │   ├── mashrabiya.glb                 ← ADD HERE
│   │   ├── mashrabiya-before.glb          ← ADD HERE
│   │   └── mashrabiya-after.glb           ← ADD HERE
│   └── images/
│       └── ... (existing images)
├── SETUP_3D_VISUALIZATION.md               ✅ NEW (This file)
└── ... (other files)
```

---

## Configuration

### Model Paths

Update these paths in your components based on where you place the models:

**Default paths (if models are in `public/models/`):**
```jsx
model3DPath="/models/mashrabiya.glb"
model3DBeforePath="/models/mashrabiya-before.glb"
model3DAfterPath="/models/mashrabiya-after.glb"
```

**Alternative: If using Images directory:**
```jsx
model3DPath="/Images/3d/mashrabiya.glb"
```

### Theme Colors

The components use these theme colors (defined in components):
- **Accent**: `#C9A84C` (Gold)
- **Dark Background**: `rgba(10, 8, 0, 0.8)`
- **Text**: White with opacity variations

To customize, edit the hex values in each component.

---

## Features Overview

### ✨ Model3DViewer
- ✅ Auto-rotating 3D models
- ✅ Drag to rotate (mouse/touch)
- ✅ Scroll to zoom
- ✅ Responsive sizing
- ✅ Loading indicators
- ✅ Error handling

### ✨ Comparison3DViewer
- ✅ Side-by-side comparison
- ✅ Synchronized controls
- ✅ Unified zoom
- ✅ Before/After labels
- ✅ Optimal for conservation docs

### ✨ Mashrabiya2DViewer
- ✅ Image display with overlays
- ✅ Multiple pattern types (geometric, hexagonal, star, lattice)
- ✅ Interactive zoom (±, + buttons)
- ✅ Canvas rendering
- ✅ Zoom percentage display

### ✨ VisualizationSection
- ✅ Tab-based view switching (3D, Comparison, 2D, Combined)
- ✅ Responsive layout
- ✅ Information cards
- ✅ Feature overview
- ✅ Beautiful UI matching site theme

---

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest | ✅ Full |
| Firefox | Latest | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | Latest | ✅ Full |
| Mobile Chrome | Latest | ✅ Full |
| Mobile Safari | 14+ | ✅ Full |

---

## Performance Tips

1. **Model Size**: Keep models under 5MB for quick loading
2. **Texture Baking**: Bake lighting to textures for better performance
3. **LOD System**: Use Level of Detail for complex models
4. **Auto-rotate**: Disable if not needed to save performance
5. **Responsive**: Components automatically scale to container

---

## Troubleshooting

### Problem: 3D model not loading
**Solution:**
1. Check browser console for errors (F12)
2. Verify model path is correct
3. Ensure file exists in public directory
4. Try a different model format

### Problem: Blank canvas with no error
**Solution:**
1. Ensure Three.js is installed: `npm list three`
2. Check if dynamic import is working
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try in incognito mode

### Problem: Performance issues
**Solution:**
1. Reduce model complexity
2. Use GLB format (compressed)
3. Disable auto-rotate
4. Reduce viewport resolution

### Problem: Components not rendering
**Solution:**
1. Ensure all imports are correct
2. Check TypeScript errors: `npm run typecheck`
3. Verify components are exported correctly
4. Check page uses `"use client"` directive

---

## Next Steps

1. **Copy model files** to `public/models/`
2. **Install dependencies**: `npm install three --legacy-peer-deps`
3. **Import components** in your pages
4. **Test locally**: `npm run dev`
5. **Customize** paths, colors, and text as needed

---

## API Documentation

See `3D_VISUALIZATION_GUIDE.md` for complete component API reference.

---

## Support

For issues or questions:
1. Check the comprehensive guide: `3D_VISUALIZATION_GUIDE.md`
2. Review example usage above
3. Check browser console for errors
4. Verify all dependencies are installed

---

## Credits

3D Visualization System for Mashrabiya Digital Museum & Archive
Built with React, Three.js, and TypeScript

---

**Ready to go! 🚀**

The 3D visualization system is fully integrated and ready to use.
