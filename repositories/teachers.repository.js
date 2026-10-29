import pool from "../db.js";

export async function createTeacher(name, house) {
  return pool.query(
    /* sql */ `
      INSERT INTO teachers (name, house)
      VALUES ($1, $2)
      RETURNING *
    `,
    [name, house],
  );
}

export async function getTeachers() {
  return pool.query(/* sql */ `
    SELECT *
    FROM teachers
  `);
}

export async function getTeacherById(id) {
  return pool.query(
    /* sql */ `
      SELECT *
      FROM teachers
      WHERE id = $1
    `,
    [id],
  );
}

export async function updateTeacher(id, name, house) {
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

  if (sets.length === 0) {
    return null;
  }

  return pool.query(
    /* sql */ `
      UPDATE teachers
      SET ${sets.join(", ")}
      WHERE id = $1
      RETURNING *
    `,
    queryData,
  );
}

export async function deleteTeacher(id) {
  return pool.query(
    /* sql */ `
      DELETE FROM teachers
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );
}
