import Image from 'next/image'

import { Photo } from '@/components/media/Photo'
import type { PhotoId } from '@/lib/media/catalog'
import { cn } from '@/lib/utils/cn'

/**
 * An editorial image frame.
 *
 * The one place the site decides how a picture sits on the page: a positioned,
 * clipped box with the media radius, a dark ground so a slow connection shows
 * a considered placeholder rather than a white hole, and an inner layer the
 * motion system can scale without moving the frame's edges.
 *
 *   photo  an owner-approved photograph from the catalog (documentary)
 *   plate  a generated still life from /images/generated (decorative, alt="")
 *
 * `data-frame` names the reveal the timeline gives this frame; the frame
 * renders fully visible without it, so reduced motion and no-JS get the image.
 */
export interface MediaFrameProps {
  photo?: string
  plate?: string
  alt?: string
  sizes: string
  className?: string
  /** Applied to the image layer — `object-position` utilities and the like. */
  imgClassName?: string
  position?: string
  priority?: boolean
  /** Reveal personality read by the homepage timelines. */
  reveal?: string
  rounded?: boolean
  children?: React.ReactNode
}

export function MediaFrame({
  photo,
  plate,
  alt = '',
  sizes,
  className,
  imgClassName,
  position,
  priority,
  reveal,
  rounded = true,
  children,
}: MediaFrameProps) {
  return (
    <div
      data-frame={reveal}
      className={cn(
        'relative isolate overflow-hidden bg-(--color-ground-pitch)',
        rounded && 'rounded-(--radius-media-sm) sm:rounded-(--radius-media)',
        className,
      )}
    >
      <div data-frame-media className="absolute inset-0">
        {photo ? (
          <Photo
            id={photo as PhotoId}
            alt={alt}
            sizes={sizes}
            priority={priority}
            position={position}
            imgClassName={imgClassName}
            reveal="none"
          />
        ) : plate ? (
          <Image
            src={`/images/generated/${plate}.jpg`}
            alt=""
            aria-hidden="true"
            fill
            sizes={sizes}
            quality={72}
            loading="lazy"
            className={cn('object-cover', imgClassName)}
            style={position ? { objectPosition: position } : undefined}
          />
        ) : null}
      </div>
      {children}
    </div>
  )
}
