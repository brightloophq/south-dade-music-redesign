# Redirect Map

**Date:** 2026-08-08 · **Phase:** 4C
**Implemented in:** `next.config.ts`
**Verified:** all 13 return **308** to the stated destination on a production build.

---

## Why 308

**Permanent.** The old URLs are being retired, not paused. A temporary redirect
would tell search engines to keep the old URL indexed and re-check it, which is
the opposite of what a migration wants.

Next.js emits **308** rather than 301 — same permanence, but it preserves the
request method. Functionally equivalent for search engines.

---

## The map

| Old URL | New URL | Code | Reason | Source | Asset salvage | Verified |
|---|---|---|---|---|---|---|
| `/summer-jam-music-camp-2026` | `/camps` | 308 | Canonical camp offer; four routes describe one product | `camps.json`, `duplicate-routes.md` | No | ✅ |
| `/summer-programs` | `/camps` | 308 | Evergreen camp prose merged into the one camp page | `duplicate-routes.md` | No | ✅ |
| `/summer-camp` | `/camps` | 308 | **Empty page** — no unique content at all | `duplicate-routes.md` | No | ✅ |
| `/summercamp` | `/camps` | 308 | Duplicate of the canonical camp page | `duplicate-routes.md` | Attempted — **all rejected & deleted** | ✅ |
| `/instruments` | `/lessons` | 308 | Instrument hub renamed | `manifest.json` | No | ✅ |
| `/resources` | `/faq` | 308 | Resources page was the site-wide FAQ | `manifest.json` | No | ✅ |
| `/step-up-accessibility` | `/scholarships` | 308 | Scholarship page renamed | `manifest.json` | No | ✅ |
| `/contact-enroll` | `/contact` | 308 | Contact page renamed | `manifest.json` | No | ✅ |
| `/90-day-stage-program` | `/programs/90-day-stage-program` | 308 | Moved under the programmes hub | `manifest.json` | No | ✅ |
| `/band-builders` | `/programs/band-builders` | 308 | Moved under the programmes hub | `manifest.json` | No | ✅ |
| `/early-childhood` | `/programs/early-childhood` | 308 | Moved under the programmes hub | `manifest.json` | No | ✅ |
| `/privacy-policy` | `/privacy` | 308 | Audit proposed `/privacy-policy`; built route is `/privacy` | Phase 4B | No | ✅ |
| `/members` | `/contact` | 308 | P3 route, no unique content; anyone reaching it wants the business | `manifest.json` | No | ✅ |

## Asset salvage attempted before redirecting `/summercamp` — then reversed

Four files existed **only** on that route, and all four were retrieved before
the redirect was added. Redirecting first would have destroyed the only route
that referenced them, so the sequencing was correct.

⚠️ **What was salvaged was not what it was recorded as.** The four were
described as camp pillar **icons** on the strength of their filenames,
dimensions and position on the page. Opened during the 2026-08-09 hardening
pass, they proved to be **photographs of identifiable people** with no
established licence. **All four were deleted**, along with a fifth retrieved
file. See `asset-recovery-report.md` and
`recovered-assets-provenance.json`.

**Net effect on this map: none.** The redirect stands, and nothing from the old
route is retained. The "Asset salvage" column below now reads *attempted and
rejected* rather than *done*.

---

## Deliberately NOT redirected

### The nine lesson routes — no redirect needed

`/piano-lessons`, `/guitar-lessons`, `/drum-lessons`, `/bass-guitar-lessons`,
`/violin-lessons`, `/ukulele-lessons`, `/singing-lessons`, `/private-lessons`,
`/group-music-lessons` **kept their original URLs**. The migration audit had
proposed nested routes; keeping the originals removed nine redirects and
preserved whatever standing those URLs already hold.

### Routes that should be 410 Gone, not redirected

| URL | Why |
|---|---|
| `/events/month/2025-03/` | Plugin archive, already 404, pollutes the sitemap. No successor. |
| `/media_slider/` | CPT archive — renders header and footer only, zero content |
| `/media_slider/slider/` | Same |

**These have no successor.** Redirecting them to a real page would launder dead
URLs into the new site and tell search engines the content moved when it did
not. They belong as **410 Gone** on the old WordPress install at retirement —
that is where the 410 can be issued, not from the rebuild.

### Blocked destinations — no redirect created

| Would-be source | Blocked by |
|---|---|
| Anything → `/teachers` | **B-7** — no instructor is named anywhere in the estate |
| Anything → `/programs/adults` | **B-2** — is adult provision real? |

A redirect to a page that does not exist is a 404 with extra steps.

### `try.southdademusic.com`

**Out of scope for this map.** It is a separate host running its own HighLevel
funnel with a different phone number and a different business name. Its fate —
retire, align, or keep as a paid-traffic landing page — is an owner decision
recorded in `owner-decision-register.md`.

---

## Verification

Run against a production build:

```
/summer-jam-music-camp-2026   308  →  /camps
/summer-programs              308  →  /camps
/summer-camp                  308  →  /camps
/summercamp                   308  →  /camps
/instruments                  308  →  /lessons
/resources                    308  →  /faq
/step-up-accessibility        308  →  /scholarships
/contact-enroll               308  →  /contact
/90-day-stage-program         308  →  /programs/90-day-stage-program
/band-builders                308  →  /programs/band-builders
/early-childhood              308  →  /programs/early-childhood
/privacy-policy               308  →  /privacy
/members                      308  →  /contact
```

**13 / 13 correct. No redirect loops** — every destination is a built route that
returns 200 and is not itself a redirect source.

## ⚠️ These take effect only at DNS cutover

These redirects live in the **rebuilt** application. Until the real domain points
at it, the legacy URLs on the live WordPress site are unaffected and still serve
their old pages. The map is ready; it is not yet in force.
