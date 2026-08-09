import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Atmosphere, FilmMargin, Movement } from '@/components/film'
import { DeskLabel, PageIntro } from '@/components/page'
import { performances } from '@/content/about'
import { performanceEvidence, testimonials, testimonialsSection } from '@/content/home'
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
  const communityQuote = testimonials.find((t) => t.id === 'mariana-olvera')

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

      {/*
        THE STAGE, BEFORE ANYONE IS ON IT — EE3.

        This page is the one most damaged by gates: all six showcase
        photographs are blocked under I-1, there is no dated event under I-4,
        and the only surviving event record has a date that exists solely as
        unverified search-index metadata. It was carrying its entire subject in
        type.

        `stage-empty-chair` is the honest image for exactly that condition. It
        is drawn from the direction's own shot list — *"An empty chair on a
        stage, lit"* — and it depicts the one thing that is true and showable
        here: the stage exists, and it is waiting. It contains no person, no
        audience and no identifiable venue, so it says nothing about this
        academy that this academy has not earned.

        Full-bleed and letterboxed at 2.39:1, because this is the only place
        outside the homepage where the film's frame is the right register.
      */}
      <Movement name="stage" ground="pitch" className="relative overflow-hidden">
        <div className="relative aspect-[21/9] w-full sm:aspect-[2.39/1]">
          <Atmosphere
            asset="stage-empty-chair"
            job="Performances — a single lit chair on bare boards: the stage before anyone is on it"
            opacity={1}
            position="center 55%"
            sizes="100vw"
            quality={52}
          />
        </div>
      </Movement>

      {/*
        UPCOMING — the authored location, standing empty on purpose. EE1.

        This is the first place on the rebuilt site where a real showcase date
        can land. It is set as the page's second movement rather than buried at
        the bottom, because "when is the next one" is the question this page
        exists to answer, and answering it with silence is what the old site
        did.

        ⚠️ Gate I-4. No event is invented, and the dead March 2025 record is not
        resurrected — its date survives only as search-index metadata for a URL
        that 404s, which `events.json` marks unverified.
      */}
      <Movement name="upcoming" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>{performances.upcoming.label}</DeskLabel>
            <div className="max-w-[840px]">
              <h2 className="max-w-[18ch] font-display text-display-md text-(--color-text-primary)">
                {performances.upcoming.heading}
              </h2>
              <p className="mt-7 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
                {performances.upcoming.body}
              </p>
              <p className="mt-8">
                <Link
                  href={performances.upcoming.action.href}
                  className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
                >
                  {performances.upcoming.action.label}
                </Link>
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>

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

      {/*
        IN THE COMMUNITY — EE1.

        Two verbatim sentences that were living on `/about` and nowhere near the
        page about performances, plus the one review in the corpus that speaks
        to community rather than to a teacher. The quote sits directly beneath
        the claim it corroborates; it is the only quote in this movement.
      */}
      <Movement name="community" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>{performances.community.label}</DeskLabel>
            <div className="max-w-[840px]">
              {performances.community.lines.map((line, index) => (
                <p
                  key={line}
                  className={`max-w-[62ch] font-body text-body-lg text-(--color-text-secondary) ${
                    index === 0 ? '' : 'mt-5'
                  }`}
                >
                  {line}
                </p>
              ))}

              {communityQuote ? (
                <figure className="mt-10 border-l-2 border-(--color-border-default) pl-7">
                  <blockquote className="max-w-[52ch] font-body text-body-lg italic text-(--color-text-primary)">
                    &ldquo;{communityQuote.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 font-display text-label uppercase text-(--color-text-muted)">
                    {communityQuote.author} · {testimonialsSection.sourceLabel}
                  </figcaption>
                </figure>
              ) : null}
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
