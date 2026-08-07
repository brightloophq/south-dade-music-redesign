/**
 * Lessons content — instruments, formats and the lessons hub.
 *
 * Source of truth: `docs/source-content/instruments.json` and `programs.json`
 * (Phase 2 extraction, 2026-08-05).
 * Backlog: `docs/implementation/content-migration-coverage.md`.
 *
 *   ✅ VERBATIM  — extracted word for word, attributed
 *   ✍️ AUTHORED  — written for the rebuild from verified material
 *   ⚠️ GATED     — blocked pending an owner decision; absent from the page
 *
 * The instrument records below were generated directly from the extraction, so
 * no verbatim string could drift in transcription.
 *
 * ## Routes
 *
 * Lesson routes keep their **original URLs** — `/piano-lessons`, not
 * `/lessons/piano`. The migration audit had proposed nested routes, which would
 * have required a redirect for every instrument page and forfeited the standing
 * of URLs that already exist. Keeping them means zero redirects for these nine
 * routes.
 */

export interface InstrumentFaq {
  q: string
  a: string
}

export interface Instrument {
  id: string
  name: string
  route: string
  sourceUrl: string
  /** Short form, for the hub table. */
  startsAround: string
  description: string
  recommendedAge: string
  lessonFormat: string
  lessonFrequency: string
  skillLevel: string
  equipmentNeeded: string
  benefits: readonly string[]
  curriculum: readonly string[]
  programConnections: readonly string[]
  faqs: readonly InstrumentFaq[]
}

/**
 * The seven instruments with their own source page.
 *
 * ⚠️ Keyboard is deliberately absent — see `keyboardGap` below.
 */
