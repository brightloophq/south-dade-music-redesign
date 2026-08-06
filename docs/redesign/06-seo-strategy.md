# 06 — SEO Strategy

**Phase:** 3 — Product Strategy
**Date:** 2026-08-05
**Source of truth:** `manifest.json`, `business-profile.json`, `content-conflicts.md`, `duplicate-routes.md`

---

## 0. Diagnosis — what the current SEO actually is

The existing site was built for search and is losing anyway. Phase 2 shows why:

| Symptom | Evidence |
|---|---|
| **Keyword stuffing over substance** | *"Singing Lessons For Kids"* appears 6× on one page. *"Group Music Classes South Dade"* is used as a noun inside body sentences. The **mission statement itself** contains *"Music Lessons Near Me"*. |
| **Machine-translated body copy** | *"My preference is to take piano lessons in close proximity to my house"* — first person, on a company page. Reads as generated content to both users and quality raters. |
| **Thin duplicate content** | Two camp URLs with identical copy; `/summer-camp/` empty and indexable; bass and ukulele pages sharing five verbatim sections. |
| **Orphaned money pages** | `/group-music-lessons/` and `/singing-lessons/` have zero internal links in. Voice — a core service — is unreachable. |
| **Zero internal linking between programmes** | The flagship page links to none of its components. No topical clustering signal exists. |
| **Broken indexed URLs** | Both event URLs 404 and remain in the discovery index. |
| **Placeholder content indexed** | Lorem ipsum on `/members/` **published into its meta description**. |
| **No structured data** | No `FAQPage`, `LocalBusiness`, `Course`, `Event` or `Review` markup anywhere, despite 40 FAQs and 14 reviews. |
| **Missing/auto-generated metadata** | `/performances/` has no description; four pages let AIOSEO auto-generate from body text. |
| **No bilingual signal** | "Full bilingual support" claimed; no Spanish page, no `hreflang`. |

**Conclusion:** the site is optimised for a 2015 keyword model while the business owns a genuinely unique, high-intent service. **The strategy is to stop chasing "music lessons near me" and win "90-day music programme", "step up for students music", and the specific city-service queries — while building the topical authority to take the generic head terms as a by-product.**

---

## 1. URL structure

### Principles

1. **Semantic hierarchy** — the URL states the taxonomy: `/lessons/piano` not `/piano-lessons`
2. **Lowercase, hyphenated, no trailing slash**
3. **Depth ≤ 3**
4. **No dates in evergreen slugs**; dated content lives under an evergreen parent
5. **Stable** — URLs are permanent contracts

### Structure

```
/                                       Home
/programs                               Hub
/programs/90-day-stage-program          ★ Flagship — the differentiated term
/programs/private-lessons
/programs/group-lessons
/programs/band-builders
/programs/early-childhood
/programs/adults                        ⚠️ gate B-2
/lessons                                Hub (renamed from /instruments/)
/lessons/{piano|guitar|drums|bass|violin|ukulele|voice}
/camps                                  Evergreen parent
/camps/summer-jam-{year}                Dated child
/scholarships                           Renamed from /step-up-accessibility/
/scholarships/pep
/scholarships/unique-abilities
/performances                           Hub
/performances/{year}-{slug}             Individual showcases
/events                                 Upcoming
/about
/teachers
/teachers/{slug}
/pricing
/faq
/contact
/contact/book-a-trial
/es/*                                   Full Spanish mirror ⚠️ gate B-6
```

### Why `/instruments/` → `/lessons/`

Search demand is for *"piano lessons"*, not *"piano instruments"*. The current label loses intent match at the hub level, and the hub is the page best positioned to rank for the category term.

### Slug decisions

| Slug | Rationale |
|---|---|
| `90-day-stage-program` | Retains the branded term; it is the only phrase in the estate nobody else can rank for |
| `voice` | Chosen over `singing`; `/lessons/voice` reads consistently in the taxonomy. Page title still targets "singing lessons" — the higher-volume term. |
| `scholarships` | Broader intent capture than `step-up-accessibility`, which nobody searches for |
| `faq` | Direct intent; `resources` promised resources and delivered none |
| `camps` | Plural, evergreen, survives yearly cycles |

---

## 2. Metadata strategy

### Title patterns

