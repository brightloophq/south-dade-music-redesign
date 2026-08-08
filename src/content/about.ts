/**
 * About and performances content.
 *
 * Source of truth: `docs/source-content/source-pages/about.md`,
 * `performances.md`, `business-profile.json`, `testimonials.json`.
 *
 *   ✅ VERBATIM  — extracted word for word, attributed
 *   ✍️ AUTHORED  — written for the rebuild from verified material
 *   ⚠️ GATED     — blocked pending an owner decision; absent from the page
 */

import { testimonials } from './home'

export const about = {
  eyebrow: 'About',
  /** ✍️ */
  heading: 'A music school that measures itself in performances.',

  /** ✅ VERBATIM, `/about/` — Our Story. */
  story: [
    'South Dade Music was created with a simple mission to make music education accessible and meaningful for every student. Over the years, we have helped children and adults grow through structured training and performance opportunities.',
    'Families searching for Private Music Lessons Near Me often choose us because of our supportive teachers and clear lesson plans. We focus on building strong fundamentals while keeping learning enjoyable.',
  ],

  /**
   * ✅ VERBATIM, `/about/` — Vision.
   *
   * ⚠️ The companion mission sentence on the same page is heavily
   * keyword-stuffed — "high quality instruction through Kids Piano Lessons
   * South Dade, vocal training, and Group Music Lessons South Dade". It is
   * verbatim and therefore publishable, but it reads as SEO filler rather than
   * as a mission. **Recommended for an owner rewrite**; shipping it unchanged
   * would put search-engine copy on the page a parent reads to decide whether
   * to trust the business. Withheld pending that rewrite.
   */
  vision:
    'Our vision is to build a strong music community where every student has the opportunity to learn, perform, and grow.',
  mission: null,

  /** ✅ VERBATIM, `/about/` — "Why choose South Dade Music", in source order. */
  whyChoose: [
    'Community driven, not transactional',
    'Performance focused learning',
    'Confidence and leadership growth',
    'Inclusive and welcoming environment',
    'Local events and outreach',
  ],

  /** ✅ VERBATIM, `/about/` — Performances & Community Impact. */
  community: [
    'We believe performance is an important part of growth. Students take part in recitals, community events, and group showcases that build confidence and stage experience.',
    'At South Dade Music, learning goes beyond the classroom and into the community.',
  ],

  /** ✅ VERBATIM, five programme pages. */
  serviceLine:
    'We serve families in Florida City, Homestead, Cutler Bay, Palmetto Bay, and nearby areas.',

  /**
   * ⚠️ Gate B-3 — the Gradual Exposure Ladder is named on `/resources/` and the
   * homepage FAQ as the method for a shy child, and its rungs are **never
   * enumerated anywhere**. The name ships because it is verified; the steps do
   * not, because they do not exist in the source.
   */
  exposureLadder: {
    name: 'Gradual Exposure Ladder',
    /** ✅ VERBATIM, `/resources/` and homepage FAQ. */
    claim:
      'That is exactly what we train for. We use a Gradual Exposure Ladder to move them from isolation to community safely.',
    rungs: null,
  },

  /**
   * ⚠️ Gate B-7. Not one instructor is named or introduced anywhere on the
   * live site; the only names in the estate appear inside customer reviews.
   * No teacher content ships, and `/teachers` is not built.
   */
  teachers: null,

  /**
   * ⚠️ No founding year, no student count, no years-in-business figure is
   * published anywhere. "Over the years" is the only temporal claim, and it
   * ships verbatim above.
   */
  foundedYear: null,
  studentCount: null,
} as const

/**
 * The two publishable testimonials the homepage does not render.
 *
 * The homepage shows an anchor plus two marginalia; these are the remainder of
 * the vetted set. The record naming a minor stays excluded here too.
 */
export const aboutTestimonials = testimonials.filter(
  (t) => !t.namesMinor && ['elizabeth-garcia', 'j-val'].includes(t.id),
)

/**
 * Performances.
 *
 * ⚠️ The source page is three slogan lines and a six-image slider. That is its
 * complete content — no event list, no dates, no venues, no recital schedule,
 * no past-showcase recap.
 *
 * Gate I-1 blocks all six images (identifiable minors, no consent) and gate I-4
 * means there is no dated event to publish: `liveEventPages: 0`,
 * `brokenEventPages: 2`. Both event URLs return 404.
 *
 * So the page ships the three verbatim lines, the showcase testimony that is
 * already the homepage's proof layer, and an honest statement of why there is
 * no gallery — rather than a slider with nothing in it.
 */
export const performances = {
  eyebrow: 'Performances',
  /** ✅ VERBATIM — the complete body copy of `/performances/`. */
  lines: ['Real students. Real performances.', 'Music meant to be shared.', 'Confidence built on stage.'],
  /** ✍️ */
  heading: 'It already happened.',
  /** ✍️ Explains the absence rather than hiding it. */
  note: 'Showcase photography is published once every family has given written consent. Until then, the account below is from the families who were in the room.',
  /** ⚠️ Gate I-4 — no dated event exists anywhere in the estate. */
  upcoming: null,
  /** ⚠️ Gate I-1 / I-7 — six photographs, no consent, unconfirmed copyright. */
  gallery: null,
} as const
