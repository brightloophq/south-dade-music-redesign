/**
 * Programmes content — the programmes hub.
 *
 * Source of truth: `docs/source-content/programs.json` (Phase 2 extraction,
 * 2026-08-05). Backlog: `docs/implementation/content-migration-coverage.md`.
 *
 *   ✅ VERBATIM  — extracted word for word, attributed
 *   ✍️ AUTHORED  — written for the rebuild from verified material
 *   ⚠️ GATED     — blocked pending an owner decision; absent from the page
 *
 * ## The hub links only to routes that exist
 *
 * Three of the six programmes have a built page. The other three are listed —
 * because they are genuinely offered and omitting them would misrepresent the
 * business — but they carry no link, and say plainly that their page is not
 * yet available. A link to a 404 is worse than no link.
 *
 * ## What no programme publishes
 *
 * Not one of the six publishes tuition. Lesson duration is never stated for any
 * lesson-based programme anywhere in the estate. The Stage-Ready Guarantee
 * appears on two pages and on **none** of the six programme pages. Scholarships
 * are mentioned on one of six. Those are gaps at source, not omissions here.
 */

/** A programme whose detail page exists, or is honestly marked as absent. */
export interface ProgramEntry {
  id: string
  name: string
  /** `null` when no page exists yet — the entry renders unlinked. */
  route: string | null
  summary: string
  /** Only facts the source actually states. Absent facts are simply absent. */
  facts: readonly string[]
  flagship?: boolean
  /** Shown in place of a link when `route` is null. */
  pendingNote?: string
}

/**
 * The six programmes, in the order the playbill runs them: the flagship first,
 * then the classes that feed it.
 */
export const programEntries: readonly ProgramEntry[] = [
  {
    id: 'ninety-day',
    name: '90-Day Stage Program',
    route: '/programs/90-day-stage-program',
    flagship: true,
    /** ✅ VERBATIM. */
    summary:
      'A step-by-step plan that helps students prepare for a live performance in about three months.',
    /** ✅ VERBATIM week structure and audience. ⚠️ No tuition — gate B-8. */
    facts: ['Twelve weeks', 'Kids and teens', 'Ends in a live showcase'],
  },
  {
    id: 'private-lessons',
    name: 'Private Lessons',
    route: '/private-lessons',
    /** ✅ VERBATIM. */
    summary:
      'One-on-one instruction for kids, teens and adults across seven instruments, with a stated progression path from trial to live performance.',
    /**
     * ✅ VERBATIM. ⚠️ "Weekly" is the instrument pages' figure and conflicts
     * with `/resources/` — see `frequencyConflict` in `lessons.ts`. It appears
     * here because `/private-lessons/` states it directly.
     */
    facts: ['One-on-one', 'Any age, any time', 'Seven instruments'],
  },
  {
    id: 'group-music-lessons',
    name: 'Group Music Lessons',
    route: '/group-music-lessons',
    /** ✅ VERBATIM. */
    summary:
      'Small-group instruction building fundamentals, ensemble skills and confidence, with a band-program pathway.',
    /** ✅ VERBATIM. ⚠️ Group size is never given a number anywhere. */
    facts: ['Small groups', 'Ages 6 and up', 'After-school and weekends'],
  },
  {
    id: 'band-builders',
    name: 'Band Builders',
    route: null,
    pendingNote: 'Detail page not yet available.',
    /** ✅ VERBATIM. */
    summary:
      'A group music program where kids come together to play as a team, learning ensemble skills and performing as a band.',
    /** ✅ VERBATIM — no numeric age range is published for this programme. */
    facts: ['Group', 'Kids and teens', 'Play in a band'],
  },
  {
    id: 'early-childhood',
    name: 'Early Childhood',
    route: null,
    pendingNote: 'Detail page not yet available.',
    /** ✅ VERBATIM. */
    summary:
      'Play-based group music classes for young children focused on rhythm, movement and sound recognition rather than instrument mastery.',
    /** ✅ VERBATIM. */
    facts: ['Group', 'Ages 3 to 6', 'Parents can join'],
  },
  {
    id: 'summer-camp',
    name: 'Summer Jam Music Camp',
    route: null,
    pendingNote: 'Detail page not yet available.',
    /** ✅ VERBATIM. */
    summary:
      'A three-week screen-free day camp culminating in an End-of-Camp Concert.',
    /**
     * ✅ VERBATIM. ⚠️ Both 2026 sessions have already passed and all four camp
     * routes still solicit reservations. Dates and price are deliberately not
     * shown here — they belong on `/camps` once the owner confirms 2027.
     */
    facts: ['Three weeks', 'Ages 7 to 15', '60 instructional hours'],
  },
]

