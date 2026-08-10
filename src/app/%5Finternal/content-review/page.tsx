import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { loadReviewData, REDIRECTS, type ClassifiedAsset, type ReviewPage } from '@/lib/internal/content-review-data'
import {
  ASSET_VERDICT_LABELS,
  DELIVERY_LABELS,
  EE3_ASSET_DECISIONS,
  MI1_DERIVATIVES,
  MI1_ROUTE_COVERAGE,
  EXPERIENCE_LABELS,
  ROUTE_DELIVERY,
  experienceTotals,
  rankedItems,
  type AssetVerdict,
  type DeliveryMode,
  type ExperienceStatus,
} from '@/lib/internal/experience-coverage'

/**
 * /_internal/content-review — **DEVELOPMENT ONLY**.
 *
 * A visual audit of everything Phase 2 extracted from the original
 * southdademusic.com, set beside what the rebuild actually renders, plus the
 * full asset disposition.
 *
 * ## Two dimensions, not one — added in EE1
 *
 * The tool originally answered one question: **was this content accounted
 * for?** That is a completeness ledger, and completeness ledgers lie by
 * omission. Band Builders scored `FULL` — page built, every verbatim line
 * shipped, listed in the navigation — while both hubs rendered it unlinked
 * with "Detail page not yet available". Nothing in this tool could have caught
 * that, because nothing in it asked whether a visitor could *get* there.
 *
 * The Experience coverage section asks the second question: **does a real
 * visitor meet this, and get any use out of it?** It records the state before
 * EE1 and the state now, so improvement has to be shown rather than asserted,
 * and it ranks the table worst-first so what is still failing cannot sink into
 * the middle of a long list.
 *
 * ## The folder is `%5Finternal`, not `_internal`
 *
 * Next.js treats a leading underscore as a **private folder** and opts it out
 * of routing entirely — `app/_internal/…` would produce no route at all.
 * `%5F` is the URL-encoded underscore, which produces the literal URL segment
 * `/_internal`. (`node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`.)
 *
 * ## Four independent reasons this cannot reach the public site
 *
 *   1. **404 in production** — `notFound()` fires when `NODE_ENV` is
 *      `production`, so even a deployed build serves a 404.
 *   2. **Never prerendered** — `dynamic = 'force-dynamic'` keeps it out of the
 *      static output entirely.
 *   3. **Not in navigation** — and the sitemap is built from `live` nav
 *      entries, so it cannot appear there. `/_internal` is additionally in
 *      `seoConfig.excludedPaths`.
 *   4. **noindex** — its own robots metadata, plus the sitewide
 *      `X-Robots-Tag` while indexing is off.
 *
 * ## Safety rules this page follows
 *
 * **No legacy image is ever rendered.** Not one `<img>` points at
 * southdademusic.com. Rendering a legacy asset would re-fetch an image nobody
 * has cleared — and would repeat the exact Phase 4D mistake in a tool built to
 * catch it. Blocked and rejected assets show **metadata only**, and their
 * source URLs are printed as inert text, never as a `src`.
 *
 * The only images rendered are the eight in-repo generated atmospherics, which
 * are abstract, contain no people, and were produced under a prompt-level
 * person guard.
 */

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Content review (internal)',
  robots: { index: false, follow: false, nocache: true },
}

const isDev = process.env.NODE_ENV !== 'production'

// ---------------------------------------------------------------------------
// Presentational atoms — plain, dense, deliberately NOT the approved design.
// This is a spreadsheet with opinions, not a page of the site.
// ---------------------------------------------------------------------------

