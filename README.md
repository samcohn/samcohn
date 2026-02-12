# Sam Cohn Portfolio

Clean Next.js 15 base setup for www.samcohn.com

## Stack

- **Next.js 15** - App Router
- **React 19** - Latest React
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Component animations & spring physics
- **GSAP** - Advanced timeline animations
- **Lenis** - Smooth scroll
- **Three.js + React Three Fiber** - 3D graphics (for Rubik's Cube)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with font setup
│   ├── page.tsx         # Homepage (blank canvas)
│   ├── globals.css      # Global styles + Tailwind
│   └── fonts/           # Put Arizona Variable here
└── components/          # Your components go here
```

## Font Setup

Download Arizona Variable and place it here:
```
src/app/fonts/ArizonaVariable.woff2
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel dashboard for automatic deployments.

## Notes

- Completely blank starting point
- All animation libraries pre-installed
- Optimized for Vercel deployment
- Ready for your Rubik's Cube element
