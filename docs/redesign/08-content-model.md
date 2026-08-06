# 08 — Content Model

**Phase:** 3 — Product Strategy
**Date:** 2026-08-05
**Depends on:** `02-information-architecture.md`, `07-component-library.md`
**Source of truth for existing values:** `docs/source-content/`

---

## 0. Design principles

The content model is where Phase 2's failures get engineered out permanently. Every rule below traces to a specific defect found in the extraction.

| Principle | Prevents |
|---|---|
| **Single source of truth per fact** | Three unit numbers, two phones, two emails, four brand names |
| **Required means required** — publish is blocked | Six programme pages with no price; camp with no deposit amount |
| **Claims are referenced, never retyped** | Four different Step Up provider wordings |
| **Every asset carries subject + consent + licence** | Guitar photo on the violin page; 18 unconsented images of minors; untraceable stock |
| **Dated content expires automatically** | A camp still selling seats a month after it ended |
| **Relationships are explicit and bidirectional** | The flagship programme linking to none of its components |
| **Translations are first-class entities** | "Full bilingual support" with zero Spanish content |
| **Nothing publishes with placeholder text** | Lorem ipsum indexed; editorial notes live on two pages |

### Field conventions

`REQ` required · `OPT` optional · `SYS` system-managed · `⚠️` blocked on a decision gate
`i18n` = translatable field, must exist per locale

---

## 1. Globals (singleton)

One record. **The single source of truth for every business fact.** No page may hard-code any of these.

| Field | Type | Req | Notes |
|---|---|---|---|
| `legalName` | string | REQ | ⚠️ gate B-5 |
| `tradingName` | string | REQ | ⚠️ gate B-5 — currently 4 variants in use |
| `alternateNames[]` | string[] | OPT | For schema `alternateName` |
| `tagline` | string i18n | REQ | "Ready for the stage." |
| `logo` | Asset ref | REQ | |
| `address` | Address object | REQ | ⚠️ **unit number unresolved: 117 / 1157 / 115** |
| `geo` | lat/lng | REQ | From the verified Google place record |
| `googlePlaceId` | string | REQ | Already known |
| `phonePrimary` | tel | REQ | ⚠️ 786-753-9509 vs +1-786-386-1982 |
| `phoneWhatsApp` | tel | OPT | ⚠️ claimed twice on site, no number exists |
| `emailPrimary` | email | REQ | ⚠️ info@ vs contact@ |
| `openingHours[]` | Hours[] | REQ | Mon–Sat 08:00–18:00, Sun closed ⚠️ conflicts with "evening availability" |
| `serviceAreas[]` | string[] | REQ | Florida City, Homestead, Cutler Bay, Palmetto Bay |
| `socialProfiles[]` | {platform, url}[] | OPT | ⚠️ **none currently exist**; Instagram referenced in the lost events archive |
| `defaultOgImage` | Asset ref | REQ | Fixes "logo as og:image on every page" |
| `locales[]` | enum[] | REQ | `en`, `es` ⚠️ gate B-6 |
| `trialPrice` | money | REQ | $25 ⚠️ confirm |
| `trialTerms` | rich text i18n | REQ | "credited to your tuition upon enrollment" |
| `guaranteeText` | rich text i18n | REQ | Stage-Ready Guarantee — referenced everywhere, authored once |
| `bookingUrl` | url | REQ | Segmented by intent |

---

## 2. Claim

A registry of approved claim wordings. **The single most important model in this document** — it structurally prevents the class of defect that produced four different Step Up wordings and three different performance promises.

| Field | Type | Req | Notes |
|---|---|---|---|
| `id` | slug | SYS | e.g. `step-up-provider-status` |
| `label` | string | REQ | Internal name |
| `approvedText` | rich text i18n | REQ | The **only** permitted wording |
| `status` | enum | REQ | `approved` · `pending-legal` · `pending-evidence` · `barred` |
| `evidenceUrl` | url | OPT | Substantiation |
| `approvedBy` | string | REQ | Who signed off |
| `approvedAt` | date | REQ | |
| `reviewDue` | date | OPT | |
| `usageContexts[]` | enum[] | OPT | Where it may appear |
| `notes` | text | OPT | |

### Seed registry

