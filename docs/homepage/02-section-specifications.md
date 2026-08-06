# 02 — Section Specifications

**Phase:** 5A — Homepage Creative Blueprint
**Date:** 2026-08-06
**Reads with:** [`01-homepage-blueprint.md`](./01-homepage-blueprint.md) · [`03-motion-map.md`](./03-motion-map.md)
**Components referenced:** the Phase 4 foundation (`src/components/`), verified in the Phase 4.5 laboratory.

Every section below is specified against seventeen attributes. Where a section is
blocked on a decision gate, the **fallback** is specified to the same depth as the
primary — a fallback that has not been designed is not a fallback.

**Legend:** 🎭 House (dark, persuasion) · 📋 Desk (light, decision)

---

# §1 — The Bill

### 🎭 → 📋 · The hero

| Attribute | Specification |
|---|---|
| **Purpose** | State the promise and substantiate it in the same screen. Teach the two-register language in one gesture. |
| **Emotional goal** | **Anticipation, then footing.** The parent should feel they have walked into a theatre lobby ten minutes before curtain — and then immediately find something solid to hold. |
| **Visual hierarchy** | 1. H1, three lines, expanded width · 2. The photograph/texture mass · 3. Primary CTA · 4. Week-structure line · 5. Eyebrow · 6. Fact bar |
| **Layout** | Full-bleed `stage-950`. Type block hung on the left 7 columns, top-aligned at 38% viewport height. Photograph/texture occupies the right 6 columns bleeding off right + bottom (overlap is intentional). Fact bar is a 4-column `n-50` band welded to the base, **inside the hero's viewport allocation** — not a section below it. |
| **Desktop (≥1280)** | Hero occupies 88vh; fact bar takes the remaining 12vh and is visible without scrolling. H1 at `display-xl` (88px), width axis ~112. Header transparent over the hero, condensing on scroll. |
| **Tablet (768–1279)** | Hero 82vh. Type block widens to 8 of 8 columns; photograph drops to a bleeding corner mass at 45% width, anchored bottom-right behind the CTAs at 60% opacity. H1 ~64px, width axis ~106 — expanded width is reduced because line-breaks get unreliable at this measure. |
| **Mobile (<768)** | Single column. Order: eyebrow → H1 (4–5 lines, 40px, **width axis 100**) → hairline → week line → CTAs → 4:5 image/texture → fact bar as 2×2. Hero is not height-constrained; it is content-height. See [`06-mobile-strategy.md`](./06-mobile-strategy.md) §2. |
| **Photography** | **State 2 only.** `P1088527.jpg` — hero-grade, warm stage light, single subject, generous dark negative space so it can sit on `stage-950` without a visible edge. Graded warm-highlight / blue-black shadow. ⚠️ Gate I-1. |
| **Gemini assets** | `homepage-hero-stage-light.jpg` (**already generated, pending review**) — 2752×1536, amber beams raking from upper right, deep uncluttered left third. **Sits behind the type, never behind the photograph.** Mobile needs a separate 4:5 generation — never a centre-crop. |
| **GSAP** | The one full hero sequence on the site. Ground and H1 present at paint (LCP, no JS). 150ms `curtain-up` on the H1 by line, `stagger-tight`. 400ms light sweep across the image, 900ms `ease-stage`. 520ms `fade-rise` sub-line. 680ms CTA + **one** spotlight glow pulse. 850ms scroll affordance. Total ~1.7s. Detail: [`03-motion-map.md`](./03-motion-map.md) §2. |
| **Accessibility** | H1 is **never** `opacity: 0` in CSS — present at paint, then enhanced. Contrast tested against the **actual generated texture** at every breakpoint, not against a flat swatch. Fact-bar figures are real text, not images. Guarantee text in the fact bar is static forever. Scroll affordance is decorative and `aria-hidden`. |
| **Performance** | LCP is the H1 or the texture — **never JS-dependent**. Texture: AVIF, ≤120KB at mobile widths, `fetchpriority="high"`, never lazy. Photograph (state 2) is a second, explicitly-sized element. CLS 0.00: fact bar has reserved height at all breakpoints. |
| **SEO** | The only `<h1>`. Title: `South Dade Music` (home uses `defaultTitle`, not the template). Description names Florida City and the 90-day cycle without keyword phrases. ⚠️ No `Course`/`LocalBusiness` schema until B-5 and I-8 close. |
| **Components** | `Section(register="house", density="feature", contained=false)` › `Container(wide)` › `Split(ratio="7/5")` › `Text(display-xl, expanded)` + `Reveal` ×3 + `Cluster` › `Button(cta, price="$25")` + `Button(on-dark-secondary)`. Fact bar: `Section(register="desk", density="compact")` › `Grid(cols=2, colsMd=4)`. |
| **Scroll behaviour** | Static. Only the light sweep and the scroll affordance move. **No parallax on the hero** — it contributes to LCP. |
| **CTA hierarchy** | **T1** Book a Trial — $25 (`cta` variant, the only spotlight glow above the fold) · **T2** Come watch a showcase → (⚠️ I-4; falls back to *See the 12 weeks*, anchor to §4) |
| **Copy hierarchy** | Eyebrow `THE 90-DAY STAGE PROGRAM` → H1 *"In 90 days, your child takes a stage."* → rule → *"Weeks 1–10 skill · Week 11 the class · Week 12 you."* → CTAs → facts `90 days` `12 weeks` `ages 3–18` + guarantee précis |

