'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

import { MOTION_PREFERENCE_STORAGE_KEY } from '@/components/motion/MotionProvider'
import { useMotionCapability, useReducedMotion } from '@/hooks/useReducedMotion'
import { MotionContext } from '@/components/motion/MotionProvider/context'
import {
  getDiagnostics,
  getDiagnosticsServerSnapshot,
  subscribeDiagnostics,
} from '@/lib/motion/diagnostics'
import { useContext } from 'react'

/**
 * Motion debug panel.
 *
 * Renders only when `NEXT_PUBLIC_MOTION_DEBUG=true` **and** the build is not
 * production. It exposes no secrets — every value is browser state that is
 * already readable from the console.
 *
 * It exists because the previous three phases all passed typecheck, lint and
 * build while the motion layer was silently disabled at runtime. Static checks
 * cannot see an unregistered GSAP plugin or a capability gate that resolved to
 * `false` on ordinary hardware. This can.
 */

const ENABLED = process.env.NEXT_PUBLIC_MOTION_DEBUG === 'true' && process.env.NODE_ENV !== 'production'

function readStoredPreferenceLabel(): string {
  try {
    return window.localStorage.getItem(MOTION_PREFERENCE_STORAGE_KEY) ?? '(not set)'
  } catch {
    return '(blocked)'
  }
}

function subscribeStorage(onChange: () => void): () => void {
  window.addEventListener('storage', onChange)
  return () => window.removeEventListener('storage', onChange)
}

function Row({ label, value, bad }: { label: string; value: string | number | boolean; bad?: boolean }) {
  const text = typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value)
  const isBad = bad ?? (typeof value === 'boolean' ? !value : false)

  return (
    <div className="flex items-baseline justify-between gap-3 tabular-nums">
      <span className="text-white/55">{label}</span>
      <span className={isBad ? 'text-red-400' : 'text-emerald-400'}>{text}</span>
    </div>
  )
}

