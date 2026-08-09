import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, DeskSection, PageIntro, PointList } from '@/components/page'
import { earlyChildhood } from '@/content/programs'
import { trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Early Childhood',
  description:
    'Play-based group music classes for children around ages 3 to 6 — singing, movement, rhythm and first instruments.',
  path: '/programs/early-childhood',
})

/**
 * /programs/early-childhood — Tier 3.
 *
 * Source: https://southdademusic.com/early-childhood/
 *
 * ## The expectation-setting line is the point of this page
 *
 * "We do not expect kids to master instruments at this age. That comes later.
 * Right now, they just explore." It is the most reassuring sentence in the
 * estate for the parent of a three-year-old, and it is set at statement scale
 * rather than buried in a list.
 *
 * ## ⚠️ No tuition
 *
 * Gate B-8. Not published for this or any other programme.
 */
export default function EarlyChildhoodPage() {
  return (
    <>
      <PageIntro eyebrow="Programs" heading={earlyChildhood.name} lead={earlyChildhood.lead}>
        <div className="mt-10">
          <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
            Book a Trial
          </Button>
        </div>
      </PageIntro>

      <DeskSection label="What happens in class" id="in-class" ruled={false}>
        <PointList items={earlyChildhood.inClass} />
        <p className="mt-8 max-w-[62ch] font-body text-body-lg italic text-(--color-text-secondary)">
          {earlyChildhood.activeNote}
        </p>
      </DeskSection>

      <DeskSection label="Learning to be around others" id="social">
        <PointList items={earlyChildhood.social} />
      </DeskSection>

      <DeskSection label="First instruments" id="first-instruments">
        <PointList items={earlyChildhood.firstInstruments} />
        {/* The sentence a worried parent needs, at statement scale. */}
        <p className="mt-10 max-w-[46ch] font-display text-display-md leading-[1.25] text-(--color-text-primary)">
          {earlyChildhood.expectation}
        </p>
      </DeskSection>

      <DeskSection label="For parents" id="parents">
        <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
          {earlyChildhood.parents}
        </p>
      </DeskSection>

      <Movement name="early-cta" ground="house" className="pb-(--section-feature)">
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
                  className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
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
