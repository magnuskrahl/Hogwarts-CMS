import express from "express";
import {
  getAllCourses,
  getOneCourse,
  patchCourse,
  postCourse,
} from "../controllers/courses.controller.js";

const router = express.Router();

// --COURSES--

// CREATE

router.post("/", postCourse);

// READ

router.get("/", getAllCourses);
router.get("/:id", getOneCourse);

// UPDATE

router.patch("/:id", patchCourse);

export default router;
