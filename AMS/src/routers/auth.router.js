const Admin = require("../models/user.model");

const passwordHash = require("password-hash");
const Student = require("../models/student.model");

const authRouter = require("express").Router();

// /auth

authRouter.get("/login", (request, response) => {
  response.render("auth/login.ejs", { request, response });
});
authRouter.post("/login", async (request, response) => {
  const { email, password, user: type } = request.body;
  const isAdmin = type === "admin";
  let user = null;
  if (isAdmin) {
    user = await Admin.findOne({
      email: email,
    });
  } else {
    user = await Student.findOne({
      email: email,
    });
  }

  console.log({ user });

  if (user) {
    if (passwordHash.verify(password, user.password)) {
      request.session.user = {
        ...user._doc,
        isAdmin,
      };
      return response.redirect("/");
    }
  }

  response.render("auth/login.ejs", {
    error: "Email or password incorrect!",
    request,
    response,
  });
});

authRouter.get("/logout", (request, response) => {
  request.session = null;
  return response.redirect("/auth/login");
});

module.exports = authRouter;
