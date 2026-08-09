/**
 * Policy content.
 *
 * ⚠️ **NONE OF THESE PAGES HAS A SOURCE.** The estate publishes no privacy
 * policy, no terms, no accessibility statement, no lesson cancellation policy
 * and no photo-consent form. There is nothing to migrate — these are authored.
 *
 * ## The rule this module follows
 *
 * A policy page states obligations. Inventing one creates a commitment the
 * business never agreed to and may not be able to meet — which is worse than
 * having no page, because a published policy is enforceable against them.
 *
 * So every page here ships in one of two states:
 *
 *   **STATED**       — built only from facts already verified in the extraction
 *                      (contact channels, hours, the systems actually in use).
 *   **UNDER REVIEW** — a restrained, honest placeholder naming what the section
 *                      will cover and how to get an answer meanwhile. No
 *                      obligation is asserted.
 *
 * Nothing marked `null` renders. No internal TODO language reaches the page.
 *
 * Every `⚠️ OWNER` note below is consolidated in
 * `docs/implementation/owner-decision-register.md`.
 */

import { contactFacts } from './pages'

/** Shown wherever a section cannot be written without an owner or legal answer. */
export const underReview = {
  label: 'Under review',
  body: 'This section is being finalised with the academy. If you need an answer before it is published, contact us and we will answer directly.',
} as const

// ---------------------------------------------------------------------------
// /privacy
// ---------------------------------------------------------------------------

export const privacyPolicy = {
  eyebrow: 'Privacy',
  heading: 'How we handle your information.',
  /**
   * ✍️ Neutral scaffolding. States only what is *observably* true of the
   * current estate — enquiries are captured by a third-party form, and the
   * business can be reached directly.
   */
  intro:
    'This page explains what happens to the information you give South Dade Music when you enquire, book a trial, or contact us.',

  sections: [
    {
      id: 'what-we-collect',
      heading: 'What we collect',
      /**
       * ✅ Verified from `conversion-actions.json`: the only capture mechanism
       * in the estate is one third-party booking widget, plus phone and email.
       * The exact fields that widget collects are configured outside this site.
       */
      body: 'When you book a trial, your details are collected through our booking form. You can also contact us by phone or email, in which case we hold whatever you choose to tell us.',
      status: 'stated',
    },
    {
      id: 'third-parties',
      heading: 'Third parties',
      /**
       * ✅ Verified: booking runs through an external provider. The provider is
       * deliberately not named on the page — ⚠️ OWNER: confirm the account
       * ownership and the correct legal entity name before naming it publicly.
       */
      body: 'Our booking form is operated by an external provider on our behalf. Information submitted through it is held by that provider as well as by us.',
      status: 'stated',
    },
    {
      id: 'retention',
      heading: 'How long we keep it',
      /** ⚠️ OWNER — no retention period has ever been decided or published. */
      body: null,
      status: 'under-review',
    },
    {
      id: 'your-rights',
      heading: 'Your choices',
      /**
       * ✍️ States a route to a human rather than asserting a statutory right
       * the business has not confirmed it can service. ⚠️ OWNER + legal:
       * Florida and federal obligations, and whether any minors' data rules
       * apply given the audience.
       */
      body: `If you want to know what we hold about you, or want it removed, contact us at ${contactFacts.email} or ${contactFacts.phoneDisplay} and we will deal with it directly.`,
      status: 'stated',
    },
    {
      id: 'children',
      heading: 'Children',
      /**
       * ⚠️ OWNER + legal — the audience is children aged 3–18. Obligations here
       * are the most consequential on the page and must not be guessed.
       */
      body: null,
      status: 'under-review',
    },
    {
      id: 'analytics',
      heading: 'Analytics and cookies',
      /**
       * ⚠️ BLOCKED — see `docs/implementation/analytics-tag-inventory.md`. No
       * tag inventory exists yet, so what runs cannot be described honestly.
       * Naming trackers we have not confirmed would be a false statement.
       */
      body: null,
      status: 'under-review',
    },
  ],
} as const

// ---------------------------------------------------------------------------
// /terms
// ---------------------------------------------------------------------------

