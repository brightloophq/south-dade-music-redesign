# Generated Assets Register

**Phase:** 3.5 — Asset pipeline
**Date:** 2026-08-06
**Governed by:** [`image-style-guide.md`](./image-style-guide.md) · `09-image-strategy.md` §4
**Pipeline:** `scripts/generate-image.mjs`

Every AI-generated asset in this repository is recorded here. An asset that is
not in this table has not been reviewed and must not be referenced by UI code.

---

## 1. Register

<!-- Rows below are appended automatically by scripts/generate-image.mjs. -->

| File | Page | Section | Date | Model | Status |
|---|---|---|---|---|---|
<!-- generated-assets:rows:start -->
| `homepage-hero-stage-light.jpg` | home | hero | 2026-08-06 | gemini-3-pro-image | pending-review |
| `homepage-hero-stage-light-mobile.jpg` | home | hero | 2026-08-06 | gemini-3-pro-image | pending-review |
| `atmos-spotlight-cone.jpg` | home | journey | 2026-08-06 | gemini-3-pro-image | pending-review |
| `atmos-stage-floor.jpg` | home | journey | 2026-08-06 | gemini-3-pro-image | pending-review |
| `atmos-depth-folds.jpg` | home | transition | 2026-08-06 | gemini-3-pro-image | pending-review |
| `atmos-paper-tooth.jpg` | home | desk-ground | 2026-08-06 | gemini-3-pro-image | pending-review |
| `atmos-warm-bloom.jpg` | home | journey | 2026-08-06 | gemini-3-pro-image | pending-review |
| `atmos-curtain-shadow.jpg` | home | transition | 2026-08-06 | gemini-3-pro-image | pending-review |
<!-- generated-assets:rows:end -->

**Status values:** `pending-review` → `approved` → `integrated`, or `rejected`.
Full metadata for each row lives in
`public/images/generated/metadata/<file>.json`.

### Current holdings

| | |
|---|---|
| Assets generated | **1** |
| Approved | **0** |
| Integrated into the UI | **0** — by design; Phase 3.5 does not touch the UI |

---

## 2. Usage

```bash
# What can I generate?
npm run generate:image -- --list-templates

# Full option list
npm run generate:image -- --help

# Validate a prompt and see the resolved paths without spending a call
npm run generate:image -- --template stage-light-texture \
  --name divider-light-sweep --page camps --section divider \
  --purpose "Section divider between camp tiers" --dry-run
```

### Required options

| Option | Meaning |
|---|---|
| `--name` | Output filename stem. Sanitised to `[a-z0-9-]`, capped at 64 chars, reserved Windows device names rejected. **Never overwrites** — a collision writes `-2`, `-3`, … |
| `--page` | Page the asset belongs to (`home`, `camps`, `scholarships`, …) |
| `--section` | Section within that page (`hero`, `divider`, `cta-band`, …) |
| `--purpose` | One sentence on why the asset exists |
| `--prompt` and/or `--template` | The prompt. Combine both to vary a template per asset. |

### Generation options

| Option | Default | Notes |
|---|---|---|
| `--model` | `gemini-3-pro-image` | |
| `--aspect` | `16:9` | `1:1` `2:3` `3:2` `3:4` `4:3` `9:16` `16:9` `21:9` |
| `--size` | `2K` | `1K` `2K` `4K` |
| `--out-dir` | `public/images/generated` | Must stay inside the repo |
| `--meta-dir` | `public/images/generated/metadata` | Must stay inside the repo |
| `--no-ledger` | off | Skip appending a row to this file |
| `--dry-run` | off | Validate and resolve; make no API call |

---

## 3. Test asset — homepage hero stage-light background

The one asset generated in Phase 3.5, to prove the pipeline end to end.

### Command used

Run verbatim on 2026-08-06:

```bash
npm run generate:image -- \
  --template hero-atmospheric-background \
  --prompt "Wide cinematic stage-light background for a homepage hero. Warm amber theatrical beams raking through dark haze against a deep blue-black ground, with a clear low-detail zone at the left for overlaid headline type. Absolutely no people, no words and no logos." \
  --name homepage-hero-stage-light \
  --page home \
  --section hero \
  --purpose "Wide cinematic stage-light background for the homepage hero" \
  --aspect 16:9 \
  --size 2K
```