export const instrumentPages: readonly Instrument[] = [
  {
    id: "piano",
    name: "Piano",
    route: "/piano-lessons",
    sourceUrl: "https://southdademusic.com/piano-lessons/",
    startsAround: "about 5 or 6",
    /** ✅ VERBATIM */
    description: "Our piano program builds strong basics. Students learn hand position, rhythm, music reading, and song practice.",
    /** ✅ VERBATIM — the only age guidance published for this instrument. */
    recommendedAge: "around age 5 or 6, depending on attention span and readiness",
    /** ✅ VERBATIM. ⚠️ Conflicts with the group offer — see formatConflict. */
    lessonFormat: "Private, one-on-one",
    /** ✅ VERBATIM. ⚠️ Contradicted by /resources/ — see frequencyConflict. */
    lessonFrequency: "One lesson per week",
    /** ✅ VERBATIM */
    skillLevel: "Beginner-friendly; 'designed for first-time students'",
    /** ✅ VERBATIM */
    equipmentNeeded: "A keyboard is enough to start. Your instructor can recommend equipment as lessons progress.",
    /** ✅ VERBATIM */
    benefits: [
      "Improved focus and concentration",
      "Strong hand-eye coordination",
      "Better memory and listening skills",
      "Increased confidence and discipline",
      "Creative expression through music",
    ],
    /** ✅ VERBATIM */
    curriculum: [
      "Proper hand positioning and posture",
      "Reading basic music notation",
      "Rhythm, timing, and coordination",
      "Playing songs they enjoy",
      "Musical confidence and focus",
    ],
    /** ✅ VERBATIM — named on the source page. */
    programConnections: [],
    /** ✅ VERBATIM */
    faqs: [
      { q: "What age can kids start piano lessons?", a: "Most children can begin piano lessons around age 5 or 6, depending on attention span and readiness." },
      { q: "Are private piano lessons better for kids?", a: "Yes. Private lessons allow instructors to tailor lessons specifically to your child's pace and learning needs." },
      { q: "Does my child need a piano at home?", a: "A keyboard is enough to start. Your instructor can recommend equipment as lessons progress." },
      { q: "How often should kids take piano lessons?", a: "One lesson per week is ideal for steady progress and skill development." },
      { q: "Do you teach beginners?", a: "Absolutely. Our piano program is beginner-friendly and designed for first-time students." },
    ],
  },
  {
    id: "guitar",
    name: "Guitar",
    route: "/guitar-lessons",
    sourceUrl: "https://southdademusic.com/guitar-lessons/",
    startsAround: "about 6 or 7",
    /** ✅ VERBATIM */
    description: "If you are looking for a skilled Guitar Teacher Near Me, our guitar lessons cover chords, strumming patterns, and song playing. We teach both acoustic and electric guitar.",
    /** ✅ VERBATIM — the only age guidance published for this instrument. */
    recommendedAge: "around age 6 or 7, depending on hand size and focus",
    /** ✅ VERBATIM. ⚠️ Conflicts with the group offer — see formatConflict. */
    lessonFormat: "Private only - 'all guitar lessons at South Dade Music are private'",
    /** ✅ VERBATIM. ⚠️ Contradicted by /resources/ — see frequencyConflict. */
    lessonFrequency: "One private lesson per week",
    /** ✅ VERBATIM */
    skillLevel: "No experience required; beginner-focused",
    /** ✅ VERBATIM */
    equipmentNeeded: "Yes, having a guitar at home helps with practice. Your instructor can recommend the right size.",
    /** ✅ VERBATIM */
    benefits: [
      "Improved focus and discipline",
      "Better coordination and listening skills",
      "Increased confidence and creativity",
      "Stress relief and self-expression",
      "A lifelong appreciation for music",
    ],
    /** ✅ VERBATIM */
    curriculum: [
      "Proper guitar posture and hand positioning",
      "Basic chords and strumming patterns",
      "Simple melodies and songs",
      "Rhythm, timing, and coordination",
      "Music reading fundamentals",
    ],
    /** ✅ VERBATIM — named on the source page. */
    programConnections: [],
    /** ✅ VERBATIM */
    faqs: [
      { q: "What age can kids start guitar lessons?", a: "Most children can begin guitar lessons around age 6 or 7, depending on hand size and focus." },
      { q: "Do I need experience to start guitar lessons?", a: "No experience is required. Our guitar teachers specialize in beginner instruction." },
      { q: "Do I need my own guitar?", a: "Yes, having a guitar at home helps with practice. Your instructor can recommend the right size." },
      { q: "How often should guitar lessons be taken?", a: "One private lesson per week is ideal for steady progress." },
      { q: "Are lessons one-on-one?", a: "Yes, all guitar lessons at South Dade Music are private." },
    ],
  },
  {
    id: "drums",
    name: "Drums",
    route: "/drum-lessons",
    sourceUrl: "https://southdademusic.com/drum-lessons/",
    startsAround: "about 5 or 6",
    /** ✅ VERBATIM */
    description: "Our Private Drum Lessons help students understand rhythm, timing, and coordination. With one on one attention, students learn faster and gain confidence.",
    /** ✅ VERBATIM — the only age guidance published for this instrument. */
    recommendedAge: "around age 5 or 6, depending on coordination and focus level",
    /** ✅ VERBATIM. ⚠️ Conflicts with the group offer — see formatConflict. */
    lessonFormat: "Private, one-on-one - IN-PERSON AND ONLINE",
    /** ✅ VERBATIM. ⚠️ Contradicted by /resources/ — see frequencyConflict. */
    lessonFrequency: "One private lesson per week",
    /** ✅ VERBATIM */
    skillLevel: "No prior experience required",
    /** ✅ VERBATIM */
    equipmentNeeded: "A practice pad is enough to start. Instructors will guide you on equipment as lessons progress.",
    /** ✅ VERBATIM */
    benefits: [
      "Improved focus and concentration",
      "Better hand-eye coordination",
      "Increased confidence and self-expression",
      "Strong sense of rhythm and timing",
      "Healthy outlet for energy and creativity",
    ],
    /** ✅ VERBATIM */
    curriculum: [
      "Proper grip, posture, and drum technique",
      "Rhythm, timing, and coordination",
      "Reading basic drum notation",
      "Playing beats, fills, and simple songs",
      "Listening skills and musical discipline",
    ],
    /** ✅ VERBATIM — named on the source page. */
    programConnections: [],
    /** ✅ VERBATIM */
    faqs: [
      { q: "What age can kids start drum lessons?", a: "Most children can begin drum lessons around age 5 or 6, depending on coordination and focus level." },
      { q: "Are private drum lessons better for kids?", a: "Yes. Private lessons allow instructors to tailor lessons specifically to your child's pace and learning style." },
      { q: "Do you offer online drum lessons for kids?", a: "Yes, we provide live online drum lessons for kids with experienced instructors." },
      { q: "Does my child need their own drum set?", a: "A practice pad is enough to start. Instructors will guide you on equipment as lessons progress." },
      { q: "How often should my child take drum lessons?", a: "Most students benefit from one private lesson per week for steady improvement." },
    ],
  },
  {
    id: "bass",
    name: "Bass Guitar",
    route: "/bass-guitar-lessons",
    sourceUrl: "https://southdademusic.com/bass-guitar-lessons/",
    startsAround: "about 7 or 8",
    /** ✅ VERBATIM */
    description: "Bass guitar lessons are great for students who want to learn rhythm and groove. The bass plays an important role in music by supporting the beat and connecting different instruments together.",
    /** ✅ VERBATIM — the only age guidance published for this instrument. */
    recommendedAge: "around age 7 or 8, depending on hand size and readiness",
    /** ✅ VERBATIM. ⚠️ Conflicts with the group offer — see formatConflict. */
    lessonFormat: "Private, one-on-one mentorship",
    /** ✅ VERBATIM. ⚠️ Contradicted by /resources/ — see frequencyConflict. */
    lessonFrequency: "One session per week",
    /** ✅ VERBATIM */
    skillLevel: "No prior musical experience required",
    /** ✅ VERBATIM */
    equipmentNeeded: "A starter bass and small amp are enough to begin.",
    /** ✅ VERBATIM */
    benefits: [
      "Improved focus, discipline, and concentration",
      "Stronger rhythmic coordination and physical awareness",
      "Better collaborative listening and teamwork skills",
      "Increased confidence through public performance",
      "Creative expression and original music creation",
    ],
    /** ✅ VERBATIM */
    curriculum: [
      "Proper hand positioning and fingerstyle technique",
      "Reading music notation and understanding tabs",
      "Rhythm, timing, and 'locking in' with the drums",
      "Creating original basslines for modern band pathways",
      "Musical confidence and collaborative focus",
    ],
    /** ✅ VERBATIM — named on the source page. */
    programConnections: [
      "modern band pathways",
      "collaborative ensembles",
    ],
    /** ✅ VERBATIM */
    faqs: [
      { q: "What age can kids start bass?", a: "Most can begin around age 7 or 8, depending on hand size and readiness." },
      { q: "Are private lessons better?", a: "Yes, they allow mentors to tailor instruction to your specific musical path." },
      { q: "Do I need a bass at home?", a: "A starter bass and small amp are enough to begin." },
      { q: "How often are lessons?", a: "One session per week is ideal for steady growth." },
    ],
  },
  {
    id: "violin",
    name: "Violin",
    route: "/violin-lessons",
    sourceUrl: "https://southdademusic.com/violin-lessons/",
    startsAround: "about 5 or 6",
    /** ✅ VERBATIM */
    description: "Students looking for experienced Violin Teachers Near Me trust our supportive teaching style. We focus on posture, bow control, tone, and rhythm.",
    /** ✅ VERBATIM — the only age guidance published for this instrument. */
    recommendedAge: "around age 5 or 6, depending on readiness and focus",
    /** ✅ VERBATIM. ⚠️ Conflicts with the group offer — see formatConflict. */
    lessonFormat: "Private only - 'all violin lessons at South Dade Music are private'",
    /** ✅ VERBATIM. ⚠️ Contradicted by /resources/ — see frequencyConflict. */
    lessonFrequency: "One private lesson per week",
    /** ✅ VERBATIM */
    skillLevel: "No experience required; beginner instruction specialty",
    /** ✅ VERBATIM */
    equipmentNeeded: "Yes, a properly sized violin is recommended. Instructors can help with sizing guidance.",
    /** ✅ VERBATIM */
    benefits: [
      "Improved focus and discipline",
      "Better hand-eye coordination",
      "Strong listening skills",
      "Increased confidence and self-expression",
      "Appreciation for classical and modern music",
    ],
    /** ✅ VERBATIM */
    curriculum: [
      "Correct violin posture and bow hold",
      "Basic finger placement and tone production",
      "Reading music notation",
      "Rhythm, timing, and coordination",
      "Playing simple songs and exercises",
    ],
    /** ✅ VERBATIM — named on the source page. */
    programConnections: [],
    /** ✅ VERBATIM */
    faqs: [
      { q: "What age can kids start violin lessons?", a: "Most children can begin violin lessons around age 5 or 6, depending on readiness and focus." },
      { q: "Do students need experience to start?", a: "No experience is required. Our violin teachers specialize in beginner instruction." },
      { q: "Does my child need a violin at home?", a: "Yes, a properly sized violin is recommended. Instructors can help with sizing guidance." },
      { q: "How often should violin lessons be taken?", a: "One private lesson per week is ideal for steady progress." },
      { q: "Are violin lessons one-on-one?", a: "Yes, all violin lessons at South Dade Music are private." },
    ],
  },
  {
    id: "ukulele",
    name: "Ukulele",
    route: "/ukulele-lessons",
    sourceUrl: "https://southdademusic.com/ukulele-lessons/",
    startsAround: "about 5 or 6",
    /** ✅ VERBATIM */
    description: "Ukulele lessons are perfect for beginners who want a fun and simple way to start music. The instrument is easy to hold and quick to learn, making it great for younger students.",
    /** ✅ VERBATIM — the only age guidance published for this instrument. */
    recommendedAge: "around age 5 or 6, depending on readiness",
    /** ✅ VERBATIM. ⚠️ Conflicts with the group offer — see formatConflict. */
    lessonFormat: "Private, one-on-one mentorship",
    /** ✅ VERBATIM. ⚠️ Contradicted by /resources/ — see frequencyConflict. */
    lessonFrequency: "One session per week",
    /** ✅ VERBATIM */
    skillLevel: "No prior musical experience required",
    /** ✅ VERBATIM */
    equipmentNeeded: "Yes, having an instrument for practice is essential for progress.",
    /** ✅ VERBATIM */
    benefits: [
      "Improved focus, discipline, and concentration",
      "Stronger hand-eye coordination and physical awareness",
      "Better collaborative listening and teamwork skills",
      "Increased confidence through public performance",
      "Creative expression and original music creation",
    ],
    /** ✅ VERBATIM */
    curriculum: [
      "Proper hand positioning and strumming techniques",
      "Reading music notation and understanding chord charts",
      "Rhythm, timing, and melodic coordination",
      "Creating original music through modern pathways",
      "Musical confidence and collaborative focus",
    ],
    /** ✅ VERBATIM — named on the source page. */
    programConnections: [
      "Summer Jam Music Camp (ukulele is one of four camp instruments)",
      "collaborative ensembles",
    ],
    /** ✅ VERBATIM */
    faqs: [
      { q: "What age can kids start ukulele?", a: "Most can begin around age 5 or 6, depending on readiness." },
      { q: "Are private lessons better?", a: "Yes, they allow mentors to tailor instruction to your specific musical path." },
      { q: "Do I need a ukulele at home?", a: "Yes, having an instrument for practice is essential for progress." },
      { q: "How often are lessons?", a: "One session per week is ideal for steady growth." },
    ],
  },
  {
    id: "voice",
    name: "Voice",
    route: "/singing-lessons",
    sourceUrl: "https://southdademusic.com/singing-lessons/",
    startsAround: "about 5 or 6",
    /** ✅ VERBATIM */
    description: "The singing lessons for kids that South Dade Music provides for children are designed to be enjoyable, well-structured, and supportive, making them ideal for young students.",
    /** ✅ VERBATIM — the only age guidance published for this instrument. */
    recommendedAge: "around age 5 or 6, depending on focus and readiness",
    /** ✅ VERBATIM. ⚠️ Conflicts with the group offer — see formatConflict. */
    lessonFormat: "Private only - 'all singing lessons at South Dade Music are private'",
    /** ✅ VERBATIM. ⚠️ Contradicted by /resources/ — see frequencyConflict. */
    lessonFrequency: "One private lesson per week",
    /** ✅ VERBATIM */
    skillLevel: "No experience required; beginner-friendly",
    /** ✅ VERBATIM */
    equipmentNeeded: "None - 'Singing is a great starting point for many children because it doesn't require an instrument.'",
    /** ✅ VERBATIM */
    benefits: [
      "Increased confidence and self-expression",
      "Improved listening and memory skills",
      "Better posture and breathing",
      "Emotional expression through music",
      "Strong communication skills",
    ],
    /** ✅ VERBATIM */
    curriculum: [
      "Proper breathing techniques",
      "Pitch control and vocal accuracy",
      "Clear pronunciation and diction",
      "Rhythm and timing",
      "Confidence while singing",
    ],
    /** ✅ VERBATIM — named on the source page. */
    programConnections: [
      "Summer Jam Music Camp (vocals is one of four camp instruments)",
      "referenced heavily on /programs/ as 'Singing Lessons For Kids'",
    ],
    /** ✅ VERBATIM */
    faqs: [
      { q: "What age can kids start singing lessons?", a: "Most children can begin singing lessons around age 5 or 6, depending on focus and readiness." },
      { q: "Do kids need experience to start singing lessons?", a: "No experience is required. Our singing lessons are beginner-friendly." },
      { q: "Are singing lessons private?", a: "Yes, all singing lessons at South Dade Music are private." },
      { q: "How often should kids take singing lessons?", a: "One private lesson per week is ideal for steady vocal improvement." },
      { q: "Will singing lessons damage my child's voice?", a: "No. Our instructors teach proper vocal technique to protect and strengthen young voices." },
    ],
  },
] as const

