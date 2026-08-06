# 08 — Motion Capabilities

What can move, how it moves, and what may never move.

---

## 1. What is available

| Capability | Library |
|---|---|
| Timelines, tweens, easing | **GSAP 3.15** |
| Scroll-driven scrub, pinning, batching | **ScrollTrigger** |
| Per-character / per-line text splitting | **SplitText** |
| Layout-position morphing | **Flip** |
| Custom easing curves | **CustomEase** |
| Smooth scrolling | **Lenis**, driven by `gsap.ticker` |
| Responsive variants + automatic cleanup | `gsap.matchMedia()`, `gsap.context()` |
| High-frequency property writes | `quickSetter()`, `quickTo()` |
| Generative texture | Canvas 2D |

**WebGL and 3D are deliberately not used.** Nothing in this concept needs them,
and they would cost the LCP to buy atmosphere that CSS and Canvas already
deliver.

## 2. The five timelines already built

The homepage runs a single `FilmDirector` that owns seven registered timelines:

| Timeline | What it does | Scrub |
|---|---|---|
| **GradeTimeline** | The colour grade evolving across the whole document | yes |
| **HeroTimeline** | The opening | 0.8 |
| **WalkTimeline** | The walk itself | 0.9 |
| **JourneyTimeline** | The 90-day sequence — **pinned** | 0.7 |
| **FirstNoteTimeline** | The release moment | triggered |
| **FinaleTimeline** | The close | 1 |
| **EmergeBatch** | Element entrances | batched |

Verified live: 19 ScrollTrigger instances, all 7 timelines created, Lenis
driving scroll.

## 3. The light is a character

There is **one light source** on the page with a position, an intensity and a
temperature, exposed as CSS custom properties:

`--light-x` · `--light-y` · `--light-intensity` · `--light-flare` ·
`--atmos-tint` · `--atmos-warmth` · `--vignette` · `--scroll-progress` ·
`--emerge`

**Everything is lit by it** — the floor, the figure, the grain, and the type.
Seven named moods exist: `wait · search · follow · hesitate · explode ·
disperse · shaft`.

This is the most distinctive capability in the build. A design that uses it will
feel like a place; a design that ignores it will feel like a document.

## 4. Camera language

Available and implemented: `push` · `pull` · `plane` (parallax depth) ·
`rackFocus` · `breathe`.

❌ Never: shake, spin, or unnecessary rotation.

## 5. Motion budget by template

Intensity is **inversely proportional to how close the user is to a decision.**

| Template | Budget |
|---|---|
| home, program-flagship, performances | **high** |
| camps, program-detail | medium |
| instrument, teachers | low |
| scholarships, pricing | **minimal** |
| **faq, contact** | **none** |

## 6. Pinning is rationed

- **Maximum two pinned sequences sitewide** — registered in config so a third
  cannot be added silently
- Maximum **300vh** of scroll per pin — longer and users feel trapped
- Desktop and large tablet only; below `lg` it degrades to stacked steps

Approved pins: the 90-day timeline, and the Exposure Ladder (⚠️ gate B-3).

## 7. Never animated

These are not stylistic preferences. They are held as data so components can
assert them:

`price-at-decision` · `deposit-amount` · `refund-terms` · `policy-text` ·
`camp-dates` · `capacity-limits` · `guarantee-text` · `contact-details` ·
`error-messages` · `focus-indicators` · `skip-links` ·
`safeguarding-information`

**A number a parent is about to act on must never be in motion.**

## 8. Prohibited outright

❌ `auto-advancing-carousels` · `scroll-jacking` · `forced-snapping` ·
`wheel-hijacking` · `cursor-followers` · `custom-cursors` · `preloaders` ·
`text-scramble` · `typewriter-headings` · `infinite-loops-during-reading` ·
`background-video-autoplay-mobile` · `animated-student-photography` ·
`confetti-sparkles-note-particles`

Also explicitly rejected by the creative direction:

❌ Horizontal scroll — nauseating on trackpads, hostile on phones
❌ Parallax on text — unreadable and an accessibility failure
❌ A sticky CTA during the film — *"a salesman at a funeral"*
❌ A loading percentage — the dark opening **is** the load screen

## 9. Forbidden reveal vocabulary

❌ **fade up · slide up · stagger.**

These are banned by name. They are the default vocabulary of every template on
the web, and the page currently uses **zero** of them.

If an element must appear, it should be **revealed by light, by mask, by
clip-path, or by the camera moving** — not by translating upward into opacity.

## 10. Reduced motion

`prefers-reduced-motion` is honoured, **and** users get an explicit in-page
override stored under `sdm:reduced-motion`.

Under reduced motion the page must still tell the whole story. The documented
approach is a **parallel cut**, not a degraded one: the same narrative, the same
colour arc, delivered without movement. Scrub becomes state; the light stops
travelling but still changes.

**Design implication:** every scroll-driven moment needs a static equivalent
that carries the same meaning. If a section is unintelligible without motion,
it is not finished.

## 11. Capability tiers

Motion degrades on genuinely low-end hardware — `cores ≤ 2` or `memory ≤ 2`GB,
or modest on both. Below that floor, scrub, pinning, parallax and smooth
scrolling are switched off.

Five independently gated capabilities: `reveals` · `scrub` · `pinning` ·
`parallax` · `smoothScroll`.

⚠️ Gate **M-4** — the P75 device profile has never been confirmed from
analytics. The tiers are engineering estimates.
