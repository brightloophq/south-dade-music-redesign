'use client'

/**
 * GSAP registration — exactly once, for the whole app.
 *
 * Importing gsap/ScrollTrigger from anywhere else risks duplicate plugin
 * registration and duplicate bundle inclusion. Every consumer imports from here.
 *
 * Budget (05-motion-system.md §15): GSAP + ScrollTrigger < 45KB gzipped,
 * total animation JS < 70KB. Only ScrollTrigger is registered — additional
 * plugins must be justified against that budget.
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { motionConfig } from '@/config/motion'

let registered = false

/**
 * Register plugins and apply global defaults. Idempotent and client-only.
 * Called by MotionProvider on mount; safe to call again.
 */
export function registerGsap(): void {
  if (registered || typeof window === 'undefined') return

  gsap.registerPlugin(ScrollTrigger, useGSAP)

  gsap.defaults({
    ease: motionConfig.gsapEase.stage,
    duration: motionConfig.duration.slow / 1000,
  })

  /**
   * `will-change` is applied immediately before an animation and removed after.
   * Persistent `will-change` exhausts GPU memory on mobile (05 §15 rule 2).
   */
  gsap.config({ autoSleep: 60, force3D: true, nullTargetWarn: process.env.NODE_ENV !== 'production' })

  ScrollTrigger.config({
    // Recalculating on every resize event thrashes; refresh after it settles.
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  })

  registered = true
}

export function isGsapRegistered(): boolean {
  return registered
}

/**
 * Kill every ScrollTrigger instance. Orphaned triggers are the most common
 * memory leak in GSAP sites (05 §15 rule 3) — call on route change.
 */
export function killScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

export { gsap, ScrollTrigger, useGSAP }
