import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Stack } from '@/components/ui/Stack'
import { Text } from '@/components/ui/Typography'

import { Checkbox } from './Checkbox'
import { FormField } from './FormField'
import { Input } from './Input'
import { RadioGroup } from './Radio'
import { Select } from './Select'
import { Textarea } from './Textarea'

const meta: Meta = {
  title: 'Forms/Primitives',
  parameters: {
    docs: {
      description: {
        component: [
          'Canonical spec: `docs/redesign/04-design-system.md` §9.',
          '',
          'The current site has **zero native forms**. Everything here is new and must be built to a high standard, because it is now the entire conversion mechanism.',
          '',
          'Rules enforced structurally, not by discipline:',
          '',
          '- **Visible labels always.** There is no `hideLabel` prop, deliberately. Placeholder-as-label fails accessibility and memory.',
          '- **Controls throw outside `<FormField>`.** `useField()` supplies the id and ARIA wiring, so an unlabelled input is not something a developer can build by accident.',
          '- **Errors are programmatically linked** via `aria-describedby` and announced with `role="alert"`, with no entrance animation — error messages appear instantly, in place.',
          '- **Required is explicit and in text**, never colour alone. We mark required, not optional.',
          '- One column. Never side-by-side fields on mobile.',
          '',
          '⚠️ **Primitives only.** No business forms — the trial booking and camp reservation flows are blocked on gate B-8 (the trial price and camp deposit are unpublished).',
        ].join('\n'),
      },
    },
  },
}

export default meta
type Story = StoryObj

export const TextInput: Story = {
  name: 'Input',
  render: () => (
    <Stack gap="5" className="max-w-md">
      <FormField label="Parent name" required>
        <Input type="text" autoComplete="name" placeholder="Jordan Reyes" />
      </FormField>

      <FormField label="Phone" description="We only use this to confirm the lesson time." required>
        <Input type="tel" autoComplete="tel" inputMode="tel" placeholder="786-753-9509" />
      </FormField>

      <FormField label="Email">
        <Input type="email" autoComplete="email" placeholder="you@example.com" />
      </FormField>

      <FormField label="Monthly budget" description="Optional — helps us suggest a format.">
        <Input type="text" inputMode="numeric" startAdornment="$" endAdornment="/mo" />
      </FormField>

      <FormField label="Disabled field">
        <Input type="text" disabled defaultValue="Not editable" />
      </FormField>

      <FormField label="Child's age" error="Enter an age between 3 and 18." required>
        <Input type="number" defaultValue="24" min={3} max={18} />
      </FormField>
    </Stack>
  ),
}

export const TextareaField: Story = {
  name: 'Textarea',
  render: () => (
    <Stack gap="5" className="max-w-md">
      <FormField
        label="Anything we should know?"
        description="For example, if your child is nervous about performing."
      >
        <Textarea placeholder="Optional" />
      </FormField>

      <FormField label="With an error" error="This field is limited to 500 characters.">
        <Textarea rows={3} defaultValue="…" />
      </FormField>
    </Stack>
  ),
}

export const SelectField: Story = {
  name: 'Select',
  render: () => (
    <Stack gap="5" className="max-w-md">
      <FormField label="Instrument of interest" required>
        <Select
          placeholder="Choose an instrument"
          options={[
            { value: 'piano', label: 'Piano' },
            { value: 'guitar', label: 'Guitar' },
            { value: 'drums', label: 'Drums' },
            { value: 'bass', label: 'Bass' },
            { value: 'violin', label: 'Violin' },
            { value: 'ukulele', label: 'Ukulele' },
            { value: 'voice', label: 'Voice' },
          ]}
        />
      </FormField>

      <FormField
        label="Preferred contact language"
        description="A first-class field, not an afterthought."
        required
      >
        <Select
          options={[
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' },
          ]}
        />
      </FormField>

      <div className="rounded-(--radius-md) border border-(--color-border-default) p-4">
        <Text token="body-sm" className="measure text-(--color-text-secondary)">
          Deliberately a native <code>&lt;select&gt;</code>. It gets the platform&rsquo;s own keyboard handling,
          screen-reader support and mobile picker for free — and this audience includes Unique Abilities scholarship
          students, where assistive-technology compatibility is a market requirement, not a nicety. A custom combobox
          would trade that away for styling.
        </Text>
      </div>
    </Stack>
  ),
}

