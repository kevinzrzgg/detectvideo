# detectvideo — Route Contract v1

- 项目：detectvideo（内部项目名）
- 公开域名：`detectvideo.vip`（owner 已购买）；公开品牌名不得默认使用 `DetectVideo`，需避免与 detectvideo.ai / detectvideo.com 混淆。
- 工作名：AI Video Detector for YouTube & Social Links
- 当前阶段：02-product
- 日期：2026-07-03
- 状态：DONE（可交给下游实现/复核）
- 配套 PRD：`/root/projects/detectvideo/prd.md`
- 上游研究：`/root/projects/detectvideo/research.md`

## 1. Contract Principles

1. Cloudflare-first：静态页面优先用 Cloudflare Pages；动态 scan/API 用 Workers + Queues + R2 + D1/KV。
2. SEO-first：indexable pages 必须有唯一 primary keyword、H1、用户任务、FAQ/HowTo/SoftwareApplication schema 策略和内链。
3. Safety-first：没有真实 detector provider/model 前，所有结果页必须是 sample/manual checklist mode，不能输出伪造 verdict。
4. Brand-safe：route、title、logo、canonical name 不使用 `DetectVideo` 作为公共品牌，除非 owner/legal 后续确认。
5. Noindex scan results：用户 scan/status/result 页面不进入 sitemap，不被索引。

## 2. Canonical Strategy

### 2.1 默认 canonical base

- Canonical base：`https://[OWNER_SELECTED_DOMAIN]`
- `[OWNER_SELECTED_DOMAIN]` 在 owner 未确认前不得硬编码。
- 本 contract 中所有 canonical 使用相对路径 + placeholder。

### 2.2 Homepage vs `/ai-video-detector/`

推荐 v1：

- `/` 为品牌首页 + 主工具入口，canonical `/`。
- `/ai-video-detector/` 为主 SEO landing + 工具入口，canonical `/ai-video-detector/`。
- 两页可共享工具组件，但 copy 不要完全重复。

可选降级：如果前端只做一个主工具页，则 `/ai-video-detector/` 301 到 `/`，并让 `/` 的 title/H1 覆盖 `AI Video Detector`。该策略需 SEO 阶段确认。

## 3. Route Matrix

| Route | Index | Canonical | Primary keyword | H1 | Page type | User task | CTA | Schema | Owner |
|---|---|---|---|---|---|---|---|---|---|
| `/` | index | `/` | ai video detector | AI Video Detector for YouTube & Social Videos | home/tool | 了解产品并开始上传/粘贴检测 | Upload Video / Paste Link | WebApplication + FAQPage | frontend/copy |
| `/ai-video-detector/` | index | `/ai-video-detector/` | ai video detector free online | AI Video Detector Online | SEO tool landing | 上传视频或粘贴 public video link 做初筛 | Start Free Check | SoftwareApplication + FAQPage | frontend/copy |
| `/youtube-ai-video-detector/` | index | `/youtube-ai-video-detector/` | youtube ai video detector | YouTube AI Video Detector | vertical landing | 粘贴 YouTube URL 或上传片段 | Check a YouTube Video | FAQPage + HowTo | frontend/copy |
| `/deepfake-video-detector/` | index | `/deepfake-video-detector/` | deepfake video detector online | Deepfake Video Detector Online | vertical landing | 检查疑似 deepfake 视频信号 | Check for Deepfake Signals | SoftwareApplication + FAQPage | frontend/copy |
| `/ai-generated-video-detector/` | index | `/ai-generated-video-detector/` | ai generated video detector | AI Generated Video Detector | vertical landing | 判断视频是否可能由 AI 生成 | Upload a Video | FAQPage | frontend/copy |
| `/video-authenticity-checker/` | index | `/video-authenticity-checker/` | video authenticity checker | Video Authenticity Checker | educational/tool landing | 学习并检查视频真实性信号 | Check Video Authenticity | HowTo + FAQPage | frontend/copy |
| `/check-video-ai-or-not/` | index | `/check-video-ai-or-not/` | check video ai or not | Check if a Video Is AI or Not | conversational landing | 用最简单语言开始视频 AI 检查 | Start a Video Check | FAQPage | frontend/copy |
| `/sample-report/` | index | `/sample-report/` | ai video detector report | Sample AI Video Detection Report | sample/report explainer | 查看报告结构和证据字段解释 | Try Your Own Video | Article + FAQPage | frontend/copy |
| `/privacy/` | index | `/privacy/` | privacy | Privacy Policy | legal | 了解上传、保留、删除、训练政策 | Contact / Delete Request | WebPage | compliance/copy |
| `/terms/` | index | `/terms/` | terms | Terms of Use | legal | 了解免责声明、禁止用途、责任限制 | Contact | WebPage | compliance/copy |
| `/contact/` | index | `/contact/` | contact | Contact | support | 联系站点 owner 或反馈问题 | Contact | WebPage | frontend/copy |
| `/scan/[scan_id]` | noindex | none | none | Video Scan Result | dynamic result | 查看单次 scan 状态/结果 | Upload Another Video | none; add noindex | frontend/backend |
| `/api/scans` | noindex | none | none | n/a | API | 创建 upload/url scan | n/a | none | backend |
| `/api/scans/[scan_id]` | noindex | none | none | n/a | API | 读取 scan 状态/结果 | n/a | none | backend |
| `/api/uploads/presign` | noindex | none | none | n/a | API | 获取上传授权/限制 | n/a | none | backend |
| `/sitemap.xml` | public | n/a | n/a | n/a | system | search engine discovery | n/a | XML sitemap | frontend/seo |
| `/robots.txt` | public | n/a | n/a | n/a | system | crawler rules | n/a | text | frontend/seo |

