const express = require("express");
const app = express();
const port = 3000;

const products = [
  { id: "1", title: "cup", color: "red", price: 20, category: "home" },
  {
    id: "2",
    title: "5mm open cell suit",
    color: "orange",
    price: 300,
    category: "sport",
  },
  {
    id: "3",
    title: "quickdraws",
    color: "pink",
    price: 24,
    category: "sport",
  },
  {
    id: "4",
    title: "kayak",
    color: "pink",
    price: 400,
    category: "sport",
  },
  {
    id: "5",
    title: "Fluffy Kitten",
    color: "Orange and brown",
    price: 78,
    category: "home",
  },
  { id: "6", title: "Blender", color: "blue", price: 68, category: "home" },
  {
    id: "7",
    title: "Motorcycle boots",
    color: "green",
    price: 45,
    category: "sport",
  },
];

app.get("/", (req, res) => {
  res.send("Hello express!!");
});

app.get("/productNames", (req, res, next) => {
  const productNames = products.map((product) => {
    return product.title;
  });

  res.send(productNames);
});

// /product/:id/user/:userid/
app.get("/product/:id", (req, res, next) => {
  console.log("req.params: ", req.params); // url of localhost:3000/product/4 would have 4 replace :id.

  const product = products.find((product) => product.id == req.params.id);

  console.log("product? ", product);

  res.send(product);
});

app.get("/search", (req, res, next) => {
  // example url: http://localhost:3000/search?title=cup&price=40
  // example url: http://localhost:3000/search?title=c&price=40
  // example url: http://localhost:3000/search?title=cu&price=50

  console.log("req.query: ", req.query);

  let results = products.filter((product) => {
    if (product.title.includes(req.query.title)) {
      return true;
    }

    if (product.price <= req.query.price) {
      return true;
    }
  });

  res.json({ count: results.length, results: results });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
