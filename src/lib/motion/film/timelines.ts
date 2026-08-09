'use client'

import type { Light } from './light'
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
const qa = <T extends Element = HTMLElement>(sel: string): T[] =>
  Array.from(document.querySelectorAll<T>(sel))

/**
 * THE FILM — six named timelines.
 * Canonical spec: docs/approved-design/The Film.html §I, Visual Specification.md §H.
 *
 * ## The grammar every timeline obeys
 *
 *   1. **Reveals happen by light, never by element motion.** The type is
 *      already in the room; the light finds it. There is no fade-up, no
 *      slide-up and no stagger anywhere in this file — they are banned by name.
 *   2. **One camera position through the dark.** The room changes, the camera
 *      does not. Shots 01–03 never move an element; they move the seam and the
 *      spill.
 *   3. **The light source never moves during the walk — she moves toward it.**
 *   4. **Stillness is a device.** The 1.5s at the mark is enforced, not
 *      incidental, and nothing may animate through it.
 *
 * Each timeline is labelled so the choreography is observable: `tl.labels`
 * carries the beat names, and every timeline reports itself to the diagnostics
 * store so `npm run probe:motion` can assert it ran.
 */

/** Every timeline registers under a name the probe can assert. */
function register(
  name: string,
  tl: gsap.core.Timeline | gsap.core.Tween,
  opts: { trigger: Element | null; targets: number; pinned?: boolean; scrub?: number | boolean },
) {
  reportTimeline(name, {
    name,
    created: true,
    triggerFound: Boolean(opts.trigger),
    targetsFound: opts.targets,
    pinned: Boolean(opts.pinned),
    scrub: opts.scrub ?? false,
  })
  return tl
}

// ---------------------------------------------------------------------------
// 1 · OPENING — shot 01. The load screen IS the first frame.
// ---------------------------------------------------------------------------

/**
 * The room before anything happens.
 *
 * *"Locked off. Eye height, backstage. The seam under the door. Nothing else.
 * Held breath."*
 *
 * The only motion is the lamp settling and the seam breathing at its resting
 * width. No preloader — this **is** the load screen, and it buys a legitimate
 * 1.2s while looking like art direction.
 */
export function OpeningTimeline(ctx: FilmContext) {
  const { gsap, light } = ctx
  const scope = q('[data-film="opening"]')
  if (!scope) return register('Opening', gsap.timeline(), { trigger: null, targets: 0 })

  light.set(2, 50)
  light.intensity(0.08)
  light.mood('wait')

  const tl = gsap.timeline({ defaults: { ease: 'stage' } })
  tl.addLabel('backstage')
    // The seam at rest: a 3px gap under a closed door.
    .fromTo(
      scope,
      { '--seam-width': '0px', '--seam-spill': '0px', '--seam-opacity': 0 },
      { '--seam-width': '3px', '--seam-spill': '40px', '--seam-opacity': 0.5, duration: 1.2 },
      0,
    )
    .addLabel('held-breath')

  return register('Opening', tl, { trigger: scope, targets: 1 })
}

// ---------------------------------------------------------------------------
// 2 · WINGS — shot 02. The door opens a hand's width.
// ---------------------------------------------------------------------------

/**
 * *"Same position. The room answered, not the camera. The door has opened a
 * hand's width. Amber spills 260px."*
 *
 * The seam widens 3px → 9px and the spill grows 0 → 260px, scrubbed to the
 * first scroll. Nothing else moves. This is the whole reveal mechanism for the
 * hero: the words were always there.
 */
export function WingsTimeline(ctx: FilmContext) {
  const { gsap, light } = ctx
  const scope = q('[data-film="opening"]')
  if (!scope) return register('Wings', gsap.timeline(), { trigger: null, targets: 0 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top top',
      end: 'bottom 40%',
      scrub: 0.8,
      onUpdate: (self) => reportProgressSilently('Wings', self.progress),
    },
    defaults: { ease: 'none' },
  })

  tl.addLabel('door-ajar')
    .to(scope, { '--seam-width': '9px', '--seam-opacity': 0.6, duration: 0.4 }, 0)
    .to(scope, { '--seam-spill': '260px', duration: 1 }, 0)
    .addLabel('spill')
    .add(() => light.intensity(0.14), 0.35)

  return register('Wings', tl, { trigger: scope, targets: 1, scrub: 0.8 })
}

// ---------------------------------------------------------------------------
// 3 · MEMORY — shot 03. The temperature drops.
// ---------------------------------------------------------------------------

