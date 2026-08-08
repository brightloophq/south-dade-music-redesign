/**
 * Summer camp content.
 *
 * Source of truth: `docs/source-content/camps.json`, `faqs.json` set 2
 * (Phase 2 extraction, 2026-08-05).
 *
 *   ✅ VERBATIM  — extracted word for word, attributed
 *   ✍️ AUTHORED  — written for the rebuild from verified material
 *   ⚠️ GATED     — blocked pending an owner decision; absent from the page
 *
 * ## Four source routes, one product
 *
 * `/summer-jam-music-camp-2026/` (canonical offer) · `/summer-programs/`
 * (evergreen prose, no dates, no price) · `/summer-camp/` (empty) ·
 * `/summercamp/` (four pillar icons only).
 *
 * This one page replaces all four. The other three redirect here.
 *
 * ## ⚠️ THE SESSIONS HAVE ALREADY RUN
 *
 * Both 2026 sessions ended before the extraction was taken, and **all four
 * source routes still say "Secure your child's place before sessions fill
 * up."** That is the single most misleading thing on the live site: a parent
 * can read a live booking prompt for a camp that finished.
 *
 * So this page states what the camp **is** and what it **cost**, in the past
 * tense where the source is dated, and **does not solicit a reservation**.
 * Whether a 2027 camp exists is an owner question, and inventing one — or
 * repeating a dead call to action — would be worse than saying nothing.
 */

/** ✅ VERBATIM. The 2026 sessions, stated as the historical fact they now are. */
export const campSessions = [
  { id: 'session-1', label: 'Session 1', dates: 'June 8 – June 26, 2026', days: 'Monday to Friday' },
  { id: 'session-2', label: 'Session 2', dates: 'July 6 – July 24, 2026', days: 'Monday to Friday' },
] as const

export const camp = {
  eyebrow: 'Summer camp',
  /** ✅ VERBATIM programme name, without the year. */
  name: 'Summer Jam Music Camp',
  /** ✅ VERBATIM. */
  summary:
    'A three-week screen-free day camp culminating in an End-of-Camp Concert.',
  /** ✅ VERBATIM. */
  schedule: 'Monday to Friday, 4 hours per day, 3 weeks per session',
  /** ✅ VERBATIM. */
  ageRange: 'Students must be between ages 7 and 15',
  /** ✅ VERBATIM. */
  instruments: 'Piano, drums, vocals, ukulele and ensemble playing',

  /** ✅ VERBATIM blocks and their times. */
  blocks: [
    { id: 'a', label: 'Morning block', time: '8:00 AM – 12:00 PM', note: 'Default' },
    {
      id: 'b',
      label: 'Afternoon block',
      time: '12:30 PM – 4:30 PM',
      note: 'Opened only once the morning block is full',
    },
  ],

  /** ✅ VERBATIM. */
  capacity:
    '15 students per block. Max 30 students per session. Only 60 total seats for the entire summer.',

  /** ✅ VERBATIM. Both figures, as published for 2026. */
  price: {
    standard: '$450 per session (60 instructional hours)',
    payInFull: '$400 per child if paid upfront in full',
  },

  /** ✅ VERBATIM. */
  included: [
    '3 Weeks of Structured Music Instruction',
    'Beginner Friendly Training',
    'All Instruments Provided',
    'Daily Snacks Included',
    'Group Activities & Social Time',
    'End-of-Camp Concert',
    'Parent Invitation to Attend',
    'Safe, Supervised Environment',
  ],

  /** ✅ VERBATIM. */
  performance:
    'By the end of Summer Jam Music Camp, they step onto the stage for our End-of-Camp Concert. Parents are invited to attend.',

  /**
   * ✅ VERBATIM — and legally load-bearing, so it ships in full and unedited.
   *
   * ⚠️ The extraction recommends legal review of this wording, and the deposit
   * **amount is never stated anywhere**. A binding, non-refundable commitment
   * with an undisclosed figure is the most urgent commercial gap in the estate.
   */
  refundTerms:
    'The down payment required to hold your spot is strictly non-refundable. The remaining balance is due 14 days prior to the start date. All registrations are final and non-refundable due to limited enrollment and advance planning for instructors and materials. Each seat is reserved specifically for your child to maintain small group quality.',

  /** ✅ VERBATIM. */
  behaviouralPolicy:
    'Students must be between ages 7 and 15 and able to follow group directions. We reserve the right to decline camp enrollment for severe behavioral disruptions to protect the safe group environment of our community.',

  /**
   * ✍️ The honest state of the offer. Replaces four live "reserve your seat"
   * prompts for sessions that have finished.
   */
  status: {
    heading: 'The 2026 sessions have finished.',
    body: 'Both summer sessions ran and ended. Dates for the next camp have not been announced. If you would like to hear when they are, talk to us and we will let you know.',
  },

  /**
   * ⚠️ Gate I-8 — the camp pages give the address as Unit **1157** while the
   * contact page and the Google place record give Unit **117**. The camp page
   * is where a parent would drive for drop-off, which makes this the most
   * consequential instance of the conflict. **No address ships here**; the page
   * links to `/contact` instead, so the site cannot contradict itself.
   */
  address: null,

  /** ⚠️ Never stated anywhere. Required "today" and strictly non-refundable. */
  depositAmount: null,

  /** ⚠️ Never addressed. Can PEP/UA be applied to camp tuition? */
  scholarshipEligibility: null,
} as const

/** ✅ VERBATIM — the nine camp FAQs, complete. */
export const campFaqs = [
  {
    q: 'Is this camp beginner-friendly?',
    a: 'Yes. No prior music experience is required. The program is designed for beginners.',
  },
  {
    q: 'Are instruments provided?',
    a: 'Yes. All instruments used during camp are provided by the academy.',
  },
  {
    q: 'What should my child bring?',
    a: 'Comfortable clothing and a positive attitude. All music materials are handled by us.',
  },
  { q: 'Are snacks included?', a: 'Yes. Daily snacks are provided during camp hours.' },
  { q: 'Will parents be invited?', a: 'Yes. Parents are invited to attend the End-of-Camp Concert.' },
  {
    q: 'What if my child misses a day?',
    a: 'While regular attendance is encouraged, instructors will guide students to stay on track.',
  },
  {
    q: 'Can I choose the session timing?',
    a: 'To maintain our strict 15-student limit, all enrollments default to the Morning Block (8:00 AM – 12:00 PM). The Afternoon Block (12:30 PM – 4:30 PM) is only opened for enrollment once the morning session reaches full capacity.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'The down payment required to hold your spot is strictly non-refundable. The remaining balance is due 14 days prior to the start date. All registrations are final and non-refundable due to limited enrollment and advance planning for instructors and materials.',
  },
  {
    q: 'Are there behavioral requirements?',
    a: 'Yes. Students must be between ages 7 and 15 and able to follow group directions. We reserve the right to decline camp enrollment for severe behavioral disruptions to protect the safe group environment of our community.',
  },
] as const
