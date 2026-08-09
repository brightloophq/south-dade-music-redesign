# Owner Decision Register

**Date:** 2026-08-08 · **Phase:** 4H
**Status:** the single current list. Supersedes the gate lists scattered across
earlier phase reports.

> **The rebuild is technically ready. What it is waiting on is answers.**
>
> 27 routes are built and verified. Every remaining blocker on this list is a
> business decision, not an engineering task.

---

## How to answer

Reply against the **gate ID**. One line each is enough — the recommended format
is given per item. Where a decision is legal rather than commercial, it says so.

---

# P0 — BLOCKS LAUNCH

## B-8 · What is the tuition for each programme?

**Question.** No price is published anywhere in the estate for any programme —
not the flagship, not private lessons, not group, not Band Builders, not Early
Childhood. The only published figures are the **$25 trial** and the camp's
**$450 / $400**.

**Affects.** `/programs`, `/programs/90-day-stage-program`, `/private-lessons`,
`/group-music-lessons`, `/programs/band-builders`, `/programs/early-childhood`,
`/faq`, `/terms`.

**Currently withheld.** Every tuition figure. `/programs` and `/faq` both say
plainly that tuition is not published online and invite the reader to ask —
which is honest, and which loses people who will not ask.

**Once resolved.** Prices ship on every programme page; Course/Product schema
becomes possible; the single largest conversion gap closes.

**Answer format.** Per programme: price, billing period, and lesson length.

---

## B-4 · Does *every* student perform, or only those who are ready?

**Question.** The estate makes this claim **four different ways**:

- *"every student performs in a live showcase within 90 days"* — footer, FAQ **(unconditional)**
- *"Every Student Steps on Stage Within 90 Days."* — homepage hero **(unconditional)**
- *"At the end of the 90 days, students get the chance to perform."* — programme page **(conditional)**
- *"…when they feel ready."* — homepage performances block **(conditional, student-gated)**

**This is the most serious claim exposure in the estate.** Two unconditional
promises and two qualifications of the same promise.

**Affects.** Homepage, `/programs/90-day-stage-program`, `/faq`,
`/performances`, `/programs/band-builders`, all schema.

**Currently withheld.** **Neither unconditional performance promise ships.**
No page states or implies that every student performs, or performs within a
fixed period. One FAQ answer is withheld entirely.

**⚠️ Precision correction (2026-08-09).** An earlier version of this entry said
*"the words 'every student' appear nowhere on the rebuilt site."* That was
wrong as written, and the imprecision mattered — it invited a reader to verify
the claim by searching for a phrase rather than for the promise.

The phrase does appear once, on `/about`:

> "South Dade Music was created with a simple mission to make music education
> accessible and meaningful **for every student**."

This is **sourced, verbatim** (`business-profile.json`, `source-pages/about.md`)
and is a **mission statement about who the school is for** — inclusivity. It is
not the performance promise and makes no claim about showcases, stages or
90 days. **It stays.** Removing valid sourced content to make a register entry
literally true would be fixing the wrong artifact.

What B-4 actually gates is the **conditional-vs-unconditional performance
claim**, and none of that ships.

**Related, and shipping:** the **Stage-Ready Guarantee** does ship, verbatim,
on `/faq` and `/programs/90-day-stage-program`:

> "If your child is not prepared to step on stage at the end of the 90-day
> cycle, we will continue coaching them at no additional charge until they are
> ready."

This is sourced (`faqs.json`) and is the estate's own *conditional* framing —
`content-conflicts.md` notes it is self-undermining precisely because it
concedes that not every student performs within 90 days. It is a commercial
commitment the business already publishes, so it is not invented here; but
**your answer to B-4 should be consistent with it.** If you confirm the
unconditional promise, this guarantee contradicts it.

**Once resolved.** The strongest sentence in the business's marketing becomes
usable, honestly. Until then the page has to imply it.

**Answer format.** One sentence you are willing to stand behind commercially and
legally. Also note the 12 weeks = 84 days, not 90, arithmetic.

---

## B-5 · Which of four names is the business?

**Question.** Four run concurrently: **South Dade Music** (footer, `og:site_name`),
**South Dade Music Academy** (subdomain, `/singing-lessons/`, 4 testimonials),
**SDMA**, **South Dade Music LLC** (the only legal-entity reference anywhere).

**Affects.** Every `<title>`, the wordmark, `og:site_name`, all structured data,
`/terms` governing law, ™ usage.

**Currently withheld.** ™ is not set anywhere. The type-only wordmark reads
"South Dade Music". No schema is emitted.

**Once resolved.** Logo lockup, schema, and the legal pages unblock together.

