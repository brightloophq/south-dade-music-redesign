/**
 * Experience coverage — **DEVELOPMENT ONLY**.
 *
 * The companion to the migration audit, and the thing it cannot tell you.
 *
 * ## Two different questions
 *
 * `content-migration-coverage.md` answers **"did we account for the
 * information?"** It is a completeness ledger, and by its own reckoning the
 * rebuild sits at ~95%. That number is real and it is also not what a family
 * experiences.
 *
 * This module answers **"does a real visitor actually meet this, and get any
 * use out of it?"** The two answers came apart badly. Band Builders was
 * `FULL` — page built, every verbatim line shipped, in the navigation — and a
 * visitor arriving at the programmes index was told *"Detail page not yet
 * available"* and given nothing to click. Migration-complete. Experientially
 * absent.
 *
 * ## The five states
 *
 * | State | Meaning |
 * |---|---|
 * | `PROMINENT` | A visitor on a normal path meets it, and it is doing work |
 * | `BURIED` | It renders, but only if you already knew to go looking |
 * | `WEAK` | It is right there and lands as nothing — flattened, unexplained, or one line in a list of equals |
 * | `WITHHELD` | Deliberately not shown; a gate or an unverified fact blocks it |
 * | `OMITTED` | Deliberately never shipping — the decision is made, not pending |
 *
 * `WITHHELD` and `OMITTED` are **not failures**. A withheld tuition figure is
 * the correct handling of gate B-8. They are separated from the other three so
 * the honest scoreboard is not diluted by items that are behaving correctly.
 *
 * ## Both columns are recorded
 *
 * `before` is the state on 2026-08-09 at the start of EE1; `after` is the state
 * now. Recording only the improved number would be marking my own homework, and
 * a baseline that gets overwritten every time it improves is not a baseline.
 *
 * ## ⚠️ These are judgements, not measurements
 *
 * Nothing here is computed. Each row is an assessment, and assessments made by
 * the person who did the work are the least trustworthy kind. They are written
 * down precisely so someone else can disagree with a specific row rather than
 * with a percentage. Where a call is arguable, `note` says so.
 */

export type ExperienceStatus = 'PROMINENT' | 'BURIED' | 'WEAK' | 'WITHHELD' | 'OMITTED'

// ---------------------------------------------------------------------------
// EE2 — how a route actually delivers, per route
// ---------------------------------------------------------------------------

/**
 * The delivery dimension, added in EE2.
 *
 * Item-level experience status answers *"does a visitor meet this?"*. It still
 * could not distinguish between two very different failures that EE1 left
 * behind:
 *
 *   · content a visitor meets in the first screen, versus content that is
 *     genuinely present but nine screens down — EE1 put eight homepage
 *     enrichments below 9,102px and reported them all as "prominent", which was
 *     true and useless;
 *   · content carried by type alone, versus content the page can actually
 *     *show* — the site served **zero images** on every route, and nothing in
 *     the tool said so.
 *
 * These six values make both visible.
 */
export type DeliveryMode =
  | 'VISIBLE_EARLY'
  | 'VISIBLE_LATE'
  | 'VISUALLY_SUPPORTED'
  | 'TEXT_ONLY'
  | 'GATED_MEDIA'
  | 'INTENTIONALLY_WITHHELD'

export const DELIVERY_LABELS: Record<DeliveryMode, string> = {
  VISIBLE_EARLY: 'Visible early',
  VISIBLE_LATE: 'Visible late',
  VISUALLY_SUPPORTED: 'Visually supported',
  TEXT_ONLY: 'Text only',
  GATED_MEDIA: 'Gated media',
  INTENTIONALLY_WITHHELD: 'Intentionally withheld',
}

export interface RouteDelivery {
  route: string
  /** What the migration audit records for this route's content. */
  migration: string
  /** Where the business signal first lands, in px from the top. */
  firstSignalPx: number | null
  /** Rendered height, px, at 1440×900. */
  heightPx: number
  /** Rendered words in `<main>`. */
  words: number
  /** Approved atmosphere actually requested by the browser on this route. */
  imagesLoaded: number
  modes: readonly DeliveryMode[]
  note: string
}

/**
 * Measured on 2026-08-09 against the EE2 tree at 1440×900, in a real browser.
 * `firstSignalPx` is the y-offset of the first element that tells a visitor
 * what this business is or does — not the first element that renders.
 */
