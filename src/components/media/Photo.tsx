import Image from 'next/image'

import { PHOTOS, type PhotoId } from '@/lib/media/catalog'
import { cn } from '@/lib/utils/cn'

/**
 * A published South Dade Music photograph.
 *
 * ## This is not `MediaReview`
 *
 * `MediaReview` exists to preview *uncleared* material locally and renders
 * nothing in production. Everything routed through `Photo` has been **approved
 * by the owner for reuse from the existing portfolio**, lives in `public/media/`
 * and ships to the public site like any other asset.
 *
 * The two must stay separate. Anything still under review keeps using
 * `MediaReview` and the development-only `/_media-review` handler, which
 * continues to 404 in production.
 *
 * ## Every photograph carries its provenance
 *
 * The `id` indexes `PHOTOS`, which records the audit number, the original
 * source URL and the page it was published on. `data-audit` puts that number in
 * the DOM, so a reviewer can point at any image on the site and trace it back to
 * a row in the 67-image census without reading the source.
 *
 * ## Delivery
 *
 * `fill` + `sizes`, so Next generates AVIF and WebP at the widths each slot
 * actually uses. The files in `public/media/` are already resized and
 * mozjpeg-encoded from the originals — no multi-megabyte source ever reaches
 * the network. `priority` is opt-in and used only where a photograph is
 * genuinely above the fold.
 */
export interface PhotoProps {
  id: PhotoId
  /** Descriptive alt. These are real photographs of a real academy. */
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  /** `object-position` as an inline style. */
  position?: string
  /** Responsive crop utilities, for slots whose framing changes by breakpoint. */
  imgClassName?: string
  /**
   * How this photograph arrives, chosen by the job it does.
   *
   *   mask   an aperture opening from the bottom, with a small scale settle —
   *          the default, and the one that reads as evidence being uncovered
   *   wipe   a horizontal exposure across a full-bleed band
   *   sweep  a vertical opening for a tall rail
   *   none   already visible; for anything above the fold
   *
   * Read by `DeskTimeline`. Under reduced motion no timeline runs and every
   * photograph renders at its static value, fully visible.
   */
  reveal?: 'mask' | 'wipe' | 'sweep' | 'none'
}

export function Photo({
  id,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  position,
  imgClassName,
  reveal = 'mask',
}: PhotoProps) {
  const record = PHOTOS[id]

  return (
    <div
      data-photo={id}
      data-audit={record.auditId}
      data-reveal={reveal}
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <Image
        src={`/media/${id}.jpg`}
        alt={alt}
        fill
        sizes={sizes}
        quality={72}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className={cn('object-cover', imgClassName)}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  )
}
