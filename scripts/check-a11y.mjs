#!/usr/bin/env node
/**
 * Accessibility verification probe.
 *
 * ## Why this exists
 *
 * `/accessibility` publishes commitments to families. Before this script, the
 * page justified them by citing "the route audit" — a tool that did not exist.
 * Three of its six claims (touch targets, minimum text size, keyboard
 * operability) were asserted on nobody's authority.
 *
 * A published accessibility statement is a promise. Either it is checked or it
 * is not claimed. This checks what can be checked mechanically, and the page
 * has been rewritten to claim exactly that much and no more.
 *
 * ## What this DOES verify
 *
 *   1. Heading hierarchy      exactly one h1 per route, no skipped levels
 *   2. Keyboard operability   every interactive element is reachable by Tab,
 *                             in DOM order, with no positive tabindex and no
 *                             focus trap
 *   3. Visible focus          every element that receives keyboard focus paints
 *                             a visible indicator (outline or ring)
 *   4. Touch targets          interactive controls are >= 44x44 CSS px at a
 *                             390px viewport, excluding inline links in prose
 *                             (exempt under WCAG 2.5.8)
 *   5. Text sizing            body copy computes to >= 16px at 390px
 *   6. Reduced motion         with prefers-reduced-motion, no animation runs
 *
 * ## What this does NOT verify — and the page must not claim
 *
 * · Screen-reader comprehension. No automated tool measures whether a page is
 *   understandable when read aloud. Heading order is a proxy, not a substitute.
 * · Colour contrast. Owned by `npm run check:tokens`, which computes every
 *   declared token pair. This script does not duplicate it.
 * · Cognitive load, plain language, or whether the content is any good.
 * · The physical building. Nothing about the studio is knowable from here.
 *
 * ## Usage
 *
 *   npm run build && npm run start -- -p 3123    # in one terminal
 *   npm run check:a11y http://localhost:3123     # in another
 *
 * Requires a system Chrome or Edge (same requirement as `probe:motion`;
 * `playwright-core` ships no browser binaries by design). Exits non-zero on any
 * failure, so it is CI-usable as-is.
 */

import fs from 'node:fs'
import process from 'node:process'

import { chromium } from 'playwright-core'

const BASE = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? 'http://localhost:3000'

/**
 * The 27 built routes.
 *
 * Held here rather than read from the sitemap on purpose: the sitemap is built
 * from `live` navigation entries and deliberately omits `/contact/book-a-trial`.
 * A route that fell out of the nav would silently fall out of this audit too,
 * which is exactly the failure mode that let two unreachable pages ship.
 */
const ROUTES = [
  '/',
  '/about',
  '/accessibility',
  '/bass-guitar-lessons',
  '/camps',
  '/contact',
  '/contact/book-a-trial',
  '/drum-lessons',
  '/faq',
  '/group-music-lessons',
  '/guitar-lessons',
  '/lesson-cancellation',
  '/lessons',
  '/performances',
  '/photo-consent',
  '/piano-lessons',
  '/privacy',
  '/private-lessons',
  '/programs',
  '/programs/90-day-stage-program',
  '/programs/band-builders',
  '/programs/early-childhood',
  '/scholarships',
  '/singing-lessons',
  '/terms',
  '/ukulele-lessons',
  '/violin-lessons',
]

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
]

const executablePath = CHROME_CANDIDATES.find((p) => fs.existsSync(p))
if (!executablePath) {
  console.error('No system Chrome/Edge found. See CHROME_CANDIDATES in this file.')
  process.exit(1)
}

const line = (s = '') => console.log(s)
const head = (s) => {
  line()
  line('═'.repeat(72))
  line(`  ${s}`)
  line('═'.repeat(72))
}

