# Analytics and Tag Inventory

**Date:** 2026-08-08 · **Phase:** 4E
**Source:** `docs/source-content/external-integrations.json`, `conversion-actions.json`
**Scope:** inventory only. **No tracker was added, removed or configured.**

---

## ⚠️ The finding that matters most

**The extraction could not see script tags.** It captured rendered content, not
`<script>` elements — so the absence of GA4, GTM or Meta Pixel below is
**"not observed", never "not present"**.

> **A script-level tag audit of the live site is required before the old site is
> retired.** If measurement IDs are not recovered first, all historical
> analytics continuity is lost at cutover, permanently and unrecoverably.

That single task is the highest-risk item in this document.

---

## Inventory

| Provider | Identifier | Location | Purpose | Required on rebuild? | Owner account needed? | Migration risk | Status |
|---|---|---|---|---|---|---|---|
| **LeadConnector / HighLevel** | widget `0IIXocvyYpPeFVbD5HPB` | Every page of southdademusic.com, incl. the 404 template | All trial, programme and camp capture | **Decision required** | **YES — ownership unconfirmed** | **CRITICAL** | Live on old site. Rebuild links to it, does not embed it. |
| **HighLevel funnel** (`try.` subdomain) | sub-accounts `rqeXVUxgFrTFuIbzjASG`, `UILNiCB9NyQf3albBKfn`, `0NjpOuVSolJrUgZhjNoq` | try.southdademusic.com | Separate paid-traffic funnel | **Decision required** | YES | HIGH | Different phone, different brand name, no shared attribution |
| **Google Analytics (GA4)** | — | Not observed | — | Almost certainly yes | YES | **HIGH — data loss** | ⚠️ **Not observed ≠ absent.** Script audit required. |
| **Google Tag Manager** | — | Not observed | — | Likely | YES | **HIGH** | ⚠️ Same. |
| **Meta Pixel** | — | Not observed | — | Unknown | YES | MEDIUM | ⚠️ Same. No Facebook page is linked anywhere. |
| **Google Business Profile** | `place_id` decodes to "601 W Palm Dr unit 117" | Referenced from the subdomain map only | Holds the 14-review corpus | **YES** | **YES — claim it** | **HIGH** | Reviews exist only here; no permalinks captured |
| **Google Maps** | Static map + place link | Subdomain only | Directions | Optional | No | LOW | Main site has no map at all |
| **Payment processor** | **none observed** | — | — | **YES** | YES | **CRITICAL** | Camp takes a non-refundable deposit with **no observable checkout** |
| **Email / ESP** | none observed | — | — | Unknown | — | LOW | No newsletter signup anywhere |
| **Video platform** | **none** | — | — | — | — | — | Zero video across 28 pages |
| **Advertising pixels** | none observed | — | — | Unknown | — | MEDIUM | Requires the same script audit |
| **cmscustom-staginglink2.com** | — | Hero on 22+ pages | Asset host | **NO** | No | **RESOLVED** | **Domain is DEAD** (403 root / 404 asset). See asset-recovery report. |

---

## What the rebuild currently ships

**No tracker of any kind.** No GA4, no GTM, no pixel, no third-party script.
The only external reference is an outbound `href` to the HighLevel booking
widget — a link, not an embed, so nothing loads or tracks until a visitor
deliberately clicks through.

That is deliberate for a pre-launch build with indexing disabled, and it means
adding measurement is an explicit decision rather than an inherited default.

## Required before the old site is retired

1. **Run a script-level tag audit** and record every measurement ID.
2. **Confirm HighLevel account ownership** and export the lead database — see
   `lead-data-cutover-plan.md`.
3. **Confirm how camp deposits are actually collected.** A binding
   non-refundable payment with no observable processor is unresolved.
4. **Claim the Google Business Profile** and capture review permalinks.
5. **Decide the fate of `try.southdademusic.com`** — retire, align, or keep.

## Privacy dependency

`/privacy` renders its analytics section as **"under review"** for exactly this
reason: naming trackers we have not confirmed would be a false statement in a
policy document. That section is unblocked by the script audit, not by writing.

## Secrets

**No credential, key, token or account secret appears in this document or
anywhere in the repository.** The HighLevel widget ID and the HighLevel
sub-account identifiers are public path segments, visible in any page's markup —
they are not secrets. The Google `place_id` is likewise public.