| Claim | Status |
|---|---|
| `stage-ready-guarantee` | ✅ approved — extracted verbatim |
| `ninety-day-promise` | ⚠️ **pending-legal** — gate B-4, three contradictory versions live |
| `step-up-provider-status` | ⚠️ **pending-legal** — gate S-2, four wordings live |
| `step-up-disclaimer` | ✅ approved — must appear on `/scholarships` |
| `bilingual-support` | ⛔ **barred** — no Spanish content exists |
| `choirs-and-orchestras` | ⛔ **barred** — claimed once, contradicted everywhere |
| `university-trained-instructors` | ⚠️ pending-evidence — gate B-7 |
| `online-lessons` | ⚠️ pending-evidence — one page only |
| `make-up-policy` | ⛔ **barred** — advertised, never published |
| `two-classes-weekly` | ⚠️ pending-evidence — contradicts 7 pages |
| `inclusion-promise` | ✅ approved — extracted, excellent |

**Rule:** any component rendering a claim references it by `id`. A `barred` or `pending` claim renders nothing and fails the build if referenced in a published page.

---

## 3. Asset

Every image, video and document. Governs the entire `09-image-strategy.md` workflow.

| Field | Type | Req | Notes |
|---|---|---|---|
| `id` | uuid | SYS | |
| `file` | file | REQ | |
| `type` | enum | REQ | `photo` · `video` · `illustration` · `icon` · `document` · `audio` |
| `altText` | string i18n | REQ | **Validated** — rejects filenames, "img", "Image 1", "..." |
| `caption` | string i18n | OPT | |
| `credit` | string | OPT | Photographer |
| **`subject`** | string[] | REQ | **Validated against page subject** — prevents a guitar photo on the violin page |
| `register` | enum | REQ | `stage` · `studio` · `community` |
| `provenance` | enum | REQ | `in-house` · `licensed-stock` · `ai-generated` · `client-supplied` · `unknown` |
| `licence` | string | REQ if stock | ⚠️ Turkish/French/Medium-hash assets are all `unknown` today |
| `licenceExpiry` | date | OPT | |
| **`depictsMinors`** | boolean | REQ | |
| **`consentStatus`** | enum | REQ if `depictsMinors` | `obtained` · `pending` · `refused` · `unknown` |
| `consentRef` | string | REQ if `obtained` | Document reference |
| `captureDate` | date | OPT | Detects a 2025 photo selling a 2026 camp |
| `relatedEvent` | Performance ref | OPT | |
| `focalPoint` | x/y | OPT | Art-directed cropping |
| `dominantColor` | hex | SYS | Placeholder |
| `status` | enum | REQ | `approved` · `needs-replacement` · `blocked` |

**Publish rules**
1. `depictsMinors: true` + `consentStatus ≠ obtained` → **publish blocked**
2. `provenance: unknown` → flagged, cannot be a hero
3. `provenance: ai-generated` → **cannot have `depictsMinors: true`**; cannot be used in `register: stage` or `studio` (see `09-image-strategy.md`)
4. `subject` must intersect the host page's subject tags
5. No asset may be served from an external domain the business does not control ⚠️ eliminates `cmscustom-staginglink2.com`

---

## 4. Program

