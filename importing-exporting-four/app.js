const express = require("express");
const app = express();
const port = 3000;
const myfunctions = require("./myfunctions");
const { countHippos, makeChili, notafunction } = require("./otherfunctions"); // destructuring

myfunctions.sayHello("Bob");
myfunctions.sayHello("Tim");

countHippos();

console.log("notafunction: ", notafunction);

app.get("/", (req, res) => {
  res.send("Hello express!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
