import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { Photo } from '@/components/media/Photo'
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

  /*
   * The three instrument families this programme puts in one room. Until MI1
   * each of these also named a generated object study and the row rendered as a
   * triptych; the studies were replaced by one real photograph of two students
   * playing side by side, so what survives here is the label set — the names
   * still belong under the image, the generated plates no longer do.
   */
  const FAMILIES = ['Keys', 'Strings', 'Percussion']

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

        Not a gallery. One image under a single continuous rule, with the three
        family names beneath it. This is the only programme on the site whose
        subject is the relationship *between* instruments rather than any one of
        them, so the image has to show more than one instrument in play.

        Until MI1 that argument was made by arrangement: three generated object
        studies in a row, separate but sharing a line. It is now made by a
        photograph of two students actually playing side by side. Same claim,
        one fewer inference for the reader.
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

              {/*
                MI1 — three generated object studies replaced by one real one.

                `stage-instruments` is audit #29: a bass and an electric guitar
                being played side by side under this academy's stage lights,
                cropped to the instruments and the players' hands. **No faces.**

                The generated triptych argued "separate instruments, shared
                space" by arrangement. This photograph *is* two people playing
                together — which is the programme, and it does in one frame what
                three studies were doing by implication. The generated plates
                remain approved and in use on `/lessons`, where a uniform index
                is the right object; here they were always the weaker answer.

                ⚠️ PREVIEW ONLY. This is a crop of a photograph containing
                minors. The crop is face-free; the original never ships. I-7
                copyright is unconfirmed.
              */}
              <div className="relative mt-10 aspect-[21/9] w-full overflow-hidden bg-(--color-ground-pitch) sm:aspect-[2.39/1]">
                <Photo
                  id="ensemble-guitars"
                  alt="Two South Dade Music students playing bass and electric guitar side by side on stage under coloured lights, in front of the academy banner."
                  position="center 42%"
                  sizes="(min-width: 1024px) 840px, 100vw"
                />
              </div>
              <p className="mt-3 font-display text-label uppercase text-(--color-text-muted)">
                {FAMILIES.join(' · ')}
              </p>
              {/* One rule under all of it: separate instruments, shared space. */}
              <div className="mt-3 h-px w-full bg-(--color-text-primary)" />
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