> ⚠️ **Fallback (I-1 open):** hero state 1. Texture spans the full right two-thirds
> at higher presence; the light sweep runs across it. **This is a shippable
> permanent state, not a placeholder.**

---

# §2 — The Reframe

### 🎭 · The persuasive hinge

| Attribute | Specification |
|---|---|
| **Purpose** | Move the problem from the child's character to a teachable gap. This is the sentence that converts a browsing parent into a reading parent. |
| **Emotional goal** | **Recognition, then permission to hope.** *"That's my kid"* followed immediately by *"and it isn't a fixed trait."* |
| **Visual hierarchy** | One statement. Nothing competes. No image, no CTA, no supporting paragraph. |
| **Layout** | Full-bleed `stage-950`, `density="feature"`. Type block occupies 8 of 12 columns, hung left, vertically centred with ≥160px of clear space above and below. |
| **Desktop** | Two stacked lines at `display-md` (48px). The recognition line in `n-300`; the reframe line in `n-0` — the tonal step *is* the argument. |
| **Tablet** | Identical construction, 8 of 8 columns, ~40px. |
| **Mobile** | ~30px, 4–6 lines. Vertical padding reduces to `--section-spacious` but the section still holds a full viewport of quiet. **This section is not compressed on mobile** — it is the emotional pivot and it needs the silence. |
| **Photography** | **None, deliberately.** An image here would give the parent something to look at instead of something to think. |
| **Gemini assets** | `decorative-section-background` (dark variant) at ≤4% presence, or nothing. If the flat `stage-950` reads better in review, ship nothing — the section does not need help. |
| **GSAP** | `curtain-up` per line, `stagger-tight` (40ms), `ease-curtain`, 640ms. **This is one of the two permitted `curtain-up` moments on the page** (the other is §1). |
| **Accessibility** | Rendered as `<p>` at display scale, **not** a heading — it is a statement, not a document landmark. 62 words maximum, well under the 400-word dark-ground limit. Reduced motion: both lines present at final state, opacity fade only. |
| **Performance** | Text only. Zero image weight. One ScrollTrigger. |
| **SEO** | High-value semantic content about shyness and confidence — the query space the brand actually owns. Not a heading, so it does not affect the outline. |
| **Components** | `Section(register="house", density="feature")` › `Container(narrow)` › `Text(display-md, as="p")` › `Reveal` ×2 |
| **Scroll behaviour** | Reveal once at 80% viewport. Then still. |
| **CTA hierarchy** | **None.** Deliberate. A CTA here interrupts the thought at the exact moment it is landing. |
| **Copy hierarchy** | Line 1 (`n-300`): *"She sings constantly at home. In front of anyone else, nothing."* → Line 2 (`n-0`): *"That's not shyness. That's a skill she hasn't been taught yet."* |

---

# §3 — The 90-Day Journey ★

### 🎭 · The signature moment

Full interaction design in [`03-motion-map.md`](./03-motion-map.md) §3. Specified
here only as a page section.

