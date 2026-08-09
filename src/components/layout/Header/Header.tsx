'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { primaryCta } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { cn } from '@/lib/utils/cn'

import { MobileNav } from '../MobileNav'
import { Navigation } from '../Navigation'

export interface HeaderProps {
  /**
   * Whether the header floats transparently over a dark hero.
   * Defaults to the route table below rather than being detected — a header
   * cannot know what is beneath it, but the site does.
   */
  overHero?: boolean
  className?: string
}

/**
 * Routes that open with a House-register hero, over which the header floats
 * transparently until the first scroll. Kept here rather than in the layout
 * because the marketing layout is a Server Component and cannot read the
 * pathname without becoming a client boundary.
 */
const ROUTES_WITH_DARK_HERO = new Set(['/'])

/**
 * Site header.
 * Canonical spec: docs/redesign/04-design-system.md §11 · final-art-direction.md §5
 *
 * Behaviour:
 *  - 80px, condensing to 64px on scroll.
 *  - Transparent over a dark hero; solid `n-0` with a hairline thereafter.
 *  - The primary CTA is a persistent button, never a nav item, and never
 *    scrolls away.
 *  - `--header-height` is published as a custom property so `scroll-padding-top`
 *    and the sticky sidebar rail stay in sync with the real height.
 *
 * Only `background-color`, `box-shadow` and `height` transition — no transform,
 * so the header never contributes layout shift.
 */
export function Header({ overHero, className }: HeaderProps) {
  const pathname = usePathname()
  const { isScrolled } = useScrollDirection({ threshold: 24 })

  const floatsOverHero = overHero ?? ROUTES_WITH_DARK_HERO.has(pathname)
  const solid = isScrolled || !floatsOverHero

  return (
    <header
      /*
        While floating over the House hero the header adopts that register, so
        its type and controls read as `n-0` against the dark ground. Once solid
        it returns to the Desk. The header is the one component that crosses
        rooms, and it must always be legible against what it sits on.
      */
      data-register={!solid ? 'house' : undefined}
      className={cn(
        'sticky top-0 z-(--z-header) w-full',
        'transition-[background-color,box-shadow,height] duration-(--duration-base) ease-(--ease-stage)',
        'motion-reduce:transition-none',
        solid
          ? 'h-16 border-b border-(--color-border-default) bg-(--color-surface-raised)'
          : 'h-20 border-b border-transparent bg-transparent',
        className,
      )}
      style={{ ['--header-height' as string]: solid ? '64px' : '80px' }}
    >
      <Container width="wide" className="flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          // min-h-6 gives the wordmark a 24px hit area (WCAG 2.5.8 AA). Its
          // type box measured 23px — one pixel short — on every route.
          className="flex min-h-6 shrink-0 items-center font-display text-heading-sm font-bold tracking-tight text-(--color-text-primary)"
        >
          {/*
            ⚠️ Gate B-5 / D-1 — the estate runs four brand names and the logo has
            not been reviewed, so the wordmark is set in type rather than an
            image. Replacing this with the real mark is blocked on both gates.
          */}
          {siteConfig.shortName}
        </Link>

        <Navigation className="flex-1 justify-center" />

        {/*
          Removed during Tier 1: a disabled search control and a static
          "EN | ES" indicator.

          The search was an icon — icon rows are banned outright — and a control
          that could never do anything. The language indicator was worse: gate
          B-6 is open, no Spanish tree exists, and the design brief §19 is
          explicit that a language switcher must not be designed as though it
          exists today. A static EN|ES badge still tells a Spanish-speaking
          parent that a Spanish site is waiting for them.

          Both return when the capability does.
        */}
        <div className="flex shrink-0 items-center gap-2">
          {/*
            ⚠️ The responsive display sits on this wrapper, NOT on the Button.
            Do not move it back.

            `className="hidden sm:inline-flex"` on the Button did not work. `cn`
            is a plain concatenator with no conflict resolution, so the Button's
            base `inline-flex` and the passed `hidden` both survived into the
            class attribute — and in Tailwind v4 both sit in the same layer, so
            the winner is decided by emission order in the stylesheet, not by
            order in the attribute. `inline-flex` is emitted later, so it won,
            and the 191px trial button rendered at every viewport.

            The measured cost: **36px of horizontal scroll on 26 of 27 routes at
            390px.** A 143px wordmark plus a 191px button plus a 44px menu
            control cannot fit 390px, so every interior page could be dragged
            sideways on a phone. Found by the EE1 mobile sweep; it predates EE1.

            This is the second instance of this exact failure — the first squared
            off the primary CTA when `rounded-none` beat `rounded-(--radius-full)`
            and is recorded in content-migration-coverage.md §"Found while
            building Tier 1". A wrapper is used rather than a fix inside `cn`
            because swapping that implementation changes class resolution in
            every component on the site, which is not a change to make
            immediately before a visual review. **The real fix belongs in `cn`**
            and is recorded as an EE1 follow-up.
          */}
          <span className="hidden sm:inline-flex">
            {primaryCta.status === 'live' ? (
              <Button
                href={primaryCta.href}
                variant="primary"
                size="md"
                price={primaryCta.priceSuffix ?? undefined}
              >
                {primaryCta.label}
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                disabled
                aria-disabled
                title="Booking is not yet available"
              >
                {primaryCta.label}
              </Button>
            )}
          </span>

          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
