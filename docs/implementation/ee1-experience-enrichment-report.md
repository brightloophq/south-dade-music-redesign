# EE1 — Experience Enrichment Report

**Phase:** EXPERIENCE ENRICHMENT — EE1
**Date:** 2026-08-09
**Branch:** `master` · built on `2c0e673`
**Status:** complete, validated, **uncommitted** — pending visual review

> ⚠️ **Phase numbering.** "EE1" is the current phase and is deliberately not
> called "Phase 5". Three different numbering schemes already exist in this
> repository: `docs/redesign/10-launch-plan.md` runs Phase 1–10 by area (its
> Phase 5 is *Camp*), the earlier implementation reports run their own 4/5/6
> (`phase-5-homepage`, `phase-5d-polish`, `phase-5e-motion`), and the recent
> reports restarted at Phase 4. **No historical phase has been renamed.**

---

## 0. The one-sentence version

> The rebuild had migrated ~95% of the extracted content and was **hiding a
> measurable amount of it in plain sight** — including three programmes whose
> pages had shipped weeks ago and which both hubs still described as not
> existing.

EE1 did not add content. It made content that was already migrated actually
reachable, legible and consequential, and it built the instrument that measures
whether that is true.

---

## 1. Experience-coverage baseline

The central deliverable. `content-migration-coverage.md` answers **"did we
account for the information?"** — a completeness ledger, and by its own
reckoning the rebuild sits at ~95%. That number is real and it is not what a
family experiences.

The new dimension answers **"does a real visitor meet this, and get any use out
of it?"** It lives in `src/lib/internal/experience-coverage.ts` and renders in
`/_internal/content-review` under **Experience coverage**, ranked worst-first so
what is still failing cannot sink into the middle of a growing list.

### The five states

| State | Meaning |
|---|---|
| **Present and prominent** | A visitor on a normal path meets it, and it is doing work |
| **Present but buried** | It renders, but only if you already knew to go looking |
| **Present but weakly expressed** | It is right there and lands as nothing — flattened, unexplained, or one line in a list of equals |
| **Withheld** | Deliberately not shown; a gate or an unverified fact blocks it |
| **Omitted intentionally** | Deliberately never shipping — the decision is made, not pending |

**Withheld and Omitted are not failures.** A withheld tuition figure is gate B-8
working correctly. They are counted separately so the scoreboard is not padded
by items that are behaving properly.

### The baseline, and where it moved

44 items assessed.

| State | Before EE1 | After EE1 | Change |
|---|---|---|---|
| Present and prominent | 7 | **23** | +16 |
| Present but buried | 8 | **0** | −8 |
| Present but weakly expressed | 9 | **2** | −7 |
| Withheld | 14 | 15 | +1 |
| Omitted intentionally | 6 | 4 | −2 |

**17 items improved. 0 regressed. 2 remain short of prominent.**

The honest reading of this table is **not** "the site got 16 things better". It
is: *seventeen things the project believed it had delivered were not being
delivered, and most of them needed a link or a sentence rather than any new
work.* The migration was genuinely ~95% complete. The experience was not, and
nothing in the toolchain could see the difference.

> ### ⚠️ These are judgements, not measurements
> Nothing in that table is computed. Every row is an assessment, made by whoever
> did the work — the least trustworthy kind. They are recorded per row, with the
> concrete evidence for each call, so a reviewer can disagree with a specific
> row instead of with a percentage.

---

## 2. Pages enriched

| Route | What changed |
|---|---|
| `/` | New **House** movement at the film/desk join; playbill gains summaries and six working links; both lesson formats named and linked; the shy question restored beneath the twelve weeks |
| `/programs` | Three dead entries fixed; new **pathway** movement; the protected line as a pull quote |
| `/programs/band-builders` | Premise above the four outcomes; contextual proof; before/after neighbours |
| `/programs/90-day-stage-program` | Showcase testimony beside the week grid; a statement of where the playing is actually taught |
| `/lessons` | Seven-row private-vs-group comparison; equipment answer per instrument in the index |
| 7 × instrument routes | "Where it leads" now renders on all seven, not three |
| `/performances` | **Upcoming** location with an honest empty state; **In the community** with its verbatim claim and corroborating review |
| `/group-music-lessons` | Band Builders added to "Also consider" |
| **26 routes** | Header mobile-overflow defect fixed — see §13 |

