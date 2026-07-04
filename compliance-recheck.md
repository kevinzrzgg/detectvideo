# detectvideo.vip — Compliance Frontend Recheck v3

- Task: `t_04882772`
- Stage: 04 compliance frontend recheck recovery v3
- Project: detectvideo.vip / detectvideo
- Target market: US / English
- Reviewed at: 2026-07-04T00:31:57Z
- Inputs reviewed:
  - `/root/projects/detectvideo/dist/`
  - `/root/projects/detectvideo/frontend-report.md`
  - `/root/projects/detectvideo/compliance.md`
  - `/root/projects/detectvideo/prd.md`
  - Supporting source inspected: `/root/projects/detectvideo/src/site-data.mjs`, `/root/projects/detectvideo/src/app.js`, `/root/projects/detectvideo/scripts/check.mjs`, `/root/projects/detectvideo/scripts/build.mjs`

## Final verdict

Compliance GO for static sample/manual MVP frontend review.

The current frontend artifact clearly presents the site as a sample/manual educational preview, does not enable real media processing, does not claim real detection, and includes visible disclaimers, consent, legal routes, and noindex protections for future scan/API paths.

This GO is limited to the current static artifact. It is not approval for production real upload, URL fetching, provider inference, analytics/session replay, payment, or public launch without owner confirmation and the remaining launch gates below.

## Scope and method

I reviewed the generated static pages, source content, legal placeholders, interaction code, robots/header controls, and prior compliance/PRD requirements. I also rebuilt and checked the artifact, ran a custom forbidden-claim audit, and used a local browser smoke test for consent/sample flow.

## 1. Misleading real detection / confidence / evidence claims

Status: PASS

Findings:
- The UI repeatedly labels the product as `Free preview`, `sample/manual mode`, and `Educational signal, not forensic proof`.
- Sample report copy says: `Sample report only — this is demo content and not an analysis of your video.`
- The main evidence section says sample/manual mode never presents a real user-specific verdict, confidence score, or evidence, and provider inference remains disabled until model, retention, deletion, and compliance review are confirmed.
- Source content uses cautious terms such as `preliminary`, `signals`, `may`, `limitations`, `inconclusive`, and `demo only`.
- Custom forbidden-claim audit found no high-risk phrases from the compliance prohibited list, including:
  - `100% accurate`
  - `guaranteed`
  - `definitive proof`
  - `forensic-grade`
  - `court-ready`
  - `law enforcement grade`
  - `official detector`
  - `most accurate`
  - `free forever`
  - `no data stored`
  - public brand token `DetectVideo`

Notes:
- The phrase `AI Video Detector` is used descriptively as the site label. This matches prior mitigation because the blocked public brand was `DetectVideo` / `detectvideo`, not the generic descriptive phrase.
- The word `confidence` appears only in the safety framing that sample/manual mode never presents a real confidence score.

## 2. Sample/manual MVP gating clarity

Status: PASS

Findings:
- Every tool entry is gated by an explicit consent checkbox:
  - `I confirm that I have the right to upload or analyze this video or link, and I understand the result is a preliminary signal, not legal or forensic proof.`
- The submission handler does not run any real scan. After valid consent, it displays preview-only status and redirects to `/sample-report/?mode=manual_checklist`.
- Browser smoke verified:
  - Without consent, clicking Start Free Preview shows `CONSENT_REQUIRED`.
  - With consent, the flow redirects to the sample report page.
  - Console JavaScript errors: 0.
- URL mode code requires `https://` and exposes `INVALID_URL` for invalid public URL input.

Conclusion:
- The current static frontend is clear enough that users should not reasonably infer a real automated detector is running.

## 3. Privacy / Terms / Contact placeholders

Status: PASS_WITH_LAUNCH_CONDITIONS

Findings:
- `/privacy/`, `/terms/`, and `/contact/` exist in `dist/` and are linked from the footer.
- Legal pages are explicit that this is a preview and owner confirmation is required before production media processing.
- Privacy page covers upload rights, preview/sample mode, retention/deletion to be confirmed, and provider disclosure required before launch.
- Terms page covers educational use only, no forensic/legal proof, prohibited/private uploads, and future paid terms requiring owner confirmation.
- Contact page exists for early access, deletion/privacy questions, unsupported-link reports, and owner-confirmed mailbox pending.

Remaining launch conditions:
- Domain mailbox/contact address must be finalized before public production launch.
- If analytics, cookies, payment, or provider inference are added, Privacy/Terms/Cookie/Refund language must be updated to match actual tools and processors.

## 4. Upload / URL consent, error states, and disclaimers

Status: PASS

Findings:
- Consent is required before any preview result flow.
- Upload copy says real media processing is not enabled and launches only a sample/manual checklist result.
- URL copy discloses public-link limitations and says the site does not bypass login, paywall, DRM, private-account, or platform restrictions.
- Error states are implemented for missing consent and invalid URL.
- Contact form is explicitly local preview only and does not claim production storage/submission.

## 5. Robots, sitemap, and noindex safety

Status: PASS

Findings:
- `/root/projects/detectvideo/dist/robots.txt` disallows `/scan/` and `/api/`.
- `/root/projects/detectvideo/dist/_headers` sets `X-Robots-Tag: noindex, nofollow` for `/scan/*` and `/api/*`.
- Sitemap does not include `/scan/` or `/api/`.
- `npm run check` verified route/link and noindex constraints.

## Verification evidence

Commands run from `/root/projects/detectvideo`:

```text
npm run build
Built 11 pages to /root/projects/detectvideo/dist

npm run check
CHECK_PASS html=12 files=17

CUSTOM_AUDIT_PASS html=12 forbidden_checks=14 required_markers=5
```

Browser smoke:
- Local server: `python3 -m http.server 4173 --directory dist`
- URL: `http://127.0.0.1:4173/`
- Homepage title loaded: `AI Video Detector for YouTube & Social Videos | AI Video Detector`
- Missing-consent flow showed `CONSENT_REQUIRED`.
- Consent flow redirected to `/sample-report/?mode=manual_checklist` and displayed sample report labels.
- Browser console and JS errors: 0.

## Remaining risks / not approved by this gate

P0 launch blockers still outside this static frontend recheck:
- No Git repo/commit/deploy evidence was provided in this task context.
- Cloudflare Pages project, DNS, production canonical domain, and production deployment are not confirmed.
- Real upload/presign, URL fetch, provider inference, payment, analytics, retention deletion jobs, and abuse handling are not enabled or approved.
- Final public brand/logo and production contact mailbox remain owner decisions.

P1 follow-up before public marketing or production launch:
- Replace placeholder domain/base URL once owner confirms canonical production domain.
- Add final domain contact mailbox.
- Add Cookie Policy/notice only if non-essential analytics/session replay/ads are introduced.
- Add Refund/Cancellation terms only if paid credits, subscriptions, API, or report exports are introduced.

## Decision

Compliance GO.

Current static frontend artifact may proceed to PM/SEO/QA review as a safe sample/manual MVP preview. Do not treat this as approval to launch real detection, upload, URL fetching, analytics, payment, or production deployment until the owner and downstream gates confirm the missing operational/legal details.

[DONE]
