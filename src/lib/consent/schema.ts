/**
 * Photo-consent record — the typed shape.
 *
 * This exists ahead of any storage mechanism on purpose. Defining what a
 * consent record *is* is the part that needs care; where it gets written is a
 * separate decision the owner has not made (see
 * `docs/implementation/lead-data-cutover-plan.md`).
 *
 * ## Why this is the highest-leverage thing in Phase 4
 *
 * Gate I-1 blocks all 18 genuine photographs of the academy — every authentic
 * image the business owns — because no consent was ever recorded. The
 * performances page carries families' words instead of pictures, and the
 * homepage ships no photography at all. A working consent flow is what unblocks
 * that, and nothing else does.
 *
 * ## Design decisions
 *
 * **Permissions are per-use, not all-or-nothing.** A guardian may be happy for
 * a photograph to hang in the studio and not to appear on Instagram. Bundling
 * those into one checkbox produces consent that is technically given and
 * ethically worthless.
 *
 * **Refusal is free.** The form says so, and nothing about a child's place
 * depends on it.
 *
 * **Withdrawal is part of the record**, not an afterthought — a consent that
 * cannot be withdrawn is not consent.
 *
 * ⚠️ The wording rendered to guardians is neutral scaffolding. It has **not**
 * been reviewed by a lawyer, and the record below is a data shape, not a legal
 * instrument. Both need owner and legal sign-off before this is enabled.
 */

/** The media uses a guardian grants or refuses independently. */
export type ConsentCategoryId = 'internal' | 'website' | 'social' | 'print' | 'video'

/** Explicit three-state. `undecided` is not the same as refused. */
export type ConsentDecision = 'granted' | 'refused' | 'undecided'

export interface GuardianIdentity {
  fullName: string
  relationshipToStudent: string
  email: string
  phone: string
}

export interface StudentIdentity {
  fullName: string
  /**
   * Optional. Some families will not want a date of birth recorded, and the
   * academy does not need one to identify a student in a photograph.
   */
  dateOfBirth?: string
  /** Free text — "Tuesday 4pm piano with Mr. Lopez" identifies a child fine. */
  programOrClass?: string
}

export interface ConsentRecord {
  guardian: GuardianIdentity
  student: StudentIdentity
  permissions: Record<ConsentCategoryId, ConsentDecision>
  /** The guardian's typed name, standing as their signature. */
  signature: string
  /** ISO 8601. Set server-side when a destination exists — never client-side. */
  signedAt: string
  /** Populated if and when consent is withdrawn. */
  withdrawnAt?: string
  /** The exact wording the guardian agreed to, stored with the record. */
  acknowledgementText: string
  /**
   * Version of the consent form the guardian signed. If the wording changes,
   * previously stored consents remain attributable to what was actually shown.
   */
  formVersion: string
}

export const CONSENT_FORM_VERSION = '2026-08-08.draft-1'

/** Every permission starts undecided. Nothing is opt-out. */
export const emptyPermissions: Record<ConsentCategoryId, ConsentDecision> = {
  internal: 'undecided',
  website: 'undecided',
  social: 'undecided',
  print: 'undecided',
  video: 'undecided',
}

/**
 * ⚠️ **SUBMISSION IS DISABLED.**
 *
 * There is nowhere to send this. The site has no native form endpoint, and
 * 100% of existing capture runs through a third-party widget whose account
 * ownership is unconfirmed. Consent data concerns **identified minors** and is
 * more sensitive than a marketing lead; routing it into an unverified
 * third-party store would be worse than having no form.
 *
 * The form renders, is fully readable and reviewable, and says plainly that it
 * cannot yet be submitted. It does not pretend to store anything.
 *
 * To enable, all four must be true:
 *   1. A destination is chosen and its data processor confirmed.
 *   2. The wording has had legal review.
 *   3. A retention period and withdrawal process exist.
 *   4. Someone at the academy owns the record and can honour a withdrawal.
 */
export const CONSENT_SUBMISSION_ENABLED = false

/**
 * Field-level validation, defined now so enabling submission is a wiring job
 * rather than a design job. Returns human-readable problems, not codes.
 */
export function validateConsent(record: Partial<ConsentRecord>): string[] {
  const problems: string[] = []
  if (!record.guardian?.fullName?.trim()) problems.push('Enter the parent or guardian’s full name.')
  if (!record.guardian?.relationshipToStudent?.trim())
    problems.push('Tell us your relationship to the student.')
  if (!record.guardian?.email?.trim() && !record.guardian?.phone?.trim())
    problems.push('Give us either an email address or a phone number so we can reach you.')
  if (!record.student?.fullName?.trim()) problems.push('Enter the student’s full name.')
  if (!record.signature?.trim()) problems.push('Type your name to confirm.')
  if (
    record.signature &&
    record.guardian?.fullName &&
    record.signature.trim().toLowerCase() !== record.guardian.fullName.trim().toLowerCase()
  ) {
    problems.push('The typed confirmation should match the guardian’s name above.')
  }
  return problems
}
