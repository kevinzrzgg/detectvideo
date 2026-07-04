# detectvideo.vip — Cloudflare Backend/API Plan v1

- Project: detectvideo（内部项目名）
- Public domain: `detectvideo.vip`（owner 已购买；DNS/Cloudflare/生产部署待确认）
- Public brand rule: do not use `DetectVideo` / `detectvideo` as public product brand, logo, title mark, or official source label unless owner/legal later confirms.
- Target market: US / English
- Stage: 08 backend/data
- Status: DONE_WITH_CONDITIONS
- Generated at: 2026-07-03T14:03:13Z
- Main data contract: `/root/projects/detectvideo/data-contract.md`

## 0. Executive conclusion

Recommended Cloudflare-first backend architecture:

- Cloudflare Pages for marketing/SEO/static frontend.
- Pages Functions or Workers for `/api/*`.
- D1 for scan metadata, evidence, waitlist, entitlement, audit, abuse events.
- R2 for temporary raw uploaded video and any derived media artifacts.
- Queues for future async provider inference.
- KV only for low-risk config/rate-limit/cache flags if needed; D1 remains the source of truth for scan metadata.
- Turnstile optional when abuse appears.
- No payment checkout in MVP.
- No real provider inference until provider/model/cost/retention/legal disclosure are confirmed.

This plan supports two phases:

1. MVP safe phase: sample/manual checklist + early access; no real upload processing, no real inference, no payment.
2. Future provider phase: real uploads/URL attempts + queued provider inference + retention deletion + entitlement/rate limits, only after owner/compliance/backend approve.

## 1. Architecture

```text
Browser / Cloudflare Pages
  |
  | static SEO pages, result shell, sample/manual UI
  v
Cloudflare Pages Functions or Worker
  |-- GET  /api/config
  |-- POST /api/uploads/presign       [future/blocked until upload limits confirmed]
  |-- POST /api/scans                 [MVP manual/sample; future queues provider job]
  |-- GET  /api/scans/:scan_id
  |-- DELETE /api/scans/:scan_id      [future deletion workflow]
  |-- POST /api/early-access
  |
  |-- D1: metadata, evidence, entitlements, early access, audit/abuse
  |-- R2: temporary raw uploads / derived artifacts (private)
  |-- Queue: detectvideo-scan-jobs (future provider inference)
  |-- KV: optional config/rate-limit lightweight cache
  v
Future Provider Worker / Queue Consumer
  |-- validates job + fetches private R2 object
  |-- calls real detector provider only if configured
  |-- writes normalized evidence/result to D1
  |-- deletes/marks raw media according to retention
```

## 2. Environment and bindings

### 2.1 Worker bindings

Recommended Wrangler binding names:

```toml
[[d1_databases]]
binding = "DB"
database_name = "detectvideo"
database_id = "OWNER_DECISION_REQUIRED"

[[r2_buckets]]
binding = "UPLOADS_BUCKET"
bucket_name = "detectvideo-uploads-preview"

[[queues.producers]]
binding = "SCAN_QUEUE"
queue = "detectvideo-scan-jobs"

[[queues.consumers]]
queue = "detectvideo-scan-jobs"
max_batch_size = 5
max_batch_timeout = 30

[[kv_namespaces]]
binding = "CONFIG_KV"
id = "OWNER_DECISION_REQUIRED"
```

### 2.2 Environment variables / secrets checklist

Do not commit secret values. Only names belong in code/docs.

Required for safe MVP:

| Name | Type | Purpose | Required now |
|---|---|---|---|
| `ENVIRONMENT` | var | `preview` / `production` capability flags | yes |
| `PUBLIC_BASE_URL` | var | canonical/result URL construction | yes before deploy |
| `SESSION_SECRET` | secret | sign deletion/access proof tokens if implemented | only if token/session flow ships |
| `ADMIN_API_TOKEN` | secret | optional admin/manual backfill endpoint protection | only if admin endpoints ship |

Future real upload/provider:

| Name | Type | Purpose | Required before feature |
|---|---|---|---|
| `UPLOADS_BUCKET` | binding | R2 private temporary media | real upload |
| `PROVIDER_API_KEY` | secret | real detector provider | provider inference |
| `PROVIDER_API_BASE` | var | provider endpoint | provider inference |
| `PROVIDER_MODEL_ID` | var | model/version disclosure | provider inference |
| `PROVIDER_NO_TRAINING_CONFIRMED` | var | compliance flag | provider inference |
| `TURNSTILE_SECRET_KEY` | secret | abuse mitigation | if Turnstile enabled |

