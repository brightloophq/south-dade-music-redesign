import type { Metadata } from 'next'

import { InstrumentLessonPage } from '@/components/page/InstrumentLesson'
import { instrumentPages } from '@/content/lessons'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * violin-lessons — Tier 2.
 *
 * Source: https://southdademusic.com/violin-lessons/
 *
 * The route keeps its original URL, so no redirect is required and the page
 * retains whatever standing the existing URL already has.
 *
 * Every string is read from the typed `Instrument` record in
 * `src/content/lessons.ts`, which was generated from the extraction. There is
 * no page copy in this file by design.
 */

const instrument = instrumentPages.find((i) => i.id === "violin")!

export const metadata: Metadata = buildMetadata({
  title: "Violin lessons",
  description: "Students looking for experienced Violin Teachers Near Me trust our supportive teaching style. We focus on posture, bow control, tone, and rhythm. Most children can begin around age 5 or 6, depending on readiness and focus.",
  path: "/violin-lessons",
})

export default function ViolinLessonsPage() {
  return <InstrumentLessonPage instrument={instrument} />
}
