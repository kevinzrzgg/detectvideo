# detectvideo.vip — Compliance Gate v1

- 项目：detectvideo（内部项目名）
- 公开域名：`detectvideo.vip`（owner 已购买；DNS/Cloudflare/生产部署待确认）
- 建议公开定位：AI Video Detector / Deepfake Video Checker for YouTube & Social Links
- 目标市场：US / English
- 当前阶段：04 compliance
- 更新时间：2026-07-03T12:43:45Z
- 输入：
  - `/root/projects/detectvideo/research.md`
  - `/root/projects/detectvideo/prd.md`
  - `/root/projects/detectvideo/route-contract.md`
  - `/root/projects/detectvideo/control/*.md`
- 输出：`/root/projects/detectvideo/compliance.md`
- Gate verdict：PASS_WITH_CONDITIONS
- 法律提示：本文件是产品合规与上线文案风险审查，不是律师意见；公开法律页上线前应由 owner/律师按真实业务、地区和供应商信息复核。

## 1. Executive Summary / 中文结论

可以继续进入 copy/design/frontend/backend 阶段，但必须把本站作为“概率性、教育用途、初筛信号”的 AI/deepfake video checker，而不是司法、取证、执法、平台审核或高影响决策工具。

本次未发现必须立即阻断项目推进的不可降级风险；但存在 4 个 P0 条件门槛，若下游不能落实则必须 BLOCK：

1. 品牌/域名混淆：不得把 `DetectVideo` / `detectvideo` 当作公开品牌、logo、页面 title 的品牌主体或官方来源暗示；`detectvideo.vip` 可作为域名使用，但页面品牌应使用中性/新品牌或描述性标题，并显著避免与 `detectvideo.ai`、`detectvideo.com` 混淆。
2. 检测能力：没有真实 detector provider/model 和验证证据前，不得输出真实 verdict、confidence、probability、model evidence 或“已分析该视频”的结果；只能上线 sample report / manual checklist / intake waitlist。
3. 结果声明：所有页面、Schema、FAQ、结果页必须使用 “preliminary signal / likelihood / may indicate / inconclusive / limitations”，不得承诺 100% accuracy、forensic proof、court-ready evidence、guaranteed detection、law-enforcement grade。
4. 上传/URL 隐私：上线真实上传或 URL 抓取前，必须有文件大小/类型/时长限制、保留期、删除入口、第三方处理披露、滥用处理、禁止违法/成人/儿童性虐待内容政策和 no-training-without-opt-in 口径。

如果下游只能先做静态站，合规安全降级路径是：indexable SEO pages + sample report + manual checklist + contact/waitlist；不要启用真实用户视频上传、不要伪造扫描结果。

## 2. Scope Reviewed

已审查范围：

- `detectvideo.vip` 与 `detectvideo.ai` / `detectvideo.com` 的品牌混淆风险。
- AI-generated / deepfake / manipulated video detection claim 风险。
- 上传视频、粘贴 public video URL、抓取 YouTube/TikTok/Instagram/X 的 privacy、copyright、platform-terms 和 abuse 风险。
- 儿童、成人、违法内容、未授权偷拍视频、个人肖像/声音/生物特征推断等敏感内容风险。
- Legal page route contract：Privacy、Terms、Cookie、Refund、Contact。
- SEO/copy 禁用表达、Schema 禁用 claim、结果页免责声明。
- 下游给 copy/design/backend/frontend/QA 的最小合规合同。

未审查/待后续复核：

- 真实 detector provider/model、第三方 API 合同、DPA、subprocessor、数据出境与 retention 细节。
- 支付 provider、退款政策和订阅条款（pricing 阶段未完成前只能给默认合同）。
- 生产部署、analytics、cookie banner、GSC/Bing/Clarity/GA4 实装证据。
- 州级 privacy law 适用性（例如 CA/CO/VA/CT/UT 等）、COPPA、biometric privacy、right of publicity 等律师级判断。

## 3. Gate Status

