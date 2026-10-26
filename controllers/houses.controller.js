import {
  getHouseById,
  getHouses,
} from "../repositories/houses.repository.js";

export async function getAllHouses(req, res) {
  try {
    const all = await getHouses();

    res.status(200).json(all.rows);
    console.table(all.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch houses" });
  }
}

export async function getOneHouse(req, res) {
  try {
    const id = req.params.id;
    const one = await getHouseById(id);

    if (one.rowCount === 0) {
      console.log(`404: House with ID ${id} not found`);
      return res.status(404).json({ error: `House with ID ${id} not found` });
    }

    console.table(one.rows[0]);
    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch house" });
  }
}
