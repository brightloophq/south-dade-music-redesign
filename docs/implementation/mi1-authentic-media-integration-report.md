# MI1 — Authentic Media Integration Preview

**Status:** local review only. Nothing in this phase is approved to publish.
**Local HEAD:** `a3266cd` (unpushed, unamended) · **origin/master:** `bc3830a`
**Committed:** nothing. **Pushed:** nothing. **Deployed:** nothing. **Indexing:** off.

---

## 1. What this phase was for

Every image on the rebuilt site is generated. The question MI1 exists to answer
is narrow and worth answering before any shoot is commissioned:

> When you put South Dade Music's *own* photography into the approved design,
> does the design get better, and by how much?

The answer is yes, in six specific places, and the more useful half of the
finding is *where it does not* — which turns out to be the two routes that want
a photograph most.

---

## 2. What was built

Eight derivatives were generated from the legacy estate into `.audit/media-review/`
and wired into the running site behind a development-only component.

Six are rendered. One was rejected on inspection. One was re-homed after
inspection. All eight are catalogued in `/_internal/content-review#mi1`.

| Route | Authentic | Generated | Derivative |
|---|---|---|---|
| `/` | 1 | 5 | `stage-set-floral` — the House join |
| `/programs/90-day-stage-program` | 1 | 1 | `medals` — the finale |
| `/programs/band-builders` | 1 | 1 | `stage-instruments` — alone → together |
| `/private-lessons` | 1 | 1 | `ukulele-wall` |
| `/performances` | 2 | 1 | `stage-set-purple`, `bass-on-stand` |
| `/about` | 1 | 1 | `banner` — in the community |
| `/lessons` | **0** | 4 | — none exists |
| `/contact` | **0** | 1 | — none exists |

Counted in a real browser at 1440×900 and 390×844 after a full scroll, by
counting `[data-media-review]` and `[data-atmosphere]` nodes. Not counted from
source.

**Sitewide authentic media coverage: 6 of 8 primary routes (75%); 6 of 27 total
routes (22%).** Before MI1 it was 0% on both measures.

---

## 3. Before → after

Authentic photographs on the site before this phase: **zero, on every route.**

Generated plates displaced by real ones: **five placements.**

- `stage-empty-chair` × 2 — `/performances` opening and the 90-Day finale.
  A generated chair said *a stage is waiting*. `stage-set-purple` says *this
  stage is waiting, and it is theirs*; `medals` says what the ninety days
  actually end in, which the chair could only imply.
- The instrument triptych × 3 on `/programs/band-builders` — three generated
  object studies arguing "separate instruments, shared space" by arrangement,
  replaced by one photograph of two students actually playing side by side.
  Same claim, one fewer inference for the reader.

The displaced plates remain in the repository and stay approved; they are simply
no longer the best available answer in those five slots. The instrument studies
are still in use on `/lessons`, where a uniform index is the right object.

---

## 4. The two routes that got nothing, and why

This is the most useful output of MI1.

### `/lessons` — 0 authentic

The estate contains two photographs of the actual teaching room.

- **Audit #11** is the best interior frame in the whole estate — children at
  keyboards, a ukulele, the SDM neon on the wall. It is **1000×667** and
  composed almost entirely of identifiable children. I-1 blocks the frame, and
  no face-free region survives in it at a usable size.
- **Audit #30** has the ukulele wall, the amps and the music rug. Its one good
  face-free region is the ukulele rack, and that crop is already spent on
  `/private-lessons`.

A `room-drums` crop of #30's far wall was generated, wired to `/lessons`, and
**rejected on visual inspection**: the honest content of that corner is a
microwave, plastic bags, a utility cart and wire shelving. It reads as a storage
room. Shipping it would have made the academy look worse than a generated plate
does.

### `/contact` — 0 authentic

A contact page wants one specific photograph: the building, the door, the sign
you look for from the car park. **There is no exterior, entrance, reception or
street view in any of the 67 fetched images.**

