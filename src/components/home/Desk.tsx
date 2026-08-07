import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { DESK_SENTINEL_ID, FilmMargin, Movement } from '@/components/film'
import {
  finalCta,
  instruments,
  lessonsSection,
  performanceEvidence,
  programs,
  programsSection,
  scholarship,
  testimonials,
  testimonialsSection,
  twelveWeeks,
} from '@/content/home'

/**
 * THE DESK — shots 08–12.
 *
 * The Film.html: *"None. The film is over; this is the programme in your hands.
 * House lights, flat and honest. No grain from here down. Room air. Pages
 * turning."*
 *
 * The desk does not move. No pinning, no grain, no letterbox, no amber except
 * the CTA fills. Visual Specification.md §H.6 is explicit that the entire
 * two-pin budget is spent on the film.
 *
 * The composition alternates so no two consecutive movements share a shape:
 * a label in the wide left margin, content starting at ~540px, then the next
 * movement anchors the other way. Nothing is centred.
 */

/** The label that hangs in the left margin of every desk movement. */
function DeskLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-label uppercase text-(--color-text-muted)">{children}</p>
  )
}

/**
 * The desk's two-column shape: label left, content in a measure to the right.
 * Below `lg` it collapses to one column — the label stays above its content,
 * still left-aligned, never centred.
 */
function DeskRow({
  label,
  children,
  id,
}: {
  label: string
  children: React.ReactNode
  id?: string
}) {
  return (
    <FilmMargin wide>
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <div className="lg:pt-2">
          <DeskLabel>{label}</DeskLabel>
        </div>
        <div id={id} className="max-w-[840px]">
          {children}
        </div>
      </div>
    </FilmMargin>
  )
}

/**
 * SHOT 08 — Programs, as tonight's programme.
 *
 * *"The flagship at 2× is the entire hierarchy. No badges, no cards."*
 *
 * An index of six numbered lines separated by hairlines. The 90-Day Stage
 * Program is set at `display-md` in Newsreader italic; the other five sit at
 * `heading-md`. That size difference *is* the hierarchy — there is no badge,
 * no highlight, no "most popular" flag, because a playbill does not need one.
 *
 * Prices are absent because they are unpublished. The note says so plainly
 * rather than leaving a suspicious silence.
 */
function Programs() {
  return (
    <Movement
      name="programs"
      ground="house"
      id={DESK_SENTINEL_ID}
      aria-labelledby="programs-heading"
      className="py-(--section-feature)"
    >
      <h2 id="programs-heading" className="sr-only">
        {programsSection.heading}
      </h2>
      <DeskRow label={programsSection.heading}>
        <ol className="w-full">
          {programs.map((program, index) => {
            const flagship = index === 0
            return (
              <li
                key={program.id}
                className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-b border-(--color-border-default) py-6 last:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="w-11 shrink-0 font-display text-label uppercase tabular-nums text-(--color-text-muted)"
                >
                  No.&nbsp;{index + 1}
                </span>
                <Link
                  href={program.href}
                  className={
                    flagship
                      ? 'font-body text-display-md italic text-(--color-text-primary) underline-offset-[6px] hover:underline'
                      : 'font-body text-heading-md italic text-(--color-text-primary) underline-offset-[6px] hover:underline'
                  }
                >
                  {program.name}
                </Link>
              </li>
            )
          })}
        </ol>
        <p className="mt-8 max-w-[62ch] font-body text-body-md italic text-(--color-text-muted)">
          {programsSection.lead}
        </p>
      </DeskRow>
    </Movement>
  )
}

/**
 * SHOT 08b — Music lessons.
 *
 * *"Instruments run as one italic line further down the desk."* Seven names,
 * set as a single continuous line rather than a grid — no cards, no icons, no
 * seven-up tile wall. It reads as a cast list.
 */