Note the explicit "no people, no words and no logos" phrasing. The pre-flight
scanner treats prohibited terms under a negation cue as constraints rather than
subjects, which is exactly what that clause is.

### Result

| | |
|---|---|
| Output | `public/images/generated/homepage-hero-stage-light.jpg` |
| Metadata | `public/images/generated/metadata/homepage-hero-stage-light.json` |
| Model | `gemini-3-pro-image` |
| Requested | 16:9, 2K |
| Delivered | **2752 × 1536** JPEG (1.792:1 — the model returns its own near-16:9 grid, not exactly 1.778) |
| Weight | 2.41 MB JPEG — **source master**, not a delivery asset |
| SHA-256 | `806c3cee3096fdd67f7a0ddc392e7c08033b61ff1424385f8c41690f3a6085f9` |
| Contains people | No — verified by eye |
| Contains text or logos | No — verified by eye |
| Status | **pending-review** |
| Integrated | **No** |

**Visual check:** amber volumetric beams raking down from the upper right
through dark haze, with suspended dust motes; the left third falls away to a
deep blue-black with no detail. Reads as the `stage-950`/`spot-400` pairing the
design system calls for, and the dark left zone is where the H1 goes.

⚠️ **The requested aspect ratio is a hint, not a contract.** 2752 × 1536 is
1.792:1, so a strict 16:9 slot will crop ~8px of height equivalent. Confirm the
final crop during integration rather than assuming the delivered file matches
`--aspect`.

### Before this can ship

1. Human review against `image-style-guide.md` §3–4
2. Contrast check — white H1 over the left third at AA
3. Light-sweep interaction check (`05-motion-system.md` §9)
4. Separate 4:5 generation for the mobile crop — **do not centre-crop the 16:9**
5. AVIF/WebP conversion to the <180KB hero budget
6. Set `approvalStatus` and `approvedBy` in the metadata JSON

**Reminder:** this is a *ground*, not the homepage hero image. The homepage hero
is `P1088527.jpg` — a real photograph of a real student
(`09-image-strategy.md` §6 calls it the most important image in the project).
The generated texture sits behind and around it. If it ever becomes the
homepage's primary image, that is a content failure, not a design choice.

---

## 4. Open items

| # | Item | Blocks |
|---|---|---|
| **1** | **Content model — `register` enum.** `08-content-model.md` §3 rule 3 bars `ai-generated` from `register: stage`/`studio`, but the enum offers no value for permitted decorative work. The pipeline writes `register: "decorative"`. Add it to the enum and scope rule 3 to documentary registers. | Schema validation of every generated asset |
| **2** | **Delivery conversion.** Assets are full-size JPEG/PNG masters (2.41 MB here). AVIF/WebP + responsive widths is not yet built. | Hero weight budget (<180KB) |
| **3** | **Mobile crops.** 4:5 must be generated, not cropped. | Mobile heroes |
| **4** | **Named reviewer.** No approval authority is assigned yet. | Every `approved` transition |
| **5** | **Site credits disclosure.** Decide whether decorative AI work is disclosed in credits once it becomes visually prominent. | Launch checklist |
| **6** | **`personGeneration` is unavailable.** `imageConfig.personGeneration: 'ALLOW_NONE'` is rejected by the Gemini Developer API (API-key mode) — it is accepted only on the Enterprise Agent Platform / Vertex path. The no-people rule is enforced by the pre-flight scanner and prompt constraints instead. Reinstate the field if this pipeline moves to Vertex credentials. | Model-side enforcement of the no-people rule |

None of these block Phase 4. All of them block publication of a generated asset.

---

## 5. What this pipeline will not do

Restated so it survives a context change:

- It will not generate students, teachers, classrooms, facilities,
  performances, awards or testimonials. The script blocks these before any
  network call, and appends a fixed negative-constraint block to every prompt.
- It will not replace real photography. 18 genuine photos exist and are listed
  in `image-style-guide.md` §2 — check those first, every time.
- It will not write alt text. Alt text is human-written and human-verified.
- It will not read or write a `NEXT_PUBLIC_` Gemini key. It refuses to run if
  one exists in `.env.local`.
