import { DeskLabel } from '@/components/page'
import { FilmMargin, Movement } from '@/components/film'
import { CONSENT_SUBMISSION_ENABLED } from '@/lib/consent/schema'
import type { ConsentCategoryId } from '@/lib/consent/schema'

/**
 * The photo-consent form.
 *
 * ⚠️ **Renders disabled.** `CONSENT_SUBMISSION_ENABLED` is `false` because
 * there is no verified destination for the record. Every control carries
 * `disabled`, the notice above them says why in plain language, and there is no
 * submit handler to accidentally wire up later — enabling it is a deliberate
 * act, not an oversight someone can trip into.
 *
 * It is a Server Component with no `'use client'` boundary: with submission
 * disabled there is no state to hold, and shipping interactivity for a form
 * that cannot be sent would be shipping a lie.
 *
 * The markup is complete and semantic so the owner and a lawyer can read
 * exactly what a guardian will be asked, and so enabling it later is wiring
 * rather than redesign.
 */

interface ConsentCategory {
  id: ConsentCategoryId
  label: string
  description: string
}

interface ConsentFormProps {
  categories: readonly ConsentCategory[]
  acknowledgement: string
  blockedNotice: string
  withdrawal: string
}

/** Shared field shell — label above a hairline-ruled input, never a box. */
function Field({
  id,
  label,
  type = 'text',
  hint,
}: {
  id: string
  label: string
  type?: string
  hint?: string
}) {
  return (
    <div className="border-t border-(--color-border-default) py-6 first:border-t-0 first:pt-0">
      <label htmlFor={id} className="font-display text-label uppercase text-(--color-text-muted)">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        disabled={!CONSENT_SUBMISSION_ENABLED}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="mt-3 block w-full max-w-[36rem] border-0 border-b border-(--color-border-default) bg-transparent pb-2 font-body text-body-lg text-(--color-text-primary) focus-visible:border-(--color-text-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus-ring) disabled:opacity-(--opacity-disabled)"
      />
      {hint ? (
        <p id={`${id}-hint`} className="mt-3 max-w-[52ch] font-body text-body-sm text-(--color-text-muted)">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function ConsentForm({
  categories,
  acknowledgement,
  blockedNotice,
  withdrawal,
}: ConsentFormProps) {
  const disabled = !CONSENT_SUBMISSION_ENABLED

  return (
    <Movement name="consent-form" ground="house" className="pb-(--section-feature)">
      <FilmMargin wide>
        <hr className="border-0 border-t border-(--color-border-default)" />

        {/* The blocker, stated before the reader invests any effort. */}
        {disabled ? (
          <div
            role="note"
            className="mt-(--section-comfortable) max-w-[70ch] border-l-2 border-(--color-spot-700) pl-6"
          >
            <p className="font-display text-label uppercase text-(--color-text-muted)">
              Not yet accepting submissions
            </p>
            <p className="mt-3 font-body text-body-lg text-(--color-text-primary)">
              {blockedNotice}
            </p>
          </div>
        ) : null}

        <form className="mt-(--section-comfortable)" aria-describedby={disabled ? 'consent-blocked' : undefined}>
          {disabled ? (
            <p id="consent-blocked" className="sr-only">
              This form is not currently accepting submissions. Please contact the academy directly.
            </p>
          ) : null}

          {/* 1 — Guardian */}
          <fieldset disabled={disabled} className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <legend className="sr-only">Parent or guardian details</legend>
            <div className="lg:pt-2">
              <DeskLabel>Parent or guardian</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              <Field id="guardian-name" label="Full name" />
              <Field id="guardian-relationship" label="Relationship to the student" />
              <Field id="guardian-email" label="Email" type="email" />
              <Field
                id="guardian-phone"
                label="Phone"
                type="tel"
                hint="Either an email address or a phone number is enough — we only need one way to reach you."
              />
            </div>
          </fieldset>

          {/* 2 — Student */}
          <fieldset
            disabled={disabled}
            className="mt-(--section-spacious) grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16"
          >
            <legend className="sr-only">Student details</legend>
            <div className="lg:pt-2">
              <DeskLabel>The student</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              <Field id="student-name" label="Full name" />
              <Field
                id="student-class"
                label="Programme or class"
                hint="Whatever helps us identify them — “Tuesday 4pm piano” is plenty."
              />
              <Field
                id="student-dob"
                label="Date of birth (optional)"
                type="date"
                hint="Only if you want to give it. We do not need it to identify your child in a photograph."
              />
            </div>
          </fieldset>

          {/* 3 — Permissions, one decision per use */}
          <fieldset
            disabled={disabled}
            className="mt-(--section-spacious) grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16"
          >
            <legend className="sr-only">Where photographs may be used</legend>
            <div className="lg:pt-2">
              <DeskLabel>Where photographs may be used</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
                Decide each one separately. Saying no to any of them changes nothing about your
                child&rsquo;s place, their lessons, or their part in a showcase.
              </p>

              {categories.map((category) => (
                <div
                  key={category.id}
                  className="mt-8 border-t border-(--color-border-default) pt-6"
                >
                  <p className="font-display text-heading-md text-(--color-text-primary)">
                    {category.label}
                  </p>
                  <p className="mt-2 max-w-[56ch] font-body text-body-md text-(--color-text-secondary)">
                    {category.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
                    {(['granted', 'refused'] as const).map((decision) => (
                      <label
                        key={decision}
                        htmlFor={`${category.id}-${decision}`}
                        className="flex items-center gap-3 font-body text-body-lg text-(--color-text-primary)"
                      >
                        <input
                          id={`${category.id}-${decision}`}
                          name={category.id}
                          value={decision}
                          type="radio"
                          disabled={disabled}
                          // size-6 (24px) meets WCAG 2.5.8 AA. These radios
                          // carry the actual consent decision — they are the
                          // last control that should be hard to hit.
                          className="size-6 accent-(--color-spot-500) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring) disabled:opacity-(--opacity-disabled)"
                        />
                        {decision === 'granted' ? 'Yes' : 'No'}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          {/* 4 — Acknowledgement and signature */}
          <fieldset
            disabled={disabled}
            className="mt-(--section-spacious) grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16"
          >
            <legend className="sr-only">Confirmation</legend>
            <div className="lg:pt-2">
              <DeskLabel>Confirmation</DeskLabel>
            </div>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] border-t border-(--color-border-default) pt-6 font-body text-body-lg text-(--color-text-primary)">
                {acknowledgement}
              </p>
              <Field
                id="signature"
                label="Type your name to confirm"
                hint="Typing your name here stands as your signature."
              />

              <div className="mt-10">
                <button
                  type="submit"
                  disabled={disabled}
                  aria-disabled={disabled}
                  className="inline-flex min-h-13 items-center justify-center rounded-(--radius-full) bg-spot-500 px-8 py-[17px] font-display text-body-md font-semibold text-(--color-ground-stage) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring) disabled:opacity-(--opacity-disabled)"
                >
                  Submit consent
                </button>
              </div>

              <p className="mt-8 max-w-[62ch] font-body text-body-sm text-(--color-text-muted)">
                {withdrawal}
              </p>
            </div>
          </fieldset>
        </form>
      </FilmMargin>
    </Movement>
  )
}
