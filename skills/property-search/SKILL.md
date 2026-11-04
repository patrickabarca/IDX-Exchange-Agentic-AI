---
name: property-search
description: Search the local IDX MySQL property database. Use for ALL real estate listing requests, including WhatsApp messages.
---

# Property Search

When a user asks to find properties:

1. Use this skill whenever the user requests a property search.
2. Run:
   pnpm --dir {baseDir} exec tsx scripts/search.ts "USER_QUERY"
3. Replace USER_QUERY with the user's actual request.
4. Parse the returned JSON and display matching properties.
5. Never invent listings or property details.
6. Do not use browsers or external listing websites as substitutes.
7. If no matches are found, inform the user.
8. If the command fails, report the error...