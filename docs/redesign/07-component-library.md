# 07 — Component Library

**Phase:** 3 — Product Strategy
**Date:** 2026-08-05
**Depends on:** `04-design-system.md` (tokens), `05-motion-system.md` (behaviour), `08-content-model.md` (data)

**No code.** This is the component inventory, contract and rule set. Each entry defines purpose, variants, key props, states, accessibility requirements and motion. Anything marked ⚠️ is blocked on a decision gate.

---

## 0. Conventions

- **Naming:** PascalCase, domain-prefixed where ambiguous (`ProgramCard`, not `Card2`)
- **Composition over configuration:** prefer slots to boolean floods. Any component with >8 booleans is wrong.
- **Tokens only:** no hard-coded colour, spacing, radius or duration values (`04-design-system.md` §17)
- **Content-agnostic:** components render data from the content model; they never contain copy
- **Bilingual-safe:** every text-bearing component tested at **+35% string length**
- **Accessibility is part of the contract**, not a later pass
- **Server-first:** components are static unless interactivity is required

**Component count: 68.**

---

## 1. Layout

| Component | Purpose | Key props / slots | Notes |
|---|---|---|---|
| **PageShell** | Root wrapper: header, main, footer, skip link, live region | `theme` (light\|dark), `header`, `footer` | Owns the skip-to-content target and the route-announcement live region |
| **Section** | Vertical rhythm primitive | `ground` (light\|dark\|photo), `density` (comfortable\|spacious), `id` | The only component permitted to set section padding. Enforces the max-two dark↔light transitions rule. |
| **Container** | Max-width + gutters | `width` (prose\|content\|wide\|bleed) | `prose` = 68ch, `content` = 1440px |
| **Grid** | 12-col responsive grid | `cols`, `gap`, `align` | |
| **Stack** | Vertical flow with consistent gap | `gap`, `align` | |
| **Cluster** | Horizontal wrap group | `gap`, `justify` | Tags, meta rows, button groups |
| **SplitLayout** | Asymmetric two-column | `ratio` (7:5\|5:7), `reverse`, `sticky` | Never 50/50 — see design system §4 |
| **StickyRail** | Sticky summary beside scrolling detail | `railPosition`, `offsetTop` | **The fix for "no CTA at the bottom of the page."** Used on programme, camp and instrument pages. |
| **EditorialPair** | Alternating image/text band | `reverse`, `media`, `body` | |
| **Spacer** | Explicit vertical space | `size` | Escape hatch; use sparingly |

---

## 2. Navigation

| Component | Purpose | Key props | Accessibility | Motion |
|---|---|---|---|---|
| **SiteHeader** | Primary nav bar | `variant` (transparent\|solid), `condensed` | `<header>`, `<nav>` landmarks | Condense on scroll, 200ms |
| **MegaMenu** | Programs / Lessons panels | `columns`, `feature` | Opens on hover *with* 150ms intent delay **and** on focus/click; Escape closes; no focus trap | 280ms fade+rise |
| **NavItem** | Single nav link | `href`, `active`, `hasChildren` | `aria-current="page"` | Underline draws from centre |
| **MobileDrawer** | Full-screen mobile nav | `open`, `onClose` | Focus trapped, body scroll locked, focus restored | Slide-in 420ms |
| **NavAccordion** | Drawer section expander | `label`, `items`, `defaultOpen` | `aria-expanded`, `aria-controls` | Height auto, 280ms |
| **StickyActionBar** | Mobile bottom CTA bar | `primary`, `secondary`, `showAfter` | Hides on input focus; never covers footer | Rise 280ms after 25% scroll |
| **Breadcrumbs** | Path context | `items` | `nav[aria-label="Breadcrumb"]` + `BreadcrumbList` schema | None |
| **LanguageToggle** | EN ⇄ ES | `current`, `alternates` | `lang` + `hreflang` on each option | 200ms cross-fade ⚠️ B-6 |
| **SiteFooter** | Four-column footer | `columns`, `serviceAreas`, `social` | `<footer>` landmark | None |
| **SkipLink** | Bypass navigation | `target` | First tab stop, visible on focus | Never animated |
| **BackToTop** | Return to top | `showAfter` | `aria-label` | Fade 180ms |
| **PaginationNav** | Archive paging | `current`, `total`, `basePath` | `rel=next/prev` | None |
| **InPageNav** | Long-page section jumps | `sections`, `sticky` | Active section announced | Scroll-spy, no scroll-jack |

---

## 3. Hero

