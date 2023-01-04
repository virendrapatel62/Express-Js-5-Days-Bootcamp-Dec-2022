const express = require("express");
const { createConnection, createAdmin } = require("./db");
const { requestLogger } = require("./middlewares");
const Admin = require("./models/user.model");
const adminRouter = require("./routers/admin.router");
const authRouter = require("./routers/auth.router");
var cookieSession = require("cookie-session");
const attendanceRouter = require("./routers/attendance.router");
const app = express();
const PORT = 3000;
const moment = require("moment");

createConnection().then(() => {
  console.log("Mongo DB connection Created !");
  createAdmin();
});

app.use(
  cookieSession({
    name: "session",
    keys: ["secret", "AMS"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(express.urlencoded());
app.use(requestLogger);

app.set("engine", "ejs");

app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.get("/profile", (request, response) => {
  if (request.query.type === "admin") {
    return response.render("admin-profile.ejs", { request, response });
  }
  response.render("student-profile.ejs", { request, response });
});

app.get("/", (request, response) => {
  response.render("index.ejs", { request, response });
});

app.all("*", (request, response) => {
  response.render("404.ejs", { request, response });
});

app.listen(PORT, () => {
  console.log(`App is Listening ${PORT}`);
});
