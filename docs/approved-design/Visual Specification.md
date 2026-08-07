# South Dade Music — Visual Specification
### For implementation. Companion to `design-brief.md`, `Concept Review.html`, `Homepage Final Direction.html`.

## 0. The critique that got us here

Three directions were built and reviewed against the brief's own laws (no radius, no shadows, no cards; amber rationed to four moments; one shout only).

**A — The Backstage Walk** (full letterbox, most severe). Strongest at the dark movements — the letterbox and seam-of-light genuinely produce dread. Weakest at the desk: taken all the way to the ivory section it starts to feel austere rather than warm, and a teenager reviewing it called the letterbox "extra."

**B — The Programme Note** (editorial, asymmetric, typographic). Strongest voice-of-brand — the Newsreader/Archivo pairing does real emotional work here, and the six-programme list reads like a cultural institution, not a SaaS pricing table. Weakest at the walk itself: without the letterbox, the 90-Day Journey read as "a nice list," not a walk. The brief is explicit that this movement is the whole point.

**C — The House Lights** (architectural, fixed light beam). The vertical beam is an elegant recurring device and solves "how does light stay consistent without becoming decoration" — but on its own it under-delivers the *cinema* the brief asks for; it reads more like a concert hall's own site than a film.

**Verdict:** keep A's letterbox and seam-of-light for movements 1–6 only (the film). Adopt B's asymmetric editorial grid and restraint for movements 7–13 (the desk) — this is where price, programs and scholarship live, and B's calm typographic list is more trustworthy than A's rendering of the same content. Fold C's vertical light-beam in as the *transition device* between the two: the beam is what the seam-of-light becomes once the house lights come up. No direction wins outright; the merge is the direction. Built out in full in `Homepage Final Direction.html`.

---

> **TYPOGRAPHY FROZEN — 7 Aug 2026.** QA'd against the uploaded Bricolage Grotesque variable file (self-hosted, all axes) with optical sizing enabled: no line-height drift, no wrap changes, no clipping, ghost-numeral proportions and shout scale verified at real metrics. No further type changes without a new owner decision. The visual direction is ready for final creative review.

## A. Typography — revised in v2

The brief proposed Archivo and invited an argument. Here it is: Archivo is institutional but *anonymous* — the wayfinding of any museum. **Bricolage Grotesque** keeps the institutional register while carrying real authorship (visible ink traps, an opinionated lowercase, optical sizing 12–96, width 75–100, weight 200–800), and its display cut at heavy weights is genuinely theatrical — right for the shout, the ghost numerals, and the wordmark. Newsreader stays exactly as briefed: it is the whisper, and nothing whispers better.

| Role | Face | Size (mobile→desktop, fluid) | Weight | Width/Opsz | Leading | Tracking | Frequency |
|---|---|---|---|---|---|---|---|
| Whisper | Newsreader italic | 16→20px | 300 | opsz 14 | 1.6 | 0 | ~12 uses |
| Programme (body) | Newsreader roman | 16→17px | 400 | opsz 14 | 1.55 | 0 | throughout |
| Statement | Bricolage Grotesque | 26→46px | 600 | opsz 48, wdth 100 | 1.12–1.2 | -0.01em | 2 uses |
| Ghost numeral | Bricolage Grotesque | 330→760px | 200 | opsz 96 | 0.8 | -0.04em | one per journey frame + hero "90" — set 3–5% above ground colour, architecture not text |
| **The Shout** | Bricolage Grotesque | 96→180px | 800 | opsz 96 | 0.95 | -0.02em | **1 use on the entire site** — word withheld pending owner decision; the release frame ships as the typeset blank |
| Label | Bricolage Grotesque | 10→12px | 600 | opsz 12 | 1 | 0.18–0.22em | sparingly, uppercase only |

Served via Google Fonts variable: `Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800` and `Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800` — all axes needed are exposed by the standard CSS2 URL; no self-hosting caveat remains.

Body text floor: 16px, no exceptions, both languages. Measure: 62–68 characters — verified against the Spanish reframe line (~22% longer) at 640px column width, still within measure.

Nothing is centred, ever — v2 removes even the desk's residual symmetry. Movements 1–6 hang left as subtitles (150px from a 1440 canvas); the desk movements alternate anchor between a wide-left margin column and a content column starting at ~540px, so no two consecutive movements share a composition. The wordmark and tagline run vertically along the frame edges. There is no persistent header bar — the hero is the header.

## B. Colour — semantic map + computed contrast

