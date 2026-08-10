# Source Estate Reconciliation

**Date:** 2026-08-09 · Audit only. No application code changed.
**Companions:** `image-estate-reconciliation.md`, `owner-media-decisions.md`

---

## 1. The measurement fault this audit corrects

Every coverage figure this project has reported — including the headline
**≈95% migration** — was weighted by **text blocks**. Nothing in the methodology
ever asked whether the *visual* estate had been migrated.

Recomputed as separate dimensions:

| Dimension | Coverage | Basis |
|---|---|---|
| **Text coverage** | **~95%** | Every publishable text block has a destination. The original figure, accurate for what it measured |
| **Route coverage** | **100%** | 27 routes; every source page with migratable content has a destination |
| **Source-block coverage** | **~78%** | 9 verbatim blocks recovered in EE3/EE3.1/EE3.2 alone had never reached the rebuild, including three hero subtitles |
| **Testimonial / proof coverage** | **~64%** | 9 of 14 reviews render; 3 withheld on consent or B-1, 2 unplaced by choice |
| **Image / asset coverage** | **0%** | Not one legacy asset is used anywhere on the site |
| **AUTHENTIC MEDIA COVERAGE** | **0%** | 20 first-party camera originals exist. None reaches a visitor |

### How misleading was ≈95%?

**Materially, and in a specific direction.** It was not wrong — it was *narrow*,
and it was reported as though it were general. A reader was entitled to hear
"95% migrated" as "this site carries 95% of what the old one communicated". The
truthful version is:

> **~95% of the text. 0% of the photography.**

The failure mode it produced is already documented: Band Builders scored `FULL`
while being an unreachable dead end; `/private-lessons` was described as
rendering "every string it has" while four verbatim blocks had never reached its
module. **A completeness ledger that only counts text will keep producing that
error.**

---

## 2. Source estate — 28 pages, block by block

| Source page | Meaningful blocks | Migrated | Destination | Action |
|---|---|---|---|---|
| `/` | Hero · Programs · Instruments · Testimonials · Step Up · Guarantee · FAQ · Performances · Footer | Partial | `/` + hubs | **KEEP** — the film re-expresses these deliberately |
| `/90-day-stage-program/` | Hero subtitle · What is it · Why stage matters · 3-step journey · Confidence · Skills · Who for · Real performance · Local | **FULL after EE3.1** | `/programs/90-day-stage-program` | **KEEP** — 3 blocks recovered |
| `/private-lessons/` | Hero subtitle · Opening · Why one-to-one · 7 instruments · Learning path · More than lessons · Easy to start · Scholarships · Local | **FULL after EE3.2** | `/private-lessons` | **KEEP** — 4 blocks recovered |
| `/band-builders/` | Hero subtitle · Premise · What students do · Who for · How it works · Performing · Local | **FULL after EE3.2** | `/programs/band-builders` | **KEEP** — 2 blocks recovered |
| `/group-music-lessons/` | Summary · ages · group size · instruments · skill level · curriculum · 5 FAQs | Partial | `/group-music-lessons` | **EXPAND** — FAQ Q&A form never rendered |
| `/early-childhood/` | Lead · in class · active note · social · first instruments · expectation · parents | FULL | `/programs/early-childhood` | KEEP |
| `/instruments/` + 7 instrument pages | Description · age · format · frequency · skill · equipment · benefits · curriculum · connections · 33 FAQs | FULL | 7 routes + `/lessons` | KEEP |
| `/summer-jam-music-camp-2026/` + 3 duplicate routes | Dates · price · blocks · capacity · included · concert · refund · behaviour · 9 FAQs | FULL | `/camps` | KEEP — 3 routes redirect |
| `/performances/` | 3 slogan lines · 6-image gallery | Partial | `/performances` | **OWNER-BLOCKED** — gallery is I-1 |
| `/about/` | Story · vision · mission · why choose · community · service area | Partial | `/about` | **OWNER-BLOCKED** — mission withheld pending de-SEO rewrite |
| `/step-up-accessibility/` | What is Step Up · PEP · UA · participation · inclusive · disclaimer | FULL | `/scholarships` | KEEP — disclaimer restored |
| `/resources/` | 7 site-wide FAQs | Partial | `/faq` + distributed | KEEP |
| `/contact-enroll/` | Address · phone · email | FULL | `/contact` | KEEP |
| `/members/` | Lorem ipsum | n/a | redirect → `/contact` | OMIT |
| `/event/…` · `/events/month/2025-03/` | 404 at source | n/a | — | **OMIT** — date unverified |
| `try.southdademusic.com` | Alternate funnel · 2nd phone · 3 reviews | Partial | — | **OWNER-BLOCKED** — retire or align |

