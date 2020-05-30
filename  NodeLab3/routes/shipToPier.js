var express = require('express');
var router = express.Router();

// GET /cargo_on_planets
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('shipToPier');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

// GET /cargo_on_Planets/{id}
router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('shipToPier');
    var cargoOnPlanetId = req.params.id;
    collection.findOne({id: cargoOnPlanetId}, {}, function (e, docs) {
        res.json(docs);
    });
});

router.post('/:id', function (req, res) {
    var db = req.db;
    var collectionLessThen30 =[];
    var collection = db.get('shipToPier');
    var planets = db.get('planets');
    let result = {};
    collection.find({}).then((docs) => {
        docs.forEach((value) => {
                result[value.planet] = result[value.planet] + 1 || 1;

            });
    });

    planets.find({}).then((docs) => {
        docs.forEach((value)=>{
            for (let key in result){
                if(value.id == key && +value.capacity*0.3 > result[key])
                {
                    collectionLessThen30.push(value);
                    break;
                }
            }
        })
        res.json(collectionLessThen30);
    });

});

// POST /cargo_on_Planets
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('shipToPier');
    var planets = db.get('ports');
    var cargos= db.get('ships');
    let result={};
    var b = true;

    planets.findOne({ id: req.body.planet }, {}, function (e, docs) {
        return !!docs;
    }).then(function(cargoOnStationExists) {
            if (cargoOnStationExists) {
                cargos.findOne({ id: req.body.cargo }, {}, function (e, docs) {
                    return !!docs;
                }).then(function(cargoOnStationExists) {
                    if (cargoOnStationExists) {
                        collection.findOne({ id: req.body.id }, {}, function (e, docs) {
                            return !!docs;
                        }).then(function(cargoOnStationExists) {
                            if (cargoOnStationExists) {
                                res.send(`Корабель на пристані з id ${req.body.id} вже існує`);
                            } else {
                                collection.find({}).then((docs) => {
                                    docs.forEach((value) => {
                                        result[value.planet] = result[value.planet] + 1 || 1;

                                    });

                                });

                                planets.find({}).then((docs) => {
                                    docs.forEach((value)=> {

                                        for (let key in result) {

                                            if (value.id==req.body.planet && value.id== key && +value.capacity <= result[key]) {
                                                b=false;
                                                break;
                                            }
                                        }

                                    })
                                    if(b) {
                                        var cargoOnStation = {
                                            id: req.body.id,
                                            planet: req.body.planet,
                                            cargo: req.body.cargo
                                        };
                                        collection.insert(cargoOnStation, function (e, docs) {
                                            if (e) {
                                                res.send(e);
                                            } else {
                                                // res.redirect(`/${cargo_on_Stations.id}`);
                                                res.send(`Успішно прибув корабель на пристань з id ${cargoOnStation.id}`);
                                            }
                                        });
                                    }else{
                                        res.send(`На пристані з id ${req.body.planet} немає місця для корабля!`);
                                    }

                                });
                            }
                        });
                    }
                    else
                    {
                        res.send(`Корабля з id ${req.body.cargo} не існує`);
                    }})
            }
            else
            {
                res.send(`Порту з id ${req.body.spaceStation} не існує`);
            }
        }
    );

});

// PUT /cargo_on_Planets
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('shipToPier');
    var cargoOnPlanet = {
        id: req.body.id,
        planet: req.body.planet,
        cargo: req.body.cargo
    };
    collection.update({ id: cargoOnPlanet.id }, cargoOnPlanet, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            // res.redirect(`/${cargo_on_Planets.id}`);
            res.send(`Successfully updated ship on pier with id [${cargoOnPlanet.id}]`);
        }
    });
});

// DELETE /cargo_on_Planets/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('shipToPier');
    var cargoOnPlanetId = req.params.id;
    collection.remove({ id: cargoOnPlanetId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Successfully deleted ship on pier with id ${cargoOnPlanetId}`);
        }
    });
});

module.exports = router;