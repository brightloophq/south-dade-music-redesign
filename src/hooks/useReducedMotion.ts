'use client'

import { useContext } from 'react'

import { MotionContext } from '@/components/motion/MotionProvider/context'

/**
 * Whether motion should be reduced for this user, right now.
 *
 * Resolves the OS preference, the `Save-Data` header, and the manual footer
 * toggle into one answer. Ship a manual toggle alongside the OS preference —
 * many users don't know the OS setting exists (05-motion-system.md §14).
 */
export function useReducedMotion(): boolean {
  return useContext(MotionContext).reducedMotion
}

/**
 * The full motion capability profile — which techniques this device may run.
 * See docs/redesign/05-motion-system.md §15 rule 7.
 */
export function useMotionCapability() {
  return useContext(MotionContext).capability
}

/** Setter for the manual footer toggle. `null` returns the user to auto-detect. */
export function useSetReducedMotion(): (value: boolean | null) => void {
  return useContext(MotionContext).setReducedMotionOverride
}
