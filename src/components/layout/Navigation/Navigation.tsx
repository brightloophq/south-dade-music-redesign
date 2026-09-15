'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { activeNavId, primaryNavigation } from '@/config/navigation'
import { Photo } from '@/components/media/Photo'
import type { PhotoId } from '@/lib/media/catalog'
import { cn } from '@/lib/utils/cn'
import type { NavItem } from '@/types/navigation'

/** Pointer intent before a panel opens from rest — defeats accidental brushes. */
const OPEN_INTENT_MS = 90
/** Grace before a pointer leaving the navigation closes it. */
const CLOSE_INTENT_MS = 220
/** A click this soon after a hover-open keeps the panel open rather than toggling it shut. */
const HOVER_CLICK_GRACE_MS = 600
/**
 * With a panel already open, how long the pointer must rest on another trigger
 * before the sheet switches. The sheets are full width, so the natural path
 * from "Lessons" to its photograph on the right crosses every trigger beside
 * it; an instant switch would hijack that gesture.
 */
const SWITCH_INTENT_MS = 160

/**
 * Desktop navigation — disclosure buttons with editorial menu sheets.
 *
 * ## Mechanics, and the faults they fix
 *
 * The previous menu was a link with a visually hidden toggle beside it. A
 * mouse user got hover; a keyboard user got a trigger they could not see; a
 * touch user on a tablet landscape got neither. It also closed mid-gesture
 * whenever the pointer crossed the few pixels between trigger and panel.
 *
 *  - **Triggers are real `<button>`s** with `aria-expanded` and a visible
 *    chevron. Each parent's overview page is the first link inside its panel.
 *  - **No dead band.** Every trigger fills the full header height and its
 *    panel hangs from the header's bottom edge, so the pointer never leaves an
 *    interactive surface on its way down. Closing is debounced for diagonals.
 *  - **Switching panels does not re-drop.** Moving from Lessons to Programs
 *    swaps the sheet's contents in place; only opening from rest animates.
 *  - **All panels share one position and one height band**, so the page below
 *    never jumps and the sheet never resizes under the pointer.
 *  - **Touch** ignores hover entirely and uses the button.
 *  - **Keyboard**: Enter/Space toggles, ArrowDown opens and moves into the
 *    panel, ArrowLeft/ArrowRight move between top-level items, Escape closes
 *    and returns focus to the trigger, Tab out closes.
 *  - It **never traps focus** — a menu is not a dialog. (The mobile drawer
 *    does trap; that is the correct distinction.)
 *
 * Panel photographs are mounted on first intent, so no menu image is
 * downloaded by a visitor who never opens a menu.
 */
