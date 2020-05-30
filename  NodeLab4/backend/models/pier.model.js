const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pierSchema = new Schema({
    piername: { type: String, required: true },
    needs: { type: Number, required: true },
    capasity: { type: Number, required: true },
}, {
  timestamps: true,
});

const SpaceStation = mongoose.model('Pier', pierSchema);

module.exports = SpaceStation;