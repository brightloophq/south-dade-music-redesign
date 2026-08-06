# 03 — Content Inventory

Source: `docs/source-content/manifest.json` — 28 pages scraped 2026-08-05 from
`southdademusic.com`, plus one lead-generation subdomain.

---

## 1. Current sitemap — proposed route map

`P0` = must exist at launch · `P1` = should · `P2` = evaluate · `P3` = retire

| New route | Pri | Old URL | Note |
|---|---|---|---|
| `/` | P0 | `/` | **Built** |
| `/about` | P0 | `/about/` | |
| `/programs` | P0 | `/programs/` | |
| `/lessons` | P0 | `/instruments/` | |
| `/contact` | P0 | `/contact-enroll/` | |
| `/faq` | P0 | `/resources/` | |
| `/scholarships` | P0 | `/step-up-accessibility/` | |
| `/performances` | P1 | `/performances/` | Duplicates the homepage gallery + copy |
| `/programs/90-day-stage-program` | P0 | `/90-day-stage-program/` | Flagship |
| `/programs/private-lessons` | P0 | `/private-lessons/` | |
| `/programs/band-builders` | P0 | `/band-builders/` | |
| `/programs/early-childhood` | P0 | `/early-childhood/` | |
| `/programs/group-lessons` | P1 | `/group-music-lessons/` | |
| `/lessons/piano` | P0 | `/piano-lessons/` | |
| `/lessons/guitar` | P0 | `/guitar-lessons/` | |
| `/lessons/drums` | P0 | `/drum-lessons/` | |
| `/lessons/violin` | P0 | `/violin-lessons/` | |
| `/lessons/voice` | P0 | `/singing-lessons/` | |
| `/lessons/bass` | P1 | `/bass-guitar-lessons/` | Near-duplicate of ukulele — 5 sections verbatim |
| `/lessons/ukulele` | P1 | `/ukulele-lessons/` | Near-duplicate of bass — 5 sections verbatim |
| `/camps/summer-jam` | P0 | `/summer-jam-music-camp-2026/` | |
| `/camps` | P1 | `/summer-programs/` | Publishes no dates and no price |
| — | P3 | `/summercamp/` | Duplicate of the camp page |
| — | P3 | `/summer-camp/` | Duplicate of the camp page |
| — | P3 | `/members/` | |
| — | P3 | `/event/bazaar-and-flea-market-performance` | 404s |
| — | P3 | `/events/month/2025-03/` | 404s |
| — | P2 | `try.southdademusic.com/offer-page` | Separate lead-gen subdomain |

**28 routes. Only `/` is built.** All 28 other link targets in the navigation
currently 404 — including `/contact/book-a-trial`, the primary conversion CTA.

## 2. Duplicate-content problem

Four summer-camp routes describe **one product.** Two instrument pages share
five sections verbatim. `/performances/` reproduces the homepage gallery.

The extraction recommends a single canonical camp route with the others
redirected. This matters to design because it collapses four navigation entries
into one.

## 3. Programs — ✅ all verified names

Six products:

1. **90-Day Stage Program** — flagship
2. **Private Lessons**
3. **Band Builders**
4. **Early Childhood**
5. **Group Music Lessons**
6. **Summer Programs / Summer Jam Music Camp**

## 4. Instruments — ✅ all verified names

Eight, of which seven have their own page:

**Piano · Guitar · Drums · Bass Guitar · Violin · Ukulele · Voice / Singing**

Plus **Keyboard**, which is sold on the hub page but has no page of its own.

✅ Verified starting ages: piano *around age 5 or 6* · guitar *around age 6 or
7* · drums *around age 5 or 6* · violin *around age 5 or 6*.

⚠️ **Three instrument pages show the wrong instrument** in their hero image
today — violin shows a guitar, ukulele shows a piano, singing shows a guitar —
even though correct images exist in the media library.

## 5. Testimonials — 14 unique

✅ All 14 read as genuine third-party reviews: varied voice, real typos, mixed
languages, specific names. Probable source is Google Business Profile.

**Defects in the current presentation:**

- **12 reviews are rendered 18 times per page** across 5 pages — a slider
  misconfiguration, not an editorial choice
- **No star ratings, no dates, no platform attribution** anywhere on the main
  site
- **No aggregate rating** or review structured data
- Three performance-specific testimonials do **not** appear on
  `/performances/`, the page they would most support

**Three testimonials name minors** — Aaron, Dexter, Michael Munroe. ⚠️ These
require consent or redaction before publication.

**Testimonials are the only place any instructor is named:**
Mr./Professor Lopez (5 reviews), Professor Joshua (1), Alberto (1). The site
itself never names or introduces a single teacher (⚠️ gate **B-7**).

## 6. FAQs

Held in `docs/source-content/faqs.json`. The homepage FAQ and `/resources/`
carry substantially the same set. Two FAQ answers are the **sole source** of the
$25 trial terms and of the "two classes weekly" frequency claim — both of which
conflict with other pages. See `05-business-claims-and-gates.md`.

## 7. Scholarships — ✅ verified

**Step Up for Students**, a state-supported scholarship programme. Two streams
are accepted:

- **PEP** — Personalized Education Program: *"supports families who choose
  flexible, customized learning options for their children"*
- **UA** — Unique Abilities: *"provides support for students with special needs,
  allowing access to enriching programs in a supportive environment"*

✅ Verbatim disclaimer, from `/resources/` and the homepage FAQ:

> Please note that these scholarships are administered and awarded by Step Up
> for Students, not by South Dade Music.

⚠️ That disclaimer is **absent from `/step-up-accessibility/`**, the dedicated
scholarship page — the one place it matters most.

⚠️ **Gate B-8 / I-6.** Four different phrasings of the partnership status exist,
ranging from *"Approved Step Up for Students provider"* to *"works within the
Step Up framework."* These are materially different claims. Eligibility criteria,
application steps, required documents and coverage amounts are never stated
anywhere, and no link to `stepupforstudents.org` exists.

## 8. Contact details — conflicted

| Field | Value | Status |
|---|---|---|
| Street | 601 W Palm Dr, Florida City, FL 33034 | ✅ agreed across all sources |
| Unit | **117** / **1157** / **115** | ⚠️ gate **I-8** — three variants |
| Phone | 786-753-9509 | ✅ sitewide |
| Phone (subdomain) | +1-786-386-1982 | ⚠️ conflict |
| Email | info@southdademusic.com | ✅ sitewide footer |
| Email (contact page) | contact@southdademusic.com | ⚠️ conflict |
| Hours | Mon–Sat 8:00am–6:00pm, Sun closed | ✅ footer only |

⚠️ Unit **117** has the strongest evidence — the contact page *and* the Google
Maps place record. But **1157** is what the camp pages tell parents, and that is
where they would drive for drop-off.

⚠️ Instrument pages promise *"After-school and evening availability"*, which the
published 6:00pm closing time does not support.

## 9. Social media

**Zero social links exist anywhere on the live site.** No Instagram, Facebook,
YouTube, TikTok, WhatsApp or Google Business Profile link.

The homepage CTA block says *"Call, text, or WhatsApp"* — but no WhatsApp link
is present.

**Design implication:** do not design a social row until profiles are recovered
from the owner. Designing one invites placeholder icons that will ship empty.