export const ROUTE_DELIVERY: readonly RouteDelivery[] = [
  {
    route: '/',
    migration: 'FULL for everything publishable',
    firstSignalPx: 503,
    heightPx: 14120,
    words: 749,
    imagesLoaded: 3,
    modes: ['VISIBLE_EARLY', 'VISUALLY_SUPPORTED', 'GATED_MEDIA'],
    note: 'EE2 moved the first identity signal from 9,102px to 503px — the programme name and "a music academy in Florida City" now sit in the opening frame. The desk moved from 8,910px to 6,624px. Three atmospheric plates carry the walk, the wings and the desk surface. Still gated: every photograph of a student (I-1).',
  },
  {
    route: '/programs',
    migration: 'FULL — all six programmes',
    firstSignalPx: 214,
    heightPx: 4764,
    words: 448,
    imagesLoaded: 1,
    modes: ['VISIBLE_EARLY', 'VISUALLY_SUPPORTED'],
    note: 'The strongest interior route. Flagship dominates by type size alone, the pathway states the order between programmes, and the protected line lands as a pull quote. Only the paper surface is visual; the programmes themselves have no imagery and cannot until I-1 closes.',
  },
  {
    route: '/lessons',
    migration: 'FULL — 7 instruments, 2 formats',
    firstSignalPx: 214,
    heightPx: 4927,
    words: 474,
    imagesLoaded: 1,
    modes: ['VISIBLE_EARLY', 'TEXT_ONLY'],
    note: 'Densest route on the site at ~96 words per 1000px. The comparison answers "which one is mine" without a page load. Entirely typographic — an instrument is the one subject where a photograph would genuinely help and none is clearable.',
  },
  {
    route: '/programs/90-day-stage-program',
    migration: 'FULL, less B-4 and B-8 — plus 3 verbatim blocks recovered in EE3.1',
    firstSignalPx: 231,
    heightPx: 6245,
    words: 478,
    imagesLoaded: 2,
    modes: ['VISIBLE_EARLY', 'VISUALLY_SUPPORTED', 'GATED_MEDIA'],
    note:
      'RECONSTRUCTED IN EE3.1. Was 7,303px / 446w / 61 per 1000px across 9 movements, four of them consecutive bullet lists a parent had to assemble mentally. Now 6,245px / 478w / 77 per 1000px across 7 movements, composed as: the offer → why the stage → the ninety days → what changes → the end → who it is for. THREE verbatim blocks that had never been migrated were recovered: the page’s own hero subtitle ("From the Practice Room to the Spotlight in Three Months"), the passage explaining why performance is in the programme, and the finale ("students get the chance to perform. This is the highlight of the program"). ONE in-page CTA, at 5,131px of 6,245px — the header carries the persistent one. Still gated: tuition (B-8), the unconditional performance promise (B-4), and every photograph of a student (I-1). The unsourced research sentence is withheld pending a citation.',
  },
  {
    route: '/programs/band-builders',
    migration: 'FULL — plus 2 verbatim blocks recovered in EE3.2',
    firstSignalPx: 231,
    heightPx: 4042,
    words: 288,
    imagesLoaded: 4,
    modes: ['VISIBLE_EARLY', 'VISUALLY_SUPPORTED', 'GATED_MEDIA'],
    note:
      'RECONSTRUCTED IN EE3.2. Was 5,284px / 53 per 1000px with FOUR consecutive list-only sections — the same defect EE3.1 removed from the flagship. Now 4,042px / 71 per 1000px across 5 movements, organised as alone → together rather than as a second flagship journey. Recovered verbatim: the hero subtitle ("Experience the Thrill of Collaborative Performance") and the organizing idea ("designed for kids and teens who want more than just private lessons"). The three approved object studies sit as separate instruments under ONE continuous rule — the composition is the argument. ⚠️ The source contradicts itself on whether private lessons are a prerequisite; both audiences ship and the page says the question is unsettled rather than answering it. The suggestion that Band Builders is the "band application" half of the flagship rests on the disputed "two classes weekly" line and is NOT asserted.',
  },
  {
    route: '/private-lessons',
    migration: 'PARTIAL → FULL — 4 verbatim blocks recovered in EE3.2',
    firstSignalPx: 231,
    heightPx: 3916,
    words: 246,
    imagesLoaded: 1,
    modes: ['VISIBLE_EARLY', 'TEXT_ONLY'],
    note:
      'RECONSTRUCTED IN EE3.2, and the EE3 diagnosis was half wrong. It said "renders every field it has, so composition not content" — true of the module, false of the source. FOUR verbatim blocks had never reached the module, including the page’s entire reason to exist: "Lessons are one-on-one, so students get full attention", which the rebuild had compressed to the two words "One-on-one" in a data row. Was 4,722px / 44 per 1000px; now 3,916px / 63 per 1000px across 6 movements, composed as a decision rather than a specification. Keyboard is named because this page names it, and is the one instrument that does not link — stated inline. Still the only programme page in the estate that mentions scholarships.',
  },
  {
    route: '/performances',
    migration: 'PARTIAL — the fallback is live',
    firstSignalPx: 214,
    heightPx: 3969,
    words: 329,
    imagesLoaded: 1,
    modes: ['VISIBLE_EARLY', 'TEXT_ONLY', 'GATED_MEDIA', 'INTENTIONALLY_WITHHELD'],
    note: 'The page most damaged by gates. Upcoming is an honest empty state (I-4, no dated event exists); the six showcase photographs are blocked (I-1); the March 2025 event record is withheld because its date survives only as unverified index metadata. Testimony is carrying a job photography should carry.',
  },
  {
    route: '/about',
    migration: '~85%',
    firstSignalPx: 214,
    heightPx: 5029,
    words: 307,
    imagesLoaded: 1,
    modes: ['VISIBLE_EARLY', 'TEXT_ONLY', 'INTENTIONALLY_WITHHELD'],
    note: 'The mission sentence is withheld pending an owner rewrite — it is verbatim but keyword-stuffed, and this is the page a parent reads to decide whether to trust the business. No teacher is named or shown (B-7); the only instructor names on this entire site are inside customer reviews.',
  },
  {
    route: '/contact',
    migration: 'FULL',
    firstSignalPx: 214,
    heightPx: 2482,
    words: 110,
    imagesLoaded: 1,
    modes: ['VISIBLE_EARLY', 'TEXT_ONLY', 'INTENTIONALLY_WITHHELD'],
    note: 'Thinnest route on the site, 110 words. No map, no directions, no parking or entrance guidance — none exists in the estate, and the unit number is disputed three ways (I-8), so inventing directions would risk sending a parent to the wrong door.',
  },
]

// ---------------------------------------------------------------------------
// EE3 — source-asset decisions
// ---------------------------------------------------------------------------

export type AssetVerdict = 'APPROVED' | 'OWNER_APPROVAL_REQUIRED' | 'REJECTED'

export const ASSET_VERDICT_LABELS: Record<AssetVerdict, string> = {
  APPROVED: 'Approved',
  OWNER_APPROVAL_REQUIRED: 'Owner approval required',
  REJECTED: 'Rejected',
}

export interface AssetDecision {
  /** Filename or asset-class name. */
  id: string
  /** Count, where this row covers a class rather than one file. */
  count: number
  /** Public path for a thumbnail, when the file is actually in this repo. */
  thumbnail: string | null
  source: string
  depicts: string
  people: 'yes' | 'no' | 'unknown'
  minors: 'yes' | 'no' | 'unknown'
  provenance: string
  /** What the earlier automated pass called it. */
  previous: string
  verdict: AssetVerdict
  reason: string
  destination: string
  published: boolean
}

/**
 * ## ⚠️ The finding that governs every row below
 *
 * **Not one legacy South Dade Music image exists in this repository.** The only
 * image files present are the generated plates. So "re-open and visually
 * inspect the extracted images" is not executable for legacy assets: there is
 * nothing local to open, and obtaining them would mean downloading 77 files
 * from the live site — creating a second uncleared copy of material gated under
 * I-1 and I-7, which is the exact mistake Phase 4D made.
 *
 * What *can* be audited is the evidence, and the evidence turns out to be
 * unreliable in a specific, provable way:
 *
 * > `assets-inventory.json` records four files as `assetType: "icon"` —
 * > the `m1000x1000*.png` camp pillars. Phase 4D downloaded exactly those files
 * > **and they were photographs of identifiable people, two including
 * > children.** They were deleted on 2026-08-09.
 *
 * That is not a near-miss, it is a measurement of how much the `assetType`
 * field is worth: **an asset labelled `icon` in this inventory has already been
 * empirically shown to be a photograph of a child.** No asset can therefore be
 * reclassified *upward* on the strength of its recorded type, and the seven
 * `instruments-we-teach-*.png` "tiles" carry exactly the same label and exactly
 * the same amount of evidence — which is none.
 *
 * This is neither weakening a legitimate gate nor blindly preserving an
 * automated one. It is the audit the brief asked for, and its result is that
 * the evidence does not support promotion.
 */
