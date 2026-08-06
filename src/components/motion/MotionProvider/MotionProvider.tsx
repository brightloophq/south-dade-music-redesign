'use client'

import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react'
import type Lenis from 'lenis'

import { motionConfig } from '@/config/motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { NO_MOTION, type MotionCapability } from '@/lib/motion/capability'
import { reportDiagnostics } from '@/lib/motion/diagnostics'

import { MotionContext, type MotionContextValue } from './context'
import {
  getDeviceServerSnapshot,
  getDeviceSnapshot,
  getPreferenceServerSnapshot,
  getPreferenceSnapshot,
  subscribeDevice,
  subscribePreference,
  writePreference,
  type DeviceProfile,
} from './stores'

export interface MotionProviderProps {
  children: React.ReactNode
  /** Escape hatch for tests and for routes that opt out entirely. */
  forceReducedMotion?: boolean
}

function resolveCapability(reducedMotion: boolean, device: DeviceProfile): MotionCapability {
  if (reducedMotion) return NO_MOTION

  return {
    reveals: true,
    scrub: !device.lowEnd,
    pinning: !device.lowEnd && device.pinningViewport,
    parallax: !device.lowEnd && device.parallaxViewport,
    smoothScroll: !device.lowEnd && motionConfig.smoothScroll.enabled,
  }
}

/**
 * Motion foundation.
 *
 * Responsibilities:
 *  1. Register GSAP exactly once.
 *  2. Resolve reduced motion from the OS preference, `Save-Data`, and the
 *     manual footer toggle, keeping `data-motion` on <html> in sync so CSS and
 *     JS never disagree.
 *  3. Detect device capability and gate scrub / pinning / parallax.
 *  4. Own the Lenis lifecycle, driven by the GSAP ticker.
 *  5. Kill ScrollTrigger instances on unmount.
 *
 * Browser state is read through `useSyncExternalStore` rather than set in an
 * effect. This provider wraps the whole app, so a setState-in-effect would
 * cost every mount a second render pass — and it would briefly resolve motion
 * the wrong way before correcting itself.
 *
 * ⚠️ Phase 4 registers and configures. It does NOT animate any UI.
 *
 * Content is present at first paint and enhanced afterwards:
 * `data-animate-ready` is set only once motion is confirmed available, so a
 * JavaScript failure leaves every element visible
 * (05-motion-system.md §4 rule 5).
 */
export function MotionProvider({ children, forceReducedMotion }: MotionProviderProps) {
  const systemReduced = useMediaQuery('(prefers-reduced-motion: reduce)')

  const override = useSyncExternalStore(subscribePreference, getPreferenceSnapshot, getPreferenceServerSnapshot)
  const device = useSyncExternalStore(subscribeDevice, getDeviceSnapshot, getDeviceServerSnapshot)

  /** The manual toggle wins over detection, in both directions. */
  const reducedMotion = forceReducedMotion ?? override ?? (systemReduced || device.saveData)

  const capability = useMemo(() => resolveCapability(reducedMotion, device), [reducedMotion, device])

  /**
   * Register GSAP only when motion is actually going to be used.
   *
   * The import is dynamic so GSAP is never in the initial client bundle: "no
   * animation library on the critical path — GSAP loads after first paint"
   * (05-motion-system.md §15 rule 10). A static import here would put ~115KB of
   * GSAP into the provider chunk, which wraps every page.
   */
  useEffect(() => {
    if (!capability.reveals) {
      document.documentElement.removeAttribute('data-animate-ready')
      return
    }

    let cancelled = false

    void import('@/lib/motion/gsap').then(({ registerGsap }) => {
      if (cancelled) return
      registerGsap()
      document.documentElement.setAttribute('data-animate-ready', 'true')
    })

    return () => {
      cancelled = true
      document.documentElement.removeAttribute('data-animate-ready')
      void import('@/lib/motion/gsap').then(({ killScrollTriggers }) => killScrollTriggers())
    }
  }, [capability.reveals])

  // Keep CSS in sync with the resolved decision.
  useEffect(() => {
    document.documentElement.setAttribute('data-motion', reducedMotion ? 'reduced' : 'full')
  }, [reducedMotion])

  // Lenis, driven by the GSAP ticker so scroll and animation share one clock.
  useEffect(() => {
    if (!capability.smoothScroll) return

    let instance: Lenis | undefined
    let cancelled = false
    let tickerCallback: ((time: number) => void) | undefined

    const start = async (): Promise<void> => {
      // Loaded lazily: no animation library on the critical path (05 §15 rule 10).
      const [{ default: LenisCtor }, { gsap, ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('@/lib/motion/gsap'),
      ])

      if (cancelled) return

      instance = new LenisCtor({
        lerp: motionConfig.smoothScroll.lerp,
        duration: motionConfig.smoothScroll.duration,
        smoothWheel: motionConfig.smoothScroll.smoothWheel,
        syncTouch: motionConfig.smoothScroll.syncTouch,
      })

      instance.on('scroll', ScrollTrigger.update)
      reportDiagnostics({ lenisInitialised: true })

      tickerCallback = (time: number) => instance?.raf(time * 1000)
      gsap.ticker.add(tickerCallback)
      gsap.ticker.lagSmoothing(0)
    }

    void start()

    return () => {
      cancelled = true
      void import('@/lib/motion/gsap').then(({ gsap }) => {
        if (tickerCallback) gsap.ticker.remove(tickerCallback)
        gsap.ticker.lagSmoothing(500, 33)
      })
      instance?.destroy()
      reportDiagnostics({ lenisInitialised: false })
    }
  }, [capability.smoothScroll])

  const setReducedMotionOverride = useCallback((value: boolean | null) => {
    writePreference(value)
  }, [])

  const value = useMemo<MotionContextValue>(
    () => ({
      reducedMotion,
      capability,
      /** Motion is permitted; reveal primitives may hide their content first. */
      ready: capability.reveals,
      reducedMotionOverride: override,
      setReducedMotionOverride,
    }),
    [reducedMotion, capability, override, setReducedMotionOverride],
  )

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}