| Field | Type | Req | Notes |
|---|---|---|---|
| `id`, `slug` | slug | REQ | |
| `name` | string i18n | REQ | |
| `shortName` | string i18n | OPT | Nav/card use |
| `type` | enum | REQ | `flagship` · `component` · `standalone` |
| `parentProgram` | Program ref | OPT | Private Lessons & Band Builders → 90-Day |
| `summary` | string i18n | REQ | ≤160 chars, **must be a complete sentence** (3 cards truncate mid-word today) |
| `body` | rich text i18n | REQ | |
| `ageMin` / `ageMax` | int | REQ | |
| `ageBandLabel` | string i18n | REQ | "Ages 7–15" |
| `format` | enum[] | REQ | `private` · `group` · `ensemble` · `camp` ⚠️ resolves the private-vs-group contradiction |
| `durationWeeks` | int | OPT | ⚠️ 12 vs 90 days — gate B-4 |
| `sessionsPerWeek` | int | REQ | ⚠️ 1 vs 2 — gate |
| `sessionLengthMinutes` | int | REQ | ⚠️ **never stated anywhere on the current site** |
| `schedule` | rich text i18n | REQ | ⚠️ no programme publishes a schedule today |
| **`price`** | money | REQ | ⚠️ **gate B-8 — publish blocked without it** |
| `priceUnit` | enum | REQ | `per-month` · `per-session` · `per-cycle` |
| `priceNote` | string i18n | OPT | What's included/excluded |
| `scholarshipEligible` | boolean | REQ | ⚠️ camp applicability never addressed |
| `guarantee` | Claim ref | OPT | → `stage-ready-guarantee` |
| `performanceComponent` | rich text i18n | REQ | ⚠️ must reference an approved claim |
| `prerequisites` | rich text i18n | OPT | ⚠️ Band Builders is self-contradictory today |
| `whatYouLearn[]` | string[] i18n | REQ | |
| `whatYouNeed[]` | string[] i18n | REQ | |
| `heroImage` | Asset ref | REQ | Subject-validated |
| `gallery[]` | Asset ref[] | OPT | |
| `relatedPrograms[]` | Program ref[] | REQ, min 2 | **Bidirectional, enforced** — fixes zero inter-programme linking |
| `relatedInstruments[]` | Instrument ref[] | OPT | |
| `teachers[]` | Instructor ref[] | OPT | ⚠️ gate B-7 |
| `faqs[]` | FAQ ref[] | REQ, min 3 | |
| `testimonials[]` | Testimonial ref[] | REQ, min 1 | |
| `primaryCta` | CTA ref | REQ | |
| `seo` | SEO object | REQ | |
| `status` | enum | REQ | |

---

## 5. Instrument (Lesson)

| Field | Type | Req | Notes |
|---|---|---|---|
| `id`, `slug` | slug | REQ | `piano`, `guitar`, `drums`, `bass`, `violin`, `ukulele`, `voice` |
| `name` | string i18n | REQ | |
| `searchTerm` | string | REQ | "singing lessons" for `voice` — SEO target ≠ taxonomy name |
| `icon` | Asset ref | REQ | One of the 7 custom marks |
| `heroImage` | Asset ref | REQ | **`subject` must contain this instrument** — fixes 3 wrong-instrument heroes |
| `summary` | string i18n | REQ | |
| `body` | rich text i18n | REQ | |
| `startAgeMin` | int | REQ | Extracted: piano 5, guitar 6, drums 5, bass 7, violin 5, ukulele 5, voice 5 |
| `startAgeNote` | string i18n | REQ | "depending on hand size and focus" |
| `formats[]` | enum[] | REQ | ⚠️ **resolves the private-vs-group contradiction per instrument** |
| `frequency` | string i18n | REQ | ⚠️ 1 vs 2 per week |
| `equipmentRequired` | enum | REQ | `none` · `starter-sufficient` · `own-instrument` |
| `equipmentNote` | rich text i18n | REQ | "A keyboard is enough to start" |
| `equipmentCostEstimate` | money range | OPT | **Genuine differentiator — nobody answers this** |
| `whatYouLearn[]` | string[] i18n | REQ | |
| `firstTwelveWeeks` | rich text i18n | REQ | Ties the instrument to the 90-day cycle |
| `availablePrograms[]` | Program ref[] | REQ, min 1 | |
| `teachers[]` | Instructor ref[] | OPT | ⚠️ B-7 |
| `relatedInstruments[]` | Instrument ref[] | REQ, exactly 2 | |
| `faqs[]` | FAQ ref[] | REQ, min 5 | |
| `price` | money \| Program ref | REQ | ⚠️ B-8 |
| `gallery[]` | Asset ref[] | OPT | Subject-validated |
| `seo`, `status` | | REQ | |

---

## 6. Camp

Evergreen parent (`CampProgram`) + dated child (`CampSession`). This split is what permanently fixes the expired-camp problem.

### CampProgram