/**
 * ⚠️ THE KEYBOARD GAP — do not fabricate a page for this.
 *
 * Keyboard is advertised in **three** places in the estate — the homepage
 * "Instruments We Teach" strip, the `/private-lessons/` instrument list, and
 * the `/group-music-lessons/` FAQ — and has no page, no description, no age
 * guidance, no curriculum and no destination link anywhere.
 *
 * The extraction's own open question is whether keyboard is a distinct
 * offering at all, or should fold into piano. Both readings are plausible: the
 * piano page's own equipment answer is "A keyboard is enough to start", which
 * suggests one instrument with two things to practise on — but it is sold as a
 * separate tile, so we cannot assume.
 *
 * The hub therefore lists it as offered, because that much is verified, and
 * says plainly that its page is not yet available. It links nowhere.
 * Inventing a page would be inventing a product.
 */
export const keyboardGap = {
  name: 'Keyboard',
  /** ✅ VERIFIED — the three places it is sold. */
  soldOn: [
    'Homepage “Instruments We Teach” strip',
    '/private-lessons/ instrument list',
    '/group-music-lessons/ FAQ',
  ],
  /** ✍️ Shown on the hub in place of a link. */
  status: 'Offered. Detail page not yet available.',
  /** ⚠️ Owner decision: distinct offering, or fold into piano? */
  ownerQuestion:
    'Is keyboard a distinct offering from piano, or should it be folded into the piano page?',
  route: null,
} as const

