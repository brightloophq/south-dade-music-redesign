# 10 — Launch Plan

**Phase:** 3 — Product Strategy
**Date:** 2026-08-05
**Depends on:** all preceding Phase 3 documents

---

## 0. The critical path is not code

The most important finding of this planning phase:

> **This project is not blocked by engineering. It is blocked by eight business decisions and one photography shoot.**

A homepage cannot be built without a price, a promise that survives scrutiny, a brand name, and a photograph of a real teacher. All four are owner decisions. **Engineering can begin immediately on foundation work, but the homepage cannot be completed until the gates close.**

### Gate summary — the blocking set

| Gate | Decision needed | Blocks | Latest date |
|---|---|---|---|
| 🔴 **B-5 / S-1** | **NAP resolution** — one brand name, one unit number (117/1157/115), one phone, one email | Structured data, GBP, every citation, footer, contact page, **schema on every page** | Before Phase 1 ends |
| 🔴 **B-8** | **Pricing** for every product + **the camp deposit amount** | `/pricing`, all programme cards, booking flow, `Course` schema | Before Phase 3 |
| 🔴 **B-4** | **Approve honest 90-day promise wording** | Hero, footer, timeline, all advertising | Before Phase 2 |
| 🔴 **B-7 / D-4** | **Instructor names, credentials, publication consent** | `/teachers`, trust layer, parent journey stage 3 | Before Phase 2 |
| 🔴 **I-1** | **Photo-release consent** for all 18 existing photos | **Every real image on the site** | Before Phase 1 ends |
| 🟠 **D-3 / I-2** | **Photography + video budget** | The entire visual system | Before Phase 2 |
| 🟠 **S-2** | **Legally approved Step Up provider wording** | `/scholarships`, schema | Before Phase 3 |
| 🟠 **B-6** | **Bilingual: build it or drop the claim** | Scope, content model, budget, all components | Before Phase 1 ends |

**Recommendation:** hold a single 90-minute decision workshop with the owner in week 1, using `content-conflicts.md` as the agenda. Eight decisions, one meeting. Everything downstream depends on it.

---

## 1. Phase 1 — Foundation

**Goal:** a deployable shell with tokens, components and content infrastructure — plus the decisions that unblock everything else.
**Duration:** 3 weeks

### Workstreams

**A · Decisions (owner-led, week 1)**
Run the decision workshop. Resolve B-4, B-5, B-6, B-7, B-8, S-2, D-3, I-1. Record outcomes in the `Claim` registry (`08-content-model.md` §2).

**B · Urgent fixes to the *current* site** — do not wait for the redesign
| Fix | Why |
|---|---|
| `noindex` + remove `/members/` | Lorem ipsum indexed and published into its meta description |
| Remove editorial notes from `/group-music-lessons/` and `/singing-lessons/` | *"Internal Links to Add:"* visible to visitors |
| 301 `/summer-camp/` → camp page | Empty, indexable, ranks for camp queries |
| Archive expired 2026 camp pages | Still soliciting reservations a month after both sessions ended |
| Swap the three wrong-instrument heroes | Correct images already exist unused in the media library |
| Repoint staging-domain images to local files | 22+ pages depend on a third-party server |

**C · Engineering foundation**
Repo, CI/CD, environments · design tokens from `04-design-system.md` · self-hosted Archivo + Inter, subset · CMS with the full `08-content-model.md` schema **including all 12 publish gates** · image pipeline (AVIF/WebP, responsive, focal point) · analytics with intent segmentation ⚠️ **audit and recover existing tags first (gate S-8)** · accessibility tooling in CI (axe-core) · Lighthouse budgets in CI

**D · Content infrastructure**
Migrate all 40 FAQs, 14 testimonials, 7 instruments, 6 programmes into the model · seed the `Claim` registry with all 11 claims and their statuses · build the redirect map (30 rows, `02-information-architecture.md` §11) · begin the photo-consent process

