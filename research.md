# detectvideo — Research Gate Report

更新时间：2026-07-03
阶段：01 research
目标市场：US / English
事实源：Kanban task `t_506b5b37`、`/root/projects/detectvideo/control/*.md`、Google Suggest、DuckDuckGo HTML SERP sampling、pytrends、RDAP、竞品页面抓取。

## 1. 中文摘要

结论：不建议把项目直接定位成 `detectvideo` 这个精确品牌词/域名词；建议把站点定位为英文市场的 `AI Video Detector / Deepfake Video Checker for YouTube & social links`。

主要原因：

1. `detectvideo` 精确词已经被竞品占用：
   - `detectvideo.ai`：页面标题为 “AI Video Detector Online | Free Deepfake Checker Tool”，RDAP 注册时间 2025-10-23。
   - `detectvideo.com`：页面标题为 “DetectVideo | Check if a Video Is AI-Generated”，RDAP 注册时间 2026-04-02。
   因此如果继续使用 `detectvideo` 作为站名/域名，有明显品牌混淆风险；建议改用新的品牌名，页面 SEO 仍可覆盖 “detect video AI or not / AI video detector” 等描述性词。

2. 真实需求方向存在，且比 `detectvideo` 精确词更清晰：
   - Google Suggest 对 `ai video detector` 给出：`ai video detector free`、`ai video detector free online`、`ai video detector youtube`、`ai video detector url`、`ai video detector online`。
   - Google Suggest 对 `deepfake video detector` 给出：`deepfake video detector online`、`deepfake video detector online free`、`deepfake video detector github`、`deepfake video detector app`。
   - Google Suggest 对 `detect video ai or not` 给出：`check video ai or not`、`check video ai or not free`、`check youtube video ai or not`。
   - pytrends US 12-month directional probe：`ai video detector` 均值约 58.9，显著高于 `deepfake video detector`、`ai generated video detector`、`detectvideo`。

3. SERP 意图不是 “video content detection API” 主导，而是 C端/轻工具主导：上传视频、粘贴 YouTube/TikTok/Instagram 链接、判断 AI-generated/deepfake/fake video、给出简单 verdict/evidence。`video content detection API` 采样结果主要指向 Google Cloud Video Intelligence API，和本项目做 SEO 工具站的意图不一致。

4. 竞争已经出现，但仍是小站/新站密集赛道：DuckDuckGo SERP sampling 出现 `detectvideo.ai`、`tsdetect.com`、`treql.com`、`deepfakecheck.io`、`overchat.ai`、`aivideodetector.dev`、`fauxlens.com`、`detectvideo.com`、`aivideodetector.video`、`forgespy.com` 等。RDAP 采样显示多个竞品域名为 2025-2026 年注册，说明赛道新，但竞争正在快速堆积。

建议站型：

- BUILD_NOW：`AI Video Detector for YouTube & Social Links`，免费入口 + 上传/URL 粘贴 + 明确 “educational / preliminary signal, not forensic proof” 免责声明。
- 次级页面：`Deepfake Video Detector Online`、`AI Generated Video Detector`、`YouTube AI Video Detector`、`Video Authenticity Checker`、`Check if a Video Is AI or Not`。
- 不建议：纯 `video content detection API`、纯 B2B moderation API、或以 `DetectVideo` 作为品牌名。

需要 owner 确认：是否允许放弃/避开 `detectvideo` 作为品牌与域名，改用一个不易混淆的新品牌；若必须用该词，只建议作为描述性页面文案，不建议作为站名。

## 2. Evidence Log

### 2.1 Input control files

读取了：

- `/root/projects/detectvideo/control/project-control.md`
- `/root/projects/detectvideo/control/stage-status.md`
- `/root/projects/detectvideo/control/kanban-plan.md`
- `/root/projects/detectvideo/control/handoff.md`

约束要点：

- 种子词：`detectvideo`
- 市场：US / English
- 技术栈：Cloudflare-first
- Research 必须验证最终意图：AI video detector / deepfake detector / video authenticity checker / video content detection API / other
- 输出路径：`/root/projects/detectvideo/research.md`