// ---------------------------------------------------------------------------
// Cross-cutting conflicts — recorded, never silently resolved
// ---------------------------------------------------------------------------

/**
 * ⚠️ FORMAT CONFLICT.
 *
 * Five instrument pages state that **all** lessons in that instrument are
 * private — guitar, violin and singing say so explicitly. Meanwhile
 * `/group-music-lessons/`, `/band-builders/`, `/programs/` and the lead-gen
 * subdomain all sell group instruction in the same instruments. These cannot
 * all be true.
 *
 * Each instrument page ships its own verbatim format line, because that is
 * what that page says. The lessons hub presents private and group as two
 * formats without claiming which instruments are available in which — the one
 * framing that stays true under either reading.
 */
export const formatConflict = {
  gate: 'owner confirmation',
  privateOnlyClaimedBy: ['Guitar', 'Violin', 'Voice'],
  groupSoldBy: ['/group-music-lessons/', '/band-builders/', '/programs/'],
} as const

/**
 * ⚠️ FREQUENCY CONFLICT.
 *
 * Every instrument page says **one lesson per week**. `/resources/` and the
 * homepage FAQ say **two classes weekly, one for skill and one for band
 * application**. Seven pages against two.
 *
 * Instrument pages ship their own verbatim line. Nothing on the hubs or the
 * homepage states a frequency at all.
 */
