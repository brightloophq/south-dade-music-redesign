import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, DeskSection, PageIntro, PointList } from '@/components/page'
import { groupLessons } from '@/content/lessons'
import { trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Group music lessons',
  description:
    'Small-group instruction building fundamentals, ensemble skills and confidence, with a band-program pathway. Ages 6 and up.',
  path: '/group-music-lessons',
})

/**
 * /group-music-lessons — Tier 2.
 *
 * Source: https://southdademusic.com/group-music-lessons/
 * Original URL retained, so no redirect is required.
 *
 * ## An orphan page in the source
 *
 * This page is live but absent from the navigation and from `/programs/` —
 * a whole lesson format sold across the site with no way to reach its page.
 * Tier 2 puts it in the navigation and links it from both hubs.
 *
 * ## Two things the source page had that do not ship
 *
 * **Live editorial notes.** The production page carries visible instructions to
 * its own author — "Internal link suggestion: Private Music Lessons",
 * "Internal Links to Add: …" — rendered to visitors. Those are not content.
 * The links they ask for are simply made.
 *
 * **Three unlinked text CTAs** at the foot of the page. Every route out of this
 * page is now a real control.
 *
 * ## Deliberately absent
 *
 * No group size number — the source says only that groups are "kept small" and
 * gives no figure anywhere. No tuition, no session length. Gate B-8.
 */
export default function GroupMusicLessonsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Lesson format"
        heading="Group music lessons."
        lead={groupLessons.summary}
      >
        <div className="mt-10">
          <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
            Book a Trial
          </Button>
        </div>
      </PageIntro>

      <Movement name="at-a-glance" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-2">
              <DeskLabel>At a glance</DeskLabel>
            </div>
            <dl className="max-w-[840px]">
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5 first:border-t-0 first:pt-0">
                <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Who it is for
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {groupLessons.targetAge}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Group size
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {groupLessons.groupSize}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Frequency
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {groupLessons.frequency}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Availability
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {groupLessons.availability}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Experience
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {groupLessons.skillLevel}
                </dd>
              </div>
            </dl>
          </div>
        </FilmMargin>
      </Movement>

      <DeskSection label="What students learn" id="curriculum">
        <PointList items={groupLessons.curriculum} />
      </DeskSection>

      <DeskSection label="Instruments" id="instruments">
        <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
          {groupLessons.instrumentsOffered}
        </p>
        <p className="mt-6">
          <Link
            href="/lessons"
            className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
          >
            All instruments
          </Link>
        </p>
      </DeskSection>

      {/* The links the source page asked its own author to add. */}
      <Movement name="group-related" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>Also consider</DeskLabel>
            <div className="max-w-[840px]">
              <ul>
                <li className="border-t border-(--color-border-default) py-5 first:border-t-0 first:pt-0">
                  <Link
                    href="/private-lessons"
                    className="font-body text-heading-lg italic text-(--color-text-primary) underline-offset-[6px] hover:underline"
                  >
                    Private Lessons
                  </Link>
                  <p className="mt-2 max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
                    One-on-one, at your own pace.
                  </p>
                </li>
                {/*
                  EE1 — the missing middle.

                  Group lessons and Band Builders are the two group products and
                  neither page referenced the other, here or in the source. This
                  is the closest neighbour on the whole site.
                */}
                <li className="border-t border-(--color-border-default) py-5">
                  <Link
                    href="/programs/band-builders"
                    className="font-body text-heading-lg italic text-(--color-text-primary) underline-offset-[6px] hover:underline"
                  >
                    Band Builders
                  </Link>
                  <p className="mt-2 max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
                    The same idea taken further — a group that plays as a band.
                  </p>
                </li>
                <li className="border-t border-(--color-border-default) py-5">
                  <Link
                    href="/programs/90-day-stage-program"
                    className="font-body text-heading-lg italic text-(--color-text-primary) underline-offset-[6px] hover:underline"
                  >
                    90-Day Stage Program
                  </Link>
                  <p className="mt-2 max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
                    Where the group work is heading — a live showcase.
                  </p>
                </li>
              </ul>
              <div className="mt-10">
                <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
                  Book a Trial
                </Button>
              </div>
              <p className="mt-6 max-w-[62ch] font-body text-body-md text-(--color-text-muted)">
                {trialOffer.terms}
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
