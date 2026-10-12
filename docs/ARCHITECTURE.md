# TENET system architecture

## Current prototype

```mermaid
flowchart TD
  A[Browser: source, aligned draft and reviewer] -->|Loopback HTTP| B[Python controller]
  B --> C[Synthetic fixture engine: default mode]
  B --> D[Optional OpenVINO adapter: not validated]
  D --> E[Pre-staged local model on explicit CPU or GPU]
  C --> F[Selected deterministic checks]
  E --> F
  F --> A
  A --> G[Current revision approvals]
  G --> H[Server validates approvals and rule warnings]
  H --> I[Reviewed bilingual HTML download]
```

The server has no cloud inference route. Requested model failures stop execution. No model weights, production documents or case database are bundled. No persistent audit record or identity authentication is implemented.

## Planned competition deployment

```mermaid
flowchart TD
  A[Authorized public or synthetic source] --> B[CPU: structured TXT or DOCX parsing]
  B --> C[CPU: immutable paragraph IDs and context planning]
  R[Planned local approved glossary and bilingual reference store] --> C
  C --> D[Organizer environment: OpenVINO on B70 32GB]
  D --> E[CPU rules and planned semantic review]
  E --> F[Professional reviewer]
  F --> G[Planned version records and DOCX export]
  F -->|Only after separate authorization| R
```

Organizer SDV is a hosted validation environment. It does not establish office-local data residency. A future office deployment must stage model assets, verify offline operation and test storage and egress controls separately.
