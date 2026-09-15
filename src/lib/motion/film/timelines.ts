'use client'

import type { Light } from './light'
import { reportProgressSilently, reportTimeline } from '../diagnostics'

/**
 * The homepage timelines — client-review refinement.
 *
 * Every function here is registered by `FilmDirector` inside a GSAP context
 * and a matchMedia block that only exists when `prefers-reduced-motion` is
 * `no-preference`. Nothing is hidden in markup: each tween's *from* state is
 * applied by script at the moment it registers, so a visitor with no script,
 * with reduced motion, or with a failed chunk sees the finished page.
 *
 * ## One personality per section
 *
 *   Hero          cinematic, slow   the plate settles from a long push-in as the
 *                                   preloader lifts; the statement rises line by
 *                                   line from a mask; on scroll the plate drifts
 *   Introduction  editorial         the stage opens left-to-right, the detail
 *                                   rises on its mat and counter-drifts
 *   Programs      directional       frames open in alternating directions, like
 *                                   pages laid on a desk
 *   Journey       progressive       each phase has its own aperture (contain →
 *                                   open → arrive), the inset follows a half-beat
 *                                   later, and the week counter steps 1 → 12
 *   Performances  energetic,        the three lines arrive from alternating
 *                 restrained        sides; frames drift at different rates
 *   Voices        quiet             a slow fade. Nothing else moves.
 *   Finale        warm, resolving   the grade lifts off the room and one warm
 *                                   source comes up behind the words
 *
 * All motion is transform, opacity and clip-path — compositor-only, no reflow,
 * no layout shift. There are no pins: the previous two pinned sequences cost
 * 2,700px of scroll and, measured, CLS 1.75 at 1440 when the second was on.
 */

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
  splits: InstanceType<SplitTextCtor>[]
  /** ≥1024px. Scrubbed drift and the week counter run only here. */
  cinema: boolean
}

const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T | null =>
  root.querySelector<T>(sel)
const qa = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T[] =>
  Array.from(root.querySelectorAll<T>(sel))

/**
 * Record a timeline in the diagnostics store the motion debug panel and
 * `probe:motion` read. Compiled to a no-op in production.
 */
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

/** Run `fn` once the preloader has lifted — immediately if it never ran. */
function afterPreloader(fn: () => void): () => void {
  const root = document.documentElement
  if (root.dataset.preloading !== 'true') {
    fn()
    return () => {}
  }
  const observer = new MutationObserver(() => {
    if (root.dataset.preloading !== 'true') {
      observer.disconnect()
      fn()
    }
  })
  observer.observe(root, { attributes: true, attributeFilter: ['data-preloading'] })
  return () => observer.disconnect()
}

/**
 * Masked line reveal for a heading. The split is reverted as soon as the
 * reveal finishes, so the heading goes back to being ordinary responsive text
 * — nothing is left wrapped in spans that would break on resize.
 */
function revealLines(
  ctx: FilmContext,
  heading: HTMLElement,
  vars: { delay?: number; stagger?: number; duration?: number; trigger?: Element | null } = {},
) {
  const { gsap, SplitText, ScrollTrigger } = ctx
  const split = new SplitText(heading, { type: 'lines', mask: 'lines' })
  ctx.splits.push(split)
  gsap.set(split.lines, { yPercent: 108 })

  const play = () =>
    gsap.to(split.lines, {
      yPercent: 0,
      duration: vars.duration ?? 1.05,
      stagger: vars.stagger ?? 0.09,
      delay: vars.delay ?? 0,
      ease: 'stage',
      onComplete: () => split.revert(),
    })

  if (vars.trigger === null) return play()
  ScrollTrigger.create({ trigger: vars.trigger ?? heading, start: 'top 86%', once: true, onEnter: play })
  return split
}

// ---------------------------------------------------------------------------
// HERO — cinematic, slow
// ---------------------------------------------------------------------------