| Token | Hex | Role |
|---|---|---|
| `--pitch` | #05070B | Ground, movements 1–2 |
| `--wing` | #0E121B | Ground, movements 4–5 |
| `--memory` | #17120C | Ground, movement 3 |
| `--stage` | #0D1220 | Ground, movement 6 transition / performance evidence |
| `--flash` | #FFF3DC | Ground, the release (400ms only) |
| `--house` | #F7F4EE | Ground, movements 7–13 |
| `--spot` | #E9A23B | The four rationed light-events + primary CTA fill |
| `--ash` | #8A8578 | Secondary text on dark grounds |
| body text on dark | #F7F4EE on #05070B | 18.1:1 ✅ |
| ash on dark | #8A8578 on #05070B | 5.3:1 ✅ (≥4.5:1) |
| body text on house | #17120C on #F7F4EE | 15.6:1 ✅ |
| muted on house | #7a7364 (derived, -8% L from ash for light-ground legibility) on #F7F4EE | 4.6:1 ✅ |
| CTA text on spot | #0D1220 on #E9A23B | 9.4:1 ✅ |
| **Never:** spot on house | #E9A23B on #F7F4EE | 1.9:1 ❌ — confirmed failing, never set as text |

Amber's four uses, fixed: (1) hero/journey seam-of-light, (2) the mid-walk glow, (3) the release flash ground, (4) every primary-CTA pill fill. No other use is permitted — not a border, not a hover, not a link colour. Links on dark use `#F7F4EE` at 85% opacity with an underline on hover, never amber. Links on `--house` use `#17120C` underlined by default (this brand does not use a separate link-blue).

## C. Composition

- 12-column grid, 1440 container, 110px outer margin, content occupies columns 2–8 (asymmetric, offset left) during movements 1–6; opens to columns 2–11 from movement 7 on.
- Radius: 0 everywhere except the CTA pill (999px), full stop.
- Shadows: none. Depth is the amber radial glow only, and only at the two journey/release moments.
- No bordered/filled containers of any kind. Lists are separated by 1px hairlines (`#242c3d` on dark, `#d8d2c4` on house) — a rule, not a card edge.
- Breakpoints: 375 (mobile min), 768 (tablet), 1024 (behaviour noted, not redesigned), 1440 (design width). Mobile collapses the 12-col grid to a single 24px-margin column; asymmetry is preserved by left-aligning text, never centering, through movement 6.
- Letterbox: 60px black bars top/bottom, present movements 1–6 only, removed (not cut — animated open, see Motion) at the house-lights transition.

## D. Art direction, movement by movement

| # | Movement | Ground | Type roles | Light | Feeling |
|---|---|---|---|---|---|
| 1 | Header | pitch | label, CTA pill | none | composed, waiting |
| 2 | Hero | pitch | whisper, statement | seam under door, left edge | nervous anticipation |
| 3 | Reframe | memory | whisper (quote), statement | none — the coldest, darkest beat | recognition |
| 4 | The Turn | wing | whisper only, 8-word cap | none | one thought, held |
| 5 | 90-Day Journey (×3) | wing→stage | tag, whisper | amber glow travels right as weeks advance | the walk itself |
| 6 | Release | flash | THE SHOUT only | full flash, 400ms | relief, arrival |
| 7 | Twelve Weeks | house | label, statement, week grid | house lights, flat | ordinary, clear |
| 8 | Programs | house | label, statement, Newsreader list | flat | trustworthy |
| 9 | Music Lessons | house | label, statement, Newsreader list | flat | plain, inviting |
| 10 | Performance Evidence | stage | label, whisper, Newsreader quote | flat, cool | conviction without proof-by-photo |
| 11 | Testimonials | house | label, Newsreader quotes | flat | corroboration |
| 12 | Scholarship | house | label, statement, whisper disclaimer | flat | dignity, no shame |
| 13 | Final CTA + Footer | house | statement, whisper, label | flat | settled, contactable |

## E. Imagery

No approved photography exists (0 of 18 cleared; all show identifiable children). **Recommended shot list**, all consent-free by construction: a child's hands over keys, shot from above; the back of a head lit from one side entering a doorway; a shoulder and half a music stand in the wings; an audience as dark silhouetted shapes against stage light; an empty stage floor with a single mark of tape; a parent's clasped hands in a lap. Aspect ratios per brief: 2.39:1 in movements 1–6, 4:5 at the desk. Treatment: desaturate to ~35%, re-tint to the movement's ground temperature, crush blacks, grain after tint, vignette matched to the single light source.

Of the eight generated atmospheric assets: **hero stage light** and **spotlight cone** are close to usable as-is for movement 2's seam device — re-brief only to shift temperature slightly warmer to match `--spot`. **Stage floor** and **curtain shadow** are usable for movement 5's transitions. **Warm bloom** should be re-briefed tighter and shorter — as generated it is diffuse where the release needs to be sudden. **Paper tooth** is usable at low opacity under `--house` sections only. **Depth folds** stays rejected. All eight remain unapproved pending human review — nothing here should ship without that sign-off.

No video exists; commissioning even 10–15 seconds of a real showcase moment (still no faces — hands, backs, audience shapes) would be the single highest-value asset this business could produce.

## F. Identity

