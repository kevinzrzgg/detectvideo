# Handoff — detectvideo

## 当前结论
- 状态：[07_FRONTEND_NEEDS_REVIEW]
- 一句话结论：Research 已确认不建议把 `DetectVideo/detectvideo` 作为公开品牌；PRD v1、Route Contract、Pricing v1、Compliance Gate v1、SEO Copy Freeze、Design Source、Backend/Data Contract 和本地 Frontend static preview 已完成。Frontend 已按 sample/manual MVP gating 实现 Cloudflare Pages 静态站、11 个 route、SEO metadata、FAQ/HowTo JSON-LD、sitemap/robots/_headers、consent/error UI 与 preview report flow；`npm run build`、`npm run check` 和本地 browser smoke 通过。当前目录不是 git repo，且 GitHub/Cloudflare/DNS/生产权限未确认，因此需要 review-required 复核，不能宣称已上线/已部署。

## 关键输入
- 种子词：detectvideo
- 市场：US / English
- 域名：detectvideo.vip（已购买；DNS/Cloudflare 接入待确认）
- 技术栈：Cloudflare-first
- 上游 Research：`/root/projects/detectvideo/research.md`

## 当前产物
- PRD v1：`/root/projects/detectvideo/prd.md`
- Route Contract v1：`/root/projects/detectvideo/route-contract.md`
- Pricing v1：`/root/projects/detectvideo/pricing.md`
- Compliance Gate v1：`/root/projects/detectvideo/compliance.md`
- SEO Copy Freeze：`/root/projects/detectvideo/copy.md`
- Design Source + Frontend Handoff：`/root/projects/detectvideo/design.md`
- Backend/Data Contract：`/root/projects/detectvideo/data-contract.md`
- Backend/API Plan：`/root/projects/detectvideo/backend-plan.md`
- Frontend Implementation Report：`/root/projects/detectvideo/frontend-report.md`
- Frontend static source：`/root/projects/detectvideo/package.json`、`/root/projects/detectvideo/src/`、`/root/projects/detectvideo/scripts/`
- Frontend build output：`/root/projects/detectvideo/dist/`

## 必须读取
- `/root/projects/detectvideo/research.md`
- `/root/projects/detectvideo/prd.md`
- `/root/projects/detectvideo/route-contract.md`
- `/root/projects/detectvideo/pricing.md`
- `/root/projects/detectvideo/compliance.md`
- `/root/projects/detectvideo/copy.md`
- `/root/projects/detectvideo/design.md`
- `/root/projects/detectvideo/data-contract.md`
- `/root/projects/detectvideo/backend-plan.md`
- `/root/projects/detectvideo/control/project-control.md`
- `/root/projects/detectvideo/control/stage-dag.md`
- `/root/projects/detectvideo/control/kanban-plan.md`
- Kanban board `detectvideo`

## 不能假设
- 域名已购买：detectvideo.vip；但不能假设 DNS/Cloudflare/生产部署已完成。
- 不能假设可以公开使用 `DetectVideo` / `detectvideo` 作为品牌或 exact-match domain；需要 OWNER_DECISION_REQUIRED。
- 不能宣称上线、部署、收录、真实 API 能力，除非有验证证据。
- 不能在没有真实 detector provider/model 的情况下输出真实 scan verdict、confidence 或 evidence；只能用 sample/manual checklist mode。
- 不能在真实上传/URL 抓取上线前跳过 retention、delete request、provider disclosure、consent、abuse/rate-limit、Cookie/Refund/Terms/Privacy 文案。

## 下游注意
- pricing：DONE；当前文件规定 MVP 不接真实支付，仅 Free preview / sample report / early access；future paid scan pack / Pro / Agency 仅作为 OWNER_DECISION_REQUIRED 规划。
- compliance：重点复核 deepfake/biometric claims、false positive harm、privacy/retention、social URL fetching、not legal/forensic proof。
- design/frontend/backend：必须遵守 PRD 的 NOT-DO、Route Contract 的 noindex/canonical/API contract、Pricing 的 no-payment MVP、Design 的 tokens/IA/states/accessibility 和品牌占位策略。
- compliance gate 已给出 PASS_WITH_CONDITIONS：下游必须把 `DetectVideo` 视为 blocked public brand term，使用 preliminary/educational/not-forensic 口径；若无真实 detector/provider，只能做 sample/manual checklist，不得输出用户视频真实 verdict/confidence。
- copy freeze 已完成：下游设计/前端必须保留各路由 H1、title/meta、FAQ、schema 安全文案、pricing cards、CTA inventory、sample/manual/result-state labels 和 brand independence footer；未来如 owner 确认真实 provider/品牌/支付，再走 copy+compliance 复核。
- design source 已完成：下游 frontend/backend 必须读取 `design.md`；采用中性品牌占位、dark navy/slate + cyan/amber evidence-dashboard 方向；保持 consent、limitations、sample/manual labels、pricing disabled future plan、scan noindex 和 accessibility 要求。
- backend/data 已完成：下游 frontend/QA 必须读取 `data-contract.md` 与 `backend-plan.md`；先按 `GET /api/config` capability gating、`mode: sample|manual_checklist|provider_inference`、ScanResult schema、错误码、fixture 和 noindex scan route 实现。真实 upload/presign/provider_inference/payment 必须保持 disabled，直到 owner/backend/compliance 确认。
- frontend 已完成本地静态 preview：下游 SEO/PM/compliance/QA 请读取 `frontend-report.md`，并从 `dist/` 复核；构建命令 `npm run build`，检查命令 `npm run check`。当前无 git repo/Cloudflare 权限，不能把该状态等同于已部署。