export function Navigation({
  className,
  onOpenChange,
}: {
  className?: string
  onOpenChange?: (open: boolean) => void
}) {
  const pathname = usePathname()
  const activeId = activeNavId(pathname)

  const [openId, setOpenId] = useState<string | null>(null)
  const [instant, setInstant] = useState(false)
  const [primed, setPrimed] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)

  const navRef = useRef<HTMLElement>(null)
  const openRef = useRef<string | null>(null)
  const timerRef = useRef<number | undefined>(undefined)
  const hoverOpenedAt = useRef(0)
  const focusIntoPanel = useRef<string | null>(null)

  /* Close on route change during render, so the panel never paints on the new page. */
  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    if (openId !== null) setOpenId(null)
  }

  useEffect(() => {
    openRef.current = openId
    onOpenChange?.(openId !== null)
  }, [openId, onOpenChange])

  const clearTimer = useCallback(() => {
    if (timerRef.current !== undefined) window.clearTimeout(timerRef.current)
    timerRef.current = undefined
  }, [])

  const show = useCallback(
    (id: string) => {
      clearTimer()
      setPrimed(true)
      /* Already showing another panel: swap in place rather than re-dropping. */
      setInstant(openRef.current !== null && openRef.current !== id)
      openRef.current = id
      setOpenId(id)
    },
    [clearTimer],
  )

  const close = useCallback(() => {
    clearTimer()
    openRef.current = null
    setInstant(false)
    setOpenId(null)
  }, [clearTimer])

  const requestOpen = useCallback(
    (id: string) => {
      clearTimer()
      if (openRef.current === id) return
      if (openRef.current !== null) {
        timerRef.current = window.setTimeout(() => show(id), SWITCH_INTENT_MS)
        return
      }
      timerRef.current = window.setTimeout(() => {
        hoverOpenedAt.current = performance.now()
        show(id)
      }, OPEN_INTENT_MS)
    },
    [clearTimer, show],
  )

  const requestClose = useCallback(() => {
    clearTimer()
    timerRef.current = window.setTimeout(close, CLOSE_INTENT_MS)
  }, [clearTimer, close])

  /* Outside pointer and Escape anywhere on the page. */
  useEffect(() => {
    if (!openId) return
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      const trigger = navRef.current?.querySelector<HTMLElement>(`[data-nav-trigger="${openRef.current}"]`)
      close()
      trigger?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openId, close])

  /* ArrowDown opens a panel; focus moves in once it is no longer inert. */
  useEffect(() => {
    const id = focusIntoPanel.current
    if (!id || openId !== id) return
    focusIntoPanel.current = null
    const first = document.querySelector<HTMLElement>(`#nav-panel-${id} a[href]`)
    first?.focus()
  }, [openId])

  useEffect(() => clearTimer, [clearTimer])

  const onTopLevelKeyDown = (event: React.KeyboardEvent<HTMLElement>, item: NavItem) => {
    const tops = Array.from(navRef.current?.querySelectorAll<HTMLElement>('[data-nav-top]') ?? [])
    const index = tops.indexOf(event.currentTarget)
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      const next = tops[(index + (event.key === 'ArrowRight' ? 1 : -1) + tops.length) % tops.length]
      next?.focus()
      if (openRef.current) close()
    } else if (event.key === 'ArrowDown' && item.children?.length) {
      event.preventDefault()
      focusIntoPanel.current = item.id
      if (openRef.current === item.id) {
        document.querySelector<HTMLElement>(`#nav-panel-${item.id} a[href]`)?.focus()
        focusIntoPanel.current = null
      } else {
        show(item.id)
      }
    }
  }

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className={cn('hidden h-full lg:flex', className)}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'mouse') return
        setPrimed(true)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') requestClose()
      }}
      onBlur={(event) => {
        if (openRef.current && !navRef.current?.contains(event.relatedTarget as Node)) close()
      }}
    >
      <ul className="flex h-full items-stretch">
        {primaryNavigation.map((item) => {
          const hasPanel = Boolean(item.children?.length)
          const isOpen = openId === item.id
          const active = activeId === item.id

          const labelClass = cn(
            'group relative inline-flex h-full items-center gap-1.5 px-3 xl:px-4',
            'font-display text-[0.9375rem] font-medium tracking-[-0.005em] text-(--color-text-primary)',
            'transition-opacity duration-(--duration-fast) motion-reduce:transition-none',
            active || isOpen ? 'opacity-100' : 'opacity-75 hover:opacity-100',
          )

          const underline = (
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-x-3 bottom-[calc(50%-15px)] h-px origin-left bg-current xl:inset-x-4',
                'transition-transform duration-(--duration-base) ease-(--ease-stage) motion-reduce:transition-none',
                active || isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
              )}
            />
          )

          return (
            <li
              key={item.id}
              className="flex h-full"
              onPointerEnter={(event) => {
                if (event.pointerType !== 'mouse') return
                if (hasPanel) requestOpen(item.id)
                else if (openRef.current) requestClose()
                else clearTimer()
              }}
            >
              {hasPanel ? (
                <button
                  type="button"
                  data-nav-top
                  data-nav-trigger={item.id}
                  aria-expanded={isOpen}
                  aria-controls={`nav-panel-${item.id}`}
                  className={labelClass}
                  onClick={() => {
                    if (isOpen && performance.now() - hoverOpenedAt.current > HOVER_CLICK_GRACE_MS) close()
                    else if (!isOpen) show(item.id)
                  }}
                  onKeyDown={(event) => onTopLevelKeyDown(event, item)}
                >
                  {item.label}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 10 6"
                    className={cn(
                      'mt-px size-2.5 transition-transform duration-(--duration-base) ease-(--ease-stage) motion-reduce:transition-none',
                      isOpen && 'rotate-180',
                    )}
                  >
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                  {active ? <span className="sr-only"> (current section)</span> : null}
                  {underline}
                </button>
              ) : (
                <Link
                  href={item.href}
                  data-nav-top
                  aria-current={active ? 'page' : undefined}
                  className={labelClass}
                  onKeyDown={(event) => onTopLevelKeyDown(event, item)}
                >
                  {item.label}
                  {underline}
                </Link>
              )}

              {hasPanel ? (
                <MenuPanel
                  item={item}
                  open={isOpen}
                  instant={instant}
                  primed={primed}
                  pathname={pathname}
                  onNavigate={close}
                />
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/**
 * One menu sheet.
 *
 * Positioned against the header (the nearest positioned ancestor), full
 * width, hanging from its bottom edge. It is always mounted, so
 * `aria-controls` always resolves; closed, it is `inert` and clipped.
 *
 * Opening from rest is a downward clip — the sheet unrolls from the bar —
 * while the columns rise in a short stagger. Closing is faster than opening,
 * because leaving should never feel like waiting.
 */
function MenuPanel({
  item,
  open,
  instant,
  primed,
  pathname,
  onNavigate,
}: {
  item: NavItem
  open: boolean
  instant: boolean
  primed: boolean
  pathname: string
  onNavigate: () => void
}) {
  const children = item.children ?? []
  const groups = Array.from(new Set(children.map((child) => child.group ?? item.label)))

  const stagger = (index: number): React.CSSProperties => ({
    transitionDelay: open && !instant ? `${110 + index * 55}ms` : '0ms',
  })
  const rise = cn(
    'transition-[opacity,transform] duration-(--duration-slower) ease-(--ease-stage) motion-reduce:transition-none',
    open ? 'translate-y-0 opacity-100' : '-translate-y-1.5 opacity-0',
  )

  return (
    <div
      id={`nav-panel-${item.id}`}
      data-nav-panel={item.id}
      data-open={open ? 'true' : 'false'}
      inert={!open}
      className={cn(
        'absolute inset-x-0 top-full z-(--z-popover) border-b border-n-200 bg-n-50 text-n-900',
        /*
          Visibility transitions only on the way out. Transitioning it on the
          way in keeps the sheet `hidden` for the first frame, and `focus()`
          into a hidden subtree silently fails — which broke ArrowDown.
        */
        'ease-(--ease-stage) motion-reduce:transition-none',
        open
          ? 'visible transition-[clip-path] [clip-path:inset(0_0_0_0)]'
          : 'invisible transition-[clip-path,visibility] [clip-path:inset(0_0_100%_0)]',
        instant ? 'duration-0' : open ? 'duration-(--duration-slower)' : 'duration-(--duration-base)',
      )}
    >
      <div className="mx-auto grid min-h-[300px] w-full max-w-(--container-wide) grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,22rem)] gap-x-14 px-(--grid-margin) pb-11 pt-9">
        {groups.map((group, groupIndex) => {
          const items = children.filter((child) => (child.group ?? item.label) === group)
          const compact = items.every((child) => !child.description)
          /* A panel with one group gives it both text columns, set as two columns of links. */
          const single = groups.length === 1
          return (
            <div key={group} className={cn(rise, single && 'col-span-2')} style={stagger(groupIndex)}>
              <p className="border-b border-n-200 pb-3 font-display text-label uppercase text-n-500">{group}</p>
              <ul className={cn('mt-3', compact ? 'grid grid-cols-2 gap-x-6' : single ? 'grid grid-cols-2 gap-x-14' : 'flex flex-col')}>
                {items.map((child) => {
                  const current = pathname === child.href
                  return (
                    <li key={child.id}>
                      <Link
                        href={child.href}
                        onClick={onNavigate}
                        aria-current={current ? 'page' : undefined}
                        className={cn(
                          'group/link flex flex-col justify-center',
                          compact ? 'min-h-11 py-1' : 'min-h-14 py-2.5',
                        )}
                      >
                        <span
                          className={cn(
                            'font-body italic text-n-900 underline-offset-[5px] decoration-1 group-hover/link:underline',
                            compact ? 'text-body-lg' : 'text-heading-md',
                            current && 'underline',
                          )}
                        >
                          {child.label}
                        </span>
                        {child.description ? (
                          <span className="mt-0.5 font-display text-body-sm text-n-500">{child.description}</span>
                        ) : null}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              {groupIndex === 0 && item.overviewLabel ? (
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 font-display text-label uppercase text-n-900 underline decoration-n-300 underline-offset-[6px] hover:decoration-n-900"
                >
                  {item.overviewLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </div>
          )
        })}

        {item.feature ? (
          <Link
            href={item.feature.href}
            onClick={onNavigate}
            className={cn('group/feature block', rise)}
            style={stagger(groups.length)}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-(--radius-media-sm) bg-n-200">
              {primed ? (
                <Photo
                  id={item.feature.photo as PhotoId}
                  alt={item.feature.alt}
                  reveal="none"
                  sizes="352px"
                  imgClassName="transition-transform duration-[1200ms] ease-(--ease-stage) group-hover/feature:scale-[1.04] motion-reduce:transition-none"
                />
              ) : null}
            </div>
            <p className="mt-4 font-display text-label uppercase text-n-500">{item.feature.eyebrow}</p>
            <p className="mt-1.5 font-body text-body-lg italic text-n-900 underline-offset-[5px] group-hover/feature:underline">
              {item.feature.title}
            </p>
          </Link>
        ) : null}
      </div>
    </div>
  )
}
