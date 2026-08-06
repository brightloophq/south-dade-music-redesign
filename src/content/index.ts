/**
 * Content collections.
 *
 * ⚠️ DELIBERATELY EMPTY IN PHASE 4.
 *
 * The typed shapes live in `src/types/content.ts`. This module is where authored
 * content will be registered, and it exports empty, correctly-typed collections
 * so consuming code can be written and type-checked before any content exists.
 *
 * Nothing is populated here yet, and that is a decision rather than an omission.
 * Phase 2 established the rule the whole project runs on:
 *
 *   > No business facts are invented. Anything unverified is marked
 *   > ⚠️ UNCONFIRMED and carries a decision gate.
 *   > — docs/redesign/01-brand-strategy.md
 *
 * Every collection below is blocked on at least one open gate:
 *
 *   lessons       — hero images blocked on I-1 (photo-release consent)
 *   programs      — sessions-per-week conflicts across 7 pages; prices blocked on B-8
 *   camps         — deposit amount unpublished (B-8); 2026 selling image is a
 *                   2025 WhatsApp-compressed photo (I-1)
 *   faqs          — safe to author, pending copy
 *   testimonials  — one review names two minors in full; consent required
 *   galleries     — all 18 photographs consent-blocked (I-1)
 *   performances  — zero dated events exist; both event URLs 404 (I-4)
 *   ctas          — labels must carry a price that is not yet published (B-8)
 *
 * Source of truth for the underlying data: `docs/source-content/`.
 */

import type { Camp, Cta, Faq, Gallery, Lesson, Performance, Program, Testimonial } from '@/types/content'

export const lessons: readonly Lesson[] = []
export const programs: readonly Program[] = []
export const camps: readonly Camp[] = []
export const faqs: readonly Faq[] = []
export const testimonials: readonly Testimonial[] = []
export const galleries: readonly Gallery[] = []
export const performances: readonly Performance[] = []
export const ctas: readonly Cta[] = []

/** Only `published` items are ever rendered. */
export function published<T extends { status: string }>(items: readonly T[]): T[] {
  return items.filter((item) => item.status === 'published')
}

/** Find by slug within a collection, or `undefined`. */
export function bySlug<T extends { slug: string }>(items: readonly T[], slug: string): T | undefined {
  return items.find((item) => item.slug === slug)
}
