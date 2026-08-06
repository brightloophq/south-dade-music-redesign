# Visual Direction — The Walk

**Date:** 2026-08-06
**Status:** Visual direction. No implementation.
**Concept:** confirmed — "The Walk" (`docs/homepage/07-the-walk.md`)
**Supersedes:** `docs/redesign/final-art-direction.md` §7 Typography, §8 Colour,
§9 Photography, §10 Generated assets. The two-register House/Desk *structure*
survives; its visual skin does not.

---

## 0. What this document is for

`07-the-walk.md` settled the **experience**: eight acts, the walk from the wings
to the microphone, the face you never see. It sketched typography as a
four-row table and colour as eight hex stops. That is a mood board, not a
specification — you cannot build from it and two people would build differently.

This document settles the **visual language**: the typefaces, the colour system,
the compositional laws, and the image treatment. It is the layer between the
concept and the code.

---

## 1. The decision that matters most

> ## Inter has to go.

The brief lists what this site must not resemble: a SaaS landing page, a
Tailwind template, a generic school site, an AI-generated startup page. Five of
the seven prohibitions describe the same visual dialect.

**Inter is the native typeface of that dialect.** It is the face of Vercel,
Linear, Tailwind's own documentation, and a decade of startup interfaces. It was
drawn — superbly — to be invisible in software UI. Invisibility in software is
precisely the quality we cannot afford in a page whose stated job is to carry
the experience through typography.

Nobody in South Miami-Dade will say "that's Inter." They will say **"this looks
like an app."** That is the same failure, reported by a parent instead of a
designer.

Keeping it is the single largest gap between the brief and the build.

### What replaces it

Two families. One institutional, one human.

| Role | Face | Axes | Carries |
|---|---|---|---|
| **Structure** | **Archivo** | `wght 100–900`, `wdth 62–125` | Navigation, labels, data, the week counter, the one shout |
| **Voice** | **Newsreader** | `opsz 6–72`, `wght 200–800`, roman + *italic* | Every whispered in-frame line, pull quotes, all reading copy |

**Archivo stays.** It is already committed as a variable font with a real width
axis, it is a competent grotesque, and it reads institutional rather than
corporate. It does the work a cultural institution's wayfinding does: tell you
where you are, without personality getting in the way.

**Newsreader arrives.** A variable serif with an optical-size axis and a genuinely
expressive italic. At 20px in the dark it reads as a **subtitle in a film** or a
**programme note in your hands** — both exactly right. Its italic is the whisper
voice the concept has been describing for two documents without ever specifying
a face that could deliver it.

The pairing is *grotesque for the building, serif for the person inside it.*
That is what performing-arts institutions actually look like, and it is not what
software looks like.

### Why this is cheap

The foundation loads fonts through `next/font/local` from `src/styles/fonts/`,
and every size and weight resolves through `src/tokens/typography.ts`. Swapping a
family is a token edit plus two `.woff2` files. **No component changes.** This is
the swap point the architecture was built to have.

Newsreader must ship `latin` **and** `latin-ext` subsets — the Spanish tree is
authored, not translated, and needs its accents.

---

## 2. Type scale and the law of one shout

The typographic idea is **the distance between a whisper and a shout, and how
rarely we shout.**

| Role | Face | Size | Settings | Frequency |
|---|---|---|---|---|
| **Whisper** | Newsreader *italic* | 20 / 22px | `opsz 20`, `wght 300` | ~12×, Acts I–III |
| **Statement** | Archivo | 40 / 48px | `wght 600`, `wdth 100` | 2× |
| **THE SHOUT** | Archivo | 180px (`clamp` to 64px) | `wght 700`, `wdth 112`, tracking −0.03em | **1×, Act IV only** |
| **Programme** | Newsreader roman | 17–19px | `opsz 16`, `wght 400`, measure 62–68ch | Acts V–VIII |
| **Label** | Archivo | 12px | `wght 500`, tracking 0.14em, uppercase | sparingly |
| **Data** | Archivo | 14–16px | `tabular-nums` | week counter, prices |