/**
 * *"Reverse angle. 85mm, close and private. None — the warmest dark on the
 * site: memory, not fear."*
 *
 * The grade, not a reveal. The lamp dims to nothing and the tint walks from the
 * blue-black of the wing to the brown-black of memory, so the reader feels the
 * room change temperature without any element moving.
 */
export function MemoryTimeline(ctx: FilmContext) {
  const { gsap, light } = ctx
  const scope = q('[data-film="reframe"]')
  if (!scope) return register('Memory', gsap.timeline(), { trigger: null, targets: 0 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 80%',
      end: 'bottom top',
      scrub: 0.9,
      onUpdate: (self) => reportProgressSilently('Memory', self.progress),
    },
    defaults: { ease: 'none' },
  })

  tl.addLabel('cooling')
    .add(() => {
      light.mood('hesitate')
      light.intensity(0.02)
    }, 0)
    .fromTo(
      scope,
      { '--atmos-warmth': 0 },
      { '--atmos-warmth': 1, duration: 1 },
      0,
    )
    .addLabel('memory')

  return register('Memory', tl, { trigger: scope, targets: 1, scrub: 0.9 })
}

// ---------------------------------------------------------------------------
// 4 · THE WALK — shots 04–06. PINNED SEQUENCE №1.
// ---------------------------------------------------------------------------

/**
 * *"Tracking right at walking pace, locked to the floor line. Scroll =
 * footsteps: 100vh per 12 steps. One source, house right. Intensity 8%→20%
 * across three shots. It never moves; she moves toward it."*
 *
 * The three frames are already complete, stacked markup that reads correctly
 * with no JavaScript. This pins the container and swaps between them
 * while the dot crosses the floor and the ghost numeral counts 1 → 6 → 12.
 *
 * ## Why the frames swap rather than dissolve
 *
 * Shots 04, 05 and 06 are discrete frames in the comps — each has its own dot
 * position, its own ghost numeral and its own line. Dissolving between them
 * leaves a wide scroll band where two dots and two lines are both half-visible,
 * which reads as a double exposure rather than as a walk.
 *
 * So the swap is instantaneous, and the continuity comes from staging instead:
 * the floor line sits at an identical offset in all three frames, so it never
 * appears to move, and the eye reads one continuous space that the camera has
 * simply re-framed. A slide would move content, which the direction bans
 * outright.
 */
export function WalkTimeline(ctx: FilmContext) {
  const { gsap, light } = ctx
  const scope = q('[data-film="walk"]')
  const frames = qa('[data-walk-frame]')
  if (!scope || frames.length < 3) {
    return register('Walk', gsap.timeline(), { trigger: null, targets: frames.length })
  }

  // Stack the frames so the pin has one viewport to work in.
  gsap.set(frames, { position: 'absolute', inset: 0 })
  gsap.set(scope, { position: 'relative', height: '100svh' })
  gsap.set(frames.slice(1), { autoAlpha: 0 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top top',
      /*
       * ⚠️ EE2 — retimed from `+=300%` to `+=170%`.
       *
       * Three full viewports of scroll bought three frames, one viewport each,
       * and the third of each viewport between cross-fades was dead: nothing
       * changed, no line arrived, no light moved. Measured cost, 900px of empty
       * scroll, inside a film that already required 9.9 viewports before the
       * business became legible.
       *
       * At 170% each frame gets ~0.57 of a viewport of travel and the
       * cross-fades at 0.33 and 0.7 land in the same relative places, so the
       * *rhythm* is untouched — there is simply less nothing between the beats.
       * The walk still reads as a walk; it no longer reads as a wait.
       */
      end: '+=170%',
      pin: true,
      scrub: 0.7,
      anticipatePin: 1,
      onUpdate: (self) => reportProgressSilently('Walk', self.progress),
    },
    defaults: { ease: 'none' },
  })

  tl.addLabel('week-1')
    .add(() => {
      light.mood('follow')
      light.set(86, 62)
    }, 0)
    // Week 1 → 6. A swap, not a dissolve: exactly one frame is ever visible.
    .set(frames[0], { autoAlpha: 0 }, 0.33)
    .set(frames[1], { autoAlpha: 1 }, 0.33)
    .addLabel('week-6', 0.33)
    .add(() => light.intensity(0.14), 0.33)
    // Week 6 → 12.
    .set(frames[1], { autoAlpha: 0 }, 0.7)
    .set(frames[2], { autoAlpha: 1 }, 0.7)
    .addLabel('week-12', 0.7)
    .add(() => light.intensity(0.2), 0.7)
    .addLabel('the-mark', 0.94)

  return register('Walk', tl, { trigger: scope, targets: frames.length, pinned: true, scrub: 0.7 })
}

