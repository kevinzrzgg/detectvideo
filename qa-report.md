# QA Acceptance Report — detectvideo.vip / detectvideo

- Task: `t_f65b153b` — 09 QA acceptance recovery v2 after group-report fix
- Stage: 09 QA acceptance recovery v2
- Project: detectvideo.vip / detectvideo
- Target market: US / English
- QA date: 2026-07-04
- Verdict: QA GO
- Output path: `/root/projects/detectvideo/qa-report.md`

## 1. Executive conclusion

QA GO for the current static sample/manual MVP frontend artifact in `/root/projects/detectvideo/dist/`.

No P0 or P1 QA blockers were found across the 11 expected static routes, navigation/footer links, SEO/legal page presence, consent-gated sample/manual flow, invalid URL error handling, local HTTP behavior, or desktop responsive smoke checks. The artifact is acceptable to move to launch ops / owner review with the launch-scope caveats below.

This QA GO does not approve production deployment, real upload processing, public URL fetching, provider inference, analytics/session replay, payment, or final brand/contact choices. Those remain outside the current static artifact and need owner/ops confirmation before public launch.

## 2. Inputs reviewed

- `/root/projects/detectvideo/dist/`
- `/root/projects/detectvideo/frontend-report.md`
- `/root/projects/detectvideo/seo-check.md`
- `/root/projects/detectvideo/compliance-recheck.md`
- `/root/projects/detectvideo/prd.md`
- `/root/projects/detectvideo/copy.md`
- Supporting source inspected:
  - `/root/projects/detectvideo/package.json`
  - `/root/projects/detectvideo/src/site-data.mjs`
  - `/root/projects/detectvideo/src/app.js`
  - `/root/projects/detectvideo/src/styles.css`
  - `/root/projects/detectvideo/scripts/check.mjs`

## 3. Upstream gate status

- PM acceptance parent: PASS_WITH_CONDITIONS; current static frontend can proceed to SEO/Compliance/QA review.
- SEO recheck parent: SEO GO; no P0/P1 SEO blockers found in 11 static routes.
- Compliance recheck parent: Compliance GO for static sample/manual MVP frontend; not approval for production real upload/fetch/provider/payment/analytics.

## 4. Route acceptance matrix

All expected indexable static routes are present and return HTTP 200 from local preview.

| Route | Expected H1 | Page exists | Key content / intent | Nav/footer links | Schema parses | QA result |
|---|---|---:|---|---:|---:|---|
| `/` | AI Video Detector for YouTube & Social Videos | PASS | Primary tool entry, sample/manual mode, disclaimers, CTA | PASS | PASS | PASS |
| `/ai-video-detector/` | AI Video Detector Online | PASS | Main SEO tool preview and upload/link workflow | PASS | PASS | PASS |
| `/youtube-ai-video-detector/` | YouTube AI Video Detector | PASS | Public YouTube link caveats and upload fallback | PASS | PASS | PASS |
| `/deepfake-video-detector/` | Deepfake Video Detector Online | PASS | Face/lip-sync/audio/motion signal framing | PASS | PASS | PASS |
| `/ai-generated-video-detector/` | AI Generated Video Detector | PASS | AI-generated video screening copy and limitations | PASS | PASS | PASS |
| `/video-authenticity-checker/` | Video Authenticity Checker | PASS | Authenticity checklist and escalation framing | PASS | PASS | PASS |
| `/check-video-ai-or-not/` | Check if a Video Is AI or Not | PASS | Simple language route for long-tail query | PASS | PASS | PASS |
| `/sample-report/` | Sample AI Video Detection Report | PASS | Demo report only, evidence categories, limitations | PASS | PASS | PASS |
| `/privacy/` | Privacy Policy | PASS | Preview privacy, retention/deletion placeholders | PASS | PASS | PASS |
| `/terms/` | Terms of Use | PASS | Educational-only terms, prohibited uses | PASS | PASS | PASS |
| `/contact/` | Contact | PASS | Early access/contact placeholder | PASS | PASS | PASS |

## 5. User-task QA

### 5.1 Five-second test / first screen

PASS.

Evidence:
- Homepage title loaded as `AI Video Detector for YouTube & Social Videos | AI Video Detector`.
- H1 and hero copy clearly explain upload/public-link AI/deepfake screening.
- Visible trust/disclaimer text includes `Educational signal, not forensic proof.`
- Visible sample/manual label says `Sample report only — this is demo content and not an analysis of your video.`

### 5.2 Navigation and links

PASS.

Evidence:
- Header navigation exposes AI Video Detector, YouTube Detector, Deepfake Detector, Sample Report, Contact, and Start Free Check.
- Footer exposes Privacy, Terms, Contact, Sitemap, and Robots.
- Static route/link audit found no broken internal hrefs in the expected route set.
- `/sitemap.xml` and `/robots.txt` return HTTP 200.
- Unknown paths, `/favicon.ico`, and `/sitemap_index.xml` return 404 rather than homepage 200.

### 5.3 Form / consent / manual sample flow

PASS.

Evidence:
- Without consent, clicking Start Free Preview displays a user-visible alert:
  - `CONSENT_REQUIRED: confirm that you have the right to upload or analyze this video/link before starting the preview.`
