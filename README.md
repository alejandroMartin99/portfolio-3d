# Portfolio 3D — Alejandro Martín Iglesias

A 3D scrollytelling portfolio built with **Angular 18 + Three.js + GSAP/Lenis**.
Single-page narrative that takes the visitor through the chapters of an aerospace
engineer who ended up writing the software that keeps Eurofighters flying.

## Architecture

```
src/
├── app/
│   ├── app.component.ts            ← shell (routing only)
│   ├── app.config.ts               ← Angular bootstrap config
│   ├── app.routes.ts
│   ├── pages/
│   │   └── home.component.ts       ← lays out canvas + nav + sections
│   ├── core/
│   │   ├── data/portfolio.data.ts  ← ⭐ ALL CONTENT lives here
│   │   ├── scenes/stages.ts        ← every 3D stage (one per chapter)
│   │   └── services/
│   │       ├── scroll.service.ts       ← Lenis + ScrollTrigger
│   │       └── three-engine.service.ts ← shared scene/camera/renderer
│   ├── shared/
│   │   ├── components/
│   │   │   ├── scene-canvas/       ← fixed full-viewport WebGL canvas
│   │   │   └── nav/                ← floating chapter dots
│   │   └── directives/
│   │       └── reveal.directive.ts ← ScrollTrigger fade-in for any element
│   └── sections/
│       ├── hero.component.ts       ← 00 / Intro
│       ├── origins.component.ts    ← 01 / UPM, propulsion
│       ├── bridge.component.ts     ← 02 / TFG (the bridge to data)
│       ├── ineco.component.ts      ← 03 / INECO + ENAIRE
│       ├── master.component.ts     ← 04 / Universidad Europea
│       ├── bertrandt.component.ts  ← 05 / Eurofighter ⭐ climax
│       ├── stack.component.ts      ← 06 / Tech stack
│       ├── projects.component.ts   ← 07 / Side projects
│       └── contact.component.ts    ← 08 / Contact
├── styles.scss                     ← global tokens (colors, type, scroll)
└── index.html
```

### How the 3D works

A single Three.js scene is built once. Each chapter contributes a "stage" — a
group of meshes positioned at a specific Z offset along the world axis. The
**camera flies forward (−Z)** as the user scrolls, passing each stage in turn.

`stages.ts` is the place to tweak any 3D effect — every stage exposes:

```ts
{
  id: 'bertrandt',
  z: -60,                          // world position
  build: (ctx) => updater          // returns a per-frame callback
}
```

The updater receives `localProgress` (0 → 1 within its slice of the page) so
each stage can react to its own scroll range.

### How to update content

Open `src/app/core/data/portfolio.data.ts` — every word displayed comes from
that single file. Edit and the UI follows.

## Run locally

```bash
npm install
npm start            # ng serve --open
```

Open <http://localhost:4200>.

## Build

```bash
npm run build
```

Outputs to `dist/portfolio-3d/browser`.

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **New Project → Import Git Repository**.
3. Framework preset: leave as "Other" (Angular 18 with the application builder
   doesn’t need any preset; `vercel.json` already wires the build and rewrites).
4. Build command: `npm run build` (auto-detected).
5. Output directory: `dist/portfolio-3d/browser` (already in `vercel.json`).

That’s it — the SPA fallback rewrite is included.

## TODOs (need user input before going public)

These are clearly marked with `// TODO` comments. Search the codebase for them.

- [ ] **Side projects · stacks**. Confirm the actual stack of each project
      (Banka, Gymio, Endless Travels) in `portfolio.data.ts`.
- [ ] **Demo URLs**. Add a live demo URL for Banka & Gymio if any exist.
- [ ] **Public email**. Decide which email to expose in the contact section
      (`portfolio.data.ts → contact[]`).
- [ ] **Resume PDF**. Place a PDF at `public/resume.pdf` so the "Download CV"
      link works (or remove `profile.resumeUrl`).
- [ ] **Photo (optional)**. If you want to add a portrait, drop it in `public/`
      and reference it from `hero.component.ts`.
- [ ] **OG image**. Replace `<meta property="og:image">` once you have one.

## Performance notes

- Tree-shakes Three.js — only the primitives we use are imported.
- All animations run via `requestAnimationFrame` outside Angular’s zone.
- Devicepixelratio capped at 2 to avoid mobile thermal throttling.
- `prefers-reduced-motion` short-circuits all transitions.

## Credits

Design system, copy and 3D scene direction tailored to Alejandro Martín
Iglesias — Aerospace × Data × Frontend.
