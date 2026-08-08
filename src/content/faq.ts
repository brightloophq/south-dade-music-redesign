/**
 * FAQ content.
 *
 * Source of truth: `docs/source-content/faqs.json` — 40 unique FAQs across 10
 * sets. Thirty-three already ship on their instrument pages (Tier 2). This
 * module carries the site-wide set, and points at the camp set.
 *
 *   ✅ VERBATIM  — extracted word for word, attributed
 *   ⚠️ WITHHELD  — the answer contains a claim the estate contradicts
 *
 * ## ⚠️ Three of the seven site-wide answers do not ship
 *
 * This is the **only published source of pricing, guarantee, age and
 * scholarship terms in the entire estate** — and three of its seven answers
 * assert things the rest of the site contradicts. They are withheld rather
 * than reworded, because rewording would be inventing a resolution nobody has
 * evidence for.
 *
 * Each withheld item is listed in `withheldFaqs` with its reason, so the gap is
 * visible in code rather than silently missing.
 */

export interface Faq {
  q: string
  a: string
}

/** ✅ VERBATIM — the four site-wide answers that carry no contradiction. */
export const siteFaqs: readonly Faq[] = [
  {
    q: 'What ages do you teach?',
    a: 'South Dade Music provides private and group music instruction for children, teens, and adults. Our primary market focus is families with children ages 3–18, including early-childhood programs for ages 3–6, as well as adults seeking beginner or returning instruction.',
  },
  {
    q: 'Do you accept Step Up scholarships?',
    a: 'Yes, South Dade Music partners with Step Up for Students as an approved provider. We accept PEP (Personalized Education Program) and UA (Unique Abilities) scholarships. Please note that these scholarships are administered and awarded by Step Up for Students, not by South Dade Music.',
  },
  {
    q: 'What if my child is too shy?',
    a: 'That is exactly what we train for. We use a Gradual Exposure Ladder to move them from isolation to community safely.',
  },
  {
    q: 'How does the trial work?',
    a: 'It is a 90-Day Stage Experience Preview. We hold your spot for $25, which is credited to your tuition upon enrollment.',
  },
]

/**
 * ⚠️ WITHHELD — recorded so the omission is auditable, never rendered.
 *
 * All three are gated on owner decisions. Publishing any of them would put a
 * claim on the FAQ page that another page of the same site denies.
 */
export const withheldFaqs = [
  {
    q: 'Are lessons available in Spanish?',
    gate: 'B-6',
    reason:
      'The answer claims "full bilingual support across our core programs and enrollment processes". No Spanish content, language switcher or hreflang exists anywhere in the estate.',
  },
  {
    q: 'Do students perform live?',
    gate: 'B-4',
    reason:
      'The answer states "every student performs in a live showcase". The 90-Day Stage Program page says students "get the chance to perform". It also names choirs and orchestras, which are offered nowhere.',
  },
  {
    q: 'Is this just regular music lessons?',
    gate: 'owner confirmation',
    reason:
      'The answer states "students attend two classes weekly: one for skill, one for band application". All seven instrument pages state one lesson per week.',
  },
] as const

/**
 * ✅ The trial answer above is deliberately truncated at the price.
 *
 * The full source answer continues into the Stage-Ready Guarantee, which is
 * verbatim and publishable — it ships in full on the 90-Day Stage Program page
 * and the homepage's final CTA, where it belongs, rather than being restated
 * mid-FAQ.
 */
export const guaranteeCrossReference = {
  label: 'Our Stage-Ready Guarantee',
  href: '/programs/90-day-stage-program',
} as const

/**
 * ⚠️ Questions a parent would ask that the estate answers **nowhere**.
 *
 * Not rendered as questions — a FAQ page listing unanswered questions helps no
 * one. Kept here because they are the highest-value content the owner could
 * supply, and because their absence is a finding, not an oversight.
 */
export const unansweredQuestions = [
  'How much do lessons cost?',
  'How long is a lesson?',
  'What is the tuition for the 90-Day Stage Program?',
  'How much is the camp down payment?',
  'What is the cancellation / make-up policy for lessons?',
  'Is there a registration fee, materials fee, or recital fee?',
  'Can PEP/UA scholarships be used for camp?',
  'Do you offer sibling or multi-lesson discounts?',
  'What is the teacher-to-student ratio in group classes?',
  'Who are the teachers and what are their qualifications?',
  'Where do I park and how do I get in?',
  'What is the term length / can I stop at any time?',
  'Is there a trial for group classes and camp, or only private lessons?',
] as const

export const faqPage = {
  eyebrow: 'Questions',
  /** ✍️ */
  heading: 'The things parents ask first.',
  /** ✍️ */
  lead: 'Answers below come from what South Dade Music publishes. Where something is not published — tuition in particular — this page says so rather than guessing.',
  siteLabel: 'About the academy',
  campLabel: 'Summer camp',
  instrumentLabel: 'About a specific instrument',
  /**
   * ✍️ The honest note that replaces a price list. The estate publishes no
   * tuition for any programme; only the $25 trial and the camp fees exist.
   */
  pricingNote:
    'Tuition is not published online for any programme. The trial is $25 and is credited to your tuition when you enrol; ask us for the figures on the programme you are considering and we will give them to you.',
} as const
