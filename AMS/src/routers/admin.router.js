const adminRouter = require("express").Router();

// /auth

adminRouter.get("/students/add", (request, response) => {
  response.render("admin/student-add.ejs");
});

adminRouter.get("/students/list", (request, response) => {
  response.render("admin/student-list.ejs");
});

module.exports = adminRouter;