**No new routes were created.** 27 routes before, 27 after.

---

## 3. Extracted content made more prominent

### The defect that justifies the whole phase

**Three of six programmes were unreachable dead ends.** `programEntries` still
carried `route: null` and `pendingNote: 'Detail page not yet available.'` for
Band Builders, Early Childhood and the Summer Jam Music Camp — long after Tier 3
built and shipped all three pages.

The result: `/programs` and the homepage playbill each told a visitor that three
of the six things this business sells had no page, while those pages sat one
click away in the navigation, in the footer, and in the sitemap. The migration
audit recorded all three as `FULL`.

That is the failure mode this phase exists to catch: **content can be 100%
migrated and 0% delivered, and a completeness ledger will show green.**

### The others

| Content | Was | Now |
|---|---|---|
| **The business's identity** | The only wordmark above the footer was the hero's vertical lockup — which is `aria-hidden`, so for a screen-reader user the first statement of who this is was the copyright line | Stated at the film/desk join, with tagline, service area and ages |
| **"Build Community. Make Music."** | Footer only — the least-read element on the site, for the business's own summary of itself | Display size, in the light |
| **"What if my child is too shy?"** | Inside an FAQ accordion for two years. `07-the-walk.md` §ACT V named this exchange the emotional hinge of the page; the build never included it | Verbatim, both halves, directly under the week rows that provoke the question |
| **The protected line** | 20px whisper in the dark — correct for the film, but it meant the best sentence the business owns was reaching nobody who was reading | Also a pull quote on `/programs` |
| **Equipment per instrument** | Seven verbatim answers, each behind its own page load | In the instrument index, under each name |
| **Community involvement** | Two verbatim sentences on `/about`, nowhere near the performances page | Opens a Community movement on `/performances` |
| **Group learning** | A name in a playbill, plus one contradicted adjective | Named and linked on the homepage, a column of the comparison, a stage of the pathway |

### One correction of substance

The homepage lessons line read **"Seven instruments, taught one-on-one."** That
silently took a side in the open format conflict — five instrument pages claim
every lesson in that instrument is private, while four other pages sell group
instruction in the same instruments. It has been rewritten to name both formats
without claiming which instruments are available in which, matching the wording
`/lessons` already used. **This was the site asserting an unresolved conflict as
fact.**

---

## 4. Testimonials surfaced

**9 of 14 render, up from 6**, each placed against the claim it supports. No
grid anywhere.

| Placement | Quote | Why there |
|---|---|---|
| Homepage anchor + 2 marginalia | Nikin Shah, Maria carolina Linares, Yaimarelys Grandales | Unchanged |
| Homepage + `/performances` | Dexter, romi, Brian Silverio | The showcase evidence layer |
| **`/programs/90-day-stage-program`** | Dexter | The page asserts a live showcase and carried no proof of one |
| **`/programs/band-builders`** | romi | The only quote tying a child in a show to the practice behind it |
| **`/performances` community** | **Mariana Olvera — newly surfaced** | The only review in the corpus about community rather than a teacher |
| `/about` | Elizabeth Garcia, J Val | Unchanged |

Attribution is preserved exactly, including lowercase display names and original
spelling. **No attribution was invented.**

**Still withheld, unchanged:** Mariana Gennevie Olvera (names a minor), Charles
Percy (names two minors, religious framing), John Granada (religious framing,
B-1 unresolved). **Still unplaced by choice:** Julian Paz (721 characters, and
contradicts itself mid-review) and Claudia Olivar (names two instructor
identities that may be one person, which brushes B-7).

Publishing Mariana Olvera is safe specifically because her possible duplicate —
Mariana Gennevie Olvera — names a minor and is filtered from every rendered set,
so at most one of the two can ever appear.

---

## 5. Programs strengthened

**Hierarchy is unchanged and intact.** The 90-Day Stage Program remains the
flagship by type size alone — no badge, no "most popular" flag, no card.

**The pathway is the substantive addition.** `/programs` now states the order
the three products form — the skill → the others → the stage — with every stage
linking its routes. This existed **nowhere**: not in the source estate, not in
the rebuild. Not one live page referenced another programme. It is authored
connective copy stating an order, and creates no business claim — no frequency,
no price, no duration, no promise.

