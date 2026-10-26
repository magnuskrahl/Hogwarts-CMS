import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
} from "../repositories/students.repository.js";

export async function postStudent(req, res) {
  try {
    const name = req.body.name;
    const house = req.body.house ?? 0;
    const semester = req.body.semester ?? 0;
    const created = await createStudent(name, house, semester);

    console.log(
      `201: Student "${name}" created with ID ${created.rows[0].id}:`,
    );
    console.table(created.rows[0]);
    res.status(201).json(created.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create student" });
  }
}

export async function getAllStudents(req, res) {
  try {
    const all = await getStudents();

    res.status(200).json(all.rows);
    console.table(all.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch students" });
  }
}

export async function getOneStudent(req, res) {
  try {
    const id = req.params.id;
    const one = await getStudentById(id);

    if (one.rowCount === 0) {
      console.log(`404: Student with ID ${id} not found`);
      return res.status(404).json({ error: `Student with ID ${id} not found` });
    }

    console.table(one.rows[0]);
    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch student" });
  }
}

export async function patchStudent(req, res) {
  try {
    const id = req.params.id;

    const name = req.body.name;
    const house = req.body.house;
    const semester = req.body.semester;
    const updated = await updateStudent(id, name, house, semester);

    if (updated === null) {
      return res.status(400).json({ error: "No fields to update" });
    }

    if (updated.rowCount === 0) {
      console.log(`404: Student with ID ${id} not found`);
      return res.status(404).json({ error: `Student with ID ${id} not found` });
    }

    console.log(`200: Student with ID ${id} updated`);
    res.status(200).json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update student" });
  }
}

export async function deleteOneStudent(req, res) {
  try {
    const id = req.params.id;
    const deleted = await deleteStudent(id);

    if (deleted.rowCount === 0) {
      console.log(`404: Student with ID ${id} not found`);
      return res.status(404).json({ error: `Student with ID ${id} not found` });
    }

    console.log(`200: Student with ID ${id} deleted`);
    res.status(200).json(deleted.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete student" });
  }
}
