# MI2 — plan, written before implementation

## 1. Audit of the homepage as it stands

Measured in Chrome at 1440×900, counting real DOM after a full scroll.

**Total height 14,723px = 16.4 viewports.** The first authentic photograph
appears at **6,624px (7.4 viewports)**.

| # | Beat | Ground | Scroll cost | Class | Media |
|---|---|---|---|---|---|
| 1 | Opening — "In 90 days, your child takes a stage." | pitch | 900px | A narrative | ghost numeral only |
| 2 | Reframe — the hinge | memory | 702px | A narrative | none |
| 3 | The Turn — one whisper line | wing | 468px | A narrative | 1 generated |
| 4 | Walk — weeks 1–10 | wing | pinned | A narrative | 1 generated (floor) |
| 5 | Walk — week 11 | wing | 2,430px | A narrative | " |
| 6 | Walk — week 12 | stage | total | A narrative | " |
| 7 | Release — flash + shout slot | flash | 1,710px | A narrative | none |
| 8 | House lights — gradient | — | 414px | A narrative | none |
| 9 | The House — photo strip + business intro | house | 1,462px | C proof / B info | **1 authentic** + 1 generated |
| 10 | Programs | house | 1,103px | B informational | none |
| 11 | The twelve weeks | house | 965px | B informational | none |
| 12 | Lessons | house | 528px | B informational | none |
| 13 | It already happened | stage | 982px | C proof | none |
| 14 | What families say | house | 748px | C proof | none |
| 15 | Scholarship | house | 834px | B informational | none |
| 16 | Final CTA | house | 703px | D conversion | none |

### The three findings

1. **Beats 1–8 are eight consecutive text/graphic compositions** — 6,624px, 7.4
   viewports, before any evidence that this business exists.
2. **Beats 10–16 are 5,863px of unbroken typography with zero images.** Seven
   consecutive cream sections.
3. **Two beats are nearly empty.** The Release is a 900px cream viewport whose
   only visible copy is an internal review note. The house-lights gradient
   spends 414px on one whisper line, and the photograph that follows is a
   2.39:1 strip — a band, not a payoff.

---

## 2. What I propose to change

### A. Compress the opening (target: photograph by ~4.5 viewports)

| Change | Was | Becomes | Saves |
|---|---|---|---|
| Merge Reframe + The Turn into one movement | 78svh + 52svh | 88svh | ~378px |
| Walk pin length | `+=170%` | `+=110%` | ~540px |
| Release pin length | `+=90%` | `+=50%` | ~360px |
| Release frame height | `min-h-svh` | `64svh` | ~324px |

Week 11 and Week 12 both stay. The house-lights concept stays. Nothing is
deleted — the three walk frames still cross-fade, they just do it over less
scroll, which is what "overlapped during scroll" means here.

**Predicted:** first photograph at ~4,450px ≈ 4.9 viewports, down from 7.4.

### B. Make the house lights an actual payoff

Replace the `HouseLights` gradient strip **and** the 2.39:1 photo band with one
pinned `HouseLightsReveal`:

```
darkness → scrim lifts + brightness rises + slow scale settle
        → stage-set-floral occupies a FULL viewport
        → "The house lights come up." fades out as the light arrives
        → the business introduction emerges beneath it on cream
```

Scrubbed, so the visitor drives it. Not filtered beyond a brightness/scrim
envelope that resolves to the untouched photograph — it must stay recognisably
a real room. Reduced-motion gets the lit photograph immediately.

### C. Rhythm through the desk

| Beat | Treatment |
|---|---|
| Programs | Editorial split — the numbered index keeps its system, with `bass-hands` as a tall adjacent rail |
| The twelve weeks | **No photograph.** Progressive stage-light treatment across weeks 1–10 / 11 / 12 |
| It already happened | `the-room` as a full-bleed horizontal band with the showcase quotes |

Three authentic images on the homepage, not seven. The twelve-week section gets
light rather than a photograph because no week-by-week photography exists and
forcing one would be exactly what §5 forbids.

### D. Copy

1. **Remove** "The largest word on this site. The owner's to choose — not ours
   to invent." It is internal review language. The reserved shout slot stays
   (it prevents layout shift when the word arrives); the unresolved state moves
   to the review tool.
2. **Rewrite** the hinge. "That's not shyness. That's a skill she hasn't been
   taught yet." diagnoses a child. Replacement keeps the idea that confidence is
   developable and drops the diagnosis.

---

## 3. Media decisions

| Asset | Source | Verdict |
|---|---|---|
| `bass-hands` | #31, 2560×1920 | **Accept.** Crop excludes the student's head entirely; scroll of the upright bass top, hand on the neck bottom. 640×1600. |
| `the-room` | #26, 2000×1500 | **Accept.** Lower band only — seated audience from behind, no faces at all. 2000×716. |
| `stage-purple` | #66, 1024×683 | **Reject.** 500×393 after cropping, dark and noisy, and a partial face survives at the top edge. |
| #10, #13, #20, #27, #28, #33, #34, #55, #63 | various | **Reject for MI2.** All are strong evidence and all are full of identifiable minors with no face-free region at usable resolution. |

Everything remains preview-only under gate I-7.
