const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shipsSchema = new Schema({
    code: { type: Number, required: true },
    shipsname: { type: String, required: true },
    mass: { type: Number, required: true },
}, {
  timestamps: true,
});

const Goods = mongoose.model('Ships', shipsSchema);

module.exports = Goods;