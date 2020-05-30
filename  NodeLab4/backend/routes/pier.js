const router = require('express').Router();
let SpaceStation = require('../models/pier.model');

router.route('/').get((req, res) => {
    SpaceStation.find()
    .then(pier => res.json(pier))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const needs = Number(req.body.needs);
  const piername = req.body.piername;
  const capasity = Number(req.body.capasity);
  

  const newSpaceStation = new SpaceStation({
    piername,
    needs,
    capasity,
  });

  newSpaceStation.save()
  .then(() => res.json('SpaceStation added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    SpaceStation.findById(req.params.id)
    .then(pier => res.json(pier))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    SpaceStation.findByIdAndDelete(req.params.id)
    .then(() => res.json('SpaceStation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    SpaceStation.findById(req.params.id)
    .then(pier => {
        
        pier.piername = req.body.piername;
        pier.needs = Number(req.body.needs);
        pier.capasity = Number(req.body.capasity);
      

        pier.save()
        .then(() => res.json('SpaceStation updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;