export const frequencyConflict = {
  gate: 'owner confirmation',
  instrumentPagesSay: 'One lesson per week',
  resourcesSays: 'Students attend two classes weekly: one for skill, one for band application.',
} as const

// ---------------------------------------------------------------------------
// Lesson formats
// ---------------------------------------------------------------------------

/** ✅ VERBATIM from `/private-lessons/`. */
export const privateLessons = {
  id: 'private-lessons',
  name: 'Private Lessons',
  route: '/private-lessons',
  summary:
    'One-on-one instruction for kids, teens and adults across seven instruments, with a stated progression path from trial to live performance.',
  targetAge: 'Kids, teens, and adults — anyone can start at any time.',
  lessonFormat: 'One-on-one',
  frequency: 'Weekly',
  /** ✅ VERBATIM — the four-step path, in order. */
  learningPath: [
    'Start with a trial lesson',
    'Continue with weekly private lessons',
    'Join group programs or bands',
    'Perform in live events',
  ],
  /** ✅ VERBATIM. */
  performance: [
    'Recitals and performances',
    'Community events',
    'Group music sessions',
    'Creative projects',
  ],
  /** ✅ VERBATIM. */
  flexibility: [
    'Flexible lesson times',
    'Easy trial lesson booking',
    'Quick support if you have questions',
    'Programs for beginners and advanced students',
  ],
  /**
   * ✅ VERBATIM — and the **only** programme page in the estate that mentions
   * scholarships at all.
   */
  scholarshipNote:
    'We also accept Step Up for Students scholarships (PEP and UA), which helps many families afford lessons.',
  /** ⚠️ Gate B-8. Never published. Lesson length is not stated anywhere either. */
  tuition: null,
  duration: null,
} as const