function MusicLessons() {
  return (
    <Movement
      name="lessons"
      ground="house"
      aria-labelledby="lessons-heading"
      className="py-(--section-spacious)"
    >
      <h2 id="lessons-heading" className="sr-only">
        {lessonsSection.heading}
      </h2>
      <DeskRow label={lessonsSection.heading}>
        <p className="font-body text-display-md italic leading-[1.35] text-(--color-text-primary)">
          {instruments.map((instrument, index) => (
            <span key={instrument.id}>
              <Link
                href={instrument.href}
                className="underline-offset-[6px] hover:underline"
              >
                {instrument.name}
              </Link>
              {index < instruments.length - 1 ? (
                <span aria-hidden="true" className="text-(--color-text-muted)">
                  {' · '}
                </span>
              ) : null}
            </span>
          ))}
        </p>
        <p className="mt-8 max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
          {lessonsSection.lead}
        </p>
        <p className="mt-6">
          <Link
            href={lessonsSection.cta.href}
            className="font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
          >
            {lessonsSection.cta.label}
          </Link>
        </p>
      </DeskRow>
    </Movement>
  )
}

/**
 * The twelve weeks, published.
 *
 * The one place on the desk where a grid is correct, because it *is* a
 * schedule. Hairline rows, tabular numerals, no card.
 */
