# MI2 — Visual evidence, cinematic compression & homepage experience pass

**Status:** local review only. Nothing committed, pushed or deployed.
**Local HEAD:** `a3266cd` (unpushed, unamended) · **origin/master:** `bc3830a`

---

## The one number

The first authentic photograph moved from **6,624px (7.4 viewports)** to
**4,608px (5.1 viewports)**, and changed from a 2.39:1 band inside a text
movement into a **full viewport of its own**, revealed as the house lights rise.

Page height fell from 14,723px to 13,457px. Authentic photographs on the
homepage went from **1 to 3**. Consecutive text-only viewports before any
evidence fell from **eight to five**.

---

## 1 · Cinematic beats, before → after

| Beat | Before | After | What happened |
|---|---|---|---|
| Opening | 900 | 900 | Unchanged — it is the hero |
| Reframe | 702 | 792 | **Merged with The Turn** |
| The Turn | 468 | 0 | Absorbed; its verbatim line is now the hinge's coda |
| The Walk (3 frames) | 2,430 | 1,890 | Pin `+=170%` → `+=110%`. Week 11 and 12 both kept |
| The Release | 1,710 | 864 | Pin `+=90%` → `+=50%`; frame 100svh → 64svh |
| House-lights gradient | 414 | 0 | Absorbed into the reveal |
| **House-lights reveal** | — | **900** | **NEW — the payoff** |
| The House (intro) | 1,462 | 860 | Photo band moved out into the reveal |

Nothing in the film was deleted. Two beats were absorbed into others and two
pins were shortened.

## 2 · The payoff

`HouseLightsReveal` replaces both the gradient and the photo strip:

```
darkness → scrim lifts + exposure rises + 1.06 scale settles
        → the real South Dade stage fills 100svh
        → the whisper hands over → the desk begins on cream
```

Scrubbed, so the visitor pulls the lights up. **The photograph is not filtered:**
the timeline resolves to `brightness(1)` and `scale(1)` with the scrim at zero,
so what you end up looking at is the frame as taken. Under
`prefers-reduced-motion` the timeline never registers and the static state is the
lit state — verified: scrim `opacity: 0`, plate `filter: none`.

## 3 · Rhythm through the desk

TEXT → **IMAGE (full viewport)** → TEXT → **IMAGE (rail)** → TEXT → LIGHT →
TEXT → **IMAGE (band)** → PROOF → PROOF → TEXT → CONVERSION

- **Programs** keeps its numbered playbill and gains a third column:
  `bass-hands` as a sticky rail at `lg`, re-cropped to 3:2 below it.
- **The twelve weeks** gets **no photograph** — none exists for those weeks.
  Progression is carried by a warm wash at 0 / 0.10 / 0.28 and a full-ink rule
  on Week 12.
- **It already happened** gains `the-room` as a full-bleed horizontal band
  directly above the showcase quotes.

## 4 · Images

| Asset | Class | Source | Placement |
|---|---|---|---|
| `stage-set-floral` | authentic | #65, whole | House-lights reveal, full viewport |
| `bass-hands` | authentic | #31, 2560×1920 → 600×1500 | Programs rail |
| `the-room` | authentic | #26, 2000×1500 → 2000×716 | Performance-evidence band |
| `atmos-stage-floor` | generated | — | The Walk — **kept** |
| `atmos-curtain-shadow` | generated | — | Reframe — **kept** |
| `atmos-paper-tooth` | generated | — | The House — **kept** |

Both new crops are Tier B: face-free, from originals containing minors that
never leave `.audit/`. All three photographs remain blocked on **I-7**.

### Rejected

- **#66** purple performance — 500×393 after cropping, noisy, partial face survives.
- **#10** full ensemble — 1000×667; every face-free region crops under 250px.
- **#13, #20, #27, #28, #33, #34, #55, #63** — identifiable minors, no usable face-free region.
- **A fourth photograph for the twelve weeks** — deliberately not placed.

## 5 · Copy changed

| Was | Is |
|---|---|
| "The largest word on this site. The owner's to choose — not ours to invent." | "One note. Whatever instrument she chose. Held." |
| "That's not shyness. That's a skill she hasn't been taught yet." | "Confidence can be practised. It just needs somewhere to start." |

The first was internal review language shipping to customers. The second
diagnosed a child. The shout slot is still blank and still the owner's to
choose — the unresolved state moved to `/_internal/content-review#mi2`.

## 6 · Responsive

| | Width | Height | Payoff | Images | Overflow | Errors |
|---|---|---|---|---|---|---|
| Desktop | 1440 | 13,457 | 5.1 vp | 3 | 0 | 0 |
| Desktop narrow | 1280 | 12,845 | 5.1 vp | 3 | 0 | 0 |
| Tablet | 768 | 14,937 | 5.5 vp | 3 | 0 | 0 |
| Mobile | 390 | 13,991 | 5.5 vp | 3 | 0 | 0 |

The reveal's crop is responsive. At 390×844 the image covers by height, so a
*vertical* offset does nothing — the width is what gets cropped, and centring it
landed on a keyboard and an empty floor. Below `sm` it moves horizontally to 40%
so the "build community. make music." banner stays in frame.

## 7 · Tests

typecheck · lint · production build · `check:tokens` 13/13 · `check:a11y` 27/27 ·
`check:softnav` all pass · `probe:motion --production` 4/4 runs pass.

Production: preview assets 404, internal tool 404, zero preview references and
zero dev badges in production HTML, zero `.audit` files tracked by git, and the
removed internal line returns **0 matches** across the built site.
