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

afterEach(async () => {
    await Pokemon.collection.drop();
    await User.collection.drop();
});


afterAll( async () => {
    mongoose.disconnect();
});

describe('/POST in /pokemons', () => {

    it('should create a new pokemon', async () =>{
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

describe('/PUT in /pokemons', () => {

    it('should update a pokemon that exists in database', async () =>{
        const responseUser = await request(app).post('/users').
            send(userInfo);
                 
        const userToken = responseUser.body.token;

        responsePokemon = await request(app).post('/pokemons').
        send(pokemonInfo).set('Authorization', 'bearer ' + userToken);
        
        const pokemon_id = responsePokemon.body._id;
        
        const pokemonInfoUpdated = {
            "name":"Charmander",
            "description": "A very cute lizard with a flame in the tail", 
            "type" : "Fire" , 
            "attack": 50, 
            "defense" : 35, 
            "speed": 35, 
            "health": 45,
            "abilities": "blaze, solar-power, super-speed"
        }

        const {body, status} = await request(app).put(`/pokemons/${pokemon_id}`).
        send(pokemonInfoUpdated).set('Authorization', 'bearer ' + userToken);

        expect(status).toBe(200);
        expect(body.pokemon.name).toBe(pokemonInfoUpdated.name);
        expect(body.pokemon.description).toBe(pokemonInfoUpdated.description);
        expect(body.pokemon.type).toBe(pokemonInfoUpdated.type);
        
    });

    it('should not update a pokemon because it is not his owner that is doing this', async () =>{
        //Creating the first user and the pokemon's owner
        const responseUser = await request(app).post('/users').
            send(userInfo);
                 
        const userToken = responseUser.body.token;

        responsePokemon = await request(app).post('/pokemons').
        send(pokemonInfo).set('Authorization', 'bearer ' + userToken);
        
        const pokemon_id = responsePokemon.body._id;
        
        const pokemonInfoUpdated = {
            "name":"Charmander",
            "description": "A very cute lizard with a flame in the tail", 
            "type" : "Fire" , 
            "attack": 50, 
            "defense" : 35, 
            "speed": 35, 
            "health": 45,
            "abilities": "blaze, solar-power, super-speed"
        }

        //Creating the second user. He is not the pokemon's onwer

        const responseUser2 = await request(app).post('/users').
            send({
                "name": "Brock", 
                "email": "brock@pokemail.com", 
                "password": "sereiomaiorcriadordepokemondomundo"
            });
                 
        const userToken2 = responseUser2.body.token;

        const {error, status} = await request(app).put(`/pokemons/${pokemon_id}`).
        send(pokemonInfoUpdated).set('Authorization', 'bearer ' + userToken2);

        expect(status).toBe(400);
        expect(error.text).toBe('{"error":"Doesn\'t exist this pokemon for this user"}');
        
        
    });
});