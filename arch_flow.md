```
                         ┌─────────────────────────────────────────┐
                         │               USER QUERY                │
                         └───────────────────┬─────────────────────┘
                                             │
                                             ▼
                         ┌─────────────────────────────────────────┐
                         │                WHATSAPP                 │
                         │       Receives the user's message       │
                         └───────────────────┬─────────────────────┘
                                             │
                                             ▼
                         ┌─────────────────────────────────────────┐
                         │            OPENCLAW RUNTIME             │
                         │       Receives and manages request      │
                         └───────────────────┬─────────────────────┘
                                             │
                                             ▼
                         ┌─────────────────────────────────────────┐
                         │           SESSION + MEMORY              │
                         │   Loads conversation and user context   │
                         └───────────────────┬─────────────────────┘
                                             │
                                             ▼
                         ┌─────────────────────────────────────────┐
                         │              ORCHESTRATOR               │
                         │ Identifies intent and selects a skill   │
                         └───────────────────┬─────────────────────┘
                                             │
                     ┌───────────────────────┼───────────────────────┐
                     │                       │                       │
                     ▼                       ▼                       ▼
          ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
          │ PROPERTY SEARCH │     │  MARKET STATS   │     │       RAG       │
          │      SKILL      │     │      SKILL      │     │      SKILL      │
          │                 │     │                 │     │                 │
          │ Extracts search │     │ Handles market  │     │ Retrieves       │
          │ criteria        │     │ data & analysis │     │ knowledge       │
          └────────┬────────┘     └────────┬────────┘     └────────┬────────┘
                   │                       │                       │
                   └───────────────────────┼───────────────────────┘
                                           │
                                           ▼
                             ┌─────────────────────────┐
                             │      TOOL EXECUTION     │
                             │ Calls tools required by │
                             │    the selected skill   │
                             └────────────┬────────────┘
                                          │
                                          ▼
                             ┌─────────────────────────┐
                             │      MLS DATABASE       │
                             │ Provides property and   │
                             │      market data        │
                             └────────────┬────────────┘
                                          │
                                          ▼
                             ┌─────────────────────────┐
                             │   RESPONSE PROCESSING   │
                             │ Formats relevant results│
                             └────────────┬────────────┘
                                          │
                                          ▼
                             ┌─────────────────────────┐
                             │      MEMORY UPDATE      │
                             │ Saves context for future│
                             │     follow-up queries   │
                             └────────────┬────────────┘
                                          │
                                          ▼
                             ┌─────────────────────────┐
                             │        WHATSAPP         │
                             │ Sends results to user   │
                             └────────────┬────────────┘
                                          │
                                          ▼
                             ┌─────────────────────────┐
                             │          USER           │
                             │    Receives response    │
                             └─────────────────────────┘
```