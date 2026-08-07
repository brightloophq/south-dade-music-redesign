import type { Metadata } from 'next'

import { Desk, HouseLights, Opening, Reframe, TheRelease, TheWalk } from '@/components/home'
import { FilmGrain, Letterbox } from '@/components/film'
import { FilmDirector } from '@/components/motion/FilmDirector'
import { MotionDebugPanel } from '@/components/motion/MotionDebugPanel'
import { homeMeta } from '@/content/home'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: homeMeta.title,
  description: homeMeta.description,
  path: '/',
})

/**
 * The homepage — "The Film".
 *
 * Canonical specification: `docs/approved-design/The Film.html` (visual source
 * of truth), `Visual Specification.md` (rules), `HANDOFF.md` (mapping).
 *
 * ## It is not a stack of sections
 *
 *   > "There are no sections. There is a building, and you walk through it."
 *
 * The page is one continuous space with a temperature that changes as you move
 * through it. Six movements are the film, in the dark, letterboxed and grained;
 * seven are the desk, in the light, where the transaction happens. The join
 * between them is the only cut in the whole page.
 *
 *   ● pitch   Opening      the seam under the door. Four words.
 *   ● memory  Reframe      the hinge, in the warmest dark
 *   ● wing    The Turn     one thought, held
 *   ● wing    The Walk     PINNED №1 — scroll becomes footsteps
 *   ● flash   The Release  PINNED №2 — 1.5s still · 400ms flash · 1.8s rise
 *   ○ house   The Desk     programme, weeks, lessons, evidence, voices, terms
 *
 * ## Why the film comes first and is long
 *
 * The dark is what the light is paid for. Four movements of it buy 400
 * milliseconds of warm white, and shortening the dark to "get to the content
 * faster" is the one change that would destroy the page. The desk is
 * deliberately ordinary by comparison: it has to be trustworthy, not moving.
 *
 * ## Global film devices
 *
 * `Letterbox` and `FilmGrain` are page-level and own their own presence via a
 * shared sentinel on the first desk movement — so they cannot disagree about
 * where the film ends, and they behave correctly with no JavaScript motion.
 *
 * `FilmDirector` owns every timeline and the Light character. It is mounted
 * directly rather than through the old `AtmosphereLayer`, which also carried
 * a dust-mote canvas, a global colour wash and a follow-spot cursor. None of
 * those survive this direction: the cursor is on the prohibited list outright,
 * and a global tint wash would contaminate the per-movement grounds that are
 * now the whole colour idea.
 *
 * ⚠️ Structured data remains disabled pending gates B-4, B-5, I-8 and the
 * contact reconciliation.
 */
export default function HomePage() {
  return (
    <>
      <FilmDirector />
      <Letterbox />
      <FilmGrain />

      <Opening />
      <Reframe />
      <TheWalk />
      <TheRelease />
      <HouseLights />
      <Desk />

      <MotionDebugPanel />
    </>
  )
}
