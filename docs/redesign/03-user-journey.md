# 03 — User Journeys

**Phase:** 3 — Product Strategy
**Date:** 2026-08-05
**Source of truth:** `docs/source-content/` — audience segments, objections and blockers derived from extracted FAQs, testimonials, conflicts and gaps.

---

## 0. How to read this document

Eight journeys. Each carries: **entry points → goals → questions → concerns → conversion triggers → ideal CTA → the blockers Phase 2 found → what must be true at launch.**

Two conventions:
- ❌ = a blocker that exists on the current site and must be fixed
- ⚠️ = blocked on an owner decision gate (see `01-brand-strategy.md` §14)

A journey is only "designed" when every question in its list has a page that answers it. That test currently fails for all eight.

---

## 1. First-time visitor

The default state. Cold traffic from Google, a Facebook parent group, or a flyer. Attention budget: **under 10 seconds** before the back button.

### Entry points
Organic search ("music lessons homestead", "kids piano florida city"), Google Business Profile, word of mouth, `try.` subdomain paid traffic, flyer or school noticeboard.

### Goals
1. Work out what this place actually is, in one glance
2. Decide whether it's for children like theirs
3. Decide whether it looks legitimate

### Questions (in order asked)
1. *"What is this?"*
2. *"Is it near me?"*
3. *"Is my child the right age?"*
4. *"Is this a real school or one person in a garage?"*
5. *"What does it cost?"*

### Concerns
- Generic, template-looking sites read as untrustworthy
- No prices reads as "expensive" or "they'll pressure me"
- No faces reads as "nobody accountable"

### Conversion triggers
- A specific, dated promise instead of a vague benefit
- Real photographs of real children on a real stage
- A named place — "Florida City" beats "South Dade"
- A price, or at minimum a price range

### Ideal CTA
**Primary:** Book a Trial — $25
**Secondary:** *"See a 90-day showcase"* (proof before commitment)

### Blockers found in Phase 2
- ❌ Homepage leads with keyword copy, not the promise
- ❌ Program cards render **three times**; testimonials render 18 cards for 12 reviews — reads as broken
- ❌ No price anywhere for any lesson product
- ❌ No instructor named anywhere on the site
- ❌ Typos live in the hero region: *"Class mein performance"*, *"Exceution"*
- ❌ Hero images on 22+ pages load from an **agency staging domain**

### Must be true at launch
- Above the fold: the promise, the location, the age range, and a priced CTA
- Zero duplicate rendering
- One real showcase photograph in the first viewport
- Sub-2.5s LCP on 4G mobile

---

## 2. Returning visitor

Came back deliberately. High intent, low patience. Typically 2–14 days after the first visit, often on a different device, often to show a partner.

### Entry points
Direct URL, browser history, a bookmarked programme page, a link they sent themselves or their spouse.

### Goals
1. Re-find the specific thing they remember
2. Resolve the one objection that stopped them last time
3. Get the other parent to agree
4. Book

### Questions
1. *"Where was that 12-week thing?"*
2. *"How much was it again?"*
3. *"What days and times?"*
4. *"Can I show my husband/wife the stage photos?"*

### Concerns
- Having to re-navigate from scratch
- Information they half-remember not being findable
- Discovering a cost that wasn't disclosed the first time

### Conversion triggers
- Recognisable landmark content ("Weeks 1–10 / 11 / 12")
- A shareable, linkable page for the specific programme
- Schedule and price on the same page as the promise

### Ideal CTA
**Primary:** Book a Trial — $25
**Secondary:** *"Send this to someone"* — share/save

### Blockers found in Phase 2
- ❌ **Two labels, two destinations** — "Summer Programs" points to different URLs in nav vs cards. A returning visitor cannot re-find what they saw.
- ❌ No schedule information exists for any programme — no lesson length, no day, no time
- ❌ The camp page is the only page a returning visitor can act on, and both its sessions have expired