- URL tab exposes a public video URL textbox.
- With consent and an invalid non-HTTPS URL, the app exposes:
  - `INVALID_URL: enter a public https:// video link, or use the upload preview instead.`
- With consent and a valid `https://` URL, the app shows sample/manual preview status and redirects to:
  - `/sample-report/?mode=manual_checklist`
- The destination page displays `Sample AI Video Detection Report` and `Sample report only — this is demo content and not an analysis of your video.`

### 5.4 Error states

PASS for the current static MVP scope.

Covered:
- Missing consent: PASS (`CONSENT_REQUIRED`).
- Invalid URL scheme: PASS (`INVALID_URL`).
- Unknown static path: PASS (404).
- Future `/scan/` and `/api/` index safety: PASS via robots and `_headers` noindex rules.

Not in current scope:
- Real upload validation, unsupported file type, file too large, provider failure, payment, account, and deletion flows are not implemented in this static sample/manual artifact and therefore were not QA-approved.

### 5.5 Desktop and mobile/basic responsive usability

PASS for static smoke level.

Evidence:
- Browser desktop smoke at 1280px reported `hasHorizontalOverflow=false`.
- Console/JS error buffers were empty during smoke flow.
- CSS includes mobile breakpoints:
  - `@media(max-width:880px)` hides desktop nav, enables hamburger/mobile menu, and collapses hero/grid/pricing/evidence/footer grids to one column.
  - `@media(max-width:520px)` makes CTA/tool buttons full width, hides long brand text, reduces horizontal padding, and stacks tabs to one column.
- Touch targets use 44px minimum button/link sizing in navigation/form controls.

## 6. Verification commands and evidence

Commands run from `/root/projects/detectvideo`:

```text
npm run build && npm run check

> ai-video-detector-static-site@0.1.0 build
> node scripts/build.mjs

Built 11 pages to /root/projects/detectvideo/dist

> ai-video-detector-static-site@0.1.0 check
> node scripts/check.mjs

CHECK_PASS html=12 files=17
```

Local static preview:

```text
python3 -m http.server 4173 --directory dist
```

Custom route audit:

```text
CORRECTED_ROUTE_AUDIT route_count=11 issues=[]
```

HTTP probe:

```text
/ 200 text/html
/ai-video-detector/ 200 text/html
/youtube-ai-video-detector/ 200 text/html
/deepfake-video-detector/ 200 text/html
/ai-generated-video-detector/ 200 text/html
/video-authenticity-checker/ 200 text/html
/check-video-ai-or-not/ 200 text/html
/sample-report/ 200 text/html
/privacy/ 200 text/html
/terms/ 200 text/html
/contact/ 200 text/html
/sitemap.xml 200 application/xml
/robots.txt 200 text/plain
/nonexistent-qa-test-xyz 404 text/html;charset=utf-8
/favicon.ico 404 text/html;charset=utf-8
/sitemap_index.xml 404 text/html;charset=utf-8
```

Browser smoke evidence:

```text
Homepage loaded: AI Video Detector for YouTube & Social Videos | AI Video Detector
Missing consent: CONSENT_REQUIRED alert visible
Invalid non-HTTPS URL: INVALID_URL alert visible
Valid https URL with consent: redirected to /sample-report/?mode=manual_checklist
Sample report loaded: Sample AI Video Detection Report
Console messages: []
JavaScript errors: []
Desktop overflow: hasHorizontalOverflow=false at 1280px viewport
```

Git status check:

```text
fatal: not a git repository (or any of the parent directories): .git
```

This is a launch-ops/version-control risk, but not a blocker for QA acceptance of the current local static artifact.

## 7. P0 / P1 / P2 findings

### P0

None found in the current static QA artifact.

### P1

None found in the current static QA artifact.

### P2 / launch-scope risks

1. No Git repository was available in this environment, so QA cannot tie the artifact to a commit SHA.
   - Suggested fix: owner/ops initializes or confirms the GitHub repository before Cloudflare deployment.
2. Production Cloudflare Pages, DNS, canonical domain, analytics, GSC/Bing, and contact mailbox remain unverified.
   - Suggested fix: launch ops should confirm these before public production launch.
3. Real upload, URL fetching, provider inference, retention/deletion jobs, payments, and analytics are not implemented or approved in this static artifact.
   - Suggested fix: keep all production copy and UI in sample/manual mode until backend/data/compliance gates approve real processing.
4. `https://[OWNER_SELECTED_DOMAIN]` remains a placeholder in generated URLs.
   - Suggested fix: replace with the final owner-confirmed production domain before live sitemap/canonical submission.
5. Final public brand/logo still needs owner/legal confirmation.
   - Suggested fix: continue using descriptive `AI Video Detector` copy unless owner/legal approves a final brand.

## 8. Final decision

QA GO.

The static sample/manual MVP artifact passes QA acceptance for page existence, key content, navigation, consent/manual sample flow, error states, local verification, and desktop/mobile basic usability review. It may proceed to launch ops / owner review, but production release must not claim real AI video detection until the remaining backend, provider, domain, legal, and ops gates are completed.

[DONE]
