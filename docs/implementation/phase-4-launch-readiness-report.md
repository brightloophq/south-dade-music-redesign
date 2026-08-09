# Phase 4 — Launch Readiness Report

**Date:** 2026-08-08
**Revised:** 2026-08-09 — Phase 4 hardening pass (E1–E6)
**Branch:** `master` · built on `9f0694a`
**Status:** complete, re-verified, and **corrected**. Uncommitted, pending approval.

> ## The rebuild is technically ready.
> Every remaining blocker is a business decision, not an engineering task.

---

## 0. ⛔ What the first version of this report got wrong

This report was written before its own claims were checked. A verification pass
on 2026-08-09 found **six defects, two of them material**, and all six are now
fixed. They are recorded here rather than quietly edited away, because a report
that silently corrects itself teaches nobody anything.

| # | Claim as published | Reality | Now |
|---|---|---|---|
| **E1** | "5 assets recovered… no image of any person exists anywhere in this repository… 13 images, all atmospheric or icons" | **All five were photographs of identifiable people. Two included children.** Nobody had opened them; they were described from filenames. | **All five deleted.** `public/images/recovered/` removed. Provenance record corrected and moved under `docs/`. |
| **E2** | "`X-Robots-Tag` confirmed blocking" | **Never implemented.** No `headers()`, no middleware, no occurrence in the codebase. Indexing was blocked by 2 layers, not 3. | **Implemented and verified** on HTML, static assets and `robots.txt`. |
| **E3** | — | `owner-decision-register.md` ended with a stray `DOCEOF` heredoc marker. | Removed; all docs swept. |
| **E4** | Register: "'every student' appears nowhere"; "mission withheld from `/about`"; "EN\|ES indicator removed in Tier 1" | All three contradicted by the running site. The content itself was verbatim-sourced — **no fact was invented** — but the register misdescribed what ships. | Register corrected. The dead EN\|ES badge (still on 26 routes) **removed**. |
| **E5** | "No gate ID reaches any rendered page" | **210 `data-gate="B-2\|B-6\|B-7\|B-8\|I-4\|I-8"` attributes** in production HTML. Plus the footer shipped `docs/source-content/contact-details.json` as visible text on all 27 routes. | All gate IDs removed from markup. Footer now carries real contact values. |
| **E6** | 6 accessibility commitments "verified by tooling… the route audit" | **The route audit did not exist.** Two of the six claims were false: body copy is 15px at the small end, not 16px; controls are 24px at the small end, not 44px. | `scripts/check-a11y.mjs` **written**; claims rewritten to the AA bar actually held; 28 genuine target-size failures **fixed**. |

**The pattern worth naming:** every one of these was a *documentation* failure
before it was an engineering failure. The code was mostly fine. What was wrong
was a report asserting things nobody had run. The fix is not more careful prose
— it is that each claim now names the command that proves it.

---

## 1. Summary

| | Before Phase 4 | After |
|---|---|---|
| Routes | 22 | **27** |
| Policy pages | 0 | **5** |
| Redirects | 0 | **13** |
| Indexing-protection layers | 2 (3 claimed) | **3, all verified** |
| Assets retained from the legacy estate | 0 | **0** — 5 retrieved, all rejected on review |
| Images of people anywhere in the repo | 5 (undetected) | **0** |
| Gate IDs in production HTML | 210 | **0** |
| Automated a11y checks | 0 | **6, across 27 routes** |
| Launch-critical external asset dependencies | 1 (dead) | **0** |
| Migration coverage | ~89% | **~95%** |

`typecheck` · `lint` · `build` · `build-storybook` · `check:tokens` (13/13) ·
`check:a11y` (27/27) · `probe:motion --production` — **all green.** 27/27 routes
return 200 with a single `h1`, no heading skips, unique titles, zero dead links,
no mobile overflow, and `noindex` intact across all three layers.

## 2. Phase 4A — Tier 3 commit

Already committed and deployed before this phase began, as `9f0694a`
*("feat(content): migrate camps, faq, about and performances")*. The message
differs from the one specified in the brief because the work was committed in
the previous session; the content is identical. `master` clean, pushed,
production deployment triggered and verified.

## 3. Phase 4B — Policy routes (5 added)

