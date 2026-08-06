# 03 — Motion Map

**Phase:** 5A — Homepage Creative Blueprint
**Date:** 2026-08-06
**Governed by:** [`../redesign/05-motion-system.md`](../redesign/05-motion-system.md)
**Status:** Interaction design. **No code.**

---

## 1. Budget and philosophy

> **Motion here is stagecraft, not decoration.**

Every animation on this page answers one of: *where did this come from?*, *what
changed?*, *what should I look at?*, *did that work?* If it answers none, it is
deleted before build.

`05-motion-system.md` §1 allocates **60% of motion effort to one signature
moment.** On this page that is §3, The 90-Day Journey.

| # | Moment | Section | Budget | Technique |
|---|---|---|---:|---|
| 1 | **The 90-Day Journey** ★ | §3 | **50%** | Pinned, scroll-scrubbed, ~250vh |
| 2 | The Ladder | §5 | 15% | Pinned, scrubbed, opacity-only |
| 3 | Houselights (room transitions) | ×6 | 10% | Ground luminance cross-fade |
| 4 | Hero sequence | §1 | 8% | Timed entrance + light sweep |
| 5 | Curtain-up headlines | §1, §2 | 6% | Masked line reveal |
| 6 | Gallery FLIP → lightbox | §7 | 6% | Position-based transition |
| 7 | Reveals and counters | §4, §6–§12 | 5% | `fade-rise`, `count-up` |

**Two pinned sequences — the sitewide maximum.** Both are on this page, which is
a deliberate allocation: the homepage is where a parent decides whether to keep
reading. `/programs/90-day-stage-program` re-uses the §3 sequence rather than
adding a third.

---

## 2. The hero sequence (§1)

The most-seen three seconds of the project. **Content is legible from 0ms.**

```
   0ms   Ground, H1 and fact bar present at paint. LCP element. No JS dependency.
         The texture is dark and under-lit — the house before the show.
         The H1 is fully visible. Nothing is hidden waiting for script.

 150ms   curtain-up on the H1. Three lines, masked by their own line boxes,
         revealed bottom-to-top. stagger-tight (40ms). ease-curtain, 640ms.
         ► If JS has not loaded by now, nothing happens and nothing is lost.

 400ms   THE LIGHT SWEEP. A warm gradient (spot-400 → transparent, ~35% width)
         travels left-to-right across the image mass over 900ms, ease-stage,
         lifting the subject out of shadow.
         ► The spotlight finding the performer. Runs once, never loops.
         ► Homepage only. Interior heroes do not have it — repeating it
           everywhere makes it a template flourish rather than a brand moment.

 520ms   fade-rise on the week-structure line. 24px, 420ms.

 680ms   fade-rise on the CTA cluster, plus ONE spotlight glow pulse on the
         primary button: box-shadow expands 0 → --shadow-spotlight → settles.
         280ms out, 180ms back. Never repeats.

 850ms   Scroll affordance fades in, then drifts 6px vertically on a 2s loop.
         ► The only permitted looping animation in the viewport, and it sits
           outside the reading area.

~1700ms  Full state reached.
```

**Hard rules.** The H1 is never `opacity: 0` in CSS. The hero image is never
lazy-loaded and never waits on an animation. No text sits over a moving
background at any point where it must be read — the sweep passes over the
*image*, never under the headline.

---

## 3. ★ The 90-Day Journey

**The piece that communicates the entire product in ten seconds.**

A parent cannot picture their shy eight-year-old on a stage. Every list, table
and testimonial asks them to *believe* it. This sequence lets them **watch** it —
and the thing they are watching is a single point of light that starts alone and
dim, and ends as the brightest thing on the screen.

> **The device:** the performer point *is* their child. Everything else in the
> composition exists to give that point somewhere to travel.

---

### 3.1 The set

Six layers, back to front. Only the front three carry meaning; the rest is
atmosphere and is `aria-hidden`.

| Layer | Content | Behaviour |
|---|---|---|
| **6 · Ground** | Flat fill | `stage-900` → `stage-950` across the sequence |
| **5 · Ambient** | `stage-light-texture`, three warmth generations | Cross-faded cool → warm → spotlight |
| **4 · Substrate** | `diagram-substrate`, very low presence | Static. Gives the rule something to sit on |
| **3 · The rule** | Horizontal line, 10 of 12 columns, at 62% viewport height | Fills left→right, `stage-700` → `spot-500` |
| **2 · Week markers** | 12 ticks along the rule; week 11 wider, week 12 terminal | Illuminate in sequence, `stage-700` → `spot-400` |
| **1 · The performer point** | A single luminous dot on the rule | Travels, brightens, blooms |

