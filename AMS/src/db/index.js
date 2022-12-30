const mongoose = require("mongoose");
const Admin = require("../models/user.model");
const passwordHash = require("password-hash");
function createConnection() {
  return mongoose.connect("mongodb://127.0.0.1:27017/AMS");
}

function createAdmin() {
  const admin = new Admin({
    email: "sandeep@gmail.com",
    password: passwordHash.generate("12345678"),
    name: "Sandeep",
  });

  admin
    .save()
    .then((admin) => console.log(admin))
    .catch((error) => console.log(error.message));
}

module.exports = {
  createConnection,
  createAdmin,
};
