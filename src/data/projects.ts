/**
 * PORTFOLIO DATA — edit this file to update the site.
 *
 * To add a project: add an entry here and drop its media into
 * /public/media/<slug>/  (cover + gallery). Covers can be .jpg, .png,
 * .webp, .mp4 or .webm — video is detected by extension automatically.
 * The current SVG files are styled placeholders; replace them with real
 * media and update the paths below.
 */

export type Realm = 'physical' | 'digital'

export interface Project {
  slug: string
  name: string
  tagline: string
  realm: Realm
  status: string
  year: string
  role: string
  stats: { label: string; value: string }[]
  description: string[]
  cover: string
  gallery: string[]
}

export const projects: Project[] = [
  // ─────────────── THE PHYSICAL REALM ───────────────
  {
    slug: 'board-game',
    name: 'The Board Game',
    tagline: 'A world you can hold — strategy, story and tabletop craft, designed and produced from scratch.',
    realm: 'physical',
    status: 'In Development',
    year: '2024 — Present',
    role: 'Creator · Designer',
    stats: [
      { label: 'Status', value: 'In Development' },
      { label: 'Players', value: '2 – 6' },
      { label: 'Prototypes', value: '3 Rounds' },
    ],
    description: [
      'Every great world starts with rules. This board game began as sketches and cut-up cardboard and has grown through multiple prototype rounds into a complete tabletop experience — mechanics, art direction, and physical production all built from the ground up.',
      'Placeholder copy — replace with the real story: what the game is about, how it plays, what stage production is in, and where people can follow or buy it.',
    ],
    cover: '/media/board-game/cover.svg',
    gallery: [
      '/media/board-game/gallery-1.svg',
      '/media/board-game/gallery-2.svg',
      '/media/board-game/gallery-3.svg',
    ],
  },
  {
    slug: 'travel-backpack',
    name: 'Travel Backpack',
    tagline: 'A carry system engineered for people who move through the world — designed, sourced and produced as a physical product.',
    realm: 'physical',
    status: 'Produced',
    year: '2023 — Present',
    role: 'Founder · Product Designer',
    stats: [
      { label: 'Status', value: 'Produced' },
      { label: 'Category', value: 'Travel Gear' },
      { label: 'Iterations', value: 'Multiple' },
    ],
    description: [
      'Building a physical product means building a supply chain, a spec sheet, and a thousand small decisions about zippers, straps and fabric. The travel backpack is a complete product journey — from idea to design to manufacturing.',
      'Placeholder copy — replace with the real details: materials, capacity, what problem it solves, production story, and where to get one.',
    ],
    cover: '/media/travel-backpack/cover.svg',
    gallery: [
      '/media/travel-backpack/gallery-1.svg',
      '/media/travel-backpack/gallery-2.svg',
      '/media/travel-backpack/gallery-3.svg',
    ],
  },
  {
    slug: 'production-company',
    name: 'Production Company',
    tagline: 'A studio for bringing stories into the real world — film, content and creative production.',
    realm: 'physical',
    status: 'Active',
    year: '2022 — Present',
    role: 'Founder',
    stats: [
      { label: 'Status', value: 'Active' },
      { label: 'Focus', value: 'Film & Content' },
      { label: 'Projects', value: 'Ongoing' },
    ],
    description: [
      'A production company is a machine for making things exist — crews, gear, schedules, and stories, assembled into finished work. This is the studio arm of the portfolio: the entity through which creative projects get produced.',
      'Placeholder copy — replace with the real details: the company name, notable projects, reel links, and clients or collaborations.',
    ],
    cover: '/media/production-company/cover.svg',
    gallery: [
      '/media/production-company/gallery-1.svg',
      '/media/production-company/gallery-2.svg',
      '/media/production-company/gallery-3.svg',
    ],
  },

  // ─────────────── THE DIGITAL REALM ───────────────
  {
    slug: 'remember',
    name: 'Remember',
    tagline: 'A journal app for capturing life before it fades — memory, made durable.',
    realm: 'digital',
    status: 'Live',
    year: '2024 — Present',
    role: 'Creator · Developer',
    stats: [
      { label: 'Status', value: 'Live' },
      { label: 'Platform', value: 'App' },
      { label: 'Type', value: 'Journaling' },
    ],
    description: [
      'Remember is a journaling app built around a simple conviction: the days you don’t write down disappear. It makes capturing a memory fast enough to actually happen, and turns entries into something you’ll want to return to.',
      'Placeholder copy — replace with the real details: platforms, features, user numbers or milestones, and a link to try it.',
    ],
    cover: '/media/remember/cover.svg',
    gallery: [
      '/media/remember/gallery-1.svg',
      '/media/remember/gallery-2.svg',
      '/media/remember/gallery-3.svg',
    ],
  },
  {
    slug: 'pay-your-friends',
    name: 'Pay Your Friends',
    tagline: 'A Splitwise alternative — splitting money between friends without the friction.',
    realm: 'digital',
    status: 'Live',
    year: '2024 — Present',
    role: 'Creator · Developer',
    stats: [
      { label: 'Status', value: 'Live' },
      { label: 'Platform', value: 'App' },
      { label: 'Type', value: 'Fintech · Social' },
    ],
    description: [
      'Money between friends should be simple. Pay Your Friends is a shared-expense app built as a cleaner, friendlier alternative to Splitwise — track who owes what, settle up, stay friends.',
      'Placeholder copy — replace with the real details: how it works, what makes it different, platforms, and a link to try it.',
    ],
    cover: '/media/pay-your-friends/cover.svg',
    gallery: [
      '/media/pay-your-friends/gallery-1.svg',
      '/media/pay-your-friends/gallery-2.svg',
      '/media/pay-your-friends/gallery-3.svg',
    ],
  },
  {
    slug: 'weekly-budget',
    name: 'Weekly Spending Budget',
    tagline: 'A personal system for knowing exactly where the money goes — one week at a time.',
    realm: 'digital',
    status: 'In Use',
    year: '2023 — Present',
    role: 'Creator',
    stats: [
      { label: 'Status', value: 'In Use' },
      { label: 'Cadence', value: 'Weekly' },
      { label: 'Type', value: 'Personal Finance' },
    ],
    description: [
      'The simplest tool in the digital realm, and maybe the most used: a weekly spending budget that turns money from a source of anxiety into a system with a dashboard.',
      'Placeholder copy — replace with the real details: how it’s built, what it tracks, and what it’s changed about how you spend.',
    ],
    cover: '/media/weekly-budget/cover.svg',
    gallery: [
      '/media/weekly-budget/gallery-1.svg',
      '/media/weekly-budget/gallery-2.svg',
      '/media/weekly-budget/gallery-3.svg',
    ],
  },
]

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug)

export const projectsInRealm = (realm: Realm) =>
  projects.filter((p) => p.realm === realm)

export const realmAccent = (realm: Realm) =>
  realm === 'physical' ? '#ffb36b' : '#59e0ff'

export const realmTitle = (realm: Realm) =>
  realm === 'physical' ? 'The Physical Realm' : 'The Digital Realm'