| Component | Purpose | Variants | Notes |
|---|---|---|---|
| **HomeHero** | Homepage hero | — | The full sequence in `05-motion-system.md` §9. H1 present at paint; never `opacity:0` in CSS. Image is LCP, never lazy. |
| **PageHero** | Interior page hero | `compact`, `standard`, `media` | Reduced motion set: `curtain-up` H1 + `fade-rise` sub-line only |
| **ProgramHero** | Programme pages | — | Adds fact strip: duration · format · ages · price ⚠️ B-8 |
| **CampHero** | Camp pages | — | Adds dates, block times, capacity, deposit ⚠️ **deposit amount is a hard block** |
| **HeroFactStrip** | Inline key facts under a hero | `facts[]` | Answers the parent's first four questions above the fold |
| **HeroMedia** | Hero image/video wrapper | `image`, `video`, `poster`, `overlay` | Muted, poster-first, user-initiated. No autoplay with sound. |
| **ScrollCue** | Scroll affordance | — | 2s drift loop; the only permitted in-viewport loop |

---

## 4. Cards

| Component | Purpose | Required fields | Notes |
|---|---|---|---|
| **ProgramCard** | Programme summary | image, ageBand, title, summary, 3 facts, price\|"from", CTA | Facts pin to card bottom; equal heights per row |
| **InstrumentCard** | Instrument summary | **subject-verified image**, name, startAge, whatYouNeed, CTA | Image subject is a validated field — fixes the wrong-instrument defect |
| **TeacherCard** | Instructor | portrait, name, instruments[], oneLine, credential | ⚠️ gate B-7 |
| **ShowcaseCard** | Past performance | heroImage, date, venue, studentCount, galleryLink | ⚠️ needs real event records |
| **EventCard** | Upcoming event | date, time, venue, isFree, addToCalendar | ⚠️ gate S-6 |
| **CampSessionCard** | One camp session | dates, blockTimes, ages, price, seatsRemaining, CTA | Capacity shown only if genuinely tracked — never fabricated scarcity |
| **TestimonialCard** | Family review | quote, name, sourceBadge, rating? | **Verbatim only.** Never edited. |
| **StatCard** | Single proof number | value, label, suffix | Tabular numerals; counter-animated |
| **FAQCard** | Q&A in card form | question, answer | For FAQ grids; accordion elsewhere |
| **ArticleCard** | Blog post | image, category, title, excerpt, readTime | Post-launch |
| **ScholarshipCard** | PEP / UA summary | name, whoFor, whatItCovers, CTA | Replaces current French stock imagery |
| **LinkCard** | Generic navigational card | icon, title, description, href | Related-content rows |

**Universal card rules:** whole card is one click target with a single tab stop · never truncate mid-sentence (`line-clamp` with ellipsis is a safety net, not a layout strategy) · every image has meaningful `alt` · hover lift disabled on touch.

---

## 5. Forms

**Zero native forms exist today.** This group is entirely new and carries the whole conversion mechanism.

| Component | Purpose | Notes |
|---|---|---|
| **Form** | Wrapper: submission, validation, error summary | Focus moves to error summary on failed submit |
| **FormField** | Label + control + help + error | **Visible label always.** Never placeholder-as-label. |
| **TextInput** | Single-line | Correct `type` and `autocomplete` |
| **TextArea** | Multi-line | Auto-grow, no fixed scroll |
| **Select** | Dropdown | Native on mobile |
| **RadioGroup** | Mutually exclusive | Fieldset + legend |
| **CheckboxGroup** | Multi-select | Fieldset + legend |
| **Checkbox** | Single | Consent, policy acknowledgement |
| **DatePicker** | Date selection | Keyboard-operable; free-text fallback |
| **PhoneInput** | Telephone | US format, `tel` type |
| **LanguagePreference** | EN/ES contact preference | **First-class field**, not optional extra |
| **AgeInput** | Child's age | Drives programme eligibility hints |
| **InstrumentPicker** | Instrument selection | Uses the seven custom icons |
| **FormStepper** | Multi-step progress | Camp booking; progressive disclosure |
| **FieldError** | Inline error | `aria-describedby`, instant, never animated |
| **ErrorSummary** | Top-of-form error list | Linked to fields, focus target |
| **SubmitButton** | Submit with state | Width locked during loading; label persists |
| **FormSuccess** | Confirmation panel | States what happens next and by when |
| **HiddenIntentField** | Captures source programme/page | **Fixes the current inability to segment conversions** |
| **ConsentNotice** | Data-use statement | Plain language, above submit |
| **PriceDisclosure** | Price shown before the form | **Structural guarantee against the current non-disclosure failure** |

