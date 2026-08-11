import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, GhostNumeral, Movement } from '@/components/film'
import { Photo } from '@/components/media/Photo'
import { DeskLabel, PageIntro } from '@/components/page'
import { performanceEvidence, testimonialsSection } from '@/content/home'
import { contactFacts, ninetyDayPage, trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: '90-Day Stage Program',
  description:
    'From the practice room to the spotlight in three months. A step-by-step plan that prepares students for a live performance — the work, the turn, and the stage.',
  path: '/programs/90-day-stage-program',
})

/**
 * /programs/90-day-stage-program — the flagship. **Reconstructed in EE3.1.**
 *
 * ## What was wrong
 *
 * The page shipped every publishable fact it had and was still failing. Its
 * shape was: intro → week grid → three steps → *four consecutive bullet
 * lists* → guarantee. 7,303px at 61 words per 1000px, and a parent had to
 * assemble the programme in their own head out of four lists that never
 * referenced each other.
 *
 * Worse, three verbatim blocks had never been migrated at all — including the
 * page's own hero subtitle and the only passage that explains *why performance
 * is in the programme*, which is the objection a parent actually arrives with.
 *
 * ## The shape now
 *
 *   THE OFFER      what it is, in the first viewport, before any atmosphere
 *   WHY THE STAGE  the recovered reason performance exists here
 *   THE JOURNEY    three steps and the week bands as ONE sequence, not two
 *   WHAT CHANGES   two outcome lists set side by side as one movement
 *   THE END        the recovered finale, the stage plate, and the proof
 *   WHO IT IS FOR  + the guarantee and the single call to action
 *
 * Six movements where there were nine, and the four consecutive lists are gone.
 *
 * ## Relationship to the homepage
 *
 * The homepage makes you *feel* the walk; this page makes you *understand* it.
 * Same vocabulary — ghost numerals, the film margin, stage language, rationed
 * amber, asymmetry — deliberately without replaying the film. There is no pin,
 * no letterbox and no grain here: this is the desk.
 *
 * ## ⚠️ What still does not ship
 *
 * **The performance promise.** Gate B-4. The footer says "every student
 * performs"; this page's own source says students "get the chance to perform".
 * The conditional ships verbatim; the unconditional claim does not.
 *
 * **The research sentence.** The source justifies performance with "In fact,
 * music programs that offer real performance opportunities…" and cites nothing.
 * The extraction flags it for sourcing. Withheld.
 *
 * **Tuition** (B-8) and **session frequency** — neither is published anywhere.
 */
