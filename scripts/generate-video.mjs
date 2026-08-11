#!/usr/bin/env node
/**
 * South Dade Music — development-time Gemini (Veo) video generation.
 *
 * Same governing rule as `generate-image.mjs`, and it matters more here because
 * motion reads as documentary far more readily than a still does:
 *
 *   **Generated media is ATMOSPHERE. Authentic photography is EVIDENCE.**
 *
 * This tool will not generate anything a visitor could reasonably read as
 * footage of this academy — no students, no instructors, no classrooms, no
 * performances, no audiences, no branding, no signage. What it is for is the
 * one shot reality cannot supply: an empty stage in the dark, before anyone
 * walks out onto it.
 *
 * SECURITY
 *   - GEMINI_API_KEY is read from `.env.local` only. It is never logged, never
 *     written into metadata, and must never take a NEXT_PUBLIC_ prefix.
 *   - Development tool. Never imported by application code.
 *
 * Usage
 *   node scripts/generate-video.mjs --name walk-backstage --seconds 8
 */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(REPO_ROOT, '.audit', 'generated-video')

/** Appended to every prompt. Non-negotiable, and stricter than the image set. */
const NEGATIVE_CONSTRAINTS = [
  'Absolute constraints:',
  'No people, no human figures, no faces, no hands, no silhouettes of people, no crowds, no audience.',
  'No text, no letters, no words, no numbers, no captions, no watermarks, no signatures.',
  'No logos, no brand marks, no institutional signage.',
  'No floating musical notes, no neon equalizers, no glowing particles forming shapes, no fantasy instruments.',
  'No morphing, no melting, no surreal transformation, no camera gymnastics, no rapid cuts, no zoom punches.',
  'Nothing that could be mistaken for documentary footage of a real school, classroom, rehearsal,',
  'performance, ceremony or event.',
  'Locked-off or almost imperceptibly slow camera. Purely atmospheric.',
].join(' ')

const PROMPT = [
  'A single locked-off cinematic shot of an empty theatre stage seen from the wings, in near darkness.',
  'A narrow warm amber seam of stage light falls across scuffed wooden floorboards from the right.',
  'Fine dust drifts slowly through the beam. The dark edge of a heavy stage curtain hangs at the left',
  'of frame and moves almost imperceptibly, as if from air conditioning.',
  'The darkness very gradually lifts, revealing a little more of the empty boards and the depth of the',
  'space beyond, then settles. Deep blue-black shadows, one warm light source, heavy film grain,',
  'anamorphic, shallow depth of field, 35mm.',
  'The mood is anticipation and held breath — the seconds before someone walks out to a microphone.',
  'Nobody ever appears.',
  NEGATIVE_CONSTRAINTS,
].join(' ')

function readKey() {
  const envPath = path.join(REPO_ROOT, '.env.local')
  if (!fs.existsSync(envPath)) throw new Error('.env.local not found')
  const m = fs.readFileSync(envPath, 'utf8').match(/^GEMINI_API_KEY=(.*)$/m)
  if (!m || !m[1].trim()) throw new Error('GEMINI_API_KEY not set in .env.local')
  return m[1].trim()
}

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1]?.startsWith('--') ? true : arr[i + 1]])
    return acc
  }, []),
)

const name = args.name || 'walk-backstage'
const model = args.model || 'models/veo-3.1-generate-preview'

const { GoogleGenAI } = await import('@google/genai')
const ai = new GoogleGenAI({ apiKey: readKey() })

fs.mkdirSync(OUT_DIR, { recursive: true })

console.log(`[video] model  ${model}`)
console.log(`[video] name   ${name}`)
console.log('[video] submitting…')

let op = await ai.models.generateVideos({
  model,
  prompt: PROMPT,
  config: { aspectRatio: '16:9', numberOfVideos: 1 },
})

const started = Date.now()
while (!op.done) {
  await new Promise((r) => setTimeout(r, 10_000))
  op = await ai.operations.getVideosOperation({ operation: op })
  console.log(`[video] …${Math.round((Date.now() - started) / 1000)}s`)
  if ((Date.now() - started) / 1000 > 900) throw new Error('timed out after 15 minutes')
}

const videos = op.response?.generatedVideos ?? []
if (!videos.length) throw new Error('no video returned: ' + JSON.stringify(op.response ?? {}).slice(0, 400))

let i = 0
for (const v of videos) {
  const dest = path.join(OUT_DIR, `${name}${i ? `-${i}` : ''}.mp4`)
  await ai.files.download({ file: v.video, downloadPath: dest })
  const kb = fs.statSync(dest).size / 1024
  console.log(`[video] wrote ${dest} (${kb.toFixed(0)} KB)`)
  i += 1
}

fs.writeFileSync(
  path.join(OUT_DIR, `${name}.prompt.txt`),
  `model: ${model}\ngenerated: (see git/file mtime)\n\n${PROMPT}\n`,
)
console.log('[video] done')