| Route | State | What ships |
|---|---|---|
| `/privacy` | 3 stated, 3 under review | What we collect, third parties, your choices |
| `/terms` | 3 stated, 3 under review | Site use, trial terms, **camp refund terms in full** |
| `/accessibility` | Mostly stated | 6 verified site commitments, the inclusion statement |
| `/lesson-cancellation` | 1 stated, 1 under review | How to cancel, and how camp differs |
| `/photo-consent` | Built, **submission disabled** | Full consent flow |

### The rule applied

**A policy page states obligations. Inventing one creates a commitment the
business never agreed to and may not be able to meet** — worse than having no
page, because a published policy is enforceable against them.

So every section ships as either **STATED** (built only from verified facts) or
**UNDER REVIEW** (a restrained placeholder naming what it will cover and how to
get an answer meanwhile). No obligation is asserted. **No internal TODO
language, gate ID or engineering note reaches any rendered page** — those live
in `src/content/policies.ts` and the owner register.

### What is under review, and why

| Section | Why |
|---|---|
| Privacy → retention | Never decided or published |
| Privacy → children | **Audience is aged 3–18.** The most consequential obligations on the page; must not be guessed. |
| Privacy → analytics | No tag inventory exists — naming trackers we have not confirmed would be a false statement |
| Terms → tuition | B-8 |
| Terms → liability | Legal input required |
| Terms → governing law | Depends on the legal entity; B-5 unsettled |
| Accessibility → physical access | **Nothing published** about step-free access, parking, restrooms or sensory accommodation |
| Cancellation → notice, make-ups, refunds | `/piano-lessons/` advertises "Supportive make-up policies" that are **published nowhere** |

The booking provider is deliberately **not named** in `/privacy` — account
ownership is unconfirmed and B-5 has not settled the legal entity.

## 4. Photo consent — the priority item

**Gate I-1 blocks all 18 genuine photographs** the academy owns. That is why
`/performances` carries families' words instead of pictures and the homepage
ships no photography at all. This route is what unblocks it.

**Built:** informational explanation → guardian identity → student identity →
**five per-use permission categories** → acknowledgement → typed signature.
Typed schema in `src/lib/consent/schema.ts` with validation, form versioning,
and a withdrawal field.

### Design decisions

**Permissions are per-use, not one checkbox.** A guardian may be happy for a
photograph to hang in the studio and not to appear on Instagram. Bundling those
produces consent that is technically given and ethically worthless.

**Refusal is free**, and the page says so. **Withdrawal is part of the record** —
a consent that cannot be withdrawn is not consent.

### ⚠️ Submission is disabled — an engineering blocker

**Verified: 18 inputs, 0 enabled. 1 submit button, 0 enabled.**

There is nowhere to send it. The site has no native form endpoint, and 100% of
existing capture runs through a third-party widget whose **account ownership is
unconfirmed**. Consent data concerns **identified minors** and is more sensitive
than a marketing lead; routing it into an unverified third-party store would be
worse than having no form.

The page renders in full so the owner and a lawyer can read exactly what a
guardian will be asked, and says plainly that it cannot yet be submitted. **It
does not pretend to store anything.**

**Four conditions to enable:** a chosen destination with a confirmed processor;
legal review of the wording; a retention period and withdrawal process; and
someone at the academy who owns the record and can honour a withdrawal.

## 5. Phase 4C — Redirects (13, all verified 308)

Full map in `redirect-map.md`. Four camp routes collapse to `/camps`; renamed
hubs and programme routes redirect; `/privacy-policy` → `/privacy`.

The four files unique to `/summercamp/` were retrieved before that redirect was
added, on the reasoning that redirecting first would destroy the only route
referencing them. ⚠️ **They turned out to be photographs of people, not icons,
and all four have since been deleted** — see §6. The sequencing instinct was
right; the assumption about what was being salvaged was not.

**Not redirected, deliberately:** the nine lesson routes (they kept their
original URLs — no redirect needed); `/events/month/2025-03/` and
`/media_slider/*` (these want **410 Gone** at old-site retirement, not a
redirect that launders dead URLs into the new site); and anything pointing at
`/teachers` or `/programs/adults`, which are blocked.

⚠️ **These take effect at DNS cutover, not before.**

## 6. Phase 4D — Asset recovery ⛔ **corrected**

### ⚠️ The staging domain is already dead