**One shout per page.** The current build uses a display size in the hero and
four more places. Five shouts is no shouts. The 180px word in Act IV is the only
large type on the homepage, which is what makes it land.

### Rules

- **Nothing is centred until Act VII.** The film is hung left, like a subtitle.
  Centring arrives with the house lights, as relief.
- **Never more than eight words in frame** during Acts I–IV.
- **Measure 62–68 characters** for all reading copy. Never full-bleed text.
- **Italic is a voice, not an emphasis.** It marks the child's interior line.
  Never use it for stress within a sentence.
- **No letterspaced lowercase.** Tracking applies to uppercase labels only.
- `text-wrap: balance` on every heading; `text-wrap: pretty` on reading copy.

---

## 3. Colour — an arc, not a palette

Most sites have a palette. This one has a **temperature that changes as you walk.**

The decisive idea: **the neutrals carry the story.** Backstage is blue-biased
black — cold, nervous, before. Memory is brown-biased black — warm, past.
The house is ivory — bright, ordinary, after. Nobody will name these. Everybody
will feel that the past is a different temperature from the stage.

| Token | Hex | Bias | Where |
|---|---|---|---|
| `--pitch` | `#05070B` | blue-black | Act I. Absence. |
| `--wing` | `#0E121B` | first blue | Acts II–III, the walk |
| `--flash` | `#FFF3DC` | warm white | **Act IV only.** 400ms. |
| `--memory` | `#17120C` | brown-black | Act V, reverse chronology |
| `--stage` | `#0D1220` | stage blue | Act VI, the promise |
| `--house` | `#F7F4EE` | warm ivory | Acts VII–VIII, footer |
| `--spot` | `#E9A23B` | stage amber | the ration — see below |
| `--ash` | `#8A8578` | warm grey | secondary text on dark |

### The amber ration

`--spot` appears **four times on the entire homepage**:

1. The seam of light under the door, Act I
2. The source that lights the walk, Act II
3. The flash, Act IV
4. The primary CTA fill, Act VII

That is the whole budget. It is not a border colour, not a hover state, not an
icon tint, not a chip. **Amber on this site is light, never decoration.** The
moment it becomes a UI accent it stops meaning anything, and the four moments
above stop being events.

### Contrast

Every pairing must clear **AA (4.5:1)** for body and **AAA (7:1)** where the
foundation already achieves it. Two known traps:

- `--spot` on `--house` measures poorly — amber on ivory is a legibility failure.
  The Act VII CTA uses amber **fill with `--pitch` text**, never amber text.
- `--ash` on `--wing` is the secondary-text pairing and must be verified at
  final hex; if it lands below 4.5:1, lighten `--ash`, do not darken the ground.

The `n-500`/`n-600` corrections made during Phase 4 are superseded by this
system, but **the thresholds that forced them still apply** to every value here.

---

## 4. Composition — the laws that prevent a template

The brief's prohibitions are mostly *compositional*, not chromatic. A dark page
with beautiful type still looks like a Tailwind site if it is built from a grid
of rounded cards. These are structural bans, not preferences.

| Law | Why |
|---|---|
| **Border radius is 0.** One exception: the CTA, a full pill. | Radius is the single strongest "component library" tell. |
| **No box shadows. Ever.** | Depth comes only from the light source. A shadow that does not agree with the light is a lie about the room. |
| **No cards.** No bordered, filled, or elevated content containers. | This is the "grid of rounded cards" prohibition, made enforceable. |
| **Asymmetric measures.** Content sits in 5–7 of 12 columns, offset from centre. | Centred columns read as a document template. |
| **Full-bleed temperature shifts separate acts** — never rules, never cards. | The page changes *rooms*, it does not stack *sections*. |
| **One idea per screen, Acts I–IV.** | Density is the enemy of anticipation. |
| **Letterbox 2.39:1 during the film acts**, opening at Act IV. | Establishes that you are watching, then that you have arrived. |
| **No icons.** | Icon rows are the most template-coded element on the web. |

