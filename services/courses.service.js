import { createCourse } from "../repositories/courses.repository.js";

export async function createCourseResponse(name, teacher, students, body) {
  // TODO: hvis ingen students, så skal det være et tomt array, ikke null
  // eller, printes null når den nye course fås via GET /courses/:id, hvis der ingen students er tilknyttet?
  // i hvert fald, faulty error handling, poster en 500 error hvis ingen students, men der bliver oprettet en
  // course. ¯\_(ツ)_/¯

  const created = await createCourse(name, teacher, students);

  // lille trick for at formattere outputtet ligesom single fetch
  const print = [{ id: created.rows[0].course, ...body }];

  return { created, print };
}

export async function updateCourseResponse(id, name, teacher, students, body) {
  const updated = await updateCourse(id, name, teacher, students);

  // lille trick for at formattere outputtet ligesom single fetch
  const print = [{ id: updated.rows[0].course, ...body }];
  return { updated, print };
}