function TwelveWeeks() {
  return (
    <Movement
      name="twelve-weeks"
      ground="house"
      id="twelve-weeks"
      aria-labelledby="twelve-weeks-heading"
      className="py-(--section-spacious)"
    >
      <DeskRow label="The programme">
        <h2
          id="twelve-weeks-heading"
          className="max-w-[20ch] font-display text-display-md text-(--color-text-primary)"
        >
          {twelveWeeks.heading}
        </h2>
        <p className="mt-6 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
          {twelveWeeks.lead}
        </p>
        <dl className="mt-10">
          {twelveWeeks.rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5"
            >
              <dt className="w-32 shrink-0 font-display text-label uppercase tabular-nums text-(--color-text-muted)">
                {row.week}
              </dt>
              <dd className="font-body text-body-lg text-(--color-text-primary)">{row.what}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 font-body text-body-sm text-(--color-text-muted)">{twelveWeeks.footnote}</p>
      </DeskRow>
    </Movement>
  )
}

/**
 * SHOT 10 in the movement list — Performance evidence.
 *
 * Ground: `stage`. Visual Specification.md §D: *"flat, cool — conviction
 * without proof-by-photo."* The one dark movement below the house lights,
 * because this is testimony about a room with the lights down.
 *
 * All eighteen genuine photographs are blocked for consent, so the proof is
 * three showcase reviews. The note explains the absence instead of hiding it.
 */
function PerformanceEvidence() {
  return (
    <Movement
      name="evidence"
      ground="stage"
      aria-labelledby="evidence-heading"
      className="py-(--section-feature)"
    >
      <FilmMargin wide>
        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <div className="lg:pt-2">
            <DeskLabel>{performanceEvidence.lead}</DeskLabel>
          </div>
          <div className="max-w-[840px]">
            <h2
              id="evidence-heading"
              className="font-display text-display-md text-(--color-text-primary)"
            >
              {performanceEvidence.heading}
            </h2>
            <ul className="mt-10 flex flex-col gap-8">
              {performanceEvidence.quotes.map((quote) => (
                <li key={quote.id} className="border-t border-stage-700 pt-6">
                  <blockquote className="max-w-[62ch] font-body text-body-lg italic text-(--color-text-primary)">
                    {quote.quote}
                  </blockquote>
                  <p className="mt-3 font-display text-label uppercase text-(--color-text-muted)">
                    {quote.author}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-[62ch] font-body text-body-sm text-(--color-text-muted)">
              {performanceEvidence.note}
            </p>
          </div>
        </div>
      </FilmMargin>
    </Movement>
  )
}

/**
 * SHOT 09 — Testimonials: one anchor voice, marginalia beside it.
 *
 * *"Typos kept; they are the proof."*
 *
 * One quote at 34px carries the movement; two smaller ones sit in a margin
 * column behind a hairline. Not three equal cards — an anchor and its
 * annotations, the way a programme note quotes a review.
 */
function Testimonials() {
  /*
   * One record names a minor and is withheld until guardian consent exists.
   * The content module keeps it so the extraction stays complete; the page
   * never renders it.
   */
  const publishable = testimonials.filter((t) => !t.namesMinor)
  const [anchor, ...rest] = publishable
  const marginalia = rest.slice(0, 2)

  return (
    <Movement
      name="testimonials"
      ground="house"
      aria-labelledby="testimonials-heading"
      className="py-(--section-feature)"
    >
      <FilmMargin wide>
        <h2 id="testimonials-heading" className="sr-only">
          {testimonialsSection.heading}
        </h2>
        <DeskLabel>
          {testimonialsSection.heading} · {testimonialsSection.sourceLabel}
        </DeskLabel>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-24">
          <figure>
            <blockquote className="max-w-[620px] font-body text-display-md italic leading-[1.45] text-(--color-text-primary)">
              &ldquo;{anchor.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 font-display text-label uppercase text-(--color-text-muted)">
              {anchor.author}
            </figcaption>
          </figure>

          <div className="flex flex-col gap-11 border-(--color-border-default) lg:border-l lg:pl-9">
            {marginalia.map((quote) => (
              <figure key={quote.id}>
                <blockquote className="font-body text-body-md italic text-(--color-text-secondary)">
                  &ldquo;{quote.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3.5 font-display text-label uppercase text-(--color-text-muted)">
                  {quote.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </FilmMargin>
    </Movement>
  )
}

/**
 * SHOT 10 — Scholarship, as a formal notice.
 *
 * *"A formal notice with a footnote. Dignity, not charity styling."*
 *
 * No icon row, no rounded box, no tinted "help" panel. A statement, a plain
 * sentence, an action, and an asterisked footnote — the register of an official
 * notice, which is what respects the reader here.
 *
 * The disclaimer is legally load-bearing and sits adjacent to the claim, as it
 * must. It is set small but never faint: 4.61:1 on the ivory ground.
 */
function Scholarship() {
  return (
    <Movement
      name="scholarship"
      ground="house"
      aria-labelledby="scholarship-heading"
      className="py-(--section-feature)"
    >
      <DeskRow label="Scholarship">
        <h2
          id="scholarship-heading"
          className="max-w-[24ch] font-display text-display-md text-(--color-text-primary)"
        >
          {scholarship.heading}
        </h2>
        <p className="mt-8 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
          {scholarship.lead}
        </p>
        <p className="mt-6 font-body text-whisper italic text-(--color-text-secondary)">
          {scholarship.inclusion}
        </p>
        <div className="mt-9">
          <Button href={scholarship.cta.href} size="lg">
            {scholarship.cta.label}
          </Button>
        </div>
        <p className="mt-11 max-w-[62ch] font-body text-body-sm italic text-(--color-text-muted)">
          {scholarship.disclaimer}
        </p>
      </DeskRow>
    </Movement>
  )
}

/**
 * SHOT 11 — the final call to action.
 *
 * *"The guarantee is the headline; the terms sit still and legible, never
 * animated."*
 *
 * The guarantee carries the movement at statement size. The $25 and its
 * credited-back term sit directly beneath the action, because the site's
 * largest conversion failure was disclosing that price on two pages out of
 * twenty-six.
 */
function FinalCta() {
  return (
    <Movement
      name="final-cta"
      ground="house"
      aria-labelledby="final-cta-heading"
      className="py-(--section-feature)"
    >
      <FilmMargin wide>
        <h2
          id="final-cta-heading"
          className="max-w-[840px] font-display text-display-md leading-[1.2] text-(--color-text-primary)"
        >
          {finalCta.heading}
        </h2>
        <p className="mt-8 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
          {finalCta.guarantee}
        </p>
        <div className="mt-12">
          <Button href={finalCta.cta.href} size="lg" price={finalCta.cta.price}>
            {finalCta.cta.label}
          </Button>
        </div>
        <p className="mt-6 max-w-[62ch] font-body text-body-md text-(--color-text-muted)">
          {finalCta.trialNote}
        </p>
      </FilmMargin>
    </Movement>
  )
}

/** The desk, in order. */
export function Desk() {
  return (
    <>
      <Programs />
      <TwelveWeeks />
      <MusicLessons />
      <PerformanceEvidence />
      <Testimonials />
      <Scholarship />
      <FinalCta />
    </>
  )
}