**E · Component build — P0 groups**
Layout (10) · Navigation (13) · Utility (16) · Button, Card primitives

### Exit criteria
- [ ] All 8 blocking gates resolved and recorded
- [ ] Urgent current-site fixes live
- [ ] Tokens, typography and CI operational
- [ ] Content model deployed with all 12 publish gates enforced
- [ ] Existing content migrated
- [ ] P0 components in a live component review environment
- [ ] Photo-consent process running

---

## 2. Phase 2 — Homepage

**Goal:** the single page that carries the repositioning.
**Duration:** 3 weeks · **Depends on:** B-4, B-5, B-7, D-3

### Scope
Hero with the full motion sequence · the transformation narrative (six beats, `01-brand-strategy.md` §12) · the 90-Day Timeline (signature moment) · programme grid — **rendered once**, not three times · instrument strip — **linked**, unlike today · Stage-Ready Guarantee callout · testimonials — **12 unique, rendered once each**, not 18 cards · proof bar · showcase gallery · scholarship entry · FAQ (7 items) · final CTA · footer with resolved NAP

### Critical requirements
1. **The protected line survives:** *"Because once they realize they can get through something that feels scary, it changes how they approach everything else."*
2. **Zero keyword-stuffed copy.** All banned phrases removed.
3. **Zero duplicate rendering.**
4. **Price in the CTA label** — "Book a Trial — $25".
5. **LCP <2.5s** on 4G mobile, never JS-dependent.
6. Typos fixed: *"Class mein performance"*, *"Exceution"*.

### Exit criteria
- [ ] Homepage passes all 12 publish gates
- [ ] LCP <2.5s, CLS 0.00, INP <200ms on P75 mobile
- [ ] Full keyboard and screen-reader pass
- [ ] Reduced-motion verified
- [ ] Renders correctly at +35% string length (Spanish stress test)
- [ ] Owner sign-off on the repositioning

---

## 3. Phase 3 — Programs

**Goal:** the conversion engine.
**Duration:** 3 weeks · **Depends on:** B-8, B-4, B-7

### Scope
`/programs` hub · **`/programs/90-day-stage-program`** — the flagship, with price, guarantee, week structure, Exposure Ladder, testimonials, showcase imagery and links to its components · `/programs/private-lessons` · `/programs/group-lessons` (de-orphaned) · `/programs/band-builders` · `/programs/early-childhood` · ⚠️ `/programs/adults` if gate B-2 confirms · **`/pricing`** — new · **`/teachers`** — new

### Defects this phase eliminates
| Fixed | Was |
|---|---|
| Flagship links to its own components | Linked to neither |
| Guarantee on every programme page | On 2 of 26 pages, 0 of 6 programme pages |
| Price on every programme | No price anywhere |
| Schedule and session length published | Never stated |
| Band Builders prerequisite resolved | Self-contradictory |
| Card copy complete | Three cards truncated mid-word |
| Programme interlinking enforced | Zero |

### Exit criteria
- [ ] Every programme has price, ages, format, duration, schedule, guarantee, ≥3 FAQs, ≥1 testimonial
- [ ] Bidirectional programme links enforced
- [ ] `/pricing` live and complete
- [ ] `/teachers` live with real portraits ⚠️ B-7
- [ ] `Course` schema validating
- [ ] Orphan check passes

---

## 4. Phase 4 — Lessons

**Goal:** seven instrument pages that answer parent questions and rank.
**Duration:** 2 weeks · **Depends on:** Phase 3, I-2

### Scope
`/lessons` hub with age and equipment filters · seven instrument pages including **`/lessons/voice`** (de-orphaned) · ⚠️ keyboard resolution (gate IA-1) · seven custom instrument icons

### Per-page requirements
Subject-verified hero · start age + note · formats available ⚠️ resolves the private-vs-group contradiction · equipment required + cost estimate · what they learn in the first 12 weeks · programmes it feeds · teachers ⚠️ B-7 · price ⚠️ B-8 · ≥5 FAQs with schema · 2 related instruments · **real CTAs** replacing the 20 text-only prompts

