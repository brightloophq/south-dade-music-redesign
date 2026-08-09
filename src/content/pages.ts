/**
 * Interior page content — Tier 1.
 *
 * Source of truth: `docs/source-content/` (Phase 2 extraction, 2026-08-05).
 * Backlog: `docs/implementation/content-migration-coverage.md`.
 *
 * Same discipline as `home.ts`:
 *   ✅ VERBATIM  — extracted word for word, attributed
 *   ✍️ AUTHORED  — written for the rebuild from verified material
 *   ⚠️ GATED     — blocked pending an owner decision; absent from the page
 *
 * Nothing here is invented. Where the source is silent — tuition, lesson
 * length, eligibility criteria — the page is silent too, and says so rather
 * than filling the gap.
 */

import { siteConfig } from '@/config/site'

// ---------------------------------------------------------------------------
// Shared — the trial offer
// ---------------------------------------------------------------------------

/**
 * ✅ The only price on this site that may be published (gate B-8 blocks
 * tuition, not this). Verbatim from `/resources/` and the homepage FAQ — the
 * two pages out of twenty-six that ever stated the terms.
 */
export const trialOffer = {
  name: '90-Day Stage Experience Preview',
  price: '$25',
  terms:
    'It’s a 90-Day Stage Experience Preview. We hold your spot for $25, which is credited to your tuition when you enrol.',
  /**
   * ✅ The real, verified conversion endpoint — the HighLevel widget every CTA
   * in the estate resolves to.
   *
   * ⚠️ The site has no native form of its own; lead capture is 100% dependent
   * on this third party. Replacing it needs an owner decision on where
   * submissions should go, so the verified endpoint is used rather than a
   * local form that would post nowhere.
   * See content-migration-coverage.md §15.
   */
  bookingUrl: 'https://link.apisystem.tech/widget/survey/0IIXocvyYpPeFVbD5HPB',
} as const

/** ✅ Verbatim contact block, from the sitewide footer and `/contact-enroll/`. */
export const contactFacts = {
  phoneDisplay: siteConfig.contact.phoneDisplay,
  phoneHref: `tel:${siteConfig.contact.phone.value}`,
  email: siteConfig.contact.email.value,
  address: siteConfig.contact.address.value,
  hours: 'Mon – Sat, 8:00am – 6:00pm · Sunday closed',
  serviceArea: siteConfig.serviceArea,
} as const

// ---------------------------------------------------------------------------
// /contact/book-a-trial
// ---------------------------------------------------------------------------

export const bookTrialPage = {
  eyebrow: 'Book a trial',
  /** ✍️ Names the verified product rather than inventing a promise. */
  heading: 'Hold a place in the next cycle.',
  lead: trialOffer.terms,

  /**
   * ✍️ from ✅ verified week structure. Describes what the trial previews —
   * the programme's published shape — and claims nothing beyond it.
   */
  previews: [
    'Weeks 1–10 — skill development and rehearsal.',
    'Week 11 — they play for the class.',
    'Week 12 — dress rehearsal and live showcase.',
  ],

  cta: { label: 'Book a Trial', price: '$25', href: trialOffer.bookingUrl },

  /**
   * Direct routes, because one third-party widget serving every intent is the
   * single biggest fragility in the estate. A parent who will not fill in a
   * survey can still phone.
   */
  directHeading: 'Or reach us directly',

  /**
   * ⚠️ WITHHELD — four response-time promises exist in the source and the
   * extraction flags every one as unverified. "We'll call within one business
   * day" must not ship until the business confirms it can meet it.
   */
  responsePromise: null,

  /**
   * ⚠️ WITHHELD — gate B-8. Lesson length, tuition and what happens after the
   * trial are published nowhere in the estate.
   */
  whatHappensNext: null,
} as const

// ---------------------------------------------------------------------------
// /contact
// ---------------------------------------------------------------------------

export const contactPage = {
  eyebrow: 'Contact',
  /** ✍️ */
  heading: 'Where to find us.',
  /** ✅ VERBATIM — the identical sentence on five programme pages. */
  serviceLine:
    'We serve families in Florida City, Homestead, Cutler Bay, Palmetto Bay, and nearby areas.',

  /**
   * ⚠️ Gate I-8. Three unit numbers exist across the estate: 117, 1157, 115.
   * Unit 117 is published here because it is the only one corroborated twice —
   * the contact page's own body copy AND the Google Maps place record. The
   * camp pages say 1157, which is where parents would drive for drop-off, so
   * this must be resolved before any camp page ships.
   */
  addressNote: null,

  /**
   * ⚠️ WITHHELD — no map, directions, parking or entrance guidance exists
   * anywhere in the estate. The only map in the estate is on the lead-gen
   * subdomain. Inventing directions to a disputed unit number would be worse
   * than omitting them.
   */
  directions: null,
} as const

// ---------------------------------------------------------------------------
// /programs/90-day-stage-program
// ---------------------------------------------------------------------------

