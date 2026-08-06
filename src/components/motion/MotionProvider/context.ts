'use client'

import { createContext } from 'react'

import { NO_MOTION, type MotionCapability } from '@/lib/motion/capability'

export interface MotionContextValue {
  /** Resolved answer: OS preference OR Save-Data OR the manual toggle. */
  reducedMotion: boolean
  /** Which techniques this device may run. */
  capability: MotionCapability
  /** True once GSAP has registered and reveals may start hidden. */
  ready: boolean
  /** `null` returns the user to auto-detection. */
  reducedMotionOverride: boolean | null
  setReducedMotionOverride: (value: boolean | null) => void
}

/**
 * Defaults are the safe state: no motion, not ready. If a component renders
 * outside the provider it degrades to fully-visible static content rather than
 * to a blank screen.
 */
export const MotionContext = createContext<MotionContextValue>({
  reducedMotion: true,
  capability: NO_MOTION,
  ready: false,
  reducedMotionOverride: null,
  setReducedMotionOverride: () => {},
})

export const MOTION_PREFERENCE_STORAGE_KEY = 'sdm:reduced-motion'
