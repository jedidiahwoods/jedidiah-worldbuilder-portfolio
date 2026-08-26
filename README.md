# Jedidiah — World Builder

An interactive 3D portfolio for **jedidiah.ai**: a living cosmos of neurons and stars.
The universe splits into two realms —

- **The Physical Realm** — a glowing holographic Earth orbited by physical creations (board game, travel backpack, production company)
- **The Digital Realm** — an electric neuron with signal pulses, carrying digital creations (Remember journal app, Pay Your Friends, Weekly Spending Budget)

Built with Vite + React + TypeScript + Three.js (react-three-fiber).

## Develop

```bash
npm install
npm run dev
```

## Edit the portfolio

- **Add / edit projects:** [`src/data/projects.ts`](src/data/projects.ts) — one entry per project; each belongs to a realm.
- **Swap in real media:** drop files into `public/media/<slug>/` and point the `cover` / `gallery` paths at them. `.jpg/.png/.webp/.mp4/.webm` all work — video is auto-detected. The current SVGs are styled placeholders.
- **Regenerate placeholders:** `node scripts/gen-placeholders.mjs`

## Design system

- Palette: deep-space ink `#030309`, starlight `#e9e7f5`, ember gold `#ffb36b` (physical), electric cyan `#59e0ff` / violet `#8b7bff` (digital)
- Type: **Julius Sans One** (display) + **Jost** (body)
- Mood: grand, epic, premium — additive glow, thin 1px lines, generous letterspacing

## Deploy

Hosted on Vercel; `vercel.json` provides SPA rewrites so deep links like `/project/remember` resolve.
