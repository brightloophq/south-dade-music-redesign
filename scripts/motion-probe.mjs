#!/usr/bin/env node
/**
 * Motion runtime probe — development diagnostic tool.
 *
 * Drives the homepage in a real headless Chrome and asserts the direction — the
 * eight named timelines, that nothing is pinned, the letterbox and grain present
 * over the opening and gone at the first light section, the header turning from
 * overlay to solid on the same beat, and the week counter walking to 12.
 *
 * It samples the direction's own instruments rather than generic scroll
 * effects, so a regression in any of them is a regression in the direction.
 *
 * This exists because three consecutive phases passed typecheck, lint and build
 * while the motion layer was silently disabled at runtime. A static check
 * cannot see an unregistered GSAP plugin or a capability gate that resolved to
 * `false`. This can.
 *
 * ## Usage
 *
 *   npm run dev                    # in one terminal
 *   npm run probe:motion           # in another
 *   npm run probe:motion http://localhost:3001/   # or against any URL
 *
 * Exits non-zero if any assertion fails, so it is CI-usable as-is.
 *
 * ## Requirements
 *
 * · **A system Chrome or Edge install.** This uses `playwright-core`, which
 *   ships NO browser binaries — deliberately, to avoid a ~150MB download in a
 *   project that needs a browser for one diagnostic script. The paths searched
 *   are listed in CHROME_CANDIDATES below; add one if your install differs.
 * · **`NEXT_PUBLIC_MOTION_DEBUG=true` in `.env.local`**, and a non-production
 *   NODE_ENV. Without it the diagnostics bridge is compiled out and the probe
 *   reports "diagnostics unavailable" — which is correct behaviour, not a bug.
 *
 * ## Why this exists
 *
 * Phases 5E, 5F and 6 each declared success on typecheck + lint + build. All
 * three passed while the motion layer was silently disabled at runtime. A
 * static check cannot see an unregistered GSAP plugin, a capability gate that
 * resolved to false on ordinary hardware, or a colour ramp whose only caller
 * was deleted. This can.
 */

import fs from 'node:fs'
import process from 'node:process'

import { chromium } from 'playwright-core'

const argv = process.argv.slice(2)

/**
 * `--production` inverts what this script is checking.
 *
 * In development it proves the film RUNS, reading the diagnostics store the
 * debug panel publishes. In production that store is compiled away on purpose,
 * so those assertions are unrunnable by design — asserting them would be
 * asserting the feature is broken. Instead it proves the film runs ANYWAY,
 * with no panel, no globals and a silent console: the delivery contract.
 */
const PRODUCTION_MODE = argv.includes('--production')
const URL_UNDER_TEST = argv.find((a) => !a.startsWith('--')) ?? 'http://localhost:3000/'

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
  console.error('No system Chrome/Edge found.')
  process.exit(1)
}

const line = (s = '') => console.log(s)
const head = (s) => {
  line()
  line('═'.repeat(64))
  line(`  ${s}`)
  line('═'.repeat(64))
}

