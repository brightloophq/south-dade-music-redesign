'use client'

import { Atmosphere } from './Atmosphere'
import { Grade } from './Grade'
import { Grain } from './Grain'
import { FilmDirector } from '../FilmDirector'
import { MotionDebugPanel } from '../MotionDebugPanel'
import { SpotlightCursor } from '../Spotlight'

/**
 * The atmosphere layer.
 *
 * Four systems that together make the page feel like a room rather than a
 * document. Mounted once, at the top of the homepage, in this order:
 *
 *   1. **FilmDirector** — the shot list. Owns every timeline and the Light
 *      character, which writes `--light-*` and the grade properties. No DOM.
 *   2. **Atmosphere** — ~78 dust motes on a single canvas, each lit by the lamp.
 *   3. **Grade** — the act's colour temperature as a soft-light wash, plus the
 *      vignette. The page is graded, not decorated.
 *   4. **Grain** — stepped film grain over everything.
 *   5. **SpotlightCursor** — a follow-spot, House sections only, fine pointers
 *      only, additive to the native cursor.
 *
 * Plus `MotionDebugPanel`, which renders only when NEXT_PUBLIC_MOTION_DEBUG=true
 * outside production. It is how this layer is verified at runtime rather than
 * assumed to work because the build passed.
 *
 * Everything here is `aria-hidden`, `pointer-events-none`, and absent entirely
 * under reduced motion or below the capability threshold. Nothing on the page
 * depends on any of it to be readable.
 */
export function AtmosphereLayer() {
  return (
    <>
      <FilmDirector />
      <Atmosphere />
      <Grade />
      <Grain />
      <SpotlightCursor />
      <MotionDebugPanel />
    </>
  )
}
