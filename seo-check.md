# SEO Recheck — detectvideo.vip / detectvideo

- Task: `t_e43ccf69` — 10 SEO recheck recovery v3 after model sync
- Stage: 10 SEO recheck recovery v3
- Target market: US / English
- Audit date: 2026-07-04
- Inputs audited:
  - `/root/projects/detectvideo/dist/`
  - `/root/projects/detectvideo/frontend-report.md`
  - `/root/projects/detectvideo/copy.md`
  - `/root/projects/detectvideo/prd.md`
  - `/root/projects/detectvideo/route-contract.md`

## Verdict

SEO GO.

The current static frontend artifact is safe to pass to QA from an SEO/MVP-claims perspective. I found no P0/P1 SEO blockers in the 11 indexable static routes, sitemap/robots/_headers setup, canonical strategy, internal linking, schema JSON-LD parsing, or sample/manual MVP gating.

## Route coverage

Expected 11 indexable static routes are present in `dist/` and included in `sitemap.xml`:

| Route | H1 | Canonical | Robots | Structured data | Result |
|---|---|---|---|---|---|
| `/` | AI Video Detector for YouTube & Social Videos | `/` | `index,follow` | WebApplication + FAQPage | PASS |
| `/ai-video-detector/` | AI Video Detector Online | `/ai-video-detector/` | `index,follow` | SoftwareApplication + FAQPage | PASS |
| `/youtube-ai-video-detector/` | YouTube AI Video Detector | `/youtube-ai-video-detector/` | `index,follow` | HowTo + FAQPage | PASS |
| `/deepfake-video-detector/` | Deepfake Video Detector Online | `/deepfake-video-detector/` | `index,follow` | SoftwareApplication + FAQPage | PASS |
| `/ai-generated-video-detector/` | AI Generated Video Detector | `/ai-generated-video-detector/` | `index,follow` | FAQPage | PASS |
| `/video-authenticity-checker/` | Video Authenticity Checker | `/video-authenticity-checker/` | `index,follow` | HowTo + FAQPage | PASS |
| `/check-video-ai-or-not/` | Check if a Video Is AI or Not | `/check-video-ai-or-not/` | `index,follow` | FAQPage | PASS |
| `/sample-report/` | Sample AI Video Detection Report | `/sample-report/` | `index,follow` | Article + FAQPage | PASS |
| `/privacy/` | Privacy Policy | `/privacy/` | `index,follow` | WebPage | PASS |
| `/terms/` | Terms of Use | `/terms/` | `index,follow` | WebPage | PASS |
| `/contact/` | Contact | `/contact/` | `index,follow` | WebPage | PASS |

## Technical SEO checks

PASS:

- All 11 expected route HTML files exist under `dist/`.
- Every route has a unique title, meta description, H1, canonical, and `index,follow` robots meta.
- Canonicals match the route contract and use stable clean route paths.
- Internal links are present across nav/footer/tool/resource blocks and resolve to known static routes/assets.
- JSON-LD blocks parse successfully.
- `dist/sitemap.xml` contains exactly 11 indexable URLs and excludes `/scan/` and `/api/`.
- `dist/robots.txt` allows crawl generally and disallows `/scan/` + `/api/`.
- `dist/_headers` sets `X-Robots-Tag: noindex, nofollow` for `/scan/*` and `/api/*`.
- Static fallback checks via local HTTP preview:
  - known routes: `200 text/html`
  - `/sitemap.xml`: `200 application/xml`
  - `/robots.txt`: `200 text/plain`
  - `/nonexistent-seo-test-12345`: `404`
  - `/favicon.ico`: `404`, not homepage HTML
  - `/sitemap_index.xml`: `404`, not homepage HTML

## MVP gating / false-claim checks

PASS:

- Pages consistently label the experience as sample/manual/demo preview when no real provider inference is configured.
- Tool submission flow routes to `/sample-report/?mode=manual_checklist` instead of claiming real video analysis.
- Consent is required before starting preview; missing consent shows `CONSENT_REQUIRED`.
- URL mode requires `https://`; invalid URLs show `INVALID_URL`.
- Visible copy contains “Educational signal, not forensic proof” and sample/manual disclosures.
- Sample report is explicitly demo content and not analysis of a user-supplied video.
- No forbidden public claims found in built HTML, including:
  - `100% accurate`
  - `guaranteed`
  - `definitive proof`
  - `forensic-grade`
  - `court-ready`
  - `detects every AI video`
  - `certified authenticity`
- Public brand rule is respected: no public `DetectVideo` brand string was found in built route HTML.

## Verification evidence

Commands run from `/root/projects/detectvideo`:

```txt
npm run build
=> Built 11 pages to /root/projects/detectvideo/dist

npm run check
=> CHECK_PASS html=12 files=17
```

Additional audit script result after rebuild:

```txt
route_count=11
sitemap_count=11
issues=[]
```

Local preview status probe on port 4183:

```txt
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
/nonexistent-seo-test-12345 404 text/html;charset=utf-8
/favicon.ico 404 text/html;charset=utf-8
/sitemap_index.xml 404 text/html;charset=utf-8
```

## P0/P1 issues

None found in the static frontend artifact.

## Remaining non-blocking risks / P2 notes

- Production domain is still represented as `https://[OWNER_SELECTED_DOMAIN]` in sitemap/robots/schema URLs. This is acceptable for the current owner-confirmation state, but must be replaced with the final production domain before live deployment/submission to GSC.
- No production Cloudflare Pages deployment, DNS, analytics, GSC, Bing Webmaster, or contact mailbox verification was performed in this task.
- Real provider inference, upload retention, deletion flow, pricing, and final compliance policy remain outside this static SEO recheck and must be gated before claiming live detection capability.

## QA handoff

QA may proceed on the current `dist/` artifact. SEO status is GO, with the caveat that production launch still needs owner/domain/deployment confirmation and provider/compliance gates before any real AI video detection claims are enabled.

[DONE]