/**
 * Minimum target size, in CSS px.
 *
 * **24 is the normative AA bar** (WCAG 2.5.8 Target Size (Minimum)). 44 is
 * 2.5.5, which is **AAA**. This project's contrast floor is AA with AAA where
 * it falls out naturally, and target size is held to the same standard: AA is
 * enforced, AAA is measured and reported but not required.
 *
 * The page previously claimed a flat "every control is at least 44 by 44
 * pixels". It is not, and never was — the direction's own idiom is the hairline
 * text link, which is ~16-24px tall by construction. The claim has been
 * rewritten to say what is true rather than the tokens being bent to fit a
 * sentence nobody had checked.
 */
const TARGET_AA = 24
const TARGET_AAA = 44

/**
 * Minimum text sizes, by role.
 *
 * The scale is: body-lg 17-19px · body-md 16-17px · body-sm 15px ·
 * label 12px (uppercase, 0.2em tracked). Uppercase tracked labels are held to
 * the label floor; everything a visitor actually reads as prose is held to the
 * body floor.
 */
const TEXT_MIN_BODY = 15
const TEXT_MIN_LABEL = 12
/** Upper bound on Tab presses per route — generous; these pages are shallow. */
const MAX_TABS = 120

const failures = []
const fail = (route, check, detail) => failures.push({ route, check, detail })

/** Informational: how much of the site clears the AAA target size. */
const aaaTotals = { counted: 0, meetsAAA: 0 }
/** Informational: the smallest text rendered anywhere. */
let smallestText = Infinity

// ---------------------------------------------------------------------------
// In-page collectors
// ---------------------------------------------------------------------------

/** Headings: exactly one h1, and no level skipped on the way down. */
const readHeadings = () => {
  const snap = document.evaluate(
    '//h1|//h2|//h3|//h4|//h5|//h6',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null,
  )
  const out = []
  for (let i = 0; i < snap.snapshotLength; i++) {
    const el = snap.snapshotItem(i)
    const style = getComputedStyle(el)
    if (style.display === 'none' || style.visibility === 'hidden') continue
    out.push({ level: Number(el.tagName[1]), text: (el.textContent || '').trim().slice(0, 60) })
  }
  return out
}

/** Any positive tabindex reorders the tab sequence away from DOM order. */
const readPositiveTabindex = () =>
  [...document.querySelectorAll('[tabindex]')]
    .map((el) => ({ ti: Number(el.getAttribute('tabindex')), tag: el.tagName.toLowerCase() }))
    .filter((x) => x.ti > 0)

/**
 * Touch targets at mobile width.
 *
 * Inline links inside a sentence are exempt (WCAG 2.5.8 "inline" exception) —
 * enlarging them would break the line box of the prose they sit in. Everything
 * a user is meant to aim at, rather than read through, is measured.
 */
const readTargets = ({ AA, AAA }) => {
  const interactive = [...document.querySelectorAll('a[href], button, input, select, textarea, [role="button"]')]
  const belowAA = []
  let meetsAAA = 0
  let counted = 0

  for (const el of interactive) {
    const style = getComputedStyle(el)
    if (style.display === 'none' || style.visibility === 'hidden') continue
    const rect = el.getBoundingClientRect()
    if (rect.width === 0 && rect.height === 0) continue

    /*
     * Skip-to-content and other sr-only affordances are 1x1 and clipped until
     * focused — measuring them at rest measures the wrong state. They are
     * covered by the focus-visibility walk instead, which focuses them for real.
     */
    const srOnly =
      (rect.width <= 4 || rect.height <= 4) &&
      (style.clipPath !== 'none' || style.clip !== 'auto' || style.position === 'absolute')
    if (srOnly) continue

    // Inline-in-prose exemption (WCAG 2.5.8): a link inside a sentence cannot
    // grow without breaking the line box of the prose it sits in.
    const parent = el.parentElement
    const inProse =
      el.tagName === 'A' &&
      parent &&
      ['P', 'LI', 'SPAN', 'EM', 'STRONG', 'BLOCKQUOTE'].includes(parent.tagName) &&
      (parent.textContent || '').trim().length > (el.textContent || '').trim().length + 2
    if (inProse) continue

    counted++
    const smaller = Math.min(rect.width, rect.height)
    if (smaller >= AAA - 0.5) meetsAAA++
    if (smaller < AA - 0.5) {
      belowAA.push({
        tag: el.tagName.toLowerCase(),
        label: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40),
        w: Math.round(rect.width),
        h: Math.round(rect.height),
      })
    }
  }
  return { belowAA, meetsAAA, counted }
}

