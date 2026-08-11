# Live-site parity — pre-client-review

**Internal. Not linked publicly, not in the sitemap, not indexed.**

Source: live re-crawl of `https://southdademusic.com` (cache bypassed) during the
pre-client-review pass, compared against the local production build.

---

## A · Verified migrated facts

| Fact | Live | Redesign |
|---|---|---|
| 12-week structure: Weeks 1–10 skill, Week 11 peer exposure, Week 12 dress rehearsal + live showcase | ✓ | ✓ verbatim, now as three phases |
| Stage-Ready Guarantee — coaching continues at no additional charge until ready | ✓ | ✓ verbatim |
| Trial: $25 spot-hold, credited to tuition on enrolment | ✓ | ✓ |
| Step Up: approved provider, PEP + UA, administered by Step Up not SDM | ✓ | ✓ including the disclaimer |
| Ages 3–18, early childhood 3–6, adults welcome | ✓ | ✓ |
| Instruments: piano, guitar, drums, violin, bass, ukulele, keyboard | ✓ | ✓ (keyboard listed, unlinked — no page exists) |
| Gradual Exposure Ladder for shy students | ✓ | ✓ verbatim |
| Programmes: Band Builders, Early Childhood, Summer, 90-Day, Private Lessons | ✓ | ✓ + Group Lessons |
| Testimonials (12 Google reviews) | ✓ | ✓ published as written |
| Performances positioning: recitals, community events, "when they feel ready" | ✓ | ✓ conditional preserved |
| Three performance slogans | ✓ | ✓ verbatim |
| "Because once they realize they can get through something that feels scary…" | ✓ | ✓ verbatim, protected copy |

## B · Intentionally improved presentation (facts unchanged)

| Live presentation | Redesign |
|---|---|
| Mission written around "Music Lessons Near Me" / "Kids Music Classes South Dade" | SEO phrasing dropped, meaning kept |
| `o ` bullet artifacts in the 12-week list | Removed |
| "Class mein performance" (untranslated) | "Peer exposure — they play for the class." |
| "Exceution" typo in the four-pillar block | Not reproduced |
| Programme cards repeated **three times** on the homepage | One numbered index |
| Testimonials repeated twice | Published once |
| Six-image performance slider | Art-directed portfolio across four distinct events |

## C · Omitted legacy content

- Keyword-stuffed mission statement (owner rewrite pending)
- Duplicate programme and testimonial blocks
- The `m1000x1000` stock imagery and generic icon set
- Step Up For Students trademark artwork (third-party mark)

## D · Unresolved contradictions

See `content-conflicts.md`. Headlines: the unconditional "every student" promise,
lesson frequency (one class vs two weekly), bilingual support claimed but not
built, and the trial CTA pointing at a third-party widget the redesign does not
yet submit into.

## E · Owner decisions needed

1. Is "every student steps on stage within 90 days" defensible? (B-4)
2. One class weekly or two? (frequency)
3. Does the redesign's trial route submit into the existing booking system?
4. Ship a Spanish tree, or stop claiming full bilingual support?
5. Introduce instructors properly, or leave them named only inside reviews?
6. Tuition — published nowhere today (B-8)
7. Unit number: 117 vs 1157 vs 115 (I-8)
8. The reserved "shout" word on the homepage — still blank, still the owner's

## F · Routes / content still missing

- **`/es`** — no Spanish tree
- **`/teachers`** — gated (B-7)
- **Live event dates** — the estate publishes none; both legacy event URLs 404
- **Tuition** — unpublished
- **Exterior / entrance photography** — none exists, so `/contact` stays unillustrated

## G · Generated-media disclosure

Every generated asset, where it appears, and why photography could not serve:

| Asset | Where | Why generated |
|---|---|---|
| `walk-backstage` (Veo video) | Hero + The Walk | No footage of an empty stage before a performance exists, and staging one would be documentary invention. Contains no people, text or branding. |
| `week-practice` / `week-peers` / `week-stage` | The three 12-week phases | No week-by-week photography exists. Still lifes only — manuscript and metronome, a microphone before empty chairs, a stage from the wings. |
| `atmos-curtain-shadow` | The Reframe | Interior weather; a documentary photograph would break the film's fiction. |
| `atmos-paper-tooth` | The desk | Paper texture. |
| `instrument-keys` / `-strings` / `-percussion` | `/lessons` instrument index | A uniform index object; real photographs would make seven instruments look like seven different claims. |

**No generated asset depicts South Dade students, instructors, facilities or
events.** Documentary truth is carried only by approved photography.

## H · Media provenance summary

- **21 authentic photographs published**, all first-party, all owner-approved from the existing portfolio, each carrying its census audit ID in the DOM as `data-audit`
- Source URLs, legacy source pages and crops recorded in `src/lib/media/catalog.ts` and `docs/implementation/production-media-integration.md`
- **Authentic logo** now used: census #76 (1536×914 master) for the desk register, plus a white variant matching the live site's own navbar treatment
- Multi-megabyte originals remain in `.audit/legacy-assets/` and are never published
- **Excluded:** stock `m1000x1000` frames, the Step Up trademark, and three frames whose projection names a performing child
