#!/usr/bin/env node
/**
 * South Dade Music — development-time Gemini image generation
 *
 * Generates DECORATIVE, NON-REPRESENTATIONAL imagery only (stage-light
 * textures, atmospheric grounds, abstract musical composition, campaign
 * backdrops). It will refuse to generate anything that a visitor could
 * reasonably read as documentary evidence of this academy — students,
 * teachers, classrooms, facilities, performances, awards or testimonials.
 *
 * See docs/redesign/image-style-guide.md for the governing rules and
 * docs/redesign/09-image-strategy.md §4 for the strategy that mandates them.
 *
 * SECURITY
 *   - GEMINI_API_KEY is read from .env.local only. It is never written to
 *     metadata, never logged, and must never be given a NEXT_PUBLIC_ prefix
 *     (that prefix inlines a value into the client bundle — see
 *     node_modules/next/dist/docs/01-app/02-guides/environment-variables.md).
 *   - This script is a development tool. It is never imported by app code.
 *
 * Usage
 *   npm run generate:image -- --template hero-atmospheric-background \
 *     --name homepage-hero-stage-light \
 *     --page home --section hero --purpose "Hero background wash"
 *
 *   npm run generate:image -- --prompt "..." --name my-asset --page home \
 *     --section hero --purpose "..." --dry-run
 */

import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const DEFAULTS = {
  model: 'gemini-3-pro-image',
  aspect: '16:9',
  size: '2K',
  outDir: 'public/images/generated',
  metaDir: 'public/images/generated/metadata',
  promptDir: 'docs/redesign/image-prompts',
  ledger: 'docs/redesign/generated-assets.md',
}

const LEDGER_START = '<!-- generated-assets:rows:start -->'
const LEDGER_END = '<!-- generated-assets:rows:end -->'

/** Appended to every prompt. Non-negotiable. */
const NEGATIVE_CONSTRAINTS = [
  'Absolute constraints:',
  'No people, no human figures, no faces, no hands, no silhouettes of people, no crowds.',
  'No text, no letters, no words, no numbers, no captions, no watermarks, no signatures.',
  'No logos, no brand marks, no institutional signage.',
  'Nothing that could be mistaken for a documentary photograph of a real school,',
  'classroom, studio, rehearsal, performance, award ceremony or event.',
  'Purely abstract, atmospheric and decorative.',
].join(' ')

// ---------------------------------------------------------------------------
// Subject prohibitions — docs/redesign/09-image-strategy.md §4 "Never"
// ---------------------------------------------------------------------------

const PROHIBITED_SUBJECTS = [
  {
    category: 'students',
    terms: ['student', 'students', 'pupil', 'pupils', 'child', 'children', 'kid', 'kids',
      'boy', 'boys', 'girl', 'girls', 'teen', 'teens', 'teenager', 'teenagers',
      'toddler', 'toddlers', 'infant', 'baby', 'minor', 'minors', 'youngster', 'youth'],
  },
  {
    category: 'teachers',
    terms: ['teacher', 'teachers', 'instructor', 'instructors', 'tutor', 'tutors',
      'educator', 'faculty', 'staff member', 'staff', 'mentor', 'coach', 'conductor'],
  },
  {
    category: 'classrooms',
    terms: ['classroom', 'classrooms', 'class', 'lesson', 'lessons', 'rehearsal',
      'practice room', 'music room', 'lesson room', 'teaching room'],
  },
  {
    category: 'facilities',
    terms: ['school building', 'campus', 'premises', 'lobby', 'reception', 'hallway',
      'entrance', 'storefront', 'facility', 'facilities', 'our studio', 'the studio',
      'academy building', 'front desk', 'waiting room'],
  },
  {
    category: 'performances',
    terms: ['performance', 'performances', 'performing', 'performer', 'performers',
      'concert', 'recital', 'showcase', 'gig', 'audience', 'crowd', 'spectators',
      'band playing', 'orchestra', 'ensemble', 'choir'],
  },
  {
    category: 'awards',
    terms: ['award', 'awards', 'trophy', 'trophies', 'medal', 'medals', 'certificate',
      'diploma', 'prize', 'ceremony', 'graduation'],
  },
  {
    category: 'testimonials',
    terms: ['testimonial', 'testimonials', 'review', 'reviewer', 'portrait', 'portraits',
      'headshot', 'headshots', 'parent', 'parents', 'family', 'families'],
  },
  {
    category: 'people (generic)',
    terms: ['person', 'people', 'human', 'humans', 'figure', 'figures', 'face', 'faces',
      'hand', 'hands', 'silhouette', 'silhouettes', 'man', 'woman', 'men', 'women',
      'musician', 'musicians', 'player', 'players'],
  },
]