| Field | Type | Req | Notes |
|---|---|---|---|
| `slug` | slug | REQ | `summer-jam` |
| `name` | string i18n | REQ | |
| `evergreenBody` | rich text i18n | REQ | ⚠️ **merge the prose from `/summer-programs/`** |
| `ageMin` / `ageMax` | int | REQ | 7 / 15 |
| `whatsIncluded[]` | string[] i18n | REQ | 8 extracted items |
| `instrumentsTaught[]` | Instrument ref[] | REQ | piano, drums, voice, ukulele |
| `faqs[]` | FAQ ref[] | REQ | The 9 extracted camp FAQs |
| `refundPolicy` | Policy ref | REQ | |
| `behaviourPolicy` | Policy ref | REQ | ⚠️ legal review — tension with UA positioning |
| `parentPack` | Asset ref | REQ | ⚠️ **does not exist** |
| `currentYear` | CampSession ref | OPT | Null off-season → waitlist state |
| `pastSessions[]` | CampSession ref[] | SYS | |
| `waitlistEnabled` | boolean | REQ | |

### CampSession

| Field | Type | Req | Notes |
|---|---|---|---|
| `year` | int | REQ | |
| `sessionNumber` | int | REQ | |
| `startDate` / `endDate` | date | REQ | |
| `daysOfWeek` | enum[] | REQ | Mon–Fri |
| `blocks[]` | Block[] | REQ | `{label, startTime, endTime, isDefault, isWaitlistOnly, capacity}` |
| `location` | Address | REQ | ⚠️ **Unit 1157 vs 117 — this is a drop-off address** |
| `capacityPerBlock` | int | REQ | 15 |
| `capacityTotal` | int | REQ | 60 |
| `seatsRemaining` | int | OPT | Live only if genuinely tracked — **never fabricate scarcity** |
| `priceStandard` | money | REQ | $450 |
| `pricePayInFull` | money | OPT | $400 |
| `instructionalHours` | int | REQ | 60 |
| **`depositAmount`** | money | REQ | ⚠️ 🚨 **HARD BLOCK — non-refundable, "required today", never published** |
| `depositRefundable` | boolean | REQ | false |
| `balanceDueDays` | int | REQ | 14 |
| `scholarshipApplicable` | boolean | REQ | ⚠️ never addressed |
| `heroImage` | Asset ref | REQ | ⚠️ current selling image is from **2025** |
| `status` | enum | SYS | `announced` · `open` · `waitlist` · `in-session` · `archived` |
| `autoArchiveAfter` | date | SYS | **Automatic transition** — the fix for the expired-camp defect |

---

## 7. FAQ

Authored once, referenced everywhere. Eliminates the current duplication of the 7-item set across two pages and the 9-item camp set across two more.

| Field | Type | Req | Notes |
|---|---|---|---|
| `id`, `slug` | slug | REQ | Deep-linkable |
| `question` | string i18n | REQ | |
| `answer` | rich text i18n | REQ | |
| `category` | enum | REQ | `general` · `programs` · `instruments` · `camp` · `scholarship` · `pricing` · `policies` |
| `appliesTo[]` | ref[] | OPT | Programs / Instruments / Camps |
| `claimRefs[]` | Claim ref[] | OPT | Any regulated claim referenced |
| `order` | int | OPT | |
| `featured` | boolean | OPT | Homepage surfacing |
| `emitSchema` | boolean | REQ | `FAQPage` eligibility |

**Seed:** 40 extracted Q&As. ⚠️ Several carry barred or pending claims and cannot publish until their gates close.

---

## 8. Testimonial

| Field | Type | Req | Notes |
|---|---|---|---|
| `id` | uuid | SYS | |
| `quote` | text | REQ | **Verbatim. Never edited.** |
| `quoteLanguage` | enum | REQ | Drives inline `lang` — the Spanish review is currently mis-announced |
| `reviewerName` | string | REQ | As published |
| `reviewerRelation` | enum | OPT | `parent` · `grandparent` · `aunt-uncle` · `student` · `attendee` |
| `rating` | int 1–5 | OPT | |
| `source` | enum | REQ | `google` · `facebook` · `direct` · `unknown` |
| `sourceUrl` | url | ⚠️ REQ for schema | **gate S-4** — required for `Review`/`AggregateRating` |
| `datePublished` | date | OPT | |
| `topics[]` | enum[] | REQ | `confidence` · `performance` · `teacher` · `community` · `progress` · `camp` |
| `namesMinors` | boolean | REQ | ⚠️ **true for 3 testimonials** — Aaron, Dexter, Michael Munroe |
| `minorConsentStatus` | enum | REQ if above | Blocks publish unless `obtained` |
| `relatedInstructor` | Instructor ref | OPT | Lopez ×5, Joshua ×1, Alberto ×1 |
| `appliesTo[]` | ref[] | OPT | |
| `featured` | boolean | OPT | |
| `status` | enum | REQ | |

