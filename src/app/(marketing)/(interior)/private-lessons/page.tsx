import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { MediaReview } from '@/components/dev/MediaReview'
import { DeskLabel, PageIntro } from '@/components/page'
import { instrumentPages, privateLessons } from '@/content/lessons'
import { trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Private lessons',
  description:
    'One-on-one music lessons for kids, teens and adults in South Miami-Dade. Lessons are one-on-one, so students get full attention.',
  path: '/private-lessons',
})

/**
 * /private-lessons — **reconstructed in EE3.2.**
 *
 * ## What was wrong
 *
 * 44 words per 1000px desktop, 39 on mobile — the thinnest interior route on
 * the site. EE3 diagnosed it correctly as a *composition* problem rather than a
 * content one: the page rendered every string its module held.
 *
 * That diagnosis was right about the module and wrong about the source. Four
 * verbatim blocks had never reached the module at all, and one of them was the
 * page's whole reason to exist:
 *
 *   > *"Lessons are one-on-one, so students get full attention."*
 *
 * The rebuild had compressed that to the two words `One-on-one` in a data row —
 * which states the format and throws away the argument. A parent on this page
 * is deciding *whether private instruction is right for their child*, and the
 * single sentence that answers them was not on it.
 *
 * ## The organizing idea
 *
 * This page is a **decision**, not a specification. It is deliberately not a
 * second copy of `/lessons`:
 *
 *   `/lessons`          explore instruments · compare private against group
 *   `/private-lessons`  understand this format, and what it leads to
 *
 * Architecture:
 *
 *   THE OFFER      what it is, and who can start
 *   WHY ONE-TO-ONE the recovered argument, as the page's one raised voice
 *   WHAT TO LEARN  the instruments this page itself names, linked
 *   THE PATH       the four steps, with the destinations they name linked
 *   WHAT COMES     performance and practicalities, two columns, one movement
 *   SCHOLARSHIPS   the only programme page in the estate that mentions them
 *
 * ## ⚠️ Deliberately absent
 *
 * **Frequency.** This page's own path says "weekly private lessons", and
 * `/resources/` says two classes weekly. The step ships verbatim as written
 * here; nothing generalises it into a site-wide fact.
 *
 * **Trial terms.** This page says only "Start with a trial lesson" with no
 * figure. The $25 spot-hold comes from `/resources/` and the homepage, and is
 * shown at the point of action, attributed to the terms that do exist.
 *
 * **Tuition, lesson length, guarantee.** None is published anywhere.
 */