**Band Builders.** Its four verbatim outcomes — playing together, how bands
work, timing and coordination, confidence while performing — were shipping as
four equal rows in a flat list under a label that did not say what they were
for. The page now leads with the premise that this is where a child learns to
play alongside someone else, which is the one thing a private lesson cannot
deliver, and ends with its neighbours in both directions.

**The performance qualifier is untouched.** The source says performance
opportunities "**may** include" recitals, community events and small concerts.
That conditional still ships exactly as written. Strengthening it to match the
footer's unconditional claim would be choosing a side of gate B-4.

**Early Childhood** is now linked and summarised, and the pathway says plainly
that it sits outside the order rather than pretending a three-year-old is on the
same track.

---

## 6. Lesson discovery improvements

The problem was never missing pages. It was that answering *"which of these is
my child in?"* required opening both format pages and all seven instrument
pages and holding the differences in your head.

**A seven-row comparison** on `/lessons` puts private and group side by side:
format, ages, experience needed, when, instruments, group size, what it builds
toward. Every cell is verbatim from the page that publishes it. Where one format
publishes a fact and the other does not, the row is blank rather than inferred.

Two rows are **deliberately absent**:

- **Frequency.** Both formats publish one, so the row would have been trivial to
  fill — and filling it would have put the open frequency conflict (seven pages
  against two) into the one object on the site designed to be read as settled
  fact.
- **Which instruments are available in which format.** The format conflict is
  open. Group instruments ship as the verbatim `/group-music-lessons/` sentence,
  which is itself conditional ("may include").

**"Where it leads" now renders on all seven instrument pages**, not the three
that happen to publish `programConnections`. Four of seven lesson pages
previously ended at their FAQ with no route to the performance programme at all.
Those links deliberately go to the flagship and `/performances` and **never to
group lessons** — guitar, violin and voice each state that every lesson in that
instrument is private, and linking them to the group programme would take a side
in the conflict by implication.

**Keyboard is unchanged**, and correctly so: listed as offered, linked nowhere,
with a plain note. No Keyboard content was fabricated.

---

## 7. Performance and community improvements

**An authored location for future events now exists** — the Upcoming movement,
placed second on `/performances` rather than at the bottom, because "when is the
next one" is the question that page exists to answer.

It says **"No date is announced."** in those words, explains that a date will not
be published before it exists, and offers the one useful action available. That
is an honest empty state, not a "check back soon".

The dead March 2025 record was **not** resurrected. Its date survives only as
search-index metadata for a URL that 404s, and `events.json` flags it unverified.
It is recoverable owner history, not publishable content.

**The gated `/events` footer link has been removed.** It rendered as a
permanently greyed-out word on all 27 routes, promising a section with no route
and no content. One real destination that says "not yet" beats a second grey
label that says nothing.

**Community involvement** moved onto `/performances`. The stronger-sounding
`/resources` claim — *"free performances and collaborative ensembles like choirs,
orchestras, and modern band"* — was deliberately **not** used: it is bundled at
source with the gate B-4 promise, and `content-conflicts.md` records that no
choir and no orchestra is offered anywhere on the site.

**No gated photography was published. Zero `<img>` elements render across all 27
routes** — verified in the built HTML and independently by the motion probe,
which reports zero image requests made by the browser.

---

## 8. Existing assets — used, reworked, rejected

**Every one of the eight files was opened and looked at.** No verdict was formed
from a filename, a prompt string or a metadata field.

> That method is not pedantry. Phase 4D described five legacy files as "icons"
> from their filenames, shipped them into `public/`, and they proved to be
> photographs of identifiable people — two including children.

### Looking changed the answer

The metadata is wrong about its own assets. Five records carry a **byte-identical
`prompt` field** while describing five different purposes. On the metadata alone
the correct conclusion was that all five were one generation relabelled five
ways. Opening them disproves it: they are visibly different, and
`atmos-stage-floor` is a genuine wooden stage floor lit from house right —
close to exactly what ACT II of the direction asks for, and nothing like what
its recorded prompt would produce. **The `prompt` field does not describe what
generated the file.** That is a provenance defect in the pipeline.

