const Admin = require("../models/user.model");
const Student = require("../models/student.model");
const Class = require("../models/class.model");

const attendanceRouter = require("express").Router();

// /admin/attendance/

attendanceRouter.get("/mark", async (request, response) => {
  const _class = request.query.class;
  let students = [];
  if (_class) {
    students = await Student.find({
      class: _class,
    }).populate("class");
  }

  console.log(request.query.course);
  const classes = await Class.find();
  response.render("admin/attendance/mark.ejs", {
    request,
    response,
    students,
    classes,
  });
});

module.exports = attendanceRouter;
