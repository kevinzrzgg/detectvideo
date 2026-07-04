# detectvideo.vip — Design Source + Frontend Handoff v1

- Project: detectvideo (internal project name only)
- Public domain: `detectvideo.vip` (owner purchased; DNS/Cloudflare/production not confirmed)
- Public brand rule: do not use `DetectVideo` / `detectvideo` as product logo, brand wordmark, page brand, or title mark unless owner/legal later confirms.
- Recommended public header mark until owner decides: `[Owner-selected brand]` + descriptive descriptor `AI Video Detector`.
- Target market: US / English
- Stage: 06 design source + frontend handoff
- Status: DONE_WITH_CONDITIONS
- Inputs:
  - `/root/projects/detectvideo/copy.md`
  - `/root/projects/detectvideo/prd.md`
  - `/root/projects/detectvideo/route-contract.md`
  - `/root/projects/detectvideo/compliance.md`
  - `/root/projects/detectvideo/pricing.md`
- Output: `/root/projects/detectvideo/design.md`

## 0. Non-negotiable Design Guardrails

1. Brand-neutral: the visible logo must not say `DetectVideo` or `detectvideo`. Use `[Owner-selected brand]` in templates, or a purely descriptive text mark such as `AI Video Detector` until the owner selects a safe brand.
2. MVP honesty: the first release is Free Preview / sample report / manual checklist / waitlist. The UI must not imply real automated verdict, confidence, evidence, paid checkout, export, API, or guaranteed detection unless backend/provider/compliance later confirm it.
3. Result safety: without `provider_inference`, every report surface must show `Sample report only — this is demo content and not an analysis of your video.`
4. Claim safety: use `preliminary`, `educational`, `signals`, `likelihood`, `may indicate`, `inconclusive`, `limitations`. Do not use `proof`, `guaranteed`, `forensic-grade`, `court-ready`, `law-enforcement grade`, `official`, `best`, `100% accurate`, or `detects every AI video`.
5. Consent visibility: upload/link consent must appear next to the input, not buried below the fold.
6. Limitations visibility: disclaimer and limitations are persistent UI elements near hero, upload flow, report summary, pricing, FAQ, and footer.
7. No real payment affordance: pricing cards may show Free Preview / Early Access / Pro-Agency Coming Soon. Future paid card buttons must be disabled or route to early-access/contact, never `Buy Now`.
8. No platform affiliation: pages involving YouTube/TikTok/Instagram/X must show public-link limitation and unaffiliated status.
9. Accessibility first: the design must work without color-only meaning, support keyboard navigation, and preserve minimum 44px touch targets.

---

## 1. Visual Style Rationale

### Option A — Dark security console

- Feel: dark navy background, neon cyan signals, dense panels, technical scanner UI.
- Pros: fits AI/deepfake detection, trust/safety, evidence/report workflow.
- Cons: can feel scary, hacker-like, or overclaim forensic capability.
- Verdict: use selectively. Keep the dark technical cues but avoid red-alert or police/forensic visual language.

### Option B — Clean media-literacy lab

- Feel: off-white/slate editorial layout, educational checklist, friendly cards, fewer dark surfaces.
- Pros: safer for compliance, approachable for students/creators, less alarmist.
- Cons: weaker perceived tool value; less memorable in SERP-heavy AI detector niche.
- Verdict: good for legal/FAQ/manual checklist pages, but not enough for primary tool hero alone.

### Option C — Evidence dashboard with editorial restraint (chosen)

- Feel: credible security-adjacent dashboard, dark hero, calm slate surfaces, cyan/blue signal accents, amber limitation badges, clear evidence cards, non-alarmist copy.
- Pros: matches PRD: credible, transparent, evidence-style report, YouTube/social workflow. Differentiates from generic purple AI SaaS templates and avoids forensic overclaiming.
- Cons: needs careful wording and hierarchy so users do not mistake sample states for real analysis.
- Chosen direction: `Evidence dashboard, not verdict machine`.

### Visual concept statement

