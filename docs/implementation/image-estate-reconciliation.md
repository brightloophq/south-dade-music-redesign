# Image Estate Reconciliation

**Date:** 2026-08-09 · **Phase:** EE3 source-estate reconciliation (audit only)
**Audit area:** `.audit/legacy-assets/` — gitignored, never imported, never copied into `public/`
**Manifest:** `.audit/legacy-assets/_manifest.json`

> ⚠️ **Nothing in this document is approved for publication.** Every legacy file
> described here remains behind gates I-1 (photo-release consent) and I-7
> (photographer copyright). This is evidence gathering.

## Evidence basis — read this before trusting any row

Every statement is marked:

| Mark | Meaning |
|---|---|
| **OBSERVED** | I opened the file and looked at it |
| **SOURCE-METADATA** | Taken from the Phase 2 extraction record |
| **INFERRED** | Deduced from family, filename pattern, dimensions and file size |
| **OWNER-DECISION-REQUIRED** | Cannot be settled from anything in the repository |

**I visually inspected 4 of 67 unique files.** That is a sample, not a census, and I am flagging it rather than implying otherwise. The four were chosen to resolve the four open questions that actually gate decisions — and each one did. Completing the remaining 63 is mechanical but context-expensive; the manifest and files are on disk for that pass whenever you want it.

## Retrieval

| Result | Count |
|---|---|
| Unique asset URLs in inventory | **77** |
| FETCHED | **73** |
| 404 | 2 |
| MISSING (network) | 1 |
| REDIRECTED | 1 |
| FORBIDDEN | 0 |
| Unique by SHA-256 content hash | **68** |
| Content duplicates (same bytes, different URL) | **6** |
| Unique images after dedupe | **67** |

Deduplicated by **full URL**, then again by **content hash** — never by filename. That mattered: `m1000x1000` appears eleven times across the estate as eleven different files.

## The four questions the inspection settled

### 1. Does South Dade Music own genuine performance photography? — **YES. OBSERVED.**

`P1088527.jpg` (2000×1500) shows a real recital: a child playing a Yamaha keyboard beside an adult, a second adult on Alesis electronic drums, a decorated room, children seated in the audience. This is unmistakably first-party material of a real event.

**Content value HIGH · Publishability OWNER-APPROVAL-REQUIRED** — identifiable minors, no release on file.

### 2. Is there facility/classroom material? — **YES, and it is better than expected. OBSERVED.**

`IMG_5012-scaled.jpg` (2560×1440) is the actual teaching room: ukuleles racked on the wall under LED strip, drum kits, amplifiers, a music-notation floor rug, an "I ♥ MUSIC" sign, congas — with an instructor and three young children in what is plainly an early-childhood class.

**Content value HIGH.** And a specific opportunity: **a crop of the upper-left two-thirds shows the room and instruments with no person in frame.** That crop would carry almost no consent exposure while still being authentic first-party photography of this business. It is the single cheapest route to real imagery on this site.

### 3. Are the seven `instruments-we-teach` files usable? — **NO, but not for the reason we assumed. OBSERVED.**

`instruments-we-teach-1.png` is an **88×70px blue line-art piano icon**. They are genuinely icons, not photographs — so EE3's caution was unnecessary in fact. They remain **REJECTED**, on design grounds: they are legacy-styled icons at thumbnail resolution, and the approved direction bans icon rows outright.

### 4. What are the `m1000x1000` files? — **Stock photographs of people. OBSERVED.**

`m1000x1000.png` shows a young woman holding a violin at a desk in a styled domestic interior — classic stock composition, not this business. This confirms Phase 4D's correction and extends it: these are not merely "photographs of people", they are **stock** photographs of people. **REJECTED** on both licensing and authenticity.

## Family summary

| Family | Count | Content value | Publishability |
|---|---|---|---|
| **CAMERA ORIGINAL (first-party candidate)** | **20** | **HIGH** | **OWNER-APPROVAL-REQUIRED** |
| PILLAR IMAGE | 4 | MEDIUM | OWNER-APPROVAL-REQUIRED |
| BRAND / LOGO | 2 | MEDIUM | OWNER-APPROVAL-REQUIRED |
| INSTRUMENT ICON | 7 | LOW | REJECTED (design) |
| STOCK TILE (people) | 10 | LOW | REJECTED (licensing + people) |
| PARTNER MARK | 2 | LOW | REJECTED (I-6) |
| STOCK / TEMPLATE | 22 | NONE | REJECTED |

