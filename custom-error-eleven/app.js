const express = require("express");
const app = express();
const port = 3000;

const ErrorHandler = (err, req, res, next) => {
  console.log("ErrorHandler function");

  res.send(
    "Oh no an error! This is handled with our custom error handling function"
  );
};

function triggerAnError(req, res, next) {
  let errorExists = false;
  if (errorExists) {
    let myerr = new Error("My error...");

    next(myerr);
  } else {
    next();
  }
}

app.use(triggerAnError);

app.use(ErrorHandler);

app.get("/", (req, res) => {
  res.send("Hello express!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
