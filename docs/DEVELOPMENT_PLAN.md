# TENET development plan

## Product scope

First deliverable: Japanese patent specifications and claims to Traditional Chinese, plus English trademark correspondence and goods descriptions to Traditional Chinese. A professional reviewer approves output. Do not promise automated filing, classification decisions or legal equivalence.

## Planned architecture

1. Parse TXT or DOCX into immutable paragraph IDs and source hashes. Add tables and images as structured elements. Treat scanned PDF OCR as a later module.
2. Retrieve approved terminology and case-scoped bilingual references locally. Keep tenant, language and jurisdiction filters. Record source document, reviewer, version and paragraph ID.
3. Schedule paragraph translation with bounded context on the Intel GPU. Start with one model and one concurrent request. Preserve nearby context and claim dependency references without sending an entire document on every call.
4. Run deterministic checks. Add patent dependency, reference numeral, negation, list cardinality and trademark identity checks. Clearly distinguish heuristic warnings from established errors.
5. Let a reviewer inspect the source, translation and evidence. Bind each approval to a source-plus-target revision hash. New versions invalidate affected approvals.
6. Patch only permitted text elements in a copy of the DOCX. Reject missing IDs and unexpected output. Verify paragraph/table/image counts. Include an audit manifest and clearly marked reviewed draft status.

The implemented prototype covers a subset: text paragraphs, static terminology, selected checks and HTML export. It does not implement DOCX preservation, retrieval, multi-user boundaries or an audit database.

## Hardware integration

Use the organizer's environment for Stage II and record the actual B70 device name, OS, GPU driver and OpenVINO versions. Do not label an SDV run as an office offline deployment. SDV is a hosted development/validation environment. Use synthetic documents there. In a future office installation, the same stack can run on a local workstation with egress disabled.

Candidate baseline: Qwen3-8B converted to OpenVINO INT4. A larger candidate may be compared after measuring memory headroom and output quality. Sequential translation and review with one model avoids promising two resident large models. Do not infer measured latency from TOPS. If GPU initialization fails, stop and report it.

Memory planning: roughly 4.1 GB of raw 4-bit weights for an 8.2B parameter model, before scales, non-quantized tensors, runtime workspaces and KV cache. The calculation is a planning estimate, not measured allocation. Budget actual allocations within the device's 32GB and keep headroom. Test context sizes of 2K, 4K and 8K tokens and batch sizes 1 and 2 only after the baseline works.

## Roadmap

2026-10-12 to 10-14: prepare Stage I source, English proposal and a synthetic workflow video. Publish only after team review. Replace the pending GitHub field in the deck with the actual URL. If a local model is available, record a short real inference run and add environment details. Exact closing hour is not established by the retrieved rules.

2026-10-26: confirm selection and organizer access. Development before the formal Stage II period is preparation, subject to organizer instructions.

2026-11-06 to 11-13: freeze organizer environment, perform GPU smoke test, measure the INT4 baseline and validate model license.

2026-11-14 to 11-20: implement structured DOCX import, paragraph mapping and glossary versions. Use synthetic layout fixtures only.

2026-11-21 to 11-27: add approved bilingual retrieval and human review history. Test scope isolation and rejected output cases.

2026-11-28 to 12-04: run the evaluation plan and package reproducible evidence. Treat the published 12-04 milestone as the end of the announced Stage II development period; follow organizer instructions for continued rehearsal.

By 2026-12-10: submit the English onsite final proposal. Prepare offline rehearsal and Q&A before the onsite final on 2026-12-19.

## Tasks and acceptance

| Priority | Task | Acceptance |
| --- | --- | --- |
| P0 | Real local inference | Model/device shown, custom synthetic source changes output, no external inference request |
| P0 | B70 proof | Organizer device identification and a complete GPU run, no silent fallback |
| P0 | Draft and approval gate | Edits revoke affected approvals, server rejects stale approval |
| P1 | DOCX preservation | Source and output paragraph/table/image inventory reconciles, required numbering remains |
| P1 | Approved reference retrieval | Each reference has provenance and matching access scope |
| P1 | Evaluation | Report quality, review time, latency and memory with sample counts |
| P2 | OCR and complex layouts | Low confidence extraction requires manual review |

## Commercial validation

Initial users are bilingual professionals in IP firms or corporate IP departments. Validate willingness to adopt with three independently recruited teams using public or synthetic documents. Start with deployment and support per workstation, then consider site licensing. Pricing, adoption and savings are hypotheses. Measure setup/support cost and human review burden before calculating margin. Avoid claiming existing customers or market share.

## Reproducibility

Record repository commit, fixture hashes, model revision and converted artifact hash, glossary version, runtime versions and commands. Keep raw measurements separate from summary metrics. A fixture walkthrough is workflow evidence only.