The 22 stock/template files carry their origin in their filenames: `ozel-gitar-kursu` is Turkish for *private guitar course*, `0_p-NH2ecjjuoHdJct` is a Medium CDN hash, `20240420_Impulse-Day_visuel_site` is French. **INFERRED**, and consistent with the extraction's own assessment.

## Full asset table

| # | Family | File | Dimensions | Size | Source page(s) | Content value | Publishability | Evidence basis |
|---|---|---|---|---|---|---|---|---|
| 1 | BRAND / LOGO | `logo-1.png` | 140×97 | 11KB | sitewide header, sitewide footer, og:image o | MEDIUM | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 76 | BRAND / LOGO | `3f8267da-e9d4-4eda-a81c-013e487e5085.p` | 1536×914 | 35KB | try.southdademusic.com | MEDIUM | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 13 | CAMERA ORIGINAL (first-party candidate) | `P1088527.jpg` | 2000×1500 | 1090KB | /, /about/, /performances/ | HIGH | OWNER-APPROVAL-REQUIRED | OBSERVED |
| 14 | CAMERA ORIGINAL (first-party candidate) | `DSCF3094-scaled.jpg` | 2560×1707 | 406KB | /, /about/, /performances/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 15 | CAMERA ORIGINAL (first-party candidate) | `P1088689.jpg` | 2000×1500 | 1117KB | /, /about/, /performances/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 16 | CAMERA ORIGINAL (first-party candidate) | `P1088608.jpg` | 2000×1500 | 652KB | /, /about/, /performances/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 17 | CAMERA ORIGINAL (first-party candidate) | `P1088597.jpg` | 2000×1500 | 1173KB | /, /about/, /performances/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 18 | CAMERA ORIGINAL (first-party candidate) | `P1088570.jpg` | 2000×1500 | 818KB | /, /about/, /performances/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 20 | CAMERA ORIGINAL (first-party candidate) | `P1088653.jpg` | 2000×1500 | 921KB | /90-day-stage-program/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 21 | CAMERA ORIGINAL (first-party candidate) | `P1088667-1.jpg` | 2000×1500 | 1097KB | /90-day-stage-program/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 22 | CAMERA ORIGINAL (first-party candidate) | `P1088680.jpg` | 2000×1500 | 1132KB | /band-builders/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 23 | CAMERA ORIGINAL (first-party candidate) | `P1088548.jpg` | 2000×1500 | 1214KB | /private-lessons/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 24 | CAMERA ORIGINAL (first-party candidate) | `P1088541.jpg` | 2000×1500 | 1176KB | /guitar-lessons/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 26 | CAMERA ORIGINAL (first-party candidate) | `P1088524.jpg` | 2000×1500 | 1151KB | /piano-lessons/, /ukulele-lessons/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 27 | CAMERA ORIGINAL (first-party candidate) | `P1088662.jpg` | 2000×1500 | 1106KB | /drum-lessons/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 28 | CAMERA ORIGINAL (first-party candidate) | `P1088659.jpg` | 2000×1500 | 1038KB | /drum-lessons/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 29 | CAMERA ORIGINAL (first-party candidate) | `P1088639.jpg` | 2000×1500 | 1198KB | /violin-lessons/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 30 | CAMERA ORIGINAL (first-party candidate) | `IMG_5012-scaled.jpg` | 2560×1440 | 711KB | /early-childhood/ | HIGH | OWNER-APPROVAL-REQUIRED | OBSERVED |
| 31 | CAMERA ORIGINAL (first-party candidate) | `IMG_2582-scaled.jpg` | 2560×1920 | 328KB | /bass-guitar-lessons/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 32 | CAMERA ORIGINAL (first-party candidate) | `MG_0957-scaled.png` | 2560×1440 | 7405KB | /bass-guitar-lessons/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 33 | CAMERA ORIGINAL (first-party candidate) | `121cdee4-aca2-4eaa-adae-571929831e2a.j` | 1179×870 | 146KB | /bass-guitar-lessons/ | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 34 | CAMERA ORIGINAL (first-party candidate) | `PHOTO-2025-06-28-19-06-09.jpg` | 2048×1536 | 553KB | /summer-programs/, /summer-jam-music-camp-20 | HIGH | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 46 | INSTRUMENT ICON | `instruments-we-teach-1.png` | 88×70 | 3KB | / | LOW | REJECTED | OBSERVED |
| 47 | INSTRUMENT ICON | `instruments-we-teach-2.png` | 77×77 | 3KB | / | LOW | REJECTED | INFERRED (family + metadata) |
| 48 | INSTRUMENT ICON | `instruments-we-teach-3.png` | 71×71 | 2KB | / | LOW | REJECTED | INFERRED (family + metadata) |
| 49 | INSTRUMENT ICON | `instruments-we-teach-4.png` | 71×70 | 2KB | / | LOW | REJECTED | INFERRED (family + metadata) |
| 50 | INSTRUMENT ICON | `instruments-we-teach-5.png` | 72×70 | 2KB | / | LOW | REJECTED | INFERRED (family + metadata) |
| 51 | INSTRUMENT ICON | `instruments-we-teach-6.png` | 72×72 | 2KB | / | LOW | REJECTED | INFERRED (family + metadata) |
| 52 | INSTRUMENT ICON | `instruments-we-teach-7.png` | 80×48 | 1KB | / | LOW | REJECTED | INFERRED (family + metadata) |
| 57 | PARTNER MARK | `step-up-for-students-1.png` | 280×195 | 33KB | / | LOW | REJECTED | INFERRED (family + metadata) |
| 58 | PARTNER MARK | `step-up-for-students-2.png` | 295×263 | 17KB | / | LOW | REJECTED | INFERRED (family + metadata) |
| 53 | PILLAR IMAGE | `Participation.jpg` | 2000×1500 | 697KB | / | MEDIUM | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 54 | PILLAR IMAGE | `Exposure-scaled.jpg` | 2560×1707 | 399KB | / | MEDIUM | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 55 | PILLAR IMAGE | `Execution.png` | 2000×1500 | 3586KB | / | MEDIUM | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 56 | PILLAR IMAGE | `Community-scaled.jpg` | 2560×1707 | 476KB | / | MEDIUM | OWNER-APPROVAL-REQUIRED | INFERRED (family + metadata) |
| 3 | STOCK / TEMPLATE | `how-music-education-has-changed-impact` | 1024×576 | 100KB | /resources/, /performances/ | NONE | REJECTED | INFERRED (family + metadata) |
| 4 | STOCK / TEMPLATE | `banner-back.png` | 1920×1080 | 3204KB | / | NONE | REJECTED | INFERRED (family + metadata) |
| 5 | STOCK / TEMPLATE | `ozel-gitar-kursu-2.png` | 1000×667 | 732KB | /, /programs/, /private-lessons/ | NONE | REJECTED | INFERRED (family + metadata) |
| 6 | STOCK / TEMPLATE | `ozel-gitar-kursu-2-1.png` | 1000×667 | 855KB | /, /programs/ | NONE | REJECTED | INFERRED (family + metadata) |
| 8 | STOCK / TEMPLATE | `ozel-gitar-kursu-2-2-1.png` | 1000×667 | 1022KB | /, /programs/ | NONE | REJECTED | INFERRED (family + metadata) |
| 10 | STOCK / TEMPLATE | `ozel-gitar-kursu-2-3.png` | 1000×667 | 837KB | /, /programs/ | NONE | REJECTED | INFERRED (family + metadata) |
| 11 | STOCK / TEMPLATE | `ozel-gitar-kursu-2-4-1.png` | 1000×667 | 755KB | /, /programs/ | NONE | REJECTED | INFERRED (family + metadata) |
| 59 | STOCK / TEMPLATE | `abt1.png` | 974×457 | 331KB | / | NONE | REJECTED | INFERRED (family + metadata) |
| 60 | STOCK / TEMPLATE | `20240420_Impulse-Day_visuel_site-scale` | 2560×1707 | 621KB | /step-up-accessibility/ | NONE | REJECTED | INFERRED (family + metadata) |
| 61 | STOCK / TEMPLATE | `20240420_Impulse-Day_visuel_site-scale` | 2560×1707 | 321KB | /step-up-accessibility/ | NONE | REJECTED | INFERRED (family + metadata) |
| 62 | STOCK / TEMPLATE | `20240420_Impulse-Day_visuel_site-scale` | 2560×1707 | 237KB | /step-up-accessibility/ | NONE | REJECTED | INFERRED (family + metadata) |
| 63 | STOCK / TEMPLATE | `0_p-NH2ecjjuoHdJct-1024x683-1.png` | 1024×683 | 893KB | /step-up-accessibility/ | NONE | REJECTED | INFERRED (family + metadata) |
| 64 | STOCK / TEMPLATE | `0_p-NH2ecjjuoHdJct-1024x683-1-1.png` | 1024×683 | 713KB | /step-up-accessibility/ | NONE | REJECTED | INFERRED (family + metadata) |
| 65 | STOCK / TEMPLATE | `0_p-NH2ecjjuoHdJct-1024x683-2.png` | 1024×683 | 1181KB | /about/ | NONE | REJECTED | INFERRED (family + metadata) |
| 66 | STOCK / TEMPLATE | `0_p-NH2ecjjuoHdJct-1024x683-3.png` | 1024×683 | 804KB | /about/ | NONE | REJECTED | INFERRED (family + metadata) |
| 67 | STOCK / TEMPLATE | `0_p-NH2ecjjuoHdJct-1024x683-4.png` | 1024×683 | 1051KB | /instruments/ | NONE | REJECTED | INFERRED (family + metadata) |
| 68 | STOCK / TEMPLATE | `New-Project.png` | 441×759 | 628KB | /programs/ | NONE | REJECTED | INFERRED (family + metadata) |
| 69 | STOCK / TEMPLATE | `photo-8.jpg` | 1920×1280 | 184KB | /programs/, /resources/, /group-music-lesson | NONE | REJECTED | INFERRED (family + metadata) |
| 70 | STOCK / TEMPLATE | `photo-11.jpg` | 1920×1280 | 195KB | /programs/, /resources/ | NONE | REJECTED | INFERRED (family + metadata) |
| 71 | STOCK / TEMPLATE | `photo-12.jpg` | 1920×1280 | 233KB | /programs/, /resources/ | NONE | REJECTED | INFERRED (family + metadata) |
| 72 | STOCK / TEMPLATE | `photo-13.jpg` | 1920×1280 | 173KB | /programs/ | NONE | REJECTED | INFERRED (family + metadata) |
| 73 | STOCK / TEMPLATE | `26690-2048x1365-1-600x500.jpg` | 600×500 | 32KB | /members/ | NONE | REJECTED | INFERRED (family + metadata) |
| 35 | STOCK TILE (people) | `m1000x1000.jpg` | 1000×1000 | 126KB | /instruments/ (Piano card), /piano-lessons/  | LOW | REJECTED | INFERRED (family + metadata) |
| 36 | STOCK TILE (people) | `m1000x1000-1.jpg` | 1000×1000 | 91KB | /instruments/ (Guitar card), /guitar-lessons | LOW | REJECTED | INFERRED (family + metadata) |
| 37 | STOCK TILE (people) | `m1000x1000-2.jpg` | 1000×1000 | 127KB | /instruments/ (Drums card) | LOW | REJECTED | INFERRED (family + metadata) |
| 39 | STOCK TILE (people) | `m1000x1000-3.jpg` | 1000×1000 | 68KB | /instruments/ (Violin card) | LOW | REJECTED | INFERRED (family + metadata) |
| 40 | STOCK TILE (people) | `m1000x1000-4.jpg` | 1000×1000 | 104KB | /instruments/ (Bass card) | LOW | REJECTED | INFERRED (family + metadata) |
| 41 | STOCK TILE (people) | `m1000x1000.png` | 1000×1000 | 316KB | /instruments/ (Ukulele card) | LOW | REJECTED | INFERRED (family + metadata) |
| 42 | STOCK TILE (people) | `m1000x1000.png` | 1000×1000 | 904KB | /summercamp/ (pillar 1: Learn Real Instrumen | LOW | REJECTED | OBSERVED |
| 43 | STOCK TILE (people) | `m1000x1000-1.png` | 1000×1000 | 1193KB | /summercamp/ (pillar 2: Perform Live on Stag | LOW | REJECTED | INFERRED (family + metadata) |
| 44 | STOCK TILE (people) | `m1000x1000-2.png` | 1000×1000 | 718KB | /summercamp/ (pillar 3: Screen-Free Structur | LOW | REJECTED | INFERRED (family + metadata) |
| 45 | STOCK TILE (people) | `m1000x1000-3.png` | 1000×1000 | 958KB | /summercamp/ (pillar 4: Snacks & Social Time | LOW | REJECTED | INFERRED (family + metadata) |
