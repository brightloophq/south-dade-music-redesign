'use client'

import type { Light } from './light'
import { rackFocus } from './camera'
import { reportProgressSilently, reportTimeline } from '../diagnostics'

type Gsap = typeof import('gsap').gsap
type SplitTextCtor = typeof import('gsap/SplitText').SplitText
type FlipCtor = typeof import('gsap/Flip').Flip
type ScrollTriggerCtor = typeof import('gsap/ScrollTrigger').ScrollTrigger

export interface FilmContext {
  gsap: Gsap
  ScrollTrigger: ScrollTriggerCtor
  SplitText: SplitTextCtor
  Flip: FlipCtor
  light: Light
  /** Collected so the director can revert every split on teardown. */
  splits: InstanceType<SplitTextCtor>[]
}

const q = <T extends Element = HTMLElement>(sel: string): T | null => document.querySelector<T>(sel)

/**
 * Split a block into lines and mask each one.
 *
 * `aria: 'auto'` keeps the original text as the element's accessible name, so a
 * screen reader reads the sentence, not a pile of divs. Every split is recorded
 * so `revert()` can restore the original DOM on teardown — an un-reverted split
 * is a permanent DOM mutation and the most common SplitText leak.
 */
function splitLines(ctx: FilmContext, target: Element) {
  const split = new ctx.SplitText(target, {
    type: 'lines',
    linesClass: 'film-line',
    mask: 'lines',
    aria: 'auto',
  })
  ctx.splits.push(split)
  return split
}

// ---------------------------------------------------------------------------
// 0 · THE GRADE
// ---------------------------------------------------------------------------

/**
 * The colour evolution, five stops, smoothstepped.
 *
 *   deep charcoal → warm amber → soft ivory → golden stage light → quiet dark
 */
const GRADE_STOPS: readonly { at: number; rgb: readonly [number, number, number]; warmth: number }[] = [
  { at: 0.0, rgb: [20, 20, 26], warmth: 0.08 },
  { at: 0.26, rgb: [245, 165, 36], warmth: 0.72 },
  { at: 0.52, rgb: [250, 246, 238], warmth: 0.34 },
  { at: 0.78, rgb: [255, 193, 92], warmth: 0.88 },
  { at: 1.0, rgb: [10, 12, 18], warmth: 0.1 },
]

const smooth = (t: number): number => t * t * (3 - 2 * t)

/**
 * **GradeTimeline** — the film's colour timing.
 *
 * ⚠️ **REGRESSION FIX.** Phase 5F built this ramp inside `LightField`. Phase 6
 * deleted that component and moved its job to the Light character — but nothing
 * ever called `light.tint()`, so the entire colour evolution became dead code.
 * The runtime probe caught it: `--atmos-tint` measured **one single value across
 * the whole document**.
 *
 * It also fixes a second, larger problem the probe exposed. Moods only change at
 * act boundaries, so between the Journey and the Turn — roughly 6,000px covering
 * Programs, Lessons, Performances and Testimonials — **nothing touched the light
 * at all.** A document-wide scrub means the page is never inert, even where no
 * act owns it.
 */
