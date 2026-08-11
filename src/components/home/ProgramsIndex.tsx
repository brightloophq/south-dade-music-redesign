'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

import { programs, programsSection } from '@/content/home'

import { ProgramsRail, useActiveProgram } from './ProgramsRail'

/**
 * The playbill, and the rail that now answers it.
 *
 * This is a client component for one reason: the rail tracks which programme
 * the pointer or the keyboard is on. Everything else about the index is
 * unchanged from the server version it replaces — the numbers, the hairlines,
 * the flagship set at `display-md` against `heading-md`, the one verified line
 * each programme publishes about itself, and the note underneath.
 *
 * No cards, no hover lift, no borders, no shadow. Hovering a programme moves
 * the picture and nothing else; the type does not jump, because a playbill that
 * reflows under the pointer is a worse playbill.
 *
 * The list is entirely usable with the rail ignored, which is what happens on
 * touch and under reduced motion.
 */
export function ProgramsIndex() {
  const { activeId, setActiveId, itemProps } = useActiveProgram(PROGRAM_FRAMES[0].id)
  const listRef = useRef<HTMLOListElement | null>(null)

  /*
    ON TOUCH THERE IS NO HOVER, so the stage follows the scroll instead.

    Each programme row reports itself as it crosses the middle band of the
    viewport and becomes the active frame. This runs only where the pointer
    cannot hover — on a mouse the observer would fight the pointer for control
    of the same state.

    Tapping is deliberately NOT the trigger: every row contains a link, and a
    tap that changed a picture instead of following the link would be a trap.
  */
  useEffect(() => {
    if (typeof window === 'undefined') return
    /* A pointer that can hover already drives this; the observer would fight it. */
    if (window.matchMedia('(hover: hover)').matches) return
    const list = listRef.current
    if (!list) return

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        const id = hit?.target.getAttribute('data-program-id')
        if (id) setActiveId(id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.5, 1] },
    )
    list.querySelectorAll('[data-program-id]').forEach((li: Element) => observer.observe(li))
    return () => observer.disconnect()
  }, [setActiveId])

  return (
    <div className="grid gap-8 lg:grid-cols-[140px_minmax(0,10fr)_minmax(0,9fr)] lg:gap-10">
      <div className="lg:pt-2">
        <p data-desk-label className="font-display text-label uppercase text-(--color-text-muted)">
          {programsSection.heading}
        </p>
      </div>

      <div>
        <ol ref={listRef} className="w-full">
          {programs.map((program, index) => {
            const flagship = index === 0
            return (
              <li
                key={program.id}
                data-program-id={program.id}
                {...itemProps(program.id)}
                className="border-b border-(--color-border-default) py-6 last:border-b-0"
              >
                <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1">
                  <span
                    aria-hidden="true"
                    className="w-11 shrink-0 font-display text-label uppercase tabular-nums text-(--color-text-muted)"
                  >
                    No.&nbsp;{index + 1}
                  </span>
                  {program.route ? (
                    <Link
                      href={program.route}
                      className={
                        flagship
                          ? 'font-body text-display-md italic text-(--color-text-primary) underline-offset-[6px] hover:underline'
                          : 'font-body text-heading-md italic text-(--color-text-primary) underline-offset-[6px] hover:underline'
                      }
                    >
                      {program.name}
                    </Link>
                  ) : (
                    <span
                      className={
                        flagship
                          ? 'font-body text-display-md italic text-(--color-text-primary)'
                          : 'font-body text-heading-md italic text-(--color-text-primary)'
                      }
                    >
                      {program.name}
                    </span>
                  )}
                  {program.pendingNote ? (
                    <span className="font-display text-label uppercase text-(--color-text-muted)">
                      {program.pendingNote}
                    </span>
                  ) : null}
                </div>
                {/* The one verified line this programme publishes about itself. */}
                <p className="mt-2 max-w-[58ch] font-body text-body-sm text-(--color-text-secondary) lg:ml-[84px]">
                  {program.summary}
                </p>
              </li>
            )
          })}
        </ol>
        <p className="mt-8 max-w-[62ch] font-body text-body-md italic text-(--color-text-muted)">
          {programsSection.lead}
        </p>
      </div>

      <ProgramsRail frames={PROGRAM_FRAMES} activeId={activeId} />
    </div>
  )
}

/**
 * One frame per programme, chosen so the rail answers the line beside it rather
 * than decorating it. Every photograph is already published elsewhere on the
 * site, so stacking them costs nothing new after first paint.
 */
const PROGRAM_FRAMES = [
  {
    id: 'ninety-day',
    photo: 'medals-on-stage' as const,
    alt: 'South Dade Music students standing together on stage wearing medals at the end of a showcase.',
  },
  {
    id: 'private-lessons',
    photo: 'ukulele-wall' as const,
    alt: 'Ukuleles hanging on a wall rack in the South Dade Music teaching room.',
  },
  {
    id: 'group-music-lessons',
    photo: 'lesson-room' as const,
    alt: 'A South Dade Music lesson in progress, students at digital keyboards.',
  },
  {
    id: 'band-builders',
    photo: 'ensemble-guitars' as const,
    alt: 'Two South Dade Music students playing bass and electric guitar side by side on stage.',
  },
  {
    id: 'early-childhood',
    photo: 'camp-circle' as const,
    alt: 'Young children seated in a circle with percussion blocks while an instructor leads them.',
  },
  {
    id: 'summer-camp',
    photo: 'camp-circle' as const,
    alt: 'Young children seated in a circle with percussion blocks while an instructor leads them.',
  },
]
