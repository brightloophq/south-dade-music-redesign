'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { primaryCta } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { DESK_SENTINEL_ID } from '@/components/film'
import { cn } from '@/lib/utils/cn'

import { MobileNav } from '../MobileNav'
import { Navigation } from '../Navigation'

/**
 * Routes that open on a full-bleed dark photograph the header floats over.
 * Kept here rather than in the layout because the marketing layout is a Server
 * Component and cannot read the pathname without becoming a client boundary.
 */
const ROUTES_WITH_DARK_HERO = new Set(['/'])

/** Header heights, mirrored by `--header-height` and the hero's pull-up. */
const HEIGHT = { mobile: 64, desktop: 72 }

/**
 * Has the hero passed under the bar?
 *
 * Watches `#desk-begins` — the first light section — which the letterbox and
 * grain also use, so the three change register on the same scroll position.
 */
function useHeroPassed(enabled: boolean) {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const sentinel = document.getElementById(DESK_SENTINEL_ID)
    if (!sentinel) return

    /*
      A scroll check, not an IntersectionObserver. The sentinel section is taller
      than the viewport, so its intersection ratio never crosses a threshold at
      the moment its top edge passes under the bar — an observer only fired once
      the whole section had left, ~1,600px late. One rAF-throttled read per
      frame is the honest signal.
    */
    let frame = 0
    const check = () => {
      frame = 0
      setPassed(sentinel.getBoundingClientRect().top <= HEIGHT.desktop)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [enabled])

  return enabled && passed
}

/**
 * Site header.
 *
 * ## Two states, one bar
 *
 *   overlay  over the homepage hero — transparent, ivory type, the ivory mark
 *   solid    everywhere else — warm ivory ground, hairline, the green mark
 *
 * The switch happens when the first light section arrives under the bar, or
 * the moment a menu opens (a menu sheet hanging from a transparent bar over a
 * photograph reads as two unrelated objects). Only colour transitions — never
 * height or transform — so the header cannot contribute layout shift.
 *
 * ## The CTA is always visible
 *
 * The trial button used to be hidden below 480px, which left a phone visitor
 * with no way to book without opening the menu. It now renders at every width;
 * below `sm` it drops the price suffix to fit beside the mark and the menu
 * control, and the drawer carries the full label.
 */
export function Header() {
  const pathname = usePathname()
  const overHero = ROUTES_WITH_DARK_HERO.has(pathname)
  const heroPassed = useHeroPassed(overHero)
  const [menuOpen, setMenuOpen] = useState(false)
  const onMenuChange = useCallback((open: boolean) => setMenuOpen(open), [])

  const overlay = overHero && !heroPassed && !menuOpen

  return (
    <header
      data-site-header={overlay ? 'overlay' : 'solid'}
      data-register={overlay ? 'house' : undefined}
      className={cn(
        'sticky top-0 z-(--z-header) h-16 w-full lg:h-[72px]',
        'transition-[background-color,border-color] duration-(--duration-slow) ease-(--ease-stage) motion-reduce:transition-none',
        overlay
          ? 'border-b border-white/10 bg-transparent'
          : 'border-b border-(--color-border-default) bg-(--color-ground-house)',
      )}
      style={{ ['--header-height' as string]: `${HEIGHT.desktop}px` }}
    >
      {/*
        Legibility over the photograph without a bar: a short gradient that
        belongs to the header, fades with it, and never reaches the headline.
      */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/55 to-transparent',
          'transition-opacity duration-(--duration-slow) motion-reduce:transition-none',
          overlay ? 'opacity-100' : 'opacity-0',
        )}
      />

      <Container width="wide" className="flex h-full items-center justify-between gap-4 lg:gap-8">
        <Link
          href="/"
          aria-label={`${siteConfig.shortName} — home`}
          className="relative flex h-11 shrink-0 items-center lg:h-[52px]"
        >
          {/*
            THE AUTHENTIC MARK, in both of its first-party colourways.

            Census #76 in green on the ivory bar; the ivory variant — the live
            site's own navbar treatment — over the photograph. Both are
            rendered and cross-faded so the swap never reloads an image or
            shifts a pixel. Height is fixed and width follows, so the 1.68:1
            aspect ratio is never touched.
          */}
          <Image
            src="/brand/south-dade-music.png"
            alt={siteConfig.shortName}
            width={720}
            height={428}
            priority
            sizes="96px"
            className={cn(
              'h-full w-auto transition-opacity duration-(--duration-slow) motion-reduce:transition-none',
              overlay ? 'opacity-0' : 'opacity-100',
            )}
          />
          <Image
            src="/brand/south-dade-music-light.png"
            alt=""
            aria-hidden="true"
            width={720}
            height={428}
            priority={overHero}
            sizes="96px"
            className={cn(
              'absolute inset-y-0 left-0 h-full w-auto transition-opacity duration-(--duration-slow) motion-reduce:transition-none',
              overlay ? 'opacity-100' : 'opacity-0',
            )}
          />
        </Link>

        <Navigation className="mr-auto" onOpenChange={onMenuChange} />

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          {/*
            ⚠️ Responsive display lives on wrappers, never on the Button.
            `cn` does not resolve conflicts, so `hidden` passed to a component
            whose base class is `inline-flex` loses on emission order.
          */}
          <span className="hidden sm:inline-flex">
            <Button href={primaryCta.href} variant="primary" size="md" price={primaryCta.priceSuffix ?? undefined}>
              {primaryCta.label}
            </Button>
          </span>
          <span className="inline-flex sm:hidden">
            <Button href={primaryCta.href} variant="primary" size="md">
              {primaryCta.label}
            </Button>
          </span>

          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
