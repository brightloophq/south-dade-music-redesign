# Asset Recovery Report

**Date:** 2026-08-08 · **Phase:** 4D
**Revised:** 2026-08-09 (Phase 4 hardening — see the correction below)
**Source:** `docs/source-content/assets-inventory.json` — 62 distinct assets
**Provenance record:** `docs/implementation/recovered-assets-provenance.json`
**Net result:** **0 assets retained.** `public/images/recovered/` no longer exists.

---

## ⛔ CORRECTION — 2026-08-09

**The original version of this report was wrong about what it had recovered, in
the one way that mattered most.**

It stated *"No image of any person exists anywhere in this repository"* and
described four of the five recovered files as **camp pillar icons**. Both claims
were false. The five files were retrieved on filename and URL evidence alone —
**nobody opened them.** Reviewed visually during the Phase 4 hardening pass, all
five turned out to be **photographs of identifiable people**, and two of them
**include identifiable children**.

**All five binaries have been deleted** and `public/images/recovered/` has been
removed. The provenance record survives, corrected, at
`docs/implementation/recovered-assets-provenance.json` — under `docs/`, so that
nothing it describes is deployable.

**What was never at risk:** no page ever referenced these files, and **zero
`<img>` elements render across all 27 routes** — verified before and after. The
exposure was that the files sat in `public/`, where any deployment would serve
them at a guessable URL regardless of whether a page linked them.

**The lesson worth keeping:** a filename is not a description. `m1000x1000.png`
is not an icon just because it is 1000×1000 and sits next to three siblings.
**Any future asset recovery must include opening every file before it is
described, retained, or recommended.**

---

## ⚠️ The finding: the staging domain is already dead

The audit flagged `cmscustom-staginglink2.com` as a risk because the business
does not control it. **That risk has already materialised:**

```
https://cmscustom-staginglink2.com/                    HTTP 403
…/2026/01/how-music-education-has-changed-….jpg        HTTP 404
```

**22+ pages of the live site load their hero image from that domain.** Those
pages are serving a broken image right now, today, in production.

The same file still exists on the business's own `wp-content` and was recovered
from there. **Launch no longer depends on a domain the business does not own.**

---

## What was retrieved, and what it actually was — 5 files, all deleted

| Former file | What it actually is | People? | Children? | Licensing | Status |
|---|---|---|---|---|---|
| `camp-pillar-1-…png` | Photograph — identifiable young woman holding a violin | **Yes** | No | **Not established** | **DELETED** |
| `camp-pillar-2-…png` | Photograph — identifiable performers on a lit stage | **Yes** | No | **Not established** | **DELETED** |
| `camp-pillar-3-…png` | Close-up portrait — face fills the frame | **Yes** | No | **Not established** | **DELETED** |
| `camp-pillar-4-…png` | Photograph — four identifiable young people at a table | **Yes** | Possible, not verifiable | **Not established** | **DELETED** |
| `legacy-shared-hero-…jpg` | Photograph — a lesson room of identifiable **young children** with adults | **Yes** | **Yes** | **Not established** | **DELETED** |

**None of these is an icon or an atmospheric asset.** They are legacy WordPress
uploads: a folder that mixes business-owned files with stock and template
imagery of unknown origin. Presence in that folder establishes no right to
republish, and no release, model consent or photographer permission is on file
for any person shown.

**These are not the academy's own 18 performance photographs.** Those remain
undownloaded under gates I-1 and I-7. The files above are people unconnected to
the academy, which is a **licensing and third-party-likeness** problem rather
than a student-consent one. Neither category is publishable today.

Byte counts and SHA-256 prefixes were recorded before deletion and are retained
in `recovered-assets-provenance.json`, so any future copy can be recognised as
one of these files and rejected on sight.

### ⛔ Not approved for reuse

None of these may be republished, used as page imagery, used as an `og:image`,
or reintroduced to the deployable asset tree. **The earlier recommendation that
the owner "confirm the camp pillar icons are wanted on `/camps`" is withdrawn** —
it was written while they were mistakenly believed to be icons, and acting on it
would have published unlicensed photographs of unconsenting strangers, including
children.

### Two traps worth recording

**1 — The estate reuses filenames across upload folders.** `m1000x1000.png`
exists twice and is **two different images**. A first recovery pass keyed on
filename silently overwrote one with the other; recovery was redone **keyed on
full URL**. Anyone scripting against this inventory should do the same.

