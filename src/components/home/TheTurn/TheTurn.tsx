import Image from 'next/image'

import { Container } from '@/components/ui/Container'
import { theTurn } from '@/content/home'

/**
 * §11 — The Turn.
 *
 * **The one shout on the page.**
 *
 * Everything else lives between 17px and 48px. This is the only place the page
 * raises its voice, and it does so for a single sentence that the business
 * already owns — the line Phase 3 identified as the best on the current site,
 * currently buried inside a four-pillar block.
 *
 * It sits *after* the price, not before. Placed earlier it is a nice sentiment;
 * placed here it is the answer to the question the price just raised — *is it
 * worth it?*
 *
 * One `fade-rise`. Not `curtain-up`: the page's two masked reveals are spent on
 * the hero and the Reframe, and a third would make the device a mannerism.
 */
export function TheTurn() {
  return (
    <section
      data-film="turn"
      data-register="house"
      aria-label="What your child is actually learning"
      className="relative isolate flex min-h-[86svh] items-center overflow-clip bg-stage-950 py-(--section-feature)"
    >
      {/*
        One shaft, from above right. The brightest ground on the page after the
        hero — the light has finally arrived, and it is behind the words rather
        than on them.
      */}
      {/*
        Curtain depth. Held at 16% — at full strength a curtain texture is the
        fastest route to dinner-theatre (final-art-direction.md §15). At this
        opacity the vertical folds read as depth behind the words, and nobody
        consciously identifies them as fabric.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.16]">
        <Image
          src="/images/generated/atmos-curtain-shadow.jpg"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover plate"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(58%_78%_at_74%_-8%,rgba(245,165,36,0.2),transparent_66%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-stage-950 to-transparent"
      />

      <Container width="wide">
          {/*
            Hung left, ragged right, four to six lines. Never centred: centred
            display type reads wedding-invitation, and this sentence has to
            sound like a person saying it.
          */}
          <p data-turn-line className="max-w-[17ch] font-display text-display-lg leading-[1.06] font-bold tracking-[-0.025em] text-n-0 md:font-expanded lg:max-w-[19ch]">
            {theTurn.line}
          </p>
      </Container>
    </section>
  )
}
