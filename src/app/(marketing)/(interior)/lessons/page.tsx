import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, PageIntro } from '@/components/page'
import {
  groupLessons,
  instrumentPages,
  keyboardGap,
  lessonsHub,
  privateLessons,
} from '@/content/lessons'
import { trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Music lessons',
  description:
    'Private and group music lessons in piano, guitar, drums, bass, violin, ukulele and voice. Most children start between five and eight.',
  path: '/lessons',
})

/**
 * /lessons — Tier 2 hub, and the canonical discovery page for lessons.
 *
 * It exists to answer a parent's questions in one place, which no source page
 * ever does:
 *
 *   private or group?   the two formats, side by side
 *   which instrument?   seven, with the age each one starts around
 *   what age?           per instrument, verbatim
 *   what happens next?  the four-step path from the private-lessons page
 *   how do I book?      one priced CTA
 *
 * ## The format question is deliberately framed, not answered
 *
 * Five instrument pages say **all** lessons in that instrument are private;
 * four other pages sell group instruction in the same instruments. Both formats
 * are presented as real, and the hub never claims which instruments are
 * available in which — that is the only framing true under either reading.
 * Recorded in `formatConflict`.
 *
 * ## Keyboard
 *
 * Listed, because it is genuinely sold in three places. Unlinked, because it
 * has no page and inventing one would be inventing a product.
 *
 * No card grid, no icon matrix, no instructor imagery — the instruments are a
 * hairline-ruled index with the ages beside them as data.
 */
export default function LessonsPage() {
  const formats = [
    {
      id: privateLessons.id,
      name: privateLessons.name,
      route: privateLessons.route,
      blurb: privateLessons.summary,
      meta: [privateLessons.lessonFormat, privateLessons.targetAge],
    },
    {
      id: groupLessons.id,
      name: groupLessons.name,
      route: groupLessons.route,
      blurb: groupLessons.summary,
      meta: [groupLessons.lessonFormat, groupLessons.targetAge],
    },
  ]

  return (
    <>
      <PageIntro
        eyebrow={lessonsHub.eyebrow}
        heading={lessonsHub.heading}
        lead={lessonsHub.lead}
      />

      {/* Private or group. */}
      <Movement name="formats" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>{lessonsHub.formatsLabel}</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              {formats.map((format) => (
                <article key={format.id} className="border-t border-(--color-border-default) py-8">
                  <h2 className="font-body text-display-md italic leading-[1.2] text-(--color-text-primary)">
                    <Link href={format.route} className="underline-offset-[8px] hover:underline">
                      {format.name}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
                    {format.blurb}
                  </p>
                  <p className="mt-4 font-display text-label uppercase text-(--color-text-muted)">
                    {format.meta.join(' · ')}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </FilmMargin>
      </Movement>

      {/* Which instrument, and what age. */}
      <Movement name="instruments" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>{lessonsHub.instrumentsLabel}</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              <ul>
                {instrumentPages.map((instrument) => (
                  <li
                    key={instrument.id}
                    className="flex flex-wrap items-baseline gap-x-8 gap-y-1 border-t border-(--color-border-default) py-6"
                  >
                    <Link
                      href={instrument.route}
                      className="min-w-[9rem] font-body text-heading-lg italic text-(--color-text-primary) underline-offset-[6px] hover:underline"
                    >
                      {instrument.name}
                    </Link>
                    <span className="font-display text-label uppercase text-(--color-text-muted)">
                      Starts {instrument.startsAround}
                    </span>
                  </li>
                ))}

                {/*
                  Keyboard. Sold in three places across the estate and has no
                  page anywhere. Listed as offered — that much is verified —
                  and linked nowhere.
                */}
                <li className="flex flex-wrap items-baseline gap-x-8 gap-y-1 border-t border-(--color-border-default) py-6">
                  <span className="min-w-[9rem] font-body text-heading-lg italic text-(--color-text-muted)">
                    {keyboardGap.name}
                  </span>
                  <span className="font-display text-label uppercase text-(--color-text-muted)">
                    {keyboardGap.status}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </FilmMargin>
      </Movement>

      {/* What happens next, and how to book. */}
      <Movement name="lessons-next" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>{lessonsHub.nextLabel}</DeskLabel>
            <div className="max-w-[840px]">
              <ol>
                {lessonsHub.next.map((step, index) => (
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
                    <span className="font-body text-body-lg text-(--color-text-primary)">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
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
