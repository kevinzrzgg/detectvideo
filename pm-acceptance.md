# detectvideo — PM Acceptance Recheck

## 当前结论

- 状态：PASS_WITH_CONDITIONS
- Gate：PM Gate 通过；当前前端产物存在且覆盖 PRD / Route Contract 的 P0 产品验收要求，可进入 SEO / Compliance / QA 复核。
- 产品路径：`/root/projects/detectvideo/dist/`（静态预览产物），源码在 `/root/projects/detectvideo/src/`、构建脚本在 `/root/projects/detectvideo/scripts/`。
- 不能宣称：不能宣称已上线、已部署、已接入真实 AI video detector、已支持真实上传/URL 抓取或已完成生产 analytics/search console。

## 读取的事实源

- PRD：`/root/projects/detectvideo/prd.md`
- Route Contract：`/root/projects/detectvideo/route-contract.md`
- Frontend Report：`/root/projects/detectvideo/frontend-report.md`
- Frontend source：`/root/projects/detectvideo/src/site-data.mjs`、`/root/projects/detectvideo/src/app.js`
- Built output：`/root/projects/detectvideo/dist/`
- Control handoff/status：`/root/projects/detectvideo/control/handoff.md`、`/root/projects/detectvideo/control/stage-status.md`

## PM Gate 复核结果

| 验收项 | 结果 | 证据 |
|---|---:|---|
| 前端产物存在 | PASS | `dist/` 存在，包含 11 个 indexable route、`sitemap.xml`、`robots.txt`、`_headers`、`404.html`、assets。 |
| Route Contract 覆盖 | PASS | 已覆盖 `/`、`/ai-video-detector/`、`/youtube-ai-video-detector/`、`/deepfake-video-detector/`、`/ai-generated-video-detector/`、`/video-authenticity-checker/`、`/check-video-ai-or-not/`、`/sample-report/`、`/privacy/`、`/terms/`、`/contact/`。 |
| P0 用户任务：用户 10 秒内理解上传/粘贴入口 | PASS | 首页首屏有 upload / public link tab、CTA、sample/manual mode、not forensic proof 提示。 |
| P0 用户任务：无真实 provider 前不伪造检测 | PASS | UI 明确 `Sample report only`、`sample/manual mode`；交互只跳转 `/sample-report/?mode=manual_checklist`，不生成真实 verdict/confidence。 |
| P0 用户任务：consent 与错误态 | PASS | 未勾选 consent 时显示 `CONSENT_REQUIRED`；URL tab 非 https 时源码含 `INVALID_URL`。 |
| SEO 页面矩阵 | PASS | 11 个可索引页面均有 H1、canonical、robots `index,follow`、JSON-LD；sitemap 仅包含可索引静态页。 |
| Dynamic/API noindex | PASS | `robots.txt` disallow `/scan/`、`/api/`；`_headers` 对 `/scan/*` 和 `/api/*` 设置 `X-Robots-Tag: noindex, nofollow`。 |
| 品牌安全 | PASS | 可见品牌使用中性 `AI Video Detector`，未把 `DetectVideo` 作为公共品牌；footer 保留 unaffiliated 说明。 |
| 合规口径 | PASS_WITH_CONDITIONS | 页面持续使用 educational / preliminary / not forensic proof 口径；生产上传、保留、provider disclosure、delete request 仍需 owner/backend/compliance 定闸。 |
| 生产上线条件 | BLOCKED_OUTSIDE_PM | 当前目录不是 git repo；Cloudflare Pages、DNS、GSC/Bing/analytics、contact mailbox 未确认，不能进入 launch。 |

## 实测验证

- `git status --short --branch`：返回 `fatal: not a git repository (or any of the parent directories): .git`。这是 launch/repo 风险，不阻塞 PM 对本地前端产物验收。
- `npm run check`：PASS，输出 `CHECK_PASS html=12 files=17`。
- `npm run build`：PASS，输出 `Built 11 pages to /root/projects/detectvideo/dist`。
- Route audit：PASS，11 个 route 的 H1、canonical、robots、JSON-LD/sample label 抽检通过。
- 本地 browser smoke：PASS，`http://127.0.0.1:4173/` 首页可访问；未勾选 consent 点击 Start Free Preview 出现 `CONSENT_REQUIRED`；勾选后跳转 `/sample-report/?mode=manual_checklist`；browser console/js errors 为 0。

## PM 判断

当前前端实现满足 PRD v1 的 MVP PM 验收：它不是一个假装能检测的“空 SaaS 壳”，而是按 Route Contract 落地了 hybrid tool + SEO landing pages、sample/manual checklist gating、证据报告结构、限制说明、legal/support routes 和 crawler/noindex 基线。

因此 PM Gate 判定为 `PASS_WITH_CONDITIONS`：可以把 `/root/projects/detectvideo/dist/` 交给 SEO、Compliance、QA 做下游复核；不能跳过 owner/ops 的 repo、Cloudflare、DNS、analytics、contact mailbox 与真实 backend/provider 决策。

## 剩余风险 / Owner 需要确认

### P0

1. 当前目录不是 git repo，无法把源码、构建产物、部署版本绑定到 commit。
2. Cloudflare Pages / DNS / production domain / analytics / search console / contact mailbox 未确认。
3. 真实 upload、public URL fetch、provider inference、retention/delete policy 尚未启用；上线前必须由 backend + compliance + owner 重新定闸。
4. 公开品牌/logo 仍需 owner/legal 确认，继续避免使用 `DetectVideo` 作为品牌。

### P1

1. `/` 与 `/ai-video-detector/` 当前为独立 canonical 页面；SEO recheck 需确认是否保留双页策略。
2. 未来若启用 paid scan/report export，需要 pricing/compliance/copy 复核 checkout、refund、tax、credit limits。
3. 未来若启用真实 provider，需要以 benchmark/limitations 更新所有 result copy 与 schema/FAQ。

## 给下游的最小必要信息

- SEO / Compliance / QA 必须从 `/root/projects/detectvideo/dist/` 做本地静态复核。
- 不要把 sample/manual preview 当成真实 AI 检测能力。
- Launch 前必须补齐 GitHub repo、Cloudflare Pages、DNS/canonical domain、analytics/search console、contact mailbox、隐私/保留/删除/provider disclosure。
- 生产公开动作（DNS、部署、真实上传、付费、外部提交）必须等 owner 确认。

[DONE]
