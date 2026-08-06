# 05 — Business Claims and Decision Gates

**This is the authoritative document in the package.** If any other document
conflicts with this one, this one wins.

Source: `docs/source-content/content-conflicts.md`, `business-profile.json`,
`src/config/site.ts`.

---

## Part A — The 17 unresolved conflicts

🔴 = blocks launch · 🟠 = should be fixed before launch

### 🔴 1. Business name
Four variants. See `02-brand-and-audience.md` §1. **Gate B-5.**

### 🔴 2. Address — three unit numbers
`Unit 117` (contact page + Google place record) · `Unit 1157` (both camp pages —
where parents drive for drop-off) · `Unit 115` (subdomain, whose own map link
resolves to 117). **Gate I-8.**

### 🔴 3. Phone number
`786-753-9509` sitewide vs `+1-786-386-1982` on the subdomain.

### 🟠 4. Email
`info@southdademusic.com` sitewide vs `contact@southdademusic.com` on the
contact page.

### 🟠 5. Opening hours
Published only in the footer: Mon–Sat 8:00am–6:00pm. Instrument pages promise
*"After-school and evening availability"*, which 6:00pm does not support. No
holiday schedule, term dates or closure calendar exists.

### 🔴 6. Ages served
Six statements. See `02-brand-and-audience.md` §6. **Gate B-2.**

### 🔴 7. Private vs group lesson format
The site sells both without clearly distinguishing them.

### 🔴 8. Lesson frequency
| Claim | Source |
|---|---|
| **Two classes weekly** — *"one for skill, one for band application"* | `/resources/`, homepage FAQ |
| **One lesson per week** — *"One private lesson per week is ideal"* | **All seven instrument pages** |
| **Weekly private lessons** | `/private-lessons/` |

**The rebuild withholds the frequency claim entirely.** Two pages contradict
seven. Do not put a frequency on any comp.

### 🔴 9. 90-Day Stage Program duration
`90 days` (product name, footer, hero) vs `12 weeks` = **84 days** (hero body,
program cards) vs `about three months` (program page).

The name, the claim and the breakdown do not reconcile. **Gate B-4.**

### 🔴 10. Performance guarantee — does *every* student perform?

| Wording | Source | Strength |
|---|---|---|
| *"every student performs in a live showcase within 90 days"* | footer, FAQs | **unconditional** |
| *"Every Student Steps on Stage Within 90 Days."* | homepage hero | **unconditional** |
| *"At the end of the 90 days, students get the chance to perform."* | `/90-day-stage-program/` | conditional |
| *"…when they feel ready."* | homepage Performances block | conditional, student-gated |

**The business makes an unconditional promise in two places and qualifies it in
two others.** This is the most serious claim exposure in the estate.
**Gate B-4.**

### 🟠 11. Trial lesson terms
✅ *"It is a 90-Day Stage Experience Preview. We hold your spot for $25, which
is credited to your tuition upon enrollment."* — **on exactly two pages.**

24 other pages carry 30+ CTA instances saying only *"Schedule a Trial Lesson"*
with no terms and no price.

### 🔴 12. Prices

**Published:** camp only — `$450 per session (60 instructional hours)`,
`$400 pay-in-full`.

**Never published anywhere:**
- Tuition for the 90-Day Stage Program — **the flagship offer**
- Private, group, Band Builders, Early Childhood rates
- **The camp down payment amount** — required "today", strictly non-refundable,
  figure never stated
- Lesson length (30/45/60 min)
- Registration, materials or recital fees
- Sibling or multi-lesson discounts

The undisclosed non-refundable deposit is the most urgent commercial gap.
**Gate B-8.**

### 🟠 13. Camp dates
Both camp pages agree: Session 1 June 8–26 2026, Session 2 July 6–24 2026.
**Both had already ended at extraction (2026-08-05)** and all four routes remain
live, indexed, and still say *"Secure your child's place before sessions fill
up."*

### 🟠 14. Camp prices
Internally consistent on two pages; **absent** from `/summer-programs/` and
`/summer-camp/`, both reachable from navigation. Whether PEP/UA apply to camp is
never addressed.

