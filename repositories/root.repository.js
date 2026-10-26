import pool from "../db.js";

export async function getDatabaseStatus() {
  return pool.query("SELECT NOW() AS current_time");
}
