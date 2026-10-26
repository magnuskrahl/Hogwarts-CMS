import { getDatabaseStatus } from "../repositories/root.repository.js";

export async function getRoot(req, res) {
  try {
    const one = await getDatabaseStatus();
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
}
