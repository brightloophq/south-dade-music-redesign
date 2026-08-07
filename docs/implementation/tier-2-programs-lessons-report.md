# Tier 2 — Programs and Lessons Migration Report

**Date:** 2026-08-08
**Branch:** `feat/the-film-homepage` · built on `8955589`
**Factual source:** `docs/source-content/`, `docs/implementation/content-migration-coverage.md`
**Visual source:** `docs/approved-design/`, `src/tokens/`, `src/components/page/`
**Status:** complete and verified. Uncommitted, pending approval.

---

## 1. Routes built — 11

| Route | Source page | Migration |
|---|---|---|
| `/programs` | `/programs/` | Hub — new composition |
| `/lessons` | `/instruments/` | Hub — new composition |
| `/private-lessons` | `/private-lessons/` | FULL |
| `/group-music-lessons` | `/group-music-lessons/` | FULL |
| `/piano-lessons` | `/piano-lessons/` | FULL |
| `/guitar-lessons` | `/guitar-lessons/` | FULL |
| `/drum-lessons` | `/drum-lessons/` | FULL |
| `/bass-guitar-lessons` | `/bass-guitar-lessons/` | FULL |
| `/violin-lessons` | `/violin-lessons/` | FULL |
| `/ukulele-lessons` | `/ukulele-lessons/` | FULL |
| `/singing-lessons` | `/singing-lessons/` | FULL |

**16 routes now exist site-wide.**

### ⚠️ Route-strategy change — flag for the record

The brief specified **flat URLs** (`/piano-lessons`), where the migration audit
had proposed **nested** ones (`/lessons/piano`). Built as specified, and it is
the better call: these are the URLs that already exist on the live site, so

- **no redirect is required for any of the nine lesson routes**, and
- whatever standing those URLs already hold is retained rather than forfeited.

The audit's redirect table is updated accordingly — nine planned redirects are
no longer needed.

## 2. Source pages used

Eleven source pages, plus two extraction records consulted throughout:

`/programs/` · `/instruments/` · `/private-lessons/` · `/group-music-lessons/` ·
`/piano-lessons/` · `/guitar-lessons/` · `/drum-lessons/` ·
`/bass-guitar-lessons/` · `/violin-lessons/` · `/ukulele-lessons/` ·
`/singing-lessons/`

Structured records: `instruments.json`, `programs.json`.

**The seven instrument records were generated directly from `instruments.json`
into `src/content/lessons.ts`** rather than transcribed, so no verbatim string
could drift, and a correction to the extraction propagates to all seven pages at
once.

## 3. Content conflicts found — carried, never silently resolved

### 3.1 Lesson format — unresolved, both readings preserved

Five instrument pages state that **all** lessons in that instrument are private;
guitar, violin and singing say so explicitly. Meanwhile `/group-music-lessons/`,
`/band-builders/`, `/programs/` and the lead-gen subdomain all sell **group**
instruction in the same instruments.

**These cannot all be true.** No evidence favours either.

**Handling:** each instrument page ships its own verbatim format line, attributed
to that page rather than generalised into a site-wide claim. The `/lessons` hub
presents private and group as two real formats and **never states which
instruments are available in which** — the one framing that stays true under
either reading. Recorded as `formatConflict` in `src/content/lessons.ts`.

### 3.2 Lesson frequency — unresolved

Every instrument page says **one lesson per week**. `/resources/` and the
homepage FAQ say **two classes weekly, one for skill and one for band
application**. Seven pages against two.

**Handling:** instrument pages ship their own verbatim line. **No hub, no
programme page and no homepage section states a frequency at all.** Recorded as
`frequencyConflict`.

### 3.3 Template duplication — flagged, not papered over

`/bass-guitar-lessons/` and `/ukulele-lessons/` share **five verbatim sections**.
Both pages ship as extracted, because rewriting them would be inventing content.
**Both need a genuine rewrite at source** — recorded in the audit.

### 3.4 Editorial notes rendered to visitors

`/group-music-lessons/` carries visible instructions to its own author in
production — *"Internal link suggestion: Private Music Lessons"*, *"Internal
Links to Add: …"*. These are not content and do not ship. The links they ask for
are simply made.

### 3.5 Wrong-instrument hero images

Violin and singing pages used a guitar photo; ukulele used a piano photo. **No
imagery ships on any Tier 2 page**, so the defect cannot propagate.

### 3.6 Programme interlinking — zero at source

No programme page links to any other, despite the 90-Day Stage Program, Private
Lessons and Band Builders forming one product per `/resources/`. Every Tier 2
page now links to the programmes it names.

## 4. Keyboard handling

Keyboard is sold in **three** places — the homepage instruments strip, the
`/private-lessons/` instrument list, and the `/group-music-lessons/` FAQ — and
has **no page, no description, no age guidance and no curriculum** anywhere.

**No page was fabricated.** Instead:

- **`/lessons`** lists it as an instrument with the status *"Offered. Detail page
  not yet available."* It is **not a link.**
- **`/private-lessons`** names it in the instrument list with the same note,
  also unlinked.
- The record lives in `keyboardGap` in `src/content/lessons.ts`, carrying the
  three places it is sold and the open owner question.