| Area | Status | Decision |
|---|---|---|
| Brand / domain confusion | P0 conditional | 可用 `detectvideo.vip` 域名继续开发，但公开品牌不能默认叫 DetectVideo/detectvideo；需新品牌或描述性标题。 |
| Detection accuracy claims | P0 conditional | 无真实模型前只能 sample/manual checklist；有真实模型后也只能概率性表述。 |
| Upload privacy / retention | P0 conditional | 真实上传前必须定义 retention、deletion、third-party processing、no-training policy。 |
| Social URL fetching | P1 conditional | 仅限 public URLs；抓取失败必须 fallback to upload；不得绕过登录、DRM、paywall 或平台访问控制。 |
| Children/adult/illegal content | P1 conditional | Terms 和 upload UI 必须禁止 CSAM、non-consensual sexual content、illegal content、harassment/doxxing。 |
| Legal pages | P1 | 必须上线 `/privacy/`、`/terms/`、`/contact/`；建议 `/cookie/` 和 `/refund/` 若用 analytics/payment。 |
| Cookie/analytics | P1 | 未确认 analytics；若使用 GA4/Clarity/ads pixels，需 Cookie Policy 和 consent/notice。 |
| Payments/refunds | P1 | 若推出 scan credits/report export/batch/API，需要 Refund/Cancellation terms。 |
| SEO schema | P2 | Schema 不能暗示 guaranteed accuracy、official status 或 forensic capability。 |

Gate verdict：PASS_WITH_CONDITIONS。当前阶段可交给下游，但所有 P0 条件必须作为实现闸门。

## 4. Brand / IP / Confusion Risk

### 4.1 Facts from upstream

Research 已确认：

- `detectvideo.ai`：同 niche 竞品，标题包含 “AI Video Detector Online | Free Deepfake Checker Tool”。
- `detectvideo.com`：同 niche 竞品，标题包含 “DetectVideo | Check if a Video Is AI-Generated”。
- `detectvideo` 精确词搜索需求弱，但竞品占位明确。

### 4.2 Risk

如果本站在 `detectvideo.vip` 上使用 `DetectVideo` 作为公开品牌、logo、页脚公司名、产品名或 “official” 风格，可能造成：

- 用户误以为与 `detectvideo.ai` / `detectvideo.com` 有关联。
- SEO/广告/社媒推广中的商标或不正当竞争投诉风险。
- 信任风险：用户把竞品评价、退款、隐私承诺混淆到本站。

### 4.3 Required mitigation

- 域名可以暂用 `detectvideo.vip`，但首页 logo/brand/title 建议使用新品牌占位，例如 `[Owner-selected brand] AI Video Detector`，或只用描述性页标题 “AI Video Detector for YouTube & Social Videos”。
- 不使用 “Official DetectVideo”、“DetectVideo™”、“The DetectVideo app”、“DetectVideo API”、“detectvideo official”。
- Footer 添加独立性声明：
  - `This site is independently operated and is not affiliated with detectvideo.ai, detectvideo.com, YouTube, TikTok, Instagram, X, or any video platform.`
- 不模仿竞品视觉、logo、pricing、文案结构或页面布局。
- Copy/Design 阶段必须把 `DetectVideo` 视为 blocked brand term，除非 owner/legal 书面确认。

## 5. AI / Deepfake Detection Claims Policy

### 5.1 Allowed wording

可用表达：

- `preliminary signal`
- `educational screening tool`
- `may indicate AI-generated or manipulated content`
- `likelihood / confidence label`
- `evidence-style report`
- `inconclusive`
- `limitations`
- `not forensic proof`
- `not legal, court, law-enforcement, or moderation proof`
- `compressed videos and edits can cause false positives or false negatives`

示例安全文案：

> Upload a clip or paste a public video link to receive a preliminary AI/deepfake likelihood report with visible evidence and limitations. Results are educational signals, not forensic or legal proof.

> A clean result does not prove a video is authentic. A suspicious result does not prove a video is fake. Use additional sources and professional review for high-stakes decisions.

### 5.2 Prohibited wording

禁止词/表达：

- `100% accurate`
- `guaranteed`
- `definitive proof`
- `forensic-grade`
- `court-ready`
- `law enforcement grade`
- `detects every AI video`
- `prove a video is real/fake`
- `certified authenticity`
- `official detector`
- `best / most accurate` unless backed by current benchmark evidence
- `free forever` unless owner has committed sustainable free plan
- `no data stored` unless backend actually stores nothing
- `private` / `secure` / `anonymous` without precise scope
- `detects Sora/Veo/Kling/Runway with high accuracy` unless provider/model evidence supports it

### 5.3 Result page rules

For `/scan/[scan_id]` and sample reports:

