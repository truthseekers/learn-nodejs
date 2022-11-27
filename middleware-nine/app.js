const express = require("express");
const app = express();
const port = 3000;

function sayHello(req, res, next) {
  console.log("Hello!");
  console.log("req.user: ", req.user);

  return next();
  console.log("I am running after next() if you don't return the next()");
}

function intercept(req, res, next) {
  if (false) {
    // true will cause "intercept" function to intercept the request response cycle and redirect to the
    // "/bad" route.  false will not trigger this conditional, and instead next() will be hit to hit th enext middleware
    // function
    return res.redirect("/bad");
  }

  return next();
}

function addUser(req, res, next) {
  req.user = { name: "Bob", age: 41 };
  return next();
}

app.use(addUser);
app.use(sayHello);

app.get("/bad", (req, res) => {
  res.send("Bad route");
});

app.get("/", (req, res) => {
  res.send("Hello express!!");
});

app.get("/two", (req, res) => {
  res.send("Hello express!!");
});

app.get(
  "/returnbad",
  intercept,
  (req, res, next) => {
    console.log("Just another middleware function.");
    // res.send("RETURN bad");
    next();
  },
  (req, res) => {
    res.send("RETURN bad");
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