## 4. Page Contracts

### 4.1 `/` Home / primary tool entry

Required sections:

1. Hero with H1, subhead, upload input, paste URL input.
2. Trust line: `Free first scan · No signup for basic checks · Educational signal, not forensic proof`.
3. How it works: upload/paste → analysis → evidence report.
4. Evidence explanation cards.
5. Supported video sources: YouTube, TikTok, Instagram, X/social, uploaded clips. Include caveat: public-link fetching may be limited; upload fallback available.
6. Example/sample report.
7. Limitations and disclaimer.
8. Privacy and retention teaser.
9. FAQ.
10. Footer links to privacy/terms/contact.

Required metadata:

- title pattern: `AI Video Detector for YouTube & Social Videos | [Brand]`
- meta description: must mention upload, paste public video link, preliminary/evidence/limitations.
- canonical: `/`
- robots: index,follow

### 4.2 `/ai-video-detector/`

Intent: main SEO page for `ai video detector`, `ai video detector free online`, `ai video detector online`.

Required sections:

1. H1: `AI Video Detector Online`
2. Tool block above the fold.
3. Short explanation of AI-generated video / deepfake / manipulated video.
4. Evidence report preview.
5. Use cases.
6. Accuracy and limitations.
7. FAQ targeting free/online/no signup/upload/link questions.
8. Internal links to YouTube, deepfake, AI-generated, authenticity pages.

### 4.3 `/youtube-ai-video-detector/`

Intent: YouTube link workflow.

Required copy caveat:

- State that public YouTube link checks depend on availability and platform limitations.
- If the tool cannot fetch media, user should upload the original clip or a downloaded copy they have rights to analyze.

H1: `YouTube AI Video Detector`
CTA: `Check a YouTube Video`

### 4.4 `/deepfake-video-detector/`

Intent: deepfake trust/safety queries.

Must include:

- face/lip-sync/voice mismatch evidence categories.
- disclaimer that a clean result does not prove authenticity.
- link to terms and privacy.

### 4.5 `/ai-generated-video-detector/`

Intent: generated video queries.

Must include:

- generator examples in generic form only unless evidence supports specific models.
- avoid unsupported claims like “detects Sora/Veo/Kling with high accuracy” unless backend confirms.

### 4.6 `/video-authenticity-checker/`

Intent: educational/video authenticity framing.

Must include:

- HowTo/manual checklist content.
- distinction between preliminary screening and forensic analysis.

### 4.7 `/check-video-ai-or-not/`

Intent: conversational long-tail.

Tone:

- simpler language, less technical.
- H1 exactly/near-exact: `Check if a Video Is AI or Not`.

### 4.8 `/sample-report/`

Purpose:

- show report format and build trust before users upload.

Critical requirement:

- Mark all examples as sample/demo data.
- Do not present as a real scan of a user-supplied video.

### 4.9 Legal/support pages

`/privacy/` must cover:

- what is uploaded/stored,
- retention window [backend/compliance to confirm],
- deletion request,
- whether files are used for training（default: no, unless future opt-in）, 
- third-party provider disclosure [pending provider].

`/terms/` must cover:

- preliminary/educational use,
- not forensic/legal proof,
- prohibited high-impact decisions,
- user responsibility for rights to upload/analyze media,
- platform link limitations.

## 5. Dynamic Scan Contract

### 5.1 `/scan/[scan_id]`

- robots: `noindex,nofollow`
- no canonical
- not included in sitemap
- should not expose original URL/file key in HTML if avoidable

Required states:

1. `created`: input accepted, waiting to queue.
2. `queued`: scan queued.
3. `processing`: scan running.
4. `completed`: report available.
5. `failed`: clear, non-technical failure message.
6. `unsupported`: unsupported URL/platform/file type/size.
7. `sample`: demo report or manual checklist, not real detection.

Report sections:

- Summary verdict: `likely_ai`, `suspicious`, `inconclusive`, `likely_real`, or null for sample/manual mode.
- Confidence/likelihood: label or number only if backend validates meaning.
- Evidence cards:
  - visual artifacts
  - temporal consistency
  - face/lip-sync
  - audio/voice mismatch
  - metadata/compression caveats
  - link fetch limitations
- Limitations banner.
- Next steps: upload original, compare sources, use professional forensics for high-stakes decisions.

### 5.2 API: `POST /api/scans`

