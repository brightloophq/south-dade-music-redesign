import { Container } from '@/components/ui/Container'
import { reframe } from '@/content/home'

/**
 * §2 — The Reframe.
 *
 * The persuasive hinge, and the page's first silence.
 *
 * Twenty-three words in a full viewport of darkness. No image, no CTA, no
 * supporting paragraph, no eyebrow — an image here would give the parent
 * something to look at instead of something to think.
 *
 * The tonal step between the two lines *is* the argument: the recognition is
 * spoken in `n-400` (overheard, half-remembered), the reframe in `n-0` (said
 * directly to you). Nobody will name that; everybody will feel the second line
 * arrive closer than the first.
 *
 * Motion: one of the two permitted `curtain-up` moments on the page. The other
 * is the hero H1. There is no third.
 */
export function Reframe() {
  return (
    <section
      data-film="walk"
      data-register="house"
      aria-label="Why children freeze"
      className="relative isolate flex min-h-[78svh] items-center bg-stage-950 py-(--section-feature)"
    >
      {/* A single source, low and left — the room this sentence is spoken in. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_18%_88%,rgba(35,46,74,0.55),transparent_70%)]"
      />

      <Container width="wide">
        <p data-walk-line
          className="max-w-[22ch] font-display text-display-md leading-[1.12] font-semibold text-n-400 sm:max-w-[26ch]">
          {reframe.recognition}
        </p>

        {/*
          The gap between the two lines is the beat. It is deliberately larger
          than any other type gap on the page — the parent needs a moment to
          recognise themselves before they are told what it means.
        */}
        <p data-walk-line
          className="mt-12 max-w-[24ch] font-display text-display-md leading-[1.12] font-semibold text-n-0 sm:max-w-[28ch] lg:mt-16">
          {reframe.hinge}
        </p>
      </Container>
    </section>
  )
}