**Answer format.** Trading name, registered legal entity, and whether
"90-Day Stage Program™" is actually registered.

---

## I-8 · Which unit number — 117, 1157 or 115?

**Question.** Three exist. **117** is best corroborated (contact page + the
Google Maps place record). **1157** is on both camp pages — which is where
parents drive for drop-off. **115** is on the subdomain, whose own map link
resolves to 117.

**Affects.** `/contact`, `/camps`, LocalBusiness schema, Google Business
Profile, directions.

**Currently withheld.** `/contact` publishes 117 as best-corroborated.
**`/camps` publishes no address at all** and links to `/contact`, so the site
cannot contradict itself about where to drop a child off.

**Once resolved.** Address ships everywhere; LocalBusiness schema unblocks.

**Answer format.** The unit number, and confirmation the Google Business Profile
matches it.

---

## I-1 · Photo-release consent for the 18 photographs

**Question.** All 18 genuine photographs of the academy depict identifiable
minors. No consent is on file for any of them, and photographer copyright is
unconfirmed (**I-7**).

**Affects.** `/performances`, homepage, every page that would carry photography.

**Currently withheld.** **Every photograph.** `/performances` carries families'
words instead of pictures; the homepage ships no photography at all.

**Once resolved.** The academy's only authentic imagery becomes usable. This is
**the single highest-leverage decision on this list.**

**What now exists.** `/photo-consent` is built — explanation, guardian and
student identity, five per-use permission categories, acknowledgement,
signature. ⚠️ **Submission is disabled** pending a verified storage destination
(see `lead-data-cutover-plan.md`).

**Answer format.** Confirm the storage destination and who owns the record;
approve the wording for legal review; then run consent collection.

---

## HighLevel account ownership

**Question.** Every lead this business has captured sits in a HighLevel account
whose ownership is unconfirmed. The site has **zero native forms** — 100% of
capture depends on that widget.

**Affects.** Cutover, `/contact/book-a-trial`, `/photo-consent`, `/privacy`.

**Once resolved.** Lead export becomes possible; consent submission unblocks;
the privacy policy can name its processor.

**Answer format.** Who owns the account; owner-level credentials held by the
business; a full contact export.

---

## Analytics tag audit

**Question.** The extraction could not see `<script>` tags, so GA4, GTM and
Meta Pixel are **"not observed", not "absent"**. Measurement IDs are unknown.

**Affects.** `/privacy` (analytics section is under review), all measurement
continuity.

**Risk.** **If IDs are not recovered before the old site is retired, historical
analytics is lost permanently.**

**Answer format.** A script-level audit of the live site; record every ID.

---

## Camp deposit amount

**Question.** The camp requires a down payment **"today"** that is **"strictly
non-refundable"**, and the amount is stated nowhere in the estate.

**Affects.** `/camps`, `/terms`.

**Currently withheld.** No deposit figure. Refund terms ship in full because
they are legally load-bearing.

**Answer format.** The amount, and where it is collected — **no payment
processor is observable anywhere on the site.**

---

# P1 — MATERIALLY REDUCES CONVERSION OR TRUST

## B-7 · Teachers — names, credentials, permission to publish

Not one instructor is named or introduced anywhere. The only names in the estate
appear **inside customer reviews** — Mr./Professor Lopez (5), Professor Joshua
(1), Alberto (1), and Lopez and Joshua may be the same person.

**Currently withheld.** All teacher content. `/teachers` is **not built**.
**Affects.** `/about`, `/teachers`, every lesson page.
**Answer format.** Names, credentials, and written permission to publish each.

## Lesson format contradiction

Five instrument pages say **all** lessons in that instrument are private —
guitar, violin and singing explicitly. `/group-music-lessons/`,
`/band-builders/`, `/programs/` and the subdomain all sell **group** instruction
in the same instruments. **These cannot all be true.**

**Currently.** Each instrument page ships its own verbatim line; `/lessons`
presents both formats and never states which instruments are in which.
**Answer format.** Which instruments are available in which formats.

## Lesson frequency contradiction

Every instrument page says **one lesson per week**. `/resources/` and the
homepage FAQ say **two classes weekly, one for skill and one for band
application**. Seven pages against two.

**Currently.** Instrument pages ship their own line; no hub states a frequency;
one FAQ answer withheld.
**Answer format.** The actual standard offer.

## B-6 · Bilingual — build it or drop the claim

The site claims *"full bilingual support across our core programs and enrollment
processes."* **No Spanish page, no switcher, no `hreflang` exists.** A large
share of families are Spanish-speaking.

**Currently withheld.** The bilingual claim itself, and the FAQ answer.

