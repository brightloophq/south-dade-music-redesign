# Phase 2 Extraction Report

**Site:** southdademusic.com
**Extraction date:** 2026-08-05
**Method:** Firecrawl scrape only (markdown + links formats)
**Pages attempted:** 28 · **Successful:** 26 · **Broken:** 2

---

## 1. Pages successfully scraped (26)

**Main pages (8)**
`/` · `/about/` · `/programs/` · `/instruments/` · `/contact-enroll/` · `/resources/` · `/performances/` · `/step-up-accessibility/`

**Lesson pages (9)**
`/private-lessons/` · `/group-music-lessons/` · `/piano-lessons/` · `/guitar-lessons/` · `/bass-guitar-lessons/` · `/drum-lessons/` · `/violin-lessons/` · `/ukulele-lessons/` · `/singing-lessons/`

**Program pages (7)**
`/90-day-stage-program/` · `/early-childhood/` · `/band-builders/` · `/summer-programs/` · `/summer-jam-music-camp-2026/` · `/summer-camp/` · `/summercamp/`

**Supporting (2)**
`/members/` · `try.southdademusic.com` (redirects to `/offer-page`)

All 26 saved as cleaned Markdown in `source-pages/`.

---

## 2. Pages skipped / inspected only (2)

| URL | Finding | Action |
|---|---|---|
| `/media_slider/` | Header + footer only. No body content, no media references. | **Excluded** — no unique media or useful content |
| `/media_slider/slider/` | Header + footer only. Single CPT post titled "Slider". | **Excluded** — same |

Both were inspected as instructed and confirmed to hold nothing worth keeping. Documented in `manifest.json` under `inspectedNotMigrated` and in `duplicate-routes.md`.

No WordPress admin, feeds, or media attachment pages were scraped.

---

## 3. Pages blocked

**None.** No robots restrictions, paywalls, bot blocks, or authentication were encountered. Firecrawl rate limiting (10 req/min) slowed the run but blocked nothing; all failed calls were retried successfully.

---

## 4. Broken routes (2)

| URL | Status | Was |
|---|---|---|
| `/event/bazaar-and-flea-market-performance` | **404** | "Bazaar and Flea Market Performance — March 15, 2025 @ 10:00 am" |
| `/events/month/2025-03/` | **404** | "Events for March 2025 – South Dade Music Academy" |

The Events Calendar plugin appears to have been removed while its URLs stayed in the sitemap. Both were returned by Phase 1 mapping, so both remain discoverable.

**Consequence:** the site now has **zero event records**, despite a brand promise built entirely on live performance.

**Secondary loss:** the March 2025 archive's index snippet referenced **Instagram** — the only evidence of a social profile anywhere in the estate.

---

## 5. Duplicate routes

| Type | Detail |
|---|---|
| **Full page duplicates** | `/summercamp/` ≡ `/summer-jam-music-camp-2026/` — identical dates, prices, capacity, 9 FAQs, refund policy |
| **Empty duplicate** | `/summer-camp/` — HTTP 200, indexable, **zero body content** |
| **Near-duplicate templates** | `/bass-guitar-lessons/` ↔ `/ukulele-lessons/` — 5 sections + 2 FAQs verbatim identical |
| **Component duplication** | Testimonial block renders **18 cards for 12 reviews**, on 5 pages. Homepage program-card grid renders the same 5 cards **3×**. |
| **Content-set duplication** | 7-item site FAQ on `/` and `/resources/`; 9-item camp FAQ on both camp pages |
| **Route fragmentation** | **4 URLs for 1 summer product**, in 4 different states of completeness |
| **Asset duplication** | 14 duplicate uploads across month folders; multiple `m1000x1000` filename collisions |

Full analysis in `duplicate-routes.md`.

---

## 6. Content inventory

