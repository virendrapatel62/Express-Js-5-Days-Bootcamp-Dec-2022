const adminRouter = require("express").Router();

// /auth

adminRouter.get("/students/add", (request, response) => {
  response.render("admin/student-add.ejs", { request, response });
});

adminRouter.get("/students/list", (request, response) => {
  response.render("admin/student-list.ejs", { request, response });
});

module.exports = adminRouter;
