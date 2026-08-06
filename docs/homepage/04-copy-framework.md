# 04 — Copy Framework

**Phase:** 5A — Homepage Creative Blueprint
**Date:** 2026-08-06
**Governed by:** [`../redesign/01-brand-strategy.md`](../redesign/01-brand-strategy.md) §4 (voice), §12 (the transformation story)
**Source of truth:** `docs/source-content/` — no business fact is invented here.

---

## 1. Provenance marking

Every line on the homepage carries one of four marks. **A line with no mark does
not ship.**

| Mark | Meaning | Approval needed |
|---|---|---|
| ✅ **VERBATIM** | Extracted from the live site. Publishable today. | None |
| ✍️ **AUTHORED** | New copy. Contains no unverified business fact. | Owner sign-off on tone |
| ⚠️ **GATED** | Blocked on a decision gate. Fallback specified. | The gate |
| 🚫 **BANNED** | Present on the current site; must not carry forward. | — |

---

## 2. Voice, applied

From `01-brand-strategy.md` §4. Six principles, each with a homepage test.

| Principle | Test on this page |
|---|---|
| **Say the number** | "12 weeks", "$25", "ages 3–18", "two classes a week" — all present above §5 |
| **Lead with the child, not the school** | §1 H1 says *your child*, not *we offer* |
| **Name the fear** | §2 and §5 say "shy" out loud. The current site hides it in an accordion |
| **Never keyword-stuff** | Zero instances of the banned phrases (§7 below) |
| **Short sentences carry weight** | The best extracted line is 18 words. §11 is one sentence |
| **Write Spanish, don't translate it** | ⚠️ B-6. No machine-carried idiom |

### Personality dials for this page

```
Formal        ·······●··   Familiar
Playful       ····●·····   Serious
Loud          ······●···   Composed
Aspirational  ········●·   Accessible
Cool          ·····●····   Warm
```

**Familiar, composed, accessible, warm** — a professional academy that talks to
you like a neighbour. Not an institution; not a birthday-party entertainer.

### Words

**Use:** stage · showcase · confidence · ensemble · ready · perform · week ·
coach · together · room

**Avoid:** cheap · affordable · classes near me · world-class · state-of-the-art ·
unlock your potential · passionate about music *(unearned)* · journey
*(overused in current copy — note this page's §3 is titled "The 90-Day Journey"
internally but is **never** labelled "journey" in user-facing copy)*

---

## 3. The page, line by line

---

### §1 — The Bill

| Slot | Copy | Mark |
|---|---|---|
| Eyebrow | `THE 90-DAY STAGE PROGRAM` | ✅ Programme name is extracted. ⚠️ ™ usage pending B-5 |
| **H1** | **In 90 days, your child takes a stage.** | ✍️ AUTHORED |
| Rule line | Weeks 1–10 skill · Week 11 the class · Week 12 you. | ✍️ from ✅ structure |
| CTA 1 | **Book a Trial — $25** | ✅ VERBATIM price |
| CTA 2 | Come watch a showcase → | ⚠️ I-4 · fallback: *See the 12 weeks* |
| Fact 1 | `90` days | ✅ |
| Fact 2 | `12` weeks | ✅ *"a structured 12-week program"* |
| Fact 3 | ages `3–18` | ✅ *"families with children ages 3–18"* |
| Fact 4 | **Stage-Ready Guarantee** — Not ready? We keep coaching. | ✍️ précis of the ✅ guarantee |

**Why the H1 is authored rather than extracted.** The current H1 is *"Music that
builds confidence & community"* — true, generic, and identical to what any
competitor could write. The current *eyebrow* is *"Every Student Steps on Stage
Within 90 Days."* — specific, differentiated, **and falsifiable.**

⚠️ **Gate B-4.** Three live claims cannot all be true:

- Sitewide footer: *"every student performs in a live showcase within 90 days"* — **unconditional**
- `/performances`: students perform *"when they feel ready"* — **conditional**
- The guarantee: *"if your child is **not prepared** to step on stage…"* — **concedes the absolute is false**

**"In 90 days, your child takes a stage"** describes the programme's shape, not a
universal quantifier over students. It keeps the deadline and the specificity and
drops the falsifiable absolute.

> **Hard rule until B-4 closes: the words "every student" appear nowhere on this
> page.**

**Recommended resolution for the owner** (`01-brand-strategy.md` §8) — stronger
than the current claim because it turns the guarantee from fine print into the
proof point:
> *"Every student gets stage-ready. Most in 90 days. However long it takes yours,
> we keep coaching — at no extra cost."*

---

### §2 — The Reframe

| Slot | Copy | Mark |
|---|---|---|
| Line 1 (`n-300`) | She sings constantly at home. In front of anyone else, nothing. | ✍️ AUTHORED |
| Line 2 (`n-0`) | That's not shyness. That's a skill she hasn't been taught yet. | ✍️ AUTHORED |

Beats 1 and 2 of the transformation story (`01` §12). **Twenty-three words, the
most important on the page.**

Line 1 opens with the parent's experience, not the school's. Line 2 is the
persuasive hinge: it moves the problem from the child's *character* to a
*teachable gap*, which is the only move that makes the rest of the page
purchasable.

**Alternate for a son** (rotate at build, do not randomise per visit):
> *"He plays for hours in his room. Ask him to play for anyone and it stops."*

---

### §3 — The 90-Day Journey

| Slot | Copy | Mark |
|---|---|---|
| H2 | What ninety days looks like | ✍️ |
| Stage 1 | **Weeks 1–10** · Skill development and rehearsal. | ✅ |
| Stage 2 | **Week 11** · They play for the class. | ✅ *"Week 11: Peer Exposure"* |
| Stage 3 | **Week 12** · Dress rehearsal and live showcase. | ✅ |
| Progress | `WEEK 01 ▸▸▸ 12` | ✍️ |
| Release | It already happened. | ✍️ ⚠️ I-4 |

🚫 The source renders these as *"o Weeks 1-10:"* with literal `o ` bullet
artifacts, and Week 11 reads *"Class **mein** performance"* — a Hindi/Urdu word
left in English copy. **Both defects die here.**

---

### §4 — The 12 Weeks, Published

| Slot | Copy | Mark |
|---|---|---|
| H2 | The twelve weeks, published | ✍️ |
| Lead | Two classes a week. One for skill, one for the band. | ✅ VERBATIM |
| Weeks 1–10 | Skill development and rehearsal | ✅ |
| Week 11 | Peer exposure — they play for the class | ✅ |
| Week 12 | Dress rehearsal and live showcase | ✅ |
| Footnote | Ages 3–18. Adults welcome. | ✅ |

> ⚠️ **Publication blocker — reconcile before shipping §4.** *"Students attend two
> classes weekly: one for skill, one for band application"* (`faqs.json`,
> canonical) conflicts with **seven pages** stating one lesson per week. A
> published syllabus that contradicts the rest of the site is worse than no
> syllabus. **This is a content decision, not a design one.**

---

### §5 — The Ladder

| Slot | Copy | Mark |
|---|---|---|
| H2 | For the child who won't put her hand up | ✍️ |
| Lead | **That is exactly what we train for.** | ✅ VERBATIM |
| Rung 1 | **Alone** — You start in a room with one person who's on your side. | ✍️ ⚠️ B-3 |
| Rung 2 | **Heard** — She plays a full piece for her teacher. | ✍️ ⚠️ B-3 |
| Rung 3 | **Beside** — She plays alongside other students. | ✍️ ⚠️ B-3 |
| Rung 4 | **Among** — Week 11. She plays for the class. | ✍️ ⚠️ B-3 |
| Rung 5 | **Before** — Week 12. She plays for you. | ✍️ ⚠️ B-3 |
| Attribution | We call it the Gradual Exposure Ladder. | ✅ name · ⚠️ B-3 rungs |