Purpose: create a scan from URL or uploaded object key.

Request example:

```json
{
  "input_type": "url",
  "input_url": "https://www.youtube.com/watch?v=...",
  "file_object_key": null,
  "consent": true
}
```

or

```json
{
  "input_type": "upload",
  "input_url": null,
  "file_object_key": "uploads/tmp/...",
  "consent": true
}
```

Response example:

```json
{
  "scan_id": "scan_...",
  "status": "queued",
  "mode": "sample|manual_checklist|provider_inference",
  "result_url": "/scan/scan_..."
}
```

Validation:

- Reject missing consent.
- Reject both URL and file missing.
- Reject both URL and file present unless backend intentionally supports it.
- Validate URL scheme and supported hosts.
- Validate upload object key belongs to current request/session.

### 5.3 API: `GET /api/scans/[scan_id]`

Response example:

```json
{
  "scan_id": "scan_...",
  "status": "completed",
  "mode": "provider_inference",
  "verdict": "suspicious",
  "confidence": 0.67,
  "evidence": [
    {
      "type": "temporal_consistency",
      "label": "Temporal consistency",
      "summary": "Several frames show inconsistent motion around the face region.",
      "severity": "medium"
    }
  ],
  "limitations": [
    "Compressed social videos can hide or create artifacts.",
    "This report is a preliminary signal, not forensic proof."
  ],
  "created_at": "2026-07-03T00:00:00Z",
  "expires_at": "2026-07-04T00:00:00Z"
}
```

If no real inference exists, response must use `mode: sample` or `mode: manual_checklist`, and `verdict` must be null unless explicitly demo-labeled.

### 5.4 API: `POST /api/uploads/presign`

Purpose: issue upload URL/token for R2 direct upload or Worker-mediated upload.

Backend must define:

- max file size,
- max duration,
- allowed MIME types,
- retention period,
- rate limit,
- abuse protections.

## 6. Sitemap Contract

Include only indexable routes:

- `/`
- `/ai-video-detector/`
- `/youtube-ai-video-detector/`
- `/deepfake-video-detector/`
- `/ai-generated-video-detector/`
- `/video-authenticity-checker/`
- `/check-video-ai-or-not/`
- `/sample-report/`
- `/privacy/`
- `/terms/`
- `/contact/`

Exclude:

- `/scan/[scan_id]`
- all `/api/*`
- internal preview/dev routes
- admin routes if any

## 7. Robots Contract

Recommended `robots.txt` draft:

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /scan/

Sitemap: https://[OWNER_SELECTED_DOMAIN]/sitemap.xml
```

## 8. Schema Contract

### 8.1 WebApplication / SoftwareApplication

Use on `/` and `/ai-video-detector/`:

- name: `[OWNER_SELECTED_BRAND] AI Video Detector` or neutral working name until brand confirmed.
- applicationCategory: `MultimediaApplication` or `UtilityApplication`.
- operatingSystem: `Web`.
- offers: use free/basic wording only if pricing confirms.
- description: preliminary AI/deepfake video signal tool.

### 8.2 FAQPage

Use on primary SEO pages with page-specific questions.

Required FAQ themes:

- Can this detect AI-generated videos?
- Can I check a YouTube/TikTok/Instagram video?
- Is it free?
- Is the result forensic/legal proof? Answer: no.
- What happens to uploaded videos?
- What if the result is inconclusive?

### 8.3 HowTo

Use only on `/youtube-ai-video-detector/` and `/video-authenticity-checker/` if the page includes real step-by-step instructions.

## 9. Internal Linking Contract

Global nav:

- AI Video Detector → `/ai-video-detector/`
- YouTube Detector → `/youtube-ai-video-detector/`
- Deepfake Detector → `/deepfake-video-detector/`
- Sample Report → `/sample-report/`

Footer:

- Privacy → `/privacy/`
- Terms → `/terms/`
- Contact → `/contact/`

Contextual links:

- Deepfake page links to AI Generated page and Video Authenticity page.
- YouTube page links to main tool and link limitations FAQ.
- Sample Report links back to all tool pages.

## 10. Acceptance Checklist

- [x] Canonical URL strategy defined with domain placeholder.
- [x] User tasks defined per route.
- [x] NOT-DO and brand/domain warning preserved from PRD.
- [x] Site type defined: hybrid tool + SEO landing pages.
- [x] MVP routes and noindex dynamic routes defined.
- [x] API/scan contract prevents fake inference claims.
- [x] Sitemap/robots/schema requirements included.

## 11. Open Decisions for Owner / Downstream

- OWNER_CONFIRMED_DOMAIN：detectvideo.vip. OWNER_DECISION_REQUIRED：final public brand/logo naming.
- Backend decision：real provider/model vs sample/manual checklist mode for launch.
- Compliance decision：retention window, privacy policy, prohibited uses, social URL fetching language.
- Pricing decision：free scans, credits, report export, batch/API waitlist.
- SEO decision：whether `/` and `/ai-video-detector/` are separate canonical pages or one redirects to the other.

[DONE]
