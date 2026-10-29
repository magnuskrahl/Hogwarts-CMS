import pool from "../db.js";

export async function getDatabaseStatus() {
  return pool.query(/* sql */ `
    SELECT NOW() AS current_time
  `);
}
