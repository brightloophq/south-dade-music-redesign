# 05 — Image Placement

**Phase:** 5A — Homepage Creative Blueprint
**Date:** 2026-08-06
**Governed by:** [`../redesign/image-style-guide.md`](../redesign/image-style-guide.md) · [`../redesign/09-image-strategy.md`](../redesign/09-image-strategy.md)
**Pipeline:** `scripts/generate-image.mjs` (Phase 3.5)

---

## 1. The governing rule

> **AI may generate things that do not claim to be real. It may never generate
> anything a visitor would reasonably believe is a photograph of this academy,
> its students, its teachers, or its premises.**

Three lanes. Every image on this page belongs to exactly one. **If you cannot
name the lane, the image does not ship.**

| Lane | Content | Source | Generated? |
|---|---|---|:---:|
| **Evidence** | Students, teachers, rooms, lessons, showcases | Real photography, consent on file | ❌ Never |
| **Decoration** | Light textures, atmospheric grounds, grain | Generated or designed | ✅ Yes |
| **System** | Logo, icons, diagrams | Hand-drawn on the design grid | ⚠️ Ideation only |

**Decoration sits behind evidence. It never replaces it.**

---

## 2. The launch-day reality

This section is the reason the page is designed the way it is.

| Fact | Source | Consequence |
|---|---|---|
| 18 genuine photographs exist | `09-image-strategy.md` §1 | The best assets the business owns |
| **All 18 depict identifiable minors** | §1 | — |
| **Not one has a photo release on file** | §3, gate **I-1** | ⛔ **Publication blocked** |
| Zero video across 26 pages | §11, gate **M-3** | No showcase film |
| Zero dated events; both event URLs 404 | `02-IA` §1, gate **I-4** | No showcase can be captioned |
| Two cameras in evidence (Panasonic + Fujifilm) | §3 | ⚠️ Copyright ownership unresolved (I-7) |

> **On launch day this homepage may carry zero photographs.**
>
> Every slot below is therefore specified in **two states**, and state 1 must be
> good enough to ship indefinitely — not a placeholder waiting to be replaced.

---

## 3. Photography plan — the 18 assets

Only seven of the eighteen are needed for this page. The rest belong to
instrument and programme pages.

| § | Slot | Asset | Why this one | Crop | Gate |
|---|---|---|---|---|---|
| **1** | Hero mass | `P1088527.jpg` | Hero-grade. Warm stage light, single subject, generous dark negative space so it meets `stage-950` without a visible edge | 16:9 + **separate 4:5** | I-1 |
| **3** | Journey release | `DSCF3094-scaled.jpg` | Second camera — likely a different showcase, so it corroborates *recurrence* rather than repeating the hero's event | 21:9 full-bleed | I-1, I-4 |
| **7** | Evidence lead | `P1088689.jpg` | Gallery set, hero-grade | 3:2 | I-1, I-4 |
| **7** | Gallery | `P1088608` · `P1088597` · `P1088570` | The gallery set | 4:3 | I-1, I-4 |
| **7** | Ensemble | `P1088680.jpg` | ⭐ **Rare genuine ensemble content.** The only real support for the band claim, and the strongest single asset for the teen audience | 3:2 | I-1, I-4 |
| **11** | Audience *(optional)* | ⚠️ *does not exist* | *"A parent's face in the audience is the most persuasive image available to this business"* — and it carries far less consent complexity than a child's | 21:9 | **needs a shoot** |

### Not used on this page, deliberately

| Asset | Why not |
|---|---|
| `P1088541` (guitar) · `P1088662`/`P1088659` (drums) · `P1088639` (violin) | Instrument-specific. Belong on `/lessons/*`. §7 is showcase evidence, not an instrument catalogue |
| `IMG_5012-scaled.jpg` (early childhood) | Only early-childhood photo. Belongs on `/programs/early-childhood` |
| `PHOTO-2025-06-28…jpg` (camp) | ⚠️ WhatsApp-compressed, filename dates it to **June 2025** while it currently sells the 2026 camp. Archive label only |
| `121cdee4-….jpg` | UUID filename, provenance unknown. **Identify before any reuse** |

### Required work on every asset before publication

1. **Photo-release consent** obtained and recorded ⚠️ **publish-blocking**
2. Re-request originals at full resolution — several are already scaled
3. **Human-written alt text** — not one of the 18 currently has any
4. `subject` tags assigned, verified against the host section
5. Capture date, event and photographer recorded
6. Colour grade toward the palette — amber highlights, blue-black shadows
7. AVIF → WebP → JPEG, at 480/768/1200/1920/2560

**Grading rule:** colour grade and crop only. **No AI subject insertion, removal
or expansion.** A grade that changes what a viewer believes happened is not a
grade.

---

## 4. Generated decorative assets

Six slots. All `register: decorative`, `provenance: ai-generated`,
`approvalStatus: pending-review` until a **named human** signs off.

