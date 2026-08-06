# Upload Manifest — Claude Design

Exactly what to upload, in what order, and what to leave behind.

**Total for Tier 1 + 2: ~94 KB of text.** The imagery is the only heavy part and
needs downscaling first — see §4.

---

## Tier 1 — Upload first. Essential.

If you upload nothing else, upload these.

| # | File | Size | Why |
|---|---|---|---|
| 1 | `docs/design-handoff/12-design-handoff-master.md` | 29 KB | **The whole brief in one file.** Self-contained — all 25 required sections. |
| 2 | `docs/design-handoff/05-business-claims-and-gates.md` | 8 KB | **The authority.** What may and may not be said. Prevents a beautiful comp that is legally unusable. |
| 3 | `docs/design-handoff/04-homepage-content.md` | 7 KB | The exact words to typeset. |
| 4 | `docs/design-handoff/10-design-deliverables-required.md` | 5 KB | What to produce. |

**Start the conversation with #1.** It stands alone. The rest add depth.

## Tier 2 — Upload with it. Supporting.

| # | File | Size | Why |
|---|---|---|---|
| 5 | `docs/design-handoff/09-current-design-problems.md` | 5 KB | The honest critique. Explains *why* an external process was engaged. |
| 6 | `docs/design-handoff/07-technical-foundation.md` | 8 KB | Current type scale, palette, contrast table, what a change costs. |
| 7 | `docs/design-handoff/11-implementation-constraints.md` | 5 KB | Accessibility and performance floors. |
| 8 | `docs/design-handoff/02-brand-and-audience.md` | 6 KB | Positioning, tone, audience. |
| 9 | `docs/design-handoff/08-motion-capabilities.md` | 5 KB | What can move; the forbidden vocabulary. |
| 10 | `docs/design-handoff/06-existing-assets.md` | 6 KB | What imagery exists and why almost none is usable. |
| 11 | `docs/design-handoff/03-content-inventory.md` | 7 KB | Sitemap and content model. |
| 12 | `docs/design-handoff/01-project-overview.md` | 4 KB | Orientation. |

## Tier 3 — Upload only if the designer asks for depth

| File | Why it might help |
|---|---|
| `docs/design/visual-direction.md` | The full internal proposal behind master §21–24 |
| `docs/homepage/07-the-walk.md` | The complete eight-act concept, 735 lines |
| `docs/source-content/content-conflicts.md` | All 17 conflicts with full source attribution |
| `docs/redesign/04-design-system.md` | The current design system in full |
| `docs/homepage/02-section-specifications.md` | Section-by-section specs |
| `docs/homepage/06-mobile-strategy.md` | Mobile-specific direction |

## Tier 4 — Raw data, only on request

`docs/source-content/business-profile.json` · `testimonials.json` ·
`programs.json` · `instruments.json` · `assets-inventory.json`

These are the primary extraction records. Everything in them is already
summarised in Tiers 1–2. Upload only if the designer disputes or wants to verify
a specific claim.

---

## §2 — Screenshots to capture

**None of these exist yet.** They must be captured before upload.

The dev server must be running (`npm run dev`, then `http://localhost:3000`).
Use a real browser at each width and capture full-page.

### Required — the current homepage, as built

| # | Capture | Width | Purpose |
|---|---|---|---|
| S1 | Homepage, full page | **1440px** | The thing being redesigned |
| S2 | Homepage, full page | **390px** | Mobile reality — most parents are on a phone |
| S3 | Hero, viewport only | 1440px | The weakest section; the poster problem |
| S4 | 90-Day Journey, mid-scroll | 1440px | The signature moment, currently an infographic |
| S5 | Programs + Lessons | 1440px | Where the card idiom persists |
| S6 | Testimonials + Scholarship | 1440px | Claim-bearing sections |
| S7 | Footer | 1440px | Contact, hours, positioning line |

### Strongly recommended — the reference points

| # | Capture | Purpose |
|---|---|---|
| S8 | The **live** site `southdademusic.com` homepage, 1440px | What exists today for the public. The baseline the client recognises. |
| S9 | The live site on mobile, 390px | |
| S10 | `try.southdademusic.com` | The conflicting positioning, different phone, different name |

### Optional — the visual-direction proposal

