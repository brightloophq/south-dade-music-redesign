/**
 * Motion tokens — canonical source: docs/redesign/05-motion-system.md §2, §3
 *
 * Duration is chosen by distance travelled and importance, never by taste.
 * Four easing curves; no component invents its own.
 *
 * Values are in milliseconds. GSAP takes seconds — use `toSeconds()`.
 */

export const duration = {
  /**
   * The three structural beats of the film. These are not preferences — the
   * release is 400ms because a longer flash reads as a transition rather than
   * a cut, and the stillness is 1500ms because that is how long nerve takes.
   * Visual Specification.md §H.
   */
  release: 400,
  still: 1500,
  houselights: 1800,
  /** State flips — checkbox, toggle, tab underline. */
  instant: 100,
  /** Hover, focus ring, small colour transitions. */
  fast: 180,
  /** Default — dropdowns, tooltips, card hover, accordions. */
  base: 280,
  /** Section reveals, modal entry, mobile drawer. */
  slow: 420,
  /** Hero elements, large image reveals. */
  slower: 640,
  /** Curtain reveals, showcase transitions — feature moments only. */
  cinematic: 900,
  /** Absolute ceiling. Nothing exceeds this except user-paced scrubbed timelines. */
  cinematicMax: 1200,
} as const

export type DurationToken = keyof typeof duration

/** Exits are faster than entrances — typically 60–70% of entry duration. */
export const EXIT_RATIO = 0.65

export const easing = {
  /** Default — decisive start, long graceful settle. Entrances and reveals. */
  stage: 'cubic-bezier(0.22, 1, 0.36, 1)',
  /** Slight overshoot (capped at 8%), warm and alive. Counters, confirmations. */
  spot: 'cubic-bezier(0.34, 1.36, 0.64, 1)',
  /** Symmetrical, mechanical, deliberate. Masked wipes, pinned scrub sections. */
  curtain: 'cubic-bezier(0.65, 0, 0.35, 1)',
  /** Accelerates away. All exits and dismissals. */
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
} as const

export type EasingToken = keyof typeof easing

/** GSAP-flavoured equivalents of the same four curves. */
export const gsapEase = {
  stage: 'power3.out',
  spot: 'back.out(1.2)',
  curtain: 'power2.inOut',
  exit: 'power2.in',
} as const

export const stagger = {
  /** Text lines, list items. */
  tight: 40,
  /** Default — card grids, nav items. */
  base: 80,
  /** Feature cards, large media. */
  loose: 120,
  /** Hero sequence only. */
  dramatic: 180,
} as const

export type StaggerToken = keyof typeof stagger

/**
 * Cap total stagger at 600ms. Beyond 8 items, switch to grouped stagger or
 * `tight` — otherwise the last card arrives after the user has scrolled past.
 */
export const STAGGER_TOTAL_CAP_MS = 600
export const STAGGER_GROUPING_THRESHOLD = 8

/** Entrance patterns (05-motion-system.md §4). Every entering element uses one. */
export const entrance = {
  /** The workhorse. Deliberately small distance — long travel reads as cheap. */
  fadeRise: { y: 24, opacity: 0, duration: duration.slow, ease: gsapEase.stage },
  /** Headlines. Masked by their own line box, bottom-to-top. Max 2 per page. */
  curtainUp: { yPercent: 100, duration: duration.slower, ease: gsapEase.curtain },
  /** Feature imagery. Max 1 per page. */
  spotIn: { scale: 1.06, opacity: 0, duration: duration.cinematic, ease: gsapEase.stage },
  /** Media panels. Direction follows reading order. */
  slideReveal: { xPercent: -100, duration: duration.slower, ease: gsapEase.curtain },
} as const

export type EntrancePattern = keyof typeof entrance

/**
 * ScrollTrigger defaults. Animation begins as the element crosses 80% from the
 * top, so it completes as it reaches comfortable reading position.
 */
export const scrollTrigger = {
  start: 'top 80%',
  /** Elements animate on first entry and never re-animate on scroll-back. */
  once: true,
  /** Never `scrub: true` hard-locked — it feels mechanical and amplifies jitter. */
  scrubSmoothing: 0.6,
} as const

/** Parallax is permitted but tightly bounded (05-motion-system.md §5). */
export const parallax = {
  maxDifferential: 0.12,
  /** Disabled entirely below `md` and under reduced motion. */
  minBreakpoint: 'md',
} as const

/** Performance budgets (05-motion-system.md §15). Enforced by capability check. */
export const performanceBudget = {
  targetFps: 60,
  minFps: 50,
  maxMainThreadBlockMs: 50,
  /** Below these, scrub / pinning / parallax are disabled. */
  minHardwareConcurrency: 4,
  minDeviceMemoryGb: 4,
} as const

export const toSeconds = (ms: number): number => ms / 1000
