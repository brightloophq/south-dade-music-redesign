import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Atmosphere, FilmMargin, Movement } from '@/components/film'
import { DeskLabel, PageIntro } from '@/components/page'
import { bandBuilders } from '@/content/programs'
import { performanceEvidence, testimonialsSection } from '@/content/home'
import { trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Band Builders',
  description:
    'A group music program where kids come together to play as a team — learning how bands work, timing and coordination, and performing as a group.',
  path: '/programs/band-builders',
})

/**
 * /programs/band-builders — **reconstructed in EE3.2.**
 *
 * ## What was wrong
 *
 * 53 words per 1000px and **four consecutive list-only sections** — the exact
 * structural defect EE3.1 removed from the flagship, and the reason this route
 * was classified REQUIRES EE3.2 rather than acceptable.
 *
 * Two verbatim blocks had also never been migrated, one of them the organizing
 * idea of the entire programme.
 *
 * ## The organizing idea, taken from the source
 *
 *   > *"Band Builders is designed for kids and teens who want **more than just
 *   > private lessons**."*
 *
 * That is the page's own sentence and it is not a timeline — it is a
 * relationship. So this page is deliberately **not** a smaller copy of the
 * flagship's journey. Its architecture is **alone → together**:
 *
 *   THE OFFER      what it is, and what it is more than
 *   ALONE          the three instruments, separate, each in its own light
 *   TOGETHER       what changes when they play as one — the four outcomes
 *   THE PATH       the numbered route in, with the step it depends on linked
 *   WHO IT IS FOR  both audiences, and the contradiction between them, stated
 *   PERFORMING     the conditional, and the one quote that corroborates it
 *
 * ## ⚠️ What is deliberately not said
 *
 * **Whether private lessons are a prerequisite.** The source contradicts
 * itself — it lists beginners *and* students already in private lessons as the
 * audience, while its own numbered path makes private lessons step 2. Both
 * ship; the ordering question is left open rather than answered by invention.
 *
 * **That Band Builders is part of the 90-Day Stage Program.** The extraction
 * suggests it is the "band application" half, but that rests on the disputed
 * "two classes weekly" line. The flagship is linked as a destination, which is
 * routing, not a claim of containment.
 *
 * **"May include."** The performance qualifier ships exactly as published.
 */
