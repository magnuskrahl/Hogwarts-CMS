import pool from "../db.js";

export async function createCourse(name, teacher, students) {
  return pool.query(
    /* sql */ `
      WITH new_course AS (
        INSERT INTO courses (name, teacher)
        VALUES ($1, $2)
        RETURNING id
      )
      INSERT INTO courses_students (course, student)
      SELECT new_course.id, student_id
      FROM new_course
      CROSS JOIN unnest($3::int[]) AS student_id
      RETURNING *;
    `,
    [name, teacher, students],
  );
}

export async function getCourses() {
  return pool.query(/* sql */ `
      SELECT c.id, c.name, c.teacher, array_agg(cs.student) AS students
      FROM courses c
      LEFT JOIN courses_students cs ON cs.course = c.id
      GROUP BY c.id
      ORDER BY c.id;
    `);
}

export async function getCourseById(id) {
  return pool.query(
    /* sql */ `
      SELECT c.id, c.name, c.teacher, array_agg(cs.student) AS students
      FROM courses c
      LEFT JOIN courses_students cs ON cs.course = c.id
      WHERE c.id = $1
      GROUP BY c.id
    `,
    [id],
  );
}

export async function deleteCourse(id) {
  return pool.query(
    /* sql */ `
      DELETE FROM courses
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );
}

export async function updateCourse(id, name, teacher, students) {
  const queryData = [id];
  const sets = [];
  const updateStudents = Array.isArray(students);

  if (name !== undefined) {
    queryData.push(name);
    sets.push(/* sql */ `name = $${queryData.length}`);
  }
  if (teacher !== undefined) {
    queryData.push(teacher);
    sets.push(/* sql */ `teacher = $${queryData.length}`);
  }

  if (sets.length === 0 && !updateStudents) {
    return null;
  }

  let sqlStatement;

  if (!updateStudents) {
    sqlStatement = /* sql */ `
      UPDATE courses
      SET ${sets.join(", ")}
      WHERE id = $1
      RETURNING *
    `;
  } else {
    queryData.push(students);
    const studentsParam = `$${queryData.length}::int[]`;

    const courseSql =
      sets.length > 0
        ? /* sql */ `UPDATE courses SET ${sets.join(", ")} WHERE id = $1 RETURNING id, name, teacher`
        : /* sql */ `SELECT id, name, teacher FROM courses WHERE id = $1`;

    sqlStatement = /* sql */ `
      WITH updated AS (${courseSql}),
      removed AS (
        DELETE FROM courses_students
        WHERE course = $1 AND student <> ALL(${studentsParam})
      ),
      added AS (
        INSERT INTO courses_students (course, student)
        SELECT u.id, unnest(${studentsParam}) FROM updated u
        ON CONFLICT DO NOTHING
      )
      SELECT u.id, u.name, u.teacher, ${studentsParam} AS students
      FROM updated u
    `;
  }

  return pool.query(sqlStatement, queryData);
}
