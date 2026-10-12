# TENET

Local Patent and Trademark Translation Workbench by **Lexer**.

TENET stands for **Trusted, Edge, Non-Disclosure, Efficient, Translation**. These words describe product goals. The prototype does not certify translation accuracy or confidentiality of the surrounding operating system.

## What runs today

This independently authored prototype supports Japanese patent and English trademark text translated into Traditional Chinese. Its default mode uses prewritten synthetic translation drafts. It does **not** run AI inference in fixture mode. Two intentional defects in the patent draft demonstrate numeric and terminology checks.

The browser provides paragraph alignment, terminology substitution, editable drafts, selected numeric/unit/name checks, revision-specific human approval and a bilingual HTML export. The server validates export conditions again. It listens only on `127.0.0.1` and contains no cloud inference endpoint or telemetry. It does not persist documents between runs.

An optional OpenVINO GenAI adapter loads an already exported local model. The adapter has not been exercised with a model in this delivery. Intel Arc Pro B70 performance, translation quality and offline inference require subsequent measurement. Rule checks alone cannot establish semantic or legal correctness.

## Quick start

Requires Python 3.10 or later. The fixture workflow uses the standard library only.

```powershell
python tenet.py
```

Open `http://127.0.0.1:8787` in your browser. Stop the server with Ctrl+C. If the port is occupied, use `python tenet.py --port 8790`.

1. Select the synthetic Japanese patent and prepare the draft.
2. Apply approved terminology. The first warning disappears.
3. In the third translation, correct `28°C` to `25°C` after comparing the source.
4. Run quality checks and review all three paragraphs. Select each approval checkbox.
5. Export the reviewed bilingual draft.
6. Select the trademark sample and repeat review and export.

Editing a translation invalidates approval for that revision. Changing the source starts a new draft. Fixture mode rejects custom source text instead of presenting canned output as inference.

## Local model setup

Create a separate virtual environment and install the optional dependencies. Downloads during model preparation are separate from offline document processing.

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-openvino.txt
.\.venv\Scripts\optimum-cli.exe export openvino --model Qwen/Qwen3-8B --task text-generation-with-past --weight-format int4 models/qwen3-8b-int4
.\.venv\Scripts\python.exe tenet.py --model models/qwen3-8b-int4 --device CPU
```

The export command is a proposed setup recipe based on the upstream tools, not a verified environment lock. Confirm the model exporter, tokenizer, chat template and installed versions in the target environment. On the organizer's Intel GPU environment, validate the supported OpenVINO version and driver before choosing `--device GPU` or a specific GPU index. Failures do not trigger a CPU or cloud fallback. The fixture path never auto-enables when a requested model fails to load.

The Qwen3-8B model card identifies an Apache 2.0 license. Model weights are not bundled. Preserve upstream license and notices if distributing converted weights. The current prompt uses the model's documented `/no_think` soft instruction and strips completed reasoning blocks. Validate behavior before real use. Input-length and output-token limits deliberately constrain this first prototype.

## Tests

```powershell
python -m unittest discover -s tests -v
```

Tests cover seeded QA defects, numeric multiplicity, units, trademark identity, fixture refusal, revision approval and safe HTML escaping. They do not measure AI translation quality.

## Architecture

Browser UI communicates with a loopback Python controller. The controller prepares paragraph context, invokes either the fixture engine or a local OpenVINO pipeline, checks drafts and validates export approval. It loads the versioned synthetic glossary from `samples.json`. Source and draft text remain in process memory. Export files are explicitly downloaded by the user.

`tenet.py` is the controller and adapter. `app.js`, `style.css` and `index.html` provide the browser interface. `samples.json` contains synthetic cases and terminology. `docs/` contains the development, model and evaluation plans. `tests/` verifies workflow invariants.

## Competition scope

Proposed category: **Workplace AI**, **Battlefield Thunderstorm**, **Onsite Track**. Target platform: ASUS UGen Intel Arc Pro B70 32GB in the organizer environment. Stage I can use general hardware. Stage II must demonstrate the selected designated platform.

The Stage I video in the local submission package shows this fixture workflow with English narration. It is not an AI inference or B70 benchmark. Replace or supplement it with a measured local inference capture before claiming local AI execution.

## Planned additions

DOCX import/export, paragraph/table/image preservation, approved translation memory with source provenance, tenant isolation, persistent audit trails, terminology versioning, an independent semantic review pass and hardware benchmark reports are planned. None is implemented in this minimal prototype. No automated trademark classification or registrability opinion is provided.

## Publication

This source tree contains independently authored prototype code, synthetic examples, documentation and tests. Client documents, production databases, model weights, runtime logs and Python caches are excluded. The Chinese planning files in the local submission package are for the team and are not part of this repository. The software has no open source license grant yet. Any license grant must come from the rights holder.

## References

- [Competition rules](https://contest.bhuntr.com/tw/39jg9vimiynrhlksze/home/)
- [Qwen3-8B model card](https://huggingface.co/Qwen/Qwen3-8B)
- [OpenVINO GenAI](https://github.com/openvinotoolkit/openvino.genai)
- [Optimum Intel](https://huggingface.co/docs/optimum-intel/openvino/export)
- [Intel Arc Pro B70 datasheet](https://www.intel.com/content/dam/www/central-libraries/us/en/documents/2026-03/datasheet-b70-gpu.pdf)

Documentation checked on 2026-10-12. Availability and compatibility must be verified in the actual competition environment.
