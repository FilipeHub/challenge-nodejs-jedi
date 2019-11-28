const mongoose = require('mongoose');
 
const PokemonSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    attack: Number,
    defense: Number,
    speed: Number,
    health: Number,
    abilities : [String],

});
 
module.exports = mongoose.model('Pokemon', PokemonSchema);