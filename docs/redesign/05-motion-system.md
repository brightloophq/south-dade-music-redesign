# 05 — Motion System

**Phase:** 3 — Product Strategy
**Date:** 2026-08-05
**Scope:** A GSAP motion *language*. This document defines behaviour, timing, easing and rules. **No code.** Implementation belongs to a later phase.

---

## 1. Motion philosophy

> **Motion here is stagecraft, not decoration.**

The product is a stage. The brand promise is a child stepping into light. Every animation in this system is drawn from one of four theatrical acts:

| Act | Physical reality | Interface expression |
|---|---|---|
| **The house lights dim** | Attention narrows before something begins | Backgrounds settle, contrast deepens as a section enters |
| **The spotlight finds you** | Light arrives, warm and directional | Focus, hover and CTA states use warm glow, not colour flips |
| **The curtain reveals** | A wipe, not a fade — something was always there | Masked reveals for headlines and imagery |
| **The applause** | Release after tension | Confirmation states, counters landing, success moments |

### Three governing rules

1. **Motion must mean something.** Every animation answers one of: *where did this come from?*, *what changed?*, *what should I look at?*, *did that work?* If it answers none, it is deleted.
2. **The content is the star.** Motion serves photography and typography. It never becomes the thing being looked at. If a reviewer describes the animation before the message, the animation is wrong.
3. **Confidence is calm.** The brand personality is composed, not loud. That means fewer, slower, more deliberate movements — not more of them. **Restraint is the differentiator.** Most competitor sites either have no motion or have cheap builder-template motion; a small amount of well-crafted movement reads as expensive.

### The one signature moment

A site should have exactly one animation people remember. Ours is **the 90-Day Timeline** (§10) — the pinned, scroll-driven journey from Week 1 to the Week 12 showcase. Everything else is supporting craft. Budget accordingly: 60% of motion effort goes to that single sequence.

---

## 2. Timing

Duration is chosen by **distance travelled and importance**, never by taste.

| Token | ms | Use |
|---|---|---|
| `duration-instant` | 100 | State flips — checkbox, toggle, tab underline |
| `duration-fast` | 180 | Hover, focus ring, small colour transitions |
| `duration-base` | 280 | **Default** — dropdowns, tooltips, card hover, accordions |
| `duration-slow` | 420 | Section reveals, modal entry, mobile drawer |
| `duration-slower` | 640 | Hero elements, large image reveals |
| `duration-cinematic` | 900–1200 | Curtain reveals, showcase transitions — feature moments only |

### Rules

- **Nothing exceeds 1200ms** except the pinned timeline, which is scroll-driven and therefore user-paced.
- **Exits are faster than entrances** — typically 60–70% of entry duration. Users have already decided; don't make them wait to leave.
- **Larger objects move slower.** A full-bleed image reveal at 640ms; a tooltip at 180ms. Equal durations for unequal distances feel wrong.
- **Perceived responsiveness ≤100ms.** Any direct interaction must show acknowledgement within 100ms even if the full transition takes longer.

### Stagger scale

| Token | ms between items | Use |
|---|---|---|
| `stagger-tight` | 40 | Text lines, list items |
| `stagger-base` | 80 | **Default** — card grids, nav items |
| `stagger-loose` | 120 | Feature cards, large media |
| `stagger-dramatic` | 180 | Hero sequence only |

**Cap total stagger at 600ms.** A 12-card grid at 80ms would take 960ms to finish — the last card arrives after the user has already scrolled past. Beyond 8 items, switch to grouped stagger (rows animate as units) or `stagger-tight`.

---

## 3. Easing

Four curves. No component invents its own.

| Token | Curve | Character | Use |
|---|---|---|---|
| `ease-stage` | `cubic-bezier(0.22, 1, 0.36, 1)` | Decisive start, long graceful settle | **Default** — entrances, reveals, most things |
| `ease-spot` | `cubic-bezier(0.34, 1.36, 0.64, 1)` | Slight overshoot, warm and alive | Counters landing, success confirmations, badges |
| `ease-curtain` | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetrical, mechanical, deliberate | Masked wipes, pinned scrub sections |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerates away | All exits, dismissals |

### Rules