| Item | Count |
|---|---|
| Unique testimonials | **14** (12 main site + 2 unique to subdomain) |
| Total testimonial renders | 111 |
| Unique FAQs | **40** (7 site-wide + 9 camp + 24 page-level) |
| Distinct images | **62** |
| Genuine in-house photographs | 18 |
| Stock / template assets | 26 |
| Third-party trademarks | 2 (Step Up for Students logos) |
| **Videos** | **0** |
| **PDFs / downloadable documents** | **0** |
| **Native forms on site** | **0** |
| External systems detected | 6 |

---

## 7. External systems detected

| System | Role | Confidence |
|---|---|---|
| **LeadConnector / HighLevel** (`link.apisystem.tech`) | Sole lead-capture widget, every page, all intents | High |
| **LeadConnector funnel** (`try.southdademusic.com`) | Second, disconnected property | High |
| **WordPress 7.0.2 + WPBakery + AIOSEO 4.9.9** | CMS stack | High |
| **Google Maps / Business Profile** | Map on subdomain only; place_id confirms a GBP record | High / Medium |
| **`cmscustom-staginglink2.com`** | Agency **staging server** serving production hero images on 22+ pages | High |
| **`s.w.org`** | WordPress emoji CDN on 5 pages | High |

**Not observed:** any payment system, analytics, Meta Pixel, video platform, email marketing tool, or social link.

⚠️ **Scope limit:** this was a content extraction. Client-side `<script>` tags were not enumerated, so absence of analytics/pixels is *not proven* — a tag-level audit is required before migration or historical data will be lost.

Full detail in `external-integrations.json`.

---

## 8. Conflicts requiring owner confirmation

**22 distinct conflicts** documented in `content-conflicts.md`. The critical ones:

| # | Conflict | Variants |
|---|---|---|
| 🔴 | **Address** | Unit **117** / **1157** / **115** |
| 🔴 | **Phone** | 786-753-9509 / +1-786-386-1982 |
| 🔴 | **Business name** | South Dade Music / …Academy / SDMA / …LLC |
| 🔴 | **Private vs group** | 6 pages say "all lessons are private"; 6 pages sell group |
| 🔴 | **Lesson frequency** | "two classes weekly" vs "one lesson per week" (×7 pages) |
| 🔴 | **Program duration** | 90 days / 12 weeks / "about three months" |
| 🔴 | **Performance promise** | "every student performs" vs "gets the chance to" vs "may" |
| 🔴 | **Prices** | Only camp is priced; flagship program has no published tuition |
| 🔴 | **Step Up status** | 4 different formulations; disclaimer missing from the scholarship page |
| 🔴 | **Choirs & orchestras** | Claimed on `/resources/`; contradicted or absent everywhere else |
| 🟠 | **Trial terms** | $25 spot-hold (2 pages) vs unpriced (24 pages) |
| 🟠 | **Instructor credentials** | "university-trained" (subdomain only) vs no claim (main site) |
| 🟠 | **Bilingual support** | "full bilingual support" claimed; zero Spanish content exists |
| 🟠 | **Online lessons** | Claimed on `/drum-lessons/` only |

---

## 9. Missing information required before redesign

**Commercial (blocks the enrolment flow)**
1. Tuition for every program — only camp is priced
2. **The camp down payment amount** — non-refundable, "required today", figure never stated
3. Lesson length (30/45/60 min) — never stated anywhere
4. Lesson cancellation / make-up policy — `/piano-lessons/` advertises "supportive make-up policies" that are not published
5. Whether PEP/UA apply to camp
6. Sibling / multi-lesson discounts
7. How camp deposits are actually collected — no payment system exists on-site

**Trust & proof**
8. Instructor names, bios, credentials — **not one teacher is named on the site**
9. Real event history and the showcase calendar — both event URLs 404
10. **Video** — zero across 26 pages, for a performance-first brand
11. Social profiles — none linked; Instagram appears lost in migration
12. Google Business Profile link and review corpus

**Operational**
13. Correct address, phone, email, and hours
14. Scholarship eligibility criteria and application steps
15. Whether choirs/orchestras exist
16. Whether online lessons exist
17. Whether bilingual support exists operationally

