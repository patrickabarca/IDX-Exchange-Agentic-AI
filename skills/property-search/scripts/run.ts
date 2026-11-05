import { parsePropertyQuery } from "./parser.js";
import { searchActiveListings } from "./search.js";
import { closePool } from "./db.js";

async function main() {
    const userQuery = process.argv.slice(2).join(" ");

    if (!userQuery) {
        throw new Error("Provide a property search query.");
    }

    try {
        const filters = await parsePropertyQuery(userQuery);
        const listings = await searchActiveListings(filters);

    console.log(JSON.stringify({ filters, listings }, null, 2));
} finally {
    await closePool();
    }
}

main().catch(err => {
    console.error(err.message);
    process.exitCode = 1;
});