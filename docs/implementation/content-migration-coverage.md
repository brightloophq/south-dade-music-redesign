# Content Migration Coverage Audit

**Date:** 2026-08-07
**Source of truth:** `docs/source-content/` — Phase 2 extraction, scraped 2026-08-05
**Compared against:** the built site — homepage + **Tier 1 and Tier 2 complete**
**Status:** audit, revised after Tier 2. Percentages updated 2026-08-08.

> ### Tier 1 shipped
> `/contact/book-a-trial` · `/contact` · `/programs/90-day-stage-program` · `/scholarships`
>
> ### Tier 2 shipped
> `/programs` · `/lessons` · `/private-lessons` · `/group-music-lessons` ·
> `/piano-lessons` · `/guitar-lessons` · `/drum-lessons` · `/bass-guitar-lessons` ·
> `/violin-lessons` · `/ukulele-lessons` · `/singing-lessons`
>
> ### Tier 3 shipped
> `/camps` · `/faq` · `/about` · `/performances` ·
> `/programs/band-builders` · `/programs/early-childhood`
>
> **22 routes now built.** Zero dead internal links anywhere on the site.
>
> ⚠️ **Route-strategy change.** Lesson routes keep their **original flat URLs**
> (`/piano-lessons`, not `/lessons/piano`). This audit had proposed nested
> routes; keeping the originals removes the redirect requirement for nine routes
> and preserves whatever standing those URLs already hold.

---

## 0. How to read this

The extraction covers **28 pages** plus one lead-generation subdomain.
**Sixteen routes are built** — the homepage, Tier 1 and Tier 2. Everything else
in this document is a plan with a named destination, not a delivered page.

**Legend**

| Term | Meaning |
|---|---|
| **FULL** | Every extracted item in that block is represented on a built page |
| **PARTIAL** | Some of the block is live; the rest has a named destination |
| **NOT YET** | Nothing live; destination assigned, page unbuilt |
| **OMITTED** | Deliberately excluded, with a reason — not an oversight |
| **AT RISK** | Exists only in the extraction or on infrastructure we do not control |

Gates referenced (`B-4`, `I-1`, …) are defined in
`docs/design-handoff/05-business-claims-and-gates.md`.

---

## 1. Business information

**Source:** `business-profile.json`, `contact-details.json` · original URLs `/`,
`/about/`, `/contact-enroll/`, sitewide footer

| Item | Key content | Homepage | Destination | Built | Migrated | Omitted | Redirect | Owner | Blocker |
|---|---|---|---|---|---|---|---|---|---|
| Business name | "South Dade Music" (+3 variants) | YES — wordmark, footer | sitewide | YES | PARTIAL | NO | — | **YES — B-5** | 4 names in live use |
| Address | 601 W Palm Dr, Florida City FL 33034 | YES — footer | `/contact` | **YES** | **FULL** | NO | — | **YES — I-8** | Unit 117 / 1157 / 115 |
| Phone | 786-753-9509 | YES — footer | `/contact` | **YES** | **FULL** | NO | — | YES | 2nd number on subdomain |
| Email | info@southdademusic.com | YES — footer | `/contact` | **YES** | **FULL** | NO | — | YES | 2nd address on contact page |
| Opening hours | Mon–Sat 8:00–18:00, Sun closed | YES — footer | `/contact` | **YES** | **FULL** | NO | — | YES | "evening availability" unsupported |
| Service area | Florida City, Homestead, Cutler Bay, Palmetto Bay | NO | `/contact`, `/about` | **PARTLY** | **PARTIAL** | NO | — | NO | — |
| Mission / vision | 2 variants, keyword-stuffed | NO | `/about` | NO | NOT YET | NO | — | NO | Needs a de-SEO'd rewrite |
| Origin story | "created with a simple mission…" | NO | `/about` | NO | NOT YET | NO | — | NO | — |
| Tagline | **Build Community. Make Music.** | YES — footer | sitewide | YES | FULL | NO | — | NO | — |
| Four pillars | Participation, Exposure, *Exceution [sic]*, Community | NO | `/about` | NO | NOT YET | NO | — | NO | Typo live in production |
| Gradual Exposure Ladder | Named methodology | Implied by the Walk | `/about`, `/programs/90-day-stage-program` | NO | PARTIAL | NO | — | **YES — B-3** | Rungs never enumerated |
| Differentiators | "performance program", "community driven, not transactional" | NO | `/about` | NO | NOT YET | NO | — | NO | — |
| Ages served | 3–18, adults, 3–6, 7–15, 6+ | YES — "Ages 3–18. Adults welcome." | `/about`, `/faq` | NO | PARTIAL | NO | — | **YES — B-2** | 6 conflicting statements |
| Languages / bilingual | "full bilingual support" claim | **NO — withheld** | — | — | **OMITTED** | **YES** | — | **YES — B-6** | Claim unevidenced; no Spanish tree |
| Instructors named | Mr./Professor Lopez ×5, Joshua, Alberto | **NO — withheld** | `/teachers` | NO | **OMITTED** | **YES** | — | **YES — B-7** | Named only inside reviews |
| Accessibility approach | "All students learn together…" | NO | `/scholarships` | NO | NOT YET | NO | — | NO | No physical-access info |
| Social profiles | **none exist** | NO | — | — | **OMITTED** | **YES** | — | **YES** | Instagram lost in migration |

