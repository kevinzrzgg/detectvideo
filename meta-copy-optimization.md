# Homepage Meta Copy Optimization — detectvideo.vip

- Task: `t_7001168f`
- Stage: 17 homepage meta copy optimization
- Target route: `/`
- Source reviewed:
  - `/root/projects/detectvideo/src/site-data.mjs`
  - `/root/projects/detectvideo/copy.md`
  - `/root/projects/detectvideo/seo-check.md`
  - `/root/projects/detectvideo/compliance-recheck.md`
- Status: DONE

## Current issue from AITDK screenshot

The current homepage SEO metadata is slightly too long for common SERP display guidance:

- Current Title: `AI Video Detector for YouTube & Social Videos | AI Video Detector`
  - Length: 65 chars
  - Issue: above the requested 50–60 char range and repeats `AI Video Detector`.
- Current Meta Description: `Upload a clip or paste a public YouTube or social video link to screen for AI-generated or deepfake signals. Get a preliminary evidence-style report with clear limitations.`
  - Length: 166 chars
  - Issue: above the requested 145–160 char range.

## Compliance boundaries preserved

All candidates keep the current product capability boundary:

- sample/manual/checklist mode is not overstated as live automated detection;
- results are described as preliminary or educational signals;
- no forensic, legal, official, certainty, best, or accuracy claims;
- public YouTube/social link support is not described as universal or assured;
- descriptions avoid saying a user video is definitively analyzed, verified, proven real, or proven fake.

## Candidate A — Recommended

Title:

> AI Video Detector Online for YouTube & Deepfake Videos

Meta Description:

> Check uploaded clips or public YouTube/social video links for AI-generated or deepfake signals. Get a preliminary educational report, not forensic proof.

Length check:

- Title: 54 chars
- Meta Description: 153 chars

Why this is the recommended option:

- Covers `AI Video Detector`, `YouTube`, and `Deepfake` in the title without keyword stuffing.
- Keeps the strongest search intent from the existing homepage while removing the repeated brand phrase.
- The description explicitly preserves the preliminary/educational/not-forensic boundary.
- Fits both requested display ranges.

## Candidate B

Title:

> AI Video Detector for YouTube & Social Video Checks

Meta Description:

> Screen uploaded clips or public YouTube and social video links for possible AI or deepfake signals, with sample/manual mode and clear limitations.

Length check:

- Title: 51 chars
- Meta Description: 146 chars

Notes:

- Best if the homepage should emphasize broader social-video workflows.
- Strong compliance wording via `possible`, `sample/manual mode`, and `clear limitations`.
- Slightly less direct than Candidate A for the `deepfake video` keyword in the title.

## Candidate C

Title:

> AI Video Detector for Deepfake & Social Video Review

Meta Description:

> Review YouTube, social, or uploaded clips for possible AI-generated and deepfake signals. Educational first-pass screening, not legal or forensic proof.

Length check:

- Title: 52 chars
- Meta Description: 152 chars

Notes:

- Best if the homepage should lean into trust/safety and review workflows.
- Covers `Deepfake` and `Social Video` in the title; covers `YouTube` in the description.
- Very clear about not being legal or forensic proof.

## Final implementation recommendation

Use Candidate A for the homepage `/` metadata:

```js
['/', 'AI Video Detector Online for YouTube & Deepfake Videos', 'Check uploaded clips or public YouTube/social video links for AI-generated or deepfake signals. Get a preliminary educational report, not forensic proof.', ...]
```

Recommended replacement target in `/root/projects/detectvideo/src/site-data.mjs`:

- route row: `pages[0]` / route `/`
- replace the current homepage title and meta description only;
- keep the existing H1, hero copy, disclaimers, FAQ, schema type, and sample/manual UI copy unchanged.

## QA checklist

- [x] 3 candidate Title / Meta Description pairs produced.
- [x] Each Title is 50–60 chars.
- [x] Each Meta Description is 145–160 chars.
- [x] Keywords are covered without stuffing:
  - `AI Video Detector`
  - `YouTube`
  - `Deepfake` and/or `Social Video`
- [x] No unsupported real-time, accuracy, certainty, forensic, legal, official, or proof claims.
- [x] Recommended final option selected for frontend implementation.

[DONE]
