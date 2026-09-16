/**
 * The seam of light.
 *
 * The door is ajar. This is the first of the four rationed spot uses
 * (Visual Specification.md §B) and the only light in the opening frame.
 *
 * Two parts, both driven by custom properties the Wings timeline animates:
 *
 *   `--seam-width`  3px → 9px   the door opening a hand's width
 *   `--seam-spill`  0 → 260px   the light falling into the room
 *
 * Spec: The Film.html §I — *"Reveals happen by light (the seam widening
 * 3px→9px, spill growing 0→260px), never by element motion."* This is
 * why the hero needs no entrance animation at all: the type was always there,
 * and the light finds it.
 *
 * Both properties have static defaults, so with no JavaScript the seam is
 * present at its open width rather than invisible.
 */
export function Seam() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-[1]">
      {/* The spill — light falling across the floor from the doorway. */}
      <div
        className="absolute inset-y-0 left-0"
        style={{
          width: 'var(--seam-spill, 260px)',
          background:
            'linear-gradient(90deg, rgba(76,173,103,0.07), transparent)',
        }}
      />
      {/* The seam itself — the gap under the door. */}
      <div
        className="absolute inset-y-0 left-0"
        style={{
          width: 'var(--seam-width, 9px)',
          opacity: 'var(--seam-opacity, 0.6)',
          background:
            'linear-gradient(180deg, transparent, #4CAD67 40%, #4CAD67 60%, transparent)',
        }}
      />
    </div>
  )
}
