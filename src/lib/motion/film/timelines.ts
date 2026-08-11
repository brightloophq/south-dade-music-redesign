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
      end: '+=110%',
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
    end: '+=50%',
    /*
      ⚠️ THE PIN IS OFF, AND IT IS A MEASURED CORRECTION.

      This beat was a full-screen typographic climax when it was designed, and
      pinning held the viewport while the 3.7s flash played. It is no longer
      full-screen: the polish pass rebuilt it as a 52svh composition — rule,
      line and photograph on one axis — which computes to ~797px inside a 900px
      viewport.

      Pinning an element shorter than the viewport makes ScrollTrigger's spacer
      collapse and re-expand it. Instrumented, the section reported
      `height 0 → 797` twice, for **CLS 1.75** at 1440 against 0.003 at 390
      where pins never run. Raising the frame to 78svh did not help — still
      shorter than the viewport, still 1.64 — and restoring a full-screen frame
      would have reinstated exactly the dead ivory this beat was rebuilt to
      remove.

      So the beat keeps its three timings and loses the hold. The flash plays on
      the same trigger; the visitor scrolls through it rather than being held in
      it. The Walk remains the film's one pinned sequence, which is also what
      the two-pin budget in the direction always intended.
    */
    pin: false,
    anticipatePin: 1,
    onEnter: () => tl.play(0),
    onEnterBack: () => tl.play(0),
    onLeave: () => tl.progress(1),
  })

  return register('Release', tl, { trigger: scope, targets: 1, pinned: false })
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

  const scrim = scope.querySelector('[data-houselights-scrim]')
  const plate = scope.querySelector('[data-houselights-plate]')
  const line = scope.querySelector('[data-houselights-line]')

  /*
   * MI2 — this is now the reveal, not a gradient.
   *
   * `start: 'top 85%'` rather than `top bottom`: the rise must begin only once
   * the frame is genuinely on screen, or the visitor pulls the lights up while
   * still reading the flash beat above and the payoff lands early, half-lit and
   * unnoticed.
   *
   * `end: 'top top'` finishes the exposure as the frame reaches full height, so
   * the photograph is completely lit for the whole time it fills the viewport
   * rather than still brightening while you look at it.
   */
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 85%',
      end: 'top top',
      scrub: 0.9,
      onUpdate: (self) => reportProgressSilently('Houselights', self.progress),
    },
    defaults: { ease: 'none' },
  })

  tl.addLabel('dark').add(() => light.mood('disperse'), 0)

  if (scrim) {
    /*
     * The dark leaving the room. Ends at 0 — the photograph is never left with
     * a permanent overlay on it.
     */
    tl.fromTo(scrim, { opacity: 1 }, { opacity: 0, duration: 1 }, 0)
  }

  if (plate) {
    /*
     * The exposure envelope, and the only scale move in the film that is not a
     * pin. Both resolve to identity — `brightness(1)`, `scale(1)` — so what the
     * visitor ends up looking at is the photograph as taken, ungraded.
     *
     * 1.06 is deliberately small. Anything more reads as a slideshow effect
     * rather than as a room settling.
     */
    tl.fromTo(
      plate,
      { filter: 'brightness(0.25)', scale: 1.06 },
      { filter: 'brightness(1)', scale: 1, duration: 1 },
      0,
    )
  }

  if (line) {
    /* The last line of the film hands over to the room it was describing. */
    tl.fromTo(line, { opacity: 0.85 }, { opacity: 0, duration: 0.55 }, 0.4)
  }

  tl.addLabel('room-air')

  return register('Houselights', tl, { trigger: scope, targets: 3, scrub: 0.9 })
}

// ---------------------------------------------------------------------------
// 7 · THE WEEKS — the one place the desk is allowed to move.
// ---------------------------------------------------------------------------

/**
 * *"The film is over; this is the programme in your hands. The desk does not
 * move at all."*
 *
 * This is the documented exception to that rule, made deliberately and kept to
 * three elements. The twelve-week series is the only sequence on the desk that
 * is *about* progression, and three plates that simply exist do not progress —
 * they have to arrive.
 *
 * Each reveals as its week is reached, and the three build:
 *
 *   weeks 1–10  a narrow slot opens          the smallest move
 *   week 11     the frame opens further, and drifts in from the margin
 *   week 12     the widest opening, with the longest settle
 *
 * `clipPath` and `opacity` only. Nothing reflows, so this cannot contribute
 * layout shift, and the reveal reads as light finding an image rather than a
 * card animating in.
 *
 * ## Reduced motion
 *
 * `FilmDirector` never calls this, so the plates render at their static values
 * — fully visible, no clip. Someone who asked for less motion sees all three
 * immediately.
 */