/** ✅ VERBATIM from `/group-music-lessons/` — an orphan page in the source. */
export const groupLessons = {
  id: 'group-music-lessons',
  name: 'Group Music Lessons',
  route: '/group-music-lessons',
  summary:
    'Small-group instruction building fundamentals, ensemble skills and confidence, with a band-program pathway.',
  targetAge: 'Ages 6 and up, depending on maturity and attention span.',
  lessonFormat: 'Group; small group sizes',
  frequency: 'Consistent weekly group sessions',
  availability: 'After-school and weekend availability',
  /** ✅ VERBATIM — no number is given anywhere in the estate. */
  groupSize: 'Group sizes are kept small to ensure quality instruction and engagement.',
  /** ✅ VERBATIM. */
  instrumentsOffered:
    'Programs may include guitar, drums, keyboard, vocals, and band-style instruments.',
  /** ✅ VERBATIM. */
  skillLevel:
    'Beginner-friendly options are available. Some programs may require basic experience.',
  /** ✅ VERBATIM. */
  curriculum: [
    'Basic music fundamentals',
    'Rhythm, timing, and listening skills',
    'Instrument coordination',
    'Ensemble playing techniques',
    'Confidence through group performance',
  ],
  /** ⚠️ Gate B-8. Never published. */
  tuition: null,
  duration: null,
} as const

// ---------------------------------------------------------------------------
// The lessons hub
// ---------------------------------------------------------------------------

export const lessonsHub = {
  eyebrow: 'Music lessons',
  /** ✍️ */
  heading: 'Seven instruments, two ways to learn.',
  /**
   * ✍️ built from ✅ verified fragments — "A keyboard is enough to start" is
   * quoted from the piano FAQ, and the starting-age range is the sitewide one.
   */
  lead: 'Private one-on-one instruction, or small-group sessions that build toward playing in a band. Most children start between five and eight, and a keyboard is enough to start.',
  formatsLabel: 'Private or group',
  instrumentsLabel: 'Choose an instrument',
  nextLabel: 'What happens next',
  /**
   * ✍️ from the ✅ verbatim `/private-lessons/` learning path.
   *
   * This is the answer to "what happens next" — a question no single source
   * page ever answers for a parent in one place.
   */
  next: [
    'Book a trial and hold a place for $25.',
    'Continue with weekly lessons on your instrument.',
    'Join a group programme or a band when you are ready.',
    'Perform in a live event.',
  ],
} as const
