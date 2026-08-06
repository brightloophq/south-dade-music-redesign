# Image Style Guide

**Phase:** 3.5 — Asset pipeline
**Date:** 2026-08-06
**Governs:** every image that enters this repository, generated or photographed
**Derived from:** `04-design-system.md` §13–14 · `09-image-strategy.md` §4 · `08-content-model.md` §3

---

## 0. The one rule

> **AI may generate things that do not claim to be real. It may never generate
> anything a visitor would reasonably believe is a photograph of this academy,
> its students, its teachers, or its premises.**

South Dade Music sells documentary evidence: *your real child, on a real stage.*
An AI-generated child on a stage is a fabricated testimonial with extra steps.
Everything below follows from that sentence.

---

## 1. The three lanes

Every image in this project belongs to exactly one lane. If you cannot name the
lane, do not ship the image.

| Lane | What it is | Source | Can it be generated? |
|---|---|---|---|
| **Evidence** | Students, teachers, rooms, lessons, rehearsals, showcases, awards, camps in progress | **Real photography only**, consent on file | ❌ Never |
| **Decoration** | Light textures, atmospheric grounds, abstract composition, campaign backdrops, section dividers | Generated or designed | ✅ Yes |
| **System** | Logo, icons, diagrams, UI marks | Hand-drawn on the design grid | ⚠️ Ideation only; final marks hand-drawn |

**Decoration sits behind evidence. It never replaces it.** If a layout would
work equally well with a generated texture where a photograph belongs, the
layout is answering the wrong question — see `09-image-strategy.md` §12 for the
shoot that resolves it.

---

## 2. Use the real photos first

18 genuine in-house photographs already exist (`09-image-strategy.md` §1) and
are the most valuable visual assets the business owns. **Before generating
anything, check whether a real photo covers the slot.**

| Slot | Real asset | Notes |
|---|---|---|
| Homepage hero | `P1088527.jpg` | Hero-grade. ⚠️ Gate I-1 consent |
| Showcase gallery | `P1088689` · `P1088608` · `P1088597` · `P1088570` | Gallery set |
| 90-Day Program | `P1088653.jpg` · `P1088667-1.jpg` | Only real support for the flagship |
| Band Builders | `P1088680.jpg` | Rare genuine ensemble content |
| Guitar | `P1088541.jpg` | Subject-accurate |
| Drums | `P1088662.jpg` · `P1088659.jpg` | Subject-accurate |
| Violin | `P1088639.jpg` | **Promote to hero** — likely the only genuine violin image |
| Early Childhood | `IMG_5012-scaled.jpg` | Only early-childhood photo |
| Bass | `IMG_2582-scaled.jpg` · `MG_0957-scaled.png` | |
| Private Lessons | `P1088548.jpg` | |
| Camp (2025 archive) | `PHOTO-2025-06-28-19-06-09.jpg` | Archive label only — **not** the 2026 selling image |

Every one of these is blocked on **gate I-1** (photo-release consent for
identifiable minors) and needs human-written alt text and subject tags before
publication. Generation does not unblock them, and must not be used to route
around them.

---

## 3. Never generated — under any circumstance

The pipeline blocks these before a request leaves the machine. The list mirrors
`09-image-strategy.md` §4.

| Prohibited | Why |
|---|---|
| **Students / any child** | Fabricating a student is indefensible in a market selling child transformation |
| **Teachers or staff** | `/teachers` exists to prove real humans are accountable |
| **Classrooms, lessons, rehearsals** | These are evidence claims |
| **Facilities** — building, entrance, lobby, rooms | A parent uses these to find and assess the place |
| **Performances, concerts, showcases, audiences** | The proof layer; contamination destroys it |
| **Awards, trophies, certificates, ceremonies** | Fabricated credentials |
| **Testimonial portraits or reviewer faces** | Fabricated social proof |
| **The camp selling image** | A parent is buying supervised care on the strength of it |
| **Any face, in any hero** | |
| **"Enhancing" real photos** beyond colour grade and crop | No AI subject insertion, removal, or expansion |

