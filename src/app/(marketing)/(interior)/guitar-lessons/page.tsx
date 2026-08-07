import type { Metadata } from 'next'

import { InstrumentLessonPage } from '@/components/page/InstrumentLesson'
import { instrumentPages } from '@/content/lessons'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * guitar-lessons — Tier 2.
 *
 * Source: https://southdademusic.com/guitar-lessons/
 *
 * The route keeps its original URL, so no redirect is required and the page
 * retains whatever standing the existing URL already has.
 *
 * Every string is read from the typed `Instrument` record in
 * `src/content/lessons.ts`, which was generated from the extraction. There is
 * no page copy in this file by design.
 */

const instrument = instrumentPages.find((i) => i.id === "guitar")!

export const metadata: Metadata = buildMetadata({
  title: "Guitar lessons",
  description: "If you are looking for a skilled Guitar Teacher Near Me, our guitar lessons cover chords, strumming patterns, and song playing. We teach both acoustic and electric guitar. Most children can begin around age 6 or 7, depending on hand size and focus.",
  path: "/guitar-lessons",
})

export default function GuitarLessonsPage() {
  return <InstrumentLessonPage instrument={instrument} />
}
