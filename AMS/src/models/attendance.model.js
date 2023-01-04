const mongoose = require("mongoose");
const Class = require("./class.model");
const Student = require("./student.model");

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: Student,
    },
    class: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: Class,
    },
    date: {
      type: Date,
      require: true,
    },
    present: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