- Dynamic scan pages must be `noindex,nofollow` and excluded from sitemap.
- If mode is `sample` or `manual_checklist`, result must label itself as demo/manual and avoid implying real analysis.
- `verdict` and `confidence` are allowed only when backend confirms real inference and confidence meaning.
- Always show limitations near verdict, not hidden in footer.
- Result labels should include uncertainty:
  - `Likely AI-generated` → acceptable only as likelihood, not proof.
  - `Suspicious / needs review`
  - `Inconclusive`
  - `No strong AI signals detected` instead of `Real` when confidence is limited.

## 6. Data / Privacy Inventory

### 6.1 Data categories expected

| Category | Examples | Sensitivity | Required handling |
|---|---|---:|---|
| Uploaded media | mp4/mov/webm clips, audio, frames | High | Temporary storage, max size/duration, deletion window, no training without opt-in. |
| Public URL input | YouTube/TikTok/Instagram/X URL, page metadata | Medium/High | Store minimal URL metadata; avoid exposing source URL on public HTML; respect platform limits. |
| Scan metadata | scan_id, status, mode, verdict, evidence, timestamps, expires_at | Medium | Noindex result pages; short retention; random unguessable IDs. |
| Technical logs | IP, user agent, rate limit events, errors | Medium | Security/rate-limit purpose; finite retention. |
| Contact data | email/message if contact form exists | Medium | Use only for support/deletion requests; disclose retention. |
| Payment data | Stripe/customer/subscription/credit metadata if paid plans | High | Use payment processor; do not store card numbers. |
| Cookies/analytics | GA4/Clarity/session cookies | Low/Medium | Cookie notice/policy if used; respect opt-out where required. |

### 6.2 Default privacy posture

Unless backend later proves otherwise, use this v1 posture:

- Uploads are temporary and deleted after a short defined retention window. Recommended default: 24 hours for raw uploaded files, 30 days for minimal scan metadata/logs, unless user requests deletion earlier or abuse/security needs require longer logs.
- Uploaded files and extracted frames are not used to train models unless the user gives explicit opt-in in a future version.
- Public scan result pages are not indexed and are accessible only via unguessable scan links.
- Do not show the original uploaded filename, full storage object key, signed URLs, raw third-party provider response, or source URL in indexable HTML.
- Use least-necessary sharing with AI/video analysis providers; disclose providers once selected.

### 6.3 Upload consent checkbox copy

Before upload or URL scan, show an unchecked or explicit consent control:

> I confirm that I have the right to upload or analyze this video or link, and I understand the result is a preliminary signal, not forensic or legal proof.

For link scan:

> I understand that public-link checks may be limited by platform access rules. If the media cannot be fetched, I may need to upload a file I have the right to analyze.

## 7. Third-Party / Subprocessor Mapping

Current known third parties are not finalized. Use placeholders in drafts and update before launch.

| Service | Status | Purpose | Legal page requirement |
|---|---|---|---|
| Cloudflare Pages/Workers/R2/D1/KV/Queues | Planned Cloudflare-first | Hosting, serverless API, upload storage, metadata | Disclose hosting/storage/log processing. |
| AI/video detector provider | Pending | Video/frame/audio analysis | Must disclose provider category/name, data sent, retention, no-training terms if available. |
| Payment provider (e.g. Stripe) | Pending | Paid scan credits/report export/API | Terms + Refund + payment privacy disclosure. |
| Analytics (GA4/Clarity/etc.) | Pending | Product analytics | Privacy/Cookie disclosure; cookie notice where needed. |
| Email/contact provider | Pending | Support/deletion requests | Privacy disclosure and contact retention. |

Do not claim “we never share data with third parties” if Cloudflare, AI providers, analytics, payment or email services are used.

## 8. Social URL Fetching Policy

Allowed v1 positioning:

- User may paste public YouTube/TikTok/Instagram/X/social links.
- The tool may attempt to inspect public metadata or process the media only when technically and legally available.
- If fetching is unavailable or restricted, user is told to upload a copy they have the right to analyze.

Required boundaries:

- Do not bypass login walls, private accounts, DRM, paywalls, platform rate limits, robots/access restrictions, or anti-scraping controls.
- Do not ask users for platform passwords, cookies, session tokens, or private video credentials.
- Do not promise support for every YouTube/TikTok/Instagram link.
- Do not imply affiliation with YouTube, TikTok, Instagram, X, Meta, Google, OpenAI, Sora, Veo, Kling, Runway or any generator/platform.

