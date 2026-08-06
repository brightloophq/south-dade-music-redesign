# 01 — Project Overview

**Package:** South Dade Music design handoff
**Prepared:** 2026-08-06
**Repository state:** frozen at commit `c460a4e`
**Purpose:** brief an external visual-design process

---

## What this business is

South Dade Music is a music academy at 601 W Palm Dr, Florida City, Florida —
the southern edge of Miami-Dade County. It teaches seven instruments plus voice,
serves children from age 3, and runs a summer camp.

Its flagship offer is the **90-Day Stage Program**: a structured twelve-week
cycle that ends with the student performing in a live showcase.

## What this project is

A complete rebuild of the website. Five phases are finished:

| Phase | What it produced |
|---|---|
| **2 — Extraction** | 28 pages scraped and structured into `docs/source-content/`. Every business fact attributed to a source page. All conflicts recorded rather than resolved. |
| **3 — Strategy** | Brand strategy, IA, user journey, design system, motion system, SEO, content model, image strategy |
| **3.5 — Image pipeline** | Development-time Gemini generation, restricted to atmospheric assets |
| **4 — Foundation** | Next.js engineering foundation: tokens, primitives, layout, accessibility, SEO, motion runtime |
| **5–6 — Homepage** | The homepage, built and running, with a five-timeline GSAP film |

**Only the homepage exists.** The other 28 routes referenced by navigation are
not built.

## What is being asked of the design process

A visual language. The concept, the content, the architecture and the motion
runtime are all settled and are **not** in scope for redesign.

What *is* in scope is everything visual: typography, colour, composition,
imagery, and the specific art direction of each homepage section.

## Why an external design process was engaged

The build is technically sound and visually generic. Successive phases improved
the engineering and the motion while the visual language stayed close to a
competent default — which is precisely what the brief says this must not be.
`09-current-design-problems.md` sets that out honestly.

## The one thing that matters most

> The product is not music lessons. It is the twelve seconds before a child
> plays her first note in front of strangers.

Every visual decision should be judged against whether it makes a parent feel
that moment before they have read a single benefit.

## The hard rule

**Nothing may be invented.** Not a price, not a teacher, not a testimonial, not
a photograph of a student, not a performance that did not happen. This is not a
stylistic preference — the extraction found 17 unresolved factual conflicts and
26 open decision gates, and the business has real exposure on several of them.

`05-business-claims-and-gates.md` is the authority. Read it before designing
anything that carries a claim.

## How to read this package

| Read this | If you are deciding |
|---|---|
| `02-brand-and-audience.md` | Tone, who this is for |
| `03-content-inventory.md` | Sitemap, what pages exist |
| `04-homepage-content.md` | The actual words on the homepage |
| `05-business-claims-and-gates.md` | Whether you may say something |
| `06-existing-assets.md` | What imagery exists |
| `07-technical-foundation.md` | What the build can express |
| `08-motion-capabilities.md` | What can move, and what may not |
| `09-current-design-problems.md` | What is wrong today |
| `10-design-deliverables-required.md` | What to produce |
| `11-implementation-constraints.md` | What your design must respect |
| `12-design-handoff-master.md` | Everything, consolidated |

## Provenance notation

Used throughout this package:

- ✅ **VERIFIED** — extracted verbatim from the live site, attributed
- ✍️ **AUTHORED** — written for the rebuild, derived from verified material
- ⚠️ **GATED** — blocked pending an owner decision; may not be published
- ❌ **PROHIBITED** — must never appear
