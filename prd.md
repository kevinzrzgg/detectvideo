# detectvideo — PRD v1 / Product Definition

## 1. 基本信息

- 项目：detectvideo（内部项目名）
- 公开域名：`detectvideo.vip`（owner 已购买）；公开品牌名仍建议避免直接使用 `DetectVideo`，需在下游文案/设计中降低品牌混淆风险。
- 工作名：AI Video Detector for YouTube & Social Links
- 当前阶段：02-product
- 目标市场：US / English
- 技术栈：Cloudflare-first
- 日期：2026-07-03
- 状态：DONE（PRD v1 可交给下游）；品牌/域名仍需 owner 确认。
- 输入：`/root/projects/detectvideo/research.md`
- 输出：
  - `/root/projects/detectvideo/prd.md`
  - `/root/projects/detectvideo/route-contract.md`

## 2. 上游输入与约束

### 2.1 已读取事实源

- Research Gate：`/root/projects/detectvideo/research.md`
- Control board：`/root/projects/detectvideo/control/project-control.md`
- Stage status：`/root/projects/detectvideo/control/stage-status.md`
- Handoff：`/root/projects/detectvideo/control/handoff.md`
- Parent handoff：Kanban task `t_506b5b37`

### 2.2 关键证据

- `detectvideo` 精确品牌/域名词已被竞品占用：`detectvideo.ai` 与 `detectvideo.com` 都在同一 niche 内运行。
- 需求更强的头部词是 `ai video detector`：research 中 pytrends US 12-month directional probe 均值约 58.87，高于 `detectvideo`、`deepfake video detector`、`ai generated video detector`。
- Google Suggest 验证了 `ai video detector free online`、`ai video detector youtube`、`ai video detector url`、`deepfake video detector online free`、`check video ai or not` 等长尾。
- SERP 采样显示当前竞争以工具页为主，用户期待 upload/link checker、verdict、evidence report 和 disclaimer。
- 技术风险：没有真实模型/provider 前，不能伪造检测结果；v1 必须把真实 detector 能力和 sample/manual checklist 能力区分清楚。

### 2.3 缺失/待确认

- OWNER_CONFIRMED_DOMAIN：`detectvideo.vip`；OWNER_DECISION_REQUIRED：最终公开品牌名/Logo 是否避开 `DetectVideo`。
- 待确认：首版是否接入真实视频检测 provider/model；若未接入，只能上线 intake + educational/sample report，不得输出真实 verdict。
- 待确认：文件上传上限、保留时长、删除策略、付费/额度策略。
- 待确认：是否支持 TikTok/Instagram URL 的真实抓取；MVP 可先文案支持，实际能力需 fallback 到上传原文件。

## 3. 本阶段结论

一句话定位：面向美国英文用户，做一个 AI Video Detector / Deepfake Video Checker，支持上传视频或粘贴 YouTube/social public link，给出概率性、教育用途的 evidence-style report，而不是法律/取证证明。

站点类型：hybrid tool + SEO landing pages。

MVP 推荐：Cloudflare Pages 承载 marketing/SEO pages；Workers 提供 scan intake API；R2 存临时上传；Queues 异步处理；D1/KV 存 scan metadata；没有真实模型前只允许 sample/manual checklist mode。

品牌策略：继续使用 `detectvideo` 作为内部项目名；公开页面先用描述性工作名，不在 logo、title 或 canonical brand 中使用 `DetectVideo`，直到 owner/legal 确认。

## 4. ICP 定义

### 4.1 ICP A — Social video fact-checker / creator / journalist（主 ICP）

- 场景：看到 YouTube Shorts、TikTok、Instagram Reel 或 X 上的可疑视频，需要快速判断是否可能是 AI-generated/deepfake/manipulated。
- 核心任务：粘贴链接或上传片段，获得 “likely AI / suspicious / inconclusive / likely real” 级别的初筛信号和可解释线索。
- 痛点：不懂取证工具；需要快速筛查；不希望下载安装复杂软件。
- 转化可能：高。可转化为 scan credits、batch checking、report export 或 newsletter/lead。
- 风险：不能把结果包装成法律证明；误判会伤害信任。

### 4.2 ICP B — Educator / student / media literacy user