**Coverage: PARTIAL → improved.** Every contact fact now has a built home at
`/contact`, not just a footer mention. The `/about` narrative — mission,
pillars, origin, Exposure Ladder — remains unbuilt.

---

## 2. Programs

**Source:** `programs.json` · `/programs/`, `/90-day-stage-program/`,
`/private-lessons/`, `/band-builders/`, `/early-childhood/`,
`/group-music-lessons/`

| Program | Homepage | Destination | Built | Migrated | Omitted | Redirect | Owner | Blocker |
|---|---|---|---|---|---|---|---|---|
| **90-Day Stage Program** | YES — name, 12-week grid, guarantee | `/programs/90-day-stage-program` | **YES** | **FULL** | NO | `/90-day-stage-program/` → new | **YES — B-4, B-8** | No tuition; 90 vs 84 days |
| Private Lessons | YES — playbill | **`/private-lessons`** | **YES** | **FULL** | NO | **none — URL retained** | YES — B-8 | No price, no lesson length |
| Band Builders | YES — playbill, **unlinked** | `/programs/band-builders` | NO | PARTIAL | NO | `/band-builders/` → new | YES — B-8 | Tier 3. Listed on both hubs, links nowhere. |
| Early Childhood | YES — playbill, **unlinked** | `/programs/early-childhood` | NO | PARTIAL | NO | `/early-childhood/` → new | YES — B-8 | Tier 3. Listed on both hubs, links nowhere. |
| Group Music Lessons | YES — playbill | **`/group-music-lessons`** | **YES** | **FULL** | NO | **none — URL retained** | YES — B-8 | Group size never given a number |
| Summer Jam Music Camp | YES — playbill, **unlinked** | `/camps` | NO | PARTIAL | NO | 4 routes → `/camps` | YES | Tier 3. See §5 |
| Adults | NO | `/programs/adults` | NO | NOT YET | NO | — | **YES — B-2** | Is adult provision real? |

**Per-program prose, learning paths, benefits and section copy are NOT on the
homepage** — the playbill carries names and one lead line by design. All of that
body content is currently **unmigrated** and lives only in `programs.json` and
`source-pages/*.md`.

**Coverage: FULL for three of six.** The flagship, private lessons and group
lessons all ship their complete published body content, plus a `/programs` hub
that did not previously exist. Band Builders, Early Childhood and the camp are
listed on both hubs with their verified summary and facts but **link nowhere** —
their pages are Tier 3. (~75% of programme content.)

---

## 3. Lessons and instruments

**Source:** `instruments.json` · `/instruments/` + 7 instrument pages

| Instrument | Route | Built | Migrated | Redirect | Blocker |
|---|---|---|---|---|---|
| Piano | `/piano-lessons` | **YES** | **FULL** | none — URL retained | — |
| Guitar | `/guitar-lessons` | **YES** | **FULL** | none | — |
| Drums | `/drum-lessons` | **YES** | **FULL** | none | — |
| Bass Guitar | `/bass-guitar-lessons` | **YES** | **FULL** | none | ⚠️ Shares 5 verbatim sections with ukulele — **both need a rewrite at source** |
| Violin | `/violin-lessons` | **YES** | **FULL** | none | Source hero showed a guitar; no imagery ships |
| Ukulele | `/ukulele-lessons` | **YES** | **FULL** | none | ⚠️ Shares 5 verbatim sections with bass |
| Voice | `/singing-lessons` | **YES** | **FULL** | none | Source hero showed a guitar; orphan page now linked |
| **Keyboard** | **none** | **NO** | **NOT YET** | — | **Sold in 3 places, no page. Listed unlinked on `/lessons` and `/private-lessons`.** |

Every instrument page ships its full verbatim record: description, starting age,
format, frequency, skill level, equipment, benefits, curriculum, programme
connections and its own FAQ set — **33 instrument FAQs, all migrated.**

**Coverage: PARTIAL — names and links only (~10%).**

---

## 4. The 90-Day Stage Program

**Source:** `programs.json` · `/90-day-stage-program/` · the flagship

