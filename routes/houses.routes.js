import express from "express";
import {
  getAllHouses,
  getOneHouse,
} from "../controllers/houses.controller.js";

const router = express.Router();

// --HOUSES--

// READ

router.get("/", getAllHouses);
router.get("/:id", getOneHouse);

export default router;