export function HeroTimeline(ctx: FilmContext) {
  const { gsap, cinema } = ctx
  const scope = q('[data-film="opening"]')
  if (!scope) return register('Hero', gsap.timeline(), { trigger: null, targets: 0 })

  const plate = q('[data-hero-plate]', scope)
  const content = q('[data-hero-content]', scope)
  const heading = q('[data-hero-heading]', scope)
  const items = qa('[data-hero-item]', scope)
  const facts = qa('[data-hero-fact]', scope)

  const tl = gsap.timeline({ defaults: { ease: 'stage' } })

  /*
    THE ENTRANCE PLAYS ONLY UNDER THE PRELOADER.

    On a cold visit the overlay covers the hero while this registers, so the
    from-states are applied out of sight and the entrance is the first thing
    the visitor sees. On a return visit in the same session there is no
    overlay: the hero has already painted, and hiding it to animate it back in
    would be a flash of content. So a return visit gets the page as it is.
  */
  const underPreloader = document.documentElement.dataset.preloading === 'true' && window.scrollY < 40

  if (underPreloader) {
    if (plate) gsap.set(plate, { scale: 1.14 })
    if (heading) {
      const split = new ctx.SplitText(heading, { type: 'lines', mask: 'lines' })
      ctx.splits.push(split)
      gsap.set(split.lines, { yPercent: 108 })
      tl.to(split.lines, { yPercent: 0, duration: 1.35, stagger: 0.12, onComplete: () => split.revert() }, 0.35)
    }
    gsap.set([...items, ...facts], { autoAlpha: 0, y: 16 })
    if (plate) tl.to(plate, { scale: 1, duration: 3.2, ease: 'houselight' }, 0)
    tl.to(items, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.75)
    tl.to(facts, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07 }, 1.15)
    tl.pause()
    const cancel = afterPreloader(() => tl.play())
    tl.eventCallback('onComplete', cancel)
  }

  /* On scroll: the plate drifts down and the words lift away, slower than the page. */
  if (cinema && plate) {
    gsap.to(plate, {
      yPercent: 9,
      ease: 'none',
      scrollTrigger: {
        trigger: scope,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        onUpdate: (self) => reportProgressSilently('Hero', self.progress),
      },
    })
  }
  if (cinema && content) {
    gsap.to(content, {
      y: -48,
      opacity: 0.4,
      ease: 'none',
      scrollTrigger: { trigger: scope, start: '30% top', end: 'bottom top', scrub: 0.6 },
    })
  }

  return register('Hero', tl, { trigger: scope, targets: items.length + facts.length + 2, scrub: cinema ? 0.6 : false })
}

// ---------------------------------------------------------------------------
// FRAMES — every homepage image, each with the reveal its section chose
// ---------------------------------------------------------------------------

type FrameFrom = { clipPath?: string; autoAlpha?: number; x?: number; y?: number; scale?: number }

/**
 * The reveal vocabulary. The name on `data-frame` is chosen by the component
 * for the job the image does; this table is the only place the motion is
 * defined, so a section cannot drift into a one-off.
 */
const FRAME_REVEALS: Record<string, { from: FrameFrom; media: number; duration: number }> = {
  'open-right': { from: { clipPath: 'inset(0% 100% 0% 0%)' }, media: 1.16, duration: 1.15 },
  'open-left': { from: { clipPath: 'inset(0% 0% 0% 100%)' }, media: 1.16, duration: 1.15 },
  'open-up': { from: { clipPath: 'inset(100% 0% 0% 0%)' }, media: 1.14, duration: 1.1 },
  'open-down': { from: { clipPath: 'inset(0% 0% 100% 0%)' }, media: 1.14, duration: 1.1 },
  rise: { from: { autoAlpha: 0, y: 48 }, media: 1.1, duration: 1.2 },
  /* Journey I — contain. A narrow slot that opens outward: practice, close. */
  slot: { from: { clipPath: 'inset(36% 26% 36% 26%)', autoAlpha: 0.4 }, media: 1.2, duration: 1.05 },
  /* Journey II — expose. A curtain drawn from one side: the room opens. */
  curtain: { from: { clipPath: 'inset(0% 0% 0% 100%)', x: -24 }, media: 1.12, duration: 1.15 },
  /* Journey III — arrive. The widest opening, from the centre, pushing forward. */
  arrive: { from: { clipPath: 'inset(0% 50% 0% 50%)', scale: 0.96 }, media: 1.18, duration: 1.4 },
  /* Voices — quiet. */
  fade: { from: { autoAlpha: 0 }, media: 1.04, duration: 1.8 },
}

export function FramesTimeline(ctx: FilmContext) {
  const { gsap } = ctx
  const frames = qa('main [data-frame]')
  const tl = gsap.timeline()

  for (const frame of frames) {
    const reveal = FRAME_REVEALS[frame.dataset.frame ?? '']
    if (!reveal) continue
    const media = q('[data-frame-media]', frame)

    gsap.set(frame, reveal.from)
    if (media) gsap.set(media, { scale: reveal.media })

    ctx.ScrollTrigger.create({
      trigger: frame,
      start: 'top 86%',
      once: true,
      onEnter: () => {
        gsap.to(frame, {
          clipPath: 'inset(0% 0% 0% 0%)',
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: reveal.duration,
          ease: 'stage',
          clearProps: 'clipPath,transform',
        })
        if (media) gsap.to(media, { scale: 1, duration: reveal.duration + 0.5, ease: 'stage', clearProps: 'transform' })
      },
    })
  }

  return register('Frames', tl, { trigger: frames[0] ?? null, targets: frames.length })
}

