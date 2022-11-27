const express = require("express");
const app = express();
const port = 3000;

function middlewareSuccessFail(req, res, next) {
  let success = false;

  if (success) {
    console.log("succeeded in middlewareSuccessFail");
    return next();
  } else {
    let myerr = new Error("an error in middlewareSuccessFail");
    return next(myerr.message);
    // return next(myerr);
  }
}

app.use(middlewareSuccessFail);

app.get("/", (req, res) => {
  throw new Error("broken");

  res.send("Hello express!!");
});

app.get("/message", (req, res, next) => {
  let myErr = new Error("Something broke dawg!");

  res.send(myErr.message); // Error objects have a .message property you can use. Especially helpful on the front end.
});

app.get("/login", (req, res, next) => {
  res.send("login page");
});

app.get("/trycatch", (req, res, next) => {
  try {
    // something that might fail. like finding a user in a db, connect to a database, etc.
    console.log("something that doesn't exist: ", req.params.search.hey);
  } catch (error) {
    console.log("just log it: ", error.message); // or error.
    // return res.redirect("/login");
    // return res.send("You broke our app!");
    return next(error);
  }

  res.send("in the trycatch endpoing!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
