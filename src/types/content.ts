/**
 * Content model — typed interfaces.
 * Canonical spec: docs/redesign/08-content-model.md
 *
 * These are the shapes the site will render. No content is authored in Phase 4;
 * these exist so later phases cannot invent ad-hoc shapes, and so the
 * publication rules below are expressible in code rather than in prose.
 */

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

export type Locale = 'en-US' | 'es-US'

/** A string authored per locale. Copy is authored, never machine-translated. */
export type Localized<T = string> = Partial<Record<Locale, T>> & { 'en-US': T }

/** ISO 8601 date, e.g. `2026-03-15`. */
export type IsoDate = string

export type AgeRange = { min: number; max: number | null }

export type Money = {
  /** Minor units, to avoid float error. 45000 = $450.00 */
  amountMinor: number
  currency: 'USD'
  /** `from` renders as "from $X"; `exact` renders the figure alone. */
  kind: 'exact' | 'from'
}

/** Editorial/visual register (08 §3). `decorative` is the Phase 3.5 addition. */
export type Register = 'stage' | 'studio' | 'community' | 'decorative'

export type Provenance = 'in-house' | 'licensed-stock' | 'ai-generated' | 'client-supplied' | 'unknown'

export type ConsentStatus = 'obtained' | 'pending' | 'refused' | 'unknown' | 'not-applicable'

export type PublicationStatus = 'draft' | 'review' | 'published' | 'blocked'

// ---------------------------------------------------------------------------
// Asset — the consent- and subject-gated core of the content model (08 §3)
// ---------------------------------------------------------------------------

export interface Asset {
  id: string
  src: string
  width: number
  height: number
  /** REQUIRED, meaningful, human-written. Validated — rejects filenames, "img", "Image 1". */
  altText: Localized
  /** REQUIRED. Validated against the host page's subject tags. */
  subject: readonly string[]
  register: Register
  provenance: Provenance
  depictsMinors: boolean
  /** REQUIRED when `depictsMinors` is true. */
  consentStatus: ConsentStatus
  consentRef?: string
  licence?: string
  capturedAt?: IsoDate
  photographer?: string
  caption?: Localized
  /** Dominant-colour or LQIP placeholder. */
  blurDataUrl?: string
}

/**
 * Publication rules from 08-content-model.md §3, expressed as code so they can
 * be enforced rather than remembered.
 */
export const assetPublicationRules = {
  /** depictsMinors + consent not obtained → publish blocked. */
  minorsRequireConsent: (a: Asset): boolean => !a.depictsMinors || a.consentStatus === 'obtained',
  /** provenance: unknown → cannot be a hero. */
  unknownProvenanceCannotBeHero: (a: Asset): boolean => a.provenance !== 'unknown',
  /** ai-generated cannot depict minors. */
  aiCannotDepictMinors: (a: Asset): boolean => !(a.provenance === 'ai-generated' && a.depictsMinors),
  /**
   * ai-generated cannot occupy a documentary register.
   * `decorative` is the legal register for permitted generated work — see
   * docs/redesign/image-style-guide.md §6 "The register clarification".
   */
  aiIsDecorativeOnly: (a: Asset): boolean => a.provenance !== 'ai-generated' || a.register === 'decorative',
} as const

export function canPublishAsset(asset: Asset): boolean {
  return Object.values(assetPublicationRules).every((rule) => rule(asset))
}

// ---------------------------------------------------------------------------
// Lesson (instrument)
// ---------------------------------------------------------------------------

export type InstrumentSlug = 'piano' | 'guitar' | 'drums' | 'bass' | 'violin' | 'ukulele' | 'voice'

export interface Lesson {
  id: string
  slug: InstrumentSlug
  name: Localized
  /** Subject tags must intersect the hero asset's `subject` — fixes the Phase 2
   *  guitar-photo-on-the-violin-page defect. */
  subject: readonly string[]
  startAge: number
  /** "What you need to begin" — e.g. "A keyboard is enough to start." */
  requirements: Localized
  summary: Localized
  body?: Localized
  heroImage: Asset | null
  relatedPrograms: readonly string[]
  status: PublicationStatus
}

// ---------------------------------------------------------------------------
// Program
// ---------------------------------------------------------------------------

export type ProgramFormat = 'private' | 'group' | 'ensemble' | 'cycle' | 'early-childhood'