A calm evidence dashboard for suspicious social videos: users see upload/link intake, a transparent sample/manual report structure, visible limitations, and next steps. The UI should feel credible and careful, not magical, forensic, police-like, or fear-based.

---

## 2. Design Tokens

Use these as the initial CSS variable contract. Frontend may map to Tailwind tokens or CSS custom properties, but names and semantic roles should remain readable.

### 2.1 Color tokens

```css
:root {
  --color-bg-page: #07111f;
  --color-bg-hero: #081827;
  --color-bg-surface: #0d1d2e;
  --color-bg-surface-2: #12263a;
  --color-bg-elevated: #f7fafc;
  --color-bg-subtle: #eef4f8;

  --color-text-primary-dark: #f5f9fc;
  --color-text-secondary-dark: #b8c7d6;
  --color-text-muted-dark: #86a0b5;
  --color-text-primary-light: #0b1725;
  --color-text-secondary-light: #425466;
  --color-text-muted-light: #66788a;

  --color-accent-cyan: #26d9d0;
  --color-accent-blue: #2f80ed;
  --color-accent-indigo: #5967ff;
  --color-accent-amber: #f5b84b;
  --color-accent-green: #43d17a;
  --color-accent-red: #f45b69;

  --color-border-dark: rgba(186, 212, 234, 0.18);
  --color-border-light: #d8e3ec;
  --color-focus: #7dd3fc;

  --color-state-info-bg: #102a43;
  --color-state-info-text: #bfe7ff;
  --color-state-warning-bg: #332509;
  --color-state-warning-text: #ffe0a3;
  --color-state-success-bg: #0d2d20;
  --color-state-success-text: #baf7cf;
  --color-state-danger-bg: #35151c;
  --color-state-danger-text: #ffc7cf;
}
```

Color usage:
- Dark navy is the page/hero identity.
- Cyan indicates input readiness, links, focus, and neutral signal markers.
- Amber indicates limitations, consent, sample/manual mode, pending provider, and caution.
- Red is only for errors/prohibited use, not for ordinary suspicious result labels.
- Green is only for successful form submission or allowed upload validation, not `real/authentic` claims.

### 2.2 Typography tokens

Primary fonts should use system-first stack to avoid loading risk:

```css
--font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace;
```

Do not lean on generic purple/Inter-only SaaS styling. Use font weight, spacing, and evidence-card structure to create identity.

Type scale:

| Token | Desktop | Mobile | Use |
|---|---:|---:|---|
| `--text-hero` | 64px / 1.02 | 42px / 1.06 | home H1 only |
| `--text-h1` | 52px / 1.05 | 36px / 1.08 | SEO page H1 |
| `--text-h2` | 36px / 1.12 | 28px / 1.16 | section headings |
| `--text-h3` | 22px / 1.25 | 20px / 1.3 | cards/subsections |
| `--text-body` | 18px / 1.65 | 16px / 1.6 | main copy |
| `--text-small` | 14px / 1.5 | 14px / 1.5 | helper/disclaimer |
| `--text-xs` | 12px / 1.45 | 12px / 1.45 | badges/metadata |

### 2.3 Spacing tokens

Use 4px base grid.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

Layout widths:

```css
--container-main: 1180px;
--container-narrow: 760px;
--container-wide: 1320px;
--gutter-desktop: 32px;
--gutter-tablet: 24px;
--gutter-mobile: 18px;
```

### 2.4 Radius, shadows, borders

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 18px;
--radius-xl: 28px;
--radius-pill: 999px;