### Grid

12 columns, `--container-max` unchanged from the foundation, gutters wide enough
that the text block is visibly *hung* rather than filled. During Acts I–IV
content occupies columns 2–7. In Acts V–VIII it may occupy 2–8 or 6–11 —
alternating, never symmetric.

---

## 5. Light, texture and image treatment

### One light

There is a single light source on the page with a position, an intensity, and a
temperature. **Everything is lit by it** — the floor, the figure, the grain, and
the type. This is already implemented in the motion runtime as `--light-x`,
`--light-y`, `--light-intensity`, `--light-flare`.

The visual-direction addition: **type brightness follows the light.** Glyphs sit
near `--house` where the light falls and near `--ash` in shadow, interpolated on
the same variables. Sub-perceptual, and it is the difference between words *on
the glass* and words *in the room*.

### Grain

One animated noise layer at **3% opacity** over the entire page, including type.
It is the cheapest item in this document and the largest single contributor to
"this feels like film." Without it, dark gradients band and the page reads
digital.

### Imagery

The rule from `07` stands and is the concept, not a compromise: **no faces.**
Backs, silhouettes, hands, shoulders, curtains, stage floors, empty houses,
light through a doorway, dark audience shapes.

Treatment for every image, whether photographed or generated:

- **Desaturate to ~35%**, then re-tint toward the act's ground temperature. No
  image keeps its native colour; every image belongs to the room it is in.
- **Crush the blacks slightly** — lift nothing. Detail lives in the highlights.
- **Vignette** consistent with the light source position.
- **Grain applied after tinting**, so it sits in the image rather than on it.
- **Aspect ratios: 2.39:1** in the film acts, **4:5 or 3:4** in the desk acts.
  Never 16:9 — it reads as video-player furniture.

Generated atmospheric assets follow the same treatment and remain subject to the
existing prohibition on fabricated students, teachers, classrooms, facilities and
performances. All eight current assets remain `pending-review`; this direction
does not approve them.

---

## 6. What changes in the token layer

Specification only — no code changes until this direction is approved.

| Token file | Change |
|---|---|
| `typography.ts` | Replace the Inter family with Newsreader; add `opsz` and italic; add the six named roles from §2 |
| `colors.ts` | Replace the neutral ramp with the eight temperature tokens from §3; keep the semantic indirection |
| `elevation.ts` | Reduce to nothing. No shadow scale survives §4. |
| `layout.ts` | Radius scale collapses to `0` plus one `full` for the CTA |
| `src/styles/fonts/` | Add `newsreader-variable-latin.woff2`, `newsreader-variable-latin-ext.woff2`, plus italic; remove the Inter pair |

Components are not expected to change. If a component cannot express this
direction through tokens alone, that is a finding to report — not a licence to
restructure it.

---

## 7. How to judge this

The direction succeeds if a parent scrolling on a phone in a school pickup line
feels **anticipation before they read a single benefit**, and a fifteen-year-old
does not feel it was made for a child.

It fails if:

- The amber becomes a UI accent. The four moments stop being events.
- A second shout appears. The first one stops mattering.
- A card appears. The whole prohibition list collapses at once.
- The grain is cut for performance. It is 3% opacity and it is load-bearing.
- Inter survives "for the UI." The dialect comes back through the side door.

---

## 8. Open questions for the owner

1. **Newsreader is an open-licence face.** If there is budget for a commercial
   text serif, the direction improves; if not, nothing here is compromised.
2. **The shout word in Act IV is unwritten.** It is the single largest piece of
   type on the site and needs a copy decision, not a design one.
3. **The photo shoot implied by §5 can happen without consent forms** because no
   face appears. Confirm this unblocks gate I-1 as expected.
4. **Bilingual:** Spanish is authored, not translated. This affects line lengths
   at 180px and must be checked before the shout is set.
