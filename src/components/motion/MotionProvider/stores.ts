'use client'

import { motionConfig } from '@/config/motion'

import { MOTION_PREFERENCE_STORAGE_KEY } from './context'

/**
 * External stores backing MotionProvider.
 *
 * These exist so the provider can read browser state through
 * `useSyncExternalStore` instead of calling `setState` inside an effect.
 * That is not a lint workaround: setting state in an effect body causes a
 * second render pass on every mount, and this provider wraps the entire app.
 *
 * `useSyncExternalStore` also gives a correct value on the first client render,
 * so motion never briefly resolves the wrong way before an effect corrects it.
 */

// ---------------------------------------------------------------------------
// Stored preference — the manual footer toggle
// ---------------------------------------------------------------------------

type PreferenceListener = () => void

let preferenceSnapshot: boolean | null = null
let preferenceLoaded = false
const preferenceListeners = new Set<PreferenceListener>()

function readStoredPreference(): boolean | null {
  try {
    const stored = window.localStorage.getItem(MOTION_PREFERENCE_STORAGE_KEY)
    if (stored === 'reduced') return true
    if (stored === 'full') return false
    return null
  } catch {
    // Private browsing or blocked storage — fall back to auto-detection.
    return null
  }
}

function notifyPreference(): void {
  for (const listener of preferenceListeners) listener()
}

export function subscribePreference(listener: PreferenceListener): () => void {
  preferenceListeners.add(listener)

  // Another tab changing the preference should update this one.
  const onStorage = (event: StorageEvent): void => {
    if (event.key !== MOTION_PREFERENCE_STORAGE_KEY) return
    preferenceSnapshot = readStoredPreference()
    notifyPreference()
  }

  window.addEventListener('storage', onStorage)
  return () => {
    preferenceListeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

export function getPreferenceSnapshot(): boolean | null {
  if (!preferenceLoaded) {
    preferenceSnapshot = readStoredPreference()
    preferenceLoaded = true
  }
  return preferenceSnapshot
}

/** No stored preference is knowable on the server. */
export function getPreferenceServerSnapshot(): boolean | null {
  return null
}

export function writePreference(value: boolean | null): void {
  preferenceSnapshot = value
  preferenceLoaded = true

  try {
    if (value === null) window.localStorage.removeItem(MOTION_PREFERENCE_STORAGE_KEY)
    else window.localStorage.setItem(MOTION_PREFERENCE_STORAGE_KEY, value ? 'reduced' : 'full')
  } catch {
    // Storage unavailable — the preference applies for this session only.
  }

  notifyPreference()
}

// ---------------------------------------------------------------------------
// Device profile — capability thresholds and breakpoints
// ---------------------------------------------------------------------------

export interface DeviceProfile {
  /** Below the CPU/memory thresholds in 05-motion-system.md §15 rule 7. */
  lowEnd: boolean
  /** Viewport is at least `lg` — pinned sequences are desktop-only. */
  pinningViewport: boolean
  /** Viewport is at least `md` — parallax is disabled below this. */
  parallaxViewport: boolean
  /** `Save-Data` requested — degrade to reduced-motion behaviour. */
  saveData: boolean
}

interface NavigatorWithCapabilities extends Navigator {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

/** The server assumes the most conservative profile. */
const SERVER_DEVICE_PROFILE: DeviceProfile = {
  lowEnd: true,
  pinningViewport: false,
  parallaxViewport: false,
  saveData: false,
}

let deviceSnapshot: DeviceProfile = SERVER_DEVICE_PROFILE
let deviceLoaded = false
const deviceListeners = new Set<PreferenceListener>()

function computeDeviceProfile(): DeviceProfile {
  const nav = navigator as NavigatorWithCapabilities
  const cores = nav.hardwareConcurrency
  const memory = nav.deviceMemory

  /*
   * ⚠️ ROOT CAUSE FIX — see docs/implementation/motion-runtime-diagnosis.md
   *
   * This previously read `cores <= 4 || memory <= 4`, taken literally from
   * 05-motion-system.md §15 rule 7. That threshold was written for mid-range
   * Android and it misfires badly on desktop:
   *
   *   · `navigator.deviceMemory` is QUANTIZED and CAPPED AT 8 by Chrome. A
   *     machine with 6GB reports 4. The value is a privacy-preserving bucket,
   *     not a measurement.
   *   · 4 physical cores is an ordinary laptop, not a low-end device.
   *
   * So an 8-core desktop that happened to report 4GB — or any 4-core laptop —
   * had scrub, pinning, parallax AND smooth scrolling switched off, which is
   * every visible motion on the page except the reveal batch.
   *
   * A single weak signal is no longer enough. Either a device is *genuinely*
   * constrained on one axis, or it is modest on both. The real guard against
   * slow hardware is the frame-rate check at runtime, not a spec sheet read
   * through a privacy filter.
   */
  const veryLowCores = typeof cores === 'number' && cores <= 2
  const veryLowMemory = typeof memory === 'number' && memory <= 2
  const modestOnBoth =
    typeof cores === 'number' &&
    typeof memory === 'number' &&
    cores <= motionConfig.performanceBudget.minHardwareConcurrency &&
    memory <= motionConfig.performanceBudget.minDeviceMemoryGb

  return {
    lowEnd: veryLowCores || veryLowMemory || modestOnBoth,
    pinningViewport: window.matchMedia('(min-width: 1024px)').matches,
    parallaxViewport: window.matchMedia('(min-width: 768px)').matches,
    saveData: nav.connection?.saveData === true,
  }
}

function sameProfile(a: DeviceProfile, b: DeviceProfile): boolean {
  return (
    a.lowEnd === b.lowEnd &&
    a.pinningViewport === b.pinningViewport &&
    a.parallaxViewport === b.parallaxViewport &&
    a.saveData === b.saveData
  )
}

export function subscribeDevice(listener: PreferenceListener): () => void {
  deviceListeners.add(listener)

  let timeout: number | undefined

  const refresh = (): void => {
    const next = computeDeviceProfile()
    // Returning a new object on every read would loop useSyncExternalStore.
    if (sameProfile(next, deviceSnapshot)) return
    deviceSnapshot = next
    for (const l of deviceListeners) l()
  }

  const onResize = (): void => {
    window.clearTimeout(timeout)
    // Debounce; recompute only after the resize settles (05 §15 rule 6).
    timeout = window.setTimeout(refresh, 200)
  }

  window.addEventListener('resize', onResize)
  return () => {
    window.clearTimeout(timeout)
    deviceListeners.delete(listener)
    window.removeEventListener('resize', onResize)
  }
}

export function getDeviceSnapshot(): DeviceProfile {
  if (!deviceLoaded) {
    deviceSnapshot = computeDeviceProfile()
    deviceLoaded = true
  }
  return deviceSnapshot
}

export function getDeviceServerSnapshot(): DeviceProfile {
  return SERVER_DEVICE_PROFILE
}
