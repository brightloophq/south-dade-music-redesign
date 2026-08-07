import { instrumentPages } from './lessons'
import { programEntries } from './programs'

/**
 * Homepage content.
 *
 * Canonical spec: docs/homepage/04-copy-framework.md
 * Source of truth: docs/source-content/ — **no business fact is invented here.**
 *
 * Every string carries a provenance mark, matching the copy framework:
 *
 *   ✅ VERBATIM — extracted from the live site. Publishable today.
 *   ✍️ AUTHORED — new copy containing no unverified business fact.
 *   ⚠️ GATED    — blocked on a decision gate; fallback in use.
 *
 * A line with no mark does not ship.
 */

// ---------------------------------------------------------------------------
// §1 — The Bill (hero)
// ---------------------------------------------------------------------------

export const hero = {
  /** ✅ Programme name is extracted. ⚠️ B-5 — ™ usage withheld pending brand-name decision. */
  eyebrow: 'The 90-Day Stage Program',

  /**
   * ✍️ AUTHORED. Rendered as three lines for the curtain-up reveal.
   *
   * ⚠️ Gate B-4. The live site's eyebrow reads "Every Student Steps on Stage
   * Within 90 Days" — unconditional, and contradicted by the guarantee that
   * qualifies it. This wording describes the programme's shape rather than
   * making a universal claim about students.
   *
   * HARD RULE until B-4 closes: the words "every student" appear nowhere.
   */
  headingLines: ['In 90 days,', 'your child', 'takes a stage.'] as const,

  /** ✍️ from ✅ verified week structure. */
  supporting: 'Weeks 1–10 skill · Week 11 the class · Week 12 you.',

  /** ✅ VERBATIM price — "We hold your spot for $25". Gate B-8 blocks tuition, not this. */
  primaryCta: { label: 'Book a Trial', price: '$25', href: '/contact/book-a-trial' },

  /**
   * ⚠️ I-4 fallback. "Come watch a showcase" is barred until a dated event
   * exists — no event record is published and both event URLs 404.
   */
  secondaryCta: { label: 'See the 12 weeks', href: '#twelve-weeks' },

  /** Fact bar. All ✅ VERBATIM. */
  facts: [
    { value: '90', unit: 'days', countFrom: 72 },
    { value: '12', unit: 'weeks', countFrom: 9 },
    { value: '3–18', unit: 'ages', countFrom: null },
  ] as const,

  /** ✍️ précis of the ✅ verbatim guarantee. Full text appears in the final CTA. */
  guarantee: {
    title: 'Stage-Ready Guarantee',
    precis: 'Not ready? We keep coaching.',
  },
} as const

// ---------------------------------------------------------------------------
// §2 — The Reframe
// ---------------------------------------------------------------------------

/**
 * ✍️ AUTHORED. Beats 1 and 2 of the transformation story (01-brand-strategy §12).
 *
 * Twenty-three words, and the most important on the page. Line 1 opens with the
 * parent's experience rather than the school's. Line 2 is the persuasive hinge:
 * it moves the problem from the child's *character* to a *teachable gap*, which
 * is the only move that makes everything below it purchasable.
 *
 * Specified in docs/homepage/02-section-specifications.md §2. Carries no gate.
 */
export const reframe = {
  recognition: 'She sings constantly at home. In front of anyone else, nothing.',
  hinge: 'That’s not shyness. That’s a skill she hasn’t been taught yet.',
} as const

// ---------------------------------------------------------------------------
// §11 — The Turn
// ---------------------------------------------------------------------------

/**
 * ✅ VERBATIM — **PROTECTED COPY.**
 *
 * 01-brand-strategy.md §2: "That second line, buried in the homepage's
 * four-pillar block, is the single best sentence on the current website."
 *
 * Do not edit, shorten, or Americanise the spelling — quoted exactly,
 * including "realize".
 */
export const theTurn = {
  line: 'Because once they realize they can get through something that feels scary, it changes how they approach everything else.',
} as const

// ---------------------------------------------------------------------------
// §3 — The 90-Day Journey
// ---------------------------------------------------------------------------

