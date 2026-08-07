import type { Metadata } from 'next'

import { InstrumentLessonPage } from '@/components/page/InstrumentLesson'
import { instrumentPages } from '@/content/lessons'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * ukulele-lessons — Tier 2.
 *
 * Source: https://southdademusic.com/ukulele-lessons/
 *
 * The route keeps its original URL, so no redirect is required and the page
 * retains whatever standing the existing URL already has.
 *
 * Every string is read from the typed `Instrument` record in
 * `src/content/lessons.ts`, which was generated from the extraction. There is
 * no page copy in this file by design.
 */

const instrument = instrumentPages.find((i) => i.id === "ukulele")!

export const metadata: Metadata = buildMetadata({
  title: "Ukulele lessons",
  description: "Ukulele lessons are perfect for beginners who want a fun and simple way to start music. The instrument is easy to hold and quick to learn, making it great for younger students. Most children can begin around age 5 or 6, depending on readiness.",
  path: "/ukulele-lessons",
})

export default function UkuleleLessonsPage() {
  return <InstrumentLessonPage instrument={instrument} />
}
