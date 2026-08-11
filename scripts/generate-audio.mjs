#!/usr/bin/env node
/**
 * South Dade Music — development-time ambience generation (Lyria).
 *
 * Generates an ORIGINAL instrumental loop for the optional site ambience.
 *
 * ## Why generated rather than licensed
 *
 * The estate contains no owned audio of any kind — no recordings, no recital
 * captures, no jingle. Scraping commercial music is not an option, and a stock
 * library track would put someone else's licence in the client's footer. An
 * original generated instrumental is the only route that leaves the business
 * owning what it plays.
 *
 * ## Constraints
 *
 * Soft piano and gentle classical guitar. No vocals, no percussion, no hook.
 * This has to survive being heard fifty times without becoming a song anybody
 * notices — it is room tone for a music school, not a soundtrack.
 *
 * SECURITY
 *   - GEMINI_API_KEY is read from `.env.local` only, never logged.
 *   - Development tool. Never imported by application code.
 */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(REPO_ROOT, '.audit', 'generated-audio')

const PROMPT = [
  'Solo instrumental ambience for a small music school waiting room.',
  'Soft felt piano playing slow, sparse, unresolved chords, with a gentle nylon-string classical guitar',
  'answering quietly underneath. Warm, calm, patient, unhurried, intimate.',
  'Very low dynamic range. No melody that draws attention to itself, no hook, no build, no climax.',
  'Absolutely no vocals, no drums, no percussion, no bass guitar, no synthesiser, no strings section,',
  'no orchestral swell, no cinematic impact.',
  'It should feel like someone practising softly in another room. Seamless, loopable, ambient.',
].join(' ')

function readKey() {
  const envPath = path.join(REPO_ROOT, '.env.local')
  const m = fs.readFileSync(envPath, 'utf8').match(/^GEMINI_API_KEY=(.*)$/m)
  if (!m || !m[1].trim()) throw new Error('GEMINI_API_KEY not set in .env.local')
  return m[1].trim()
}

const { GoogleGenAI } = await import('@google/genai')
const ai = new GoogleGenAI({ apiKey: readKey() })
fs.mkdirSync(OUT_DIR, { recursive: true })

const model = process.argv.includes('--pro') ? 'models/lyria-3-pro-preview' : 'models/lyria-3-clip-preview'
console.log(`[audio] model  ${model}`)
console.log('[audio] submitting…')

let op = await ai.models.generateMusic({ model, prompt: PROMPT })

const started = Date.now()
while (op && !op.done) {
  await new Promise((r) => setTimeout(r, 8000))
  op = await ai.operations.get({ operation: op })
  console.log(`[audio] …${Math.round((Date.now() - started) / 1000)}s`)
  if ((Date.now() - started) / 1000 > 600) throw new Error('timed out after 10 minutes')
}

const res = op?.response ?? op
const clips = res?.generatedMusic ?? res?.generatedAudio ?? res?.audios ?? []
if (!clips.length) {
  console.log('[audio] raw response keys:', Object.keys(res ?? {}).join(', '))
  throw new Error('no audio returned')
}

let i = 0
for (const clip of clips) {
  const dest = path.join(OUT_DIR, `ambience${i ? `-${i}` : ''}.wav`)
  const data = clip.audio?.data ?? clip.data ?? clip.audioData
  if (data) fs.writeFileSync(dest, Buffer.from(data, 'base64'))
  else await ai.files.download({ file: clip.audio ?? clip, downloadPath: dest })
  console.log(`[audio] wrote ${dest} (${(fs.statSync(dest).size / 1024).toFixed(0)} KB)`)
  i += 1
}

fs.writeFileSync(path.join(OUT_DIR, 'ambience.prompt.txt'), `model: ${model}\n\n${PROMPT}\n`)
console.log('[audio] done')
