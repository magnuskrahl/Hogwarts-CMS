import pool from "../db.js";

export async function createCourse(name, teacher, students) {
  return pool.query(
    `WITH new_course AS (INSERT INTO courses (name, teacher) VALUES ($1, $2) RETURNING id) INSERT INTO courses_students (course, student) SELECT new_course.id, student_id FROM new_course CROSS JOIN unnest($3::int[]) AS student_id RETURNING *;`,
    [name, teacher, students],
  );
}

export async function getCourses() {
  return pool.query(
    "SELECT c.id, c.name, c.teacher, array_agg(cs.student) AS students FROM courses c LEFT JOIN courses_students cs ON cs.course = c.id GROUP BY c.id ORDER BY c.id;",
  );
}

export async function getCourseById(id) {
  return pool.query(
    "SELECT c.id, c.name, c.teacher, array_agg(cs.student) AS students FROM courses c LEFT JOIN courses_students cs ON cs.course = c.id WHERE c.id = $1 GROUP BY c.id",
    [id],
  );
}