**Booking flows (composed):** `TrialBookingForm` · `CampReservationForm` ⚠️ needs deposit amount · `ScholarshipEnquiryForm` · `WaitlistForm` · `ContactForm`

---

## 6. Gallery & media

| Component | Purpose | Notes |
|---|---|---|
| **GalleryGrid** | Masonry/justified image grid | Row-grouped stagger beyond 8 items |
| **GalleryItem** | Single thumbnail | Caption always visible on touch |
| **Lightbox** | Full-screen viewer | FLIP from grid position; Escape returns image to origin; focus trapped and restored |
| **MediaFigure** | Image + caption + credit | Credit field supports photographer attribution |
| **ResponsiveImage** | Art-directed image | AVIF→WebP→JPEG, `srcset`, explicit dimensions, zero CLS |
| **VideoPlayer** | Showcase / ensemble video | ⚠️ **No video exists yet — highest-priority production item** · muted poster-first, captions required, visible pause |
| **VideoEmbed** | Third-party video | Facade pattern — no third-party JS until user click |
| **AudioClip** | Student audio sample | Optional; lower production cost than video |
| **BeforeAfter** | Week 1 vs Week 12 | High-persuasion, needs consented footage |
| **ImageCompare** | Slider comparison | Keyboard-operable |
| **LogoStrip** | Partner/scholarship logos | ⚠️ Step Up logo rights unconfirmed |

---

## 7. Timeline & storytelling

| Component | Purpose | Notes |
|---|---|---|
| **NinetyDayTimeline** | ★ The signature scroll sequence | `05-motion-system.md` §10. Pinned ≥`lg`; stacked below. **All week content readable without motion.** ⚠️ gates B-3, B-4 |
| **TimelineStep** | One week/stage marker | Vector, not video — translatable and accessible |
| **ExposureLadder** | Gradual Exposure Ladder diagram | Five rungs ⚠️ gate B-3 |
| **ProcessSteps** | Numbered how-it-works | Enrolment, scholarship application |
| **JourneyMap** | Skill + ensemble track diagram | Makes the two-class structure visible |
| **WeekBadge** | "Week 12" marker | Tabular numerals |
| **MilestoneList** | What they'll achieve by week N | Instrument pages |

---

## 8. Testimonials & proof

| Component | Purpose | Notes |
|---|---|---|
| **TestimonialCard** | See §4 | |
| **TestimonialGrid** | Multiple reviews | **Renders each review once.** Fixes the current 18-cards-for-12-reviews defect. |
| **FeaturedQuote** | Single large pull-quote | For the shy-child narrative |
| **ReviewSourceBadge** | "Google review" attribution | ⚠️ gate S-4 — requires source URLs |
| **AggregateRating** | Star summary | ⚠️ **Only with verifiable sources.** Unverifiable ratings are a policy violation. |
| **ProofBar** | Row of stat cards | ≤3 per page |
| **TrustSignals** | Scholarship, safeguarding, credentials | ⚠️ only claims that survived Phase 2 verification |
| **GuaranteeCallout** | Stage-Ready Guarantee | **Required on every programme page.** Currently appears on 2 of 26 pages and 0 of 6 programme pages. Never animated. |

---

## 9. FAQ

| Component | Purpose | Notes |
|---|---|---|
| **FAQAccordion** | Expandable Q&A list | Correct ARIA, `aria-expanded`/`aria-controls`, keyboard operable |
| **FAQItem** | Single Q&A | Deep-linkable via anchor |
| **FAQSection** | Grouped FAQs with heading | Emits `FAQPage` schema |
| **FAQSearch** | Filter within FAQs | For the consolidated 40-item set |
| **InlineFAQ** | 3–5 contextual FAQs on a page | Instrument and programme pages |

**Rule:** an FAQ answer is authored once in the content model and referenced. The current site duplicates the 7-item set on two pages and the 9-item camp set on two more.

---

## 10. Pricing

⚠️ **Entire group blocked on gate B-8.** No lesson product has a published price.

