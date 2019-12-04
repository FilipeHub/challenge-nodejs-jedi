const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const User = require("../../src/models/User");
const Pokemon = require("../../src/models/Pokemon");

require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

// Informations of a user that will be used in the
const userInfo = {
    "name": "Ash Cation", 
    "email": "ash@paletemail.com", 
    "password": "sereiomaiormestrepokemondomundo"
};

const pokemonInfo = {
	"name":"Charmander",
	"description": "Lizard with a flame in the tail", 
	"type" : "fire" , 
	"attack": 50, 
	"defense" : 20, 
	"speed": 30, 
	"health": 40,
	"abilities": "blaze, solar-power"
}

beforeAll(async () => {
    mongoose.connect(process.env.DB_CONNECTION, 
        {useNewUrlParser:true,
        useCreateIndex: true,
        useUnifiedTopology: true}, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });

});

afterEach(() => {
    User.collection.drop();
    Pokemon.collection.drop();
});

afterAll(() => {
    mongoose.disconnect();
});

describe('/POST in /pokemons', () => {

    it('should crate a new pokemon', async () =>{
        const responseUser = await request(app).post('/users').
            send(userInfo);
                 
        const userToken = responseUser.body.token;

        const responsePokemon = await request(app).post('/pokemons').
        send(pokemonInfo).set('Authorization', 'bearer ' + userToken);
        
        
        
        expect(responsePokemon.status).toBe(200);
        expect(responsePokemon.body.name).toBe(pokemonInfo.name);
        expect(responsePokemon.body.description).toBe(pokemonInfo.description);
        expect(responsePokemon.body.type).toBe(pokemonInfo.type);
    });


});
