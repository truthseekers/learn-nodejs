const express = require("express");
const app = express();
const port = 3000;
const products = require("./products.json");
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(express.static("post-request-json-db-six/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello express!!");
});

app.get("/productNames", (req, res, next) => {
  const productNames = products.map((product) => {
    return product.title;
  });

  res.send(productNames);
});

app.post("/simpleFormSubmit", (req, res, next) => {
  console.log("req.body in formsubmit: ", req.body);

  res.send("tmp form submitted!");
});

app.post("/newProduct", (req, res, next) => {
  console.log("req.body from newProduct: ", req.body);

  products.push({
    id: products.length + 1,
    title: req.body.title,
    color: req.body.color,
    price: req.body.price,
    category: req.body.category,
  });

  console.log(products);

  fs.writeFile(
    "post-request-json-db-six/products.json",
    JSON.stringify(products),
    (err) => {
      if (err) throw err;
      console.log("Done writing the products 'database'");
    }
  );

  res.redirect("/productNames");
  // res.send("You added the product! Check the existing products page.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
