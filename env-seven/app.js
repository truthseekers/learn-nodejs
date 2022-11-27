const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;
require("dotenv").config();

const mysecretkey = process.env.SECRET_KEY;

console.log(`my secret key: ${mysecretkey}`);
console.log(`PUT YOUR .env FILES IN .gitignore !!!`);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World ONE two three four!");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
