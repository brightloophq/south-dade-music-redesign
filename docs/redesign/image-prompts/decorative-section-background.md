# Decorative section background

**Use:** the general-purpose ground for any mid-page section that needs
separation from its neighbours without a photograph.
**Aspect:** `16:9` or `21:9`.
**Register:** decorative.

## Requirements

- Subtle by mandate. `04-design-system.md` §2 sets the colour ratio at roughly
  60/25/10/5 — spotlight amber must feel scarce. A background that glows is a
  background that has taken the accent budget from the CTA.
- Must never compete with adjacent real photography.
- Low contrast range so body copy stays readable over it without a scrim.

```prompt
A very subtle decorative background texture for a web page section. Warm off-white ground (#FAF9F7) with barely-there tonal variation, a faint diagonal light sweep, and soft low-contrast geometric bands drifting across the frame. Extremely restrained — the texture should be felt rather than seen, never competing with foreground content. Warm-tinted neutrals, no cool grey, matte finish, smooth tonal transitions with no banding. Generous empty space throughout. Purely abstract, minimal and quiet.
```

## Dark variant

Append via `--prompt` rather than duplicating the template:

```bash
npm run generate:image -- --template decorative-section-background \
  --prompt "Invert to the dark register: deep blue-black ground (#0D1220) with the sweep in muted amber at very low opacity." \
  --name section-bg-dark --page home --section proof-band \
  --purpose "Quiet ground for the dark proof band"
```
