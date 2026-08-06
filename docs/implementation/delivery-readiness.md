# Delivery Readiness — Motion Runtime Fix

Production-safety verification and dependency review for the motion runtime work
described in [`motion-runtime-diagnosis.md`](./motion-runtime-diagnosis.md).

Every claim below was verified by inspecting build output or driving a real
browser. Nothing here rests on "typecheck, lint and build pass" — that is the
exact assurance that failed three times on this project.

---

## 1. Production-safety cleanup

### Summary

| # | Requirement | Status | Evidence |
| --- | --- | --- | --- |
| 1 | `NEXT_PUBLIC_MOTION_DEBUG` not enabled in any committed environment | PASS | No env file is committed; template ships `false` |
| 2 | `.env.local` ignored and not staged | PASS | `git check-ignore` → `.gitignore:36`; untracked |
| 3 | Panel renders only when the flag is `true` | PASS | Double gate, flag + `NODE_ENV` |
| 4 | Production build has no visible debug overlay | PASS | String absent from output; browser confirms |
| 5 | No diagnostic console noise when debug is off | PASS | 0 errors, 0 warnings in production |
| 6 | Motion does not depend on the panel being mounted | PASS | Full film runs in production with no panel |
| 7 | `window.__MOTION_DIAGNOSTICS__` absent when debug is off | PASS | Absent from bundle and from `window` |
| 8 | No internal hardware information exposed | PASS | Read locally, never stored or transmitted |

### The core change

The diagnostics store had **29 call sites** across the motion layer, one of them
(`reportProgressSilently`) firing at scroll rate inside `JourneyTimeline.onUpdate`.
Gating the *panel* removed the UI but left all of that shipping and executing.

A single module-level constant in `src/lib/motion/diagnostics.ts` fixed it:

```ts
const DIAGNOSTICS_ENABLED = process.env.NODE_ENV !== 'production'
```

Next inlines that comparison at build time, so each guarded function body becomes
unreachable and the minifier deletes it. Verified in the emitted chunk:

```js
"reportDiagnostics",0,function(e){},  "reportProgressSilently",0,function(e,t){},
"reportTimeline",0,function(e,t){},   "resetDiagnostics",0,function(){},
"subscribeDiagnostics",0,function(e){return()=>{}}
```

All bodies empty. Guarding the store rather than each of the 29 call sites keeps
the development and production code paths identical in shape, so there is no
second code path that only runs in production and is never exercised.

**What deliberately remains:** the inert `initial` state object
(`{gsapLoaded:!1, scrollTriggerCount:0, …}`, ~120 bytes of zeros) that
`getDiagnostics` returns, and the argument objects at the call sites. Neither
carries information about anything — the state object is a compile-time constant
of falses and zeros. Removing them would require conditionals at all 29 call
sites, which costs more in divergence risk than it saves in bytes.

### Verification method

`.next` is shared by the dev server and `next build`. An earlier scan reported
leaks that turned out to be **dev chunks left behind by a running dev server** —
so the audit below was run against a clean build with every Next process stopped
and `.next` deleted first. The dirty scan would have produced a false alarm.

The build was made with `NEXT_PUBLIC_MOTION_DEBUG=true` still set in
`.env.local` — the worst case, proving the `NODE_ENV` half of the gate holds on
its own.

Scan of 93 emitted files (`.next/**/*.{js,html}`):

```
clean  __MOTION_DIAGNOSTICS__ global    absent
clean  panel overlay text ("MOTION DEBUG")  absent
clean  panel row labels                 absent
clean  NEXT_PUBLIC_MOTION_DEBUG name    absent
clean  secrets (GEMINI / AIza…)         absent
clean  playwright                       absent
```

### On hardware information (requirement 8)

`navigator.hardwareConcurrency` and `navigator.deviceMemory` are still read in
one client chunk. This is correct and must stay: it is the capability gate that
chooses a motion tier, and widening it was the primary bug fix of this work.

