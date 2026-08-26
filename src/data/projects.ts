/**
 * PORTFOLIO DATA — edit this file to update the site.
 *
 * To add a project: add an entry here and drop its media into
 * /public/media/<slug>/  (cover + gallery). Covers can be .jpg, .png,
 * .webp, .mp4 or .webm — video is detected by extension automatically.
 * Digital projects use real screenshots of the live sites; physical
 * projects still use styled placeholders until real photos arrive.
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
  link?: string
  stats: { label: string; value: string }[]
  description: string[]
  cover: string
  gallery: string[]
}

export const projects: Project[] = [
  // ─────────────── THE PHYSICAL REALM ───────────────
  {
    slug: 'board-game',
    name: 'Barnburners and Noblemen',
    tagline: 'A tactical tabletop wargame of strategy, diplomatic scheming, and chance. Over 15 years in the making.',
    realm: 'physical',
    status: 'Sold Out',
    year: '2025',
    role: 'Co-Creator · Sinderstone Games',
    link: 'https://www.barnburnersandnoblemen.com',
    stats: [
      { label: 'Status', value: 'Sold Out' },
      { label: 'Players', value: '2 – 4' },
      { label: 'Standees', value: '38 Acrylic' },
      { label: 'Master Set', value: '$90' },
    ],
    description: [
      'My brother and I started building this game when we were 10 and 12 years old. Fifteen years of brotherhood and imagination later, it is real: a death-match style wargame with a whole world of characters and lore behind it, published under our studio, Sinderstone Games.',
      'The Master Set comes loaded: 38 acrylic standees, a six-panel hex board, 16 custom metal-cast coins, 28 dice, 24 double-sided character cards, 28 diplomacy cards, and wound markers. It funded on Kickstarter, and the first run sold out.',
    ],
    cover: '/media/board-game/cover.jpg',
    gallery: [
      '/media/board-game/gallery-1.jpg',
      '/media/board-game/gallery-2.jpg',
      '/media/board-game/gallery-3.jpg',
    ],
  },
  {
    slug: 'travel-backpack',
    name: 'Dundily Travel Bag',
    tagline: 'A travel bag I designed for living out of one bag. Specced, sourced, produced.',
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
      'Making a physical product means fabric samples, zipper debates, and factory emails at weird hours. I went through all of it to get the Dundily made.',
      'Placeholder copy. Swap in the real details: materials, capacity, what it fixes about other bags, and where to buy one.',
    ],
    cover: '/media/travel-backpack/cover.jpg',
    gallery: [
      '/media/travel-backpack/gallery-1.svg',
      '/media/travel-backpack/gallery-2.svg',
      '/media/travel-backpack/gallery-3.svg',
    ],
  },
  {
    slug: 'production-company',
    name: 'Awarded Goods Production Company',
    tagline: 'My production company. Award-winning commercial content since 2020.',
    realm: 'physical',
    status: 'Active',
    year: '2020 — Present',
    role: 'Founder',
    link: 'https://www.awardedgoods.com',
    stats: [
      { label: 'Status', value: 'Active' },
      { label: 'Focus', value: 'Film & Content' },
      { label: 'Since', value: '2020' },
    ],
    description: [
      'Awarded Goods is the studio side of what I do. Crews, cameras, and commercial work for brands, produced start to finish out of Orange County, San Francisco, and Seattle.',
      'The work includes a 7-part documentary series with Waymo that earned a two-time Webby Awards Honorary Mention.',
      'Placeholder copy. Swap in more notable projects, a reel, and clients.',
    ],
    cover: '/media/production-company/cover.jpg',
    gallery: [
      '/media/production-company/gallery-1.svg',
      '/media/production-company/gallery-2.svg',
      '/media/production-company/gallery-3.svg',
    ],
  },

  // ─────────────── THE DIGITAL REALM ───────────────
  {
    slug: 'remember',
    name: 'Remember Journal',
    tagline: 'A fast and easy way to record and remember your life.',
    realm: 'digital',
    status: 'Live',
    year: '2024 — Present',
    role: 'Creator · Developer',
    link: 'https://remember-journal.vercel.app',
    stats: [
      { label: 'Status', value: 'Live' },
      { label: 'Type', value: 'Web App' },
      { label: 'Login', value: 'Google' },
    ],
    description: [
      'I kept forgetting whole months of my life, so I built the thing that fixes it. Open it, type a memory, done. Future you gets to keep the day.',
      'Placeholder copy. Swap in the real details: features, milestones, what is next.',
    ],
    cover: '/media/remember/cover.jpg',
    gallery: ['/media/remember/gallery-1.jpg', '/media/remember/gallery-2.jpg'],
  },
  {
    slug: 'pay-your-friends',
    name: 'Pay Your Friends Please',
    tagline: 'Cost-sharing like Splitwise. Split expenses and settle up with friends.',
    realm: 'digital',
    status: 'Live',
    year: '2024 — Present',
    role: 'Creator · Developer',
    link: 'https://pay-your-friends-please.vercel.app',
    stats: [
      { label: 'Status', value: 'Live' },
      { label: 'Type', value: 'Web App' },
      { label: 'Login', value: 'Google' },
    ],
    description: [
      'Somebody always covers the bill and somebody always forgets. This tracks who owes what and gets everyone squared up without a spreadsheet.',
      'Placeholder copy. Swap in the real details: how it works and what makes it different.',
    ],
    cover: '/media/pay-your-friends/cover.jpg',
    gallery: ['/media/pay-your-friends/gallery-1.jpg', '/media/pay-your-friends/gallery-2.jpg'],
  },
  {
    slug: 'weekly-budget',
    name: "Jed's Spending Budget",
    tagline: 'A weekly customizable spending budget for anyone.',
    realm: 'digital',
    status: 'Live',
    year: '2023 — Present',
    role: 'Creator · Developer',
    link: 'https://jeds-budget.vercel.app',
    stats: [
      { label: 'Status', value: 'Live' },
      { label: 'Type', value: 'Web App' },
      { label: 'Login', value: 'Google' },
    ],
    description: [
      'Not a startup. Just a tool I use every single week: set the number, watch the week, adjust. It changed how I spend.',
      'Placeholder copy. Swap in the real details: what it tracks and what it changed.',
    ],
    cover: '/media/weekly-budget/cover.jpg',
    gallery: ['/media/weekly-budget/gallery-1.jpg', '/media/weekly-budget/gallery-2.jpg'],
  },
  {
    slug: 'haulrate',
    name: 'Haulrate',
    tagline: 'A refined brand site built for Haulrate, a Phoenix-based company.',
    realm: 'digital',
    status: 'Live',
    year: '2025',
    role: 'Design · Build',
    link: 'https://haulrate.vercel.app',
    stats: [
      { label: 'Status', value: 'Live' },
      { label: 'Type', value: 'Brand Site' },
      { label: 'Client', value: 'Haulrate' },
    ],
    description: [
      'Client work: a clean, fast site built to load quick, look sharp, and get customers calling.',
      'Placeholder copy. Swap in the real details: scope, stack, results.',
    ],
    cover: '/media/haulrate/cover.jpg',
    gallery: ['/media/haulrate/gallery-1.jpg', '/media/haulrate/gallery-2.jpg'],
  },
  {
    slug: 'awarded-goods-site',
    name: 'awardedgoods.com',
    tagline: 'Our own cinematic brand site, with a live animated carbon-fiber weave.',
    realm: 'digital',
    status: 'Live',
    year: '2025',
    role: 'Design · Build',
    link: 'https://www.awardedgoods.com',
    stats: [
      { label: 'Status', value: 'Live' },
      { label: 'Type', value: 'Brand Site' },
      { label: 'Extras', value: 'Canvas FX · SEO' },
    ],
    description: [
      'We built our own sites the way we build client work: story first, cinematic, with a carbon-fiber weave animated live on canvas.',
      'Placeholder copy. Swap in the real details: stack, the weave effect, results.',
    ],
    cover: '/media/awarded-goods-site/cover.jpg',
    gallery: ['/media/awarded-goods-site/gallery-1.jpg', '/media/awarded-goods-site/gallery-2.jpg'],
  },
  {
    slug: 'sean-meyers-finder',
    name: 'Sean Meyers Finder',
    tagline: 'Speaker keyword search. Find exactly where a speaker said it.',
    realm: 'digital',
    status: 'Live',
    year: '2025',
    role: 'Creator · Developer',
    link: 'https://sean-meyers-finder.vercel.app',
    stats: [
      { label: 'Status', value: 'Live' },
      { label: 'Type', value: 'Search Tool' },
      { label: 'Powered By', value: 'AI' },
    ],
    description: [
      'Type a phrase, get the exact moment a speaker said it. Built for finding needles in hours of talks.',
      'Placeholder copy. Swap in the real details: how the search works, the corpus, the stack.',
    ],
    cover: '/media/sean-meyers-finder/cover.jpg',
    gallery: ['/media/sean-meyers-finder/gallery-1.jpg', '/media/sean-meyers-finder/gallery-2.jpg'],
  },
  {
    slug: 'googl-ticker',
    name: 'GOOGL Ticker',
    tagline: 'A live Alphabet stock dashboard: quotes, news sentiment, and the catalysts that could move it.',
    realm: 'digital',
    status: 'Live',
    year: '2025',
    role: 'Creator · Developer',
    link: 'https://googl-ticker.vercel.app',
    stats: [
      { label: 'Status', value: 'Live' },
      { label: 'Type', value: 'Market Dashboard' },
      { label: 'Powered By', value: 'Finnhub · AI' },
    ],
    description: [
      'One stock, watched properly. Live GOOGL and GOOG quotes, a price chart, news scored for sentiment by a language model, and a catalyst board tracking what could move the stock and which way.',
      'Placeholder copy. Swap in the real details: why Alphabet, how the scoring works.',
    ],
    cover: '/media/googl-ticker/cover.jpg',
    gallery: ['/media/googl-ticker/gallery-1.jpg', '/media/googl-ticker/gallery-2.jpg'],
  },
  {
    slug: 'device-frame-studio',
    name: 'Device Frame Studio',
    tagline: 'Drop in screenshots or recordings, get them back inside a clean device frame.',
    realm: 'digital',
    status: 'Live',
    year: '2025',
    role: 'Creator · Developer',
    link: 'https://device-frame-studio.vercel.app',
    stats: [
      { label: 'Status', value: 'Live' },
      { label: 'Type', value: 'Creative Tool' },
      { label: 'Handles', value: 'Media' },
    ],
    description: [
      'Screenshots look better in hardware. This wraps your captures and recordings in device frames without opening any design software.',
      'Placeholder copy. Swap in the real details: supported devices, export options.',
    ],
    cover: '/media/device-frame-studio/cover.jpg',
    gallery: ['/media/device-frame-studio/gallery-1.jpg', '/media/device-frame-studio/gallery-2.jpg'],
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