- **`ease-stage` is the default.** Reach for anything else only with a reason.
- **`ease-spot` overshoot is capped at 8%.** More reads as bouncy and childish — it violates the teen-credibility constraint in `04-design-system.md` §0.
- **No `linear`** except continuous loops (marquee, equaliser) and scroll-scrubbed values, where the scroll position *is* the timing function.
- **No elastic or bounce presets.** Ever.

---

## 4. Entrance patterns

Five named patterns. Every entering element uses one.

### `fade-rise` — the workhorse
Opacity 0→1, translateY 24px→0. `duration-slow`, `ease-stage`.
Body copy, cards, list items, most content. Deliberately small distance — long travel reads as cheap.

### `curtain-up` — headlines
Text masked by its own line box, revealed bottom-to-top per line. Lines stagger at `stagger-tight`. `duration-slower`, `ease-curtain`.
H1 and major section headings only. Maximum **two per page** — this is the most expensive-looking pattern and loses its effect when repeated.

### `spot-in` — feature imagery
Scale 1.06→1, opacity 0→1, with a warm radial overlay dissipating from centre. `duration-cinematic`, `ease-stage`.
Hero photography, showcase key images. **Maximum one per page.**

### `slide-reveal` — media panels
An opaque panel wipes across the image and off, revealing it. `duration-slower`, `ease-curtain`.
Editorial image/text pairs, instrument photography. Direction follows reading order — left-to-right in LTR.

### `count-up` — numerals
See §7.

### Universal entrance rules

1. **Once only.** Elements animate on first entry and never re-animate on scroll-back. `once: true` on every ScrollTrigger reveal.
2. **Trigger at 80% viewport** — animation begins as the element crosses 80% from the top, so it completes as it reaches comfortable reading position.
3. **Never animate above-the-fold content on load.** The hero headline is present at first paint. Only *supporting* hero elements animate in. LCP must never depend on JavaScript.
4. **Never animate on scroll-up.** Only downward scroll triggers reveals.
5. **Failure state is visible.** If JavaScript fails or is slow, all content renders fully visible. Reveals are progressive enhancement applied *after* content is confirmed present — never `opacity: 0` in base CSS.

---

## 5. Scroll reveals

### Zones

| Zone | Behaviour |
|---|---|
| **Above fold** | Static. Hero copy present at paint. Only decorative layers move. |
| **First scroll (100–200vh)** | Highest density — `curtain-up` headline, `fade-rise` supporting copy, staggered cards |
| **Mid page** | Moderate — `fade-rise` and `slide-reveal` only |
| **Deep page (>400vh)** | Minimal — short `fade-rise`, no staggers. Users this deep are reading, not being persuaded. |
| **Footer** | None. |

### Parallax

Permitted, tightly bounded:
- **Maximum 12% differential** between foreground and background
- Background imagery and single decorative layers only
- **Never on text.** Parallaxed type is unreadable while moving and is a known accessibility problem.
- Disabled entirely below `md` and under reduced-motion
- Never on any element contributing to LCP

### Scroll-linked (scrubbed) animation

Reserved for three surfaces only:
1. The 90-Day Timeline (§10)
2. The Gradual Exposure Ladder diagram
3. The homepage hero's light-shift on initial scroll

Everywhere else, scroll **triggers** animation; it does not **drive** it. Scrubbing is expensive and, applied broadly, makes a site feel like it's fighting the user.

**Scrub rule:** always use a smoothing value (roughly 0.5–1s of catch-up), never `scrub: true` hard-locked, which feels mechanical and amplifies scroll jitter.

---

## 6. Pinned storytelling

Pinning is powerful and easily abused. **Maximum two pinned sequences sitewide.**

### Approved pin 1 — The 90-Day Timeline
Homepage and `/programs/90-day-stage-program`. See §10.

### Approved pin 2 — The Gradual Exposure Ladder
`/programs/90-day-stage-program` and `/about`. Five rungs (alone → heard → beside → among → before), each illuminating as it becomes active, the previous dimming but staying visible so the *progression* is legible.
⚠️ Blocked on gate B-3 — the rungs are a reconstruction and must be confirmed by the owner.

### Pin rules