export interface ProgramWeek {
  week: number
  title: Localized
  description: Localized
  /** Marks the peer-exposure and showcase weeks for typographic emphasis. */
  milestone?: 'peer-exposure' | 'showcase'
}

export interface Program {
  id: string
  slug: string
  name: Localized
  format: ProgramFormat
  ages: AgeRange
  /** Sessions per week. Phase 2 found a 1-vs-2 conflict across 7 pages. */
  sessionsPerWeek: number | null
  durationWeeks: number | null
  price: Money | null
  summary: Localized
  /** The published syllabus. Empty until confirmed. */
  weeks: readonly ProgramWeek[]
  heroImage: Asset | null
  isFlagship: boolean
  /** Decision gate blocking publication, if any. */
  gate?: string
  status: PublicationStatus
}

// ---------------------------------------------------------------------------
// Camp
// ---------------------------------------------------------------------------

export interface CampSession {
  id: string
  name: Localized
  startDate: IsoDate
  endDate: IsoDate
  /** e.g. "9:00 AM – 3:00 PM" */
  dailyHours: string
  ages: AgeRange
  price: Money | null
  /** ⚠️ Non-refundable and currently unpublished. Hard block on the booking form. */
  depositAmount: Money | null
  capacity: number | null
  seatsRemaining: number | null
}

export interface Camp {
  id: string
  slug: string
  year: number
  name: Localized
  summary: Localized
  sessions: readonly CampSession[]
  /** Camp selling image must be a real, current-year photograph. Never generated. */
  heroImage: Asset | null
  refundPolicy: Localized | null
  status: PublicationStatus
  gate?: string
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export type FaqCategory = 'programs' | 'lessons' | 'camps' | 'scholarships' | 'policies' | 'getting-started'

export interface Faq {
  id: string
  question: Localized
  answer: Localized
  category: FaqCategory
  /** Ordering within its category. */
  order: number
  status: PublicationStatus
}

// ---------------------------------------------------------------------------
// Testimonial
// ---------------------------------------------------------------------------

export type TestimonialSource = 'google' | 'facebook' | 'direct' | 'unknown'

export interface Testimonial {
  id: string
  /** Verbatim. Never edited — quote exactly or omit (01-brand-strategy.md §4). */
  quote: string
  attribution: string
  source: TestimonialSource
  rating: 1 | 2 | 3 | 4 | 5 | null
  collectedAt: IsoDate | null
  /**
   * True when the quote names a minor. Phase 2 found a review naming two
   * children in full — publication requires guardian consent.
   */
  namesMinor: boolean
  consentStatus: ConsentStatus
  status: PublicationStatus
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export interface Gallery {
  id: string
  slug: string
  title: Localized
  description?: Localized
  items: readonly Asset[]
  /** Links a gallery to the dated event it documents. */
  performanceId?: string
  status: PublicationStatus
}

// ---------------------------------------------------------------------------
// Performance (showcase / event)
// ---------------------------------------------------------------------------

export type PerformanceKind = 'showcase' | 'recital' | 'community-event' | 'camp-concert'

export interface Performance {
  id: string
  slug: string
  title: Localized
  kind: PerformanceKind
  /**
   * REQUIRED. Undated performance imagery is barred: an undated photo cannot
   * prove a recurring cycle (09-image-strategy.md §8).
   */
  date: IsoDate
  venue: string
  /** Only when a real figure exists. Never invented. */
  studentCount: number | null
  summary?: Localized
  gallery: Gallery | null
  heroImage: Asset | null
  isUpcoming: boolean
  status: PublicationStatus
}

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

/** Three tiers (02-information-architecture.md §10). */
export type CtaTier = 1 | 2 | 3

export type CtaIntent =
  | 'book-trial'
  | 'watch-showcase'
  | 'reserve-seat'
  | 'check-eligibility'
  | 'see-pricing'
  | 'request-teacher'
  | 'call'
  | 'directions'

export interface Cta {
  id: string
  tier: CtaTier
  intent: CtaIntent
  label: Localized
  href: string
  /** Price disclosed in the label where a price exists (04 §7 rule 2). */
  price: Money | null
  /**
   * Captured as a hidden field so a $450 camp reservation and a free enquiry
   * are distinguishable (02 §10 rule 4).
   */
  sourceContext: string
  status: PublicationStatus
  gate?: string
}