export const termsPage = {
  eyebrow: 'Terms',
  heading: 'Terms of use.',
  intro:
    'These terms cover the use of this website. Terms for lessons, programmes and camp enrolment are handled separately when you book.',

  sections: [
    {
      id: 'the-site',
      heading: 'This website',
      /** ✍️ Neutral, and true of any site. Asserts nothing about the business. */
      body: 'The information on this site is provided to help families understand what South Dade Music offers. We keep it as accurate as we can; where something is not published here, ask us and we will tell you.',
      status: 'stated',
    },
    {
      id: 'booking',
      heading: 'Booking a trial',
      /**
       * ✅ VERBATIM — the one commercial term the estate actually publishes.
       * Everything else about tuition is gated on B-8.
       */
      body: 'The trial is a 90-Day Stage Experience Preview. We hold your spot for $25, which is credited to your tuition when you enrol.',
      status: 'stated',
    },
    {
      id: 'camp-terms',
      heading: 'Camp registration',
      /**
       * ✅ VERBATIM camp refund terms — the only published policy in the
       * estate. It ships in full here because it is legally load-bearing and
       * because a parent agreeing to it deserves to read it before booking.
       *
       * ⚠️ The extraction recommends legal review of this wording, and the
       * deposit amount is stated nowhere.
       */
      body: 'The down payment required to hold your spot is strictly non-refundable. The remaining balance is due 14 days prior to the start date. All registrations are final and non-refundable due to limited enrollment and advance planning for instructors and materials.',
      status: 'stated',
    },
    {
      id: 'tuition',
      heading: 'Tuition and fees',
      /** ⚠️ Gate B-8 — no tuition is published anywhere for any programme. */
      body: null,
      status: 'under-review',
    },
    {
      id: 'liability',
      heading: 'Liability',
      /** ⚠️ OWNER + legal. Never guessed. */
      body: null,
      status: 'under-review',
    },
    {
      id: 'governing-law',
      heading: 'Governing law',
      /**
       * ⚠️ OWNER + legal — depends on the registered legal entity, and gate B-5
       * has not settled which of four names is the business.
       */
      body: null,
      status: 'under-review',
    },
  ],
} as const

// ---------------------------------------------------------------------------
// /accessibility
// ---------------------------------------------------------------------------

export const accessibilityPage = {
  eyebrow: 'Accessibility',
  heading: 'Using this site, and getting into the building.',
  intro:
    'We want this site and our studio to work for every family. This page states what is true today and what we are still confirming.',

  /**
   * ✅ Every line below is **class A — mechanically enforced**, and each maps to
   * a named check that fails the build if it stops being true:
   *
   *   keyboard + focus  `check:a11y` — Tab-walks all 27 routes, asserts every
   *                     control is reachable, nothing traps focus, and every
   *                     focused element paints a visible indicator
   *   contrast          `check:tokens` — computes every declared token pair
   *   heading order     `check:a11y` — one h1, zero skipped levels, 27/27
   *   text size         `check:a11y` — measured at a 390px viewport
   *   target size       `check:a11y` — measured at a 390px viewport
   *   reduced motion    `check:a11y` + `probe:motion --production`
   *
   * ⚠️ **Two of these were previously false and are now corrected.** The page
   * used to claim "body text is never smaller than 16px" (the `body-sm` token
   * is 15px) and "every control is at least 44 by 44 pixels" (the direction's
   * own hairline-link idiom is ~16–24px tall). Both were published on the
   * strength of a "route audit" that did not exist. They now state the AA bar
   * the site actually holds, and `check:a11y` enforces it.
   *
   * The rule: **an accessibility page is a promise. Either it is checked, or it
   * is not claimed.** Nothing below is aspiration.
   */
  siteCommitments: [
    'Every page can be used with a keyboard alone. Tab reaches every control in a sensible order, nothing traps you, and whatever you land on is clearly outlined.',
    'Text contrast meets WCAG AA everywhere on the site, and most of it meets the stricter AAA level.',
    'Headings run in order without skipping a level, so screen-reader navigation is predictable.',
    'Reading text is never smaller than 15px, and the main body copy is 17px or larger.',
    'Every button, link and form control is at least 24 by 24 pixels — the WCAG AA minimum — and most are considerably larger.',
    'If you have reduced motion turned on, the site respects it. Nothing here needs motion to be understood.',
  ],

  /**
   * ✍️ Stated because it is unusual and true, and because it is the honest
   * answer to "how would you know?" — which is the question an accessibility
   * statement should be able to survive.
   */
  howWeKnow:
    'These are not intentions. Each one is checked automatically against every page of this site, and a change that broke one would stop the site from being published.',

  /**
   * ✅ VERBATIM from `/step-up-accessibility/` — the academy's stated approach
   * to inclusion in teaching.
   */
  inclusionStatement:
    'All students learn together in the same supportive environment. Instruction is adapted to individual needs while maintaining high expectations, creativity, and community.',

  /**
   * ⚠️ OWNER — the estate publishes **no** physical-access information: no
   * step-free access, parking, restroom or sensory accommodation detail for
   * 601 W Palm Dr. This is the single most useful thing the owner could add
   * here, and it cannot be guessed.
   */
  physicalAccess: null,

  feedback: `If something on this site or at the studio does not work for you, tell us at ${contactFacts.email} or ${contactFacts.phoneDisplay}. We will fix what we can and tell you honestly what we cannot.`,
} as const

