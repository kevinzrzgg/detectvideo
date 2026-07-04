# Stage Status — detectvideo

- 00 setup/domain/repo: PARTIAL_UNBLOCKED_DOMAIN_PURCHASED — task t_cc65300e; 域名已购买 `detectvideo.vip`，仍缺 DNS/Cloudflare/GitHub/GSC/Bing/Analytics/生产确认；不阻塞前期调研。
- 01 research: DONE — recovery task t_506b5b37；产物 `/root/projects/detectvideo/research.md`；结论 PASS_WITH_CONDITIONS。
- 02 PRD: DONE — recovery task t_55172a6b；产物 `/root/projects/detectvideo/prd.md` 与 `/root/projects/detectvideo/route-contract.md`；品牌/域名仍需 OWNER_DECISION_REQUIRED，但不阻塞 pricing/compliance。
- 03 pricing: DONE — recovery task t_b1d23284；产物 `/root/projects/detectvideo/pricing.md`；MVP 为免费 intake/sample/manual checklist/waitlist，不接真实支付；所有价格/退款/paid limits 均为 OWNER_DECISION_REQUIRED。
- 04 compliance: DONE — recovery task t_037bfb49；产物 `/root/projects/detectvideo/compliance.md`；结论 PASS_WITH_CONDITIONS（品牌混淆、真实检测能力、上传隐私/retention/provider/法律页为 P0 条件门槛）。
- 05 copy: DONE — recovery task t_7fdd6b64；产物 `/root/projects/detectvideo/copy.md`；SEO copy freeze 已完成，包含 title/meta/H1/H2/FAQ/schema/CTA/pricing/result-state copy；结论 DONE_WITH_CONDITIONS（品牌中性、MVP 免费 preview/sample/manual checklist/waitlist、无真实 provider 前不得输出真实 verdict/confidence/evidence）。
- 06 design: DONE_WITH_CONDITIONS — recovery task t_23afbe5a；产物 `/root/projects/detectvideo/design.md`；完成视觉方向、tokens、页面 IA、wireframes、关键组件、desktop/mobile 行为、交互状态、可访问性、合规摆放、pricing/free preview 表达与 frontend handoff。品牌仍中性占位；无真实 provider 前 UI 只能 sample/manual checklist，不得输出真实 verdict/confidence/evidence。
- 08 backend/data: DONE_WITH_CONDITIONS — task t_53afd347；产物 `/root/projects/detectvideo/data-contract.md` 与 `/root/projects/detectvideo/backend-plan.md`；Data Contract Gate PASS_WITH_CONDITIONS：前端可接 sample/manual MVP 与 API seams，但真实上传/URL抓取/provider_inference/支付仍需 owner/backend/compliance 确认后才能启用。
- 07 frontend: DONE_FOR_REVIEW — task t_286ad01c；产物 `/root/projects/detectvideo/frontend-report.md`、静态前端源码与 `/root/projects/detectvideo/dist/`；已通过 `npm run build` 与 `npm run check`，本地 browser smoke 通过；因当前目录不是 git repo 且 Cloudflare/GitHub/DNS 未确认，Launch 仍 blocked，但 SEO/PM/Compliance/QA 可继续复核。
- 10 SEO recheck: RUNNING_RECOVERY — original task t_12b9039b 因缺失 skill `seo-launch-workflow` 崩溃；已改接 recovery task t_c45201fe，由 seo_bot 处理中。
- 02 PM acceptance: DONE — task t_cb5e2b61；产物 `/root/projects/detectvideo/pm-acceptance.md`；结论 PASS_WITH_CONDITIONS。
- 04 compliance recheck: RUNNING_RECOVERY — original task t_673aff9c 因缺失 skill `compliance` 崩溃；已改接 recovery task t_9980c1da，由 compliance_bot 处理中。
- 09 QA: WAITING_RECHECKS — task t_1fc3b141；依赖 PM acceptance + SEO recovery + Compliance recovery。
- 11 launch: BLOCKED_QA_AND_OWNER_CONFIRMATION — task t_7d89006e.
- 12 review: WAITING_LAUNCH — task t_faf05df7.
