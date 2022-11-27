const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize("nodedb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");

sequelize.define(
  "User",
  {
    // ... (attributes)
  },
  {
    timestamps: false,
  }
);

// class Product extends Model {}
const Product = sequelize.define(
  "Product",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    price: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();

app.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "title", "color", "price", "category"],
    });

    return res.render("mysqlindex", {
      title: "Hey",
      message: "Hello there dude!",
      products: products,
    });
  } catch (error) {
    console.log("error: ", error);

    return res.render("error", {
      title: "ERROR",
      message: "Hello there dude!",
    });
  }
});

// The form for this hasn't been added. You'll have to do this yourself :-)
app.post("/newProduct", async (req, res) => {
  console.log("req: ", req);
  console.log("req.body: ", req.body);

  const newProduct = Product.build({
    title: req.body.title,
    color: req.body.color,
    price: req.body.price,
    category: req.body.category,
  });

  await newProduct.save();

  res.redirect("/");
});
