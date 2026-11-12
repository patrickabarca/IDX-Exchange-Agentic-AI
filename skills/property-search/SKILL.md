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
6. Reuse previous search filters for follow-up messages.
7. Preserve filters the user hasn't changed.
8. Ask for a city when missing.
9. Support "reset" and "new search".
10.Display every returned listing's address, price, beds,baths, square footage, sqft and PhotoCount. PhotoCount is mandatory when present in the JSON. Format it as "X photos" for each property.
11. Do not omit matching properties returned by the script.
12. After displaying results, ask whether the user wants to refine their search further.
13. Do not offer listing alerts, notifications, or other features that have not been implemented. Only offer to refine the search or provide more listing details.
14. For follow-up requests, execute run.ts with the new message rather than combining the conversation manually. The script handles merging filters.
15. If the city is missing from both the current query and saved session, ask for it before searching.
16. Read the JSON returned by run.ts and display the matching properties.
17. Never invent listings, photo counts, or substitute web searches for database results.
18. If shell execution is unavailable or fails, report the actual error.