export const programsHub = {
  eyebrow: 'Programs',
  /** ✍️ */
  heading: 'One flagship cycle, and the classes that feed it.',
  /**
   * ✍️ Names the honest state of the estate: the three products that form one
   * pathway have never referenced one another anywhere on the live site.
   */
  lead: 'Every programme here leads to the same place — a student on a stage. Private lessons build the skill, group programmes build the nerve, and the 90-Day Stage Program puts both in front of an audience.',
  flagshipLabel: 'The flagship',
  moreLabel: 'The classes that feed it',
  /**
   * ⚠️ Gate B-8. No programme publishes tuition, so the hub says so rather
   * than leaving a suspicious silence where a price would be.
   */
  pricingNote:
    'Tuition is not published online. Ask us when you book a trial and we will give you the figures for the programme you are considering.',
} as const

// ---------------------------------------------------------------------------
// Programme detail — Tier 3
// ---------------------------------------------------------------------------

/** ✅ VERBATIM from `/band-builders/`. */
export const bandBuilders = {
  id: 'band-builders',
  name: 'Band Builders',
  route: '/programs/band-builders',
  lead: 'Band Builders is a group music program where kids come together to play as a team.',
  /** ✅ VERBATIM. */
  students: [
    'Play music together in a group',
    'Learn how bands work',
    'Practice timing and coordination',
    'Build confidence while performing',
  ],
  /** ✅ VERBATIM. */
  audience: [
    'Students already taking private lessons',
    'Kids who want to play with others',
    'Beginners who are ready for group learning',
    'Students who enjoy teamwork and creativity',
  ],
  /** ✅ VERBATIM — the numbered path, in source order. */
  howItWorks: [
    'Start with a trial lesson',
    'Build basic skills in private lessons',
    'Join Band Builders',
    'Practice and perform with a group',
  ],
  /**
   * ✅ VERBATIM — note the conditional. The source says performance
   * opportunities "**may** include", which is weaker than the sitewide
   * "every student performs" claim. The conditional is preserved exactly.
   */
  performance: {
    qualifier: 'Performance opportunities may include:',
    items: ['Recitals', 'Community events', 'Small concerts'],
  },
  /** ⚠️ Gate B-8. No tuition. No numeric age range is published either. */
  tuition: null,
  ageRange: null,
} as const

/** ✅ VERBATIM from `/early-childhood/`. */
export const earlyChildhood = {
  id: 'early-childhood',
  name: 'Early Childhood',
  route: '/programs/early-childhood',
  /** ✅ VERBATIM. */
  lead: 'This program is for kids around ages 3 to 6. It is simple, playful, and designed to help them learn while they are having fun.',
  /** ✅ VERBATIM. */
  inClass: [
    'Singing easy songs',
    'Moving to music',
    'Clapping simple rhythms',
    'Playing small instruments',
    'Listening and copying sounds',
  ],
  /** ✅ VERBATIM. */
  activeNote: 'Classes are active. Kids are not sitting still for long.',
  /** ✅ VERBATIM. */
  social: [
    'Taking turns',
    'Listening to others',
    'Following simple instructions',
    'Being part of a group',
  ],
  /** ✅ VERBATIM. */
  firstInstruments: ['Small drums or percussion', 'Simple rhythm tools', 'Basic keyboard sounds'],
  /** ✅ VERBATIM — the expectation-setting line, which is the point of the page. */
  expectation:
    'We do not expect kids to master instruments at this age. That comes later. Right now, they just explore.',
  /** ✅ VERBATIM. */
  parents:
    'In some cases, parents can also be part of the class, especially for younger kids. This helps children feel even more comfortable.',
  /** ⚠️ Gate B-8. */
  tuition: null,
} as const
