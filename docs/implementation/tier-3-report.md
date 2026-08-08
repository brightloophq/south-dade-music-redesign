# Tier 3 — Camps, FAQ, About, Performances and Programme Detail

**Date:** 2026-08-08
**Branch:** `master` · built on `3d9fccf`
**Factual source:** `docs/source-content/`, `docs/implementation/content-migration-coverage.md`
**Visual source:** `docs/approved-design/`, `src/tokens/`, `src/components/page/`
**Status:** complete and verified. Uncommitted, pending approval.

---

## 1. Routes built — 6

| Route | Source | Migration |
|---|---|---|
| `/camps` | 4 source routes merged | FULL, less what is gated |
| `/faq` | `/resources/` + camp set | PARTIAL — 3 of 7 site-wide answers withheld |
| `/about` | `/about/` | FULL, less the mission sentence |
| `/performances` | `/performances/` | FULL — the source page is 3 lines |
| `/programs/band-builders` | `/band-builders/` | FULL |
| `/programs/early-childhood` | `/early-childhood/` | FULL |

**22 routes now exist.** Every source page with migratable content has a
destination that exists.

## 2. Four judgment calls, each with a reason

### 2.1 `/camps` ships no reservation CTA

Both 2026 sessions ended before extraction, and **all four source routes still
say *"Secure your child's place before sessions fill up."*** A parent can read a
live booking prompt for a camp that finished.

The page states what the camp is and what it cost, puts the sessions in the past
tense, and asks people to get in touch about the next one. Whether a 2027 camp
exists is an owner question — inventing one, or repeating a dead CTA, would both
be worse than saying nothing.

### 2.2 `/camps` ships no address

⚠️ **Gate I-8.** The camp pages give Unit **1157**; the contact page and the
Google place record give Unit **117**. The camp page is where a parent would
drive for drop-off, which makes this the most consequential instance of the
conflict in the estate. The page links to `/contact` rather than pick a side.

### 2.3 Three site-wide FAQ answers are withheld

`/resources/` carries the **only published pricing, guarantee, age and
scholarship terms in the entire estate** — and three of its seven answers assert
things the rest of the site denies:

| Withheld answer | Gate | Why |
|---|---|---|
| *"Are lessons available in Spanish?"* | **B-6** | Claims "full bilingual support across our core programs and enrollment processes". No Spanish content, switcher or `hreflang` exists anywhere. |
| *"Do students perform live?"* | **B-4** | States "every student performs in a live showcase". The programme's own page says students "get the chance to perform". Also names choirs and orchestras, offered nowhere. |
| *"Is this just regular music lessons?"* | owner | States "two classes weekly". All seven instrument pages say one lesson per week. |

**Withheld rather than reworded.** Rewording would invent a resolution nobody
has evidence for, and the FAQ page is precisely where a contradiction does the
most damage — a parent reads it to settle a question, not to acquire one.

Recorded in `withheldFaqs` in `src/content/faq.ts`.

### 2.4 `/about` ships no mission statement

The source mission sentence is heavily keyword-stuffed: *"high quality
instruction through Kids Piano Lessons South Dade, vocal training, and Group
Music Lessons South Dade."* It is verbatim and technically publishable, but it
is search-engine copy on the page a parent reads to decide whether to trust the
business.

The **vision** sentence beside it carries no stuffing and ships in full. The
mission is withheld pending an owner rewrite — flagged rather than quietly
reworded, because rewriting brand copy is authoring, not migrating.

## 3. Content conflicts preserved, not resolved

**Band Builders' conditional.** The page says performance opportunities "**may**
include" recitals, community events and small concerts — materially weaker than
the sitewide "every student performs". The conditional ships exactly as written;
strengthening it would be choosing a side of B-4.

**Camp instruments vs ukulele page.** The camp says all instruments are
provided; `/ukulele-lessons/` says having an instrument at home is "essential".
Both ship in their own context, since each is true of its own product.

**Deposit amount.** Required "today", "strictly non-refundable", and stated
nowhere. The refund terms ship in full because they are legally load-bearing;
the missing figure is recorded as the most urgent commercial gap in the estate.

## 4. Redirects now required

`/camps` replaces four source routes. The redirect map needs:

