/**
 * Generates styled SVG placeholder media for every project into
 * /public/media/<slug>/. Run once with:  node scripts/gen-placeholders.mjs
 * Replace the generated files with real photos/videos when ready.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const projects = [
  { slug: 'board-game', name: 'The Board Game', glyph: '♟', realm: 'physical' },
  { slug: 'travel-backpack', name: 'Travel Backpack', glyph: '⛰', realm: 'physical' },
  { slug: 'production-company', name: 'Production Company', glyph: '◉', realm: 'physical' },
  { slug: 'remember', name: 'Remember', glyph: '✦', realm: 'digital' },
  { slug: 'pay-your-friends', name: 'Pay Your Friends', glyph: '⇄', realm: 'digital' },
  { slug: 'weekly-budget', name: 'Weekly Spending Budget', glyph: '▦', realm: 'digital' },
]

const themes = {
  physical: { a: '#ffb36b', b: '#5e2f10', c: '#2a1408' },
  digital: { a: '#59e0ff', b: '#2a2470', c: '#0d1030' },
}

function seededRand(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function svg({ w, h, name, glyph, theme, label, seed }) {
  const rand = seededRand(seed)
  const stars = Array.from({ length: 70 }, () => {
    const x = (rand() * w).toFixed(1)
    const y = (rand() * h).toFixed(1)
    const r = (0.4 + rand() * 1.3).toFixed(2)
    const o = (0.15 + rand() * 0.5).toFixed(2)
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#e9e7f5" opacity="${o}"/>`
  }).join('\n    ')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="'Trebuchet MS', 'Segoe UI', sans-serif">
  <defs>
    <radialGradient id="bg" cx="50%" cy="42%" r="80%">
      <stop offset="0%" stop-color="${theme.b}"/>
      <stop offset="55%" stop-color="${theme.c}"/>
      <stop offset="100%" stop-color="#030309"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${theme.a}" stop-opacity="0.55"/>
      <stop offset="60%" stop-color="${theme.a}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${theme.a}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${stars}
  <circle cx="${w / 2}" cy="${h / 2 - h * 0.06}" r="${h * 0.34}" fill="url(#halo)"/>
  <circle cx="${w / 2}" cy="${h / 2 - h * 0.06}" r="${h * 0.17}" fill="none" stroke="${theme.a}" stroke-opacity="0.55" stroke-width="1.2"/>
  <circle cx="${w / 2}" cy="${h / 2 - h * 0.06}" r="${h * 0.23}" fill="none" stroke="${theme.a}" stroke-opacity="0.2" stroke-width="0.8" stroke-dasharray="2 6"/>
  <text x="50%" y="${h / 2 - h * 0.06}" text-anchor="middle" dominant-baseline="central" font-size="${h * 0.16}" fill="${theme.a}">${glyph}</text>
  <text x="50%" y="${h * 0.78}" text-anchor="middle" font-size="${h * 0.055}" letter-spacing="${h * 0.012}" fill="#e9e7f5" opacity="0.92">${name.toUpperCase()}</text>
  <text x="50%" y="${h * 0.86}" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="${h * 0.028}" letter-spacing="${h * 0.008}" fill="#e9e7f5" opacity="0.4">${label.toUpperCase()}</text>
</svg>
`
}

for (const p of projects) {
  const dir = join('public', 'media', p.slug)
  mkdirSync(dir, { recursive: true })
  const theme = themes[p.realm]
  writeFileSync(
    join(dir, 'cover.svg'),
    svg({ w: 1600, h: 900, name: p.name, glyph: p.glyph, theme, label: 'Placeholder · replace with real media', seed: p.slug.length * 31 })
  )
  for (let i = 1; i <= 3; i++) {
    writeFileSync(
      join(dir, `gallery-${i}.svg`),
      svg({ w: 800, h: 600, name: p.name, glyph: p.glyph, theme, label: `Artifact ${i} · placeholder`, seed: p.slug.length * 31 + i * 7 })
    )
  }
  console.log(`✓ ${p.slug}`)
}
