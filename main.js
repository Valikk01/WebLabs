'use strict'
const myModule = require('./functions');

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const Users = [new User('Vova', 12), new User('Andry', 34), new User('name3', 43)];
Users.sort((a, b) => (a.name > b.name) ? 1 : -1);

console.log(Users)
console.log('Hello Node')

console.log(myModule.stringToArr("asjkdh asl alksd"))

console.log(myModule.SortCharacters("dcba"))

var arr = [2, 11, 37, 42];
arr = myModule.shuffle(arr);
console.log(arr);

console.log("asdsda")