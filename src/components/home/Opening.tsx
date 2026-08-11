import { Button } from '@/components/ui/Button'
import { FilmMargin, FilmVideo, GhostNumeral, Movement, Seam } from '@/components/film'
import { hero } from '@/content/home'
import { siteConfig } from '@/config/site'

/**
 * SHOTS 01–02 — the hero, and the only header this page has.
 *
 * The Film.html shot 01: *"Locked off. Eye height, backstage. 50mm. Nothing is
 * dramatized. The seam under the door. Nothing else. Held breath — the sentence
 * is unfinished on purpose."*
 *
 * Shot 02 completes it: *"Same position. The room answered, not the camera.
 * The door has opened a hand's width. Amber spills 260px. Reveal by light, not
 * by motion — the type was always there; the light finds it."*
 *
 * ## There is no header component here
 *
 * HANDOFF §3.6: the homepage has no navigation bar. The wordmark runs
 * vertically up the left frame edge, the tagline exits vertically at the
 * footer, and one CTA sits in the frame. Interior routes keep the existing
 * header in the desk register.
 *
 * ## Why nothing animates in
 *
 * Both states are in the DOM at first paint. The hero's whole grammar is that
 * the words are already in the room and the light discovers them — so the
 * opening timeline moves `--seam-width` and `--seam-spill`, never the type.
 * A script failure leaves a fully readable hero with the seam at its open
 * width, which is the correct still frame.
 */
export function Opening() {
  const [whisperLine, ...statementLines] = hero.headingLines

  return (
    <Movement
      name="opening"
      ground="pitch"
      aria-labelledby="hero-heading"
      className="flex min-h-svh flex-col justify-end overflow-hidden pb-(--section-spacious) pt-(--section-feature)"
    >
      <Seam />

      {/*
        THE BACKSTAGE, VISIBLE FROM THE FIRST FRAME.

        The footage was generated for The Walk and mounted only there — which
        begins 1,772px down, two full viewports below the fold. The opening
        viewport had no media layer at all, so the hero was type and a ghost
        numeral on flat black and nothing else. Dark was doing all the work and
        empty was the result.

        The same clip now opens the film. It is deliberately *not* a video hero:
        it occupies the lower two-thirds, is masked upward so it dissolves into
        the dark rather than ending on an edge, and sits under every text layer.
        What a visitor should perceive is a room — curtain edge, boards, a warm
        seam of light, dust moving — not a playing video.

        Opacity is 0.42 here against 0.18 at the top of the Walk. The hero is the
        one place the environment has to establish itself; the Walk then starts
        low again and climbs, so the arc still reads as light finding the floor.
      */}
      <FilmVideo
        name="walk-backstage"
        job="The opening — the backstage room the film begins in"
        opacity={0.42}
        className="top-auto bottom-0 h-[66%]"
        style={{
          maskImage:
            'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 46%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 46%, rgba(0,0,0,0) 100%)',
        }}
      />


      {/*
        The ghost "90". Bled off the right edge, sitting 3–5% above pitch so it
        reads as something painted on the back wall rather than as a number to
        be read. The figure it gestures at is stated legibly in the supporting
        line and again in the twelve-week table — the ghost is never the only
        place a number appears.
      */}
      <GhostNumeral
        value="90"
        color="#0C1018"
        className="-right-[5vw] top-[12%] leading-none"
      />

      {/*
        The vertical wordmark — the film's only masthead, present at every
        width. The Film.html M-01 keeps it on the phone at 10px and drops the
        locality, because at 390px the frame edge is only 16px from the type
        and the longer lockup would collide with it.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-[92px] lg:left-[var(--grid-margin)] lg:top-[110px]"
      >
        <span
          className="font-display text-[10px] uppercase tracking-[0.18em] text-(--color-ash) lg:text-label"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {siteConfig.shortName}
          <span className="hidden lg:inline"> · Florida City</span>
        </span>
      </div>

      <FilmMargin className="relative z-[3]">
        <div className="flex flex-col gap-(--section-comfortable) lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="w-full lg:max-w-[640px]">
            {/*
              EE2 — the programme, named, in the first frame.

              `hero.eyebrow` has existed in the content module since the copy
              framework was written and was never rendered. The homepage sold a
              named flagship product without naming it until 9,769px down the
              page.

              It is set in the label register — a programme note, not a hero
              eyebrow. The direction's rule that no logo appears in the first
              five seconds is about the *wordmark*; the name of tonight's
              production belongs on the bill.
            */}
            {/*
              ⚠️ `--color-ash`, not `--color-spot-700`.

              Amber first reading of this label was 3.42:1 on the pitch ground —
              below the 4.5:1 AA floor for 12px text, and invisible to
              `check:tokens`, which only validates the pairs it declares. Ash is
              5.3:1 on pitch and is the register the film already speaks in.

              It also protects the rationing rule: amber appears exactly four
              times on this page — the seam, the source in the Walk, the flash,
              and the CTA fill. A fifth use is what makes the other four stop
              meaning anything.
            */}
            <p className="font-display text-label uppercase text-(--color-ash)">
              {hero.eyebrow}
            </p>

            <p className="mt-6 font-body text-whisper italic text-(--color-ash)">{whisperLine}</p>

            <h1
              id="hero-heading"
              className="mt-4 font-display text-display-lg text-(--color-text-primary)"
              style={{ fontVariationSettings: "'opsz' 48, 'wght' 600" }}
            >
              {statementLines.join(' ')}
            </h1>

            <p className="mt-5 font-body text-whisper italic text-(--color-ash)">{hero.supporting}</p>

            {/*
              EE2 — who and where, in the first viewport.

              Measured before this change: a visitor met the words "South Dade
              Music" in readable text for the first time at y=9,102px, and the
              only wordmark above that was the vertical lockup on the frame
              edge — which is `aria-hidden`, so for a screen reader the first
              statement of identity was the copyright line in the footer.

              This is one line of stage direction at 12px. It does not turn the
              opening into a conventional hero, and it does not raise its voice:
              it simply means the visitor knows whose film they are watching
              before they commit seven screens to it.
            */}
            <p className="mt-9 font-display text-label uppercase text-(--color-text-muted)">
              {hero.identity}
            </p>
          </div>

          <div className="shrink-0">
            <Button href={hero.primaryCta.href} size="lg" price={hero.primaryCta.price}>
              {hero.primaryCta.label}
            </Button>
          </div>
        </div>
      </FilmMargin>
    </Movement>
  )
}
