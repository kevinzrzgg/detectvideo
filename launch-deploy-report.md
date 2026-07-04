# Launch Deploy Report — detectvideo.vip / detectvideo

- Task: `t_14c1dad7` — 11 production deploy after owner confirmation
- Prepared by: `ops_bot`
- Prepared at: 2026-07-04
- Project: `detectvideo`
- Target market: US / English

## Executive status

Status: `[BLOCKED: CUSTOM_DOMAIN_DNS_OWNER_ACTION_REQUIRED]`

Production source is committed and pushed to GitHub, and the static artifact was deployed successfully to Cloudflare Pages. The Cloudflare Pages default hostname is live and verified. Custom domains `detectvideo.vip` and `www.detectvideo.vip` were added to the Pages project, but they remain pending because public DNS is still served by `ns1.dyna-ns.net` / `ns2.dyna-ns.net` and currently resolves to parking IP `185.53.179.146`, not Cloudflare Pages.

## GitHub

- Repository: https://github.com/kevinzrzgg/detectvideo
- Visibility: public
- Deployment source commit SHA: `41ee8c1f182a3fcf401cbca88e7aab11b3787cd4`
- Commit message: `Initial production static site`
- Branch pushed: `main`

## Build and static checks

Command run from `/root/projects/detectvideo`:

```text
npm run build && npm run check
```

Observed result:

```text
Built 11 pages to /root/projects/detectvideo/dist
CHECK_PASS html=12 files=17
```

Production canonical source was updated before build:

- `src/site-data.mjs`: `site.baseUrl = 'https://detectvideo.vip'`
- Generated sitemap and robots now reference `https://detectvideo.vip`.
- Generated page canonical and `og:url` tags use `https://detectvideo.vip/...`.
- Contact form copy remains explicit that the form is preview-only and no production email intake is active yet.

## Cloudflare Pages deployment

Deploy command:

```text
npx wrangler pages deploy dist --project-name detectvideo --branch main
```

Observed result:

```text
Uploaded 16 files
Deployment complete: https://72a2bff8.detectvideo.pages.dev
```

Cloudflare Pages project status:

- Project: `detectvideo`
- Production alias: https://detectvideo.pages.dev
- Deployment URL: https://72a2bff8.detectvideo.pages.dev
- Deployment id: `72a2bff8-9fe3-44ba-8643-16bcdd43545d`
- Environment: Production
- Branch: `main`
- Source: `41ee8c1`

## Custom domain status

Custom domains were added to the Cloudflare Pages project via Cloudflare API:

| Domain | Pages status | Verification | Validation | Notes |
|---|---:|---:|---:|---|
| `detectvideo.vip` | pending | pending | pending / HTTP | DNS not pointed to Cloudflare Pages |
| `www.detectvideo.vip` | pending | pending | pending / HTTP | DNS not pointed to Cloudflare Pages |

DNS evidence at verification time:

```text
detectvideo.vip NS: ns1.dyna-ns.net, ns2.dyna-ns.net
detectvideo.vip A: 185.53.179.146
www.detectvideo.vip A: 185.53.179.146
https://detectvideo.vip/*: timed out
https://www.detectvideo.vip/*: timed out
http://detectvideo.vip/: empty reply from server
http://www.detectvideo.vip/: timed out
```

Cloudflare account zone lookup returned no zone for `detectvideo.vip`, so this worker could not safely change authoritative DNS or add zone records without owner/registrar action.

## Remote verification evidence

Verified on Cloudflare Pages default hostnames:

| Base URL | Path | HTTP | Evidence |
|---|---:|---:|---|
| `https://72a2bff8.detectvideo.pages.dev` | `/` | 200 | title `AI Video Detector for YouTube & Social Videos | AI Video Detector`; page contains `AI Video Detector`, `Sample report only`, `detectvideo.vip` |
| `https://72a2bff8.detectvideo.pages.dev` | `/sitemap.xml` | 200 | sitemap contains `https://detectvideo.vip` URLs |
| `https://72a2bff8.detectvideo.pages.dev` | `/robots.txt` | 200 | contains `User-agent`, `Sitemap: https://detectvideo.vip/sitemap.xml` |
| `https://72a2bff8.detectvideo.pages.dev` | `/sample-report/` | 200 | title `Sample AI Video Detection Report — Evidence Fields & Limitations`; contains `Sample report only` |
| `https://detectvideo.pages.dev` | `/` | 200 | title `AI Video Detector for YouTube & Social Videos | AI Video Detector` |
| `https://detectvideo.pages.dev` | `/sitemap.xml` | 200 | sitemap contains `https://detectvideo.vip` URLs |
| `https://detectvideo.pages.dev` | `/robots.txt` | 200 | contains `User-agent`, `Sitemap: https://detectvideo.vip/sitemap.xml` |
| `https://detectvideo.pages.dev` | `/sample-report/` | 200 | title `Sample AI Video Detection Report — Evidence Fields & Limitations` |

Custom domain verification failed because DNS is not pointed to Cloudflare Pages yet:

| Base URL | Paths tested | Result |
|---|---|---|
| `https://detectvideo.vip` | `/`, `/sitemap.xml`, `/robots.txt`, `/sample-report/` | timed out |
| `https://www.detectvideo.vip` | `/`, `/sitemap.xml`, `/robots.txt`, `/sample-report/` | timed out |

## Owner action required

Choose one DNS path and apply it at the registrar/DNS host currently serving `detectvideo.vip`:

1. Preferred: change nameservers for `detectvideo.vip` to Cloudflare, then let Cloudflare manage DNS and complete Pages custom domain validation.
2. If keeping external DNS: configure records that point to Cloudflare Pages:
   - `www.detectvideo.vip` CNAME to `detectvideo.pages.dev`
   - apex `detectvideo.vip` using DNS-provider-supported CNAME flattening / ALIAS / ANAME to `detectvideo.pages.dev` if available.

After DNS propagates, re-check the Cloudflare Pages custom domain status and re-run remote verification on:

- `https://detectvideo.vip/`
- `https://detectvideo.vip/sitemap.xml`
- `https://detectvideo.vip/robots.txt`
- `https://detectvideo.vip/sample-report/`
- optionally redirect/behavior for `https://www.detectvideo.vip/`

## Remaining risks / launch constraints

- Custom production domain is not live until DNS is corrected and Cloudflare Pages validation is active.
- Contact form remains preview-only; no real email submission/storage is active.
- Automated video detection, uploads, provider inference, retention/deletion jobs, payments, analytics, GSC, and Bing submission remain outside this deployment and should not be presented as active production features until separately implemented and verified.
- Cloudflare Pages default hostname is live; public launch/promotion should wait until `detectvideo.vip` is live and verified.
