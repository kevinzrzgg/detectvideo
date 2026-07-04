# detectvideo — Pricing Strategy v1

## 1. 基本信息

- 项目：detectvideo（内部项目名）
- 公开域名：`detectvideo.vip`（owner 已购买；DNS/Cloudflare/生产部署仍待确认）
- 公开品牌：OWNER_DECISION_REQUIRED；下游不得默认使用 `DetectVideo` 作为 public brand，以避免与 detectvideo.ai / detectvideo.com 混淆。
- 当前阶段：03-pricing
- 目标市场：US / English
- 技术栈：Cloudflare-first
- 日期：2026-07-03
- 状态：DONE_WITH_OWNER_DECISIONS_REQUIRED
- 输出文件：`/root/projects/detectvideo/pricing.md`

## 2. 上游输入

已读取：

- `/root/projects/detectvideo/prd.md`
- `/root/projects/detectvideo/route-contract.md`
- `/root/projects/detectvideo/research.md`
- `/root/projects/detectvideo/control/project-control.md`
- `/root/projects/detectvideo/control/stage-status.md`
- `/root/projects/detectvideo/control/handoff.md`

关键上游约束：

1. 没有真实 detector provider/model 前，不得输出真实 verdict、confidence 或 evidence。
2. MVP 不接真实支付，不写死 Stripe、Creem 或任何付款后台。
3. 所有价格、退款政策、付费额度、文件大小/时长、scan limits 都必须标 `OWNER_DECISION_REQUIRED`。
4. 本站定位为 US English `AI Video Detector / Deepfake Video Checker for YouTube & social links`，不是 forensic/legal proof。
5. 免费入口必须能支撑 SEO 用户体验，但不能让未来真实检测成本被滥用打穿。

缺失信息：

- 真实 AI video detection provider/model：OWNER_DECISION_REQUIRED。
- 单次真实检测成本：OWNER_DECISION_REQUIRED。
- 文件上传最大 size/duration、R2 retention、删除策略：OWNER_DECISION_REQUIRED。
- 支付方式、税务、退款窗口、订阅或 scan pack 形态：OWNER_DECISION_REQUIRED。
- 是否允许 publicly sell paid scans：OWNER_DECISION_REQUIRED。

缺失影响判断：当前可以完成 pricing strategy；但不能上线真实付费、不能承诺真实检测额度、不能把任何付费限制写成生产最终值。

## 3. 本阶段结论

一句话结论：MVP 先做免费 intake / sample report / manual checklist / waitlist，不接真实支付；未来商业化建议走 Free → MVP paid scan pack → Pro → Agency/Business contact 的分层，但所有价格、退款和 paid limits 在 owner/provider/backend/compliance 确认前都保持 `OWNER_DECISION_REQUIRED`。

推荐路线：

1. Launch MVP：免费，不收款，只提供 sample/manual checklist 或 waitlist。
2. Provider confirmed 后：先卖小额 scan packs，不先做高承诺订阅。
3. 有真实成本和滥用数据后：再开放 Pro 月度套餐和 Agency contact。
4. 页面文案避免 “forensic-grade”“guaranteed”“definitive”“court-ready”；只说 preliminary signals / evidence-style report / limitations。

## 4. 竞品定价表

| 竞品/替代方案 | 观察到的价格/额度 | 价值锚点 | 对 detectvideo.vip 的启发 |
|---|---:|---|---|
| detectvideo.ai pricing page | Starter €9 / 20 scans；Pro €29 / 100 scans；Agency €99 / 500 scans | scan pack + bigger upload + deeper result sections + report | 直接竞品已有 scan pack 价格锚点；我们不应在无真实 provider 前对标上线付费。 |
| deepfakecheck.io | 页面主张 free / no signup / private | 免费多模态入口 | 免费入口是 SERP 基础预期；但要限制滥用，不承诺真实检测。 |
| Treql | 页面主张 free AI image & video detector；观察到 “个人免费” 类型卖点 | 免费工具获取流量 | 说明免费体验会压低用户付费预期，付费必须绑定报告、批量、历史、API 或高频工作流。 |
| FauxLens | 页面主张 free AI video detector；有 credit/cookie system 字样 | 免费检测 + credit 控制 | credit/限额机制适合未来防滥用，但 MVP 不需要真实支付。 |
| 手动核查/媒体素养 checklist | $0 direct spend，但耗时高，准确性依赖经验 | 教育内容和 checklist 可作为 MVP 价值 | 在无 provider 时，用 manual checklist/sample report 仍能给用户价值并收集需求。 |

