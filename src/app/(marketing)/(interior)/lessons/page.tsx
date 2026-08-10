import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Atmosphere, FilmMargin, Movement } from '@/components/film'
import { DeskLabel, PageIntro } from '@/components/page'
import {
  formatComparison,
  groupLessons,
  instrumentFamilies,
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

      {/*
        THE COMPARISON — EE1.

        The two formats above are the answer to "what do you offer". This is the
        answer to "which one is mine", which is the question a parent is really
        holding, and which previously required opening both pages and comparing
        them from memory.

        A table is the correct object here and the only one on the site: this is
        genuinely tabular data, so it ships as hairline rows with the two formats
        as columns, not as two feature cards facing each other. On phones the
        columns stack under their format name, so the comparison is still read as
        pairs rather than as one long list.

        ⚠️ No frequency row and no instrument-availability row — both conflicts
        are open and this object would read as settled fact.
      */}
      <Movement name="format-comparison" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>Side by side</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              <table className="w-full border-collapse text-left">
                <caption className="mb-7 max-w-[62ch] text-left font-body text-body-md text-(--color-text-secondary)">
                  {formatComparison.note}
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="sr-only">
                      Detail
                    </th>
                    {formatComparison.columns.map((column) => (
                      <th
                        key={column.id}
                        scope="col"
                        className="w-[38%] border-b-2 border-(--color-text-primary) pb-4 align-bottom"
                      >
                        <Link
                          href={column.route}
                          className="font-body text-heading-lg italic text-(--color-text-primary) underline-offset-[6px] hover:underline"
                        >
                          {column.name}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {formatComparison.rows.map((row) => (
                    <tr key={row.id} className="align-top">
                      <th
                        scope="row"
                        className="border-t border-(--color-border-default) py-5 pr-6 font-display text-label uppercase font-normal text-(--color-text-muted)"
                      >
                        {row.label}
                      </th>
                      <td className="border-t border-(--color-border-default) py-5 pr-6 font-body text-body-md text-(--color-text-primary)">
                        {row.private ?? <span className="text-(--color-text-muted)">—</span>}
                      </td>
                      <td className="border-t border-(--color-border-default) py-5 font-body text-body-md text-(--color-text-primary)">
                        {row.group ?? <span className="text-(--color-text-muted)">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FilmMargin>
      </Movement>

      {/*
        INSTRUMENT FAMILIES — EE3.

        The seven instruments were a flat list of seven names, which is an
        inventory rather than a decision aid. They now group into the four
        families they actually fall into, each led by an approved object study.

        This is the one place on the site where a photographic subject does real
        work: a parent scanning for "what would my child be doing" gets keys,
        strings, a drum head — and, for Voice, deliberately nothing, because the
        source says a singer needs no instrument and the absence carries that
        better than a sentence does.

        ⚠️ The plates are object studies in the film palette. They do not depict
        this academy, and nothing here implies they do.
      */}
      <Movement name="instrument-families" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>{lessonsHub.instrumentsLabel}</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              {/*
                MI1 — ⚠️ THIS ROUTE GETS NO AUTHENTIC PHOTOGRAPH, and the reason
                is worth recording here rather than only in the report.

                `/lessons` is the page that most wants a picture of the actual
                teaching room, and the estate contains two of them:
                  · audit #11 — children at keyboards, a ukulele, the SDM neon
                    on the wall. The best interior frame in the whole estate,
                    and 1000×667 composed almost entirely of identifiable
                    children. I-1 blocks the frame; there is no face-free
                    region left in it large enough to fill this slot.
                  · audit #30 — the room with the ukulele wall, the amps and the
                    music rug. Its one good face-free region is the ukulele
                    rack, and that crop is already spent on `/private-lessons`.

                A `room-drums` crop of #30's far wall was generated, wired here,
                and then REJECTED on visual inspection: the honest content of
                that corner is a microwave, plastic bags, a utility cart and
                wire shelving. It reads as a storage room, not a teaching room,
                and shipping it would have made the academy look worse than a
                generated plate does. It remains in `.audit/media-review/`,
                marked REJECTED, and is referenced by nothing.

                So the plates below stay generated and stay honest about it.
                This is the clearest single argument in MI1 for commissioning a
                short room shoot: the gap here is not a design problem.
              */}
              {instrumentFamilies.map((family) => {
                const members = family.instrumentIds
                  .map((id) => instrumentPages.find((i) => i.id === id))
                  .filter((i): i is (typeof instrumentPages)[number] => Boolean(i))

                return (
                  <section
                    key={family.id}
                    className={`grid gap-6 border-t border-(--color-border-default) py-9 sm:gap-9 ${
                      family.plate ? 'sm:grid-cols-[168px_minmax(0,1fr)]' : ''
                    }`}
                  >
                    {/*
                      ⚠️ When a family has no plate, NO image column is rendered
                      at all — the row simply runs full width.

                      The first build reserved the column and left it empty,
                      which painted a solid black rectangle beside Voice. That
                      is precisely the empty placeholder this project forbids:
                      it reads as a broken image, not as an absence with
                      meaning. Voice has nothing to photograph because a singer
                      needs no instrument, and the honest expression of that is
                      a row that is visibly built differently.
                    */}
                    {family.plate ? (
                      /*
                        ⚠️ Rendered at every width. It was `hidden sm:block`,
                        which meant the plates never loaded on a phone —
                        measured: /lessons transferred 0.9 KB on mobile against
                        8.1 KB on desktop, so the one route where imagery does
                        real work was text-only for the audience most likely to
                        be on it.

                        Mobile gets a full-width band above the text; from `sm`
                        it becomes the 168×112 left column.
                      */
                      <div className="relative h-[120px] w-full overflow-hidden bg-(--color-ground-pitch) sm:h-[112px] sm:w-[168px]">
                        <Atmosphere
                          asset={family.plate}
                          job={`Lessons — the ${family.name} family, as an object study`}
                          opacity={1}
                          position="center"
                          sizes="(min-width: 640px) 168px, 100vw"
                          quality={52}
                        />
                      </div>
                    ) : null}

                    <div>
                      <h3 className="font-display text-label uppercase text-(--color-text-muted)">
                        {family.name}
                      </h3>
                      <p className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                        {members.map((instrument) => (
                          <Link
                            key={instrument.id}
                            href={instrument.route}
                            className="font-body text-heading-lg italic text-(--color-text-primary) underline-offset-[6px] hover:underline"
                          >
                            {instrument.name}
                          </Link>
                        ))}
                      </p>
                      {/*
                        One member: the name is already the heading above, so
                        repeating it reads as a stutter. Several: each age has
                        to be attributed or the line is meaningless.
                      */}
                      <p className="mt-3 font-display text-label uppercase text-(--color-text-muted)">
                        {members.length === 1
                          ? `From ${members[0].startsAround}`
                          : members.map((i) => `${i.name} from ${i.startsAround}`).join(' · ')}
                      </p>
                      <p className="mt-4 max-w-[54ch] font-body text-body-md text-(--color-text-secondary)">
                        {family.equipment}
                      </p>
                    </div>
                  </section>
                )
              })}

              {/*
                Keyboard. Sold in three places across the estate, no page
                anywhere. Listed because that much is verified; linked nowhere,
                and given no family, because which family it belongs to is
                precisely the open question.
              */}
              <p className="border-t border-(--color-border-default) py-7 font-body text-body-md text-(--color-text-muted) sm:pl-[201px]">
                <span className="font-body text-heading-lg italic">{keyboardGap.name}</span>
                {' — '}
                {keyboardGap.status}
              </p>
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
