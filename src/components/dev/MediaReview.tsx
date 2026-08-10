import Image from 'next/image'

import { cn } from '@/lib/utils/cn'

/**
 * MI1 — local media-integration preview.
 *
 * ## ⚠️ NOT CLEARED FOR PRODUCTION
 *
 * These are derivatives of legacy southdademusic.com photography, generated
 * into `.audit/media-review/` so the team can see how authentic material
 * changes the approved design. **Nothing here has been cleared to publish.**
 *
 *   · every file still requires copyright confirmation (gate I-7)
 *   · Tier B files are face-free crops of originals that contain people; the
 *     originals never leave `.audit/` and are never published
 *   · every crop was visually verified before use — two were rejected at that
 *     step, one re-cropped and one dropped entirely
 *
 * ## Why this is a separate component rather than a prop on `Atmosphere`
 *
 * `Atmosphere` renders approved, generated, decorative plates. These are
 * unapproved photographs of a real business. Giving them one shared component
 * would make it possible to ship an uncleared photograph by changing a string,
 * and the whole point of the tiering is that those two things cannot be
 * confused.
 *
 * ## The bytes are NOT in `public/`
 *
 * They live in `.audit/media-review/` and reach the browser only through the
 * development-only route handler at `src/app/%5Fmedia-review/[asset]/route.ts`,
 * which 404s in production.
 *
 * This matters: anything under `public/` is served statically by Next at a
 * guessable URL **whatever a component does**. Gating this component to
 * development would have left the files themselves reachable in a deployment —
 * which is exactly how Phase 4D exposed five uncleared photographs. Repeating
 * that while previewing uncleared photographs of children's events would have
 * been a considerably worse version of the same mistake.
 *
 * `unoptimized` is set because the source is a dynamic route handler rather
 * than a static asset, so the image optimiser cannot fetch it at build time.
 *
 * ## Production behaviour
 *
 * Renders **nothing** when `NODE_ENV === 'production'`. The layout does not
 * collapse — a page that depends on one of these for its composition would
 * look broken in production, which is the correct signal: it is preview-only.
 */

const isPreview = process.env.NODE_ENV !== 'production'

/**
 * ## Dual mode — the fix for the deployed review experience
 *
 * Returning `null` in production was correct about the photograph and wrong
 * about the page. It left the compositions MI1 and MI2 built around those
 * photographs standing empty: a full-viewport black rectangle where the house
 * lights reveal should be, an empty dark column beside the programmes, an empty
 * band above the showcase quotes.
 *
 * So a placement now declares two images:
 *
 *   `asset`     the authentic derivative — **development only**, served from
 *               `.audit/media-review/` by a handler that 404s in production
 *   `fallback`  an approved generated plate from `public/images/generated/`,
 *               which is what production actually ships
 *
 * The two are never the same picture and are never presented as the same thing.
 * A generated plate carries no `data-media-review` attribute, so nothing
 * downstream can mistake one for evidence, and its alt text describes an
 * abstract study rather than a room in Florida City.
 *
 * ## When there is no honest fallback
 *
 * Omit `fallback` and the component renders nothing in production — which is
 * still correct for something like the academy's own banner, where no generated
 * plate could stand in without implying the business said something it did not.
 * In that case the **parent must collapse too**, which is what `hasMedia()`
 * below is for. An empty aspect-ratio box with a dark background is the exact
 * defect this change exists to remove.
 */

/** Does this placement render anything in the current mode? */
export function hasMedia(fallback?: string): boolean {
  return isPreview || Boolean(fallback)
}

export interface MediaReviewProps {
  /** Filename in `.audit/media-review`, without extension. Development only. */
  asset: string
  /** Why this image is on this page. Required — a plate without a job does not ship. */
  job: string
  /** Descriptive alt for the authentic derivative. NOT decorative. */
  alt: string
  /**
   * Approved generated plate in `public/images/generated`, without extension.
   * Omit only when no generated image could stand in honestly — and then
   * collapse the parent with `hasMedia()`.
   */
  fallback?: string
  /** Alt for the generated plate. Must describe a study, never a real room. */
  fallbackAlt?: string
  sizes?: string
  priority?: boolean
  className?: string
  /**
   * `object-position`, as an inline style. Omit it when the crop has to change
   * across breakpoints — inline styles cannot carry a media query — and pass
   * `[&_img]:object-[…]` utilities through `className` instead.
   */
  position?: string
  /** `object-position` for the fallback. The two images crop differently. */
  fallbackPosition?: string
  /** Responsive crop utilities for the fallback, when one value will not do. */
  fallbackImgClassName?: string
}

export function MediaReview({
  asset,
  job,
  alt,
  fallback,
  fallbackAlt,
  sizes = '100vw',
  priority = false,
  className,
  position,
  fallbackPosition,
  fallbackImgClassName,
}: MediaReviewProps) {
  /*
   * PRODUCTION. The authentic derivative is not reachable here — the route
   * handler 404s — so this branch never references it.
   */
  if (!isPreview) {
    if (!fallback) return null

    return (
      <div
        data-media-fallback={fallback}
        aria-hidden={fallbackAlt ? undefined : true}
        className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      >
        <Image
          src={`/images/generated/${fallback}.jpg`}
          alt={fallbackAlt ?? ''}
          fill
          sizes={sizes}
          quality={52}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className={cn('object-cover', fallbackImgClassName)}
          style={fallbackPosition ? { objectPosition: fallbackPosition } : undefined}
        />
      </div>
    )
  }

  return (
    <div
      data-media-review={asset}
      data-media-review-job={job}
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <Image
        src={`/_media-review/${asset}.jpg`}
        alt={alt}
        fill
        sizes={sizes}
        /*
         * No `quality` prop. These are served `unoptimized` from a dev-only
         * route handler, so a quality value would do nothing except trip Next's
         * `images.qualities` validation — which `probe:motion` correctly flags
         * as console noise. The derivatives are already encoded at q86 by the
         * crop step.
         */
        unoptimized
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  )
}

/**
 * The development-only banner.
 *
 * Small, fixed, bottom-left, and deliberately outside the design language so it
 * can never be mistaken for part of the page. Returns `null` in production, so
 * it is impossible for it to ship.
 */
export function MediaReviewBadge() {
  if (!isPreview) return null

  return (
    <p
      data-media-review-badge
      aria-hidden="true"
      className="pointer-events-none fixed bottom-3 left-3 z-[999] rounded-sm bg-red-700/95 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase leading-tight tracking-wider text-white shadow-lg"
    >
      Media review — not cleared for production
    </p>
  )
}
