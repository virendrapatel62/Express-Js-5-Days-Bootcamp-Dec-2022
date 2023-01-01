const mongoose = require("mongoose");

const classShcema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Class = mongoose.model("Class", classShcema);

module.exports = Class;
