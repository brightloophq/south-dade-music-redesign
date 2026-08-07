import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, DeskSection, PageIntro, PointList } from '@/components/page'
import { instrumentPages, keyboardGap, privateLessons } from '@/content/lessons'
import { trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Private lessons',
  description:
    'One-on-one instruction for kids, teens and adults across seven instruments, with a progression path from trial lesson to live performance.',
  path: '/private-lessons',
})

/**
 * /private-lessons — Tier 2.
 *
 * Source: https://southdademusic.com/private-lessons/
 * Original URL retained, so no redirect is required.
 *
 * ## This page carries the estate's only scholarship mention on a programme page
 *
 * `/private-lessons/` is the one programme page of six that says anything about
 * PEP or UA. That line ships verbatim and links to `/scholarships`, which the
 * source never did.
 *
 * ## The learning path is the spine
 *
 * Trial → weekly lessons → group programmes or bands → perform live. The source
 * states this path and then links to none of the things it names. Every step
 * here goes somewhere real.
 *
 * ## Deliberately absent
 *
 * No tuition and no lesson length — gate B-8, and lesson duration (30/45/60
 * min) is never stated anywhere in the estate for any programme.
 */
export default function PrivateLessonsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Lesson format"
        heading="Private lessons."
        lead={privateLessons.summary}
      >
        <div className="mt-10">
          <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
            Book a Trial
          </Button>
        </div>
      </PageIntro>

      <Movement name="at-a-glance" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-2">
              <DeskLabel>At a glance</DeskLabel>
            </div>
            <dl className="max-w-[840px]">
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5 first:border-t-0 first:pt-0">
                <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Who it is for
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {privateLessons.targetAge}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Format
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {privateLessons.lessonFormat}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Frequency
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {privateLessons.frequency}
                </dd>
              </div>
            </dl>
          </div>
        </FilmMargin>
      </Movement>

      {/* The path. Every step links to the thing it names. */}
      <DeskSection label="How it progresses" id="learning-path">
        <ol>
          {privateLessons.learningPath.map((step, index) => (
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
      </DeskSection>

      <DeskSection label="Instruments" id="instruments">
        <p className="font-body text-display-md italic leading-[1.35] text-(--color-text-primary)">
          {instrumentPages.map((instrument, index) => (
            <span key={instrument.id}>
              <Link href={instrument.route} className="underline-offset-[6px] hover:underline">
                {instrument.name}
              </Link>
              {index < instrumentPages.length - 1 ? (
                <span aria-hidden="true" className="text-(--color-text-muted)">
                  {' · '}
                </span>
              ) : null}
            </span>
          ))}
        </p>
        {/*
          Keyboard is listed on the source page's instrument list and has no
          page of its own. Named, because it is offered; unlinked, because
          there is nothing to link to.
        */}
        <p className="mt-5 font-display text-label uppercase text-(--color-text-muted)">
          {keyboardGap.name} — {keyboardGap.status}
        </p>
      </DeskSection>

      <DeskSection label="Where it leads" id="performance">
        <PointList items={privateLessons.performance} />
      </DeskSection>

      <DeskSection label="How we work" id="flexibility">
        <PointList items={privateLessons.flexibility} />
      </DeskSection>

      {/* The only scholarship mention on any programme page in the estate. */}
      <Movement name="private-scholarship" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>Scholarships</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
                {privateLessons.scholarshipNote}
              </p>
              <p className="mt-6">
                <Link
                  href="/scholarships"
                  className="font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
                >
                  How Step Up works here
                </Link>
              </p>
              <div className="mt-10">
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
