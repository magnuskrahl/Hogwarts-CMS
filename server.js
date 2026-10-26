import express from "express";
import rootRoutes from "./routes/root.routes.js";
import housesRoutes from "./routes/houses.routes.js";
import teachersRoutes from "./routes/teachers.routes.js";
import studentsRoutes from "./routes/students.routes.js";
import coursesRoutes from "./routes/courses.routes.js";

const app = express();
const port = 6767;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies

app.use("/", rootRoutes);
app.use("/houses", housesRoutes);
app.use("/teachers", teachersRoutes);
app.use("/students", studentsRoutes);
app.use("/courses", coursesRoutes);

app.listen(port, () => {
  console.log(`"Hogwarts CMS" Project listening on port ${port}`);
});
