'use client'

import { useSyncExternalStore } from 'react'

/**
 * Subscribe to a media query.
 *
 * Uses `useSyncExternalStore` so the value is correct on the first client render
 * rather than flashing after an effect — which matters for the mobile drawer,
 * where a wrong first value would mount the wrong navigation.
 *
 * The server snapshot is `false`: markup is authored mobile-first, so assuming
 * "not matched" produces the correct SSR output for min-width queries.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (onChange: () => void): (() => void) => {
    if (typeof window === 'undefined' || !window.matchMedia) return () => {}

    const list = window.matchMedia(query)
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }

  const getSnapshot = (): boolean => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  }

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

/** Breakpoint helpers matching docs/redesign/04-design-system.md §4. */
export const useIsAtLeastSm = (): boolean => useMediaQuery('(min-width: 480px)')
export const useIsAtLeastMd = (): boolean => useMediaQuery('(min-width: 768px)')
export const useIsAtLeastLg = (): boolean => useMediaQuery('(min-width: 1024px)')
export const useIsAtLeastXl = (): boolean => useMediaQuery('(min-width: 1280px)')

/** Hover states never apply on touch — sticky hover is a known bug class. */
export const useHasFinePointer = (): boolean => useMediaQuery('(hover: hover) and (pointer: fine)')
