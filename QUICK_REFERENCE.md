# 3D Visualization System - Quick Reference Card

## ⚡ 30-Second Setup

```bash
# 1. Install
npm install three --legacy-peer-deps

# 2. Copy models to: public/models/mashrabiya.glb

# 3. Use in page:
import { PrologueWith3D } from "@/components/Prologue";
export default function Page() {
  return <PrologueWith3D />;
}

# 4. Done! 🎉
npm run dev
```

---

## 📦 Components

| Component | Use Case | Import |
|-----------|----------|--------|
| `Model3DViewer` | Single 3D model | `from "@/components/Model3DViewer"` |
| `Comparison3DViewer` | Before/After | `from "@/components/Comparison3DViewer"` |
| `Mashrabiya2DViewer` | 2D patterns | `from "@/components/Mashrabiya2DViewer"` |
| `VisualizationSection` | All-in-one | `from "@/components/VisualizationSection"` |
| `PrologueWith3D` | Hero + 3D | `from "@/components/Prologue"` |

---

## 🔧 Common Usage

### Single 3D Model
```jsx
<Model3DViewer modelPath="/models/mashrabiya.glb" height="600px" />
```

### Before/After
```jsx
<Comparison3DViewer
  beforeModelPath="/models/before.glb"
  afterModelPath="/models/after.glb"
  height="600px"
/>
```

### 2D Pattern
```jsx
<Mashrabiya2DViewer
  imageUrl="/images/pattern.jpg"
  patternType="geometric"
  height="400px"
/>
```

### Complete Section
```jsx
<VisualizationSection
  title="3D & 2D Visualization"
  model3DPath="/models/mashrabiya.glb"
  image2DPath="/images/pattern.jpg"
  defaultMode="combined"
/>
```

### Hero + 3D (Simplest!)
```jsx
<PrologueWith3D />
```

---

## 📋 Props Cheat Sheet

### Model3DViewer
| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `modelPath` | string | required | GLB/GLTF file path |
| `title` | string | - | Display title |
| `autoRotate` | boolean | true | Auto-rotate model |
| `interactive` | boolean | true | Enable mouse/touch |
| `height` | string | "500px" | Container height |

### Comparison3DViewer
| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `beforeModelPath` | string | required | Before model path |
| `afterModelPath` | string | required | After model path |
| `title` | string | - | Display title |
| `height` | string | "600px" | Container height |

### Mashrabiya2DViewer
| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `imageUrl` | string | - | Image file path |
| `patternType` | string | "geometric" | Pattern type |
| `title` | string | - | Display title |
| `showOverlay` | boolean | false | Show pattern grid |
| `interactive` | boolean | true | Enable zoom |
| `height` | string | "400px" | Container height |

### VisualizationSection
| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `title` | string | "3D & 2D Visualization" | Section title |
| `model3DPath` | string | - | 3D model path |
| `model3DBeforePath` | string | - | Before model path |
| `model3DAfterPath` | string | - | After model path |
| `image2DPath` | string | - | 2D image path |
| `patternType` | enum | "geometric" | Pattern type |
| `defaultMode` | enum | "combined" | Initial view mode |
| `height` | string | "700px" | Container height |

---

## 🎨 Pattern Types

```javascript
"geometric"   // Grid pattern
"hexagonal"   // Hexagonal lattice
"star"        // Star pattern grid
"lattice"     // Diagonal lattice
"floral"      // Floral (future)
"none"        // No pattern overlay
```

---

## 👆 User Controls

| Action | Effect |
|--------|--------|
| **Drag** | Rotate 3D model |
| **Scroll/Wheel** | Zoom in/out |
| **Touch drag** | Rotate (mobile) |
| **Pinch zoom** | Zoom (mobile) |
| **+/- Buttons** | Zoom (2D pattern) |

---

## 📂 File Structure

```
Components:
├── Model3DViewer.tsx
├── Comparison3DViewer.tsx
├── Mashrabiya2DViewer.tsx
├── VisualizationSection.tsx
└── Prologue.tsx (updated)

Docs:
├── README_3D_SYSTEM.md (complete guide)
├── SETUP_3D_VISUALIZATION.md (installation)
├── 3D_VISUALIZATION_GUIDE.md (API reference)
├── 3D_FEATURES_SUMMARY.md (features)
└── QUICK_REFERENCE.md (this file)

Models:
├── public/models/mashrabiya.glb
├── public/models/mashrabiya-before.glb (optional)
└── public/models/mashrabiya-after.glb (optional)
```

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Models not loading | Check path, file exists, browser console |
| Blank screen | Verify Three.js installed, clear cache |
| Performance slow | Reduce model complexity, use GLB format |
| Touch not working | Enable `interactive={true}` |
| TypeScript errors | Check imports, run `npm run typecheck` |

