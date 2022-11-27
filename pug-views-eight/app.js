const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const products = require("./products");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hey",
    message: "Hello there!",
    products: products,
  });
});

app.get("/product/:productid", (req, res) => {
  console.log("req.params: ", req.params);
  const product = products.find(
    (element) => element.id == req.params.productid
  );
  res.render("product", { product });
});

app.post("/product", (req, res) => {
  console.log("updated the product.");
  console.log("req.body: ", req.body);

  let productIndex = products.findIndex((product) => product.id == req.body.id);

  products[productIndex].title = req.body.title || products[productIndex].title;
  products[productIndex].color = req.body.color || products[productIndex].color;
  products[productIndex].price = req.body.price || products[productIndex].price;
  products[productIndex].category =
    req.body.category || products[productIndex].category;

  fs.writeFile(
    "pug-views-eight/products.json",
    JSON.stringify(products),
    (err) => {
      if (err) throw err;
      console.log("done writing...");
    }
  );

  res.redirect(`/product/${req.body.id}`);
});

app.get("/test", (req, res) => {
  res.send("there's nothing to see here. Go back to the / route");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