| Component | Purpose | Notes |
|---|---|---|
| **PriceTable** | Programme price comparison | Stacks to cards below `md` — **never horizontal-scroll a price table** |
| **PriceCard** | Single-product price | Includes what's covered and what isn't |
| **PriceRange** | "From $X" | Where exact pricing varies |
| **DepositNotice** | Camp deposit terms | ⚠️ **Amount is a hard block** — non-refundable and currently unpublished |
| **WhatsIncluded** | Inclusion checklist | Camp: instruments, snacks, concert |
| **AdditionalCosts** | Instrument purchase guidance | Per-instrument, from extracted data — a genuine differentiator |
| **ScholarshipOffset** | How PEP/UA affects price | ⚠️ coverage amount unknown |
| **PricingFAQ** | Payment, discounts, policies | ⚠️ make-up policy does not exist |

**Rule:** nothing in this group is ever animated (`05-motion-system.md` §16).

---

## 11. CTA

| Component | Purpose | Notes |
|---|---|---|
| **Button** | All button variants | 7 variants × 4 sizes; see design system §7 |
| **ButtonGroup** | Primary + secondary pair | Never two primaries |
| **CTABanner** | Full-width section CTA | One per page maximum |
| **InlineCTA** | Mid-content prompt | |
| **CTACard** | Card-shaped CTA | End of programme pages |
| **BookTrialButton** | Composed primary CTA | **Price is in the label** — "Book a Trial — $25" |
| **ReserveSeatButton** | Camp CTA | ⚠️ deposit in label |
| **CallButton** | Tap-to-call | Mobile-prominent |
| **WhatsAppButton** | WhatsApp | ⚠️ **Claimed twice on the current site with no link.** Ships only when a real number exists. |
| **DirectionsButton** | Maps deep link | ⚠️ correct unit number required |
| **AddToCalendar** | Event → calendar | ICS + Google/Apple |
| **WaitlistCTA** | Off-season capture | Camp evergreen page |
| **WatchShowcaseCTA** | Free, zero-risk entry | ⚠️ needs a real dated event |

**Rules:** every CTA is a real link or control — the 20 unlinked text prompts found in Phase 2 are eliminated · one primary per page · price disclosed before commitment.

---

## 12. Media & content display

| Component | Purpose | Notes |
|---|---|---|
| **Prose** | Rich-text renderer | 68ch max; styles headings, lists, links |
| **Callout** | Highlighted note | `info`, `warn`, `success` |
| **PolicyBlock** | Refund, cancellation, safeguarding | Never animated, never collapsed by default |
| **DataList** | Label/value pairs | Camp details, instrument requirements |
| **FactStrip** | Horizontal key facts | Duration · format · ages · price |
| **Tag** / **Badge** | Category / status | "Ages 7–15", "3 seats left" |
| **AgeBadge** | Age range indicator | Consistent across all templates |
| **Divider** | Section rule | Optional waveform motif |
| **Quote** | Blockquote | |
| **DownloadLink** | Document link | ⚠️ **Zero documents exist today** — parent pack, policies needed |
| **MapEmbed** | Location map | Facade pattern; ⚠️ correct unit |
| **HoursTable** | Opening hours | ⚠️ conflicts with "evening availability" claims |
| **ContactBlock** | Address, phone, email, hours | ⚠️ NAP conflicts must resolve first |

---

## 13. Motion primitives

Wrappers that apply the motion system consistently. No component animates ad hoc.

| Component | Purpose | Notes |
|---|---|---|
| **Reveal** | `fade-rise` on scroll | `once: true`, 80% viewport trigger, content visible without JS |
| **CurtainText** | Masked line-by-line headline reveal | **Max 2 per page** |
| **SpotIn** | Feature-image reveal | **Max 1 per page** |
| **SlideReveal** | Panel-wipe media reveal | Direction follows reading order |
| **StaggerGroup** | Coordinated child stagger | Caps total at 600ms; row-groups beyond 8 |
| **Counter** | Animated numeral | Starts at ~80% of target; true value always in DOM |
| **ParallaxLayer** | Bounded parallax | ≤12% differential; **never on text**; off below `md` |
| **PinnedSequence** | Scroll-pinned storytelling | **Max 2 sitewide**; ≤300vh; escapable |
| **ScrubProgress** | Progress indicator for pinned sections | Required on every pin |
| **MotionProvider** | Global motion context | Reads `prefers-reduced-motion`, manual toggle, device capability; kills ScrollTriggers on route change |
| **ReducedMotionToggle** | Manual user control | Footer; persisted |

---

## 14. Utility