**Seed:** 14 unique. **Rendered once each** — the current 18-cards-for-12-reviews defect is a rendering bug the model makes impossible.

---

## 9. Instructor

⚠️ **Entire model blocked on gate B-7.** No instructor is named anywhere on the current site except inside customer reviews.

| Field | Type | Req | Notes |
|---|---|---|---|
| `id`, `slug` | slug | REQ | |
| `displayName` | string | REQ | ⚠️ "Mr. Lopez" / "Professor Joshua" may be one person |
| `pronouns` | string | OPT | Use as given; never inferred |
| `role` | string i18n | REQ | |
| `portrait` | Asset ref | REQ | ⚠️ does not exist |
| `bio` | rich text i18n | REQ | |
| `oneLine` | string i18n | REQ | Card use |
| `instruments[]` | Instrument ref[] | REQ | |
| `programs[]` | Program ref[] | OPT | |
| `credentials[]` | string[] i18n | OPT | ⚠️ "university-trained" unverified |
| `yearsTeaching` | int | OPT | |
| `languages[]` | enum[] | REQ | **Directly supports the bilingual claim** |
| `backgroundCheckStatus` | enum | REQ | `verified` · `pending` — **internal, surfaced only as a trust badge** |
| `isPerforming` | boolean | OPT | ⚠️ "active performers" claim |
| `acceptingStudents` | boolean | REQ | |
| `status` | enum | REQ | |

---

## 10. Performance (Showcase)

| Field | Type | Req | Notes |
|---|---|---|---|
| `id`, `slug` | slug | REQ | `{year}-{slug}` |
| `title` | string i18n | REQ | |
| `type` | enum | REQ | `showcase` · `recital` · `community` · `camp-concert` |
| `date` | datetime | REQ | ⚠️ **zero dated events exist — both event URLs 404** |
| `venue` | string | REQ | |
| `venueAddress` | Address | OPT | |
| `isFree` | boolean | REQ | Supports the zero-risk CTA |
| `isPublic` | boolean | REQ | |
| `description` | rich text i18n | OPT | |
| `studentCount` | int | OPT | Never invented |
| `programs[]` | Program ref[] | OPT | |
| `heroImage` | Asset ref | REQ | |
| `gallery[]` | Asset ref[] | OPT | All consent-validated |
| `video` | Asset ref | OPT | ⚠️ **zero video exists — highest-priority production item** |
| `testimonials[]` | Testimonial ref[] | OPT | 3 performance-specific reviews currently unused |
| `status` | enum | REQ | `upcoming` · `past` |
| `emitEventSchema` | boolean | REQ | |

**Historical record required:** the only known past event — *Bazaar and Flea Market Performance, 15 March 2025, 10:00am* — comes from search-index metadata for a URL that now 404s. **Unverified.** Real history must be recovered from the owner.

---

## 11. Scholarship

| Field | Type | Req | Notes |
|---|---|---|---|
| `id`, `slug` | slug | REQ | `pep`, `unique-abilities` |
| `name` | string i18n | REQ | |
| `abbreviation` | string | REQ | |
| `provider` | string | REQ | Step Up for Students |
| `providerUrl` | url | REQ | ⚠️ **no outbound link exists today** |
| `summary` | string i18n | REQ | |
| `whoItsFor` | rich text i18n | REQ | |
| `eligibilityCriteria[]` | string[] i18n | REQ | ⚠️ **never stated** |
| `whatItCovers` | rich text i18n | REQ | ⚠️ coverage amount unknown |
| `applicationSteps[]` | Step[] | REQ | ⚠️ **do not exist** — `{order, title, description, estimatedMinutes, documentsNeeded[]}` |
| `documentsRequired[]` | string[] i18n | REQ | ⚠️ never listed |
| `providerStatusClaim` | Claim ref | REQ | → `step-up-provider-status` ⚠️ pending-legal |
| `disclaimer` | Claim ref | REQ | → `step-up-disclaimer` — **must render on this page** |
| `inclusionPromise` | Claim ref | REQ | → `inclusion-promise` |
| `applicablePrograms[]` | Program ref[] | REQ | ⚠️ camp applicability unaddressed |
| `faqs[]` | FAQ ref[] | REQ | |
| `contactPerson` | Instructor ref | OPT | A named human materially improves conversion |
| `spanishAvailable` | boolean | REQ | ⚠️ gate B-6 |