**2 — Keying on the URL still tells you nothing about the content.** The second
pass fixed the collision and then described all four files as "pillar icons"
anyway, because their position on the page implied it. **Nobody opened them.**
Filename, dimensions, position and sibling count are all circumstantial;
the only way to know what an image contains is to look at it.

---

## What was deliberately NOT recovered

### The 18 genuine photographs — gate I-1

**Not downloaded.** Every one depicts identifiable minors with no photo-release
consent on file, and photographer copyright is unconfirmed (I-7).

Downloading them would create a **second uncleared copy** of images that cannot
be published either way. The correct sequence is consent first, then recovery —
and `/photo-consent` now exists to start that.

> **No image of any person exists anywhere in this repository.**
> Re-verified 2026-08-09, after deleting the five files this report originally
> claimed were safe. The claim is true **now**; it was not true when first
> written. The eight generated atmospherics in `public/images/generated/` are
> the only images in the repo, all decorative and `aria-hidden`, none depicting
> a person.

### 26 stock / template assets

Turkish and French filenames, Medium CDN hashes, unverifiable licensing. Not
recovered and not used — the rebuild ships no stock photography.

### 2 Step Up for Students logos — gate I-6

Third-party trademarks with unconfirmed licence. Not recovered, not used.

### 14 duplicate uploads

The same files re-uploaded across month folders. Nothing unique to preserve.

---

## Full asset disposition

| Class | Count | Local copy | Identifiable people | Consent | Destination | Verdict | Alt text |
|---|---|---|---|---|---|---|---|
| Legacy uploads mislabelled "pillar icons" — **photographs of people** | 4 | ❌ **deleted 2026-08-09** | **YES** (1 possibly incl. minors) | **None** | none | **REJECT** — licensing not established, no release | n/a |
| Legacy shared hero — **photograph incl. identifiable children** | 1 | ❌ **deleted 2026-08-09** | **YES — children** | **None** | none | **REJECT** — licensing not established, no release | n/a |
| Genuine performance photos | 18 | ❌ not downloaded | **YES** | **None** | `/performances` | **PENDING CONSENT** — I-1, I-7 | Was absent at source |
| Stock / template | 26 | ❌ | No | n/a | none | **REJECT** — licensing | Was `img`, `Image 1/2/3` |
| Step Up logos | 2 | ❌ | No | n/a | `/scholarships` | **PENDING** — I-6 | — |
| Logo (raster PNG) | 1 | ❌ | No | n/a | sitewide | **REPLACE** — rebuild as SVG; gate D-1 | — |
| Duplicate uploads | 14 | ❌ | No | n/a | none | **REJECT** — duplicates | — |
| Generated atmospherics | 8 | ✅ already in repo | No | n/a | film movements | **PENDING OWNER APPROVAL** | Decorative, `aria-hidden` |
| Video | **0** | — | — | — | — | **DOES NOT EXIST** | — |
| Documents / PDFs | **0** | — | — | — | — | **DOES NOT EXIST** | — |

## Alt text

Not applicable to the rebuild today: **the entire site ships zero content
images.** The only imagery is decorative and `aria-hidden`.

At source, alt text was absent on almost every content image, and where present
it was `img`, `Image 1/2/3`, `...`, or the raw filename. When photography
returns after consent, alt text is written as part of publishing it — not
retrofitted.

## Launch dependency check

> **No launch-critical UI depends on any external asset host.**

Fonts are self-hosted. The eight generated atmospherics are in-repo. The
staging domain is dead and nothing in the rebuild references it.

**Net asset position: the rebuild ships no photography at all.** That is not a
gap to be filled from the legacy estate — as this report's own correction shows,
that estate is not a safe source. It is filled by consent (gate I-1) or by
commissioning, and by nothing else.

## Owner actions

1. **Photo consent** — the highest-leverage item on the project. Unblocks 18 images.
2. **Vector logo** — gate D-1.
3. **Step Up logo licensing** — gate I-6.
4. **Re-point or retire** the 22+ live pages still referencing the dead staging
   domain, if the old site stays up any longer.
5. **Note for whoever retires the old site:** the legacy uploads folder contains
   photographs of identifiable people, including children, with no established
   licence. Copying it forward wholesale would carry that problem into whatever
   replaces it.

*(The former action 2 — "confirm the camp pillar icons are wanted on `/camps`" —
is withdrawn. They were never icons. See the correction at the top.)*