Future payment is intentionally not configured in MVP. If later enabled, add only after pricing/compliance update:

- `PAYMENT_PROVIDER`
- `STRIPE_SECRET_KEY` / Creem / PayPal equivalent
- webhook signing secret
- product/price IDs

## 3. D1 schema and migration draft

File recommendation for implementation:

```text
migrations/0001_detectvideo_backend.sql
```

Migration draft:

```sql
-- 0001_detectvideo_backend.sql
-- Cloudflare D1 / SQLite schema for detectvideo backend metadata.
-- No secrets, no raw provider payloads, no full signed URLs.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS scans (
  scan_id TEXT PRIMARY KEY,
  input_type TEXT NOT NULL CHECK (input_type IN ('upload', 'url')),
  submitted_url_redacted TEXT,
  submitted_url_hash TEXT,
  original_filename_safe TEXT,
  upload_id TEXT,
  r2_object_key TEXT, -- server-only; never returned by public API
  status TEXT NOT NULL CHECK (status IN ('created', 'queued', 'processing', 'completed', 'failed', 'unsupported', 'expired', 'deleted')),
  mode TEXT NOT NULL CHECK (mode IN ('sample', 'manual_checklist', 'provider_inference')),
  verdict TEXT CHECK (verdict IN ('likely_ai', 'suspicious', 'inconclusive', 'likely_real')),
  confidence_score REAL CHECK (confidence_score IS NULL OR (confidence_score >= 0 AND confidence_score <= 1)),
  confidence_label TEXT CHECK (confidence_label IN ('low', 'medium', 'high')),
  error_code TEXT,
  error_message_safe TEXT,
  provider_name TEXT,
  provider_model_id TEXT,
  provider_run_id TEXT,
  request_ip_hash TEXT,
  user_agent_hash TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  raw_media_expires_at TEXT,
  deleted_at TEXT,
  CHECK (
    (mode = 'provider_inference')
    OR (verdict IS NULL AND confidence_score IS NULL AND confidence_label IS NULL)
  )
);

CREATE INDEX IF NOT EXISTS idx_scans_status ON scans(status);
CREATE INDEX IF NOT EXISTS idx_scans_created_at ON scans(created_at);
CREATE INDEX IF NOT EXISTS idx_scans_expires_at ON scans(expires_at);
CREATE INDEX IF NOT EXISTS idx_scans_raw_media_expires_at ON scans(raw_media_expires_at);
CREATE INDEX IF NOT EXISTS idx_scans_url_hash ON scans(submitted_url_hash);

CREATE TABLE IF NOT EXISTS scan_evidence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scan_id TEXT NOT NULL REFERENCES scans(scan_id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'visual_artifact',
    'temporal_consistency',
    'face_lip_sync',
    'audio_voice',
    'metadata',
    'compression_caveat',
    'link_fetch_limit',
    'manual_source_check',
    'manual_context_check',
    'provider_note'
  )),
  label TEXT NOT NULL,
  summary TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'low', 'medium', 'high')),
  status TEXT NOT NULL CHECK (status IN ('not_run', 'checked', 'limitation', 'needs_review', 'provider_pending', 'sample')),
  caveat TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_scan_evidence_scan_id ON scan_evidence(scan_id);

CREATE TABLE IF NOT EXISTS scan_limitations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scan_id TEXT NOT NULL REFERENCES scans(scan_id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS scan_next_steps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scan_id TEXT NOT NULL REFERENCES scans(scan_id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS entitlements (
  entitlement_id TEXT PRIMARY KEY,
  subject_hash TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('free_mvp', 'early_access', 'starter_pack', 'pro_pack', 'agency_contact')),
  payment_status TEXT NOT NULL CHECK (payment_status IN ('none', 'pending', 'paid', 'refunded', 'chargeback')),
  scan_mode_allowed TEXT NOT NULL CHECK (scan_mode_allowed IN ('sample', 'manual_checklist', 'provider_inference')),
  monthly_scan_limit INTEGER,
  scan_pack_remaining INTEGER,
  max_upload_mb INTEGER,
  max_video_seconds INTEGER,
  max_concurrent_jobs INTEGER,
  report_export_allowed INTEGER NOT NULL DEFAULT 0,
  history_days INTEGER,
  api_access TEXT NOT NULL CHECK (api_access IN ('none', 'waitlist', 'approved')),
  support_level TEXT NOT NULL CHECK (support_level IN ('self_serve', 'priority', 'agency')),
  provider_payment_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  expires_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_entitlements_subject_hash ON entitlements(subject_hash);
CREATE INDEX IF NOT EXISTS idx_entitlements_plan ON entitlements(plan);

CREATE TABLE IF NOT EXISTS early_access_requests (
  request_id TEXT PRIMARY KEY,
  email_hash TEXT NOT NULL,
  email_encrypted TEXT, -- optional; encrypt if storing reversible email
  role TEXT,
  use_case TEXT,
  expected_volume TEXT,
  needs_json TEXT NOT NULL DEFAULT '[]',
  consent_to_contact INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_early_access_email_hash ON early_access_requests(email_hash);
CREATE INDEX IF NOT EXISTS idx_early_access_created_at ON early_access_requests(created_at);

CREATE TABLE IF NOT EXISTS audit_events (
  event_id TEXT PRIMARY KEY,
  actor_type TEXT NOT NULL CHECK (actor_type IN ('system', 'admin', 'user', 'provider')),
  actor_hash TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_events(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_events(created_at);

CREATE TABLE IF NOT EXISTS abuse_events (
  event_id TEXT PRIMARY KEY,
  ip_hash TEXT,
  user_agent_hash TEXT,
  event_type TEXT NOT NULL,
  route TEXT,
  scan_id TEXT,
  reason TEXT NOT NULL,
  action_taken TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_abuse_ip_hash ON abuse_events(ip_hash);
CREATE INDEX IF NOT EXISTS idx_abuse_created_at ON abuse_events(created_at);
```