竞品单位价格锚点（来自 detectvideo.ai 已公开 pricing page 的页面抓取）：

| Plan | Price | Scans | Implied price/scan |
|---|---:|---:|---:|
| Starter | €9 | 20 | €0.450 |
| Pro | €29 | 100 | €0.290 |
| Agency | €99 | 500 | €0.198 |

注意：以上是竞品观察，不是本站最终定价。本站任何对外价格均为 `OWNER_DECISION_REQUIRED`。

## 5. 成本模型与单位成本

### 5.1 MVP 成本判断

MVP 在无真实 provider 前只做：

- static SEO pages,
- upload/link intake UI,
- sample report,
- manual checklist,
- waitlist/contact capture,
- optional no-result scan shell。

因此 MVP 变量成本应主要来自 Cloudflare Pages/Workers/R2/D1/Queues 的低量使用、表单/email、日志和人工处理，不应发生大规模 GPU/video inference 成本。

MVP 成本结论：可以推进免费版本，但必须设置 abuse guardrails：rate limit、file size placeholder、no real inference、no long retention、no public paid promise。

### 5.2 未来真实检测成本公式

真实 provider 接入后，每次 scan 的 all-in 单位成本应按以下公式核算：

```text
单位成本 per scan = provider inference cost
                 + video download/fetch cost
                 + frame/audio extraction cost
                 + R2 storage/read/write cost
                 + Queue/Worker/D1/KV cost allocation
                 + payment fee allocation（付费用户）
                 + refund/support reserve allocation
                 + abuse/failure reserve
```

关键红线：

- 如果真实 all-in 单位成本 > $0.10/scan，则低价 Pro scan pack 很容易亏损，需要提高价格或降低额度。
- 如果真实 all-in 单位成本 > $0.20/scan，则不建议开放低价自助大额包，应改为 waitlist/contact。
- 如果真实 provider 成本无法估算，则不允许上线真实 paid scan。

### 5.3 参考 guardrail 计算

用类似竞品的价格结构做防亏参考，并假设支付费约 2.9% + $0.30/checkout、退款/支持 reserve 约 10% gross（均待 owner/compliance 确认）：

| Hypothetical plan | Gross | Scans | Net before compute | 0-margin max all-in cost/scan | Target cost for ~60% gross margin |
|---|---:|---:|---:|---:|---:|
| Starter-like | $9 | 20 | $7.54 | $0.377 | $0.151 |
| Pro-like | $29 | 100 | $24.96 | $0.250 | $0.100 |
| Agency-like | $99 | 500 | $85.93 | $0.172 | $0.069 |

解释：Pro 如果卖 100 scans / $29，想保留约 60% 毛利，真实 all-in 单位成本最好控制在约 $0.10/scan 以下。视频 inference 很可能超过这个范围，所以 provider 未确认前不能承诺 paid limits。

## 6. 套餐策略

### 6.1 Launch MVP（推荐当前上线形态）

| Tier | External name | Price | Who it is for | Included value | Limits | CTA |
|---|---|---:|---|---|---|---|
| Free MVP | Free video check preview | $0 | SEO visitors, creators, journalists, students | Sample report, manual checklist, public-link/upload intake, waitlist/contact | OWNER_DECISION_REQUIRED：file size/duration/rate limit/retention；无真实 verdict | Start Free Check / View Sample Report |
| MVP Waitlist | Early access | $0 | 高频用户、记者、小团队、trust & safety leads | Capture use case, requested volume, URL/upload needs, report/export/API interest | No payment；no guaranteed SLA | Join Early Access / Contact Us |

MVP 禁止项：

- 不接真实支付。
- 不写死 Stripe、Creem 或其他 payment provider。
- 不承诺真实 AI detection verdict。
- 不承诺固定 scan quotas。
- 不承诺 legal/forensic validity。

### 6.2 Future paid scan packs（provider confirmed 后才可启用）

所有价格和 paid limits 均为 `OWNER_DECISION_REQUIRED`。以下只作为产品结构建议，不是最终对外价格：

