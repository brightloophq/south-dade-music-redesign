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
  /**
   * UPCOMING — the authored location for future performances. EE1.
   *
   * ## Why this exists as an empty state rather than as nothing
   *
   * `liveEventPages: 0`, `brokenEventPages: 2`. The estate's entire event
   * infrastructure 404s, the footer carries an `/events` link gated on I-4, and
   * the rebuild had no place at all where a real showcase date could land. The
   * result was that the one thing this business is organised around — a night
   * when children play in front of people — had no home on its own website.
   *
   * So the home is built now and stands empty, deliberately and visibly. That
   * is the honest state: **there is no announced date**, and the page says so
   * in those words rather than staging a hopeful "check back soon" or, worse,
   * reviving the March 2025 record whose date survives only in a search index
   * that `events.json` flags as unverified.
   *
   * ⚠️ Gate I-4. When a real date exists this block takes it. Nothing else on
   * the page has to change.
   *
   * ⚠️ **Do not fill this from `events.json`.** The Bazaar and Flea Market
   * Performance is recoverable owner history, not publishable content: the URL
   * 404s and its date and time come from index metadata for a page that no
   * longer resolves.
   */
  upcoming: {
    label: 'Upcoming',
    /** ✍️ States the absence in the words the absence deserves. */
    heading: 'No date is announced.',
    body: 'We are not going to publish a date we do not have. When the next showcase, recital or community performance is scheduled, it will be listed here — with the date, the time and where to stand.',
    /** ✍️ The one useful action available while it is empty. */
    action: { label: 'Ask to be told when it is', href: '/contact' },
  },

  /**
   * IN THE COMMUNITY — EE1.
   *
   * ✅ VERBATIM, `/about/` — "Performances & Community Impact". These two
   * sentences are the only published account of what the academy does outside
   * its own room, and they were reaching visitors on `/about` only, which is
   * not the page anyone reads to find out about performances.
   *
   * ⚠️ The stronger-sounding claim from `/resources/` — "We actively engage in
   * community outreach through free performances and collaborative ensembles
   * like choirs, orchestras, and modern band" — is **not used**. It is bundled
   * in the source with the gate B-4 promise, and `content-conflicts.md` records
   * that no choir and no orchestra is offered anywhere on the site. Publishing
   * it would restate a claim the estate itself contradicts.
   */
  community: {
    label: 'In the community',
    lines: [
      'We believe performance is an important part of growth. Students take part in recitals, community events, and group showcases that build confidence and stage experience.',
      'At South Dade Music, learning goes beyond the classroom and into the community.',
    ],
  },

  /** ⚠️ Gate I-1 / I-7 — six photographs, no consent, unconfirmed copyright. */
  gallery: null,
} as const
