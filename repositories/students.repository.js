import pool from "../db.js";

export async function createStudent(name, house, semester) {
  return pool.query(
    "INSERT INTO students (name, house, semester) VALUES ($1, $2, $3) RETURNING *",
    [name, house, semester],
  );
}

export async function getStudents() {
  return pool.query("SELECT * FROM students");
}

export async function getStudentById(id) {
  return pool.query("SELECT * FROM students WHERE id = $1", [id]);
}

export async function updateStudent(id, name, house, semester) {
  const queryData = [id];
  const sets = [];

  if (name !== undefined) {
    queryData.push(name);
    sets.push(`name = $${queryData.length}`);
  }
  if (house !== undefined) {
    queryData.push(house);
    sets.push(`house = $${queryData.length}`);
  }
  if (semester !== undefined) {
    queryData.push(semester);
    sets.push(`semester = $${queryData.length}`);
  }

  if (sets.length === 0) {
    return null;
  }

  return pool.query(
    `UPDATE students SET ${sets.join(", ")} WHERE id = $1 RETURNING *`,
    queryData,
  );
}

export async function deleteStudent(id) {
  return pool.query(
    "DELETE FROM students WHERE id = $1 RETURNING *",
    [id],
  );
}
