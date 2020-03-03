class Port{
	constructor(name, number, country, adress){
		this.name = name;
		this.number = number;
		this.country = country;
		this.adress = adress;
	}
}

class ShipAtPort{
	constructor(ship, port){
		this.ship = ship;
		this.port = port;
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

var Ships = new Array();
var Ports = new Array();
var ShipsAtPorts = new Array();

function addShipToPort (ship, port){
	ShipsAtPorts.push(new ShipAtPort(ship, port));
}


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


addShipToPort(2,1);