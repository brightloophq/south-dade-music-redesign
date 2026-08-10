import { Atmosphere, FilmMargin, Movement } from '@/components/film'
import { reframe, theTurn } from '@/content/home'

/**
 * SHOT 03 — the Reframe, and the Turn that follows it.
 *
 * The Film.html: *"Reverse angle. We look back at the kitchen, not the stage.
 * 85mm. Close, private. None — the warmest dark on the site: memory, not fear.
 * Recognition. The diagonal is the hinge: problem upper-left, answer
 * lower-right."*
 *
 * ## The diagonal is the whole composition
 *
 * Two voices in opposite corners of a dark room. The parent's observation sits
 * upper-left in the whisper; the answer lands lower-right as a statement. The
 * reader's eye crosses the hinge, which is the persuasive move made physical —
 * this is the beat that shifts the problem from the child's character to a
 * teachable gap, and it is the most important twenty-three words on the page.
 *
 * The ground is `memory`: brown-black, not the blue-black of the walk. Nobody
 * names it; everybody feels that the past is a different temperature.
 *
 * There is no light in this movement. It is the coldest, darkest beat, and the
 * only one with no amber anywhere.
 */
export function Reframe() {
  return (
    <>
      {/*
        MI2 — THE REFRAME AND THE TURN ARE NOW ONE MOVEMENT.

        They were two consecutive dark screens carrying three short texts
        between them — 78svh + 52svh = 130svh of scroll for twenty-nine words,
        and two of the eight consecutive title cards the visitor crossed before
        reaching any evidence that this business exists.

        Nothing is cut. The diagonal still runs recognition (upper-left) →
        hinge (lower-right); the Turn's line now lands directly under the hinge
        as its coda, which is where it always belonged in meaning — it is the
        sentence that explains *why* the hinge is true. One screen, one
        argument, 88svh. The wings plate comes with it.
      */}
      <Movement
        name="reframe"
        ground="memory"
        aria-labelledby="reframe-heading"
        className="relative flex min-h-[88svh] flex-col justify-between overflow-hidden py-(--section-spacious)"
      >
        {/*
          THE WINGS — EE2.

          The Turn is the last beat before she steps out, and it was a line of
          type on flat colour. `atmos-curtain-shadow` is cloth in a raking beam:
          anticipation, the edge of the wings, the thing she is standing behind.

          ⚠️ Carried at `desaturate={0.35}`. The plate has pronounced magenta and
          crimson through its centre, which is outside the two-colour palette
          and would be the only decorative colour on the site. Desaturating in
          the browser removes the cast and keeps the composition; the
          alternative was rejecting a compositionally correct asset over a hue.

          Anchored right, because the light in this film is always house right.
        */}
        <Atmosphere
          asset="atmos-curtain-shadow"
          job="The Turn — cloth in a raking beam: the wings she is standing behind"
          opacity={0.22}
          position="82% center"
          desaturate={0.35}
          blend="screen"
          quality={46}
          maskImage="linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 100%)"
        />

        {/* Upper-left: the parent's observation. */}
        <FilmMargin className="relative z-[2]">
          <p className="max-w-[380px] font-body text-whisper italic text-(--color-ash)">
            {reframe.recognition}
          </p>
        </FilmMargin>

        {/* Lower-right: the answer, and the line that explains it. */}
        <FilmMargin className="relative z-[2]">
          <h2
            id="reframe-heading"
            className="ml-auto max-w-[560px] text-right font-display text-display-lg text-(--color-text-primary)"
            style={{ fontVariationSettings: "'opsz' 48, 'wght' 600" }}
          >
            {reframe.hinge}
          </h2>
          <p className="ml-auto mt-8 max-w-[440px] text-right font-body text-whisper italic text-(--color-ash)">
            {theTurn.line}
          </p>
        </FilmMargin>
      </Movement>
    </>
  )
}
