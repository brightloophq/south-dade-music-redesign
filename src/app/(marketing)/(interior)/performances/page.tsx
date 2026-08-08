import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, PageIntro } from '@/components/page'
import { performances } from '@/content/about'
import { performanceEvidence } from '@/content/home'
import { trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Performances',
  description:
    'Students take part in recitals, community events and group showcases. Accounts from families who were in the room.',
  path: '/performances',
})

/**
 * /performances — Tier 3, and the thinnest page in the migration by necessity.
 *
 * ## What the source page contains
 *
 * Three slogan lines and a six-image slider. That is its complete content —
 * no event list, no dates, no venues, no recital schedule, no past-showcase
 * recap. For a business whose entire promise is a live showcase, the estate
 * publishes **zero event records**: `liveEventPages: 0`, `brokenEventPages: 2`.
 * Both event URLs return 404.
 *
 * ## ⚠️ Two gates make it thinner still
 *
 * **I-1 / I-7** block all six photographs — identifiable minors, no consent on
 * file, and unconfirmed photographer copyright.
 *
 * **I-4** means there is no dated event to publish. Announcing an upcoming
 * showcase would be inventing one.
 *
 * So the page ships the three verbatim lines, the showcase testimony that is
 * already the homepage's proof layer, and a plain statement of why there is no
 * gallery — rather than an empty slider or a fabricated calendar. This is the
 * documented fallback, not a placeholder.
 */
export default function PerformancesPage() {
  return (
    <>
      <PageIntro eyebrow={performances.eyebrow} heading={performances.heading}>
        {/* The three verbatim lines — the complete body copy of the source page. */}
        <div className="mt-8 flex flex-col gap-3">
          {performances.lines.map((line) => (
            <p
              key={line}
              className="max-w-[24ch] font-body text-display-md italic leading-[1.25] text-(--color-text-primary)"
            >
              {line}
            </p>
          ))}
        </div>
      </PageIntro>

      {/* Testimony instead of photography, because photography is blocked. */}
      <Movement name="evidence" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>{performanceEvidence.lead}</DeskLabel>
            <div className="max-w-[840px]">
              <ul className="flex flex-col gap-9">
                {performanceEvidence.quotes.map((quote) => (
                  <li key={quote.id}>
                    <blockquote className="max-w-[62ch] font-body text-body-lg italic text-(--color-text-primary)">
                      &ldquo;{quote.quote}&rdquo;
                    </blockquote>
                    <p className="mt-3 font-display text-label uppercase text-(--color-text-muted)">
                      {quote.author}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-11 max-w-[62ch] font-body text-body-sm text-(--color-text-muted)">
                {performances.note}
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>

      <Movement name="performances-cta" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>Take part</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
                Every programme here leads to a stage. The{' '}
                <Link
                  href="/programs/90-day-stage-program"
                  className="underline underline-offset-[6px]"
                >
                  90-Day Stage Program
                </Link>{' '}
                is built around it, and the summer camp ends in a concert.
              </p>
              <div className="mt-9">
                <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
                  Book a Trial
                </Button>
              </div>
              <p className="mt-6 max-w-[62ch] font-body text-body-md text-(--color-text-muted)">
                {trialOffer.terms}
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
