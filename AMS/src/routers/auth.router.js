const authRouter = require("express").Router();

// /auth

authRouter.get("/login", (request, response) => {
  response.render("auth/login.ejs");
});

authRouter.get("/logout", (request, response) => {
  response.redirect("/");
});

module.exports = authRouter;
