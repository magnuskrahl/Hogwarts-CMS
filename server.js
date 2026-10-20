const express = require("express");
const pool = require("./db");
const app = express();
const port = 6767;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies

app.get("/students", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students");

    console.table(result.rows);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch students" });
  }
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");
    res.json({ connected: true, currentTime: result.rows[0].current_time });
  } catch (error) {
    res.status(503).json({ connected: false, error: "Database unavailable" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
