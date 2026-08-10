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

export interface MediaReviewProps {
  /** Filename in `.audit/media-review`, without extension. */
  asset: string
  /** Why this image is on this page. Required — a plate without a job does not ship. */
  job: string
  /** Descriptive alt. These are real photographs and are NOT decorative. */
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  /** `object-position`. */
  position?: string
}

export function MediaReview({
  asset,
  job,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  position = 'center',
}: MediaReviewProps) {
  if (!isPreview) return null

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
        style={{ objectPosition: position }}
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
