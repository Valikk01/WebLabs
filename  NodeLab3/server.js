const path = require('path');
const express = require('express');

var monk = require('monk');
var db = monk('localhost:27017/lab3');

var indexRouter = require('./routes/index');
var planetsRouter = require('./routes/ports');
var spaceStationRouter = require('./routes/ships');
var cargoRouter = require('./routes/piers');

var cargoOnPlanetRouter = require('./routes/shipToPier');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(__dirname))

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/service/ports', planetsRouter);
app.use('/service/ships', spaceStationRouter);
app.use('/service/piers', cargoRouter);

app.use('/service/shipToPiers', cargoOnPlanetRouter);


const host = "localhost";
const port = "8080";
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`)
});

module.exports = app;
