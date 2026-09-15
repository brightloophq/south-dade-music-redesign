'use client'

import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useMotionCapability } from '@/hooks/useReducedMotion'
import { reportDiagnostics, resetDiagnostics } from '@/lib/motion/diagnostics'

/**
 * THE DIRECTOR.
 *
 * One place where the film is directed. Not eleven components each animating
 * themselves — a shot list, executed in order, torn down as a unit.
 *
 * Everything the homepage does on scroll is created here, one personality per
 * section (see `lib/motion/film/timelines.ts`):
 *
 *   HeroTimeline          cinematic — push-in settle under the preloader, drift
 *   HeadingsTimeline      every section statement rises from a line mask
 *   FramesTimeline        every image, with the reveal its section chose
 *   IntroTimeline         editorial — the detail frame counter-drifts
 *   JourneyTimeline       progressive — the insets follow, the week counter steps
 *   PerformancesTimeline  energetic, restrained — lines from alternating sides
 *   PhilosophyTimeline    a held breath on the protected sentence
 *   FinaleTimeline        warm — the house lights come up behind the trial
 *
 * There are no pins. The two pinned sequences this director used to run were
 * retired in the client-review refinement.
 *
 * ## Why one director and not per-component effects
 *
 * A film has one edit. When each section owned its own ScrollTrigger, the page
 * had eleven independent clocks, no shared labels, no way for one act to hand
 * off to the next, and eleven separate teardowns to get wrong. Centralising it
 * means the light can be a character that persists across acts — which is the
 * whole point of Phase 6.
 *
 * ## Cleanup
 *
 * Everything is created inside a single `gsap.context()` scoped to the document.
 * `revert()` kills every tween, every ScrollTrigger, restores every inline style
 * GSAP wrote, and — critically — reverts every `SplitText`, which otherwise
 * leaves the DOM permanently rewritten. Pins are killed explicitly and
 * `ScrollTrigger.refresh()` runs after teardown so any surviving trigger
 * recalculates against the restored layout.
 *
 * ## ⚠️ Cleanup runs in the layout phase, not the passive phase
 *
 * This effect is a **layout** effect. That is not about avoiding a paint flash —
 * the work inside is asynchronous anyway — it is about *teardown ordering*.
 *
 * React defers passive (`useEffect`) cleanups until after the mutation phase has
 * already removed host nodes. When this director ran pinned sections, a passive
 * cleanup let React remove them before `revert()` had unwrapped their
 * `pin-spacer`s, throwing `NotFoundError` on navigation. There are no pins now,
 * but `SplitText` rewrites heading DOM the same way, and a layout-phase cleanup
 * reverts it before React reaches those nodes. Keep it a layout effect.
 *
 * ## Teardown is scoped to this film, never global
 *
 * `ScrollTrigger.getAll()` is a **global** registry. Killing everything in it
 * would tear down triggers belonging to any other component that happens to be
 * mounted. The set that existed before this film was built is captured up front,
 * and only triggers created after that point are killed here.
 *
 * ## Scroll ownership
 *
 * Lenis is created once in `MotionProvider`, driven by `gsap.ticker`, and calls
 * `ScrollTrigger.update` on every scroll event. **There is exactly one scroll
 * loop and one render clock.** Nothing here adds another listener.
 */
