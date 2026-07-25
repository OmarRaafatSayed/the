# 3D & 2D Visualization System

## Overview

A comprehensive visualization system for interactive 3D model viewing, before/after comparisons, and 2D geometric pattern analysis. Perfect for museum and conservation documentation.

## Components

### 1. Model3DViewer
Interactive 3D model viewer for displaying GLB/GLTF models.

**Features:**
- Auto-rotating 3D models
- Drag to rotate
- Scroll to zoom
- Touch gesture support
- Responsive sizing
- Loading states

**Usage:**
```jsx
import { Model3DViewer } from "@/components/Model3DViewer";

<Model3DViewer
  modelPath="/models/mashrabiya.glb"
  title="Mashrabiya Unit"
  autoRotate={true}
  interactive={true}
  height="500px"
/>
```

**Props:**
- `modelPath` (string): Path to GLB/GLTF model file
- `title` (string): Optional title displayed in top-left
- `autoRotate` (boolean): Enable auto-rotation (default: true)
- `interactive` (boolean): Enable mouse/touch controls (default: true)
- `height` (string): Container height (default: "500px")

---

### 2. Comparison3DViewer
Side-by-side 3D model comparison for conservation documentation.

**Features:**
- Two 3D models displayed side-by-side
- Synchronized rotation controls
- Unified zoom (affects both models)
- Before/After labels
- Perfect for conservation process visualization

**Usage:**
```jsx
import { Comparison3DViewer } from "@/components/Comparison3DViewer";

<Comparison3DViewer
  beforeModelPath="/models/mashrabiya-before.glb"
  afterModelPath="/models/mashrabiya-after.glb"
  title="Conservation Process"
  height="600px"
/>
```

**Props:**
- `beforeModelPath` (string): Path to before-state 3D model
- `afterModelPath` (string): Path to after-state 3D model
- `title` (string): Optional section title
- `height` (string): Container height (default: "600px")

---

### 3. Mashrabiya2DViewer
2D canvas-based viewer for geometric patterns and technical drawings.

**Features:**
- Image overlay with optional pattern drawing
- Multiple geometric pattern types
- Interactive zoom controls (±, + buttons)
- Zoom percentage display
- Canvas rendering for crisp patterns
- Responsive and performant

**Pattern Types:**
- `geometric` - Grid-based geometric patterns
- `hexagonal` - Hexagonal lattice
- `star` - Star pattern grid
- `lattice` - Diagonal lattice patterns
- `floral` - Floral/decorative patterns (ready to extend)
- `none` - No pattern overlay

**Usage:**
```jsx
import { Mashrabiya2DViewer } from "@/components/Mashrabiya2DViewer";

<Mashrabiya2DViewer
  imageUrl="/images/pattern.jpg"
  patternType="geometric"
  title="Geometric Pattern Analysis"
  showOverlay={true}
  interactive={true}
  height="400px"
/>
```

**Props:**
- `imageUrl` (string): Path to pattern image (optional)
- `patternType` (enum): Pattern to display
- `title` (string): Optional title
- `showOverlay` (boolean): Show pattern overlay (default: false)
- `height` (string): Container height (default: "400px")
- `interactive` (boolean): Enable zoom controls (default: true)

---

### 4. VisualizationSection
Complete unified visualization component with tab-based navigation.

**Features:**
- Multiple view modes (3D, Comparison, 2D, Combined)
- Tab-based mode switching
- Responsive grid layout
- Information cards with controls guide
- Model availability indicators
- Beautiful styling matching site theme

**View Modes:**
- `3d` - Single 3D model view
- `comparison` - Side-by-side before/after
- `2d` - Geometric pattern analysis
- `combined` - All visualizations stacked

**Usage:**
```jsx
import { VisualizationSection } from "@/components/VisualizationSection";

<VisualizationSection
  title="Interactive 3D & 2D Visualization"
  description="Explore the Mashrabiya in three dimensions..."
  model3DPath="/models/mashrabiya.glb"
  model3DBeforePath="/models/mashrabiya-before.glb"
  model3DAfterPath="/models/mashrabiya-after.glb"
  image2DPath="/images/pattern.jpg"
  patternType="geometric"
  defaultMode="combined"
  height="700px"
/>
```

**Props:**
- `title` (string): Section title
- `description` (string): Section description
- `model3DPath` (string): Path to single 3D model
- `model3DBeforePath` (string): Path to before model (for comparison)
- `model3DAfterPath` (string): Path to after model (for comparison)
- `image2DPath` (string): Path to 2D pattern image
- `patternType` (enum): Geometric pattern type
- `defaultMode` (enum): Initial view mode
- `height` (string): Container height

---

### 5. PrologueWith3D
Extended prologue component combining original hero section with 3D visualization.

**Usage:**
```jsx
import { PrologueWith3D } from "@/components/Prologue";

<PrologueWith3D />
```

This replaces `<Prologue />` and includes the interactive 3D section below.

---

## Required Dependencies

The components use Three.js for 3D rendering. Install with:

```bash
npm install three @react-three/fiber @react-three/drei --legacy-peer-deps
```

Note: Three.js is loaded dynamically, so components gracefully degrade if not installed.

