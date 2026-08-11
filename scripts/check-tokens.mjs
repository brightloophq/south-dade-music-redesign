#!/usr/bin/env node
/**
 * Token consistency check — approved direction "The Film".
 *
 * The token layer is the swap point for the whole visual language, and it
 * exists in two representations that can silently diverge:
 *
 *   src/styles/tokens.css   the @theme layer Tailwind actually compiles
 *   src/tokens/*.ts         the TypeScript mirror components import
 *
 * A divergence between them is invisible to typecheck, lint and build — the
 * exact failure mode that cost this project three phases. This asserts them
 * against each other, and against the laws the direction is built on.
 *
 * Usage:  npm run check:tokens
 * Exits non-zero on any violation, so it is CI-usable as-is.
 */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const CSS = fs.readFileSync('src/styles/tokens.css', 'utf8')

const failures = []
const notes = []
const fail = (msg) => failures.push(msg)
const ok = (msg) => notes.push(msg)

/** Read a custom property's declared value out of tokens.css. */
function cssVar(name) {
  const m = CSS.match(new RegExp(`^\\s*${name.replace(/[-]/g, '\\-')}:\\s*([^;]+);`, 'm'))
  return m ? m[1].trim() : null
}

// ---------------------------------------------------------------------------
// 1. Every var() used in source resolves to something declared
// ---------------------------------------------------------------------------
/*
 * Not anchored to line start: tokens.css packs the whole z-index scale onto a
 * single line, and an anchored pattern silently sees only the first of them —
 * which reported three perfectly valid tokens as dangling.
 */
const declared = new Set([...CSS.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]))

/**
 * Properties written at runtime by the motion rig rather than declared as
 * tokens. They are legitimately absent from tokens.css.
 */
const RUNTIME_PROPS = new Set([
  // The lamp, written by src/lib/motion/film/light.ts
  '--light-x', '--light-y', '--light-intensity', '--light-flare',
  '--atmos-tint', '--atmos-warmth', '--vignette', '--scroll-progress',
  // The seam, written by the Opening and Wings timelines
  '--seam-width', '--seam-spill', '--seam-opacity',
  // The letterbox, written by components/film/Letterbox
  '--letterbox-h',
  // Legacy reveal properties, still referenced by the Storybook motion lab
  '--emerge', '--emerge-angle', '--emerge-feather', '--melt-to',
  '--header-height',
])

const sourceFiles = []
;(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (/\.(tsx?|css)$/.test(entry.name)) sourceFiles.push(p)
  }
})('src')

