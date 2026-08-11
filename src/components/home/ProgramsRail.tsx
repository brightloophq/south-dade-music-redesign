'use client'

import { useState } from 'react'

import { Photo } from '@/components/media/Photo'
import type { PhotoId } from '@/lib/media/catalog'
import { cn } from '@/lib/utils/cn'

/**
 * The Programs rail, which now answers the list beside it.
 *
 * The playbill was six numbered lines next to one fixed photograph. Reading it
 * was a one-way exchange — the rail said "instruments" and went on saying it
 * whichever programme you were considering.
 *
 * Now the rail carries a frame for each programme and crossfades as the pointer
 * or the keyboard moves down the index. Nothing else changes: no cards, no
 * borders, no lift, no shadow. The list keeps its numbers, its hairlines and its
 * flagship at 2×; the only thing that moves is the picture, which is the one
 * element whose job is to show rather than tell.
 *
 * ## Why every frame is stacked rather than swapped
 *
 * All six are rendered and crossfaded by `opacity`. Swapping a `src` would
 * decode on interaction and flash white on a slow connection; stacking costs
 * nothing extra after first paint — they are the same photographs already
 * published elsewhere on the site — and the crossfade is a compositor-only
 * operation.
 *
 * ## Keyboard and touch
 *
 * `onFocus` mirrors `onPointerEnter`, so tabbing through the index drives the
 * rail exactly as hovering does. There is no hover on touch, so the rail simply
 * rests on the flagship — which is the correct default, not a degraded one.
 * Nothing here is required to understand the list.
 */
export interface ProgramsRailProps {
  /** Programme id → the photograph that belongs to it. */
  frames: readonly { id: string; photo: PhotoId; alt: string }[]
  /** The id currently under pointer or focus, driven by the list. */
  activeId: string | null
}

export function ProgramsRail({ frames, activeId }: ProgramsRailProps) {
  const active = activeId ?? frames[0]?.id

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-(--radius-media-sm) bg-(--color-ground-pitch) sm:aspect-[3/2] sm:rounded-(--radius-media) lg:sticky lg:top-24 lg:aspect-[3/4]">
      {frames.map((frame) => (
        <div
          key={frame.id}
          aria-hidden={frame.id !== active}
          className={cn(
            'absolute inset-0 transition-opacity duration-(--duration-slow) ease-(--ease-stage) motion-reduce:transition-none',
            frame.id === active ? 'opacity-100' : 'opacity-0',
          )}
        >
          <Photo
            id={frame.photo}
            alt={frame.alt}
            position="center 60%"
            sizes="(min-width: 1024px) 240px, 100vw"
            reveal="none"
          />
        </div>
      ))}
    </div>
  )
}

/** Tracks which programme the pointer or keyboard is on. */
export function useActiveProgram(initial: string | null = null) {
  const [activeId, setActiveId] = useState<string | null>(initial)
  return {
    activeId,
    setActiveId,
    itemProps: (id: string) => ({
      onPointerEnter: () => setActiveId(id),
      onFocus: () => setActiveId(id),
    }),
  }
}