### 2.2 Search/backend limitations

- `web_search` / `web_extract` 当前返回 Tavily 401 Unauthorized，因此未作为证据来源。
- 使用 fallback：Google Suggest、DuckDuckGo HTML、Bing RSS、pytrends、RDAP、页面 HTTP 抓取。
- DiscoverKeywords API 可访问，但本次 `gk_api.py research "detectvideo" ... --report` 返回大量 off-topic cached/shared candidates（例如 sports/free agent tracker、earthquake detector 等），只保留一条弱相关信号：`ai detection tool` / `hive ai detector` / `copyleaks ai detector` 出现在可观察区；该 API 输出不作为本项目最终判断的主证据。

### 2.3 Autosuggest demand shape

Google Suggest, US English:

`detectvideo`

- detectvideo ai
- detectvideo

`detect video`

- detect video ai
- detect video ai or not
- detect video on website and download

`ai video detector`

- ai video detector
- ai video detector free
- ai video detector link
- ai video detector free online
- ai video detector youtube
- ai video detector reddit
- ai video detector online
- ai video detector instagram
- ai video detector app
- ai video detector url

`ai video detector free`

- ai video detector free online
- ai video detector free reddit
- ai video detection free
- ai video detector online free no sign up
- ai generated video detector free
- ai video content detector free
- best ai video detector free

`ai video detector youtube`

- ai video detector youtube
- ai video detector youtube link
- ai youtube video detector online free
- ai youtube video detector free
- ai generated youtube video detector

`deepfake video detector`

- deepfake video detector online
- deepfake video detector online free
- deepfake video detector free
- deepfake video detector github
- deepfake video detector app
- deepfake video detector model
- deepfake video detection project

`video authenticity checker`

- video authenticity checker
- video originality checker
- ai video authenticity checker
- real video checker
- how to check if a video is genuine

`ai generated video detector`

- ai generated video detector
- ai generated video detector free
- ai generated video detector online free
- ai generated video detector github
- ai generated video detector reddit
- ai generated video detection dataset

Interpretation: autosuggest validates real query demand around free/online/no signup, YouTube/social link checking, and AI/deepfake authenticity checks.

### 2.4 Trend probe

pytrends US 12-month directional probe:

| Query | Mean interest |
|---|---:|
| ai video detector | ~58.87 |
| detectvideo | ~0.57 |
| deepfake video detector | ~0.36 |
| ai generated video detector | ~0.30 |
| video authenticity checker | ~0.00 |

Interpretation: `ai video detector` is the strongest head term. `detectvideo` has minimal standalone search interest and should not drive the SEO architecture.

### 2.5 SERP sampling

DuckDuckGo HTML SERP sampling:

`ai video detector free online`

- `detectvideo.ai` — AI Video Detector Online | Free Deepfake Checker Tool
- `tsdetect.com/ai-video-detector.html` — AI Video Detector — Check Any Video for AI Content
- `treql.com` — Free AI Image & Video Detector
- `deepfakecheck.io` — Free Deepfake Detector: Video, Audio, Image & Text
- `overchat.ai/video/ai-video-detector` — AI Video Detector - Detect AI Generated Videos Online
- `free.ai/detector` — Free AI Detector — Text, Image & Video
- `aivideodetector.dev` — AI Video Detector - Detect Deepfakes & AI Videos Free Online
- `fauxlens.com/ai-video-detector` — Free AI Video Detector - Detect Fake Clips

`deepfake video detector online free`

- `deepfakecheck.io`
- `treql.com`
- `fauxlens.com/detect`
- `detectvideo.ai`
- `deepguardai.com/deepfake-checker`
- `bitmind.ai/detect`
- `tsdetect.com/deepfake-detector-free.html`
- `linkcheckr.io/deepfake-detector`

`ai video detector youtube link`

- `detectvideo.ai`
- `forgespy.com/detect-ai/youtube`
- `aivideodetector.dev/youtube-ai-video-detector`
- `overchat.ai/video/ai-video-detector`
- `forgespy.com/ai-video-detector`
- `aivideodetector.video`
- `detectvideo.com`
- `linkcheckr.io`

