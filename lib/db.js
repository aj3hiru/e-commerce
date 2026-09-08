import { neon } from "@neondatabase/serverless";

// Vercel's Postgres (Neon) integration auto-injects one of these env vars
// once you create a database from the project's Storage tab.
const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

export function getSql() {
  if (!connectionString) {
    throw new Error(
      "No database connection string found. Create a Postgres database from your Vercel project's Storage tab first."
    );
  }
  return neon(connectionString);
}

export const isDbConfigured = () => Boolean(connectionString);