The lead is the **single best conversion asset on the site**
(`03-user-journey.md` §3) and it is currently buried inside an FAQ accordion.
Promoting it to a homepage section is the highest-leverage copy move available.

> ⚠️ **B-3 fallback.** The extraction gives only the *name* and *"move them from
> isolation to community safely."* The five rungs are a reasonable Phase 3
> reconstruction and **must be owner-confirmed before publication as method.**
> Until then §5 ships as **"How a first lesson works"** with three verifiable
> steps and the ✅ verbatim lead retained.

---

### §6 — Who Teaches Your Child

| Slot | Copy | Mark |
|---|---|---|
| H2 | Who teaches your child | ✍️ ⚠️ B-7 |
| Per card | Name · instruments · one-line bio · credential | ⚠️ B-7 |
| Safeguarding | *(policy statement)* | ⚠️ **does not exist anywhere in the estate** |

🚫 *"Experienced and caring instructors"* — the current site's claim, made with
**zero named instructors**. An adjective is not a credential.

> ⚠️ **B-7 fallback: "What happens in the room."** Three steps describing a
> lesson's shape. **Do not** substitute the reviews naming Mr. Lopez, Professor
> Joshua or Alberto — a customer naming a teacher is not the academy publishing a
> credential, and using it that way would be a trust violation dressed as proof.

---

### §7 — Evidence

| Slot | Copy | Mark |
|---|---|---|
| H2 | It already happened | ✍️ |
| Per frame | *Winter showcase, [date] — [venue]* | ⚠️ I-4 |
| CTA | Come watch a showcase → | ⚠️ I-4 |

🚫 *"Students get opportunities to take part in small recitals and community
events **when they feel ready**"* — directly contradicts the sitewide
unconditional claim. One of the two must go (B-4).

> ⚠️ **I-1 / I-4 fallback: "In the room, in their words."** Three ✅ VERBATIM
> reviews that are themselves showcase evidence:
> - *"The concert was a heartwarming showcase of the kids' talent, joy, and hard work, leaving us all proud and inspired."* — Dexter
> - *"my niece was in the show and she's been having so much fun at practice"* — romi
> - *"Had the pleasure of attending a lovely event hosted by South Dade Music Academy… The young performers were incredibly talented"* — Brian Silverio
>
> **Undated photography is barred** (`09-image-strategy.md` §8): an undated photo
> cannot prove a recurring cycle. Text testimony is the *more* honest proof here.

---

### §8 — In Their Words

| Slot | Copy | Mark |
|---|---|---|
| H2 | What families say | ✍️ |
| Quotes | 8 reviews, verbatim | ✅ |
| CTA | Read all reviews → | ✍️ |

**Rule: verbatim or omitted.** A parent's words are never edited — including
Maria Carolina Linares's mixed Spanish/English and the original spelling. See
[`02-section-specifications.md`](./02-section-specifications.md) §8 for the
selection and the four withheld.

🚫 *"Many local families trust South Dade Music when looking for **Music Lessons
Near Me** in a safe and supportive environment"* — the current section lead,
with a search query embedded in the sentence.

---

### §9 — What It Costs

| Slot | Copy | Mark |
|---|---|---|
| H2 | What it costs | ✍️ |
| Trial | It's a 90-Day Stage Experience Preview. We hold your spot for **$25**, credited to your tuition when you enrol. | ✅ VERBATIM |
| Tuition | *(per-format pricing)* | ⚠️ B-8 |
| Honest gap | Tuition depends on format and instrument. We'll quote you before you commit — there's no charge to ask. | ✍️ ⚠️ B-8 fallback |
| Equipment | *(what you need to buy, per instrument)* | ⚠️ B-8 |