Plus, from `04-design-system.md` §14: no illustrated children, no mascots, no
cartoon characters, no musical-note confetti, no generic vector people packs.

### How the block works

`scripts/generate-image.mjs` enforces this in two layers, because either alone
would eventually fail:

1. **Pre-flight scan.** The prompt is checked against eight categories of
   prohibited subject terms before any network call. A term under an explicit
   negation — "no people", "without faces" — passes, because those are
   constraints we want. Anything else exits non-zero and names the categories
   it matched.
2. **Mandatory negative constraints.** A fixed block barring people, faces,
   hands, crowds, text, letters, numbers, logos, watermarks and anything
   resembling a documentary photograph is appended to every prompt, and stored
   in the metadata so it is auditable after the fact.

> ⚠️ **A third layer is not available.** `imageConfig.personGeneration:
> 'ALLOW_NONE'` would give model-side enforcement, but the Gemini Developer API
> (API-key mode) **rejects the field** — it is accepted only on the Enterprise
> Agent Platform / Vertex path. Metadata records
> `personGeneration: "unsupported-on-developer-api"` so this is never mistaken
> for enforcement that is happening. Reinstate it if the pipeline moves to
> Vertex credentials. Tracked as open item 6 in `generated-assets.md`.

Because the strongest layer is unavailable, **visual review is not optional.**
Every generated asset must be looked at by a human before approval.

---

## 4. Permitted — and what "good" looks like

| Permitted | Template |
|---|---|
| Hero atmospheric grounds | `hero-atmospheric-background` |
| Stage-light textures, beams, haze | `stage-light-texture` |
| Abstract musical / resonance composition | `abstract-musical-composition` |
| Camp campaign **backdrop** | `camp-campaign-graphic` |
| Scholarship page ground | `scholarship-graphic` |
| Quiet section backgrounds | `decorative-section-background` |
| Instrument-only still life | *No template yet* — decorative only, never a page hero |

### Art direction

Inherited from `04-design-system.md` §13. Generated work must sit beside the
real photography without announcing itself as different.

| Attribute | Direction |
|---|---|
| **Light** | Warm, directional, practical. Stage light, window light, amber spill. Never flat fluorescent. |
| **Colour** | Warm mid-tones, deep shadows that **retain detail**, restrained saturation. Amber highlights, blue-black shadows. |
| **Neutrals** | Warm-tinted, never cool grey — cool greys fight the amber and make photography look clinical |
| **Finish** | Matte. No gloss, no 3D renders, no plastic surfaces, no lens flares as decoration |
| **Restraint** | Colour ratio ~60/25/10/5. If everything glows, nothing does. |

### Palette anchors

| Token | Hex | Use |
|---|---|---|
| `stage-950` | `#070A12` | Deepest ground, hero backdrops |
| `stage-900` | `#0D1220` | Primary dark surface |
| `spot-400` | `#FFC15C` | Warm highlight |
| `spot-500` | `#F5A524` | Spotlight core |
| `velvet-600` | `#8B1E3F` | Curtain / depth accent |
| `n-50` | `#FAF9F7` | Warm page ground (light) |

### Composition constraints

- **Type safety** — a hero ground must carry white type at AA. Keep the
  headline zone dark and low-detail.
- **Motion safety** — must survive the light-sweep in `05-motion-system.md` §9.
  No competing horizontal highlight across the centre band.
- **Crop safety** — 16:9 primary and a separate 4:5 mobile generation. Do not
  centre-crop a 16:9 ground and call it a mobile asset.
- **No banding** — deep gradients must hold together at 8-bit.

---

## 5. Technical output

Matches `09-image-strategy.md` §10.