export const EE3_ASSET_DECISIONS: readonly AssetDecision[] = [
  {
    id: 'instrument-keys.jpg',
    count: 1,
    thumbnail: '/images/generated/instrument-keys.jpg',
    source: 'Generated in EE3 under the object-study brief',
    depicts: 'Piano key edges under a raking warm light. Objects only.',
    people: 'no',
    minors: 'no',
    provenance: 'ai-generated · prompt, model and negative constraints recorded in metadata',
    previous: 'did not exist',
    verdict: 'APPROVED',
    reason:
      'Opened and viewed at full size before any page referenced it. On-palette, no people, no room, nothing identifiable as a real place. It gives the Keys family an actual subject on a route that was entirely typographic.',
    destination: '/lessons — Keys family',
    published: true,
  },
  {
    id: 'instrument-strings.jpg',
    count: 1,
    thumbnail: '/images/generated/instrument-strings.jpg',
    source: 'Generated in EE3 under the object-study brief',
    depicts: 'Steel strings crossing a bridge and saddle. Objects only.',
    people: 'no',
    minors: 'no',
    provenance: 'ai-generated · recorded in metadata',
    previous: 'did not exist',
    verdict: 'APPROVED',
    reason: 'Opened and viewed. Same standard as the Keys plate. Serves the four string instruments.',
    destination: '/lessons — Strings family',
    published: true,
  },
  {
    id: 'instrument-percussion.jpg',
    count: 1,
    thumbnail: '/images/generated/instrument-percussion.jpg',
    source: 'Generated in EE3 under the object-study brief',
    depicts: 'A drum head, rim and tension rods. Objects only.',
    people: 'no',
    minors: 'no',
    provenance: 'ai-generated · recorded in metadata',
    previous: 'did not exist',
    verdict: 'APPROVED',
    reason: 'Opened and viewed. Same standard.',
    destination: '/lessons — Percussion family',
    published: true,
  },
  {
    id: 'stage-empty-chair.jpg',
    count: 1,
    thumbnail: '/images/generated/stage-empty-chair.jpg',
    source: 'Generated in EE3 under the object-study brief',
    depicts: 'One plain chair on bare boards under a single beam, haze behind. No person, no audience, no identifiable venue.',
    people: 'no',
    minors: 'no',
    provenance: 'ai-generated · recorded in metadata',
    previous: 'did not exist',
    verdict: 'APPROVED',
    reason:
      'Drawn from the direction’s own shot list — “An empty chair on a stage, lit”. It is the honest image for a page whose entire subject is gated: the stage exists and it is waiting. It asserts nothing about this academy.',
    destination: '/performances',
    published: true,
  },
  {
    id: 'atmos-stage-floor · atmos-curtain-shadow · atmos-paper-tooth',
    count: 3,
    thumbnail: '/images/generated/atmos-stage-floor.jpg',
    source: 'Generated in Phase 3.5, approved in EE2',
    depicts: 'Stage boards, curtain cloth in a beam, uncoated paper. Objects and surfaces only.',
    people: 'no',
    minors: 'no',
    provenance: 'ai-generated · recorded in metadata',
    previous: 'pending-review since 2026-08-06',
    verdict: 'APPROVED',
    reason: 'Opened and reviewed in EE1 and again in EE2. Carrying the Walk, the Turn and the desk surface.',
    destination: 'Homepage + every interior PageIntro',
    published: true,
  },
  {
    id: 'atmos-spotlight-cone · atmos-warm-bloom · atmos-depth-folds · homepage-hero-stage-light ×2',
    count: 5,
    thumbnail: '/images/generated/atmos-warm-bloom.jpg',
    source: 'Generated in Phase 3.5',
    depicts: 'Beams, bloom and haze studies.',
    people: 'no',
    minors: 'no',
    provenance: 'ai-generated',
    previous: 'pending-review',
    verdict: 'REJECTED',
    reason:
      'Safe but wrong. The cone and folds fight the film’s single-light physics; the bloom is a picture of a light where the beat is a luminance change; the hero pair has no slot because Act I opens on true black by design. Off-palette magenta in three of them.',
    destination: 'none',
    published: false,
  },
  {
    id: '18 genuine performance photographs',
    count: 18,
    thumbnail: null,
    source: 'Legacy WordPress uploads · /performances/, /, /about/',
    depicts: 'Students performing. Not viewable — no copy exists in this repository.',
    people: 'yes',
    minors: 'yes',
    provenance: 'Business-owned capture; photographer copyright unconfirmed',
    previous: 'BLOCKED — I-1 / I-7',
    verdict: 'OWNER_APPROVAL_REQUIRED',
    reason:
      'The single highest-value media the business owns and the answer to almost every "text only" route. Blocked on photo-release consent, not on quality. Deliberately NOT downloaded: a second uncleared copy of an unpublishable image is still an uncleared copy.',
    destination: '/performances, /programs/90-day-stage-program, /programs/band-builders, /about',
    published: false,
  },
  {
    id: 'instruments-we-teach-1…7.png',
    count: 7,
    thumbnail: null,
    source: 'Homepage “Instruments We Teach” strip',
    depicts: 'UNKNOWN. Recorded as instrument tiles; nobody has opened them.',
    people: 'unknown',
    minors: 'unknown',
    provenance: 'ownershipNeedsConfirmation: true',
    previous: 'icon / decorative — PENDING',
    verdict: 'OWNER_APPROVAL_REQUIRED',
    reason:
      'Would be genuinely useful on /lessons. NOT promoted, because this inventory’s `assetType` field has been empirically disproved: four files it labels `icon` were downloaded in Phase 4D and proved to be photographs of identifiable people, two including children. These seven carry the same label and the same absence of evidence. They must be opened by the owner, not assumed.',
    destination: '/lessons — instrument families, if they prove to be graphics',
    published: false,
  },
  {
    id: 'm1000x1000.png ×4 (camp pillars)',
    count: 4,
    thumbnail: null,
    source: '/summercamp/',
    depicts: 'Photographs of identifiable people — confirmed by direct inspection in Phase 4D.',
    people: 'yes',
    minors: 'yes',
    provenance: 'Legacy uploads; ownership unconfirmed',
    previous: 'icon / decorative (WRONG — corrected 2026-08-09)',
    verdict: 'REJECTED',
    reason:
      'These are the files that proved the inventory wrong. Retrieved on filename evidence, described as pillar icons, opened, found to be photographs of people including children, and deleted the same day. Not a candidate under any circumstances.',
    destination: 'none',
    published: false,
  },
  {
    id: 'logo-1.png',
    count: 2,
    thumbnail: null,
    source: 'Sitewide header, footer and og:image',
    depicts: 'The South Dade Music wordmark. Not viewable locally.',
    people: 'no',
    minors: 'no',
    provenance: 'ownershipNeedsConfirmation: false — the strongest first-party evidence of any legacy asset',
    previous: 'REPLACE — gate D-1',
    verdict: 'OWNER_APPROVAL_REQUIRED',
    reason:
      'The evidence genuinely does support first-party ownership, and this is the one legacy asset an evidence audit could reasonably promote. It is still not published: it is raster only, it doubles as the og:image on every page, gate D-1 (logo review) is open and gate B-5 means four brand names are in use. What is needed is a vector and a name decision, not a download.',
    destination: 'Header wordmark, og:image',
    published: false,
  },
  {
    id: 'step-up-for-students-1.png / -2.png',
    count: 2,
    thumbnail: null,
    source: 'Homepage, hard-coded in the theme',
    depicts: 'Third-party Step Up for Students trademark.',
    people: 'no',
    minors: 'no',
    provenance: 'Third-party trademark; no licence on file',
    previous: 'BLOCKED — I-6',
    verdict: 'REJECTED',
    reason: 'Someone else’s trademark with no confirmed licence. The gate is correct and the evidence supports it.',
    destination: 'none',
    published: false,
  },
  {
    id: 'Stock / template imagery',
    count: 26,
    thumbnail: null,
    source: 'Legacy uploads across the estate',
    depicts: 'Unknown. Recorded as stock or template of unverifiable origin.',
    people: 'unknown',
    minors: 'unknown',
    provenance: 'Licensing not established',
    previous: 'REJECTED',
    verdict: 'REJECTED',
    reason:
      'Licensing cannot be established from anything in the repository, and the estate mixes business uploads with stock of unknown origin in one folder. Presence in that folder establishes nothing.',
    destination: 'none',
    published: false,
  },
  {
    id: 'Duplicate uploads',
    count: 14,
    thumbnail: null,
    source: 'Legacy uploads',
    depicts: 'Re-uploads of assets already listed.',
    people: 'unknown',
    minors: 'unknown',
    provenance: 'n/a',
    previous: 'REJECTED — duplicate',
    verdict: 'REJECTED',
    reason: 'Nothing unique to preserve. Note the estate reuses filenames across folders, so any future recovery must key on full URL.',
    destination: 'none',
    published: false,
  },
]

