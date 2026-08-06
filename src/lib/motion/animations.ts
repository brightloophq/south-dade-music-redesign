'use client'

/**
 * Animation utilities — the vocabulary, not the choreography.
 *
 * These build GSAP tweens for the five named entrance patterns
 * (05-motion-system.md §4). Phase 4 does NOT animate any UI; components consume
 * these in a later phase.
 *
 * Two rules are enforced here rather than left to call sites:
 *  1. Only `transform` and `opacity` are animated (05 §15 rule 1).
 *  2. `will-change` is set immediately before and cleared after (rule 2).
 */

import type { GsapTween, GsapTweenTarget } from './types'

import { motionConfig } from '@/config/motion'
import { STAGGER_GROUPING_THRESHOLD, STAGGER_TOTAL_CAP_MS } from '@/tokens/motion'

import { gsap } from './gsap'

export type AnimationTarget = GsapTweenTarget

export interface RevealOptions {
  /** Delay before the tween starts, in ms. */
  delay?: number
  duration?: number
  /** Distance travelled, px. Deliberately small — long travel reads as cheap. */
  distance?: number
  ease?: string
  onComplete?: () => void
}

function toSeconds(ms: number | undefined, fallback: number): number {
  return (ms ?? fallback) / 1000
}

/**
 * Clear `will-change` and mark the element done so it is never re-animated.
 * Elements animate on first entry only (05 §4 rule 1).
 */
function settle(targets: AnimationTarget): void {
  gsap.set(targets, { clearProps: 'willChange' })
  const elements = gsap.utils.toArray<HTMLElement>(targets)
  for (const element of elements) element.dataset.animateDone = 'true'
}

/**
 * `fade-rise` — the workhorse. Opacity 0→1, translateY 24px→0.
 * Body copy, cards, list items, most content.
 */
export function fadeRise(targets: AnimationTarget, options: RevealOptions = {}): GsapTween {
  const distance = options.distance ?? 24

  gsap.set(targets, { willChange: 'transform, opacity' })

  return gsap.fromTo(
    targets,
    { opacity: 0, y: distance },
    {
      opacity: 1,
      y: 0,
      duration: toSeconds(options.duration, motionConfig.duration.slow),
      delay: toSeconds(options.delay, 0),
      ease: options.ease ?? motionConfig.gsapEase.stage,
      onComplete: () => {
        settle(targets)
        options.onComplete?.()
      },
    },
  )
}

/**
 * `curtain-up` — headlines. Text masked by its own line box, revealed
 * bottom-to-top. H1 and major section headings only. **Maximum two per page.**
 *
 * The caller is responsible for the masking wrapper; this animates the inner
 * element only.
 */
export function curtainUp(targets: AnimationTarget, options: RevealOptions = {}): GsapTween {
  gsap.set(targets, { willChange: 'transform' })

  return gsap.fromTo(
    targets,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: toSeconds(options.duration, motionConfig.duration.slower),
      delay: toSeconds(options.delay, 0),
      ease: options.ease ?? motionConfig.gsapEase.curtain,
      onComplete: () => {
        settle(targets)
        options.onComplete?.()
      },
    },
  )
}

/**
 * `spot-in` — feature imagery. Scale 1.06→1 with a warm overlay dissipating.
 * **Maximum one per page.** The overlay is the caller's responsibility.
 */
export function spotIn(targets: AnimationTarget, options: RevealOptions = {}): GsapTween {
  gsap.set(targets, { willChange: 'transform, opacity' })

  return gsap.fromTo(
    targets,
    { opacity: 0, scale: 1.06 },
    {
      opacity: 1,
      scale: 1,
      duration: toSeconds(options.duration, motionConfig.duration.cinematic),
      delay: toSeconds(options.delay, 0),
      ease: options.ease ?? motionConfig.gsapEase.stage,
      onComplete: () => {
        settle(targets)
        options.onComplete?.()
      },
    },
  )
}

/**
 * `slide-reveal` — media panels. An opaque panel wipes across and off.
 * Direction follows reading order (left-to-right in LTR).
 */
export function slideReveal(targets: AnimationTarget, options: RevealOptions = {}): GsapTween {
  gsap.set(targets, { willChange: 'transform' })

  return gsap.fromTo(
    targets,
    { xPercent: 0 },
    {
      xPercent: 100,
      duration: toSeconds(options.duration, motionConfig.duration.slower),
      delay: toSeconds(options.delay, 0),
      ease: options.ease ?? motionConfig.gsapEase.curtain,
      onComplete: () => {
        settle(targets)
        options.onComplete?.()
      },
    },
  )
}

/**
 * Resolve a stagger interval that respects the 600ms total cap.
 * Beyond 8 items, groups animate as units rather than individually — otherwise
 * the last card arrives after the user has scrolled past (05 §2).
 */
export function resolveStagger(itemCount: number, requested: number = motionConfig.stagger.base): number {
  if (itemCount <= 1) return 0

  const intervals = itemCount - 1
  const wouldTake = intervals * requested

  if (wouldTake <= STAGGER_TOTAL_CAP_MS) return requested

  if (itemCount > STAGGER_GROUPING_THRESHOLD) {
    return Math.min(motionConfig.stagger.tight, STAGGER_TOTAL_CAP_MS / intervals)
  }

  return STAGGER_TOTAL_CAP_MS / intervals
}

/** A staggered `fade-rise` across a set, with the cap applied. */
export function staggerFadeRise(
  targets: AnimationTarget,
  options: RevealOptions & { stagger?: number } = {},
): GsapTween {
  const elements = gsap.utils.toArray<HTMLElement>(targets)
  const interval = resolveStagger(elements.length, options.stagger)

  gsap.set(targets, { willChange: 'transform, opacity' })

  return gsap.fromTo(
    targets,
    { opacity: 0, y: options.distance ?? 24 },
    {
      opacity: 1,
      y: 0,
      duration: toSeconds(options.duration, motionConfig.duration.slow),
      delay: toSeconds(options.delay, 0),
      ease: options.ease ?? motionConfig.gsapEase.stage,
      stagger: interval / 1000,
      onComplete: () => {
        settle(targets)
        options.onComplete?.()
      },
    },
  )
}

/** Apply the final state instantly — the reduced-motion and no-JS path. */
export function applyFinalState(targets: AnimationTarget): void {
  gsap.set(targets, { opacity: 1, y: 0, x: 0, scale: 1, yPercent: 0, xPercent: 0, clearProps: 'willChange' })
  settle(targets)
}