### Verdicts — **USE 0 · REWORK 2 · REJECT 6**

| Asset | Verdict | Why |
|---|---|---|
| `atmos-stage-floor` | **REWORK** | The strongest of the eight and the only one that depicts what it claims. Adopting it is a redesign of The Walk — currently a deliberate hairline-and-dot abstraction that doubles as the reduced-motion cut — not an enrichment of it |
| `atmos-paper-tooth` | **REWORK** | Beautiful paper. **Does not tile** (a diagonal light sweep crosses the frame, so `repeat` prints a grid of sweeps) and weighs **2.0 MB** |
| `homepage-hero-stage-light` | REJECT | No slot exists. ACT I is true black with nothing in the frame, by design |
| `homepage-hero-stage-light-mobile` | REJECT | Companion to a hero the direction does not have |
| `atmos-spotlight-cone` | REJECT | Beams from top centre; the film has one light, house right, whose position the runtime moves. Off-palette magenta |
| `atmos-warm-bloom` | REJECT | A picture of a light, where the beat is a 400ms luminance change. Off-palette crimson |
| `atmos-curtain-shadow` | REJECT | Pronounced magenta and crimson bands; the direction runs two colours and bans decorative colour |
| `atmos-depth-folds` | REJECT | Criss-crossing beams — a light show, against a film built on single-source restraint |

### A dead rule, removed

`atmos-paper-tooth` was referenced by a CSS rule scoped to
`[data-register='desk']` — **a value nothing in this codebase ever sets.** The
rule was dead, which is why its tiling defect and its 2 MB payload were never
observed: the texture has never rendered on any of the 27 routes. Removed rather
than repointed, because repointing it would have shipped both faults sitewide
the moment the selector started matching.

### Two things that are true at once

**None of these is unsafe** — all abstract, no people, produced under a
prompt-level person guard. **None of these is approved** — all eight remain
`pending-review`. Integrating a pending-review asset into a public page would be
publishing unapproved imagery. That, not quality, is why the two REWORK assets
stay out of the build.

---

## 9. New assets generated

**None.**

EE1 §9 permits the Gemini pipeline only where a genuinely missing atmospheric
asset would materially improve the experience. Nothing is missing: the film's
atmosphere comes from ground tokens, a moving CSS light source and a canvas
grain, and it works. The two assets that could earn a place are blocked on
**approval**, not on absence. Generating more would be filler — which the brief
prohibits — and would add to a shelf of eight unapproved images that has already
cost more than it has returned.

---

## 10. Remaining buried content

**Two items are still short of prominent, and both are blocked on owner
decisions rather than on design.**

| Item | State | Why it is still short |
|---|---|---|
| **Keyboard** | Weakly expressed | Genuinely sold in three places in the estate with no page, no description, no age guidance. Listed as offered and linked nowhere. Fabricating a page would be fabricating a product |
| **Spanish** | Weakly expressed | The only Spanish anywhere on this site is inside a customer review. The source claims "full bilingual support"; no Spanish content, switcher or hreflang has ever existed. A large Spanish-speaking audience is being served an English-only site |

**Arguable calls I have marked as resolved and a reviewer may not:**

- **Early Childhood** is marked prominent because it is linked and summarised on
  both hubs. A parent of a three-year-old still has no entry point aimed at them
  anywhere on the homepage. This is the row I would most expect to be challenged.
- **The homepage lessons movement** now carries three links (private, group, all
  lessons) where it had one. Three text links in a row is close to the edge of
  the film's restraint, and it is the change most likely to look busy on screen.

---

## 11. Remaining owner-gated opportunities

Unchanged by EE1, and all still blocking. In rough order of what they unlock:

1. **B-8 — tuition.** No figure exists anywhere for any programme. The single
   biggest unanswered question on the site; no amount of design fixes it.
2. **I-1 — photo consent.** Blocks all 18 photographs. `/photo-consent` exists to
   unblock it and **cannot yet be submitted** — it needs a storage destination
   with a confirmed processor.
3. **B-4 — the performance promise.** Two incompatible wordings. Neither ships.
4. **B-5 — the business name.** Four names in use. Blocks logo, schema, ™, og:image.
5. **I-8 — the unit number.** Three values. The camp page is where a parent drives.
6. **I-4 — the next showcase date.** The Upcoming location is built and empty.
7. **B-7 — instructor identities.** The only place a visitor learns a teacher's
   name on this entire site is **inside a customer review**. Families are
   introducing the staff; the business is not.