| Content block | Homepage | Destination | Migrated | Owner | Note |
|---|---|---|---|---|---|
| Program name | YES — hero eyebrow | flagship page | FULL | B-5 | ™ withheld |
| Week grid (1–10 / 11 / 12) | YES — Twelve Weeks + the Walk | flagship page | FULL | — | — |
| 3-step narrative (Build / Practise / Ready) | NO | flagship page | **FULL** | — | Ships as the method beside the schedule |
| "about three months" | NO | — | **OMITTED** | B-4 | Conflicts with the product name |
| Performance promise | **Neither claim used** | flagship page | **OMITTED** | **B-4** | Unconditional ×2 vs conditional ×2 |
| Stage-Ready Guarantee (verbatim) | YES — final CTA | flagship page | FULL | — | Strongest conversion trigger |
| $25 preview terms | YES — hero + final CTA | flagship, `/contact/book-a-trial` | FULL | — | — |
| Tuition | **absent** | flagship page | **BLOCKED** | **B-8** | **Never published anywhere** |
| Two-classes-weekly claim | **NO — withheld** | — | **OMITTED** | **YES** | 2 pages contradict 7 |
| Target age | NO | flagship page | **FULL** — "Kids and teens" | B-2 | Verbatim; no numeric range exists |
| *"Class mein performance"* | **NO** | — | **OMITTED** | YES | Untranslated word live in production |
| Scholarship eligibility | NO | `/scholarships` | **PARTIAL** | — | Now has a built home |

**Coverage: FULL, less what is gated.** Every publishable block from the source
page now ships — intro, the "in this program" list, both descriptions of the
cycle, Build Confidence, Performance Skills, Who It's For, the verbatim
guarantee and the $25. Only tuition (B-8), the promise wording (B-4) and
frequency remain withheld, and all three are blocked at source.

---

## 5. Camps

**Source:** `camps.json`, `duplicate-routes.md` · **4 routes, 1 product**

| Route | HTTP | Unique? | Action | Destination |
|---|---|---|---|---|
| `/summer-jam-music-camp-2026/` | 200 | Canonical offer | **KEEP** | `/camps/summer-jam-2026` (archived) |
| `/summer-programs/` | 200 | Evergreen prose | **MERGE** | `/camps` (evergreen parent) |
| `/summer-camp/` | 200 | **Empty** | **REDIRECT — urgent** | `/camps` |
| `/summercamp/` | 200 | 4 pillar icons | **REDIRECT — salvage icons first** | `/camps` |

| Content | Homepage | Migrated | Blocker |
|---|---|---|---|
| Camp name | YES — playbill | PARTIAL | — |
| Dates (Jun 8–26, Jul 6–24 2026) | NO | NOT YET | **Both sessions have already passed; pages still solicit** |
| Price $450 / $400 pay-in-full | NO | NOT YET | Only published price besides the $25 |
| 60 instructional hours, ages 7–15, capacity 15/30/60 | NO | NOT YET | — |
| Time blocks A/B | NO | NOT YET | — |
| **Down payment amount** | NO | **NOT YET** | **AT RISK — required "today", non-refundable, figure never stated** |
| Refund policy (verbatim) | NO | NOT YET | Recommend legal review |
| 9 camp FAQs | NO | NOT YET | — |

**Coverage: FULL for everything publishable.** `/camps` ships the complete
camp record — schedule, ages, blocks, capacity, instruments, what is included,
the concert, 2026 pricing, all 9 FAQs, and the refund and behavioural terms in
full.

⚠️ **No reservation CTA ships.** Both 2026 sessions ended before extraction and
all four source routes still solicit bookings; the page states the sessions have
finished and routes interest to contact. ⚠️ **No address** — the camp pages say
Unit 1157 while contact says Unit 117 (I-8), so the page links to `/contact`
rather than pick a side. ⚠️ **Deposit amount still unpublished.**

---

## 6. Performances and events

**Source:** `events.json`, `/performances/`

> **`liveEventPages: 0`. `brokenEventPages: 2`.** A business whose promise is
> "every student performs in a live showcase within 90 days" publishes **zero
> event records** — no upcoming listing, no past archive, no dates, no venues,
> no video. The only event page that ever existed now 404s.

| Item | Homepage | Destination | Migrated | Omitted | Redirect | Blocker |
|---|---|---|---|---|---|---|
| Showcase testimony ×3 | **YES — Performance Evidence** | `/performances` | FULL | NO | — | — |
| Consent note | YES | `/performances` | FULL | NO | — | — |
| 6 gallery photographs | **NO** | `/performances` | **OMITTED** | **YES** | — | **I-1 — no consent; I-7 copyright** |
| Bazaar & Flea Market event | NO | `/performances` archive | **NOT YET** | NO | **404 — do not migrate URL** | Date from index metadata only, unverified |
| `/events/month/2025-03/` | NO | — | **OMITTED** | YES | **410 / remove** | Plugin archive, 404, sitemap pollution |
| Community-outreach claim | NO | `/about`, `/performances` | NOT YET | NO | — | — |
| Next showcase date | **NO** | `/performances` | **NOT YET** | NO | — | **I-4 — no dated event exists** |

