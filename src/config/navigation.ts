/**
 * Navigation configuration.
 *
 * Structure: docs/redesign/02-information-architecture.md §2–4
 * Register behaviour: docs/redesign/final-art-direction.md §5
 *
 * ⚠️ PLACEHOLDER ROUTES. Phase 4 builds the navigation *mechanism*; the target
 * pages do not exist yet. Every item carries `status` so the shell can render
 * disabled/annotated states rather than shipping links to 404s.
 */

import type { NavGroup, NavItem, PrimaryCta } from '@/types/navigation'

/**
 * IA design constraints (02 §2):
 *  - Maximum 6 top-level items
 *  - The flagship must be visible without a hover
 *  - The primary CTA is not a nav item — it is a persistent button
 *  - Language switch is a first-class control
 */
export const MAX_TOP_LEVEL_ITEMS = 6

export const primaryNavigation: readonly NavItem[] = [
  {
    id: 'ninety-day',
    label: 'The 90-Day Program',
    href: '/programs/90-day-stage-program',
    status: 'planned',
    /** Typographically distinguished — it reads as "the current production". */
    emphasis: 'flagship',
  },
  {
    id: 'programs',
    label: 'Programs',
    href: '/programs',
    status: 'planned',
    children: [
      { id: 'private-lessons', label: 'Private Lessons', href: '/programs/private-lessons', status: 'planned' },
      { id: 'group-lessons', label: 'Group Lessons', href: '/programs/group-lessons', status: 'planned' },
      { id: 'band-builders', label: 'Band Builders', href: '/programs/band-builders', status: 'planned' },
      { id: 'early-childhood', label: 'Early Childhood', href: '/programs/early-childhood', status: 'planned' },
      { id: 'adults', label: 'Adults', href: '/programs/adults', status: 'gated', gate: 'B-2' },
    ],
  },
  {
    id: 'lessons',
    label: 'Lessons',
    href: '/lessons',
    status: 'planned',
    children: [
      { id: 'piano', label: 'Piano', href: '/lessons/piano', status: 'planned' },
      { id: 'guitar', label: 'Guitar', href: '/lessons/guitar', status: 'planned' },
      { id: 'drums', label: 'Drums', href: '/lessons/drums', status: 'planned' },
      { id: 'bass', label: 'Bass', href: '/lessons/bass', status: 'planned' },
      { id: 'violin', label: 'Violin', href: '/lessons/violin', status: 'planned' },
      { id: 'ukulele', label: 'Ukulele', href: '/lessons/ukulele', status: 'planned' },
      { id: 'voice', label: 'Voice', href: '/lessons/voice', status: 'planned' },
    ],
  },
  { id: 'camps', label: 'Camps', href: '/camps', status: 'planned' },
  { id: 'scholarships', label: 'Scholarships', href: '/scholarships', status: 'planned' },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    status: 'planned',
    children: [
      { id: 'method', label: 'Our Method', href: '/about', status: 'planned' },
      { id: 'teachers', label: 'Teachers', href: '/teachers', status: 'gated', gate: 'B-7' },
      { id: 'performances', label: 'Performances', href: '/performances', status: 'planned' },
      { id: 'faq', label: 'FAQ', href: '/faq', status: 'planned' },
      { id: 'contact', label: 'Contact', href: '/contact', status: 'planned' },
    ],
  },
]

/**
 * ⚠️ Gate B-8 — the price in the label is a structural fix for the Phase 2
 * non-disclosure failure (04-design-system.md §7 rule 2). Until the price is
 * published the label must NOT invent one.
 */
/**
 * ⚠️ Corrected during Tier 1.
 *
 * This was `planned` and gated on B-8, which disabled the trial button on
 * every page that renders a header. Two things were wrong with that:
 *
 *   1. **B-8 gates tuition, not the trial.** The $25 spot-hold is
 *      verbatim-extracted and publishable — established in the Phase 4
 *      foundation report and already shipping on the homepage.
 *   2. **The destination now exists.** `/contact/book-a-trial` was built as
 *      Tier 1 route 1; before that it 404'd, which is why it was disabled.
 *
 * The price ships in the label because disclosing it on 2 pages out of 26 was
 * the estate's largest conversion failure.
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
 * The footer carries address, hours and phone: it is load-bearing content,
 * not chrome. Placeholder labels only; no final business copy in Phase 4.
 */
export const footerNavigation: readonly NavGroup[] = [
  {
    id: 'programs',
    label: 'Programs',
    items: [
      { id: 'f-ninety', label: 'The 90-Day Program', href: '/programs/90-day-stage-program', status: 'planned' },
      { id: 'f-private', label: 'Private Lessons', href: '/programs/private-lessons', status: 'planned' },
      { id: 'f-group', label: 'Group Lessons', href: '/programs/group-lessons', status: 'planned' },
      { id: 'f-band', label: 'Band Builders', href: '/programs/band-builders', status: 'planned' },
      { id: 'f-early', label: 'Early Childhood', href: '/programs/early-childhood', status: 'planned' },
    ],
  },
  {
    id: 'lessons',
    label: 'Lessons',
    items: [
      { id: 'f-piano', label: 'Piano', href: '/lessons/piano', status: 'planned' },
      { id: 'f-guitar', label: 'Guitar', href: '/lessons/guitar', status: 'planned' },
      { id: 'f-drums', label: 'Drums', href: '/lessons/drums', status: 'planned' },
      { id: 'f-bass', label: 'Bass', href: '/lessons/bass', status: 'planned' },
      { id: 'f-violin', label: 'Violin', href: '/lessons/violin', status: 'planned' },
      { id: 'f-ukulele', label: 'Ukulele', href: '/lessons/ukulele', status: 'planned' },
      { id: 'f-voice', label: 'Voice', href: '/lessons/voice', status: 'planned' },
    ],
  },
  {
    id: 'visit',
    label: 'Visit',
    items: [
      { id: 'f-camps', label: 'Camps', href: '/camps', status: 'planned' },
      { id: 'f-performances', label: 'Performances', href: '/performances', status: 'planned' },
      { id: 'f-events', label: 'Events', href: '/events', status: 'gated', gate: 'I-4' },
      { id: 'f-scholarships', label: 'Scholarships', href: '/scholarships', status: 'planned' },
      { id: 'f-contact', label: 'Contact', href: '/contact', status: 'planned' },
    ],
  },
  {
    id: 'legal',
    label: 'Information',
    items: [
      { id: 'f-faq', label: 'FAQ', href: '/faq', status: 'planned' },
      { id: 'f-pricing', label: 'Pricing', href: '/pricing', status: 'gated', gate: 'B-8' },
      { id: 'f-accessibility', label: 'Accessibility', href: '/accessibility', status: 'planned' },
      { id: 'f-privacy', label: 'Privacy Policy', href: '/privacy-policy', status: 'planned' },
      { id: 'f-terms', label: 'Terms', href: '/terms', status: 'planned' },
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
