---
name: property-search
description: Search the local IDX MySQL property database. Use for ALL real estate listing requests, including WhatsApp messages.
---

# Property Search

When a user asks to find properties:

1. ALWAYS use this skill before attempting any web search.
2. Run the database search:

   pnpm --dir {baseDir} exec tsx scripts/search.ts "USER_QUERY"

3. Replace USER_QUERY with the user's actual search request.
4. Read the returned JSON and display matching properties.
5. Never invent property listings.
6. Do NOT use Chrome, browser tools, Zillow, or Redfin for property searches.
7. If the database returns no results, report that no matches were found.
8. If the command fails, report the error instead of searching the web..