| # | Capture | Purpose |
|---|---|---|
| S11 | The visual-direction artifact, dark | Shows the Archivo + Newsreader proposal in real type |
| S12 | The same, light | The house-lights treatment |

> The artifact is live and interactive at the URL produced during the
> visual-direction phase. **Sharing the link is better than a screenshot** — the
> lit-type device and the template-mode toggle only make their argument live.

### Capture notes

- **Full-page, not viewport**, for S1/S2/S8/S9
- Capture at **2× device pixel ratio** so type is judgeable
- **Disable the motion debug panel first** — set `NEXT_PUBLIC_MOTION_DEBUG=false`
  in `.env.local` and restart, or the overlay appears bottom-left in every shot
- Scroll slowly for S4; the Journey is a pinned scrub and mid-state matters

---

## §3 — Font files

Upload only if the designer wants to work with the existing faces:

- `src/styles/fonts/archivo-variable-latin.woff2` (88 KB)
- `src/styles/fonts/archivo-variable-latin-ext.woff2` (88 KB)

❌ Do **not** upload the Inter files. The recommendation is to remove Inter, and
supplying it invites its reuse.

---

## §4 — Generated atmospheric assets

⚠️ **These are 2–2.5 MB each, ~18 MB for all eight.** Do not upload at full size.

**Downscale to ~1600px on the long edge before uploading.** That is ample for
judging treatment and colour.

| Upload | Asset |
|---|---|
| ✅ | `homepage-hero-stage-light.jpg` — the primary hero |
| ✅ | `atmos-stage-floor.jpg` |
| ✅ | `atmos-spotlight-cone.jpg` |
| ✅ | `atmos-warm-bloom.jpg` |
| ⬜ optional | `atmos-curtain-shadow.jpg`, `atmos-paper-tooth.jpg`, `homepage-hero-stage-light-mobile.jpg` |
| ❌ | `atmos-depth-folds.jpg` — **rejected, not referenced.** Do not upload. |

⚠️ Tell the designer explicitly: **all of these are `pending-review` and
unapproved.** They are working reference, not approved art direction.

### Also upload

`public/images/generated/metadata/*.json` — 8 small files recording prompt,
model, date, page, section and approval status for each asset. They show exactly
how each was briefed, which is useful if any are to be re-briefed.

---

## §5 — The logo

`logo-1.png` from the live site. ⚠️ Raster only — no SVG exists. Gate D-1 asks
whether it survives a new palette; the designer needs to see it.

---

## §6 — Do NOT upload

| ❌ Never | Why |
|---|---|
| `.env.local` | Contains a live Gemini API key |
| `node_modules/`, `.next/`, `storybook-static/` | Build artifacts, hundreds of MB |
| Any of the **18 real performance photographs** | Gate I-1 — identifiable minors, no consent. Do not circulate them, even internally, even for reference. |
| `package-lock.json` | Noise |
| The full `docs/` tree | 82 files. Tiers 1–2 are the curated subset; the rest is process history. |

---

## §7 — Suggested opening message to the designer

> South Dade Music is a music academy in Florida City, FL. We are redesigning
> the homepage. The engineering foundation, the content and the creative concept
> are settled and frozen — **what we need is the visual language.**
>
> Start with `12-design-handoff-master.md`; it is self-contained and covers
> everything in 25 sections.
>
> Three things to read before designing anything:
>
> 1. **§19 — content that must not be invented.** No prices, no teachers, no
>    student photographs, no showcase dates. There are 17 unresolved business
>    conflicts and real exposure on several.
> 2. **§20 — the concept, "The Walk."** Confirmed, and not up for redesign.
> 3. **§9 in `09-current-design-problems.md`** — an honest account of why the
>    current build is technically correct and emotionally inert.
>
> The single biggest open question is **typography**. §21 proposes replacing
> Inter with a serif and keeping Archivo. Accept it, refine it, or argue us out
> of it — but the current pairing reads as software, and this is a theatre.

---

## §8 — Upload order

1. `12-design-handoff-master.md` — alone, first
2. Tier 1 remaining (`05`, `04`, `10`)
3. Screenshots **S1, S2, S8** — current build, mobile, live site
4. Tier 2, all eight files
5. Downscaled atmospheric assets + metadata
6. Tier 3 only when asked

**Do not upload everything at once.** The master document is designed to be read
first and alone; burying it in 40 attachments defeats that.
