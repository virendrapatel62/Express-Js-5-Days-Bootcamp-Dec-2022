const mongoose = require("mongoose");
const Class = require("./class.model");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: "String",
      required: true,
    },
    lastName: {
      type: "String",
      required: true,
    },
    address: {
      type: "String",
      required: true,
    },
    class: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: Class,
    },
    email: {
      type: "String",
      required: true,
      unique: true,
    },
    password: {
      type: "String",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
