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
 * ⚠️ **Corrected in EE1.** All six programmes now have a destination and all
 * six link. `route` was `null` for Band Builders, Early Childhood and the camp
 * because their pages were Tier 3 and unbuilt when this module was written.
 * Tier 3 shipped them — `/programs/band-builders`, `/programs/early-childhood`
 * and `/camps` are live, are in `primaryNavigation` and `footerNavigation` as
 * `live`, and are in the sitemap — but this file was never updated.
 *
 * The result was the worst kind of migration failure: three of six programmes
 * rendered as **unlinked dead ends carrying "Detail page not yet available"**
 * on the homepage playbill and on `/programs`, while the pages they denied sat
 * one click away in the navigation. The content was migrated; a visitor could
 * not get to it. `route` stays typed as nullable so a genuinely unbuilt
 * programme can still be listed honestly.
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
    route: '/programs/band-builders',
    /** ✅ VERBATIM. */
    summary:
      'A group music program where kids come together to play as a team, learning ensemble skills and performing as a band.',
    /** ✅ VERBATIM — no numeric age range is published for this programme. */
    facts: ['Group', 'Kids and teens', 'Play in a band'],
  },
  {
    id: 'early-childhood',
    name: 'Early Childhood',
    route: '/programs/early-childhood',
    /** ✅ VERBATIM. */
    summary:
      'Play-based group music classes for young children focused on rhythm, movement and sound recognition rather than instrument mastery.',
    /** ✅ VERBATIM. */
    facts: ['Group', 'Ages 3 to 6', 'Parents can join'],
  },
  {
    id: 'summer-camp',
    name: 'Summer Jam Music Camp',
    /** `/camps` is the single evergreen parent; four source routes redirect to it. */
    route: '/camps',
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
   * ✍️ AUTHORED connective copy — EE1.
   *
   * The six programmes were an index. An index tells you what exists; it does
   * not tell you which one is yours. This is the ordering fact a parent is
   * actually trying to establish, and it is the one thing the source estate
   * never states anywhere: the three products form a single path, and no page
   * on the live site references any other.
   *
   * Every step is drawn from a verbatim source line — the private-lessons
   * learning path, the Band Builders "how it works" sequence, and the
   * flagship's week structure. **No new business claim is created here**: the
   * copy states an order, not a promise, and carries no frequency, price,
   * duration or performance guarantee.
   */
  pathwayLabel: 'How they fit together',
  pathway: [
    {
      id: 'skill',
      stage: 'The skill',
      body: 'Private lessons on one instrument. This is where a beginner starts, and where every other programme assumes the work has been done.',
      routes: [{ label: 'Private Lessons', href: '/private-lessons' }],
    },
    {
      id: 'others',
      stage: 'The others',
      body: 'Playing with other people is a separate skill from playing. Group lessons and Band Builders are where it is learned — timing, listening, holding your part while someone else holds theirs.',
      routes: [
        { label: 'Group Music Lessons', href: '/group-music-lessons' },
        { label: 'Band Builders', href: '/programs/band-builders' },
      ],
    },
    {
      id: 'stage',
      stage: 'The stage',
      body: 'The 90-Day Stage Program is the cycle that ends in front of an audience. The summer camp ends in a concert. Both are the same idea at different lengths.',
      routes: [
        { label: '90-Day Stage Program', href: '/programs/90-day-stage-program' },
        { label: 'Summer Jam Music Camp', href: '/camps' },
      ],
    },
  ] as const,

  /**
   * ✍️ For the youngest cohort the path above does not apply yet, and saying so
   * is more useful than implying it does. Built from the verbatim Early
   * Childhood expectation line.
   */
  earlyNote:
    'Early Childhood sits outside that order. For ages 3 to 6 it is play, rhythm and sound — “we do not expect kids to master instruments at this age.”',
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

  /** ✅ VERBATIM hero subtitle — **previously unmigrated** (recovered EE3.2). */
  subtitle: 'Experience the Thrill of Collaborative Performance',

  /**
   * ✅ VERBATIM — **previously unmigrated**, and the organizing idea of the
   * whole programme.
   *
   * It is the one sentence that says what Band Builders is *relative to* the
   * rest of the offer, which is the only way a parent can place it. Everything
   * else on the page describes activities; this says what it is for.
   */
  premiseSource: 'Band Builders is designed for kids and teens who want more than just private lessons.',

  /**
   * ⚠️ A contradiction inside the source page itself, recorded rather than
   * resolved.
   *
   * "Who is this program for?" lists **both** *"Students already taking private
   * lessons"* and *"Beginners who are ready for group learning"* — while the
   * numbered path on the same page makes step 2 *"Build basic skills in private
   * lessons"*, which a beginner by definition has not done.
   *
   * The page therefore cannot say whether private lessons are a prerequisite.
   * Both audiences ship exactly as listed and the ordering question is left
   * open, because picking a side would invent an enrolment rule.
   */
  prerequisiteConflict: {
    gate: 'owner confirmation',
    listedAudiences: ['Students already taking private lessons', 'Beginners who are ready for group learning'],
    pathRequires: 'Build basic skills in private lessons',
  },

  /**
   * ⚠️ NOT ASSERTED. `band-builders.md` observes that Band Builders appears to
   * be the "band application" half of the 90-Day Stage Program, per the
   * `/resources/` line *"two classes weekly: one for skill, one for band
   * application"*.
   *
   * That line is one half of the open frequency conflict — two pages against
   * seven — so the relationship rests on a disputed claim and is **not**
   * published as fact. The page links to the flagship as a destination, which
   * is a routing statement, not an assertion that one contains the other.
   */
  flagshipRelationship: null,

  /**
   * ✍️ AUTHORED — EE1. The page shipped its four verbatim outcomes as a flat
   * list of four equal rows, which is where the most distinctive material the
   * business owns went to die. Ensemble playing is the only thing on this site
   * that a private lesson genuinely cannot deliver, and the source states it
   * plainly in four lines that nobody was reading.
   *
   * This is a framing sentence for those four lines. It introduces no fact:
   * "timing and coordination", "how bands work", "confidence while performing"
   * and teamwork are all verbatim, and the claim made here is only that they
   * are the point of the programme.
   */
  premise:
    'Everything else here teaches a child to play. This is where they learn to play alongside someone else — a different skill, and the one an audience can actually hear.',

  /**
   * ✍️ AUTHORED connective — EE1. Where Band Builders sits relative to the
   * programmes either side of it. Ordering only; no promise, no frequency, no
   * price. Both destinations exist and are linked.
   */
  neighbours: [
    {
      id: 'before',
      label: 'Before this',
      body: 'Step two of the four above happens one-to-one. Most students arrive here already working on an instrument.',
      route: { label: 'Private Lessons', href: '/private-lessons' },
    },
    {
      id: 'after',
      label: 'Where it leads',
      body: 'Playing in a group is the rehearsal for playing in front of one. The flagship cycle ends in a live showcase.',
      route: { label: '90-Day Stage Program', href: '/programs/90-day-stage-program' },
    },
  ] as const,

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
