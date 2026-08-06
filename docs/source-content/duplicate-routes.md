# Duplicate Routes — Analysis & Recommendations

**Extraction date:** 2026-08-05
**Scope:** the six routes named for explicit comparison, plus additional duplicate routes discovered during extraction.

> **No redirects have been created.** These are recommendations only.

---

## Summary table

| Route | HTTP | Unique content? | Duplicate of | Recommendation |
|---|---|---|---|---|
| `/summer-programs/` | 200 | Yes — evergreen prose | — | **Merge** (become the evergreen `/camps` parent) |
| `/summer-jam-music-camp-2026/` | 200 | Yes — canonical offer | — | **Keep** (as a dated child page) |
| `/summer-camp/` | 200 | **None — empty** | `/summer-jam-music-camp-2026/` | **Redirect** (urgent) |
| `/summercamp/` | 200 | Only 4 pillar icons | `/summer-jam-music-camp-2026/` | **Redirect** (salvage icons first) |
| `/media_slider/` | 200 | None | — | **Exclude** |
| `/media_slider/slider/` | 200 | None | — | **Exclude** |

---

## 1. `/summer-programs/` — **MERGE**

**What it holds that nothing else does:** the evergreen summer narrative — *Learning Music in a Fun Way*, *For Beginners and Experienced Students*, *Playing Music Together*, *More Than Just Practice*, *Make Summer Meaningful*. This prose is year-agnostic and exists nowhere else.

**What it lacks:** dates, times, price, deposit, refund terms, street address, FAQs, testimonials, and — critically — **any CTA in its closing section**. It also does not link to the page that has the missing facts.

**Conflict it introduces:** says students *"may get a chance to perform"*, while the camp pages promise *"Every student prepares for a final recital."*

**Recommendation — Merge.** Promote this page's evergreen copy into a permanent `/camps` parent that survives year to year, and hang dated child pages beneath it. Resolve the "may perform" wording against the camp promise before publishing.

**Also fix:** the main nav labels this "Summer Programs" but points to `/summer-jam-music-camp-2026/`, while the homepage and `/programs/` cards use the same label pointing here. One label, two destinations.

---

## 2. `/summer-jam-music-camp-2026/` — **KEEP (canonical)**

The most complete camp page: full Camp Details, Investment block, all nine FAQs, refund policy, behavioural policy, capacity warning, testimonials. It is the main navigation's target.

**Recommendation — Keep as canonical**, restructured as a dated child of the evergreen `/camps` parent (e.g. `/camps/summer-jam-2027`).

⚠️ **Both 2026 sessions ended before this extraction** (Session 1: June 8–26; Session 2: July 6–24; scraped 2026-08-05). The page is still live, still indexed, and still says *"Secure your child's place before sessions fill up."* Either archive it with a clear "2026 camp has ended" state or replace it with the 2027 offer.

---

## 3. `/summer-camp/` — **REDIRECT (urgent)**

**Completely empty.** Created 2026-03-16, never edited. Header, hero (rendered twice), a CTA button, footer. **Zero body content.**

Returns **HTTP 200** with **no `noindex`** and sits in the sitemap — so it can rank for "south dade summer camp" and serve a blank page to a parent ready to book.

**Recommendation — Redirect** `301 → /summer-jam-music-camp-2026/` (or the future canonical camp page). Nothing to salvage.

**This is the single highest-priority fix on the current site** and should not wait for the redesign.

---

## 4. `/summercamp/` — **REDIRECT (salvage first)**

A **full content duplicate** of `/summer-jam-music-camp-2026/`: identical dates, times, `$450`/`$400` pricing, capacity, location, all nine FAQs, and the refund policy — word for word. Two indexable URLs competing for the same camp queries and splitting link authority.

**Salvage before redirecting:** four pillar icons that exist only here — `/2026/04/m1000x1000.png`, `/2026/03/m1000x1000-1.png`, `-2.png`, `-3.png`. The canonical page renders those same four pillars as plain text.

**Also unique (and broken):** an **"Enroll Now"** button pointing to `/contact-enroll/` — a page with no enrolment form, no camp information and no payment path. A dead-end at the point of purchase.