--shadow-soft: 0 16px 60px rgba(0, 0, 0, 0.20);
--shadow-panel: 0 24px 80px rgba(0, 0, 0, 0.32);
--shadow-focus: 0 0 0 3px rgba(125, 211, 252, 0.38);
```

### 2.5 Breakpoints

```css
--bp-sm: 480px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
```

---

## 3. Global Layout System

### 3.1 Page shell

- Header: sticky on desktop and mobile; translucent dark surface over hero; light version on legal pages if needed.
- Header height: 72px desktop, 64px mobile.
- Header content:
  - Left: neutral logo chip + `[Owner-selected brand]` or `AI Video Detector` descriptor.
  - Nav links: AI Video Detector, YouTube Detector, Deepfake Detector, Sample Report, Contact.
  - Right CTA: `Start Free Check`.
- Mobile header:
  - Left mark, right hamburger, primary CTA may appear as compact `Start` button.
  - Full-screen menu or slide-down panel with nav and footer legal links.

### 3.2 Footer

Every page footer must include:
- Neutral brand/descriptor.
- Footer disclaimer: `Results are preliminary educational signals, not forensic, legal, or moderation proof. This site is independently operated and is not affiliated with similarly named AI video detector sites or any video platform.`
- Links: Privacy, Terms, Contact.
- Cookie link only if analytics/cookies beyond strictly necessary are used.
- Refund link only if paid checkout launches.

### 3.3 Section rhythm

- Dark hero + tool module.
- Alternating light/elevated sections for long educational copy.
- Evidence/report areas use cards on light background for readability.
- Limitation/caution strips repeat at conversion points.

---

## 4. Core Components

### 4.1 Brand mark placeholder

Component: `NeutralBrandMark`

- Shape: rounded square icon with layered frame markers, not a play button identical to YouTube.
- Icon concept: 3 horizontal frame slices with a small cyan signal dot and amber caution tick.
- Text: `[Owner-selected brand]` until brand confirmed. If placeholder is undesirable in UI, use `AI Video Detector` as descriptive mark.
- Do not render `DetectVideo`.

### 4.2 Tool intake card

Component: `VideoCheckIntake`

Structure:
1. Segmented tabs:
   - `Upload a video clip`
   - `Paste a public video link`
2. Upload tab:
   - Drag/drop panel.
   - Supported copy: `MP4, MOV, or WebM support depends on launch limits.`
   - Placeholder limit chip: `Launch limits pending`.
3. Link tab:
   - URL input placeholder: `Paste a public YouTube, TikTok, Instagram, X, or social video link`.
   - Helper: `Public-link checks depend on platform availability. We do not bypass login, paywall, DRM, private-account, or platform restrictions.`
4. Consent checkbox:
   - unchecked by default.
   - copy: `I have the right to upload or analyze this video/link and understand the result is a preliminary signal, not legal or forensic proof.`
5. Primary action:
   - `Start Free Check`.
   - Disabled until consent + upload or valid-looking URL present.
6. Secondary action:
   - `View Sample Report`.
7. Sample/manual mode notice:
   - amber inline banner: `Current preview may show sample/manual checklist mode until automated detection is validated.`

States:
- Empty: helper text and disabled CTA.
- Upload selected: file row, remove button, consent still required.
- URL pasted: validate scheme; reject obvious private/local URLs.
- Consent missing: inline warning under checkbox.
- Validating: spinner and `Checking input...`.
- Sample/manual fallback: route to sample/manual report state with clear label.
- Unsupported URL: show limitation, upload fallback, sample report CTA.
- File too large/unsupported: show current launch limit is pending; no fake processing.

### 4.3 Disclaimer strip

Component: `LimitationStrip`

- Visual: amber icon, short bold label, 1 sentence body.
- Example: `Educational signal, not forensic proof.`
- Placement:
  - Hero trust line.
  - Below tool intake.
  - Above report summary.
  - Pricing section.
  - Footer.

### 4.4 Evidence card

Component: `EvidenceSignalCard`

Fields:
- Icon category.
- Title.
- Description.
- Status chip optional: `Sample`, `Checked`, `Limitation`, `Needs review`, `Pending provider`.
- Severity color must not be the only cue; include text label.

Evidence categories:
- Visual artifacts.
- Temporal consistency.
- Face and lip-sync signals.
- Audio and voice mismatch.
- Metadata and compression caveats.
- Link-fetch limitations.

### 4.5 Report summary module

Component: `ReportPreview`

Allowed in MVP:
- Show `Mode: Sample / manual checklist`.
- Show demo labels only.
- If showing likelihood labels, prepend `Example label:` or keep inside sample report.
- Never show a user-specific real verdict without provider inference.

Layout:
- Header row with `Sample report only` badge.
- Left summary panel: mode, demo likelihood label, main limitation.
- Right evidence grid: 2x3 desktop, 1 column mobile.
- Bottom next steps: compare source, look for context, do not use one tool as proof.

### 4.6 Pricing cards

Component: `PricingPreviewCards`

Cards:
1. Free Preview — available for MVP.
2. Early Access — waitlist.
3. Pro / Agency — coming soon / planned.

Visual rules:
- Free card may look active.
- Early Access card may have active waitlist CTA.
- Pro/Agency card is visually muted with `Coming soon`; button routes to `Join Early Access`, not checkout.
- No price except `$0` for Free Preview and Early Access; Pro/Agency says `Final pricing pending`.
- Every card includes limitations.

### 4.7 Form controls

- Minimum touch target: 44px.
- Focus ring: visible cyan outline using `--shadow-focus`.
- Inputs have labels; placeholder is not the only label.
- Error text uses icon + text + `aria-describedby`.
- Consent checkbox must be keyboard reachable and announced.

### 4.8 Badges and chips

Badge styles:
- `Free preview` — cyan outline.
- `Sample/manual mode` — amber fill/outline.
- `No forensic proof` — slate/amber.
- `Provider pending` — amber.
- `No payment` — slate.
- `No platform affiliation` — slate.

---

## 5. Site IA and Route Design

### 5.1 Global nav

- AI Video Detector → `/ai-video-detector/`
- YouTube Detector → `/youtube-ai-video-detector/`
- Deepfake Detector → `/deepfake-video-detector/`
- Sample Report → `/sample-report/`
- Contact → `/contact/`

### 5.2 Footer nav

- Privacy → `/privacy/`
- Terms → `/terms/`
- Contact → `/contact/`
- Cookie Policy only if used.
- Refund Policy only if paid checkout launches.

### 5.3 Page templates

Use 4 repeatable templates:
1. Home/tool template: `/`.
2. SEO tool landing template: `/ai-video-detector/`, `/youtube-ai-video-detector/`, `/deepfake-video-detector/`, `/ai-generated-video-detector/`, `/check-video-ai-or-not/`.
3. Educational checklist/report template: `/video-authenticity-checker/`, `/sample-report/`.
4. Legal/support template: `/privacy/`, `/terms/`, `/contact/`.

---

## 6. Page Wireframes

### 6.1 `/` Home / Primary Tool Entry

Desktop wireframe:

```text
[Sticky Header: Brand | AI Video Detector | YouTube | Deepfake | Sample Report | Contact | Start Free Check]