⭐ The **$25 is publishable today.** Gate B-8 blocks *tuition*, not the trial fee.
This corrects a Phase 4 over-caution — see
[`01-homepage-blueprint.md`](./01-homepage-blueprint.md) §7.1.

**An honest gap beats a fabricated number, and it beats silence.**

---

### §10 — The Door In

| Slot | Copy | Mark |
|---|---|---|
| H2 | If you have a Step Up scholarship | ✍️ |
| Lead | We're an approved Step Up for Students provider. We accept PEP and UA. | ✅ VERBATIM |
| **Disclaimer** | These scholarships are **administered and awarded by Step Up for Students, not by South Dade Music.** | ✅ **MANDATORY — do not omit** |
| Inclusion | All students learn together in the same supportive environment. | ✅ |
| Ages | From age 3. | ✅ |
| Bilingual | *(Spanish support)* | ⚠️ B-6 |
| CTA | Check if you qualify → | ✍️ |

The disclaimer appears on `/resources/` and is **dropped** by
`/step-up-accessibility/` — the page where it matters most. It is a compliance
statement about who awards public funds and it ships every time the scholarship
is mentioned.

> ⚠️ **B-6.** *"We offer full bilingual support across our core programs and
> enrollment processes"* is ✅ verbatim but **evidenced nowhere**. If the Spanish
> tree is not built, the claim is **removed, not softened.** A claim made and
> undelivered is worse than a claim not made — and this is the audience most
> harmed by it.

---

### §11 — The Turn

| Slot | Copy | Mark |
|---|---|---|
| Single line | **Because once they realize they can get through something that feels scary, it changes how they approach everything else.** | ✅ **PROTECTED** |

`01-brand-strategy.md` §2: *"That second line, buried in the homepage's
four-pillar block, is the single best sentence on the current website."*

**Protected copy. Must survive the rewrite. Do not edit, shorten, or Americanise
the spelling** — it is quoted verbatim, including *"realize"*.

---

### §12 — The Guarantee, and How to Start

| Slot | Copy | Mark |
|---|---|---|
| H2 | If they're not ready, we keep going. | ✍️ |
| **Guarantee** | **If your child is not prepared to step on stage at the end of the 90-day cycle, we will continue coaching them at no additional charge until they are ready.** | ✅ **VERBATIM — never paraphrase** |
| Trial note | The $25 holds your spot and is credited to your tuition. | ✅ |
| CTA | **Book a Trial — $25** | ✅ |
| Next step | We'll call within one business day to find a time. | ⚠️ **only if true** — do not promise a response time the business cannot meet |

