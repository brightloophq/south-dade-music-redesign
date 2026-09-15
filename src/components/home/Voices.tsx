'use client'

import { useState } from 'react'

import { FilmMargin } from '@/components/film'
import { MediaFrame } from '@/components/media/MediaFrame'
import { Eyebrow, VOICE_LG } from '@/components/ui/Editorial'
import { testimonials, voicesSection } from '@/content/home'
import { cn } from '@/lib/utils/cn'

/**
 * WHAT FAMILIES SAY — quiet.
 *
 * One review at a time, large, beside the room those families sat in. Not a
 * carousel: nothing advances on its own, because text that moves while
 * someone is reading it is an accessibility failure and a luxury failure at
 * the same time. The visitor chooses the next voice with a numbered control.
 *
 * All five reviews are stacked in one grid cell and cross-faded, so the block
 * is always the height of the longest review — choosing another never moves
 * the page. Inactive reviews are `aria-hidden`; the live region announces the
 * one chosen.
 *
 * Every review is ✅ VERBATIM — typos kept, Spanish kept. Records that name a
 * minor are filtered out here as they are everywhere else.
 */
export function Voices() {
  const reviews = voicesSection.order
    .map((id) => testimonials.find((t) => t.id === id))
    .filter((t): t is (typeof testimonials)[number] => Boolean(t) && !t!.namesMinor)
  const [active, setActive] = useState(0)

  return (
    <section
      data-film="voices"
      data-ground="memory"
      data-register="house"
      aria-labelledby="voices-heading"
      className="relative isolate overflow-clip bg-(--color-ground-memory) py-(--section-comfortable) text-n-50"
    >
      <FilmMargin wide>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <figure className="lg:col-span-5">
            <MediaFrame
              photo={voicesSection.photo}
              alt={voicesSection.alt}
              reveal="fade"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] w-full"
              position="center 55%"
            />
          </figure>

          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow as="h2" id="voices-heading">
              {voicesSection.label} · {voicesSection.sourceLabel}
            </Eyebrow>

            <div aria-live="polite" className="mt-9 grid">
              {reviews.map((review, index) => (
                <figure
                  key={review.id}
                  aria-hidden={index !== active}
                  className={cn(
                    '[grid-area:1/1] transition-[opacity,transform] duration-(--duration-slower) ease-(--ease-stage) motion-reduce:transition-none',
                    index === active ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1 opacity-0',
                  )}
                >
                  <blockquote className={cn('max-w-[30ch] text-n-50', VOICE_LG)}>&ldquo;{review.quote}&rdquo;</blockquote>
                  <figcaption className="mt-7 font-display text-label uppercase text-(--color-ash)">{review.author}</figcaption>
                </figure>
              ))}
            </div>

            <div role="group" aria-label="Choose a review" className="mt-10 flex flex-wrap items-center gap-1 border-t border-white/12 pt-5">
              {reviews.map((review, index) => (
                <button
                  key={review.id}
                  type="button"
                  aria-pressed={index === active}
                  aria-label={`Review ${index + 1} of ${reviews.length}, from ${review.author}`}
                  onClick={() => setActive(index)}
                  className={cn(
                    'relative inline-flex min-h-11 min-w-11 items-center justify-center font-display text-label tabular-nums',
                    'transition-colors duration-(--duration-base) motion-reduce:transition-none',
                    index === active ? 'text-n-50' : 'text-(--color-ash) hover:text-n-100',
                  )}
                >
                  {String(index + 1).padStart(2, '0')}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-3 bottom-2 h-px origin-left bg-current transition-transform duration-(--duration-base) ease-(--ease-stage) motion-reduce:transition-none',
                      index === active ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </FilmMargin>
    </section>
  )
}