| Attribute | Specification |
|---|---|
| **Purpose** | Communicate the entire product in ten seconds. Make 90 days feel short, structured, and survivable. |
| **Emotional goal** | **Momentum → nerves → release.** The parent should feel the weeks accumulate, feel the week-11 exposure as a small catch of breath, and feel week 12 as arrival. |
| **Visual hierarchy** | 1. The illuminated week marker (the moving focus) · 2. The stage caption · 3. The progress rule · 4. The ambient ground |
| **Layout** | Pinned viewport. A horizontal rule at 62% height spanning 10 of 12 columns. Week markers along it. Caption block hung left in the lower third. Progress indicator top-right. |
| **Desktop (≥1024)** | **Pinned, scroll-scrubbed, ~250vh.** Three stages. The ambient ground *darkens* as it progresses so week 12 is the brightest moment on a page that has been getting darker. |
| **Tablet (768–1023)** | **Not pinned.** Three stacked full-width stages, each revealed with `fade-rise`, rule drawing horizontally within each. Retains the warming arc as three discrete steps. |
| **Mobile (<768)** | Vertical stacked sequence, rule runs top-to-bottom, week markers as a left rail. No pin, no scrub. All twelve weeks legible. |
| **Photography** | **The release frame only.** `DSCF3094-scaled.jpg` — the abstract diagram resolving into evidence is the emotional payoff. ⚠️ Gate I-1. |
| **Gemini assets** | `stage-light-texture` (21:9) as the ambient ground, generated at **three warmth points** — cool for weeks 1–10, warming at week 11, full spotlight at week 12 — so the arc is asset-driven rather than filter-driven. Plus `diagram-substrate` so the rule sits on something. |
| **GSAP** | The largest single motion investment on the site — **50% of the page's motion budget**. ScrollTrigger pin + scrub with 0.6s smoothing. Never `scrub: true` hard-locked. |
| **Accessibility** | **Four degradation paths**, each carrying the full week structure: below `lg`, reduced motion, no JS, low-capability device. Progress is visible throughout (Week 1 ▸▸▸ Week 12). Escapable at normal scroll speed — no scroll-jacking. Focus is never trapped inside the pin. The diagram is DOM/SVG, **not video** — crisp, translatable, readable by assistive technology. |
| **Performance** | The one place a scrub budget is spent. Animates `transform` and `opacity` only. `will-change` applied immediately before and cleared after. Auto-degrades to the static diagram if the P75 device drops below 50fps. Textures lazy-initialised — no setup cost until approached. |
| **SEO** | `<h2>` *"What ninety days looks like"*. All week copy is real text in the DOM at all scroll positions. This is the page's densest block of genuinely useful content. |
| **Components** | New composite `NinetyDayJourney` (Phase 5B), built from `Section(house, feature, contained=false)` + `Text` + `Divider` + the motion layer. Not a foundation primitive. |
| **Scroll behaviour** | Pins at section top, scrubs through ~250vh, releases into the payoff frame. Progress never hidden. |
| **CTA hierarchy** | **T2 only, at release:** *See the 12 weeks →* (anchors to §4). No Tier-1 inside a pinned sequence — `05-motion-system.md` §6 rule 6 forbids conversion elements inside a pin. |
| **Copy hierarchy** | Stage captions: *"Weeks 1–10 · Skill development & rehearsal"* → *"Week 11 · They play for the class"* → *"Week 12 · Dress rehearsal & live showcase"* |

> ⚠️ **Fallback (M-3 open — no showcase footage, I-1 open — no consented still):**
> the release resolves into the §4 table rather than an image. The pin releases,
> the ground lifts to the Desk, and the twelve weeks arrive as type. **This is a
> good ending, not a compromised one** — it hands drama to substance, which is the
> page's whole thesis.

---

# §4 — The 12 Weeks, Published

### 📋 · Substance after drama

| Attribute | Specification |
|---|---|
| **Purpose** | Convert the Journey's feeling into a fact a parent can put in a calendar. |
| **Emotional goal** | **Relief.** *"It's real, it's dated, and I can plan around it."* |
| **Visual hierarchy** | 1. Section head · 2. The week rows · 3. Week 11 and 12 rows (typographically distinguished) · 4. Format note |
| **Layout** | `n-50` ground. A three-column table — Week / What happens / Milestone — constrained to `container(content)`, not `prose`. |
| **Desktop** | Full table, 12 rows grouped 1–10 / 11 / 12. Rows 11 and 12 carry a `spot-500` left rule and heavier weight. Tabular numerals throughout. |
| **Tablet** | Identical; the "What happens" column narrows. |
| **Mobile** | **Transforms to stacked cards** — never horizontally scrolled. Weeks 1–10 collapse into a single summary card; weeks 11 and 12 get their own cards. |
| **Photography** | None. This is a data surface. |
| **Gemini assets** | `data-field-ground` at ≤2% opacity, if anything. **Never behind the data itself.** |
| **GSAP** | Grouped `fade-rise` on row bands (1–10 as one unit, then 11, then 12) — not per-row, which at 12 rows would exceed the 600ms stagger cap. |
| **Accessibility** | A real `<table>` with `<caption>`, `<th scope="col">`, `<th scope="row">`. Milestone status conveyed in **text**, not by colour alone. 17:1 contrast. |
| **Performance** | Text and borders only. Negligible. |
| **SEO** | ⭐ **The highest-value block on the page.** A published week-by-week syllabus is genuinely rare in this category and is exactly what `06-seo-strategy.md` wants — depth and structure rather than repetition. Strong long-tail surface. |
| **Components** | `Section(desk, comfortable)` › `Container(content)` › `Text(heading-lg)` + table primitive (Phase 5B) with a card transform below `md`. |
| **Scroll behaviour** | Reveal once. Static thereafter. |
| **CTA hierarchy** | **T3 only:** an inline text link to the flagship programme page. No Tier-1 — the parent is reading, not deciding. |
| **Copy hierarchy** | H2 *"The twelve weeks, published"* → lead: *"Two classes a week. One for skill, one for the band."* → table → footnote on session structure ⚠️ conflicts with 7 pages claiming one class per week — **do not ship until reconciled** |

