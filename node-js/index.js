// const mathModule = require("./math");

// const sum = mathModule.sum;

// // const answer = sum(23, 24);
// // console.log({ answer });

// console.log(sum(23, 24));

const fs = require("fs");

// function onSuccess(error, data) {
//   console.log("File Read complete", data.toString());
// }

// fs.readFile(__dirname + "/users.json", onSuccess);

function placeOrder(name, address, callback) {
  console.log("Order placeed", name, address);
  callback();
}

placeOrder("virnedra", "jabalpur", () => {
  console.log("Sending email");
});
placeOrder("sandeep", "jabalpur", () => {
  console.log("send Order Id on Phone");
});

var x; // x is hoisted
function random() {
  x = 21; // Initialization of x
  console.log(x);
}
random();

x++; // x is not a number since it is not initialized yet

console.log(x);
