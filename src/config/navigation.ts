/**
 * Navigation configuration.
 *
 * Structure: docs/redesign/02-information-architecture.md §2–4
 * Register behaviour: docs/redesign/final-art-direction.md §5
 *
 * Every item carries `status` so the shell never ships a link to a 404.
 */

import type { NavGroup, NavItem, PrimaryCta } from '@/types/navigation'

/**
 * IA design constraints (02 §2):
 *  - Maximum 6 top-level items
 *  - The primary CTA is not a nav item — it is a persistent button
 */
export const MAX_TOP_LEVEL_ITEMS = 6

/**
 * Primary navigation — client-review refinement.
 *
 * ## Why the structure changed
 *
 * The previous bar was six items, four of them dropdowns, and the lesson
 * formats were split across two menus: Private and Group sat under Programs
 * while the instruments sat under Lessons. A parent whose first question is
 * "private or group, and for which instrument?" had to open both.
 *
 * It is now organised by the question a family is actually asking:
 *
 *   Lessons       how do we learn? — the three formats, then the instruments
 *   Programs      what is the journey? — the flagship cycle, the band, the camp
 *   Performances  does it really happen? — the portfolio, one click, no menu
 *   About         who are you? — the academy, scholarships, questions
 *   Contact       how do we reach you?
 *
 * Early Childhood lives under Lessons because it is a way of learning for ages
 * 3–6, even though its URL sits under `/programs` (the URL is unchanged — it is
 * indexed and redirected to).
 *
 * ## What is deliberately absent
 *
 * `/programs/adults` (gate B-2) and `/teachers` (gate B-7) were listed here as
 * permanently greyed-out entries. A disabled row inside a menu reads as an
 * unfinished site, and neither page is designed. They return when they exist.
 *
 * Every description below is a fact the source content states — ages, format,
 * duration — never an authored promise.
 */
export const primaryNavigation: readonly NavItem[] = [
  {
    id: 'lessons',
    label: 'Lessons',
    href: '/lessons',
    status: 'live',
    overviewLabel: 'All lessons',
    feature: {
      photo: 'lesson-duet',
      alt: 'An instructor at the keyboard beside South Dade Music students during a lesson.',
      eyebrow: 'Seven instruments',
      title: 'Private one-on-one, or small groups.',
      href: '/lessons',
    },
    children: [
      {
        id: 'private-lessons',
        label: 'Private Lessons',
        href: '/private-lessons',
        status: 'live',
        group: 'Ways to learn',
        description: 'One-on-one · Kids, teens and adults',
      },
      {
        id: 'group-lessons',
        label: 'Group Music Lessons',
        href: '/group-music-lessons',
        status: 'live',
        group: 'Ways to learn',
        description: 'Small groups · Ages 6 and up',
      },
      {
        id: 'early-childhood',
        label: 'Early Childhood',
        href: '/programs/early-childhood',
        status: 'live',
        group: 'Ways to learn',
        description: 'Play-based classes · Ages 3 to 6',
      },
      { id: 'piano', label: 'Piano', href: '/piano-lessons', status: 'live', group: 'Instruments' },
      { id: 'guitar', label: 'Guitar', href: '/guitar-lessons', status: 'live', group: 'Instruments' },
      { id: 'drums', label: 'Drums', href: '/drum-lessons', status: 'live', group: 'Instruments' },
      { id: 'bass', label: 'Bass', href: '/bass-guitar-lessons', status: 'live', group: 'Instruments' },
      { id: 'violin', label: 'Violin', href: '/violin-lessons', status: 'live', group: 'Instruments' },
      { id: 'ukulele', label: 'Ukulele', href: '/ukulele-lessons', status: 'live', group: 'Instruments' },
      { id: 'voice', label: 'Voice', href: '/singing-lessons', status: 'live', group: 'Instruments' },
    ],
  },
  {
    id: 'programs',
    label: 'Programs',
    href: '/programs',
    status: 'live',
    overviewLabel: 'All programs',
    feature: {
      photo: 'first-note',
      alt: 'An instructor handing a microphone to a small child on the South Dade Music stage.',
      eyebrow: 'The flagship',
      title: 'Twelve weeks, ending in a live showcase.',
      href: '/programs/90-day-stage-program',
    },
    children: [
      {
        id: 'ninety-day',
        label: '90-Day Stage Program',
        href: '/programs/90-day-stage-program',
        status: 'live',
        emphasis: 'flagship',
        group: 'Programs',
        description: 'Twelve weeks · Ends in a live showcase',
      },
      {
        id: 'band-builders',
        label: 'Band Builders',
        href: '/programs/band-builders',
        status: 'live',
        group: 'Programs',
        description: 'Group · Kids and teens play as a band',
      },
      {
        id: 'camps',
        label: 'Summer Jam Music Camp',
        href: '/camps',
        status: 'live',
        group: 'Programs',
        description: 'Three weeks · Ages 7 to 15',
      },
    ],
  },
  /**
   * First level, no menu. `/performances` is the academy's portfolio — real
   * photographs of real showcases — and the page that proves the business
   * does what it says. It should never be one interaction deep.
   */
  { id: 'performances', label: 'Performances', href: '/performances', status: 'live' },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    status: 'live',
    overviewLabel: 'About South Dade Music',
    feature: {
      photo: 'community-event',
      alt: 'Families and students gathered together after a South Dade Music showcase.',
      eyebrow: 'Build Community. Make Music.',
      title: 'Florida City, Homestead, Cutler Bay, Palmetto Bay.',
      href: '/about',
    },
    children: [
      {
        id: 'method',
        label: 'Our Story',
        href: '/about',
        status: 'live',
        group: 'The academy',
        description: 'Who we are and how we teach',
      },
      {
        id: 'scholarships',
        label: 'Scholarships',
        href: '/scholarships',
        status: 'live',
        group: 'The academy',
        description: 'Step Up PEP and UA accepted',
      },
      {
        id: 'faq',
        label: 'Questions',
        href: '/faq',
        status: 'live',
        group: 'The academy',
        description: 'Trials, ages and scholarships',
      },
    ],
  },
  { id: 'contact', label: 'Contact', href: '/contact', status: 'live' },
]