---

## Model Files

### Available 3D Models

Located in `Images/3d/`:
- `mashrabiya.glb` - Main Mashrabiya model (optimized for web)
- `mashrabiya.gltf` - GLTF format (with separate materials/textures)

### Preparing Models

1. **Export from Blender/3D Software:**
   - Use GLB format for best web performance
   - Keep file size under 10MB
   - Bake textures for faster loading

2. **Optimize with tools:**
   ```bash
   # Using gltf-pipeline
   npx gltf-pipeline -i model.gltf -o model.glb
   ```

3. **Place in public directory:**
   ```
   public/
   ├── models/
   │   ├── mashrabiya.glb
   │   ├── mashrabiya-before.glb
   │   └── mashrabiya-after.glb
   └── images/
       └── patterns/
   ```

---

## Styling

All components use the site's accent color (`#C9A84C`) and follow the design system:

- Dark backgrounds: `rgba(10, 8, 0, ...)`
- Accent highlights: `#C9A84C`
- Text: White with varying opacity
- Borders: Subtle `#C9A84C` with 10-20% opacity

Custom CSS classes used:
- `font-headline` - Custom headline font
- `mashrabiya-overlay` - Texture overlay

---

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 14+)
- Mobile: Touch gesture support included

---

## Performance Tips

1. **Model Optimization:**
   - Use GLB format (compressed)
   - Limit model complexity (target: <100k triangles)
   - Bake lighting into textures

2. **Image Optimization:**
   - Use WebP format where possible
   - Compress with TinyPNG/ImageOptim
   - Lazy load images below the fold

3. **Code Optimization:**
   - Components use React.memo for models
   - Three.js renderer cleaned up on unmount
   - Event listeners removed on cleanup

---

## Accessibility

- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios meet WCAG AA
- Touch targets minimum 44x44px on mobile

---

## Troubleshooting

### 3D Model Not Loading
1. Check browser console for errors
2. Verify model path is correct
3. Ensure model is valid GLB/GLTF
4. Check file size (should be < 10MB)
5. Use a GLB validator tool

### Performance Issues
1. Reduce model complexity
2. Lower WebGL viewport resolution
3. Disable auto-rotate if not needed
4. Use fewer simultaneous viewers

### Touch Controls Not Working
1. Ensure `interactive={true}`
2. Check if device supports touch events
3. Verify viewport is not `user-scalable=no`

---

## Future Enhancements

- [ ] AR viewing mode
- [ ] Model download/export
- [ ] Annotation system
- [ ] 360° panoramic viewer
- [ ] Animation timeline
- [ ] Multi-model comparison
- [ ] Custom pattern generator
- [ ] PDF export for documentation

---

## Examples

### Full Featured Section
```jsx
<VisualizationSection
  title="Mashrabiya Conservation Study"
  description="Complete documentation with 3D models and geometric analysis"
  model3DPath="/models/mashrabiya.glb"
  model3DBeforePath="/models/m1-before.glb"
  model3DAfterPath="/models/m1-after.glb"
  image2DPath="/images/slide2-geo/pattern.jpeg"
  patternType="hexagonal"
  defaultMode="combined"
  height="800px"
/>
```

### Simple 3D Viewer
```jsx
<Model3DViewer
  modelPath="/models/mashrabiya.glb"
  title="Interactive 3D Model"
  height="600px"
/>
```

### Before/After Documentation
```jsx
<Comparison3DViewer
  beforeModelPath="/models/unit-before.glb"
  afterModelPath="/models/unit-after.glb"
  title="Conservation Progress"
  height="500px"
/>
```

### Pattern Analysis
```jsx
<Mashrabiya2DViewer
  imageUrl="/images/pattern.jpg"
  patternType="geometric"
  showOverlay={true}
  title="Geometric Pattern Analysis"
  height="450px"
/>
```

---

## API Reference

### Model3DViewer Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelPath | string | required | Path to GLB/GLTF model |
| title | string | undefined | Display title |
| autoRotate | boolean | true | Auto-rotate model |
| interactive | boolean | true | Enable controls |
| height | string | "500px" | Container height |

### Comparison3DViewer Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| beforeModelPath | string | required | Before state model |
| afterModelPath | string | required | After state model |
| title | string | undefined | Display title |
| height | string | "600px" | Container height |

### Mashrabiya2DViewer Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| imageUrl | string | undefined | Pattern image path |
| patternType | enum | "geometric" | Pattern type |
| title | string | undefined | Display title |
| showOverlay | boolean | false | Show pattern overlay |
| height | string | "400px" | Container height |
| interactive | boolean | true | Enable zoom controls |

### VisualizationSection Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | "3D & 2D Visualization" | Section title |
| description | string | undefined | Section description |
| model3DPath | string | undefined | Single 3D model path |
| model3DBeforePath | string | undefined | Before model path |
| model3DAfterPath | string | undefined | After model path |
| image2DPath | string | undefined | 2D image path |
| patternType | enum | "geometric" | Pattern type |
| defaultMode | enum | "combined" | Initial view mode |
| height | string | "700px" | Container height |

---

## License

Part of the Mashrabiya Digital Museum & Archive project.