| Template | Pattern | Max | Example |
|---|---|---|---|
| Home | `{Primary promise} \| {Brand} \| {City}` | 60 | `Music Lessons That End on a Stage \| South Dade Music \| Florida City` |
| Programme hub | `{Category} for Kids in {Region} \| {Brand}` | 60 | `Music Programs for Kids in South Miami-Dade \| South Dade Music` |
| Flagship | `{Branded term}: {Benefit} \| {Brand}` | 60 | `The 90-Day Stage Program: From First Lesson to Live Show` |
| Instrument | `{Instrument} Lessons in {City} — {Ages} \| {Brand}` | 60 | `Piano Lessons in Florida City — Ages 5+ \| South Dade Music` |
| Camp | `{Camp name} {Year} — {Ages}, {Dates} \| {Brand}` | 65 | `Summer Jam Music Camp 2027 — Ages 7–15, June & July` |
| Scholarship | `{Scholarship} for Music Lessons \| {Brand}` | 60 | `Step Up for Students PEP & UA Music Lessons \| South Dade Music` |
| Teacher | `{Name} — {Instrument} Teacher \| {Brand}` | 60 | |
| Showcase | `{Event} — {Month Year} \| {Brand}` | 60 | |

### Description patterns

Every description must contain: **what it is · who it's for · a differentiator · a location or action**. 140–158 characters. **Hand-written for every page** — no auto-generation. Phase 2 found four pages with AIOSEO-generated descriptions, including `/members/` publishing lorem ipsum.

**Example — flagship:**
> Every student at South Dade Music works toward a live showcase in 12 weeks. Skill lessons plus band rehearsal, in Florida City. Book a trial for $25.

### Rules

1. **One H1 per page**, matching search intent, distinct from the title tag
2. **Self-referencing canonical** on every indexable page
3. **`noindex`** on: `/members/` (until real), archived camp years, `/search`, thank-you and utility pages
4. **Open Graph per page** — the current site uses the **logo as `og:image` on every page**, so every social share of every page shows the same logo. Each page gets a relevant image, 1200×630.
5. **Banned from all metadata:** *Music Lessons Near Me*, *Kids Music Classes South Dade*, *Group Music Classes South Dade*, *Piano Lessons Near Me*, *Guitar Teacher Near Me*, *Violin Teachers Near Me*, *Private Drum Lessons* used as a proper noun
6. **Fix on migration:** `Violin Teachers South dade` (capitalisation), `Ukulele lessons` (title case)

---

## 3. Structured data

None exists today. This is the single largest technical opportunity, because the business has exactly the entities Google rewards: a local business, courses, events, FAQs and reviews.

### Sitewide

**`MusicSchool`** (sub-type of `LocalBusiness` + `EducationalOrganization`) on the homepage:

| Property | Value |
|---|---|
| `name` | ⚠️ gate B-5 — single brand name required |
| `address` | 601 W Palm Dr, Unit ⚠️ **117 / 1157 / 115 unresolved**, Florida City, FL 33034 |
| `telephone` | ⚠️ 786-753-9509 vs +1-786-386-1982 |
| `email` | ⚠️ info@ vs contact@ |
| `openingHoursSpecification` | Mo–Sa 08:00–18:00 ⚠️ conflicts with "evening availability" claims |
| `areaServed` | Florida City, Homestead, Cutler Bay, Palmetto Bay |
| `geo`, `hasMap` | From the verified Google place record |
| `sameAs` | ⚠️ **No social profiles exist** — must be recovered |
| `priceRange` | ⚠️ gate B-8 |
| `knowsLanguage` | `en`, `es` ⚠️ only if bilingual ships |

🚨 **Structured data is blocked until the NAP conflicts resolve.** Publishing schema with a wrong address or phone actively damages local ranking and is worse than publishing none.

### Per template

