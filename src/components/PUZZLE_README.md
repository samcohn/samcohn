# Sliding Puzzle Entry Gate

## Installation

```bash
npm install framer-motion
```

## Setup

1. **Place your image** in the `/public` folder (e.g., `/public/puzzle-image.jpg`)

2. **Update the image path** in `PuzzleGatePage.tsx`:
   ```tsx
   imageSrc="/puzzle-image.jpg"
   ```

3. **Choose puzzle size**:
   - `size="2x2"` - 3 tiles + 1 empty (easier, 4-piece image works perfectly)
   - `size="4x4"` - 15 tiles + 1 empty (classic, more challenging)

## Your 4-Piece Image

Since you mentioned you have the photo split into 4 pieces, you have two options:

### Option 1: Use 2x2 Puzzle (Recommended for 4 pieces)
The component will automatically slice your complete image into a 2x2 grid. Just provide the full image, and it handles the splitting.

### Option 2: Use Pre-Split Images
If you want to use your existing 4 pieces, you'll need to modify the component to load individual tile images instead of slicing one image.

## Customization Ideas

### 1. Custom Cursor on Tiles
Add to the tile motion.div:
```tsx
whileHover={{ 
  scale: 0.98,
  cursor: 'grab'
}}
whileTap={{ cursor: 'grabbing' }}
```

### 2. Sound Effects
```tsx
const playSlideSound = () => {
  const audio = new Audio('/slide.mp3');
  audio.volume = 0.3;
  audio.play();
};

// Add to handleTileClick
onClick={() => {
  handleTileClick(tile);
  playSlideSound();
}}
```

### 3. Hint System
Add a button to briefly show the solution:
```tsx
const [showHint, setShowHint] = useState(false);

// Show completed image overlay for 2 seconds
const handleHint = () => {
  setShowHint(true);
  setTimeout(() => setShowHint(false), 2000);
};
```

### 4. Grain Texture Overlay
Add film grain for that cinematic feel:
```tsx
<div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
     style={{
       backgroundImage: 'url(/grain.png)',
       backgroundRepeat: 'repeat',
     }}
/>
```

### 5. Time-Based Challenge
Track solve time:
```tsx
const [startTime, setStartTime] = useState<number | null>(null);
const [solveTime, setSolveTime] = useState<number | null>(null);

// On first move:
if (moveCount === 0) setStartTime(Date.now());

// On completion:
if (complete && startTime) {
  setSolveTime((Date.now() - startTime) / 1000);
}
```

## Advanced: Pre-Split Image Version

If you really want to use your 4 individual image files:

```tsx
interface TileImages {
  [key: number]: string;
}

const tileImages: TileImages = {
  0: '/tiles/piece-1.jpg',
  1: '/tiles/piece-2.jpg',
  2: '/tiles/piece-3.jpg',
  // 3 is empty
};

// In the tile render:
<div
  className="w-full h-full"
  style={{
    backgroundImage: `url(${tileImages[tile.correctPosition]})`,
    backgroundSize: 'cover',
  }}
/>
```

## Styling Tips

### Match Your Brand
```css
/* Minimal white theme */
bg-white text-black
border-black/10

/* Film noir */
bg-zinc-950 text-white
border-white/10

/* Soft cream */
bg-[#FFF8F0] text-stone-900
border-stone-200
```

### Custom Fonts
```tsx
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

<h1 className={playfair.className}>Solve to Enter</h1>
```

## Next Steps

1. Test on mobile - touch interactions work perfectly
2. Add haptic feedback for mobile: `navigator.vibrate(10)`
3. Consider adding a "Skip Puzzle" option after 100 moves
4. Store completion state in localStorage to skip on return visits
5. Add analytics to track average solve time

## Performance

- Framer Motion handles 60fps animations
- Image optimization via Next.js Image component for faster loads
- Spring physics feel natural and responsive
- Puzzle solvability is guaranteed by the shuffle algorithm
