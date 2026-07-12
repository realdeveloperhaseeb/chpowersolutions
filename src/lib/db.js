// Lazy MySQL connection pool (mysql2/promise). Created once per process.
import mysql from "mysql2/promise";

let pool;

export function isDbConfigured() {
  return Boolean(process.env.DB_HOST && process.env.DB_NAME);
}

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: "utf8mb4",
    });
  }
  return pool;
}

// Small helper: run a query and return rows.
export async function q(sql, params = []) {
  const [rows] = await getPool().execute(sql, params);
  return rows;
}
