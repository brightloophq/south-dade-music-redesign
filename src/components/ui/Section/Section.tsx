import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'
import type { Register } from '@/config/theme'

import { Container, type ContainerWidth } from '../Container'

export type SectionDensity = 'compact' | 'comfortable' | 'spacious' | 'feature'

export interface SectionProps {
  children: ReactNode
  className?: string
  /** Vertical rhythm. Feature is reserved for hero, showcase and the timeline. */
  density?: SectionDensity
  /**
   * Which room this section belongs to.
   *
   * `house` — dark, lit, composed. Where a parent is persuaded.
   * `desk`  — light, plain, specific. Where a parent decides.
   *
   * Omit to inherit from the surrounding layout.
   * See docs/redesign/final-art-direction.md §2–3.
   */
  register?: Register
  /** `false` renders children edge-to-edge, for full-bleed photography. */
  contained?: boolean
  width?: ContainerWidth
  as?: ElementType
  id?: string
  /** Associates the section with its heading for assistive technology. */
  'aria-labelledby'?: string
  'aria-label'?: string
}

const densityClass: Record<SectionDensity, string> = {
  compact: 'py-(--section-compact)',
  comfortable: 'py-(--section-comfortable)',
  spacious: 'py-(--section-spacious)',
  feature: 'py-(--section-feature)',
}

/**
 * A page section with the correct vertical rhythm and register.
 * Canonical spec: docs/redesign/04-design-system.md §3
 *
 * Generous vertical space is what separates a premium feel from a template. The
 * current site's builder output has near-uniform section padding, which is why
 * every section reads with the same importance.
 *
 * Setting `register` applies `data-register`, which re-points the semantic
 * colour aliases — so a section's children need no register-specific classes.
 */
export function Section({
  children,
  className,
  density = 'comfortable',
  register,
  contained = true,
  width = 'content',
  as: Component = 'section',
  id,
  ...aria
}: SectionProps) {
  const content = contained ? <Container width={width}>{children}</Container> : children

  return (
    <Component
      id={id}
      data-register={register}
      className={cn(
        densityClass[density],
        register && 'bg-(--color-surface-page) text-(--color-text-primary)',
        className,
      )}
      {...aria}
    >
      {content}
    </Component>
  )
}
