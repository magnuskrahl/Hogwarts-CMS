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

export async function updateCourse(id, name, teacher, students) {
  const queryData = [id];
  const sets = [];
  let insertStudents = null;

  if (name !== undefined) {
    queryData.push(name);
    sets.push(`name = $${queryData.length}`);
  }
  if (teacher !== undefined) {
    queryData.push(teacher);
    sets.push(`teacher = $${queryData.length}`);
  }
  if (Array.isArray(students) && students.length > 0) {
    insertStudents = ``;
  }

  if (sets.length === 0 && students === undefined) {
    return res.status(400).json({ error: "No fields to update" });
  }
  return pool.query(``[queryData]);
}