---

# §5 — The Ladder

### 🎭 · The method, named

| Attribute | Specification |
|---|---|
| **Purpose** | Answer the primary market's central objection — *"what if my child is too shy?"* — out loud, on the homepage, instead of inside an FAQ accordion. |
| **Emotional goal** | **"There is a way through this."** Not reassurance — *method*. |
| **Visual hierarchy** | 1. The five rungs · 2. The active rung · 3. Section head · 4. The verbatim answer |
| **Layout** | `stage-900`. Five rungs as a vertical ascent occupying the right 6 columns; copy hung left in 5. |
| **Desktop (≥1024)** | **Pinned sequence 2** (the second and last permitted sitewide). Each rung illuminates as it becomes active; previous rungs dim but **stay visible**, so the *progression* is legible rather than just the current step. ~180vh. |
| **Tablet** | Not pinned. Five stacked steps, `fade-rise` each. |
| **Mobile** | Five steps as a vertical list with a connecting rule. No pin. |
| **Photography** | None. The ladder is a diagram; a photograph would make it a claim about specific children. |
| **Gemini assets** | `diagram-substrate` (dark) as the ground. No figurative content. |
| **GSAP** | 15% of the page motion budget. Scrubbed illumination, opacity-only — no transforms on the rungs, so it is safe under most conditions and cheap. |
| **Accessibility** | Rungs are an ordered list `<ol>`, readable in sequence by a screen reader with or without motion. Under reduced motion **all five rungs render lit and labelled simultaneously** — reduced motion shows *more* at once, not less. |
| **Performance** | Opacity-only scrub. Very cheap. Degrades to static below `lg`. |
| **SEO** | Owns the *"music lessons for shy child"* query space, which no competitor addresses. Named method = branded search asset. |
| **Components** | New composite `ExposureLadder` (Phase 5B). |
| **Scroll behaviour** | Pins, scrubs five states, releases. |
| **CTA hierarchy** | **None.** The parent is mid-reassurance. |
| **Copy hierarchy** | H2 *"For the child who won't put her hand up"* → verbatim: *"That is exactly what we train for."* → rungs: Alone → Heard → Beside → Among → Before → footnote naming the Gradual Exposure Ladder |

> ⚠️ **Fallback (B-3 open — the five rungs are a Phase 3 reconstruction, not owner-confirmed):**
> §5 becomes **"How a first lesson works"** — three unnamed, verifiable steps
> (one room, one teacher → playing a full piece → playing alongside peers), with the
> verbatim FAQ answer retained as the section's spine. The named method is withheld
> until confirmed. **The section still answers the objection; it simply does not
> brand the answer.**

---

# §6 — Who Teaches Your Child

### 📋 · The trust layer

