import pool from "../db.js";

export async function createStudent(name, house, semester) {
  return pool.query(
    /* sql */ `
      INSERT INTO students (name, house, semester)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    [name, house, semester],
  );
}

export async function getStudents() {
  return pool.query(/* sql */ `
    SELECT *
    FROM students
  `);
}

export async function getStudentById(id) {
  return pool.query(
    /* sql */ `
      SELECT *
      FROM students
      WHERE id = $1
    `,
    [id],
  );
}

export async function updateStudent(id, name, house, semester) {
  const queryData = [id];
  const sets = [];

  if (name !== undefined) {
    queryData.push(name);
    sets.push(/* sql */ `name = $${queryData.length}`);
  }
  if (house !== undefined) {
    queryData.push(house);
    sets.push(/* sql */ `house = $${queryData.length}`);
  }
  if (semester !== undefined) {
    queryData.push(semester);
    sets.push(/* sql */ `semester = $${queryData.length}`);
  }

  if (sets.length === 0) {
    return null;
  }

  return pool.query(
    /* sql */ `
      UPDATE students
      SET ${sets.join(", ")}
      WHERE id = $1
      RETURNING *
    `,
    queryData,
  );
}

export async function deleteStudent(id) {
  return pool.query(
    /* sql */ `
      DELETE FROM students
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );
}
