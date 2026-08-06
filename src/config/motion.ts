/**
 * Motion configuration — the runtime policy layer.
 * Canonical spec: docs/redesign/05-motion-system.md
 *
 * The tokens in src/tokens/motion.ts say *how* things move. This says *whether*
 * they move at all, and under what conditions they are switched off.
 */

import { duration, easing, gsapEase, parallax, performanceBudget, scrollTrigger, stagger } from '@/tokens/motion'

export const motionConfig = {
  duration,
  easing,
  gsapEase,
  stagger,
  scrollTrigger,
  parallax,
  performanceBudget,

  /**
   * Smooth scrolling (Lenis). Disabled under reduced motion and on low-capability
   * devices — smooth scroll on a struggling device is worse than none.
   */
  smoothScroll: {
    enabled: true,
    lerp: 0.1,
    duration: 1.2,
    /** Never override touch scrolling — it fights the platform. */
    smoothWheel: true,
    syncTouch: false,
  },

  /**
   * Pinning is powerful and easily abused. Maximum two pinned sequences
   * sitewide (05 §6). Registered here so a third cannot be added silently.
   */
  pinning: {
    maxSitewide: 2,
    /** Longer and users feel trapped. */
    maxScrollVh: 300,
    /** Desktop and large tablet only. Below `lg`, degrade to stacked steps. */
    minBreakpoint: 'lg' as const,
    approved: [
      { id: 'ninety-day-timeline', routes: ['/', '/programs/90-day-stage-program'] },
      { id: 'exposure-ladder', routes: ['/programs/90-day-stage-program', '/about'], gate: 'B-3' },
    ],
  },

  /**
   * Motion budget by template (05 §17). Intensity is inversely proportional to
   * how close the user is to a decision.
   */
  budgetByTemplate: {
    home: 'high',
    'program-flagship': 'high',
    'program-detail': 'medium',
    instrument: 'low',
    camps: 'medium',
    scholarships: 'minimal',
    pricing: 'minimal',
    performances: 'high',
    teachers: 'low',
    faq: 'none',
    contact: 'none',
    'not-found': 'low',
  } as const,

  /**
   * Never animated (05 §16). Kept as data so components can assert it.
   * These are not stylistic preferences.
   */
  neverAnimate: [
    'price-at-decision',
    'deposit-amount',
    'refund-terms',
    'policy-text',
    'camp-dates',
    'capacity-limits',
    'guarantee-text',
    'contact-details',
    'error-messages',
    'focus-indicators',
    'skip-links',
    'safeguarding-information',
  ] as const,

  /** Never done at all, under any circumstance (05 §16). */
  prohibited: [
    'auto-advancing-carousels',
    'scroll-jacking',
    'forced-snapping',
    'wheel-hijacking',
    'cursor-followers',
    'custom-cursors',
    'preloaders',
    'text-scramble',
    'typewriter-headings',
    'infinite-loops-during-reading',
    'background-video-autoplay-mobile',
    'animated-student-photography',
    'confetti-sparkles-note-particles',
  ] as const,
} as const

export type MotionConfig = typeof motionConfig
export type MotionBudget = (typeof motionConfig.budgetByTemplate)[keyof typeof motionConfig.budgetByTemplate]