Plus two fixed elements outside the diagram:

- **Caption block** — hung left, lower third. Stage title + week range.
- **Progress indicator** — top right. `WEEK 01 ▸▸▸ 12`, tabular numerals, the
  current number updating. Visible for the entire pin.

---

### 3.2 Scroll choreography

Pin duration **~250vh** (`05` §6 rule 1 caps pins at 300vh). Scrubbed with
**0.6s smoothing** — never `scrub: true` hard-locked, which feels mechanical and
amplifies scroll jitter.

Progress `p` runs 0 → 1.

---

#### `p 0.00 – 0.06` · **Settle**

| | |
|---|---|
| **Motion** | Pin engages. Nothing animates yet. |
| **Visual** | Rule already drawn in `stage-700` — unlit but *present*, so the parent sees the whole path before the journey starts. Performer point sits at week 1, `spot-400` at 20% opacity, 6px. Caption fades in over 280ms. |
| **Interaction** | None required. The user simply keeps scrolling. |
| **Emotional beat** | *Orientation.* "There is a path, and it has an end I can see from here." |

> The full path being visible from the first frame is the single most important
> compositional decision in the sequence. A progress bar that reveals its own
> length is a progress bar that creates anxiety.

---

#### `p 0.06 – 0.55` · **Stage 1 · Weeks 1–10 — Build the skill**

| | |
|---|---|
| **Motion** | The rule fills left→right, tracking `p` exactly. The performer point travels with the fill head. Week markers 1→10 illuminate in sequence at ~0.049 intervals. |
| **Visual change** | Filled rule `stage-700` → `spot-500`. Markers `stage-700` → `spot-400`. Performer point brightens **20% → 55%**, 6px → 9px. Ambient stays **cool** — low amber, high blue-black. Ground unchanged. |
| **Micro-beat** | As each marker lights, a 4px ring expands from it once over 240ms and dissipates. **One pulse, no loop.** This is the felt sensation of a week ticking over. |
| **Caption** | `Weeks 1–10` · *"Skill development and rehearsal."* |
| **Progress** | `WEEK 01…10 ▸▸▸ 12`, number updating with the fill head |
| **Interaction** | Fully reversible. Scrolling up walks the weeks backward — correct here, unlike entrance reveals, which are once-only. |
| **Emotional beat** | *Accumulation.* Ten weeks pass under the parent's thumb in about two seconds of scrolling. **90 days stops feeling long.** That is the entire job of this stage. |

---

#### `p 0.55 – 0.60` · **Transition**

| | |
|---|---|
| **Motion** | Caption cross-fades: out 180ms `ease-exit`, in 280ms `ease-stage`. |
| **Visual change** | Ambient begins its cool→warm cross-fade. |
| **Emotional beat** | *A gear change.* Something is about to be different. |

---

#### `p 0.60 – 0.78` · **Stage 2 · Week 11 — They play for the class**

| | |
|---|---|
| **Motion** | The fill reaches the **wider** week-11 marker and pauses there in relative terms — the marker is spaced further along the rule, so the same scroll distance covers less ground. **The sequence slows down without slowing the user down.** |
| **Visual change** | Performer point → **75%**, 12px. **Six small points fade in** around it in a loose arc below the rule, staggered 40ms, each at 35% opacity, 4px — *the first audience.* Ambient completes its warm cross-fade. |
| **Caption** | `Week 11` · *"They play for the class."* |
| **Interaction** | Reversible; the six points fade back out on reverse scroll. |
| **Emotional beat** | ⭐ **The catch of breath.** The point is no longer alone. This is the beat the whole sequence exists to deliver, and it is achieved with six 4px dots — because the parent supplies the meaning, and anything more literal would take it away from them. |

> **Why six.** Enough to read as *a group*, few enough to read as *a class* rather
> than an audience. Twelve would pre-empt week 12.

---

#### `p 0.78 – 0.84` · **Transition**

| | |
|---|---|
| **Motion** | Caption cross-fade. The six points begin to recede. |
| **Visual change** | **The ground begins to darken:** `stage-900` → `stage-950`. |
| **Emotional beat** | *The house lights going down.* |

---

