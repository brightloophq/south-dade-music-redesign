# 09 — Image Strategy

**Phase:** 3 — Product Strategy
**Date:** 2026-08-05
**Source of truth:** `docs/source-content/assets-inventory.json` (62 assets audited), `extraction-report.md`

---

## 0. The position we're starting from

| Finding | Count |
|---|---|
| Distinct assets audited | **62** |
| Genuine in-house photography | **18** |
| Stock / template assets | **26** |
| Third-party trademarks (Step Up logos) | **2** |
| Duplicate uploads | **14** |
| **Videos** | **0** |
| **Downloadable documents** | **0** |
| Assets on infrastructure the business does *not* control | **18** (subdomain) + 22 pages pulling a hero from a staging domain |
| Images of identifiable minors with **no consent record** | **18** |

### Four structural problems

1. **The staging-domain dependency.** 22+ pages — including the 404 template — load their hero from `cmscustom-staginglink2.com`, an agency staging server. The identical file exists on the live domain. This is a leak, not a strategy, and it is a single point of failure outside the client's control.
2. **Wrong-subject heroes.** A guitar photograph heads the **violin**, **singing** *and* guitar pages. A piano photograph heads the **ukulele** page. Correct images for both already sit unused in the media library.
3. **Untraceable licensing.** Programme cards use Turkish stock (`ozel-gitar-kursu` — "private guitar course"). The scholarship page uses French event stock (`20240420_Impulse-Day_visuel_site`). The About page uses Medium-CDN-hash images (`0_p-NH2ecjjuoHdJct`, five variants). None has a verifiable licence.
4. **No consent record.** All 18 genuine photographs depict identifiable children. There is no evidence of photo release for any of them.

### The strategic conclusion

> **This brand cannot be built on stock photography.** The product is *"your real child, on a real stage."* Every generic image undercuts the one thing the business is selling. **A photography and video shoot is not a nice-to-have — it is the single highest-value production line item in the project.** ⚠️ Gate D-3.

---

## 1. Which existing photos should remain

**Keep: 18 assets** — every genuine in-house photograph. These are the most valuable things the business owns online.

### Showcase set — the crown jewels

| Asset | Currently used | Verdict |
|---|---|---|
| `P1088527.jpg` | Home, About, Performances | **KEEP** — hero-grade |
| `DSCF3094-scaled.jpg` | Home, About, Performances | **KEEP** — different camera, so a second shoot or photographer |
| `P1088689.jpg` · `P1088608.jpg` · `P1088597.jpg` · `P1088570.jpg` | Same three pages | **KEEP** — gallery set |
| `P1088653.jpg` · `P1088667-1.jpg` | 90-Day page | **KEEP** — the only real support for the flagship |
| `P1088680.jpg` | Band Builders | **KEEP** — genuine ensemble content, rare |
| `P1088548.jpg` | Private Lessons | **KEEP** |
| `P1088541.jpg` | Guitar | **KEEP** — subject-appropriate |
| `P1088662.jpg` · `P1088659.jpg` | Drums | **KEEP** — subject-appropriate |
| `P1088639.jpg` | Violin | **KEEP** — likely the only genuine violin image; **promote to hero** |
| `IMG_5012-scaled.jpg` | Early Childhood | **KEEP** — only early-childhood photo |
| `IMG_2582-scaled.jpg` · `MG_0957-scaled.png` | Bass | **KEEP** |
| `P1088524.jpg` · `P1088542.png` | Piano, Guitar, Ukulele | **KEEP but reassign** — currently reused across 2–3 instruments, so subject-inaccurate for at least one |

**Required work on all 18:** re-request originals at full resolution · write meaningful alt text (none has any) · assign `subject` tags · convert to AVIF/WebP · record capture date, event and photographer · **obtain and record photo-release consent** ⚠️ publish-blocking.

### Conditional keeps