export const EXPERIENCE_LABELS: Record<ExperienceStatus, string> = {
  PROMINENT: 'Present and prominent',
  BURIED: 'Present but buried',
  WEAK: 'Present but weakly expressed',
  WITHHELD: 'Withheld',
  OMITTED: 'Omitted intentionally',
}

/** Migration status, as the coverage audit records it. */
export type MigrationStatus = 'FULL' | 'PARTIAL' | 'BLOCKED' | 'OMITTED' | 'NONE'

export interface ExperienceItem {
  id: string
  /** The content in question, as a visitor would think of it. */
  item: string
  category: string
  /** What the migration audit says. */
  migration: MigrationStatus
  /** State at the start of EE1, 2026-08-09. */
  before: ExperienceStatus
  /** State now. */
  after: ExperienceStatus
  /** Where a visitor actually meets it. Empty when nowhere. */
  routes: readonly string[]
  /** What a visitor concretely sees — the evidence for the `after` call. */
  evidence: string
  /** Why the call is what it is, including where it is arguable. */
  note: string
  /** Open decision gate, where one governs. */
  gate?: string
}

export const EXPERIENCE_ITEMS: readonly ExperienceItem[] = [
  // -------------------------------------------------------------------------
  // Identity — who this business is
  // -------------------------------------------------------------------------
  {
    id: 'identity',
    item: 'That South Dade Music is a music academy, and where it is',
    category: 'Identity',
    migration: 'FULL',
    before: 'BURIED',
    after: 'PROMINENT',
    routes: ['/'],
    evidence:
      'The House movement states the category and the city in a heading at the join between the film and the desk, with the service area and age range as a hairline pair beneath it.',
    note: 'Before EE1 the only wordmark above the footer was the vertical hero lockup, which is aria-hidden — so for a screen-reader user the first statement of who this is was the copyright line. The film opening on black with no logo is correct and deliberate; never paying it off was not.',
  },
  {
    id: 'tagline',
    item: '“Build Community. Make Music.”',
    category: 'Identity',
    migration: 'FULL',
    before: 'BURIED',
    after: 'PROMINENT',
    routes: ['/'],
    evidence: 'Set in Newsreader italic at display size in The House movement.',
    note: 'Verbatim on five source pages. It was in the footer only — the least-read element on the site — for a line that is the business’s own summary of itself.',
  },
  {
    id: 'service-area',
    item: 'Service area — Florida City, Homestead, Cutler Bay, Palmetto Bay',
    category: 'Identity',
    migration: 'FULL',
    before: 'WEAK',
    after: 'PROMINENT',
    routes: ['/', '/about', '/contact', '/programs/90-day-stage-program'],
    evidence: 'A labelled “Where” row on the homepage, plus the verbatim sentence on three interior pages.',
    note: 'Identical sentence on five source pages, and it never reached the homepage. This is the sentence that tells a Homestead parent the drive is fifteen minutes.',
  },
  {
    id: 'brand-name',
    item: 'A single settled business name',
    category: 'Identity',
    migration: 'PARTIAL',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: [],
    evidence: 'The safe short name is used sitewide; the ™, the legal entity and the “Academy” variant appear nowhere.',
    note: 'Four names run concurrently in the estate. Nothing EE1 can fix — this is an owner decision, and it blocks the logo, structured data and the og:image.',
    gate: 'B-5',
  },

  // -------------------------------------------------------------------------
  // Programmes
  // -------------------------------------------------------------------------
  {
    id: 'ninety-day',
    item: 'The 90-Day Stage Program as the flagship',
    category: 'Programmes',
    migration: 'FULL',
    before: 'PROMINENT',
    after: 'PROMINENT',
    routes: ['/', '/programs', '/programs/90-day-stage-program'],
    evidence:
      'The whole film is about it; it is the playbill’s first and largest entry, the first primary nav item, and has a complete detail page.',
    note: 'The strongest item on the site before EE1 and still is. EE1 added contextual proof beside the week grid and a statement of where the actual playing is taught, which the page never said.',
  },
  {
    id: 'band-builders',
    item: 'Band Builders',
    category: 'Programmes',
    migration: 'FULL',
    before: 'BURIED',
    after: 'PROMINENT',
    routes: ['/', '/programs', '/programs/band-builders', '/group-music-lessons'],
    evidence:
      'Linked from the homepage playbill with its summary, from the /programs pathway and index, and from group lessons. Its page leads with the premise and ends with its neighbours.',
    note: 'THE headline failure EE1 found. The page had been built and shipped in Tier 3, and both hubs still rendered it unlinked with “Detail page not yet available” because programEntries kept route: null. Migration said FULL. A visitor could not reach it from either hub.',
  },
  {
    id: 'ensemble-material',
    item: 'Ensemble playing — timing, coordination, teamwork, confidence',
    category: 'Programmes',
    migration: 'FULL',
    before: 'WEAK',
    after: 'PROMINENT',
    routes: ['/programs/band-builders', '/programs', '/group-music-lessons'],
    evidence:
      'The Band Builders premise names it as the thing a private lesson cannot deliver, above the four verbatim outcomes; the /programs pathway makes “the others” a stage of its own.',
    note: 'The four verbatim lines were always on the page — as four equal rows in a flat list, under a label that did not say what they were for. Present, and landing as nothing.',
  },
  {
    id: 'early-childhood',
    item: 'Early Childhood, ages 3–6',
    category: 'Programmes',
    migration: 'FULL',
    before: 'BURIED',
    after: 'PROMINENT',
    routes: ['/', '/programs', '/programs/early-childhood'],
    evidence: 'Linked and summarised on both hubs; the /programs pathway states plainly that it sits outside the order.',
    note: 'Same route: null defect as Band Builders. Arguably still short of prominent — a parent of a three-year-old has no entry point aimed at them anywhere on the homepage.',
  },
  {
    id: 'pathway',
    item: 'How the programmes relate to one another',
    category: 'Programmes',
    migration: 'NONE',
    before: 'OMITTED',
    after: 'PROMINENT',
    routes: ['/programs', '/programs/band-builders', '/programs/90-day-stage-program'],
    evidence:
      'A three-stage pathway on /programs — the skill, the others, the stage — each stage linking its routes; plus before/after neighbours on Band Builders and the flagship.',
    note: 'This existed nowhere, in the source or the rebuild: not one live page referenced any other programme. It is authored connective copy stating an order, and creates no business claim — no frequency, price, duration or promise.',
  },
  {
    id: 'camp',
    item: 'Summer Jam Music Camp — the full record',
    category: 'Programmes',
    migration: 'FULL',
    before: 'BURIED',
    after: 'PROMINENT',
    routes: ['/camps', '/programs', '/'],
    evidence: 'Linked from both hubs with its summary; /camps carries schedule, ages, blocks, capacity, pricing, all 9 FAQs and the refund terms.',
    note: 'Third instance of the route: null defect. The page is one of the most complete on the site and both hubs said it did not exist.',
  },
  {
    id: 'adults',
    item: 'Adult provision',
    category: 'Programmes',
    migration: 'NONE',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: [],
    evidence: '“Adults welcome” appears in the age line; there is no page and no detail.',
    note: 'Whether adult provision is real is unestablished. Correctly withheld.',
    gate: 'B-2',
  },

  // -------------------------------------------------------------------------
  // Lessons
  // -------------------------------------------------------------------------
  {
    id: 'private-vs-group',
    item: 'The difference between private and group lessons',
    category: 'Lessons',
    migration: 'FULL',
    before: 'WEAK',
    after: 'PROMINENT',
    routes: ['/lessons', '/', '/private-lessons', '/group-music-lessons'],
    evidence:
      'A seven-row comparison on /lessons with the two formats as columns, every cell verbatim; both formats named and linked from the homepage lessons movement.',
    note: 'The two formats were two paragraphs stacked vertically — the one arrangement that makes comparison impossible. The homepage was worse: it asserted “taught one-on-one”, silently taking a side in the open format conflict and making group learning invisible.',
  },
  {
    id: 'group-learning',
    item: 'That group learning exists at all',
    category: 'Lessons',
    migration: 'FULL',
    before: 'WEAK',
    after: 'PROMINENT',
    routes: ['/', '/lessons', '/group-music-lessons', '/programs'],
    evidence: 'Named and linked in the homepage lessons movement, a column of the comparison, and a stage of the /programs pathway.',
    note: 'On the homepage it had been a name in a six-line playbill and one contradicted adjective.',
  },
  {
    id: 'instrument-ages',
    item: 'What age each instrument starts around',
    category: 'Lessons',
    migration: 'FULL',
    before: 'PROMINENT',
    after: 'PROMINENT',
    routes: ['/lessons'],
    evidence: 'Beside each of the seven names in the instrument index.',
    note: 'Already well handled before EE1.',
  },
  {
    id: 'instrument-equipment',
    item: 'What a family has to buy to start',
    category: 'Lessons',
    migration: 'FULL',
    before: 'BURIED',
    after: 'PROMINENT',
    routes: ['/lessons'],
    evidence: 'The verbatim equipment sentence under each instrument in the index.',
    note: 'Seven verbatim answers, each reachable only by opening its own page — so comparing them meant seven page loads. It is the practical blocker between an interested parent and a trial.',
  },
  {
    id: 'performance-pathway-instruments',
    item: 'Where an instrument leads',
    category: 'Lessons',
    migration: 'PARTIAL',
    before: 'WEAK',
    after: 'PROMINENT',
    routes: [
      '/piano-lessons',
      '/guitar-lessons',
      '/drum-lessons',
      '/violin-lessons',
      '/bass-guitar-lessons',
      '/ukulele-lessons',
      '/singing-lessons',
    ],
    evidence: 'A “Where it leads” section on all seven instrument pages, linking the flagship and /performances.',
    note: 'The section was conditional on programConnections, which only three instruments publish — so four of seven lesson pages ended at their FAQ with no route to the performance programme. Deliberately never links to group lessons: three of these pages claim every lesson in that instrument is private, and linking would take a side in the open conflict.',
  },
  {
    id: 'keyboard',
    item: 'Keyboard',
    category: 'Lessons',
    migration: 'NONE',
    before: 'WEAK',
    after: 'WEAK',
    routes: ['/lessons'],
    evidence: 'Listed in the instrument index as offered, unlinked, with “Detail page not yet available”.',
    note: 'Unchanged by EE1, and correctly so — the brief forbids fabricating Keyboard content. It is genuinely sold in three places in the estate with no page, no description and no age guidance. Owner must decide whether it is distinct from piano.',
  },
  {
    id: 'lesson-frequency',
    item: 'How often lessons happen',
    category: 'Lessons',
    migration: 'PARTIAL',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: [
      '/piano-lessons',
      '/guitar-lessons',
      '/drum-lessons',
      '/violin-lessons',
      '/bass-guitar-lessons',
      '/ukulele-lessons',
      '/singing-lessons',
    ],
    evidence: 'Each instrument page ships its own verbatim frequency line. No hub, the homepage, or the comparison states one.',
    note: 'Seven pages say one lesson per week; /resources says two classes weekly. The comparison table deliberately has no frequency row — both formats publish one, so the row would have been easy to fill and would have put an unresolved conflict into the one object designed to read as settled.',
  },
  {
    id: 'lesson-length',
    item: 'How long a lesson is',
    category: 'Lessons',
    migration: 'NONE',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: [],
    evidence: 'Stated nowhere.',
    note: 'Never published anywhere in the estate for any programme. Nothing to migrate.',
  },

  // -------------------------------------------------------------------------
  // Performance and proof
  // -------------------------------------------------------------------------
  {
    id: 'performance-destination',
    item: 'Performance as the destination',
    category: 'Performance',
    migration: 'FULL',
    before: 'PROMINENT',
    after: 'PROMINENT',
    routes: ['/', '/performances', '/programs/90-day-stage-program'],
    evidence: 'The entire film; the week-12 row; the three verbatim performance lines on /performances.',
    note: 'The concept the whole site is built on, and it was already landing.',
  },
  {
    id: 'showcase-proof',
    item: 'Evidence that showcases actually happen',
    category: 'Performance',
    migration: 'FULL',
    before: 'WEAK',
    after: 'PROMINENT',
    routes: ['/', '/performances', '/programs/90-day-stage-program', '/programs/band-builders'],
    evidence:
      'Three showcase reviews on the homepage and /performances; one placed directly under the week grid on the flagship; one under the Band Builders performance section.',
    note: 'The claim and its evidence lived on different pages. The flagship asserted a live showcase and carried no proof of one; the proof sat two clicks away on a page most visitors never reach.',
  },
  {
    id: 'upcoming-events',
    item: 'When the next performance is',
    category: 'Performance',
    migration: 'NONE',
    before: 'OMITTED',
    after: 'WITHHELD',
    routes: ['/performances'],
    evidence:
      'An Upcoming movement, second on the page, stating “No date is announced” in those words, with a route to be told when there is one.',
    note: 'The status change is from “nowhere for this to go” to “a built location that is honestly empty”. That is not the same as solved: the answer is still nothing. It is the strongest available honest answer, and the moment a real date exists it drops straight in.',
    gate: 'I-4',
  },
  {
    id: 'event-history',
    item: 'The event archive — what has been performed before',
    category: 'Performance',
    migration: 'NONE',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: [],
    evidence: 'Nothing ships.',
    note: 'Both source event URLs 404. The one surviving record — a March 2025 community performance — has a date that exists only as search-index metadata for a dead page, which the extraction explicitly flags unverified. Publishing it would be publishing an unverified fact. It is recoverable owner history, not content.',
  },
  {
    id: 'community',
    item: 'Community involvement',
    category: 'Performance',
    migration: 'FULL',
    before: 'BURIED',
    after: 'PROMINENT',
    routes: ['/performances', '/about'],
    evidence: 'The two verbatim /about sentences now also open a Community movement on /performances, with the one community-specific review beneath them.',
    note: 'The stronger-sounding /resources claim — free performances, choirs, orchestras, modern band — is deliberately NOT used: it is bundled with the gate B-4 promise and the estate itself records that no choir and no orchestra is offered anywhere.',
  },
  {
    id: 'photography',
    item: 'Photographs of students performing',
    category: 'Performance',
    migration: 'OMITTED',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: [],
    evidence: 'Zero <img> elements render across the public site.',
    note: 'All 18 genuine photographs blocked: no photo-release consent, and photographer copyright unconfirmed. /photo-consent exists to unblock this and cannot yet be submitted.',
    gate: 'I-1 / I-7',
  },

  // -------------------------------------------------------------------------
  // Proof and voice
  // -------------------------------------------------------------------------
  {
    id: 'testimonials-rendered',
    item: 'Family testimony',
    category: 'Proof',
    migration: 'FULL',
    before: 'PROMINENT',
    after: 'PROMINENT',
    routes: ['/', '/about', '/performances', '/programs/90-day-stage-program', '/programs/band-builders'],
    evidence:
      'Nine of fourteen extracted reviews now render, each placed against the claim it supports. No grid anywhere: an anchor with marginalia on the homepage, single contextual quotes elsewhere.',
    note: 'Was six of fourteen, concentrated on two pages. EE1 surfaced one previously unmigrated review and moved three to the claims they evidence.',
  },
  {
    id: 'testimonials-unplaced',
    item: 'Julian Paz and Claudia Olivar reviews',
    category: 'Proof',
    migration: 'PARTIAL',
    before: 'OMITTED',
    after: 'OMITTED',
    routes: [],
    evidence: 'Neither is in any content module; neither renders.',
    note: 'Deliberate and unchanged. Julian Paz runs 721 characters and contradicts itself mid-review (opens about a nephew, switches to “my children”). Claudia Olivar names two instructor identities that may be one person, which brushes gate B-7. Both are recoverable if the owner wants them; neither is a loss.',
  },
  {
    id: 'reviews-attribution',
    item: 'Review dates, star ratings and source links',
    category: 'Proof',
    migration: 'NONE',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: [],
    evidence: 'Reviews carry a name and “Google review”, and nothing else.',
    note: 'The main site never displayed a rating, a date or a permalink, so there is nothing to migrate. Capturing them requires claiming the Google Business Profile — where the entire review corpus lives, unowned.',
  },
  {
    id: 'instructors',
    item: 'Who the teachers are',
    category: 'Proof',
    migration: 'OMITTED',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: [],
    evidence: 'No instructor is named or introduced anywhere on the site.',
    note: 'The only instructor names in the entire estate appear inside customer reviews — which do render, and are the one place a visitor learns a teacher’s name. That is a real oddity and worth the owner knowing: families are introducing the staff, not the business.',
    gate: 'B-7',
  },

  // -------------------------------------------------------------------------
  // Persuasion
  // -------------------------------------------------------------------------
  {
    id: 'guarantee',
    item: 'The Stage-Ready Guarantee',
    category: 'Persuasion',
    migration: 'FULL',
    before: 'PROMINENT',
    after: 'PROMINENT',
    routes: ['/', '/programs/90-day-stage-program'],
    evidence: 'Verbatim, at statement size, on the homepage final movement and the flagship page.',
    note: 'Ranked the strongest conversion trigger available and was on two source pages out of twenty-six. Correctly promoted before EE1.',
  },
  {
    id: 'shy-question',
    item: '“What if my child is too shy?” — and the answer',
    category: 'Persuasion',
    migration: 'PARTIAL',
    before: 'BURIED',
    after: 'PROMINENT',
    routes: ['/', '/about'],
    evidence: 'Both halves verbatim, directly beneath the twelve-week table on the homepage.',
    note: 'The direction named this the emotional hinge of the page and the build never included it. It had spent two years inside an FAQ accordion. The week rows say a child plays for the class in week 11 — this answers the exact doubt that provokes.',
  },
  {
    id: 'protected-line',
    item: 'The protected line — “once they realize they can get through something that feels scary…”',
    category: 'Persuasion',
    migration: 'FULL',
    before: 'WEAK',
    after: 'PROMINENT',
    routes: ['/programs', '/'],
    evidence: 'A pull quote at display size on /programs; still a whisper in the dark on the homepage, as the film intends.',
    note: 'Called the single best sentence on the current website. On the homepage it is deliberately felt rather than read, at 20px in the dark — correct for the film, but that meant the best sentence the business owns was reaching nobody who was actually reading. It now also lands where a parent is weighing what any of this is for.',
  },
  {
    id: 'trial',
    item: 'The $25 trial and its terms',
    category: 'Persuasion',
    migration: 'FULL',
    before: 'PROMINENT',
    after: 'PROMINENT',
    routes: ['/', '/contact/book-a-trial', '/lessons', '/programs', '/camps'],
    evidence: 'The priced primary action on every page header and at the foot of every interior page.',
    note: 'Disclosing the price on two pages out of twenty-six was the estate’s largest conversion failure. Fixed before EE1.',
  },
  {
    id: 'tuition',
    item: 'What it costs',
    category: 'Persuasion',
    migration: 'BLOCKED',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: ['/programs'],
    evidence: '/programs states plainly that tuition is not published online and offers to give figures at a trial.',
    note: 'No tuition figure exists anywhere in the estate for any programme. Saying so beats a suspicious silence, but this is the single biggest unanswered question on the site and no amount of design fixes it.',
    gate: 'B-8',
  },
  {
    id: 'performance-promise',
    item: 'The performance promise',
    category: 'Persuasion',
    migration: 'OMITTED',
    before: 'OMITTED',
    after: 'OMITTED',
    routes: [],
    evidence: 'Neither wording appears anywhere on the site.',
    note: 'The estate publishes it in two incompatible forms — unconditional in the footer and homepage, conditional on the flagship page and Band Builders. Neither ships. The week grid and the guarantee carry the meaning without asserting a claim the same site contradicts.',
    gate: 'B-4',
  },

  // -------------------------------------------------------------------------
  // Access
  // -------------------------------------------------------------------------
  {
    id: 'scholarships',
    item: 'Step Up for Students — PEP and UA',
    category: 'Access',
    migration: 'FULL',
    before: 'PROMINENT',
    after: 'PROMINENT',
    routes: ['/', '/scholarships'],
    evidence: 'A formal-notice movement on the homepage and a full page, both carrying the mandatory disclaimer adjacent to the claim.',
    note: 'Handled with real care before EE1 — including restoring the compliance disclaimer that the source’s own scholarship page drops.',
  },
  {
    id: 'scholarship-process',
    item: 'How to actually use a scholarship here',
    category: 'Access',
    migration: 'NONE',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: ['/scholarships'],
    evidence: 'The page routes families to a person rather than describing a process.',
    note: 'Eligibility, application steps, required documents and coverage are published nowhere in the estate, and there is no outbound link to the administering body. This is the audience that most needs a path and has none — the highest-value owner input on the site.',
  },
  {
    id: 'bilingual',
    item: 'Spanish',
    category: 'Access',
    migration: 'OMITTED',
    before: 'WEAK',
    after: 'WEAK',
    routes: ['/', '/performances'],
    evidence:
      'The only Spanish anywhere on the site is inside a customer review, published verbatim with its original spelling.',
    note: 'The source claims “full bilingual support across our core programs and enrollment processes”. No Spanish content, switcher or hreflang has ever existed. The claim is removed rather than softened — but a large Spanish-speaking audience is being served an English-only site while a Spanish review sits on it, which is its own kind of answer.',
    gate: 'B-6',
  },
  {
    id: 'accessibility',
    item: 'Physical access to the building',
    category: 'Access',
    migration: 'NONE',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: ['/accessibility'],
    evidence: 'The accessibility page states the site commitments that are verified and says what is under review.',
    note: 'Nothing is published anywhere about step-free access, parking, restrooms or sensory accommodation — for a business that serves Unique Abilities scholarship students. Cannot be migrated; must be established.',
  },
  {
    id: 'address',
    item: 'The street address',
    category: 'Access',
    migration: 'PARTIAL',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: ['/contact'],
    evidence: 'The best-corroborated unit is published on /contact only; the footer links there rather than repeating it.',
    note: 'Three unit numbers are in evidence — 117, 1157, 115. Sending a parent to the wrong door is the one contact error with a real-world cost, and the camp pages are where drop-off happens.',
    gate: 'I-8',
  },

  // -------------------------------------------------------------------------
  // Craft
  // -------------------------------------------------------------------------
  {
    id: 'generated-assets',
    item: 'The eight generated atmospherics',
    category: 'Craft',
    migration: 'NONE',
    before: 'OMITTED',
    after: 'OMITTED',
    routes: [],
    evidence: 'None renders on any route. The one CSS rule that referenced an asset was scoped to a selector nothing sets, and has been removed.',
    note: 'All eight opened and assessed in EE1: 0 USE, 2 REWORK, 6 REJECT. None is unsafe; none is approved. Integrating a pending-review asset would be publishing unapproved imagery. No new assets generated — nothing is missing, and generating more would be filler.',
  },
  {
    id: 'sound',
    item: 'Sound',
    category: 'Craft',
    migration: 'NONE',
    before: 'OMITTED',
    after: 'OMITTED',
    routes: [],
    evidence: 'The site is silent.',
    note: 'The direction calls sound design the single largest missed opportunity in the project and the one thing no competitor would copy — on a music school, where it is the subject. It requires a sound designer, not a build. Out of EE1 scope and worth naming every time this list is read.',
  },
  {
    id: 'shout-word',
    item: 'The largest word on the site',
    category: 'Craft',
    migration: 'NONE',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: ['/'],
    evidence: 'The Release movement ships the typeset silence — a rule on the baseline the word will occupy, with a caption explaining the absence.',
    note: 'Deliberately blank: the word is the owner’s to choose. Space is reserved so setting it later causes no layout shift.',
  },
  {
    id: 'video',
    item: 'Showcase footage',
    category: 'Craft',
    migration: 'NONE',
    before: 'WITHHELD',
    after: 'WITHHELD',
    routes: [],
    evidence: 'No video exists anywhere in the estate.',
    note: 'Called the highest-value asset the owner could produce, by both the extraction and the design package. Ten to fifteen seconds, no faces, would unblock the film’s payoff without touching gate I-1.',
    gate: 'M-3',
  },
]

