import { cn } from '@/lib/utils/cn'

/**
 * A movement.
 *
 * The page is not a stack of sections; it is a building you walk through, and
 * each movement is a room with its own temperature. Spec: Visual
 * Specification.md §D.
 *
 * This wrapper carries three things and nothing else:
 *
 *   - the ground colour for the room
 *   - the register (`house` = the film's dark register, default = the desk)
 *   - `data-film`, so the motion runtime and the probe can find it by name
 *
 * ## Why the ground is an inline style
 *
 * Movement grounds are full-bleed and change per section. Tailwind's generated
 * `bg-ground-*` utilities would work, but the Release needs to *animate* the
 * ground from stage blue to ivory, and animating a class is a swap, not a
 * dimmer. Publishing it as a property keeps one mechanism for both.
 */

export type Ground = 'pitch' | 'wing' | 'memory' | 'stage' | 'flash' | 'house'

const GROUND_VAR: Record<Ground, string> = {
  pitch: 'var(--color-ground-pitch)',
  wing: 'var(--color-ground-wing)',
  memory: 'var(--color-ground-memory)',
  stage: 'var(--color-ground-stage)',
  flash: 'var(--color-ground-flash)',
  house: 'var(--color-ground-house)',
}

/** The dark grounds run in the film register; ivory and flash are the desk. */
const isFilm = (ground: Ground) => ground !== 'house' && ground !== 'flash'

interface MovementProps {
  /** Shot name — `data-film`, used by the motion runtime and the probe. */
  name: string
  ground: Ground
  children: React.ReactNode
  className?: string
  id?: string
  'aria-labelledby'?: string
  as?: 'section' | 'div'
}

export function Movement({
  name,
  ground,
  children,
  className,
  id,
  as: Tag = 'section',
  ...rest
}: MovementProps) {
  return (
    <Tag
      id={id}
      data-film={name}
      data-ground={ground}
      {...(isFilm(ground) ? { 'data-register': 'house' } : {})}
      className={cn('relative isolate w-full', className)}
      style={{ backgroundColor: GROUND_VAR[ground] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/**
 * The film margin.
 *
 * 150px at ≥1280px — the line every subtitle-hung line of type sits on, and the
 * line the spot seam travels along. Not generic page padding: moving it breaks
 * the relationship between the light and the words.
 *
 * Content occupies columns 2–8 through the film and opens to 2–11 at the desk
 * (Visual Specification.md §C). Nothing is centred, ever.
 */
export function FilmMargin({
  children,
  className,
  wide = false,
}: {
  children: React.ReactNode
  className?: string
  wide?: boolean
}) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full',
        wide ? 'max-w-(--container-wide)' : 'max-w-(--container-content)',
        className,
      )}
      style={{ paddingInline: 'var(--grid-margin)' }}
    >
      {children}
    </div>
  )
}