| Attribute | Specification |
|---|---|
| **Purpose** | Answer *"who will be in the room with my child, and are they safe?"* — journey stage 3, where the current site fails hardest. |
| **Emotional goal** | **Reassurance through specificity.** A name and a face beat any adjective. |
| **Visual hierarchy** | 1. Portraits · 2. Names · 3. Instruments · 4. Credential line · 5. Safeguarding statement |
| **Layout** | `n-50`. 3-up card grid, equal height, portraits 4:5. |
| **Desktop** | 3 columns. Portrait desaturate→saturate on hover, name slides up 4px (pointer devices only). |
| **Tablet** | 2 columns. |
| **Mobile** | 1 column, or a 2-up compact grid if more than four instructors. |
| **Photography** | Environmental portraits in the studio, instrument in frame, **direct eye contact** — the one place on the page where a subject looks at the camera, because this is an introduction. ⚠️ Gate B-7 **and** I-1. |
| **Gemini assets** | **None. Absolutely prohibited.** A generated teacher is a fabricated person on a page whose entire job is proving real humans are accountable. |
| **GSAP** | `fade-rise` with `stagger-base`. Nothing more — this section must feel plain and honest. |
| **Accessibility** | Portraits carry meaningful alt text naming the person and instrument. Hover effects are pointer-gated; names are always visible. The safeguarding statement is real text, never an image. |
| **Performance** | Below the fold — lazy-loaded, explicit dimensions, AVIF, ≤60KB per card. |
| **SEO** | `Person` schema per instructor once B-5 and B-7 close. Named instructors are a significant local-search asset. |
| **Components** | `Section(desk, comfortable)` › `Grid(cols=1, colsMd=2, colsLg=3, equalHeight)` › `Card` × N |
| **Scroll behaviour** | Staggered reveal, once. |
| **CTA hierarchy** | **T2:** *Meet the teachers →* · **T3** per card: *Request this teacher* (booking with teacher pre-selected) |
| **Copy hierarchy** | H2 *"Who teaches your child"* → per card: name → instruments → one-line bio → credential → **safeguarding line** |

> ⚠️ **Fallback (B-7 open — no instructor is named anywhere in the estate):**
> §6 becomes **"What happens in the room"** — a three-step account of a lesson's
> shape (arrive → one instrument, one teacher → what you take home), with the
> safeguarding commitment stated as policy rather than illustrated by people.
> ⚠️ **Do not** substitute the reviews that name teachers (Mr. Lopez, Professor
> Joshua, Alberto). A customer naming a teacher is not the academy publishing a
> credential, and using it that way would be a trust violation dressed as proof.

---

# §7 — Evidence

### 🎭 · The proof layer

| Attribute | Specification |
|---|---|
| **Purpose** | Prove a showcase has actually happened. Journey stage 3. |
| **Emotional goal** | **"That's a real room, with real parents in it."** |
| **Visual hierarchy** | 1. The hero-grade frame · 2. Date and venue · 3. The gallery · 4. Student count (only if real) |
| **Layout** | Full-bleed `stage-950`. One large frame at 8 columns, a 4-up justified row beneath. |
| **Desktop** | Gallery with FLIP transition into a lightbox — the image travels from its grid position rather than cross-fading. The single most satisfying interaction available and worth doing properly. |
| **Tablet** | 3-up row, same lightbox. |
| **Mobile** | 2-up, captions **always visible** (no hover state exists on touch). Lightbox retains swipe and a visible counter. |
| **Photography** | ⭐ **The heart of the page.** `P1088527` · `DSCF3094-scaled` · `P1088689` · `P1088608` · `P1088597` · `P1088570` · `P1088680`. Every image tied to a `Performance` record with a **date and venue**. ⚠️ Gates I-1 **and** I-4. |
| **Gemini assets** | `stage-light-texture` as the surrounding ground only. **Never inside the gallery.** A generated image adjacent to documentary evidence contaminates the evidence. |
| **GSAP** | Gallery FLIP → lightbox (6% of budget). Backdrop fades to `stage-950` at 92%. Escape **returns the image to its grid position**, never a fade-out. |
| **Accessibility** | Focus trapped in the lightbox, returned to the originating thumbnail on close. Arrow keys and swipe. Counter ("4 of 18") and caption always visible. Meaningful, human-written alt text on every frame. |
| **Performance** | Thumbnails AVIF ≤40KB; full frames preloaded one ahead, never blocking. Below the fold — lazy. |
| **SEO** | `ImageObject` + `Event` schema once I-4 closes. Dated showcase records are the strongest local-search asset the business could own. |
| **Components** | `Section(house, spacious, contained=false)` › gallery composite (Phase 5B) + lightbox |
| **Scroll behaviour** | Reveal once, grouped by row. No parallax on evidence. |
| **CTA hierarchy** | **T2:** *Come watch a showcase →* (⚠️ I-4) · **T3:** *See all performances →* |
| **Copy hierarchy** | H2 *"It already happened"* → dated caption per frame → venue → *(student count only if a verified figure exists — never invented)* |