export function GradeTimeline(ctx: FilmContext): void {
  const { ScrollTrigger, light } = ctx

  reportTimeline('GradeTimeline', { created: true, triggerFound: true, targetsFound: GRADE_STOPS.length, scrub: true })

  ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress
      reportProgressSilently('GradeTimeline', p)

      let lower = GRADE_STOPS[0]!
      let upper = GRADE_STOPS[GRADE_STOPS.length - 1]!
      for (let i = 0; i < GRADE_STOPS.length - 1; i += 1) {
        if (p >= GRADE_STOPS[i]!.at && p <= GRADE_STOPS[i + 1]!.at) {
          lower = GRADE_STOPS[i]!
          upper = GRADE_STOPS[i + 1]!
          break
        }
      }

      const span = upper.at - lower.at
      const k = span === 0 ? 0 : smooth((p - lower.at) / span)

      light.tint(
        lower.rgb[0] + (upper.rgb[0] - lower.rgb[0]) * k,
        lower.rgb[1] + (upper.rgb[1] - lower.rgb[1]) * k,
        lower.rgb[2] + (upper.rgb[2] - lower.rgb[2]) * k,
      )
      light.warmth(lower.warmth + (upper.warmth - lower.warmth) * k)

      /*
       * A slow drift through the reading middle.
       *
       * Between the Journey release and the Turn (~0.36–0.80 of the document)
       * no act owns the lamp, and the probe measured its position frozen at a
       * single value for roughly 6,000px. The houselights are up there by
       * design — motion recedes as the visitor nears a decision — but "calm"
       * should not mean "dead". This is a very slow arc, well under the rate
       * the eye tracks as movement.
       *
       * Gated by range so it can never fight an act that has claimed the lamp.
       */
      if (p > 0.36 && p < 0.8) {
        const k = (p - 0.36) / 0.44
        light.to(78 - k * 26, 30 + Math.sin(k * Math.PI) * 16)
      }

      document.documentElement.style.setProperty('--scroll-progress', p.toFixed(4))
    },
  })
}

// ---------------------------------------------------------------------------
// 1 · HERO
// ---------------------------------------------------------------------------

/**
 * **HeroTimeline** — the opening shot.
 *
 * Two parts: a timed entrance (the lamp is already warm when you arrive — the
 * house before the show), and a scroll-driven exit where the camera pulls back
 * and the hero surrenders the room.
 *
 * Labels: `lights` · `title` · `sweep` · `support` · `cta` · `settle`
 */
export function HeroTimeline(ctx: FilmContext): gsap.core.Timeline {
  const { gsap, light } = ctx
  const scope = q('[data-film="hero"]')
  const tl = gsap.timeline({ defaults: { ease: 'stage' } })
  reportTimeline('HeroTimeline', { triggerFound: Boolean(scope), created: Boolean(scope) })
  if (!scope) return tl

  const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]')
  const sweep = scope.querySelector('[data-hero-sweep]')
  const support = scope.querySelector('[data-hero-supporting]')
  const actions = scope.querySelector('[data-hero-actions]')
  const affordance = scope.querySelector('[data-hero-affordance]')
  const plate = scope.querySelector('[data-hero-plate]')

  tl.addLabel('lights', 0)
  light.mood('wait')

  if (lines.length) {
    gsap.set(lines, { yPercent: 100, willChange: 'transform' })
    tl.addLabel('title', 0.15).to(
      lines,
      { yPercent: 0, duration: 0.64, ease: 'curtain', stagger: 0.04, onComplete: () => gsap.set(lines, { clearProps: 'willChange' }) },
      'title',
    )
  }

  // The sweep is the lamp finding the performer — the one moment the light
  // physically crosses the frame.
  if (sweep) {
    gsap.set(sweep, { xPercent: -120, opacity: 0 })
    tl.addLabel('sweep', 0.4)
      .to(sweep, { opacity: 1, duration: 0.2 }, 'sweep')
      .to(sweep, { xPercent: 220, duration: 0.9, ease: 'beam' }, 'sweep')
      .to(sweep, { opacity: 0, duration: 0.3 }, 'sweep+=0.6')
  }

  // Rack focus: the lens settles on the type. Plays once, clears itself.
  if (support) {
    gsap.set(support, { opacity: 0 })
    tl.addLabel('support', 0.52).to(support, { opacity: 1, duration: 0.5 }, 'support')
    tl.add(rackFocus(gsap, support, { from: 6, duration: 0.9 }), 'support')
  }

  if (actions) {
    gsap.set(actions, { opacity: 0 })
    tl.addLabel('cta', 0.68).to(actions, { opacity: 1, duration: 0.5 }, 'cta')
  }

  if (affordance) {
    gsap.set(affordance, { opacity: 0 })
    tl.addLabel('settle', 0.85).to(affordance, { opacity: 1, duration: 0.42 }, 'settle')
  }

  /*
   * No GSAP breathing here: the plate wrapper is scrubbed for scale below, and
   * the images inside already carry the CSS lens-breathe loop. Two tweens on one
   * element's scale is a fight, not a camera move.
   */

  /*
   * The exit. Scrubbed, not triggered.
   *
   * The plate drifts slower than the page (depth), the type leaves faster than
   * the plate (foreground), and the camera pulls back a fraction. Three planes
   * moving at three rates is the whole of parallax; a single plane is a slide.
   */
  reportTimeline('HeroTimeline', { targetsFound: lines.length, scrub: 0.8 })

  gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
      onUpdate: (self) => reportProgressSilently('HeroTimeline', self.progress),
    },
  })
    .to(plate, { yPercent: 12, scale: 1.06, ease: 'none' }, 0)
    .to('[data-hero-copy]', { yPercent: -26, opacity: 0.25, ease: 'none' }, 0)

  return tl
}