Safe copy:

> Public link checks depend on platform availability and access limits. We do not bypass login, paywall, DRM, or private-account restrictions. If a link cannot be processed, upload a file you have the right to analyze.

## 9. User Content / Safety Policy

Terms and upload UI must prohibit use involving:

- Child sexual abuse material (CSAM) or sexual content involving minors.
- Non-consensual intimate imagery, sexual deepfakes, revenge porn, voyeurism.
- Doxxing, harassment, stalking, blackmail, threats, extortion.
- Illegal surveillance, unauthorized access, stolen/private videos.
- Content that violates platform terms or intellectual property rights.
- Malware, attempts to abuse the upload/API pipeline, excessive automated requests.
- High-impact automated decisions: employment, housing, credit, education admissions, insurance, law enforcement, immigration, medical, legal determinations, content bans without human review.

Operational requirements:

- Add report-abuse/contact flow.
- Add rate limits and file-size/duration limits before real upload launch.
- Keep a moderation/escalation procedure for illegal content reports.
- For obvious illegal content handling, do not expose or redistribute content; preserve only minimal logs required by law/provider policy.

## 10. Required Legal Routes

### 10.1 Routes

Required before any public launch:

- `/privacy/` — Privacy Policy
- `/terms/` — Terms of Use
- `/contact/` — Contact / deletion / abuse reports

Required if analytics/cookies beyond strictly necessary are used:

- `/cookie/` or Cookie section inside `/privacy/`, plus footer link or banner as appropriate.

Required if any paid plan, credit purchase, subscription, API access, or report export is sold:

- `/refund/` or Refund/Cancellation section inside `/terms/`, with clear checkout link.

### 10.2 Footer links

Every indexable page and scan page footer must link:

- Privacy
- Terms
- Contact
- Cookie Policy if applicable
- Refund Policy if paid features exist

### 10.3 Redirects / canonical

If route names differ, set 301/308 redirects from common paths:

- `/privacy-policy/` → `/privacy/`
- `/terms-of-use/` → `/terms/`
- `/cookies/` → `/cookie/` if used
- `/refund-policy/` → `/refund/` if used

## 11. Privacy Policy Draft Requirements

The actual `/privacy/` page should include these sections in US English:

1. Who we are
   - Independent AI video/deepfake screening site.
   - Not affiliated with video platforms or similarly named competitors.

2. Information we collect
   - Videos/files user uploads.
   - Public video URLs user submits.
   - Scan metadata and results.
   - Contact/support data.
   - Technical logs and cookies/analytics if used.
   - Payment metadata if paid plans launch.

3. How we use information
   - To create and process scans.
   - To display scan status/results.
   - To prevent abuse/security incidents.
   - To respond to support/deletion requests.
   - To improve product analytics in aggregate.

4. Uploads and retention
   - State exact raw file retention once backend confirms.
   - Recommended default: raw uploaded media deleted within 24 hours; scan metadata/logs retained up to 30 days unless needed for security/legal reasons.
   - Results expire via `expires_at`.

5. AI analysis and training
   - `We do not use uploaded videos to train AI models unless we ask for and receive your explicit opt-in.`
   - If a third-party provider is used, disclose that videos/frames/audio/metadata may be sent to that provider for analysis.

6. Sharing / subprocessors
   - Cloudflare hosting/storage/logs.
   - AI provider once selected.
   - Payment/analytics/email if used.
   - Legal/security disclosures if required.

7. User choices
   - Delete request email/form.
   - Opt out of marketing/analytics where applicable.
   - Do not upload content you lack rights to analyze.

8. Children
   - Service is not directed to children under 13.
   - Do not upload videos of minors without appropriate rights/consent.
   - Strict prohibition on CSAM/sexual content involving minors.

9. Security
   - Reasonable safeguards but no absolute guarantee.

10. International users
   - Data may be processed in the US or other locations through providers.

11. Contact
   - Use domain email before launch; do not leave Gmail placeholder if avoidable.

## 12. Terms of Use Draft Requirements

The actual `/terms/` page should include these sections in US English:

