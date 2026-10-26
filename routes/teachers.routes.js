import express from "express";
import {
  deleteOneTeacher,
  getAllTeachers,
  getOneTeacher,
  patchTeacher,
  postTeacher,
} from "../controllers/teachers.controller.js";

const router = express.Router();

// --TEACHERS--

// CREATE

router.post("/", postTeacher);

// READ

router.get("/", getAllTeachers);
router.get("/:id", getOneTeacher);

// UPDATE

router.patch("/:id", patchTeacher);

// DELETE

router.delete("/:id", deleteOneTeacher);

export default router;