### Exit criteria
- [ ] All 7 pages live, none orphaned
- [ ] Every hero subject-validated
- [ ] Zero machine-translated copy
- [ ] Editorial notes removed
- [ ] `Course` schema on all 7

---

## 5. Phase 5 — Camp

**Goal:** a seasonal system that never sells an expired product again.
**Duration:** 2 weeks · **Depends on:** camp deposit amount (gate C-1), unit number (S-1)

### Scope
`/camps` evergreen parent (merging the `/summer-programs/` prose) · `/camps/summer-jam-{year}` dated child · archived 2026 sessions, `noindex` · `CampReservationForm` with progressive disclosure · waitlist capture for off-season · parent pack PDF ⚠️ does not exist · `Event` + `Course` schema

### Critical requirements
1. 🚨 **Deposit amount published before the CTA.** Hard block.
2. **Automatic expiry** via `autoArchiveAfter` — the structural fix.
3. **Correct unit number.** This is a child drop-off address.
4. **Step Up applicability stated.**
5. **Allergy and medical policy** published alongside "daily snacks".
6. Four URLs collapse to one canonical path.

### Exit criteria
- [ ] Deposit amount published
- [ ] Expiry automation tested by simulating a past date
- [ ] Parent pack downloadable
- [ ] Refund and behaviour policies legally reviewed ⚠️
- [ ] All four legacy camp URLs redirected

---

## 6. Phase 6 — SEO

**Goal:** technical and local SEO, plus the remaining content pages.
**Duration:** 2 weeks · **Depends on:** S-1 (NAP), S-2 (Step Up wording)

### Scope
**`/scholarships`** rebuilt — eligibility, numbered application steps, document checklist, outbound link, disclaimer, inclusion promise, camp applicability · `/scholarships/pep`, `/scholarships/unique-abilities` · `/faq` consolidated (40 items) · `/about` with the method · `/contact` with a real form, map, hours and directions · `/events` ⚠️ gate S-6 · `/performances` archive · `/404`, `/search`, policy pages

**Technical:** all structured data ⚠️ blocked until S-1 · hand-written metadata for all 31 pages · per-page OG images · sitemap and robots · all 30 redirects deployed and verified single-hop · **staging-domain references eliminated sitewide** · Google Business Profile claimed, NAP-aligned, 14 reviews responded to · citations aligned · Step Up provider directory listing verified

### Exit criteria
- [ ] Zero orphan pages (CI-enforced)
- [ ] Zero broken internal links
- [ ] All 31 pages have hand-written metadata
- [ ] Structured data validating with zero errors
- [ ] All redirects single-hop, verified by crawl
- [ ] GBP claimed and consistent
- [ ] Zero references to `cmscustom-staginglink2.com`

---

## 7. Phase 7 — Motion

**Goal:** the signature experience.
**Duration:** 2 weeks · **Depends on:** Phases 2–6 complete, gates B-3, M-3

### Sequencing note
**Motion is applied to a finished site, never built alongside it.** Animating a layout still in flux wastes effort and produces motion that fights the content.

### Scope
Motion primitives (11 components) · homepage hero sequence · **the 90-Day Timeline** — 60% of the motion budget · Exposure Ladder ⚠️ gate B-3 · scroll reveals per template budget (`05-motion-system.md` §17) · counters (max 3/page) · gallery FLIP and lightbox · hover states · page transitions (≤500ms) · `MotionProvider` with reduced-motion, manual toggle and device-capability detection

### Exit criteria
- [ ] 60fps sustained on P75 device; auto-degradation below 50fps verified
- [ ] Reduced motion verified on every animated surface
- [ ] Timeline fully readable with JS disabled
- [ ] CLS still 0.00
- [ ] GSAP bundle <45KB gzipped
- [ ] Nothing on the §16 "never animate" list is animated
- [ ] ScrollTriggers killed on route change — no memory leaks