export interface ExperienceTotals {
  before: Record<ExperienceStatus, number>
  after: Record<ExperienceStatus, number>
  /** Items whose state improved. */
  improved: number
  /** Items that regressed. Should be zero; recorded so it cannot hide. */
  regressed: number
  /** Items behaving correctly by design — withheld or omitted, after EE1. */
  byDesign: number
  /** Items a visitor genuinely meets and benefits from, after EE1. */
  reaching: number
  /** Items still present but not landing — buried or weak, after EE1. */
  stillShort: number
  total: number
}

/** Ranked worst-first, so a regression cannot be lost in the middle of a list. */
const RANK: Record<ExperienceStatus, number> = {
  WEAK: 0,
  BURIED: 1,
  OMITTED: 2,
  WITHHELD: 3,
  PROMINENT: 4,
}

export function experienceTotals(items: readonly ExperienceItem[] = EXPERIENCE_ITEMS): ExperienceTotals {
  const empty = (): Record<ExperienceStatus, number> => ({
    PROMINENT: 0,
    BURIED: 0,
    WEAK: 0,
    WITHHELD: 0,
    OMITTED: 0,
  })

  const totals: ExperienceTotals = {
    before: empty(),
    after: empty(),
    improved: 0,
    regressed: 0,
    byDesign: 0,
    reaching: 0,
    stillShort: 0,
    total: items.length,
  }

  for (const item of items) {
    totals.before[item.before] += 1
    totals.after[item.after] += 1
    if (RANK[item.after] > RANK[item.before]) totals.improved += 1
    if (RANK[item.after] < RANK[item.before]) totals.regressed += 1
    if (item.after === 'WITHHELD' || item.after === 'OMITTED') totals.byDesign += 1
    if (item.after === 'PROMINENT') totals.reaching += 1
    if (item.after === 'BURIED' || item.after === 'WEAK') totals.stillShort += 1
  }

  return totals
}