| Tier | Suggested role | Price | Paid limits | Features | CTA |
|---|---|---:|---|---|---|
| Starter Scan Pack | Light verification | OWNER_DECISION_REQUIRED | OWNER_DECISION_REQUIRED：small number of scans, small upload cap, standard queue | real provider scan, evidence report, result link | Buy Starter Pack（only after payment confirmed） |
| Pro Scan Pack | Frequent creator/journalist checks | OWNER_DECISION_REQUIRED | OWNER_DECISION_REQUIRED：higher scan count, higher upload cap, priority queue | deeper evidence, export/share, history | Buy Pro Pack（only after payment confirmed） |
| Agency / Business | Teams, clients, high-volume reviews | OWNER_DECISION_REQUIRED | OWNER_DECISION_REQUIRED：custom scan volume, retention, report export, support | batch workflow, downloadable reports, API waitlist, compliance review | Contact Sales / Apply for Access |

为什么优先 scan packs，而不是月订阅：

- 视频检测单次成本可能高，scan pack 更容易把变量成本和收入绑定。
- SEO 工具站早期用户多为一次性或低频，月订阅转化可能弱。
- provider/model 未确认时，订阅承诺容易造成长期亏损和退款风险。

### 6.3 Future Pro monthly（至少有 30 天真实成本数据后再考虑）

| Tier | Price | Pro 额度上限 | Requirements before launch |
|---|---:|---|---|
| Pro Monthly | OWNER_DECISION_REQUIRED | OWNER_DECISION_REQUIRED：monthly scans, file size, queue priority, export count, history days | Real provider cost known；abuse/rate limits tested；refund/tax/compliance reviewed；backend entitlement implemented |

Pro 额度上限必须包括：

- monthly scan count,
- max upload size,
- max video duration,
- max concurrent jobs,
- report export count,
- history/retention days,
- supported URL platforms,
- fair-use / abuse termination language。

不得使用无边界的“无限量”承诺。

## 7. Free 限额与防滥用建议

MVP Free 建议：

| Area | Recommendation | Owner flag |
|---|---|---|
| Free scan | sample/manual checklist only until real provider exists | OWNER_DECISION_REQUIRED |
| Signup | no signup for viewing sample/checklist；email only for waitlist/report follow-up | OWNER_DECISION_REQUIRED |
| Upload | allow UI preview/intake but do not retain or process real inference unless provider/backend confirmed | OWNER_DECISION_REQUIRED |
| URL paste | accept public URL and explain platform limitations; fallback to upload/manual checklist | OWNER_DECISION_REQUIRED |
| Rate limit | per IP/session/day limit；Cloudflare Turnstile if abuse appears | OWNER_DECISION_REQUIRED |
| Storage | shortest practical retention; disclose deletion flow | OWNER_DECISION_REQUIRED |
| Result page | noindex, no user media in indexed HTML | must follow route-contract |

Future paid abuse controls：

- require account/email for paid packs,
- signed upload URL,
- MIME validation,
- file duration cap,
- queue concurrency cap,
- scan expiry,
- refund abuse policy,
- manual review for Agency/API。

## 8. Refund / tax / payment policy

MVP：

- No payment, no refund flow.
- Pricing section may say “Paid plans are not open yet” or “Join early access”。

Future paid：

| Policy | Recommendation | Status |
|---|---|---|
| Payment processor | Do not hardcode yet; evaluate Stripe/Creem/other later | OWNER_DECISION_REQUIRED |
| Tax | Must be reviewed before selling in US/global markets | OWNER_DECISION_REQUIRED |
| Refund window | Need explicit rule for unused scan credits vs consumed scans | OWNER_DECISION_REQUIRED |
| Failed scans | Failed provider/backend scans should not consume credit, unless abuse is detected | OWNER_DECISION_REQUIRED |
| Inconclusive results | Inconclusive is a valid result, not automatically refundable; copy must set expectation | OWNER_DECISION_REQUIRED |
| Chargeback/fraud | require account and usage logs for paid packs | OWNER_DECISION_REQUIRED |

Do not launch paid checkout until compliance/backend confirm entitlement, audit logs, tax wording and refund copy.

## 9. Pricing page / section copy guidance

MVP pricing section should be honest and conversion-oriented:

Recommended H2：

```text
Start with a free video check preview
```

Recommended copy：

```text
Upload a clip or paste a public video link to see how an evidence-style AI video report works. The current preview is for educational screening and may use sample/manual checklist mode until full automated detection is available.
```

MVP CTA：

- `Start Free Check`
- `View Sample Report`
- `Join Early Access for Real Detection`

Future paid section only after approval：

```text
Paid scan packs are planned for users who need higher volume, report export, and priority processing. Final prices and limits are pending provider cost, abuse testing, and compliance review.
```

Forbidden pricing/copy claims：