| # | Slot | Template | Aspect | Status |
|---|---|---|---|---|
| **1** | §1 hero ground | `hero-atmospheric-background` | 16:9 | ✅ **Generated** — `homepage-hero-stage-light.jpg`, pending review |
| **2** | §1 hero ground, mobile | `hero-atmospheric-background` | **4:5** | ⬜ Required — **generate, never centre-crop** |
| **3** | §3 ambient ×3 | `stage-light-texture` | 21:9 | ⬜ Required — three warmth generations |
| **4** | §3 / §5 substrate | `diagram-substrate` **(new)** | 21:9 | ⬜ New template needed |
| **5** | §2 / §11 ground | `decorative-section-background` (dark) | 21:9 | ⬜ Optional |
| **6** | §10 ground | `scholarship-graphic` | 16:9 | ⬜ Optional |

### The §3 warmth arc — the one genuinely new asset requirement

The Journey's emotional arc is carried by **three separate generations** of the
same texture, cross-faded by scroll position, rather than by a CSS filter on one
image.

| Generation | Where | Direction |
|---|---|---|
| **Cool** | Weeks 1–10 | Deep blue-black dominant, one narrow amber beam at low presence, high haze |
| **Warm** | Week 11 | Amber entering from upper right, mid presence, haze thinning |
| **Spotlight** | Week 12 | Full `spot-500` bloom concentrated upper-centre, ground at its darkest |

**Why three assets rather than one filtered image:** a `filter` in a scroll loop
is prohibited (`05-motion-system.md` §15 rule 1) — it forces repaint on every
frame. Three pre-composed layers cross-faded on `opacity` are GPU-cheap and hit
60fps on a mid-range Android. **The performance constraint produced the better
art direction**, because each generation can be composed for its moment rather
than being a tinted version of a compromise.

### Prompt direction for `diagram-substrate` (new)

```
A very quiet ground for a diagram. Deep blue-black field (#0D1220) with an almost
imperceptible warm tonal drift from upper right, and a faint horizontal structure
suggesting a ruled surface without drawing visible lines. Extremely restrained —
felt rather than seen. Matte, smooth tonal transitions, no banding. Generous
emptiness throughout. Purely abstract.
```

Plus the mandatory negative constraints the pipeline appends automatically: no
people, faces, hands, crowds · no text, letters, numbers, logos, watermarks ·
nothing resembling a documentary photograph of a real school, classroom, studio,
rehearsal, performance or event.

### Explicitly not generated for this page

| Not generated | Why |
|---|---|
| **Any teacher portrait** (§6) | A generated teacher on the page whose job is proving real humans are accountable |
| **Any showcase image** (§7) | A fabricated testimonial with extra steps |
| **Any child, anywhere** | Prohibited absolutely |
| **Any venue, room, entrance, seating, proscenium** | Reads as *our building* |
| **`curtain-fold-texture`** | Cut in `final-art-direction.md` §10 — highest pastiche risk. If a curtain is ever wanted, it is photographed |
| **`marquee-bulb-glow`** | Not needed on the homepage; header-only, desktop-only |

---

## 5. Slot-by-slot, both states

| § | Slot | **State 1 — launch (no consent)** | **State 2 — post-I-1** |
|---|---|---|---|
| **1** | Hero | Generated texture spans the right two-thirds at full presence. Light sweep runs across it | Photograph enters bleeding off right + bottom; texture recedes to sit behind the type only. Sweep runs across the photograph |
| **2** | Reframe | Flat `stage-950`, or texture ≤4% | Unchanged — **this section never takes a photograph** |
| **3** | Journey | Three texture generations. **Release resolves into §4's table** | Release cross-dissolves into `DSCF3094-scaled.jpg` |
| **4** | 12 weeks | None | None |
| **5** | Ladder | `diagram-substrate` | Unchanged |
| **6** | Teachers | **No images.** Process-led fallback | Environmental portraits, 4:5, direct eye contact |
| **7** | Evidence | **No images.** Text-testimony fallback | 1 lead + 4-up gallery, every frame dated and captioned |
| **8** | Reviews | None — **reviewer portraits are fabricated social proof** | Unchanged |
| **9** | Pricing | None — money surfaces carry no decoration | Unchanged |
| **10** | Scholarships | `scholarship-graphic`, or nothing | ⚠️ Deliberately ordinary if a photograph is used at all |
| **11** | The turn | `abstract-musical-composition` at low presence, or nothing | Optional wide audience shot — **needs a new shoot** |
| **12** | Close | None | None |

**State 1 carries five generated assets and zero photographs. It is a complete,
shippable page.** That resilience is the reason `final-art-direction.md` built
this site on the theatre spine rather than the academy or cinematic ones.

---

## 6. Captions — the rule that separates proof from decoration

**Every Desk photograph carries a visible caption with date and context.**

> *"Winter showcase, March 2025 — Band Builders ensemble"*

A photograph with a date is **proof**. The same photograph full-bleed with no
caption is **decoration**. Phase 2 found six undated showcase photographs, and
`09-image-strategy.md` §8 bars undated performance imagery outright: an undated
photo cannot prove a recurring cycle.

