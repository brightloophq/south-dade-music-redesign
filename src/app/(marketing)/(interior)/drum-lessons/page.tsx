import type { Metadata } from 'next'

import { InstrumentLessonPage } from '@/components/page/InstrumentLesson'
import { instrumentPages } from '@/content/lessons'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * drum-lessons — Tier 2.
 *
 * Source: https://southdademusic.com/drum-lessons/
 *
 * The route keeps its original URL, so no redirect is required and the page
 * retains whatever standing the existing URL already has.
 *
 * Every string is read from the typed `Instrument` record in
 * `src/content/lessons.ts`, which was generated from the extraction. There is
 * no page copy in this file by design.
 */

const instrument = instrumentPages.find((i) => i.id === "drums")!

export const metadata: Metadata = buildMetadata({
  title: "Drums lessons",
  description: "Our Private Drum Lessons help students understand rhythm, timing, and coordination. With one on one attention, students learn faster and gain confidence. Most children can begin around age 5 or 6, depending on coordination and focus level.",
  path: "/drum-lessons",
})

export default function DrumsLessonsPage() {
  return <InstrumentLessonPage instrument={instrument} />
}