/**
 * ✅ VERBATIM stage structure.
 *
 * The source renders these with literal "o " bullet artifacts and the word
 * "mein" left in the English copy ("Class mein performance"). Both defects die
 * here — the underlying structure is unchanged.
 */
export const journeyStages = [
  {
    id: 'weeks-1-10',
    weekLabel: 'Weeks 1–10',
    title: 'Skill development and rehearsal.',
    /** Fraction of the scrub timeline at which this stage begins. */
    start: 0.06,
    end: 0.55,
  },
  {
    id: 'week-11',
    weekLabel: 'Week 11',
    title: 'They play for the class.',
    start: 0.6,
    end: 0.78,
  },
  {
    id: 'week-12',
    weekLabel: 'Week 12',
    title: 'Dress rehearsal and live showcase.',
    start: 0.84,
    end: 1,
  },
] as const

export const journey = {
  /** ✍️ AUTHORED. */
  heading: 'What ninety days looks like',
  progressLabel: 'Week',
  /** Accessible name for the skip affordance. */
  skipLabel: 'Skip to the twelve-week table',
  stages: journeyStages,
} as const

// ---------------------------------------------------------------------------
// §4 — The twelve weeks, published
// ---------------------------------------------------------------------------

/**
 * ✅ VERBATIM week structure.
 *
 * ⚠️ PUBLICATION NOTE — docs/homepage/04-copy-framework.md §4.
 * The lead line "Two classes a week. One for skill, one for the band." is
 * VERBATIM from the canonical FAQ but **conflicts with seven pages** stating one
 * lesson per week. A published syllabus that contradicts the rest of the site is
 * worse than no syllabus, so the lead is **withheld** until reconciled. The week
 * rows below carry no such conflict and ship as extracted.
 */
export const twelveWeeks = {
  /** ✍️ AUTHORED. */
  heading: 'The twelve weeks, published',
  /** ✅ VERBATIM. Carries no session-frequency claim. */
  lead: 'A structured 12-week program, ending in a live showcase.',
  rows: [
    {
      id: 'weeks-1-10',
      week: 'Weeks 1–10',
      what: 'Skill development and rehearsal.',
      milestone: null,
    },
    {
      id: 'week-11',
      week: 'Week 11',
      what: 'Peer exposure — they play for the class.',
      milestone: 'Peer exposure',
    },
    {
      id: 'week-12',
      week: 'Week 12',
      what: 'Dress rehearsal and live showcase.',
      milestone: 'Live showcase',
    },
  ],
  /** ✅ VERBATIM. */
  footnote: 'Ages 3–18. Adults welcome.',
} as const

// ---------------------------------------------------------------------------
// Programs
// ---------------------------------------------------------------------------

/**
 * All ✅ VERBATIM from docs/source-content/programs.json.
 *
 * `facts` contain only values the source actually states. Where the source is
 * silent — Private Lessons has no stated duration, Band Builders no numeric age
 * range — nothing is invented and the fact is simply absent.
 *
 * ⚠️ No price appears on any card. Gate B-8: `tuitionOrPricing` is `null` for
 * every programme except the camp.
 */
/**
 * The playbill's six entries.
 *
 * ⚠️ Derived from `programs.ts`, which is canonical as of Tier 2 — the same
 * business fact must not live in two content modules. `route` is `null` for
 * the three programmes whose pages are Tier 3; the playbill renders those
 * unlinked rather than pointing at a 404.
 */
export const programs = programEntries

export const programsSection = {
  /** ✍️ AUTHORED. */
  heading: 'Programs',
  lead: 'One flagship cycle, and the classes that feed it.',
} as const

// ---------------------------------------------------------------------------
// Music lessons — instruments
// ---------------------------------------------------------------------------

/**
 * All ✅ VERBATIM from docs/source-content/instruments.json.
 * `startAge` quotes the source's recommended age; `note` quotes what a family
 * needs to begin, where the source states one.
 *
 * ⚠️ Keyboard is listed in the source as an instrument sold without a page.
 * It is **omitted** here rather than linked to a route that does not exist —
 * the current site's homepage carries a Keyboard tile with no destination.
 */