| Asset | Condition |
|---|---|
| `PHOTO-2025-06-28-19-06-09.jpg` (camp) | **Keep as 2025 archive only.** WhatsApp-compressed; filename dates it to 28 June 2025. It currently sells the 2026 camp. Re-label, source a full-res original, replace as the selling image. |
| `121cdee4-…jpg` (bass hero) | UUID filename, provenance unknown. **Identify before reuse.** |
| Four `/summercamp/` pillar icons | **Salvage before redirecting that route** — they exist nowhere else. |
| `logo-1.png` | **Keep pending gate D-1.** Rebuild as SVG; create a proper favicon set — the full logo is currently used at 16px. |
| Homepage four-pillar images (`Participation`, `Exposure`, `Execution`, `Community`) | Provenance unclear. **Keep the concept, verify the assets**, replace if unlicensed. |

---

## 2. Which should be replaced

**Replace: 26 stock/template assets + 14 duplicates.**

### Priority 1 — replace before launch (licensing or credibility risk)

| Asset(s) | Where | Why |
|---|---|---|
| `cmscustom-staginglink2.com/…jpg` | **22+ pages + the 404 template** | 🚨 Third-party staging domain. Highest-priority removal in the entire project. |
| `ozel-gitar-kursu-*.png` (6 variants) | All programme cards, camp lead | Turkish stock; unverifiable licence; sells a $450 camp |
| `20240420_Impulse-Day_visuel_site-*.jpg` (3) | Scholarship page | French event stock illustrating a Florida state scholarship. Clear licensing risk. |
| `0_p-NH2ecjjuoHdJct-*.png` (5 variants) | About ×2, Instruments, Scholarships ×2 | Medium-CDN hash — downloaded blog imagery. **Used to illustrate the company's own story.** |
| `m1000x1000-1.jpg` on violin & singing pages | Violin, Singing | Wrong instrument. Immediate credibility failure. |
| `m1000x1000.jpg` on ukulele page | Ukulele | Wrong instrument — no ukulele appears anywhere on the ukulele page |
| `26690-2048x1365-1-600x500.jpg` | Members | Numeric stock ID, filename-as-alt, on a lorem-ipsum page. Do not migrate. |
| `New-Project.png` | Programs | Default Canva export name — unfinished production work shipped live |

### Priority 2 — replace at launch (quality)

`m1000x1000-*.jpg/png` series (7 instrument cards) · `photo-8/11/12/13.jpg` (generic stock, placeholder alt "Image 1/2/3") · `instruments-we-teach-1…7.png` (unlinked homepage tiles, incl. a Keyboard tile with no destination) · `banner-back.png` · `abt1.png`

### Priority 3 — consolidate

14 duplicate uploads across month folders (`ozel-gitar-kursu-2-1`, `ozel-gitar-kursu-2-4-1`, `m1000x1000-2`, `P1088570` / `P1088570-1`, `logo-1` ×2) and multiple `m1000x1000` filename collisions across `.jpg`/`.png` and four upload folders.

---

## 3. Which require owner approval

⚠️ Nothing in this section ships until resolved.

| # | Item | Question | Blocks |
|---|---|---|---|
| **1** | **All 18 genuine photographs** | Is there signed photo-release consent for every identifiable minor? | **Every real image on the site** |
| **2** | Testimonial naming minors | Charles Percy's review names *"Dexter & Michael Munroe"* in full | That testimonial's publication |
| **3** | Step Up for Students logos ×2 | Are we licensed to display the trademark? | `/scholarships` trust signals |
| **4** | Four-pillar images | In-house or stock? | Homepage section |
| **5** | Logo | Colours, source files, refresh scope | Gate D-1 — token freeze |
| **6** | Subdomain assets (18 on HighLevel CDN) | Download and archive before any decision on `try.` | Gate S-7 |
| **7** | Photographer rights | Two cameras in evidence (Panasonic + Fujifilm) — who owns the copyright? | Reuse of the entire showcase set |
| **8** | Existing footage | Does *any* video exist, unpublished? | Video production scope |

### Photo-release process (must exist before launch)

1. Written release for every student appearing on the site, signed by a parent or guardian
2. Consent recorded against each `Asset` (`consentStatus`, `consentRef` — see `08-content-model.md` §3)
3. Enrolment paperwork includes a photo-consent field going forward
4. A documented withdrawal route with a defined removal SLA
5. **Publish is blocked** for any asset flagged `depictsMinors` without `consentStatus: obtained`

---

## 4. Which can be AI generated

### The governing rule

> **AI may generate things that do not claim to be real. It may never generate anything that a visitor would reasonably believe is a photograph of this academy, its students, its teachers, or its premises.**