8. **Scholarship process.** Eligibility, steps, documents and coverage are
   published nowhere, and there is no outbound link to the administering body.
   This is the audience that most needs a path and has none.
9. **B-6 — Spanish.** Build it or the claim stays deleted.
10. **B-2 — adult provision.** Real or not.
11. **M-3 — showcase footage.** Ten to fifteen seconds, no faces, would unblock
    the film's payoff without touching I-1.

**Sound remains the largest unrealised idea in the project.** The direction calls
it the single biggest missed opportunity and the one thing no competitor would
copy — on a music school, where it is the subject. It needs a sound designer, not
a build.

---

## 12. Before / after assessment

**What genuinely improved.** A visitor arriving at the homepage now learns, in
the light, what this business is and where it is; can reach all six programmes;
can see that group learning exists; is told what happens if their child is too
shy at the exact moment the schedule provokes the question; and can compare
private against group without opening a page. Seventeen items moved. None
regressed.

**What did not change.** Not one business fact was created. No gate was resolved
by assumption. No conflict was settled. No photography was published. The film is
byte-for-byte the same experience — the motion probe asserts the letterbox, the
grain, the seam, the amber spill and the empty shout slot are all unchanged.

**The honest framing.** EE1 was mostly **repair, not enrichment**. The largest
single win — three programmes going from unreachable to reachable — was a stale
`route: null` in a content module. The second largest was a verbatim FAQ answer
the creative direction had explicitly specified and the build had omitted. These
are not new ideas; they are things the project already decided to do and did not
notice it had failed to do.

**What that says about the process.** Every one of these was invisible to
`typecheck`, `lint`, `build`, `check:tokens`, `check:a11y` and
`probe:motion` — all of which were green throughout — and invisible to the
migration audit, which rated the worst offender `FULL`. The gap was not
capability. It was that nothing asked whether a visitor could *get* to what had
been built. That is now a rendered table with a before column.

**I am not claiming a score.** Nine items are still withheld behind gates that
matter more than anything in this phase — a parent still cannot find out what
lessons cost.

---

## 13. Validation results

All run against a production build on 2026-08-09.

| Gate | Result |
|---|---|
| `npm run typecheck` | ✅ |
| `npm run lint` | ✅ |
| `npm run build` | ✅ 27 routes + robots, sitemap, 404 |
| `npm run build-storybook` | ✅ |
| `npm run check:tokens` | ✅ **13 / 13** |
| `npm run check:a11y` | ✅ **27 / 27 routes, 6 checks each** |
| `npm run probe:motion -- --production` | ✅ **12 / 12 assertions** |
| 27 routes return 200 | ✅ |
| 13 redirects → correct destination | ✅ 30x, 1 hop each, no loops |
| Dead internal links | ✅ **0** across 27 distinct internal hrefs |
| New 404s | ✅ **none** |
| Horizontal overflow at 390px | ✅ **0 routes** (was **26** — see below) |
| Horizontal overflow at 768px | ✅ **0 routes** |
| Homepage motion unchanged | ✅ letterbox 60→0px · grain present in film, absent at desk · seam 9px · amber 260px · shout slot empty |
| Reduced motion | ✅ zero animations run; 793 words and 1 `h1` readable |
| Indexing blocked | ✅ all three layers — `robots.txt` `Disallow: /`, `<meta robots>` noindex, `X-Robots-Tag: noindex, nofollow` on HTML **and** on `robots.txt` |
| Unapproved photography | ✅ **0 `<img>` site-wide**; motion probe reports **zero image requests** |
| Fake documentary imagery | ✅ none — no asset was integrated |
| Gate IDs / TODOs / repo paths in rendered HTML | ✅ **0 routes** |
| Secrets | ✅ none |
| Film typography regressions | ✅ one shout slot, still empty; whisper/statement registers unchanged |
| Generic-card regression | ✅ **0** card grids, icon rows or 3-column blocks on any public route |
| Sitemap | ✅ 26 entries; excludes `/_internal` and `/contact/book-a-trial` as designed |
| `/_internal/content-review` | ✅ **404 in production**, 200 in development |

