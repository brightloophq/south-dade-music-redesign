import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Atmosphere, DESK_SENTINEL_ID, FilmMargin, Movement } from '@/components/film'
import { MediaReview } from '@/components/dev/MediaReview'
import {
  finalCta,
  house,
  instruments,
  lessonsSection,
  performanceEvidence,
  programs,
  programsSection,
  scholarship,
  shyQuestion,
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
 * THE HOUSE — the film hands over. EE1.
 *
 * The first movement in the light, and the first place on the page where the
 * business names itself in readable text. It carries the desk sentinel, so the
 * letterbox and the grain retract here rather than one movement later — the
 * film ends when the house lights find the wordmark, which is what the
 * direction always described.
 *
 * Composition: the wordmark alone on the label rail, the category sentence set
 * as the statement, then the tagline in the margin and the facts as a hairline
 * pair. No card, no logo lockup, no icon. It reads like the first page of a
 * printed programme, which is exactly what it is.
 */
function TheHouse() {
  return (
    <Movement
      name="house"
      ground="house"
      id={DESK_SENTINEL_ID}
      aria-labelledby="house-heading"
      className="py-(--section-feature)"
    >
      {/*
        MI2 — the `stage-set-floral` photograph MOVED OUT of this movement.

        MI1 put it here as a 2.39:1 band immediately above the business
        introduction. That was the right asset in the wrong place: the film had
        just walked a child toward a stage for seven and a half viewports, and
        the stage arrived as a strip, several hundred pixels after a gradient
        that was separately trying to be the same payoff.

        It is now the whole of `HouseLightsReveal` directly above this section —
        a full viewport, revealed as the lights come up. So this movement goes
        back to being what it should always have been: the business introducing
        itself in type, on cream, immediately after you have seen its room.

        The generated plates in the Walk and the Reframe are KEPT: they are
        abstract by design and carry the film's interior weather, which a
        documentary photograph cannot do without breaking the fiction.
      */}

      {/*
        THE PROGRAMME IN YOUR HANDS — EE2.

        *"The film is over; this is the programme in your hands."* The desk was
        flat #F7F4EE, which is clean and completely untactile.

        `atmos-paper-tooth` is warm uncoated stock. It ships here as **one
        non-repeating plate**, which is the fix for the defect that kept it out
        of the build: the asset carries a diagonal light sweep across the frame,
        so tiling it printed a visible grid of sweeps. Used once, full-bleed, at
        the scale it was generated for, the sweep becomes what it looks like —
        light falling across a page.

        Multiplied at 0.28 into the ivory ground, under type that never sits on
        top of detail. It is felt rather than seen, which is the entire brief
        for a paper tooth.
      */}
      <Atmosphere
        asset="atmos-paper-tooth"
        job="The House — uncoated paper stock: the printed programme the desk is set on"
        opacity={0.28}
        blend="multiply"
        sizes="100vw"
        quality={40}
      />

      <FilmMargin wide className="relative z-[2]">
        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <div className="lg:pt-3">
            <DeskLabel>{house.label}</DeskLabel>
          </div>
          <div className="max-w-[840px]">
            <h2
              id="house-heading"
              className="max-w-[20ch] font-display text-display-md leading-[1.2] text-(--color-text-primary)"
            >
              {house.statement}
            </h2>

            {/* ✅ VERBATIM tagline. The only place it appears above the footer. */}
            <p className="mt-7 font-body text-display-md italic text-(--color-text-primary)">
              {house.tagline}
            </p>

            <dl className="mt-11">
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-32 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Where
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {house.serviceLine}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-32 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Who
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {house.ages}
                </dd>
              </div>
            </dl>

            <p className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
              {house.ways.map((way) => (
                <Link
                  key={way.href}
                  href={way.href}
                  className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
                >
                  {way.label}
                </Link>
              ))}
            </p>
          </div>
        </div>
      </FilmMargin>
    </Movement>
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
 *
 * ## EE1 — the playbill now says what each production is
 *
 * Six names and nothing else is a cast list, not a programme. A parent could
 * read this movement in full and still not know that Band Builders is a group
 * that plays together or that Early Childhood is for a three-year-old — so the
 * one verified line each programme publishes about itself now sits under its
 * name, small, in the margin measure.
 *
 * Three of the six also **linked nowhere**, because `programEntries` still
 * carried `route: null` from before Tier 3 built their pages. Fixed at source;
 * all six are live links.
 */
function Programs() {
  return (
    <Movement
      name="programs"
      ground="house"
      aria-labelledby="programs-heading"
      className="pb-(--section-feature)"
    >
      <h2 id="programs-heading" className="sr-only">
        {programsSection.heading}
      </h2>

      {/*
        MI2 — the playbill keeps its numbered editorial system and gains a rail.

        §7 of the brief: elegant, but too much like a printed catalogue. The
        answer is not cards — a card grid would throw away the one-column
        hierarchy where the flagship is simply set larger, which is the whole
        idea. It is a third column.

        `bass-hands` is audit #31, cropped to the scroll of an upright bass and
        a hand on its neck. It runs the full height of the list and sticks while
        the six programmes scroll past it, so the rail reads as the thing all
        six lead to rather than as a picture of any one of them.

        Tier B: the original frame contains a student, the crop contains no part
        of any face, and the original never leaves `.audit/`.

        ⚠️ PREVIEW ONLY. I-7 unconfirmed.
      */}
      <FilmMargin wide>
        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)_240px] lg:gap-14">
          <div className="lg:pt-2">
            <DeskLabel>{programsSection.heading}</DeskLabel>
          </div>
          <div className="max-w-[840px]">
        <ol className="w-full">
          {programs.map((program, index) => {
            const flagship = index === 0
            return (
              <li
                key={program.id}
                className="border-b border-(--color-border-default) py-6 last:border-b-0"
              >
                <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1">
                  <span
                    aria-hidden="true"
                    className="w-11 shrink-0 font-display text-label uppercase tabular-nums text-(--color-text-muted)"
                  >
                    No.&nbsp;{index + 1}
                  </span>
                  {/*
                    `route` stays nullable so a genuinely unbuilt programme can
                    still be listed honestly rather than linked to a 404. All
                    six have pages today.
                  */}
                  {program.route ? (
                    <Link
                      href={program.route}
                      className={
                        flagship
                          ? 'font-body text-display-md italic text-(--color-text-primary) underline-offset-[6px] hover:underline'
                          : 'font-body text-heading-md italic text-(--color-text-primary) underline-offset-[6px] hover:underline'
                      }
                    >
                      {program.name}
                    </Link>
                  ) : (
                    <span
                      className={
                        flagship
                          ? 'font-body text-display-md italic text-(--color-text-primary)'
                          : 'font-body text-heading-md italic text-(--color-text-primary)'
                      }
                    >
                      {program.name}
                    </span>
                  )}
                  {program.pendingNote ? (
                    <span className="font-display text-label uppercase text-(--color-text-muted)">
                      {program.pendingNote}
                    </span>
                  ) : null}
                </div>
                {/* The one verified line this programme publishes about itself. */}
                <p className="mt-2 max-w-[58ch] font-body text-body-sm text-(--color-text-secondary) lg:ml-[84px]">
                  {program.summary}
                </p>
              </li>
            )
          })}
        </ol>
            <p className="mt-8 max-w-[62ch] font-body text-body-md italic text-(--color-text-muted)">
              {programsSection.lead}
            </p>
          </div>

          {/*
            The rail, and the same photograph re-cropped rather than dropped.

            At `lg` it is the third column: a 240px vertical rail at the crop's
            own 600×1500, sticky, so it holds while the six programmes pass it.

            Below `lg` the grid collapses and a 975px-tall column would be a
            scroll of its own, so the same file is boxed at 3:2 instead and
            `object-position` pulls the frame down to the hand on the neck —
            which is the half of the photograph that survives a landscape crop.
            One element, two intentional crops. The phone gets the picture; it
            does not get the rail, because there is nothing to run a rail
            alongside once the layout is a single column.
          */}
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-(--color-ground-pitch) lg:sticky lg:top-24 lg:aspect-[600/1500]">
            <MediaReview
              asset="bass-hands"
              job="Programs — the scroll of an upright bass and a hand on its neck"
              alt="The carved scroll of an upright bass rising above a student's hand gripping the instrument's neck, in a bright room at South Dade Music."
              fallback="instrument-strings"
              fallbackAlt="A close study of steel strings crossing a wooden bridge, lit by one warm beam."
              fallbackPosition="center center"
              position="center 72%"
              sizes="(min-width: 1024px) 240px, 100vw"
            />
          </div>
        </div>
      </FilmMargin>
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
        {/*
          EE1 — the format question, answered with two destinations.

          "Private or group?" is the first question a parent asks about lessons
          and the homepage had no answer and no route for it: group learning
          appeared nowhere on the page except as a name in the playbill.
        */}
        <p className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {lessonsSection.formats.map((format) => (
            <Link
              key={format.href}
              href={format.href}
              className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
            >
              {format.label}
            </Link>
          ))}
          <Link
            href={lessonsSection.cta.href}
            className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-muted) underline underline-offset-[6px]"
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
        {/*
          MI2 — the schedule now gets brighter as it approaches the stage.

          §8 of the brief: keep the factual week structure, but let the visitor
          understand progression visually rather than from three text rows.

          There is **no photograph here on purpose.** No week-by-week
          photography exists in the estate, and dropping a recital picture next
          to "weeks 1–10" would be illustrating a claim with an image of a
          different thing. What the estate does support is the film's own
          language: one light source, house right, getting stronger as she gets
          closer to it.

          So each row carries a light that intensifies — a warm wash from the
          right at 0 / 0.10 / 0.28, and a rule that goes from hairline grey to
          full ink on the final row. The row about the live showcase is
          physically the brightest thing in the section. Nothing is claimed that
          is not already in the words.

          The wash is a plain gradient, not an image: it costs no bytes, needs
          no consent, and cannot be mistaken for documentary evidence.
        */}
        <dl className="mt-10">
          {twelveWeeks.rows.map((row, index) => {
            const glow = [0, 0.1, 0.28][index] ?? 0
            const last = index === twelveWeeks.rows.length - 1
            return (
              <div
                key={row.id}
                className={`relative isolate flex flex-wrap items-baseline gap-x-10 gap-y-1 overflow-hidden py-5 ${
                  last
                    ? 'border-t-2 border-(--color-text-primary)'
                    : 'border-t border-(--color-border-default)'
                }`}
              >
                {glow ? (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{
                      backgroundImage: `linear-gradient(90deg, transparent 30%, rgba(233,162,59,${glow}) 100%)`,
                    }}
                  />
                ) : null}
                <dt className="w-32 shrink-0 font-display text-label uppercase tabular-nums text-(--color-text-muted)">
                  {row.week}
                </dt>
                <dd
                  className={`font-body text-body-lg text-(--color-text-primary) ${
                    last ? 'italic' : ''
                  }`}
                >
                  {row.what}
                </dd>
              </div>
            )
          })}
        </dl>
        <p className="mt-6 font-body text-body-sm text-(--color-text-muted)">{twelveWeeks.footnote}</p>

        {/*
          EE1 — the shy question, restored beside the schedule that provokes it.

          Both lines verbatim. 07-the-walk.md §ACT V called this the emotional
          hinge of the page and it was never built; the estate has kept it inside
          an FAQ accordion for two years. A parent reading "week 11 — they play
          for the class" is at the exact moment of doubt this answers.
        */}
        <div className="mt-12 border-t border-(--color-border-default) pt-8">
          <p className="max-w-[24ch] font-body text-display-md italic leading-[1.3] text-(--color-text-primary)">
            {shyQuestion.question}
          </p>
          <p className="mt-5 max-w-[58ch] font-body text-body-lg text-(--color-text-secondary)">
            {shyQuestion.answer}
          </p>
        </div>
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
      className="pb-(--section-feature)"
    >
      {/*
        MI2 — "here is visual evidence of the place where it happens", set
        directly above the words that say it happened.

        `the-room` is audit #26, cropped to the lower band of the frame: rows of
        folding chairs in this academy's recital room with an audience seated in
        them, **photographed entirely from behind**. Not one face appears, at
        any resolution, which is why this crop exists at all — the full frame is
        gated and unusable.

        It is a horizontal band rather than a plate on purpose. This movement is
        testimony about a room with the lights down, and a band the width of the
        page puts the reader at the back of that room, at seated eye height,
        looking at the same thing the quotes below are describing.

        ⚠️ This is a real audience at a real event and it is deliberately NOT
        captioned as a full house — it shows occupied and empty chairs, which is
        what the photograph shows. Tier B; I-7 unconfirmed; the original never
        leaves `.audit/`.
      */}
      <div className="relative mb-(--section-comfortable) aspect-[2000/716] w-full overflow-hidden bg-(--color-ground-pitch)">
        <MediaReview
          asset="the-room"
          job="Performance evidence — the recital room, from the back, mid-audience"
          alt="Rows of black folding chairs in the South Dade Music recital room, with people seated in them seen from behind."
          fallback="atmos-stage-floor"
          fallbackAlt="Bare stage boards lit by beams falling through haze."
          fallbackPosition="center 60%"
          position="center center"
          sizes="100vw"
        />
      </div>

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
      <TheHouse />
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