| Component | Purpose | Notes |
|---|---|---|
| **SEOHead** | Meta, OG, canonical, hreflang | Per-page, hand-authored — no auto-generation |
| **StructuredData** | JSON-LD emitter | Validated in CI; ⚠️ blocked on gate S-1 |
| **Analytics** | Event tracking | Records intent source on every conversion |
| **ConsentBanner** | Cookie/consent | Only if tracking requires it |
| **LiveRegion** | Screen-reader announcements | Route changes, async results |
| **VisuallyHidden** | SR-only text | |
| **FocusTrap** | Modal/drawer focus management | |
| **Portal** | Overlay rendering | |
| **ErrorBoundary** | Graceful failure | |
| **NotFound** | 404 content | **Must not load its hero from the staging domain** |
| **LoadingState** | Skeletons | Never for internal navigation |
| **EmptyState** | No-results | Offers top three conversion paths |
| **Toast** | Transient feedback | Pausable, dismissible |
| **Modal** | Dialog | Focus trapped, Escape closes |
| **Tooltip** | Supplementary hint | **Never the only source of essential information** |
| **ShareButton** | Share/copy link | Supports the returning-visitor journey |

---

## 15. Admin-ready components

For the CMS editing experience. The current site's failures — lorem ipsum in production, editorial notes published live, a wrong-instrument hero, expired camps still selling — are **editorial-tooling failures**, and these components exist to prevent their recurrence.

| Component | Purpose | Prevents |
|---|---|---|
| **PublishGuard** | Blocks publish when required fields are empty or contain placeholder patterns | Lorem ipsum reaching production |
| **PlaceholderDetector** | Flags "lorem ipsum", "TODO", "Internal link suggestion", "Internal Links to Add", "New Project", "Image 1" | The two pages currently publishing editorial notes |
| **AltTextValidator** | Requires meaningful alt; rejects filename-as-alt, "img", "..." | The current alt-text failures |
| **ImageSubjectField** | Required subject tag validated against page subject | Guitar photo on the violin page |
| **ExpiryScheduler** | Auto-transitions dated content to archived state | Camp selling seats a month after it ended |
| **RequiredFactsChecker** | Programme cannot publish without duration, ages, format, price | Six programme pages with no price |
| **ClaimRegistry** | Central store of approved claim wordings; flags divergence | Four different Step Up provider wordings |
| **NAPBlock** | Single source for address, phone, email, hours | Three unit numbers, two phones, two emails |
| **LinkChecker** | Flags orphans and broken internal links pre-publish | `/group-music-lessons/`, `/singing-lessons/` orphaned |
| **DuplicateDetector** | Flags substantially duplicate page bodies | `/summercamp/` ≡ `/summer-jam-music-camp-2026/` |
| **TranslationStatus** | Shows EN/ES parity per page | Partial Spanish tree ⚠️ B-6 |
| **ConsentTracker** | Records photo-release status per asset; blocks publishing unconsented images of minors | 18 photos of identifiable minors with no consent record |
| **SchemaPreview** | Live structured-data validation in the editor | |
| **ContentPreview** | Draft preview at real breakpoints | |

---

## 16. Component priority

| Priority | Group | Rationale |
|---|---|---|
| **P0** | Layout, Navigation, Hero, Cards, CTA, Utility | Nothing renders without these |
| **P0** | Forms | The entire conversion mechanism; none exists today |
| **P1** | FAQ, Testimonials, Media, Pricing ⚠️ | Trust and decision-stage content |
| **P1** | Admin-ready | Prevents recurrence of every content defect Phase 2 found |
| **P2** | Timeline, Motion primitives | The signature experience — high value, high effort |
| **P2** | Gallery | Requires real showcase assets |
| **P3** | Video, BeforeAfter, AudioClip, Article | Blocked on production of assets that don't exist |

---

## 17. Component decision gates

| Gate | Question | Blocks |
|---|---|---|
| **C-1** | Deposit amount | `CampReservationForm`, `DepositNotice`, `ReserveSeatButton` |
| **C-2** | Pricing (= B-8) | All of §10, `ProgramCard`, `HeroFactStrip` |
| **C-3** | Teacher publication (= B-7) | `TeacherCard`, `/teachers` templates |
| **C-4** | Review source URLs (= S-4) | `AggregateRating`, `ReviewSourceBadge` |
| **C-5** | Real dated events (= S-6) | `EventCard`, `AddToCalendar`, `WatchShowcaseCTA` |
| **C-6** | Video production commissioned | `VideoPlayer`, `BeforeAfter`, timeline payoff |
| **C-7** | Bilingual (= B-6) | `LanguageToggle`, `TranslationStatus`, all text components |
| **C-8** | WhatsApp number | `WhatsAppButton` |

---

**Next:** `08-content-model.md`