| Template | Schema | Key properties |
|---|---|---|
| Programme | `Course` + `CourseInstance` | name, description, provider, `courseMode`, `timeRequired` (P12W), `educationalLevel`, `typicalAgeRange`, offers ⚠️ price |
| Instrument | `Course` | Plus `teaches`, `coursePrerequisites` (none), `typicalAgeRange` |
| Camp | `Course` + `CourseInstance` + `Event` | `startDate`, `endDate`, `location`, `offers` ($450/$400), `maximumAttendeeCapacity` (15), `typicalAgeRange` (7–15) |
| Showcase | `Event` / `MusicEvent` | `startDate`, `location`, `performer`, `isAccessibleForFree` ⚠️ needs real events |
| Teacher | `Person` | `jobTitle`, `worksFor`, `knowsAbout`, `alumniOf` ⚠️ gate B-7 |
| FAQ | `FAQPage` | 40 extracted Q&As — immediate rich-result eligibility |
| Testimonials | `Review` + `AggregateRating` | ⚠️ **Only with verifiable source URLs.** 14 reviews exist with no attribution; unverifiable `AggregateRating` is a policy violation. |
| Scholarship | `WebPage` + `FAQPage` | Plus `Service` |
| All | `BreadcrumbList` | |
| Articles (future) | `Article` | |

### Rules

1. **Never mark up a claim the page cannot substantiate.** Bilingual support, choirs, orchestras and "university-trained" instructors are barred from schema until evidenced.
2. **Schema mirrors visible content exactly.** No prices in schema that aren't on the page.
3. JSON-LD only, validated in CI against Rich Results and Schema.org.
4. `AggregateRating` requires review source URLs — recover them from the Google Business Profile first.

---

## 4. Local SEO

The highest-ROI channel for this business. Four named service cities, one physical location, an existing Google place record, and 14 apparently-Google reviews with no site connection.

### Google Business Profile — priority zero

| Action | Detail |
|---|---|
| **Claim and verify** | A place record exists (`place_id` decoded from the subdomain map link, resolving to *unit 117*) |
| **Resolve NAP** | ⚠️ Must match the site exactly — unit number, phone, name |
| **Categories** | Primary: *Music school*. Secondary: *Music instructor*, *Summer camp*, *Children's education* |
| **Services** | All 7 instruments + 5 programmes + camp |
| **Attributes** | Identifies-as, accessibility, languages spoken (Spanish) |
| **Photos** | Weekly cadence; showcase photography |
| **Posts** | Camp deadlines, showcase dates, enrolment windows |
| **Q&A** | Seed with the 7 site-wide FAQs |
| **Reviews** | Respond to all 14; link from the site; request from current families |

**This alone will likely outperform every on-site change in the first 90 days.**

### NAP consistency

⚠️ **Currently impossible.** Three unit numbers, two phones, two emails, four business names. Every citation, directory and schema entry blocks on gates B-5 and the NAP resolution. **This is the first SEO task and it is a business decision, not a technical one.**

### Location content

**Do not** build doorway pages (`/piano-lessons-homestead`, `/music-school-cutler-bay`). Thin city-page farms are a spam pattern and this business does not have four locations.

**Do** build genuine local signal:
- Footer service-area list — real cities only
- A "Getting here" section on `/contact` with directions from each city, parking, and the entrance
- Real community events with venue names on `/events`
- Local testimonials retained with their geography — *"Best music school in Homestead"* (Elizabeth Garcia) is a genuine local signal already in hand
- Local citations: Yelp, Apple Maps, Bing Places, Nextdoor, Miami-Dade directories, Step Up provider directory

### Step Up for Students directory

The academy is listed (or listable) as a provider. That directory is a high-intent referral source **and** an authoritative citation. ⚠️ Confirm the listing exists, that its NAP matches, and that it links to `/scholarships`.

---

## 5. Lesson page SEO

Seven pages, one template, each targeting a distinct instrument-intent cluster.

### Target queries per page

| Page | Primary | Secondary |
|---|---|---|
| `/lessons/piano` | piano lessons florida city | kids piano lessons homestead · beginner piano lessons near me |
| `/lessons/guitar` | guitar lessons florida city | guitar teacher homestead · kids guitar lessons |
| `/lessons/drums` | drum lessons for kids | drum lessons homestead · online drum lessons ⚠️ gate |
| `/lessons/bass` | bass guitar lessons | bass lessons for teens |
| `/lessons/violin` | violin lessons florida city | violin teacher for kids |
| `/lessons/ukulele` | ukulele lessons for kids | beginner ukulele lessons |
| `/lessons/voice` | singing lessons for kids | voice lessons homestead · vocal lessons for kids |

### Required content blocks

Every instrument page must carry — this is what converts thin pages into ranking pages:

