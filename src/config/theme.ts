/**
 * Theme configuration — the two-register system.
 * Canonical spec: docs/redesign/final-art-direction.md §1–3
 *
 * The site has two rooms:
 *   THE HOUSE — dark, lit, composed. Where a parent is persuaded.
 *   THE DESK  — light, plain, specific. Where a parent decides.
 *
 * Registers are an information architecture, not a colour-scheme preference:
 * they are set by the surface, never by the OS. A component declares its
 * register; it does not invent a hybrid.
 */

export type Register = 'house' | 'desk'

export const DEFAULT_REGISTER: Register = 'desk'

export const themeConfig = {
  registers: {
    house: {
      id: 'house',
      job: 'Persuade, move, make them imagine',
      /** Applied as `data-register="house"` — see src/styles/tokens.css. */
      attribute: 'house',
      motion: 'cinematic',
      /** No prose block over 400 words on a dark ground. A legibility rule. */
      maxProseWords: 400,
      /** Photography bleeds off edges, uncaptioned. */
      captionsRequired: false,
      decorativeTexturesAllowed: true,
      countersMayAnimate: true,
    },
    desk: {
      id: 'desk',
      job: 'Inform, reassure, let them act',
      attribute: 'desk',
      motion: 'minimal',
      maxProseWords: Infinity,
      /** Every Desk photograph carries date and context. A dated photo is proof. */
      captionsRequired: true,
      decorativeTexturesAllowed: false,
      countersMayAnimate: false,
    },
  },

  /**
   * Register assignment by route (final-art-direction.md §3). This table is the
   * contract. Routes are matched longest-prefix-first.
   *
   * Anything a parent can act on lives at the Desk; anything they must feel
   * lives in the House.
   */
  routeRegisters: [
    { prefix: '/scholarships', register: 'desk' as const, note: 'Plain, procedural, dignified. No House treatment anywhere.' },
    { prefix: '/pricing', register: 'desk' as const, note: 'No motion on any figure.' },
    { prefix: '/faq', register: 'desk' as const },
    { prefix: '/terms', register: 'desk' as const },
    { prefix: '/privacy-policy', register: 'desk' as const },
    { prefix: '/accessibility', register: 'desk' as const },
    { prefix: '/contact', register: 'desk' as const },
    { prefix: '/teachers', register: 'desk' as const },
    { prefix: '/camps', register: 'desk' as const },
    { prefix: '/lessons', register: 'desk' as const },
    { prefix: '/performances', register: 'house' as const, note: 'The proof layer.' },
    { prefix: '/events', register: 'house' as const },
    { prefix: '/', register: 'desk' as const },
  ],

  /**
   * The five laws (final-art-direction.md §2). Held as data so reviews and a
   * future lint rule can cite them by name.
   */
  laws: [
    'Anything a parent can act on lives at the Desk.',
    'Anything a parent must feel lives in the House.',
    'Never two primary CTAs in one viewport.',
    'No prose block over 400 words on a dark ground.',
    'One spotlight element per viewport.',
  ] as const,

  /**
   * Colour ratio by register (final-art-direction.md §8).
   * Blended across the site this lands near the system default of 60/25/10/5.
   */
  colourRatio: {
    house: { neutralLight: 0.25, stageDark: 0.6, photography: 0.1, accent: 0.05 },
    desk: { neutralLight: 0.8, stageDark: 0.08, photography: 0.08, accent: 0.04 },
  },
} as const

/** Resolve the register for a pathname. Longest matching prefix wins. */
export function registerForPath(pathname: string): Register {
  const match = themeConfig.routeRegisters
    .filter((entry) => pathname === entry.prefix || pathname.startsWith(entry.prefix === '/' ? '/' : `${entry.prefix}`))
    .sort((a, b) => b.prefix.length - a.prefix.length)[0]

  return match?.register ?? DEFAULT_REGISTER
}

export type ThemeConfig = typeof themeConfig