The brand's entire proposition is documentary evidence. An AI-generated child on a stage is a fabricated testimonial with extra steps.

### ✅ Permitted — AI-assisted, ships to production

| Use | Notes |
|---|---|
| **Abstract stage textures** | Light beams, bokeh, curtain folds, gradient grounds. Non-representational only. |
| **Section-divider motifs** | Waveform rules, light-sweep bands |
| **Background patterns** | Subtle, non-photographic |
| **Diagram support art** | Backgrounds behind the 90-Day Timeline and Exposure Ladder — never the diagram content itself |
| **Empty / error-state art** | Minimal line illustration, matching the icon system |
| **Icon exploration** | Concept ideation for the 7 instrument marks — **final icons hand-drawn on the design grid** |
| **Instrument-only still life** | Close-up of a guitar body, piano keys, drum skin — **only where clearly decorative, never as a page hero, never implying it is our studio** |

### ✅ Permitted — internal only, never shipped

Moodboards and art-direction references · shot-list previsualisation for the photographer · layout comps and greybox placeholders during design (**must fail a publish gate if they reach staging**) · Spanish/English layout stress-testing.

### ⛔ Never — under any circumstance

| Prohibited | Why |
|---|---|
| **Any image of a child** | Fabricating a student is a trust violation and, in a market selling child transformation, indefensible |
| **Any image of a teacher or staff member** | Same. `/teachers` exists to prove real humans are accountable. |
| **Any image presented as a lesson, class, rehearsal or showcase** | These are evidence claims |
| **The studio, building, entrance, or premises** | A parent uses these to find and assess the place |
| **Anything on `/performances`, `/events`, or in a gallery** | This is the proof layer; contamination destroys it |
| **Testimonial portraits or reviewer faces** | Fabricated social proof |
| **The camp selling image** | A parent is buying supervised care for their child on the strength of it |
| **Anything with `register: stage` or `studio`** | Content model blocks it (`08-content-model.md` §3) |
| **Faces in any hero** | |
| **"Enhancing" real photos beyond colour grade and crop** | No AI subject insertion, removal, or expansion |

### Disclosure

Any AI-assisted asset carries `provenance: ai-generated` in the content model. If AI-assisted decorative work becomes visually prominent, disclose it in the site credits. **The content model enforces that `ai-generated` and `depictsMinors: true` cannot coexist.**

---

## 5. Where Gemini should be used

Gemini is a **production accelerator for the design and content team**, not a source of front-of-house imagery.

### Recommended

| Task | Value |
|---|---|
| **Alt-text drafting** | 62 assets, most with no alt text or placeholder alt. Gemini drafts from the image; **a human verifies subject accuracy and edits.** Highest-ROI use in the project. |
| **Shot-list generation** | Draft the photographer's brief from `08-content-model.md` requirements |
| **Art-direction moodboards** | Fast exploration of the stage/studio/community registers |
| **Abstract texture generation** | The permitted decorative set in §4 |
| **Image audit assistance** | Classify remaining unknown-provenance assets, flag subject mismatches at scale |
| **Spanish copy drafting for image captions** | Draft only — human review required (`08-content-model.md` §19) |
| **Layout previsualisation** | Greybox comps before the shoot |
| **Icon concept ideation** | Exploration only; final marks hand-drawn |

### Human-verification requirements

1. **Alt text is always human-verified.** An AI describing a violin photo as "a child playing guitar" would reproduce the exact defect we are fixing.
2. **Subject tags are human-assigned.** They gate publication.
3. **No AI output ships without a named reviewer** recorded against the asset.
4. **Never** use Gemini to generate business facts, prices, dates, policies or claims. Those come from `docs/source-content/` and the owner. This is non-negotiable and the same rule that governed Phase 2.

---

## 6. Hero image concepts

Nine heroes. Each needs a distinct, real photograph — the current site uses **one staging-hosted stock image on 22 pages**.