const browser = await chromium.launch({ executablePath, headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

// ---------------------------------------------------------------------------
// Collect everything the browser tells us
// ---------------------------------------------------------------------------
const consoleErrors = []
const consoleWarnings = []
const pageErrors = []
const requests = []
const failedResponses = []

page.on('console', (msg) => {
  const type = msg.type()
  if (type === 'error') consoleErrors.push(msg.text())
  if (type === 'warning') consoleWarnings.push(msg.text())
})
page.on('pageerror', (err) => pageErrors.push(err.message))
page.on('response', (res) => {
  const url = res.url()
  if (/\.(jpe?g|png|avif|webp)(\?|$)/i.test(url) || url.includes('/_next/image')) {
    requests.push({ url, status: res.status() })
  }
  /*
   * A bare "404 (Not Found)" in the console names nothing, which is useless.
   * Recording the URL is what surfaced the dead /contact/book-a-trial CTA —
   * the homepage's primary conversion link pointing at an unbuilt route.
   */
  if (res.status() >= 400) {
    failedResponses.push(`${res.status()} ${url.replace(/\?_rsc=.*$/, '  (RSC route prefetch)')}`)
  }
})

head('LOADING')
await page.goto(URL_UNDER_TEST, { waitUntil: 'load', timeout: 60_000 })
line(`  ${URL_UNDER_TEST}`)

/*
 * Wait for the director's own ready signal rather than `networkidle`.
 *
 * `networkidle` never settles on this page — the scrub timelines keep the main
 * thread busy enough that Playwright's heuristic never sees a quiet window, so
 * it just burned the full 60s timeout. `data-animate-ready`
 * is set by FilmDirector after registerGsap() and document.fonts.ready resolve,
 * which is precisely the moment the film is armed.
 *
 * It is legitimately never set when reveals are disabled (reduced motion, or a
 * genuinely low-end machine), so a timeout here is information, not a failure.
 */
const armed = await page
  .waitForFunction(() => document.documentElement.getAttribute('data-animate-ready') === 'true', null, { timeout: 20_000 })
  .then(() => true)
  .catch(() => false)
line(`  director armed   : ${armed ? 'yes (data-animate-ready=true)' : 'NO — reveals disabled or director never ran'}`)

// Let the opening beats settle before sampling at rest.
await page.waitForTimeout(2500)

// ---------------------------------------------------------------------------
// Motion state
// ---------------------------------------------------------------------------
const readState = () =>
  page.evaluate(() => {
    const root = document.documentElement
    const cs = getComputedStyle(root)
    const canvas = document.querySelector('canvas')
    return {
      dataMotion: root.getAttribute('data-motion'),
      animateReady: root.getAttribute('data-animate-ready'),
      localStorage: (() => {
        try {
          return window.localStorage.getItem('sdm:reduced-motion')
        } catch {
          return '(blocked)'
        }
      })(),
      prefersReduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      saveData: navigator.connection?.saveData ?? null,
      cores: navigator.hardwareConcurrency ?? null,
      deviceMemory: navigator.deviceMemory ?? null,
      lightX: cs.getPropertyValue('--light-x').trim(),
      lightY: cs.getPropertyValue('--light-y').trim(),
      lightIntensity: cs.getPropertyValue('--light-intensity').trim(),
      lightFlare: cs.getPropertyValue('--light-flare').trim(),
      vignette: cs.getPropertyValue('--vignette').trim(),
      tint: cs.getPropertyValue('--atmos-tint').trim(),
      canvas: canvas ? { w: canvas.width, h: canvas.height, display: getComputedStyle(canvas).display } : null,
      diag: window.__MOTION_DIAGNOSTICS__ ?? null,
      // Delivery-safety surface: what a visitor could actually observe.
      debugGlobals: Object.keys(window).filter((k) => /^__(MOTION|GSAP|NEXT_DEBUG)/.test(k)),
      debugOverlay: Boolean(
        [...document.querySelectorAll('aside,div')].find((el) =>
          /MOTION DEBUG/.test(el.textContent ?? ''),
        ),
      ),
      scrollY: window.scrollY,
    }
  })

head('STEP 1 — CONSOLE & RUNTIME')
line(`  page errors      : ${pageErrors.length}`)
for (const e of pageErrors.slice(0, 8)) line(`    ✗ ${e}`)
line(`  console errors   : ${consoleErrors.length}`)
for (const e of consoleErrors.slice(0, 8)) line(`    ✗ ${e.slice(0, 160)}`)
line(`  failed responses : ${failedResponses.length}`)
for (const r of [...new Set(failedResponses)].slice(0, 8)) line(`    ✗ ${r}`)
line(`  console warnings : ${consoleWarnings.length}`)
for (const w of consoleWarnings.slice(0, 8)) line(`    ! ${w.slice(0, 160)}`)

const before = await readState()
head('STEP 2 — MOTION STATE AT REST')
for (const [k, v] of Object.entries(before)) {
  if (k === 'panelText' || k === 'canvas') continue
  line(`  ${k.padEnd(18)} ${v}`)
}
line(`  canvas             ${before.canvas ? `${before.canvas.w}×${before.canvas.h} (${before.canvas.display})` : 'ABSENT'}`)

// ---------------------------------------------------------------------------
// ScrollTrigger inventory — read from the panel's own diagnostics store
// ---------------------------------------------------------------------------
head('STEP 3 — SCROLLTRIGGER INVENTORY')
const diag = before.diag
if (!diag && PRODUCTION_MODE) {
  line('  diagnostics store  : compiled out (correct for a production build)')
  line('  debug overlay      : ' + (before.debugOverlay ? 'PRESENT — LEAK' : 'absent'))
  line('  debug globals      : ' + (before.debugGlobals.length ? before.debugGlobals.join(', ') + ' — LEAK' : 'none'))
  line()
  line('  Motion is verified below by observing the page itself, which is the')
  line('  only evidence available once the instrumentation is gone.')
} else if (!diag) {
  line('  ✗ diagnostics unavailable (is NEXT_PUBLIC_MOTION_DEBUG=true?)')
} else {
  line(`  GSAP loaded            ${diag.gsapLoaded}`)
  line(`  ScrollTrigger reg.     ${diag.scrollTriggerRegistered}`)
  line(`  ScrollTrigger count    ${diag.scrollTriggerCount}`)
  line(`  Lenis initialised      ${diag.lenisInitialised}`)
  line(`  dust canvas active     ${diag.canvasActive}  ${diag.canvasWidth}×${diag.canvasHeight} @${diag.canvasDpr}x`)
  line(`  capability             reveals=${diag.capability.reveals} scrub=${diag.capability.scrub} pin=${diag.capability.pinning} parallax=${diag.capability.parallax} lenis=${diag.capability.smoothScroll}`)
  line(`  reducedMotion          ${diag.reducedMotion}  (override ${diag.reducedMotionOverride}, storage "${diag.storedPreference}")`)
  line()
  line('  TIMELINE                 created  trigger  targets  pin   scrub')
  for (const t of Object.values(diag.timelines)) {
    line(
      '    ' + t.name.padEnd(22) +
      String(t.created).padEnd(9) +
      String(t.triggerFound).padEnd(9) +
      String(t.targetsFound).padEnd(9) +
      String(t.pinned).padEnd(6) +
      String(t.scrub),
    )
  }
}

// ---------------------------------------------------------------------------
// Scroll the page and watch things actually change
// ---------------------------------------------------------------------------
head('STEP 4 — WALKING THE PAGE')

/*
 * Sample the film's own instruments rather than generic scroll effects: the
 * letterbox height, the grain opacity, the seam width and the walk progress.
 * These are the four things the direction is actually made of, so a regression
 * in any of them is a regression in the direction.
 */
const samples = []
const height = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight)

for (let i = 0; i <= 20; i += 1) {
  const target = Math.round((height * i) / 20)
  await page.evaluate((y) => window.scrollTo(0, y), target)
  // The house-lights retraction runs 1.8s; sample long enough to see it settle.
  await page.waitForTimeout(320)

  const s = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement)
    const grain = document.querySelector('[data-film-grain]')
    const week = document.querySelector('[data-journey-week]')
    const header = document.querySelector('[data-site-header]')
    const num = (v) => Number.parseFloat(v) || 0
    return {
      y: Math.round(window.scrollY),
      letterbox: num(root.getPropertyValue('--letterbox-h')),
      grain: grain ? Number.parseFloat(getComputedStyle(grain).opacity) : -1,
      week: week ? Number(week.textContent) : 0,
      header: header?.getAttribute('data-site-header') ?? 'missing',
    }
  })
  samples.push(s)
}