[Hero dark split layout]
LEFT
  Eyebrow: AI video screening for public links and uploaded clips
  H1: AI Video Detector for YouTube & Social Videos
  Subhead
  Trust line: Free preview · No signup for sample checks · Educational signal, not forensic proof
  CTAs: Start Free Check / View Sample Report / Join Early Access
RIGHT
  VideoCheckIntake card
  Amber sample/manual mode notice

[Problem section]
  H2 + intro
  3 cards: AI-generated clips / Deepfake or face-swap signals / Social compression caveats

[How it works]
  3 horizontal steps desktop, vertical mobile

[Evidence report preview]
  ReportPreview component with 6 evidence cards

[Use cases]
  4 cards: Creators/journalists, Educators/students, Trust & safety, Everyday viewers

[Limitations section]
  Large visible disclaimer + bullets

[Privacy teaser]
  Short note + Read Privacy Policy

[Pricing preview]
  Free Preview / Early Access / Pro-Agency Coming Soon

[FAQ]
  Accordion or static list matching copy.md

[Final CTA]
  Start Free Check / View Sample Report / Join Early Access

[Footer]
```

Mobile behavior:
- Hero becomes single column: H1 → subhead → trust line → intake card → CTAs.
- Keep upload/link tabs sticky within card while interacting.
- Evidence cards stack 1 column.
- FAQ accordions have large tap targets.

### 6.2 `/ai-video-detector/`

- Similar hero but H1: `AI Video Detector Online`.
- Above-fold must include tool block, consent, disclaimer.
- Add sections:
  - What an AI video detector can check.
  - Why the report includes limitations.
  - Free preview first, real detection only when validated.
  - FAQ.
  - Internal links to YouTube / deepfake / authenticity pages.

### 6.3 `/youtube-ai-video-detector/`

- Hero prioritizes link tab by default.
- H1: `YouTube AI Video Detector`.
- Trust line: `Public-link checks can fail · No platform affiliation · Educational signal only`.
- Required block near hero: `Public YouTube link checks have limits`.
- HowTo steps as visible cards so HowTo schema has matching content.
- Upload fallback CTA is visible.
- No YouTube logo unless using permitted text-only reference; prefer neutral link icon.

### 6.4 `/deepfake-video-detector/`

- H1: `Deepfake Video Detector Online`.
- Visual emphasis: face/lip-sync/voice/motion cards, but avoid creepy faces, biometric grids, police visuals, or identity-verification cues.
- Required caution block: `A clean result does not prove authenticity`.
- Include prohibited-use/Terms link near FAQ or limitation block.

### 6.5 `/ai-generated-video-detector/`

- H1: `AI Generated Video Detector`.
- Generator-neutral visuals: abstract frames, motion trails, artifacts.
- Section: `Generator-specific accuracy is not promised` must be visible.
- Avoid Sora/Veo/Kling/Runway logos or model-specific claims.

### 6.6 `/video-authenticity-checker/`

- More editorial/light template.
- H1: `Video Authenticity Checker`.
- Manual checklist is central: source, motion, faces/hands, audio/lips, context, limitations.
- CTA: `Check Video Authenticity` and `Use the Manual Checklist`.
- HowTo schema only if visible checklist is implemented.

### 6.7 `/check-video-ai-or-not/`

- Simple language, lower technical density.
- H1: `Check if a Video Is AI or Not`.
- Hero includes plain-language disclaimer: `This is a first-pass check. It can be wrong, and it cannot prove a video is real or fake.`
- CTA: `Start a Video Check`.

### 6.8 `/sample-report/`

- H1: `Sample AI Video Detection Report`.
- Top label: `Sample report only — this is demo content and not an analysis of your video.`
- Report preview should be richer than home preview:
  - Mode.
  - Example likelihood label.
  - Main limitation.
  - Evidence highlights.
  - What to do next.
  - FAQ.
- Do not include fake user video name, fake scan ID that looks real, or precise confidence unless explicitly labeled as example.

### 6.9 `/privacy/`, `/terms/`, `/contact/`

Design:
- Light editorial template for readability.
- Header can remain neutral/dark but body should be white/off-white.
- Max text width: 760px.
- Left/right table of contents on desktop if content is long.
- Footer disclaimer still present.

Contact form reasons:
- Support question.
- Deletion request.
- Abuse or safety report.
- Rights or copyright concern.
- Privacy request.
- Early access / team workflow.

Contact caution copy must be near form:
`For deletion, abuse, or rights requests, include only the minimum information needed to identify the scan or issue. Do not send passwords, platform cookies, private account credentials, or sensitive legal documents through this form.`

### 6.10 `/scan/[scan_id]` Dynamic Result Shell

Robots: `noindex,nofollow`; excluded from sitemap.

States:
1. Created.
2. Queued.
3. Processing.
4. Sample/manual mode.
5. Completed with provider inference (future only).
6. Failed.
7. Unsupported URL.
8. File too large / unsupported.

Design rules:
- Always show top limitation banner.
- Sample/manual mode must be visually distinct amber.
- Provider inference result must separate: summary, evidence, limitations, next steps.
- Do not show storage object keys, signed URLs, platform cookies, or raw provider response.
- For `No strong AI signals detected`, never use green `Real` styling; use neutral/blue and copy `does not prove authenticity`.

---

## 7. Interaction States

### 7.1 Intake states

| State | Visual | Copy/behavior |
|---|---|---|
| Empty | neutral card | `Upload a short clip or paste a public URL to begin...` |
| Upload selected | file row + remove | shows filename only if safe; do not expose full local path |
| URL pasted | input active | validate scheme and show link limitation helper |
| Consent missing | amber inline warning | CTA disabled or click reveals `Please confirm rights and limitations.` |
| Validating | spinner/skeleton | `Checking input...` |
| Unsupported URL | amber error panel | use copy.md unsupported URL text and upload fallback |
| File unsupported | amber/red error panel | explain current launch limits pending; no fake scan |
| Sample/manual fallback | amber banner | route to sample/manual report, not real result |
| Early access submitted | success panel | `Thanks — we’ll use your request to prioritize real detection access.` |

### 7.2 Report states

| State | Visual | Important copy |
|---|---|---|
| Created | timeline first dot | `Your video check was created and is waiting to be queued.` |
| Queued | timeline second dot | `Processing time may vary.` |
| Processing | progress skeleton | `We are preparing the report...` |
| Sample/manual | amber badge | `This is sample/manual checklist mode. It is not a real analysis of your video and does not provide a real verdict.` |
| Completed future provider | neutral result layout | `Your preliminary report is ready. Review the evidence and limitations before taking action.` |
| Failed | non-technical error | `We could not complete this video check. No forensic or legal conclusion should be drawn...` |
| Unsupported URL | limitation panel | `We do not bypass login, paywall, DRM...` |

### 7.3 Pricing states

- MVP: Free Preview active; Early Access active; Pro/Agency disabled/coming soon.
- Future provider confirmed: only then may paid cards become active after pricing/compliance/backend updates.
- Checkout disabled until payment provider, refund/tax, and entitlement are confirmed.

---

## 8. Accessibility Requirements

- WCAG target: AA for text contrast.
- Do not rely on red/green alone for result meaning; use label text and icons.
- Keyboard order: header → hero CTAs → tabs → input → consent → CTA → secondary links.
- Tabs must use proper `role="tablist"` or simpler buttons with clear `aria-pressed`.
- Error messages must be connected with `aria-describedby`.
- Focus ring visible on dark and light backgrounds.
- All form controls have visible labels.
- Reduced motion: respect `prefers-reduced-motion`; avoid constant scanning animations.
- Touch targets at least 44x44px.
- FAQ accordion buttons must announce expanded/collapsed state.
- The sample/manual warning should be text-visible, not icon-only.

---

## 9. SEO and Content Fit Rules

- Do not truncate frozen H1s from `copy.md`.
- Meta titles/descriptions come from `copy.md`; design does not rewrite them.
- Above-the-fold on primary tool pages must show:
  - H1 matching route intent.
  - Upload and/or paste-link entry.
  - `Educational signal, not forensic proof.`
  - Consent copy near input.
  - CTA that does not imply paid checkout.
- FAQ visible copy and FAQPage JSON-LD must match.
- HowTo schema only if visible steps are present on page.
- `/scan/[scan_id]` must be noindex and excluded from sitemap.
- Legal footer links must be globally available.

---

## 10. Compliance Placement Map

| Compliance requirement | Placement |
|---|---|
| `Educational signal, not forensic proof.` | Hero trust line, limitation strip, result banner, footer |
| Upload/link rights consent | Inside `VideoCheckIntake`, above CTA |
| Public link limitations | Link tab helper; YouTube page hero; unsupported URL state; FAQ |
| Sample report label | Sample report page top; home preview; scan sample/manual state |
| No platform affiliation | YouTube page trust line; footer disclaimer |
| Brand independence footer | Site footer every page |
| No payment MVP | Pricing section card labels and disabled future paid card |
| Prohibited/high-impact use | Terms page; limitation/FAQ references |
| Retention/provider pending | Privacy teaser; Privacy page; upload helper if real uploads are enabled later |

---

## 11. Frontend Component Contract

Suggested component tree:

```text
AppShell
  Header
  MobileNav
  Main
  Footer