// ---------------------------------------------------------------------------
// 2 · THE WALK
// ---------------------------------------------------------------------------

/**
 * **WalkTimeline** — the Reframe.
 *
 * The light has lost the performer and goes looking. It drifts across the frame
 * as you scroll, and the two sentences are revealed line by line by its
 * passage rather than by entering the viewport.
 *
 * This is the act where the page stops being a hero and starts being a walk.
 */
export function WalkTimeline(ctx: FilmContext): gsap.core.Timeline {
  const { gsap, light } = ctx
  const scope = q('[data-film="walk"]')
  const tl = gsap.timeline()
  reportTimeline('WalkTimeline', { triggerFound: Boolean(scope), created: Boolean(scope), scrub: 0.9 })
  if (!scope) return tl

  const blocks = gsap.utils.toArray<HTMLElement>('[data-walk-line]', scope)
  const allLines: HTMLElement[] = []
  for (const block of blocks) allLines.push(...(splitLines(ctx, block).lines as HTMLElement[]))

  gsap.set(allLines, { yPercent: 110 })
  reportTimeline('WalkTimeline', { targetsFound: allLines.length })

  gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 78%',
      end: 'bottom 60%',
      scrub: 0.9,
      onEnter: () => light.mood('search'),
      onEnterBack: () => light.mood('search'),
      /*
       * The lamp searches. Its path is driven by scroll rather than time, so it
       * is *you* moving it — and it sweeps further than the copy does, which is
       * what makes it read as hunting rather than following.
       */
      onUpdate: (self) => {
        const p = self.progress
        reportProgressSilently('WalkTimeline', p)
        light.set(78 - p * 58, 24 + Math.sin(p * Math.PI) * 30)
      },
    },
  }).to(allLines, { yPercent: 0, ease: 'curtain', stagger: 0.22 }, 0)

  return tl
}

// ---------------------------------------------------------------------------
// 3 · THE JOURNEY  +  4 · THE FIRST NOTE
// ---------------------------------------------------------------------------

/**
 * **FirstNoteTimeline** — the event.
 *
 * Returned as its own timeline and nested into the Journey at the `twelve`
 * label, so the moment is authored independently of the walk that leads to it.
 *
 * Everything on the page acknowledges it: the beam falls, the source blooms
 * behind it, the floor throws light back, the numeral stops being white and
 * becomes light, the page-wide flare fires so every mote of dust in the
 * document ignites, and the composition reframes via Flip.
 */