1. **Start age** — extracted per instrument (5–6, 6–7, 7–8)
2. **What you need to buy** — genuine differentiator; nobody else answers this clearly
3. **What they learn in the first 12 weeks** — maps to the 90-day cycle
4. **Which programmes this instrument feeds** — private, group, band, camp
5. **Who teaches it** ⚠️ gate B-7
6. **Price or price range** ⚠️ gate B-8
7. **Subject-verified photography** — three pages currently show the wrong instrument
8. **5+ instrument-specific FAQs** with `FAQPage` schema
9. **Links to 2 related instruments** + the hub

### Fixes required at migration

- Remove all keyword-stuffed phrasing and machine-translated sentences
- Remove the live editorial notes on `/singing-lessons/`
- Replace the 20 unlinked "Contact us…" text prompts with real CTAs
- Resolve the private-vs-group contradiction — three pages assert "all lessons are private" while group pages sell the same instruments ⚠️ gate

---

## 6. Programme page SEO

The strategic centre. These pages target **problem and outcome intent**, not instrument intent — a less contested, higher-converting space.

| Page | Primary intent | Query examples |
|---|---|---|
| `/programs/90-day-stage-program` | Branded + outcome | 90 day music program · music program with recital · help my child perform |
| `/programs/private-lessons` | Format | private music lessons homestead · one on one music lessons |
| `/programs/group-lessons` | Format + social | group music classes for kids |
| `/programs/band-builders` | Teen + ensemble | kids band program · music band classes for teens |
| `/programs/early-childhood` | Age | music classes for 3 year olds · toddler music class homestead |

### The flagship page

`/programs/90-day-stage-program` should be the strongest page on the site. It currently has **no price, no testimonial, no showcase photo, and no link to its own component classes**.

Required:
- The full week structure (Weeks 1–10 / 11 / 12) as crawlable text, not only inside the animated timeline
- The Stage-Ready Guarantee in text
- The Gradual Exposure Ladder explained ⚠️ gate B-3
- Price ⚠️ gate B-8
- 3+ testimonials, prioritising the shy-child narrative
- Showcase photography and video ⚠️ none exists
- `Course` + `CourseInstance` schema
- Links to private lessons, band builders, performances, pricing, teachers

### Long-tail opportunity

Nobody in this market is answering: *"my child is too shy for music lessons"*, *"how do I get my child to perform"*, *"music lessons that build confidence"*. The extracted FAQ answer — *"That is exactly what we train for"* — is the seed of a content cluster with almost no competition and perfect commercial alignment.

---

## 7. Scholarship SEO

The most underexploited page on the site, targeting a high-intent, low-competition, statewide query set.

### Target queries

| Query type | Examples |
|---|---|
| Programme + service | step up for students music lessons · PEP scholarship music lessons |
| Special needs | unique abilities scholarship music · UA scholarship music lessons florida |
| Provider | step up for students providers homestead · music schools that accept step up |
| Procedural | how to use PEP for music lessons · what does PEP cover |
| Spanish ⚠️ | becas step up para clases de música · programa PEP música |

### Required content

The page currently has **no eligibility criteria, no application steps, no document list, and no outbound link to Step Up for Students.** It also drops the legal disclaimer the FAQ carries.

Must add:
1. Provider status ⚠️ **single legally approved sentence** — four different wordings exist today
2. The disclaimer, on this page
3. Eligibility, in plain language
4. Numbered application walkthrough with realistic timing
5. Document checklist
6. Outbound link to stepupforstudents.org (authority signal and user need)
7. What the scholarship covers and any balance
8. **Camp applicability** — never addressed
9. The inclusion promise, prominently
10. `FAQPage` schema on scholarship questions
11. Spanish version ⚠️ gate B-6
12. Replace the French stock imagery (`20240420_Impulse-Day_visuel_site`)

⚠️ **The behavioural-exclusion clause** in the camp policy sits in tension with UA positioning. Legal review before publication.

---

## 8. Camp SEO

Sharply seasonal. Search volume spikes January–May, collapses June–December.

### Target queries

`summer camp homestead` · `music camp for kids florida city` · `summer camps miami dade 2027` · `music summer camp near me` · `screen free summer camp` · `campamento de verano musical` ⚠️

### Architecture

```
/camps                          Evergreen. Ranks year-round. Never expires.
/camps/summer-jam-2027          Dated. Ranks in season. Carries all commercial detail.
/camps/summer-jam-2026          Archived, noindex, canonical → /camps
```