**Rights & access**
18. Photo-release consent for identifiable minors (all 18 real photos)
19. Licensing for third-party stock (Turkish, French, Medium-CDN filenames)
20. Step Up for Students logo usage rights
21. HighLevel account ownership — it holds the lead database
22. Analytics/pixel measurement IDs

**Content production needed**
23. Real photography for all 7 instruments (3 pages currently show the wrong instrument)
24. Spanish translations if the bilingual claim is to stand
25. Downloadable parent handbook, camp packet, medical/consent forms — none exist

---

## 10. Recommended canonical page list

**Core (P0 — must exist at launch)**

| Route | Source |
|---|---|
| `/` | `/` |
| `/about` | `/about/` + instructor bios (new) |
| `/programs` | `/programs/` |
| `/programs/90-day-stage-program` | `/90-day-stage-program/` |
| `/programs/private-lessons` | `/private-lessons/` |
| `/programs/group-lessons` | `/group-music-lessons/` (de-orphaned, notes stripped) |
| `/programs/band-builders` | `/band-builders/` |
| `/programs/early-childhood` | `/early-childhood/` |
| `/lessons` | `/instruments/` |
| `/lessons/piano` · `/guitar` · `/drums` · `/bass` · `/violin` · `/ukulele` · `/voice` | 7 instrument pages (`/voice` de-orphaned) |
| `/camps` | `/summer-programs/` evergreen prose |
| `/camps/summer-jam-<year>` | `/summer-jam-music-camp-2026/` pattern |
| `/scholarships` | `/step-up-accessibility/` + application steps (new) |
| `/performances` | `/performances/` + real event records (new) |
| `/faq` | `/resources/` |
| `/contact` | `/contact-enroll/` + a real form, map and hours (new) |

**Do not migrate (P3)**

| Route | Reason |
|---|---|
| `/summer-camp/` | Empty stub — redirect urgently |
| `/summercamp/` | Full duplicate — salvage 4 icons, redirect |
| `/members/` | Lorem ipsum; no portal exists |
| `/media_slider/`, `/media_slider/slider/` | No content; de-register the CPT |
| `/event/…`, `/events/month/…` | Already 404 |

**Separate decision:** `try.southdademusic.com` — retire, align, or keep as an isolated paid-traffic LP. It should not stay live contradicting the main site.

**New pages the current site lacks:** instructor/team page, pricing page, events calendar, Spanish versions, policies/handbook, parent portal (only when real).

---

## 11. Immediate fixes recommended on the *current* site

Independent of the redesign, these are live defects:

1. 🚨 **Lorem ipsum indexable** on `/members/` and published into its meta description
2. 🚨 **Editorial notes visible to visitors** — "Internal Links to Add:" on `/group-music-lessons/` and `/singing-lessons/`
3. 🚨 **`/summer-camp/` empty and indexable**
4. 🚨 **Expired camp still selling** — both 2026 sessions ended; pages still say "Secure your child's place"
5. 🚨 **Staging-domain dependency** on 22+ pages
6. **Wrong hero images** on violin, ukulele and singing pages — correct files already exist in the media library
7. **Dead CTAs** at the foot of 6 instrument pages
8. **"Enroll Now"** on `/summercamp/` leading to a formless page
9. **Typos** — "Class mein performance", "Exceution", "Frequent Perfromances"

---

## 12. Method notes & limitations

- **Firecrawl only**, as instructed. No other crawler, browser automation, or manual browsing.
- Formats: `markdown` + `links`; `onlyMainContent: false` on `/`, `/contact-enroll/`, `/members/` and the subdomain to capture header/footer data; `true` elsewhere.
- **No project files were modified** outside `docs/source-content/`.
- **No marketing copy was rewritten.** All quoted claims are verbatim.
- **No facts were invented.** Where a source is silent, files record `null` and say so.
- **Conflicts were flagged, never silently resolved.**
- Image dimensions derive from filename suffixes only — images were not downloaded or measured.
- Rendered content only; `<script>`-level tags were not enumerated, so analytics/pixel absence is unproven.
- The two 404 pages' original content is reconstructed **only** from Phase 1 index metadata and is explicitly marked unverified.