- 场景：课堂、研究、内容鉴别训练，需要了解视频是否可能由 AI 生成，以及有哪些肉眼可查线索。
- 核心任务：上传样例或看 sample report，学习如何识别 lip-sync mismatch、temporal artifacts、compression caveat、metadata caveat。
- 转化可能：中。更适合内容 SEO、模板下载、案例页。
- 风险：不一定高频付费。

### 4.3 ICP C — Trust & safety / small business moderator

- 场景：小团队要初筛用户上传视频、广告素材或 UGC。
- 核心任务：批量/半批量检查，拿到 API 或后台报告。
- 转化可能：中高，但 v1 不作为主线；需要更严谨的 SLA、API、合规和准确率说明。
- 风险：v1 技术和合规成本高，容易范围漂移。

### 4.4 主 ICP 选择

主 ICP：Social video fact-checker / creator / journalist。

原因：与 SERP 的 YouTube/social link、free online、deepfake checker 意图最匹配；MVP 可用简单 UI + evidence report 满足初筛任务；商业化可从免费 scan 到付费 scan/report 平滑展开。

## 5. 定位与边界

### 5.1 Positioning statement

For US users who need to check suspicious YouTube, TikTok, Instagram, or uploaded videos, this product is an AI Video Detector and Deepfake Video Checker that provides a preliminary likelihood verdict with transparent evidence and limitations, unlike generic AI detectors or forensic tools that are either text/image-focused, opaque, or too technical for quick social-video checks.

### 5.2 替代方案

- 竞品工具页：detectvideo.ai、detectvideo.com、tsdetect.com、deepfakecheck.io、treql.com、fauxlens.com、aivideodetector.video、forgespy.com。
- 泛 AI detector：通常偏 text/image，不一定有 video/social workflow。
- 专业取证工具：可信度更强但学习成本高，不适合普通用户快速检查。
- 手动判断：成本低但不系统，缺少 evidence checklist。

### 5.3 差异化

- YouTube/social link-first：把用户的真实入口从 “上传文件” 扩展到 “paste public video link”；抓取失败时清晰提示并引导上传原文件。
- Evidence-style report：不仅给 verdict，还解释 temporal consistency、face/hand artifacts、lip-sync/voice mismatch、compression and metadata caveats。
- Transparent limitations：明确 preliminary / educational / not forensic proof，避免过度承诺。
- Long-tail SEO architecture：围绕 YouTube AI video detector、deepfake video detector、check video AI or not、video authenticity checker 建页面矩阵。

### 5.4 MVP Scope

P0 必须有：

1. 首页 / 主工具页：上传视频 + 粘贴 public video link 两个入口。
2. Scan intake：创建 scan、状态页、结果页结构。
3. Result report UI：verdict 状态、confidence/likelihood、evidence sections、limitations。
4. 明确 disclaimer：educational/preliminary signal, not forensic/legal/moderation proof。
5. SEO 页面矩阵：至少首页、AI Video Detector、YouTube AI Video Detector、Deepfake Video Detector、AI Generated Video Detector、Video Authenticity Checker、Check Video AI or Not。
6. Privacy/Terms/Contact 基础页。
7. 如果无真实 detector：使用 sample report / manual checklist mode，不能输出假检测结果。

P1 可做：

- 真实 provider/model 集成。
- Email report export。
- Scan history / account。
- Paid scan credits。
- Generator-specific pages：Sora、Veo、Kling、Runway 等。
- Browser extension angle。

### 5.5 NOT-DO

- 不把 `DetectVideo` / `detectvideo` 作为公开品牌、logo 或 exact-match domain，除非 owner/legal 明确确认。
- 不宣称 “100% accurate”、“forensic proof”、“court-ready evidence”、“definitively detects all AI videos”。
- 不在没有真实模型/provider 的情况下伪造 scan verdict、confidence 或 evidence。
- 不默认抓取私密视频、登录后视频、受 DRM/平台条款限制的视频。
- 不做 v1 B2B moderation API / enterprise dashboard / browser extension / mobile app。
- 不保存上传文件超过声明保留期；不把用户视频用于训练，除非未来另有明确 opt-in 与合规审查。
- 不将结果用于自动封禁、招聘、信贷、法律结论等高影响决策。

## 6. 用户任务与验收标准

### 6.1 P0 用户任务

