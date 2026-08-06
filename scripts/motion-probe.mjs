#!/usr/bin/env node
/**
 * Motion runtime probe — development diagnostic tool.
 *
 * Drives the homepage in a real headless Chrome and reports what the motion
 * layer is ACTUALLY doing: console errors, GSAP registration, live
 * ScrollTrigger count, capability resolution, timeline progress while
 * scrolling, canvas state, and the HTTP status of every image the browser
 * really requested.
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
 * `networkidle` never settles on this page — the dust canvas and the scrub
 * timelines keep the main thread busy enough that Playwright's heuristic never
 * sees a quiet window, so it just burned the full 60s timeout. `data-animate-ready`
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
head('STEP 4 — SCROLLING THE FILM')
const samples = []
const height = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight)

for (let i = 0; i <= 20; i += 1) {
  const target = Math.round((height * i) / 20)
  await page.evaluate((y) => window.scrollTo(0, y), target)
  await page.waitForTimeout(220)

  const s = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement)
    const numeral = document.querySelector('[data-j-numeral]')
    return {
      y: Math.round(window.scrollY),
      lx: Number.parseFloat(cs.getPropertyValue('--light-x')) || 0,
      li: Number.parseFloat(cs.getPropertyValue('--light-intensity')) || 0,
      flare: Number.parseFloat(cs.getPropertyValue('--light-flare')) || 0,
      vig: Number.parseFloat(cs.getPropertyValue('--vignette')) || 0,
      tint: cs.getPropertyValue('--atmos-tint').trim(),
      week: numeral?.textContent?.trim() ?? '—',
    }
  })
  samples.push(s)
}

line('     scrollY  light-x  intens  flare  vignette  week   tint')
for (const s of samples) {
  line(
    `   ${String(s.y).padStart(7)}  ${s.lx.toFixed(1).padStart(7)}  ${s.li.toFixed(2).padStart(6)}  ${s.flare.toFixed(2).padStart(5)}  ${s.vig.toFixed(2).padStart(8)}  ${s.week.padStart(4)}   ${s.tint}`,
  )
}

// ---------------------------------------------------------------------------
// Assertions
// ---------------------------------------------------------------------------
head('STEP 5 — ASSERTIONS')

/*
 * Separate two very different kinds of console output.
 *
 * Only the homepage is built so far, so Next's prefetch of any in-viewport link
 * to an unbuilt route legitimately 404s — currently /contact/book-a-trial, the
 * trial CTA. That is a build-order fact, not a defect in the motion layer, and
 * it resolves itself as the remaining pages land.
 *
 * Everything else is real noise, and the delivery contract is that a production
 * build emits none of it.
 */
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
const weeks = [...new Set(samples.map((s) => s.week))].filter((w) => /^\d+$/.test(w))
const lightMoved = Math.max(...samples.map((s) => s.lx)) - Math.min(...samples.map((s) => s.lx))
const intensityVaried = Math.max(...samples.map((s) => s.li)) - Math.min(...samples.map((s) => s.li))
const vignetteVaried = Math.max(...samples.map((s) => s.vig)) - Math.min(...samples.map((s) => s.vig))
const tints = new Set(samples.map((s) => s.tint))
const maxFlare = Math.max(...samples.map((s) => s.flare))

const instrumentationChecks = [
  ['GSAP registered', Boolean(before.diag?.scrollTriggerRegistered), String(before.diag?.scrollTriggerRegistered)],
  ['ScrollTrigger count > 0', (before.diag?.scrollTriggerCount ?? 0) > 0, String(before.diag?.scrollTriggerCount ?? 0)],
  ['Lenis driving scroll', Boolean(before.diag?.lenisInitialised), String(before.diag?.lenisInitialised)],
  ['all timelines created', Object.values(before.diag?.timelines ?? {}).every((t) => t.created), `${Object.values(before.diag?.timelines ?? {}).filter((t) => t.created).length}/${Object.keys(before.diag?.timelines ?? {}).length}`],
]

/** Only meaningful in a production build, where the panel must NOT exist. */
const deliveryChecks = [
  ['no debug overlay', !before.debugOverlay, before.debugOverlay ? 'PRESENT' : 'absent'],
  ['no debug globals', before.debugGlobals.length === 0, before.debugGlobals.join(',') || 'none'],
  ['no diagnostic console noise', diagnosticNoise.length === 0, diagnosticNoise.length ? diagnosticNoise[0].slice(0, 80) : `0 (${routeNotFound.length} unbuilt-route prefetch 404s ignored)`],
  ['motion runs without panel', lightMoved > 5 && tints.size > 2, `Δlight ${lightMoved.toFixed(1)}, ${tints.size} tints`],
]

const results = [
  ['no page errors', pageErrors.length === 0, `${pageErrors.length}`],
  ...(PRODUCTION_MODE ? deliveryChecks : instrumentationChecks),
  ['no missing-plugin warnings', !consoleWarnings.some((w) => /Missing plugin|Invalid property scrollTrigger/i.test(w)), String(consoleWarnings.filter((w) => /Missing plugin|Invalid property/i.test(w)).length)],
  ['canvas present & sized', Boolean(before.canvas && before.canvas.w > 0), before.canvas ? `${before.canvas.w}×${before.canvas.h}` : 'absent'],
  ['light travels', lightMoved > 5, `Δ${lightMoved.toFixed(1)}`],
  ['light intensity varies', intensityVaried > 0.05, `Δ${intensityVaried.toFixed(2)}`],
  ['vignette breathes', vignetteVaried > 0.05, `Δ${vignetteVaried.toFixed(2)}`],
  ['colour grade evolves', tints.size > 2, `${tints.size} tints`],
  ['week counter changes', weeks.length > 3, weeks.join(',')],
  ['First Note flare fires', maxFlare > 0.1, `max ${maxFlare.toFixed(2)}`],
]

let failed = 0
for (const [name, ok, detail] of results) {
  if (!ok) failed += 1
  line(`  ${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(26)} ${detail}`)
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
