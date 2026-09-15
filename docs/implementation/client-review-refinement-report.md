# Client-review refinement — report

**Date:** 2026-09-15 · **Branch:** `master` · **Scope:** homepage narrative, navigation, motion, interior openings, QA.

References studied for UX principles only (not branding, copy or assets):
`eterlody.framer.website` (playful, card-heavy — used mainly as a list of what to avoid) and
`fermata.framer.website` (editorial — hero fact strip under a hairline, sticky split for an
enrolment path, one large testimonial, full-screen serif mobile menu with CTA and phone).

---

## 1 · What was wrong

Measured on the previous build at 1440:

| Defect | Evidence |
|---|---|
| Four near-empty dark viewports before any proof | Reframe (88svh) + three pinned Walk frames (dot on a hairline, one italic line each). First authentic photograph at ≈ y 5,400px. |
| A blank climax | The Release: a 5px rule, one line and a small photo on cream. |
| The twelve weeks told twice | Once as the Walk, once as text rows with generated plates. |
| Programmes invisible on touch | Six programmes, one sticky photo that only changed on hover. |
| Awkward blank bands | A near-empty ivory screen above Scholarship; a sparse final CTA. |
| Navigation | Lesson formats split across two menus; triggers were links with a visually hidden toggle; greyed-out gated items inside menus; trial CTA hidden below 480px. |
| Header state | Switched ~1,600px late on the homepage (observer thresholds never crossed). |
| Footer mark | Stretched horizontally below 480px (`align-items: stretch`). |
| Logo files | "Transparent" background was alpha=2 across 70% of the canvas, visible as a faint box after optimisation. |
| Interior routes | Headlines capped at 36px on a wide cream field; photo `data-reveal` attributes did nothing (no director on interior routes). |

## 2 · Homepage — one argument, in order

| # | Section | Ground | Media (all approved first-party unless marked) | Motion personality |
|---|---|---|---|---|
| 1 | `HomeHero` | pitch | `ensemble-guitars` full bleed, priority | cinematic: push-in settle under the preloader, masked line reveal, scroll drift |
| 2 | `Introduction` (#desk-begins) | ivory | `stage-floral` + `bass-hands` detail on a mat | editorial: open-right, detail rises and counter-drifts |
| 3 | `ProgramsShowcase` | ivory | flagship `first-note`; `ukulele-wall`, `lesson-room`, `event-park`, `camp-circle`; **generated** `program-early-rhythm` | directional: alternating apertures |
| 4 | `LearningJourney` (#twelve-weeks) | stage | `lesson-duet`, `stage-set-purple`, `medals-on-stage` + `medals`; generated insets `week-practice`, `week-peers`; backstage clip as weather | progressive: slot → curtain → arrive, insets half a beat later, week counter 1→12 |
| 5 | `PerformanceStory` | ivory | `ensemble-leis`, `event-la-bamba`, `band-showcase`, `event-holiday` | energetic, restrained: lines from alternating sides, differential drift |
| 6 | `Voices` | memory | `full-house` | quiet: slow fade; reviews change only on request |
| 7 | `Philosophy` + scholarship notice | ivory | `community-event` | a held breath on the protected sentence |
| 8 | `HomeFaq` | ivory | — | none (native `<details>`) |
| 9 | `HouseLights` | pitch | `recital-room` | warm, resolving: grade lifts, warm source comes up |

Retired components (in git history): `Opening`, `Reframe`, `TheWalk`, `TheRelease`/`HouseLightsReveal`, `Desk`, `ProgramsIndex`, `ProgramsRail`. No pins remain.

Kept from The Film: the temperature arc, letterbox and grain over the opening (retracting on `#desk-begins`), the single warm source house-right, amber rationed to the trial and the week counter, the backstage clip, the preloader, the ambience control.

## 3 · Navigation

`Lessons ▾ · Programs ▾ · Performances · About ▾ · Contact` + **Book a Trial — $25**.

- Triggers are real buttons with visible chevrons; overview pages are the first link in each sheet.
- Full-width editorial sheets hanging from the header edge: grouped links with verified one-line facts, and an approved photograph (mounted on first intent only).
- No dead band; 220ms close grace; 160ms switch intent so the diagonal path to the photograph never hijacks to a neighbour; switching swaps in place without re-dropping.
- Keyboard: Enter/Space, ArrowDown into the sheet, ArrowLeft/Right across the bar, Escape returns focus, Tab-out closes. Touch uses buttons only. Outside click closes.
- Active section is derived with children first (`/programs/early-childhood` → Lessons).
- Header floats over the hero (ivory mark) and turns solid at the first light section or when a menu opens (green mark).
- Mobile: trial button always visible in the bar; full-screen stage-register sheet portalled to `<body>`, serif sections, animated accordions, CTA + phone + email pinned, focus trapped, `data-lenis-prevent`.
- Gated entries (`/programs/adults`, `/teachers`, `/pricing`) no longer render as greyed-out text. Footer gained "All lessons".

## 4 · Verification (production build, `next start`)

| Check | Result |
|---|---|
| `typecheck`, `lint`, `build` | pass (33 routes) |
| `check:tokens` | 13/13 |
| `check:a11y` | 27/27 routes; reduced motion stops all animation |
| `check:softnav` | 6/6 hops; 0 pins; every heading un-split and every frame opened after round trip |
| `probe:motion --production` | all assertions pass (letterbox 60→0, grain on/off, header overlay→solid, counter reaches 12, no console noise) |
| Nav interaction script | hover open, diagonal stays open, switch, leave closes, Enter, Tab in, Escape + focus return, ArrowDown, outside click, close on route, mobile focus inside dialog, Escape closes |
| Overflow-x | 0 at 1440 / 1280 / 1024 / 768 / 430 / 390 |
| LCP (local, unthrottled) | hero headline — 88ms desktop, 68ms mobile |
| CLS | 0 on load and through a full scroll, both widths |
| Homepage initial image payload | 180 KB desktop / 191 KB mobile; ~560 / ~720 KB after a full scroll; video fetched only near its section |
| Broken links / images | none across 27 routes; every image source is `/media`, `/images/generated` or `/brand` |
| noindex | `X-Robots-Tag`, `<meta robots>` and `robots.txt` all block; `/_internal` and `/_media-review` 404 |

## 5 · Open content questions (unchanged facts, new visibility)

1. Is the headline promise "In 90 days, your child takes a stage." approved? (B-4 — shipped as it was.)
2. The source publishes a three-step 90-day narrative and a week grid with no mapping between them; the homepage shows the week grid only.
3. `program-early-rhythm` is generated — owner to approve, or supply an early-childhood class photograph.
4. Instructor introductions (B-7), tuition (B-8), lesson frequency, bilingual support (B-6) and the unit number (I-8) remain open, as recorded in `docs/review/content-conflicts.md`.
