# Project Control Board — detectvideo

项目：detectvideo
域名：detectvideo.vip（老爷已购买；DNS/Cloudflare 接入待确认）
目标市场：US / English
种子词：detectvideo
项目类型：[待确认]（v0 默认按 AI/video detection 意图先跑 Research）
技术栈：Cloudflare-first
商业化：03 pricing 已建议 MVP 免费 intake/sample/manual checklist/waitlist；future paid scan pack / Pro / Agency 均 OWNER_DECISION_REQUIRED。
禁止事项：[待确认]
上线期望：普通
当前模式：automation_factory
当前状态：07_FRONTEND_NEEDS_REVIEW
事实源：Kanban board `detectvideo` + `/root/projects/detectvideo/control/*.md`
启动时间：2026-07-03 18:12 CST

## 学员只需要处理
- [x] 域名已购买：detectvideo.vip
- [ ] GitHub / Cloudflare / DNS 权限是否可用（上线前）
- [ ] GSC / Bing / Analytics 登录态是否可用（上线前）
- [ ] 是否允许生产部署（QA_GO 后确认）
- [ ] 是否允许公开发布/外链提交（Launch 后另行确认）

## 自动流水线
- 00 setup/domain/repo：ops_bot（BLOCKED_SETUP，不阻塞前期调研）
- 01 research：research_bot / keyword-research-agent
- 02 PRD：product_bot / product-definition-prd
- 03 pricing：pricing_bot / site-pricing-calibration
- 04 compliance：compliance_bot / 合规审查
- 05 copy：copy_bot / site-copywriting-student
- 06 design：design_bot / design handoff
- 08 backend/data：backend_bot / Cloudflare-first data contract/API
- 07 frontend：frontend_bot / frontend-site-automation
- 10 SEO：seo_bot / SEO recheck
- 09 QA：qa_bot / acceptance
- 11 launch：ops_bot / Cloudflare launch
- 12 review：review_bot / data review

## 当前状态
- running：07 frontend（t_286ad01c）已完成本地实现，等待 review-required 复核/ unblock
- waiting：10 SEO/rechecks → 09 QA → 11 launch → 12 review
- blocked：00 setup/domain/repo（上线前需要域名/账号/部署确认）；真实上传/provider/payment 仍需 owner/backend/compliance 确认
- done：01 research；02 PRD；03 pricing；04 compliance；05 copy；06 design；08 backend/data
