const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('pages/index');
});

router.get('/ships', function(req, res) {
    res.render('pages/ships');
});
router.get('/piers', function(req, res) {
    res.render('pages/piers');
});

router.get('/shipToPier', function(req, res) {
    res.render('pages/shipToPier');
});

router.get('/cargoOnPlanets', function(req, res) {
    res.render('pages/cargoOnPlanets');
});

router.get('/cargoOnPlanetsLessThen30', function(req, res) {
    res.render('pages/cargoOnPlanets');
});


router.get('/ports', function(req, res) {
    res.render('pages/ports');
});

module.exports = router;