import type { Metadata } from 'next'

import {
  FinalCta,
  Hero,
  MusicLessons,
  NinetyDayJourney,
  PerformanceGallery,
  Programs,
  Reframe,
  Scholarship,
  Testimonials,
  TheTurn,
  TwelveWeeks,
} from '@/components/home'
import { AtmosphereLayer } from '@/components/motion/Atmosphere'
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
 * Canonical specification: `docs/homepage/`.
 * Refinement rationale: `docs/implementation/phase-5d-polish-report.md`.
 *
 * ## The emotional shape
 *
 * The page is a held breath and an exhale, not a list of sections. Two
 * full-viewport silences — the Reframe and the Turn — carry the whole arc, and
 * everything between them is either proof or logistics.
 *
 *   🎭 Hero          promise, substantiated in the same screen
 *   🎭 Reframe       ▁ SILENCE ▁ the persuasive hinge. 23 words, no CTA
 *   🎭 Journey       the weeks accumulate. one enormous numeral
 *   📋 Twelve Weeks  drama hands off to substance
 *   📋 Programs      the running order
 *   📋 Lessons       the cast list
 *   🎭 Performances  the proof layer — the page's longest quiet
 *   📋 Testimonials  three voices at unequal scale
 *   📋 Scholarships  plain, procedural, civic
 *   🎭 The Turn      ▁ SILENCE ▁ the one shout. what they are really buying
 *   📋 Final CTA     houselights. the page ends in the light, at a decision
 *
 * Note the rhythm: House and Desk alternate five times, and the two darkest
 * moments sit at the quarter and three-quarter marks — so the page never
 * settles into a predictable cadence.
 *
 * ⚠️ Structured data is deliberately absent. `seoConfig.structuredData.enabled`
 * is false pending gates B-4, B-5, I-8 and the contact reconciliation.
 */
export default function HomePage() {
  return (
    <>
      <AtmosphereLayer />
      <Hero />
      <Reframe />
      <NinetyDayJourney />
      <TwelveWeeks />
      <Programs />
      <MusicLessons />
      <PerformanceGallery />
      <Testimonials />
      <Scholarship />
      <TheTurn />
      <FinalCta />
    </>
  )
}