/** Worst first. The rows that still need work sit at the top, permanently. */
export function rankedItems(items: readonly ExperienceItem[] = EXPERIENCE_ITEMS): ExperienceItem[] {
  return [...items].sort((a, b) => RANK[a.after] - RANK[b.after] || a.category.localeCompare(b.category))
}

/* ────────────────────────────────────────────────────────────────────────────
   MI1 — AUTHENTIC MEDIA INTEGRATION PREVIEW
   ──────────────────────────────────────────────────────────────────────────── */

export type MediaTier = 'A' | 'B' | 'C'

export const MEDIA_TIER_LABELS: Record<MediaTier, string> = {
  A: 'A — no people in the original frame',
  B: 'B — face-free crop of a people-bearing original',
  C: 'C — identifiable people (never previewed)',
}

export interface Mi1Derivative {
  /** Derivative name, without extension. */
  id: string
  tier: MediaTier
  /** Index in the 67-image visual census. */
  sourceIndex: number
  sourceFilename: string
  sourceDimensions: string
  /** What the crop step did, in words. */
  crop: string
  outputDimensions: string
  /** Route it is wired to, or null when it is wired to nothing. */
  route: string | null
  /** The narrative job. A plate without a job does not ship. */
  designRole: string
  faceFree: boolean
  /** Whether it survived visual inspection and is currently rendered. */
  inUse: boolean
  status: string
  /** Always true in MI1. Nothing here is production-approved. */
  productionApprovalRequired: true
  /** Which gate is actually blocking it. */
  gate: string
}

