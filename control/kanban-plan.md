# Kanban Plan — detectvideo

Board: `detectvideo`
Default workdir: `/root/projects/detectvideo`

| Stage | Owner | Skill | Status | Output |
|---|---|---|---|---|
| 00 setup/domain/repo | ops_bot | site-launch-operations | BLOCKED_SETUP | control/blocked-log.md |
| 01 research | research_bot | keyword-research-agent | READY/RUNNING | research.md |
| 02 PRD | product_bot | product-definition-prd | WAITING_01 | prd.md, route-contract.md |
| 03 pricing | pricing_bot | site-pricing-calibration | WAITING_02 | pricing.md |
| 04 compliance | compliance_bot | compliance | WAITING_02 | compliance.md |
| 05 copy | copy_bot | site-copywriting-student | WAITING_03_04 | copy.md |
| 06 design | design_bot | design handoff | WAITING_05 | design.md |
| 08 backend/data | backend_bot | Cloudflare-first backend/data | WAITING_06 | data-contract.md, API stubs |
| 07 frontend | frontend_bot | frontend-site-automation | WAITING_06_08 | app implementation/preview |
| 10 SEO recheck | seo_bot | SEO launch workflow | WAITING_07 | seo-check.md |
| 02 PM acceptance | product_bot | PM acceptance | WAITING_07 | pm-acceptance.md |
| 04 compliance recheck | compliance_bot | compliance recheck | WAITING_07 | compliance-recheck.md |
| 09 QA | qa_bot | QA acceptance | WAITING_RECHECKS | qa-report.md |
| 11 launch | ops_bot | launch ops | WAITING_QA_AND_OWNER | launch-gates.md |
| 12 review | review_bot | data review | WAITING_LAUNCH | review-plan.md |

执行纪律：完成或 blocked 时由 assignee 自己用中文写 Kanban summary/comment；总控只追踪/转述。
