import Image from 'next/image'

import { cn } from '@/lib/utils/cn'

/**
 * An atmospheric plate.
 *
 * The site shipped with **zero image requests**. Not few — none. Eight
 * generated atmospherics sat in `public/` and the only CSS rule that referenced
 * one was scoped to a selector nothing set, so it had never rendered on any
 * route. This component is how approved atmosphere reaches the page.
 *
 * ## Every plate must have a narrative job
 *
 * `job` is required, and it is not documentation — it is the gate. If a plate
 * cannot be given a one-line reason that names the movement it serves and what
 * it does there, it does not belong on the page. "The site has no images" is
 * not a reason.
 *
 * ## ⚠️ This is atmosphere. It is never evidence.
 *
 * Everything rendered here is generated, abstract and non-representational: a
 * floor, a curtain, paper, light in haze. **No plate may depict a person, a
 * student, a teacher, a family, an audience or a South Dade facility**, and
 * nothing here may be positioned so as to imply it documents this business.
 * The academy's own 18 photographs remain blocked under gate I-1, and the
 * answer to that is consent, not a convincing substitute.
 *
 * Consequently every plate is `aria-hidden` with an empty `alt`: it carries no
 * information, so a screen reader that announced it would be announcing noise.
 * Any plate that *would* need alt text is by definition doing a job this
 * component must not do.
 *
 * ## Performance
 *
 * The sources are 2–2.5 MB at 2K. They are never served. `next/image`
 * re-encodes to AVIF/WebP at the requested width, so the browser receives a
 * fraction of the original — measured and recorded in the EE2 report.
 *
 *   · `fill` + a positioned parent, so there is no layout shift
 *   · `loading="lazy"` by default — every plate on this site is below the fold,
 *     and the film's LCP is a text node on black, which must stay true
 *   · `sizes` is required so the browser does not fetch a desktop-width encode
 *     for a phone
 *   · `quality` defaults low: these are soft, hazy, heavily-blurred frames with
 *     no fine detail to protect, and they sit at low opacity under type
 *
 * ## Colour discipline
 *
 * Three of the generated plates carry magenta and crimson bands that are
 * outside the direction's two-colour palette. `desaturate` exists so a plate
 * that is compositionally right but chromatically wrong can be corrected in
 * the browser rather than rejected — the alternative is regenerating an asset
 * to fix a cast that a filter removes for nothing.
 */

export interface AtmosphereProps {
  /** File in `public/images/generated`, without extension. */
  asset: string
  /**
   * Why this plate is on this page, naming the movement it serves.
   * Required. A plate without a job is decoration and does not ship.
   */
  job: string
  /** Rendered opacity. Atmosphere sits under type and must never compete. */
  opacity?: number
  /** `object-position`. Floors anchor bottom; light sources anchor to the source. */
  position?: string
  /** Cuts an off-palette cast without regenerating the asset. 1 = untouched. */
  desaturate?: number
  /** Blend mode. `screen` for light on dark; `multiply` for tooth on ivory. */
  blend?: 'normal' | 'screen' | 'multiply' | 'overlay' | 'soft-light'
  /** Responsive `sizes`. Defaults to full-bleed. */
  sizes?: string
  /** Re-encode quality. Soft plates tolerate low values. */
  quality?: number
  /** Positioning and masking of the layer itself. */
  className?: string
  /** Optional CSS mask, so a plate dissolves into the ground rather than ending. */
  maskImage?: string
}

export function Atmosphere({
  asset,
  job,
  opacity = 0.5,
  position = 'center',
  desaturate = 1,
  blend = 'normal',
  sizes = '100vw',
  quality = 52,
  className,
  maskImage,
}: AtmosphereProps) {
  return (
    <div
      aria-hidden="true"
      data-atmosphere={asset}
      data-atmosphere-job={job}
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      style={{
        opacity,
        mixBlendMode: blend,
        ...(maskImage
          ? { maskImage, WebkitMaskImage: maskImage }
          : {}),
      }}
    >
      <Image
        src={`/images/generated/${asset}.jpg`}
        alt=""
        fill
        sizes={sizes}
        quality={quality}
        /*
         * Never `priority`. Every plate is below the fold by design, and the
         * opening frame must remain a text node on true black.
         */
        loading="lazy"
        className="object-cover"
        style={{
          objectPosition: position,
          ...(desaturate !== 1 ? { filter: `saturate(${desaturate})` } : {}),
        }}
      />
    </div>
  )
}