line('     scrollY   letterbox   grain   week   header')
for (const s of samples) {
  line(
    `   ${String(s.y).padStart(7)}   ${s.letterbox.toFixed(1).padStart(9)}   ${s.grain.toFixed(3).padStart(5)}   ${String(s.week).padStart(4)}   ${s.header}`,
  )
}

// ---------------------------------------------------------------------------
// Assertions — the direction, not generic motion
// ---------------------------------------------------------------------------
head('STEP 5 — ASSERTIONS')

const routeNotFound = failedResponses.filter((r) => r.startsWith('404'))
const diagnosticNoise = [
  ...consoleErrors.filter((e) => !/Failed to load resource.*404/i.test(e)),
  ...consoleWarnings,
]
if (routeNotFound.length) {
  line('  note: unbuilt routes prefetched by Next (expected until those pages exist):')
  for (const r of [...new Set(routeNotFound)]) line(`        ${r}`)
  line()
}

const timelines = Object.values(before.diag?.timelines ?? {})
const named = timelines.map((t) => t.name)
const REQUIRED = ['Hero', 'Headings', 'Frames', 'Introduction', 'Journey', 'Performances', 'Philosophy', 'Finale']
const missing = REQUIRED.filter((n) => !named.includes(n))
const pinned = timelines.filter((t) => t.pinned).map((t) => t.name)