/** Phrases removed before scanning — photographic jargon, not subjects. */
const SUBJECT_SCAN_ALLOWLIST = [
  'studio lighting', 'studio light', 'studio quality', 'studio grade',
  'class of light', 'classical', 'performance of the image',
]

/** Negation cues that make a prohibited term an explicit exclusion. */
const NEGATION_CUE = /\b(no|not|without|free of|devoid of|absent of|absent|excluding|exclude|omit|avoid|never|zero|none of)\b[^.;:]*$/i

// ---------------------------------------------------------------------------
// Environment
// ---------------------------------------------------------------------------

/**
 * Minimal .env.local reader. Deliberately does not fall back to a shell
 * environment variable — requirement is "read GEMINI_API_KEY only from
 * .env.local", so a stale exported key cannot silently be used.
 */
function readEnvLocal() {
  const envPath = path.join(REPO_ROOT, '.env.local')
  if (!fs.existsSync(envPath)) {
    fail(
      'Missing .env.local\n\n' +
        `  Create ${rel(envPath)} containing:\n\n` +
        '    GEMINI_API_KEY=your-key-here\n\n' +
        '  .env* is already git-ignored. Never prefix this key with NEXT_PUBLIC_.'
    )
  }

  const vars = new Map()
  for (const rawLine of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
    if (!match) continue
    let value = match[2].trim()
    if ((value.startsWith('"') && value.endsWith('"') && value.length > 1) ||
        (value.startsWith("'") && value.endsWith("'") && value.length > 1)) {
      value = value.slice(1, -1)
    } else {
      value = value.replace(/\s+#.*$/, '').trim()
    }
    vars.set(match[1], value)
  }

  // Guardrail: a public-prefixed Gemini key would ship to the browser bundle.
  const leaked = [...vars.keys()].filter(
    (k) => k.startsWith('NEXT_PUBLIC_') && /GEMINI|GOOGLE_?(GEN)?AI|GOOGLE_API/i.test(k)
  )
  if (leaked.length > 0) {
    fail(
      'Refusing to run: client-exposed Gemini key found in .env.local\n\n' +
        leaked.map((k) => `    ${k}`).join('\n') +
        '\n\n  NEXT_PUBLIC_* values are inlined into the browser bundle.\n' +
        '  Delete these entries, rotate the key, and use GEMINI_API_KEY instead.'
    )
  }

  const apiKey = vars.get('GEMINI_API_KEY')
  if (!apiKey) {
    fail(
      `GEMINI_API_KEY is not set in ${rel(envPath)}\n\n` +
        '  Add:  GEMINI_API_KEY=your-key-here\n' +
        '  Get a key at https://aistudio.google.com/apikey'
    )
  }
  return apiKey
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const BOOLEAN_FLAGS = new Set(['dry-run', 'help', 'list-templates', 'no-ledger'])

function parseArgs(argv) {
  const args = {}
  const positional = []
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (!token.startsWith('--')) {
      positional.push(token)
      continue
    }
    const body = token.slice(2)
    const eq = body.indexOf('=')
    if (eq !== -1) {
      args[body.slice(0, eq)] = body.slice(eq + 1)
      continue
    }
    if (BOOLEAN_FLAGS.has(body)) {
      args[body] = true
      continue
    }
    const next = argv[i + 1]
    if (next === undefined || next.startsWith('--')) {
      fail(`Option --${body} expects a value.`)
    }
    args[body] = next
    i += 1
  }
  if (positional.length > 0) {
    fail(`Unexpected argument: ${positional[0]}\n  All input must be passed as --flag value.`)
  }
  return args
}

const HELP = `
South Dade Music — Gemini image generation (development only)

  npm run generate:image -- [options]

Required
  --name <slug>          Output filename stem. Sanitised; never overwrites.
  --page <slug>          Page the asset belongs to (e.g. home, camps).
  --section <slug>       Section within the page (e.g. hero, cta-band).
  --purpose <text>       Why this asset exists, in one sentence.
  --prompt <text>        The image prompt. Omit when using --template.

Prompt source
  --template <name>      Load the prompt from ${DEFAULTS.promptDir}/<name>.md
  --prompt <text>        Inline prompt. Combined with --template if both given.
  --list-templates       Print available templates and exit.

Generation
  --model <id>           Default: ${DEFAULTS.model}
  --aspect <ratio>       1:1 2:3 3:2 3:4 4:3 9:16 16:9 21:9. Default: ${DEFAULTS.aspect}
  --size <1K|2K|4K>      Default: ${DEFAULTS.size}

Output
  --out-dir <path>       Default: ${DEFAULTS.outDir}
  --meta-dir <path>      Default: ${DEFAULTS.metaDir}
  --no-ledger            Do not append a row to ${DEFAULTS.ledger}
  --dry-run              Resolve and validate everything; make no API call.

Prohibited subjects are blocked before any request is sent. This tool cannot
generate students, teachers, classrooms, facilities, performances, awards or
testimonials. Use the real extracted photography for all of those.
`

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

const RESERVED_WINDOWS_NAMES = new Set([
  'con', 'prn', 'aux', 'nul',
  ...Array.from({ length: 9 }, (_, i) => `com${i + 1}`),
  ...Array.from({ length: 9 }, (_, i) => `lpt${i + 1}`),
])

function sanitiseSlug(input, label, { maxLength = 64 } = {}) {
  const slug = String(input)
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maxLength)
    .replace(/-+$/g, '')

  if (!slug) {
    fail(`--${label} produced an empty filename after sanitising: ${JSON.stringify(input)}`)
  }
  if (RESERVED_WINDOWS_NAMES.has(slug)) {
    fail(`--${label} "${slug}" is a reserved Windows device name. Choose another.`)
  }
  return slug
}

