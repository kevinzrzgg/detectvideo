# detectvideo.vip — Backend/Data Contract v1

- Project: detectvideo（内部项目名）
- Public domain: `detectvideo.vip`（owner 已购买；DNS/Cloudflare/生产部署待确认）
- Public brand rule: do not use `DetectVideo` / `detectvideo` as public product brand, logo, title mark, or official source label unless owner/legal later confirms.
- Target market: US / English
- Stage: 08 backend/data
- Status: DONE_WITH_CONDITIONS
- Generated at: 2026-07-03T14:03:13Z
- Inputs:
  - `/root/projects/detectvideo/prd.md`
  - `/root/projects/detectvideo/route-contract.md`
  - `/root/projects/detectvideo/compliance.md`
  - `/root/projects/detectvideo/pricing.md`
  - `/root/projects/detectvideo/copy.md`
  - `/root/projects/detectvideo/design.md`
- Paired backend plan: `/root/projects/detectvideo/backend-plan.md`

## 0. Gate conclusion

Data Contract Gate: PASS_WITH_CONDITIONS.

Frontend can implement the scan/result shell, sample report, manual checklist, early-access capture, noindex scan routes, and API integration seams from this contract. Production real upload, URL fetching, provider inference, paid checkout, and paid entitlement remain blocked until owner/backend/compliance confirm provider/model, upload limits, retention/deletion, legal pages, secrets, and payment policy.

Non-negotiable data rules:

1. `mode !== "provider_inference"` means no real user-specific verdict, confidence, or evidence. UI must show sample/manual labels.
2. `provider_inference` is allowed only after a real detector provider/model is configured, documented, and compliance-reviewed.
3. Dynamic scan pages are `noindex,nofollow`, excluded from sitemap, and must not expose R2 object keys, signed URLs, raw provider responses, secrets, or full platform cookies/session data.
4. Upload/link consent is required before scan creation.
5. Raw media retention, metadata retention, deletion route, and third-party provider disclosure must match the final production backend before public upload launch.

## 1. Product capability modes

### 1.1 Mode enum

```ts
export type ScanMode =
  | 'sample'
  | 'manual_checklist'
  | 'provider_inference';
```

Mode semantics:

| Mode | Launch availability | Meaning | UI requirement | Result data allowed |
|---|---|---|---|---|
| `sample` | MVP allowed | Demo report explaining report format; not tied to user media. | Show `Sample report only — this is demo content and not an analysis of your video.` | Demo labels only; never represent as user-specific analysis. |
| `manual_checklist` | MVP allowed | Intake accepted or checklist shown, but no automated detector result. | Show sample/manual warning and checklist next steps. | `verdict: null`, `confidence: null`, evidence may be checklist categories with `status: not_run`. |
| `provider_inference` | Future only | Real provider/model processed user media/URL-derived media. | Show preliminary/limitations banner; never forensic/legal proof. | Real likelihood label, confidence label/score only if backend validates meaning. |

## 2. Core machine-readable schema

### 2.1 TypeScript contract

```ts
export type InputType = 'upload' | 'url';

export type ScanStatus =
  | 'created'
  | 'queued'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'unsupported'
  | 'expired'
  | 'deleted';

export type Verdict =
  | 'likely_ai'
  | 'suspicious'
  | 'inconclusive'
  | 'likely_real'
  | null;

export type ConfidenceLabel = 'low' | 'medium' | 'high' | null;

export type EvidenceType =
  | 'visual_artifact'
  | 'temporal_consistency'
  | 'face_lip_sync'
  | 'audio_voice'
  | 'metadata'
  | 'compression_caveat'
  | 'link_fetch_limit'
  | 'manual_source_check'
  | 'manual_context_check'
  | 'provider_note';

export type EvidenceSeverity = 'info' | 'low' | 'medium' | 'high';
export type EvidenceStatus = 'not_run' | 'checked' | 'limitation' | 'needs_review' | 'provider_pending' | 'sample';

export interface EvidenceItem {
  type: EvidenceType;
  label: string;
  summary: string;
  severity: EvidenceSeverity;
  status: EvidenceStatus;
  caveat?: string;
}

export interface ScanResult {
  scan_id: string;
  input_type: InputType;
  submitted_url_redacted: string | null;
  original_filename_safe: string | null;
  status: ScanStatus;
  mode: ScanMode;
  verdict: Verdict;
  confidence_score: number | null;
  confidence_label: ConfidenceLabel;
  evidence: EvidenceItem[];
  limitations: string[];
  next_steps: string[];
  warnings: string[];
  created_at: string;
  updated_at: string;
  expires_at: string;
  result_url: string;
}

export interface EntitlementSnapshot {
  plan: 'free_mvp' | 'early_access' | 'starter_pack' | 'pro_pack' | 'agency_contact';
  payment_status: 'none' | 'pending' | 'paid' | 'refunded' | 'chargeback';
  scan_mode_allowed: ScanMode;
  monthly_scan_limit: number | null;
  scan_pack_remaining: number | null;
  max_upload_mb: number | null;
  max_video_seconds: number | null;
  max_concurrent_jobs: number | null;
  report_export_allowed: boolean;
  history_days: number | null;
  api_access: 'none' | 'waitlist' | 'approved';
  support_level: 'self_serve' | 'priority' | 'agency';
  owner_decision_required: string[];
}
```