export function MotionDebugPanel() {
  const diagnostics = useSyncExternalStore(subscribeDiagnostics, getDiagnostics, getDiagnosticsServerSnapshot)
  const capability = useMotionCapability()
  const reducedMotion = useReducedMotion()
  const { reducedMotionOverride, ready } = useContext(MotionContext)

  const [live, setLive] = useState({ scrollY: 0, progress: 0, dataMotion: '', animateReady: '', tick: 0 })

  /*
   * ⚠️ Read storage through useSyncExternalStore, not during render.
   *
   * The first version read localStorage inline, so the server rendered
   * "(blocked)" and the client rendered "(not set)" — React reported a
   * hydration mismatch and regenerated the whole tree. The panel built to
   * diagnose the page was corrupting it.
   *
   * The server snapshot is a neutral placeholder, so SSR and the first client
   * render agree and hydration is clean.
   */
  const storedPreference = useSyncExternalStore(
    subscribeStorage,
    readStoredPreferenceLabel,
    () => '…',
  )

  // Polled on rAF rather than pushed, so scroll-rate progress updates never
  // re-render the page's real components.
  useEffect(() => {
    if (!ENABLED) return
    let frame = 0

    const tick = (): void => {
      const root = document.documentElement
      const max = root.scrollHeight - window.innerHeight
      setLive({
        scrollY: Math.round(window.scrollY),
        progress: max > 0 ? Number((window.scrollY / max).toFixed(3)) : 0,
        dataMotion: root.getAttribute('data-motion') ?? '—',
        animateReady: root.getAttribute('data-animate-ready') ?? '—',
        tick: performance.now(),
      })
      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  /*
   * Expose the store so scripts/motion-probe.mjs reads structured values rather
   * than scraping rendered text. In an effect, never during render — writing to
   * a global while rendering is a side effect React is entitled to discard.
   */
  useEffect(() => {
    if (!ENABLED) return
    ;(window as unknown as Record<string, unknown>).__MOTION_DIAGNOSTICS__ = {
      ...diagnostics,
      capability,
      reducedMotion,
      reducedMotionOverride,
      ready,
      storedPreference,
    }
  }, [diagnostics, capability, reducedMotion, reducedMotionOverride, ready, storedPreference])

  if (!ENABLED) return null

  const timelines = Object.values(diagnostics.timelines)

  return (
    <aside
      aria-hidden="true"
      className="fixed bottom-3 left-3 z-[9999] max-h-[85vh] w-[19rem] overflow-y-auto rounded-md border border-white/15 bg-black/88 p-3 font-mono text-[11px] leading-[1.5] text-white shadow-2xl backdrop-blur"
    >
      <div className="mb-2 border-b border-white/15 pb-1 font-semibold tracking-wide text-amber-300">
        MOTION DEBUG
      </div>

      <div className="mb-2 flex flex-col gap-0.5">
        <Row label="GSAP loaded" value={diagnostics.gsapLoaded} />
        <Row label="ScrollTrigger reg." value={diagnostics.scrollTriggerRegistered} />
        <Row label="ST instances" value={diagnostics.scrollTriggerCount} bad={diagnostics.scrollTriggerCount === 0} />
        <Row label="Lenis init" value={diagnostics.lenisInitialised} />
        <Row label="provider ready" value={ready} />
      </div>

      <div className="mb-2 flex flex-col gap-0.5 border-t border-white/10 pt-2">
        <Row label="reducedMotion" value={reducedMotion} bad={reducedMotion} />
        <Row label="override" value={reducedMotionOverride === null ? 'null (auto)' : String(reducedMotionOverride)} bad={reducedMotionOverride === true} />
        <Row label="localStorage" value={storedPreference} bad={storedPreference === 'reduced'} />
        <Row label="data-motion" value={live.dataMotion} bad={live.dataMotion === 'reduced'} />
        <Row label="data-animate-ready" value={live.animateReady} bad={live.animateReady !== 'true'} />
      </div>

      <div className="mb-2 flex flex-col gap-0.5 border-t border-white/10 pt-2">
        <Row label="cap.reveals" value={capability.reveals} />
        <Row label="cap.scrub" value={capability.scrub} />
        <Row label="cap.pinning" value={capability.pinning} />
        <Row label="cap.parallax" value={capability.parallax} />
        <Row label="cap.smoothScroll" value={capability.smoothScroll} />
      </div>

      <div className="mb-2 flex flex-col gap-0.5 border-t border-white/10 pt-2">
        <Row label="dust active" value={diagnostics.canvasActive} />
        <Row label="canvas" value={`${diagnostics.canvasWidth}×${diagnostics.canvasHeight} @${diagnostics.canvasDpr}x`} bad={diagnostics.canvasWidth === 0} />
        <Row label="scrollY" value={live.scrollY} bad={false} />
        <Row label="doc progress" value={live.progress} bad={false} />
      </div>

      <div className="border-t border-white/10 pt-2">
        <div className="mb-1 text-white/45">TIMELINES ({timelines.length})</div>
        {timelines.length === 0 ? (
          <div className="text-red-400">none created</div>
        ) : (
          timelines.map((t) => (
            <div key={t.name} className="mb-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className={t.created ? 'text-emerald-400' : 'text-red-400'}>{t.name}</span>
                <span className="text-white/45 tabular-nums">
                  {t.pinned ? 'pin ' : ''}
                  {t.scrub === false ? '' : `scrub ${t.scrub}`}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2 pl-2 text-white/45">
                <span>
                  trigger {t.triggerFound ? '✓' : '✗'} · targets {t.targetsFound}
                </span>
                <span className="tabular-nums text-amber-300">{t.progress.toFixed(2)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {diagnostics.lastError ? (
        <div className="mt-2 border-t border-red-500/40 pt-2 text-red-400">{diagnostics.lastError}</div>
      ) : null}
    </aside>
  )
}