1. Acceptance of terms.
2. Service description: preliminary AI/deepfake video screening, sample/manual checklist mode if no real detector.
3. No forensic/legal proof:
   - Results are probabilistic, may be wrong, and must not be used as sole basis for high-stakes decisions.
4. User responsibilities:
   - User must have rights/permission to upload or analyze submitted videos/links.
   - User must comply with platform terms and law.
5. Prohibited uses:
   - Illegal, abusive, adult/children, non-consensual, harassment, doxxing, platform bypass, high-impact decision uses.
6. Upload/link limitations:
   - Public-link processing may fail; service does not bypass restrictions.
7. AI/provider limitations:
   - Compressed, edited, low-resolution or screen-recorded videos may produce unreliable signals.
8. Accounts/payment if introduced:
   - Credits/subscriptions/API access, cancellation, refunds, chargebacks, taxes.
9. Intellectual property:
   - Site content belongs to owner; user retains submitted media rights but grants temporary license to process for scan.
10. Disclaimers and limitation of liability.
11. Termination/suspension for abuse.
12. Changes to service/terms.
13. Contact.

Required clause:

> You may not use the Service as the sole basis for decisions involving employment, credit, housing, education, insurance, legal proceedings, law enforcement, immigration, medical treatment, platform bans, or other high-impact outcomes.

## 13. Cookie Policy Requirements

If only strictly necessary cookies are used, a cookie section in Privacy may be sufficient.

If GA4, Microsoft Clarity, ads pixels, affiliate tracking, session replay, A/B testing, or marketing cookies are used:

- Add `/cookie/` or a clear Cookie Policy section.
- Disclose cookie categories:
  - Strictly necessary
  - Analytics/performance
  - Functional
  - Advertising/marketing if any
- Explain opt-out or browser controls.
- Consider banner/consent mechanism depending on traffic jurisdictions and tool configuration.

Do not add Clarity/session replay on upload/result pages until privacy language explicitly covers session replay and masking sensitive fields.

## 14. Refund / Payment Requirements

Pricing is not finalized. If no paid feature launches, state “No paid services are currently offered” or omit refund page until payment exists.

If paid scan credits, report export, batch checks, subscriptions or API waitlist payments launch, require:

- Checkout page links Terms, Privacy, Refund/Cancellation.
- Refund policy says whether unused credits are refundable, expiration, abuse exceptions, duplicate charge handling.
- Subscription cancellation path if recurring.
- No “forensic-grade” pricing claims.
- Payment processor disclosure: card data handled by provider; site does not store full card numbers.

Safe default refund draft:

> If we offer paid scan credits, unused credits may be eligible for refund within 14 days of purchase unless the account shows abuse, fraud, or violation of the Terms. Completed scans and exported reports are generally non-refundable because compute and provider costs are incurred when the scan runs. This policy must be replaced with the final checkout terms before launch.

## 15. Page-by-Page Compliance Notes

| Route | Compliance requirements |
|---|---|
| `/` | Above-the-fold disclaimer line; no public DetectVideo brand; link privacy/terms/contact; no fake scan result. |
| `/ai-video-detector/` | Accuracy/limitations section; FAQ says not forensic/legal proof; avoid “best/most accurate” unless evidenced. |
| `/youtube-ai-video-detector/` | Public-link limitation and no platform affiliation; fallback to upload; no bypass claims. |
| `/deepfake-video-detector/` | Avoid biometric certainty; state clean result does not prove authenticity; prohibit harmful deepfake uses. |
| `/ai-generated-video-detector/` | Do not claim generator-specific accuracy without model evidence. |
| `/video-authenticity-checker/` | Educational checklist framing; professional forensics for high-stakes use. |
| `/check-video-ai-or-not/` | Simple language but keep “may be / signals / inconclusive”. |
| `/sample-report/` | Label every example as sample/demo; no implied real scan. |
| `/scan/[scan_id]` | noindex,nofollow; unguessable ID; limitations near verdict; expires_at; no public storage keys/source URL leak. |
| `/privacy/` | Must match real data flows and providers; include retention/deletion/training language. |
| `/terms/` | Must include disclaimers, prohibited uses, user rights to upload, platform-link limitations. |
| `/contact/` | Must support deletion, abuse report, rights complaint, support. |
| `/api/*` | noindex; consent required; input validation; rate limits; no secrets in responses. |

## 16. Schema / SEO Claim Rules

Schema is allowed only if it mirrors truthful page content.