1. 用户打开 `/ai-video-detector/`，能在 10 秒内理解可以上传视频或粘贴链接。
2. 用户上传一个小视频，系统创建 scan 并展示 pending/processing/result 状态。
3. 用户粘贴 YouTube public link，系统能创建 link scan；若无法抓取媒体，必须解释限制并提供 upload fallback。
4. 用户看到结果页时，能区分 verdict、evidence、limitations 和 next steps。
5. 用户能在页面上看到 privacy/retention/disclaimer，不会误以为结果是法律证明。
6. 搜索用户访问长尾 landing page 时，能看到与查询一致的 H1、FAQ、CTA 和内链到主工具。

### 6.2 Competitive minimum

- Above-the-fold 有 upload + URL paste。
- 文案覆盖 YouTube/TikTok/Instagram/social videos。
- Report 至少包含 verdict、confidence/likelihood、evidence highlights、limitations。
- 有免费/无需注册基础体验或 sample report。
- 有 FAQ 和 disclaimer。
- 有针对主词和长尾词的 indexable pages。

### 6.3 验收门槛

- PRD 不只是关键词说明，而是可开发产品。
- 每个 indexable 页面有明确用户任务和 SEO intent。
- NOT-DO 明确。
- Route Contract 和 Data Contract 能交给前后端执行。
- 设计、文案、前端、后端、合规都知道不能假设真实检测能力。

## 7. 首页 IA

### 7.1 `/` 或 `/ai-video-detector/` 首屏

- H1：AI Video Detector for YouTube & Social Videos
- Subhead：Upload a clip or paste a public video link to check whether a video may be AI-generated, deepfaked, or manipulated. Get a preliminary verdict with evidence and limitations.
- CTA primary：Upload Video
- CTA secondary：Paste Video Link
- Trust line：Free first scan · No signup for basic checks · Educational signal, not forensic proof
- Input modes：
  - Upload `.mp4/.mov/.webm`（具体限制由 backend/data 阶段确认）
  - Paste public URL（YouTube/TikTok/Instagram/X；实际 fetch 能力待 backend 确认）

### 7.2 首页模块

1. Hero + upload/link checker
2. How it works：upload/paste → frame/audio/link analysis → evidence report
3. What the report checks：visual artifacts、temporal consistency、face/lip-sync、metadata/compression caveats
4. Example report：sample only，标注不是对用户视频的真实检测
5. Supported use cases：YouTube Shorts、TikTok/Reels、social rumors、AI-generated ads、education
6. Limitations：compressed videos、edited clips、screen recordings、no forensic proof
7. Privacy：retention、delete policy、no training without opt-in [待 backend/compliance 确认]
8. FAQ
9. CTA repeat

## 8. SEO 页面矩阵

| URL | Index | Primary keyword | H1 | 用户任务 | CTA | Schema | 内链 |
|---|---|---|---|---|---|---|---|
| `/` | index | ai video detector | AI Video Detector for YouTube & Social Videos | 快速理解产品并进入上传/粘贴 | Upload Video / Paste Link | WebApplication, FAQPage | 全站核心页 |
| `/ai-video-detector/` | index | ai video detector free online | AI Video Detector Online | 上传视频或粘贴链接做初筛 | Start Free Check | SoftwareApplication, FAQPage | deepfake/youtube/authenticity pages |
| `/youtube-ai-video-detector/` | index | youtube ai video detector | YouTube AI Video Detector | 粘贴 YouTube link 或上传下载片段 | Check a YouTube Video | FAQPage, HowTo | 主工具页、link limitations |
| `/deepfake-video-detector/` | index | deepfake video detector online | Deepfake Video Detector Online | 检查疑似 deepfake 视频 | Check for Deepfake Signals | SoftwareApplication, FAQPage | ai-generated/authenticity pages |
| `/ai-generated-video-detector/` | index | ai generated video detector | AI Generated Video Detector | 判断视频是否可能由 AI 生成 | Upload a Video | FAQPage | 主工具页 |
| `/video-authenticity-checker/` | index | video authenticity checker | Video Authenticity Checker | 学习和检查视频真实性信号 | Check Video Authenticity | HowTo, FAQPage | checklist/report pages |
| `/check-video-ai-or-not/` | index | check video ai or not | Check if a Video Is AI or Not | 面向口语长尾查询，给出最简单路径 | Start a Video Check | FAQPage | 主工具页 |
| `/sample-report/` | index | ai video detector report | Sample AI Video Detection Report | 查看报告样例与字段解释 | Try Your Own Video | Article, FAQPage | result页说明 |
| `/privacy/` | index | privacy | Privacy Policy | 了解上传、保留、删除、训练政策 | Contact / Delete Request | WebPage | footer |
| `/terms/` | index | terms | Terms of Use | 了解免责声明和禁止用途 | Contact | WebPage | footer |
| `/contact/` | index | contact | Contact | 联系 owner / report issue | Contact | WebPage | footer |
| `/scan/[scan_id]` | noindex | scan result | Video Scan Result | 查看单次检测状态/结果 | Upload Another Video | noindex page metadata | 不进入 sitemap |