| Page | Concept | Register | Notes |
|---|---|---|---|
| **Home** | A single student mid-performance, lit from stage left, the audience implied in soft darkness. Face visible, expression concentrated — **not smiling at camera.** | Stage | ★ The most important image in the project. Must survive the light-sweep animation (`05-motion-system.md` §9). Shoot for 16:9 with generous headroom for the H1. |
| **90-Day Program** | Wide stage shot at the moment of applause — performer centre, hands raised in the foreground blur. | Stage | The payoff image for the timeline release |
| **Private Lessons** | Teacher and student side by side at an instrument, teacher's hand guiding, warm window light. Both faces partly visible. | Studio | |
| **Band Builders** | Four or five students mid-rehearsal, eye contact between two of them. Amps, cables, a real room. | Studio | **Critical for the teen journey** — must read as a band, not a class |
| **Early Childhood** | Low camera height, children mid-movement with hand percussion, motion blur on a shaker. Bright, warm. | Community | |
| **Group Lessons** | Semicircle of students, teacher in profile, one student demonstrating. | Studio | |
| **Camps** | Wide, bright, outdoor-adjacent or window-lit. Kids with instruments and snacks — the day, not the concert. | Community | Must be from the **current** year |
| **Scholarships** | Genuine lesson moment, unremarkable and warm. **Deliberately ordinary** — the message is "the same lessons, no separate track." | Studio | Replaces French event stock |
| **Teachers** | Environmental portraits in the studio, instrument in frame, direct eye contact. | Studio | ⚠️ gate B-7 |

**Every hero:** 16:9 primary + 4:5 mobile crop · shot dark enough to carry white overlaid type, or with a designed clear zone · minimum 3000px wide · RAW retained.

---

## 7. Campaign image concepts

For paid social, email and seasonal campaigns.

| Campaign | Concept | Season |
|---|---|---|
| **"90 Days"** | Diptych — same student, week 1 in a practice room / week 12 in stage light. Same framing, different light. ⚠️ Requires planned longitudinal shooting and consent. | Evergreen ★ |
| **"The first time"** | Tight on a parent's face in the audience watching. **No child in frame.** Strong emotional pull, minimal consent complexity. | Evergreen |
| **"Ready"** | Backstage — a student in the wings, instrument in hand, about to walk on. | Evergreen |
| **"Screen-free summer"** | Split composition: instrument vs device. Restrained, not preachy. | Jan–May |
| **"Your scholarship works here"** | Ordinary lesson moment + clear typographic overlay. Plain and procedural. ⚠️ pending approved wording | Evergreen |
| **"Somos bilingües"** | Spanish-speaking parent and teacher in conversation at the studio | ⚠️ only when the claim is true |
| **"Meet your teacher"** | Portrait series, one per instructor | ⚠️ gate B-7 |

---

## 8. Performance imagery

The proof layer. Highest emotional value, highest consent sensitivity.

### Required per showcase

- **3–5 hero-grade frames** — single performers, stage-lit
- **1 wide house shot** showing a real audience — this is what proves scale and that it happened
- **Backstage/preparation set** — nerves and readiness, the ladder made visible
- **Audience reaction frames** — parents watching (often the most persuasive images available)
- **Group shot** — the full cohort
- **⚠️ Video** — see §11

### Rules

- Every image tied to a `Performance` record with date and venue — **currently zero dated events exist**
- Consent verified per image before publication
- No editing that changes what happened — colour grade and crop only
- Undated performance imagery is barred: an undated photo cannot prove a recurring cycle

### The archive problem

The site's only event record (*Bazaar and Flea Market Performance, 15 March 2025*) **now 404s**. There is no published record that any showcase has ever taken place. Recovering the historical archive — dates, venues, photo sets — is a content-recovery task the owner must lead.

---

## 9. Parent imagery

An under-exploited category. **The buyer is the parent, and there is currently not one photograph of a parent on the site.**

| Concept | Use |
|---|---|
| Parent watching from the audience, lit by stage spill | Homepage emotional beat, "90 Days" campaign |
| Parent and child leaving a lesson together, instrument case in hand | About, community |
| Parents applauding — hands and faces, wide | Performances |
| Parent talking with a teacher at pickup | Trust, teachers |
| Spanish-speaking parent in conversation with staff | ⚠️ Bilingual proof — only when true |

**Rules:** parents require the same written release as students · avoid staged "concerned parent" stock tropes · reflect the actual demographic of South Miami-Dade families — the imagery must look like the people it is for.

---

## 10. Technical specification