### Must be true at launch
- Stable, semantic URLs (`/programs/90-day-stage-program`) that survive being pasted into a text message
- Every programme page carries: what it is, when it runs, what it costs, how to start
- Page-level share affordance on programme and showcase pages

---

## 3. Parent (the Confidence Parent — primary segment)

Parent of a 6–12-year-old in South Miami-Dade. **Not shopping for a musician — shopping for a change in their child.** ~55% of demand.

### Entry points
Search, another parent's recommendation, seeing a showcase, a school teacher's suggestion.

### Goals
1. Find something their child will not quit in a month
2. Build confidence, not just competence
3. Fit it around school, siblings and work
4. Know the total cost before committing

### Questions
1. *"Will this actually change how my child carries themselves?"*
2. *"What if she's too shy?"*
3. *"What happens week to week?"*
4. *"Who is teaching my child, and are they safe with kids?"*
5. *"How much, all in — including instruments?"*
6. *"What if we miss a week?"*
7. *"What if it doesn't work?"*

### Concerns
- **The quit risk.** They have paid for an abandoned activity before. This is the number-one unspoken objection.
- Their child being embarrassed or singled out
- Hidden costs — instrument purchase, recital fees, registration
- A teacher they've never met, alone with their child

### Conversion triggers (ranked by strength)
1. **The Stage-Ready Guarantee** — removes the "what if it doesn't work" risk entirely
2. **The week-by-week structure** — makes an abstract purchase diaryable
3. **A shy-child story** — the extracted FAQ *"What if my child is too shy?" → "That is exactly what we train for"* is the single best conversion asset on the site
4. **Teacher faces and credentials**
5. **Showcase photographs of ordinary-looking children**
6. **A trial that is cheap and clearly explained**

### Ideal CTA
**Primary:** Book a Trial — $25 *(credited to tuition)*
**Secondary:** *"Come watch a showcase"* — free, zero commitment ⚠️ needs a real dated event
**Tertiary:** *"Talk to us"* — phone/WhatsApp for the anxious

### Blockers found in Phase 2
- ❌ The Stage-Ready Guarantee appears on **2 pages of 26**, and on **none of the 6 programme pages**
- ❌ The shy-child answer is buried in an FAQ accordion
- ❌ **No instructor is named anywhere** — the only names in the entire estate are inside customer reviews (Mr./Professor Lopez, Professor Joshua, Alberto)
- ❌ No price, no lesson length, no schedule
- ❌ `/piano-lessons/` advertises *"supportive make-up policies"* — **no such policy is published anywhere**
- ❌ No safeguarding, background-check, or child-safety statement
- ⚠️ The promise contradicts itself — "every student performs" vs "gets the chance to" (gate B-4)

### Must be true at launch
- Guarantee visible on the homepage and **every** programme page
- Dedicated `/teachers` with photographs, credentials and safeguarding ⚠️ gate B-7
- Full pricing including "what you need to buy" per instrument ⚠️ gate B-8
- A published make-up/cancellation policy, or the claim removed
- The shy-child narrative promoted from FAQ to a homepage section

---

## 4. Teen (13–17) — influencer, not buyer

Does not hold the credit card but holds the veto. Arrives on a page a parent opened, or searches independently for guitar/drums.

### Entry points
Parent's screen, phone search, a friend who already attends, Instagram ⚠️ *no profile currently linked*.

### Goals
1. Confirm this is not a kids' club
2. Find out if they'd actually play in a band
3. See whether anyone their age is here
4. Judge whether they'd be embarrassed

### Questions
1. *"Is this for little kids?"*
2. *"Do I get to be in an actual band?"*
3. *"What music do they play — or is it all classical?"*
4. *"Do I have to perform?"*
5. *"Is anyone here my age?"*

### Concerns
- Cartoon aesthetics, primary colours, clip-art
- Being the oldest in a room of eight-year-olds
- Being forced on stage before they're ready
- Playing repertoire they find embarrassing

