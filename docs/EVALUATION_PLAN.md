# TENET evaluation plan

No AI quality or B70 performance benchmark has been recorded in this delivery.

## Evaluation design

Create a frozen, independently reviewed evaluation set with 60 Japanese patent paragraphs and 40 English trademark passages. Split by document and source family before selecting examples. Keep prompt-development passages separate. Synthetic text supports mechanics tests; it does not establish field accuracy. For quality validation, use suitably licensed public texts with professionally reviewed reference translations. Do not upload confidential documents to the organizer's SDV environment.

Compare: A, manual translation and review; B, the same local model without glossary/reference support and then human review; C, TENET with the same model and human review. Counterbalance reviewer order and randomize passages. Record familiarity and avoid letting the same reviewer remember previous translations. If limited resources prevent this design, report the limitation and avoid causal claims.

## Measures and proposed pilot targets

| Measure | Definition | Pilot target, not a result |
| --- | --- | --- |
| Critical meaning defects | Qualified reviewers identify missing negation, scope, dependency, object or item | Zero unresolved in exported evaluation drafts |
| Required term adherence | Correct approved term occurrences / applicable occurrences | At least 98% before human edits |
| Review time | Wall time from opening the draft to approval, including corrections | Median at least 30% below baseline B |
| Seeded rule recall | Detected known defects / seeded defects, by rule | 100% on supported synthetic rule fixtures |
| False alarms | Non-defects flagged / total flags, adjudicated | Report by rule, no hidden aggregate |
| GPU latency | Cold start separately, warm TTFT and complete paragraph latency | Report median and p95; no promised tok/s |
| GPU memory | Peak allocation for recorded context and concurrency | Stay within actual available VRAM |
| External inference traffic | Outbound document/inference traffic under monitored offline test | Zero during tested offline run |

Review time must be reported with sample count, median, dispersion and raw data. A timing improvement cannot replace quality acceptance. Rule recall does not establish semantic translation quality.

## Protocol

1. Record hardware, OS, GPU driver, model hash, OpenVINO/package versions, glossary version and repository commit.
2. Perform and retain a GPU-only smoke test. Verify the device. Reject or label fallback runs separately.
3. Freeze settings: precision, context cap, output cap and concurrency. Record prompt. Acknowledge nondeterminism across hardware.
4. Run five warmups, then at least thirty measured translation calls. Report cold loading separately. Do not include fixture mode in AI performance metrics.
5. Obtain two independent professional reviews for critical meaning defects. Adjudicate disagreements and retain anonymized criteria.
6. Monitor outbound connections during the offline test and verify dependencies/model assets are pre-staged. OS traffic is separately reported. Application code without an HTTP client is not proof of zero system egress.
7. Test export blocking, stale approvals, tenant scope isolation when implemented, malformed model output and missing document elements.
8. Publish only synthetic/public fixture identifiers, aggregate timings and reproducible metadata. Do not put real case text in benchmark logs.

## Current evidence

The supplied tests and captured browser workflow cover selected deterministic checks and review/export behavior. The patent fixture deliberately contains one terminology substitution and one incorrect numeric threshold. The sample size is too small to infer real-world error detection rates. The optional model adapter is unverified until an actual model run is recorded.