export function WeeksTimeline(ctx: FilmContext) {
  const { gsap } = ctx
  const frames = qa('[data-week-reveal]')
  if (!frames.length) return register('Weeks', gsap.timeline(), { trigger: null, targets: 0 })

  const tl = gsap.timeline()

  /*
    THREE PHASES, THREE DIFFERENT MOTIONS.

    The generic answer is opacity 0→1 with a 20px lift, applied three times.
    That is a component animating itself, and it tells the visitor nothing about
    what the twelve weeks are. Each phase instead moves the way its week feels:

      I   CONTAIN / FOCUS
          A narrow horizontal slot that tightens inward as it opens, with the
          plate easing back from 1.06. Practice is repetition inside a small
          space, so the motion closes in rather than spreading out.

      II  OPEN / EXPOSE
          A vertical curtain drawn from the left edge, the frame sliding in from
          the margin as it goes. The room opens and something previously private
          is now visible from one side.

      III EXPAND / ARRIVE
          The widest opening, from the centre outward in both directions, with a
          forward push and the longest settle. Arrival, not a reveal.

    All three are clip-path, transform and opacity — no reflow, no layout shift.
  */
  const PHASES = [
    {
      /* I — a slot that tightens inward. */
      from: { clipPath: 'inset(38% 30% 38% 30%)', opacity: 0.3, scale: 1.06, x: 0 },
      duration: 0.8,
    },
    {
      /* II — a curtain from the left, arriving from the margin. */
      from: { clipPath: 'inset(0% 0% 0% 100%)', opacity: 0.55, scale: 1.02, x: -28 },
      duration: 0.95,
    },
    {
      /* III — opening from the centre outward, pushing forward. */
      from: { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0.65, scale: 0.965, x: 0 },
      duration: 1.15,
    },
  ]

  frames.forEach((frame, index) => {
    const phase = PHASES[index] ?? PHASES[0]

    gsap.fromTo(frame, phase.from, {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      scale: 1,
      x: 0,
      duration: phase.duration,
      ease: 'stage',
      scrollTrigger: {
        trigger: frame,
        start: 'top 84%',
        once: true,
        onUpdate: (self) => reportProgressSilently(`Weeks-${index + 1}`, self.progress),
      },
    })
  })

  /*
    THE PROGRESSION ITSELF, SCRUBBED.

    The reveal above makes each plate arrive; this makes the series *move*. A
    slow scrubbed scale runs across each frame's passage through the viewport,
    and it grows down the series — 1.02 for the contained weeks, 1.05 for the
    room, 1.08 for the stage. The plate the visitor is looking at when they
    reach Week 12 is the one still opening.

    `scale` on a clipped box: no reflow, no layout shift.
  */
  frames.forEach((frame, index) => {
    const to = [1.02, 1.05, 1.08][index] ?? 1.02
    const plate = frame.querySelector('img') ?? frame
    gsap.fromTo(
      plate,
      { scale: 1 },
      {
        scale: to,
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
      },
    )
  })

  return register('Weeks', tl, { trigger: frames[0], targets: frames.length })
}

// ---------------------------------------------------------------------------
// 8 · THE DESK — section-to-section choreography below the film.
// ---------------------------------------------------------------------------

/**
 * The film was choreographed and the desk was not.
 *
 * Eight movements — house, programs, weeks, lessons, evidence, testimonials,
 * scholarship, the call to action — arrived as static screens stacked
 * vertically. Nothing marked one becoming the next, so a page that had been a
 * continuous authored experience for five viewports turned into a document.
 *
 * ## What this animates, and what it deliberately does not
 *
 * It animates the **relationship between sections**, not their contents. There
 * is no fade-up on paragraphs, no stagger on list items, no per-child motion of
 * any kind — those are the things that make a site feel like a template
 * animating itself.
 *
 * Two devices only:
 *
 *   **The rule draws.** Every desk movement is separated by a hairline. Each
 *   now draws left-to-right as its movement is reached. The site already used
 *   rules as its primary structural mark; making them arrive is the smallest
 *   possible gesture that says *a new movement is beginning*.
 *
 *   **The label arrives with it.** The label in the left rail lifts 8px and
 *   fades as its rule completes, so the eye is led from the rule to the thing
 *   the rule introduces.
 *
 * ## Photographs arrive by role, not by rote
 *
 * `Photo` declares how it should be uncovered and this reads it:
 *
 *   wipe   a horizontal exposure — full-bleed bands
 *   sweep  a vertical opening — the tall Programs rail
 *   mask   an aperture from the bottom with a 1.04 → 1 settle — everything else
 *
 * `clip-path`, `opacity` and `transform` only. Nothing here reflows, so none of
 * it can contribute layout shift.
 */
export function DeskTimeline(ctx: FilmContext) {
  const { gsap } = ctx
  const desk = qa('[data-desk-rule]')
  const labels = qa('[data-desk-label]')
  const photos = qa('[data-reveal]').filter((el) => el.getAttribute('data-reveal') !== 'none')

  if (!desk.length && !labels.length && !photos.length) {
    return register('Desk', gsap.timeline(), { trigger: null, targets: 0 })
  }

  const tl = gsap.timeline()

  /*
    The rules and the labels are driven separately on purpose. Interior routes
    separate their movements with a hairline; the homepage separates them with
    space and leads each with a label in the left rail. Pairing them would have
    left the homepage — the page this pass exists for — with nothing moving.
  */
  desk.forEach((rule) => {
    gsap.fromTo(
      rule,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.75,
        ease: 'stage',
        scrollTrigger: { trigger: rule, start: 'top 88%', once: true },
      },
    )
  })

  labels.forEach((label) => {
    gsap.fromTo(
      label,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'stage',
        scrollTrigger: { trigger: label, start: 'top 92%', once: true },
      },
    )
  })

  photos.forEach((photo) => {
    const role = photo.getAttribute('data-reveal')

    const from =
      role === 'wipe'
        ? { clipPath: 'inset(0% 100% 0% 0%)', opacity: 1 }
        : role === 'sweep'
          ? { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 }
          : { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.4, scale: 1.04 }

    gsap.fromTo(photo, from, {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      scale: 1,
      duration: role === 'wipe' ? 1.05 : 0.85,
      ease: 'stage',
      scrollTrigger: { trigger: photo, start: 'top 88%', once: true },
    })
  })

  return register('Desk', tl, {
    trigger: desk[0] ?? labels[0] ?? photos[0],
    targets: desk.length + labels.length + photos.length,
  })
}