1. **Pinned duration ≤ 300vh of scroll.** Longer and users feel trapped.
2. **Progress must be visible** — a step indicator or progress rule, so the user knows how much remains.
3. **Escapable** — normal scroll speed always exits; no scroll-jacking, no forced snapping, no hijacked wheel events.
4. **Desktop and large tablet only.** Below `lg`, pinned sequences degrade to a **stacked vertical sequence** with simple `fade-rise` per step. Do not attempt pinning on mobile.
5. **All content readable without motion** — the pin is a presentation layer over content that already makes sense stacked.
6. **Never pin a conversion element.** Pricing, forms and CTAs are never inside a pinned sequence.

---

## 7. Counters

Numbers are the brand's proof language — 90, 12, 15, 60, $450, 3.

### Behaviour

- Trigger at 80% viewport, **once**
- Duration 1400ms, `ease-spot` — decelerating so the final digits land deliberately
- Count from a value ~80% of target, not from zero. Counting `$450` from `$0` is slow and reads as a gimmick; starting at `$360` gives the same sense of arrival in a fraction of the time.
- **Tabular numerals mandatory** — layout must not shift as digits change
- Prefix and suffix are static; only the numeral animates
- Landing accent: the numeral settles into `spot-400`, or a subtle underline draws beneath it

### Rules

1. **Maximum three counters per page.** More turns proof into noise.
2. **Never animate a price the user is about to pay.** `$450` in a camp hero may animate; `$450` beside a Reserve button is static. Money in a transactional context is never in motion.
3. **The true value is in the DOM at all times** for screen readers and for no-JS. `aria-live` is not used — the final value is simply present.
4. Under reduced motion, the number renders at final value immediately.

### Counter inventory

| Number | Context | Animate? |
|---|---|---|
| **90** days | Homepage hero, programme page | ✅ Signature |
| **12** weeks | Timeline entry | ✅ |
| **3** weeks | Camp hero | ✅ |
| **60** instructional hours | Camp detail | ✅ |
| **15 / 60** seats | Camp capacity | ✅ with a caution: never fabricate scarcity |
| **$450 / $400** | Camp hero only | ✅ hero · ❌ near CTA |
| Student / showcase counts | ⚠️ No verified figure exists | ❌ Do not invent |

---

## 8. Gallery animation

### Showcase grid

- Masonry or justified rows, `fade-rise` with `stagger-base`, grouped by row beyond 8 items
- Hover: scale 1.03, warm overlay lifts, caption rises from the bottom edge. 200ms, `ease-stage`. **Touch devices: no hover state at all** — captions are always visible.
- Click: `FLIP`-style transition from grid position into the lightbox. The image travels; it does not cross-fade. This is the single most satisfying interaction available and worth doing properly.

### Lightbox

- Backdrop fades to `stage-950` at 92% opacity, 280ms
- Image arrives via FLIP from its grid position, `ease-stage`, 420ms
- Navigation: arrow keys, swipe, on-screen controls. Escape closes and **returns the image to its grid position**, not a fade-out.
- Focus trapped while open; returned to the originating thumbnail on close
- Counter ("4 of 18") and caption always visible
- Preloads adjacent images; never blocks on network

### Prohibitions

- ❌ No auto-advancing carousels. The current site has an auto-slider; it is an accessibility and comprehension failure.
- ❌ No infinite loop galleries without a visible position indicator
- ❌ No Ken Burns drift on gallery thumbnails — reserved for a single hero image if used at all

---

## 9. Hero animation

The most-seen 3 seconds of the project.

### Homepage sequence

```
0ms      Ground and hero photograph present at paint. LCP element. No JS dependency.
         The image is dark, under-lit — the house before the show.

150ms    curtain-up on the H1, two lines, stagger-tight.
         "In 90 days, your child takes a stage."

400ms    A warm light gradient sweeps across the photograph, lifting the subject
         out of shadow. 900ms, ease-stage. The spotlight finding the performer.

520ms    fade-rise on the supporting line.

680ms    fade-rise on the primary CTA, plus a single soft spotlight glow pulse
         (one pulse only, never looping).

850ms    Scroll affordance fades in with a slow 2s vertical drift loop.

Total    ~1.7s to full state. Content is legible from 0ms.
```

### Interior page heroes

Reduced version: static image, `curtain-up` on the H1, `fade-rise` on the sub-line and breadcrumb. No light sweep, no glow. **The light sweep belongs to the homepage only** — repeating it everywhere makes it a template flourish rather than a brand moment.

