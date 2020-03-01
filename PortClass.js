class Port{
	constructor(name, number, country, adress){
		this.name = name;
		this.number = number;
		this.country = country;
		this.adress = adress;
	}
}

var Ports = new Array();


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