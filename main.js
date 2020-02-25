'use strict'
const myModule = require('./functions');
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


console.log('Hello Node')
console.log('input')

myModule.days("01/01/2021");

console.log(myModule.stringToArr("asjkdh asl alksd"))
console.log(myModule.SortCharacters("dcba"))

var arr = [2, 11, 37, 42];
arr = myModule.shuffle(arr);
console.log(arr);