### Hard rules

1. **The hero headline is never `opacity: 0` in CSS.** It is present, then enhanced. A JS failure must not produce a blank hero.
2. **The hero image is never lazy-loaded** and never waits on an animation to become visible.
3. **No auto-playing video with sound.** Muted, poster-first, user-initiated playback only, with a visible pause control.
4. **No text over a moving background** at any point where it must be read.

---

## 10. Timeline animation — the signature moment

The 90-Day Stage Program, weeks 1 → 12, scroll-driven. This is the piece that communicates the entire product in ten seconds.

### Structure

```
STAGE 1 · Weeks 1–10 — Build the skill
  A horizontal rule draws left to right, week markers illuminating in sequence.
  Ambient light is cool and low. Copy: "Weeks 1–10 · Skill development & rehearsal."

STAGE 2 · Week 11 — Play for the class
  The rule reaches a wider marker. Light warms slightly. A small cluster of
  figures/points appears around the performer — the first audience.
  Copy: "Week 11 · Peer exposure."

STAGE 3 · Week 12 — The showcase
  The rule terminates in a full spotlight bloom. The ambient ground darkens;
  the performer point becomes the brightest thing on screen.
  Copy: "Week 12 · Dress rehearsal & live showcase."

RELEASE
  The pin releases into a real showcase photograph — the abstract diagram
  resolving into evidence. This transition is the emotional payoff.
```

### Technical direction

- Scroll-scrubbed with smoothing, not time-based
- Pin duration ~250vh
- Progress indicator visible throughout (Week 1 ▸▸▸ Week 12)
- Week markers use `spot-400`; the completed rule uses `spot-500`; upcoming uses `stage-700`
- **Vector/DOM-based, not video** — must remain crisp, translatable, and readable by assistive technology

### Degradation

| Condition | Behaviour |
|---|---|
| Below `lg` | Vertical stacked steps, `fade-rise` each, no pin |
| Reduced motion | Static diagram, all three stages visible at once, fully labelled |
| No JS | Static diagram, all stages visible |
| Slow device (see §15) | Static diagram |

**In every degraded state the full week structure is readable.** The animation dramatises information; it never carries it exclusively.

⚠️ Copy blocked on gate B-4 (the 90-day promise wording) and gate B-3 (ladder rungs).

---

## 11. Hover animation

Desktop pointer only. **Never the sole indicator of interactivity.**

| Element | Hover | Duration |
|---|---|---|
| Primary button | Fill −8% lightness, spotlight glow intensifies, `elev-2` | 180ms |
| Secondary button | Fill −8%, `elev-1` | 180ms |
| Tertiary button | Border → `velvet-700`, background → `n-100` | 180ms |
| Card | `elev-1 → elev-2`, media scale 1.03, translateY −2px | 200ms |
| Instrument card | Icon draws in with a 300ms stroke animation | 300ms |
| Text link | Underline draws left→right, 2px, `velvet-700` | 180ms |
| Nav item | Underline draws from centre outward | 180ms |
| Teacher card | Portrait desaturate→saturate, name slides up 4px | 220ms |
| Gallery item | Scale 1.03, overlay lifts, caption rises | 200ms |
| Footer link | Colour → `spot-400` | 150ms |

### Rules

1. **`@media (hover: hover) and (pointer: fine)`** — hover states never apply on touch. Sticky-hover on mobile is a persistent, well-documented bug class.
2. **Exit is 60% of entry duration**, `ease-exit`.
3. **Never move the click target.** Scale and shadow are fine; translation that shifts the hit area causes mis-clicks.
4. **No hover-only content.** Anything essential is visible or focusable — this is a WCAG 2.2 requirement and matters doubly for a Unique Abilities audience.
5. **Focus-visible mirrors hover** plus the focus ring. Keyboard users get the same affordance.

---

## 12. Page transitions

### Recommendation: restrained

Full-page transitions add perceived latency and complicate accessibility. For a site whose primary job is answering a parent's questions quickly, **speed beats theatre**.

**Approved pattern — spotlight dim:**
```
Exit:   Content fades to 0 with a 4px downward drift.   200ms, ease-exit
        A stage-950 veil rises to ~85% opacity.
Enter:  Veil clears. New content fades up, no drift.    280ms, ease-stage
        Then the page's own reveal sequence begins.
Total:  ~480ms
```

