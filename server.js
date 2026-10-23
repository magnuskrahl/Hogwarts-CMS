const express = require("express");
const pool = require("./db");
const app = express();
const port = 6767;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies

// --ROOT--

app.get("/", async (req, res) => {
  try {
    const one = await pool.query("SELECT NOW() AS current_time");
    const message =
      "Endpoints: \n- GET /houses\n- GET /students\n- GET /students/:id";

    res.status(200).json({
      connected: true,
      currentTime: one.rows[0].current_time,
      message,
    });
    console.log("200: Database connected");
  } catch (err) {
    console.error(err);
    res.status(503).json({ connected: false, error: "Database unavailable" });
  }
});

// --HOUSES--

// READ

app.get("/houses", async (req, res) => {
  try {
    const all = await pool.query("SELECT * FROM houses");

    res.status(200).json(all.rows);
    console.table(all.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch houses" });
  }
});

app.get("/houses/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const one = await pool.query("SELECT * FROM houses WHERE id = $1", [id]);

    if (one.rowCount === 0) {
      console.log(`404: House with ID ${id} not found`);
      return res.status(404).json({ error: `House with ID ${id} not found` });
    }

    console.table(one.rows[0]);
    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch house" });
  }
});

// --TEACHERS--

// CREATE

app.post("/teachers", async (req, res) => {
  try {
    const name = req.body.name;
    const house = req.body.house ?? 0;
    const created = await pool.query(
      "INSERT INTO teachers (name, house) VALUES ($1, $2) RETURNING *",
      [name, house],
    );

    console.log(
      `201: Teacher "${name}" created with ID ${created.rows[0].id}:`,
    );
    console.table(created.rows[0]);
    res.status(201).json(created.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create teacher" });
  }
});

// READ

app.get("/teachers", async (req, res) => {
  try {
    const all = await pool.query("SELECT * FROM teachers");

    res.status(200).json(all.rows);
    console.table(all.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch teachers" });
  }
});

app.get("/teachers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const one = await pool.query("SELECT * FROM teachers WHERE id = $1", [id]);

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
});

// UPDATE

app.patch("/teachers/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const name = req.body.name;
    const house = req.body.house;
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

    if (sets.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const updated = await pool.query(
      `UPDATE teachers SET ${sets.join(", ")} WHERE id = $1 RETURNING *`,
      queryData,
    );

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
});

// DELETE

app.delete("/teachers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await pool.query(
      "DELETE FROM teachers WHERE id = $1 RETURNING *",
      [id],
    );

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
});

// --STUDENTS--

// CREATE

app.post("/students", async (req, res) => {
  try {
    const name = req.body.name;
    const house = req.body.house ?? 0;
    const semester = req.body.semester ?? 0;
    const created = await pool.query(
      "INSERT INTO students (name, house, semester) VALUES ($1, $2, $3) RETURNING *",
      [name, house, semester],
    );

    console.log(
      `201: Student "${name}" created with ID ${created.rows[0].id}:`,
    );
    console.table(created.rows[0]);
    res.status(201).json(created.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create student" });
  }
});

// READ

app.get("/students", async (req, res) => {
  try {
    const all = await pool.query("SELECT * FROM students");

    res.status(200).json(all.rows);
    console.table(all.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch students" });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const one = await pool.query("SELECT * FROM students WHERE id = $1", [id]);

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
});

// UPDATE

app.patch("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const name = req.body.name;
    const house = req.body.house;
    const semester = req.body.semester;
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
      return res.status(400).json({ error: "No fields to update" });
    }

    const updated = await pool.query(
      `UPDATE students SET ${sets.join(", ")} WHERE id = $1 RETURNING *`,
      queryData,
    );

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
});

// DELETE

app.delete("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id],
    );

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
});

// --COURSES--

// CREATE

app.post("/courses", async (req, res) => {
  try {
    const name = req.body.name;
    let teacher = req.body.teacher;
    const students = req.body.students ?? [];

    //TODO: hvis ingen students, så skal det være et tomt array, ikke null
    //eller, printes null når den nye course fås via GET /courses/:id, hvis der ingen students er tilknyttet?
    //i hvert fald, faulty error handling, poster en 500 error hvis ingen students, men der bliver oprettet en
    // course. ¯\_(ツ)_/¯

    const created = await pool.query(
      `WITH new_course AS (INSERT INTO courses (name, teacher) VALUES ($1, $2) RETURNING id) INSERT INTO courses_students (course, student) SELECT new_course.id, student_id FROM new_course CROSS JOIN unnest($3::int[]) AS student_id RETURNING *;`,
      [name, teacher, students],
    );

    console.log(
      `201: Course "${name}" created with ID ${created.rows[0].course}:`,
    );

    // lille trick for at formattere outputtet ligesom single fetch
    const print = [{ id: created.rows[0].course, ...req.body }];

    console.table(print);
    res.status(201).json(print);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create course" });
  }
});

// ...

// READ

app.get("/courses", async (req, res) => {
  try {
    // c = courses, cs = courses_students
    // array_agg(): saml alle student ID's for hvert course i et array
    // LEFT JOIN: hvis der ikke er nogen student ID's for et course, returner stadig course
    const all = await pool.query(
      "SELECT c.id, c.name, c.teacher, array_agg(cs.student) AS students FROM courses c LEFT JOIN courses_students cs ON cs.course = c.id GROUP BY c.id ORDER BY c.id;",
    );

    res.status(200).json(all.rows);
    console.table(all.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch courses" });
  }
});

app.get("/courses/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const course = await pool.query(
      "SELECT c.id, c.name, c.teacher, array_agg(cs.student) AS students FROM courses c LEFT JOIN courses_students cs ON cs.course = c.id WHERE c.id = $1 GROUP BY c.id",
      [id],
    );

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
});

app.listen(port, () => {
  console.log(`"Hogwarts CMS" Project listening on port ${port}`);
});