The guarantee is the **strongest conversion trigger available**
(`03-user-journey.md` §3, ranked #1) and currently appears on **2 pages of 26**
and **none of the 6 programme pages.**

---

## 4. Copy hierarchy — the four levels

| Level | Function | Type token | Rule |
|---|---|---|---|
| **1 · The promise** | §1 H1, §11 | `display-xl` / `display-md` | One per screen. Never more than 12 words |
| **2 · The claim** | Section H2s | `heading-lg` | Sentence case. Never Title Case, never ALL CAPS |
| **3 · The substance** | Body, facts, tables | `body-md` / `body-lg` | 68ch measure. Says the number |
| **4 · The mechanic** | Labels, captions, eyebrows | `label` / `body-sm` | The only uppercase in the system |

---

## 5. Reading load

| Section | Words (target) | Room | Limit |
|---|---:|:---:|---|
| §1 | 35 | 🎭📋 | — |
| §2 | 23 | 🎭 | ≤400 on dark |
| §3 | 40 | 🎭 | ≤400 |
| §4 | 180 | 📋 | unlimited |
| §5 | 90 | 🎭 | ≤400 |
| §6 | 160 | 📋 | unlimited |
| §7 | 60 | 🎭 | ≤400 |
| §8 | 320 *(verbatim quotes)* | 📋 | unlimited |
| §9 | 140 | 📋 | unlimited |
| §10 | 130 | 📋 | unlimited |
| §11 | **21** | 🎭 | ≤400 |
| §12 | 90 | 📋 | unlimited |
| **Total** | **≈1,290** | | |

Every House section is far under the 400-word dark-ground limit. **All long-form
is in the light.** That is the two-register system doing accessibility work, not
just aesthetic work.

---

## 6. Spanish — authored, not translated

⚠️ Gate B-6. If the tree is built:

| Requirement | Detail |
|---|---|
| **Authored, not translated** | Copy is written for both languages. Idiom is not machine-carried across |
| **+35% expansion** | Every heading tested. *"Listos para el escenario"* is 27 characters against 21 |
| **Line height 1.7** | Accented ascenders need room — applied via `:lang(es)` |
| **Width axis narrows to ~100** | On the Spanish tree, rather than reducing the size |
| **Verbatim quotes are not translated** | Maria Carolina Linares's review appears as written, in both trees |
| **The disclaimer is translated exactly** | Step Up compliance language is not paraphrased |

**Worst case in the project:** §1 H1 at `display-xl`, expanded width, in Spanish.
Prove it at design review, not at build.

---

## 7. Banned from this page

Present on the current homepage. **None carries forward.**

| Banned | Where it appears now |
|---|---|
| 🚫 "Music Lessons Near Me" | Mission statement, testimonials lead |
| 🚫 "Kids Music Classes South Dade" | Mission statement, "Why choose" closer |
| 🚫 "Piano Lessons Near Me" | Homepage body |
| 🚫 "Singing Lessons For Kids" | Summer programmes blurb |
| 🚫 "Group Music Classes South Dade" | Used as a noun inside body sentences |
| 🚫 "WHY CHOOSE SOUTH DADE MUSIC" | ALL CAPS H2 — the brand is composed, not shouting |
| 🚫 "Exceution" | Typo, live on the homepage |
| 🚫 "Class mein performance" | Untranslated word in the flagship description |
| 🚫 `o ` bullet artifacts | Throughout the 90-day block |
| 🚫 The mission statement block | It is a meta description that escaped |
| 🚫 5 numbered "why choose" adjectives | Every competitor has them |
| 🚫 "every student performs…" | ⚠️ Until B-4 closes |
| 🚫 "choirs, orchestras" | Claimed once, contradicted everywhere. **No proof** |
| 🚫 "Call, text, or WhatsApp" | **No WhatsApp link exists anywhere on the site** |

### Repetition audit

| Element | Current | This page |
|---|---:|---:|
| Programme cards | **15** (5 × 3) | **0** — the flagship gets §3–§4; the rest is navigation |
| Testimonials rendered | **18** (12 unique) | **8**, each once |
| "Explore Program" CTAs | **15** | **0** |
| CTAs total | **30+**, 4 labels, 1 widget | **6**, 3 tiers, intent captured at source |

---

## 8. Copy sign-off checklist

Before a single word ships:

- [ ] **B-4** — 90-day wording approved. No "every student" anywhere
- [ ] **B-5** — one brand name chosen; ™ usage confirmed
- [ ] **B-3** — Ladder rungs confirmed, or §5 fallback adopted
- [ ] **B-7** — instructor names + safeguarding statement, or §6 fallback adopted
- [ ] **B-8** — tuition published, or the honest-gap line adopted
- [ ] **B-6** — Spanish built, or the bilingual claim **removed**
- [ ] **B-1** — faith affiliation resolved; 2 reviews withheld or restored
- [ ] Two-classes-weekly vs one-per-week conflict reconciled (blocks §4)
- [ ] Guardian consent for the review naming a minor (§8)
- [ ] "We'll call within one business day" verified as achievable, or removed
- [ ] Every ✍️ AUTHORED line read aloud by the owner. If they wouldn't say it, it doesn't ship

---

**Next:** [`05-image-placement.md`](./05-image-placement.md)
