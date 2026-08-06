'use client'

/**
 * Motion diagnostics.
 *
 * A tiny observable store the film director writes to and the debug panel
 * reads. It exists because "typecheck, lint and build pass" proved nothing
 * about whether a single ScrollTrigger was ever created in a real browser —
 * and a silently-unregistered plugin produces no error at all.
 *
 * **Development only, and free in production.**
 *
 * Every mutator below returns immediately when `NODE_ENV === 'production'`.
 * Next inlines that comparison at build time, so the guard folds to a constant
 * and the minifier removes the function bodies entirely — the 29 call sites
 * scattered through the motion layer cost nothing in a shipped build, including
 * `reportProgressSilently`, which would otherwise run at scroll rate inside the
 * Journey's `onUpdate`.
 *
 * The API is kept intact rather than wrapped in conditionals at each call site,
 * so the production and development code paths stay identical in shape.
 */

/** Folded to `false` at build time in production, enabling dead-code removal. */
const DIAGNOSTICS_ENABLED = process.env.NODE_ENV !== 'production'

export interface TimelineReport {
  name: string
  created: boolean
  /** Whether its trigger element was found in the DOM. */
  triggerFound: boolean
  /** Whether its animated targets were found. */
  targetsFound: number
  /** Live scroll progress, 0–1. */
  progress: number
  pinned: boolean
  scrub: number | boolean
}

export interface MotionDiagnostics {
  gsapLoaded: boolean
  scrollTriggerRegistered: boolean
  scrollTriggerCount: number
  lenisInitialised: boolean
  canvasActive: boolean
  canvasWidth: number
  canvasHeight: number
  canvasDpr: number
  timelines: Record<string, TimelineReport>
  lastError: string | null
}

const initial: MotionDiagnostics = {
  gsapLoaded: false,
  scrollTriggerRegistered: false,
  scrollTriggerCount: 0,
  lenisInitialised: false,
  canvasActive: false,
  canvasWidth: 0,
  canvasHeight: 0,
  canvasDpr: 0,
  timelines: {},
  lastError: null,
}

let state: MotionDiagnostics = initial
const listeners = new Set<() => void>()

function emit(): void {
  for (const listener of listeners) listener()
}

export function subscribeDiagnostics(listener: () => void): () => void {
  if (!DIAGNOSTICS_ENABLED) return () => {}
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getDiagnostics(): MotionDiagnostics {
  return state
}

/** Server render has no browser state to report. */
export function getDiagnosticsServerSnapshot(): MotionDiagnostics {
  return initial
}

export function reportDiagnostics(patch: Partial<MotionDiagnostics>): void {
  if (!DIAGNOSTICS_ENABLED) return
  state = { ...state, ...patch }
  emit()
}

export function reportTimeline(name: string, report: Partial<TimelineReport>): void {
  if (!DIAGNOSTICS_ENABLED) return
  const previous = state.timelines[name] ?? {
    name,
    created: false,
    triggerFound: false,
    targetsFound: 0,
    progress: 0,
    pinned: false,
    scrub: false,
  }

  state = {
    ...state,
    timelines: { ...state.timelines, [name]: { ...previous, ...report } },
  }
  emit()
}

/**
 * Progress updates arrive at scroll rate. Emitting on every frame would make
 * the panel itself the performance problem it is meant to measure, so progress
 * is written into the store without notifying subscribers; the panel polls it
 * on its own rAF instead.
 */
export function reportProgressSilently(name: string, progress: number): void {
  if (!DIAGNOSTICS_ENABLED) return
  const entry = state.timelines[name]
  if (!entry) return
  entry.progress = progress
}

export function resetDiagnostics(): void {
  if (!DIAGNOSTICS_ENABLED) return
  state = { ...initial, timelines: {} }
  emit()
}
