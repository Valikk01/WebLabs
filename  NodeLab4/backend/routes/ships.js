const router = require('express').Router();
let Goods = require('../models/ships.model');

router.route('/').get((req, res) => {
    Goods.find()
    .then(ships => res.json(ships))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const code = Number(req.body.code);
  const shipsname = req.body.shipsname;
  const mass = Number(req.body.mass);
  

  const newGoods = new Goods({
    code,
    shipsname,
    mass,
  });

  newGoods.save()
  .then(() => res.json('Goods added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Goods.findById(req.params.id)
    .then(ships => res.json(ships))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Goods.findByIdAndDelete(req.params.id)
    .then(() => res.json('Goods deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Goods.findById(req.params.id)
    .then(ships => {
        ships.code = Number(req.body.code);
        ships.shipsname = req.body.shipsname;
        ships.mass = Number(req.body.mass);
      

        ships.save()
        .then(() => res.json('Goods updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;