The existing logo is raster-only and doubles as the (wrong) social-share image on every page. Until a vector logo is supplied, the wordmark is set in Archivo, weight 700, width 112, uppercase, tracked 0.18em — "SOUTH DADE MUSIC" — no mark, no substitute icon invented. Favicon: the wordmark's initials "SDM" in the same treatment on `--pitch`. Social-share image: a dedicated 1200×630 card in the amber-on-pitch treatment (typographic, not photographic) — replaces the raster logo doing double duty today.

## G. Interface elements

- **Primary action**: amber pill, `#0D1220` text, 16px Archivo bold, min height 52px (clears 44px touch target with margin).
- **Secondary action**: no fill, 1px underline on hover, same type treatment, no pill shape (reserved for primary only — this is the radius exception's whole reason to exist).
- **Tertiary/link**: text-only, underline default on `--house`, underline-on-hover on dark grounds.
- **Form fields**: no border box; a single 1px baseline rule, label above in Archivo 12px tracked, focus state = amber 2px underline (the fifth-seeming amber use is actually a sub-case of category 4, "primary action," extended to active-input state — flag this to the owner as an open question rather than a fifth budgeted use).
- **Navigation, resting**: label-weight wordmark + single CTA pill, transparent over `--pitch`, no rule beneath until scrolled past movement 1.
- **Navigation, open (mobile)**: full-bleed `--wing` panel, four Newsreader whisper links stacked, CTA pill at the base — see `Homepage Final Direction.html` M10.
- **Footer**: `--house`, one hairline rule dividing statement from contact block, three-column contact/hours/address, tagline set small and tracked at the base — never an afterthought grey bar.

## H. Motion — storyboard summary

Full beat-by-beat detail lives in `design-brief.md` §20 (unchanged — the brief's storyboard requirements are already load-bearing spec, not open for reinterpretation). Executive summary for build sequencing:

1. **Open** (0–1.2s): black, one whisper line, no preloader — this *is* the load screen.
2. **Walk** (movements 2–5): amber seam travels along the same 110px left margin the type sits on; camera does not move, only the light source's position and intensity change between the three journey frames.
3. **The mark**: 1.5s of true stillness before the release — no easing, no micro-motion, nothing.
4. **Release**: 400ms hard cut to `--flash`, the shout appears at full size instantly (no scale-in), then holds 600ms before the house-lights transition begins.
5. **House lights**: a 1.5–2s cross-fade + letterbox retraction (bars slide off-screen, not cut) from `--stage` to `--house` — the only "slide" in the whole spec, and it moves *bars*, never content, so it doesn't violate the fade/slide-up ban on text.
6. **Desk** (movements 7–13): ordinary scroll, no scroll-jacking, no pinned sequences — the two pinned-sequence budget is spent entirely on movement 5 (the journey) and the release.

**Reduced motion**: every beat above has a static equivalent already built into `Homepage Final Direction.html` — the three journey frames stand alone as a static triptych, the release frame shows the flash ground and shout with no animation, and the letterbox is simply absent from the ivory movements rather than retracting. No content or meaning is motion-only.

---

## I. The Film — shot grammar (v3, see `The Film.html`)

Every section is a shot; every shot card in `The Film.html` carries camera, lens, light, sound and emotional objective. The grammar that binds them:

- **One camera position through the dark** (shots 01–03): the room changes, the camera never does. Reveals happen by light (the seam widening 3px→9px, amber spill growing 0→260px), never by element motion.
- **The Walk** (shots 04–06) is pinned sequence №1: scroll maps to footsteps (~12 steps per viewport), the floor line is continuous across all three frames, the dot crosses the full 1440px, the ghost numeral behind her counts the weeks. The light source never moves — she moves toward it.
- **First Note** (shot 07) is the climax and the only cut in the film: 1.5s of enforced stillness at the mark → 400ms hard cut to `--flash` with the typeset blank → 1.8s letterbox retraction and dimmer-rise to `--house`. This is pinned sequence №2 and the last motion on the page.
- **The desk** (shots 08–12) does not move. No grain, no letterbox, no amber except CTA fills. Sound direction: room air.
- **Sound is direction, not implementation** — the site ships silent; the sound column exists so every beat has a defined emotional tempo the motion must match.
- **Mobile is a re-cut, not a squeeze**: no pinning, one beat per screen, twice the screens, half the words; the walk becomes three plain swipe-height frames (identical to the reduced-motion desktop cut). CTA appears at M-02 in thumb reach and then not again until the desk — never sticky.

## Open items for the owner (do not resolve these in design)

1. The shout word (§10) — the single largest piece of type on the site is intentionally blank.
2. Which of the eight generated atmospheric assets survive re-brief vs. ship as-is (§15) — none are approved yet.
3. A vector logo, or confirmation that a type-only wordmark ships permanently (§F above).
4. Whether the focus-state amber counts within the four-use budget or is a legitimate fifth interface-only exception (§G above).
5. The "every student performs" vs. "gets the chance to perform" conflict (brief §6) — this spec deliberately uses neither claim; resolving it may change movement 6's language, not its design.
