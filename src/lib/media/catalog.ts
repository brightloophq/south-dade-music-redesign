/**
 * PUBLISHED SOUTH DADE MUSIC PHOTOGRAPHY.
 *
 * ## Approval basis
 *
 * The owner has approved reuse of the existing South Dade Music portfolio
 * already published on the live site — performance, student/event, lesson and
 * classroom, ensemble, stage and academy-environment photography. The I-1
 * (consent) and I-7 (photographer copyright) gates that blocked this material
 * through MI1 and MI2 are **resolved for this portfolio**.
 *
 * That approval is specific. It does not extend to stock or template imagery
 * that happened to sit on the legacy site, and it does not extend to
 * third-party partner marks. Neither appears here: every row below is
 * first-party South Dade material, classified `prov: FP` in the census.
 *
 * ## What each row records
 *
 * The audit ID is the row number in the 67-image visual census, so any
 * published photograph can be traced to its source URL, the legacy page it was
 * published on, and the crop applied. `Photo` writes the audit ID into the DOM
 * as `data-audit`.
 *
 * ## Files
 *
 * `public/media/<id>.jpg` — resized and mozjpeg-encoded from the original at
 * generation time, then served by Next as AVIF or WebP at the widths each slot
 * requests. The multi-megabyte originals stay in `.audit/legacy-assets/`
 * and are never published.
 */

export interface PhotoRecord {
  /** Row in the 67-image visual census. */
  auditId: number
  /** Where the original was published on the legacy site. */
  sourceUrl: string
  sourceFilename: string
  /** Legacy pages that used it. */
  sourcePages: readonly string[]
  /** Original pixel dimensions before any crop. */
  sourceDimensions: string
  /** The crop applied when producing the published derivative. */
  crop: string
  /** What the photograph does in the design. */
  role: string
  /** Always the same, and stated per row so it cannot be lost. */
  approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO'
}

