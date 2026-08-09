# Lead Data Cutover Plan — HighLevel

**Date:** 2026-08-08 · **Phase:** 4F
**Source:** `docs/source-content/external-integrations.json`, `conversion-actions.json`
**Scope:** documentation only. **No migration was attempted, and none should be
attempted before the unknowns below are closed.**

---

## The risk in one sentence

> **Every lead this business has ever captured sits in a third-party system
> whose ownership is unconfirmed, and there is no on-site fallback — if that
> account is not the business's, retiring the old site could strand the entire
> contact database.**

---

## What exists

| | |
|---|---|
| **Platform** | LeadConnector / HighLevel (GoHighLevel) |
| **Capture mechanism** | One survey widget, `0IIXocvyYpPeFVbD5HPB` |
| **Coverage** | Every page of southdademusic.com, **including the 404 template** |
| **Native forms on the site** | **Zero.** 100% of capture depends on this widget. |
| **Second property** | A separate HighLevel funnel at `try.southdademusic.com` |
| **Sub-accounts seen** | `rqeXVUxgFrTFuIbzjASG`, `UILNiCB9NyQf3albBKfn`, `0NjpOuVSolJrUgZhjNoq` |
| **CRM** | Inferred — HighLevel bundles CRM, pipelines and automation with its forms |

**One widget serves every intent.** Trial bookings, flagship-programme enquiries
and $450 camp reservations all submit the same form, so intent cannot be
segmented at capture and no per-intent conversion tracking is possible.

## What is known

- The widget is live and reachable on every page of the old site.
- Three distinct HighLevel sub-account identifiers appear in asset URLs on the
  subdomain, which suggests more than one property or an agency structure.
- The two properties publish **different phone numbers** and **different
  business names**, and do not link to each other.
- No shared attribution exists between them.

## What is unknown — and blocks cutover

| Unknown | Why it blocks | Who answers |
|---|---|---|
| **Who owns the HighLevel account** — the business or an agency? | If an agency owns it, the business may not be able to export its own contacts | Owner |
| **How many contacts exist, and over what period** | Determines whether cutover is trivial or a genuine migration | Owner, via export |
| **Whether automations/pipelines run on it** | Retiring the widget could silently break follow-up sequences | Owner |
| **Where camp deposits are collected** | No payment processor is observable anywhere. A binding non-refundable payment with no visible checkout is unresolved. | Owner |
| **Whether the `try.` funnel is still spending** | Retiring it could cut live paid traffic | Owner |
| **What the widget's field schema is** | Needed to map into any replacement, and to write an accurate privacy policy | Owner or export |

## Required export, before anything is retired

1. **Full contact export** — all contacts, with source, timestamps and any
   custom fields, in CSV or JSON.
2. **Pipeline/opportunity export**, if pipelines are in use.
3. **A list of active automations** and what triggers them.
4. **The form's field schema** — exact fields, required flags, consent copy.
5. **Written confirmation of account ownership**, and admin credentials held by
   the business rather than an agency.

## Credentials and access required

The business needs **owner-level access** to the HighLevel account. Not a seat,
not agency-delegated access — the ability to export and to survive an agency
relationship ending.

**Nothing in this repository holds, or should hold, HighLevel credentials.**

## Sequencing — the order matters

1. Confirm ownership. **Nothing else proceeds until this is answered.**
2. Export contacts, pipelines, automations and the field schema.
3. Verify the export opens and is complete.
4. Decide the destination for new leads on the rebuilt site.
5. Wire it up and test end to end with a real submission.
6. Run both sites in parallel briefly, so no lead is lost mid-switch.
7. Only then retire the old site.

## What the rebuild does in the meantime

`/contact/book-a-trial` **links out** to the verified HighLevel widget rather
than embedding a form. Nothing is captured by this site, so nothing can be lost
by it, and no lead silently lands somewhere unmonitored.

Every page also offers **phone and email** directly. That is deliberate: if the
widget fails, or the account turns out not to belong to the business, the site
still converts.

## Dependency: photo consent

`/photo-consent` is built with **submission disabled** for the same root cause.
Consent records concern **identified minors** and are more sensitive than a
marketing lead; they must not be routed into a third-party store whose ownership
is unconfirmed. That form is unblocked by the same decision as this plan.
