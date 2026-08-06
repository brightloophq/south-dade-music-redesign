import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emerge } from '@/components/motion/Emerge'
import { testimonials, testimonialsSection } from '@/content/home'

/**
 * §8 — In their words.
 *
 * ## What changed in refinement
 *
 * This was five reviews in a three-column card grid — the internet's most
 * ignored object. A wall of equal-weight praise reads as decoration; the eye
 * skips it entirely.
 *
 * It is now **three pull-quotes at unequal scale**, placed asymmetrically down
 * the page with real silence between them. Two reviews were cut, because
 * removing is the refinement here: three quotes that are read beat five that
 * are scanned.
 *
 * The scale is deliberately uneven — the first quote is the largest because it
 * is the one that names the outcome the business sells (*progress in a few
 * months*), and the smallest is set almost as an aside. Equal weight is what
 * made the grid invisible.
 *
 * ⚠️ Selection rules are unchanged: verbatim or omitted, including mixed
 * Spanish/English and original spelling. The review naming a child is still
 * excluded pending guardian consent, and two religious reviews remain withheld
 * pending gate B-1. No `Review` schema is emitted — these are Google Business
 * Profile reviews and re-marking them as first-party is a guidelines violation.
 * No reviewer portraits: a face beside a real quote is fabricated social proof.
 */

/** Three quotes, at three deliberately different weights. */
const LAYOUT = [
  { id: 'yaimarelys-grandales', size: 'lead', offset: 'lg:col-span-8' },
  { id: 'maria-carolina-linares', size: 'mid', offset: 'lg:col-span-6 lg:col-start-6' },
  { id: 'nikin-shah', size: 'aside', offset: 'lg:col-span-5 lg:col-start-2' },
] as const

const sizeClass = {
  lead: 'font-display text-display-md leading-[1.14] font-semibold',
  mid: 'font-display text-heading-lg leading-[1.2] font-semibold',
  aside: 'font-body text-body-lg leading-relaxed',
} as const

export function Testimonials() {
  const byId = new Map(testimonials.filter((entry) => !entry.namesMinor).map((entry) => [entry.id, entry]))

  return (
    <Section register="desk" density="spacious" id="testimonials" aria-labelledby="testimonials-heading" contained={false}>
      <Container width="wide">
        <h2
          id="testimonials-heading"
          className="font-body text-label font-semibold uppercase tracking-[0.14em] text-(--color-text-muted)"
        >
          {testimonialsSection.heading}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-y-28">
          {LAYOUT.map((slot) => {
            const entry = byId.get(slot.id)
            if (!entry) return null

            return (
              <figure key={entry.id} className={`col-span-1 ${slot.offset}`}>
                <Emerge>
                  <blockquote>
                    {/*
                      The opening quote mark hangs into the margin so the first
                      glyph of the sentence sits flush with the grid. Optical
                      alignment, not metric — it is the difference between type
                      that is set and type that is placed.
                    */}
                    <p className={`${sizeClass[slot.size]} text-(--color-text-primary) lg:-indent-[0.42em]`}>
                      &ldquo;{entry.quote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-baseline gap-3">
                    <span className="h-px w-8 shrink-0 bg-(--color-border-default)" aria-hidden="true" />
                    <cite className="font-body text-body-sm not-italic text-(--color-text-secondary)">
                      {entry.author}
                      <span className="text-(--color-text-muted)"> · {testimonialsSection.sourceLabel}</span>
                    </cite>
                  </figcaption>
                </Emerge>
              </figure>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