备注：如果最终站点选择 `/` 作为主工具页，则 `/ai-video-detector/` 可作为 canonical 到 `/` 或独立长文页；SEO 阶段需最终确认 canonical 策略。

## 9. Data Contract 初稿

### 9.1 Scan object

```json
{
  "scan_id": "string",
  "input_type": "upload|url",
  "input_url": "string|null",
  "file_object_key": "string|null",
  "status": "created|queued|processing|completed|failed|unsupported",
  "mode": "sample|manual_checklist|provider_inference",
  "verdict": "likely_ai|suspicious|inconclusive|likely_real|null",
  "confidence": 0.0,
  "evidence": [
    {
      "type": "visual_artifact|temporal_consistency|face_lip_sync|audio_voice|metadata|compression_caveat|link_fetch_limit",
      "label": "string",
      "summary": "string",
      "severity": "low|medium|high|info"
    }
  ],
  "limitations": ["string"],
  "created_at": "ISO-8601",
  "expires_at": "ISO-8601"
}
```

### 9.2 Frontend states

- Empty input
- Upload selected
- URL pasted
- Validating input
- Created / queued
- Processing
- Completed
- Failed
- Unsupported URL / fetch unavailable
- File too large / unsupported format
- Sample report mode（没有真实检测时必须显著标识）

### 9.3 需要 backend/data 阶段确认

- Upload size/time limits。
- Supported file extensions and MIME validation。
- R2 retention and delete policy。
- Link fetch legality and technical feasibility by platform。
- Provider/model choice and cost。
- Abuse/rate limit policy。
- Whether confidence is numeric or label-only。

## 10. Visual Style Brief

- 风格：credible, security-adjacent, transparent, non-alarmist。
- 视觉关键词：dark navy / slate background, cyan/blue signal accents, evidence cards, timeline/frame markers, clear warning/disclaimer banners。
- 避免：恐吓式 deepfake 视觉、法律/警方/法庭暗示、模仿 detectvideo.ai 或 detectvideo.com 的品牌样式。
- UI 重点：upload/dropzone 与 paste URL 并列；result evidence cards 清晰可扫读；limitations 与 confidence 不隐藏。

## 11. 风险与闸门

### P0 风险

- 品牌/域名混淆：`detectvideo.ai` 和 `detectvideo.com` 已占位。缓解：公开品牌另选；继续用 descriptive keywords 做 SEO。
- 虚假检测结果：没有真实 detector 时不能输出真实 verdict。缓解：sample/manual checklist mode；真实 provider 作为 P1/P0.5 闸门。
- 合规/误判：结果只能作为 preliminary educational signal。缓解：强 disclaimer、Terms、FAQ、result page limitations。

### P1 风险

- 社交平台链接抓取失败或受限。缓解：URL scan 可先创建任务并提示 fallback to upload。
- 竞品快速增加。缓解：用 YouTube/social workflow + evidence explanation + long-tail pages 抢差异。
- 上传成本和滥用。缓解：Cloudflare rate limiting、file limits、scan credits。

## 12. 下游交接

### 12.1 给 pricing

- 以免费首扫 / basic checks 为入口。
- 不要按 “forensic-grade” 定价，除非后续真实 provider/model 和合规支持。
- 可探索 scan credits、report export、batch checks、API waitlist。

### 12.2 给 compliance

- 必须审查：biometric/deepfake claims、false positive harm、privacy/retention、platform URL fetching、not legal/forensic proof、no training without opt-in。
- 必须禁止：definitive detection claims、law enforcement/court-ready claims、高影响自动决策用途。

