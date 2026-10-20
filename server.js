const express = require("express");
const pool = require("./db");
const app = express();
const port = 6767;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies

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

// HOUSES

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

// STUDENTS

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

app.post("/students", async (req, res) => {
  try {
    const name = req.body.name;
    const house = req.body.house ?? "Unsorted";
    const created = await pool.query(
      "INSERT INTO students (name, house) VALUES ($1, $2) RETURNING *",
      [name, house],
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