export default function PrivateLessonsPage() {
  /* The instruments this page itself names, matched to routes where one exists. */
  const named = privateLessons.instrumentsNamed.map((name) => ({
    name,
    route: instrumentPages.find((i) => i.name.toLowerCase() === name.toLowerCase())?.route ?? null,
  }))

  return (
    <>
      <PageIntro eyebrow="Lesson format" heading="Private lessons." lead={privateLessons.opening}>
        {/* ✅ VERBATIM hero subtitle — recovered in EE3.2. */}
        <p className="mt-7 max-w-[26ch] font-body text-display-md italic leading-[1.25] text-(--color-text-primary)">
          {privateLessons.subtitle}
        </p>
      </PageIntro>

      {/*
        WHY ONE-TO-ONE — the recovered argument.

        The single most important sentence on this route, and it was not on it.
        Set as the page's one raised voice, with the verbatim age line beneath
        it: together they answer "is this right for us?" in two sentences, which
        is the entire job of the page.
      */}
      <Movement name="why-private" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>Why one-to-one</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              {/*
                MI1 — the actual teaching room, beside the argument for it.

                `ukulele-wall` is audit #30 cropped: six ukuleles racked under an
                LED strip with an amplifier below, in this academy's own room.
                **No people** — the first crop caught an adult and a child at the
                right edge and was re-cropped after visual verification.

                It is here rather than on the hub because this page is where a
                parent decides whether one-to-one teaching is right for their
                child, and a real room answers "what is this place?" faster than
                any paragraph on the route could.

                ⚠️ PREVIEW ONLY. Copyright (I-7) unconfirmed.
              */}
              <figure className="relative mb-11 aspect-[16/10] w-full max-w-[540px] overflow-hidden bg-(--color-ground-pitch)">
                <MediaReview
                  asset="ukulele-wall"
                  job="Private lessons — the teaching room this happens in"
                  alt="Six ukuleles hanging on a wall rack under an LED strip in the South Dade Music teaching room, with an amplifier and a music stand below."
                  position="center"
                  sizes="(min-width: 640px) 540px, 100vw"
                />
              </figure>

              <p className="max-w-[24ch] font-display text-display-md leading-[1.25] text-(--color-text-primary)">
                {privateLessons.whyPrivate}
              </p>
              <p className="mt-8 max-w-[54ch] font-body text-body-lg text-(--color-text-secondary)">
                {privateLessons.anyone}
              </p>
              <p className="mt-6">
                <Link
                  href="/lessons"
                  className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
                >
                  Compare private against group
                </Link>
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>

      {/*
        WHAT YOU CAN LEARN.

        The seven instruments **as this page lists them**, which is where
        Keyboard comes from. Six link to their own page; Keyboard does not,
        because it has none anywhere — and that gap is stated inline rather
        than hidden by quietly dropping the seventh name.

        Deliberately a compact linked line, not a repeat of the family index on
        /lessons. This page names them; the hub explores them.
      */}
      <Movement name="instruments" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>What you can learn</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              <p className="font-body text-display-md italic leading-[1.4] text-(--color-text-primary)">
                {named.map((instrument, index) => (
                  <span key={instrument.name}>
                    {instrument.route ? (
                      <Link href={instrument.route} className="underline-offset-[6px] hover:underline">
                        {instrument.name}
                      </Link>
                    ) : (
                      <span className="text-(--color-text-muted)">{instrument.name}</span>
                    )}
                    {index < named.length - 1 ? (
                      <span aria-hidden="true" className="text-(--color-text-muted)">
                        {' · '}
                      </span>
                    ) : null}
                  </span>
                ))}
              </p>
              <p className="mt-5 max-w-[62ch] font-body text-body-sm text-(--color-text-muted)">
                Keyboard is listed here because this programme lists it. It has no page of its own
                anywhere on the site, so it is the one name above that does not link.
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>

      {/*
        THE PATH.

        Four verbatim steps. The source page named group programmes and live
        events as steps 3 and 4 and linked to neither — so the steps now reach
        the routes they describe.

        ⚠️ Step 2's "weekly" is this page's own word and ships as written. It is
        one side of the open frequency conflict and is not generalised.
      */}
      <Movement name="path" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>Where it goes</DeskLabel>
            </div>
            <ol className="grid max-w-[840px] gap-x-12 sm:grid-cols-2">
              {privateLessons.learningPath.map((step, index) => (
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
                    {index === 2 ? (
                      <>
                        Join{' '}
                        <Link href="/group-music-lessons" className="underline underline-offset-[6px]">
                          group programs
                        </Link>{' '}
                        or{' '}
                        <Link
                          href="/programs/band-builders"
                          className="underline underline-offset-[6px]"
                        >
                          bands
                        </Link>
                      </>
                    ) : index === 3 ? (
                      /*
                        ⚠️ `min-h-6` is required, not cosmetic. This link is the
                        entire content of its parent, so `check:a11y` does not
                        grant it the inline-in-prose exemption from the 24px
                        target floor — unlike step 3, where the link sits inside
                        a sentence. Measured at 153×18 and failed WCAG 2.5.8 AA
                        until this was added.
                      */
                      <Link
                        href="/performances"
                        className="inline-flex min-h-6 items-center underline underline-offset-[6px]"
                      >
                        Perform in live events
                      </Link>
                    ) : (
                      step
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </FilmMargin>
      </Movement>

      {/*
        WHAT COMES WITH IT — two verbatim lists as one movement.

        "More Than Just Lessons" and "Easy to Get Started" were two consecutive
        full-width lists. They are two halves of the same answer — what a family
        gets beyond the lesson hour — so they are set as a pair.
      */}
      <Movement name="what-comes" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>Beyond the lesson</DeskLabel>
            </div>
            <div className="grid max-w-[840px] gap-10 sm:grid-cols-2 sm:gap-12">
              {[
                { heading: 'Where students play', items: privateLessons.performance },
                { heading: 'How it fits your week', items: privateLessons.flexibility },
              ].map((group) => (
                <div key={group.heading}>
                  <h2 className="font-body text-heading-lg italic text-(--color-text-primary)">
                    {group.heading}
                  </h2>
                  <ul className="mt-5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="border-t border-(--color-border-default) py-3.5 font-body text-body-md text-(--color-text-secondary)"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </FilmMargin>
      </Movement>

      {/*
        SCHOLARSHIPS AND THE ACTION.

        ⚠️ This is the **only programme page in the entire estate that mentions
        scholarships**, which makes the sentence disproportionately valuable —
        it is the one place a Step Up family learns, on a page about lessons,
        that the route exists.
      */}
      <Movement name="afford" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>Paying for it</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              <p className="max-w-[46ch] font-body text-heading-lg italic text-(--color-text-primary)">
                {privateLessons.scholarshipNote}
              </p>
              <p className="mt-5">
                <Link
                  href="/scholarships"
                  className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
                >
                  How Step Up works here
                </Link>
              </p>

              <div className="mt-12 border-t-2 border-(--color-text-primary) pt-9">
                <p className="max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
                  {trialOffer.terms}
                </p>
                <div className="mt-8">
                  <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
                    Book a Trial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