### 🟠 15. Refund policy
Camp only: *"The down payment… is strictly non-refundable… All registrations are
final and non-refundable."*

**For lessons, no refund, cancellation or missed-lesson policy exists anywhere**
— yet `/piano-lessons/` advertises *"Supportive make-up policies"*, a policy
that is never published. Recommend legal review.

### 🔴 16. Scholarship eligibility and Step Up wording
Four materially different phrasings, from *"Approved… provider"* to *"works
within the Step Up framework."* No eligibility criteria, no application steps,
no required documents, no coverage amount, no outbound link.

### 🟠 17. Instructor qualifications
*"university-trained pros"* claimed on the subdomain; unsupported on the main
site, which names no instructor at all.

---

## Part B — The 26 decision gates

### Business gates

| Gate | Question |
|---|---|
| **B-1** | Faith-affiliated, faith-adjacent, or secular? |
| **B-2** | Is adult provision real? |
| **B-3** | Confirm the Gradual Exposure Ladder rungs |
| **B-4** | Approve honest reframing of the 90-day promise |
| **B-5** | Single brand name + ™ status |
| **B-6** | Bilingual: build it or drop the claim |
| **B-7** | Instructor names, credentials, permission to publish |
| **B-8** | Pricing for every product |

### Design gates

| Gate | Question |
|---|---|
| **D-1** | Logo colours and refresh — do they fit the palette? |
| **D-2** | Archivo approved as display face? |
| **D-3** | Photography shoot budget approved? |
| **D-4** | Can teacher portraits be published? *(= B-7)* |
| **D-5** | Bilingual at launch? *(= B-6)* |
| **D-6** | Custom instrument icon set commissioned? |

### Image gates

| Gate | Question |
|---|---|
| **I-1** | Photo-release consent for all 18 existing photos |
| **I-2** | Photography budget approved *(= D-3)* |
| **I-3** | Video production commissioned |
| **I-4** | Next showcase date |
| **I-5** | Teacher publication *(= B-7)* |
| **I-6** | Step Up logo rights |
| **I-7** | Photographer copyright ownership |
| **I-8** | Correct unit number |

### Motion gates

| Gate | Question |
|---|---|
| **M-1** | Confirm the Gradual Exposure Ladder rungs *(= B-3)* |
| **M-2** | Approve 90-day promise wording *(= B-4)* |
| **M-3** | Is showcase footage available for the timeline release moment? |
| **M-4** | P75 device profile confirmed from analytics? |

**Gates most likely to change the visual design: D-1, D-2, D-3, I-1, I-4, B-5.**

---

## Part C — Content that must not be invented

❌ **Never, under any circumstance:**

| Do not invent | Why |
|---|---|
| **Any price** | Only `$25` and the camp's `$450/$400` are published. Tuition is unknown. |
| **Any teacher** — name, face, bio, credential, portrait | The site names no instructor. Gate B-7. |
| **Any testimonial**, or a quote attributed to a real person | 14 real ones exist; three name minors. |
| **Any photograph of a student, classroom, facility or performance** | Gate I-1. No consent exists for any of the 18 real photos. |
| **A showcase date, an event, or an award** | No event record exists; both event URLs 404. Gate I-4. |
| **Student counts, years in business, success rates, "500+ families"** | None is published anywhere. |
| **Star ratings or an aggregate review score** | The main site displays none. |
| **A Spanish page or a language switcher** | Gate B-6. The bilingual claim is unsupported. |
| **Social profiles or follower counts** | Zero social links exist. |
| **The words "every student"** | Gate B-4. |

### The rule for image generation

Atmospheric assets only: light, stage floors, curtains, texture, depth.

❌ **Prohibited subjects for generation, absolutely:** students, teachers,
parents, classrooms, facilities, real performances, awards, testimonials.

The generation script enforces this with a pre-flight prohibited-subject scanner.

### Where a fallback is documented, implement the fallback

Several sections exist in their current form *because* a gate is open — the
Performance Evidence section uses quotes precisely because photography is
blocked. **These are designed responses to real constraints, not placeholders
awaiting better content.** Do not "improve" them by supplying the thing the gate
prohibits.
