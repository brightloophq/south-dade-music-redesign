# Production media integration — approved South Dade portfolio

**Approval basis for every image below: OWNER APPROVED EXISTING PORTFOLIO.**

The owner approved reuse of the South Dade Music portfolio already published on
the live site. The I-1 (consent) and I-7 (photographer copyright) gates that
blocked this material through MI1 and MI2 are resolved **for this portfolio**.
That approval does not extend to stock or template imagery that happened to sit
on the legacy site, and it does not extend to third-party partner marks. Neither
is published here.

Files live in `public/media/`. Originals stay in `.audit/legacy-assets/` and are
never published. Audit IDs refer to rows in the 67-image visual census.

## Published images

| Audit | File | Route | Section | Crop | Source page | Replaced |
|---|---|---|---|---|---|---|
| #65 | `stage-floral.jpg` | / | House-lights reveal (full viewport) | whole | `/about/` | `stage-empty-chair` |
| #31 | `bass-hands.jpg` | / | Programs visual rail | left 940, top 205, 600x1500 | `/bass-guitar-lessons/` | `instrument-strings` |
| #26 | `recital-room.jpg` | / and /performances | Performance-evidence band; audience room under the quotes | whole | `/piano-lessons/` | `atmos-stage-floor` |
| #10 | `band-showcase.jpg` | /performances | Opening frame — a showcase in progress | whole | `/` | `stage-empty-chair` |
| #20 | `ensemble-leis.jpg` | /performances | The ensemble on stage | whole | `/90-day-stage-program/` | — (new slot) |
| #24 | `bass-on-stand.jpg` | /performances | Marginal detail beside "no date announced" | left 480, top 150, 1120x1320 | `/guitar-lessons/` | `instrument-strings` |
| #54 | `stage-set-purple.jpg` | /programs/90-day-stage-program | Preparation — the room set on showcase day | whole | `/` | — (new slot) |
| #23 | `medals.jpg` | /programs/90-day-stage-program | The finale | left 40, top 420, 1920x930 | `/private-lessons/` | `stage-empty-chair` |
| #28 | `medals-on-stage.jpg` | /programs/90-day-stage-program | The outcome — students with medals | whole | `/drum-lessons/` | — (new slot) |
| #29 | `ensemble-guitars.jpg` | /programs/band-builders | Alone → together | whole | `/violin-lessons/` | `instrument-percussion` |
| #11 | `lesson-room.jpg` | /lessons | The room, above the instrument index | whole | `/` | `(route had no image at all)` |
| #30 | `ukulele-wall.jpg` | /private-lessons | The teaching room | left 51, top 29, 768x605 | `/early-childhood/` | `instrument-keys` |
| #68 | `banner.jpg` | /about | In the community — inline proof | whole | `/programs/` | `(collapsed in production)` |
| #21 | `community-event.jpg` | /about | In the community — families after a showcase | whole | `/90-day-stage-program/` | — (new slot) |
| #34 | `camp-circle.jpg` | /camps | A camp session in progress | whole | `/summer-programs/` | — (new slot) |

## Source URLs

| Audit | File | Original |
|---|---|---|
| #65 | `stage-floral.jpg` | https://southdademusic.com/wp-content/uploads/2026/05/0_p-NH2ecjjuoHdJct-1024x683-2.png |
| #31 | `bass-hands.jpg` | https://southdademusic.com/wp-content/uploads/2026/05/IMG_2582-scaled.jpg |
| #26 | `recital-room.jpg` | https://southdademusic.com/wp-content/uploads/2026/05/P1088524.jpg |
| #10 | `band-showcase.jpg` | https://southdademusic.com/wp-content/uploads/2026/04/ozel-gitar-kursu-2-3.png |
| #20 | `ensemble-leis.jpg` | https://southdademusic.com/wp-content/uploads/2026/05/P1088653.jpg |
| #24 | `bass-on-stand.jpg` | https://southdademusic.com/wp-content/uploads/2026/05/P1088541.jpg |
| #54 | `stage-set-purple.jpg` | https://southdademusic.com/wp-content/uploads/2026/04/Exposure-scaled.jpg |
| #23 | `medals.jpg` | https://southdademusic.com/wp-content/uploads/2026/05/P1088548.jpg |
| #28 | `medals-on-stage.jpg` | https://southdademusic.com/wp-content/uploads/2026/05/P1088659.jpg |
| #29 | `ensemble-guitars.jpg` | https://southdademusic.com/wp-content/uploads/2026/05/P1088639.jpg |
| #11 | `lesson-room.jpg` | https://southdademusic.com/wp-content/uploads/2026/04/ozel-gitar-kursu-2-4-1.png |
| #30 | `ukulele-wall.jpg` | https://southdademusic.com/wp-content/uploads/2026/05/IMG_5012-scaled.jpg |
| #68 | `banner.jpg` | https://southdademusic.com/wp-content/uploads/2026/05/New-Project.png |
| #21 | `community-event.jpg` | https://southdademusic.com/wp-content/uploads/2026/05/P1088667-1.jpg |
| #34 | `camp-circle.jpg` | https://southdademusic.com/wp-content/uploads/2026/05/PHOTO-2025-06-28-19-06-09.jpg |

