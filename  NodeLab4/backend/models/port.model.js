const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const portSchema = new Schema({
    portname: { type: String, required: true },
    stationname: { type: String, required: true },
    capasity: { type: Number, required: true },
    mass: { type: Number, required: true },
}, {
  timestamps: true,
});

const Planet = mongoose.model('Port', portSchema);

module.exports = Planet;