import type { NextConfig } from 'next'

/**
 * Migration redirects.
 *
 * Canonical map: `docs/implementation/redirect-map.md`.
 *
 * Every entry sends a legacy URL to the route that now represents it. These are
 * **permanent (308)** because the old URLs are being retired, not paused — a
 * temporary redirect would tell search engines to keep the old URL indexed.
 *
 * ## What is deliberately NOT redirected
 *
 * - The nine lesson routes. They kept their original URLs (`/piano-lessons`,
 *   not `/lessons/piano`), so there is nothing to redirect.
 * - `/teachers` and `/programs/adults` — blocked on gates B-7 and B-2. A
 *   redirect to a page that does not exist is a 404 with extra steps.
 * - `/events/month/2025-03/` and `/media_slider/*` — these should be **410
 *   Gone**, not redirected. They have no successor and pointing them at a real
 *   page would launder dead URLs into the new site. Handled as 404s until the
 *   old WordPress install is retired, where the 410 belongs.
 */
const redirects: NextConfig['redirects'] = async () => [
  // --- Camps: four source routes, one product -----------------------------
  { source: '/summer-jam-music-camp-2026', destination: '/camps', permanent: true },
  { source: '/summer-programs', destination: '/camps', permanent: true },
  { source: '/summer-camp', destination: '/camps', permanent: true },
  // Four files existed only here and were retrieved before this redirect was
  // added. On review they proved to be photographs of identifiable people, not
  // the icons they had been recorded as, and all four were deleted. Nothing
  // from this route is retained. See asset-recovery-report.md.
  { source: '/summercamp', destination: '/camps', permanent: true },

  // --- Renamed hubs and pages ---------------------------------------------
  { source: '/instruments', destination: '/lessons', permanent: true },
  { source: '/resources', destination: '/faq', permanent: true },
  { source: '/step-up-accessibility', destination: '/scholarships', permanent: true },
  { source: '/contact-enroll', destination: '/contact', permanent: true },

  // --- Programme routes that moved under /programs ------------------------
  { source: '/90-day-stage-program', destination: '/programs/90-day-stage-program', permanent: true },
  { source: '/band-builders', destination: '/programs/band-builders', permanent: true },
  { source: '/early-childhood', destination: '/programs/early-childhood', permanent: true },

  // --- Policy route aliases ------------------------------------------------
  // The migration audit proposed /privacy-policy; the built route is /privacy.
  { source: '/privacy-policy', destination: '/privacy', permanent: true },

  // --- Members area: no successor, but it should not dead-end --------------
  // /members/ was a P3 route with no unique content. Sent to contact rather
  // than 404'd, because anyone reaching it is trying to reach the business.
  { source: '/members', destination: '/contact', permanent: true },
]

/**
 * Indexing protection — the response-header layer.
 *
 * The site blocks indexing in three independent places, because any one of them
 * can be missed by a crawler or lost in a config change:
 *
 *   1. `robots.txt`      — `src/app/robots.ts` → `buildRobotsFile()`
 *   2. `<meta robots>`   — `buildRobots()`, applied by `buildMetadata()`
 *   3. `X-Robots-Tag`    — **this**
 *
 * Layer 3 was documented as shipping for some time before it actually existed.
 * It matters independently of the other two: a `<meta>` tag only protects
 * documents that are parsed as HTML, so PDFs, JSON, images and any other
 * non-HTML response are covered by this header and by nothing else.
 *
 * ## Why the env var is read directly here
 *
 * `next.config.ts` is evaluated in Node before the app is built, so it cannot
 * import `siteConfig` (which pulls in app-side modules). The condition is
 * therefore duplicated rather than shared. Both read the same environment
 * variable with the same `=== 'true'` test, so they agree by construction; the
 * launch checklist verifies the header and the meta tag together against a
 * running production build.
 *
 * ## The default is to block
 *
 * The header is emitted unless `NEXT_PUBLIC_ALLOW_INDEXING` is exactly `'true'`.
 * Unset, empty, `'false'`, `'1'`, `'TRUE'` — all block. Enabling indexing is an
 * explicit act; nothing about a misconfigured or forgotten environment can
 * accidentally expose a pre-launch deployment.
 *
 * When indexing is enabled the header is **not emitted at all**, rather than
 * emitted with a permissive value: search engines treat an absent `X-Robots-Tag`
 * as no directive, which is what we want once `<meta robots>` says `index`.
 */
const indexingAllowed = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

const headers: NextConfig['headers'] = async () =>
  indexingAllowed
    ? []
    : [
        {
          // Every path, including static assets under /public and the
          // robots.txt and sitemap.xml routes themselves.
          source: '/:path*',
          headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
        },
      ]

/**
 * Image delivery.
 *
 * EE2 introduced the first real image requests on this site. The sources are
 * 2–2.5 MB 2K JPEGs and none of them is ever served: `next/image` re-encodes to
 * the smallest format the browser accepts, at the width it actually needs.
 *
 * AVIF is listed first because these plates are exactly what it is best at —
 * large, soft, low-frequency gradients through haze, with no fine detail to
 * protect. WebP stays as the fallback for anything that cannot take AVIF.
 *
 * ⚠️ This governs decorative atmosphere only. No photograph of a person is
 * served by this site: gate I-1 blocks all 18 of the academy's own images, and
 * nothing generated may stand in for them.
 */
const images: NextConfig['images'] = {
  formats: ['image/avif', 'image/webp'],
  /**
   * ⚠️ Every `quality` value used by `<Atmosphere>` must be listed here.
   *
   * Next 16 refuses to optimise at an undeclared quality and logs a console
   * warning instead — which `probe:motion` correctly failed on, because
   * console noise on the homepage is exactly what that assertion exists to
   * catch. An undeclared value would also mean the plate silently falls back,
   * so this list is load-bearing, not configuration hygiene.
   *
   *   40  paper tooth — a surface, no detail to protect
   *   46  curtain shadow — soft cloth, heavily desaturated in the browser
   *   48  stage floor — the most detailed plate; boards need slightly more
   *   52  default for any future plate
   */
  qualities: [40, 46, 48, 52],
}

const nextConfig: NextConfig = {
  redirects,
  headers,
  images,
}

export default nextConfig
