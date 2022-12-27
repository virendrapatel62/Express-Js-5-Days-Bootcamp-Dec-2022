const express = require("express");

const app = express();

const courses = [
  { name: "Exprss JS", author: "Virendra" },
  { name: "React JS", author: "Sandeep" },
];

app.get("/", function (request, response) {
  console.log(request.url);
  response.send(
    `<div>
    
    <a href='/courses'>Go To Courses</a>
  
  </div>`
  );
});

app.get("/courses", function (request, response) {
  let coursesResponse = "";

  courses.forEach((course) => {
    coursesResponse += `<li>${course.name} by ${course.author}</li>`;
  });
  const list = `<ul>${coursesResponse}</ul>
  <div>
    <a href='/'>Go To Home</a>
  </div>
  `;
  console.log(list);

  response.send(list);
});

app.get("/students", function (request, response) {
  response.json({
    students: {
      name: "virendra",
      age: 24,
    },
  });
});

app.listen(3000);