function Pill({ tone, children }: { tone: 'ok' | 'warn' | 'bad' | 'mute' | 'info'; children: React.ReactNode }) {
  const tones = {
    ok: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    warn: 'bg-amber-100 text-amber-900 border-amber-300',
    bad: 'bg-red-100 text-red-900 border-red-300',
    mute: 'bg-neutral-100 text-neutral-700 border-neutral-300',
    info: 'bg-sky-100 text-sky-900 border-sky-300',
  }
  return (
    <span className={`inline-block rounded border px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  )
}

function YesNo({ value, badWhenTrue = false }: { value: boolean; badWhenTrue?: boolean }) {
  if (value) return <Pill tone={badWhenTrue ? 'bad' : 'ok'}>YES</Pill>
  return <Pill tone={badWhenTrue ? 'ok' : 'mute'}>NO</Pill>
}

function Stat({ label, value, tone = 'mute' }: { label: string; value: number | string; tone?: 'ok' | 'warn' | 'bad' | 'mute' }) {
  const tones = { ok: 'text-emerald-700', warn: 'text-amber-700', bad: 'text-red-700', mute: 'text-neutral-900' }
  return (
    <div className="rounded border border-neutral-300 bg-white p-3">
      <div className={`font-mono text-2xl font-bold ${tones[tone]}`}>{value}</div>
      <div className="mt-1 text-[11px] uppercase leading-tight tracking-wide text-neutral-600">{label}</div>
    </div>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-4">
      <h2 className="border-b-2 border-neutral-900 pb-1 text-xl font-bold text-neutral-900">{title}</h2>
      {children}
    </section>
  )
}

function statusTone(status: ClassifiedAsset['status']) {
  return status === 'BLOCKED' ? 'bad' : status === 'REJECTED' ? 'warn' : status === 'REPLACE' ? 'info' : 'mute'
}

/**
 * Experience status tones.
 *
 * `WITHHELD` and `OMITTED` are **info**, not warnings: a withheld tuition
 * figure is the system working. Only `BURIED` and `WEAK` are failures — content
 * that was migrated, is rendering, and is reaching nobody.
 */
function experienceTone(status: ExperienceStatus) {
  if (status === 'PROMINENT') return 'ok'
  if (status === 'BURIED') return 'bad'
  if (status === 'WEAK') return 'warn'
  return 'info'
}

function assetVerdictTone(v: AssetVerdict) {
  return v === 'APPROVED' ? 'ok' : v === 'OWNER_APPROVAL_REQUIRED' ? 'warn' : 'bad'
}

/** Delivery tones. `TEXT_ONLY` is amber — not broken, but not yet shown. */
function deliveryTone(mode: DeliveryMode) {
  if (mode === 'VISIBLE_EARLY' || mode === 'VISUALLY_SUPPORTED') return 'ok'
  if (mode === 'VISIBLE_LATE') return 'bad'
  if (mode === 'TEXT_ONLY') return 'warn'
  return 'info'
}

// ---------------------------------------------------------------------------
// Source page block
// ---------------------------------------------------------------------------

function PageBlock({ page }: { page: ReviewPage }) {
  const anchor = (page.localFile ?? page.sourceUrl).replace(/[^a-z0-9]+/gi, '-').toLowerCase()
  return (
    <article id={anchor} className="mt-8 scroll-mt-4 rounded border border-neutral-400 bg-white">
      <header className="border-b border-neutral-300 bg-neutral-50 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-bold text-neutral-900">{page.pageTitle}</h3>
          <Pill tone="mute">{page.pageType}</Pill>
          <Pill tone={page.migrationPriority === 'P0' ? 'bad' : page.migrationPriority === 'P1' ? 'warn' : 'mute'}>
            {page.migrationPriority}
          </Pill>
          {page.built ? <Pill tone="ok">MIGRATED → {page.actualRoute}</Pill> : <Pill tone="warn">NOT REBUILT</Pill>}
          {!page.uniqueContent && <Pill tone="mute">DUPLICATE</Pill>}
        </div>

        <dl className="mt-3 grid gap-x-6 gap-y-1 text-xs sm:grid-cols-[150px_minmax(0,1fr)]">
          <dt className="font-semibold text-neutral-600">Original URL</dt>
          <dd className="break-all font-mono text-neutral-900">{page.sourceUrl}</dd>

          <dt className="font-semibold text-neutral-600">Proposed route</dt>
          <dd className="font-mono text-neutral-900">{page.proposedNewRoute ?? '—'}</dd>

          <dt className="font-semibold text-neutral-600">Destination</dt>
          <dd className="text-neutral-900">{page.destinationNote}</dd>

          {page.duplicateOf && (
            <>
              <dt className="font-semibold text-neutral-600">Duplicate of</dt>
              <dd className="font-mono text-neutral-900">{page.duplicateOf}</dd>
            </>
          )}

          <dt className="font-semibold text-neutral-600">Extracted counts</dt>
          <dd className="text-neutral-900">
            {page.imagesFound} images · {page.videosFound} videos · {page.formsFound} forms · scraped {page.lastScrapedAt}
          </dd>
        </dl>
      </header>

      {/* Extracted content, verbatim. */}
      <details className="border-b border-neutral-200" open>
        <summary className="cursor-pointer bg-neutral-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-neutral-700">
          Extracted content — headings, body, FAQs, claims, CTAs (verbatim)
        </summary>
        {page.markdown ? (
          <pre className="max-h-[36rem] overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-[12px] leading-relaxed text-neutral-800">
            {page.markdown}
          </pre>
        ) : (
          <p className="p-4 text-xs text-neutral-600">
            No extracted markdown file. This page was inspected but not captured — usually because it rendered header and
            footer only.
          </p>
        )}
      </details>

      {/* FAQs attributed to this page. */}
      {page.faqSets.length > 0 && (
        <details className="border-b border-neutral-200">
          <summary className="cursor-pointer bg-neutral-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-neutral-700">
            FAQ sets on this page ({page.faqSets.reduce((n, s) => n + s.count, 0)} questions)
          </summary>
          <div className="p-4">
            {page.faqSets.map((set) => (
              <div key={set.setName} className="mb-4">
                <p className="text-xs font-bold text-neutral-900">
                  {set.setName} {set.identical && <Pill tone="mute">identical across {set.appearsOn.length} pages</Pill>}
                </p>
                {set.note && <p className="mt-1 text-xs italic text-amber-800">{set.note}</p>}
                <dl className="mt-2">
                  {set.faqs.map((f) => (
                    <div key={f.question} className="mb-2 border-l-2 border-neutral-300 pl-3">
                      <dt className="text-xs font-semibold text-neutral-900">{f.question}</dt>
                      <dd className="text-xs text-neutral-700">{f.answer}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Testimonials attributed to this page. */}
      {page.testimonials.length > 0 && (
        <details className="border-b border-neutral-200">
          <summary className="cursor-pointer bg-neutral-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-neutral-700">
            Testimonials on this page ({page.testimonials.length})
          </summary>
          <div className="p-4">
            {page.testimonials.map((t, i) => (
              <blockquote key={i} className="mb-3 border-l-2 border-sky-300 pl-3">
                <p className="text-xs text-neutral-800">“{t.testimonial}”</p>
                <footer className="mt-1 text-[11px] text-neutral-600">
                  — {t.reviewerName ?? 'unattributed'} · rendered {t.duplicateCount}× ·{' '}
                  {t.permissionOrVerificationNeeded ? (
                    <Pill tone="warn">permission / verification needed</Pill>
                  ) : (
                    <Pill tone="mute">no flag</Pill>
                  )}
                  {t.notes && <span className="italic"> · {t.notes}</span>}
                </footer>
              </blockquote>
            ))}
          </div>
        </details>
      )}

      {/* Assets found on this page — metadata only, never rendered. */}
      {page.assets.length > 0 && (
        <details>
          <summary className="cursor-pointer bg-neutral-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-neutral-700">
            Assets found on this page ({page.assets.length}) — metadata only, images never loaded
          </summary>
          <ul className="p-4">
            {page.assets.map((a) => (
              <li key={a.sourceUrl} className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                <Pill tone={statusTone(a.status)}>{a.status}</Pill>
                <span className="font-mono text-neutral-900">{a.fileName}</span>
                <span className="text-neutral-600">{a.provenanceClass}</span>
                {a.identifiablePeople && <Pill tone="bad">people</Pill>}
                {a.identifiableChildren && <Pill tone="bad">children</Pill>}
              </li>
            ))}
          </ul>
        </details>
      )}
    </article>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ContentReviewPage() {
  /*
   * Hard stop in production. This runs before any data is read, so a
   * production build never touches docs/source-content either.
   */
  if (!isDev) notFound()

  const data = loadReviewData()
  const t = data.totals
  const xp = experienceTotals()
  const xpItems = rankedItems()

  return (
    <main className="mx-auto max-w-[1500px] bg-neutral-50 p-6 font-sans text-neutral-900">
      <header className="rounded border-2 border-red-500 bg-red-50 p-4">
        <h1 className="text-2xl font-bold text-red-900">Content review — INTERNAL, DEVELOPMENT ONLY</h1>
        <p className="mt-2 max-w-[110ch] text-sm text-red-900">
          This route returns <strong>404 in production</strong>, is absent from navigation and the sitemap, and carries{' '}
          <code className="font-mono">noindex, nofollow</code>. It exists to review the Phase 2 extraction of{' '}
          <span className="font-mono">{data.sourceDomain}</span> (extracted {data.extractionDate}) against what the
          rebuild actually renders.
        </p>
        <p className="mt-2 max-w-[110ch] text-sm font-semibold text-red-900">
          ⚠️ No legacy image is loaded anywhere on this page. Blocked and rejected assets show metadata only; their URLs
          are inert text, never an image source. Only the eight in-repo generated atmospherics — abstract, no people —
          are rendered as thumbnails.
        </p>
      </header>

      {/* ---- Summary ---- */}
      <Section id="summary" title="Summary">
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Stat label="Source pages extracted" value={t.sourcePages} />
          <Stat label="Content blocks" value={t.contentBlocks} />
          <Stat label="Pages rebuilt" value={t.migrated} tone="ok" />
          <Stat label="Merged via redirect" value={t.redirected} tone="mute" />
          <Stat label="Not rebuilt / withheld" value={t.withheld} tone="warn" />
          <Stat label="Routes live now" value={27} tone="ok" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Stat label="Asset entries" value={t.totalAssets} />
          <Stat label="Distinct assets" value={t.distinctAssets} />
          <Stat label="Safe assets (in repo)" value={t.safeAssets} tone="ok" />
          <Stat label="Blocked assets" value={t.blockedAssets} tone="bad" />
          <Stat label="Rejected assets" value={t.rejectedAssets} tone="warn" />
          <Stat label="Published assets" value={t.publishedAssets} tone="ok" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Assets depicting people" value={t.peopleAssets} tone="bad" />
          <Stat label="Assets depicting children" value={t.childrenAssets} tone="bad" />
          <Stat label="Legacy assets with a local copy" value={0} tone="ok" />
          <Stat label="<img> tags rendered site-wide" value={0} tone="ok" />
        </div>

        <nav className="mt-5 flex flex-wrap gap-3 text-sm">
          <a className="underline" href="#experience">Experience coverage</a>
          <a className="underline" href="#asset-decisions">Source-asset decisions</a>
          <a className="underline" href="#by-source-page">By source page</a>
          <a className="underline" href="#destinations">Current destinations</a>
          <a className="underline" href="#assets">Asset review</a>
          <a className="underline" href="#generated">Generated assets</a>
          <a className="underline" href="#coverage">Coverage audit</a>
        </nav>
      </Section>

      {/* ---- Experience coverage — EE1 ---- */}
      <Section id="experience" title="Experience coverage — does a visitor actually meet this?">
        <div className="mt-3 rounded border-2 border-sky-400 bg-sky-50 p-3 text-sm text-sky-950">
          <p>
            <strong>Migration status answers “did we account for the information?”</strong> By that
            measure the rebuild sits at ~95%. <strong>Experience status answers “does a real
            visitor meet this, and get any use out of it?”</strong> The two came apart badly.
          </p>
          <p className="mt-2">
            Band Builders was recorded <code className="font-mono">FULL</code> — page built, every
            verbatim line shipped, in the navigation — while both hubs rendered it{' '}
            <strong>unlinked, reading “Detail page not yet available”</strong>. Migration-complete
            and experientially absent. Two more programmes had the identical defect.
          </p>
          <p className="mt-2">
            <strong>These are judgements, not measurements.</strong> Nothing below is computed, and
            they were made by whoever did the work — which is the least trustworthy kind of
            assessment. They are written down per row so you can disagree with a specific row.
          </p>
        </div>

        {/* ---- EE2: per-route delivery ---- */}
        <h3 className="mt-8 text-base font-bold text-neutral-900">
          By route — how the page actually delivers
        </h3>
        <p className="mt-1 max-w-[110ch] text-sm text-neutral-700">
          Item-level status could not tell <strong>&ldquo;a visitor meets this in the first
          screen&rdquo;</strong> apart from <strong>&ldquo;this is genuinely present, nine screens
          down&rdquo;</strong> — EE1 put eight homepage enrichments below 9,102px and honestly
          reported every one as prominent. Nor could it say that the site was serving{' '}
          <strong>zero images on every route</strong>. Measured in a real browser at 1440×900.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1400px] border-collapse text-[11px]">
            <thead>
              <tr className="bg-neutral-200 text-left">
                <th className="border border-neutral-300 p-2">Route</th>
                <th className="border border-neutral-300 p-2">Migration</th>
                <th className="border border-neutral-300 p-2">First business signal</th>
                <th className="border border-neutral-300 p-2">Height</th>
                <th className="border border-neutral-300 p-2">Words</th>
                <th className="border border-neutral-300 p-2">Words / 1000px</th>
                <th className="border border-neutral-300 p-2">Images loaded</th>
                <th className="border border-neutral-300 p-2">Delivery</th>
                <th className="border border-neutral-300 p-2">Assessment</th>
              </tr>
            </thead>
            <tbody>
              {ROUTE_DELIVERY.map((r) => {
                const density = r.words / (r.heightPx / 1000)
                return (
                  <tr key={r.route} className="align-top odd:bg-white even:bg-neutral-50">
                    <td className="border border-neutral-300 p-2 font-mono font-bold">{r.route}</td>
                    <td className="border border-neutral-300 p-2">{r.migration}</td>
                    <td className="border border-neutral-300 p-2 font-mono">
                      {r.firstSignalPx === null ? '—' : `${r.firstSignalPx}px`}
                    </td>
                    <td className="border border-neutral-300 p-2 font-mono">{r.heightPx}px</td>
                    <td className="border border-neutral-300 p-2 font-mono">{r.words}</td>
                    <td className="border border-neutral-300 p-2">
                      <Pill tone={density < 50 ? 'warn' : density < 70 ? 'mute' : 'ok'}>
                        {density.toFixed(0)}
                      </Pill>
                    </td>
                    <td className="border border-neutral-300 p-2">
                      <Pill tone={r.imagesLoaded > 0 ? 'ok' : 'bad'}>{r.imagesLoaded}</Pill>
                    </td>
                    <td className="border border-neutral-300 p-2">
                      <span className="flex flex-wrap gap-1">
                        {r.modes.map((m) => (
                          <Pill key={m} tone={deliveryTone(m)}>
                            {DELIVERY_LABELS[m]}
                          </Pill>
                        ))}
                      </span>
                    </td>
                    <td className="max-w-[460px] border border-neutral-300 p-2 text-neutral-700">
                      {r.note}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <h3 className="mt-10 text-base font-bold text-neutral-900">By content item</h3>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Stat label="Items assessed" value={xp.total} />
          <Stat label="Reaching a visitor now" value={xp.reaching} tone="ok" />
          <Stat label="Still buried or weak" value={xp.stillShort} tone={xp.stillShort > 0 ? 'warn' : 'ok'} />
          <Stat label="Withheld / omitted by design" value={xp.byDesign} tone="mute" />
          <Stat label="Improved in EE1" value={xp.improved} tone="ok" />
          <Stat label="Regressed in EE1" value={xp.regressed} tone={xp.regressed > 0 ? 'bad' : 'ok'} />
        </div>

        {/* Before / after, per state. */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-xs">
            <thead>
              <tr className="bg-neutral-200 text-left">
                <th className="border border-neutral-300 p-2">Experience state</th>
                <th className="border border-neutral-300 p-2">Before EE1</th>
                <th className="border border-neutral-300 p-2">After EE1</th>
                <th className="border border-neutral-300 p-2">Change</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(EXPERIENCE_LABELS) as ExperienceStatus[]).map((state) => {
                const delta = xp.after[state] - xp.before[state]
                return (
                  <tr key={state} className="odd:bg-white even:bg-neutral-50">
                    <td className="border border-neutral-300 p-2">
                      <Pill tone={experienceTone(state)}>{EXPERIENCE_LABELS[state]}</Pill>
                    </td>
                    <td className="border border-neutral-300 p-2 font-mono">{xp.before[state]}</td>
                    <td className="border border-neutral-300 p-2 font-mono font-bold">{xp.after[state]}</td>
                    <td className="border border-neutral-300 p-2 font-mono">
                      {delta === 0 ? '—' : delta > 0 ? `+${delta}` : delta}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 max-w-[110ch] text-sm text-neutral-700">
          Rows are ranked <strong>worst first</strong>, permanently — anything still buried or
          weakly expressed sits at the top of this table and cannot drift into the middle of a long
          list as the site improves.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1500px] border-collapse text-[11px]">
            <thead>
              <tr className="bg-neutral-200 text-left">
                <th className="border border-neutral-300 p-2">Experience now</th>
                <th className="border border-neutral-300 p-2">Before EE1</th>
                <th className="border border-neutral-300 p-2">Migration</th>
                <th className="border border-neutral-300 p-2">Category</th>
                <th className="border border-neutral-300 p-2">Content</th>
                <th className="border border-neutral-300 p-2">Where a visitor meets it</th>
                <th className="border border-neutral-300 p-2">What they actually see</th>
                <th className="border border-neutral-300 p-2">Assessment</th>
                <th className="border border-neutral-300 p-2">Gate</th>
              </tr>
            </thead>
            <tbody>
              {xpItems.map((item) => (
                <tr key={item.id} className="align-top odd:bg-white even:bg-neutral-50">
                  <td className="border border-neutral-300 p-2">
                    <Pill tone={experienceTone(item.after)}>{EXPERIENCE_LABELS[item.after]}</Pill>
                  </td>
                  <td className="border border-neutral-300 p-2">
                    {item.before === item.after ? (
                      <span className="text-neutral-500">unchanged</span>
                    ) : (
                      <Pill tone="mute">{EXPERIENCE_LABELS[item.before]}</Pill>
                    )}
                  </td>
                  <td className="border border-neutral-300 p-2 font-mono">{item.migration}</td>
                  <td className="border border-neutral-300 p-2">{item.category}</td>
                  <td className="border border-neutral-300 p-2 font-semibold text-neutral-900">{item.item}</td>
                  <td className="border border-neutral-300 p-2 font-mono text-neutral-700">
                    {item.routes.length ? item.routes.join(' · ') : <span className="text-neutral-400">nowhere</span>}
                  </td>
                  <td className="max-w-[360px] border border-neutral-300 p-2">{item.evidence}</td>
                  <td className="max-w-[420px] border border-neutral-300 p-2 text-neutral-700">{item.note}</td>
                  <td className="border border-neutral-300 p-2">
                    {item.gate ? <Pill tone="warn">{item.gate}</Pill> : <span className="text-neutral-400">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ---- Destinations ---- */}
      <Section id="destinations" title="Current destinations — where each source page ended up">
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-xs">
            <thead>
              <tr className="bg-neutral-200 text-left">
                <th className="border border-neutral-300 p-2">Original URL</th>
                <th className="border border-neutral-300 p-2">Proposed route (audit)</th>
                <th className="border border-neutral-300 p-2">Actual route (live)</th>
                <th className="border border-neutral-300 p-2">Status</th>
                <th className="border border-neutral-300 p-2">What happened to the content</th>
              </tr>
            </thead>
            <tbody>
              {data.pages.map((p) => (
                <tr key={p.sourceUrl} className="align-top odd:bg-white even:bg-neutral-50">
                  <td className="break-all border border-neutral-300 p-2 font-mono">{p.sourceUrl}</td>
                  <td className="border border-neutral-300 p-2 font-mono">{p.proposedNewRoute ?? '—'}</td>
                  <td className="border border-neutral-300 p-2 font-mono font-bold">{p.actualRoute ?? '—'}</td>
                  <td className="border border-neutral-300 p-2">
                    {p.built ? (
                      <Pill tone="ok">BUILT</Pill>
                    ) : REDIRECTS[new URL(p.sourceUrl).pathname.replace(/\/$/, '') || '/'] ? (
                      <Pill tone="info">REDIRECTED</Pill>
                    ) : (
                      <Pill tone="warn">OMITTED</Pill>
                    )}
                  </td>
                  <td className="border border-neutral-300 p-2">{p.destinationNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.inspectedNotMigrated.length > 0 && (
          <details className="mt-4 rounded border border-neutral-300 bg-white">
            <summary className="cursor-pointer bg-neutral-100 px-4 py-2 text-xs font-bold uppercase tracking-wide">
              Inspected but not migrated ({data.inspectedNotMigrated.length})
            </summary>
            <pre className="max-h-96 overflow-auto whitespace-pre-wrap p-4 font-mono text-[12px]">
              {JSON.stringify(data.inspectedNotMigrated, null, 2)}
            </pre>
          </details>
        )}
      </Section>

      {/* ---- By source page ---- */}
      <Section id="by-source-page" title={`Content by source page (${data.pages.length})`}>
        <p className="mt-2 max-w-[100ch] text-sm text-neutral-700">
          Each block is one original page: its URL, its destination, and the <strong>complete extracted content</strong>{' '}
          verbatim — headings, body copy, FAQs, preserved exact claims, CTAs and withheld items with their reasons. The
          markdown is shown as extracted rather than reformatted, so nothing is lost in translation.
        </p>
        {data.pages.map((p) => (
          <PageBlock key={p.sourceUrl} page={p} />
        ))}
      </Section>

      {/* ---- Assets ---- */}
      <Section id="assets" title={`Asset review — every asset in assets-inventory.json (${data.assets.length} entries)`}>
        <div className="mt-3 rounded border-2 border-red-400 bg-red-50 p-3 text-sm text-red-900">
          <strong>Metadata only.</strong> Not one of these images is fetched or displayed. Four files from this inventory
          were once described as “icons” from their filenames, retrieved, and turned out to be photographs of
          identifiable people — two including children. They were deleted on 2026-08-09. The classification below errs
          toward the restrictive answer wherever the extraction is ambiguous.
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1800px] border-collapse text-[11px]">
            <thead>
              <tr className="bg-neutral-200 text-left">
                <th className="border border-neutral-300 p-2">Status</th>
                <th className="border border-neutral-300 p-2">Filename</th>
                <th className="border border-neutral-300 p-2">Type</th>
                <th className="border border-neutral-300 p-2">Classification</th>
                <th className="border border-neutral-300 p-2">People</th>
                <th className="border border-neutral-300 p-2">Children</th>
                <th className="border border-neutral-300 p-2">Local copy</th>
                <th className="border border-neutral-300 p-2">Published</th>
                <th className="border border-neutral-300 p-2">Consent</th>
                <th className="border border-neutral-300 p-2">Licensing</th>
                <th className="border border-neutral-300 p-2">Destination</th>
                <th className="border border-neutral-300 p-2">Reason not published</th>
                <th className="border border-neutral-300 p-2">Source page(s)</th>
                <th className="border border-neutral-300 p-2">Original URL (inert text)</th>
              </tr>
            </thead>
            <tbody>
              {data.assets.map((a) => (
                <tr key={a.sourceUrl} className="align-top odd:bg-white even:bg-neutral-50">
                  <td className="border border-neutral-300 p-2"><Pill tone={statusTone(a.status)}>{a.status}</Pill></td>
                  <td className="border border-neutral-300 p-2 font-mono">{a.fileName}</td>
                  <td className="border border-neutral-300 p-2">{a.assetType}</td>
                  <td className="border border-neutral-300 p-2">{a.provenanceClass}</td>
                  <td className="border border-neutral-300 p-2"><YesNo value={a.identifiablePeople} badWhenTrue /></td>
                  <td className="border border-neutral-300 p-2"><YesNo value={a.identifiableChildren} badWhenTrue /></td>
                  <td className="border border-neutral-300 p-2"><YesNo value={a.localCopy} /></td>
                  <td className="border border-neutral-300 p-2"><YesNo value={a.published} /></td>
                  <td className="border border-neutral-300 p-2">{a.consentStatus}</td>
                  <td className="border border-neutral-300 p-2">{a.licensingStatus}</td>
                  <td className="border border-neutral-300 p-2">{a.currentDestination}</td>
                  <td className="border border-neutral-300 p-2">{a.reasonNotPublished}</td>
                  <td className="border border-neutral-300 p-2">
                    {(Array.isArray(a.sourcePage) ? a.sourcePage : [a.sourcePage]).join(', ')}
                  </td>
                  <td className="max-w-[320px] break-all border border-neutral-300 p-2 font-mono text-neutral-500">
                    {a.sourceUrl}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <details className="mt-4 rounded border border-neutral-300 bg-white">
          <summary className="cursor-pointer bg-neutral-100 px-4 py-2 text-xs font-bold uppercase tracking-wide">
            Extraction summary and critical findings
          </summary>
          <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap p-4 font-mono text-[12px]">
            {JSON.stringify(data.assetSummary, null, 2)}
          </pre>
        </details>
      </Section>

      {/* ---- EE3: source-asset decisions ---- */}
      <Section id="asset-decisions" title="Source-asset decisions — EE3">
        <div className="mt-3 rounded border-2 border-amber-500 bg-amber-50 p-3 text-sm text-amber-950">
          <p>
            <strong>Not one legacy South Dade Music image exists in this repository.</strong> The only
            image files present are the generated plates. &ldquo;Re-open and inspect the extracted
            images&rdquo; is therefore not executable for legacy assets — obtaining them would mean
            downloading 77 files from the live site, creating a second uncleared copy of material
            gated under I-1 and I-7. That is precisely the Phase 4D mistake.
          </p>
          <p className="mt-2">
            What can be audited is the evidence, and it is unreliable in a provable way:{' '}
            <strong>
              four files this inventory labels <code className="font-mono">assetType: &quot;icon&quot;</code>{' '}
              were downloaded in Phase 4D and proved to be photographs of identifiable people, two
              including children.
            </strong>{' '}
            So no asset can be promoted on the strength of its recorded type — including the seven
            &ldquo;instrument tiles&rdquo;, which carry the same label and the same absence of
            evidence.
          </p>
          <p className="mt-2">
            The one row an evidence audit does move is the wordmark: its ownership flag is the only
            legacy asset marked as <em>not</em> needing confirmation. It is still unpublished, but
            for design reasons (raster, gate D-1, gate B-5) rather than provenance.
          </p>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1600px] border-collapse text-[11px]">
            <thead>
              <tr className="bg-neutral-200 text-left">
                <th className="border border-neutral-300 p-2">EE3 verdict</th>
                <th className="border border-neutral-300 p-2">Thumbnail</th>
                <th className="border border-neutral-300 p-2">Asset</th>
                <th className="border border-neutral-300 p-2">#</th>
                <th className="border border-neutral-300 p-2">Source</th>
                <th className="border border-neutral-300 p-2">What it depicts</th>
                <th className="border border-neutral-300 p-2">People</th>
                <th className="border border-neutral-300 p-2">Minors</th>
                <th className="border border-neutral-300 p-2">Provenance</th>
                <th className="border border-neutral-300 p-2">Previous</th>
                <th className="border border-neutral-300 p-2">Reason</th>
                <th className="border border-neutral-300 p-2">Destination</th>
                <th className="border border-neutral-300 p-2">Published</th>
              </tr>
            </thead>
            <tbody>
              {EE3_ASSET_DECISIONS.map((a) => (
                <tr key={a.id} className="align-top odd:bg-white even:bg-neutral-50">
                  <td className="border border-neutral-300 p-2">
                    <Pill tone={assetVerdictTone(a.verdict)}>{ASSET_VERDICT_LABELS[a.verdict]}</Pill>
                  </td>
                  <td className="border border-neutral-300 p-2">
                    {a.thumbnail ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={a.thumbnail}
                        alt={`Decorative generated plate: ${a.id}`}
                        className="h-16 w-24 rounded object-cover"
                      />
                    ) : (
                      <span className="text-neutral-400">no local copy</span>
                    )}
                  </td>
                  <td className="border border-neutral-300 p-2 font-mono font-semibold">{a.id}</td>
                  <td className="border border-neutral-300 p-2 font-mono">{a.count}</td>
                  <td className="border border-neutral-300 p-2">{a.source}</td>
                  <td className="max-w-[240px] border border-neutral-300 p-2">{a.depicts}</td>
                  <td className="border border-neutral-300 p-2">
                    <Pill tone={a.people === 'yes' ? 'bad' : a.people === 'unknown' ? 'warn' : 'ok'}>
                      {a.people}
                    </Pill>
                  </td>
                  <td className="border border-neutral-300 p-2">
                    <Pill tone={a.minors === 'yes' ? 'bad' : a.minors === 'unknown' ? 'warn' : 'ok'}>
                      {a.minors}
                    </Pill>
                  </td>
                  <td className="max-w-[190px] border border-neutral-300 p-2">{a.provenance}</td>
                  <td className="border border-neutral-300 p-2 text-neutral-600">{a.previous}</td>
                  <td className="max-w-[420px] border border-neutral-300 p-2 text-neutral-700">
                    {a.reason}
                  </td>
                  <td className="max-w-[200px] border border-neutral-300 p-2 font-mono">
                    {a.destination}
                  </td>
                  <td className="border border-neutral-300 p-2">
                    <YesNo value={a.published} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ---- Generated (safe) assets ---- */}
      <Section id="generated" title={`Generated atmospherics — the only images in the repo (${data.generated.length})`}>
        <p className="mt-2 max-w-[100ch] text-sm text-neutral-700">
          Abstract, decorative, <code className="font-mono">aria-hidden</code>, produced under a prompt-level person
          guard. These are safe to display, so they are the only thumbnails on this page. All are{' '}
          <strong>pending owner art-direction review</strong> — that status is about whether they are wanted, not about
          whether they are safe.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.generated.map((g) => (
            <figure key={g.file} className="rounded border border-neutral-300 bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.publicPath}
                alt={`Decorative generated texture: ${g.purpose}`}
                className="h-40 w-full rounded object-cover"
              />
              <figcaption className="mt-2 text-[11px] leading-snug text-neutral-700">
                <span className="block font-mono font-bold text-neutral-900">{g.file}</span>
                <span className="block">{g.purpose}</span>
                <span className="mt-1 block">
                  {g.page} · {g.section} · {(g.byteSize / 1024 / 1024).toFixed(1)} MB
                </span>
                <span className="mt-1 flex flex-wrap gap-1">
                  <Pill tone="warn">{g.approvalStatus}</Pill>
                  <Pill tone="mute">{g.register}</Pill>
                  <Pill tone="ok">no minors</Pill>
                  <Pill tone="ok">{g.licence}</Pill>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ---- MI1 authentic media ---- */}
      <Section id="mi1" title="MI1 — authentic media integration preview (UNCLEARED)">
        <div className="mt-3 rounded border-2 border-red-700 bg-red-50 p-4">
          <p className="text-sm font-bold text-red-900">
            Nothing in this section is approved to publish.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-red-900">
            Every row is a derivative of legacy southdademusic.com photography. The business&rsquo;s
            right to license that photography is unconfirmed (gate I-7), so a row that looks good
            here is still blocked. The bytes are not in this repository: they live in{' '}
            <code className="font-mono">.audit/media-review/</code>, which is gitignored, and reach
            a browser only through the development-only handler at{' '}
            <code className="font-mono">/_media-review/[asset]</code>, which 404s in production.
            There are deliberately no thumbnails in this table — serving them from{' '}
            <code className="font-mono">public/</code> is precisely the Phase 4D exposure. Open the
            routes in <code className="font-mono">next dev</code> instead.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <Stat label="Derivatives generated" value={MI1_DERIVATIVES.length} />
          <Stat
            label="Currently rendered"
            value={MI1_DERIVATIVES.filter((d) => d.inUse).length}
            tone="ok"
          />
          <Stat
            label="Rejected on inspection"
            value={MI1_DERIVATIVES.filter((d) => !d.inUse).length}
            tone="warn"
          />
          <Stat
            label="Routes with authentic media"
            value={`${MI1_ROUTE_COVERAGE.filter((r) => r.authentic > 0).length}/${MI1_ROUTE_COVERAGE.length}`}
          />
          <Stat label="Production-approved" value={0} tone="bad" />
        </div>

        <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-neutral-900">
          Source → crop → route → role
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[1500px] border-collapse text-[11px]">
            <thead>
              <tr className="bg-neutral-200 text-left">
                <th className="border border-neutral-300 p-2">Derivative</th>
                <th className="border border-neutral-300 p-2">Tier</th>
                <th className="border border-neutral-300 p-2">Source</th>
                <th className="border border-neutral-300 p-2">Crop</th>
                <th className="border border-neutral-300 p-2">Output</th>
                <th className="border border-neutral-300 p-2">Route</th>
                <th className="border border-neutral-300 p-2">Design role</th>
                <th className="border border-neutral-300 p-2">Face-free?</th>
                <th className="border border-neutral-300 p-2">In use?</th>
                <th className="border border-neutral-300 p-2">Status</th>
                <th className="border border-neutral-300 p-2">Approval required?</th>
              </tr>
            </thead>
            <tbody>
              {MI1_DERIVATIVES.map((d) => (
                <tr key={d.id} className="align-top odd:bg-white even:bg-neutral-50">
                  <td className="border border-neutral-300 p-2 font-mono font-semibold">{d.id}</td>
                  <td className="border border-neutral-300 p-2">
                    <Pill tone={d.tier === 'A' ? 'ok' : d.tier === 'B' ? 'warn' : 'bad'}>
                      {d.tier}
                    </Pill>
                  </td>
                  <td className="max-w-[200px] border border-neutral-300 p-2">
                    <span className="font-mono">#{d.sourceIndex}</span> {d.sourceFilename}
                    <span className="block text-neutral-500">{d.sourceDimensions}</span>
                  </td>
                  <td className="max-w-[190px] border border-neutral-300 p-2">{d.crop}</td>
                  <td className="border border-neutral-300 p-2 font-mono">{d.outputDimensions}</td>
                  <td className="border border-neutral-300 p-2 font-mono">
                    {d.route ?? <span className="text-neutral-400">none</span>}
                  </td>
                  <td className="max-w-[220px] border border-neutral-300 p-2">{d.designRole}</td>
                  <td className="border border-neutral-300 p-2">
                    <YesNo value={d.faceFree} />
                  </td>
                  <td className="border border-neutral-300 p-2">
                    <YesNo value={d.inUse} />
                  </td>
                  <td className="max-w-[330px] border border-neutral-300 p-2 leading-relaxed">
                    {d.status}
                  </td>
                  <td className="border border-neutral-300 p-2">
                    <Pill tone="bad">REQUIRED</Pill>
                    <span className="mt-1 block text-neutral-600">{d.gate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-neutral-900">
          Authentic media coverage, per route
        </h3>
        <p className="mt-2 max-w-[80ch] text-[13px] leading-relaxed text-neutral-700">
          Counted in a real browser at 1440×900 and 390×844 after a full scroll, not counted from
          source. The two zero rows are the honest result: they are where the design wants a
          photograph and the estate does not have one.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr className="bg-neutral-200 text-left">
                <th className="border border-neutral-300 p-2">Route</th>
                <th className="border border-neutral-300 p-2">Authentic</th>
                <th className="border border-neutral-300 p-2">Generated</th>
                <th className="border border-neutral-300 p-2">Why none</th>
              </tr>
            </thead>
            <tbody>
              {MI1_ROUTE_COVERAGE.map((r) => (
                <tr key={r.route} className="align-top odd:bg-white even:bg-neutral-50">
                  <td className="border border-neutral-300 p-2 font-mono font-semibold">
                    {r.route}
                  </td>
                  <td className="border border-neutral-300 p-2">
                    <Pill tone={r.authentic > 0 ? 'ok' : 'bad'}>{r.authentic}</Pill>
                  </td>
                  <td className="border border-neutral-300 p-2 font-mono">{r.generated}</td>
                  <td className="max-w-[640px] border border-neutral-300 p-2 leading-relaxed">
                    {r.note ?? <span className="text-neutral-400">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ---- Coverage audit ---- */}
      <Section id="coverage" title="Content migration coverage audit (verbatim)">
        {data.coverageDoc ? (
          <details className="mt-3 rounded border border-neutral-300 bg-white">
            <summary className="cursor-pointer bg-neutral-100 px-4 py-2 text-xs font-bold uppercase tracking-wide">
              docs/implementation/content-migration-coverage.md
            </summary>
            <pre className="max-h-[40rem] overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-[12px] leading-relaxed">
              {data.coverageDoc}
            </pre>
          </details>
        ) : (
          <p className="mt-3 text-sm text-neutral-600">Coverage document not found.</p>
        )}
      </Section>

      <footer className="mt-12 border-t border-neutral-300 pt-4 text-xs text-neutral-600">
        Internal tool · not part of the approved public design · 404s in production · not in nav, sitemap or index.
      </footer>
    </main>
  )
}