## 4. API implementation behavior

Use `/root/projects/detectvideo/data-contract.md` as source of truth for request/response examples. Implementation rules:

### 4.1 Capability gating

`GET /api/config` must be the frontend's source for launch capabilities.

Initial MVP recommended config:

```json
{
  "real_upload_enabled": false,
  "url_scan_enabled": false,
  "provider_inference_enabled": false,
  "early_access_enabled": true,
  "paid_checkout_enabled": false
}
```

When disabled:

- `POST /api/uploads/presign` returns `UPLOAD_NOT_ENABLED`.
- `POST /api/scans` may create a manual/sample scan shell, but must not pretend the input was analyzed.
- `GET /api/scans/:scan_id` returns `mode: manual_checklist` or `mode: sample` with `verdict: null` and `confidence_*: null`.

### 4.2 Scan id generation

Use cryptographically random, unguessable IDs:

```text
scan_{base64url_or_ulid_random_24_plus_chars}
upl_{base64url_or_ulid_random_24_plus_chars}
req_{base64url_or_ulid_random_16_plus_chars}
```

Do not use sequential numeric IDs for public scan routes.

### 4.3 URL validation

For URL submissions:

- Accept only `https:` scheme.
- Reject localhost, private IP ranges, `.local`, internal hostnames, and non-public protocols.
- Store full URL only if needed and privacy/legal page covers it; otherwise store redacted display URL + hash.
- Do not fetch private/login/paywalled/DRM content.
- If URL fetch fails, return `unsupported` with safe public-link limitation copy.

### 4.4 Upload validation

Before real upload launch, owner/backend must confirm:

- max file size
- max video duration
- accepted MIME/extensions
- retention and deletion SLA
- provider processing scope
- abuse/prohibited-content policy

Technical rules:

- Validate `content-type` and sniff server-side when possible.
- Never trust the browser MIME or extension alone.
- R2 object keys are random and server-generated.
- Presigned upload TTL target: 600 seconds.
- Raw-media lifecycle deletion target: 24 hours unless owner confirms otherwise.

## 5. Worker route pseudo-code

### 5.1 Create manual/sample scan in MVP

