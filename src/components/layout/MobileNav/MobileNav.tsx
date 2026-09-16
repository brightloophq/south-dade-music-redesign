'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useId, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'

import { activeNavId, primaryCta, primaryNavigation } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { contactFacts } from '@/content/pages'
import { Button } from '@/components/ui/Button'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/lib/utils/cn'
import type { NavItem } from '@/types/navigation'

/**
 * Mobile navigation drawer.
 *
 * ## The room, not a dropdown
 *
 * A full-screen sheet in the stage register: the mark, the sections set large
 * in Newsreader italic like a printed programme, and the trial pinned to the
 * bottom where a thumb already is. Nothing about it is a shrunken desktop menu.
 *
 *  - **Accordion sections, never nested screens** — a parent never loses their
 *    place. The section that owns the current page opens by default.
 *  - **Expanding animates height** through `grid-template-rows`, so nothing
 *    jumps and no height is measured in script.
 *  - **The CTA and the phone number are always on screen** — the footer of the
 *    sheet does not scroll away with the list.
 *  - Entrance is an opacity lift with the rows rising in a short stagger;
 *    reduced motion gets the sheet with no movement.
 *  - **Focus is trapped while open and restored on close.** This is the one
 *    surface where trapping is correct: it is a modal dialog.
 *  - Closed, the sheet is `inert` rather than `hidden`, so it can animate out
 *    and `aria-controls` always resolves.
 *  - `data-lenis-prevent` hands wheel and touch back to the sheet, so smooth
 *    scrolling on the page can never scroll the page behind it.
 */