/** Resolve a user-supplied directory and refuse anything outside the repo. */
function resolveDir(input, label) {
  const resolved = path.resolve(REPO_ROOT, input)
  const relative = path.relative(REPO_ROOT, resolved)
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    fail(`--${label} must stay inside the repository. Got: ${input}`)
  }
  return resolved
}

/**
 * Pick a path that does not exist. Never overwrites: `stem.png`, then
 * `stem-2.png`, `stem-3.png`... The image and its metadata share a stem, so
 * the suffix is chosen only when BOTH targets are free.
 */
function reserveUniqueStem(stem, imageDir, metaDir, extension) {
  for (let n = 1; n <= 999; n += 1) {
    const candidate = n === 1 ? stem : `${stem}-${n}`
    const imagePath = path.join(imageDir, `${candidate}${extension}`)
    const metaPath = path.join(metaDir, `${candidate}.json`)
    if (!fs.existsSync(imagePath) && !fs.existsSync(metaPath)) {
      return { stem: candidate, imagePath, metaPath, collided: n > 1 }
    }
  }
  fail(`Could not find a free filename for "${stem}" after 999 attempts.`)
}

/**
 * Scan a prompt for prohibited subjects. Terms that appear under an explicit
 * negation ("no people", "without faces") are permitted — those are the
 * constraints we WANT in a prompt.
 */
function findProhibitedSubjects(prompt) {
  let haystack = ` ${prompt.toLowerCase().replace(/\s+/g, ' ')} `
  for (const phrase of SUBJECT_SCAN_ALLOWLIST) {
    haystack = haystack.split(phrase).join(' ')
  }

  const hits = []
  for (const { category, terms } of PROHIBITED_SUBJECTS) {
    for (const term of terms) {
      const pattern = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g')
      let match
      while ((match = pattern.exec(haystack)) !== null) {
        const preceding = haystack.slice(Math.max(0, match.index - 40), match.index)
        if (NEGATION_CUE.test(preceding)) continue
        hits.push({ category, term })
        break
      }
    }
  }
  return hits
}

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