| Item | Requirement |
|---|---|
| Formats | AVIF → WebP → JPEG fallback |
| Responsive widths | 480 / 768 / 1200 / 1920 / 2560 |
| Aspect ratios | 16:9 hero · 4:5 mobile hero · 4:3 card · 1:1 portrait · 3:2 editorial |
| Minimum source | 3000px on the long edge; RAW retained |
| Colour | sRGB, graded toward the palette — amber highlights, blue-black shadows |
| Compression | Perceptual quality target, ~85 |
| Hero weight | <180KB after AVIF |
| Card weight | <60KB |
| Loading | Hero `fetchpriority="high"`, never lazy · below-fold lazy |
| Dimensions | Explicit `width`/`height` on every image — **CLS target 0.00** |
| Placeholder | Dominant-colour or LQIP blur |
| Alt text | **Mandatory, meaningful, human-verified** |
| Hosting | **First-party only.** No staging domain, no external CDN outside the business's control. |
| Naming | `{subject}-{context}-{index}.ext` — e.g. `violin-student-showcase-01.jpg`. No `m1000x1000`, no UUIDs, no `New-Project`. |

---

## 11. Video strategy

**Zero video exists across 26 pages.** For a business whose promise is live performance, this is the single largest content gap — and it breaks five of the eight user journeys.

### Priority order

| # | Asset | Length | Purpose |
|---|---|---|---|
| **1** | **Showcase film** | 60–90s | The proof. Ends the 90-Day Timeline. Cuts nerves → performance → applause → parent's face. |
| **2** | **Band Builders rehearsal** | 30–45s | **Teen credibility.** Real room, real amps, real kids. |
| **3** | **Teacher introductions** | 20–30s each | ⚠️ gate B-7. Solves the "no faces" trust failure faster than any copy. |
| **4** | **Camp day-in-the-life** | 45–60s | Seasonal conversion |
| **5** | **Parent testimonial** | 30–45s | ⚠️ requires consent and willing families |
| **6** | **Studio walkthrough** | 30s | Reduces first-visit anxiety |

### Rules

Never autoplay with sound · poster-first, user-initiated · **captions mandatory** (accessibility and sound-off social) · Spanish subtitles ⚠️ B-6 · self-hosted or privacy-friendly embed with a facade pattern — no third-party JS before user interaction · vertical crops delivered for social · consent applies identically to video.

---

## 12. Production plan

| Shoot | Priority | Deliverables | Blocked on |
|---|---|---|---|
| **Showcase** | 🔴 P0 | 40–60 stills + showcase film | Next real showcase date ⚠️ none published |
| **Studio & instruments** | 🔴 P0 | 7 instrument sets, 60+ stills | Consent process |
| **Teachers** | 🔴 P0 | Portraits + intro videos | ⚠️ gate B-7 |
| **Band Builders** | 🟠 P1 | Ensemble stills + rehearsal video | Consent |
| **Early Childhood** | 🟠 P1 | 20–30 stills | Consent (youngest — most sensitive) |
| **Camp** | 🟠 P1 | Day-in-the-life set + video | Next camp session |
| **Premises** | 🟡 P2 | Exterior, entrance, parking, rooms | ⚠️ correct unit number |
| **Parents & community** | 🟡 P2 | 20–30 stills | Consent |

**Sequencing note:** the showcase shoot cannot be scheduled until a real showcase is scheduled. If none is imminent, **launch photography depends on the studio and teacher shoots**, with the showcase set following as a fast-follow release. This is a genuine timeline dependency, not a nice-to-have — see `10-launch-plan.md`.

---

## 13. Image decision gates

| Gate | Question | Blocks |
|---|---|---|
| **I-1** | Photo-release consent for all 18 existing photos | **Every real image on the site** |
| **I-2** | Photography budget approved (= D-3) | The entire visual system |
| **I-3** | Video production commissioned | Timeline payoff, teen journey, trust layer |
| **I-4** | Next showcase date | Showcase shoot scheduling |
| **I-5** | Teacher publication (= B-7) | Portraits, intro videos |
| **I-6** | Step Up logo rights | Scholarship trust signals |
| **I-7** | Photographer copyright ownership | Reuse of the existing showcase set |
| **I-8** | Correct unit number | Premises shoot, directions imagery |

---

**Next:** `10-launch-plan.md`
