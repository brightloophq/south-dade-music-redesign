# 09 — Current Design Problems

An honest account of what is wrong with the homepage as built. This is the
argument for engaging an external design process.

---

## 1. The core failure

> **The homepage is technically correct and emotionally inert.**

It is nine sections, each retiring one documented objection: claim, evidence,
claim, evidence. That structure is correct for a landing page and fatal for a
feeling.

**Nothing on it happens to you.**

The business sells the twelve seconds before a child plays her first note in
front of strangers. The page *describes* those twelve seconds. It never delivers
them.

## 2. The typography is the wrong dialect

The body and UI face is **Inter**.

The brief lists what this site must not resemble: a SaaS landing page, a
Tailwind template, a generic school website, an AI-generated startup page. Five
of seven prohibitions describe the same visual dialect — and **Inter is the
native typeface of that dialect.** It is the face of Vercel, Linear, and
Tailwind's own documentation.

Inter was drawn, superbly, to be *invisible in software interfaces*.
Invisibility is the one quality unaffordable in a page whose stated job is to
carry the experience through typography.

Nobody will say *"that's Inter."* They will say **"this looks like an app."**

**This is the single largest gap between the brief and the build.**

## 3. Five shouts is no shouts

The build uses `display-xl` in the hero and `display-md` in four more places.

Once large type appears five times, none of it is large. The page has no
typographic climax, so the emotional climax has nothing to land on.

## 4. Amber is decoration, not light

The palette calls the accent "Spotlight" and then spends it like a brand colour
— borders, hovers, icon tints, chips. When the light is everywhere, none of it
reads as light, and the moments that should be events are just more amber.

## 5. It still reads as a component library

Phase 5D removed 47 rounded cards, 24 shadows and 4 stagger animations from the
page body — a real improvement, and evidence of how deep the problem ran.

What remains is a page assembled from *sections* rather than one that moves
through *rooms*. The composition is still symmetric, still centred, still
stacked.

## 6. Three fatal omissions

| Missing | Why it matters |
|---|---|
| **Sound** | A music school website with no audio. Five phases and nobody raised it. Here it is not a gimmick — it *is* the product. |
| **A body** | There is no person on the page. The consent gate was treated as an obstacle to route around instead of a brief. |
| **A moment** | The page describes ninety days and never delivers the twelve seconds those ninety days exist to produce. |

The photo-consent problem has since been reframed as the concept — *you never
see a face* — but the page still has no human presence of any kind.

## 7. The hero is a poster

The current hero is a smart reference *to* theatre. It is not an experience *of*
theatre. A poster on a wall has never made anyone cry. The curtain going up has.

## 8. The signature moment is an infographic

The 90-Day Journey renders as a dot travelling a rule — a progress bar with mood
lighting. Abstraction was applied to the least abstract thing imaginable: a
frightened child walking into light.

## 9. What went wrong in the process

Worth stating plainly, because it explains why an external process is the right
call:

- **Three consecutive phases declared success on typecheck, lint and build**
  while the motion layer was silently disabled at runtime. Static checks cannot
  see an unregistered plugin or a capability gate resolving to `false`.
- Each phase **added** technique — more atmosphere, more assets, more timelines
  — without ever revisiting the visual language underneath.
- The result is a sophisticated motion system animating a generic design.

## 10. What is genuinely good and must survive

Not everything needs replacing. The following are assets, not liabilities:

- **The concept — "The Walk."** Confirmed and not in scope for redesign.
- **The token architecture.** A new visual language is a token edit.
- **The motion runtime.** Seven timelines, one light source, verified at runtime.
- **The accessibility work.** 16 verified contrast pairs, focus management,
  44px targets, a user-facing motion override.
- **The content discipline.** Every string is attributed, gated, or explicitly
  authored. Nothing is invented.
- **"You never see a face."** A real constraint converted into a real idea.

## 11. The test the redesign must pass

> A parent scrolling on a phone in a school pickup line feels **anticipation
> before they read a single benefit** — and a fifteen-year-old does not feel it
> was made for a child.

The current homepage fails the first half and passes the second only by being
neutral, which is not the same as passing.