- “100% accurate”
- “forensic proof”
- “court-ready”
- “detects every AI video”
- “works on all YouTube/TikTok/Instagram links”
- “no limits”
- “permanent storage”
- “paid checkout live” unless production payment is actually verified

## 10. Backend entitlement建议

MVP entitlement fields：

```json
{
  "plan": "free_mvp|early_access|starter_pack|pro_pack|agency_contact",
  "payment_status": "none|pending|paid|refunded|chargeback",
  "scan_mode_allowed": "sample|manual_checklist|provider_inference",
  "monthly_scan_limit": "OWNER_DECISION_REQUIRED",
  "scan_pack_remaining": "OWNER_DECISION_REQUIRED",
  "max_upload_mb": "OWNER_DECISION_REQUIRED",
  "max_video_seconds": "OWNER_DECISION_REQUIRED",
  "max_concurrent_jobs": "OWNER_DECISION_REQUIRED",
  "report_export_allowed": false,
  "history_days": "OWNER_DECISION_REQUIRED",
  "api_access": "none|waitlist|approved",
  "support_level": "self_serve|priority|agency"
}
```

Implementation notes：

- If `scan_mode_allowed` is not `provider_inference`, UI must visibly label sample/manual mode。
- Dynamic scan result pages must be noindex。
- Paid entitlement must not be inferred from front-end state。
- Failed scans, unsupported URLs and provider timeouts need explicit credit-consumption rules before payment launch。

## 11. 下游交接摘要

### 当前结论

- 状态：DONE_WITH_OWNER_DECISIONS_REQUIRED
- 一句话结论：detectvideo.vip 当前应上线免费 preview / sample report / manual checklist / waitlist，不接真实支付；未来 paid scan pack / Pro / Agency 可以规划，但必须等真实 provider 单位成本、abuse limits、退款/税务/合规和 backend entitlement 确认。

### 本阶段交付物

- 定价报告：`/root/projects/detectvideo/pricing.md`
- 竞品定价锚点：detectvideo.ai Starter/Pro/Agency scan packs；其他竞品以 free/no signup/free detector 为流量锚点。
- 成本模型：已给单位成本公式和 Pro 额度上限红线。
- 套餐矩阵：Free MVP / Early Access / future Starter / future Pro / future Agency。
- 后端 entitlement 字段建议：见第 10 节。

### 已确认项

- MVP 不接真实支付。
- Provider 未确认前只能 sample/manual checklist/waitlist。
- 所有对外价格、退款、paid limits 都是 OWNER_DECISION_REQUIRED。
- 不使用 `DetectVideo` 作为默认 public brand。

### 待确认项

- OWNER_DECISION_REQUIRED：final public brand。
- OWNER_DECISION_REQUIRED：真实 detector provider/model 和单位成本。
- OWNER_DECISION_REQUIRED：free/paid scan limits、file limits、duration limits、retention。
- OWNER_DECISION_REQUIRED：payment provider、refund、tax、chargeback handling。
- OWNER_DECISION_REQUIRED：是否开放 Agency/API contact。

### 给 copy 的最小必要信息

- Pricing section 只能写 Free preview / sample report / early access。
- CTA 用 `Start Free Check`、`View Sample Report`、`Join Early Access`。
- 不写 paid checkout live；不写具体价格，除非 owner 后续确认。

### 给 design 的最小必要信息

- Pricing UI 先做 Free + Early Access + Future Pro/Agency disabled/contact state。
- Paid tiers 可以作为 “planned” 或 “coming soon”，不要像可购买卡片。
- 每张卡必须显示 limits / disclaimer / owner-pending flags。

### 给 backend/data 的最小必要信息

- 先实现 free_mvp / early_access entitlement。
- 真实 provider 前 `scan_mode_allowed` 只能是 sample/manual_checklist。
- paid pack/pro entitlement 字段要预留，但不启用 checkout。

### 给 compliance 的最小必要信息

- 必审：refund, tax, consumer claim, deepfake/biometric claims, privacy/retention, false-positive harm。
- Inconclusive result 是否退款需 owner/compliance 明确。

## 12. 验收清单自检

- [x] 不得出现无边界的无限量承诺。
- [x] 必须有竞品定价表。
- [x] 必须有单位成本公式和红线。
- [x] 必须有 Pro 额度上限定义。
- [x] MVP 不接真实支付。
- [x] 所有价格/退款/paid limits 标 OWNER_DECISION_REQUIRED。
- [x] Provider 未确认前只允许 sample/manual checklist/waitlist。
- [x] 没有把 Stripe/Creem 写死为生产方案。

[DONE]