export default function BandBuildersPage() {
  /*
   * The only quote in the corpus that ties a child in a show to the practice
   * behind it. Placed against the performance claim, which is the proposition
   * it actually supports. The source page carries no testimony of any kind.
   */
  const showQuote = performanceEvidence.quotes.find((q) => q.id === 'romi')

  const PLATES = [
    { asset: 'instrument-keys', label: 'Keys' },
    { asset: 'instrument-strings', label: 'Strings' },
    { asset: 'instrument-percussion', label: 'Percussion' },
  ]

  return (
    <>
      <PageIntro eyebrow="Programs" heading={bandBuilders.name} lead={bandBuilders.lead}>
        {/* ✅ VERBATIM hero subtitle — recovered in EE3.2. */}
        <p className="mt-7 max-w-[24ch] font-body text-display-md italic leading-[1.25] text-(--color-text-primary)">
          {bandBuilders.subtitle}
        </p>
        {/* ✅ VERBATIM — the organizing idea, recovered in EE3.2. */}
        <p className="mt-8 max-w-[54ch] font-body text-body-lg text-(--color-text-secondary)">
          {bandBuilders.premiseSource}
        </p>
      </PageIntro>

      {/*
        ALONE → TOGETHER.

        Not a gallery. Three object studies set in one row under a single
        continuous rule: separate instruments, one shared line. The composition
        is the argument — this is the only programme on the site where the
        subject is the relationship *between* instruments rather than any one of
        them, and the three plates say that faster than a sentence can.

        ⚠️ Object studies. They do not depict this academy, its students or its
        rooms, and nothing here implies they do.
      */}
      <Movement name="alone-together" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>Alone, then together</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              <p className="max-w-[30ch] font-display text-display-md leading-[1.25] text-(--color-text-primary)">
                {bandBuilders.premise}
              </p>

              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">
                {PLATES.map((plate) => (
                  <div key={plate.asset}>
                    <div className="relative h-[92px] overflow-hidden bg-(--color-ground-pitch) sm:h-[132px]">
                      <Atmosphere
                        asset={plate.asset}
                        job={`Band Builders — ${plate.label}, one voice of the ensemble`}
                        opacity={1}
                        position="center"
                        sizes="(min-width: 640px) 260px, 33vw"
                        quality={52}
                      />
                    </div>
                    <p className="mt-3 font-display text-label uppercase text-(--color-text-muted)">
                      {plate.label}
                    </p>
                  </div>
                ))}
              </div>
              {/* One rule under all three: separate instruments, shared space. */}
              <div className="mt-5 h-px w-full bg-(--color-text-primary)" />
            </div>
          </div>
        </FilmMargin>
      </Movement>

      {/*
        TOGETHER — what changes.

        The four verbatim outcomes. They were one of four consecutive plain
        lists; here they are the payoff of the composition above, set two-up so
        they read as a group rather than as a queue.
      */}
      <Movement name="together" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>What happens in the room</DeskLabel>
            </div>
            <ul className="grid max-w-[840px] gap-x-12 sm:grid-cols-2">
              {bandBuilders.students.map((item) => (
                <li
                  key={item}
                  className="border-t border-(--color-border-default) py-5 font-body text-body-lg text-(--color-text-primary)"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FilmMargin>
      </Movement>

      {/*
        THE PATH — and the honest note about who it is for.

        The numbered route is genuinely a sequence, so it stays ordered. What
        changes is that step 2 now links to the page it names — the source
        page named private lessons as a prerequisite and linked to nothing —
        and the audience contradiction is stated instead of smoothed over.
      */}
      <Movement name="the-path" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>How to get in</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              <ol className="grid gap-x-12 sm:grid-cols-2">
                {bandBuilders.howItWorks.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-baseline gap-5 border-t border-(--color-border-default) py-5"
                  >
                    <span
                      aria-hidden="true"
                      className="font-display text-label uppercase tabular-nums text-(--color-text-muted)"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-body text-body-lg text-(--color-text-primary)">
                      {index === 1 ? (
                        <>
                          Build basic skills in{' '}
                          <Link
                            href="/private-lessons"
                            className="underline underline-offset-[6px]"
                          >
                            private lessons
                          </Link>
                        </>
                      ) : (
                        step
                      )}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-10 border-t border-(--color-border-default) pt-7">
                <p className="font-display text-label uppercase text-(--color-text-muted)">
                  Who it is for
                </p>
                <ul className="mt-4 grid gap-x-12 sm:grid-cols-2">
                  {bandBuilders.audience.map((item) => (
                    <li
                      key={item}
                      className="py-2 font-body text-body-md text-(--color-text-secondary)"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {/*
                  ⚠️ The source contradicts itself here and the page says so.
                  Resolving it would invent an enrolment rule.
                */}
                <p className="mt-6 max-w-[62ch] font-body text-body-sm italic text-(--color-text-muted)">
                  The programme lists both beginners and students already in private lessons, while
                  the path above puts private lessons second. Whether they are a prerequisite is not
                  settled anywhere we can see — ask when you book.
                </p>
              </div>
            </div>
          </div>
        </FilmMargin>
      </Movement>

      {/* PERFORMING — the conditional, exactly as published, with its proof. */}
      <Movement name="performing" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>Performing</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              <p className="max-w-[40ch] font-body text-heading-lg italic text-(--color-text-primary)">
                {bandBuilders.performance.qualifier}
              </p>
              <p className="mt-4 font-display text-label uppercase text-(--color-text-muted)">
                {bandBuilders.performance.items.join(' · ')}
              </p>

              {showQuote ? (
                <figure className="mt-10 border-l-2 border-(--color-border-default) pl-7">
                  <blockquote className="max-w-[52ch] font-body text-body-lg italic text-(--color-text-secondary)">
                    &ldquo;{showQuote.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 font-display text-label uppercase text-(--color-text-muted)">
                    {showQuote.author} · {testimonialsSection.sourceLabel}
                  </figcaption>
                </figure>
              ) : null}

              <div className="mt-12 border-t-2 border-(--color-text-primary) pt-9">
                <p className="max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
                  {trialOffer.terms}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
                    Book a Trial
                  </Button>
                  <Link
                    href="/programs/90-day-stage-program"
                    className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
                  >
                    The 90-Day Stage Program
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
