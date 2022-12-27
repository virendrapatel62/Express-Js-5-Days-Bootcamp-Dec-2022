const http = require("http");

console.log(http);

http
  .createServer((req, res) => {
    if (req.url.includes("/courses")) {
      res.write("<h1>Course page</h1>");
    }
    if (req.url.includes("/students")) {
      res.write("<h1>Students page</h1>");
    }

    res.end();
  })
  .listen(3000);
