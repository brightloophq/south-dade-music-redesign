import { Button } from '@/components/ui/Button'
import { FilmMargin, GhostNumeral, Movement, Seam } from '@/components/film'
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
            <p className="font-body text-whisper italic text-(--color-ash)">{whisperLine}</p>

            <h1
              id="hero-heading"
              className="mt-4 font-display text-display-lg text-(--color-text-primary)"
              style={{ fontVariationSettings: "'opsz' 48, 'wght' 600" }}
            >
              {statementLines.join(' ')}
            </h1>

            <p className="mt-5 font-body text-whisper italic text-(--color-ash)">{hero.supporting}</p>

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
