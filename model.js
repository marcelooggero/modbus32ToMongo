const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const medicionSchema = new Schema({
    voltageV1N: { type: Number },
    date: { type: Date }
})

const Medicion = mongoose.model('Medicion', medicionSchema)
module.exports = Medicion