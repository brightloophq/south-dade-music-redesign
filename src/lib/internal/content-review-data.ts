/**
 * Content review data loader — **DEVELOPMENT ONLY**.
 *
 * Reads the Phase 2 extraction directly from `docs/source-content/` at request
 * time and hands it to `/_internal/content-review` unchanged.
 *
 * ## Why it reads the files rather than importing a curated copy
 *
 * The whole point of the review tool is to show what was *extracted*, so that
 * it can be compared against what was *built*. If this module transcribed,
 * summarised or re-typed any of it, the comparison would be against my summary
 * rather than against the source — and a transcription error would read as a
 * migration finding. So: raw file, rendered as-is.
 *
 * ## ⚠️ This module must never be imported by a public route
 *
 * It reads from the filesystem outside `public/`, and it surfaces withheld
 * content, gate IDs and internal assessments. The only consumer is the
 * development-only review route, which 404s in production.
 */

import fs from 'node:fs'
import path from 'node:path'

const SOURCE_DIR = path.join(process.cwd(), 'docs', 'source-content')
const GENERATED_META_DIR = path.join(process.cwd(), 'public', 'images', 'generated', 'metadata')

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, file), 'utf8')) as T
}

function readTextIfPresent(file: string): string | null {
  try {
    return fs.readFileSync(file, 'utf8')
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Shapes — only the fields the review renders. The extraction carries more.
// ---------------------------------------------------------------------------

export interface ManifestPage {
  sourceUrl: string
  pageTitle: string
  pageType: string
  localFile: string | null
  proposedNewRoute: string | null
  migrationPriority: string
  uniqueContent: boolean
  duplicateOf: string | null
  imagesFound: number
  videosFound: number
  formsFound: number
  lastScrapedAt: string
}

export interface SourceAsset {
  sourceUrl: string
  sourcePage: string[] | string
  assetType: string
  probableSubject: string | null
  fileName: string
  dimensionsWhenAvailable: string | null
  altText: string | null
  qualityAssessment: string | null
  duplicate: boolean
  duplicateOf?: string
  recommendedUse: string | null
  ownershipNeedsConfirmation: boolean
  consentNote?: string
}

export interface Testimonial {
  reviewerName: string | null
  testimonial: string
  sourcePage: string[] | string
  duplicateCount: number
  probableSource: string | null
  permissionOrVerificationNeeded: boolean
  notes: string | null
}

export interface FaqSet {
  setName: string
  appearsOn: string[]
  identical: boolean
  count: number
  note: string | null
  faqs: { question: string; answer: string }[]
}

/** One asset, classified for review. Derived — see `classifyAsset`. */
export interface ClassifiedAsset extends SourceAsset {
  /** authentic business photo · stock/template · logo/trademark · icon · unknown */
  provenanceClass: string
  identifiablePeople: boolean
  identifiableChildren: boolean
  consentStatus: string
  licensingStatus: string
  localCopy: boolean
  published: boolean
  reasonNotPublished: string
  currentDestination: string
  /** Whether it is safe to render a thumbnail. Legacy assets: never. */
  safeToRender: boolean
  status: 'BLOCKED' | 'REJECTED' | 'PENDING' | 'REPLACE'
}

/**
 * Classify one legacy asset.
 *
 * The extraction records `consentNote`, `qualityAssessment` and
 * `ownershipNeedsConfirmation` as prose. This turns that into the explicit
 * yes/no columns the review needs — **erring toward the restrictive answer
 * every time.** An asset whose subject cannot be established is treated as
 * containing people, not as safe, because the cost of the two mistakes is not
 * symmetrical.
 *
 * ⚠️ This is exactly the step Phase 4D skipped. Four files were called "icons"
 * on the strength of their filenames and turned out to be photographs of
 * identifiable people. Nothing here is inferred from a filename.
 */
export function classifyAsset(asset: SourceAsset): ClassifiedAsset {
  const q = (asset.qualityAssessment ?? '').toLowerCase()
  const subject = (asset.probableSubject ?? '').toLowerCase()
  const consent = asset.consentNote ?? null
  const hay = `${q} ${subject}`

  const genuine = q.includes('genuine in-house') || q.includes('genuine photography')
  const isStock =
    hay.includes('stock') ||
    hay.includes('template') ||
    hay.includes('turkish') ||
    hay.includes('french') ||
    hay.includes('medium cdn') ||
    hay.includes('unverifiable licens')
  const isLogo = asset.assetType === 'logo'
  const isIcon = asset.assetType === 'icon'
  const isTrademark = hay.includes('step up') && (isLogo || hay.includes('logo'))

  /*
   * People. `consentNote` is the extraction's explicit flag. Beyond that we
   * treat any genuine in-house photograph as depicting people — every one of
   * the 18 does — and any photographic asset whose subject mentions students,
   * performance, class or camp.
   */
  const consentSaysPeople = Boolean(consent)
  const subjectSaysPeople =
    /student|child|children|kid|performer|performance|showcase|class|camp|teacher|instructor|family|people|portrait/.test(
      subject,
    )
  const identifiablePeople =
    consentSaysPeople || (genuine && asset.assetType === 'image') || (asset.assetType === 'image' && subjectSaysPeople)

  const consentSaysMinors = /minor|child|children|kid|student/i.test(consent ?? '')
  const identifiableChildren = consentSaysMinors || (genuine && /student|child|kid|camp/.test(subject))

  const provenanceClass = isTrademark
    ? 'third-party trademark'
    : isLogo
      ? 'business logo'
      : genuine
        ? 'authentic business photo'
        : isStock
          ? 'stock / template'
          : isIcon
            ? 'icon / decorative'
            : 'unknown'

  const consentStatus = identifiablePeople
    ? consent
      ? `NONE ON FILE — ${consent}`
      : 'NONE ON FILE — depicts people, no release located'
    : 'not applicable — no people depicted'

  const licensingStatus = isTrademark
    ? 'THIRD-PARTY TRADEMARK — no confirmed licence (gate I-6)'
    : genuine
      ? 'Business-owned capture; photographer copyright unconfirmed (gate I-7)'
      : isStock
        ? 'NOT ESTABLISHED — stock/template of unknown provenance'
        : asset.ownershipNeedsConfirmation
          ? 'NOT ESTABLISHED — ownership needs confirmation'
          : 'Business-owned upload'

  let status: ClassifiedAsset['status'] = 'PENDING'
  let reasonNotPublished = ''
  if (genuine || identifiableChildren) {
    status = 'BLOCKED'
    reasonNotPublished =
      'Gate I-1 — depicts identifiable minors with no photo-release consent on file. Gate I-7 — photographer copyright unconfirmed. Deliberately NOT downloaded: a second uncleared copy of an unpublishable image is still an uncleared copy.'
  } else if (isTrademark) {
    status = 'BLOCKED'
    reasonNotPublished = 'Gate I-6 — third-party trademark with no confirmed licence.'
  } else if (isStock) {
    status = 'REJECTED'
    reasonNotPublished =
      'Licensing not established. The rebuild ships no stock photography — and four files from this estate that were assumed safe turned out to be photographs of people.'
  } else if (isLogo) {
    status = 'REPLACE'
    reasonNotPublished = 'Gate D-1 — raster only, doubles as the og:image on every page. To be rebuilt as SVG.'
  } else if (asset.duplicate) {
    status = 'REJECTED'
    reasonNotPublished = `Duplicate upload${asset.duplicateOf ? ` of ${asset.duplicateOf}` : ''} — nothing unique to preserve.`
  } else if (identifiablePeople) {
    status = 'BLOCKED'
    reasonNotPublished = 'Depicts identifiable people with no release on file.'
  } else {
    status = 'PENDING'
    reasonNotPublished =
      'Not required by the rebuild. The design bans icon rows, so no icon from the estate has a destination.'
  }

  return {
    ...asset,
    provenanceClass,
    identifiablePeople,
    identifiableChildren,
    consentStatus,
    licensingStatus,
    /*
     * No legacy asset has a local copy. Five were retrieved in Phase 4D,
     * proved to be photographs of people, and were deleted on 2026-08-09.
     */
    localCopy: false,
    published: false,
    reasonNotPublished,
    currentDestination: 'none — not used anywhere in the rebuild',
    /*
     * ⚠️ NEVER true for a legacy asset. Rendering one would mean fetching it
     * from southdademusic.com, which both re-exposes it and creates a request
     * for an image nobody has cleared. Metadata only.
     */
    safeToRender: false,
    status,
  }
}

export interface GeneratedAsset {
  file: string
  page: string
  section: string
  purpose: string
  approvalStatus: string
  provenance: string
  register: string
  depictsMinors: boolean
  consentStatus: string
  licence: string
  byteSize: number
  publicPath: string
}

/** The in-repo generated atmospherics — the only images safe to thumbnail. */
export function loadGeneratedAssets(): GeneratedAsset[] {
  let files: string[] = []
  try {
    files = fs.readdirSync(GENERATED_META_DIR).filter((f) => f.endsWith('.json'))
  } catch {
    return []
  }
  return files
    .map((f) => {
      const raw = readTextIfPresent(path.join(GENERATED_META_DIR, f))
      if (!raw) return null
      const m = JSON.parse(raw)
      return {
        file: m.file,
        page: m.page ?? '—',
        section: m.section ?? '—',
        purpose: m.purpose ?? '—',
        approvalStatus: m.approvalStatus ?? 'unknown',
        provenance: m.provenance ?? 'unknown',
        register: m.register ?? 'unknown',
        depictsMinors: Boolean(m.depictsMinors),
        consentStatus: m.consentStatus ?? 'unknown',
        licence: m.licence ?? 'unknown',
        byteSize: m.byteSize ?? 0,
        publicPath: `/images/generated/${m.file}`,
      } satisfies GeneratedAsset
    })
    .filter((x): x is GeneratedAsset => x !== null)
    .sort((a, b) => a.file.localeCompare(b.file))
}

// ---------------------------------------------------------------------------
// Public loader
// ---------------------------------------------------------------------------

export interface ReviewPage extends ManifestPage {
  /** The full extracted markdown for this page, verbatim. */
  markdown: string | null
  /** Testimonials the extraction attributes to this source page. */
  testimonials: Testimonial[]
  /** FAQ sets that appear on this source page. */
  faqSets: FaqSet[]
  /** Assets the extraction found on this source page. */
  assets: ClassifiedAsset[]
  /** Whether this page's content has a live route — at either URL. */
  built: boolean
  /** The route it actually lives at today, which may differ from the proposal. */
  actualRoute: string | null
  /** Where this content ended up, if anywhere. */
  destinationNote: string
}

/** Routes that exist in the rebuild today. Kept explicit — see check-a11y. */
export const BUILT_ROUTES = [
  '/',
  '/about',
  '/accessibility',
  '/bass-guitar-lessons',
  '/camps',
  '/contact',
  '/contact/book-a-trial',
  '/drum-lessons',
  '/faq',
  '/group-music-lessons',
  '/guitar-lessons',
  '/lesson-cancellation',
  '/lessons',
  '/performances',
  '/photo-consent',
  '/piano-lessons',
  '/privacy',
  '/private-lessons',
  '/programs',
  '/programs/90-day-stage-program',
  '/programs/band-builders',
  '/programs/early-childhood',
  '/scholarships',
  '/singing-lessons',
  '/terms',
  '/ukulele-lessons',
  '/violin-lessons',
] as const

/**
 * Legacy routes that redirect rather than being built. Mirrors
 * `next.config.ts`; kept here so the review can explain a "not built" row
 * instead of leaving it looking like a gap.
 */
export const REDIRECTS: Record<string, string> = {
  '/summer-jam-music-camp-2026': '/camps',
  '/summer-programs': '/camps',
  '/summer-camp': '/camps',
  '/summercamp': '/camps',
  '/instruments': '/lessons',
  '/resources': '/faq',
  '/step-up-accessibility': '/scholarships',
  '/contact-enroll': '/contact',
  '/90-day-stage-program': '/programs/90-day-stage-program',
  '/band-builders': '/programs/band-builders',
  '/early-childhood': '/programs/early-childhood',
  '/privacy-policy': '/privacy',
  '/members': '/contact',
}

function pathOf(sourceUrl: string): string {
  try {
    const u = new URL(sourceUrl)
    const p = u.pathname.replace(/\/$/, '')
    return p === '' ? '/' : p
  } catch {
    return sourceUrl
  }
}

function matchesPage(entry: string[] | string | undefined, page: ManifestPage): boolean {
  if (!entry) return false
  const list = Array.isArray(entry) ? entry : [entry]
  const p = pathOf(page.sourceUrl)
  const slug = page.localFile?.replace('source-pages/', '').replace('.md', '') ?? ''
  return list.some((raw) => {
    const s = String(raw).toLowerCase()
    if (s.includes('sitewide')) return false
    const norm = s.replace(/\/$/, '')
    return norm === p || norm === p.replace(/^\//, '') || (slug.length > 2 && s.includes(slug))
  })
}

export interface ReviewData {
  extractionDate: string
  sourceDomain: string
  pages: ReviewPage[]
  assets: ClassifiedAsset[]
  generated: GeneratedAsset[]
  assetSummary: Record<string, unknown>
  inspectedNotMigrated: unknown[]
  coverageDoc: string | null
  totals: {
    sourcePages: number
    contentBlocks: number
    migrated: number
    redirected: number
    withheld: number
    totalAssets: number
    distinctAssets: number
    safeAssets: number
    blockedAssets: number
    rejectedAssets: number
    peopleAssets: number
    childrenAssets: number
    publishedAssets: number
  }
}

export function loadReviewData(): ReviewData {
  const manifest = readJson<{
    extractionDate: string
    sourceDomain: string
    pages: ManifestPage[]
    inspectedNotMigrated: unknown[]
  }>('manifest.json')

  const assetsFile = readJson<{ assets: SourceAsset[]; summary: Record<string, unknown> }>('assets-inventory.json')
  const testimonialsFile = readJson<{ testimonials: Testimonial[] }>('testimonials.json')
  const faqsFile = readJson<{ sets: FaqSet[] }>('faqs.json')

  const assets = assetsFile.assets.map(classifyAsset)

  const pages: ReviewPage[] = manifest.pages.map((page) => {
    const markdown = page.localFile ? readTextIfPresent(path.join(process.cwd(), 'docs', 'source-content', page.localFile)) : null
    const legacyPath = pathOf(page.sourceUrl)
    const proposed = page.proposedNewRoute
    const redirectTo = REDIRECTS[legacyPath]

    /*
     * A page counts as built if EITHER the audit's proposed route exists, OR
     * the page kept its original URL and that URL is a built route.
     *
     * ⚠️ The second case is not an edge case — it is nine of the lesson pages.
     * The migration audit proposed nesting them (`/lessons/piano`); the build
     * deliberately kept the originals (`/piano-lessons`) to preserve whatever
     * standing those URLs already hold, which also removed nine redirects.
     * Comparing only against `proposedNewRoute` reported all nine as NOT BUILT
     * — a false gap, and exactly the kind of thing a review tool must not
     * invent.
     */
    const builtAtProposed = Boolean(proposed && (BUILT_ROUTES as readonly string[]).includes(proposed))
    const builtAtOriginal = (BUILT_ROUTES as readonly string[]).includes(legacyPath)
    const built = builtAtProposed || builtAtOriginal
    const actualRoute = builtAtProposed ? proposed : builtAtOriginal ? legacyPath : null

    let destinationNote: string
    if (builtAtProposed) {
      destinationNote = `Built and live at ${proposed}.`
    } else if (builtAtOriginal) {
      destinationNote = `Built and live at ${legacyPath} — it KEPT its original URL. The audit proposed ${proposed}; that nesting was deliberately not adopted, which preserved the URL's existing standing and removed the need for a redirect.`
    } else if (redirectTo) {
      destinationNote = `Not rebuilt as its own page — ${legacyPath} redirects (308) to ${redirectTo}, where its content was merged.`
    } else if (proposed) {
      destinationNote = `Proposed route ${proposed} is NOT built. Blocked or deliberately omitted — see the extracted content for what is being withheld.`
    } else {
      destinationNote =
        'No destination and no redirect. Deliberately omitted — this is a dead archive, an empty plugin route, or a separate property outside the rebuild scope.'
    }

    return {
      ...page,
      markdown,
      testimonials: testimonialsFile.testimonials.filter((t) => matchesPage(t.sourcePage, page)),
      faqSets: faqsFile.sets.filter((s) => matchesPage(s.appearsOn, page)),
      assets: assets.filter((a) => matchesPage(a.sourcePage, page)),
      built,
      actualRoute,
      destinationNote,
    }
  })

  const generated = loadGeneratedAssets()

  const blocked = assets.filter((a) => a.status === 'BLOCKED').length
  const rejected = assets.filter((a) => a.status === 'REJECTED').length
  const people = assets.filter((a) => a.identifiablePeople).length
  const children = assets.filter((a) => a.identifiableChildren).length

  return {
    extractionDate: manifest.extractionDate,
    sourceDomain: manifest.sourceDomain,
    pages,
    assets,
    generated,
    assetSummary: assetsFile.summary,
    inspectedNotMigrated: manifest.inspectedNotMigrated ?? [],
    coverageDoc: readTextIfPresent(
      path.join(process.cwd(), 'docs', 'implementation', 'content-migration-coverage.md'),
    ),
    totals: {
      sourcePages: manifest.pages.length,
      contentBlocks: pages.reduce(
        (n, p) => n + p.faqSets.reduce((m, s) => m + s.count, 0) + p.testimonials.length + (p.markdown ? 1 : 0),
        0,
      ),
      migrated: pages.filter((p) => p.built).length,
      redirected: pages.filter((p) => !p.built && REDIRECTS[pathOf(p.sourceUrl)]).length,
      withheld: pages.filter((p) => !p.built && !REDIRECTS[pathOf(p.sourceUrl)]).length,
      totalAssets: assets.length,
      distinctAssets: Number(assetsFile.summary.totalDistinctAssets ?? assets.length),
      safeAssets: generated.length,
      blockedAssets: blocked,
      rejectedAssets: rejected,
      peopleAssets: people,
      childrenAssets: children,
      publishedAssets: 0,
    },
  }
}
