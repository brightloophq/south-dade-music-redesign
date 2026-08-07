#!/usr/bin/env node
/**
 * Font build — approved direction "The Film".
 *
 * Produces the self-hosted woff2 files consumed by `next/font/local`:
 *
 *   Bricolage Grotesque (structure)  opsz 12–96 · wdth 75–100 · wght 200–800
 *   Newsreader          (voice)      opsz 6–72  · wght 200–800 · roman + italic
 *
 * Bricolage ships in the approved package as a .ttf, so it is subset and
 * converted here. Newsreader was not supplied; its already-subset variable
 * woff2s are pulled from Google Fonts (OFL) and written to disk — the CDN is
 * used at BUILD time only. The production site never requests a font at
 * runtime, per the no-font-CDN rule in docs/approved-design/README.md.
 *
 * Usage:  npm run build:fonts
 * Re-run only when a source font changes; the outputs are committed.
 */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import subsetFont from 'subset-font'

const OUT_DIR = 'src/styles/fonts'
const BRICOLAGE_SRC =
  'docs/approved-design/fonts/BricolageGrotesque-VariableFont_opsz_wdth_wght.ttf'

/** Google's own subset definitions, so our coverage matches theirs exactly. */
const RANGES = {
  latin:
    'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,' +
    'U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  'latin-ext':
    'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,' +
    'U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
}

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

function codepoints(spec) {
  const out = []
  for (const part of spec.split(',')) {
    const token = part.trim().replace(/^U\+/i, '')
    if (token.includes('-')) {
      const [from, to] = token.split('-').map((hex) => Number.parseInt(hex, 16))
      for (let c = from; c <= to; c += 1) out.push(c)
    } else {
      out.push(Number.parseInt(token, 16))
    }
  }
  // Surrogates are not real characters; String.fromCodePoint would throw.
  return out.filter((c) => Number.isFinite(c) && (c < 0xd800 || c > 0xdfff))
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`

async function buildBricolage() {
  const src = fs.readFileSync(BRICOLAGE_SRC)
  for (const [subset, spec] of Object.entries(RANGES)) {
    const text = codepoints(spec)
      .map((c) => String.fromCodePoint(c))
      .join('')
    // No `variationAxes` option => every axis is preserved.
    const buf = await subsetFont(src, text, { targetFormat: 'woff2' })
    const out = path.join(OUT_DIR, `bricolage-variable-${subset}.woff2`)
    fs.writeFileSync(out, buf)
    console.log(`  ${out.padEnd(52)} ${kb(buf.length)}`)
  }
}

async function buildNewsreader() {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap',
    { headers: { 'User-Agent': UA } },
  ).then((r) => r.text())

  /*
   * Parse the stylesheet rather than hard-coding URLs: Google rotates the
   * hashed filenames, and a stale hard-coded URL would 404 silently at the
   * next rebuild.
   */
  const blocks = css.split('@font-face').slice(1)
  const wanted = [
    { style: 'normal', subset: 'latin', file: 'newsreader-variable-latin.woff2' },
    { style: 'normal', subset: 'latin-ext', file: 'newsreader-variable-latin-ext.woff2' },
    { style: 'italic', subset: 'latin', file: 'newsreader-italic-variable-latin.woff2' },
    { style: 'italic', subset: 'latin-ext', file: 'newsreader-italic-variable-latin-ext.woff2' },
  ]

  for (const target of wanted) {
    // The subset name appears as a comment immediately before its @font-face.
    const idx = blocks.findIndex((b, i) => {
      const comment = css.split('@font-face')[i].match(/\/\*\s*([a-z-]+)\s*\*\/\s*$/)
      const style = /font-style:\s*italic/.test(b) ? 'italic' : 'normal'
      return comment?.[1] === target.subset && style === target.style
    })
    if (idx === -1) throw new Error(`no @font-face for ${target.style} ${target.subset}`)

    const url = blocks[idx].match(/url\((https:[^)]+\.woff2)\)/)?.[1]
    if (!url) throw new Error(`no woff2 url for ${target.style} ${target.subset}`)

    const buf = Buffer.from(
      await fetch(url, { headers: { 'User-Agent': UA } }).then((r) => r.arrayBuffer()),
    )
    if (buf.subarray(0, 4).toString('latin1') !== 'wOF2') {
      throw new Error(`downloaded file for ${target.file} is not woff2`)
    }
    const out = path.join(OUT_DIR, target.file)
    fs.writeFileSync(out, buf)
    console.log(`  ${out.padEnd(52)} ${kb(buf.length)}`)
  }
}

fs.mkdirSync(OUT_DIR, { recursive: true })
console.log('\nBricolage Grotesque — subset from the approved .ttf')
await buildBricolage()
console.log('\nNewsreader — pulled from Google Fonts at build time, then self-hosted')
await buildNewsreader()

// The retired families must not linger in the bundle.
console.log('\nRemoving retired families')
for (const stale of fs.readdirSync(OUT_DIR).filter((f) => /^(inter|archivo)-/.test(f))) {
  fs.unlinkSync(path.join(OUT_DIR, stale))
  console.log(`  removed ${stale}`)
}

console.log('\nDone.')
process.exit(0)
