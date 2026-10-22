BEGIN;

--Skab database:

CREATE TABLE houses
(
    id   int primary key not null,
    name varchar(240)    not null
);

CREATE TABLE teachers
(
    id    int generated always as identity primary key,
    name  varchar(240)               not null,
    house int references houses (id) not null
);

CREATE TABLE courses
(
    id      int generated always as identity primary key,
    name    varchar(240)                 not null,
    teacher int references teachers (id) not null
);


CREATE TABLE students
(
    id       int generated always as identity primary key,
    name     varchar(240)               not null,
    semester int                        not null,
    house    int references houses (id) not null
);

CREATE TABLE courses_students
(
    course  int references courses (id)  not null,
    student int references students (id) not null,
    primary key (course, student)
);

--Sample Data:

INSERT INTO houses(id, name)
VALUES (0, 'Unsorted'),
       (1, 'Gryffindor'),
       (2, 'Hufflepuff'),
       (3, 'Ravenclaw'),
       (4, 'Slytherin');

INSERT INTO teachers(name, house)
VALUES ('Severus Snape', 4),
       ('Minerva McGonagall', 1),
       ('Filius Flitwick', 3),
       ('Pomona Sprout', 2),
       ('Remus Lupin', 1),
       ('Rubeus Hagrid', 1);

INSERT INTO courses(name, teacher)
VALUES ('Potions', 1),
       ('Transfiguration', 2),
       ('Charms', 3),
       ('Herbology', 4),
       ('Defence Against the Dark Arts', 5),
       ('Care of Magical Creatures', 6);

INSERT INTO students(name, semester, house)
VALUES ('Harry Potter', 3, 1),
       ('Ron Weasley', 3, 1),
       ('Hermione Granger', 3, 1),
       ('Neville Longbottom', 3, 1),
       ('Ginny Weasley', 2, 1),
       ('Draco Malfoy', 3, 4),
       ('Pansy Parkinson', 3, 4),
       ('Luna Lovegood', 2, 3),
       ('Cho Chang', 4, 3),
       ('Cedric Diggory', 5, 2),
       ('Hannah Abbott', 3, 2);

INSERT INTO courses_students(course, student)
VALUES (1, 1),
       (2, 1),
       (3, 1),
       (4, 1),
       (5, 1),
       (6, 1),
       (1, 2),
       (2, 2),
       (3, 2),
       (4, 2),
       (5, 2),
       (6, 2),
       (1, 3),
       (2, 3),
       (3, 3),
       (4, 3),
       (5, 3),
       (6, 3),
       (1, 4),
       (2, 4),
       (3, 4),
       (4, 4),
       (5, 4),
       (1, 5),
       (2, 5),
       (3, 5),
       (4, 5),
       (5, 5),
       (1, 6),
       (2, 6),
       (3, 6),
       (4, 6),
       (5, 6),
       (6, 6),
       (1, 7),
       (2, 7),
       (3, 7),
       (4, 7),
       (5, 7),
       (1, 8),
       (2, 8),
       (3, 8),
       (4, 8),
       (5, 8),
       (1, 9),
       (2, 9),
       (3, 9),
       (5, 9),
       (1, 10),
       (2, 10),
       (3, 10),
       (5, 10),
       (6, 10),
       (1, 11),
       (2, 11),
       (3, 11),
       (4, 11),
       (5, 11),
       (6, 11);

COMMIT;