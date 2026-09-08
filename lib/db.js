import mysql from "mysql2/promise";

// MySQL credentials for a remote (or local) MySQL server.
// Set these as environment variables:
// DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 8,
      dateStrings: true,
    });
  }
  return pool;
}

export function isDbConfigured() {
  return Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME);
}

// Tagged-template helper so the rest of the app can keep writing
// `sql`SELECT * FROM x WHERE id = ${id}`` just like before.
// SELECT queries return an array of rows. INSERT/UPDATE/DELETE queries
// return a single-element array `[{ id: insertId, affectedRows }]` so
// call sites that do `const [row] = await sql`INSERT ...``; row.id`
// keep working without change (MySQL has no RETURNING clause).
export function getSql() {
  if (!isDbConfigured()) {
    throw new Error(
      "No database connection found. Set DB_HOST, DB_USER, DB_PASSWORD and DB_NAME environment variables."
    );
  }
  const p = getPool();

  return async function sql(strings, ...values) {
    let text = strings[0];
    for (let i = 0; i < values.length; i++) {
      text += "?" + strings[i + 1];
    }
    const [result] = await p.execute(text, values);
    if (Array.isArray(result)) return result; // SELECT
    return [{ id: result.insertId, affectedRows: result.affectedRows }]; // INSERT/UPDATE/DELETE
  };
}