---

## 8. Phase 8 — Accessibility

**Goal:** WCAG 2.2 AA verified, AAA on text contrast.
**Duration:** 2 weeks

### Why it gets its own phase
This academy accepts **Unique Abilities** scholarships. Accessibility is a market requirement, and a scholarship family encountering an inaccessible site is a direct commercial loss. It is validated as a discipline, not absorbed into QA.

### Scope
Full audit against `04-design-system.md` §15 · manual keyboard pass on all 8 journeys · screen-reader testing (NVDA/Windows, VoiceOver/iOS) on every conversion path · 400% zoom and 320px reflow · colour-blindness simulation on all status states · **alt text written and human-verified for every image** · form accessibility including the booking flow · `lang` attributes, including inline on the Spanish testimonial · `/accessibility` statement published with a barrier-reporting route · third-party embeds audited for keyboard traps

### Exit criteria
- [ ] Zero critical/serious axe violations on all 31 templates
- [ ] All 8 journeys completed keyboard-only
- [ ] Screen-reader pass on every conversion path
- [ ] Every image has meaningful, verified alt text
- [ ] Accessibility statement live
- [ ] Independent audit signed off ⚠️ recommend external review

---

## 9. Phase 9 — Optimization

**Goal:** performance, content polish, conversion instrumentation.
**Duration:** 2 weeks

### Scope
**Performance:** Core Web Vitals on every template · image compression pass · font loading strategy · JS bundle audit and code-splitting · third-party audit — every remaining external request justified · caching and CDN

**Content:** editorial pass on all 31 pages in brand voice · zero keyword-stuffed or machine-translated copy · every claim traced to an approved `Claim` record · Spanish parity check ⚠️ B-6 · legal review of refund, behaviour, safeguarding and privacy

**Conversion:** all 6 intent-segmented conversion events firing · booking flow tested end to end · form abandonment instrumented · call, WhatsApp ⚠️ and directions tracking · GBP linked

### Exit criteria
- [ ] LCP <2.5s, INP <200ms, CLS <0.05 on P75 mobile across all templates
- [ ] Lighthouse ≥95 performance, 100 accessibility, ≥95 SEO
- [ ] All conversion events verified in analytics
- [ ] Zero unapproved claims sitewide
- [ ] Legal review complete

---

## 10. Phase 10 — Launch

**Goal:** cut over without losing search equity or breaking a conversion path.
**Duration:** 1 week + 30 days monitoring

### T-7 days
Full-site crawl of the current production site (catch URLs absent from the sitemap — Phase 2 found orphan links like `/home`, `/contact-enroll/home` already in markup) · baseline rankings, traffic and conversions · verify all 30 redirects on staging · Search Console prepared · rollback plan documented and tested · stakeholder sign-off

### T-1 day
Content freeze · final gate check across all 31 pages · final accessibility and performance run · DNS TTL reduced

### Launch day
Deploy · submit new sitemap; retain old 30 days · verify redirects in production · verify structured data live · confirm analytics firing · smoke-test all 8 journeys on real devices · confirm GBP alignment · ⚠️ execute the `try.` subdomain decision (gate S-7)

### T+1 to T+7
Daily crawl-error monitoring · daily Core Web Vitals field data · conversion tracking verified · 404 log review · redirect corrections as needed

### T+8 to T+30
Weekly ranking review across 40 tracked terms · conversion-rate comparison vs baseline · user feedback and support queries · first content-cluster article published · GBP posting cadence begun

### Exit criteria
- [ ] Zero 404s from previously indexed URLs
- [ ] All redirects single-hop in production
- [ ] Conversions tracking correctly with intent segmentation
- [ ] Core Web Vitals within budget in field data
- [ ] No ranking loss beyond expected migration variance at day 30
- [ ] All 8 journeys functional on real devices

---

## 11. Timeline

**22 weeks core build**, with parallel tracks.