---

## 📚 Documentation Map

| File | Use When |
|------|----------|
| **QUICK_REFERENCE.md** | Need quick lookup (this file) |
| **README_3D_SYSTEM.md** | General overview & guidance |
| **SETUP_3D_VISUALIZATION.md** | First time setup |
| **3D_VISUALIZATION_GUIDE.md** | Need detailed API docs |
| **3D_FEATURES_SUMMARY.md** | Want feature overview |
| **INTEGRATION_EXAMPLES.tsx** | Need code examples |

---

## 🎯 Common Tasks

### Add 3D viewer to page
```jsx
import { Model3DViewer } from "@/components/Model3DViewer";
export default function Page() {
  return <Model3DViewer modelPath="/models/mashrabiya.glb" />;
}
```

### Show before/after
```jsx
import { Comparison3DViewer } from "@/components/Comparison3DViewer";
export default function Page() {
  return (
    <Comparison3DViewer
      beforeModelPath="/models/before.glb"
      afterModelPath="/models/after.glb"
    />
  );
}
```

### Add to existing prologue
```jsx
// Change from:
<Prologue />
// To:
<PrologueWith3D />
```

### Show multiple models
```jsx
const models = [
  "/models/m1.glb",
  "/models/m2.glb",
  "/models/m3.glb"
];
return (
  <div className="grid md:grid-cols-3 gap-8">
    {models.map(path => (
      <Model3DViewer key={path} modelPath={path} height="300px" />
    ))}
  </div>
);
```

---

## 💡 Tips & Tricks

✅ Use `PrologueWith3D` for quickest integration
✅ Keep models under 5MB for fast loading
✅ Use GLB format (compressed better than GLTF)
✅ Test on mobile for touch controls
✅ Disable `autoRotate` if performance is slow
✅ Set `defaultMode="3d"` to show only 3D
✅ Use `height="100%"` for full container

---

## 🚀 Performance Checklist

- [ ] Models are GLB format
- [ ] File size under 5MB each
- [ ] Textures baked to models
- [ ] Auto-rotate disabled if not needed
- [ ] Components unmount properly
- [ ] No console errors
- [ ] Mobile performance tested

---

## 📞 When to Read Which Doc

**Just want to use it?**
→ This file + SETUP_3D_VISUALIZATION.md

**Need to customize?**
→ 3D_VISUALIZATION_GUIDE.md + source code

**Looking for examples?**
→ INTEGRATION_EXAMPLES.tsx

**Complete overview?**
→ README_3D_SYSTEM.md

**Troubleshooting?**
→ 3D_VISUALIZATION_GUIDE.md (section at bottom)

---

## ⚙️ Configuration

### Change accent color
Edit in component files:
```javascript
const accent = "#C9A84C";  // Change this to your color
```

### Change default height
```jsx
<Model3DViewer modelPath="..." height="800px" />
```

### Disable auto-rotate
```jsx
<Model3DViewer modelPath="..." autoRotate={false} />
```

### Show only 2D patterns
```jsx
<VisualizationSection defaultMode="2d" ... />
```

---

## ✅ Installation Verification

After installation, verify everything works:

```jsx
// Test Component
import { Model3DViewer } from "@/components/Model3DViewer";

export default function TestPage() {
  return (
    <Model3DViewer
      modelPath="/models/mashrabiya.glb"
      title="Test Model"
    />
  );
}
```

Visit page → See rotating 3D model → Installation successful! ✅

---

## 🎓 Learning Path

1. **Read** this file (5 min)
2. **Read** SETUP_3D_VISUALIZATION.md (10 min)
3. **Install** Three.js (5 min)
4. **Copy** models (2 min)
5. **Use** PrologueWith3D (2 min)
6. **Test** (5 min)
7. **Reference** 3D_VISUALIZATION_GUIDE.md (as needed)

**Total: ~30 minutes to full setup! ⚡**

---

## 🎉 You're All Set!

The system is ready to use. Start with:

1. Install: `npm install three --legacy-peer-deps`
2. Copy: Models to `public/models/`
3. Use: `<PrologueWith3D />`
4. Done!

---

**Questions? See the full documentation files! 📚**

---

*Last Updated: 2026*
*For: Mashrabiya Digital Museum & Archive*