### Two defects found and fixed during validation

**1. Target size on `/programs/band-builders` — caused by EE1.** Two
mid-sentence links sat directly on a `<dd>`, and `check:a11y` exempts inline
links from the 24px floor only when their parent is a prose element. Fixed by
wrapping the sentence in a `<p>`, which is what it is.

**2. 36px of horizontal scroll on 26 of 27 routes at 390px — pre-existing.**
Not caused by EE1: pages untouched by this phase (`/privacy`, `/terms`, `/faq`)
overflowed identically.

The header's trial button carried `className="hidden sm:inline-flex"`. It never
worked. `cn` is a plain concatenator with no conflict resolution, so the
Button's base `inline-flex` and the passed `hidden` both survived into the class
attribute — and in Tailwind v4 both sit in the same layer, so the winner is
decided by **emission order in the stylesheet, not order in the attribute**.
`inline-flex` is emitted later. A 143px wordmark + a 191px button + a 44px menu
control cannot fit 390px, so every interior page could be dragged sideways on a
phone.

> This is the **second** instance of this exact failure. The first squared off
> the primary CTA when `rounded-none` beat `rounded-(--radius-full)`, and is
> recorded in `content-migration-coverage.md` §"Found while building Tier 1".
> Two instances is a pattern, not a coincidence.

Fixed locally by moving the responsive display onto a wrapper `<span>`, where no
base class competes. **The real fix belongs in `cn`** — see §14.

---

## 14. Remaining weaknesses

Ordered by what I would fix next.

1. **`cn()` has no conflict resolution, and has now silently broken two
   components.** The file's own comment says "if genuine class-conflict bugs
   appear, swap the implementation here" — they have appeared, twice, and both
   were found by accident. Swapping in `tailwind-merge` changes class resolution
   in every component, which is not a change to make immediately before a visual
   review, so it is deferred rather than done. **Until it is, any
   `className` prop that fights a base utility can fail silently.** A cheaper
   interim option: a lint rule banning display/radius overrides via `className`.

2. **Nothing prevents the `route: null` defect recurring.** The fix was to
   correct three stale values. There is no check asserting that every entry in
   `programEntries` with a built page actually links to it. A ten-line assertion
   in `check:a11y` would have caught this weeks ago, and would catch the next one.

3. **The experience table is hand-maintained and will rot.** It is a judgement
   set with no mechanism keeping it true. Some rows *could* be mechanised —
   "does this content module's route resolve", "is this string present in the
   rendered HTML of the route it claims" — and until they are, the table's
   accuracy decays from the day it was written.

4. **One review appears on three pages.** romi's quote is on the homepage,
   `/performances` and `/programs/band-builders`. It is the best fit for each,
   but a visitor who reads all three will notice. The extraction's own criticism
   of the old site was testimonial over-repetition; this is a mild version of it.

5. **The 90-Day page still runs four consecutive point lists.** "In this
   program", "Build Confidence", "Learn Real Performance Skills", "Who Is This
   Program For?" are four visually identical blocks. EE1 added a pull quote and a
   pathway around them but did not restructure them, because doing so is a
   redesign of the flagship page and the brief forbids broad redesign. **It is
   still the most template-feeling stretch on the site.**

6. **`/performances` remains thin, and honestly so.** Three verbatim lines, an
   empty upcoming block, testimony and a community statement. It cannot get
   better until I-1 or I-4 closes. No amount of art direction substitutes for a
   photograph or a date.

7. **The generated-asset shelf is a sunk cost nobody has closed.** Eight images,
   ~18 MB, `pending-review` since 6 August, now formally classified — and still
   requiring an owner to say yes or no to two of them and no to six.

8. **I did not review this work in a browser.** Every claim above is verified by
   script, HTML inspection or by opening image files. Layout, rhythm, and whether
   the new House movement actually feels like the house lights coming up are
   **unassessed** — that is what the review below is for.

---

## 15. Stop conditions honoured

Not committed · not pushed · indexing not enabled · DNS not touched · no gated
photography published · no further phase begun.

**Nothing in the working tree from the previous session was disturbed.** The
development-only `/_internal/content-review` implementation is preserved and has
been extended, as instructed, and remains uncommitted.