/**
 * The seven instruments.
 *
 * ⚠️ Derived from `lessons.ts`, which is canonical as of Tier 2. Routes are
 * the original flat URLs (`/piano-lessons`), which is what actually exists —
 * the homepage previously linked to `/lessons/piano`, which never did.
 */
export const instruments = instrumentPages.map((i) => ({
  id: i.id,
  name: i.name,
  href: i.route,
  startAge: i.startsAround,
}))

export const lessonsSection = {
  /** ✍️ AUTHORED. */
  heading: 'Music lessons',
  /** ✅ VERBATIM — "A keyboard is enough to start" is quoted from the piano FAQ. */
  lead: 'Seven instruments, taught one-on-one. Most children start between five and eight. A keyboard is enough to start.',
  cta: { label: 'See all lessons', href: '/lessons' },
} as const

// ---------------------------------------------------------------------------
// §7 — Performance gallery
// ---------------------------------------------------------------------------

/**
 * ⚠️ FALLBACK IN USE — docs/homepage/02-section-specifications.md §7.
 *
 * Gates I-1 (no photo-release consent for any of the 18 photographs) and I-4
 * (zero dated events; both event URLs 404) are both open, so the gallery ships
 * as **"In the room, in their words"** — the three reviews that are themselves
 * showcase evidence.
 *
 * Undated performance imagery is barred (09-image-strategy.md §8): an undated
 * photo cannot prove a recurring cycle. Text testimony is the more honest proof
 * here, not the weaker one.
 */
export const performanceEvidence = {
  /** ✍️ AUTHORED. */
  heading: 'It already happened',
  lead: 'Not our words.',
  /** ✅ VERBATIM Google Business Profile reviews. */
  quotes: [
    {
      id: 'dexter',
      quote:
        'The concert was a heartwarming showcase of the kids’ talent, joy, and hard work, leaving us all proud and inspired.',
      author: 'Dexter',
    },
    {
      id: 'romi',
      quote:
        'love how involved kids are in learning music !! my niece was in the show and she’s been having so much fun at practice !',
      author: 'romi',
    },
    {
      id: 'brian-silverio',
      quote:
        'Had the pleasure of attending a lovely event hosted by South Dade music Academy, and it was truly heartwarming. The young performers were incredibly talented, and it was clear how much care went into preparing them.',
      author: 'Brian Silverio',
    },
  ],
  /** Shown in place of the gallery so the absence is explained, not hidden. */
  note: 'Showcase photography is published once every family has given written consent.',
} as const

// ---------------------------------------------------------------------------
// §8 — Testimonials
// ---------------------------------------------------------------------------

/**
 * ✅ VERBATIM. Selection per docs/homepage/02-section-specifications.md §8.
 *
 * Verbatim or omitted — a parent's words are never edited, including mixed
 * Spanish/English and original spelling.
 *
 * WITHHELD from the homepage set:
 *  · Charles Percy — names two minors in full AND is religious (⚠️ B-1 + consent)
 *  · John Granada — religious framing (⚠️ B-1)
 *  · Julian Paz — 721 characters, too long for a card; retained for /about
 *  · Claudia Olivar, J Val, Mariana Olvera — generic
 *
 * ⚠️ `namesMinor` flags the one quote requiring guardian consent before it can
 * be published. It is excluded from the rendered set until that consent exists.
 */
export const testimonials = [
  {
    id: 'mariana-gennevie-olvera',
    quote:
      'My son Aaron has been building his confidence since he joined south dade music academy! I love the dedication they give to the kids here. You can tell they’re passionate about what they do!',
    author: 'Mariana Gennevie Olvera',
    namesMinor: true,
  },
  {
    id: 'nikin-shah',
    quote:
      'My daughter comes here, and it is great. Mr. Lopez is her teacher, and she always says the class is great, and she loves it. She has made friends and is very happy! Such a great music class.',
    author: 'Nikin Shah',
    namesMinor: false,
  },
  {
    id: 'maria-carolina-linares',
    quote: 'Es Genial la escuela 100% recommendada! I recommend this music school!! The teacher Alberto so really good!!',
    author: 'Maria carolina Linares',
    namesMinor: false,
  },
  {
    id: 'yaimarelys-grandales',
    quote: 'Best music school, my son has made a lot of progress in just a few months, the best teacher, Mr. Lopez',
    author: 'Yaimarelys Grandales',
    namesMinor: false,
  },
  {
    id: 'elizabeth-garcia',
    quote: 'My daughter love the school, the teachers are really professional and children oriented. Best music school in Homestead.',
    author: 'Elizabeth Garcia',
    namesMinor: false,
  },
  {
    id: 'j-val',
    quote: 'Amazing teachers that are very passionate and patient in what they do. My kids love the classes.',
    author: 'J Val',
    namesMinor: false,
  },
] as const