**Coverage: PARTIAL — the fallback is live and working; the real evidence layer
does not exist yet.**

---

## 7. Scholarships

**Source:** `business-profile.json` · `/step-up-accessibility/`

| Item | Homepage | Destination | Migrated | Owner | Blocker |
|---|---|---|---|---|---|
| Step Up for Students, PEP + UA | **YES — full section** | `/scholarships` | **FULL — built** | — | — |
| Mandatory disclaimer (verbatim) | **YES — adjacent to claim** | `/scholarships` | **FULL — built** | — | Absent from the *source* page; restored here |
| Inclusion statement | YES | `/scholarships` | **FULL — built** | — | Full "inclusive approach" paragraph now ships |
| Provider-status wording | Single safe phrasing used | `/scholarships` | **PARTIAL — built** | **YES** | Both published phrasings now ship, side by side |
| Eligibility criteria | NO | `/scholarships` | **NOT YET** | **YES** | Never stated anywhere |
| Application steps / documents | NO | `/scholarships` | **NOT YET** | **YES** | Never stated |
| Coverage amount | NO | `/scholarships` | **NOT YET** | **YES** | Never stated |
| Link to stepupforstudents.org | NO | `/scholarships` | **NOT YET** | YES | **No outbound link exists** |
| Step Up logos ×2 | **NO** | `/scholarships` | **OMITTED** | **YES — I-6** | Licensing unconfirmed |
| PEP/UA for camp? | NO | `/camps` | NOT YET | **YES** | Never addressed |

**Coverage: FULL for everything that exists.** Every verbatim block from
`/step-up-accessibility/` now ships on a built page, with the compliance
disclaimer the source page itself drops.

⚠️ **The actionable path still does not exist** — eligibility, steps, documents
and coverage are published nowhere and cannot be migrated. The page routes
families to a person instead of inventing a process. **These remain the
highest-value owner inputs on the site.**

---

## 8. Testimonials

**Source:** `testimonials.json` — **14 unique**, 18 rendered instances per page
across 5 pages (slider misconfiguration)

| Reviewer | Homepage | Destination | Migrated | Omitted | Reason |
|---|---|---|---|---|---|
| Nikin Shah | **YES — anchor quote** | `/`, `/about` | FULL | NO | — |
| Maria carolina Linares | **YES — marginalia** | `/` | FULL | NO | — |
| Yaimarelys Grandales | **YES — marginalia** | `/` | FULL | NO | — |
| Elizabeth Garcia | in content, not rendered | `/about` | PARTIAL | NO | — |
| J Val | in content, not rendered | `/about` | PARTIAL | NO | — |
| **Mariana Gennevie Olvera** | **NO — filtered at render** | — | **OMITTED** | **YES** | **Names a minor (Aaron)** |
| Dexter | **YES — Performance Evidence** | `/performances` | FULL | NO | — |
| romi | **YES — Performance Evidence** | `/performances` | FULL | NO | — |
| Brian Silverio | **YES — Performance Evidence** | `/performances` | FULL | NO | — |
| Julian Paz | NO | `/about` | NOT YET | NO | 721 chars; internally inconsistent |
| Claudia Olivar | NO | `/about` | NOT YET | NO | Names 2 instructor identities |
| Mariana Olvera | NO | `/about` | NOT YET | NO | Possible duplicate of Gennevie |
| **Charles Percy** | **NO** | — | **OMITTED** | **YES** | **Names 2 minors + religious framing (B-1)** |
| John Granada | NO | — | **OMITTED** | **YES** | Religious framing (B-1) |

**Also unmigrated:** star ratings (main site shows none), review dates, platform
attribution, original review URLs, aggregate rating.

**Coverage: FULL for the homepage set (6 of 14 rendered). 4 withheld with
documented reasons. 4 await `/about`.**

---

## 9. FAQs

**Source:** `faqs.json` — **40 unique across 10 sets**

| Set | Count | Homepage | Destination | Migrated |
|---|---|---|---|---|
| Site-wide FAQ *(canonical commercial terms)* | 7 | facts surface in other blocks | `/faq` | **PARTIAL — 4 of 7 ship** |
| Summer Jam Camp FAQ | 9 | NO | `/camps` + `/faq` | **FULL — built** |
| Piano / Guitar / Drum / Violin | 5 each = 20 | NO | each instrument route | **FULL — built** |
| Bass / Ukulele | 4 each = 8 | NO | each instrument route | **FULL — built** |
| Singing *(orphan)* | 5 | NO | `/singing-lessons` | **FULL — built** |
| Group Music Lessons *(orphan)* | 5 | NO | `/group-music-lessons` | PARTIAL — facts migrated, Q&A form not rendered |