export function FirstNoteTimeline(ctx: FilmContext): gsap.core.Timeline {
  const { gsap, light } = ctx
  const tl = gsap.timeline()
  const scope = q('[data-film="journey"]')
  reportTimeline('FirstNoteTimeline', { triggerFound: Boolean(scope), created: Boolean(scope) })
  if (!scope) return tl

  const beam = scope.querySelector('[data-j-beam]')
  const bloom = scope.querySelector('[data-j-bloom]')
  const flood = scope.querySelector('[data-j-flood]')
  const bounce = scope.querySelector('[data-j-bounce]')
  const dark = scope.querySelector('[data-j-dark]')

  // The house goes down BEFORE the light arrives. Without this the beam has
  // nothing to arrive out of.
  tl.to(dark, { opacity: 1, duration: 0.3, ease: 'houselight' }, 0)

  // The shaft.
  tl.fromTo(beam, { opacity: 0, scale: 1.14, yPercent: -6 }, { opacity: 1, scale: 1, yPercent: 0, duration: 0.34, ease: 'beam' }, 0.18)

  // The source, a beat behind the shaft — light travels.
  tl.fromTo(bloom, { opacity: 0, scale: 1.3 }, { opacity: 0.85, scale: 1, duration: 0.36, ease: 'beam' }, 0.26)

  // The floor throws it back.
  tl.fromTo(bounce, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'beam' }, 0.3)

  // The flood. Peaks at 22% and releases — a note, not a strobe.
  tl.fromTo(flood, { opacity: 0 }, { opacity: 0.22, duration: 0.16, ease: 'beam' }, 0.22)
    .to(flood, { opacity: 0, duration: 0.3, ease: 'houselight' }, 0.42)

  /*
   * THE FLARE — the reason this is an event and not an animation.
   *
   * The Journey writes a document-level property. The dust canvas, which has
   * never heard of this section, reads it and blooms. Every mote on screen
   * catches the First Note at the instant it happens.
   */
  const flare = { v: 0 }
  reportTimeline('FirstNoteTimeline', { targetsFound: [beam, bloom, flood, bounce, dark].filter(Boolean).length })
  tl.to(
    flare,
    {
      v: 1,
      duration: 0.2,
      ease: 'beam',
      onUpdate: () => {
        light.flare(flare.v)
        reportProgressSilently('FirstNoteTimeline', flare.v)
      },
    },
    0.18,
  )
    .to(flare, { v: 0, duration: 0.45, ease: 'houselight', onUpdate: () => light.flare(flare.v) }, 0.44)

  return tl
}

/**
 * **JourneyTimeline** — the walk down the boards.
 *
 * Pinned and scrubbed. The camera pushes along a stage floor while the week
 * numeral counts, the light follows, hesitates at eleven, and explodes at
 * twelve.
 *
 * Labels: `walk` · `eleven` · `twelve` · `after`
 */