The distinction that matters is that these values are **read and discarded**.
They select a tier locally; they are never stored, rendered, attached to a
request, or written to a global. The only surface that ever exposed them —
`__MOTION_DIAGNOSTICS__` — is absent from production. No network request carries
them.

### Runtime proof

Requirements 5 and 6 are runtime claims, so a bundle scan cannot settle them.
`scripts/motion-probe.mjs` gained a `--production` mode that inverts what it
checks: instead of reading the diagnostics store to prove the film runs, it
proves the film runs *with the instrumentation gone*.

Against `next start`, no panel present:

```
PASS  no page errors             0
PASS  no debug overlay           absent
PASS  no debug globals           none
PASS  no diagnostic console noise 0 (1 unbuilt-route prefetch 404s ignored)
PASS  motion runs without panel  Δlight 54.6, 18 tints
PASS  light travels              Δ54.6
PASS  colour grade evolves       18 tints
PASS  week counter changes       01,02,05,08,11,12
PASS  First Note flare fires     max 0.55
RESULT: ALL ASSERTIONS PASS  [production mode]
```

Development mode still passes 13/13 with all 7 timelines created and 19 live
ScrollTriggers, confirming the guard did not disable diagnostics in development.

### Retained deliberately

The debug panel, the diagnostics store and the probe are **kept**. They are the
only reason the runtime defects were found at all, and the next person to touch
this motion layer will need them. They are strictly development-only by two
independent gates, and their absence from production is verified rather than
assumed.

---

## 2. Dependency review — `playwright-core`

**Decision: retain as a devDependency.**

It is the only way to answer "does the motion actually run?", and this project
has already demonstrated three times that no static check can. The probe is now
a repeatable regression test rather than one-off debugging scaffolding.

| Check | Result |
| --- | --- |
| Placement | `devDependencies: "playwright-core": "^1.62.1"` — absent from `dependencies` |
| Imported by | `scripts/motion-probe.mjs` only; never from `src/` |
| In client bundle | No — `playwright` matches nothing in `.next/**` |
| Script | `"probe:motion": "node scripts/motion-probe.mjs"` |

`playwright-core` was chosen over `playwright` specifically because it ships no
browser binaries: a ~150 MB download is not a fair price for one diagnostic
script. **It therefore requires a system Chrome or Edge install.** Searched paths
are in `CHROME_CANDIDATES` at the top of the script, which exits with a clear
message when none is found. Documented in the README and in the script header.

Being a devDependency imported only from `scripts/`, it can never reach the
client bundle — there is no import path from `src/` to it. Verified by scanning
the build output rather than by reasoning about it.

---

## 3. Repository hygiene fixed along the way

- **`.gitignore` had `.env*`**, which silently swallowed the new `.env.example`
  template. Added `!.env.example` so the documented variable list is actually
  committable while real env files stay ignored.
- **`storybook-static/` was untracked and would have been committed** — a
  generated build artifact, previously also the source of 12,491 lint problems.
  Now ignored.
- **`README.md` was untouched `create-next-app` boilerplate**, pointing at
  `app/page.tsx` (moved to `src/app/`) and claiming Geist fonts (the project uses
  Archivo + Inter). Rewritten.

---

## 4. Known gaps, not addressed here

These are outside the scope of this delivery and are recorded so they are not
mistaken for regressions.

- **28 internal link targets have no page.** Only the homepage is built. Next
  prefetches in-viewport links, so `/contact/book-a-trial` — the primary trial
  CTA — 404s in the console today. The probe reports these separately from real
  console noise, since they resolve as the remaining pages are built. **This is
  the most user-visible gap: the homepage's main conversion path is a dead link.**
- **All 8 generated atmospheric assets remain `pending-review`** with
  `approvedBy: null`. Human visual review is still required before launch, and is
  mandatory rather than optional because the Gemini Developer API rejected
  `personGeneration: 'ALLOW_NONE'` (Vertex-only), so no-people generation could
  not be enforced at the API level.
- **Content decision gates remain open** — pricing (B-8), teacher names (B-7),
  photo consent (I-1) among others.