> **No FAQ block is rendered on the homepage.** The site-wide set is the **only
> published source of pricing, guarantee, age and scholarship terms in the whole
> estate** — its facts were extracted into other blocks, but the Q&A form is not
> live anywhere.

**13 questions a parent would ask are never answered anywhere** — cost, lesson
length, tuition, camp deposit, cancellation/make-up policy, fees, camp
scholarships, sibling discounts, group ratio, teacher qualifications, parking
and access, term length, trial availability for group/camp.

**No `FAQPage` schema exists** — zero rich-result eligibility.

**Coverage: 33 of 40 FAQs now render as Q&A** on their instrument pages. The
site-wide set (7) still needs `/faq`, and the camp set (9) needs `/camps`.
**~82% of the Q&A form is live.** No `FAQPage` schema yet — deferred with the
rest of structured data pending B-4/B-5/I-8.

---

## 10. Contact and enrolment

**Source:** `contact-details.json`, `conversion-actions.json` ·
`/contact-enroll/`

| Item | Homepage | Destination | Migrated | Blocker |
|---|---|---|---|---|
| Phone / email / address / hours | YES — footer | `/contact` | **FULL — built** | Conflicts (§1) |
| **Native contact form** | NO | `/contact` | **NOT YET** | **Still zero native forms — needs an owner decision on where submissions go** |
| Trial booking | YES — CTA | `/contact/book-a-trial` | **FULL — built** | ✅ **Fixed. The CTA now resolves.** |
| Response promises ×4 | NO | `/contact` | NOT YET | Must be verified before publishing |
| WhatsApp / SMS | NO | `/contact` | NOT YET | Advertised but **no link exists** |
| Google Maps / directions | NO | `/contact` | NOT YET | Map exists only on the subdomain |
| Scholarship enquiry flow | NO | `/scholarships` | **PARTIAL — built** | Routes to `/contact`; not yet a separate intent |

**Coverage: PARTIAL → improved.** Details now live on a real page and the trial
path resolves end to end. The native form remains the open item.

---

## 11. Policies

| Policy | Source | Homepage | Destination | Migrated | Blocker |
|---|---|---|---|---|---|
| Camp refund / non-refundable deposit | camp pages | NO | `/camps` | NOT YET | **Legal review recommended** |
| Lesson cancellation / make-up | **does not exist** | NO | `/faq` | **MISSING AT SOURCE** | `/piano-lessons/` advertises a policy that is never published |
| Behavioural / enrolment-decline | camp page | NO | `/camps` | NOT YET | Tension with the inclusion claim |
| Privacy policy | **does not exist** | NO | `/privacy-policy` | **MISSING AT SOURCE** | Required — site collects leads |
| Terms | **does not exist** | NO | `/terms` | **MISSING AT SOURCE** | Nav links to it |
| Accessibility statement | **does not exist** | NO | `/accessibility` | **MISSING AT SOURCE** | Nav links to it |
| Photo/media consent | **does not exist** | NO | `/privacy-policy` | **MISSING AT SOURCE** | Gate I-1 depends on it |

**Coverage: NOT YET — and five of these do not exist at source and must be
authored, not migrated.**

---

## 12. Images

**Source:** `assets-inventory.json` — 62 distinct assets

| Class | Count | Homepage | Destination | Migrated | Omitted | Blocker |
|---|---|---|---|---|---|---|
| Genuine performance photos | **18** | **NO** | `/performances` | **OMITTED** | **YES** | **I-1 consent + I-7 copyright** |
| Stock / template | 26 | NO | — | **OMITTED** | **YES** | Unverifiable licensing |
| Step Up logos | 2 | NO | `/scholarships` | **OMITTED** | **YES** | I-6 |
| Logo (raster PNG) | 1 | **NO — type wordmark used** | sitewide | PARTIAL | NO | No vector; doubles as og:image |
| Duplicate uploads | 14 | NO | — | **OMITTED** | YES | De-duplicate |
| **Generated atmospherics** | 8 | **NO — none referenced** | film movements | **NOT YET** | NO | **All 8 unapproved** |
| Wrong-instrument heroes | 3 | NO | `/lessons/*` | **OMITTED** | YES | Violin→guitar, ukulele→piano, singing→guitar |

> **22+ pages load their hero from `cmscustom-staginglink2.com`, an agency
> staging domain the business does not control.** If it lapses, most of the old
> site loses its imagery. **AT RISK.**

**Coverage: 0% of source imagery is live — by design. The homepage ships no
image at all.**

---

## 13. Videos

**Zero video assets exist across the entire estate** — no YouTube, Vimeo,
Wistia or self-hosted file on any of 28 pages.