// ---------------------------------------------------------------------------
// HEADINGS — every section statement rises from a mask
// ---------------------------------------------------------------------------

export function HeadingsTimeline(ctx: FilmContext) {
  const { gsap } = ctx
  const headings = qa('main [data-reveal-lines]')
  for (const heading of headings) revealLines(ctx, heading)

  const eyebrows = qa('main [data-eyebrow]')
  for (const eyebrow of eyebrows) {
    const rule = eyebrow.querySelector('span[aria-hidden="true"]')
    if (!rule) continue
    gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' })
    ctx.ScrollTrigger.create({
      trigger: eyebrow,
      start: 'top 90%',
      once: true,
      onEnter: () => gsap.to(rule, { scaleX: 1, duration: 0.9, ease: 'stage' }),
    })
  }

  return register('Headings', gsap.timeline(), { trigger: headings[0] ?? null, targets: headings.length + eyebrows.length })
}

// ---------------------------------------------------------------------------
// INTRODUCTION — editorial
// ---------------------------------------------------------------------------

export function IntroTimeline(ctx: FilmContext) {
  const { gsap, cinema } = ctx
  const scope = q('[data-film="introduction"]')
  if (!scope) return register('Introduction', gsap.timeline(), { trigger: null, targets: 0 })

  const items = qa('[data-intro-item]', scope)
  const detail = q('[data-intro-detail]', scope)

  gsap.set(items, { autoAlpha: 0, y: 14 })
  ctx.ScrollTrigger.create({
    trigger: items[0] ?? scope,
    start: 'top 88%',
    once: true,
    onEnter: () => gsap.to(items, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'stage' }),
  })

  /* Depth: the detail on its mat moves against the stage behind it. */
  if (cinema && detail) {
    gsap.fromTo(
      detail,
      { y: 56 },
      { y: -36, ease: 'none', scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
    )
  }

  return register('Introduction', gsap.timeline(), { trigger: scope, targets: items.length + 1, scrub: cinema ? 0.8 : false })
}

// ---------------------------------------------------------------------------
// JOURNEY — progressive, rhythmic
// ---------------------------------------------------------------------------

export function JourneyTimeline(ctx: FilmContext) {
  const { gsap, ScrollTrigger, cinema } = ctx
  const scope = q('[data-film="journey"]')
  if (!scope) return register('Journey', gsap.timeline(), { trigger: null, targets: 0 })

  const phases = qa('[data-journey-phase]', scope)
  const week = q('[data-journey-week]', scope)
  const ticks = qa('[data-journey-tick]', scope)

  /* The insets follow their frame a half-beat later — the rhythm of the section. */
  for (const phase of phases) {
    const inset = q('[data-journey-inset]', phase)
    if (!inset) continue
    gsap.set(inset, { autoAlpha: 0, y: 40 })
    ScrollTrigger.create({
      trigger: phase,
      start: 'top 70%',
      once: true,
      onEnter: () => gsap.to(inset, { autoAlpha: 1, y: 0, duration: 1.1, delay: 0.45, ease: 'stage' }),
    })
    if (cinema) {
      gsap.to(inset, {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: phase, start: 'top bottom', end: 'bottom top', scrub: 0.9 },
      })
    }
  }

  /*
    THE COUNTER. Scroll is footsteps: weeks 1–10 step across the first phase,
    11 and 12 land on the next two. Decorative and `aria-hidden` — the phases
    themselves carry the week bands as headings.
  */
  if (cinema && week && ticks.length === 12) {
    let current = 0
    const setWeek = (value: number) => {
      const next = Math.min(12, Math.max(1, Math.round(value)))
      if (next === current) return
      const rising = next > current
      current = next
      week.textContent = String(next)
      gsap.fromTo(
        week,
        { yPercent: rising ? 22 : -22, opacity: 0.35 },
        { yPercent: 0, opacity: 1, duration: 0.45, ease: 'stage', overwrite: true },
      )
      ticks.forEach((tick, index) =>
        gsap.to(tick, { scaleX: index < next ? 1 : 0, duration: 0.5, ease: 'stage', overwrite: true }),
      )
      reportProgressSilently('Journey', next / 12)
    }

    gsap.set(ticks, { scaleX: 0, transformOrigin: 'left center' })
    setWeek(1)

    for (const phase of phases) {
      const from = Number(phase.dataset.weekFrom)
      const to = Number(phase.dataset.weekTo)
      if (!Number.isFinite(from) || !Number.isFinite(to)) continue
      ScrollTrigger.create({
        trigger: phase,
        start: 'top 58%',
        end: 'bottom 58%',
        onUpdate: (self) => setWeek(from + (to - from) * self.progress),
        onEnter: () => setWeek(from),
        onEnterBack: () => setWeek(to),
        onLeaveBack: () => {
          if (from === 1) setWeek(1)
        },
      })
    }
  }

  return register('Journey', gsap.timeline(), { trigger: scope, targets: phases.length + ticks.length })
}

