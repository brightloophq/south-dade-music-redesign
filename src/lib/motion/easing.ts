'use client'

/**
 * Bespoke easing curves.
 *
 * Nothing on this page uses a default. `power2.out` is the sound of a framework;
 * these are the sound of a room.
 *
 * Each curve is named for the physical event it describes, because that is how
 * they should be chosen — by what is happening, not by how fast it looks.
 */

/** Registered once, on first use, alongside the rest of the GSAP setup. */
let registered = false

export const CUSTOM_EASES = {
  /**
   * **stage** — the design system's default curve (04-design-system.md §3,
   * `cubic-bezier(0.22, 1, 0.36, 1)`): decisive start, long graceful settle.
   *
   * ⚠️ This was referenced as `ease: 'stage'` by HeroTimeline but never
   * defined, so GSAP fell back to its own default and logged a warning. Now the
   * system's named default actually exists.
   */
  stage: 'M0,0 C0.09,0.4 0.16,0.72 0.28,0.86 0.44,1.02 0.66,1 1,1',

  /**
   * **houselight** — a theatre dimmer on a fader.
   * Almost imperceptible at first, then a long even middle, then a soft arrival.
   * Real dimmers are not linear and neither is this.
   * Used for: ground luminance, section melts, ambient warmth.
   */
  houselight: 'M0,0 C0.14,0 0.2,0.06 0.32,0.24 0.46,0.46 0.62,0.86 0.76,0.96 0.86,1.02 0.92,1 1,1',

  /**
   * **breath** — a slow inhale and settle. No overshoot.
   * Used for: lens breathing, ambient drift, dust.
   */
  breath: 'M0,0 C0.24,0 0.32,0.14 0.44,0.38 0.56,0.62 0.66,0.92 0.78,0.98 0.86,1.01 0.93,1 1,1',

  /**
   * **beam** — light arriving. Fast to 70%, then a long tail.
   * A lamp reaching full output has a knee; this is that knee.
   * Used for: the light sweep, the spotlight bloom.
   */
  beam: 'M0,0 C0.08,0.42 0.16,0.78 0.3,0.9 0.46,1.02 0.66,1 1,1',

  /**
   * **stepIn** — weight transferring onto a foot. A tiny hesitation at the top.
   * Used for: the walk, floor movement, camera push.
   */
  stepIn: 'M0,0 C0.3,0 0.36,0.02 0.44,0.16 0.54,0.34 0.64,0.82 0.74,0.94 0.84,1.04 0.92,1 1,1',

  /**
   * **curtain** — mechanical, weighted, symmetrical. Something heavy moving.
   * Used for: masked wipes.
   */
  curtain: 'M0,0 C0.5,0 0.28,0.06 0.5,0.5 0.72,0.94 0.5,1 1,1',
} as const

export type CustomEaseName = keyof typeof CUSTOM_EASES

/**
 * Register the bespoke curves with GSAP. Idempotent and client-only.
 *
 * Falls back silently if CustomEase is unavailable — every call site passes a
 * GSAP-native ease as a second argument, so motion degrades to a stock curve
 * rather than throwing.
 */
export async function registerEases(): Promise<void> {
  if (registered || typeof window === 'undefined') return

  const [{ gsap }, { CustomEase }] = await Promise.all([import('./gsap'), import('gsap/CustomEase')])

  gsap.registerPlugin(CustomEase)
  for (const [name, path] of Object.entries(CUSTOM_EASES)) {
    CustomEase.create(name, path)
  }

  registered = true
}

/** CSS equivalents, for transitions that never touch JavaScript. */
export const CSS_EASES = {
  houselight: 'cubic-bezier(0.18, 0.02, 0.24, 1)',
  breath: 'cubic-bezier(0.32, 0.02, 0.28, 1)',
  beam: 'cubic-bezier(0.08, 0.62, 0.24, 1)',
  stepIn: 'cubic-bezier(0.36, 0.01, 0.28, 1)',
  curtain: 'cubic-bezier(0.62, 0.02, 0.2, 1)',
} as const
