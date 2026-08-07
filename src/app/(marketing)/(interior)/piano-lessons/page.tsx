import type { Metadata } from 'next'

import { InstrumentLessonPage } from '@/components/page/InstrumentLesson'
import { instrumentPages } from '@/content/lessons'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * piano-lessons — Tier 2.
 *
 * Source: https://southdademusic.com/piano-lessons/
 *
 * The route keeps its original URL, so no redirect is required and the page
 * retains whatever standing the existing URL already has.
 *
 * Every string is read from the typed `Instrument` record in
 * `src/content/lessons.ts`, which was generated from the extraction. There is
 * no page copy in this file by design.
 */

const instrument = instrumentPages.find((i) => i.id === "piano")!

export const metadata: Metadata = buildMetadata({
  title: "Piano lessons",
  description: "Our piano program builds strong basics. Students learn hand position, rhythm, music reading, and song practice. Most children can begin around age 5 or 6, depending on attention span and readiness.",
  path: "/piano-lessons",
})

export default function PianoLessonsPage() {
  return <InstrumentLessonPage instrument={instrument} />
}
