const router = require('express').Router();
let Planet = require('../models/port.model');

router.route('/').get((req, res) => {
    Planet.find()
    .then(port => res.json(port))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const portname = req.body.portname;
  const stationname = req.body.stationname;
  const capasity = Number(req.body.capasity);
  const mass = Number(req.body.mass);
  

  const newPlanet = new Planet({
    portname,
    stationname,
    capasity,
    mass,
  });

  newPlanet.save()
  .then(() => res.json('Planet added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Planet.findById(req.params.id)
    .then(port => res.json(port))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Planet.findByIdAndDelete(req.params.id)
    .then(() => res.json('Planet deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Planet.findById(req.params.id)
    .then(port => {
        port.portname = req.body.portname;
        port.stationname = req.body.stationname;
        port.capasity = Number(req.body.capasity);
        port.mass = Number(req.body.mass);
      

        port.save()
        .then(() => res.json('Planet updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;