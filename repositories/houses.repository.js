import pool from "../db.js";

export async function getHouses() {
  return pool.query(/* sql */ `
    SELECT *
    FROM houses
  `);
}

export async function getHouseById(id) {
  return pool.query(
    /* sql */ `
      SELECT *
      FROM houses
      WHERE id = $1
    `,
    [id],
  );
}