| Item | Requirement |
|---|---|
| Generation size | `2K` default; `4K` for full-bleed heroes |
| Delivery formats | AVIF → WebP → PNG/JPEG fallback (conversion is a later build step) |
| Responsive widths | 480 / 768 / 1200 / 1920 / 2560 |
| Hero weight | <180KB after AVIF |
| Card weight | <60KB |
| Dimensions | Explicit `width`/`height` — CLS target 0.00 |
| Colour | sRGB |
| Hosting | **First-party only.** No staging domain, no external CDN. |
| Naming | `{subject}-{context}-{index}.ext`. No `m1000x1000`, no UUIDs, no `New-Project`. |
| Alt text | Mandatory, meaningful, **human-written** — never generated for a generated image |

---

## 6. Governance

### Metadata

Every generated asset writes a JSON sidecar to
`public/images/generated/metadata/`, mirroring the `Asset` model in
`08-content-model.md` §3:

```
prompt · finalPrompt · negativeConstraints · promptTemplate
model · aspectRatio · imageSize · date · generator
personGeneration · subjectGuard · modelNotes
outputPath · sha256 · byteSize · mimeType
page · section · purpose
approvalStatus · approvedBy · approvedAt
provenance: "ai-generated" · register: "decorative"
depictsMinors: false · consentStatus: "not-applicable"
altText · subject · integratedIntoUI
```

`sha256` exists so a file swapped after approval is detectable.

### Approval flow

1. Script writes the asset with `approvalStatus: "pending-review"`.
2. A **named human** reviews it against §3 and §4.
3. Reviewer sets `approvalStatus: "approved"` and `approvedBy` in the JSON.
4. Human writes `altText` and `subject`.
5. Only then may the asset be referenced by UI code.

**No AI output ships without a named reviewer recorded against the asset.**
Nothing is integrated during Phase 3.5.

### The `register` clarification

`08-content-model.md` §3 rule 3 states that `provenance: ai-generated` cannot be
used in `register: stage` or `studio` — but the `register` enum only offers
`stage · studio · community`, so a permitted decorative texture has no legal
value. This pipeline writes `register: "decorative"`.

⚠️ **Open item for the content model:** add `decorative` to the `register` enum,
and scope rule 3 to documentary registers. `register` describes what an image
*claims to depict* — a stage-light texture depicts no scene, so the rule barring
AI from the stage register was never aimed at it. Recorded in
`generated-assets.md` §4.

### Disclosure

Any AI-assisted asset carries `provenance: ai-generated`. If decorative
generated work becomes visually prominent, disclose it in the site credits. The
content model enforces that `ai-generated` and `depictsMinors: true` cannot
coexist.

---

## 7. Security

| Rule | Enforcement |
|---|---|
| `GEMINI_API_KEY` lives in `.env.local` only | Script reads that file directly and does **not** fall back to the shell environment, so a stale exported key cannot be used silently |
| The key never reaches the browser | Generation is a development-time Node script. No app code imports it. |
| **Never** create a `NEXT_PUBLIC_` Gemini key | `NEXT_PUBLIC_*` is inlined into the client bundle. The script **refuses to run** if it finds one in `.env.local`. |
| The key is never persisted | Never written to metadata, the ledger, or stdout |
| `.env*` is git-ignored | Already covered by the repo `.gitignore` |

If a key is ever committed or prefixed with `NEXT_PUBLIC_`, treat it as
disclosed: revoke at <https://aistudio.google.com/apikey> and issue a new one.

---

## 8. Non-image uses of Gemini

`09-image-strategy.md` §5 permits Gemini as a production accelerator — alt-text
drafting (highest ROI: 62 assets with no meaningful alt text), shot-list
generation, moodboards, image audit assistance. Those are **out of scope for
this pipeline**, which generates images only.

Two rules carry over regardless:

1. **Alt text is always human-verified.** An AI describing a violin photo as
   "a child playing guitar" reproduces the exact defect Phase 2 found.
2. **Never** use Gemini to generate business facts, prices, dates, policies or
   claims. Those come from `docs/source-content/` and the owner. Non-negotiable,
   and the same rule that governed Phase 2.

---

**See also:** `generated-assets.md` (the register) · `image-prompts/` (templates)
