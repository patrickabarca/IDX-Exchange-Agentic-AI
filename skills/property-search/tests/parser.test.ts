import assert from "node:assert/strict";
import { test } from "node:test";
import { parsePropertyQuery } from "../scripts/parser.js";

// Test 1: Check that $800k is converted into 800000
test("Price under $800k", async () => {
    const result = await parsePropertyQuery("Homes under $800k");

    assert.equal(result.maxPrice, 800000);
});

// Test 2: Check city and property type extraction
test("Single family homes in Berkeley", async () => {
    const result = await parsePropertyQuery("Find single family homes in Berkeley");

    assert.equal(result.city, "Berkeley");
    assert.equal(result.type, "SingleFamilyResidence");
    });

// Test 3: Check the minimum bedroom count
test("At least 3 bedrooms", async () => {
    const result = await parsePropertyQuery("At least 3 bedrooms");

    assert.equal(result.beds, 3);
});

// Test 4: Check multiple filters in one query
test("Bathrooms in Oakland", async () => {
    const result = await parsePropertyQuery("2 bathrooms in Oakland");

    assert.equal(result.baths, 2);
    assert.equal(result.city, "Oakland");
});

// Test 5: Check that a pool is requested
test("Properties with a pool", async () => {
    const result = await parsePropertyQuery("Houses with a pool");

  // Accept common representations of true
    const pool = String(result.pool).toLowerCase();

    assert.ok(["true", "yes", "y", "1"].includes(pool));
});

// Test 6: Check that a view is requested
test("Properties with a view", async () => {
    const result = await parsePropertyQuery("Properties with a view");

    const view = String(result.hasView).toLowerCase();

    assert.ok(["true", "yes", "y", "1"].includes(view));
});

// Test 7: Check the minimum square footage
test("At least 2000 sqft", async () => {
    const result = await parsePropertyQuery(
    "Houses with at least 2000 sqft"
);

    assert.equal(result.sqft, 2000);
});

// Test 8: Check city, bedrooms, and property type together
test("Condos in San Francisco", async () => {
    const result = await parsePropertyQuery(
    "4-bedroom condos in San Francisco"
);

    assert.equal(result.city, "San Francisco");
    assert.equal(result.beds, 4);
    assert.match(String(result.type), /condo/i);
});

// Test 9: Check that $1.2 million becomes 1200000
test("Homes in Albany under $1.2M", async () => {
    const result = await parsePropertyQuery(
    "Find homes in Albany under $1.2M"
);

    assert.equal(result.city, "Albany");
    assert.equal(result.maxPrice, 1200000);
});

// Test 10: Check several constraints in a complex query
test("Multiple property filters", async () => {
    const result = await parsePropertyQuery(
    "3-bedroom houses in Berkeley under $800k with a pool"
);

    assert.equal(result.city, "Berkeley");
    assert.equal(result.beds, 3);
    assert.equal(result.maxPrice, 800000);

  // Verify that the pool requirement was also extracted
    const pool = String(result.pool).toLowerCase();
    assert.ok(["true", "yes", "y", "1"].includes(pool));
});