```ts
async function createScan(request, env) {
  const body = await request.json();
  validateConsentAndInput(body);

  const now = new Date();
  const scanId = makeId('scan');
  const providerEnabled = env.PROVIDER_INFERENCE_ENABLED === 'true';

  if (!providerEnabled) {
    await env.DB.prepare(`
      INSERT INTO scans (
        scan_id, input_type, submitted_url_redacted, submitted_url_hash,
        original_filename_safe, upload_id, status, mode,
        created_at, updated_at, expires_at
      ) VALUES (?, ?, ?, ?, ?, ?, 'completed', 'manual_checklist', ?, ?, ?)
    `).bind(
      scanId,
      body.input_type,
      redactUrl(body.input_url),
      hashOrNull(body.input_url),
      null,
      body.upload_id ?? null,
      now.toISOString(),
      now.toISOString(),
      addHours(now, 24).toISOString()
    ).run();

    await insertManualChecklistEvidence(env.DB, scanId, now);
    return json({
      scan_id: scanId,
      status: 'completed',
      mode: 'manual_checklist',
      result_url: `/scan/${scanId}`,
      warning: 'Automated detection is not enabled yet; this result uses manual checklist mode and is not a real analysis of the submitted video.'
    }, 201);
  }

  // Future: create queued scan + send queue job.
}
```

### 5.2 Provider queue consumer future

```ts
export default {
  async queue(batch, env, ctx) {
    for (const msg of batch.messages) {
      const job = msg.body;
      const scan = await loadScan(env.DB, job.scan_id);
      if (!scan || scan.mode !== 'provider_inference') {
        msg.ack();
        continue;
      }

      try {
        await markProcessing(env.DB, scan.scan_id);
        const providerResult = await callProviderWithoutLoggingSecrets(scan, env);
        const normalized = normalizeProviderResult(providerResult);
        await saveNormalizedResult(env.DB, scan.scan_id, normalized);
        msg.ack();
      } catch (err) {
        await markProviderFailure(env.DB, scan.scan_id, safeErrorCode(err));
        msg.retry();
      }
    }
  }
}
```

## 6. R2 and retention plan

### 6.1 Buckets

Use private buckets only:

- preview/staging: `detectvideo-uploads-preview`
- production future: `detectvideo-uploads-production`
- optional derived artifacts: `detectvideo-derived-production`

### 6.2 Object lifecycle

Recommended object lifecycle policy:

- raw uploads: delete after 1 day by default
- derived frames/audio: delete after 1 day unless provider debugging requires shorter/explicit retention
- no permanent public media URLs

D1 deletion job should also mark expired/deleted rows:

```sql
UPDATE scans
SET status = 'expired', updated_at = ?
WHERE status NOT IN ('deleted', 'expired')
  AND expires_at < ?;
```

Then delete R2 objects whose `raw_media_expires_at < now` and set `deleted_at` after deletion.

## 7. Security plan

### 7.1 Input and SSRF controls

- URL input: use safe parser, reject private/local targets, only `https:`.
- No user-provided URL should be fetched directly by generic backend without SSRF protections.
- Never accept platform cookies, passwords, session tokens, or private video credentials from user.

### 7.2 Response hygiene

Public APIs must not return:

- `r2_object_key`
- signed upload/download URLs after upload step
- raw provider response
- provider API key/token
- internal exception stack
- admin notes
- full IP/user-agent hashes

### 7.3 Rate limiting

MVP minimum:

- IP/session based soft rate limit for `/api/scans` and `/api/early-access`.
- Turnstile if automated abuse appears.
- Abuse events stored in `abuse_events` without unnecessary media content.

Future provider mode:

- limit concurrent jobs per IP/account/entitlement
- queue backpressure
- provider timeout and retry cap
- paid credits not consumed for backend/provider failure unless policy says otherwise

### 7.4 Admin/audit

Admin/manual actions must write `audit_events`:

- deletion/backfill
- entitlement changes
- provider mode toggles
- manual abuse blocks
- payment entitlement writes future

Do not create public admin routes until auth/security is designed.

## 8. Payment/entitlement plan

MVP:

- No checkout.
- No Stripe/Creem/PayPal secrets required.
- Plan values: `free_mvp` and `early_access` only.
- `payment_status: none`.
- `scan_mode_allowed: manual_checklist` or `sample`.

Future paid:

- Do not enable until pricing/compliance/backend review confirms provider cost, refund/tax, credit consumption policy, and entitlement audit logs.
- Paid entitlement must be server-side only; frontend cannot self-declare plan.
- Future webhook idempotency table should be added when payment provider is chosen.

## 9. Implementation files recommended for frontend/backend

If/when a repo implementation starts, create:

