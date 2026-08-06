'use client'

import { useEffect, useRef } from 'react'

import { useMotionCapability } from '@/hooks/useReducedMotion'
import { reportDiagnostics } from '@/lib/motion/diagnostics'

/** Dust motes. Tuned by eye: below ~50 it reads as specks, above ~110 as snow. */
const PARTICLE_COUNT = 78

interface Mote {
  x: number
  y: number
  /** Depth, 0 (far) → 1 (near). Drives size, speed and how hard the light hits. */
  z: number
  vx: number
  vy: number
  /** Per-mote phase so nothing pulses in unison. */
  phase: number
  radius: number
}

/**
 * The dust.
 *
 * A single fixed canvas over the page, carrying ~78 motes of theatrical haze.
 * They drift on their own slow currents, and — this is the part that matters —
 * **each one is lit by the page's light field.** A mote near the lamp is bright
 * and warm; a mote far from it is barely a smudge. As the lamp travels down the
 * document, the dust lights up and dims in waves.
 *
 * Nothing here is "animated" in the sense of a keyframe. It is a system that is
 * always running, and the visitor's scroll changes the weather.
 *
 * ## Why canvas and not DOM
 *
 * 78 absolutely-positioned divs would be 78 composited layers and a repaint per
 * frame. One canvas is one layer. On a mid-range Android this is the difference
 * between 60fps and 30.
 *
 * ## Cost control
 *
 * · Sized to `devicePixelRatio`, capped at 2 — a 3× phone renders 2× and nobody
 *   can tell with a blurred 2px dot.
 * · The rAF loop **stops entirely** when the tab is hidden.
 * · The light field is sampled 6×/second, not 60 — `getComputedStyle` never
 *   runs on the hot path.
 * · Motes below ~1% alpha are skipped before any gradient is constructed, so on
 *   the light Desk sections most of the loop short-circuits.
 * · Never mounts at all under reduced motion or below the capability threshold.
 */
export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const capability = useMotionCapability()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!capability.reveals || !canvas) return

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let frame = 0
    let running = true
    let motes: Mote[] = []

    const resize = (): void => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      reportDiagnostics({ canvasWidth: canvas.width, canvasHeight: canvas.height, canvasDpr: dpr })
    }

    const seed = (): void => {
      motes = Array.from({ length: PARTICLE_COUNT }, () => {
        const z = Math.random()
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          // Near motes drift faster — parallax without a parallax layer.
          vx: (Math.random() - 0.5) * (0.08 + z * 0.16),
          vy: -(0.03 + z * 0.1) - Math.random() * 0.05,
          phase: Math.random() * Math.PI * 2,
          radius: 0.4 + z * 1.7,
        }
      })
    }

    const readLight = (): { x: number; y: number; intensity: number; flare: number } => {
      const style = getComputedStyle(document.documentElement)
      return {
        x: (Number.parseFloat(style.getPropertyValue('--light-x')) || 72) / 100,
        y: (Number.parseFloat(style.getPropertyValue('--light-y')) || 28) / 100,
        intensity: Number.parseFloat(style.getPropertyValue('--light-intensity')) || 0.6,
        /*
         * The flare is owned by the Journey and surges during the First Note.
         * Reading it here is what makes the PAGE-WIDE atmosphere react to a
         * single local moment: when the beam falls, every mote on screen
         * catches it. Nothing tells the dust the moment is happening — it is
         * simply lit by the same field.
         */
        flare: Number.parseFloat(style.getPropertyValue('--light-flare')) || 0,
      }
    }

    let light = readLight()
    let lightTick = 0

    const draw = (time: number): void => {
      frame = 0
      if (!running) return

      // The light field is read 6× a second, not 60. It moves slowly and the
      // motes are blurred; nobody can perceive the difference, and it keeps
      // getComputedStyle off the hot path.
      // Normally 6×/second. During a flare, every frame — the surge is short
      // and stepping it would read as a stutter at the most important moment.
      if (time - lightTick > (light.flare > 0.01 ? 0 : 160)) {
        light = readLight()
        lightTick = time
      }

      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'lighter'

      const lx = light.x * width
      const ly = light.y * height
      // The flare widens the lamp's reach and lifts every mote at once.
      const reach = Math.max(width, height) * (0.85 + light.flare * 0.5)

      for (const mote of motes) {
        mote.x += mote.vx
        mote.y += mote.vy

        // Wrap rather than respawn — a mote leaving the top is the same mote
        // arriving at the bottom, so the field never visibly reseeds.
        if (mote.y < -8) {
          mote.y = height + 8
          mote.x = Math.random() * width
        }
        if (mote.x < -8) mote.x = width + 8
        if (mote.x > width + 8) mote.x = -8

        const dx = mote.x - lx
        const dy = mote.y - ly
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Inverse falloff, squared for a filmic rather than linear rolloff.
        const lit = Math.max(0, 1 - distance / reach) ** 2

        // A slow individual shimmer, so the field breathes instead of sitting.
        const shimmer = 0.72 + Math.sin(time * 0.0004 + mote.phase) * 0.28

        const alpha =
          lit * shimmer * light.intensity * (0.16 + mote.z * 0.5) * (1 + light.flare * 2.6)
        if (alpha < 0.012) continue

        // Warm core, cooler halo — dust in a tungsten beam is not white.
        // Motes physically bloom in the flare, not just brighten.
        const spread = mote.radius * (5 + light.flare * 6)
        const gradient = context.createRadialGradient(mote.x, mote.y, 0, mote.x, mote.y, spread)
        gradient.addColorStop(0, `rgba(255, 214, 138, ${alpha})`)
        gradient.addColorStop(0.4, `rgba(245, 165, 36, ${alpha * 0.45})`)
        gradient.addColorStop(1, 'rgba(245, 165, 36, 0)')

        context.fillStyle = gradient
        context.beginPath()
        context.arc(mote.x, mote.y, spread, 0, Math.PI * 2)
        context.fill()
      }

      context.globalCompositeOperation = 'source-over'
      frame = window.requestAnimationFrame(draw)
    }

    const start = (): void => {
      if (frame || !running) return
      frame = window.requestAnimationFrame(draw)
    }

    const stop = (): void => {
      if (!frame) return
      window.cancelAnimationFrame(frame)
      frame = 0
    }

    const onVisibility = (): void => {
      running = !document.hidden
      if (running) start()
      else stop()
    }

    const onResize = (): void => {
      resize()
      seed()
    }

    resize()
    seed()
    start()
    reportDiagnostics({ canvasActive: true })

    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      stop()
      reportDiagnostics({ canvasActive: false })
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [capability.reveals])

  /*
   * Stacking: the canvas sits ABOVE section backgrounds, not behind them.
   *
   * Sections carry opaque grounds, so a canvas at z-0 would be painted over by
   * every one of them and the dust would never be seen. At z-[1] with
   * `mix-blend-screen` it only ever ADDS light — which is also physically
   * right: dust in a room floats in front of the scenery, not behind it.
   *
   * Screen blend over the light Desk sections resolves to nothing, so the dust
   * is naturally confined to the dark House passages without any per-section
   * logic. Opacity is held at 0.55 so text legibility is never affected.
   */
  // Content is never behind this; it is decorative and inert.
  if (!capability.reveals) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.55] mix-blend-screen"
    />
  )
}
