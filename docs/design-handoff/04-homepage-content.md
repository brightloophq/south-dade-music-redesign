# 04 — Homepage Content

The exact words currently on the built homepage. Source: `src/content/home.ts`.

Every string is marked ✅ VERIFIED (extracted verbatim), ✍️ AUTHORED (written
for the rebuild from verified material), or ⚠️ GATED.

**The designer may re-typeset and re-order this content. The designer may not
rewrite it.** Copy changes go back to the owner, not into a comp.

---

## Section order as built

1. Header
2. Hero
3. The Reframe
4. The 90-Day Journey
5. The Twelve Weeks
6. Programs
7. Music Lessons
8. Performance Evidence
9. Testimonials
10. Scholarship
11. Final CTA
12. Footer

---

## 1. Hero

| Element | Content | Status |
|---|---|---|
| Eyebrow | **The 90-Day Stage Program** | ✅ (⚠️ ™ withheld, gate B-5) |
| Heading | **In 90 days, / your child / takes a stage.** | ✍️ three lines, for a curtain-up reveal |
| Supporting | **Weeks 1–10 skill · Week 11 the class · Week 12 you.** | ✍️ from ✅ week structure |
| Primary CTA | **Book a Trial — $25** → `/contact/book-a-trial` | ✅ price verbatim |
| Secondary CTA | **See the 12 weeks** → `#twelve-weeks` | ⚠️ I-4 fallback |
| Fact bar | **90** days · **12** weeks · **3–18** ages | ✅ all verbatim |
| Guarantee | **Stage-Ready Guarantee** — *Not ready? We keep coaching.* | ✍️ précis of ✅ guarantee |

> ⚠️ **HARD RULE until gate B-4 closes: the words "every student" appear
> nowhere on the site.** The live site's hero reads *"Every Student Steps on
> Stage Within 90 Days"* — unconditional, and contradicted by the guarantee that
> qualifies it. The rebuilt wording describes the programme's shape instead of
> making a universal claim about children.

> ⚠️ The secondary CTA would ideally read *"Come watch a showcase."* That is
> barred until a **dated event exists** (gate I-4) — no event record is
> published and both event URLs 404. `See the 12 weeks` is the documented
> fallback.

## 2. The Reframe

✍️ AUTHORED. Twenty-three words, and the most important on the page.

> **She sings constantly at home. In front of anyone else, nothing.**
>
> **That's not shyness. That's a skill she hasn't been taught yet.**

Line 1 opens with the parent's experience rather than the school's. Line 2 is
the persuasive hinge — it moves the problem from the child's *character* to a
*teachable gap*. Carries no gate.

## 3. The Turn

✍️ AUTHORED.

> Because once they realize they can get through something that feels scary, it
> changes how they approach everything else.

## 4. The 90-Day Journey

Heading: ✍️ **What ninety days looks like**
Progress label: **Week** · Skip link: **Skip to the twelve-week table**

The signature scroll sequence. Staged against the verified week structure. This
is the section the motion film is built around — see `08-motion-capabilities.md`.

## 5. The Twelve Weeks

Heading: ✍️ **The twelve weeks, published**
Lead: ✅ **A structured 12-week program, ending in a live showcase.**

| Week | What happens | Milestone |
|---|---|---|
| **Weeks 1–10** | Skill development and rehearsal. | — |
| **Week 11** | Peer exposure — they play for the class. | Peer exposure |
| **Week 12** | Dress rehearsal and live showcase. | Live showcase |

Footnote: ✅ **Ages 3–18. Adults welcome.**

> ⚠️ The lead deliberately carries **no session-frequency claim**, because the
> "two classes weekly" statement conflicts with seven instrument pages that each
> say one lesson per week. See `05-business-claims-and-gates.md` §8.

> ⚠️ **12 weeks = 84 days, not 90.** The product name, the hero claim and the
> week breakdown do not reconcile. Gate B-4.

## 6. Programs

Heading: ✍️ **Programs**
Lead: ✍️ **One flagship cycle, and the classes that feed it.**

Six programs, all ✅ verified names. Facts on each card contain **only values the
source actually states** — where the source is silent (Private Lessons has no
stated duration, Band Builders no numeric age range), nothing is invented and
the fact is simply absent.

> ⚠️ **No price appears on any card.** Gate B-8: tuition is `null` for every
> programme except the camp.

## 7. Music Lessons

Heading: ✍️ **Music lessons**
Lead: ✍️ **Seven instruments, taught one-on-one. Most children start between
five and eight. A keyboard is enough to start.**
CTA: **See all lessons** → `/lessons`

## 8. Performance Evidence

Heading: ✍️ **It already happened**
Lead: ✍️ **Not our words.**

Carries the three performance-specific testimonials rather than photography.

Note, ✍️: **Showcase photography is published once every family has given
written consent.**

> ⚠️ This section exists in its current form **because** gate I-1 blocks all 18
> existing performance photographs. It is a designed response to a constraint,
> not a placeholder.

## 9. Testimonials

Heading: ✍️ **What families say**
Source label: **Google review**

De-duplicated to unique entries. See `03-content-inventory.md` §5 for the
defects in the current site's presentation.

## 10. Scholarship

Heading: ✍️ **If you have a Step Up scholarship**

Lead ✅ VERBATIM:

> South Dade Music partners with Step Up for Students as an approved provider.
> We accept PEP (Personalized Education Program) and UA (Unique Abilities)
> scholarships.

Disclaimer ✅ VERBATIM — **must remain adjacent to the claim:**

> Please note that these scholarships are administered and awarded by Step Up
> for Students, not by South Dade Music.

Inclusion line ✅: **Inclusive programs for all learners.**
CTA: **Talk to us about Step Up** → `/contact`

⚠️ `bilingualClaim` is deliberately **`null`** in the content module — gate B-6.

## 11. Final CTA

Carries the **full verbatim guarantee text**, not the précis used in the hero.

## 12. Footer

Contact block, hours, and the ✅ verbatim positioning line — with the "every
student" phrasing withheld pending gate B-4.

---

## What the homepage deliberately does **not** contain

| Absent | Why |
|---|---|
| Any price except **$25** | Gate B-8 — no tuition is published anywhere on the live site |
| Any photograph of a student | Gate I-1 — no photo-release consent for any of the 18 photos |
| Any named teacher | Gate B-7 — the site names no instructor; only testimonials do |
| A dated showcase | Gate I-4 — no event record exists; both event URLs 404 |
| A Spanish toggle | Gate B-6 — the bilingual claim is unsupported |
| Any social link | None exist on the live site |
| The words "every student" | Gate B-4 |