export const ninetyDayPage = {
  eyebrow: 'The flagship',
  /** ✅ VERBATIM programme name. ⚠️ ™ withheld pending gate B-5. */
  title: '90-Day Stage Program',

  /**
   * ✅ VERBATIM — the source page's own hero subtitle, and **previously
   * unmigrated**.
   *
   * `90-day-stage-program.md`: *H1 — 90-Day Stage Program (hero subtitle: "From
   * the Practice Room to the Spotlight in Three Months")*.
   *
   * It is the single best sentence the programme owns: it names the start, the
   * end and the duration in nine words, and it does it in the same stage
   * vocabulary the homepage film is built from. It has been sitting in the
   * extraction unused since Phase 2 while the page opened on an abstract
   * definition instead.
   */
  subtitle: 'From the Practice Room to the Spotlight in Three Months',

  /** ✅ VERBATIM. */
  lead: 'This program is a step-by-step plan that helps students prepare for a live performance in about three months.',

  /**
   * ✅ VERBATIM — **previously unmigrated**, and the answer to the question
   * this page most needed to answer.
   *
   * A parent reading "stage programme" can reasonably hear *pressure*, or
   * assume it is for children who are already confident. The source has a
   * section explaining why performance is in the programme at all, and the
   * rebuild was not carrying it.
   *
   * ⚠️ Only the first sentence ships. The source continues: *"In fact, music
   * programs that offer real performance opportunities help students develop
   * confidence and stronger skills over time."* — presented as research, with
   * **no source given**, which `90-day-stage-program.md` flags directly:
   * *"Should be sourced or softened."* Publishing an unsourced research claim
   * on the flagship page is exactly the kind of thing this project does not do.
   */
  whyStage: {
    heading: 'Why stage experience matters',
    body: 'Programs that include performance help students grow faster and feel more connected to music.',
    /** ⚠️ Withheld pending a citation. */
    researchClaim: null,
  },

  /**
   * ✅ VERBATIM — **previously unmigrated**.
   *
   * Note the conditional: students *"get the chance to"* perform. That wording
   * ships exactly as written. It is materially weaker than the footer's "every
   * student performs", and the difference is the whole reason gate B-4 exists —
   * the Stage-Ready Guarantee itself concedes that not every student is ready
   * at the end of the cycle.
   *
   * "This is the highlight of the program" carries no such conflict and is the
   * most useful sentence on the page for a parent deciding what the ninety days
   * are actually *for*.
   */
  finale: {
    heading: 'A real performance at the end',
    body: 'At the end of the 90 days, students get the chance to perform. This is the highlight of the program.',
  },
  /** ✅ VERBATIM. */
  intro:
    'At South Dade Music, our 90-Day Stage Program is designed to help students go from learning to performing in a clear and simple way. The goal is not just to practice, but to get ready for the stage in a short and focused time.',

  /** ✅ VERBATIM list — "In this program, students:" */
  inProgram: [
    'Choose songs to work on',
    'Practice with a clear goal',
    'Improve their skills each week',
    'Get ready to perform in front of others',
  ],

  /**
   * ✅ VERBATIM week structure, from the homepage and `/programs/` cards.
   *
   * ⚠️ Gate B-4. The programme page itself gives only a three-step narrative
   * with no week numbers, and calls the duration "about three months" — 12
   * weeks is 84 days, not 90. Both descriptions are published; this page
   * carries the week grid because it is the more specific and the more
   * checkable of the two.
   */
  weeks: [
    { id: 'weeks-1-10', label: 'Weeks 1–10', what: 'Skill development and rehearsal.' },
    { id: 'week-11', label: 'Week 11', what: 'Peer exposure — they play for the class.' },
    { id: 'week-12', label: 'Week 12', what: 'Dress rehearsal and live showcase.' },
  ],

  /** ✅ VERBATIM three-step journey. */
  steps: [
    {
      id: 'foundation',
      label: 'Step 1',
      title: 'Build the Foundation',
      body: 'Students start by working on their chosen songs — timing, technique, and understanding the music.',
    },
    {
      id: 'performer',
      label: 'Step 2',
      title: 'Practice Like a Performer',
      body: 'Students begin practicing like they are on stage — playing full songs, working on mistakes, and improving consistency.',
    },
    {
      id: 'stage',
      label: 'Step 3',
      title: 'Get Ready for the Stage',
      body: 'Students prepare for a real performance. They practice confidence, stage presence, and staying calm while playing.',
    },
  ],

  /** ✅ VERBATIM. */
  confidence: {
    heading: 'Build Confidence',
    items: [
      'Stay focused while playing',
      'Handle small mistakes',
      'Keep going without stopping',
      'Feel comfortable in front of an audience',
    ],
  },

  /** ✅ VERBATIM. */
  skills: {
    heading: 'Learn Real Performance Skills',
    items: [
      'How to prepare for a performance',
      'How to practice effectively',
      'How to stay on rhythm and timing',
      'How to play with expression and energy',
    ],
  },

  /** ✅ VERBATIM. */
  audience: {
    heading: 'Who Is This Program For?',
    items: [
      'Students already taking lessons',
      'Beginners who want a clear goal',
      'Kids and teens who want to perform',
      'Students who need help building confidence',
    ],
  },

  /** ✅ VERBATIM — never paraphrase. The strongest conversion trigger available. */
  guarantee: {
    label: 'Our Stage-Ready Guarantee',
    text: 'If your child is not prepared to step on stage at the end of the 90-day cycle, we will continue coaching them at no additional charge until they are ready.',
  },

  /**
   * ⚠️ Gate B-4 — the performance promise appears in two incompatible forms.
   * The footer and homepage say "every student performs"; this page says
   * "students get the chance to perform". **Neither ships.** The week grid and
   * the guarantee carry the meaning without making a claim that is contradicted
   * elsewhere on the same site.
   */
  performancePromise: null,

  /**
   * ⚠️ Gate B-8 — no tuition is published anywhere in the estate for the
   * flagship offer. Only the $25 spot-hold may appear.
   */
  tuition: null,

  /**
   * ⚠️ WITHHELD — "two classes weekly" appears on two pages and is contradicted
   * by all seven instrument pages, which each say one lesson per week.
   */
  frequency: null,
} as const