const letterboxMax = Math.max(...samples.map((s) => s.letterbox))
const letterboxMin = Math.min(...samples.map((s) => s.letterbox))
const grainMax = Math.max(...samples.map((s) => s.grain))
const grainMin = Math.min(...samples.map((s) => s.grain))
const weekMax = Math.max(...samples.map((s) => s.week))
const headerStates = new Set(samples.map((s) => s.header))

const instrumentationChecks = [
  ['eight timelines created', missing.length === 0, missing.length ? `missing ${missing.join(', ')}` : named.join(', ')],
  ['no pinned sequences', pinned.length === 0, pinned.join(' + ') || 'none'],
  ['all timelines found their trigger', timelines.every((t) => t.triggerFound), `${timelines.filter((t) => t.triggerFound).length}/${timelines.length}`],
]

const deliveryChecks = [
  ['no debug overlay', !before.debugOverlay, before.debugOverlay ? 'PRESENT' : 'absent'],
  ['no debug globals', before.debugGlobals.length === 0, before.debugGlobals.join(',') || 'none'],
]

const results = [
  ['no page errors', pageErrors.length === 0, `${pageErrors.length}`],
  ...(PRODUCTION_MODE ? deliveryChecks : instrumentationChecks),
  ['no diagnostic console noise', diagnosticNoise.length === 0, diagnosticNoise.length ? diagnosticNoise[0].slice(0, 70) : `0 (${routeNotFound.length} unbuilt-route 404s ignored)`],
  ['no missing-plugin warnings', !consoleWarnings.some((w) => /Missing plugin|Invalid property/i.test(w)), '0'],
  // The letterbox must be a real 60px through the film and gone at the desk.
  ['letterbox reaches 60px', letterboxMax >= 59, `max ${letterboxMax.toFixed(1)}px`],
  ['letterbox retracts to 0', letterboxMin <= 1, `min ${letterboxMin.toFixed(1)}px`],
  // Grain is film-only: present in the dark, absent below the house lights.
  ['grain present in the film', grainMax >= 0.03, `max ${grainMax.toFixed(3)}`],
  ['grain absent at the desk', grainMin <= 0.005, `min ${grainMin.toFixed(3)}`],
  // The week counter steps to 12 as the journey is walked (desktop format).
  ['week counter reaches 12', weekMax === 12, `max ${weekMax}`],
  // The header floats over the hero and turns solid at the first light section.
  ['header overlay → solid', headerStates.has('overlay') && headerStates.has('solid'), [...headerStates].join(' → ')],
]

let failed = 0
for (const [name, ok, detail] of results) {
  if (!ok) failed += 1
  line(`  ${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(30)} ${detail}`)
}


head('STEP 6 — IMAGE REQUESTS MADE BY THE BROWSER')
const seen = new Map()
for (const r of requests) {
  const name = decodeURIComponent(r.url).replace(/^.*generated\//, '').replace(/[?&].*$/, '')
  if (!seen.has(name)) seen.set(name, r.status)
}
if (seen.size === 0) line('  (none)')
for (const [name, status] of seen) line(`  ${String(status).padEnd(5)} ${name}`)

head(
  (failed === 0 ? 'RESULT: ALL ASSERTIONS PASS' : `RESULT: ${failed} ASSERTION(S) FAILED`) +
    (PRODUCTION_MODE ? '  [production mode]' : ''),
)

await browser.close()
process.exit(failed === 0 ? 0 : 1)
