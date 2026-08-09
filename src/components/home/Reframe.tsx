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
      <Movement
        name="reframe"
        ground="memory"
        aria-labelledby="reframe-heading"
        /*
          EE2 — `min-h-svh` → 78svh. The diagonal needs vertical distance
          between the two corners to read as a hinge; it does not need a full
          screen. At 78% the gap is still the widest on the page and the
          movement gives back ~200px.
        */
        className="flex min-h-[78svh] flex-col justify-between py-(--section-spacious)"
      >
        <FilmMargin>
          <p className="max-w-[380px] font-body text-whisper italic text-(--color-ash)">
            {reframe.recognition}
          </p>
        </FilmMargin>

        <FilmMargin>
          <h2
            id="reframe-heading"
            className="ml-auto max-w-[560px] text-right font-display text-display-lg text-(--color-text-primary)"
            style={{ fontVariationSettings: "'opsz' 48, 'wght' 600" }}
          >
            {reframe.hinge}
          </h2>
        </FilmMargin>
      </Movement>

      {/*
        MOVEMENT 4 — The Turn. Ground: wing. Whisper only, eight-word cap.
        Visual Specification.md §D: "one thought, held". It gets its own screen
        and nothing else is on it.
      */}
      <Movement
        name="the-turn"
        ground="wing"
        /*
          EE2 — 70svh → 52svh. One line, held. It was being held in half a
          screen of empty space above and below; 52% still isolates it
          completely and returns ~160px.
        */
        className="flex min-h-[52svh] items-center py-(--section-spacious)"
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

        <FilmMargin className="relative z-[2]">
          <p className="max-w-[640px] font-body text-whisper italic text-(--color-ash)">
            {theTurn.line}
          </p>
        </FilmMargin>
      </Movement>
    </>
  )
}