/**
 * ## Every row here is UNCLEARED
 *
 * `productionApprovalRequired` is typed as the literal `true` because there is
 * no legitimate value for it in MI1. These are derivatives of legacy
 * southdademusic.com photography; the business's right to license them is
 * unconfirmed (gate I-7), and looking good in a preview is not clearance.
 *
 * ## The bytes are not in this repository
 *
 * They live in `.audit/media-review/`, which is gitignored, and reach a browser
 * only through the development-only handler at `/_media-review/[asset]`. There
 * is deliberately no `thumbnail` field on this interface: rendering these in
 * the review tool from `public/` is exactly the Phase 4D exposure, and the
 * reviewer is expected to open the routes in `next dev` instead.
 *
 * ## Two rows record rejections, and they are the useful ones
 *
 * `room-drums` and the first `bass-on-stand` placement both passed every
 * automated check and both failed visual inspection. They are kept in the table
 * because a media audit that only lists what worked is not an audit.
 */
export const MI1_DERIVATIVES: readonly Mi1Derivative[] = [
  {
    id: 'stage-set-floral',
    tier: 'A',
    sourceIndex: 65,
    sourceFilename: '0_p-NH2ecjjuoHdJct-1024x683-2.png',
    sourceDimensions: '1024×683',
    crop: 'None — used whole',
    outputDimensions: '1024×683',
    route: '/',
    designRole: 'FULL-BLEED EDITORIAL — the homepage House join',
    faceFree: true,
    inUse: true,
    status:
      'Preview only. The academy’s own dressed stage — Casio keyboards, drum kit, floral drape, SDM banner. Nobody on it.',
    productionApprovalRequired: true,
    gate: 'I-7 photographer copyright',
  },
  {
    id: 'stage-set-purple',
    tier: 'A',
    sourceIndex: 54,
    sourceFilename: 'Exposure-scaled.jpg',
    sourceDimensions: '2560×1707',
    crop: 'Trimmed to the stage, purple wash retained',
    outputDimensions: '2200×1467',
    route: '/performances',
    designRole: 'FULL-BLEED EDITORIAL — replaces the generated empty chair',
    faceFree: true,
    inUse: true,
    status:
      'Preview only. Replaces a generated chair that said “a stage is waiting” with this academy’s stage, which says “this stage is waiting”.',
    productionApprovalRequired: true,
    gate: 'I-7 photographer copyright',
  },
  {
    id: 'medals',
    tier: 'A',
    sourceIndex: 23,
    sourceFilename: 'P1088548.jpg',
    sourceDimensions: '2000×1500',
    crop: 'Letterboxed to the medals on the table',
    outputDimensions: '1800×872',
    route: '/programs/90-day-stage-program',
    designRole: 'PROGRAMME MOMENT — the flagship finale',
    faceFree: true,
    inUse: true,
    status:
      'Preview only. The one piece of first-party material that depicts an outcome. It is the reason the finale no longer needs a generated chair.',
    productionApprovalRequired: true,
    gate: 'I-7 photographer copyright',
  },
  {
    id: 'stage-instruments',
    tier: 'B',
    sourceIndex: 29,
    sourceFilename: 'P1088639.jpg',
    sourceDimensions: '2000×1500',
    crop: 'Cropped below the faces — instruments and hands only',
    outputDimensions: '1440×675',
    route: '/programs/band-builders',
    designRole: 'FULL-BLEED EDITORIAL — replaces three generated object studies',
    faceFree: true,
    inUse: true,
    status:
      'Preview only. Two teenagers playing bass and electric guitar side by side. The generated triptych argued “together” by arrangement; this frame simply is it.',
    productionApprovalRequired: true,
    gate: 'I-7 copyright; I-1 applies to the original, which never ships',
  },
  {
    id: 'ukulele-wall',
    tier: 'B',
    sourceIndex: 30,
    sourceFilename: 'IMG_5012-scaled.jpg',
    sourceDimensions: '2560×1440',
    crop: 'Cropped to the ukulele rack on the wall',
    outputDimensions: '768×605',
    route: '/private-lessons',
    designRole: 'FULL-BLEED EDITORIAL',
    faceFree: true,
    inUse: true,
    status:
      'Preview only. The only good face-free region of the single best interior frame in the estate — which is why /lessons could not also have one.',
    productionApprovalRequired: true,
    gate: 'I-7 copyright; I-1 applies to the original, which never ships',
  },
  {
    id: 'banner',
    tier: 'A',
    sourceIndex: 68,
    sourceFilename: 'New-Project.png',
    sourceDimensions: '441×759',
    crop: 'None — used whole',
    outputDimensions: '441×759',
    route: '/about',
    designRole: 'INLINE PROOF — “in the community”',
    faceFree: true,
    inUse: true,
    status:
      'Preview only. The academy’s pull-up banner, in its own room, reading “build community. make music.” It is the only first-party artefact where the business states its own claim physically.',
    productionApprovalRequired: true,
    gate: 'I-7 photographer copyright',
  },
  {
    id: 'bass-on-stand',
    tier: 'A',
    sourceIndex: 24,
    sourceFilename: 'P1088541.jpg',
    sourceDimensions: '2000×1500',
    crop: 'Portrait crop to the bass and the table edge',
    outputDimensions: '1120×1320',
    route: '/performances',
    designRole: 'MARGINAL IMAGE — beside “no dated event yet”',
    faceFree: true,
    inUse: true,
    status:
      '⚠️ RE-HOMED AFTER INSPECTION. First wired to /contact as “the room behind the address”. The photograph shows a party table and balloons on recital day and does not support that caption, so it moved to the section whose claim it actually matches.',
    productionApprovalRequired: true,
    gate: 'I-7 photographer copyright',
  },
  {
    id: 'room-drums',
    tier: 'B',
    sourceIndex: 30,
    sourceFilename: 'IMG_5012-scaled.jpg',
    sourceDimensions: '2560×1440',
    crop: 'Cropped to the far wall of the teaching room',
    outputDimensions: '1024×792',
    route: null,
    designRole: 'REJECTED — wired to /lessons, then reverted',
    faceFree: true,
    inUse: false,
    status:
      '⚠️ REJECTED ON VISUAL INSPECTION. The honest content of this corner is a microwave, plastic bags, a utility cart and wire shelving. It reads as a storage room, not a teaching room, and would have made the academy look worse than a generated plate does. Retained on disk as the record; referenced by nothing.',
    productionApprovalRequired: true,
    gate: 'Rejected on quality before any gate applies',
  },
]

