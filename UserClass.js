
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const Users = [new User('Vova', 12), new User('Andry', 34), new User('Yan', 43)];
Users.sort((a, b) => (a.name > b.name) ? 1 : -1);
let array = new Array();
array.push(new User('Vova', 12));
console.log(Users);

