# Final Design Mapping — Approved Direction → Codebase

**Date:** 2026-08-07
**Source of truth:** `docs/approved-design/` (direction approved 7 Aug 2026)
**Precedence:** `The Film.html` > `Visual Specification.md` > `HANDOFF.md` > this file
**Baseline:** `223516d` · foundation was frozen at `c460a4e`, now unfrozen for implementation

---

## 0. Package received and verified

| File | Role |
|---|---|
| `The Film.html` | **Visual source of truth.** 12 desktop shots, 6-beat mobile re-cut, 3 specimens |
| `Visual Specification.md` | Rules and rationale, computed contrast, per-movement art direction |
| `HANDOFF.md` | Repository mapping, 8 component-work items, gates answered |
| `tokens.css` | Drop-in replacement for `src/styles/tokens.css` |
| `fonts/BricolageGrotesque-VariableFont_opsz_wdth_wght.ttf` | Structure face, all axes |

The package was delivered to `~/Downloads/South Dade Music/` and has been copied
into the repository at `docs/approved-design/` so it is version-controlled.

## 0.1 Three internal conflicts — all resolved by the package's own precedence rule

The README states: *"Where any other document disagrees with `The Film.html`,
this file wins."* No design decision is required.

| Conflict | Resolution |
|---|---|
| `Visual Specification.md` §F/§G specify **Archivo** for the wordmark, CTA type and form labels — but Archivo is being removed | **Bricolage Grotesque.** `The Film.html` sets all three in Bricolage (`.pill`, `.tag`, wordmark); `tokens.css` has no Archivo token. §F/§G prose is stale from v1. |
| §C/§H say **110px** outer margin; `tokens.css` and `HANDOFF.md` say **150px** | **150px.** Every frame in `The Film.html` hangs type at `left:150px`, and `--grid-margin: 150px` at ≥1280px. |
| §A line 33 says Google Fonts CDN is acceptable; `HANDOFF.md` §2 and the README say self-host | **Self-host.** The README is explicit: *"the production build must self-host per the no-font-CDN rule."* The CDN link in `The Film.html` is preview-only. |

Two referenced documents were not supplied — `Concept Review.html` and
`Homepage Final Direction.html`. `The Film.html` is the v3 successor to both and
is self-sufficient; §D of the specification art-directs every movement the comps
do not draw.

## 0.2 Movement count reconciled

`Visual Specification.md` §D lists **13 movements**. `The Film.html` draws **12
shots**. They reconcile: movement 1 (Header) is folded into shot 01 because the
hero *is* the header, and the comps draw the key shots rather than all thirteen.

Four movements are art-directed in §D but not comped — **The Turn, Twelve Weeks,
Music Lessons, Performance Evidence**. These are built from §D's ground/type/
light/feeling row plus the desk grammar established in shots 08–12. This is
faithful implementation, not invention.

---

## 1. Classification summary

| Class | Count |
|---|---|
| KEEP | 11 |
| TOKEN CHANGE | 7 |
| MODIFY | 6 |
| REPLACE | 9 |
| NEW | 8 |
| REMOVE | 5 |

---

## 2. Typography

| Item | Class | Detail |
|---|---|---|
| **Bricolage Grotesque** | **REPLACE** | Replaces Archivo. Variable `opsz 12–96 · wdth 75–100 · wght 200–800`. TTF supplied → subset + convert to woff2 (latin, latin-ext). Wired as `--font-bricolage`. |
| **Newsreader** | **NEW** | Roman + italic variable, `opsz 6–72 · wght 200–800`, latin + latin-ext. Not supplied — pulled from Google Fonts (OFL) and self-hosted. `--font-newsreader`. |
| **Inter** | **REMOVE** | Deleted from production. Two woff2 files removed. |
| **Archivo** | **REMOVE** | Deleted from production. Two woff2 files removed. |
| `font-optical-sizing: auto` | **NEW** | Both families. |
| **One-shout rule** | **TOKEN CHANGE** | `display-xl` re-valued 96→180px, Bricolage 800, opsz 96. Exactly one use site-wide, on the Release. |
| Statement | **TOKEN CHANGE** | `display-lg` re-valued 26→46px, Bricolage 600. Two uses per page. |
| `--text-whisper` | **NEW** | Newsreader italic 300, 16→20px. ~12 uses. |
| `--text-ghost` | **NEW** | Bricolage 200, 330→760px, at `--opacity-ghost`. |
| `--text-label` | **TOKEN CHANGE** | Bricolage 600, 10→12px, tracking 0.18–0.22em, uppercase only. |

