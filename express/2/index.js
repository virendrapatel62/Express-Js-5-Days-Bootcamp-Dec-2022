const express = require("express");
const path = require("path");

const app = express();

app.set("engine", "ejs");

const courses = [
  { name: "Exprss JS", author: "Virendra" },
  { name: "React JS", author: "Sandeep" },
];

app.get("/", function (request, response) {
  // response.sendFile(path.join(__dirname, "pages", "index.html"));
  response.render("index.ejs");
});

app.get("/courses", function (request, response) {
  // fetch the data from Db

  const number = Math.random();

  response.render("courses.ejs", { number: number, courses: courses });
  // response.sendFile(path.join(__dirname, "pages", "courses.html"));
});
app.get("/number", function (request, response) {
  const number = ~~(Math.random() * 1000);
  response.render("number.ejs", { number: number });
});

app.get("/students", function (request, response) {});

app.listen(3000);
