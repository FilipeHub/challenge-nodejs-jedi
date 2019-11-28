const mongoose = require('mongoose');
 
const PokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true    
    },
    description: String,
    type: {
        type: String,
        require: true    
    },
    attack: {
        type: Number,
        require: true    
    },
    defense: {
        type: Number,
        require: true    
    },
    speed: {
        type: Number,
        require: true    
    },
    health : {
        type: Number,
        require: true    
    },
    abilities : [String],
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});
 
module.exports = mongoose.model('Pokemon', PokemonSchema);