**⚠️ Owner decision required:** is keyboard a distinct offering from piano, or
should it fold into the piano page? The piano page's own equipment answer is
*"A keyboard is enough to start"*, which suggests one instrument — but it is sold
as a separate tile, so we cannot assume. Recorded in the audit.

## 5. Links repaired

| Before | After |
|---|---|
| Homepage linked 7 instruments to `/lessons/*` — **all 404** | Now the 7 flat routes that exist |
| Homepage linked 6 programmes — **5 of 6 404** | 3 link; 3 render **unlinked** with their name and facts intact |
| Navigation advertised 20+ unbuilt routes | 25 entries now `live`; the rest still render as non-clickable text |
| `/group-music-lessons/` was an **orphan** — live, absent from nav and `/programs/` | Linked from both hubs and in the nav |
| `/singing-lessons/` was an **orphan** | Same |
| Instrument pages ended in **unlinked text CTAs** | Every route out is a real control |

**Verified: zero dead internal links across all 16 routes.**

The playbill change is the one homepage edit in this tier — a data fix, not a
design change. Three programmes now render as text rather than as links to 404s.

## 6. SEO coverage

| Check | Result |
|---|---|
| Unique `<title>` per route | **16 / 16 unique** |
| Unique meta description | 16 / 16 |
| Canonical path | Present on every route via `buildMetadata` |
| Heading hierarchy | 1 × `h1` per page, **0 level skips** across all 16 |
| Internal linking | Every page links to its hub, its programme connections and the trial |
| Invented local-business facts | **None** |
| Structured data | **Still disabled** — depends on unresolved NAP (B-5, I-8) |

No `FAQPage` schema yet, despite 33 FAQs now rendering: schema emission is
gated behind the same NAP decisions.

## 7. Accessibility results

| Check | Result |
|---|---|
| One `h1` per page | ✅ 16 / 16 |
| Heading level skips | ✅ 0 |
| Console errors | ✅ 0 across all routes |
| Horizontal overflow at 390px | ✅ 0 on every route tested |
| Focus states | Visible; unchanged from the audited foundation |
| Semantic landmarks | `header` on interior routes, `main`, `footer`; homepage stays headerless |
| Contrast | `check:tokens` computes every pair — **13/13 pass** |
| Line length | Reading copy capped at 62ch |
| Motion required to understand content | **None.** Interior pages have no timelines, no pins, no grain, no letterbox. |

Interior pages are entirely static: the desk does not move, so there is no
reduced-motion variant to diverge.

## 8. Migration percentage

| | Represented | Awaiting | Omitted |
|---|---|---|---|
| Original | ~22% | ~71% | ~7% |
| After Tier 1 | ~34% | ~59% | ~7% |
| **After Tier 2** | **~68%** | **~25%** | ~7% |

Largest single jump in the project. Tier 2 carried the densest body content in
the estate: seven complete instrument records, **33 FAQs**, and two lesson
formats that had never been reachable.

Category movements: instruments ~10% → **~95%** · programmes ~40% → **~75%** ·
FAQ Q&A form 0% → **~82%**.

## 9. Validation

Run after each route, and again at the end:

| Gate | Result |
|---|---|
| `npm run typecheck` | ✅ |
| `npm run lint` | ✅ |
| `npm run build` | ✅ 16 routes, all static |
| `npm run check:tokens` | ✅ **13 / 13** |
| `npm run probe:motion --production` | ✅ **ALL ASSERTIONS PASS** |
| Every route returns 200 | ✅ 16 / 16 |
| No horizontal overflow at 390px | ✅ |
| No dead internal links | ✅ |
| Homepage film undisturbed | ✅ |

## 10. Remaining Tier 3 backlog

**Routes (6)**

| Route | Why |
|---|---|
| `/camps` | Collapses 4 routes into 1. **Do first if a 2027 camp is selling.** Both 2026 sessions have passed and all four routes still solicit reservations. |
| `/faq` | 7 site-wide + 9 camp FAQs, plus the 13 questions never answered. Add FAQPage schema. |
| `/about` | Mission, four pillars, origin, Exposure Ladder, 4 remaining testimonials. |
| `/performances` | Gated on I-1 and I-4. |
| `/programs/band-builders` | Currently unlinked on both hubs. |
| `/programs/early-childhood` | Currently unlinked on both hubs. |

**Authored, not migrated (5):** `/privacy-policy` · `/terms` · `/accessibility`
· plus the lesson cancellation policy and photo-consent form, none of which
exist at source.

**Fully gated (2):** `/teachers` (B-7) · `/programs/adults` (B-2).

**Non-page work:** the redirect map (now 9 redirects lighter), the HighLevel
lead export, the analytics tag audit, and re-pointing the staging-domain images.

## 11. Owner decisions surfaced by this tier

1. **Keyboard** — distinct offering, or fold into piano?
2. **Lesson format** — are group lessons available in guitar, violin and voice?
   Five pages say those are private-only.
3. **Lesson frequency** — one lesson per week, or two classes weekly?
4. **Bass and ukulele** — five verbatim-identical sections need a real rewrite.
5. **Group size** — "kept small" is the only figure published anywhere.
6. **Lesson length** — 30/45/60 minutes is stated nowhere in the estate.

All six are recorded in the coverage audit alongside the pre-existing gates.
