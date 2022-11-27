const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello express!!");
});

app.use(express.static("html-in-node-five/public"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