`video authenticity checker`

- `tsdetect.com/check-if-video-is-real.html`
- `truthscan.com/ai-video-detector`
- `tsdetect.com/ai-generated-video-checker.html`
- `imagera.ai/detect/ai-video-detector`
- `detectvideo.ai`
- `video-verify.cameronobrien.dev`
- `berify.com/video-finder`
- `deepfakecheck.io`

Interpretation: SERP is tool-page heavy and dominated by newer niche sites rather than only large authorities. That is positive for a small SEO site, but the exact `detectvideo` brand space is already occupied.

### 2.6 Competitor capability scan

| Competitor | Observed positioning | Minimum capability implied |
|---|---|---|
| detectvideo.ai | “AI Video Detector Online | Free Deepfake Checker Tool”; upload or paste link; YouTube/Shorts/social support; paid scan packs | Upload + URL scan entry, deepfake/AI verdict, paid scan packs |
| detectvideo.com | “Detect AI-Generated Videos”; pages for Instagram Reel, YouTube Shorts, TikTok; responsible-use copy | Upload + social page segmentation + simple AI-likelihood analysis |
| tsdetect.com | “AI Video Detector — Check Any Video for AI Content”; YouTube/TikTok/Instagram; extension angle | Browser extension or URL workflow, education pages |
| deepfakecheck.io | “Free Deepfake Detector: Video, Audio, Image & Text”; no signup/private/free | Multi-modal checker positioning, privacy/no-signup claim |
| treql.com | “Free AI Image & Video Detector”; mentions Midjourney, DALL-E, Sora, Flux, Stable Diffusion | Image + video support, model-name landing claims |
| overchat.ai | “Is This Video AI-Generated?”; supported models and FAQ | Landing page + upload/checker tool |
| fauxlens.com | Detects Sora, Veo, Kling, Runway; frame-by-frame forensic analysis | Generator-specific pages + evidence explanation |
| aivideodetector.video | Social links & uploads, evidence report | Public URL paste + upload fallback + report sections |
| forgespy.com | YouTube AI Video & Deepfake Detector | YouTube URL-specialized landing page |

Minimum viable competitive ability:

1. Above-the-fold upload + URL paste.
2. Support YouTube/TikTok/Instagram/social links in copy; when extraction is unreliable, explain public-link limits and ask for original upload.
3. Verdict: `likely AI-generated / suspicious / likely real / inconclusive`.
4. Evidence report: temporal consistency, face artifacts, lip-sync/voice mismatch, compression caveat, metadata caveat.
5. Strong disclaimer: not legal/forensic proof.
6. FAQ and long-tail pages for `free`, `online`, `YouTube`, `deepfake`, `AI-generated`, `video authenticity`.

## 3. Intent classification

| Candidate positioning | Fit | Reason |
|---|---|---|
| AI video detector | Strong primary | Highest autosuggest and pytrends signal; SERP tool pages match exactly |
| Deepfake video detector | Strong secondary | Clear security/authenticity intent; strong long-tail suggestions; overlaps with AI detector pages |
| Video authenticity checker | Medium secondary | Lower trend signal but useful trust/safety framing and article/page angle |
| AI generated video detector | Medium secondary | Long-tail demand exists; useful supporting page and FAQ language |
| Video content detection API | Weak / not v0 | SERP samples point to Google Cloud Video Intelligence/API docs; B2B API intent differs from simple SEO tool site |
| Detectvideo as exact brand | Risky / avoid | Exact competitors exist at `.ai` and `.com`; standalone demand weak |

## 4. Recommended English site direction

Primary positioning:

“AI Video Detector for YouTube, TikTok, Instagram & Uploaded Clips”

Homepage hero:

- H1: `AI Video Detector for YouTube & Social Videos`
- Subhead: `Upload a clip or paste a public video link to check whether a video may be AI-generated, deepfaked, or manipulated. Get a clear verdict with evidence and limitations.`
- CTA 1: `Upload Video`
- CTA 2: `Paste Video Link`
- Trust copy: `Free first scan · No signup for basic checks · Educational signal, not forensic proof`

