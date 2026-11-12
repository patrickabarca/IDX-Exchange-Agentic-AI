export async function parsePropertyQuery(query: string) {
    const cityMatch = query.match(/in ([A-Za-z\s]+?)(?:\s+under|\s+with|\s+at|$)/i);
    const priceMatch = query.match(/under\s+\$?([\d,.]+)\s*(million|thousand|k|m)?\b/i);
    const bedsMatch = query.match(/(\d+)[\s-]*(bed|beds|bedroom|bedrooms)/i);
    const bathsMatch = query.match(/(\d+(?:\.5)?)[\s-]*(bath|baths|bathroom)/i);
    const sqftMatch = query.match(/(\d+)[\s,]*(sqft|sq ft|square feet)/i);
    const poolMatch = /pool/i.test(query);
    const viewMatch = /view/i.test(query);
    const typeMap: Record<string,string> = {
        condo: "Condominium", townhome: "Townhouse",
        "single family": "SingleFamilyResidence", land: "UnimprovedLand"
    };
    const typeKey = Object.keys(typeMap).find(k => query.toLowerCase().includes(k));
    let maxPrice = null;
    if (priceMatch) {
        maxPrice = Number(priceMatch[1].replace(/,/g, ""));
        if (["k", "thousand"].includes(priceMatch[2]?.toLowerCase() ?? "")) {
            maxPrice *= 1000;
        }
        if (["million", "m"].includes(priceMatch[2]?.toLowerCase() ?? "")) {
            maxPrice *= 1_000_000;
        }
}
    return {
        city: cityMatch?.[1]?.trim() || null,
        maxPrice,
        beds: bedsMatch ? Number(bedsMatch[1]) : null,
        baths: bathsMatch ? Number(bathsMatch[1]) : null,
        sqft: sqftMatch ? Number(sqftMatch[1]) : null,
        type: typeKey ? typeMap[typeKey] : null,
        pool: poolMatch ? "True" : null,
        hasView: viewMatch ? "True" : null,
        };
    } 