Marketing pages
  HeroWithIntake
  VideoCheckIntake
  LimitationStrip
  ProblemCards
  HowItWorksSteps
  EvidenceGrid
  ReportPreview
  UseCaseCards
  PricingPreviewCards
  FaqSection
  FinalCta

SEO pages
  SeoHero
  ToolInlineBlock
  EducationalSection
  InternalLinkCluster
  RouteFaq

Result pages
  ScanStatusTimeline
  ReportSummaryPanel
  EvidenceSignalCard
  LimitationsBanner
  NextStepsPanel

Legal/support
  LegalLayout
  TableOfContents
  ContactForm
```

Data enums to align with route/data contract:

```ts
type ScanMode = 'sample' | 'manual_checklist' | 'provider_inference';
type ScanStatus = 'created' | 'queued' | 'processing' | 'completed' | 'failed' | 'unsupported';
type Verdict = 'likely_ai' | 'suspicious' | 'inconclusive' | 'likely_real' | null;
type EvidenceType =
  | 'visual_artifact'
  | 'temporal_consistency'
  | 'face_lip_sync'
  | 'audio_voice'
  | 'metadata'
  | 'compression_caveat'
  | 'link_fetch_limit';
```

Important UI mapping:
- `mode !== 'provider_inference'` → hide real verdict/confidence or label as sample/manual only.
- `verdict === 'likely_real'` should render as `No strong AI signals detected`, not `Real`.
- `confidence` may be shown only if backend validates meaning; otherwise use label-only or omit.

---

## 12. Asset and Icon Direction

Use simple vector/SVG assets created in the codebase; no external stock imagery required for MVP.

Icon set concepts:
- Frame strip.
- Signal waveform.
- Link chain.
- Upload cloud.
- Warning triangle.
- Evidence document.
- Timeline dots.
- Eye/face outline only if non-biometric and non-creepy.

Avoid:
- Police badges, court gavels, fingerprint/face-ID biometrics, scary synthetic faces, platform logos, official-looking seals, fake screenshots of competitor tools.

Optional background motif:
- Subtle frame-grid lines and tiny cyan/amber markers at low opacity.
- No aggressive matrix/hacker animation.

---

## 13. Desktop / Mobile Behavior Summary

Desktop:
- Header max width 1180px.
- Hero split 52/48 or 55/45.
- Tool card max width 520px.
- Evidence grid 3 columns or 2 columns depending section.
- Pricing 3 columns.
- Legal pages use centered 760px content with optional sticky TOC.

Tablet:
- Hero remains 2 columns only if width >= 900px; otherwise stack.
- Pricing can be 2 columns + full width third card.

Mobile:
- Single column throughout.
- Sticky header compact.
- Tool tabs full width.
- Inputs and CTAs full width.
- Evidence cards 1 column.
- Pricing cards 1 column.
- Avoid horizontal scroll in tables; convert route/pricing details to stacked cards where possible.

---

## 14. Page-by-Page Acceptance Checklist

### Global

- [ ] Public mark does not use `DetectVideo` / `detectvideo`.
- [ ] Footer has Privacy, Terms, Contact.
- [ ] Footer has independence and educational-signal disclaimer.
- [ ] Header nav links match route contract.
- [ ] No `Buy Now`, `Upgrade Now`, `Unlimited`, `Forensic`, `Proof`, `100%` claims.

### Tool pages

- [ ] H1 from `copy.md` is visible above fold.
- [ ] Upload/link intake visible above fold.
- [ ] Consent appears before scan creation.
- [ ] Sample/manual mode fallback is visible if no provider inference.
- [ ] Public-link limitations visible for URL workflows.
- [ ] FAQ includes not-forensic answer.

### Sample/result pages

- [ ] Sample report has top label.
- [ ] Evidence and limitations are separate sections.
- [ ] No fake user-specific scan result in sample mode.
- [ ] Scan pages noindex/nofollow and excluded from sitemap.

### Pricing

- [ ] Free Preview and Early Access are $0.
- [ ] Pro/Agency says Coming soon / Final pricing pending.
- [ ] No paid checkout affordance.
- [ ] Limitations are visible in every pricing card.

### Accessibility

- [ ] Keyboard flow works.
- [ ] Focus ring visible.
- [ ] Touch targets >= 44px.
- [ ] Contrast AA.
- [ ] Error text not color-only.
- [ ] Reduced motion respected.

---

## 15. Implementation Notes for Frontend

1. Start from a static implementation using the frozen copy and tokens before adding API behavior.
2. Use one data source for page FAQs and JSON-LD to avoid mismatch.
3. Keep `VideoCheckIntake` operational in sample/manual mode even without backend; action may route to `/sample-report/` or a scan shell clearly labeled sample/manual.
4. When backend/data contract lands, wire `POST /api/scans` and `GET /api/scans/[scan_id]` without changing public safety labels.
5. Add robots/sitemap rules from route-contract exactly.
6. Use CSS variables for tokens so future brand changes do not require rewriting components.
7. Do not commit external analytics/session replay to upload/result pages until privacy copy and masking are confirmed.
8. If initializing a repo later, Cloudflare-first preference remains: static Pages for marketing/SEO plus Workers for API/upload/result.

---

## 16. Open Decisions That Do Not Block Frontend Draft

- Final public brand/logo.
- Real detector provider/model and confidence meaning.
- Upload size/duration/MIME limits.
- Raw-media retention and scan metadata retention.
- Contact email/domain mailbox.
- Analytics/cookie posture.
- Payment/refund policy if paid launch happens later.
- Whether `/` and `/ai-video-detector/` remain separate canonical pages or one redirects.

Design response to open decisions:
- Use placeholders and disabled/future states.
- Make safety labels visible.
- Do not block static frontend implementation, but block production upload/payment/provider claims until confirmed.

---

## 17. Downstream Handoff Summary

### Current conclusion

- Status: DONE_WITH_CONDITIONS
- One-line summary: The design source and frontend handoff for detectvideo.vip is complete as a brand-neutral, evidence-dashboard style AI Video Detector / Deepfake Video Checker, with tokens, IA, wireframes, key component specs, desktop/mobile behavior, states, accessibility, compliance placement, pricing/free-preview treatment, and frontend implementation checklist.

### Deliverable

- `/root/projects/detectvideo/design.md`

### Key decisions

- Chosen visual direction: `Evidence dashboard, not verdict machine`.
- Public brand remains placeholder/neutral; do not use `DetectVideo` / `detectvideo` as logo or product mark.
- MVP UI should emphasize Free Preview, sample/manual checklist, and Early Access; no real paid checkout.
- Without real provider inference, the report UI must show sample/manual mode and must not claim real verdict/confidence/evidence.
- Use dark navy/slate surfaces, cyan signal accents, amber limitation badges, readable evidence cards, and light editorial sections for legal/education pages.

### Must-read for frontend/backend

- `/root/projects/detectvideo/copy.md`
- `/root/projects/detectvideo/prd.md`
- `/root/projects/detectvideo/route-contract.md`
- `/root/projects/detectvideo/compliance.md`
- `/root/projects/detectvideo/pricing.md`
- `/root/projects/detectvideo/design.md`

### Quality gate self-check

- [x] Visual direction included.
- [x] Color/font/spacing/radius/shadow/breakpoint tokens included.
- [x] Page IA and route-level design included.
- [x] Section wireframes included.
- [x] Key components specified.
- [x] Desktop/mobile behavior included.
- [x] Interaction/result/pricing states included.
- [x] Accessibility requirements included.
- [x] Compliance statement placement included.
- [x] Pricing/free preview expression included.
- [x] Frontend handoff checklist included.

[DONE]