// ---------------------------------------------------------------------------
// /scholarships
// ---------------------------------------------------------------------------

export const scholarshipsPage = {
  eyebrow: 'Scholarship',
  /** ✍️ */
  heading: 'If you have a Step Up scholarship.',

  /** ✅ VERBATIM, `/step-up-accessibility/`. */
  whatIsIt: {
    heading: 'What is Step Up for Students?',
    body: 'Step Up for Students is a state-supported scholarship program that helps families access educational services, including music education.',
  },

  /** ✅ VERBATIM, both descriptions. */
  streams: [
    {
      id: 'pep',
      name: 'PEP',
      full: 'Personalized Education Program',
      body: 'The Personalized Education Program (PEP) supports families who choose flexible, customized learning options for their children.',
    },
    {
      id: 'ua',
      name: 'UA',
      full: 'Unique Abilities',
      body: 'The Unique Abilities scholarship provides support for students with special needs, allowing access to enriching programs in a supportive environment.',
    },
  ],

  /**
   * ✅ VERBATIM from `/resources/` and the homepage — the better-corroborated
   * of the four phrasings in the estate, and the one the homepage already
   * ships, so the site does not contradict itself.
   *
   * ⚠️ The dedicated source page says only "works within the Step Up
   * framework". Four materially different claims exist. Owner must settle it.
   */
  participation: {
    heading: 'How South Dade Music participates',
    body: 'South Dade Music partners with Step Up for Students as an approved provider. We accept PEP (Personalized Education Program) and UA (Unique Abilities) scholarships.',
    /** ✅ VERBATIM, `/step-up-accessibility/`. */
    model:
      'South Dade Music works within the Step Up framework to offer eligible students access to private lessons and programs without creating separate tracks or experiences.',
  },

  /** ✅ VERBATIM. */
  inclusive: {
    heading: 'Our inclusive approach',
    body: 'All students learn together in the same supportive environment. Instruction is adapted to individual needs while maintaining high expectations, creativity, and community.',
    /** ✅ VERBATIM, homepage Step Up block. */
    line: 'Inclusive programs for all learners.',
  },

  /**
   * ✅ VERBATIM — MANDATORY, and must sit adjacent to the claim.
   *
   * This is a compliance statement about who awards public funds. It exists on
   * `/resources/` and is **dropped by the source's own scholarship page**,
   * which is the one place it matters most. It ships here.
   */
  disclaimer:
    'Please note that these scholarships are administered and awarded by Step Up for Students, not by South Dade Music.',

  /**
   * The honest next step. Eligibility criteria, application steps, the required
   * document list, coverage amounts and any link to the administering body are
   * published NOWHERE in the estate — so this page routes families to a person
   * rather than inventing a process.
   *
   * ⚠️ These are the highest-value owner inputs on the site: this is the
   * audience that most needs a path and currently has none.
   */
  next: {
    heading: 'Using your scholarship here',
    body: 'Eligibility is determined by Step Up for Students, not by us. If you are already approved, or waiting to hear, talk to us and we will tell you exactly what we need.',
    cta: { label: 'Talk to us about Step Up', href: '/contact' },
  },

  /** ⚠️ WITHHELD — never published. See content-migration-coverage.md §7. */
  eligibilityCriteria: null,
  applicationSteps: null,
  requiredDocuments: null,
  coverageAmount: null,
  /** ⚠️ Gate I-6 — Step Up logo licensing unconfirmed. */
  logos: null,
  /** ⚠️ Gate B-6 — the bilingual claim is unevidenced. */
  bilingualClaim: null,
} as const