// ---------------------------------------------------------------------------
// 5 · THE RELEASE — shot 07. PINNED SEQUENCE №2. The only cut in the film.
// ---------------------------------------------------------------------------

/**
 * *"1.5s of enforced stillness at the mark → 400ms hard cut to flash with the
 * typeset blank → 1.8s letterbox retraction and dimmer-rise to house. This is
 * the last motion on the page."*
 *
 * ## Why this one is time-based, not scrubbed
 *
 * Every other timeline is scrubbed, so the visitor controls the pace. This one
 * must not be: the three beats have exact lengths, and a scrub would let
 * someone scroll through the stillness in 200ms and destroy the only moment the
 * whole page is built to deliver. So the pin holds the viewport and the
 * timeline plays itself once, at its own tempo.
 *
 * The stillness is genuinely still — no easing, no micro-motion, nothing moving
 * anywhere on screen for 1500ms. That is the design.
 */
export function ReleaseTimeline(ctx: FilmContext) {
  const { gsap, light } = ctx
  const scope = q('[data-film="release"]')
  if (!scope) return register('Release', gsap.timeline(), { trigger: null, targets: 0 })

  const tl = gsap.timeline({
    paused: true,
    onUpdate: () => reportProgressSilently('Release', tl.progress()),
  })

  tl.addLabel('the-mark')
    // 1500ms of true stillness. Deliberately an empty span of time.
    .to({}, { duration: 1.5 })
    .addLabel('first-note')
    .add(() => {
      // A hard cut, not a fade: the flash is experienced, not photographed.
      light.flare(1)
      light.intensity(1)
    })
    .to({}, { duration: 0.4 })
    .addLabel('houselights')
    .add(() => {
      light.flare(0)
      light.mood('disperse')
    })
    // The dimmer rise. The letterbox retracts over the same 1800ms, owned by
    // the Letterbox component so it stays correct without this timeline.
    .to({}, { duration: 1.8 })
    .addLabel('the-desk')

  ctx.ScrollTrigger.create({
    trigger: scope,
    start: 'top top',
    /*
     * ⚠️ EE2 — retimed from `+=150%` to `+=90%`.
     *
     * This pin is not scrubbed: it holds the viewport while a 3.7s timeline
     * plays itself (1.5s still + 0.4s flash + 1.8s rise). The pin length
     * therefore controls how long the visitor is *held*, not how fast the beat
     * runs — and 150% held them for 1,350px after the timeline had finished.
     *
     * 90% still exceeds the timeline's own length at any ordinary scroll speed,
     * `onEnter` starts it regardless of approach velocity, and `onLeave` snaps
     * it complete for anyone who flicks past. The three beat lengths in the
     * timeline are untouched — they are the design, and they are not what was
     * costing screens.
     */
    end: '+=90%',
    pin: true,
    anticipatePin: 1,
    onEnter: () => tl.play(0),
    onEnterBack: () => tl.play(0),
    onLeave: () => tl.progress(1),
  })

  return register('Release', tl, { trigger: scope, targets: 1, pinned: true })
}

// ---------------------------------------------------------------------------
// 6 · HOUSELIGHTS — shot 07B into the desk.
// ---------------------------------------------------------------------------

/**
 * *"A 1.5–2s cross-fade from stage to house — the only 'slide' in the whole
 * spec, and it moves bars, never content."*
 *
 * The physical rise out of the dark. The lamp disperses, the vignette opens and
 * the grade warms to ivory. After this the desk does not move at all.
 */
export function HouselightsTimeline(ctx: FilmContext) {
  const { gsap, light } = ctx
  const scope = q('[data-film="houselights"]')
  if (!scope) return register('Houselights', gsap.timeline(), { trigger: null, targets: 0 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top bottom',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => reportProgressSilently('Houselights', self.progress),
    },
    defaults: { ease: 'none' },
  })

  tl.addLabel('rising')
    .add(() => light.mood('disperse'), 0)
    .fromTo(scope, { '--vignette': 0.55 }, { '--vignette': 0, duration: 1 }, 0)
    .addLabel('room-air')

  return register('Houselights', tl, { trigger: scope, targets: 1, scrub: 1 })
}