// ---------------------------------------------------------------------------
// /lesson-cancellation
// ---------------------------------------------------------------------------

export const lessonCancellationPage = {
  eyebrow: 'Lessons',
  heading: 'Cancellations and missed lessons.',
  /**
   * ⚠️ This page exists because the absence is actively misleading:
   * `/piano-lessons/` advertises "Supportive make-up policies" and **no such
   * policy is published anywhere in the estate**. A parent is told a policy
   * exists and cannot read it.
   *
   * The page does not invent one. It says plainly that the terms are confirmed
   * when you enrol, and gives a direct route to ask.
   */
  intro:
    'Cancellation and make-up terms for private and group lessons are confirmed with you when you enrol.',
  body: `If you need to cancel or reschedule a lesson, contact us at ${contactFacts.phoneDisplay} or ${contactFacts.email} as early as you can and we will sort it out with you directly.`,

  /** ⚠️ Gate — never published. The three things a parent actually asks. */
  noticePeriod: null,
  makeUpEntitlement: null,
  refundTerms: null,

  /**
   * ✅ VERBATIM — the camp is the one product whose terms ARE published, and
   * they differ sharply from lessons. Cross-referenced so nobody assumes the
   * camp's strict non-refundable terms apply to weekly lessons, or vice versa.
   */
  campNote:
    'Camp registration is different: the down payment is strictly non-refundable and all registrations are final.',
} as const

// ---------------------------------------------------------------------------
// /photo-consent
// ---------------------------------------------------------------------------

/** The media uses a guardian can permit or refuse, independently. */
export const consentCategories = [
  {
    id: 'internal',
    label: 'Internal use',
    description:
      'Photographs shown inside the academy — on a noticeboard, in a lesson, or shared with the families in the same class.',
  },
  {
    id: 'website',
    label: 'This website',
    description:
      'Photographs published on southdademusic.com, including the performances page.',
  },
  {
    id: 'social',
    label: 'Social media',
    description:
      'Photographs posted to the academy’s social media accounts, where they can be seen and re-shared publicly.',
  },
  {
    id: 'print',
    label: 'Printed material',
    description: 'Flyers, posters and printed programmes for showcases and camps.',
  },
  {
    id: 'video',
    label: 'Video and audio',
    description:
      'Recordings of showcases and lessons, including any use of your child’s playing or singing.',
  },
] as const

export const photoConsentPage = {
  eyebrow: 'Consent',
  heading: 'Permission to photograph your child.',

  /** ✍️ Explains why the form exists, in plain terms. */
  intro:
    'South Dade Music does not publish a photograph of any student without written permission from their parent or guardian. This form is how that permission is given — and how it is withdrawn.',

  explanation: [
    'Every performance photograph the academy holds is currently unpublished, because consent was never recorded for it. That is why the performances page carries families’ words rather than pictures.',
    'You can permit some uses and refuse others. Saying no to any or all of them changes nothing about your child’s place, their lessons, or their part in a showcase.',
    'You can withdraw permission at any time by contacting us. We will stop using the photographs going forward; anything already printed cannot be recalled.',
  ],

  /** ✍️ Neutral acknowledgement. Asserts no legal construction. */
  acknowledgement:
    'I am the parent or legal guardian of the child named above, and the permissions I have selected reflect my decision.',

  withdrawal: `To change or withdraw permission later, contact ${contactFacts.email} or ${contactFacts.phoneDisplay}.`,

  /**
   * ⚠️ SUBMISSION IS DISABLED — this is an engineering blocker, not an
   * oversight.
   *
   * There is nowhere to send this. The site has **no native form endpoint**;
   * 100% of capture runs through a third-party widget whose account ownership
   * is unconfirmed (see `lead-data-cutover-plan.md`). Consent data is more
   * sensitive than a lead — it concerns identified minors — and must not be
   * routed into an unverified third-party store.
   *
   * Enabling this requires an owner decision on the destination, and a
   * confirmed processor. Until then the form renders, is fully readable and
   * reviewable, and states plainly that it cannot yet be submitted. It does
   * **not** pretend to store anything.
   */
  submissionEnabled: false,
  submissionBlockedNotice:
    'This form cannot be submitted yet. We are finalising where consent records are stored so that they are held securely and can be honoured. In the meantime, contact us and we will record your decision directly.',
} as const