`bass-on-stand` was wired here first under the caption "the room behind the
address" and reverted: the photograph shows a party table and balloons on
recital day, and that caption is not something the image supports. It now sits
on `/performances`, beside the section that says no date is announced, where the
subject and the claim agree.

---

## 5. What this says about a shoot

MI1 is the argument for commissioning one, and it is now specific rather than
general. In descending order of value:

1. **The exterior of Unit 117.** Twenty minutes with a phone. It unblocks
   `/contact` and nothing else can.
2. **The teaching room, empty.** Same room as audit #11, no students in it. It
   unblocks `/lessons` and would replace the ukulele-wall crop with something
   better everywhere it appears.
3. **Instruments and hands during a lesson**, framed deliberately face-free.
   This is the only category where the estate already proves the design works —
   `stage-instruments` is the strongest single improvement in MI1 — and it is
   also the category that needs no consent negotiation.

Everything else the site wants is blocked by consent, not by absence.

---

## 6. Safety

The bytes are **not** in `public/` and **not** in git.

They live in `.audit/media-review/` (gitignored) and reach a browser only
through the development-only handler at `src/app/%5Fmedia-review/[asset]/route.ts`.
Three independent guards: the handler 404s when `NODE_ENV === 'production'`; the
files are outside `public/`, so no static route can serve them; the directory is
gitignored, so they cannot be committed or deployed.

This matters because the first implementation put them in `public/_media-review/`
and they served **HTTP 200 in a production build** — the exact Phase 4D exposure
pattern, where "no page references them" was true and irrelevant. Repeating that
while previewing uncleared photographs of children's events would have been a
considerably worse version of the same mistake.

Verified in a production build:

- all 8 derivatives → **404**
- `/_internal/content-review` → **404**
- preview references and dev badges in production HTML across 8 routes → **0**
- `.audit/` files tracked by git → **0**
- `media-review` bytes in `.next` build output → **0**
- `robots.txt` → `Disallow: /`

`MediaReview` returns `null` in production and the dev badge returns `null` in
production. A page whose composition depends on one of these looks broken in a
production build — which is the correct signal, not a bug.

---

## 7. Validation

Against a clean production build:

| Check | Result |
|---|---|
| `tsc --noEmit` | pass |
| `eslint --max-warnings=0` | pass |
| `next build` | compiled successfully |
| `check:tokens` | all 13 checks pass |
| `check:a11y` | **ALL CHECKS PASS — 27 routes** |
| `check:softnav` | **ALL SOFT-NAVIGATION CHECKS PASS** |
| `probe:motion --production` | pass (see below) |

Browser QA at 1440×900 and 390×844 across all 8 changed routes: **0 console
errors, 0 page errors, 0 horizontally overflowing routes, 0 broken images, dev
badge present on 8/8.**

No `removeChild` regression. No LCP regression.

### One intermittent probe warning, reported rather than smoothed over

`probe:motion` failed **2 runs in roughly 13**, always the same assertion:

> `Image with src "/images/generated/atmos-paper-tooth.jpg" was detected as the
> Largest Contentful Paint` — the missing-`priority` console warning.

It is a cold-cache timing artifact on a **pre-existing generated homepage
plate**, and it cannot originate from MI1: `MediaReview` renders `null` in
production, so no MI1 code path executes in the build the probe measures. It is
recorded here because it is real and unresolved, not because it is MI1's.

---

## 8. What is deliberately not claimed

**Nothing here is production-approved, and looking good in this preview is not
clearance.** Every derivative is blocked on **gate I-7** — the business's right
to license the legacy photography is unconfirmed. Tier B crops are face-free,
but the people-bearing originals they derive from never leave `.audit/`.

No fake students, instructors, classrooms or facilities were generated. No
fabricated testimonials, no AI documentary-looking evidence, and no full
identifiable child photography appears anywhere in MI1.

Two placements were reverted after visual inspection. Both had passed every
automated check. That is the argument for keeping a human in this loop: the
checks can tell you an image loaded, and cannot tell you it shows a microwave.
