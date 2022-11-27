function sayHello(name) {
  console.log(`heeeyyyy ${name}`);
}

function sayGoodbye(name = "friend") {
  console.log(`Goodbye ${name}`);
}

module.exports = {
  sayHello,
  sayGoodbye,
};