export function JourneyTimeline(ctx: FilmContext): gsap.core.Timeline | null {
  const { gsap, light, Flip } = ctx
  const scope = q('[data-film="journey"]')
  reportTimeline('JourneyTimeline', { triggerFound: Boolean(scope), created: Boolean(scope), pinned: true, scrub: 0.7 })
  if (!scope) return null

  const floor = scope.querySelector('[data-j-floor]')
  const warm = scope.querySelector('[data-j-warm]')
  const numeral = scope.querySelector<HTMLElement>('[data-j-numeral]')
  const caption = scope.querySelector('[data-j-caption]')

  let reframed = false
  reportTimeline('JourneyTimeline', {
    targetsFound: [floor, warm, numeral, caption].filter(Boolean).length,
  })

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: scope,
      start: 'top top',
      end: '+=280%',
      pin: true,
      scrub: 0.7,
      /*
       * ⚠️ Leaving an act must hand the light back.
       *
       * The runtime probe found the lamp frozen in `hesitate` (intensity 0.42,
       * x 82) for roughly 6,000px — the whole of Programs, Lessons,
       * Performances and Testimonials — because moods were only ever set on
       * enter, never on leave. The middle of the page was genuinely inert.
       *
       * Now the Journey releases the light to `disperse` on the way out and
       * reclaims it on the way back in.
       */
      onLeave: () => light.mood('disperse'),
      onEnterBack: () => light.mood('follow'),
      onUpdate: (self) => {
        const p = self.progress
        reportProgressSilently('JourneyTimeline', p)

        // Broadcast to the section so its copy can follow the shot. One event,
        // no prop drilling, and React never sees a scroll frame.
        document.dispatchEvent(new CustomEvent('film:journey', { detail: p }))

        // The light's part. It follows you, hesitates, then explodes.
        if (p < 0.55) light.mood('follow')
        else if (p < 0.8) light.mood('hesitate')
        else light.mood('explode')

        // The lamp tracks the camera down the boards.
        light.set(52 + p * 30, 46 - p * 18)

        /*
         * Direction and velocity.
         *
         * Scrolling back up is a different edit from scrolling down, and a fast
         * scrub is a different edit from a slow one. The caption softens when
         * you move quickly — the eye cannot read at speed, so the film stops
         * asking it to.
         */
        const speed = Math.min(1, Math.abs(self.getVelocity()) / 2400)
        if (caption) gsap.set(caption, { opacity: 1 - speed * 0.55 })

        // Flip the composition once, at the moment — and put it back on reverse.
        if (numeral) {
          if (p >= 0.8 && !reframed) {
            reframed = true
            const state = Flip.getState(numeral)
            numeral.classList.add('is-reframed')
            Flip.from(state, { duration: 0.7, ease: 'power3.inOut', absolute: true })
          } else if (p < 0.8 && reframed) {
            reframed = false
            const state = Flip.getState(numeral)
            numeral.classList.remove('is-reframed')
            Flip.from(state, { duration: 0.5, ease: 'power2.inOut', absolute: true })
          }
        }
      },
    },
  })

  // ── walk ────────────────────────────────────────────────────────────────
  tl.addLabel('walk', 0)
    // The camera pushes along the boards. Scale, not zoom.
    .to(floor, { scale: 1.26, yPercent: -4, opacity: 0.92, duration: 0.8, ease: 'stepIn' }, 'walk')
    // The numeral drifts against the push — it is in the room, not on the glass.
    .to(numeral, { yPercent: -4, duration: 0.8, ease: 'stepIn' }, 'walk')

  // ── eleven ──────────────────────────────────────────────────────────────
  tl.addLabel('eleven', 0.55).to(warm, { opacity: 1, duration: 0.3, ease: 'houselight' }, 'eleven')

  // ── twelve · the event ──────────────────────────────────────────────────
  tl.addLabel('twelve', 0.8).add(FirstNoteTimeline(ctx), 'twelve')

  tl.addLabel('after', 1)

  return tl
}

// ---------------------------------------------------------------------------
// 5 · FINALE
// ---------------------------------------------------------------------------

/**
 * **FinaleTimeline** — the houselights.
 *
 * The Turn gets one shaft and the page's only shout, revealed line by line as
 * you arrive. Then the light disperses and stops performing, because the last
 * thing the page does is let someone read a price and decide.
 */
export function FinaleTimeline(ctx: FilmContext): gsap.core.Timeline {
  const { gsap, light } = ctx
  const tl = gsap.timeline()
  const turn = q('[data-film="turn"]')
  const close = q('[data-film="close"]')
  reportTimeline('FinaleTimeline', { triggerFound: Boolean(turn), created: Boolean(turn), scrub: 1 })

  if (turn) {
    const target = turn.querySelector('[data-turn-line]')
    if (target) {
      const lines = splitLines(ctx, target).lines as HTMLElement[]
      gsap.set(lines, { yPercent: 110 })
      reportTimeline('FinaleTimeline', { targetsFound: lines.length })

      gsap.timeline({
        scrollTrigger: {
          trigger: turn,
          start: 'top 72%',
          end: 'center 55%',
          scrub: 1,
          onEnter: () => light.mood('shaft'),
          onEnterBack: () => light.mood('shaft'),
          onUpdate: (self) => {
            reportProgressSilently('FinaleTimeline', self.progress)
            light.set(72, 6 + self.progress * 26)
          },
        },
      }).to(lines, { yPercent: 0, ease: 'curtain', stagger: 0.3 }, 0)
    }
  }

  if (close) {
    ctx.gsap.timeline({
      scrollTrigger: {
        trigger: close,
        start: 'top 80%',
        onEnter: () => light.mood('disperse'),
        onLeaveBack: () => light.mood('shaft'),
      },
    })
  }

  return tl
}

