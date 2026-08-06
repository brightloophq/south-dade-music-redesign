/**
 * Site configuration.
 *
 * Source of truth: docs/source-content/ (Phase 2 extraction).
 * NO business facts are invented here. Where Phase 2 found conflicting values,
 * the conflict is recorded and the value is marked unresolved — it must not be
 * published until the owner closes the gate.
 *
 * Decision gates: docs/redesign/01-brand-strategy.md §14
 */

/**
 * A value that Phase 2 found in more than one form. `resolved: false` means it
 * is barred from hero copy, navigation and structured data until its gate closes
 * (docs/redesign/01-brand-strategy.md §11 "Rule for the build").
 */
export interface GatedValue<T> {
  /** Best-corroborated value, for internal/dev use only while unresolved. */
  value: T
  resolved: boolean
  /** Decision gate that unblocks publication. */
  gate?: string
  /** Competing values found in the estate. */
  conflicts?: readonly string[]
  note?: string
}

export const siteConfig = {
  /**
   * ⚠️ Gate B-5 — four names run concurrently across the estate:
   * "South Dade Music", "South Dade Music Academy", "SDMA", "South Dade Music LLC".
   * The first decision the owner must make. Blocks logo, taglines, schema, domains.
   */
  name: {
    value: 'South Dade Music',
    resolved: false,
    gate: 'B-5',
    conflicts: ['South Dade Music Academy', 'SDMA', 'South Dade Music LLC'],
    note: 'Footer sitewide + og:site_name. Blocks logo lockup, structured data, ™ usage.',
  } satisfies GatedValue<string>,

  /** Safe short name for <title> templates while B-5 is open. */
  shortName: 'South Dade Music',

  /**
   * ⚠️ Gate B-4 — the unconditional 90-day claim is falsifiable and contradicted
   * by the guarantee itself. Recommended honest wording is pending approval, so
   * NO promise copy ships from config.
   */
  tagline: {
    value: 'Ready for the stage.',
    resolved: false,
    gate: 'B-4 / B-5',
    note: 'Recommended primary tagline (01-brand-strategy.md §13). Not yet owner-approved.',
  } satisfies GatedValue<string>,

  /**
   * Neutral, non-promissory description. Deliberately makes no claim that is
   * behind a gate — no "every student", no "90 days", no price.
   */
  description:
    'A music academy in Florida City serving South Miami-Dade families with lessons, ensembles and live performance programmes.',

  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.southdademusic.com',

  locale: {
    default: 'en-US',
    /** ⚠️ Gate B-6 — bilingual is currently claimed and undelivered. */
    supported: ['en-US'] as const,
    planned: ['es-US'] as const,
    gate: 'B-6',
  },

  contact: {
    /**
     * ⚠️ Conflict: the subdomain publishes +1-786-386-1982, a completely
     * different number. Footer value is sitewide and better corroborated.
     */
    phone: {
      value: '+17867539509',
      resolved: false,
      gate: 'contact reconciliation',
      conflicts: ['+17863861982 (try.southdademusic.com)'],
      note: 'Sitewide footer value. Subdomain publishes different digits, not a formatting variant.',
    } satisfies GatedValue<string>,
    phoneDisplay: '786-753-9509',

    /**
     * ⚠️ Conflict: /contact-enroll/ body publishes contact@ while the footer
     * directly beneath it publishes info@.
     */
    email: {
      value: 'info@southdademusic.com',
      resolved: false,
      gate: 'contact reconciliation',
      conflicts: ['contact@southdademusic.com (/contact-enroll/ body)'],
    } satisfies GatedValue<string>,

    /**
     * ⚠️ Gate I-8 — three unit numbers in evidence: 117, 1157, 115.
     * Unit 117 is strongest (contact page + Google Maps place record).
     * Blocks the premises shoot, directions imagery and LocalBusiness schema.
     */
    address: {
      value: {
        street: '601 W Palm Dr',
        unit: 'Unit 117',
        locality: 'Florida City',
        region: 'FL',
        postalCode: '33034',
        country: 'US',
      },
      resolved: false,
      gate: 'I-8',
      conflicts: ['Unit 1157 (camp pages)', 'Unit 115 (subdomain)'],
    } satisfies GatedValue<{
      street: string
      unit: string
      locality: string
      region: string
      postalCode: string
      country: string
    }>,
  },

  /** Named in 01-brand-strategy.md §3 — "by name, not generic South Dade filler". */
  serviceArea: ['Florida City', 'Homestead', 'Cutler Bay', 'Palmetto Bay'] as const,

  /**
   * Social profiles. Empty until verified — an unverified profile in structured
   * data is a factual claim we cannot support.
   */
  social: {} as Readonly<Record<string, string>>,

  /**
   * Open Graph fallback image. Not yet produced.
   * ⚠️ Must not use a generated decorative asset that implies documentary
   * content (docs/redesign/image-style-guide.md §3).
   */
  ogImage: null as string | null,

  /**
   * Blocks structured data emission. Flip to true only when B-4, B-5, I-8 and
   * the contact conflicts are all closed.
   * See docs/redesign/01-brand-strategy.md §14.
   */
  structuredDataEnabled: false,

  /** Blocks indexing on non-production deployments. */
  indexingEnabled: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
} as const

export type SiteConfig = typeof siteConfig

/** Convenience: is a gated value safe to publish? */
export function isPublishable<T>(gated: GatedValue<T>): boolean {
  return gated.resolved
}

/** All currently-open gates, for the build report and a future CI check. */
export const openGates = [
  { id: 'B-3', question: 'Confirm the Gradual Exposure Ladder rungs', blocks: 'Ladder sequence, method copy' },
  { id: 'B-4', question: 'Approve honest 90-day promise wording', blocks: 'Hero H1, footer, structured data' },
  { id: 'B-5', question: 'Single brand name + ™ status', blocks: 'Logo, taglines, schema, domains' },
  { id: 'B-6', question: 'Bilingual: build it or drop the claim', blocks: 'The /es tree, language switch' },
  { id: 'B-7', question: 'Instructor names, credentials, permission', blocks: '/teachers' },
  { id: 'B-8', question: 'Pricing for every product', blocks: '/pricing, CTA labels, camp deposit' },
  { id: 'D-1', question: 'Logo review before token freeze', blocks: 'Palette confirmation' },
  { id: 'I-1', question: 'Photo-release consent for all 18 photographs', blocks: 'Every real photograph' },
  { id: 'I-4', question: 'Next showcase date', blocks: '/events, showcase CTA' },
  { id: 'I-8', question: 'Correct unit number', blocks: 'Address, directions, LocalBusiness schema' },
  { id: 'M-3', question: 'Showcase footage available?', blocks: 'Timeline payoff' },
] as const