## 3. Colour

| Item | Class | Detail |
|---|---|---|
| Six ground tokens | **NEW** | `--color-ground-{pitch,wing,memory,stage,flash,house}` |
| Stage ramp | **MODIFY** | Retained for UI depth on dark; re-valued. Resolves the naming collision I flagged in the previous pass — grounds are namespaced `--color-ground-*`, so no silent repointing occurs. |
| Spotlight ramp | **REPLACE** | 5 steps → `spot-500` (#E9A23B) + `spot-700` (#8A5A1B) |
| Velvet | **REMOVE** | Retired. Tokens resolve to the text colour so stale references fail soft; removed in cleanup. |
| Neutral ramp | **TOKEN CHANGE** | Re-anchored to ivory `#F7F4EE`. |
| `--color-ash` | **NEW** | Secondary voice on dark, 5.3:1 on pitch. |
| **Amber ration** | **TOKEN CHANGE** | Four uses: the seam · the source · the flash · the CTA fill. Never a border, hover, or link. |
| **Focus ring** | **KEEP** | Stays amber — the specification documents this as a deliberate sub-case of the CTA use, and flags it to the owner as an open question. Accessibility contract preserved. |
| Contrast contract | **KEEP** | Recomputed: 18.1 / 15.6 / 9.4 / 5.3 / 4.6:1. Amber-as-text on house = 1.9:1, banned. |

## 4. Composition

| Item | Class | Detail |
|---|---|---|
| **Zero-radius** | **TOKEN CHANGE** | All radius tokens → 0. |
| **CTA pill exception** | **KEEP** | `--radius-full: 9999px`, primary action only. |
| **Zero-shadow** | **TOKEN CHANGE** | All shadow tokens → `none`. |
| `--shadow-spotlight` | **MODIFY** | Redefined as the one glow (the mark, the release), no longer a CTA ring. |
| **Zero-card** | **REMOVE** | No card usage on the homepage. `ui/Card` retained for interior routes, unused here. |
| Grid margin | **TOKEN CHANGE** | 24 / 32 / 48 / **150px** at ≥1280px. |
| Hairlines | **NEW** | 1px rules replace all container edges: `#242c3d` on dark, `#d8d2c4` on house. |

## 5. The eight new devices

| # | Device | Class | Spec |
|---|---|---|---|
| 1 | **Letterbox** | **NEW** | 60px bars, film movements only, retract over `--duration-houselights` (1800ms). Absent — not animated — under reduced motion. |
| 2 | **Ghost numerals** | **NEW** | `aria-hidden`, presentational span, `--opacity-ghost` (5%). Hero "90", journey 1 / 6 / 12. |
| 3 | **The seam** | **NEW** | Left-edge amber gradient, 3px → 9px, plus a 0 → 260px amber spill. Driven by the existing light rig. |
| 4 | **The Walk** | **REPLACE** | Pinned sequence №1. Continuous floor hairline, dot 150px → 1180px, ghost numeral 1 → 6 → 12, light intensity 8% → 20%. |
| 5 | **The Release** | **REPLACE** | Pinned sequence №2. 1500ms stillness → 400ms hard cut to flash → 1800ms letterbox retraction and dimmer rise. Shout ships as a typeset blank. |
| 6 | **No homepage header** | **MODIFY** | Vertical wordmark + edge tagline + one CTA inside the hero. `--opacity-header-ground: 0`. Interior routes keep the existing header. |
| 7 | **Editorial treatments** | **REPLACE** | Programs playbill (No. 1–6, flagship 52px italic vs 27px), testimonials anchor + marginalia, scholarship formal notice. |
| 8 | **Grain** | **MODIFY** | Component exists. Scope to film movements only, `--opacity-grain` 5%, SVG turbulence data-URI from the comps. **No grain below the house lights.** |

## 6. Homepage movements

| # | Movement | Ground | Component | Class |
|---|---|---|---|---|
| 1 | Header | pitch | folded into Hero | **REMOVE** (homepage only) |
| 2 | Hero | pitch | `Hero` | **REPLACE** |
| 3 | Reframe | memory | `Reframe` | **REPLACE** |
| 4 | The Turn | wing | `TheTurn` | **REPLACE** |
| 5 | Journey ×3 | wing→stage | `NinetyDayJourney` | **REPLACE** |
| 6 | Release | flash | — | **NEW** |
| 7 | Twelve Weeks | house | `NinetyDayJourney/TwelveWeeks` | **REPLACE** |
| 8 | Programs | house | `Programs` | **REPLACE** |
| 9 | Music Lessons | house | `MusicLessons` | **REPLACE** |
| 10 | Performance Evidence | stage | `PerformanceGallery` | **REPLACE** |
| 11 | Testimonials | house | `Testimonials` | **REPLACE** |
| 12 | Scholarship | house | `Scholarship` | **REPLACE** |
| 13 | Final CTA + Footer | house | `FinalCta`, `Footer` | **MODIFY** |

## 7. Motion

**Runtime: KEEP.** GSAP registration, Lenis, capability tiers,
`sdm:reduced-motion`, `FilmDirector` cleanup, `light.ts`, `camera.ts`,
`diagnostics.ts`, `easing.ts` are all consumed as-is. No competing system.

| Timeline | Existing | Class |
|---|---|---|
| **Opening** | `HeroTimeline` | **MODIFY** |
| **Wings** | — | **NEW** |
| **Walk** | `WalkTimeline` + `JourneyTimeline` | **REPLACE** — merged, pinned |
| **Release** | `FirstNoteTimeline` | **REPLACE** — exact beats |
| **Memory** | `GradeTimeline` | **MODIFY** |
| **Houselights** | `FinaleTimeline` | **MODIFY** |
| `EmergeBatch` | — | **REMOVE** from the homepage — reveals are by light only |

**Pinning budget resolved.** The config's two-pin cap is unchanged; the approved
pair is re-allocated from `ninety-day-timeline` / `exposure-ladder` to
**The Walk** and **The Release**. Still exactly two. The desk does not move.

## 8. Assets

Per `Visual Specification.md` §E — all remain unapproved pending human review.

| Asset | Verdict |
|---|---|
| `homepage-hero-stage-light` | **USED** — re-brief warmer (+200K) |
| `atmos-spotlight-cone` | **USED** — re-brief warmer (+200K) |
| `atmos-stage-floor` | **USED** — transitions |
| `atmos-curtain-shadow` | **USED** — transitions |
| `atmos-warm-bloom` | **REPLACE** — re-brief tighter; diffuse where the release needs sudden |
| `atmos-paper-tooth` | **USED** — house sections only, ≤4% opacity |
| `homepage-hero-stage-light-mobile` | **PENDING OWNER APPROVAL** |
| `atmos-depth-folds` | **REJECTED** |

No new assets generated. No AI-generated people, students, teachers, parents,
facilities, performances or awards.

## 9. Build order (per README §Implementation order)

1. Fonts → 2. Tokens → 3. Desk movements → 4. Film movements →
5. The Walk (static cut first, pin as enhancement) → 6. The Release → 7. Verify

---

## 10. Owner decisions still open — carried, not resolved

1. **The shout word.** Ships as a typeset blank.
2. **Which generated assets survive re-brief.** None approved.
3. **Vector logo**, or confirmation that a type-only wordmark ships permanently.
4. **Whether focus-state amber counts inside the four-use budget** or is a
   legitimate interface-only fifth.
5. **"Every student performs" vs "gets the chance to perform."** Neither claim
   is used.