export interface Mi1RouteCoverage {
  route: string
  /** Authentic photographs currently rendered on this route. */
  authentic: number
  /** Approved generated plates currently rendered. */
  generated: number
  /** Set when the route carries no authentic media, explaining why. */
  note: string | null
}

/**
 * Measured in a real browser at 1440×900 and 390×844 by counting
 * `[data-media-review]` and `[data-atmosphere]` after a full scroll — not
 * counted from source. The two zero rows are the honest output of MI1 and are
 * the strongest argument in it for commissioning a short shoot.
 */
export const MI1_ROUTE_COVERAGE: readonly Mi1RouteCoverage[] = [
  { route: '/', authentic: 1, generated: 5, note: null },
  { route: '/programs/90-day-stage-program', authentic: 1, generated: 1, note: null },
  { route: '/programs/band-builders', authentic: 1, generated: 1, note: null },
  { route: '/private-lessons', authentic: 1, generated: 1, note: null },
  { route: '/performances', authentic: 2, generated: 1, note: null },
  { route: '/about', authentic: 1, generated: 1, note: null },
  {
    route: '/lessons',
    authentic: 0,
    generated: 4,
    note: 'No usable frame. Audit #11 is the best interior photograph in the estate and is 1000×667 composed almost entirely of identifiable children — no face-free region survives at this size. Audit #30’s one good face-free region is already spent on /private-lessons.',
  },
  {
    route: '/contact',
    authentic: 0,
    generated: 1,
    note: 'The estate contains no exterior, no entrance, no reception and no street view in any of its 67 images. A contact page wants exactly one photograph and it does not exist.',
  },
]
