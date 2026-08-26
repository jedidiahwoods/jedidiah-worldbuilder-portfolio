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
    tagline: 'A strategy game I designed and playtested from scratch. Cardboard first, real production next.',
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
      'This started as sketches and cut-up cardboard on my kitchen table. Three prototype rounds later, it plays like something you would pull off a shelf.',
      'Placeholder copy. Swap in the real story: what the game is called, how it plays, where production stands, and where to get it.',
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
    tagline: 'A backpack I designed for living out of one bag. Specced, sourced, produced.',
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
      'Making a physical product means fabric samples, zipper debates, and factory emails at weird hours. I went through all of it to get this thing made.',
      'Placeholder copy. Swap in the real details: materials, capacity, what it fixes about other bags, and where to buy one.',
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
    tagline: 'My studio for making films and content. Cameras, crews, finished work.',
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
      'This is the machine I built for getting stories shot and shipped. Gear, people, schedules, output.',
      'Placeholder copy. Swap in the real details: the company name, notable projects, a reel, clients and collaborations.',
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
    tagline: 'A journal app that makes writing down your day fast enough to actually happen.',
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
      'I kept forgetting whole months of my life, so I built the thing that fixes it. Open it, type a memory, done. Future you gets to keep the day.',
      'Placeholder copy. Swap in the real details: platforms, features, milestones, and a link to try it.',
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
    tagline: 'Splitting money with friends without the awkward math. My answer to Splitwise.',
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
      'Somebody always covers the bill and somebody always forgets. This tracks who owes what and gets everyone squared up without a spreadsheet.',
      'Placeholder copy. Swap in the real details: how it works, what makes it different, platforms, and a link to try it.',
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
    tagline: 'The weekly system I actually use to know where my money goes.',
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
      'Not a startup. Just a tool I use every single week: set the number, watch the week, adjust. It changed how I spend.',
      'Placeholder copy. Swap in the real details: how it is built, what it tracks, and what it changed.',
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
