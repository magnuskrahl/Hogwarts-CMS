const express = require("express");
const pool = require("./db");
const app = express();
const port = 6767;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");
    const message =
      "Endpoints: \n- GET /houses\n- GET /students\n- GET /students/:id";
    res.status(200).json({
      connected: true,
      currentTime: result.rows[0].current_time,
      message,
    });
  } catch (error) {
    res.status(503).json({ connected: false, error: "Database unavailable" });
  }
});

// HOUSES

app.get("/houses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM houses");
    res.status(200).json(result.rows); // 200 OK
    console.table(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch houses" });
  }
});

app.get("/houses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM houses WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: `House with ID ${id} not found` });
      console.log(`404: House with ID ${id} not found`);
    } else {
      console.table(result.rows);
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Could not fetch house" });
  }
});

// STUDENTS

app.get("/students", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students");

    console.table(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch students" });
  }
});

app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: `Student with ID ${id} not found` });
      console.log(`404: Student with ID ${id} not found`);
    } else {
      console.table(result.rows);
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Could not fetch student" });
  }
});

app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM students WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: `Student with ID ${id} not found` });
      console.log(`404: Student with ID ${id} not found`);
    } else {
      console.log(`204: Student with ID ${id} deleted`);
      res.status(204).json({ message: `Student with ID ${id} deleted` }); // 204 No Content korrekt?
    }
  } catch (error) {
    res.status(500).json({ error: "Could not delete student" });
  }
});

app.post("/students", async (req, res) => {
  const name = req.body.name;
  const house = req.body.house;

  try {
    const result = await pool.query(
      "INSERT INTO students (name, house) VALUES ($1, $2) RETURNING *",
      [name, house],
    );
    console.log(`201: Student "${name}" created with ID ${result.rows[0].id}:`);
    console.table(result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not create student" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
