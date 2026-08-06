'use client'

import type { ReactNode } from 'react'

import { MotionProvider } from '@/components/motion/MotionProvider'

export interface AppProvidersProps {
  children: ReactNode
}

/**
 * Single client boundary for the whole app.
 *
 * Keeping providers in one place means the root layout stays a Server
 * Component: only this subtree is client-rendered, so page content is still
 * server-rendered and the LCP element never depends on JavaScript
 * (05-motion-system.md §15 rule 9).
 *
 * Add future providers here rather than nesting new client boundaries in the
 * layout.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return <MotionProvider>{children}</MotionProvider>
}