// ---------------------------------------------------------------------------
// The emerge batch
// ---------------------------------------------------------------------------

/**
 * Everything that is not an act still has to arrive, and it arrives by being
 * lit — not by fading up.
 *
 * `ScrollTrigger.batch` collects elements that cross the line together and
 * reveals them as one group, so twelve independent triggers become one. The
 * stagger is **velocity-aware**: a visitor moving fast gets a tighter reveal,
 * because a 600ms cascade they have already scrolled past is a cascade nobody
 * sees.
 */
export function EmergeBatch(ctx: FilmContext): void {
  const { gsap, ScrollTrigger } = ctx

  const all = gsap.utils.toArray<HTMLElement>('[data-emerge]')
  if (!all.length) return

  /*
   * ⚠️ ROOT CAUSE FIX #4 — never mask content that is already on screen.
   *
   * This previously set `--emerge: 0` on EVERY target the moment the director
   * ran, then relied on ScrollTrigger.batch to reveal them. If the batch failed
   * to fire for any reason — an unregistered plugin, a refresh race, a throw
   * earlier in the chain — twelve blocks of real content stayed masked to
   * invisible with no error anywhere.
   *
   * Content above the fold is now never hidden in the first place, and a
   * watchdog releases anything still masked after three seconds. A reveal that
   * does not happen must degrade to "visible", never to "gone".
   */
  const viewportBottom = window.innerHeight
  const offscreen = all.filter((el) => el.getBoundingClientRect().top > viewportBottom * 0.9)

  if (offscreen.length) gsap.set(offscreen, { '--emerge': 0 })
  reportTimeline('EmergeBatch', {
    created: true,
    triggerFound: true,
    targetsFound: offscreen.length,
  })

  const reveal = (batch: Element[], velocity = 0): void => {
    const speed = Math.min(1, Math.abs(velocity) / 3000)
    gsap.to(batch, {
      '--emerge': 1,
      duration: 1.4 - speed * 0.6,
      ease: 'beam',
      stagger: 0.12 - speed * 0.08,
      overwrite: 'auto',
      onComplete: () => gsap.set(batch, { clearProps: '--emerge' }),
    })
  }

  ScrollTrigger.batch(offscreen, {
    start: 'top 88%',
    once: true,
    onEnter: (batch, triggers) => {
      /*
       * Velocity-aware. A visitor moving fast gets a tighter reveal, because a
       * 600ms cascade they have already scrolled past is a cascade nobody sees.
       * Velocity is an instance measurement, read from the batch's own trigger.
       */
      reveal(batch, triggers?.[0]?.getVelocity() ?? 0)
    },
  })

  // Watchdog. If anything is still masked after three seconds, release it.
  const watchdog = window.setTimeout(() => {
    const stuck = offscreen.filter(
      (el) => Number.parseFloat(getComputedStyle(el).getPropertyValue('--emerge') || '1') < 0.99,
    )
    if (stuck.length) {
      gsap.set(stuck, { clearProps: '--emerge' })
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[film] Emerge watchdog released', stuck.length, 'stuck element(s).')
      }
    }
  }, 3000)

  // 'revert' fires when the director's gsap.context() is torn down, so the
  // watchdog cannot outlive the film it belongs to.
  ScrollTrigger.addEventListener('revert', () => window.clearTimeout(watchdog))
}
