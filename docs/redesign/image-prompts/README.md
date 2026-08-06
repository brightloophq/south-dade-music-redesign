# Prompt templates

Each `.md` file here is one reusable prompt. The script reads the fenced
` ```prompt ` block; everything else on the page is for humans.

```bash
npm run generate:image -- --list-templates

npm run generate:image -- \
  --template hero-atmospheric-background \
  --name homepage-hero-stage-light \
  --page home --section hero \
  --purpose "Atmospheric ground behind the homepage H1"
```

`--prompt` may be combined with `--template` — the inline text is appended to
the template body, which is the intended way to vary a template per asset:

```bash
npm run generate:image -- --template stage-light-texture \
  --prompt "Cooler blue-black bias, one narrow beam only." \
  --name divider-light-sweep-cool --page camps --section divider \
  --purpose "Section divider on the camps page"
```

## Rules that apply to every template

Every prompt in this directory is **non-representational**. None of them may be
edited to introduce a person, a room, an event, or anything a visitor could read
as documentary evidence about South Dade Music. The script blocks those terms
before a request is sent, but the rule is the point — the guardrail is only the
enforcement.

Palette anchors (`04-design-system.md` §2):

| Token | Hex | Role in prompts |
|---|---|---|
| `stage-950` | `#070A12` | Deepest ground |
| `stage-900` | `#0D1220` | Primary dark surface |
| `spot-400` | `#FFC15C` | Warm highlight |
| `spot-500` | `#F5A524` | Spotlight core |
| `velvet-600` | `#8B1E3F` | Curtain / depth accent |

Full governance: [`../image-style-guide.md`](../image-style-guide.md).
