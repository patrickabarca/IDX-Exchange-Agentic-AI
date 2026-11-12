---
name: property-search
description: Search the local IDX MySQL property database. Use for ALL real estate listing requests, including WhatsApp messages.
---
# Instructions

1. Use this skill for active property listings and recently sold properties.
2. Use OpenClaw's shell execution tool to run the existing TypeScript script.
3. Execute from the skill directory:
   pnpm exec tsx scripts/run.ts "USER_QUERY"
4. Replace USER_QUERY with the user's actual property search request.
5. Do not import or execute run.ts, search.ts, or db.ts inside an inline JavaScript execution environment.
6. Read the JSON returned by the script and display the matching properties.
7. Never invent listings or substitute web searches for database results.
8. If shell execution is unavailable or fails, report the actual error.