export function FilmDirector() {
  const capability = useMotionCapability()

  useIsomorphicLayoutEffect(() => {
    if (!capability.reveals) return

    let cancelled = false
    let dispose: (() => void) | undefined

    const direct = async (): Promise<void> => {
      const [{ gsap, ScrollTrigger, registerGsap }, { registerEases }, { SplitText }, { Flip }, film, { createLight }] =
        await Promise.all([
          import('@/lib/motion/gsap'),
          import('@/lib/motion/easing'),
          import('gsap/SplitText'),
          import('gsap/Flip'),
          import('@/lib/motion/film/timelines'),
          import('@/lib/motion/film/light'),
        ])

      if (cancelled) return

      /*
       * ⚠️ ROOT CAUSE FIX #2 — the registration race.
       *
       * This used to rely on MotionProvider's separate dynamic import having
       * already called registerGsap(). Both effects fire in the same tick and
       * both await imports, so the order was never guaranteed.
       *
       * When ScrollTrigger is not registered, `gsap.timeline({ scrollTrigger })`
       * does NOT throw — GSAP silently ignores the unknown config key. Every
       * trigger on the page would simply never be created, with no error to
       * find. registerGsap() is idempotent, so calling it here is free and
       * removes the race entirely.
       */
      registerGsap()
      gsap.registerPlugin(SplitText, Flip)
      await registerEases()

      reportDiagnostics({
        gsapLoaded: true,
        /*
         * The authoritative check. `ScrollTrigger.isTouch` is only defined once
         * the plugin has run its own init, which happens on registration — so
         * this is true registration state, not merely "the module imported".
         */
        scrollTriggerRegistered: typeof ScrollTrigger.isTouch === 'number',
      })
      if (cancelled) return

      // Fonts change line boxes, and SplitText measures line boxes. Splitting
      // before they land produces wrong lines that never correct themselves.
      if (document.fonts?.ready) {
        try {
          await document.fonts.ready
        } catch {
          // Font loading API unavailable or rejected — proceed with fallbacks.
        }
      }
      if (cancelled) return

      /*
       * Every trigger that already exists is somebody else's. Captured before a
       * single film trigger is created, so teardown can be exact rather than
       * global — see the note on scoping above.
       */
      const preExistingTriggers = new Set(ScrollTrigger.getAll())

      const context = gsap.context(() => {})
      const light = createLight(gsap, context)
      const splits: InstanceType<typeof SplitText>[] = []
      const baseContext = { gsap, ScrollTrigger, SplitText, Flip, light, splits }

      /*
       * matchMedia is the format.
       *
       * Both conditions require `prefers-reduced-motion: no-preference`, so
       * nothing below ever registers for a visitor who asked for less motion.
       * `cinema` (≥1024px) adds the scrubbed drift and the week counter;
       * below it the same reveals run without scroll-linked movement, because
       * scrubbed parallax on a phone costs frames and buys nothing.
       *
       * Timelines are created directly in the matchMedia callback — not in an
       * outer context — so crossing 1024px reverts every tween, trigger and
       * line split and registers the other format cleanly.
       */
      const mm = gsap.matchMedia()

      mm.add(
        {
          cinema: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
          handheld: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
        },
        (mmContext) => {
          const { cinema } = mmContext.conditions as { cinema: boolean; handheld: boolean }
          const filmContext = { ...baseContext, cinema }

          film.HeroTimeline(filmContext)
          film.HeadingsTimeline(filmContext)
          film.FramesTimeline(filmContext)
          film.IntroTimeline(filmContext)
          film.JourneyTimeline(filmContext)
          film.PerformancesTimeline(filmContext)
          film.PhilosophyTimeline(filmContext)
          film.FinaleTimeline(filmContext)

          /*
           * Layout settles after images decode; triggers measured before that
           * are measured against the wrong page. Refresh once now, and again
           * after the window load event so late-decoding plates are accounted
           * for.
           */
          ScrollTrigger.refresh()
          if (document.readyState !== 'complete') {
            window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
          }

          reportDiagnostics({ scrollTriggerCount: ScrollTrigger.getAll().length })
        },
      )

      dispose = () => {
        // Order matters. Splits first — reverting them changes the DOM, and any
        // trigger still measuring against the split layout would be wrong.
        for (const split of splits) split.revert()
        mm.revert()
        context.revert()
        /*
         * Belt-and-braces for anything the context and the matchMedia scope did
         * not already reclaim — but only for triggers this film created.
         * Killing the whole registry would take other components' triggers with
         * it, which is exactly the global teardown this component must not do.
         */
        for (const trigger of ScrollTrigger.getAll()) {
          if (!preExistingTriggers.has(trigger)) trigger.kill()
        }
        document.documentElement.style.setProperty('--light-flare', '0')
        ScrollTrigger.refresh()
        resetDiagnostics()
      }
    }

    void direct()

    return () => {
      cancelled = true
      dispose?.()
    }
  }, [capability.reveals])

  return null
}