#### `p 0.84 – 1.00` · **Stage 3 · Week 12 — The showcase**

| | |
|---|---|
| **Motion** | Final rule segment fills to the terminal marker. |
| **Visual change** | Ground completes `stage-950`. The six points recede to **30%** and multiply into a broader, dimmer field of ~20 points — *the audience, in darkness.* The performer point **blooms**: scale 1 → 1.8, opacity → 100%, core shifts `spot-400` → `spot-300`, with a soft radial glow at ~24% opacity. The terminal marker fills `spot-500`. |
| **Caption** | `Week 12` · *"Dress rehearsal and live showcase."* |
| **Emotional beat** | ⭐ **Arrival.** Week 12 is the **brightest moment on a page that has been getting darker for three sections.** The contrast is the payoff, and it costs nothing but opacity on two layers. |

> **The inversion is the idea.** Everywhere else, brightness means *information*.
> Here the site goes dark so one point can be bright. That is what a theatre does,
> and it is the only place on the site that does it.

---

#### `p 1.00` · **Release**

The pin releases and the abstract resolves into evidence.

**Primary (I-1 closed):** the bloom expands past the viewport edge and
cross-dissolves, 900ms `ease-stage`, into a real showcase photograph —
`DSCF3094-scaled.jpg` — full-bleed. The diagram becomes a room.

> This transition is the emotional payoff of the entire page. It is the moment
> the argument stops being a diagram and starts being a fact.

**Fallback (I-1 or M-3 open):** the bloom dissipates upward as the ground lifts
`stage-950` → `n-50` over 500ms — the **houselights** — and the twelve weeks
arrive as §4's table. Drama hands off to substance.

**This fallback is not a lesser ending.** It is the page's thesis made literal:
the House persuades, the Desk proves. It should be evaluated on its own merits in
design review, not treated as a stand-in.

---

### 3.3 What the user controls

| | |
|---|---|
| **Pace** | Entirely theirs. Scroll speed drives progress with 0.6s catch-up. |
| **Direction** | Fully reversible. |
| **Escape** | Normal scroll speed exits. **No scroll-jacking, no snapping, no wheel hijacking.** A flick to the bottom must work. |
| **Skip** | The progress indicator is a real anchor to §4. A parent who wants the table can have it immediately. |
| **Focus** | Never trapped. Tab moves out of the pin normally. |

---

### 3.4 Degradation — four paths, all complete

| Condition | Behaviour |
|---|---|
| **Below `lg` (1024)** | Vertical stacked sequence. Rule runs top→bottom, markers as a left rail, three stages as three blocks with `fade-rise`. **No pin, no scrub.** |
| **Reduced motion** | Static diagram. **All three stages visible at once**, all twelve weeks labelled, performer point at week 12, ground at final state. Reduced motion shows *more*, not less. |
| **No JS** | Identical to reduced motion. Rendered server-side. |
| **Low-capability device** (`hardwareConcurrency ≤ 4` or `deviceMemory ≤ 4GB`, or sustained <50fps) | Static diagram. Auto-detected at boot and re-checked; if the P75 device drops below 50fps in production, the sequence degrades automatically. |

**In every degraded state the full week structure is readable.** The animation
dramatises information; it never carries it exclusively.

---

### 3.5 Accessibility

- **DOM/SVG, never video** — crisp at any zoom, translatable for the Spanish
  tree, and readable by assistive technology.
- The sequence is authored as an **ordered list of three stages** with full week
  copy, present in the DOM at every scroll position. A screen reader encounters a
  coherent, complete description regardless of `p`.
- Layers 4–6 are decorative and `aria-hidden`. Layers 1–3 are presentational; the
  meaning lives in the text.
- The progress indicator is a real link, keyboard reachable, with an accessible
  name (*"Skip to the twelve-week table"*).
- **No flashing.** The brightest transition (week-12 bloom) runs over ~0.16 of
  250vh — several seconds of scrolling. Nowhere near the 3-flash threshold.
- Focus indicators inside the pin are full strength and never animated.

---

### 3.6 Performance

| Rule | Application |
|---|---|
| `transform` and `opacity` only | Rule fill is `scaleX` on a masked element, not `width` |
| No `filter` in a scroll loop | The bloom is a pre-composed radial layer whose opacity animates |
| `will-change` immediately before, cleared after | Applied on pin enter, removed on release |
| Lazy initialisation | Nothing is set up until the section is approached |
| Textures | AVIF; the three warmth generations are one sprite where possible |
| Kill on route change | ScrollTrigger instances killed — the most common GSAP memory leak |
| Frame budget | 60fps sustained, **never below 50fps** on a mid-range Android |

