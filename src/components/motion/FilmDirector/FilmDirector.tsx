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
 * Everything the page does on scroll is created here:
 *
 *   OpeningTimeline      shot 01 — the seam at rest. The load screen.
 *   WingsTimeline        shot 02 — the door opens a hand's width
 *   MemoryTimeline       shot 03 — the temperature drops to brown-black
 *   WalkTimeline         shots 04–06 — PINNED №1. Scroll becomes footsteps
 *   ReleaseTimeline      shot 07  — PINNED №2. 1.5s still / 400ms / 1.8s
 *   HouselightsTimeline  shot 07B — the dimmer rise out of the dark
 *   WeeksTimeline        the twelve-week series — the desk's one exception
 *
 * There is no batch reveal. Every appearance in this film is by light, and
 * `EmergeBatch` was removed with the rest of the fade-up vocabulary.
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
 * already removed host nodes. Two of this film's sections are pinned, and
 * ScrollTrigger implements a pin by wrapping the pinned element in a
 * `pin-spacer` div. With a passive cleanup, React removed those sections from
 * `<main>` *before* `context.revert()` had unwrapped them — and threw
 * `NotFoundError: Failed to execute 'removeChild' on 'Node'` on every first
 * navigation off the homepage.
 *
 * A layout-effect cleanup runs synchronously during the mutation phase, and this
 * component is rendered before the pinned sections, so the spacers are unwrapped
 * before React reaches them. The wrappers in `page.tsx` are the primary,
 * ordering-independent guard; this is the second line and the correct place for
 * GSAP teardown regardless.
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
      const filmContext = { gsap, ScrollTrigger, SplitText, Flip, light, splits }

      /*
       * matchMedia is the film's format.
       *
       * The pinned Journey is a widescreen shot: it needs a landscape viewport
       * and a machine that can scrub. Below `lg` — or under any reduced-motion
       * preference — the same story is told without a pin, because a pinned
       * sequence on a phone is a trap rather than a shot.
       */
      const mm = gsap.matchMedia()

      mm.add(
        {
          cinema: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
          handheld: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
        },
        (mmContext) => {
          const { cinema } = mmContext.conditions as { cinema: boolean; handheld: boolean }

          context.add(() => {
            film.OpeningTimeline(filmContext)
            film.WingsTimeline(filmContext)
            film.MemoryTimeline(filmContext)

            /*
             * Both pins are desktop-only. On handheld the walk is three plain
             * swipe-height frames and the release is a static flash frame —
             * "mobile is a re-cut, not a squeeze" (The Film.html §I). The
             * static markup is what ships by default; the pin is the
             * enhancement, so doing nothing here is the correct mobile cut.
             */
            if (cinema) {
              film.WalkTimeline(filmContext)
              film.ReleaseTimeline(filmContext)
            }

            film.HouselightsTimeline(filmContext)
            film.WeeksTimeline(filmContext)
            film.DeskTimeline(filmContext)
          })

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
