const express = require("express");
const adminRouter = require("./routers/admin.router");
const authRouter = require("./routers/auth.router");
const app = express();
const PORT = 3000;

app.set("engine", "ejs");

app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.get("/profile", (request, response) => {
  if (request.query.type === "admin") {
    return response.render("admin-profile.ejs");
  }
  response.render("student-profile.ejs");
});

app.get("/", (_, response) => {
  response.render("index.ejs");
});

app.all("*", (_, response) => {
  response.render("404.ejs");
});

app.listen(PORT, () => {
  console.log(`App is Listening ${PORT}`);
});
