class Pristan{
	constructor(port, number, places){
		this.name = name;
		this.number = number;
		this.places = places;
	}
}

var Pristans = new Array();

function addPristan (portNumber, number, capacity){
	Pristans.push(new Pristan(portNumber, number, capacity));
}

function deletePristan (number){
	Pristans.splice(number);
}

