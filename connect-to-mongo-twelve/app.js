const express = require("express");
const app = express();
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
require("dotenv").config();
main().catch((err) => {
  console.log("Bro there was a problem... yo");
  console.log(err);
});

app.use(express.static("public")); // can visit localhost:3000/html-filename.html
app.use(bodyParser.urlencoded({ extended: true })); // google "what is urlencoded"
app.set("view engine", "pug");

async function main() {
  await mongoose.connect(
    `mongodb+srv://john:${process.env.MONGO_PASS}@${process.env.MONGO_UNIQUE_NAME}.mongodb.net/?retryWrites=true&w=majority`
  );

  app.listen({ port: process.env.PORT }, () =>
    console.log(`Server ready at http://localhost:${process.env.PORT}`)
  );
}

const kittySchema = new mongoose.Schema({
  name: String,
});

const Kitten = mongoose.model("Kitten", kittySchema);

app.get("/", async (req, res) => {
  let kittens = await Kitten.find();

  res.render("mongoindex", {
    title: "Hey",
    message: "Hello there!",
    kittens: kittens,
  });
});

app.post("/newKitten", async (req, res) => {
  console.log("req: ", req);
  console.log("req.body: ", req.body);

  const newKitten = await new Kitten({
    name: req.body.name,
    furColor: req.body.furColor, // not saved because it's not in the schema.
  });

  newKitten.save();

  res.redirect("/");
});

app.get("/kitten/:kittenid", async (req, res) => {
  console.log("req.params: ", req.params);
  const kitten = await Kitten.findById(req.params.kittenid);
  console.log(kitten);
  res.send(`kitten id: ${kitten.id} name: ${kitten.name}`);
});