```
Week    1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22
       ─────────────────────────────────────────────────────────────────
P1 Foundation   ███████████
P2 Homepage                ███████████
P3 Programs                            ███████████
P4 Lessons                                         ███████
P5 Camp                                                    ███████
P6 SEO                                                             ███████
P7 Motion                                                                 ███████
P8 Accessibility                                                                 ███████
P9 Optimization                                                                         ███████
P10 Launch                                                                                     ███

PARALLEL TRACKS
Decisions       ███  ← must complete in week 1–3
Photo consent   ███████████
Photography          ░░░░░░░███████████        ← ⚠️ showcase shoot depends on a real showcase date
Video                      ░░░░░░░███████
Spanish content            ░░░░░░░░░░░███████████████  ⚠️ gate B-6
Legal review                              ███████
```

**Critical-path risks**

| Risk | Impact | Mitigation |
|---|---|---|
| 🔴 Decisions not made in week 1 | Blocks Phases 2, 3, 5 — cascading | Single scheduled workshop; escalate at day 10 |
| 🔴 No showcase scheduled during the build | No showcase photography or video; the timeline payoff is empty | Schedule a showcase deliberately for the build window; fall back on studio + teacher imagery, ship showcase assets as a fast-follow |
| 🔴 Pricing not agreed | `/pricing` and all programme cards unbuildable | Ship "from $X" ranges as a minimum viable disclosure |
| 🟠 Photo consent incomplete | Real imagery cannot publish | Begin week 1; consent-blocked assets fall back to approved decorative art |
| 🟠 Bilingual scope creep | +4–6 weeks | Decide in week 1. If uncertain: launch EN-only and **remove the bilingual claim** rather than half-deliver |
| 🟠 Teacher publication refused | `/teachers` cannot ship; trust layer stays broken | Negotiate minimum viable — first names, instruments, one line, portrait |

---

## 12. Definition of done

The project is complete when all eight universal failures found in Phase 2 are resolved:

| # | Failure | Done when |
|---|---|---|
| 1 | No pricing for any lesson product | Every product priced or "from $X" |
| 2 | No instructor named anywhere | All instructors published with portraits |
| 3 | Both event URLs 404; no dated events | ≥1 upcoming and ≥3 past showcases published |
| 4 | Zero video across 26 pages | ≥1 showcase film live |
| 5 | Bilingual claimed, not delivered | Full `/es/` tree **or** the claim removed |
| 6 | Contradictory NAP and claims | Single source of truth, `Claim` registry enforced |
| 7 | Placeholder and editorial content indexed | 12 publish gates enforced in CI |
| 8 | One undifferentiated conversion widget | 6 intent-segmented paths tracked |

---

## 13. Post-launch roadmap

| Period | Focus |
|---|---|
| **Month 1–2** | Monitoring, redirect cleanup, GBP cadence, first showcase captured and published |
| **Month 3–4** | Content cluster 1 (*Confidence & performance*) — 4 articles. Video library expansion. Adult programme ⚠️ B-2. |
| **Month 5–6** | Clusters 2 and 3. Spanish expansion if deferred. Parent portal — **only when real functionality exists** (`/members/` stays retired until then). |
| **Month 7–12** | Showcase archive builds a genuine performance record · alumni stories · seasonal camp automation proven through a full cycle · quarterly accessibility and claim audits |

---

## 14. Governance

**Quarterly claim audit** — every `Claim` record re-verified; anything unsubstantiated is barred.
**Quarterly accessibility audit** — automated plus one manual journey.
**Annual content audit** — orphans, duplicates, stale dates, expired assets.
**Monthly analytics review** — conversion rate by intent, journey drop-off.
**Continuous:** publish gates in CI. The twelve gates in `08-content-model.md` §18 are the permanent defence against every defect Phase 2 found. **They are not optional and must not be bypassed under deadline pressure** — that is exactly how the current site reached its present state.

---

**Phase 3 complete.** Phase 4 is implementation, beginning with Phase 1 of this plan.