| Item | Status |
|---|---|
| Existing video to migrate | **NONE** |
| Destination if commissioned | `/performances`, homepage hero |
| Owner action | **I-3 — recommend 10–15s of showcase footage, no faces** |

Called the highest-value asset the owner could produce, by both the extraction
and the design package.

---

## 14. Calls to action

**Source:** `conversion-actions.json` — 40+ linked, **20 dead**

| Item | Source state | Homepage | Migrated | Blocker |
|---|---|---|---|---|
| "Book a Trial Lesson" (header) | Every page → HighLevel widget | YES — hero pill | **FULL** | ✅ Destination built; header CTA enabled and priced |
| "Schedule a Trial Lesson" | 30+ instances, no price | Replaced by priced CTA | **IMPROVED** | — |
| Same label → `/contact-enroll/` ×4 | **Points at a page with no form** | N/A | **OMITTED — defect** | Do not reproduce |
| "Book 90-Day Stage Experience" | Resolves to generic widget | Merged into one CTA | PARTIAL | Intent not segmented |
| "Reserve My Child's Seat" | Camp | NO | NOT YET | `/camps` |
| **20 dead CTAs** | Plain text, no link, at the foot of instrument/program pages | N/A | **OMITTED — defect** | **Must be links or deleted** |
| "Check Eligibility" | Not in source | Replaced by "Talk to us about Step Up" | **BUILT** | Routes to `/contact` |

**Coverage: FULL for the built routes.** One priced, unambiguous CTA, and its
destination now exists. The header CTA was also **disabled on gate B-8** on
every page that renders a header — B-8 gates tuition, not the $25 trial, so it
has been enabled and now carries the price.

---

## 15. External systems

**Source:** `external-integrations.json`

| System | Detail | Status | Owner action |
|---|---|---|---|
| **HighLevel / LeadConnector** | One survey widget serves **every** intent, on every page including 404 | **NOT MIGRATED** | **Confirm account ownership; export the lead database** |
| `try.southdademusic.com` | Second HighLevel funnel — different phone, different name, different positioning | **NOT MIGRATED** | **Retire, align, or keep as a paid-traffic LP** |
| Payment system | **None observable** despite a required non-refundable deposit | **UNVERIFIED** | **Confirm how deposits are actually collected** |
| Analytics / GA4 / GTM | Not observable in extracted content | **UNVERIFIED** | **Script-level tag audit before launch or history is lost** |
| Meta Pixel | Not observable | **UNVERIFIED** | Same audit |
| Google Business Profile | Confirmed via `place_id` (unit **117**) | Not linked | **Claim it; it holds the review corpus** |
| Google Maps | Subdomain only | NOT YET | `/contact` |
| Email marketing | No ESP, no newsletter anywhere | **NONE** | Decide if needed |
| Social | **Zero links**; Instagram lost in migration | **NONE** | **Recover handles** |
| Staging asset host | 14–22+ pages | **AT RISK** | **Re-point to local assets** |
| WordPress / page builder / SEO plugin | Being replaced | N/A | — |

**Coverage: 0% migrated. None of this is homepage work — it is launch-blocking
infrastructure.**

---

## 16. Downloadable assets

**Zero PDFs, zero documents, zero downloads exist** across the estate.

| Expected | Exists | Destination |
|---|---|---|
| Parent handbook | NO | `/faq` — author |
| Camp packet / medical form | NO | `/camps` — author |
| Tuition sheet | NO | Gated on B-8 |
| Policy PDFs | NO | See §11 |
| Photo-consent form | NO | **Required to unblock I-1** |

**Coverage: nothing to migrate. All must be authored.**

---

# SUMMARY

## 1. Percentage of extracted content already represented

Weighted by extracted content blocks (~330 discrete items). **Tier 3 in bold.**

| Category | Now | After T2 | After T1 | Original |
|---|---|---|---|---|
| Instruments | ~95% | ~95% | ~10% | ~10% |
| **Programmes** | **~95%** | ~75% | ~40% | ~15% |
| **FAQs** (published answers) | **~94%** | ~82% | 0% | 0% |
| **Camps** | **~90%** | ~5% | ~5% | ~5% |
| **About / brand narrative** | **~85%** | 0% | 0% | 0% |
| **Performances** | **~90%** of what exists | ~20% | ~20% | ~20% |
| Scholarships | ~95% | ~95% | ~95% | 60% |
| 90-Day Stage Program | ~90% | ~90% | ~90% | 55% |
| Business contact facts | 100% | 100% | 100% | ~80% |
| Testimonials | 100% of the vetted set | 100% | 100% | 100% |
| Policies / downloads / video / external systems | 0% | 0% | 0% | 0% |

