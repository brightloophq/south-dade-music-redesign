import { Container } from '@/components/ui/Container'
import { Emerge } from '@/components/motion/Emerge'
import { performanceEvidence } from '@/content/home'

/**
 * §7 — Performance gallery.
 *
 * ⚠️ **THE SPECIFIED FALLBACK IS IN USE.** Gates I-1 (no photo-release consent
 * for any of the 18 photographs) and I-4 (zero dated events) are both open.
 * `09-image-strategy.md` §8 bars undated performance imagery outright — an
 * undated photo cannot prove a recurring cycle — so the proof layer is the
 * three verbatim reviews that are themselves showcase evidence.
 *
 * ## What changed in refinement
 *
 * This was already the strongest section on the page and the treatment was
 * still timid: three equal columns with a left border on each, which is a card
 * grid wearing a different coat.
 *
 * It is now three quotes at full measure, stacked, with a viewport of darkness
 * around them and a hairline between. The section is the page's longest silence
 * after the Reframe, and the type is large enough that you cannot skim it.
 *
 * The staggered entrance was removed. Three quotes appearing one after another
 * on a timer is a slideshow; they now simply arrive as you reach them.
 */
export function PerformanceGallery() {
  return (
    <section
      data-register="house"
      aria-labelledby="performances-heading"
      className="relative isolate bg-stage-950 py-(--section-feature)"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_84%_10%,rgba(35,46,74,0.5),transparent_72%)]"
      />

      <Container width="wide">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2
            id="performances-heading"
            className="font-body text-label font-semibold uppercase tracking-[0.14em] text-n-500 lg:col-span-3"
          >
            {performanceEvidence.heading}
          </h2>
          <p className="font-body text-body-lg text-n-400 lg:col-span-8 lg:col-start-5">
            {performanceEvidence.lead}
          </p>
        </div>

        <div className="mt-20 flex flex-col">
          {performanceEvidence.quotes.map((entry, index) => (
            <figure
              key={entry.id}
              className={
                index === 0
                  ? 'py-12 lg:py-16'
                  : 'border-t border-stage-800 py-12 lg:py-16'
              }
            >
              <Emerge>
                <blockquote className="lg:grid lg:grid-cols-12 lg:gap-(--grid-gutter)">
                  <p className="font-display text-heading-lg leading-[1.24] font-semibold text-n-0 lg:col-span-9">
                    &ldquo;{entry.quote}&rdquo;
                  </p>
                  {/*
                    Attribution sits in its own column at the right, small and
                    quiet — the way a printed programme credits a source. It
                    does not compete with the sentence.
                  */}
                  <figcaption className="mt-6 font-body text-body-sm text-spot-400 lg:col-span-2 lg:col-start-11 lg:mt-2 lg:text-right">
                    {entry.author}
                  </figcaption>
                </blockquote>
              </Emerge>
            </figure>
          ))}
        </div>

        {/*
          The gap is explained, not concealed. A parent who notices there are no
          showcase photographs should find the reason rather than a silence.
        */}
        <p className="mt-16 max-w-[52ch] border-t border-stage-800 pt-8 font-body text-body-sm text-n-500">
          {performanceEvidence.note}
        </p>
      </Container>
    </section>
  )
}
