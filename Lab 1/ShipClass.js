class Ship{
	constructor(name, number, country, adress){
		this.name = name;
		this.number = number;
		this.country = country;
		this.mass = mass;
	}
}

var Ships = new Array();

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
<<<<<<< HEAD
}


=======
}
>>>>>>> ca899423a3d087c23e1b7871090255cef6f3573d