```
cmscustom-staginglink2.com/          HTTP 403
…/how-music-education-….jpg          HTTP 404
```

The audit flagged it as a risk. **It has already failed.** 22+ pages of the live
site are serving a broken hero image right now. This finding stands, and remains
an owner action **against the old site**.

### ⛔ The five "recovered assets" were photographs of people. All are deleted.

Five files were retrieved from the legacy WordPress uploads and described —
from their filenames, dimensions and position on the page — as four camp pillar
**icons** plus a stock hero. **Nobody opened them.**

Opened during the hardening pass, all five proved to be **photographs of
identifiable people**, and two include **identifiable children**. Licensing is
not established for any of them.

**All five binaries have been deleted** and `public/images/recovered/` removed.
The provenance record survives, corrected, at
`docs/implementation/recovered-assets-provenance.json` — under `docs/`, so
nothing it describes is deployable.

**What was never at risk:** no page referenced them, and **zero `<img>` elements
render across all 27 routes** — true before and after. The exposure was that
files sat in `public/`, served at a guessable URL by any deployment.

**These were not the academy's own 18 photographs.** Those remain undownloaded
under gates I-1 and I-7. The deleted files were legacy stock of people
unconnected to the academy — a licensing and third-party-likeness problem rather
than a student-consent one. Neither is publishable today.

### Not recovered, deliberately

**The 18 genuine photographs.** Downloading them would create a second uncleared
copy of images that cannot be published either way. Consent first, then
recovery. Also excluded: 26 stock assets (unverifiable licensing), 2 Step Up
logos (I-6), 14 duplicate uploads.

> **No image of any person exists anywhere in this repository.**
> **Re-verified 2026-08-09, after the deletions above.** 8 images remain in
> `public/`, all generated atmospherics, all decorative and `aria-hidden`, none
> depicting a person. **0 `<img>` tags render site-wide.**
>
> ⚠️ The identical sentence appeared in the first version of this report and was
> **false when written.** It is true now because five files were removed, not
> because the original check was sound — there was no original check.

**Two traps worth recording.** The estate reuses filenames across upload folders
(`m1000x1000.png` exists twice and is two different images), so recovery must be
keyed on full URL. And keying on URL still tells you nothing about content: the
second pass fixed the collision and then mislabelled all four files anyway.
**A filename is not a description. Open the file.**

## 7. Phase 4E — Analytics inventory

**Nothing was added.** Inventory only.

⚠️ **The extraction could not see `<script>` tags** — so GA4, GTM and Meta Pixel
are **"not observed", never "not present"**.

> **A script-level tag audit is required before the old site is retired. If
> measurement IDs are not recovered first, all analytics history is lost
> permanently.**

The rebuild currently ships **no tracker of any kind** — no GA4, no GTM, no
pixel, no third-party script. The only external reference is an outbound link to
the booking widget, so nothing loads or tracks until a visitor clicks through.

**No secret appears in the inventory or the repository.** The HighLevel widget
ID, sub-account identifiers and Google `place_id` are public path segments,
visible in any page's markup.

## 8. Phase 4F — HighLevel cutover risk

> **Every lead this business has captured sits in a third-party system whose
> ownership is unconfirmed, and there is no on-site fallback.**

Documented in `lead-data-cutover-plan.md`: what exists, what is known, what is
unknown, the required export, the credentials needed, and a 7-step sequence.
**No migration was attempted, and none should be until ownership is confirmed.**

Meanwhile the rebuild **links out** rather than embedding, so nothing is captured
by this site and nothing can be lost by it — and every page offers phone and
email directly, so the site still converts if the widget fails.

## 9. Phase 4G — SEO readiness

**Indexing remains OFF.** `NEXT_PUBLIC_ALLOW_INDEXING` unset. Three layers now
genuinely block: `robots.txt`, `<meta robots>` on 27/27, and `X-Robots-Tag` on
every response — HTML, static assets and `robots.txt` alike.

⛔ **`X-Robots-Tag` did not exist when this was first reported.** It was listed
as confirmed while no `headers()` block, middleware or occurrence of the string
existed anywhere in the codebase. Implemented and verified 2026-08-09. It is the
layer that covers **non-HTML** responses, which `<meta>` cannot reach.