The current failure: **four URLs, one empty, and both 2026 sessions expired while still soliciting reservations.** The evergreen parent solves this permanently.

### Seasonal lifecycle

| Period | `/camps` state |
|---|---|
| Aug–Dec | Evergreen content + "2027 dates announced in January" + waitlist capture |
| Jan–Feb | Dates live, early-bird, `Event` schema published |
| Mar–May | Peak. Capacity indicators. Urgency. |
| Jun–Jul | "In session" state; next-year waitlist |
| Aug | Archive the dated child, publish photos, reopen waitlist |

**Automated, not manual.** The current situation — a live page selling a camp that ended a month ago — is exactly what an evergreen parent plus scheduled state transitions prevents.

### Required
`Event` + `Course` schema with real dates · **the deposit amount published** ⚠️ hard block · correct unit number ⚠️ · Step Up applicability · parent pack PDF · 2027 photography (current selling image is from 2025)

---

## 9. Internal linking

Detailed rules in `02-information-architecture.md` §9. SEO-specific additions:

### Clusters and pillars

| Cluster | Pillar | Spokes |
|---|---|---|
| Transformation | `/programs/90-day-stage-program` | private lessons, band builders, performances, about/method |
| Instruments | `/lessons` | 7 instrument pages |
| Access | `/scholarships` | PEP, UA, pricing, Spanish mirror |
| Seasonal | `/camps` | dated children |
| Trust | `/about` | teachers, performances, events, FAQ |

Every spoke links to its pillar; the pillar links to every spoke. This is the mechanism by which the site earns the head terms without stuffing them.

### Anchor text

Descriptive and varied. **No exact-match keyword phrase used as anchor text more than twice sitewide.** All banned phrases from §2 also banned as anchors.

### Orphan prevention

Build-time check: every published route must be linked from **≥2 other pages** and reachable within **3 clicks of home**. This is a CI gate, not a review step — it is precisely how `/group-music-lessons/`, `/singing-lessons/` and `/members/` went unnoticed.

---

## 10. Redirect strategy

Full map in `02-information-architecture.md` §11. SEO governance:

### Rules

1. **301 permanent** for all content moves
2. **Single hop.** No chains. Verify with a crawler pre-launch.
3. **410 Gone** for `/media_slider/*` — no equivalent exists, and a 410 removes it from the index faster than a 404
4. **Redirect to the closest equivalent**, never blanket-to-homepage. `/piano-lessons/` → `/lessons/piano`, not `/`.
5. **Retain redirects ≥ 12 months**; audit at 12 months and retain any still receiving traffic
6. **Pre-launch crawl** of the old site to catch URLs not in the sitemap — Phase 2 found orphan links (`/home`, `/contact-enroll/home`, `/members/home`) already in the markup

### Priority redirects

| Priority | URL | Reason |
|---|---|---|
| 🚨 P0 | `/summer-camp/` | Empty, indexable, ranks for camp queries, serves a blank page |
| 🚨 P0 | `/members/` | Lorem ipsum in the index and in the meta description |
| P1 | `/summercamp/` | Duplicate splitting camp authority |
| P1 | Both event URLs | Currently 404 with inbound discovery |
| P2 | All instrument and programme moves | Preserve accumulated equity |

**P0 items should be fixed on the current site immediately** — they do not need to wait for the redesign.

### Migration checklist

Baseline rankings and traffic captured · Search Console change-of-address if needed · new XML sitemap on day one · old sitemap kept 30 days · daily crawl-error monitoring for 30 days · rankings monitored 90 days · rollback plan defined

---

## 11. Content clusters and the roadmap

### Cluster 1 — Confidence & performance *(highest opportunity, near-zero competition)*
Pillar: `/programs/90-day-stage-program`
Supporting articles: *My child is too shy for music lessons* · *How performing changes a child's confidence* · *What happens at a student showcase* · *Stage fright in children: what actually helps* · *How we prepare a shy child for their first performance*

### Cluster 2 — Choosing an instrument *(high volume, decision-stage)*
Pillar: `/lessons`
Supporting: *What age can my child start [instrument]* (×7) · *Which instrument suits my child?* · *What you need to buy to start* · *Piano vs keyboard* ⚠️ resolves the keyboard question

