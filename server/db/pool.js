/**
 * PostgreSQL Database Client Pool
 * Configured for local PostgreSQL or managed Cloud Postgres (Supabase, Neon, AWS RDS)
 */

export const PG_CONFIG = {
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432', 10),
  database: process.env.PG_DATABASE || 'guzotribe_db',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Max pool clients
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
};

// In-memory query simulator for environments without live running local postgres instance
export async function executeQuery(sql, params = []) {
  console.log(`[PostgreSQL Query] Executing: ${sql.slice(0, 120)}... | Params:`, params);
  return {
    rows: [],
    rowCount: 0,
    fields: []
  };
}