### Rules

1. **Maximum 500ms total.** Beyond that, users perceive the site as slow.
2. **Never block the first paint** of the incoming page.
3. **Focus moves to the new page's H1** or a skip target on every navigation.
4. **Route change announced** via a polite live region for screen readers.
5. **Reduced motion:** no transition at all — instant swap.
6. **Browser back/forward is instant.** Never animate a history navigation; it fights the user's mental model.
7. **Scroll position restored** on back navigation.

### Explicitly rejected

- ❌ Curtain-wipe page transitions — thematically tempting, but 800ms+ on every navigation and it hurts the parent journey most
- ❌ Shared-element transitions between routes — high complexity, fragile, low payoff here
- ❌ Loading spinners on internal navigation — if a page needs a spinner, fix the page

---

## 13. Micro-interactions

| Interaction | Behaviour |
|---|---|
| Form field focus | Border → `spot-500`, 2px ring, label lifts 2px. 180ms |
| Validation success | Green check draws in, 300ms, `ease-spot` |
| Validation error | Field shakes **once**, 6px, 240ms. No repeat, no colour flash. |
| Submit → loading | Label persists, spinner appears, **width locked** |
| Submit → success | Button morphs to a confirmation state, checkmark, then the success panel |
| Accordion open | Height auto-measured, 280ms `ease-stage`; chevron rotates 180° |
| Tab switch | Underline slides between tabs, 220ms; panel cross-fades 180ms |
| Toast | Slides from bottom-right (desktop) / bottom (mobile), 280ms; auto-dismiss 5s with a visible progress rule; pausable on hover |
| Copy-to-clipboard | Icon swaps to a check for 1.5s |
| Capacity update | Number counts to new value; if crossing a threshold, the warning badge pulses **once** |
| Language switch | 200ms cross-fade, scroll position preserved |

**Micro-interaction budget: ≤3 concurrent animations in any viewport at any moment.** Beyond that the interface reads as jittery.

---

## 14. Reduced motion strategy

`prefers-reduced-motion: reduce` is honoured globally and is **not** a degraded experience — it is a first-class alternative presentation.

### Global policy

| Category | Reduced-motion behaviour |
|---|---|
| Entrance reveals | **Opacity only**, 200ms. No translation, no scale. |
| Parallax | Disabled |
| Scrub / pinned sequences | Static, fully expanded, all steps visible and labelled |
| Counters | Final value rendered immediately |
| Hero light sweep | Static final state |
| Page transitions | None — instant |
| Hover scale/lift | Colour and shadow only, no transform |
| Gallery FLIP | Simple fade |
| Auto-advancing anything | Disabled (there is none by policy anyway) |
| Loading spinners | Retained — they convey system status, which is not decorative |
| Focus indicators | **Never reduced.** Always full strength. |

### Principles

1. **Opacity is generally safe; transform generally is not.** Vestibular triggers come from movement, not from fading.
2. **Never remove information.** Reduced motion must show *more* at once, not less.
3. **Ship a manual toggle** in the footer alongside the OS preference, persisted in local storage. Many users don't know the OS setting exists.
4. **Test every animated surface** with the preference on. This is a launch gate.

---

## 15. Performance rules

Motion is the first thing to make a site feel cheap when it stutters.

### Budgets

| Metric | Target |
|---|---|
| Animation frame rate | 60fps sustained; **never below 50fps** on a mid-range Android |
| Main-thread block from motion | <50ms per interaction |
| GSAP + ScrollTrigger bundle | <45KB gzipped |
| Total animation JS | <70KB gzipped |
| LCP | <2.5s on 4G mobile — **never JS-dependent** |
| CLS from animation | **0.00** — animation must never contribute layout shift |
| INP | <200ms |

### Implementation rules