Allowed:

- WebApplication/SoftwareApplication with category `UtilityApplication` or `MultimediaApplication`.
- FAQPage answering limitations and privacy questions.
- HowTo only for educational/manual steps.

Not allowed:

- AggregateRating, Review, `bestRating`, “most accurate” unless real user reviews and policy compliance exist.
- Claiming official affiliation with platforms/generators.
- `medical`, `legal`, `forensic`, `law enforcement` service categories.
- Offers that say free/unlimited if pricing/limits are not final.

## 17. Implementation Requirements for Backend/Data

Before enabling real uploads/API:

- Define max file size, max duration, accepted MIME/extensions.
- Validate MIME server-side; do not rely on filename.
- Generate unguessable scan IDs; avoid sequential IDs.
- R2 object keys must not expose user identity or original file names.
- Presigned upload URLs must expire quickly.
- Store `created_at` and `expires_at`; enforce deletion job.
- Rate limit by IP/session and maybe account/credit once accounts exist.
- Log abuse events without storing unnecessary media.
- Decide provider/model and document:
  - input sent (frames/audio/full video/metadata),
  - provider retention,
  - no-training setting,
  - region if known,
  - cost and failure modes.
- Use `mode: sample|manual_checklist|provider_inference` exactly as PRD/route contract states.
- If mode is not `provider_inference`, do not return real verdict/confidence.

## 18. UX / Copy Mandatory Disclaimers

Place these in UI:

### Hero/trust line

`Educational signal, not forensic proof.`

### Upload/link consent

`I have the right to upload or analyze this video/link and understand the result is a preliminary signal, not legal or forensic proof.`

### Result page banner

`This report is a preliminary AI/deepfake likelihood signal. It can be wrong, especially for compressed, edited, low-resolution, or screen-recorded videos. Do not use it as the sole basis for legal, safety, employment, moderation, or other high-impact decisions.`

### Link limitation

`Public-link checks depend on platform availability. We do not bypass login, paywall, DRM, private-account, or platform access restrictions.`

### Sample report label

`Sample report only — this is demo content and not an analysis of your video.`

### Brand independence footer

`This site is independently operated and is not affiliated with detectvideo.ai, detectvideo.com, YouTube, TikTok, Instagram, X, Meta, Google, OpenAI, Runway, Kling, Veo, or any video platform or AI model provider.`

## 19. QA Compliance Checklist

QA must fail launch if any P0 item is missing.

### P0 launch blockers

- [ ] Public brand/logo/title does not use `DetectVideo` / `detectvideo` as product mark unless owner/legal confirms.
- [ ] No page promises guaranteed, forensic, court-ready, law-enforcement-grade, or definitive detection.
- [ ] No fake result/verdict/confidence in sample/manual mode.
- [ ] Real upload disabled unless Privacy/Terms/retention/deletion/provider disclosures are present.
- [ ] `/scan/[scan_id]` has `noindex,nofollow`, is absent from sitemap, and does not leak object keys/signed URLs.
- [ ] Upload/link consent text appears before scan creation.
- [ ] Terms prohibit CSAM, non-consensual sexual content, illegal content, harassment/doxxing, platform bypass and high-impact decision use.

### P1 must fix before public marketing

- [ ] `/privacy/`, `/terms/`, `/contact/` exist and are linked from footer.
- [ ] Cookie/analytics disclosure matches actual tools.
- [ ] Refund/cancellation policy exists if paid credits/subscriptions/API are sold.
- [ ] YouTube/TikTok/Instagram/X pages say public-link checks can fail and are unaffiliated with those platforms.
- [ ] Sample report is clearly labeled demo/sample.
- [ ] FAQ includes “Is this forensic/legal proof?” with answer “No.”

### P2 follow-up

- [ ] Domain email configured for contact/deletion requests.
- [ ] Abuse report workflow documented.
- [ ] Provider DPA/subprocessor information reviewed.
- [ ] Benchmarks or evaluation docs prepared before any accuracy percentage is published.

## 20. Downstream Handoff

### For copy_bot

- Use `may`, `signals`, `likelihood`, `preliminary`, `inconclusive`.
- Do not use `DetectVideo` as brand; use owner-selected brand placeholder or descriptive title.
- Include disclaimers on every tool/landing/result page.
- Write FAQ around limitations, public-link limits, retention, and not legal proof.

