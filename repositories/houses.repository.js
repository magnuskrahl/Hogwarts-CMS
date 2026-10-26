import pool from "../db.js";

export async function getHouses() {
  return pool.query("SELECT * FROM houses");
}

export async function getHouseById(id) {
  return pool.query("SELECT * FROM houses WHERE id = $1", [id]);
}