### 12.3 给 copy

- 主词：ai video detector。
- 支撑词：deepfake video detector online、youtube ai video detector、ai generated video detector、video authenticity checker、check video ai or not。
- 公开品牌暂用工作名，不写 `DetectVideo` as brand；可把 “detect video AI or not” 作为描述性句子使用。
- 所有结果文案使用 “may be”、“signals”、“likelihood”、“inconclusive”。

### 12.4 给 design

- 需要设计：home/tool page、SEO landing template、scan result page、sample report、error/unsupported states。
- 重点展示：two-input hero、evidence cards、limitations banner、privacy reassurance。

### 12.5 给 backend/data

- 必须输出 scan API contract、R2/D1/Queue design、retention、rate limit、provider decision。
- 如果不能接真实 inference，必须提供 sample/manual checklist mode，不得制造假结果。

### 12.6 给 frontend

- 读取 `/root/projects/detectvideo/route-contract.md`。
- 实现 routes、canonical/noindex、forms/states、result page shell、schema placeholders。
- 不要硬编码 `DetectVideo` 公共品牌。

## 13. 交付物

- PRD v1：`/root/projects/detectvideo/prd.md`
- Route Contract：`/root/projects/detectvideo/route-contract.md`
- 页面矩阵：见本文件第 8 节
- Route/Data Contract 初稿：见本文件第 8/9 节及 route-contract 文件
- 下游交接摘要：见本文件第 12/14 节

## 14. 验收清单自检

- [x] 必须有 NOT-DO。
- [x] 必须有首页 IA。
- [x] 必须有 SEO 页面矩阵。
- [x] 必须有下游交接摘要。
- [x] canonical URL、用户任务、站点类型、MVP scope 已定义。
- [x] 域名 owner 已确认 `detectvideo.vip`；品牌名仍标 `OWNER_DECISION_REQUIRED`，未阻塞 PRD v1。
- [x] 没有编造真实检测能力，已明确 sample/manual checklist fallback。

## 15. 下游交接摘要

# 产品定义与 PRD交接摘要

## 当前结论
- 状态：DONE
- 一句话结论：detectvideo 应避免作为公开品牌，站点应定位为英文 AI Video Detector / Deepfake Video Checker for YouTube & social links，首版做 hybrid tool + SEO pages，并且在没有真实模型/provider 前不得伪造检测结果。

## 关键输入
- 项目：detectvideo
- 当前阶段：02-product
- 上游资料：`/root/projects/detectvideo/research.md`、control files、Kanban parent handoff `t_506b5b37`

## 本阶段交付物
- 文件/内容：`/root/projects/detectvideo/prd.md`、`/root/projects/detectvideo/route-contract.md`
- 核心判断：主 ICP 是 social video fact-checker / creator / journalist；站点类型是 hybrid tool + SEO landing pages；主词是 `ai video detector`。
- 已确认项：研究证据支持 AI video detector / deepfake checker 方向；`detectvideo` 公开品牌存在混淆风险；Cloudflare-first 可作为技术方向。
- 待确认项：最终品牌/域名、真实 detector provider/model、上传限制和文件保留策略、付费策略。

## 质量门槛自检
- 通过项：NOT-DO、首页 IA、页面矩阵、Route Contract、Data Contract 初稿、下游交接均已包含。
- 未通过项：最终品牌/域名未确认；真实检测能力未确认，需 backend/compliance 后续定闸。

## 风险
- P0：品牌混淆、虚假检测结果、误判/合规风险。
- P1：社交链接抓取失败、上传成本和滥用、竞品快速增加。
- P2：后续付费模式不清晰。

## 给下游的最小必要信息
- 下一阶段：pricing、compliance、copy、design、backend/data、frontend。
- 必须读取：`/root/projects/detectvideo/prd.md`、`/root/projects/detectvideo/route-contract.md`、`/root/projects/detectvideo/research.md`。
- 不能假设：不能假设域名已注册；不能假设可公开使用 DetectVideo 品牌；不能假设已有真实 AI video detection inference。
- 建议启动 Prompt：按对应阶段 skill 读取 PRD/Route Contract，先处理 owner decision / compliance / backend capability 的待确认项，再产出下游合同。

[DONE]
