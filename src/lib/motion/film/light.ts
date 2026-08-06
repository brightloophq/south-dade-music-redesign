'use client'

import type { GsapContext } from '../types'

/**
 * THE LIGHT.
 *
 * Not a gradient. A character.
 *
 * The light has a part to play in this film and it behaves differently in every
 * act. It waits over the hero. It searches during the walk. It follows you down
 * the boards. It hesitates before week eleven. It explodes at the First Note.
 * Then it disperses into houselights and lets you read.
 *
 * Every other atmospheric system on the page — dust, vignette, grade, grounds,
 * cursor — reads this character's state from custom properties. Nothing else
 * writes them. There is one lamp and one operator.
 *
 * ## Why `quickSetter` and `quickTo`
 *
 * These properties are written on every frame of a scrub. `gsap.set()` would
 * re-parse the target and rebuild a tween each time; `quickSetter` compiles the
 * write once and then costs a function call. `quickTo` gives the light *inertia*
 * — the operator's hand is never instant, and the lag is what makes it read as
 * a physical lamp rather than a value.
 */

export type LightMood = 'wait' | 'search' | 'follow' | 'hesitate' | 'explode' | 'disperse' | 'shaft'

export interface Light {
  /** Move the lamp. Interpolated — the operator's hand has mass. */
  to(x: number, y: number): void
  /** Set the lamp instantly, for scrub-driven positions. */
  set(x: number, y: number): void
  intensity(value: number): void
  /** The First Note surge. Read by the dust canvas. */
  flare(value: number): void
  warmth(value: number): void
  vignette(value: number): void
  tint(r: number, g: number, b: number): void
  /** Adopt a behaviour. Each mood carries its own intensity and vignette. */
  mood(next: LightMood): void
  current(): LightMood
}

/** Each mood is a lighting state, not a preset — it says what the lamp is doing. */
const MOODS: Record<LightMood, { intensity: number; vignette: number; warmth: number }> = {
  /** Parked, warm, still. The house before the show. */
  wait: { intensity: 0.9, vignette: 0.6, warmth: 0.18 },
  /** Drifting, hunting. Lower and cooler — it has not found anyone yet. */
  search: { intensity: 0.5, vignette: 0.66, warmth: 0.3 },
  /** Tracking with you down the boards. */
  follow: { intensity: 0.75, vignette: 0.5, warmth: 0.6 },
  /** The catch of breath before week eleven. It pulls back. */
  hesitate: { intensity: 0.42, vignette: 0.72, warmth: 0.5 },
  /** The First Note. */
  explode: { intensity: 1, vignette: 0.34, warmth: 0.95 },
  /** Houselights. The light stops performing so you can read. */
  disperse: { intensity: 0.85, vignette: 0.14, warmth: 0.3 },
  /** One shaft, for the page's one shout. */
  shaft: { intensity: 0.7, vignette: 0.56, warmth: 0.82 },
}

export function createLight(gsap: typeof import('gsap').gsap, context: GsapContext): Light {
  const root = document.documentElement

  // Compiled once. Each subsequent write is a function call, not a parse.
  const setX = gsap.quickSetter(root, '--light-x') as (v: number) => void
  const setY = gsap.quickSetter(root, '--light-y') as (v: number) => void
  const setIntensity = gsap.quickSetter(root, '--light-intensity') as (v: number) => void
  const setFlare = gsap.quickSetter(root, '--light-flare') as (v: number) => void
  const setWarmth = gsap.quickSetter(root, '--atmos-warmth') as (v: number) => void
  const setVignette = gsap.quickSetter(root, '--vignette') as (v: number) => void

  // Interpolated position. The operator's hand has mass — 0.9s of catch-up is
  // the point at which the lamp reads as carried rather than teleported.
  const state = { x: 74, y: 22 }
  const toX = gsap.quickTo(state, 'x', { duration: 0.9, ease: 'power2.out', onUpdate: () => setX(state.x) })
  const toY = gsap.quickTo(state, 'y', { duration: 0.9, ease: 'power2.out', onUpdate: () => setY(state.y) })

  let mood: LightMood = 'wait'

  const light: Light = {
    to(x, y) {
      toX(x)
      toY(y)
    },
    set(x, y) {
      state.x = x
      state.y = y
      setX(x)
      setY(y)
    },
    intensity(value) {
      setIntensity(value)
    },
    flare(value) {
      setFlare(value)
    },
    warmth(value) {
      setWarmth(value)
    },
    vignette(value) {
      setVignette(value)
    },
    tint(r, g, b) {
      root.style.setProperty('--atmos-tint', `${Math.round(r)} ${Math.round(g)} ${Math.round(b)}`)
    },
    mood(next) {
      if (next === mood) return
      mood = next

      const target = MOODS[next]
      // Moods cross-fade rather than cut. A lighting board has a fade time.
      context.add(() => {
        gsap.to(
          { i: Number.parseFloat(getComputedStyle(root).getPropertyValue('--light-intensity')) || 0.6 },
          {
            i: target.intensity,
            duration: next === 'explode' ? 0.28 : 1.1,
            ease: next === 'explode' ? 'power3.out' : 'power2.inOut',
            onUpdate() {
              setIntensity(this.targets()[0].i as number)
            },
          },
        )
        gsap.to(
          { v: Number.parseFloat(getComputedStyle(root).getPropertyValue('--vignette')) || 0.4 },
          {
            v: target.vignette,
            duration: 1.4,
            ease: 'power2.inOut',
            onUpdate() {
              setVignette(this.targets()[0].v as number)
            },
          },
        )
        /*
         * Moods deliberately do NOT write warmth or tint.
         *
         * The colour grade is a continuous property of the whole document —
         * where you are in the story — while a mood is what the lamp is doing
         * right now. When both wrote warmth they fought, and the last writer
         * won at random. GradeTimeline owns colour; moods own behaviour.
         */
      })
    },
    current() {
      return mood
    },
  }

  // Opening state: the lamp is already warm and waiting when you arrive.
  light.set(74, 22)
  light.intensity(MOODS.wait.intensity)
  light.vignette(MOODS.wait.vignette)
  light.warmth(MOODS.wait.warmth)
  light.flare(0)

  return light
}
