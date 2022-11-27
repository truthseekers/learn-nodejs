function countHippos() {
  console.log("I am coutning hippos");
}

function makeChili(flavor) {
  console.log(`mmm ${flavor} chili`);
}

const notafunction = [
  { id: "1", title: "cup", color: "red", price: 20, category: "home" },
  {
    id: "2",
    title: "5mm open cell suit",
    color: "orange",
    price: 300,
    category: "sport",
  },
];

module.exports = {
  countHippos,
  makeChili,
  notafunction,
};