export const PHOTOS = {
  "stage-floral": {
    auditId: 65,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/0_p-NH2ecjjuoHdJct-1024x683-2.png",
    sourceFilename: "0_p-NH2ecjjuoHdJct-1024x683-2.png",
    sourcePages: ["/about/"],
    sourceDimensions: "1024x683",
    crop: "whole",
    role: "House-lights reveal",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "bass-hands": {
    auditId: 31,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/IMG_2582-scaled.jpg",
    sourceFilename: "IMG_2582-scaled.jpg",
    sourcePages: ["/bass-guitar-lessons/"],
    sourceDimensions: "2560x1920",
    crop: "left 940, top 205, 600x1500",
    role: "Programs rail",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "recital-room": {
    auditId: 26,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/P1088524.jpg",
    sourceFilename: "P1088524.jpg",
    sourcePages: ["/piano-lessons/","/ukulele-lessons/"],
    sourceDimensions: "2000x1500",
    crop: "whole",
    role: "Performance evidence band",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "band-showcase": {
    auditId: 10,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/04/ozel-gitar-kursu-2-3.png",
    sourceFilename: "ozel-gitar-kursu-2-3.png",
    sourcePages: ["/","/programs/"],
    sourceDimensions: "1000x667",
    crop: "whole",
    role: "Performances hero",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "ensemble-leis": {
    auditId: 20,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/P1088653.jpg",
    sourceFilename: "P1088653.jpg",
    sourcePages: ["/90-day-stage-program/"],
    sourceDimensions: "2000x1500",
    crop: "whole",
    role: "Performances ensemble",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "bass-on-stand": {
    auditId: 24,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/P1088541.jpg",
    sourceFilename: "P1088541.jpg",
    sourcePages: ["/guitar-lessons/"],
    sourceDimensions: "2000x1500",
    crop: "left 480, top 150, 1120x1320",
    role: "Performances detail",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "stage-set-purple": {
    auditId: 54,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/04/Exposure-scaled.jpg",
    sourceFilename: "Exposure-scaled.jpg",
    sourcePages: ["/"],
    sourceDimensions: "2560x1707",
    crop: "whole",
    role: "90-Day preparation",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "medals": {
    auditId: 23,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/P1088548.jpg",
    sourceFilename: "P1088548.jpg",
    sourcePages: ["/private-lessons/"],
    sourceDimensions: "2000x1500",
    crop: "left 40, top 420, 1920x930",
    role: "90-Day finale",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "medals-on-stage": {
    auditId: 28,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/P1088659.jpg",
    sourceFilename: "P1088659.jpg",
    sourcePages: ["/drum-lessons/"],
    sourceDimensions: "2000x1500",
    crop: "whole",
    role: "90-Day outcome",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "ensemble-guitars": {
    auditId: 29,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/P1088639.jpg",
    sourceFilename: "P1088639.jpg",
    sourcePages: ["/violin-lessons/"],
    sourceDimensions: "2000x1500",
    crop: "whole",
    role: "Band Builders",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "lesson-room": {
    auditId: 11,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/04/ozel-gitar-kursu-2-4-1.png",
    sourceFilename: "ozel-gitar-kursu-2-4-1.png",
    sourcePages: ["/","/programs/"],
    sourceDimensions: "1000x667",
    crop: "whole",
    role: "Lessons / Private Lessons",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "ukulele-wall": {
    auditId: 30,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/IMG_5012-scaled.jpg",
    sourceFilename: "IMG_5012-scaled.jpg",
    sourcePages: ["/early-childhood/"],
    sourceDimensions: "2560x1440",
    crop: "left 51, top 29, 768x605",
    role: "Private Lessons",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "banner": {
    auditId: 68,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/New-Project.png",
    sourceFilename: "New-Project.png",
    sourcePages: ["/programs/"],
    sourceDimensions: "441x759",
    crop: "whole",
    role: "About — community",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "community-event": {
    auditId: 21,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/P1088667-1.jpg",
    sourceFilename: "P1088667-1.jpg",
    sourcePages: ["/90-day-stage-program/"],
    sourceDimensions: "2000x1500",
    crop: "whole",
    role: "About — community",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "camp-circle": {
    auditId: 34,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/PHOTO-2025-06-28-19-06-09.jpg",
    sourceFilename: "PHOTO-2025-06-28-19-06-09.jpg",
    sourcePages: ["/summer-programs/","/summer-jam-music-camp-2026/"],
    sourceDimensions: "2048x1536",
    crop: "whole",
    role: "Camps",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "event-park": {
    auditId: 14,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/DSCF3094-scaled.jpg",
    sourceFilename: "DSCF3094-scaled.jpg",
    sourcePages: ["/","/about/","/performances/"],
    sourceDimensions: "2560x1707",
    crop: "whole",
    role: "Performances — community outreach",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "event-la-bamba": {
    auditId: 33,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/121cdee4-aca2-4eaa-adae-571929831e2a.jpg",
    sourceFilename: "121cdee4-aca2-4eaa-adae-571929831e2a.jpg",
    sourcePages: ["/bass-guitar-lessons/"],
    sourceDimensions: "1179x870",
    crop: "whole",
    role: "Performances — a named production",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "event-holiday": {
    auditId: 5,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/04/ozel-gitar-kursu-2.png",
    sourceFilename: "ozel-gitar-kursu-2.png",
    sourcePages: ["/","/programs/","/private-lessons/"],
    sourceDimensions: "1000x667",
    crop: "whole",
    role: "Performances — a seasonal recital",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "first-note": {
    auditId: 18,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/P1088570.jpg",
    sourceFilename: "P1088570.jpg",
    sourcePages: ["/","/about/","/performances/"],
    sourceDimensions: "2000x1500",
    crop: "whole",
    role: "Homepage — the moment before the note",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "lesson-duet": {
    auditId: 13,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/P1088527.jpg",
    sourceFilename: "P1088527.jpg",
    sourcePages: ["/","/about/","/performances/"],
    sourceDimensions: "2000x1500",
    crop: "whole",
    role: "Rehearsal — instructor and student at the keyboard",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
  "full-house": {
    auditId: 67,
    sourceUrl: "https://southdademusic.com/wp-content/uploads/2026/05/0_p-NH2ecjjuoHdJct-1024x683-4.png",
    sourceFilename: "0_p-NH2ecjjuoHdJct-1024x683-4.png",
    sourcePages: ["/instruments/"],
    sourceDimensions: "1024x683",
    crop: "whole",
    role: "Performances — a full room",
    approvalBasis: 'OWNER APPROVED EXISTING PORTFOLIO',
  },
} as const satisfies Record<string, PhotoRecord>

export type PhotoId = keyof typeof PHOTOS