**⚠️ Correction (2026-08-09).** This entry previously said the EN|ES indicator
"was removed in Tier 1". Only the **header** copy was. A second copy survived in
the **mobile navigation drawer** and was still rendering on **26 routes**:

```
EN   ES — not yet available
```

It was a dead placeholder — no Spanish route, no switcher, no `hreflang`, no
translated content, and `aria-hidden` so it was not even announced. It provided
no language capability of any kind while telling a Spanish-speaking parent that
a Spanish site was on its way.

**It has now been removed** (`MobileNav.tsx`). Verified: zero EN/ES indicators
render across all 27 routes. Nothing in the UI now pre-empts your answer.

**Answer format.** Build it, or drop the sitewide claim. Not a third option.

## Camp — is there a 2027 session?

Both 2026 sessions ended before extraction, and **all four camp routes still say
"Secure your child's place before sessions fill up."**

**Currently.** `/camps` states the 2026 sessions have finished and invites
enquiries. No booking CTA.
**Answer format.** Dates, price and capacity for the next camp, or confirm none
is planned.

## Keyboard — distinct offering, or fold into piano?

Sold in **three** places — homepage strip, `/private-lessons/` list,
`/group-music-lessons/` FAQ — with **no page anywhere**. The piano page's own
equipment answer is *"A keyboard is enough to start"*, which hints they are one
thing; but it is sold as a separate tile.

**Currently.** Listed as offered on `/lessons` and `/private-lessons` with
"Detail page not yet available". **Links nowhere.**
**Answer format.** Distinct — then supply content. Or fold into piano — then it
is removed as a separate item.

## B-2 · Is adult provision real?

Adults are named on `/private-lessons/`, `/programs/`, `/resources/` and the
subdomain — with no adult-specific content anywhere.

**Currently.** `/programs/adults` **not built**. The homepage says "Ages 3–18.
Adults welcome."
**Answer format.** Is it a real offer with real provision, or aspiration?

## Scholarship application path

Eligibility criteria, application steps, required documents, coverage amounts
and any link to Step Up are published **nowhere**.

**Currently.** `/scholarships` states what is known, says eligibility is not the
academy's to determine, and routes families to a person.
**Answer format.** The steps a family actually takes, and whether PEP/UA can be
applied to **camp** tuition — never addressed anywhere.

## D-1 · Logo and the corrected contrast token

The logo is raster-only and doubles as the `og:image` on every page. Separately,
the approved palette's `#7a7364` computes to **4.285:1** — failing WCAG AA — and
ships as `#746e61` at **4.61:1**, the ratio the spec itself claims.

**Answer format.** Approve the contrast correction; supply a vector logo.

---

# P2 — CAN SHIP AFTER LAUNCH

| Item | Detail |
|---|---|
| **`try.southdademusic.com`** | Second HighLevel funnel: different phone, different brand name, contradictory positioning. Retire, align, or keep as a paid-traffic LP. |
| **Contact reconciliation** | Two phone numbers, two email addresses. `/contact` publishes the sitewide footer values. |
| **The shout word** | The largest type on the homepage ships as a typeset blank. Owner's to choose. |
| **Generated atmospherics** | 8 assets, all `pending-review`. One rejected, one needs re-brief. |
| **Bass ↔ ukulele duplication** | Five verbatim-identical sections. Both ship as extracted; both need a real rewrite. |
| **Mission statement** | ⚠️ **Corrected 2026-08-09.** This previously read "withheld from `/about`". It is **not** withheld — `/about` ships the origin paragraph *and* the keyword-stuffed sentence: *"Families searching for **Private Music Lessons Near Me** often choose us because of our supportive teachers and clear lesson plans."* Both are verbatim-sourced, so nothing is invented, but the capitalised search phrase mid-sentence is visibly SEO copy from the old site and reads as such. It is left in place rather than silently rewritten — **rewriting the business's own words about itself is your call, not ours.** Recommend: approve a plain-English replacement. |
| **"Exceution" typo** | Live in production in the homepage four pillars. |
| **Physical accessibility** | No step-free, parking, restroom or sensory information exists for the studio. |
| **Camp refund wording** | Extraction recommends legal review. |
| **Social profiles** | Zero exist. An Instagram appears to have been lost in migration. |
| **Video** | Zero across 28 pages. 10–15s of showcase footage, no faces, is the highest-value asset the owner could commission. |
| **Retention / children / liability / governing law** | Policy sections rendering as "under review" pending owner and legal input. |

---

## Summary

| Severity | Count |
|---|---|
| **P0 — blocks launch** | **8** |
| **P1 — materially reduces conversion or trust** | **9** |
| **P2 — can ship after launch** | **12** |

**Nothing on this list is waiting on engineering.**
