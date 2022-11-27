const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
let mysql = require("mysql");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodedb",
});

connection.connect(function (err) {
  if (err) {
    return console.log("error: " + err.message);
  }

  console.log("Connected to the MySQL server");
});

app.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM `products`",
    function (error, results, fields) {
      console.log(results[0].title);
      res.render("mysqlindex", {
        title: "Hey",
        message: "Hello there dude!",
        products: results,
      });
    }
  );
});

app.get("/product/:productid", (req, res) => {
  console.log("req.params: ", req.params);

  connection.query(
    `SELECT * FROM products WHERE id = ${req.params.productid} `,
    function (error, results, fields) {
      console.log("The results object: ", results);
      res.render("mysqlproduct", { product: results[0] });
    }
  );
});

app.post("/product", (req, res) => {
  console.log("updated the product.");
  console.log("req.body: ", req.body);
  let queryString = `UPDATE products SET `;

  let numOfParams = Object.values(req.body).filter((val) => val !== "").length;

  numOfParams -= 1; // remove one from count because the ID is in the req.body and we won't allow that to be updated.

  if (numOfParams <= 0) {
    return res.send("You can't submit an empty form!");
  }

  console.log("SHOULD HAVE STOPPED...numOfParams: ", numOfParams);

  for (const property in req.body) {
    if (property !== "id" && req.body[property]) {
      queryString += ` ${property} = '${req.body[property]}'`;
      numOfParams -= 1;
      if (numOfParams > 0) {
        queryString += ",";
      }
    } else {
      console.log("nothing happened for ", property);
    }
  }

  queryString += ` WHERE id = ${req.body.id}`;
  console.log("queryString result is: ");
  console.log(queryString);
  connection.query(queryString, function (error, results, fields) {
    console.log("in update. error: ", error);
    console.log("results: ");
    console.log(results);
    res.redirect(`/product/${req.body.id}`);
  });
});

// No idea what this is. Seems like you can run this function on every row.
app.get("/streamwithvar", (req, res) => {
  let query = connection.query("SELECT * FROM `products`");

  query.on("result", function (row, index) {
    console.log("row: ", row);
    console.log("Do some stuff for every row as its processed.");
  });

  res.send("stream with a variable");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