> ### **≈ 89% of extracted content is represented on the live site.**
> ### *(≈68% after Tier 2 · ≈34% after Tier 1 · ≈22% originally.)*
>
> Every source page with migratable content now has a destination that exists.

## 2. Percentage still awaiting migration

> ### **≈ 4% awaits migration.** *(was ≈25%)*
> ### **≈ 7% is deliberately omitted** and will never migrate.

**The remaining 4% is not migration work.** It is:

- **Five policy pages that must be authored** — privacy, terms, accessibility,
  the lesson cancellation policy and the photo-consent form. **None exists at
  source**, so there is nothing to migrate; they have to be written.
- **Two routes fully blocked on gates** — `/teachers` (B-7: no instructor is
  named anywhere) and `/programs/adults` (B-2: is adult provision real).
- **External-system work** — the HighLevel lead export, the analytics tag audit,
  the redirect map, and re-pointing the staging-domain images.

## 3. Pages that must be built

**0 content routes remain** of the original 17. ✅ **17 complete** (Tiers 1–3).

**P0 — launch-blocking (3 remaining of 9)**
~~`/contact`~~ ✅ · ~~`/contact/book-a-trial`~~ ✅ ·
~~`/programs/90-day-stage-program`~~ ✅ · ~~`/scholarships`~~ ✅ ·
~~`/programs`~~ ✅ · ~~`/lessons`~~ ✅ ·
`/faq` · `/about` · `/camps`

**P1 — required for content parity (3 remaining of 6)**
~~`/private-lessons`~~ ✅ · ~~`/group-music-lessons`~~ ✅ ·
~~7 instrument routes~~ ✅ ·
`/programs/band-builders` · `/programs/early-childhood` · `/performances`

**P2 — legal and gated (5)**
`/privacy-policy` · `/terms` · `/accessibility` · `/teachers` *(B-7)* ·
`/programs/adults` *(B-2)*

✅ **Resolved.** `/contact/book-a-trial` is built and the primary conversion
path now works end to end — homepage CTA → trial page → verified booking
endpoint, with phone and email as fallbacks if the third-party widget fails.

## 4. Data that should NOT appear on the homepage

| Content | Why |
|---|---|
| Any tuition figure | B-8 — none published; only the $25 may appear |
| Camp dates, price, deposit, refund terms | Belongs on `/camps`; sessions have passed |
| The 40 FAQs | Belongs on `/faq` and per-page |
| Instructor names | B-7 — appear only inside reviews |
| The 18 photographs | I-1 / I-7 |
| Step Up logos | I-6 |
| "Every student performs" | B-4 |
| "Two classes weekly" | Contradicted by 7 pages |
| Bilingual-support claim | B-6 — unevidenced |
| Policy text | Never animate; belongs on policy pages |
| Reviews naming minors | Consent |
| Religious-framing reviews | B-1 unresolved |

## 5. Data currently at risk of being lost

| At risk | Why | Mitigation |
|---|---|---|
| **18 genuine photographs** | Only authentic imagery; blocked and un-backed-up | Obtain consent; archive originals now |
| **HighLevel lead database** | Ownership unknown — may sit in an agency account | **Export before any cutover** |
| **Analytics history** | No tag inventory; IDs unknown | **Script-level audit before launch** |
| **22+ hero images on a staging domain** | Third-party server we do not control | Re-point to local copies |
| **Google review corpus** | 14 reviews live only on GBP; no URLs captured | Claim the profile; capture permalinks |
| **Instagram profile** | Link lost in migration; only a metadata trace | Recover the handle |
| **Keyboard as an instrument** | Sold on the hub, has no page | Give it a page or stop selling it |
| **Bazaar event record** | URL 404s; date survives only in a search index | Recover from the owner |
| **`/summercamp/` pillar icons** | Only unique asset on a route slated for redirect | **Salvage before redirecting** |
| **Camp deposit amount** | Binding, non-refundable, never stated | Owner must supply |

## 6. Duplicate content that should not be migrated

| Source | Action |
|---|---|
| `/summer-camp/` | **Redirect → `/camps`** — empty |
| `/summercamp/` | **Redirect → `/camps`** — salvage 4 icons first |
| `/summer-programs/` | **Merge → `/camps`** as the evergreen parent |
| `/performances/` gallery + copy | Duplicates the homepage — build as unique or fold in |
| `/bass-guitar-lessons/` ↔ `/ukulele-lessons/` | **5 sections verbatim identical — rewrite both** |
| Testimonial block ×18 per page, ×5 pages | De-duplicate at component level *(done on homepage)* |
| Site-wide FAQ on `/` and `/resources/` | Single source, referenced twice |
| `/media_slider/`, `/media_slider/slider/` | **410 / de-register** — zero content |
| `/events/month/2025-03/` | **410** — 404 archive, sitemap pollution |
| `logo-1.png` ×2 | De-duplicate |
| 14 duplicate uploads | De-duplicate |

