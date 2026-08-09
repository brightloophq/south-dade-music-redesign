# SEO Launch Readiness

**Date:** 2026-08-08 · **Phase:** 4G
**Revised:** 2026-08-09 (Phase 4 hardening — layer 3 was documented but missing)
**Indexing:** ⛔ **BLOCKED, deliberately.** `NEXT_PUBLIC_ALLOW_INDEXING` is unset.
**Verified against:** a production build, all 27 routes.

---

## Indexing is off, and should stay off

Three independent layers, **all now genuinely live and re-verified against a
production build on 2026-08-09**:

```
robots.txt      User-Agent: *  /  Disallow: /       src/app/robots.ts
meta robots     noindex, nofollow  — all 27 routes  buildRobots() → buildMetadata()
X-Robots-Tag    noindex, nofollow  — every response next.config.ts → headers()
```

### ⚠️ Correction — layer 3 did not exist until 2026-08-09

This document previously listed `X-Robots-Tag` as "confirmed". **It was never
implemented.** There was no `headers()` block in `next.config.ts`, no
middleware, and no occurrence of the string anywhere in the codebase outside
this file and the launch-readiness report. Indexing was blocked by two layers
while three were being reported.

It is implemented now, and it matters independently of the other two: **a
`<meta>` tag only protects documents parsed as HTML.** Images, JSON, the sitemap
and any future PDF are covered by the header and by nothing else.

Emitted whenever `NEXT_PUBLIC_ALLOW_INDEXING !== 'true'` — unset, empty,
`'false'` and `'TRUE'` all block, so no misconfiguration exposes a pre-launch
deployment. When indexing is enabled the header is **omitted entirely** rather
than sent with a permissive value, because an absent `X-Robots-Tag` is correctly
read as "no directive".

Verified on a running production build:

```
GET /                                    X-Robots-Tag: noindex, nofollow
GET /robots.txt                          X-Robots-Tag: noindex, nofollow
GET /images/generated/atmos-paper-tooth.jpg   X-Robots-Tag: noindex, nofollow
```

**Do not flip this until B-4, B-5 and I-8 are closed.** The site currently
publishes a disputed unit number, an unsettled brand name, and content whose
governing claims contradict each other across pages. Indexing before those close
puts unverified claims into search results, where they persist long after the
page is corrected.

---

## READY

| Item | Result |
|---|---|
| **Title uniqueness** | ✅ **27 / 27 unique** |
| **Meta descriptions** | ✅ Unique per route, written from verified facts only |
| **Canonicals** | ✅ Present on all 27 via `buildMetadata` |
| **Heading hierarchy** | ✅ Exactly one `h1` per route; **0 level skips** across all 27 |
| **Internal linking** | ✅ Every page links to its hub, its related programmes and the trial. **Zero dead internal links.** |
| **Redirect coverage** | ✅ 13 permanent (308) redirects, verified. No loops. |
| **Robots directives** | ✅ Consistent across file, meta and header |
| **OpenGraph** | ✅ title, description, url, site_name, locale, type on every route |
| **Mobile** | ✅ No horizontal overflow at 390px on any route |
| **Fonts** | ✅ Self-hosted; zero external requests |
| **Asset hosting** | ✅ No launch-critical asset on a domain the business does not own |

## BLOCKED — by owner decisions, not by engineering

| Item | Blocked by | Consequence |
|---|---|---|
| **LocalBusiness schema** | **I-8** (three unit numbers), **B-5** (four brand names), contact conflicts | Emitting it would publish contradictory NAP to search engines and Google Business Profile. **Do not ship until resolved.** |
| **Course / Product schema** | **B-8** (no tuition), **B-4** (performance promise) | Would publish claims the site itself contradicts |
| **FAQPage schema** | **B-4**, **B-6** | 3 of 7 site-wide answers are withheld for contradiction; marking up the rest as authoritative is premature |
| **Review / AggregateRating schema** | Google Business Profile unclaimed; no review permalinks captured | Cannot substantiate ratings we do not control |
| **Enabling indexing** | B-4, B-5, I-8 | See above |
| **`og:image`** | **D-1** (logo unreviewed), **I-1** (no usable photography) | Currently unset. A generated decorative asset must not imply documentary content. |

## OWNER DECISION

| Question | Affects |
|---|---|
| Which of four brand names is canonical? | Every `<title>`, `og:site_name`, all schema |
| Which unit number — 117, 1157 or 115? | LocalBusiness schema, directions, Google Business Profile |
| Claim the Google Business Profile? | Holds the 14-review corpus; no permalinks captured |
| Retire, align or keep `try.southdademusic.com`? | A second property with a different name and phone; duplicate-content and brand-confusion risk |
| Is there a 2027 camp? | `/camps` currently states the 2026 sessions have finished |

## TECHNICAL TODO

| Item | Priority | Note |
|---|---|---|
| **Script-level tag audit** | **P0** | GA4/GTM/Pixel IDs are unknown. Without them, analytics history is lost at cutover. See `analytics-tag-inventory.md`. |
| ~~`X-Robots-Tag` header~~ | ~~P0~~ | ✅ **Done 2026-08-09.** Implemented in `next.config.ts`; verified on HTML, static assets and `robots.txt`. |
| `og:image` asset | P1 | 1200×630, typographic, once D-1 closes |
| `/contact/book-a-trial` absent from sitemap | P2 | It is the primary CTA rather than a nav item, so the nav-driven sitemap omits it. It is linked from **every** page, so it remains crawlable. Add explicitly if desired. |
| Old-site 410s | P1 | `/events/month/2025-03/`, `/media_slider/*` should return **410 Gone** at retirement, not be redirected |
| Sitemap `lastModified` | P2 | Currently build time for every entry; real per-page dates would be better |
| Structured-data unblocking | P1 | The emitter exists and is gated by config — flipping it is one flag once gates close |

---

## Sitemap

**26 of 27 routes.** Built from `live` navigation entries, so a page that is not
reachable is also not listed — which is the correct coupling: a sitemap that
advertises pages nobody can navigate to is a defect, not a feature.

Two Phase 4B routes were **unreachable and therefore unlisted** until this
phase — `/photo-consent` and `/lesson-cancellation`. Both are now in the footer
and both appear in the sitemap. `/photo-consent` mattered most: it is the route
that unblocks gate I-1, and a page nobody can reach cannot unblock anything.

## Launch sequence

1. Close **B-4, B-5, I-8**.
2. Run the **script-level tag audit** and record measurement IDs.
3. Export the **HighLevel lead database** (`lead-data-cutover-plan.md`).
4. Produce the `og:image` and a **vector logo** (D-1).
5. Enable structured data — one config flag.
6. Set `NEXT_PUBLIC_ALLOW_INDEXING=true` and redeploy. **Confirm all three
   layers flipped together** — `robots.txt` should allow, `<meta robots>` should
   read `index, follow`, and `X-Robots-Tag` should be **absent** from responses.
   Check the header explicitly; it is the layer that was reported working while
   missing, and the one no browser shows you by default.
7. Point DNS. The 13 redirects take effect at that moment, **not before**.
8. Serve **410** for the dead legacy URLs on the old install.
9. Submit the sitemap; verify coverage in Search Console.