function listTemplates(promptDir) {
  if (!fs.existsSync(promptDir)) return []
  return fs
    .readdirSync(promptDir)
    .filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')
    .map((f) => f.replace(/\.md$/, ''))
    .sort()
}

/** Templates are human-readable Markdown; the script reads the ```prompt fence. */
function loadTemplate(name, promptDir) {
  const slug = sanitiseSlug(name, 'template', { maxLength: 80 })
  const file = path.join(promptDir, `${slug}.md`)
  if (!fs.existsSync(file)) {
    const available = listTemplates(promptDir)
    fail(
      `Unknown template "${slug}".\n\n  Available:\n` +
        (available.length ? available.map((t) => `    ${t}`).join('\n') : '    (none found)')
    )
  }
  const source = fs.readFileSync(file, 'utf8')
  const fence = source.match(/```prompt\r?\n([\s\S]*?)```/)
  if (!fence) {
    fail(`Template ${rel(file)} has no \`\`\`prompt fenced block.`)
  }
  const body = fence[1].trim()
  if (!body) fail(`Template ${rel(file)} has an empty prompt block.`)
  return { slug, file, body }
}

// ---------------------------------------------------------------------------
// Ledger
// ---------------------------------------------------------------------------

function appendLedgerRow(ledgerPath, row) {
  if (!fs.existsSync(ledgerPath)) {
    warn(`Ledger ${rel(ledgerPath)} not found — skipping register update.`)
    return false
  }
  const source = fs.readFileSync(ledgerPath, 'utf8')
  const startAt = source.indexOf(LEDGER_START)
  const endAt = source.indexOf(LEDGER_END)
  if (startAt === -1 || endAt === -1 || endAt < startAt) {
    warn(`Ledger ${rel(ledgerPath)} is missing its row markers — skipping register update.`)
    return false
  }
  const insertAt = endAt
  const line = `| \`${row.file}\` | ${row.page} | ${row.section} | ${row.date} | ${row.model} | ${row.approvalStatus} |\n`
  const updated = source.slice(0, insertAt) + line + source.slice(insertAt)
  fs.writeFileSync(ledgerPath, updated, 'utf8')
  return true
}

// ---------------------------------------------------------------------------
// Output helpers
// ---------------------------------------------------------------------------

function rel(target) {
  return path.relative(REPO_ROOT, target).split(path.sep).join('/') || '.'
}

function fail(message) {
  process.stderr.write(`\n✖ ${message}\n\n`)
  process.exit(1)
}

function warn(message) {
  process.stderr.write(`⚠ ${message}\n`)
}

function info(message) {
  process.stdout.write(`${message}\n`)
}