export const testimonialsSection = {
  /** ✍️ AUTHORED. */
  heading: 'What families say',
  /** ✅ Source: probableSource on every record. */
  sourceLabel: 'Google review',
} as const

// ---------------------------------------------------------------------------
// §10 — Scholarships
// ---------------------------------------------------------------------------

export const scholarship = {
  /** ✍️ AUTHORED. */
  heading: 'If you have a Step Up scholarship',
  /** ✅ VERBATIM. */
  lead: 'South Dade Music partners with Step Up for Students as an approved provider. We accept PEP (Personalized Education Program) and UA (Unique Abilities) scholarships.',
  /**
   * ✅ VERBATIM — MANDATORY.
   * This disclaimer appears on /resources/ and is dropped by
   * /step-up-accessibility/, the page where it matters most. It is a compliance
   * statement about who awards public funds and ships every time the
   * scholarship is mentioned.
   */
  disclaimer:
    'Please note that these scholarships are administered and awarded by Step Up for Students, not by South Dade Music.',
  /** ✅ VERBATIM. */
  inclusion: 'Inclusive programs for all learners.',
  points: [
    'Approved Step Up for Students provider',
    'Scholarships accepted for eligible families',
    'Inclusive programs for all learners',
  ],
  cta: { label: 'Talk to us about Step Up', href: '/contact' },
  /**
   * ⚠️ Gate B-6. The verbatim claim "We offer full bilingual support across our
   * core programs and enrollment processes" is evidenced NOWHERE — no Spanish
   * content, switcher or hreflang exists. Per 04-copy-framework.md §10 the claim
   * is REMOVED, not softened, until the Spanish tree is built.
   */
  bilingualClaim: null,
} as const

// ---------------------------------------------------------------------------
// §12 — The guarantee, and how to start
// ---------------------------------------------------------------------------

export const finalCta = {
  /** ✍️ AUTHORED. */
  heading: 'If they’re not ready, we keep going.',
  /**
   * ✅ VERBATIM — NEVER PARAPHRASE.
   * The strongest conversion trigger available (03-user-journey.md §3, ranked
   * #1), currently on 2 pages of 26 and none of the 6 programme pages.
   */
  guarantee:
    'If your child is not prepared to step on stage at the end of the 90-day cycle, we will continue coaching them at no additional charge until they are ready.',
  guaranteeLabel: 'Our Stage-Ready Guarantee',
  /** ✅ VERBATIM. */
  trialNote: 'It’s a 90-Day Stage Experience Preview. We hold your spot for $25, which is credited to your tuition when you enrol.',
  cta: { label: 'Book a Trial', price: '$25', href: '/contact/book-a-trial' },
  /**
   * ⚠️ WITHHELD. "We'll call within one business day" must not ship until the
   * business confirms it can meet that commitment (04-copy-framework.md §12).
   */
  nextStep: null,
} as const

// ---------------------------------------------------------------------------
// Page metadata
// ---------------------------------------------------------------------------

export const homeMeta = {
  title: 'South Dade Music',
  /**
   * ✍️ AUTHORED. Names the service area and the 90-day cycle without any banned
   * keyword phrase (06-seo-strategy.md; 04-copy-framework.md §7).
   */
  description:
    'A performance-led music academy in Florida City. Students learn an instrument and step onto a real stage in a live showcase, backed by our Stage-Ready Guarantee.',
} as const