### 2.2 JSON Schema: ScanResult v1

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://detectvideo.vip/contracts/scan-result.v1.schema.json",
  "title": "ScanResultV1",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "scan_id",
    "input_type",
    "submitted_url_redacted",
    "original_filename_safe",
    "status",
    "mode",
    "verdict",
    "confidence_score",
    "confidence_label",
    "evidence",
    "limitations",
    "next_steps",
    "warnings",
    "created_at",
    "updated_at",
    "expires_at",
    "result_url"
  ],
  "properties": {
    "scan_id": {
      "type": "string",
      "pattern": "^scan_[A-Za-z0-9_-]{24,64}$"
    },
    "input_type": { "enum": ["upload", "url"] },
    "submitted_url_redacted": { "type": ["string", "null"], "maxLength": 240 },
    "original_filename_safe": { "type": ["string", "null"], "maxLength": 120 },
    "status": { "enum": ["created", "queued", "processing", "completed", "failed", "unsupported", "expired", "deleted"] },
    "mode": { "enum": ["sample", "manual_checklist", "provider_inference"] },
    "verdict": { "enum": ["likely_ai", "suspicious", "inconclusive", "likely_real", null] },
    "confidence_score": { "type": ["number", "null"], "minimum": 0, "maximum": 1 },
    "confidence_label": { "enum": ["low", "medium", "high", null] },
    "evidence": {
      "type": "array",
      "maxItems": 20,
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["type", "label", "summary", "severity", "status"],
        "properties": {
          "type": { "enum": ["visual_artifact", "temporal_consistency", "face_lip_sync", "audio_voice", "metadata", "compression_caveat", "link_fetch_limit", "manual_source_check", "manual_context_check", "provider_note"] },
          "label": { "type": "string", "minLength": 1, "maxLength": 80 },
          "summary": { "type": "string", "minLength": 1, "maxLength": 600 },
          "severity": { "enum": ["info", "low", "medium", "high"] },
          "status": { "enum": ["not_run", "checked", "limitation", "needs_review", "provider_pending", "sample"] },
          "caveat": { "type": "string", "maxLength": 600 }
        }
      }
    },
    "limitations": { "type": "array", "minItems": 1, "items": { "type": "string", "maxLength": 400 } },
    "next_steps": { "type": "array", "items": { "type": "string", "maxLength": 300 } },
    "warnings": { "type": "array", "items": { "type": "string", "maxLength": 300 } },
    "created_at": { "type": "string", "format": "date-time" },
    "updated_at": { "type": "string", "format": "date-time" },
    "expires_at": { "type": "string", "format": "date-time" },
    "result_url": { "type": "string", "pattern": "^/scan/scan_[A-Za-z0-9_-]{24,64}$" }
  },
  "allOf": [
    {
      "if": { "properties": { "mode": { "const": "provider_inference" } } },
      "then": { "properties": { "verdict": { "enum": ["likely_ai", "suspicious", "inconclusive", "likely_real"] } } }
    },
    {
      "if": { "not": { "properties": { "mode": { "const": "provider_inference" } } } },
      "then": { "properties": { "verdict": { "const": null }, "confidence_score": { "const": null }, "confidence_label": { "const": null } } }
    }
  ]
}
```

## 3. API contract

Base path: same origin on Pages/Workers, no public indexing for `/api/*`.

### 3.1 `GET /api/config`

Purpose: give frontend current launch limits and capability flags without exposing secrets.

Response 200:

```json
{
  "status": "ok",
  "environment": "preview|production",
  "capabilities": {
    "real_upload_enabled": false,
    "url_scan_enabled": false,
    "provider_inference_enabled": false,
    "early_access_enabled": true,
    "paid_checkout_enabled": false
  },
  "limits": {
    "allowed_mime_types": ["video/mp4", "video/quicktime", "video/webm"],
    "allowed_extensions": ["mp4", "mov", "webm"],
    "max_upload_mb": null,
    "max_video_seconds": null,
    "presign_ttl_seconds": 600,
    "raw_media_retention_hours": 24,
    "metadata_retention_days": 30
  },
  "copy_flags": {
    "show_sample_manual_warning": true,
    "show_provider_pending": true,
    "show_no_payment_mvp": true
  }
}
```

MVP values: `real_upload_enabled`, `url_scan_enabled`, and `provider_inference_enabled` should stay `false` until backend/compliance confirms production readiness. Frontend may still show the intake UI, but must route to sample/manual flow or early access if capabilities are disabled.

### 3.2 `POST /api/uploads/presign`

Purpose: create short-lived upload authorization for R2 direct upload or Worker-mediated upload.

Status: future/blocked for production real upload until limits/retention/secrets are confirmed. Frontend should not require this endpoint for static MVP.

Request:

```json
{
  "filename": "example.mp4",
  "content_type": "video/mp4",
  "size_bytes": 1234567,
  "duration_seconds": 12,
  "consent": true
}
```

Response 200 when enabled:

```json
{
  "upload_id": "upl_...",
  "object_key_hint": "opaque server-generated key; never display",
  "upload_url": "https://...short-lived...",
  "method": "PUT",
  "headers": {
    "content-type": "video/mp4"
  },
  "expires_at": "2026-07-03T14:13:13Z"
}
```

Response 403 in MVP/sample-only mode:

```json
{
  "error": {
    "code": "UPLOAD_NOT_ENABLED",
    "message": "Real uploads are not enabled yet. Use the sample report or join early access.",
    "safe_user_message": "Real upload processing is not available in this preview. You can view a sample report or join early access."
  }
}
```

Validation:

- Require `consent: true`.
- Validate MIME server-side; do not trust file extension alone.
- Reject oversized files once owner confirms limits.
- Never use original filename in R2 object key.
- Presigned URL TTL target: 10 minutes.

### 3.3 `POST /api/scans`

Purpose: create scan record from uploaded object or public URL.

MVP behavior: returns `manual_checklist` or `sample` mode unless real provider is enabled.

URL request:

```json
{
  "input_type": "url",
  "input_url": "https://www.youtube.com/watch?v=example",
  "upload_id": null,
  "consent": true,
  "requested_mode": "auto"
}
```

Upload request:

```json
{
  "input_type": "upload",
  "input_url": null,
  "upload_id": "upl_...",
  "consent": true,
  "requested_mode": "auto"
}
```

Response 201 in MVP/manual mode:

```json
{
  "scan_id": "scan_0123456789abcdefghijklmnopqr",
  "status": "completed",
  "mode": "manual_checklist",
  "result_url": "/scan/scan_0123456789abcdefghijklmnopqr",
  "warning": "Automated detection is not enabled yet; this result uses manual checklist mode and is not a real analysis of the submitted video."
}
```

Response 201 when provider inference is enabled:

```json
{
  "scan_id": "scan_0123456789abcdefghijklmnopqr",
  "status": "queued",
  "mode": "provider_inference",
  "result_url": "/scan/scan_0123456789abcdefghijklmnopqr"
}
```

Validation and safety:

- Reject missing consent: `CONSENT_REQUIRED`.
- Reject both URL and upload missing: `INPUT_REQUIRED`.
- Reject both URL and upload present unless intentionally supported: `ONE_INPUT_ONLY`.
- URL scheme: only `https:`; reject `http:`, local/private IPs, `file:`, `data:`, `ftp:`, localhost, and internal network ranges.
- Supported public hosts are allowed as user input labels, but actual media fetching remains provider/backend policy. Do not bypass login/paywall/DRM/private restrictions.
- Rate limit by IP/session; add Turnstile if abuse appears.

### 3.4 `GET /api/scans/:scan_id`

Purpose: read current scan/result state.

Response 200 sample/manual:

```json
{
  "scan_id": "scan_0123456789abcdefghijklmnopqr",
  "input_type": "url",
  "submitted_url_redacted": "https://www.youtube.com/...",
  "original_filename_safe": null,
  "status": "completed",
  "mode": "manual_checklist",
  "verdict": null,
  "confidence_score": null,
  "confidence_label": null,
  "evidence": [
    {
      "type": "manual_source_check",
      "label": "Source and context",
      "summary": "Compare the video with original sources, repost history, timestamps, and trusted coverage before sharing.",
      "severity": "info",
      "status": "not_run"
    },
    {
      "type": "link_fetch_limit",
      "label": "Public-link limitation",
      "summary": "Public-link checks depend on platform availability. We do not bypass login, paywall, DRM, private-account, or platform access restrictions.",
      "severity": "info",
      "status": "limitation"
    }
  ],
  "limitations": [
    "This is sample/manual checklist mode, not a real analysis of your video.",
    "Results are preliminary educational signals, not forensic, legal, or moderation proof."
  ],
  "next_steps": [
    "Upload a file only if real uploads are enabled and you have the right to analyze it.",
    "Compare original sources and avoid high-impact decisions from one tool result."
  ],
  "warnings": ["provider_inference_disabled"],
  "created_at": "2026-07-03T14:03:13Z",
  "updated_at": "2026-07-03T14:03:13Z",
  "expires_at": "2026-07-04T14:03:13Z",
  "result_url": "/scan/scan_0123456789abcdefghijklmnopqr"
}
```

Response 200 provider inference future:

```json
{
  "scan_id": "scan_0123456789abcdefghijklmnopqr",
  "input_type": "upload",
  "submitted_url_redacted": null,
  "original_filename_safe": "example.mp4",
  "status": "completed",
  "mode": "provider_inference",
  "verdict": "suspicious",
  "confidence_score": 0.67,
  "confidence_label": "medium",
  "evidence": [
    {
      "type": "temporal_consistency",
      "label": "Temporal consistency",
      "summary": "Several reviewed segments showed motion inconsistency that may deserve manual review.",
      "severity": "medium",
      "status": "checked",
      "caveat": "Compression and edits can create similar artifacts."
    }
  ],
  "limitations": [
    "This is a preliminary likelihood signal, not proof.",
    "Compressed, edited, screen-recorded, or low-resolution video can produce false positives or false negatives."
  ],
  "next_steps": ["Compare the original source and seek professional review for high-stakes decisions."],
  "warnings": [],
  "created_at": "2026-07-03T14:03:13Z",
  "updated_at": "2026-07-03T14:08:13Z",
  "expires_at": "2026-07-04T14:03:13Z",
  "result_url": "/scan/scan_0123456789abcdefghijklmnopqr"
}
```

### 3.5 `DELETE /api/scans/:scan_id`

Purpose: delete user scan media/metadata when supported.

MVP: can return `DELETE_NOT_ENABLED` unless contact/deletion workflow is implemented. Production real upload should implement deletion by scan id + proof token/session.

Response 202:

```json
{
  "status": "accepted",
  "scan_id": "scan_...",
  "message": "Deletion request accepted. Raw media and public result access will be removed according to the retention policy."
}
```

### 3.6 `POST /api/early-access`

Purpose: capture waitlist/team use case without payment.

Request:

```json
{
  "email": "user@example.com",
  "role": "creator|journalist|educator|trust_safety|business|other",
  "use_case": "string",
  "expected_volume": "one_time|weekly|daily|team|api",
  "needs": ["real_detection", "report_export", "batch", "api", "youtube_links", "higher_upload_limit"],
  "consent_to_contact": true
}
```

Response 201:

```json
{
  "status": "created",
  "message": "Thanks — we’ll use your request to prioritize real detection access."
}
```

PII handling: store email/use case only if Privacy page covers contact data. Do not send passwords, platform cookies, private video credentials, or sensitive legal docs through this form.

## 4. Error contract

All API errors use this shape:

```json
{
  "error": {
    "code": "CONSENT_REQUIRED",
    "message": "Developer-readable detail.",
    "safe_user_message": "Please confirm you have the right to upload or analyze this video/link and understand the result is not forensic proof.",
    "request_id": "req_..."
  }
}
```

Error codes:

| HTTP | Code | User-facing behavior |
|---:|---|---|
| 400 | `BAD_REQUEST` | Generic validation issue. |
| 400 | `CONSENT_REQUIRED` | Highlight consent checkbox. |
| 400 | `INPUT_REQUIRED` | Ask user to upload or paste URL. |
| 400 | `ONE_INPUT_ONLY` | Ask user to choose upload or URL, not both. |
| 400 | `UNSUPPORTED_URL` | Show public-link limitation and upload fallback. |
| 400 | `UNSUPPORTED_FILE_TYPE` | Show accepted formats once confirmed. |
| 413 | `FILE_TOO_LARGE` | Show max size/duration once confirmed. |
| 403 | `UPLOAD_NOT_ENABLED` | Route to sample report / early access. |
| 403 | `PROVIDER_INFERENCE_NOT_ENABLED` | Show manual checklist/sample mode. |
| 404 | `SCAN_NOT_FOUND` | Show expired/deleted/not found state without leaking existence details. |
| 410 | `SCAN_EXPIRED` | Show expired state and new scan CTA. |
| 429 | `RATE_LIMITED` | Suggest waiting; do not expose abuse heuristics. |
| 500 | `INTERNAL_ERROR` | Non-technical failure message. |
| 502 | `PROVIDER_ERROR` | Future only; say provider failed, no legal conclusion. |
| 504 | `PROVIDER_TIMEOUT` | Future only; status failed/timeout; credit policy must be defined before paid launch. |

## 5. D1 data model contract

### 5.1 Tables

D1 migrations are specified in `backend-plan.md`. Logical entities:

- `scans`: one row per scan/status/result shell.
- `scan_evidence`: normalized evidence cards for completed provider/manual/sample result.
- `early_access_requests`: waitlist/contact needs.
- `entitlements`: future-proof plan/access state; MVP free/early-access only.
- `audit_events`: admin/system/security changes and deletion events.
- `abuse_events`: rate-limit/prohibited-use/security events without unnecessary media.

### 5.2 Retention fields

Every scan must have:

- `created_at`
- `updated_at`
- `expires_at`
- `raw_media_expires_at` when upload exists
- `deleted_at` when deletion is requested/completed

Recommended default from compliance until owner confirms:

- raw uploaded media: delete within 24 hours
- minimal metadata/logs: retain up to 30 days unless security/legal reasons require longer

## 6. R2 object contract

R2 buckets:

- `detectvideo-uploads-preview` or environment-specific equivalent for temporary raw uploaded clips.
- Optional future `detectvideo-derived-preview` for extracted frames/audio snippets if provider pipeline needs them.

Object key rules:

```text
uploads/{yyyy}/{mm}/{dd}/{scan_id}/{random_ulid}.{safe_extension}
derived/{yyyy}/{mm}/{dd}/{scan_id}/{random_ulid}/{artifact_type}.{extension}
```

Rules:

- Never include original filename, email, user id, platform id, or source URL in object key.
- Signed URLs expire quickly and are never returned from public result API.
- R2 bucket is private; no public bucket listing.
- Lifecycle deletion should enforce `raw_media_expires_at` / default 24h raw-media retention.

## 7. Queue contract

Queue: `detectvideo-scan-jobs`.

Job shape future provider mode:

```json
{
  "job_id": "job_...",
  "scan_id": "scan_...",
  "mode": "provider_inference",
  "input_type": "upload",
  "r2_object_key": "opaque-server-only-key",
  "submitted_url": null,
  "attempt": 1,
  "created_at": "2026-07-03T14:03:13Z"
}
```

Rules:

- Queue payload is server-only; do not expose R2 keys/provider payloads to frontend.
- Max retries and dead-letter behavior must be defined before provider launch.
- Failed provider scans must not imply legal/forensic conclusion.
- Paid credit consumption policy for failed/timeout/inconclusive scans is OWNER_DECISION_REQUIRED and blocks paid launch.

## 8. Frontend state mapping

| API state | UI component/state | Required copy/safety |
|---|---|---|
| `GET /api/config.capabilities.provider_inference_enabled=false` | Tool intake sample/manual preview | `Current preview may show sample/manual checklist mode until automated detection is validated.` |
| `POST /api/uploads/presign` → `UPLOAD_NOT_ENABLED` | Upload disabled/fallback | `Real upload processing is not available in this preview.` |
| `POST /api/scans` → `manual_checklist` | Result shell or sample/manual page | `This is sample/manual checklist mode. It is not a real analysis of your video and does not provide a real verdict.` |
| `GET /api/scans/:id status=queued|processing` | Timeline/skeleton | `Processing time may vary.` |
| `GET /api/scans/:id mode=provider_inference completed` | Result report | Show verdict/evidence/limitations, but not proof. |
| `unsupported` | Unsupported URL/file state | Public-link limitations + upload fallback only if user has rights. |
| `expired|deleted` | Expired/deleted state | No details about old media or object keys. |

## 9. Seed/fixture contract for frontend

Frontend may use deterministic fixtures for local/static build. Fixtures must be labeled sample/manual.

Suggested files for frontend implementation:

```text
src/data/backend-config.fixture.json
src/data/sample-scan-result.fixture.json
src/data/manual-checklist.fixture.json
src/data/early-access-options.fixture.json
```

Sample fixture must use:

```json
{
  "mode": "sample",
  "verdict": null,
  "confidence_score": null,
  "confidence_label": null,
  "warnings": ["sample_report_only"]
}
```

Do not ship a fixture that looks like a real user scan with a real file name, precise confidence, or real platform URL unless all fields are explicitly demo-labeled.

## 10. Entitlement contract

MVP defaults:

```json
{
  "plan": "free_mvp",
  "payment_status": "none",
  "scan_mode_allowed": "manual_checklist",
  "monthly_scan_limit": null,
  "scan_pack_remaining": null,
  "max_upload_mb": null,
  "max_video_seconds": null,
  "max_concurrent_jobs": null,
  "report_export_allowed": false,
  "history_days": null,
  "api_access": "none",
  "support_level": "self_serve",
  "owner_decision_required": [
    "real detector provider/model",
    "upload limits",
    "retention/deletion policy",
    "paid plan/pricing/refund/tax",
    "payment provider"
  ]
}
```

Future paid entitlement fields are reserved but must not be enabled until pricing/compliance/backend/payment are approved.

## 11. Analytics/logging contract

Allowed logs:

- request id, timestamp, endpoint, status code
- scan id, status transition, mode, error code
- rate limit/abuse events
- provider timing/cost summary in aggregate future mode

Avoid logs:

- full source URLs where not needed
- signed URLs
- R2 object keys in client-visible logs
- raw provider responses
- secrets/tokens/cookies
- user-uploaded media content

Analytics/cookies:

- Do not add Clarity/session replay to upload/result pages until privacy copy and masking are confirmed.
- If GA4/Clarity/Bing/GSC or other analytics is added, Privacy/Cookie disclosure must match implementation.

## 12. Validation checklist

- [x] Frontend has machine-readable enums and JSON schema.
- [x] API contract covers config, presign, create scan, read scan, delete scan, early access.
- [x] `mode` prevents fake user-specific results when provider is absent.
- [x] Dynamic scan pages remain noindex and not in sitemap.
- [x] No production secrets, tokens, provider credentials, or raw private data in contract.
- [x] D1/R2/Queue/KV responsibilities defined at contract level.
- [x] Entitlement fields align with pricing stage: free_mvp/early_access now, paid plans reserved only.
- [x] Open owner decisions are explicit and block only production real upload/provider/payment, not frontend static MVP.

## 13. Downstream handoff summary

### Current conclusion

- Status: DONE_WITH_CONDITIONS
- One-line conclusion: The backend/data contract is ready for frontend implementation of a Cloudflare-first sample/manual MVP and future provider-inference seam, while explicitly blocking fake real results, real uploads, URL fetching, provider inference, and payment until owner/backend/compliance decisions are complete.

### Deliverable

- `/root/projects/detectvideo/data-contract.md`
- `/root/projects/detectvideo/backend-plan.md`

### Must-read for frontend/backend/QA

- `/root/projects/detectvideo/prd.md`
- `/root/projects/detectvideo/route-contract.md`
- `/root/projects/detectvideo/compliance.md`
- `/root/projects/detectvideo/pricing.md`
- `/root/projects/detectvideo/copy.md`
- `/root/projects/detectvideo/design.md`
- `/root/projects/detectvideo/data-contract.md`
- `/root/projects/detectvideo/backend-plan.md`

### Cannot assume

- Cannot assume public brand can be `DetectVideo`.
- Cannot assume DNS/Cloudflare/production deployment is done.
- Cannot assume a real detector provider/model exists.
- Cannot assume real uploads, URL media fetching, paid checkout, report export, API access, retention, or deletion are production-ready.

[DONE]