Minor divergences: H1 reads "Summer Camp" while H2 reads "SUMMER JAM MUSIC CAMP 2026"; testimonial heading is "What Parents Are Saying" rather than "Trusted by South Dade Families".

**Recommendation — Redirect** `301 → canonical camp page` after extracting the icons.

---

## 5. `/media_slider/` — **EXCLUDE**

Inspected as instructed. Renders **header and footer only** — no body content, no images, no media references, no slider.

A WPBakery `media_slider` custom post type with `public => true`, leaking an archive URL. Returns HTTP 200 with a full `<title>` ("Media Slider - South Dade Music") and og tags, so it is indexable.

**No unique media references found. No useful content.**

**Recommendation — Exclude** from the rebuild. On the current site, set the CPT to `public => false` / `has_archive => false` so the URL stops resolving.

---

## 6. `/media_slider/slider/` — **EXCLUDE**

Same finding: header and footer only. A single `media_slider` post titled "Slider", published and modified 2026-01-16, with a public permalink and no rendered content.

**No unique media references found.**

**Recommendation — Exclude.** Same CPT visibility fix as above.

---

## Additional duplicate routes found during extraction

These were not in the comparison list but are duplicate-content problems of the same kind.

### `/bass-guitar-lessons/` ↔ `/ukulele-lessons/` — **near-duplicate, rewrite both**

Five sections are word-for-word identical apart from the instrument noun: *"Private … Lessons for Students"*, *"Connecting the Community Locally"*, *"Benefits of learning locally include"*, *"Flexible Lessons That Fit Your Schedule"*, *"Start … Lessons Today"*. Two of the four FAQs are also verbatim identical.

Both also carry heading-level misuse (`We offer`, `Key benefits include` marked up as H2) and the ukulele page uses a **piano photo** as its hero.

**Recommendation — Keep both routes, rewrite the bodies** so each page earns its own place. Do not redirect; both instruments are genuinely taught.

### Testimonial and FAQ block duplication — **de-duplicate at the component level**

- The 12-review testimonial block renders **18 cards per page** (all 12, then the first 6 again) on `/`, `/about/`, `/programs/`, `/summer-jam-music-camp-2026/` and `/summercamp/`. A slider/loop misconfiguration, not an editorial choice.
- The homepage program-card grid renders the **same five cards three times**.
- The 7-item site-wide FAQ set is duplicated verbatim on `/` and `/resources/`.
- The 9-item camp FAQ set is duplicated verbatim on both camp pages.

**Recommendation — Rebuild** as single-source components. Keep one canonical FAQ location and reference it.

### Orphan routes — **keep the content, fix the navigation**

`/group-music-lessons/` and `/singing-lessons/` are live, substantive, and unreachable from any menu — absent from the nav, from `/programs/`, and from `/instruments/`. Both also contain **live editorial notes** ("Internal link suggestion:", "Internal Links to Add:") visible to visitors.

**Recommendation — Keep both, place them in the IA, strip the editorial notes.** Voice in particular is a core offering promoted on `/programs/` and on the `try.` subdomain.

### `try.southdademusic.com` — **decide separately**

Not a duplicate route so much as a **parallel brand**. Different business name, different phone, different address, different lesson-format claims, no 90-Day Stage Program, no scholarships. See `content-conflicts.md`.

**Recommendation — Owner decision required:** retire it, align it with the main brand, or keep it deliberately as an isolated paid-traffic landing page. It should not remain live in its current contradictory state.

---

## Recommended canonical route set (summer)

```
/camps                      ← evergreen parent (merge /summer-programs/ prose here)
/camps/summer-jam-2027      ← dated child (pattern from /summer-jam-music-camp-2026/)
```

Redirects to create later (not now):

| From | To |
|---|---|
| `/summer-camp/` | `/camps` |
| `/summercamp/` | `/camps` |
| `/summer-programs/` | `/camps` |
| `/summer-jam-music-camp-2026/` | `/camps/summer-jam-2026` (archived) or `/camps` |
| `/media_slider/` | remove (410 or de-register the CPT) |
| `/media_slider/slider/` | remove (410 or de-register the CPT) |
