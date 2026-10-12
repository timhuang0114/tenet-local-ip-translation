# TENET prototype validation

Recorded on 2026-10-12 with Python 3.12.14 on Windows.

## Automated workflow checks

Five unittest cases pass. They cover intentional terminology/numeric defects, repeated numeric tokens and unit preservation, literal trademark checks, refusal of unsupported custom text in fixture mode, revision-specific export approvals and HTML escaping.

## Browser workflow

A headless Microsoft Edge session operated both synthetic cases. It prepared drafts, applied approved terminology, corrected the patent threshold, checked quality, approved every paragraph and downloaded both bilingual HTML examples. Editing an approved paragraph disabled export. A mobile viewport check found no horizontal document overflow. No browser JavaScript errors appeared in this workflow.

The recorded demonstration requested only resources from `http://127.0.0.1:8787`. This is an application/browser observation for the fixture walkthrough. It is not a system-wide network audit or proof of offline model operation.

## Unvalidated scope

The optional OpenVINO adapter, actual model inference, real translation quality, B70 performance, OCR/DOCX preservation, reference retrieval, multi-user access control and persistent audit records require subsequent implementation or validation. Deterministic fixture tests do not measure those capabilities.
