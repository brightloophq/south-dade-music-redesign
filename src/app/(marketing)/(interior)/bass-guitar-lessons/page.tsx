import type { Metadata } from 'next'

import { InstrumentLessonPage } from '@/components/page/InstrumentLesson'
import { instrumentPages } from '@/content/lessons'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * bass-guitar-lessons — Tier 2.
 *
 * Source: https://southdademusic.com/bass-guitar-lessons/
 *
 * The route keeps its original URL, so no redirect is required and the page
 * retains whatever standing the existing URL already has.
 *
 * Every string is read from the typed `Instrument` record in
 * `src/content/lessons.ts`, which was generated from the extraction. There is
 * no page copy in this file by design.
 */

const instrument = instrumentPages.find((i) => i.id === "bass")!

export const metadata: Metadata = buildMetadata({
  title: "Bass Guitar lessons",
  description: "Bass guitar lessons are great for students who want to learn rhythm and groove. The bass plays an important role in music by supporting the beat and connecting different instruments together. Most children can begin around age 7 or 8, depending on hand size and readiness.",
  path: "/bass-guitar-lessons",
})

export default function BassLessonsPage() {
  return <InstrumentLessonPage instrument={instrument} />
}