| From | To |
|---|---|
| `/summer-jam-music-camp-2026/` | `/camps` |
| `/summer-programs/` | `/camps` |
| `/summer-camp/` | `/camps` |
| `/summercamp/` | `/camps` |
| `/resources/` | `/faq` |
| `/step-up-accessibility/` | `/scholarships` |
| `/contact-enroll/` | `/contact` |
| `/instruments/` | `/lessons` |
| `/90-day-stage-program/` | `/programs/90-day-stage-program` |
| `/band-builders/` | `/programs/band-builders` |
| `/early-childhood/` | `/programs/early-childhood` |
| `/media_slider/`, `/media_slider/slider/` | 410 / de-register |
| `/events/month/2025-03/` | 410 |

⚠️ **Salvage the four pillar icons from `/summercamp/` before redirecting** —
they exist nowhere else.

The nine Tier 2 lesson routes need **no redirect**; they kept their original URLs.

## 5. SEO coverage

| Check | Result |
|---|---|
| Unique `<title>` | **22 / 22** |
| Unique meta description | 22 / 22 |
| Canonical path | Every route |
| Heading hierarchy | 1 × `h1`, **0 skips** across all 22 |
| Internal links | Every page links to its hub and the trial |
| Invented local-business facts | **None** |
| Structured data | Still disabled pending B-4, B-5, I-8 |
| FAQPage schema | Not emitted — would publish gated claims |

## 6. Accessibility results

| Check | Result |
|---|---|
| One `h1` per page | ✅ 22 / 22 |
| Heading level skips | ✅ 0 |
| Console errors | ✅ 0 |
| Horizontal overflow at 390px | ✅ 0 |
| Dead internal links | ✅ **0 site-wide** |
| Contrast | ✅ `check:tokens` 13/13 |
| Motion required to understand content | **None** — the desk is entirely static |

## 7. Validation

| Gate | Result |
|---|---|
| `npm run typecheck` | ✅ |
| `npm run lint` | ✅ |
| `npm run build` | ✅ 22 routes, all static |
| `npm run build-storybook` | ✅ |
| `npm run check:tokens` | ✅ 13 / 13 |
| `npm run probe:motion --production` | ✅ homepage film undisturbed |
| All routes 200 | ✅ 22 / 22 |
| Unique titles | ✅ 22 / 22 |

## 8. Migration percentage

| | Represented | Awaiting | Omitted |
|---|---|---|---|
| Original | ~22% | ~71% | ~7% |
| After Tier 1 | ~34% | ~59% | ~7% |
| After Tier 2 | ~68% | ~25% | ~7% |
| **After Tier 3** | **~89%** | **~4%** | ~7% |

Category movements: camps ~5% → **~90%** · about 0% → **~85%** · programmes
~75% → **~95%** · FAQs ~82% → **~94%** · performances ~20% → **~90%**.

## 9. What remains — and it is not migration

**Five policy pages must be AUTHORED. None exists at source:**
`/privacy-policy` · `/terms` · `/accessibility` · the lesson cancellation policy
· the photo-consent form.

The consent form is the highest-leverage item on the list: it unblocks gate I-1
and with it the 18 genuine photographs, the performance gallery, and the
photography that every page currently does without.

**Two routes fully blocked on gates:** `/teachers` (B-7) · `/programs/adults` (B-2).

**Non-page work:** the redirect map above · the HighLevel lead export ·
the analytics tag audit · re-pointing 22+ staging-domain images.

## 10. Owner decisions — now 22 open

Carried from earlier tiers, plus five surfaced here:

18. **Is there a 2027 camp?** Four routes still solicit bookings for finished sessions.
19. **The camp deposit amount** — binding, non-refundable, unpublished.
20. **Can PEP/UA be applied to camp tuition?** Never addressed anywhere.
21. **Rewrite the mission statement** — currently keyword-stuffed and withheld.
22. **Legal review of the camp refund wording** — recommended by the extraction.

Plus the standing blockers: pricing (B-8), the performance promise (B-4), the
brand name (B-5), the unit number (I-8), photo consent (I-1), bilingual (B-6),
teachers (B-7), adults (B-2), and the corrected contrast token.
