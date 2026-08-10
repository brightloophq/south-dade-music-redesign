import fs from 'node:fs'
import path from 'node:path'

/**
 * `/_media-review/<asset>.jpg` — **DEVELOPMENT ONLY**.
 *
 * Serves the MI1 preview derivatives from `.audit/media-review/`, which lives
 * outside `public/` and outside git.
 *
 * ## Why these are not in `public/`
 *
 * They were, briefly, and that was wrong. Anything under `public/` is served
 * statically by Next at a guessable URL **regardless of what any component
 * does** — so gating the React component to development left the files
 * themselves reachable in a production deployment.
 *
 * That is precisely the exposure Phase 4D created: five uncleared photographs
 * sat in `public/images/recovered/` where "no page referenced them" was true
 * and irrelevant, because any deployment served them anyway. Repeating it while
 * previewing *uncleared photographs of children's events* would have been a
 * considerably worse version of the same mistake.
 *
 * So the bytes live in `.audit/` and reach the browser only through this
 * handler, which refuses to exist in production.
 *
 * ## Three independent guards
 *
 *   1. `notFound()` when `NODE_ENV === 'production'`
 *   2. the files are outside `public/`, so no static route can serve them
 *   3. the directory is gitignored, so they cannot be committed or deployed
 *
 * ⚠️ Everything served here remains subject to gate I-7 (photographer
 * copyright). Tier B files are face-free crops; the people-bearing originals
 * never leave `.audit/legacy-assets/`.
 */

const MEDIA_DIR = path.join(process.cwd(), '.audit', 'media-review')
const isDev = process.env.NODE_ENV !== 'production'

export const dynamic = 'force-dynamic'

export async function GET(_request: Request, ctx: { params: Promise<{ asset: string }> }) {
  if (!isDev) return new Response('Not found', { status: 404 })

  const { asset } = await ctx.params

  /*
   * Path traversal guard. `asset` is a single path segment, but basename() and
   * an explicit allow-list on the extension make that structural rather than
   * incidental — this handler reads from disk and must not become a file-read
   * primitive if the route shape ever changes.
   */
  const safe = path.basename(asset)
  if (!/^[a-z0-9-]+\.jpg$/i.test(safe)) return new Response('Not found', { status: 404 })

  const file = path.join(MEDIA_DIR, safe)
  if (!file.startsWith(MEDIA_DIR)) return new Response('Not found', { status: 404 })

  let body: Buffer
  try {
    body = fs.readFileSync(file)
  } catch {
    return new Response('Not found', { status: 404 })
  }

  return new Response(new Uint8Array(body), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      'X-Media-Review': 'preview-only-not-cleared-for-production',
    },
  })
}
