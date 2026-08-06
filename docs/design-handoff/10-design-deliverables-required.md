# 10 — Design Deliverables Required

Exactly what the design process must produce.

---

## A. Typography system

1. **Confirm or replace the display face.** Archivo is current and unapproved
   (⚠️ gate D-2). It has a genuine width axis (`wdth 62–125`), which is the main
   argument for keeping it.
2. **Replace the text face.** Inter must go — see `09-current-design-problems.md`
   §2. A candidate direction is proposed in `12-design-handoff-master.md` §21.
3. **A named type scale** with role, face, size, weight, width, tracking and
   leading for every step. Roles, not just sizes.
4. **A specimen** at real rendered size for each role, in both English and
   Spanish.
5. **A stated rule for large type** — how often, and where.
6. Confirm `latin` + `latin-ext` coverage and licensing for any new face.

## B. Colour system

1. **A full palette** as named tokens with hex values.
2. **Semantic mapping** — which token is page ground, raised surface, body text,
   muted text, link, primary action, focus ring.
3. **A computed contrast table.** Every text/ground pair, with its ratio and
   level. AA (4.5:1) is the floor for body; AAA where achievable.
4. **A stated rule for the accent** — where it may and may not be used.
5. **Both a dark and a light treatment**, or an explicit, argued decision to
   commit to one.

## C. Composition system

1. **A grid** — columns, gutters, container widths, and how content is placed
   within it.
2. **Radius, border and elevation rules** — including which are set to zero.
3. **How sections are separated** from one another.
4. **Spacing scale** and how vertical rhythm works.
5. **Responsive behaviour** at 375px, 768px, 1024px and 1440px.

## D. Art direction per homepage section

For each of the twelve sections in `04-homepage-content.md`:

- Ground colour and temperature
- Type roles used
- Composition and alignment
- Imagery or texture, if any
- What the light is doing
- What the section must make the visitor feel

## E. Image and texture direction

1. **A shot list** for a photography brief that respects *you never see a face*.
2. **A treatment specification** — grade, saturation, tinting, grain, vignette,
   aspect ratios.
3. **Direction for the eight generated atmospheric assets** — which survive,
   which are re-briefed, how they are treated.
4. **A stated position on video** (⚠️ gate I-3), given that zero exists today
   for a business that sells live performance.

## F. Brand identity elements

1. **Logo assessment** (⚠️ gate D-1) — does the current logo survive the new
   palette? Rebuild as SVG either way.
2. **A wordmark treatment** that works once gate B-5 settles the name.
3. **Favicon and `og:image`** direction — today the logo does duty as the
   `og:image` for every page.

## G. Component visual specification

Visual treatment for: buttons (primary/secondary/tertiary, 4 sizes), links,
form inputs, labels, error states, navigation (desktop + mobile drawer), footer,
and any section-level pattern the direction introduces.

**44px minimum touch target on every control** — non-negotiable.

## H. Motion art direction

Not the engineering — that exists. What the design process owes is:

1. **What each of the seven timelines should look like** visually
2. **What the light does** across the page — position, intensity, temperature
3. **The reduced-motion parallel cut** — the same story, told static
4. **Which moment is the climax**, and what makes it land

---

## Deliverable format

| Format | Use |
|---|---|
| **Token values** — named, with hex/px/ms | Anything expressible as a token. **Strongly preferred.** |
| **Annotated comps** at 375 / 768 / 1440 | Layout and composition |
| **Specimens** at real size | Typography |
| **A written rationale** | Every rule, so it can be enforced in review |

Express as much as possible as tokens. A palette delivered as named values
propagates through the build with no component work; the same palette delivered
only as flat images requires someone to guess.

---

## Explicitly out of scope

❌ Rewriting copy — `04` is fixed content; changes go to the owner
❌ Changing the concept — "The Walk" is confirmed
❌ Re-architecting the motion runtime
❌ Adding pages or changing the sitemap
❌ Resolving business conflicts — those are owner decisions
❌ Generating new imagery during this phase

---

## Acceptance criteria

A deliverable is complete when:

1. Every rule has a **stated reason**, not just a value
2. Every contrast pair is **computed**, not assumed
3. Every claim-bearing element is checked against `05-business-claims-and-gates.md`
4. Nothing prohibited in `05` Part C appears in any comp
5. The reduced-motion state is designed, not deferred
6. Spanish is accounted for at every size where type is set tight
7. It passes the test in `09` §11
