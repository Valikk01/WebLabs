var express = require('express');
var router = express.Router();

// GET /ports
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('ports');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

// GET /passengers/{id}
router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('ports');
    var portId = req.params.id;
    console.log(portId);
    collection.findOne({ id: portId }).then(function(portExists) {
        if (portExists) {
            res.send(`Порт з id ${portId} існує`);
        } else{
            res.send(`Порт з id ${portId} не існує`);
        }

        });
});
// POST /ports
router.post('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('ports');
    var portId = req.params.id;
    console.log(portId);
    var port = {
        id: req.body.id,
        name: req.body.name,
        mass: req.body.mass,
        capacity: req.body.capacity,
    }
    collection.update({ id:portId  }, { $set: { name: port.name, country:port.mass,aress:port.capacity } }).then((result) => {
        res.send(`Успішно відредаговано Порт з id ${port.id}`);
    })
});

// POST /passengers
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('ports');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(portExists) {
        if (portExists) {
            res.send(`Порт з id ${req.body.id} вже існує`);
        } else{
            var port = {
                id: req.body.id,
                name: req.body.name,
                mass: req.body.mass,
                capacity: req.body.capacity,
            };
            collection.insert(port, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    // res.redirect(`/passengers/${passenger.id}`);
                    res.send(`Успішно створений Порт з id ${port.id}`);
                }
            });
        }
    });
});

// PUT /ports
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('ports');
    var port = {
        id: req.body.id,
        name: req.body.name,
        mass: req.body.mass,
        capacity: req.body.capacity
    };
    collection.update({ id: port.id }, port, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            // res.redirect(`/passengers/${passenger.id}`);
            res.send(`Успішно відредагований Порт з id ${port.id}`);
        }
    });
});

// DELETE /ports/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('ports');
    var portId = req.params.id;
    collection.remove({ id: portId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Успішно видалено Порт id ${portId}`);
        }
    });
});

module.exports = router;