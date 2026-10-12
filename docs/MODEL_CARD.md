# TENET model and data record

## Candidate model

Candidate: Qwen/Qwen3-8B. Model card: https://huggingface.co/Qwen/Qwen3-8B. The upstream card identifies 8.2B parameters, multilingual support and an Apache 2.0 license. Candidate does not mean it has been validated for patent or trademark translation.

Proposed conversion: OpenVINO INT4 with Optimum Intel. Preserve the upstream license and notices when distributing weights. Pin the upstream commit, exporter/runtime versions and converted file hashes after environment validation. Model weights are not included here. No training, fine-tuning or weight updates are performed by this prototype.

## Current runtime

Default engine: synthetic-fixtures-v1. The patent draft contains two intentional defects. It is a prewritten workflow fixture, not a language model. The optional OpenVINO adapter has not been validated with model weights or Intel GPU hardware in this delivery.

## Data

`samples.json` contains newly written synthetic Japanese patent passages and English trademark passages with Traditional Chinese drafts. Names, technical configurations and descriptions are fictional. The Japanese text uses common patent-style expressions. The trademark goods list is a demonstration, not an approved classification list. No commercial case, client record or production knowledge base is bundled.

## Intended use and limits

Produce a translation draft for professional review. First language pairs are Japanese to Traditional Chinese and English to Traditional Chinese. Model hallucinations, omitted elements, changed dependencies, inconsistent terms and mistaken proper-name translation remain possible. The system does not determine validity, registrability, filing eligibility or legal equivalence.

## Planned local retrieval

Future approved bilingual references will enrich prompts at inference time. Reference retrieval and glossary maintenance do not train model weights. Each reference needs authorization, source provenance, reviewer identity and version. Access filters must prevent leakage across clients or organizations. Those retrieval and tenancy features are not implemented in the current prototype.

## Safety behavior

No automatic external inference fallback. Requested model initialization failures stop startup. The server binds to loopback and checks Host and Origin. Source, targets and approval hashes are held in browser/local process memory. Export requires current approvals and no selected rule warnings. Semantic review remains a human responsibility. Hashes bind revisions within a session and do not authenticate reviewer identity or provide tamper-proof audit evidence.