| Room | Caption |
|---|---|
| 🎭 **House** (§1, §3, §11) | Uncaptioned. Photography here is atmospheric and bleeds off edges |
| 📋 **Desk** (§6, §7 gallery) | **Caption mandatory** — date, event, venue |

⚠️ §7 sits in the House but is the **exception**: it is the proof layer, so its
captions are mandatory regardless of register. Proof outranks atmosphere.

---

## 7. Technical specification

| Item | Requirement |
|---|---|
| Formats | AVIF → WebP → JPEG fallback |
| Responsive widths | 480 / 768 / 1200 / 1920 / 2560 |
| Aspect ratios | 16:9 hero · **4:5 mobile hero (generated separately)** · 4:3 card · 3:2 editorial · 21:9 band |
| Minimum source | 3000px long edge; RAW retained |
| Colour | sRGB, graded toward the palette |
| **Hero weight** | **<180KB after AVIF** |
| Card weight | <60KB |
| Gallery thumbnails | <40KB |
| Loading | Hero `fetchpriority="high"`, **never lazy**. Everything below the fold lazy |
| Dimensions | Explicit `width`/`height` on every image — **CLS target 0.00** |
| Placeholder | Dominant-colour or LQIP blur |
| Alt text | **Mandatory, meaningful, human-written** |
| **Hosting** | **First-party only.** No staging domain, no external CDN |
| Naming | `{subject}-{context}-{index}.ext` — no `m1000x1000`, no UUIDs, no `New-Project` |

> 🚨 **The staging-domain leak.** 22+ pages, including the 404 template,
> currently load their hero from `cmscustom-staginglink2.com` — an agency staging
> server outside the client's control. **Not one asset on this page may reference
> any domain the business does not own.** This is the highest-priority removal in
> the entire project.

---

## 8. Mobile — generate, never crop

**A 4:5 mobile hero is a separate generation, not a centre-crop of the 16:9.**

The 16:9 texture's composition puts its uncluttered zone on the **left third**,
which is where the desktop H1 sits. Centre-cropping it to 4:5 destroys exactly
that zone and leaves the headline over the brightest part of the beam.

| Asset | Desktop | Mobile |
|---|---|---|
| §1 hero ground | 16:9, clear left third | **4:5, clear upper third** — separate generation |
| §3 ambient ×3 | 21:9 | 4:5 or 9:16, **1K**, separate generations |
| §5 substrate | 21:9 | Desktop only — not justified on 4G |
| §2 / §11 grounds | 21:9 | **Omitted.** Flat ground on mobile |

Mobile textures: **AVIF, ≤60KB at mobile widths, and never the LCP element.**

---

## 9. Governance

Every generated asset writes a JSON sidecar to
`public/images/generated/metadata/` recording prompt, model, date, output path,
page, section, purpose, SHA-256, provenance, register, and approval status.

### Approval flow

1. Script writes the asset as `pending-review`
2. A **named human** reviews it against `image-style-guide.md` §3–4
3. Reviewer sets `approvalStatus: approved` and `approvedBy`
4. A human writes `altText` and `subject`
5. **Only then** may UI code reference it

⚠️ **Visual review is not optional.** `imageConfig.personGeneration:
'ALLOW_NONE'` — the model-side guarantee that no person is generated — **is
rejected by the Gemini Developer API** and is available only on the Vertex path
(`generated-assets.md` open item 6). The no-people rule currently rests on the
pre-flight prompt scanner and the mandatory negative constraints. **Two layers,
not three. Every generated asset must be looked at by a person.**

### Disclosure

Any AI-assisted asset carries `provenance: ai-generated`. If decorative generated
work becomes visually prominent — and on state 1 of this page **it is the
dominant visual layer** — disclose it in the site credits.

> ⚠️ **Recommendation to the owner.** On launch day this homepage's visual
> identity is carried almost entirely by generated texture. That is defensible
> and honest, and it should be *stated* rather than left to be discovered.

---

## 10. What unlocks what

| Gate closes | Unlocks |
|---|---|
| **I-1** — photo-release consent | Hero state 2 · §3 release frame · §6 portraits · §7 gallery. **The single highest-value unlock on the page** |
| **I-4** — a dated showcase | §7 captions · the hero's dated eyebrow · every *"come watch a showcase"* CTA |
| **B-7** — teacher publication | §6 as designed |
| **I-7** — photographer copyright | Legal reuse of the entire showcase set |
| **M-3** — showcase film | §3's release becomes footage; the phase-two cinematic evolution becomes available |

**Recommendation, independent of everything else: commission the showcase film
and a consented photography shoot now.** `09-image-strategy.md` §11 ranks the
film as the single largest content gap in the project, and §12 notes the showcase
shoot cannot even be *scheduled* until a real showcase is scheduled. Both are on
the critical path to the best version of this page, and neither is an engineering
task.

---

**Next:** [`06-mobile-strategy.md`](./06-mobile-strategy.md)