```text
/src/contracts/scan.ts
/src/contracts/errors.ts
/src/data/backend-config.fixture.json
/src/data/sample-scan-result.fixture.json
/src/data/manual-checklist.fixture.json
/functions/api/config.ts
/functions/api/uploads/presign.ts
/functions/api/scans/index.ts
/functions/api/scans/[scan_id].ts
/functions/api/early-access.ts
/migrations/0001_detectvideo_backend.sql
/wrangler.toml
```

For a pure static MVP, frontend can ship fixtures and disabled upload/provider actions first, then wire APIs after Cloudflare setup is confirmed.

## 10. Testing and verification plan

### 10.1 Contract tests

- Validate fixture `sample-scan-result.fixture.json` against `ScanResultV1` schema.
- Assert if `mode !== provider_inference`, then `verdict`, `confidence_score`, `confidence_label` are all null.
- Assert public API response excludes `r2_object_key`, signed URLs, raw provider payload, secrets.
- Assert `/scan/[scan_id]` page metadata is `noindex,nofollow`.

### 10.2 API smoke tests future

```bash
curl -sS "$PUBLIC_BASE_URL/api/config"
curl -sS -X POST "$PUBLIC_BASE_URL/api/scans" \
  -H 'content-type: application/json' \
  --data '{"input_type":"url","input_url":"https://www.youtube.com/watch?v=example","upload_id":null,"consent":true,"requested_mode":"auto"}'
```

Expected MVP response: `mode: manual_checklist`, not `provider_inference`.

### 10.3 D1 migration checks future

```bash
wrangler d1 migrations apply detectvideo --local
wrangler d1 execute detectvideo --local --command "SELECT name FROM sqlite_master WHERE type='table';"
```

### 10.4 QA launch gates

QA should fail if:

- Any user-specific scan in sample/manual mode shows a real verdict/confidence.
- Public pages say `100% accurate`, `proof`, `forensic-grade`, `official`, `unlimited`, or `works on all links`.
- `/scan/*` is in sitemap or indexable.
- API returns object keys/signed URLs/raw provider payload on public result reads.
- Real uploads are enabled before Privacy/Terms/retention/deletion/provider disclosure exist.
- Payment checkout is visible/live in MVP.

## 11. Open owner/backend decisions

These do not block static frontend/sample/manual implementation, but block production real upload/provider/payment launch:

1. Final public brand/logo and whether any `detectvideo` wording can appear outside domain/path context.
2. Cloudflare account/DNS/Pages/Workers/D1/R2/Queues setup and production permission.
3. Real detector provider/model, cost, data sent, provider retention, no-training terms, region, and failure modes.
4. Upload limits: max MB, max duration, MIME types/extensions.
5. Retention/deletion SLA: raw media, derived media, scan metadata, logs.
6. Whether public URL media fetching is technically/legal feasible by platform.
7. Analytics/cookies: GA4/Clarity/Bing/GSC or none.
8. Contact/domain mailbox for privacy/deletion/abuse.
9. Future payment provider, tax/refund/credit consumption rules.

## 12. Downstream handoff summary

### Current conclusion

- Status: DONE_WITH_CONDITIONS
- One-line conclusion: Cloudflare backend/API plan is ready for a safe MVP that supports config, manual/sample scan shell, early-access capture, D1/R2/Queue seams, noindex result pages, and future provider inference without pretending real detection exists.

### Deliverables

- `/root/projects/detectvideo/backend-plan.md`
- `/root/projects/detectvideo/data-contract.md`

### Quality self-check

- [x] Architecture is Cloudflare-first.
- [x] D1 migration draft exists.
- [x] R2 object/retention rules exist.
- [x] Queue/provider future flow exists.
- [x] API endpoints and capability gating are defined.
- [x] Env/secrets checklist names variables only and prints no secrets.
- [x] MVP payment remains disabled.
- [x] Frontend can proceed with sample/manual fixtures and API seams.

### Risks

- P0: enabling real upload/provider without retention/legal/provider disclosure; fake verdict/confidence in sample/manual mode; brand confusion if UI uses `DetectVideo` as product name.
- P1: URL fetching platform restrictions; abuse/rate limits; analytics/cookie mismatch; future payment/refund/tax not defined.
- P2: provider cost and confidence calibration unknown; domain mailbox/GSC/Bing/analytics setup pending.

[DONE]
