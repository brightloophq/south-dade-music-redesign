'use client'

/**
 * Device-capability detection.
 * Canonical spec: docs/redesign/05-motion-system.md §15 rule 7
 *
 * If `hardwareConcurrency <= 4` or `deviceMemory <= 4GB`, disable scrub,
 * pinning and parallax; keep simple reveals. The `Save-Data` header degrades to
 * reduced-motion behaviour entirely.
 *
 * This matters commercially: much of the target market is on mid-range Android.
 */

import { motionConfig } from '@/config/motion'

export type MotionCapability = {
  /** Entrance reveals — always available unless motion is reduced. */
  reveals: boolean
  /** Scroll-scrubbed timelines. */
  scrub: boolean
  /** Pinned sequences. */
  pinning: boolean
  parallax: boolean
  /** Lenis smooth scrolling. */
  smoothScroll: boolean
}

export const NO_MOTION: MotionCapability = {
  reveals: false,
  scrub: false,
  pinning: false,
  parallax: false,
  smoothScroll: false,
}

export const FULL_MOTION: MotionCapability = {
  reveals: true,
  scrub: true,
  pinning: true,
  parallax: true,
  smoothScroll: true,
}

interface NavigatorWithCapabilities extends Navigator {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function prefersSaveData(): boolean {
  if (typeof navigator === 'undefined') return false
  return (navigator as NavigatorWithCapabilities).connection?.saveData === true
}

/** True when the device is below the thresholds for expensive motion. */
export function isLowCapabilityDevice(): boolean {
  if (typeof navigator === 'undefined') return false

  const nav = navigator as NavigatorWithCapabilities
  const cores = nav.hardwareConcurrency
  const memory = nav.deviceMemory

  const lowCores = typeof cores === 'number' && cores <= motionConfig.performanceBudget.minHardwareConcurrency
  const lowMemory = typeof memory === 'number' && memory <= motionConfig.performanceBudget.minDeviceMemoryGb

  return lowCores || lowMemory
}

/** Pinned sequences are desktop and large-tablet only (05 §6 rule 4). */
export function meetsPinningBreakpoint(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(min-width: 1024px)').matches
}

/** Parallax is disabled entirely below `md` (05 §5). */
export function meetsParallaxBreakpoint(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(min-width: 768px)').matches
}

/**
 * Resolve what this device and user may run.
 *
 * @param forcedReducedMotion - the manual footer toggle, which overrides
 *   detection in both directions once the user has expressed a preference.
 */
export function detectCapability(forcedReducedMotion?: boolean): MotionCapability {
  if (typeof window === 'undefined') return NO_MOTION

  const reduced = forcedReducedMotion ?? (prefersReducedMotion() || prefersSaveData())
  if (reduced) return NO_MOTION

  const lowEnd = isLowCapabilityDevice()

  return {
    reveals: true,
    scrub: !lowEnd,
    pinning: !lowEnd && meetsPinningBreakpoint(),
    parallax: !lowEnd && meetsParallaxBreakpoint(),
    smoothScroll: !lowEnd && motionConfig.smoothScroll.enabled,
  }
}