export default function NinetyDayStageProgramPage() {
  /*
   * The only quote in the corpus that describes the concert itself. The source
   * flagship page carries **no proof of any kind** — no outcome, no parent
   * quote, no photograph, no video — so this is placed at the finale, where the
   * claim it supports is actually made.
   */
  const showcaseQuote = performanceEvidence.quotes.find((q) => q.id === 'dexter')

  return (
    <>
      {/*
        THE OFFER.

        Clarity first. The homepage has already earned the right to open on
        atmosphere; this page has not, and should not try — a visitor arriving
        here has a specific question and wants it answered before anything is
        asked of them.

        No call to action in this viewport. The header carries a persistent
        priced trial button on every interior route, so the action is never more
        than one glance away, and the page can afford to explain itself first.
      */}
      <PageIntro
        eyebrow={ninetyDayPage.eyebrow}
        heading={ninetyDayPage.title}
        lead={ninetyDayPage.lead}
      >
        {/* ✅ VERBATIM hero subtitle — recovered in EE3.1. */}
        <p className="mt-7 max-w-[26ch] font-body text-display-md italic leading-[1.25] text-(--color-text-primary)">
          {ninetyDayPage.subtitle}
        </p>

        <dl className="mt-11 grid max-w-[760px] gap-x-10 gap-y-6 sm:grid-cols-3">
          {[
            { k: 'How long', v: 'About three months' },
            { k: 'Who', v: 'Kids and teens' },
            { k: 'It ends with', v: 'A live performance' },
          ].map((f) => (
            <div key={f.k} className="border-t border-(--color-border-default) pt-4">
              <dt className="font-display text-label uppercase text-(--color-text-muted)">{f.k}</dt>
              <dd className="mt-2 font-body text-body-lg text-(--color-text-primary)">{f.v}</dd>
            </div>
          ))}
        </dl>
      </PageIntro>

      {/*
        WHY THE STAGE — recovered in EE3.1.

        The objection this page exists to answer, and it was not being
        answered anywhere. Set as the one raised voice on the page, with the
        audience line that resolves the fear directly beneath it: a parent
        worried this is for already-confident children is told, in the
        programme's own words, that it is for the opposite.
      */}
      <Movement name="why-stage" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr data-desk-rule className="origin-left border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>{ninetyDayPage.whyStage.heading}</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              <p className="max-w-[24ch] font-display text-display-md leading-[1.25] text-(--color-text-primary)">
                {ninetyDayPage.whyStage.body}
              </p>
              <p className="mt-8 max-w-[58ch] font-body text-body-lg text-(--color-text-secondary)">
                It is built for students who need that, not only for those who already have it —
                the programme lists{' '}
                <span className="text-(--color-text-primary)">
                  “{ninetyDayPage.audience.items[3].toLowerCase()}”
                </span>{' '}
                among the people it is for.
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>

      {/*
        THE JOURNEY — three steps and the week bands as one sequence.

        These were two separate movements: a week grid, then a three-step
        narrative several screens later, with no indication they described the
        same ninety days. The source supports both — the week bands come from
        the homepage and /programs, the three steps from this page — so they are
        composed together rather than stacked apart.

        The ghost numeral is the step number, not decoration: it is the same
        device the film uses for its week numbers, and every one has a legible
        counterpart in the copy beside it.

        ⚠️ The week bands are attributed as published elsewhere, because this
        page's own source gives the three steps with no week numbers at all.
      */}
      {/*
        PRACTICE — the first stage of the arc, and the only one without a
        photograph until now.

        Audit #13: an instructor at the keyboard with a student beside him and
        another student on the kit behind, an audience already in the room. The
        page sells practice → preparation → stage → outcome, and it was
        illustrating the last three.
      */}
      <Movement name="practice" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr data-desk-rule className="origin-left border-0 border-t border-(--color-border-default)" />
          <figure className="pt-(--section-comfortable)">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-(--radius-media-sm) sm:rounded-(--radius-media) bg-(--color-ground-pitch) sm:aspect-[2.2/1]">
              <Photo
                id="lesson-duet"
                alt="A South Dade Music instructor playing a keyboard beside a student, with another student at a drum kit behind them and an audience seated in front."
                position="center 45%"
                sizes="100vw"
              />
            </div>
            <figcaption className="mt-3 font-display text-label uppercase text-(--color-text-muted)">
              The weeks before
            </figcaption>
          </figure>
        </FilmMargin>
      </Movement>


      {/*
        PREPARATION — approved portfolio, published. Audit #54.

        The room as it is set on showcase day, before anyone is on it. It sits
        immediately before the three steps, so the sequence the page describes —
        practice, preparation, stage, outcome — has the preparation stage
        photographed rather than only named.
      */}
      <Movement name="preparation" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr data-desk-rule className="origin-left border-0 border-t border-(--color-border-default)" />
          <div className="relative mt-(--section-comfortable) aspect-[16/10] w-full overflow-hidden rounded-(--radius-media-sm) sm:rounded-(--radius-media) bg-(--color-ground-pitch) sm:aspect-[2.2/1]">
            <Photo
              id="stage-set-purple"
              alt="The South Dade Music stage dressed for a showcase: a drum kit, congas and keyboards under purple lighting, with the academy banner beside them."
              position="center 58%"
              sizes="100vw"
            />
          </div>
        </FilmMargin>
      </Movement>

      <Movement name="journey" ground="house" className="relative overflow-hidden pb-(--section-spacious)">
        <FilmMargin wide>
          <hr data-desk-rule className="origin-left border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>The ninety days</DeskLabel>
            </div>

            <ol className="max-w-[840px]">
              {ninetyDayPage.steps.map((step, index) => {
                const band = ninetyDayPage.weeks[index]
                return (
                  <li
                    key={step.id}
                    className="relative grid gap-x-10 gap-y-3 border-t border-(--color-border-default) py-10 sm:grid-cols-[132px_minmax(0,1fr)]"
                  >
                    <div>
                      <p
                        aria-hidden="true"
                        className="font-display text-[64px] leading-none tabular-nums text-(--color-n-200)"
                        style={{ fontVariationSettings: "'opsz' 96, 'wght' 200" }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      {band ? (
                        <p className="mt-2 font-display text-label uppercase tabular-nums text-(--color-text-muted)">
                          {band.label}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <h2 className="font-body text-heading-lg italic text-(--color-text-primary)">
                        {step.title}
                      </h2>
                      <p className="mt-3 max-w-[58ch] font-body text-body-lg text-(--color-text-secondary)">
                        {step.body}
                      </p>
                      {band ? (
                        <p className="mt-3 max-w-[58ch] font-body text-body-md text-(--color-text-muted)">
                          {band.what}
                        </p>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <p className="mt-8 max-w-[62ch] font-body text-body-sm text-(--color-text-muted) lg:ml-[284px]">
            The week bands are as published on the homepage and the programmes hub. This
            programme’s own page describes the same three months as a three-step journey without
            week numbers, and both descriptions ship as written.
          </p>
        </FilmMargin>
      </Movement>

      {/*
        WHAT CHANGES — two lists, one movement.

        "Build Confidence" and "Learn Real Performance Skills" were two
        consecutive full-width bullet lists, which is how they arrived from the
        source and how a CMS would render them. They are two halves of one
        answer — what a child leaves with — so they are set as two columns of
        one movement and read as a pair.
      */}
      <Movement name="what-changes" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr data-desk-rule className="origin-left border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>What changes</DeskLabel>
            </div>
            <div className="grid max-w-[840px] gap-10 sm:grid-cols-2 sm:gap-12">
              {[ninetyDayPage.confidence, ninetyDayPage.skills].map((group) => (
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
        THE END — the recovered finale, the stage, and the only proof that exists.

        The plate here arrives after three steps of preparation, directly under
        the sentence about the end of the ninety days, so it reads as *this is
        where the work has been going*. Until MI1 it was the generated
        `stage-empty-chair`; it is now the medals, which say the same thing
        without having to be read as a metaphor. See the note below.

        Full-bleed and letterboxed, because this is the one moment on the desk
        where the film's frame is the right register — and it is immediately
        followed by the verbatim finale, so the image never has to carry meaning
        the copy has not already earned.

        ⚠️ The conditional "get the chance to perform" is preserved exactly.
      */}
      <Movement name="the-end" ground="pitch" className="relative overflow-hidden">
        <div className="rounded-(--radius-media-sm) sm:rounded-(--radius-media) relative aspect-[21/9] w-full sm:aspect-[2.39/1]">
          {/*
            MI1 — the generated chair gives way to what the ninety days actually
            end in.

            `medals` is audit #23: the showcase medals laid out on the table
            before the recital, photographed at this academy. No people in the
            frame at all.

            It is a better finale than a chair because it is the *outcome*
            rather than a metaphor for it — and it is the only image in the
            estate that shows the end of the cycle without showing a child.

            ⚠️ PREVIEW ONLY. Copyright (I-7) unconfirmed.
          */}
          <Photo
            id="medals"
            alt="Rows of gold medals on red, white and blue ribbons laid out on a table before a South Dade Music showcase."
            position="center 55%"
            sizes="100vw"
          />
          <GhostNumeral
            value="90"
            color="rgba(233,162,59,0.14)"
            className="-right-[3vw] bottom-[-12%] leading-none"
          />
        </div>
      </Movement>

      <Movement name="finale" ground="house" className="py-(--section-spacious)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>{ninetyDayPage.finale.heading}</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              <p className="max-w-[30ch] font-display text-display-md leading-[1.25] text-(--color-text-primary)">
                {ninetyDayPage.finale.body}
              </p>

              {showcaseQuote ? (
                <figure className="mt-11 border-l-2 border-(--color-border-default) pl-7">
                  <blockquote className="max-w-[52ch] font-body text-heading-lg italic leading-[1.45] text-(--color-text-secondary)">
                    &ldquo;{showcaseQuote.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 font-display text-label uppercase text-(--color-text-muted)">
                    {showcaseQuote.author} · {testimonialsSection.sourceLabel}
                  </figcaption>
                </figure>
              ) : null}

              <p className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
                <Link
                  href="/performances"
                  className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
                >
                  More from families who were there
                </Link>
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>

      {/*
        THE OUTCOME — approved portfolio, published. Audit #28.

        Students on stage with their medals at the end of a showcase. This is
        the only frame in the estate that photographs the thing the whole
        programme is sold on, and it belongs directly after the finale copy
        rather than in a gallery.
      */}
      <Movement name="outcome" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <figure>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-(--radius-media-sm) sm:rounded-(--radius-media) bg-(--color-ground-pitch) sm:aspect-[2/1]">
              <Photo
                id="medals-on-stage"
                alt="South Dade Music students standing together on stage wearing medals at the end of a showcase."
                position="center 45%"
                sizes="100vw"
              />
            </div>
            <figcaption className="mt-3 font-display text-label uppercase text-(--color-text-muted)">
              The end of a ninety days
            </figcaption>
          </figure>
        </FilmMargin>
      </Movement>

      {/*
        WHO IT IS FOR, WHERE THE PLAYING HAPPENS, AND THE ONE CALL TO ACTION.

        Three short blocks that a parent needs immediately before deciding,
        composed as one movement rather than three sections. The guarantee is
        the loudest thing here because it is the strongest sentence the business
        owns — and this page's own source does not carry it at all, which is why
        it is attributed rather than presented as this page's copy.
      */}
      <Movement name="decide" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr data-desk-rule className="origin-left border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>{ninetyDayPage.audience.heading}</DeskLabel>
            </div>

            <div className="max-w-[840px]">
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {ninetyDayPage.audience.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-(--color-border-default) py-4 font-body text-body-lg text-(--color-text-primary)"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-9 max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
                The instrument itself is taught in{' '}
                <Link
                  href="/private-lessons"
                  className="text-(--color-text-primary) underline underline-offset-[6px]"
                >
                  private lessons
                </Link>
                , and playing alongside other people is what{' '}
                <Link
                  href="/programs/band-builders"
                  className="text-(--color-text-primary) underline underline-offset-[6px]"
                >
                  Band Builders
                </Link>{' '}
                and{' '}
                <Link
                  href="/group-music-lessons"
                  className="text-(--color-text-primary) underline underline-offset-[6px]"
                >
                  group lessons
                </Link>{' '}
                are for.
              </p>

              <div className="mt-12 border-t-2 border-(--color-text-primary) pt-9">
                <p className="font-display text-label uppercase text-(--color-text-muted)">
                  {ninetyDayPage.guarantee.label}
                </p>
                <p className="mt-5 max-w-[46ch] font-display text-display-md leading-[1.25] text-(--color-text-primary)">
                  {ninetyDayPage.guarantee.text}
                </p>
                <p className="mt-8 max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
                  {trialOffer.terms}
                </p>
                <div className="mt-9">
                  <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
                    Book a Trial
                  </Button>
                </div>
                <p className="mt-10 max-w-[62ch] font-body text-body-sm text-(--color-text-muted)">
                  We serve families in {contactFacts.serviceArea.join(', ')}, and nearby areas.
                </p>
              </div>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
