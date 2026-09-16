import type { Metadata } from 'next'

import {
  HomeFaq,
  HomeHero,
  HouseLights,
  Introduction,
  LearningJourney,
  PerformanceStory,
  Philosophy,
  ProgramsShowcase,
  Voices,
} from '@/components/home'
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
 * The homepage.
 *
 * ## One argument, in order
 *
 *   ● pitch   HomeHero          the stage, lit — who, where, the promise, the trial
 *   ○ house   Introduction      what South Dade is, in its own room  (#desk-begins)
 *   ○ house   ProgramsShowcase  the flagship, then five ways in, each with a photograph
 *   ● stage   LearningJourney   the twelve weeks as a sticky split with a week counter
 *   ○ house   PerformanceStory  the evidence, as a picture spread
 *   ● memory  Voices            families, one review at a time
 *   ○ house   Philosophy        the approach, the vision, the scholarship notice
 *   ○ house   HomeFaq           the four published answers
 *   ● pitch   HouseLights       the guarantee and the trial, as the lights come up
 *
 * ## What survived from "The Film"
 *
 * The temperature arc (dark → ivory → dark → ivory → dark), the letterbox and
 * grain over the opening, the single warm source house-right, the spot green rationed to
 * the trial buttons and the week counter, and the backstage clip — now the
 * weather behind the twelve weeks.
 *
 * What did not survive is the length of the dark before any evidence: four
 * near-empty pinned viewports and a blank flash screen. See
 * `docs/implementation/client-review-refinement-report.md`.
 *
 * `Letterbox` and `FilmGrain` retract on `#desk-begins`, carried by
 * `Introduction`. `FilmDirector` owns every timeline; nothing here depends on
 * it to be readable.
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

      <HomeHero />
      <Introduction />
      <ProgramsShowcase />
      <LearningJourney />
      <PerformanceStory />
      <Voices />
      <Philosophy />
      <HomeFaq />
      <HouseLights />

      <MotionDebugPanel />
    </>
  )
}