const EXTENSION_BY_MIME = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/webp': '.webp',
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (args.help) {
    info(HELP)
    return
  }

  const promptDir = resolveDir(args['prompt-dir'] ?? DEFAULTS.promptDir, 'prompt-dir')

  if (args['list-templates']) {
    const templates = listTemplates(promptDir)
    info(`\nPrompt templates in ${rel(promptDir)}:\n`)
    info(templates.length ? templates.map((t) => `  ${t}`).join('\n') : '  (none found)')
    info('')
    return
  }

  // --- required metadata -------------------------------------------------
  const missing = ['name', 'page', 'section', 'purpose'].filter((k) => !args[k])
  if (missing.length > 0) {
    fail(
      `Missing required option${missing.length > 1 ? 's' : ''}: ${missing.map((m) => `--${m}`).join(', ')}\n` +
        '\n  Run with --help for usage.'
    )
  }

  const name = sanitiseSlug(args.name, 'name')
  const page = sanitiseSlug(args.page, 'page', { maxLength: 40 })
  const section = sanitiseSlug(args.section, 'section', { maxLength: 40 })
  const purpose = String(args.purpose).trim()
  if (purpose.length < 8) fail('--purpose must be a meaningful sentence (8+ characters).')

  // --- prompt ------------------------------------------------------------
  if (!args.prompt && !args.template) {
    fail('Provide --prompt "..." or --template <name>. Run --list-templates to see options.')
  }

  const template = args.template ? loadTemplate(args.template, promptDir) : null
  const inlinePrompt = args.prompt ? String(args.prompt).trim() : ''
  const sourcePrompt = [template?.body, inlinePrompt].filter(Boolean).join('\n\n')

  if (sourcePrompt.length < 20) {
    fail('Prompt is too short to be meaningful (20+ characters).')
  }

  // --- subject guardrail (runs before any network call) ------------------
  const violations = findProhibitedSubjects(sourcePrompt)
  if (violations.length > 0) {
    const grouped = new Map()
    for (const hit of violations) {
      if (!grouped.has(hit.category)) grouped.set(hit.category, [])
      grouped.get(hit.category).push(hit.term)
    }
    fail(
      'Prompt blocked — prohibited subject matter.\n\n' +
        [...grouped.entries()]
          .map(([category, terms]) => `    ${category}: ${[...new Set(terms)].join(', ')}`)
          .join('\n') +
        '\n\n  This project never generates images of students, teachers, classrooms,\n' +
        '  facilities, performances, awards or testimonials. Those must be real\n' +
        '  photographs of South Dade Music with consent on file.\n\n' +
        '  See docs/redesign/image-style-guide.md and 09-image-strategy.md §4.\n' +
        '  If a term is meant as an exclusion, phrase it explicitly: "no people".'
    )
  }

  const finalPrompt = `${sourcePrompt}\n\n${NEGATIVE_CONSTRAINTS}`

  // --- generation config -------------------------------------------------
  const model = String(args.model ?? DEFAULTS.model).trim()
  const aspectRatio = String(args.aspect ?? DEFAULTS.aspect).trim()
  const imageSize = String(args.size ?? DEFAULTS.size).trim().toUpperCase()

  const ALLOWED_ASPECTS = ['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9']
  if (!ALLOWED_ASPECTS.includes(aspectRatio)) {
    fail(`--aspect must be one of: ${ALLOWED_ASPECTS.join(', ')}`)
  }
  if (!['1K', '2K', '4K'].includes(imageSize)) {
    fail('--size must be one of: 1K, 2K, 4K')
  }

  const outDir = resolveDir(args['out-dir'] ?? DEFAULTS.outDir, 'out-dir')
  const metaDir = resolveDir(args['meta-dir'] ?? DEFAULTS.metaDir, 'meta-dir')
  const ledgerPath = path.resolve(REPO_ROOT, DEFAULTS.ledger)

  // --- dry run -----------------------------------------------------------
  if (args['dry-run']) {
    const preview = reserveUniqueStem(name, outDir, metaDir, '.png')
    info('\nDRY RUN — no API call made, nothing written.\n')
    info(`  model        ${model}`)
    info(`  aspect       ${aspectRatio}   size ${imageSize}`)
    info(`  page         ${page}`)
    info(`  section      ${section}`)
    info(`  purpose      ${purpose}`)
    info(`  template     ${template ? template.slug : '(inline prompt)'}`)
    info(`  image        ${rel(preview.imagePath)}`)
    info(`  metadata     ${rel(preview.metaPath)}`)
    info(`  guardrail    passed — no prohibited subjects detected`)
    info(`\n  Resolved prompt:\n\n${finalPrompt.replace(/^/gm, '    ')}\n`)
    return
  }

  // --- credentials (read last, so validation failures never touch them) --
  const apiKey = readEnvLocal()
  const { GoogleGenAI } = await import('@google/genai')
  const ai = new GoogleGenAI({ apiKey })

  info(`\nGenerating with ${model} (${aspectRatio}, ${imageSize})…`)

  let response
  try {
    response = await ai.models.generateContent({
      model,
      contents: finalPrompt,
      config: {
        responseModalities: ['IMAGE'],
        imageConfig: {
          aspectRatio,
          imageSize,
          // NOTE: imageConfig.personGeneration: 'ALLOW_NONE' would be the
          // model-side enforcement of the "no people" rule, but it is rejected
          // by the Gemini Developer API (API-key mode) — it is only accepted on
          // the Enterprise Agent Platform / Vertex path. The prohibition is
          // therefore enforced by findProhibitedSubjects() before the request
          // and by NEGATIVE_CONSTRAINTS inside the prompt. Reinstate this field
          // if this pipeline ever moves to Vertex credentials.
        },
      },
    })
  } catch (error) {
    // Never echo the request body — it is not sensitive, but the SDK may
    // include headers. Surface the message only.
    fail(`Gemini request failed: ${error?.message ?? error}`)
  }

  const candidate = response?.candidates?.[0]
  const parts = candidate?.content?.parts ?? []
  const imagePart = parts.find((p) => p.inlineData?.data)

  if (!imagePart) {
    const reason = candidate?.finishReason ?? response?.promptFeedback?.blockReason ?? 'unknown'
    const text = parts.map((p) => p.text).filter(Boolean).join(' ').trim()
    fail(
      `No image returned (finishReason: ${reason}).` +
        (text ? `\n\n  Model said: ${text}` : '') +
        '\n\n  If this was a safety block, revise the prompt toward pure abstraction.'
    )
  }

  const mimeType = imagePart.inlineData.mimeType ?? 'image/png'
  const extension = EXTENSION_BY_MIME[mimeType] ?? '.png'
  const bytes = Buffer.from(imagePart.inlineData.data, 'base64')

  fs.mkdirSync(outDir, { recursive: true })
  fs.mkdirSync(metaDir, { recursive: true })

  const target = reserveUniqueStem(name, outDir, metaDir, extension)
  if (target.collided) {
    warn(`"${name}${extension}" already exists — writing "${target.stem}${extension}" instead.`)
  }

  fs.writeFileSync(target.imagePath, bytes)

  const generatedAt = new Date()
  const modelNotes = parts.map((p) => p.text).filter(Boolean).join('\n').trim() || null

  const metadata = {
    // Identity
    file: `${target.stem}${extension}`,
    outputPath: rel(target.imagePath),
    sha256: createHash('sha256').update(bytes).digest('hex'),
    byteSize: bytes.byteLength,
    mimeType,

    // Placement
    page,
    section,
    purpose,

    // Generation
    model,
    aspectRatio,
    imageSize,
    prompt: sourcePrompt,
    finalPrompt,
    negativeConstraints: NEGATIVE_CONSTRAINTS,
    promptTemplate: template ? template.slug : null,
    personGeneration: 'unsupported-on-developer-api',
    subjectGuard: 'pre-flight prompt scan + mandatory negative constraints',
    generator: '@google/genai',
    date: generatedAt.toISOString(),
    modelNotes,

    // Governance — mirrors the Asset model in docs/redesign/08-content-model.md §3
    approvalStatus: 'pending-review',
    approvedBy: null,
    approvedAt: null,
    provenance: 'ai-generated',
    register: 'decorative',
    depictsMinors: false,
    consentStatus: 'not-applicable',
    licence: 'ai-generated-internal',
    altText: null,
    subject: [],
    integratedIntoUI: false,
    notes: 'Decorative, non-representational. Must not be presented as documentary imagery.',
  }

  fs.writeFileSync(target.metaPath, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8')

  const ledgerUpdated = args['no-ledger']
    ? false
    : appendLedgerRow(ledgerPath, {
        file: metadata.file,
        page,
        section,
        date: generatedAt.toISOString().slice(0, 10),
        model,
        approvalStatus: metadata.approvalStatus,
      })

  info('')
  info(`  image     ${rel(target.imagePath)}  (${(bytes.byteLength / 1024).toFixed(0)} KB)`)
  info(`  metadata  ${rel(target.metaPath)}`)
  info(`  ledger    ${ledgerUpdated ? rel(ledgerPath) : 'not updated'}`)
  info('')
  info('  Status: pending-review. Not integrated into the UI.')
  info('  Next: human review, then set approvalStatus in the metadata JSON.')
  info('')
}

main().catch((error) => {
  fail(error?.stack ?? String(error))
})