// ---------------------------------------------------------------------------
// PERFORMANCES — energetic, restrained
// ---------------------------------------------------------------------------

export function PerformancesTimeline(ctx: FilmContext) {
  const { gsap, ScrollTrigger, cinema } = ctx
  const scope = q('[data-film="performances"]')
  if (!scope) return register('Performances', gsap.timeline(), { trigger: null, targets: 0 })

  const lines = qa('[data-perf-line]', scope)
  lines.forEach((line, index) => gsap.set(line, { autoAlpha: 0, x: index % 2 ? 36 : -36 }))
  ScrollTrigger.create({
    trigger: lines[0] ?? scope,
    start: 'top 88%',
    once: true,
    onEnter: () => gsap.to(lines, { autoAlpha: 1, x: 0, duration: 0.85, stagger: 0.12, ease: 'stage' }),
  })

  const drifting = qa('[data-perf-drift]', scope)
  if (cinema) {
    for (const figure of drifting) {
      const amount = Number(figure.dataset.perfDrift) || 0
      gsap.fromTo(
        figure,
        { yPercent: amount },
        {
          yPercent: -amount,
          ease: 'none',
          scrollTrigger: { trigger: figure, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        },
      )
    }
  }

  return register('Performances', gsap.timeline(), { trigger: scope, targets: lines.length + drifting.length, scrub: cinema ? 0.7 : false })
}

// ---------------------------------------------------------------------------
// PHILOSOPHY — a held breath
// ---------------------------------------------------------------------------

export function PhilosophyTimeline(ctx: FilmContext) {
  const { gsap } = ctx
  const quote = q('[data-philosophy-quote]')
  if (!quote) return register('Philosophy', gsap.timeline(), { trigger: null, targets: 0 })

  gsap.set(quote, { autoAlpha: 0, x: 18 })
  ctx.ScrollTrigger.create({
    trigger: quote,
    start: 'top 88%',
    once: true,
    onEnter: () => gsap.to(quote, { autoAlpha: 1, x: 0, duration: 1.4, ease: 'breath' }),
  })

  return register('Philosophy', gsap.timeline(), { trigger: quote, targets: 1 })
}

// ---------------------------------------------------------------------------
// FINALE — warm, resolving
// ---------------------------------------------------------------------------

export function FinaleTimeline(ctx: FilmContext) {
  const { gsap } = ctx
  const scope = q('[data-film="finale"]')
  if (!scope) return register('Finale', gsap.timeline(), { trigger: null, targets: 0 })

  const plate = q('[data-finale-plate]', scope)
  const scrim = q('[data-finale-scrim]', scope)
  const glow = q('[data-finale-glow]', scope)
  const actions = q('[data-finale-actions]', scope)

  /*
    The house lights. Scrubbed, so the visitor raises them: the room starts
    under a deeper grade, a little closer, with the warm source off, and
    resolves to the static values as the section settles into view.
  */
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: scope,
      start: 'top 90%',
      end: 'top 15%',
      scrub: 0.9,
      onUpdate: (self) => reportProgressSilently('Finale', self.progress),
    },
  })
  if (plate) tl.fromTo(plate, { scale: 1.12, filter: 'brightness(0.55)' }, { scale: 1, filter: 'brightness(1)' }, 0)
  if (scrim) tl.fromTo(scrim, { opacity: 1 }, { opacity: 0.9 }, 0)
  if (glow) tl.fromTo(glow, { opacity: 0 }, { opacity: 1 }, 0.35)

  if (actions) {
    gsap.set(actions, { autoAlpha: 0, y: 16 })
    ctx.ScrollTrigger.create({
      trigger: actions,
      start: 'top 92%',
      once: true,
      onEnter: () => gsap.to(actions, { autoAlpha: 1, y: 0, duration: 1, delay: 0.2, ease: 'stage' }),
    })
  }

  return register('Finale', tl, { trigger: scope, targets: 4, scrub: 0.9 })
}