const dangling = new Map()
for (const file of sourceFiles) {
  if (file.endsWith('tokens.css')) continue
  const src = fs.readFileSync(file, 'utf8')
  for (const m of src.matchAll(/var\((--[a-z0-9-]+)/g)) {
    const name = m[1]
    if (!declared.has(name) && !RUNTIME_PROPS.has(name)) {
      if (!dangling.has(name)) dangling.set(name, file)
    }
  }
  // Tailwind v4 arbitrary-property syntax: text-(--color-x), rounded-(--radius-y)
  for (const m of src.matchAll(/-\((--[a-z0-9-]+)\)/g)) {
    const name = m[1]
    if (!declared.has(name) && !RUNTIME_PROPS.has(name)) {
      if (!dangling.has(name)) dangling.set(name, file)
    }
  }
}
if (dangling.size) {
  for (const [name, file] of dangling) fail(`dangling token ${name} — first seen in ${file}`)
} else {
  ok(`all var() references resolve (${declared.size} tokens declared)`)
}

// ---------------------------------------------------------------------------
// 2. TypeScript mirror agrees with the CSS
// ---------------------------------------------------------------------------
const tokensDir = 'src/tokens'
const tsSource = Object.fromEntries(
  fs.readdirSync(tokensDir).map((f) => [f, fs.readFileSync(path.join(tokensDir, f), 'utf8')]),
)

/** Grounds must match hex-for-hex; a drift here silently changes a room. */
const GROUNDS = ['pitch', 'wing', 'memory', 'stage', 'flash', 'house']
for (const g of GROUNDS) {
  const css = cssVar(`--color-ground-${g}`)
  const ts = tsSource['colors.ts'].match(new RegExp(`${g}:\\s*'(#[0-9A-Fa-f]{6})'`))?.[1]
  if (!css || !ts) fail(`ground "${g}" missing (css=${css} ts=${ts})`)
  else if (css.toLowerCase() !== ts.toLowerCase()) fail(`ground "${g}" drift: css ${css} vs ts ${ts}`)
}
if (!failures.length) ok('six grounds match between tokens.css and colors.ts')

/** Radius: everything zero except the pill. */
for (const step of ['none', 'sm', 'md', 'lg', 'xl']) {
  const v = cssVar(`--radius-${step}`)
  if (v !== '0px') fail(`radius-${step} is "${v}", must be 0px (zero-radius law)`)
}
if (cssVar('--radius-full') !== '9999px') fail('radius-full must remain 9999px — the CTA pill exception')
{
  const m = cssVar('--radius-media')
  const ms = cssVar('--radius-media-sm')
  // The media exception is bounded on purpose: soft enough to kill the crop-mark
  // edge, hard enough that a photograph never becomes a card.
  const px = (v) => Number(String(v).replace('px', ''))
  if (!(px(m) >= 6 && px(m) <= 16)) fail(`radius-media is "${m}", must be 6-16px`)
  if (!(px(ms) >= 4 && px(ms) <= px(m))) fail(`radius-media-sm is "${ms}", must be 4px..radius-media`)
}
ok('radius collapsed to 0 with the pill and media exceptions intact')

/** Shadows: every drop shadow none; spotlight is the one glow. */
for (const s of ['elev-1', 'elev-2', 'elev-3', 'elev-4', 'dark-modal', 'dark-lightbox']) {
  const v = cssVar(`--shadow-${s}`)
  if (v !== 'none') fail(`shadow-${s} is "${v}", must be none (zero-shadow law)`)
}
const glow = cssVar('--shadow-spotlight')
if (!glow || !/rgba\(233,\s*162,\s*59/.test(glow)) fail(`--shadow-spotlight must be the amber glow, got "${glow}"`)
ok('shadows removed; --shadow-spotlight is the one glow')

/** The three structural beats are non-negotiable lengths. */
const BEATS = { '--duration-release': '400ms', '--duration-still': '1500ms', '--duration-houselights': '1800ms' }
for (const [name, expected] of Object.entries(BEATS)) {
  const v = cssVar(name)
  if (v !== expected) fail(`${name} is "${v}", spec says ${expected}`)
}
ok('film beats: 1500ms stillness / 400ms release / 1800ms houselights')

/** The film margin. */
if (!/--grid-margin:\s*150px/.test(CSS)) fail('--grid-margin must reach 150px at ≥1280px (the film margin)')
else ok('film margin 150px present')

// ---------------------------------------------------------------------------
// 3. Fonts — the retired families must be gone
// ---------------------------------------------------------------------------
for (const dead of ['archivo', 'inter']) {
  if (new RegExp(`--font-${dead}\\b`).test(CSS)) fail(`--font-${dead} still declared in tokens.css`)
  const files = fs.readdirSync('src/styles/fonts').filter((f) => f.startsWith(dead))
  if (files.length) fail(`retired font files still present: ${files.join(', ')}`)
}
for (const live of ['bricolage', 'newsreader']) {
  if (!new RegExp(`--font-${live}\\b`).test(CSS)) fail(`--font-${live} not referenced in tokens.css`)
}
ok('Bricolage + Newsreader wired; Archivo + Inter removed')

// ---------------------------------------------------------------------------
// 4. Contrast contract, computed rather than trusted
// ---------------------------------------------------------------------------
const srgb = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b)
}
const ratio = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

const PAIRS = [
  ['#F7F4EE', '#05070B', 7, 'body on pitch'],
  ['#17120C', '#F7F4EE', 7, 'body on house'],
  ['#0D1220', '#E9A23B', 7, 'CTA text on amber'],
  ['#8A8578', '#05070B', 4.5, 'ash on pitch'],
  ['#746E61', '#F7F4EE', 4.5, 'muted on house'],
]
for (const [fg, bg, min, label] of PAIRS) {
  const r = ratio(fg, bg)
  if (r < min) fail(`contrast ${label}: ${r.toFixed(2)}:1 below required ${min}:1`)
  else ok(`contrast ${label}: ${r.toFixed(2)}:1 (≥${min})`)
}

/** The banned pair must genuinely fail — if it ever passes, the palette moved. */
const banned = ratio('#E9A23B', '#F7F4EE')
if (banned >= 4.5) fail(`amber on house now reads ${banned.toFixed(2)}:1 — the ban assumed it fails`)
else ok(`amber on house ${banned.toFixed(2)}:1 — correctly banned as text`)

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
console.log('\nTOKEN CONSISTENCY\n')
for (const n of notes) console.log(`  PASS  ${n}`)
for (const f of failures) console.log(`  FAIL  ${f}`)
console.log(
  failures.length
    ? `\n${failures.length} violation(s).\n`
    : `\nAll ${notes.length} checks pass.\n`,
)
process.exit(failures.length ? 1 : 0)