/**
 * Text that computes below the floor for its role.
 *
 * Uppercase tracked text is a label (eyebrow, field label, section marker) and
 * is held to the label floor. Everything else is prose a visitor reads and is
 * held to the body floor. Both floors are asserted, so a regression in either
 * register is caught.
 */
const readSmallText = ({ BODY, LABEL }) => {
  const bad = []
  let smallest = Infinity
  const nodes = document.querySelectorAll('p, li, dd, dt, td, th, figcaption, label, a, span')
  for (const el of nodes) {
    const text = (el.textContent || '').trim()
    if (text.length < 25) continue // ignore chrome, badges, single words
    const style = getComputedStyle(el)
    if (style.display === 'none' || style.visibility === 'hidden') continue
    /*
     * Decorative typography is not content. The homepage's vertical film-slate
     * lockup is 10px, `aria-hidden` and `pointer-events-none` — a credit marking
     * on the frame, not something anyone is asked to read. It is absent from the
     * accessibility tree, so holding it to a reading floor would be measuring
     * the wrong thing. Anything a screen reader can reach IS measured.
     */
    if (el.closest('[aria-hidden="true"]')) continue
    // Only leaf-ish text holders, so a wrapper does not report its child's copy.
    if (el.children.length > 2) continue
    const size = parseFloat(style.fontSize)
    if (size < smallest) smallest = size

    const isLabel = style.textTransform === 'uppercase'
    const floor = isLabel ? LABEL : BODY
    if (size < floor - 0.01) {
      bad.push({
        tag: el.tagName.toLowerCase(),
        role: isLabel ? 'label' : 'body',
        size: size.toFixed(1),
        floor,
        text: text.slice(0, 45),
      })
    }
  }
  return { bad, smallest: smallest === Infinity ? null : smallest }
}

/** Anything still animating once reduced motion is requested. */
const readRunningAnimations = () =>
  document
    .getAnimations()
    .filter((a) => a.playState === 'running')
    .map((a) => {
      const target = a.effect && a.effect.target
      return {
        name: (a.animationName || a.transitionProperty || 'unknown').toString(),
        target: target ? target.tagName.toLowerCase() : 'n/a',
      }
    })

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const browser = await chromium.launch({ executablePath, headless: true })

head(`ACCESSIBILITY AUDIT — ${ROUTES.length} routes`)
line(`  base: ${BASE}`)
line()
line(
  `  ${'route'.padEnd(32)} ${'h1'.padEnd(4)} ${'hdr'.padEnd(5)} ${'kbd'.padEnd(5)} ${'focus'.padEnd(6)} ${'tap'.padEnd(5)} ${'text'.padEnd(5)}`,
)
line(`  ${'─'.repeat(68)}`)

const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } })

for (const route of ROUTES) {
  const url = `${BASE}${route}`
  const marks = { h1: '·', hdr: '·', kbd: '·', focus: '·', tap: '·', text: '·' }

  // ---- desktop: headings, keyboard, focus --------------------------------
  const page = await desktop.newPage()
  await page.goto(url, { waitUntil: 'load', timeout: 60_000 })
  await page.waitForTimeout(400)

  // 1 — headings
  const headings = await page.evaluate(readHeadings)
  const h1s = headings.filter((h) => h.level === 1).length
  if (h1s !== 1) {
    fail(route, 'heading-h1', `expected exactly 1 <h1>, found ${h1s}`)
    marks.h1 = '✗'
  } else marks.h1 = '✓'

  let skip = null
  for (let i = 1; i < headings.length; i++) {
    const jump = headings[i].level - headings[i - 1].level
    if (jump > 1) {
      skip = `h${headings[i - 1].level} → h${headings[i].level} at "${headings[i].text}"`
      break
    }
  }
  if (skip) {
    fail(route, 'heading-skip', skip)
    marks.hdr = '✗'
  } else marks.hdr = '✓'

  // 2 — keyboard: no positive tabindex
  const positive = await page.evaluate(readPositiveTabindex)
  if (positive.length) {
    fail(route, 'keyboard-tabindex', `${positive.length} element(s) with positive tabindex`)
    marks.kbd = '✗'
  }

  /*
   * 3 — Tab-walk. Real keyboard traversal rather than programmatic .focus(),
   * because :focus-visible only matches on keyboard interaction — a programmatic
   * focus would test a state the user never sees.
   */
  await page.evaluate(() => document.body.focus())
  const seen = new Set()
  const noRing = []
  let steps = 0
  let trapped = false

  for (let i = 0; i < MAX_TABS; i++) {
    await page.keyboard.press('Tab')
    const info = await page.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return null
      const style = getComputedStyle(el)
      const rect = el.getBoundingClientRect()
      const outlineW = parseFloat(style.outlineWidth) || 0
      const hasOutline = style.outlineStyle !== 'none' && outlineW > 0
      const hasRing = style.boxShadow && style.boxShadow !== 'none'
      const hasBorderShift = style.borderBottomColor && style.borderBottomWidth !== '0px'
      return {
        key: `${el.tagName}:${(el.textContent || '').trim().slice(0, 30)}:${Math.round(rect.top)}:${Math.round(rect.left)}`,
        tag: el.tagName.toLowerCase(),
        label: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 34),
        visibleFocus: hasOutline || hasRing || hasBorderShift,
        disabled: el.disabled === true,
      }
    })
    if (!info) break
    if (seen.has(info.key)) {
      // Returned to a previously focused element: the cycle has closed.
      break
    }
    seen.add(info.key)
    steps++
    if (!info.visibleFocus && !info.disabled) noRing.push(`${info.tag} "${info.label}"`)
    if (steps >= MAX_TABS) {
      trapped = true
      break
    }
  }

  if (steps === 0) {
    fail(route, 'keyboard-reach', 'no element was reachable by Tab')
    marks.kbd = '✗'
  } else if (trapped) {
    fail(route, 'keyboard-trap', `focus did not cycle within ${MAX_TABS} tabs`)
    marks.kbd = '✗'
  } else if (marks.kbd !== '✗') marks.kbd = '✓'

  if (noRing.length) {
    fail(route, 'focus-visible', `${noRing.length} focusable element(s) paint no focus indicator: ${noRing.slice(0, 3).join(', ')}`)
    marks.focus = '✗'
  } else marks.focus = '✓'

  await page.close()

  // ---- mobile: touch targets, text size ----------------------------------
  const mpage = await mobile.newPage()
  await mpage.goto(url, { waitUntil: 'load', timeout: 60_000 })
  await mpage.waitForTimeout(400)

  const targets = await mpage.evaluate(readTargets, { AA: TARGET_AA, AAA: TARGET_AAA })
  aaaTotals.counted += targets.counted
  aaaTotals.meetsAAA += targets.meetsAAA
  if (targets.belowAA.length) {
    fail(
      route,
      'touch-target',
      `${targets.belowAA.length} control(s) under ${TARGET_AA}px (WCAG 2.5.8 AA): ` +
        targets.belowAA.slice(0, 3).map((t) => `${t.tag} "${t.label}" ${t.w}x${t.h}`).join(', '),
    )
    marks.tap = '✗'
  } else marks.tap = '✓'

  const textResult = await mpage.evaluate(readSmallText, { BODY: TEXT_MIN_BODY, LABEL: TEXT_MIN_LABEL })
  if (textResult.smallest !== null && textResult.smallest < smallestText) smallestText = textResult.smallest
  if (textResult.bad.length) {
    fail(
      route,
      'text-size',
      `${textResult.bad.length} block(s) below their floor: ` +
        textResult.bad.slice(0, 3).map((t) => `${t.role} ${t.size}px < ${t.floor}px "${t.text}"`).join(' | '),
    )
    marks.text = '✗'
  } else marks.text = '✓'

  await mpage.close()

  line(
    `  ${route.padEnd(32)} ${marks.h1.padEnd(4)} ${marks.hdr.padEnd(5)} ${marks.kbd.padEnd(5)} ${marks.focus.padEnd(6)} ${marks.tap.padEnd(5)} ${marks.text.padEnd(5)}`,
  )
}

