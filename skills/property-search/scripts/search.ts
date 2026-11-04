import "dotenv/config";
import mysql from "mysql2/promise";
import { parsePropertyQuery } from "./parser.js";

const query = process.argv.slice(2).join(" ");

async function main() {
  if (!query) throw new Error("Provide a property search query.");

  const filters = await parsePropertyQuery(query);

  const conditions: string[] = [];
  const values: (string | number)[] = [];

  function add(column: string, operator: string, value: string | number | null) {
    if (value === null) return;
    conditions.push(`${column} ${operator} ?`);
    values.push(value);
  }

  add("L_City", "=", filters.city);
  add("L_SystemPrice", "<=", filters.maxPrice);
  add("L_Keyword2", ">=", filters.beds);
  add("LM_Dec_3", ">=", filters.baths);
  add("LM_Int2_3", ">=", filters.sqft);
  add("L_Type_", "=", filters.type);
  add("PoolPrivateYN", "=", filters.pool);
  add("ViewYN", "=", filters.hasView);

  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

  try {
    const where = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const sql = `
      SELECT L_City, L_SystemPrice, L_Keyword2,
             LM_Dec_3, LM_Int2_3, L_Type_
      FROM rets_property
      ${where}
      LIMIT 10
    `;

    const [rows] = await db.execute(sql, values);
    console.log(JSON.stringify({ filters, listings: rows }, null, 2));
  } finally {
    await db.end();
  }
}

main().catch(err => {
  console.error(err.message);
  process.exitCode = 1;
});