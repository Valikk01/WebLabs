
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


class Port{
	constructor(name, number, country, adress){
		this.name = name;
		this.number = number;
		this.country = country;
		this.adress = adress;
	}
}
class Ship{
	constructor(name, number, country, adress){
		this.name = name;
		this.number = number;
		this.country = country;
		this.mass = mass;
	}
}
class Pristan{
	constructor(port, number, places){
		this.name = name;
		this.number = number;
		this.places = places;
	}
}
var Ports = new Array();
var Ships = new Array();
var Pristans = new Array();


function addPort (name, number, country, adress){
	Ports.push(new Port(name, number, country, adress));
}
function changePort (portIndex,name, number, country, adress){
	Ports[portIndex].name = name;
	Ports[portIndex].number = number;
	Ports[portIndex].country = country;
	Ports[portIndex].adress = adress;
}
function deletePort (portIndex){
	Ports.splice(portIndex);
}

function foundPort (name){
	var found = Ports.find(function(element) {
  	return element.name == name;
	});
	return found;
}

function addShip (name, number, country, adress){
	Ships.push(new Ship(name, number, country, adress));
}
function changeShip (shipIndex,name, number, country, mass){
	Ships[shipIndex].name = name;
	Ships[shipIndex].number = number;
	Ships[shipIndex].country = country;
	Ships[shipIndex].mass = mass;
}
function deleteShip (shipIndex){
	Ships.splice(shipIndex);
}

function foundShip (name){
	var found = Ships.find(function(element) {
  	return element.name == name;
	});
	return found;
}
function addPristan (portNumber, number, capacity){
	Pristans.push(new Pristan(portNumber, number, capacity));
}

addPort("name", 12, "asdsad", "asddsda");
addPort("name1", 13, "asdsdsad", "awesda");



console.log(Ports);
