var express = require('express');
var router = express.Router();

// GET /space_stations
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('ships');
    collection.find({}, {}, function (e, docs) {
        /*console.log(docs.ops);*/
        res.json(docs);
    });
});

router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('space_stations');
    var space_stationsId = req.params.id;
    console.log(space_stationsId);
    collection.findOne({ id: space_stationsId }).then(function(space_stationsExists) {
        if (space_stationsExists) {
            res.send(`Корабель з id ${space_stationsId} існує`);
        } else{
            res.send(`Корабель з id ${space_stationsId} не існує`);
        }

    });
});

// POST /space_stations
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('ships');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(shipExists) {
        if (shipExists) {
            res.send(`Корабель з id ${req.body.id} вже існує`);
        } else{
            var ship = {
                id: req.body.id,
                number: req.body.number,
                necessity: req.body.necessity,
                capacity: req.body.capacity
            };
            collection.insert(ship, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    // res.redirect(`/space_stations/${space_station.id}`);
                    res.send(`Успішно створений Корабель з id ${ship.id}`);
                }
            });
        }
    });
});

// PUT /space_stations
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('ships');
    var ship = {
        id: req.body.id,
        number: req.body.number,
        necessity: req.body.necessity,
        capacity: req.body.capacity
    };
    collection.update({ id: ship.id }, ship, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            // res.redirect(`/space_stations/${space_station.id}`);
            res.send(`Успішно відредагований Корабель з id [${ship.id}]`);
        }
    });
});

router.post('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('ships');
    var space_stationsId = req.params.id;
    console.log(space_stationsId);
    var space_stations = {
        id: req.body.id,
        number: req.body.number,
        necessity: req.body.necessity,
        capacity: req.body.capacity,
    }
    collection.update({ id:space_stationsId  }, { $set: { number: space_stations.number, necessity:space_stations.necessity,capacity:space_stations.capacity } }).then((result) => {
        res.send(`Успішно відредагований Корабель з id ${space_stations.id}`);
    })
});

// DELETE /space_stations/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('ships');
    var shipId = req.params.id;
    collection.remove({ id: shipId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Успішно видалений Корабель з id ${shipId}`);
        }
    });
});

module.exports = router;