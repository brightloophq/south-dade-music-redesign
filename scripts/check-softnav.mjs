#!/usr/bin/env node
/**
 * Soft-navigation regression probe.
 *
 * ## Why this exists
 *
 * Every other check in this repository navigates with `page.goto()`, which is a
 * full document load. A full load destroys the whole document, so React never
 * performs a reconciled unmount — and an entire class of bug is therefore
 * invisible to the suite.
 *
 * One of those bugs shipped. GSAP ScrollTrigger implements `pin: true` by
 * wrapping the pinned element in a `pin-spacer` div. Two of the homepage film's
 * sections are pinned, so their real DOM parent stopped being the one React had
 * recorded. On the first client-side navigation off the homepage React called
 * `main.removeChild(section)` and the browser threw:
 *
 *     NotFoundError: Failed to execute 'removeChild' on 'Node'
 *
 * It fired in development and in production, on every route reachable from the
 * homepage. `check:a11y` reported 27/27 passing throughout, because it only ever
 * did document loads. The site's own dev log had been recording the error for
 * days.
 *
 * ## What this does differently
 *
 * It clicks **real rendered `<Link>` anchors**, which is what a visitor does and
 * the only way to exercise React's unmount path.
 *
 * ⚠️ A synthetic `document.createElement('a')` + `.click()` does NOT work here:
 * a plain anchor triggers a full document load and silently passes. The links
 * must be ones Next.js rendered and hydrated.
 *
 * ## What it asserts, per hop
 *
 *   1. no `pageerror`
 *   2. no `console.error`
 *   3. no Next.js dev error overlay
 *   4. the destination visibly renders (real text, exactly one h1)
 *
 * Plus: after navigating back to `/`, the film must re-initialise — both pins
 * rebuilt, and the pinned sections sitting inside their React-owned wrappers.
 *
 * ## Usage
 *
 *   npm run dev                                     # or build && start
 *   npm run check:softnav                           # defaults to :3000
 *   npm run check:softnav http://localhost:3200
 *
 * Requires a system Chrome or Edge, same as `check:a11y` and `probe:motion`.
 * Exits non-zero on any failure.
 */

import process from 'node:process'

import { chromium } from 'playwright-core'

const BASE = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? 'http://localhost:3000'

/**
 * The hops that matter.
 *
 * The first four leave the homepage, which is the only route with pinned
 * sections and therefore the only one that ever failed. The last two are
 * interior-to-interior controls: they were always clean, and if they ever break
 * the cause is something other than the pins.
 */
const HOPS = [
  { from: '/', to: '/programs' },
  { from: '/', to: '/lessons' },
  { from: '/', to: '/contact' },
  { from: '/', to: '/piano-lessons' },
  { from: '/programs', to: '/lessons' },
  { from: '/lessons', to: '/piano-lessons' },
]

const line = (s = '') => process.stdout.write(s + '\n')
const rule = (c = '─') => line(c.repeat(72))

let failures = 0

/** The dev overlay, not the always-present `nextjs-portal` host element. */
async function errorOverlay(page) {
  return page.evaluate(() => {
    for (const portal of document.querySelectorAll('nextjs-portal')) {
      const root = portal.shadowRoot
      if (!root) continue
      const dialog =
        root.querySelector('[data-nextjs-dialog]') ||
        root.querySelector('[data-nextjs-error-overlay]') ||
        root.querySelector('[role="dialog"]')
      if (!dialog) continue
      const text = (dialog.textContent || '').replace(/\s+/g, ' ').trim()
      if (/error/i.test(text)) return text.slice(0, 200)
    }
    return null
  })
}

const filmState = (page) =>
  page.evaluate(() => {
    const walk = document.querySelector('[data-film="walk"]')
    const release = document.querySelector('[data-film="release"]')
    const wrapped = (el) => {
      if (!el) return 'absent'
      const parent = el.parentElement
      if (!parent) return 'detached'
      // Either React's wrapper, or GSAP's spacer sitting inside that wrapper.
      if (parent.classList.contains('pin-spacer')) {
        return parent.parentElement?.tagName === 'DIV' ? 'pin-spacer in wrapper' : 'pin-spacer at top level'
      }
      return parent.tagName === 'DIV' ? 'wrapper' : parent.tagName.toLowerCase()
    }
    return {
      spacers: document.querySelectorAll('.pin-spacer').length,
      walk: wrapped(walk),
      release: wrapped(release),
    }
  })

async function clickLink(page, href) {
  const links = page.locator(`a[href="${href}"]:visible`)
  if (!(await links.count())) return { ok: false, why: `no visible <a href="${href}"> on ${new URL(page.url()).pathname}` }
  const link = links.first()
  try {
    await link.scrollIntoViewIfNeeded({ timeout: 5000 })
    await link.click({ timeout: 5000 })
  } catch (error) {
    return { ok: false, why: `click failed: ${String(error).split('\n')[0]}` }
  }
  await page.waitForTimeout(1600)
  return { ok: true }
}

