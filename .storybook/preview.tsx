import type { Decorator, Preview } from '@storybook/nextjs-vite'

import { MotionProvider } from '@/components/motion/MotionProvider'
import { fontVariables } from '@/styles/fonts'
import '@/styles/globals.css'

/**
 * Two global controls sit in the toolbar, because they are the two axes this
 * design system actually varies along:
 *
 *  · **Register** — House (dark, persuasion) vs Desk (light, decision).
 *    Not a colour-scheme preference: the two rooms are an information
 *    architecture (docs/redesign/final-art-direction.md §1).
 *
 *  · **Motion** — full vs reduced. Reduced motion is a first-class alternative
 *    presentation, not a degraded one (05-motion-system.md §14), so every
 *    story must be viewable both ways.
 */
const globalTypes: Preview['globalTypes'] = {
  register: {
    name: 'Register',
    description: 'The House (dark) or the Desk (light)',
    defaultValue: 'desk',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'desk', title: 'Desk — light' },
        { value: 'house', title: 'House — dark' },
        { value: 'both', title: 'Both, side by side' },
      ],
      dynamicTitle: true,
    },
  },
  motion: {
    name: 'Motion',
    description: 'Full motion or reduced motion',
    defaultValue: 'full',
    toolbar: {
      icon: 'play',
      items: [
        { value: 'full', title: 'Motion — full' },
        { value: 'reduced', title: 'Motion — reduced' },
      ],
      dynamicTitle: true,
    },
  },
}

/** A register surface: sets `data-register` so the semantic aliases re-point. */
function Room({ register, children }: { register: 'house' | 'desk'; children: React.ReactNode }) {
  return (
    <div
      data-register={register}
      className="bg-(--color-surface-page) text-(--color-text-primary) p-8"
      style={{ minHeight: '100%' }}
    >
      {children}
    </div>
  )
}

const withRegister: Decorator = (Story, context) => {
  const register = context.globals.register as 'desk' | 'house' | 'both'
  const reduced = context.globals.motion === 'reduced'

  // `data-motion` on <html> drives the reduced-motion CSS, exactly as in the app.
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-motion', reduced ? 'reduced' : 'full')
  }

  const content = (
    <MotionProvider forceReducedMotion={reduced}>
      <Story />
    </MotionProvider>
  )

  if (register === 'both') {
    return (
      <div className={`${fontVariables} grid grid-cols-1 lg:grid-cols-2`}>
        <Room register="desk">{content}</Room>
        <Room register="house">
          <MotionProvider forceReducedMotion={reduced}>
            <Story />
          </MotionProvider>
        </Room>
      </div>
    )
  }

  return (
    <div className={fontVariables}>
      <Room register={register}>{content}</Room>
    </div>
  )
}

const preview: Preview = {
  globalTypes,
  decorators: [withRegister],

  parameters: {
    layout: 'fullscreen',

    // The register decorator paints the ground; a second background would fight it.
    backgrounds: { disable: true },

    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
      expanded: true,
    },

    a11y: {
      /**
       * Report violations rather than failing the story, so a laboratory entry
       * that deliberately demonstrates a banned combination still renders with
       * its finding visible.
       */
      test: 'todo',
    },

    docs: {
      toc: true,
    },

    options: {
      storySort: {
        order: [
          'Foundations',
          ['Introduction', 'Colour', 'Typography Scale', 'Spacing Scale', 'Theme Registers', 'Reduced Motion'],
          'Layout',
          ['Container', 'Section', 'Grid', 'Stack', 'Cluster', 'Split', 'Sidebar'],
          'UI',
          ['Button', 'Card', 'Typography', 'Badge', 'Divider', 'Icon'],
          'Forms',
          ['Input', 'Textarea', 'Select', 'Checkbox', 'Radio'],
          'Motion',
          'Layout Shell',
          ['Navigation', 'Footer'],
        ],
      },
    },
  },
}

export default preview
