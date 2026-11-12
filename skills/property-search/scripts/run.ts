import { parsePropertyQuery } from "./parser.js";
import { searchActiveListings, getSoldComps , PropertyFilters} from "./search.js";
import { closePool } from "./db.js";
import { getSession, updateSession, clearSession, sessions} from "./memory.js"


async function main() {
    const userQuery = process.argv.slice(2).join(" ");

    if (!userQuery) {
        throw new Error("Provide a property search query.");
    }

    try {
        const filters = await parsePropertyQuery(userQuery);
        if (/\b(sold|recent sales|comps)\b/i.test(userQuery)) {
            if (!filters.city) {
                throw new Error("City required for sold comps.");
        }
            const sold = await getSoldComps(filters.city);
            console.log(JSON.stringify({ filters, sold }, null, 2));
        } else {
            if (/^(reset|new search|start over)$/i.test(userQuery.trim())) {
                clearSession('user_id');
                console.log("Session cleared.");
                return;
            }
            // Reset session if the city changes
            const session = getSession('user_id');

            if (
                filters.city &&
                session.city &&
                filters.city.trim().toLowerCase() !== session.city.trim().toLowerCase()
            ) {
                clearSession('user_id');
            }

            //newFilters ensures non nulls don't get overwritten
            const newFilters = Object.fromEntries(
                Object.entries(filters).filter(([key, value]) => value != null)
            );
            const merged = { ...getSession('user_id'), ...newFilters };
            const searchFilters: PropertyFilters = {
                city: merged.city ?? null,
                maxPrice: merged.maxPrice ?? null,
                beds: merged.beds ?? null,
                baths: merged.baths ?? null,
                sqft: merged.sqft ?? null,
                type: merged.type ?? null,
                pool: merged.pool ?? null,
                hasView: merged.hasView ?? null
            };
            const listings = await searchActiveListings(searchFilters);
            updateSession('user_id', {
                ...searchFilters,
                lastResults: listings,
                conversationStep: merged.conversationStep + 1
            });
            console.log(JSON.stringify({ filters: searchFilters, listings }, null, 2));
        }

    } finally {
        await closePool();
    }
}

main().catch(err => {
    console.error(err.message);
    process.exitCode = 1;
});