/**
 * The trial. `$25` is the verbatim spot-hold, credited to tuition — gate B-8
 * blocks tuition, not this — and it ships in the label because disclosing the
 * price on two pages out of twenty-six was the estate's largest conversion
 * failure.
 */
export const primaryCta: PrimaryCta = {
  id: 'book-trial',
  label: 'Book a Trial',
  priceSuffix: '$25',
  href: '/contact/book-a-trial',
  status: 'live',
}

/**
 * Footer — four columns per 02-information-architecture.md §3.
 * The footer carries phone and email: it is load-bearing content, not chrome.
 */
export const footerNavigation: readonly NavGroup[] = [
  {
    id: 'programs',
    label: 'Programs',
    items: [
      { id: 'f-ninety', label: '90-Day Stage Program', href: '/programs/90-day-stage-program', status: 'live' },
      { id: 'f-band', label: 'Band Builders', href: '/programs/band-builders', status: 'live' },
      { id: 'f-camps', label: 'Summer Jam Music Camp', href: '/camps', status: 'live' },
      { id: 'f-early', label: 'Early Childhood', href: '/programs/early-childhood', status: 'live' },
      { id: 'f-programs', label: 'All programs', href: '/programs', status: 'live' },
    ],
  },
  {
    id: 'lessons',
    label: 'Lessons',
    items: [
      { id: 'f-private', label: 'Private Lessons', href: '/private-lessons', status: 'live' },
      { id: 'f-group', label: 'Group Lessons', href: '/group-music-lessons', status: 'live' },
      { id: 'f-piano', label: 'Piano', href: '/piano-lessons', status: 'live' },
      { id: 'f-guitar', label: 'Guitar', href: '/guitar-lessons', status: 'live' },
      { id: 'f-drums', label: 'Drums', href: '/drum-lessons', status: 'live' },
      { id: 'f-bass', label: 'Bass', href: '/bass-guitar-lessons', status: 'live' },
      { id: 'f-violin', label: 'Violin', href: '/violin-lessons', status: 'live' },
      { id: 'f-ukulele', label: 'Ukulele', href: '/ukulele-lessons', status: 'live' },
      { id: 'f-voice', label: 'Voice', href: '/singing-lessons', status: 'live' },
      { id: 'f-lessons', label: 'All lessons', href: '/lessons', status: 'live' },
    ],
  },
  {
    id: 'visit',
    label: 'The Academy',
    items: [
      { id: 'f-performances', label: 'Performances', href: '/performances', status: 'live' },
      { id: 'f-about', label: 'About', href: '/about', status: 'live' },
      { id: 'f-scholarships', label: 'Scholarships', href: '/scholarships', status: 'live' },
      { id: 'f-contact', label: 'Contact', href: '/contact', status: 'live' },
      { id: 'f-trial', label: 'Book a Trial', href: '/contact/book-a-trial', status: 'live' },
    ],
  },
  {
    id: 'legal',
    label: 'Information',
    items: [
      { id: 'f-faq', label: 'FAQ', href: '/faq', status: 'live' },
      /*
       * The gated `/pricing` entry is removed for the same reason EE1 removed
       * `/events`: it rendered as a permanently greyed-out word on every route,
       * promising a page with no design and no content behind gate B-8. The
       * FAQ states plainly that tuition is not published online.
       */
      { id: 'f-accessibility', label: 'Accessibility', href: '/accessibility', status: 'live' },
      { id: 'f-privacy', label: 'Privacy Policy', href: '/privacy', status: 'live' },
      { id: 'f-terms', label: 'Terms', href: '/terms', status: 'live' },
      { id: 'f-lesson-cancellation', label: 'Cancellations', href: '/lesson-cancellation', status: 'live' },
      { id: 'f-photo-consent', label: 'Photo Consent', href: '/photo-consent', status: 'live' },
    ],
  },
]

/** Utility / tier-3 actions (02 §10). Persistent, low emphasis. */
export const utilityActions = [
  { id: 'call', label: 'Call', kind: 'tel' as const, status: 'planned' as const },
  { id: 'directions', label: 'Directions', kind: 'external' as const, status: 'gated' as const, gate: 'I-8' },
] as const

/** Skip-link target. Must match the `id` on the main landmark. */
export const MAIN_CONTENT_ID = 'main-content'

/**
 * Which top-level item owns the current route.
 *
 * Children are matched before parents: `/programs/early-childhood` belongs to
 * Lessons even though its path begins with the Programs hub's `/programs`.
 */
export function activeNavId(pathname: string, items: readonly NavItem[] = primaryNavigation): string | null {
  const matches = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  for (const item of items) {
    if (item.children?.some((child) => child.href !== item.href && pathname === child.href)) return item.id
  }
  for (const item of items) {
    if (item.children?.some((child) => matches(child.href))) return item.id
  }
  for (const item of items) {
    if (matches(item.href)) return item.id
  }
  return null
}
