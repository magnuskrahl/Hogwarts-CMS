import express from "express";
import {
  deleteOneStudent,
  getAllStudents,
  getOneStudent,
  patchStudent,
  postStudent,
} from "../controllers/students.controller.js";

const router = express.Router();

// --STUDENTS--

// CREATE

router.post("/", postStudent);

// READ

router.get("/", getAllStudents);
router.get("/:id", getOneStudent);

// UPDATE

router.patch("/:id", patchStudent);

// DELETE

router.delete("/:id", deleteOneStudent);

export default router;