### For design_bot

- Make limitations/disclaimer visible, not hidden in tiny footer.
- Do not imitate detectvideo.ai / detectvideo.com visual identity.
- Result UI must visually separate verdict, evidence, limitations, and next steps.
- Consent and privacy note must be near upload/link inputs.

### For frontend_bot

- Implement legal footer links site-wide.
- Ensure dynamic scan routes are noindex and absent from sitemap.
- Use route contract canonical strategy.
- Add sample/manual mode labels in UI.

### For backend_bot

- Do not enable provider_inference unless a real provider/model is configured and documented.
- Enforce retention deletion and rate limits before accepting user uploads.
- Consent required in `POST /api/scans`.
- Never return storage object keys, signed URLs, secrets, or raw provider payloads to public pages.

### For seo_bot

- Avoid “official”, “best”, “most accurate”, “100%”, “guaranteed”, “forensic”.
- Schema must not imply legal/forensic service or platform affiliation.
- Include noindex rules in robots/sitemap QA.

### For ops_bot / launch

- Do not launch production upload/scan until Cloudflare/DNS/secrets/provider/retention/legal pages are verified.
- If launching static MVP, disable real uploads and mark sample/manual checklist clearly.
- Public launch still needs owner confirmation.

## 21. Open Owner Decisions

These do not block copy/design drafts but block production launch or exact public claims:

1. Final public brand/logo: choose non-confusing brand; confirm whether `detectvideo.vip` is acceptable as domain despite competitor confusion.
2. Real detector provider/model: choose provider or confirm sample/manual checklist MVP only.
3. Upload limits: max size, max duration, MIME types.
4. Retention: raw media retention, scan metadata retention, deletion request SLA.
5. Third-party analytics: GA4/Clarity/Bing/GSC or none.
6. Pricing/payment: free scans, credits, subscriptions, refund/cancellation rules.
7. Contact email/domain mailbox for privacy/deletion/abuse requests.

## 22. Acceptance Self-Check

- [x] Claims/IP/privacy/terms/source policy reviewed.
- [x] AI/deepfake/video detector disclaimers specified.
- [x] No forensic/legal/court proof claims allowed.
- [x] Brand confusion risk with `detectvideo.ai` / `detectvideo.com` handled.
- [x] Upload video privacy, retention, third-party sharing and no-training policy specified.
- [x] Children/adult/illegal content and high-impact decision restrictions specified.
- [x] URL fetching boundaries specified.
- [x] Privacy/Terms/Cookie/Refund requirements specified.
- [x] QA checklist and downstream handoff provided.

## 23. Final Compliance Handoff Summary

### 当前结论

- 状态：DONE / PASS_WITH_CONDITIONS
- 一句话结论：detectvideo.vip 可以继续进入下游阶段，但必须避免 DetectVideo 品牌混淆、禁止任何司法/取证级或确定性检测承诺；真实上传/URL 检测上线前必须补齐 retention、deletion、provider、Terms/Privacy/Cookie/Refund 和安全边界。

### 本阶段交付物

- `/root/projects/detectvideo/compliance.md`

### 质量门槛自检

- 通过项：品牌混淆、AI/deepfake claim、上传隐私、URL 抓取、儿童/成人/违法内容、Terms/Privacy/Cookie/Refund、QA checklist 均已覆盖。
- 未通过项：真实 provider/model、上传限制、retention、analytics、pricing/refund、最终品牌仍待 owner/backend/pricing 确认。

### 风险

- P0：品牌混淆；虚假/确定性检测结果；未披露的真实上传/第三方处理。
- P1：社交平台 URL 抓取边界；CSAM/非自愿成人内容/违法内容滥用；Cookie/支付政策缺失。
- P2：Schema/SEO 夸大表达、domain email 和 abuse workflow 待完善。

### 给下游的最小必要信息

- 必须读取：`/root/projects/detectvideo/compliance.md`、`/root/projects/detectvideo/prd.md`、`/root/projects/detectvideo/route-contract.md`。
- 不能假设：不能假设真实 detector、不能假设 `DetectVideo` 可作品牌、不能假设可以绕过平台限制抓取 URL、不能假设可保存用户视频用于训练。
- 下游默认策略：若无真实 detector/provider，做 sample/manual checklist + educational report；禁止输出用户视频真实 verdict/confidence。

[DONE]
