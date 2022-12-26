const name = "virendra";
const firstName = "virendra patel";
const fullName = `virnedra 
is
teaching`;

console.log(firstName, fullName, name);

console.log(firstName.charAt(0));
console.log(firstName.split("e"));
console.log(firstName.split(""));
console.log(firstName.split(" "));

console.log("      hello    ".trim());
console.log("      hello    ".trimEnd(), "<");
console.log("      hello    ".trimStart(), "<");

const namem = "34";
const name2 = "";
const name3 = "";
const name4 = "";

const names = ["name1", "viren", "mohan"];
names.push("Harsh");
console.log(names);
names.pop();
console.log(names);

console.log(names[0]);
console.log(names[1]);
console.log(names[2]);

names.splice(1, 1);
console.log(names);

names.push("vinrerda");
names.push("A");
names.push("B");
names.push("C");
names.push("D");
names.push("E");

console.log(names);

const index = names.findIndex((item) => item === "A");
names.splice(index, 1);
console.log(names, index);

names.forEach((item) => console.log(item));

const mappedArray = names.map((item) => item.charAt(0));

console.log(mappedArray);