---

## 12. Policy

New entity. The current site publishes a refund policy for camp only, advertises a make-up policy that does not exist, and has no safeguarding, medical, allergy or photo-consent policy.

| Field | Type | Req | Notes |
|---|---|---|---|
| `id`, `slug` | slug | REQ | |
| `title` | string i18n | REQ | |
| `body` | rich text i18n | REQ | **Never animated, never collapsed by default** |
| `type` | enum | REQ | `refund` · `cancellation` · `make-up` · `behaviour` · `safeguarding` · `medical` · `photo-consent` · `privacy` · `terms` |
| `appliesTo[]` | ref[] | REQ | |
| `effectiveDate` | date | REQ | |
| `version` | string | SYS | |
| `legalReviewStatus` | enum | REQ | `reviewed` · `pending` — ⚠️ camp refund and behaviour clauses need review |
| `downloadable` | Asset ref | OPT | |

---

## 13. CTA

| Field | Type | Req | Notes |
|---|---|---|---|
| `id` | slug | REQ | |
| `label` | string i18n | REQ | Verb + object |
| `sublabel` | string i18n | OPT | |
| `href` | url | REQ | **Must resolve — no text-only CTAs** |
| `intent` | enum | REQ | `trial` · `camp-reservation` · `scholarship-enquiry` · `waitlist` · `event-rsvp` · `call` · `directions` · `whatsapp` |
| `variant` | enum | REQ | |
| `priceDisplay` | money | OPT | **Rendered in the label where a price exists** |
| `sourceContext` | string | SYS | Recorded on submission — enables the intent segmentation that is impossible today |
| `requiresGate` | Gate ref | OPT | Blocks render until resolved |

---

## 14. Gallery

| Field | Type | Req | Notes |
|---|---|---|---|
| `id`, `slug` | slug | REQ | |
| `title` | string i18n | REQ | |
| `type` | enum | REQ | `showcase` · `camp` · `studio` · `ensemble` |
| `items[]` | Asset ref[] | REQ | All consent-validated |
| `relatedPerformance` | Performance ref | OPT | |
| `date` | date | OPT | |
| `layout` | enum | REQ | `masonry` · `justified` · `grid` |

---

## 15. Article (post-launch)

| Field | Type | Req | Notes |
|---|---|---|---|
| `slug`, `title`, `excerpt`, `body` | i18n | REQ | |
| `cluster` | enum | REQ | Maps to `06-seo-strategy.md` §11 |
| `pillarPage` | ref | REQ | Enforces hub-and-spoke |
| `author` | Instructor ref | REQ | |
| `publishedAt`, `readTimeMinutes` | | REQ / SYS | |
| `heroImage` | Asset ref | REQ | |
| `relatedContent[]` | ref[] | REQ, min 3 | |

---

## 16. Supporting objects

**Address** — `street`, `unit` ⚠️, `city`, `state`, `postalCode`, `country`, `geo`, `directionsNote`, `parkingNote`
**Hours** — `dayOfWeek`, `opens`, `closes`, `closed`
**SEO** — `metaTitle` (≤60) REQ, `metaDescription` (140–158) REQ **hand-written**, `ogImage` REQ, `canonicalUrl`, `noindex`, `hreflangAlternates[]`, `schemaType`
**Money** — `amount`, `currency`, `unit`, `note`
**Block** — `label`, `startTime`, `endTime`, `isDefault`, `isWaitlistOnly`, `capacity`
**Step** — `order`, `title`, `description`, `estimatedMinutes`, `documentsNeeded[]`

---

## 17. Relationship map

