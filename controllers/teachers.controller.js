import {
  createTeacher,
  deleteTeacher,
  getTeacherById,
  getTeachers,
  updateTeacher,
} from "../repositories/teachers.repository.js";

export async function postTeacher(req, res) {
  try {
    const name = req.body.name;
    const house = req.body.house ?? 0;
    const created = await createTeacher(name, house);

    console.log(
      `201: Teacher "${name}" created with ID ${created.rows[0].id}:`,
    );
    console.table(created.rows[0]);
    res.status(201).json(created.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create teacher" });
  }
}

export async function getAllTeachers(req, res) {
  try {
    const all = await getTeachers();

    res.status(200).json(all.rows);
    console.table(all.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch teachers" });
  }
}

export async function getOneTeacher(req, res) {
  try {
    const id = req.params.id;
    const one = await getTeacherById(id);

    if (one.rowCount === 0) {
      console.log(`404: Teacher with ID ${id} not found`);
      return res.status(404).json({ error: `Teacher with ID ${id} not found` });
    }

    console.table(one.rows[0]);
    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch teacher" });
  }
}

export async function patchTeacher(req, res) {
  try {
    const id = req.params.id;

    const name = req.body.name;
    const house = req.body.house;
    const updated = await updateTeacher(id, name, house);

    if (updated === null) {
      return res.status(400).json({ error: "No fields to update" });
    }

    if (updated.rowCount === 0) {
      console.log(`404: Teacher with ID ${id} not found`);
      return res.status(404).json({ error: `Teacher with ID ${id} not found` });
    }

    console.log(`200: Teacher with ID ${id} updated`);
    res.status(200).json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update teacher" });
  }
}

export async function deleteOneTeacher(req, res) {
  try {
    const id = req.params.id;
    const deleted = await deleteTeacher(id);

    if (deleted.rowCount === 0) {
      console.log(`404: Teacher with ID ${id} not found`);
      return res.status(404).json({ error: `Teacher with ID ${id} not found` });
    }

    console.log(`200: Teacher with ID ${id} deleted`);
    res.status(200).json(deleted.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete teacher" });
  }
}