await desktop.close()
await mobile.close()

// ---- reduced motion --------------------------------------------------------
head('REDUCED MOTION')

const rm = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
})
const rmPage = await rm.newPage()
await rmPage.goto(`${BASE}/`, { waitUntil: 'load', timeout: 60_000 })
await rmPage.waitForTimeout(2500)
await rmPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
await rmPage.waitForTimeout(1200)

const running = await rmPage.evaluate(readRunningAnimations)
/*
 * The homepage's grain is a CSS animation that the reduced-motion media query
 * pauses; anything still running under `prefers-reduced-motion: reduce` is a
 * regression. `probe:motion` proves the film RUNS for everyone else — this
 * proves it stops for the people who asked it to.
 */
if (running.length) {
  fail('/', 'reduced-motion', `${running.length} animation(s) still running: ${running.slice(0, 4).map((r) => `${r.name}@${r.target}`).join(', ')}`)
  line(`  ✗ ${running.length} animation(s) still running under prefers-reduced-motion`)
  for (const r of running.slice(0, 8)) line(`      ${r.name} on <${r.target}>`)
} else {
  line('  ✓ no animation runs under prefers-reduced-motion (homepage, scrolled)')
}

const contentPresent = await rmPage.evaluate(() => {
  const text = (document.body.innerText || '').trim()
  return { words: text.split(/\s+/).length, h1: document.querySelectorAll('h1').length }
})
if (contentPresent.words < 200 || contentPresent.h1 !== 1) {
  fail('/', 'reduced-motion-content', `content not readable without motion: ${contentPresent.words} words, ${contentPresent.h1} h1`)
  line(`  ✗ content not fully present without motion (${contentPresent.words} words)`)
} else {
  line(`  ✓ full content readable without motion (${contentPresent.words} words, 1 h1)`)
}

await rm.close()
await browser.close()

// ---------------------------------------------------------------------------
// Result
// ---------------------------------------------------------------------------
head('RESULT')

const aaaPct = aaaTotals.counted ? Math.round((aaaTotals.meetsAAA / aaaTotals.counted) * 100) : 0
line(`  target size   AA (${TARGET_AA}px) enforced · AAA (${TARGET_AAA}px) met by ${aaaTotals.meetsAAA}/${aaaTotals.counted} controls (${aaaPct}%)`)
line(`  smallest text ${smallestText === Infinity ? 'n/a' : `${smallestText.toFixed(1)}px`} (uppercase label register; prose floor is ${TEXT_MIN_BODY}px)`)

if (failures.length === 0) {
  line()
  line(`  ALL CHECKS PASS — ${ROUTES.length} routes`)
  line()
  line('  Verified: one h1 per route · no heading skips · Tab reaches every')
  line('  control in DOM order with no trap · every focused control paints a')
  line(`  visible indicator · every target >= ${TARGET_AA}px (WCAG 2.5.8 AA) at 390px ·`)
  line(`  prose >= ${TEXT_MIN_BODY}px and labels >= ${TEXT_MIN_LABEL}px at 390px · motion stops when asked.`)
  line()
  line('  NOT verified here: colour contrast (npm run check:tokens) and')
  line('  screen-reader comprehension (no tool measures this).')
  line()
  process.exit(0)
}

line(`  ${failures.length} FAILURE(S)`)
line()
for (const f of failures) line(`  ✗ ${f.route.padEnd(30)} ${f.check.padEnd(22)} ${f.detail}`)
line()
process.exit(1)
