import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, DeskSection, PageIntro, PointList } from '@/components/page'
import { bandBuilders } from '@/content/programs'
import { trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Band Builders',
  description:
    'A group music program where kids come together to play as a team, learning how bands work, timing and coordination.',
  path: '/programs/band-builders',
})

/**
 * /programs/band-builders — Tier 3.
 *
 * Source: https://southdademusic.com/band-builders/
 *
 * ## ⚠️ The performance qualifier is preserved exactly
 *
 * This page says performance opportunities "**may** include" recitals,
 * community events and small concerts. That is materially weaker than the
 * sitewide "every student performs in a live showcase" claim, and the
 * difference is the whole reason gate B-4 exists.
 *
 * The conditional ships exactly as written. Strengthening it to match the
 * footer would be choosing a side of an unresolved contradiction.
 *
 * ## ⚠️ No age range, no tuition
 *
 * The source states "kids and teens" with no numeric range, and no price. Both
 * absences are faithful.
 */
export default function BandBuildersPage() {
  return (
    <>
      <PageIntro eyebrow="Programs" heading={bandBuilders.name} lead={bandBuilders.lead}>
        <div className="mt-10">
          <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
            Book a Trial
          </Button>
        </div>
      </PageIntro>

      <DeskSection label="What students do" id="what-students-do" ruled={false}>
        <PointList items={bandBuilders.students} />
      </DeskSection>

      <DeskSection label="Who it is for" id="who-its-for">
        <PointList items={bandBuilders.audience} />
      </DeskSection>

      <DeskSection label="How it works" id="how-it-works">
        <ol>
          {bandBuilders.howItWorks.map((step, index) => (
            <li
              key={step}
              className="flex flex-wrap items-baseline gap-x-8 gap-y-1 border-t border-(--color-border-default) py-5 first:border-t-0 first:pt-0"
            >
              <span
                aria-hidden="true"
                className="w-8 shrink-0 font-display text-label uppercase tabular-nums text-(--color-text-muted)"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-body text-body-lg text-(--color-text-primary)">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
          Step two happens in{' '}
          <Link href="/private-lessons" className="text-(--color-text-primary) underline underline-offset-[6px]">
            private lessons
          </Link>
          .
        </p>
      </DeskSection>

      {/* The conditional, exactly as published. */}
      <DeskSection label="Performing" id="performance">
        <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
          {bandBuilders.performance.qualifier}
        </p>
        <PointList items={bandBuilders.performance.items} className="mt-6" />
      </DeskSection>

      <Movement name="band-cta" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>Start</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
                {trialOffer.terms}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
                  Book a Trial
                </Button>
                <Link
                  href="/programs"
                  className="font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
                >
                  All programmes
                </Link>
              </div>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