> ⚠️ **Fallback (I-1 / I-4 open — zero consented photographs, zero dated events):**
> §7 becomes **"In the room, in their words"** — a dark, type-led section carrying
> the three reviews that are *themselves* showcase evidence:
> Dexter (*"The concert was a heartwarming showcase of the kids' talent, joy, and
> hard work"*), romi (*"my niece was in the show"*), Brian Silverio (*"attending a
> lovely event hosted by South Dade Music Academy"*). Set at `display-md` on
> `stage-950`. **Undated photography is barred** (`09-image-strategy.md` §8) — an
> undated photo cannot prove a recurring cycle, so text testimony is the *more*
> honest proof here, not the weaker one.

---

# §8 — In Their Words

### 📋 · Social proof, unedited

| Attribute | Specification |
|---|---|
| **Purpose** | Corroborate the claims with voices that are not the brand's. |
| **Emotional goal** | **"Other parents like me made this decision."** |
| **Visual hierarchy** | 1. Quote · 2. Attribution · 3. Source badge · 4. Rating |
| **Layout** | `n-50`. Masonry-ish 3-up of unequal-length quotes. **Light, deliberately** — a quote must never look art-directed. |
| **Desktop** | 3 columns, 8–10 reviews, no repetition. |
| **Tablet** | 2 columns. |
| **Mobile** | 1 column, 5 reviews, with *"Read all 14 reviews"*. **No carousel.** |
| **Photography** | **None.** Reviewer portraits would be fabricated social proof — prohibited outright. |
| **Gemini assets** | None. |
| **GSAP** | `fade-rise`, `stagger-base`, grouped beyond 8 items. |
| **Accessibility** | `<blockquote>` + `<cite>`. Star ratings have text equivalents, not icon-only. |
| **Performance** | Text only. |
| **SEO** | ⚠️ **`Review` schema is deliberately withheld.** These are Google Business Profile reviews; re-marking them as first-party review schema is a guidelines violation. Display them, link the profile, do not mark them up. |
| **Components** | `Section(desk, comfortable)` › `Grid(cols=1, colsMd=2, colsLg=3)` › `Card` × N |
| **Scroll behaviour** | Reveal once. |
| **CTA hierarchy** | **T3:** *Read all reviews →* (Google profile, external) |
| **Copy hierarchy** | H2 *"What families say"* → verbatim quote → name → source badge |

**Selection for the homepage set — 8 of 14:**

| Include | Why |
|---|---|
| Mariana Gennevie Olvera — *"building his confidence since he joined"* | ⭐ Confidence outcome, the core promise. ⚠️ Names a minor (Aaron) — guardian consent required |
| Dexter — *"heartwarming showcase of the kids' talent"* | Showcase proof, no minor named |
| romi — *"my niece was in the show"* | Showcase proof |
| Brian Silverio — *"lovely event hosted by…"* | Event proof, adult perspective |
| Nikin Shah — *"She has made friends and is very happy"* | Belonging |
| Maria Carolina Linares — *"Es Genial la escuela 100% recommendada!"* | ⭐ **Genuine Spanish-language proof.** The only real evidence for the bilingual claim |
| Yaimarelys Grandales — *"a lot of progress in just a few months"* | Pace |
| Elizabeth Garcia — *"Best music school in Homestead"* | Local specificity |

**Withheld:** Charles Percy (names two minors in full **and** is religious — ⚠️ B-1 + consent) · John Granada (⚠️ B-1) · Julian Paz (721 chars — too long for a card; retain for `/about`) · Claudia Olivar, J Val, Mariana Olvera (generic).

**Rule:** verbatim or omitted. A parent's words are never edited
(`01-brand-strategy.md` §4).

---

# §9 — What It Costs

### 📋 · Arithmetic

| Attribute | Specification |
|---|---|
| **Purpose** | Remove the largest single unknown. Journey stage 4. |
| **Emotional goal** | **Trust through transparency.** In this market price is behind a phone call almost universally; publishing it is a competitive act. |
| **Visual hierarchy** | 1. The trial ($25, known) · 2. Format comparison · 3. What you need to buy · 4. Scholarship pointer |
| **Layout** | `n-50`. Comparison table or 3-up pricing cards. |
| **Desktop** | Side-by-side format comparison — Private / Group / 90-Day. |
| **Tablet** | 2-up + 1. |
| **Mobile** | **Stacked cards. Never a horizontally scrolled pricing table** — the most common failure in competitor sites and a hard rule. |
| **Photography** | None. |
| **Gemini assets** | None. Money surfaces carry no decoration. |
| **GSAP** | **Minimal.** `fade-rise` on the block. **No figure on this page animates** — a number the user is about to pay is static and instantly readable. |
| **Accessibility** | Real table semantics. Tabular numerals, right-aligned. 17:1. |
| **Performance** | Negligible. |
| **SEO** | ⭐ High-value. *"music lessons cost Homestead"* is unanswered by every competitor. |
| **Components** | `Section(desk, comfortable)` › pricing composite (Phase 5B) |
| **Scroll behaviour** | Reveal once, no motion on figures. |
| **CTA hierarchy** | **T1** Book a Trial — $25 · **T2** See all pricing → |
| **Copy hierarchy** | H2 *"What it costs"* → **the $25 trial, stated plainly with the crediting condition** → format comparison ⚠️ B-8 → *"what you need to buy"* per instrument → scholarship pointer |

> ⚠️ **Fallback (B-8 open):** ship the section with **what is genuinely known** —
> the $25 spot hold credited to tuition (verbatim, sourced), the two-classes-weekly
> structure, age bands, and the guarantee. Then state plainly: *"Tuition depends on
> format and instrument. We'll quote you before you commit — there's no charge to
> ask."* **An honest gap beats a fabricated number, and it beats silence.**

---

# §10 — The Door In

### 📋 · Access

| Attribute | Specification |
|---|---|
| **Purpose** | Serve the Scholarship Family — `01-brand-strategy.md` §5's *"single largest untapped demand pool on the site."* |
| **Emotional goal** | **Dignity.** *"We belong here, and it's a normal process."* |
| **Visual hierarchy** | 1. Step Up eligibility · 2. Application steps · 3. The inclusion promise · 4. Bilingual · 5. From age 3 |
| **Layout** | `n-50`. Two-column: steps left, plain-language eligibility right. |
| **Desktop** | Numbered step list with a document checklist. |
| **Tablet** | Stacked. |
| **Mobile** | Single column, steps as an accordion **open by default** — nothing procedural hides behind an interaction. |
| **Photography** | ⚠️ **Deliberately ordinary if used at all.** `09-image-strategy.md` §6: the message is *"the same lessons, no separate track."* A celebratory image here implies a special programme, which is the opposite of the point. |
| **Gemini assets** | `scholarship-graphic` — the template was written for exactly this: calm, plain, unremarkable in the best sense. |
| **GSAP** | **Minimal.** This page must feel plain, procedural and trustworthy (`05-motion-system.md` §17). |
| **Accessibility** | ⭐ The most important accessibility surface on the page — Unique Abilities families arrive here. Plain language, real lists, no motion, generous targets. |
| **Performance** | Text only. |
| **SEO** | ⭐ Owns *"Step Up for Students music lessons"*, an unserved query with high intent. |
| **Components** | `Section(desk, comfortable)` › `Split(ratio="7/5")` › `Stack` |
| **Scroll behaviour** | Reveal once, minimal. |
| **CTA hierarchy** | **T2** Check if you qualify → · **T3** Step Up for Students ↗ (outbound; currently absent sitewide) |
| **Copy hierarchy** | H2 *"If you have a Step Up scholarship"* → *"We're an approved provider. PEP and UA."* → steps → ⚠️ **mandatory disclaimer**: *"administered and awarded by Step Up for Students, not by South Dade Music"* → inclusion promise verbatim: *"All students learn together in the same supportive environment."* |

> ⚠️ **Bilingual (B-6):** if the Spanish tree is not built, the claim *"full
> bilingual support"* is **removed, not softened.** A claim made and undelivered is
> worse than a claim not made — and this is the audience most harmed by it. The
> Spanish-language review (Maria Carolina Linares) may remain in §8 as evidence of
> a Spanish-speaking community; it is not a substitute for a Spanish path.

---

# §11 — The Turn

### 🎭 · The real product

| Attribute | Specification |
|---|---|
| **Purpose** | Name what the parent is actually buying: not a performance, but a child who now identifies as someone who performs. |
| **Emotional goal** | **Pride, anticipated.** The strongest note on the page. |
| **Visual hierarchy** | One sentence. Nothing else exists in this viewport. |
| **Layout** | Full-bleed `stage-950`, `density="feature"`. Type centred-left in 8 columns, generous silence above and below. |
| **Desktop** | `display-md`, `n-0`, expanded width. Optional attribution to the existing site copy. |
| **Tablet** | ~40px. |
| **Mobile** | ~30px. **Not compressed** — this is the emotional peak. |
| **Photography** | None, or one wide house shot showing a real audience if I-1 closes. **A parent's face in the audience is the most persuasive image available to this business** and it carries far less consent complexity than a child's. |
| **Gemini assets** | `abstract-musical-composition` at very low presence, or nothing. |
| **GSAP** | Single `fade-rise`. **Not** `curtain-up` — the page's two permitted curtain moments are spent on §1 and §2. |
| **Accessibility** | One sentence. `<p>` at display scale. Well within the dark-ground word limit. |
| **Performance** | Text only. |
| **SEO** | The brand's most distinctive sentence. |
| **Components** | `Section(house, feature)` › `Container(narrow)` › `Text(display-md, as="p")` › `FadeIn` |
| **Scroll behaviour** | Reveal once. Still. |
| **CTA hierarchy** | **None.** The next section is the CTA. |
| **Copy hierarchy** | *"Because once they realize they can get through something that feels scary, it changes how they approach everything else."* — **protected copy, must survive the rewrite** (`01-brand-strategy.md` §12) |

---

# §12 — The Guarantee, and How to Start

### 📋 · The close

| Attribute | Specification |
|---|---|
| **Purpose** | De-risk the decision at the exact moment doubt peaks, then give one unambiguous next step. |
| **Emotional goal** | **Permission to act.** |
| **Visual hierarchy** | 1. The guarantee · 2. Primary CTA · 3. What happens next · 4. Utility contact |
| **Layout** | `n-50`. Guarantee in a bordered panel at `container(narrow)`; CTA block beneath. |
| **Desktop** | Guarantee at `heading-lg`, quoted verbatim. CTA `size="xl"`. |
| **Tablet** | Identical, narrower. |
| **Mobile** | Full-width `xl` CTA. Sticky action bar has been present since 25% scroll and **hides here** so it never obscures the real close or the footer. |
| **Photography** | None. |
| **Gemini assets** | None. Decision surfaces carry no decoration. |
| **GSAP** | `fade-rise` on the block. **The guarantee text never animates** — it is the primary risk-reversal and must be legible instantly (`05-motion-system.md` §16 rule 4). |
| **Accessibility** | Terms disclosed **above** the CTA, never inside or after a form. Guarantee is real text at 17:1. Touch targets 44px+ with 8px separation. |
| **Performance** | Negligible. Last paint before the footer. |
| **SEO** | Closing content block; no schema until gates close. |
| **Components** | `Section(desk, spacious)` › `Container(narrow)` › `Card(elevation=2)` › `Text(heading-lg)` + `Button(cta, size="xl", price="$25")` |
| **Scroll behaviour** | Reveal once. Terminal. |
| **CTA hierarchy** | **T1** Book a Trial — $25 · **T3** Call · WhatsApp ⚠️ (no link exists) · Español ⚠️ B-6 |
| **Copy hierarchy** | H2 *"If they're not ready, we keep going."* → **verbatim guarantee**: *"If your child is not prepared to step on stage at the end of the 90-day cycle, we will continue coaching them at no additional charge until they are ready."* → *"The $25 holds your spot and is credited to your tuition."* → CTA → *"What happens next: we'll call within one business day to find a time."* ⚠️ only if true |

---

## Section-level summary

| § | Section | Room | Motion | Blocked by | Ships without gates? |
|---|---|:---:|---|---|:---:|
| 1 | The Bill | 🎭📋 | High | I-1 (state 2), B-4, I-4 | ✅ state 1 |
| 2 | The Reframe | 🎭 | Medium | — | ✅ |
| 3 | The 90-Day Journey | 🎭 | **Highest** | I-1, M-3 (release only) | ✅ table release |
| 4 | The 12 Weeks | 📋 | Low | session-count conflict | ⚠️ needs reconciliation |
| 5 | The Ladder | 🎭 | Medium | B-3 | ✅ unnamed fallback |
| 6 | Who Teaches | 📋 | Low | **B-7, I-1** | ✅ process fallback |
| 7 | Evidence | 🎭 | Medium | **I-1, I-4** | ✅ testimony fallback |
| 8 | In Their Words | 📋 | Low | B-1 (2 reviews) | ✅ |
| 9 | What It Costs | 📋 | **None** | B-8 (partial) | ✅ trial + honest gap |
| 10 | The Door In | 📋 | **None** | B-6 (bilingual claim) | ✅ claim removed |
| 11 | The Turn | 🎭 | Low | — | ✅ |
| 12 | Guarantee + Start | 📋 | **None** | — | ✅ |

**Eleven of twelve sections ship on launch day with an honest fallback.** §4 is
the only one requiring a content decision first — the two-classes-weekly claim
conflicts with seven pages stating one class per week, and a published syllabus
that contradicts the rest of the site is worse than no syllabus.

---

**Next:** [`03-motion-map.md`](./03-motion-map.md)