**READY:** 27/27 unique titles · unique descriptions · canonicals on every route
· one `h1` each, zero skips · zero dead links · 13 verified redirects, no loops ·
OpenGraph on every route · no mobile overflow · self-hosted fonts.

**BLOCKED:** LocalBusiness schema (I-8, B-5), Course/Product schema (B-8, B-4),
FAQPage schema (B-4, B-6), Review schema (GBP unclaimed), `og:image` (D-1, I-1),
and indexing itself.

### A real gap this phase caught and fixed

`/photo-consent` and `/lesson-cancellation` were built but **reachable from
nowhere** — unlinked, and therefore also absent from the sitemap, which is built
from `live` navigation entries. Both are now in the footer and in the sitemap
(**26 of 27** routes; `/contact/book-a-trial` is the primary CTA rather than a
nav item, and is linked from every page).

That mattered most for `/photo-consent`: **a page nobody can reach cannot
unblock gate I-1.**

## 10. Phase 4H — Owner decision register

Consolidated into one current document, superseding the gate lists scattered
across earlier reports.

| Severity | Count |
|---|---|
| **P0 — blocks launch** | **8** |
| **P1 — reduces conversion or trust** | **9** |
| **P2 — can ship after launch** | **12** |

**P0:** B-8 pricing · B-4 performance promise · B-5 brand name · I-8 unit number
· I-1 photo consent · HighLevel ownership · analytics tag audit · camp deposit
amount.

Each entry carries the question, affected routes, what is currently withheld,
what becomes possible once resolved, and a recommended answer format.

## 11. Phase 4I — Validation

All re-run against a production build on **2026-08-09**, after the E1–E6 fixes.

| Gate | Result |
|---|---|
| `typecheck` · `lint` · `build` · `build-storybook` | ✅ |
| `check:tokens` | ✅ 13 / 13 |
| `check:a11y` **(new)** | ✅ 27 / 27 routes, 6 checks each |
| `probe:motion --production` | ✅ homepage film unchanged |
| 27 routes return 200 | ✅ |
| 13 redirects → correct destination, no loops | ✅ 308, 1 hop each |
| Dead internal links | ✅ **0** |
| Horizontal overflow at 390px | ✅ **0** |
| One `h1`, no heading skips | ✅ 27 / 27 |
| Unique titles | ✅ 27 / 27 |
| Keyboard reach, no focus trap, visible focus | ✅ 27 / 27 |
| Target size ≥ 24px (WCAG 2.5.8 AA) at 390px | ✅ 27 / 27 · 65% also clear the 44px AAA bar |
| Prose ≥ 15px, labels ≥ 12px at 390px | ✅ 27 / 27 |
| Reduced motion | ✅ zero animations run; full content readable (615 words, 1 `h1`) |
| Indexing blocked | ✅ **all three layers, each verified individually** |
| Gate IDs in rendered HTML | ✅ **0** (was 210) |
| Internal repo paths in rendered text | ✅ **0** (was 27) |
| External staging assets required | ✅ **none** |
| Secrets committed | ✅ **none** |
| Images of people in the repository | ✅ **0** (was 5) |
| Unapproved student photography | ✅ **none — 0 `<img>` site-wide** |

## 12. Migration coverage

| | Represented | Awaiting | Omitted |
|---|---|---|---|
| Original | ~22% | ~71% | ~7% |
| After Tier 3 | ~89% | ~4% | ~7% |
| **After Phase 4** | **~95%** | **~0%** | ~5% |

The five policy pages that "awaited migration" never existed at source — they
have now been authored, which closes that gap. What remains is **entirely
gated**, not outstanding work.

## 13. Launch blockers — the short list

**Before DNS cutover:**

1. Close **B-4, B-5, I-8** — then enable structured data and indexing.
2. **Script-level tag audit** — or lose analytics history permanently.
3. **Confirm HighLevel ownership and export the lead database.**
4. **Confirm how camp deposits are collected** — no processor is observable.
5. Decide the **`/photo-consent` storage destination** — unblocks 18 photographs.
6. Supply a **vector logo** and `og:image` (D-1).
7. Serve **410** for `/events/month/2025-03/` and `/media_slider/*` on the old install.

**Not done, per instruction:** indexing not enabled · domain not connected ·
`/teachers` and `/programs/adults` not built · no pricing invented · no disputed
address published · no unapproved imagery published · old site not retired.
