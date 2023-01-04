const Class = require("../models/class.model");
const Student = require("../models/student.model");
const passwordHash = require("password-hash");
const attendanceRouter = require("./attendance.router");

const { faker } = require("@faker-js/faker");

const getRandomStudent = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.streetAddress(),
    email: faker.internet.email(),
    password: "12345678",
  };
};

const adminRouter = require("express").Router();

// /auth

adminRouter.get("/students/add", async (request, response) => {
  const student = getRandomStudent();
  const classes = await Class.find();
  response.render("admin/student-add.ejs", {
    request,
    response,
    student,
    classes,
  });
});

adminRouter.post("/students/add", async (request, response) => {
  let student = request.body;
  let error = null;
  try {
    student = await Student.create({
      ...student,
      password: passwordHash.generate(student.password),
    });
  } catch ({ message }) {
    const classes = await Class.find();
    error = message;
    response.render("admin/student-add.ejs", {
      request,
      response,
      student,
      classes,
      error: error,
    });
  }

  return response.redirect("/admin/students/add");
});

adminRouter.get("/students/list", async (request, response) => {
  const students = await Student.find().populate("class");
  response.render("admin/student-list.ejs", { request, response, students });
});

adminRouter.get("/classes/add", (request, response) => {
  response.render("admin/classes-add.ejs", { request, response });
});

adminRouter.post("/classes/add", (request, response) => {
  // saved.
  const title = request.body.title;
  const classObject = new Class({
    title: title,
  });

  classObject
    .save()
    .then(() => {
      response.redirect("/admin/classes/list");
    })
    .catch((error) => {
      response.render("admin/classes-add.ejs", {
        request,
        response,
        error: error.message,
      });
    });
});

adminRouter.get("/classes/list", async (request, response) => {
  const classes = await Class.find();
  response.render("admin/classes-list.ejs", { request, response, classes });
});

// /admin/at/
adminRouter.use("/attendance", attendanceRouter);
module.exports = adminRouter;
