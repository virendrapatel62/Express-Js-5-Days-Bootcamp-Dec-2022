const Admin = require("../models/user.model");

const passwordHash = require("password-hash");

const authRouter = require("express").Router();

// /auth

authRouter.get("/login", (request, response) => {
  response.render("auth/login.ejs", { request, response });
});
authRouter.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const admin = await Admin.findOne({
    email: email,
  });

  console.log(admin);

  if (admin) {
    if (passwordHash.verify(password, admin.password)) {
      delete admin.id;
      request.session.user = admin;
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
