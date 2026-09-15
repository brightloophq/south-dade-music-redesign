/**
 * Navigation types.
 * Structure: docs/redesign/02-information-architecture.md §2–4
 */

/**
 * Publication status of a route.
 *  - `live`    — the page exists and is linked
 *  - `planned` — Phase 4 placeholder; the route is not built yet
 *  - `gated`   — blocked on an owner decision (see `gate`)
 *
 * The nav shell renders `planned` and `gated` items as non-navigating so the
 * foundation never ships a link to a 404 (02 §10 rule 3).
 */
export type RouteStatus = 'live' | 'planned' | 'gated'

export type NavEmphasis = 'default' | 'flagship'

/**
 * The editorial plate a menu panel carries beside its links. Always an
 * approved photograph from `lib/media/catalog.ts` — the panel shows the real
 * room, never a decorative graphic.
 */
export interface NavFeature {
  photo: string
  alt: string
  eyebrow: string
  title: string
  href: string
}

export interface NavItem {
  id: string
  label: string
  href: string
  status: RouteStatus
  /** Decision gate blocking publication, when status is `gated`. */
  gate?: string
  emphasis?: NavEmphasis
  /** One level only. The IA forbids dropdowns deeper than one level. */
  children?: readonly NavItem[]
  /** Facts shown inline in the mega-menu (ages, format, price-from). */
  facts?: readonly string[]
  description?: string
  /** Column heading this child is listed under inside its parent's panel. */
  group?: string
  /** Label for the parent's own overview link inside its panel. */
  overviewLabel?: string
  /** Photograph shown in the parent's panel. */
  feature?: NavFeature
}

export interface NavGroup {
  id: string
  label: string
  items: readonly NavItem[]
}

export interface PrimaryCta {
  id: string
  label: string
  /** Appended to the label once pricing is published (gate B-8). */
  priceSuffix: string | null
  href: string
  status: RouteStatus
  gate?: string
}

export interface BreadcrumbItem {
  label: string
  href: string
}
