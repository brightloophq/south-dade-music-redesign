# 06 — Existing Assets

Source: `docs/source-content/assets-inventory.json` (62 distinct assets across
77 references), `public/images/generated/metadata/`.

---

## 1. Headline numbers

| | Count |
|---|---|
| Distinct assets | **62** |
| Genuine in-house photography | **18** |
| Stock or template assets | **26** |
| Third-party trademarks | **2** |
| Duplicate uploads | **14** |
| On infrastructure the business controls | 44 |
| On infrastructure it does **not** control | **18** |
| **Videos** | **0** |
| **PDFs / downloadable documents** | **0** |

## 2. Critical findings

> **22+ pages load their hero image from `cmscustom-staginglink2.com`** — an
> agency staging domain outside the business's control. If that domain lapses,
> most of the site loses its imagery.

> **Zero video assets exist across the entire estate** — for a business whose
> entire promise is live performance. This is the single largest missed
> opportunity in the media library.

> **Zero downloadable documents.** No handbook, no policy PDF, no camp packet,
> no medical or consent form, no tuition sheet.

Further defects:

- **Three instrument pages use a hero of the wrong instrument** (violin→guitar,
  ukulele→piano, singing→guitar) although correct images exist in the library
- **Alt text is absent on almost every content image.** Where present it is
  `img`, `Image 1/2/3`, `...`, or the raw filename
- **Third-party stock with unverifiable licensing** on the About page, the Step
  Up page, and every program card — Turkish and French filenames, Medium CDN
  hashes
- **Step Up for Students logos used with no confirmed licence** (⚠️ gate I-6)
- **14 duplicate uploads** of the same files across different month folders

## 3. The 18 genuine performance photographs

These are the only authentic images of the business in existence.

> ⚠️ **All 18 depict identifiable minors with no evidence of photo-release
> consent.** Gate **I-1** blocks every one of them.
> ⚠️ Gate **I-7** — photographer copyright ownership is also unconfirmed.

**None may be used in any comp, mockup or deliverable.**

### How this constraint became the concept

The creative direction turns this blocker into the signature idea:

> **Nobody's face appears on the homepage. Ever.**

Permitted visual language: the **back** of a small head in light · a
**silhouette** against a lit scrim · **hands** on keys · a **shoulder** in the
wings · the audience as **dark shapes** · a parent's **hands** in a lap · a
**shadow** crossing a floor.

Four reasons this is stronger than faces:

1. **You become her.** A face is someone else's child. A back is your own.
2. **It is universal.** No age, gender or race is specified, so every family in
   South Miami-Dade sees theirs.
3. **It is how cinema builds dread and release.** The reveal you never get is
   the one you supply yourself.
4. **It is ethically bulletproof** — and consent gets obtained anyway, because
   it is right.

**A photo shoot built on this principle needs no consent forms**, because no
face appears. That is the fastest route to authentic imagery and should be
confirmed with the owner (gates D-3 / I-2).

## 4. Logo

`logo-1.png` — serves as **both** the logo and the `og:image` for every page, so
social shares of any page show only the logo, never relevant imagery. A
duplicate exists in a different month folder, used as the favicon.

**Recommended:** rebuild as SVG; replace the per-page `og:image` with
page-relevant imagery. ⚠️ Gate **D-1** — logo colours and refresh must be
assessed against whatever palette the design process lands on.

## 5. Generated atmospheric assets

Eight assets exist in `public/images/generated/`, produced by the
development-time Gemini pipeline. Metadata sidecars record prompt, model, date,
page, section, purpose and approval status.

| Asset | Page / section | Status |
|---|---|---|
| `homepage-hero-stage-light.jpg` | home / hero | ⚠️ pending-review |
| `homepage-hero-stage-light-mobile.jpg` | home / hero | ⚠️ pending-review |
| `atmos-stage-floor.jpg` | home / journey | ⚠️ pending-review |
| `atmos-spotlight-cone.jpg` | home / journey | ⚠️ pending-review |
| `atmos-warm-bloom.jpg` | home / journey | ⚠️ pending-review |
| `atmos-curtain-shadow.jpg` | home / transition | ⚠️ pending-review |
| `atmos-paper-tooth.jpg` | home / desk-ground | ⚠️ pending-review |
| `atmos-depth-folds.jpg` | home / transition | **rejected**, not referenced |

**All eight are `pending-review` with `approvedBy: null`.** Seven are referenced
by the built homepage and return HTTP 200; the eighth was rejected.

> ⚠️ **Human visual review is mandatory, not optional.** The Gemini Developer
> API rejected `personGeneration: 'ALLOW_NONE'` (a Vertex-only parameter), so
> no-people generation could not be enforced at the API level. Every asset must
> be eyeballed before launch.

⚠️ The mobile hero was generated at **3:4** rather than the specified 4:5,
because the API does not support 4:5. The deviation is documented.

**No new assets are to be generated during this design phase.**

## 6. What the designer actually has to work with

| Available now | Not available |
|---|---|
| 8 generated atmospheric assets (pending review) | Any photograph of a person |
| The logo, as a raster PNG | Any video |
| Typography, colour and layout | Any teacher portrait |
| Light, texture, grain, composition | Any dated event imagery |
| Verified words | Any document or PDF |

**Typography must carry most of the experience.** That is not a stylistic
preference — it is a direct consequence of the asset situation above, and it is
the honest starting point for the visual direction.
