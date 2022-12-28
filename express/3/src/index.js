const express = require("express");
const crypto = require("crypto");
const app = express();
const port = 3000;

app.set("engine", "ejs");

app.use(express.urlencoded());

app.get("/school/student", (request, response) => {
  console.log("GET : STUDENTS");
  response.render("school.ejs", { students });
});
app.post("/school/student/delete", (request, response) => {
  const index = students.findIndex((s) => s.id === request.body.id);
  students.splice(index, 1);
  response.render("school.ejs", { students });
});

const students = [];

app.post("/school/student", (request, response) => {
  console.log("POST : reading data");

  const student = request.body;
  console.log("POST : pushing stident");

  students.push({
    ...student,
    id: crypto.randomUUID(),
  });
  console.log("POST : sending data to ejs");

  response.render("school.ejs", { students });
});

const personReader = (req, res, next) => {
  const person = {
    name: req.query.name,
    age: req.query.age,
    canVote: +req.query.age > 18,
  };

  req.person = person;
  next();
};

app.use(personReader);

app.get("/student", personReader, (req, res) => {
  const student = req.person;
  res.json({ student: student });
});
app.get("/employee", personReader, (req, res) => {
  const employee = req.person;
  return res.json({ employee });
});

app.all("/", (req, res) => {
  const number = req.query.number || req.body.number || 2;
  const table = new Array(10)
    .fill(0)
    .map((item, index) => number * (index + 1));
  const context = {
    table,
  };
  res.render("index.ejs", context);
});

app.get("/:number/:times", (req, res, next) => {
  console.log(req.params);
  const number = +req.params.number;
  const times = +req.params.times;

  if (!number || !times) {
    next();
    return;
  }
  const table = new Array(times)
    .fill(0)
    .map((item, index) => number * (index + 1));
  const context = {
    table,
  };
  res.render("advancedTable.ejs", context);
});

app.get("/", (req, res) => {
  const number = req.query.number;
  const table = new Array(10)
    .fill(0)
    .map((item, index) => number * (index + 1));
  const context = {
    table,
  };
  res.render("index.ejs", context);
});

// app.post("/", (req, res) => {
//   const number = req.body.number;
//   const table = new Array(10)
//     .fill(0)
//     .map((item, index) => number * (index + 1));
//   const context = {
//     table,
//   };
//   res.render("index.ejs", context);
// });

app.get("*", (request, response) => {
  response.json({
    error: "NOT FOUND",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