---

## 4. The Ladder (§5)

The second and final pinned sequence. Deliberately quieter than §3 — a page with
two spectacles has none.

| Progress | Rung | Visual | Emotional beat |
|---|---|---|---|
| 0.00–0.18 | **1 · Alone** | Rung 1 at 100%, rungs 2–5 at 15% | *"You start in a room with one person who's on your side."* |
| 0.18–0.38 | **2 · Heard** | Rung 2 to 100%; rung 1 dims to 45% but **stays visible** | Small pride |
| 0.38–0.58 | **3 · Beside** | Rung 3 to 100%; 1–2 at 45% | Safety in numbers |
| 0.58–0.78 | **4 · Among** | Rung 4 to 100% | Manageable exposure |
| 0.78–1.00 | **5 · Before** | Rung 5 to 100%; a faint connecting line has drawn through all five | *"Fear converted to adrenaline"* |

**Opacity only.** No transforms anywhere in this sequence — which makes it cheap,
flicker-free, and safe on devices where §3 has already been degraded.

Previous rungs dim but never disappear, because **the progression is the
argument**, not the current step.

**Reduced motion / no JS / below `lg`:** all five rungs lit and labelled at once.

⚠️ Blocked on gate **B-3**. Fallback in
[`02-section-specifications.md`](./02-section-specifications.md) §5.

---

## 5. Houselights — the room transitions

Six ground-luminance transitions (`01-homepage-blueprint.md` §4).

```
Trigger:   the incoming section crosses 80% viewport
Duration:  500ms  (never faster — this is a flash-safety floor, not a taste call)
Easing:    ease-stage
Repeat:    never. Once per boundary, per page load.
Property:  background-color on the ground layer, plus the semantic alias swap
```

**What does *not* happen during a transition:** no text changes colour
mid-transition in a way that would make it briefly unreadable. Both sections'
type is legible at **both** ends of the fade — verified per boundary at design
review, with the actual copy, at every breakpoint.

**Reduced motion:** no transition. Each section renders in its final register
immediately.

⚠️ **WCAG 2.3.1.** A full-ground luminance flip is a flash risk. Six of them on
one page is a cumulative one. Mitigations: ≥500ms, never repeating, never
reversing on scroll-up, disabled under reduced motion. **Verification against the
three-flash threshold is a launch gate, not a review note.**

---

## 6. Reveal inventory

Every entering element uses one named pattern. Nothing improvises.

| Section | Pattern | Detail |
|---|---|---|
| §1 H1 | `curtain-up` | 3 lines, `stagger-tight` — **1 of 2 permitted** |
| §1 sub, CTA | `fade-rise` | 24px, sequenced |
| §2 both lines | `curtain-up` | **2 of 2 permitted. No more on this page.** |
| §3 | scrubbed | Not a reveal |
| §4 table | `fade-rise`, **grouped** | Rows 1–10 as one unit, then 11, then 12 — 12 individual rows would blow the 600ms cap |
| §5 | scrubbed | Not a reveal |
| §6 teacher cards | `fade-rise` + `stagger-base` | 80ms, grouped beyond 8 |
| §7 gallery | `fade-rise` grouped by row | Then FLIP on interaction |
| §8 reviews | `fade-rise` + `stagger-base` | Grouped beyond 8 |
| §9 pricing | `fade-rise` on the block | **No figure animates** |
| §10 | `fade-rise` | Minimal — this section must feel procedural |
| §11 | `fade-rise` | Single element |
| §12 | `fade-rise` on the block | **Guarantee text never animates** |

**Universal:** trigger at 80% viewport · `once: true`, never re-animating on
scroll-back · never on scroll-up · content present at first paint, hidden only
after the motion layer confirms it can run.

### Counters

| Number | Where | Animate? |
|---|---|---|
| **90** | §1 fact bar | ✅ Signature. 1400ms, `ease-spot`, from ~72 not 0 |
| **12** | §1 fact bar | ✅ From ~9 |
| **3–18** | §1 fact bar | ❌ A range, not a count |
| **$25** | §1 CTA, §9, §12 | ❌ **Never.** Money in a transactional context is never in motion |
| Student / showcase counts | — | ❌ **No verified figure exists. Do not invent one.** |

