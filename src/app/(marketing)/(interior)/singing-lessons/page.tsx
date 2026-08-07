import type { Metadata } from 'next'

import { InstrumentLessonPage } from '@/components/page/InstrumentLesson'
import { instrumentPages } from '@/content/lessons'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * singing-lessons — Tier 2.
 *
 * Source: https://southdademusic.com/singing-lessons/
 *
 * The route keeps its original URL, so no redirect is required and the page
 * retains whatever standing the existing URL already has.
 *
 * Every string is read from the typed `Instrument` record in
 * `src/content/lessons.ts`, which was generated from the extraction. There is
 * no page copy in this file by design.
 */

const instrument = instrumentPages.find((i) => i.id === "voice")!

export const metadata: Metadata = buildMetadata({
  title: "Voice lessons",
  description: "The singing lessons for kids that South Dade Music provides for children are designed to be enjoyable, well-structured, and supportive, making them ideal for young students. Most children can begin around age 5 or 6, depending on focus and readiness.",
  path: "/singing-lessons",
})

export default function VoiceLessonsPage() {
  return <InstrumentLessonPage instrument={instrument} />
}