### Cluster 3 — Scholarships & access *(low competition, high intent)*
Pillar: `/scholarships`
Supporting: *How to use PEP for music lessons* · *What UA covers* · *Music lessons for children with unique abilities* · Spanish versions ⚠️

### Cluster 4 — Local *(commercial)*
Pillar: `/contact`
Supporting: *Music lessons in Homestead* · *Getting here from Cutler Bay / Palmetto Bay* · *Summer activities for kids in South Miami-Dade*
**Genuine, non-doorway content only.**

### Cluster 5 — Parent practicalities *(retention and long-tail)*
Pillar: `/faq`
Supporting: *How much should my child practise?* · *What if we miss a lesson?* ⚠️ needs a real policy · *How to support practice at home* · *What to expect in the first month*

### Publishing cadence

**Post-launch only.** Do not build a blog before the core pages are correct — the existing failure was volume over quality. 2 articles/month for six months, prioritising Cluster 1.

---

## 12. Technical SEO

| Item | Requirement |
|---|---|
| Core Web Vitals | LCP <2.5s · INP <200ms · CLS <0.1 (target 0.00) |
| Rendering | SSR/SSG. Content must not depend on client JS. |
| Sitemap | Auto-generated, split by type, `lastmod` accurate, submitted |
| robots.txt | Explicit, sitemap referenced, staging disallowed |
| Canonicals | Self-referencing; archived camps → `/camps` |
| Pagination | `rel=next/prev` semantics on showcase archives |
| 404 | Useful, with search and top paths — **and not loading its hero from the staging domain** |
| 🚨 Staging domain | `cmscustom-staginglink2.com` referenced on 22+ pages **including the 404 template**. Third-party dependency, leaks agency infrastructure. **Must be eliminated.** |
| Images | AVIF/WebP, `srcset`, explicit dimensions, meaningful alt |
| hreflang | Reciprocal `en`/`es` + `x-default` ⚠️ gate B-6 |
| HTTPS | Enforced, HSTS |
| Subdomain | ⚠️ `try.southdademusic.com` must be retired, aligned, or `noindex`ed — it currently contradicts the main site's NAP in the index |

---

## 13. Measurement

**No analytics were observable in the Phase 2 content extraction.** A script-level audit is required *before* migration or historical data is lost.

| Layer | Requirement |
|---|---|
| Analytics | GA4 with server-side or first-party tagging; consent mode |
| Search Console | Both properties; ⚠️ subdomain too |
| Conversion events | `trial_booking_started/completed` · `camp_reservation_*` · `scholarship_enquiry` · `call_click` · `directions_click` · `whatsapp_click` ⚠️ · `showcase_rsvp` |
| **Intent segmentation** | Every conversion records source programme/page. Today one widget serves all intents, so attribution is impossible. |
| Rank tracking | 40 terms across the 5 clusters, EN + ES |
| Local | GBP insights, direction requests, calls |
| Vitals | Field data via CrUX + RUM |

### Launch KPIs (90 days)

| Metric | Baseline | Target |
|---|---|---|
| Indexed pages with unique content | ~20 of 26 | 31 of 31 |
| Pages with structured data | 0 | 31 |
| Orphan pages | 3 | 0 |
| Broken indexed URLs | 2+ | 0 |
| Pages with hand-written meta descriptions | ~22 of 26 | 100% |
| GBP reviews linked from site | 0 | 14+ |
| Attributable conversion paths | 1 undifferentiated | 6 segmented |

---

## 14. SEO decision gates

| Gate | Question | Blocks |
|---|---|---|
| **S-1** | Resolve NAP: unit, phone, email, brand name | **All structured data, GBP, every citation** |
| **S-2** | Legally approved Step Up provider wording | `/scholarships`, schema |
| **S-3** | Pricing published? | `Course`/`Offer` schema, `priceRange` |
| **S-4** | Review source URLs recoverable? | `Review` / `AggregateRating` |
| **S-5** | Bilingual at launch? | `hreflang`, `/es/` tree, Spanish clusters |
| **S-6** | Real events with dates? | `Event` schema, `/events` |
| **S-7** | Fate of `try.` subdomain | Index conflict, NAP consistency |
| **S-8** | Analytics IDs recovered before migration? | Historical continuity |

**S-1 is the blocking dependency for the entire local SEO programme** and is a business decision, not a technical one.

---

**Next:** `07-component-library.md`