---

## 3. False positives in the previous "migrated" classification

1. **Band Builders — `FULL`, and unreachable.** Both hubs rendered "Detail page not yet available" from a stale `route: null`. *(Fixed EE1.)*
2. **Early Childhood and the camp — identical defect.** *(Fixed EE1.)*
3. **`/private-lessons` — "renders every string it has".** True of the module; four verbatim blocks had never reached it, including *"Lessons are one-on-one, so students get full attention"* — the page's entire argument, compressed into a two-word data row. *(Fixed EE3.2.)*
4. **The flagship — `FULL`.** Three blocks missing, including its own hero subtitle and the passage explaining why performance is in the programme at all. *(Fixed EE3.1.)*
5. **Three hero subtitles missing across three pages.** All recorded as a parenthetical on the H1 line in the extraction — one systematic reading failure, not three accidents.
6. **`/performances` — gallery counted as OMITTED-with-reason.** Correct in isolation, but it let the site's most important proof page score as complete while carrying none of its subject.
7. **Every route scored on text while shipping zero photography.** The largest false positive, and structural rather than per-page.
8. **Group-lessons FAQ** — 5 questions extracted, facts distributed, Q&A form never rendered.

---

## 4. Visual content opportunity map

Best available authentic material per route. **None publishable until Decision 1 or 2 in `owner-media-decisions.md` is answered.**

| Route | Best available authentic material | Treatment in the approved direction |
|---|---|---|
| `/` | `IMG_5012` room-only crop; one showcase frame | FULL-BLEED EDITORIAL at the House movement |
| `/performances` | `P1088527` · `P1088689` · `P1088608` · `P1088597` · `P1088570` · `DSCF3094` | **GALLERY — the single largest unlock on the site** |
| `/programs/90-day-stage-program` | `P1088653` · `P1088667-1` — both cited by the source page itself | PROGRAMME MOMENT at the finale, replacing the generated chair |
| `/programs/band-builders` | `P1088680` — ensemble, cited by the source page | FULL-BLEED at *alone → together*, replacing the three object studies |
| `/private-lessons` | `P1088548` · `P1088541` · `P1088524` | INLINE PROOF beside "why one-to-one" |
| `/programs/early-childhood` | `IMG_5012` — it depicts exactly this class | PROGRAMME MOMENT |
| `/lessons` + instrument routes | `P1088662` · `P1088659` · `P1088639` · `IMG_2582` | MARGINAL IMAGE per family, replacing object studies |
| `/about` | `IMG_5012` room crop; pillar images if first-party | EDITORIAL + LOCATION |
| `/contact` | `IMG_5012` room crop | LOCATION |
| `/camps` | `PHOTO-2025-06-28` | PROGRAMME MOMENT |
| `/scholarships` | Step Up mark, if licensed | PARTNER identification |

**Design constraint carried into all of the above:** the legacy *design* is not
reused. No cards, no icon circles, no carousels, no green, no legacy typography.
Authentic photography enters as full-bleed editorial, marginal proof and
programme moments **inside the existing Film/Desk register**.

---

## 5. Recommended implementation order

1. **Owner answers Decision 2** (room-only crop of `IMG_5012`) — real first-party photography with near-zero consent exposure. Cheapest genuine win available.
2. **Owner answers Decision 1** (consent + copyright for the 20 camera originals) — unlocks nine routes.
3. Replace the generated object studies wherever authentic material becomes available. They were always a stand-in.
4. `/performances` gallery — largest single experience gain.
5. Flagship and Band Builders programme moments.
6. Decision 3 (vector logo + settled brand name) — unblocks `og:image` and structured data.
7. Group-lessons FAQ Q&A form.

---

## 6. Can EE3 still be considered closed?

**Yes for implementation. No for completeness — and the distinction is the point.**

Everything EE3 set out to do is done and validated: nine verbatim blocks
recovered, five routes reconstructed, the flagship rebuilt, zero console errors,
every gate intact. No further engineering is blocked by anything in EE3.

But EE3 was closed on a coverage figure that measured text and presented itself
as general. This audit shows the visual estate sits at **0%**, and that **20
first-party photographs exist** — including a real recital and the actual
teaching room, with ukuleles on the wall and a music rug on the floor.

That is not an EE3 defect to reopen. It is a body of material EE3 never had
access to, and it is now the largest available improvement to this website.

**EE3 stays closed. What follows is not more EE3 — it is a media integration
phase that only becomes possible once Decisions 1 and 2 are answered.**