export const CheckboxField: Story = {
  name: 'Checkbox',
  render: () => (
    <Stack gap="5" className="max-w-md">
      <Checkbox label="Send me showcase dates" />
      <Checkbox
        label="I agree to the photo-release policy"
        description="You can withdraw consent at any time and we will remove the images."
      />
      <Checkbox label="Pre-checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Required agreement" error="You must accept the terms to continue." />

      <div className="rounded-(--radius-md) border border-(--color-border-default) p-4">
        <Text token="body-sm" className="measure text-(--color-text-secondary)">
          The native input stays in the DOM and is only visually replaced, keeping platform keyboard behaviour, focus
          handling and form participation. The whole label is the hit target, comfortably over 44×44px.
        </Text>
      </div>
    </Stack>
  ),
}

export const RadioField: Story = {
  name: 'Radio',
  render: function RadioStory() {
    const [value, setValue] = useState('group')

    return (
      <Stack gap="6" className="max-w-md">
        <RadioGroup
          name="format"
          legend="Which format suits your child?"
          description="You can change this later."
          value={value}
          onChange={setValue}
          required
          options={[
            { value: 'private', label: 'Private lessons', description: 'One student, one teacher.' },
            { value: 'group', label: 'Group lessons', description: 'Small group, same level.' },
            { value: 'band', label: 'Band Builders', description: 'Ensemble playing with peers.' },
            { value: 'unsure', label: "I'm not sure yet" },
          ]}
        />

        <RadioGroup
          name="contact"
          legend="Best way to reach you"
          orientation="horizontal"
          defaultValue="phone"
          options={[
            { value: 'phone', label: 'Phone' },
            { value: 'email', label: 'Email' },
            { value: 'text', label: 'Text' },
          ]}
        />

        <RadioGroup
          name="broken"
          legend="With an error"
          error="Choose one option to continue."
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
          ]}
        />

        <div className="rounded-(--radius-md) border border-(--color-border-default) p-4">
          <Text token="body-sm" className="measure text-(--color-text-secondary)">
            A single radio in isolation is meaningless, so the primitive is the <strong>group</strong>.
            <code> &lt;fieldset&gt;</code> + <code>&lt;legend&gt;</code> is used rather than{' '}
            <code>role=&quot;radiogroup&quot;</code>: it is the native pattern, and screen readers announce the legend
            with every option without any ARIA authoring.
          </Text>
        </div>
      </Stack>
    )
  },
}

export const ValidationStates: Story = {
  name: 'Validation & disclosure',
  render: () => (
    <Stack gap="6" className="max-w-md">
      <Text token="body-md" className="measure">
        Validation runs <strong>on blur, never on keystroke</strong>. Errors are specific and constructive, appear
        instantly with no entrance animation, and are linked to the field.
      </Text>

      <FormField
        label="Child's name"
        error="Enter your child's first name so we know who to expect."
        required
      >
        <Input type="text" defaultValue="" />
      </FormField>

      <div className="rounded-(--radius-md) border-2 border-warn p-5">
        <Text token="heading-sm" as="h3" className="mb-2">
          ⚠️ Price is disclosed above the form, never inside it
        </Text>
        <Text token="body-sm" className="measure mb-4">
          Rule 9 of §9. Phase 2 found the $25 trial charge disclosed on two pages out of twenty-six and a
          non-refundable camp deposit whose amount is published nowhere. The terms go here — above — and the figures
          are blocked on gate <strong>B-8</strong>.
        </Text>
        <Button variant="primary" disabled aria-disabled>
          Book a trial
        </Button>
      </div>
    </Stack>
  ),
}

export const FullFieldAnatomy: Story = {
  name: 'Field anatomy',
  render: () => (
    <Stack gap="5" className="max-w-md">
      <FormField
        label="Label — always visible"
        description="Helper text. Never carries information required to complete the field."
        error="Validation message. role=alert, no entrance animation."
        required
      >
        <Input type="text" placeholder="Placeholder is a hint, never a label" />
      </FormField>

      <Text token="body-sm" className="measure text-(--color-text-muted)">
        Inspect this field: the label&rsquo;s <code>for</code> matches the input&rsquo;s <code>id</code>, and{' '}
        <code>aria-describedby</code> points at both the description and the error. All of it is generated by{' '}
        <code>FormField</code> — a consumer cannot forget it.
      </Text>
    </Stack>
  ),
}