export function MobileNav({ className }: { className?: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(() => activeNavId(pathname))
  const [lastPathname, setLastPathname] = useState(pathname)
  const panelRef = useRef<HTMLDivElement>(null)
  const drawerId = useId()

  const close = useCallback(() => setOpen(false), [])

  /* Close on route change during render, never one frame late. */
  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    if (open) setOpen(false)
    setExpanded(activeNavId(pathname))
  }

  useLockBodyScroll(open)
  useFocusTrap(panelRef, open, { onEscape: close })

  const activeId = activeNavId(pathname)

  /*
    The sheet is portalled to <body>. Rendered inside the sticky header it would
    live in the header's stacking context, where any later fixed control at the
    same z-index — the sound toggle — paints over the dialog.
  */
  const isClient = useSyncExternalStore(subscribeNever, () => true, () => false)

  const sheet = (
    <div
      id={drawerId}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      tabIndex={-1}
      inert={!open}
      data-lenis-prevent
      data-register="house"
      data-open={open ? 'true' : 'false'}
      className={cn(
        'fixed inset-0 z-(--z-drawer) flex flex-col bg-stage-950 text-n-50 lg:hidden',
        'duration-(--duration-slow) ease-(--ease-stage) motion-reduce:transition-none',
        /* Visibility transitions only on close, so the focus trap can focus into the sheet on open. */
        open ? 'visible opacity-100 transition-opacity' : 'invisible opacity-0 transition-[opacity,visibility]',
      )}
    >
      {/* One warm source, house right — the same light as everywhere else. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 100% 0%, rgba(76,173,103,0.10), transparent 70%)',
        }}
      />

      <div className="relative flex h-16 shrink-0 items-center justify-between px-(--grid-margin)">
        <Link href="/" onClick={close} aria-label={`${siteConfig.shortName} — home`} className="flex h-11 items-center">
          <Image
            src="/brand/south-dade-music-light.png"
            alt=""
            width={720}
            height={428}
            sizes="80px"
            className="h-full w-auto"
          />
        </Link>
        <button
          type="button"
          onClick={close}
          aria-label="Close menu"
          className="inline-flex size-11 items-center justify-center text-n-50"
        >
          <span aria-hidden="true" className="relative block size-5">
            <span className="absolute left-0 top-1/2 block h-px w-full rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 block h-px w-full -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto overscroll-contain px-(--grid-margin) pb-8 pt-4">
        <ul>
          {primaryNavigation.map((item, index) => (
            <li
              key={item.id}
              className={cn(
                'border-b border-stage-700',
                'transition-[opacity,transform] duration-(--duration-slower) ease-(--ease-stage) motion-reduce:transition-none',
                open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
              )}
              style={{ transitionDelay: open ? `${90 + index * 50}ms` : '0ms' }}
            >
              {item.children?.length ? (
                <DrawerSection
                  item={item}
                  idBase={drawerId}
                  expanded={expanded === item.id}
                  active={activeId === item.id}
                  pathname={pathname}
                  onToggle={() => setExpanded((current) => (current === item.id ? null : item.id))}
                  onNavigate={close}
                />
              ) : (
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={activeId === item.id ? 'page' : undefined}
                  className={cn(
                    'flex min-h-16 items-center font-body text-[1.75rem] italic leading-none',
                    activeId === item.id ? 'text-n-0' : 'text-n-100',
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={cn(
          'relative shrink-0 border-t border-stage-700 bg-stage-950 px-(--grid-margin) pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5',
          'transition-[opacity,transform] duration-(--duration-slower) ease-(--ease-stage) motion-reduce:transition-none',
          open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
        )}
        style={{ transitionDelay: open ? '260ms' : '0ms' }}
      >
        <Button
          href={primaryCta.href}
          variant="primary"
          size="xl"
          fullWidth
          price={primaryCta.priceSuffix ?? undefined}
          onClick={close}
        >
          {primaryCta.label}
        </Button>
        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-display text-body-sm text-(--color-ash)">
          <a href={contactFacts.phoneHref} className="inline-flex min-h-11 items-center hover:text-n-50">
            {contactFacts.phoneDisplay}
          </a>
          <a href={`mailto:${contactFacts.email}`} className="inline-flex min-h-11 items-center hover:text-n-50">
            {contactFacts.email}
          </a>
        </p>
      </div>
    </div>
  )

  return (
    <div className={cn('lg:hidden', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={drawerId}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center text-(--color-text-primary)"
      >
        <span aria-hidden="true" className="flex w-6 flex-col gap-[7px]">
          <span className="block h-px w-full bg-current" />
          <span className="block h-px w-full bg-current" />
        </span>
      </button>
      {isClient ? createPortal(sheet, document.body) : null}
    </div>
  )
}

const subscribeNever = () => () => {}

function DrawerSection({
  item,
  idBase,
  expanded,
  active,
  pathname,
  onToggle,
  onNavigate,
}: {
  item: NavItem
  idBase: string
  expanded: boolean
  active: boolean
  pathname: string
  onToggle: () => void
  onNavigate: () => void
}) {
  const children = item.children ?? []
  const groups = Array.from(new Set(children.map((child) => child.group ?? item.label)))
  const regionId = `${idBase}-${item.id}`

  return (
    <>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={regionId}
        onClick={onToggle}
        className={cn(
          'flex min-h-16 w-full items-center justify-between text-left font-body text-[1.75rem] italic leading-none',
          active ? 'text-n-0' : 'text-n-100',
        )}
      >
        {item.label}
        <span aria-hidden="true" className="relative block size-3.5 text-spot-500">
          <span className="absolute left-0 top-1/2 block h-px w-full bg-current" />
          <span
            className={cn(
              'absolute left-0 top-1/2 block h-px w-full bg-current transition-transform duration-(--duration-base) ease-(--ease-stage) motion-reduce:transition-none',
              expanded ? 'rotate-0' : 'rotate-90',
            )}
          />
        </span>
      </button>

      <div
        id={regionId}
        inert={!expanded}
        className={cn(
          'grid transition-[grid-template-rows] duration-(--duration-slow) ease-(--ease-stage) motion-reduce:transition-none',
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-6">
            {groups.map((group) => {
              const items = children.filter((child) => (child.group ?? item.label) === group)
              const compact = items.every((child) => !child.description)
              return (
                <div key={group} className="mt-2 first:mt-0">
                  {groups.length > 1 ? (
                    <p className="pb-1 pt-3 font-display text-label uppercase text-(--color-ash)">{group}</p>
                  ) : null}
                  <ul className={compact ? 'grid grid-cols-2 gap-x-4' : undefined}>
                    {items.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={child.href}
                          onClick={onNavigate}
                          aria-current={pathname === child.href ? 'page' : undefined}
                          className="flex min-h-12 flex-col justify-center py-1.5"
                        >
                          <span
                            className={cn(
                              'font-display text-body-lg text-n-50 underline-offset-4',
                              pathname === child.href && 'underline',
                            )}
                          >
                            {child.label}
                          </span>
                          {child.description ? (
                            <span className="font-display text-body-sm text-(--color-ash)">{child.description}</span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
            <Link
              href={item.href}
              onClick={onNavigate}
              className="mt-3 inline-flex min-h-11 items-center gap-2 font-display text-label uppercase text-n-50 underline decoration-stage-600 underline-offset-[6px]"
            >
              {item.overviewLabel ?? `All ${item.label}`}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