1. **Animate `transform` and `opacity` only.** Never `width`, `height`, `top`, `left`, `margin`, `box-shadow` (use layered pseudo-elements), or `filter` in a scroll loop.
2. **`will-change` applied immediately before an animation and removed after.** Persistent `will-change` exhausts GPU memory on mobile.
3. **ScrollTrigger instances are killed on route change.** Orphaned triggers are the most common memory leak in GSAP sites.
4. **Batch reveals.** One trigger managing a group beats twelve individual triggers.
5. **Everything below the fold is lazy-initialised.** No animation setup cost for content not yet approached.
6. **Debounce resize; refresh ScrollTrigger only after resize settles.**
7. **Device capability check at boot** — if `hardwareConcurrency ≤ 4` or `deviceMemory ≤ 4GB`, disable scrub, pinning and parallax; keep simple reveals.
8. **`Save-Data` header honoured** — degrade to reduced-motion behaviour.
9. **Motion never gates content.** All content is in the DOM and readable regardless of animation state.
10. **No animation library on the critical path.** GSAP loads after first paint.

### Monitoring

Track long tasks and dropped frames on animated routes in production, sampled. If the 90-Day Timeline drops below 50fps on the P75 device, it degrades to the static diagram automatically.

---

## 16. What must NEVER be animated

A hard list. These are not stylistic preferences.

### Never animated — content integrity

1. **Prices at the point of decision.** A number the user is about to pay must be static and instantly readable.
2. **The deposit amount, refund terms, or any policy text.** Legal and commercial terms never move, never reveal on scroll, never sit behind an interaction.
3. **Camp dates, times, ages, and capacity limits** in the booking context.
4. **The Stage-Ready Guarantee text.** It is the primary risk-reversal; it must be legible instantly.
5. **Contact details** — address, phone, hours. A parent may be reading these while driving to the studio.
6. **Error messages.** Appear instantly, in place, no entrance animation.
7. **Form validation feedback** beyond the single 240ms shake.
8. **Safeguarding, medical or consent information.**

### Never animated — accessibility

9. **Focus indicators.** Instant, always, at full strength.
10. **Skip links.**
11. **Anything that would move a target between intent and click.**
12. **Text while it is being read** — no parallax, no drift, no continuous motion under body copy.
13. **Content that only appears on hover.**

### Never animated — performance

14. **The LCP element's visibility.** The hero image and headline are present at paint.
15. **Above-the-fold layout.** No entrance animation may cause any layout shift.
16. **Anything during page load** before first contentful paint.

### Never done at all

17. ❌ Auto-advancing carousels
18. ❌ Scroll-jacking, forced snapping, wheel hijacking
19. ❌ Cursor-following elements or custom cursors
20. ❌ Preloader animations — if the site needs a preloader, the site is too heavy
21. ❌ Text scrambles or typewriter effects on headings — they delay comprehension and break screen readers
22. ❌ Infinite looping animation in the viewport during reading (except the 2s scroll affordance drift)
23. ❌ Background video autoplay on mobile
24. ❌ Animated photographs of students — the imagery is documentary evidence; treating it as motion graphics undermines its credibility
25. ❌ Confetti, sparkles, musical-note particles

---

## 17. Motion by template

| Template | Motion budget | Signature |
|---|---|---|
| **Home** | High | Hero light sweep + 90-Day Timeline |
| **90-Day Program** | High | Timeline + Exposure Ladder |
| **Programme detail** | Medium | Reveals, editorial `slide-reveal` |
| **Instrument** | Low | `fade-rise`, icon draw on hover |
| **Camps** | Medium | Counters (hero only), capacity indicator |
| **Scholarships** | **Minimal** | Reveals only. This page must feel plain, procedural and trustworthy. |
| **Pricing** | **Minimal** | No motion on any figure. Reveals only. |
| **Performances** | High | Gallery FLIP, lightbox |
| **Teachers** | Low | Card reveals, portrait hover |
| **FAQ / policies** | **None** | Accordion mechanics only |
| **Contact / booking** | **None** | Form micro-interactions only |
| **404** | Low | Single reveal |

**Pattern:** motion intensity is inversely proportional to how close the user is to a decision. Persuasion sections may be cinematic. Transaction and policy pages are still.

---

## 18. Motion decision gates

| Gate | Question | Blocks |
|---|---|---|
| **M-1** | Confirm the Gradual Exposure Ladder rungs (= B-3) | Pinned sequence 2 |
| **M-2** | Approve 90-day promise wording (= B-4) | Timeline copy |
| **M-3** | Is showcase footage available for the timeline release moment? | Timeline payoff — currently zero video exists |
| **M-4** | P75 device profile confirmed from analytics? | Performance degradation thresholds |

---

**Next:** `06-seo-strategy.md`