const browser = await chromium.launch({ channel: 'chrome' })

line()
rule('═')
line('  SOFT-NAVIGATION REGRESSION')
line(`  ${BASE}`)
rule('═')
line()
line('  Clicking real rendered <Link> anchors. A full document load would')
line('  pass this test without exercising React’s unmount path at all.')
line()

for (const hop of HOPS) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  const pageErrors = []
  const consoleErrors = []
  page.on('pageerror', (e) => pageErrors.push(e.message.split('\n')[0]))
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text().split('\n')[0])
  })

  await page.goto(BASE + hop.from, { waitUntil: 'load' })
  // The film builds asynchronously — imports, then fonts, then timelines.
  await page.waitForTimeout(hop.from === '/' ? 2600 : 1400)

  const before = hop.from === '/' ? await filmState(page) : null

  const clicked = await clickLink(page, hop.to)
  const landed = new URL(page.url()).pathname
  const overlay = await errorOverlay(page)
  const rendered = await page.evaluate(() => {
    const main = document.querySelector('main')
    return { words: (main?.innerText || '').trim().split(/\s+/).filter(Boolean).length, h1: document.querySelectorAll('h1').length }
  })

  const problems = []
  if (!clicked.ok) problems.push(clicked.why)
  if (landed !== hop.to) problems.push(`landed on ${landed}`)
  if (pageErrors.length) problems.push(`pageerror: ${pageErrors[0]}`)
  if (consoleErrors.length) problems.push(`console.error: ${consoleErrors[0]}`)
  if (overlay) problems.push(`error overlay: ${overlay}`)
  if (rendered.words < 40) problems.push(`destination rendered only ${rendered.words} words`)
  if (rendered.h1 !== 1) problems.push(`${rendered.h1} h1 elements`)

  const label = `${hop.from} → ${hop.to}`.padEnd(30)
  if (problems.length) {
    failures++
    line(`  ✗ ${label} ${rendered.words}w`)
    for (const p of problems) line(`      ${p}`)
  } else {
    line(`  ✓ ${label} ${String(rendered.words).padStart(4)}w, 1 h1${before ? `   (left / with ${before.spacers} pins, walk in ${before.walk})` : ''}`)
  }

  await context.close()
}

// --- Return to the homepage: the film must build again from scratch. --------
line()
rule()
line('  RETURN TO / — the film must re-initialise')
rule()

{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  const pageErrors = []
  page.on('pageerror', (e) => pageErrors.push(e.message.split('\n')[0]))
  page.on('console', (m) => {
    if (m.type() === 'error') pageErrors.push('console: ' + m.text().split('\n')[0])
  })

  await page.goto(BASE + '/', { waitUntil: 'load' })
  await page.waitForTimeout(2600)
  const first = await filmState(page)

  await clickLink(page, '/programs')
  const away = await filmState(page)

  await clickLink(page, '/')
  await page.waitForTimeout(2600)
  const back = await filmState(page)

  // Exercise the rebuilt pins.
  await page.evaluate(async () => {
    for (let y = 0; y < 7000; y += 600) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 40))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(600)

  const problems = []
  if (first.spacers !== 2) problems.push(`first visit built ${first.spacers} pins, expected 2`)
  if (away.spacers !== 0) problems.push(`${away.spacers} pin-spacers survived leaving the homepage`)
  if (back.spacers !== 2) problems.push(`return visit rebuilt ${back.spacers} pins, expected 2`)
  if (!/wrapper/.test(back.walk)) problems.push(`walk section is not inside its React wrapper (${back.walk})`)
  if (!/wrapper/.test(back.release)) problems.push(`release section is not inside its React wrapper (${back.release})`)
  if (pageErrors.length) problems.push(`errors during round trip: ${pageErrors[0]}`)

  line(`  first visit : ${first.spacers} pins · walk ${first.walk} · release ${first.release}`)
  line(`  after leave : ${away.spacers} pins (spacers must be fully reverted)`)
  line(`  on return   : ${back.spacers} pins · walk ${back.walk} · release ${back.release}`)

  if (problems.length) {
    failures++
    line()
    for (const p of problems) line(`  ✗ ${p}`)
  } else {
    line()
    line('  ✓ film torn down and rebuilt cleanly, pins inside their wrappers')
  }

  await context.close()
}

await browser.close()

line()
rule('═')
if (failures) {
  line(`  ${failures} FAILURE(S)`)
  rule('═')
  process.exit(1)
}
line('  ALL SOFT-NAVIGATION CHECKS PASS')
line()
line('  Verified: React unmounts the pinned film without a removeChild fault ·')
line('  every destination renders · the film rebuilds on return.')
rule('═')
line()