```
Globals ──────── referenced by every page
Claim ◄───────── Program, Instrument, Scholarship, FAQ, Globals
Asset ◄───────── everything visual (consent + subject + licence gated)

Program ◄──┬──► Program        (bidirectional, min 2, enforced)
           ├──► Instrument     (bidirectional)
           ├──► Instructor     (bidirectional)
           ├──► FAQ            (min 3)
           ├──► Testimonial    (min 1)
           ├──► Policy
           └──► CTA

CampProgram ──► CampSession[] ──► Block[]
            └─► Policy (refund, behaviour) ⚠️ legal review

Performance ──► Gallery ──► Asset[]
            └─► Testimonial[]

Scholarship ──► Program[]  ──► Claim  ──► Step[]
```

**Enforced integrity**
1. `relatedPrograms` is bidirectional — adding A→B creates B→A
2. Every Program has ≥2 related Programs — makes the current zero-inter-linking state impossible
3. Every Instrument has exactly 2 related Instruments
4. Every published entity is referenced by ≥2 others — **the orphan check**
5. Deleting an entity with inbound references is blocked

---

## 18. Publish workflow

```
DRAFT → IN REVIEW → APPROVED → SCHEDULED → PUBLISHED → ARCHIVED
```

### Publish gates — all must pass

| # | Gate | Prevents |
|---|---|---|
| 1 | All REQ fields present | Six programme pages with no price |
| 2 | No placeholder patterns (`lorem ipsum`, `TODO`, `Internal link suggestion`, `New Project`, `Image 1`) | Lorem ipsum indexed; editorial notes live |
| 3 | All referenced Claims are `approved` | Four Step Up wordings; barred bilingual claim |
| 4 | All Assets have valid `altText`, `subject`, `licence` | Filename-as-alt; untraceable stock |
| 5 | No Asset with `depictsMinors` and missing consent | 18 unconsented images |
| 6 | `subject` intersects page subject | Guitar photo on the violin page |
| 7 | ≥2 inbound internal links | Orphaned group and voice pages |
| 8 | `metaTitle` and `metaDescription` hand-written | Auto-generated descriptions |
| 9 | No duplicate body vs another published page | `/summercamp/` ≡ canonical camp page |
| 10 | Locale parity where `locales` includes `es` | Partial Spanish tree |
| 11 | All CTA `href`s resolve | 20 text-only CTAs |
| 12 | Dated content has `autoArchiveAfter` | Expired camp still selling |

**A page failing any gate cannot be published.** These twelve checks map one-to-one onto the twelve most damaging defects found in Phase 2.

---

## 19. Localisation model

⚠️ Gate B-6.

- **Field-level translation** — each `i18n` field stores per-locale values
- **Entity parity** — an entity is `published` in `es` only when every `i18n` REQ field has a Spanish value; **no partial pages**
- **Fallback is a build error, not a silent English render**
- **Authored, not machine-translated** — a `translationSource` field records `human` or `machine-reviewed`
- **`quoteLanguage`** on testimonials drives inline `lang` attributes
- **`hreflang`** generated automatically from parity status
- **Route mirroring** — `/es/{same-slug}` unless a Spanish slug materially improves search match, in which case `slugEs` overrides

---

## 20. Content model decision gates

| Gate | Question | Blocks |
|---|---|---|
| **CM-1** | NAP resolution (= S-1) | `Globals` — **and therefore every page** |
| **CM-2** | Pricing (= B-8) | `Program.price`, `Instrument.price` — publish blocked |
| **CM-3** | Camp deposit amount | `CampSession` — publish blocked |
| **CM-4** | Session length and frequency | `Program`, `Instrument` |
| **CM-5** | Claim approvals (B-4, S-2) | `Claim` registry, all dependent pages |
| **CM-6** | Instructor publication (= B-7) | `Instructor` model entirely |
| **CM-7** | Photo consent process | `Asset` — **all 18 real photographs** |
| **CM-8** | Real event records | `Performance`, `/events` |
| **CM-9** | Bilingual (= B-6) | Locale parity rules |
| **CM-10** | Policies authored and legally reviewed | `Policy` — refund, make-up, safeguarding |

---

**Next:** `09-image-strategy.md`
