# Martin Atanasov — Portfolio

A world-class personal portfolio website built to showcase frontend/UI craft. The portfolio itself is the work sample — every spacing choice, animation timing, and component structure is intentional.

## Stack

| Tool | Role |
|---|---|
| **React 18** | UI framework, hooks-only |
| **Vite 5** | Build tool, HMR |
| **TypeScript** | Type safety throughout |
| **Framer Motion** | Spring physics, scroll animations, layout transitions |
| **CSS Custom Properties + CSS Modules** | Zero-runtime design tokens, scoped styles |

No UI kits. Every component is custom-built to demonstrate CSS skill.

## Design System

- **Colors**: Near-black `#09090B` base, layered surfaces, single indigo `#6366F1` accent
- **Spacing**: 4px base grid (`--sp-1` through `--sp-32`)
- **Typography**: Inter variable font, fluid `clamp()` scale from `--text-xs` to `--text-6xl`
- **Motion**: Spring-based Framer Motion, `prefers-reduced-motion` respected everywhere

## Features

- Animated gradient mesh hero (no particle.js)
- Magnetic CTA button (cursor-tracking spring physics)
- 3D tilt + spotlight glow on project cards
- Smooth scroll with active section nav highlight (IntersectionObserver + Framer Motion `layoutId`)
- Staggered section reveal animations on scroll
- Custom scrollbar, selection color, focus rings
- Responsive at 375px, 768px, 1280px+
- Full keyboard navigation, semantic HTML, ARIA labels
- `prefers-reduced-motion` support

## Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173

# Type check
npx tsc --noEmit

# Production build
npm run build
# → dist/
```

## Deploy

### Vercel (recommended)
1. Push to GitHub
2. Import repo at vercel.com/new
3. Framework preset: Vite — deploy

### Netlify
1. `npm run build`
2. Drag `dist/` folder to app.netlify.com/drop

### Manual
Upload the `dist/` directory to any static host (Cloudflare Pages, GitHub Pages, S3, etc.)

## Customisation

All content lives in `src/data/content.ts` — edit projects, skills, and personal facts there.
Design tokens are in `src/styles/tokens.css`.

## Contact form (Web3Forms)

The contact form sends messages straight to your inbox — no backend needed.

1. Go to [web3forms.com](https://web3forms.com) and enter your email (`matanasov573@gmail.com`) to get a free **Access Key**.
2. Open `.env` and paste it:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your-access-key-here
   ```
3. Restart `npm run dev` (Vite reads `.env` at startup).

When deploying (Vercel/Netlify), add the same `VITE_WEB3FORMS_ACCESS_KEY` as an environment variable in the host's dashboard. Until a key is set, the form shows a "not configured" message instead of sending.