Maximum three counters per page; two are used. Tabular numerals mandatory. The
true value is in the DOM at all times.

---

## 7. Gallery FLIP (§7)

The single most satisfying interaction available on the site.

```
Click:   the thumbnail's position and size are measured, the lightbox image is
         placed at that exact rect, then animated to its final rect.
         420ms, ease-stage. The image TRAVELS — it does not cross-fade.
Backdrop: fades to stage-950 at 92% over 280ms.
Escape:  the image RETURNS to its grid position. Never a fade-out.
Focus:   trapped while open, returned to the originating thumbnail on close.
```

Arrow keys, swipe, on-screen controls. Counter and caption always visible.
Adjacent images preloaded; never blocks on network.

**Reduced motion:** simple fade, focus behaviour unchanged.

**Touch:** no hover state exists at all — captions are always visible.

---

## 8. Micro-interactions

| Interaction | Behaviour | Duration |
|---|---|---|
| Primary button hover | Fill −8% lightness, spotlight glow intensifies, `elev-2` | 180ms |
| Card hover | `elev-1 → elev-2`, media scale 1.03, **no translate** | 200ms |
| Text link hover | Underline draws left→right, 2px | 180ms |
| Nav item hover | Underline draws from centre outward | 180ms |
| Teacher card hover | Portrait desaturate→saturate, name slides 4px | 220ms |
| Accordion (§10) | Height auto-measured, chevron rotates 180° | 280ms |
| Header condense | Height + ground, **never transform** | 280ms |
| Sticky bar entry | Slides up from bottom edge after 25% scroll | 280ms |
| Focus | **Instant. Always. Never animated.** | 0ms |

All hover states are gated behind `@media (pointer: fine) and (hover: hover)`.
**Never move the click target** — scale and shadow are fine; translation that
shifts the hit area causes mis-clicks.

**Budget: ≤3 concurrent animations in any viewport at any moment.**

---

## 9. Reduced motion — the parallel design

Not a degraded experience. A first-class alternative presentation.

| Element | Reduced-motion state |
|---|---|
| Hero sequence | Final state at paint. No sweep, no pulse, no drift |
| §2 curtain-up | Both lines visible, opacity fade only |
| **§3 Journey** | Static diagram, all three stages, all 12 weeks, performer at week 12 |
| **§5 Ladder** | All five rungs lit and labelled |
| Houselights | None. Each section in its final register |
| Reveals | Opacity only, 200ms, no translation |
| Counters | Final value immediately |
| Gallery | Fade, not FLIP |
| Sticky bar | Appears without slide |
| **Focus** | **Full strength. Never reduced.** |
| Loading spinners | Retained — system status is not decoration |

The manual toggle ships in the footer alongside the OS preference, persisted.
**Every animated surface on this page must be reviewed with the preference on.
This is a launch gate.**

---

## 10. Performance instrumentation

| Metric | Target |
|---|---|
| LCP | <2.5s on 4G — **never JS-dependent** |
| CLS | **0.00** — animation must never contribute layout shift |
| INP | <200ms |
| Frame rate | 60fps sustained, never below 50fps on a mid-range Android |
| GSAP + ScrollTrigger | <45KB gzipped *(measured at 44KB in Phase 4)* |
| Total animation JS | <70KB gzipped |
| Main-thread block per interaction | <50ms |

**Production monitoring:** long tasks and dropped frames sampled on this route.
If §3 falls below 50fps on the P75 device, it degrades to the static diagram
automatically — the threshold is enforced at runtime, not assumed at build.

---

## 11. Prohibited on this page

Restated so it survives a handover.

❌ Auto-advancing carousels *(the current site has one)*
❌ Scroll-jacking, forced snapping, wheel hijacking
❌ Cursor-following elements or custom cursors
❌ Preloader animations
❌ Text scrambles or typewriter effects on headings
❌ Parallax on any text, ever
❌ Parallax on the hero *(it contributes to LCP)*
❌ Infinite loops in the viewport during reading *(except the 2s scroll-affordance drift)*
❌ Background video autoplay on mobile
❌ **Animated photographs of students** — the imagery is documentary evidence, and treating it as motion graphics undermines its credibility
❌ Confetti, sparkles, musical-note particles
❌ Any animation on: prices, the deposit, policy text, dates, capacity, the guarantee, contact details, error messages, focus indicators, skip links

---

**Next:** [`04-copy-framework.md`](./04-copy-framework.md)
