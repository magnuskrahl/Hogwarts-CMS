import {
  getCourseById,
  getCourses,
} from "../repositories/courses.repository.js";
import { createCourseResponse } from "../services/courses.service.js";

export async function postCourse(req, res) {
  try {
    const name = req.body.name;
    const teacher = req.body.teacher;
    const students = req.body.students ?? [];

    const { created, print } = await createCourseResponse(
      name,
      teacher,
      students,
      req.body,
    );

    console.log(
      `201: Course "${name}" created with ID ${created.rows[0].course}:`,
    );

    console.table(print);
    res.status(201).json(print);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create course" });
  }
}

export async function getAllCourses(req, res) {
  try {
    // c = courses, cs = courses_students
    // array_agg(): saml alle student ID's for hvert course i et array
    // LEFT JOIN: hvis der ikke er nogen student ID's for et course, returner stadig course
    const all = await getCourses();

    res.status(200).json(all.rows);
    console.table(all.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch courses" });
  }
}

export async function getOneCourse(req, res) {
  try {
    const id = req.params.id;
    const course = await getCourseById(id);

    if (course.rowCount === 0) {
      console.log(`404: Course with ID ${id} not found`);
      return res.status(404).json({ error: `Course with ID ${id} not found` });
    }

    res.status(200).json(course.rows);
    console.table(course.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch course" });
  }
}

export async function patchCourse(req, res) {
  try {
    const name = req.body.name;
    const teacher = req.body.teacher;
    const students = req.body.students ?? [];

    const { created, print } = await createCourseResponse(
      name,
      teacher,
      students,
      req.body,
    );

    console.log(
      `201: Course "${name}" created with ID ${created.rows[0].course}:`,
    );

    console.table(print);
    res.status(201).json(print);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update course" });
  }
}
