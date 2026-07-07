# Frontend Postlaunch Update — Analytics / Contact / Privacy

- Task: `t_acc2872b`
- Project: `detectvideo` / `detectvideo.vip`
- Updated by: `frontend_bot`
- Status: `[DONE_WITH_OWNER_PENDING_EMAIL_AND_ANALYTICS_TOKEN_HANDOFF]`
- Deployment: `https://f0090e2e.detectvideo.pages.dev`
- Production domain verified: `https://detectvideo.vip`

## Summary

The frontend was updated to remove the previously committed GA4 tag and to use Cloudflare Web Analytics only when a real `CLOUDFLARE_WEB_ANALYTICS_SITE_TOKEN` is securely provided at build time. Because `/root/projects/detectvideo/analytics-email-setup.md` intentionally redacts the Cloudflare Web Analytics token, this deployment does not emit a fake beacon or placeholder token.

The contact page now exposes the real public support path `support@detectvideo.vip` while clearly stating that email intake is pending Cloudflare Email Routing verification. The privacy page now documents the privacy-friendly Cloudflare Web Analytics path and explicitly avoids GA4 / Microsoft Clarity claims.

## Source changes

- `scripts/build.mjs`
  - Removed the hard-coded GA4 script.
  - Added optional Cloudflare Web Analytics snippet generation from `CLOUDFLARE_WEB_ANALYTICS_SITE_TOKEN` only.
  - Emits a non-tracking HTML comment when the token is unavailable, so no placeholder analytics script is committed.
  - Added contact/privacy-specific legal page copy.
- `src/site-data.mjs`
  - Updated `/contact/` copy to advertise `support@detectvideo.vip` and the pending intake status.
  - Updated `/privacy/` copy to describe privacy-friendly analytics and no GA4/Clarity.
- `src/app.js`
  - Updated contact helper status text so users know no form submission is sent and email intake is pending verification.
- `dist/`
  - Rebuilt generated static pages and assets.

## Build and check evidence

```text
npm run build && npm run check

Built 11 pages to /root/projects/detectvideo/dist
CHECK_PASS html=12 files=17
```

## Deploy evidence

```text
npx wrangler pages deploy dist --project-name=detectvideo --branch=main --commit-dirty=true

Success! Uploaded 1 files (15 already uploaded)
Deployment complete: https://f0090e2e.detectvideo.pages.dev
```

## Remote verification evidence

Checked the Pages deployment and production custom domain with a browser user agent:

```text
https://f0090e2e.detectvideo.pages.dev/ status=200 hasGA=false hasClarity=false hasCFBeacon=false hasPendingAnalytics=true hasNoGA=true
https://detectvideo.vip/ status=200 hasGA=false hasClarity=false hasCFBeacon=false hasPendingAnalytics=true hasNoGA=true
https://detectvideo.vip/contact/ status=200 hasGA=false hasClarity=false hasCFBeacon=false hasPendingAnalytics=true hasSupport=true hasPendingEmail=true hasNoGA=true
https://detectvideo.vip/privacy/ status=200 hasGA=false hasClarity=false hasCFBeacon=false hasPendingAnalytics=true hasNoGA=true
```

## Remaining owner actions / risks

- Cloudflare Web Analytics collection is not active in this deployment because the real site token was not available in the ops artifact. Owner needs to retrieve the token from Cloudflare Dashboard or provide it through an approved secure channel, then rebuild with `CLOUDFLARE_WEB_ANALYTICS_SITE_TOKEN` set.
- `support@detectvideo.vip` is shown as the public contact path, but Cloudflare Email Routing remains pending owner verification / zone setup. Do not rely on successful delivery until MX/routing is confirmed.
- GSC and Bing verification/submission remain owner-required per `analytics-email-setup.md`.

[DONE]
