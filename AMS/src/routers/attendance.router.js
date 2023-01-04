const Admin = require("../models/user.model");
const Student = require("../models/student.model");
const Attendance = require("../models/attendance.model");
const Class = require("../models/class.model");

const attendanceRouter = require("express").Router();
const moment = require("moment");
// /admin/attendance/

attendanceRouter.get("/mark", async (request, response) => {
  const _class = request.query.class;
  const date = request.query.date;
  let students = [];
  if (_class) {
    students = await Student.find({
      class: _class,
    }).populate("class");
  }

  for (let index = 0; index < students.length; index++) {
    const attendance = await Attendance.findOne({
      class: _class,
      student: students[index]._id,
      date: moment(date).startOf("date"),
    });

    students[index].present = attendance && attendance.present;
  }

  const classes = await Class.find();

  response.render("admin/attendance/mark.ejs", {
    request,
    response,
    students,
    classes,
    today: moment().format("YYYY-MM-DD"),
  });
});

attendanceRouter.post("/mark", async (request, response) => {
  let { date, student, class: _class, present } = request.body;

  if (present != "true") {
    present = false;
  } else {
    present = true;
  }

  let attendance = await Attendance.findOne({
    class: _class,
    student: student,
    date: moment(date).startOf(),
  });

  if (attendance) {
    attendance.present = Boolean(present);
  } else {
    attendance = new Attendance({
      class: _class,
      student: student,
      date: moment(date).startOf(),
      present: Boolean(present),
    });
  }

  attendance = await attendance.save();
  response.redirect(request.originalUrl);
});

module.exports = attendanceRouter;