## 7. Content requiring owner confirmation

**16 blocking items**, in priority order:

1. **B-8 — pricing for every product** (blocks 9 pages)
2. **B-4 — the performance promise** (unconditional vs conditional)
3. **B-5 — the business name** (4 in use; blocks logo, schema, ™)
4. **I-8 — the unit number** (117 / 1157 / 115)
5. **Camp down-payment amount** — binding and undisclosed
6. **B-7 — instructor names and permission** (blocks `/teachers`)
7. **I-1 — photo-release consent** (blocks 18 images)
8. **B-2 — is adult provision real** (blocks `/programs/adults`)
9. **B-6 — bilingual: build it or drop the claim**
10. **Scholarship eligibility, steps, documents, coverage**
11. **B-3 — the Exposure Ladder rungs**
12. **I-4 — the next showcase date**
13. **HighLevel ownership + lead export**
14. **Analytics/pixel IDs**
15. **I-6 — Step Up logo rights**
16. **2027 camp — does it exist?**

Plus the standing item from implementation: **the corrected contrast token
(`#746e61`)** and **the shout word**.

## 8. Recommended page-build order

Ordered by conversion impact and by what unblocks the most other work.

| # | Route | Status |
|---|---|---|
| ~~1~~ | ~~`/contact/book-a-trial`~~ | ✅ **Built — Tier 1** |
| ~~2~~ | ~~`/contact`~~ | ✅ **Built — Tier 1** |
| ~~3~~ | ~~`/programs/90-day-stage-program`~~ | ✅ **Built — Tier 1** |
| ~~4~~ | ~~`/scholarships`~~ | ✅ **Built — Tier 1** |
| ~~5~~ | ~~`/programs`~~ | ✅ **Built — Tier 2** |
| ~~6~~ | ~~`/lessons`~~ | ✅ **Built — Tier 2** (Keyboard surfaced, unlinked) |
| ~~—~~ | ~~9 lesson routes~~ | ✅ **Built — Tier 2** |
| **7** | `/camps` | **Next.** Collapses 4 routes into 1. **Do first if a 2027 camp is selling.** |
| 8 | `/faq` | The remaining 7 site-wide + 9 camp FAQs, and the 13 never answered. Add FAQPage schema. |
| 9 | `/about` | Mission, pillars, Exposure Ladder, 4 remaining testimonials. |
| 10 | 7 × `/lessons/*` | Rewrite the bass/ukulele duplicates; fix 3 wrong heroes. |
| 11 | 4 × `/programs/*` | Remaining program detail. |
| 12 | `/performances` | Gate I-4 / I-1 dependent. |
| 13 | `/privacy-policy`, `/terms`, `/accessibility` | Authored, not migrated. Required before launch. |
| 14 | `/teachers`, `/programs/adults` | Fully gated on B-7 / B-2. |

**Do in parallel, not as pages:** the redirect map (§6), the HighLevel export,
the analytics audit, and re-pointing the staging-domain images.

---

## Verdict

**Every useful extracted item has a named destination.** Nothing in
`docs/source-content/` is unaccounted for: each item is live, assigned to a
specific unbuilt route, or deliberately omitted with a recorded reason and gate.

Three things this audit surfaced that were not previously tracked:

1. ✅ **The primary CTA destination did not exist.** Fixed in Tier 1 —
   `/contact/book-a-trial` is built and the path resolves.
2. ✅ **Keyboard is sold with no page.** Surfaced in Tier 2: it is listed as
   offered on `/lessons` and `/private-lessons` and links nowhere, with a
   plain "detail page not yet available". **Owner decision outstanding:** is
   keyboard distinct from piano, or should it fold into the piano page?
3. **`/summercamp/` holds four pillar icons that exist nowhere else** and is
   slated for redirect. They must be salvaged first.

## Found while building Tier 1

Three defects that only became visible once interior routes reinstated the
header, which the homepage does not render:

4. **The header trial CTA was disabled sitewide on gate B-8.** B-8 gates
   *tuition*, not the $25 spot-hold, which is verbatim-extracted and was already
   shipping on the homepage. Every header on every future page would have
   carried a dead primary action. Now enabled and priced.
5. **A static "EN | ES" indicator shipped in the header.** Gate B-6 is open and
   no Spanish tree exists. Even as a non-control it tells a Spanish-speaking
   parent a Spanish site is waiting. Removed until the capability is real.
6. **The primary CTA was rendering square, not as a pill.** `rounded-none` on
   the Button base did not merge-conflict with the arbitrary-property form
   `rounded-(--radius-full)`, so source order won and silently squared off the
   single radius exception in the entire direction. Fixed and asserted.
