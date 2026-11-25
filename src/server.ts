// import express from "express";
// const port = 3000;
// const app = express();

// app.get("/", (req, res) => {
//   res.send("Home page");
// });

// app.listen(port, () => {
//   console.log(`Servidor em execução na porta ${port}`);
// });

const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");

  if (req.url === "/") {
    res.statusCode = 200;
    res.end("Home page");
  } else if (req.url === "/sobre") {
    res.statusCode = 200;
    res.end("About page");
  }
});

server.listen(3000, () => {
  console.log(`Servidor em execução em http://localhost:3000/`);
});