### Conversion triggers
- **Band Builders** framed as a real band, not a class
- Ensemble footage — other teens, real instruments, real amps
- Contemporary repertoire signalling ("songs you actually like" — the subdomain already says *"lesson plans built around the songs you love"*)
- The Gradual Exposure Ladder read as *"nobody throws you on stage"*
- Visible bass and drums provision (bass has the site's highest start age, 7–8, and skews older)

### Ideal CTA
**Primary:** *"Get in a band"* → `/programs/band-builders`
**Secondary:** Book a Trial
**Tertiary:** Watch the showcase film ⚠️ **no video exists**

### Blockers found in Phase 2
- ❌ **Zero video across all 26 pages.** For a teen, this is close to disqualifying.
- ❌ Band Builders states **no schedule, no group size, no age banding** — a teen cannot tell if they'd be with peers
- ❌ Band Builders performance is *"may include"* — hedged
- ❌ Its prerequisite is self-contradictory: requires prior private lessons *and* welcomes beginners
- ❌ No repertoire or genre signalling anywhere on the main site
- ❌ No social presence to check

### Must be true at launch
- Band Builders reads as a band: line-ups, repertoire, age bands, rehearsal cadence
- At least one ensemble video (highest-priority production item — see `09-image-strategy.md`)
- A visual system with teen credibility (`04-design-system.md` — the hardest constraint in the project)
- Age banding published so a 15-year-old knows they won't be with six-year-olds

---

## 5. Adult learner ⚠️ gate B-2

**Evidence is thin.** `/programs/` has an "Adults" segment, `/private-lessons/` says *"kids, teens, and adults,"* the subdomain says *"picking it back up as an adult."* There is **no adult page, no adult imagery beyond one stock photo, and no adult testimonial.**

### Goals
1. Restart or begin without embarrassment
2. Learn without a child-oriented curriculum
3. Fit lessons around a job
4. Decide whether performing is optional

### Questions
1. *"Am I too old?"*
2. *"Will I be in a room of children?"*
3. *"Do I have to do the showcase?"*
4. *"Can I come after 6pm?"*
5. *"Can I learn specific songs rather than a syllabus?"*

### Concerns
- Being patronised or grouped with children
- Being required to perform
- No evening availability
- Slow progress relative to time invested

### Conversion triggers
- Explicit adult-only framing and scheduling
- Performance as opt-in
- Goal-led learning ("the song at your daughter's wedding")
- Evidence of other adult students

### Ideal CTA
**Primary:** Book a Trial — $25
**Secondary:** *"Adult programme details"*

### Blockers found in Phase 2
- ❌ No adult page exists
- ❌ Only one image on the entire site represents adult students (`photo-13.jpg`, stock)
- ❌ Zero adult testimonials among 14
- ❌ **Published hours are Mon–Sat 8:00am–6:00pm**, while seven pages promise *"After-school and evening availability."* A working adult cannot attend within stated hours.
- ⚠️ The sitewide "every student performs in 90 days" promise may not suit adults

### Must be true at launch
**Either** build the segment properly — `/programs/adults`, adult imagery, adult testimonials, confirmed evening hours, opt-in performance — **or remove the adult claim entirely.** A half-promised segment converts nobody and damages credibility. ⚠️ Gate B-2.

---

## 6. Scholarship visitor (Step Up PEP / UA) — the largest untapped pool

Florida family holding or eligible for Step Up funding. Frequently Spanish-speaking. Often navigating a special-needs pathway. **High intent, low information.**

### Entry points
Step Up provider directory, a search for "step up for students music", another scholarship parent, a school counsellor.

### Goals
1. Confirm the academy accepts their specific scholarship
2. Understand exactly what to do next
3. Confirm their child won't be segregated
4. Do all of this in Spanish if needed

### Questions
1. *"Do you take PEP? Do you take UA?"*
2. *"Am I eligible?"*
3. *"What documents do I need?"*
4. *"How much does the scholarship cover — is there a balance?"*
5. *"Will my child be in a separate group?"*
6. *"Does it cover camp too?"*
7. *"Can I do this in Spanish?"*

### Concerns
- Being told "yes" then hitting paperwork nobody explains
- Their child with unique abilities being placed in a lesser track
- Hidden gap between scholarship value and actual tuition
- Language barrier at the point of enrolment

### Conversion triggers
- **Provider status stated plainly and consistently**
- A numbered application walkthrough with realistic time ("about 20 minutes")
- **The inclusion promise** — the extracted line *"All students learn together in the same supportive environment. Instruction is adapted to individual needs while maintaining high expectations"* is excellent and should be prominent
- A named person to call
- Spanish parity

### Ideal CTA
**Primary:** *"Check if you qualify"* → guided eligibility path
**Secondary:** *"Talk to us in Spanish"* ⚠️ gate B-6
**Tertiary:** Book a Trial

### Blockers found in Phase 2 — the worst-served journey on the site
- ❌ `/step-up-accessibility/` has **no eligibility criteria, no application steps, no document list, and no link to stepupforstudents.org**
- ❌ The legal disclaimer (*"administered and awarded by Step Up for Students, not by South Dade Music"*) is on `/resources/` and the homepage but **missing from the scholarship page itself**
- ⚠️ **Four different provider-status wordings** across four pages — a compliance risk for a state programme (gate)
- ❌ **Camp applicability never addressed** anywhere
- ❌ Scholarship coverage amount never stated
- ❌ **No Spanish content exists**, despite "full bilingual support" being claimed
- ❌ Illustrated with third-party French stock imagery (`20240420_Impulse-Day_visuel_site`) — a licensing risk
- ❌ Step Up logos used with unconfirmed rights
- ❌ No scholarship-family testimonial
- ⚠️ Camp policy reserves the right to *"decline camp enrollment for severe behavioral disruptions"* — this sits in direct tension with UA (special needs) positioning and needs legal review

### Must be true at launch
- Single, legally approved provider-status sentence used everywhere ⚠️ gate
- Step-by-step application path with document checklist and outbound link
- Disclaimer on the scholarship page
- Explicit statement on camp applicability
- Inclusion promise given prominence
- Spanish parity ⚠️ gate B-6
- All third-party stock replaced

---

## 7. Camp visitor — seasonal, transactional, highest purchase intent

Needs June–July childcare that isn't screen time. Decision window is short and competitive; camps in this market sell out in weeks.

### Entry points
Seasonal search ("summer camp homestead 2027"), returning family, school flyer, parent groups.

### Goals
1. Confirm dates against their calendar
2. Confirm age eligibility
3. Confirm price and total commitment
4. Confirm safety and supervision
5. Book before it sells out

### Questions
1. *"What are the exact dates?"*
2. *"What times — and does that cover my work day?"*
3. *"How old must my child be?"*
4. *"How much, and what's the deposit?"*
5. *"What if we go on holiday for one week?"*
6. *"Is my child supervised? By whom?"*
7. *"Do they need to bring an instrument?"*
8. *"What if my child has allergies?"*
9. *"Can I use my Step Up scholarship?"*

### Concerns
- Non-refundable deposit with **an undisclosed amount** — the single sharpest objection on the site
- Half-day coverage (8am–12pm) not covering a working day
- Missing days with no remedy under a strictly non-refundable policy
- Their child being a total beginner

### Conversion triggers
- Dates, times, price and capacity in one visible block *(the current camp page does this well — retain the pattern)*
- Genuine scarcity: *"15 per block, 60 seats for the whole summer"*
- **All instruments provided** — removes the biggest cost objection
- **End-of-Camp Concert** with parents invited
- Snacks, supervision, screen-free framing

### Ideal CTA
**Primary:** **Reserve a Seat — $X deposit** *(amount in the label)*
**Secondary:** *"Get notified when 2027 dates open"* — captures off-season demand
**Tertiary:** Download the parent pack ⚠️ **no document exists**

### Blockers found in Phase 2
- ❌ **The non-refundable deposit amount is never stated anywhere.** It is "required today", binding, and unpublished. Hard blocker and a consumer-protection concern.
- ❌ **Four URLs for one camp**, one empty and indexable
- ❌ **Both 2026 sessions expired** before extraction; pages still say *"Secure your child's place before sessions fill up"*
- ❌ `/summer-programs/` — reachable from homepage and `/programs/` — has **no dates, no price, and no CTA in its closing section**
- ❌ **Location conflict**: camp pages say Unit **1157**; the contact page and Google place record say Unit **117**. This is a drop-off address.
- ❌ `/summercamp/` "Enroll Now" leads to a page with no form
- ❌ Performance promise conflicts: *"Every student prepares for a final recital"* vs *"may get a chance to perform"*
- ❌ No allergy or dietary policy despite daily snacks
- ❌ No medical form, emergency contact, or pickup authorisation
- ❌ Scholarship applicability to camp never addressed
- ❌ Selling photo is from the **2025** camp, WhatsApp-compressed

### Must be true at launch
- One canonical camp URL, evergreen parent + dated child
- **Deposit amount published before the CTA**
- Correct unit number, verified against the Google place record
- Expired camps auto-transition to an archived state with a waitlist capture
- Parent pack PDF: what to bring, drop-off, medical, allergies, pickup
- Explicit statement on Step Up applicability

---

## 8. Performance visitor — the advocacy engine

Two distinct people sharing one path: the **family attending a showcase**, and the **prospective parent looking for proof**. This journey converts strangers into customers and customers into advocates — and it is currently the most broken on the site.

### Entry points
A link from a performing family, search for the event, `/performances` from the nav, social ⚠️ *no profiles linked*.

### Goals
**Attending family:** find date, time, venue, parking, what to wear, who's playing, and afterwards get the photos.
**Prospective parent:** confirm showcases genuinely happen and see what standard to expect.

### Questions
1. *"When and where is the next one?"*
2. *"Is it open to the public? Does it cost?"*
3. *"How long is it? Are younger siblings welcome?"*
4. *"Where do I park?"*
5. *"Can I get photos and video afterwards?"*
6. *"Are these real students or stock photos?"*

### Concerns
- Turning up to the wrong place or time
- Their own child's performance not being captured
- Photographs of their child published without permission

### Conversion triggers
- A dated, upcoming, **free** event — the single strongest zero-risk entry in the funnel
- Dated past showcases proving the cycle is real and recurring
- Video
- Performance-specific testimonials

### Ideal CTA
**Attending:** *"Add to calendar"* · *"Get directions"*
**Prospective:** *"Come watch — it's free"* → then Book a Trial
**Post-event:** *"See the photos"* → gallery → *"Start your child's 90 days"*

### Blockers found in Phase 2 — the most damaged journey
- ❌ **Both event URLs return 404.** The Events Calendar plugin was removed with its URLs left published.
- ❌ **Zero event records exist.** No upcoming, no past, no dates, no venues.
- ❌ `/performances/` is six undated photographs and three slogans, with **no unique content** — the identical gallery appears on the homepage and `/about/`
- ❌ **Zero video across the entire estate**
- ❌ `/performances/` does not link to the 90-Day Program — the page proving the promise doesn't link to the promise
- ❌ Three performance-specific testimonials (Dexter, Brian Silverio, romi) exist but **are not shown on this page**
- ❌ No alt text on any gallery image
- ❌ No photo-release consent evidence for identifiable minors
- ❌ The Instagram profile referenced by the lost events archive is not linked anywhere

### Must be true at launch
- `/events` with at least one real, dated, upcoming showcase
- `/performances/[year]-[slug]` archive with date, venue, programme and gallery per showcase
- At least one showcase film ⚠️ **highest-priority production item in the project**
- Performance testimonials surfaced here
- Documented photo-release process before any image of a minor is published
- Calendar and directions actions

---

## 9. Cross-journey matrix

| Need | 1st-time | Return | Parent | Teen | Adult | Scholar | Camp | Perf |
|---|---|---|---|---|---|---|---|---|
| Price visible | ●●● | ●●● | ●●● | ● | ●● | ●●● | ●●● | — |
| Teacher faces | ●● | ● | ●●● | ●● | ●● | ●● | ●●● | ● |
| Video | ●● | ● | ●● | ●●● | ● | ● | ●● | ●●● |
| Schedule/dates | ● | ●●● | ●●● | ●● | ●●● | ● | ●●● | ●●● |
| Guarantee | ●● | ●● | ●●● | ● | ● | ● | — | — |
| Spanish | ●● | ●● | ●● | ● | ● | ●●● | ●● | ●● |
| Showcase proof | ●● | ● | ●●● | ●●● | ● | ● | ●● | ●●● |
| Policies | — | ● | ●●● | — | ● | ●● | ●●● | ● |
| Safeguarding | ● | — | ●●● | — | — | ●● | ●●● | ● |

● low · ●● medium · ●●● critical

### The five universal blockers

Ranked by how many journeys they break:

| # | Blocker | Journeys broken |
|---|---|---|
| **1** | **No pricing** for any lesson product | 6 of 8 |
| **2** | **No instructor identity** — nobody named sitewide | 6 of 8 |
| **3** | **No dated events; both event URLs 404** | 5 of 8 |
| **4** | **No video** anywhere | 5 of 8 |
| **5** | **No Spanish** despite claiming "full bilingual support" | 5 of 8 |

Fixing these five repairs more of the funnel than any redesign of layout or visual style. **They are content and decision problems, not design problems** — which is why gates B-4, B-6, B-7 and B-8 sit on the critical path in `10-launch-plan.md`.

---

## 10. Conversion moments — where the decision is actually made

| Moment | Page | What must be present |
|---|---|---|
| **The hook** | Homepage, first viewport | The 90-day promise, a real stage photo, a priced CTA |
| **The reframe** | Homepage, second scroll | *"That's not shyness — it's a skill she hasn't been taught yet"* |
| **The proof** | `/performances`, `/teachers` | Dated showcase + named humans |
| **The structure** | 90-Day page | Weeks 1–10 / 11 / 12, visible and diaryable |
| **The de-risk** | 90-Day page + every programme page | Stage-Ready Guarantee |
| **The arithmetic** | `/pricing` | Total cost including instrument |
| **The step** | `/contact/book-a-trial` | $25 disclosed, one form, intent captured |
| **The advocacy** | Post-showcase gallery | *"Start your child's 90 days"* |

---

## 11. Anti-patterns — what must not happen

Each of these exists on the current site.

1. **A CTA that isn't a link.** Twenty text prompts at the bottom of instrument pages, at peak intent.
2. **A price revealed only inside the form.** The $25 is disclosed on 2 pages of 26.
3. **One label, two destinations.** "Summer Programs" resolves differently in nav vs cards.
4. **Selling an expired product.** Both 2026 camp sessions ended; pages still urge reservation.
5. **A promise the site cannot evidence.** Choirs, orchestras, bilingual support, university-trained instructors.
6. **An enrolment page with no enrolment mechanism.** `/contact-enroll/` is four lines of text.
7. **Placeholder content in production.** Lorem ipsum on `/members/`, editorial notes on two live pages.
8. **A dead end at the bottom of a page.** `/summer-programs/` closing section has no CTA at all.

---

**Next:** `04-design-system.md`
