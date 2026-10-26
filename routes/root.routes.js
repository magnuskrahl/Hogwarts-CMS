import express from "express";
import { getRoot } from "../controllers/root.controller.js";

const router = express.Router();

// --ROOT--

router.get("/", getRoot);

export default router;