Core pages:

1. `/ai-video-detector/`
   - Main landing page for `ai video detector`, `ai video detector free online`, `ai video detector online`.

2. `/youtube-ai-video-detector/`
   - Targets `ai video detector youtube`, `youtube ai video detector`, `ai video detector youtube link`.
   - MVP can accept a URL but clearly state when public media cannot be fetched.

3. `/deepfake-video-detector/`
   - Targets `deepfake video detector online`, `deepfake video detector free`, `deepfake video detector online free`.

4. `/ai-generated-video-detector/`
   - Targets `ai generated video detector`, `ai generated video detector free`, `ai generated video detector online free`.

5. `/video-authenticity-checker/`
   - Targets `video authenticity checker`, `check if a video is real`, `how to check if a video is genuine`.

6. `/check-video-ai-or-not/`
   - Targets conversational long-tails from autosuggest.

Feature priorities for Cloudflare-first MVP:

- Static marketing pages on Cloudflare Pages.
- Client-side upload UI with size/time limits.
- Serverless queue/API stub for scans.
- If no real detector model is ready, do not fake results. Ship educational “manual checklist + sample report” mode first, or integrate a real detection provider/model later.
- Clear privacy copy: file retention, scan limits, no legal-proof claims.

## 5. Risks

### 5.1 Brand/domain risk

High if the project uses `DetectVideo` as a brand or chooses a confusingly similar exact-match domain, because `detectvideo.ai` and `detectvideo.com` already operate in the same niche.

Mitigation:

- Choose a different brand/domain.
- Use “detect video” only descriptively in copy, not as product mark.
- Avoid logos, page titles, or claims that mimic `detectvideo.ai` / `detectvideo.com`.

### 5.2 Accuracy/compliance risk

High if the site claims definitive detection. AI/deepfake detection is probabilistic and can be wrong, especially on compressed social videos.

Mitigation:

- Use terms like “signals”, “likelihood”, “inconclusive”.
- Add disclaimer: “This tool is for educational/preliminary screening and is not forensic, legal, or moderation proof.”
- Preserve privacy and avoid sensitive biometric claims unless reviewed by compliance.

### 5.3 Competitive risk

Medium/high: many new niche sites already target the same pages. However, domain ages are mostly young (2025-2026 in samples), so the SERP is not yet fully locked.

Mitigation:

- Differentiate with YouTube/social-link workflow and evidence explanations.
- Build useful long-tail pages, not only a generic homepage.
- Add example reports and transparent limitations.

### 5.4 Technical risk

Medium/high: actual video AI detection requires model inference, frame sampling, and/or third-party APIs. Cloudflare-first static deployment alone is not enough for true analysis.

Mitigation:

- Phase 1: static pages + upload/link intake + educational/sample report; no fake verdicts.
- Phase 2: integrate real inference provider or queue-based backend.
- Backend task should define scan-size limits, storage retention, and provider costs.

## 6. Gate recommendation

Gate verdict: PASS_WITH_CONDITIONS

Proceed to PRD only if the next stages accept these conditions:

1. Do not use `DetectVideo` / `detectvideo` as the public brand or exact domain without owner/legal confirmation.
2. Position the site around `AI Video Detector` first, with `Deepfake Video Detector` and `YouTube AI Video Detector` as supporting pages.
3. Do not claim real detection results until there is a verified backend/model/provider. For MVP copy, use “preliminary signals” and “sample evidence report” language if backend is not ready.
4. Compliance review must check biometric/deepfake/false-positive claims before launch.

Recommended next PRD brief:

Build an English Cloudflare-first AI video detector site for US users. The site should target `ai video detector`, `deepfake video detector online`, `youtube ai video detector`, and `video authenticity checker`. It should offer an upload/link checking UI, evidence-style result report, privacy/limitations disclaimers, and long-tail SEO pages. Avoid `detectvideo` as brand due exact competitors `detectvideo.ai` and `detectvideo.com`.
