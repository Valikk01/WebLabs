var express = require('express');
var router = express.Router();

// GET /piers
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('piers');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

// GET /piers/{id}

router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('piers');
    var piersId = req.params.id;
    console.log(piersId);
    collection.findOne({ id: piersId }).then(function(piersExists) {
        if (piersExists) {
            res.send(`Пристань з id ${piersId} існує`);
        } else{
            res.send(`Пристань з id ${piersId} не існує`);
        }

    });
});

router.post('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('piers');
    var piersId = req.params.id;
    console.log(piersId);
    var piers = {
        id: req.body.id,
        code: req.body.code,
        name: req.body.name,
        mass: req.body.mass,
    }
    collection.update({ id:piersId  }, { $set: { code: piers.code, name:piers.name,mass:piers.mass } }).then((result) => {
        res.send(`Успішно оновлено Пристань з id ${piers.id} `);
    })
});

// POST /piers
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('piers');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(pierExists) {
        if (pierExists) {
            res.send(`Пристань з id ${req.body.id} вже існує`);
        } else {
            var pier = {
                id: req.body.id,
                code: req.body.code,
                name: req.body.name,
                mass: req.body.mass,
            };
            collection.insert(pier, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    // res.redirect(`/${pier.id}`);
                    res.send(`Успішно створено Пристань з id ${pier.id}`);
                }
            });
        }
    });
});

// PUT /piers
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('piers');
    var pier = {
        id: req.body.id,
        code: req.body.code,
        name: req.body.name,
        mass: req.body.mass
    };
    collection.update({ id: pier.id }, pier, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            // res.redirect(`/${pier.id}`);
            res.send(`Успішно оновлено Пристань з id [${pier.id}]`);
        }
    });
});

// DELETE /piers/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('piers');
    var pierId = req.params.id;
    collection.remove({ id: pierId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Успішно видалено Пристань з id ${pierId}`);
        }
    });
});

module.exports = router;