## Optimisation

Every file is resized and mozjpeg-encoded from the original at generation time,
then served by Next as AVIF/WebP at the widths each slot requests, `quality=72`,
all lazy-loaded.

| File | Source | Published | On disk |
|---|---|---|---|
| `stage-floral.jpg` | 1024x683 | 1024x683 | 91 KB |
| `bass-hands.jpg` | 2560x1920 | 600x1500 | 39 KB |
| `recital-room.jpg` | 2000x1500 | 1800x1350 | 248 KB |
| `band-showcase.jpg` | 1000x667 | 1000x667 | 82 KB |
| `ensemble-leis.jpg` | 2000x1500 | 1800x1350 | 170 KB |
| `bass-on-stand.jpg` | 2000x1500 | 900x1061 | 106 KB |
| `stage-set-purple.jpg` | 2560x1707 | 1800x1200 | 168 KB |
| `medals.jpg` | 2000x1500 | 1800x872 | 164 KB |
| `medals-on-stage.jpg` | 2000x1500 | 1600x1200 | 161 KB |
| `ensemble-guitars.jpg` | 2000x1500 | 1800x1350 | 213 KB |
| `lesson-room.jpg` | 1000x667 | 1000x667 | 77 KB |
| `ukulele-wall.jpg` | 2560x1440 | 768x605 | 39 KB |
| `banner.jpg` | 441x759 | 441x759 | 35 KB |
| `community-event.jpg` | 2000x1500 | 1600x1200 | 186 KB |
| `camp-circle.jpg` | 2048x1536 | 1600x1200 | 281 KB |

**Total on disk: 2.01 MB across 15 images.**

Measured image payload in production (after Next optimisation):

| | Desktop 1440 | Mobile 390 |
|---|---|---|
| `/` | 109 KB | 37 KB |
| `/performances` | 128 KB | 39 KB |
| `/programs/90-day-stage-program` | 118 KB | 29 KB |
| `/camps` | 67 KB | 14 KB |
| `/about` | 35 KB | 17 KB |
| `/lessons` | 33 KB | 20 KB |
| `/programs/band-builders` | 29 KB | 12 KB |
| `/private-lessons` | 12 KB | 8 KB |
| **all 8 routes** | **531 KB** | **177 KB** |

## Authentic images deliberately NOT used

| Audit | Why not |
|---|---|
| #36 and the other `m1000x1000` frames | Stock, not South Dade material. The owner's approval covers the academy's own portfolio; these are template images that happened to sit on the legacy site. Explicitly excluded. |
| #58 Step Up For Students mark | Third-party registered trademark. Not covered by this approval. |
| #46–52 blue line icons, #73 "coming soon" | Generic UI graphics, no evidential value. |
| #16, #53, #64 | The projection in frame **names a performing child**. Publishing a child's name is a different question from publishing their photograph and was not part of this approval. |
| #15, #17, #22 balloon-arch portraits | Posed family portraits. Nothing on the site needs them and they read as private snapshots. |
| #5, #8, #13, #27, #33, #55, #63, #66, #67 | Genuine and usable, simply not needed. Every slot that wanted a photograph has a stronger one. Adding these would be image overload, which the brief forbids. |
| `room-drums` (#30 crop) | Rejected in MI1 on sight — the crop's honest content is a microwave, plastic bags and wire shelving. Superseded by #11. |

## Contact — deliberately unillustrated

The census established the portfolio has no exterior, entrance, reception or
street view. `/contact` therefore carries no photograph. No unrelated
performance image was repurposed to fill the space, and no exterior was
fabricated. **This gap is unchanged and remains the clearest reason to
commission a short shoot.**

## Generated assets after this change

| Asset | Status |
|---|---|
| `atmos-stage-floor` | **STILL USED** — The Walk. Interior weather a documentary photograph cannot carry. |
| `atmos-curtain-shadow` | **STILL USED** — the Reframe wings. |
| `atmos-paper-tooth` | **STILL USED** — the desk's paper stock. |
| `instrument-keys` / `-strings` / `-percussion` | **STILL USED** — the instrument-family index on `/lessons`, via `content/lessons.ts`. |
| `stage-empty-chair` | **DEAD** — was the production fallback for the reveal, `/performances` and the 90-Day finale; all three now carry authentic photography. Retained on disk, referenced by nothing. |
| `atmos-spotlight-cone`, `atmos-warm-bloom`, `atmos-depth-folds`, `homepage-hero-stage-light`, `homepage-hero-stage-light-mobile` | **DEAD** — and already unused before this change. Retained. |

Nothing was deleted. Six generated plates are now unreferenced and total roughly
13 MB in `public/images/generated/`; removing them is a separate decision for
the owner, not a side effect of this task.
