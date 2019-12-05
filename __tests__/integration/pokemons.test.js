const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const User = require("../../src/models/User");
const Pokemon = require("../../src/models/Pokemon");

// Linking the .env and .env.test files
require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

// Informations of an user that will be used in the tests
const userInfo = {
    "name": "Ash Cation", 
    "email": "ash@paletemail.com", 
    "password": "sereiomaiormestrepokemondomundo"
};

// Informations of a pokemon that will be used in the tests
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

const pokemonInfo2 = {
    "name":"Pikachu",
    "description": "A yellow mouse", 
    "type" : "Electric" , 
    "attack": 60, 
    "defense" : 35, 
    "speed": 55, 
    "health": 55,
    "abilities": "lightning-rod, static, super-speed"
}

const pokemonInfo3 = {
    "name":"Charizard",
    "description": "A verry big dragon", 
    "type" : "Fire" , 
    "attack": 80, 
    "defense" : 65, 
    "speed": 65, 
    "health": 75,
    "abilities": "solar-power, blaze, speed-fly"
}

beforeAll(async () => {
    mongoose.connect(process.env.DB_CONNECTION, 
        {useNewUrlParser:true,
        useCreateIndex: true,
        useUnifiedTopology: true}, (err) => {
            if (err) {
                console.error('Database connection error: ' + err.message);
                process.exit(1);
            }
        });

});

afterEach(async () => {
    try {
        await Pokemon.collection.drop();
        await User.collection.drop();
    } catch (error) {
        console.warn('Try to drop an inexistent collection: User or Pokemon');
    }
});


afterAll( async () => {
    mongoose.disconnect();
});


describe('/POST in /pokemons', () => {

    it('should create a new pokemon', async () =>{
        const responseUser = await request(app).post('/users').
            send(userInfo);
                 
        const userToken = responseUser.body.token;

        const {status, body} = await request(app).post('/pokemons').
        send(pokemonInfo).set('Authorization', 'bearer ' + userToken);
      
        expect(status).toBe(200);
        expect(body.name).toBe(pokemonInfo.name);
        expect(body.description).toBe(pokemonInfo.description);
        expect(body.type).toBe(pokemonInfo.type);

    });

});


describe('/GET in /pokemons', () => {

    it('should get all the pokemons in database from an especific user', async () =>{
        //Creating the user that will be the pokemon's owner
        const responseUser = await request(app).post('/users').
            send(userInfo);
                 
        const userToken = responseUser.body.token;

        //Creating the pokemons
        await request(app).post('/pokemons').
        send(pokemonInfo).set('Authorization', 'bearer ' + userToken);
        
        await request(app).post('/pokemons').
        send(pokemonInfo2).set('Authorization', 'bearer ' + userToken);
        
        await request(app).post('/pokemons').
        send(pokemonInfo3).set('Authorization', 'bearer ' + userToken);
        
        // Getting the pokemon
        const {body, status} = await request(app).get('/pokemons').
        send().set('Authorization', 'bearer ' + userToken);

        expect(status).toBe(200);
        expect(body[0]).toHaveProperty('_id');
        expect(body[0]).toHaveProperty('name');
        expect(body[0].name).toBe(pokemonInfo.name);
        expect(body[1].name).toBe(pokemonInfo2.name);
        expect(body[2].name).toBe(pokemonInfo3.name);
        
    });
});

describe('/GET in /pokemons/:id', () => {

    it('should get a pokemon that exists in database', async () =>{
        //Creating the user that will be the pokemon's owner
        const responseUser = await request(app).post('/users').
            send(userInfo);
                 
        const userToken = responseUser.body.token;

        //Creating the pokemon
        responsePokemon = await request(app).post('/pokemons').
        send(pokemonInfo).set('Authorization', 'bearer ' + userToken);
        
        const pokemon_id = responsePokemon.body._id;

        // Getting the pokemon
        const {body, status} = await request(app).get(`/pokemons/${pokemon_id}`).
        send().set('Authorization', 'bearer ' + userToken);

        expect(status).toBe(200);
        expect(body.name).toBe(pokemonInfo.name);
        expect(body.description).toBe(pokemonInfo.description);
        expect(body.type).toBe(pokemonInfo.type);
        
    });

    it('should not get a pokemon because his id does not exists in database', async () =>{
        //Creating the user that will be the pokemon's owner
        const responseUser = await request(app).post('/users').
            send(userInfo);
                 
        const userToken = responseUser.body.token;

        //Creating the pokemon
        responsePokemon = await request(app).post('/pokemons').
        send(pokemonInfo).set('Authorization', 'bearer ' + userToken);
        
        // Getting the pokemon with wrong id
        const {body, status} = await request(app).get(`/pokemons/111111117ff4fa0e644be329`).

        send().set('Authorization', 'bearer ' + userToken);

        expect(status).toBe(400);
        expect(body.error).toBe('Doesn\'t exist this pokemon for this user');
    });

    it('should not get a pokemon because occur an error', async () =>{
        //Creating the user that will be the pokemon's owner
        const responseUser = await request(app).post('/users').
            send(userInfo);
                 
        const userToken = responseUser.body.token;

        //Creating the pokemon
        responsePokemon = await request(app).post('/pokemons').
        send(pokemonInfo).set('Authorization', 'bearer ' + userToken);
        
        const pokemon_id = responsePokemon.body._id;

        // Getting the pokemon with wrong id
        const {body, status} = await request(app).get(`/pokemons/${pokemon_id}329`).

        send().set('Authorization', 'bearer ' + userToken);

        
        expect(status).toBe(400);
        expect(body.error).toBe('Error showing the pokemon');
    });

});

describe('/PUT in /pokemons/:id', () => {

    it('should update a pokemon that exists in database', async () =>{
        const responseUser = await request(app).post('/users').
            send(userInfo);
                 
        const userToken = responseUser.body.token;

        responsePokemon = await request(app).post('/pokemons').
        send(pokemonInfo).set('Authorization', 'bearer ' + userToken);
        
        const pokemon_id = responsePokemon.body._id;

        const {body, status} = await request(app).put(`/pokemons/${pokemon_id}`).
        send(pokemonInfo2).set('Authorization', 'bearer ' + userToken);

        expect(status).toBe(200);
        expect(body.pokemon.name).toBe(pokemonInfo2.name);
        expect(body.pokemon.description).toBe(pokemonInfo2.description);
        expect(body.pokemon.type).toBe(pokemonInfo2.type);
        
    });

    it('should not update a pokemon because it is not his owner that is doing this', async () =>{
        //Creating the first user and the pokemon's owner
        const responseUser = await request(app).post('/users').
            send(userInfo);
                 
        const userToken = responseUser.body.token;

        responsePokemon = await request(app).post('/pokemons').
        send(pokemonInfo).set('Authorization', 'bearer ' + userToken);
        
        const pokemon_id = responsePokemon.body._id;
        
        //Creating the second user. He is not the pokemon's owner

        const responseUser2 = await request(app).post('/users').
            send({
                "name": "Brock", 
                "email": "brock@pokemail.com", 
                "password": "sereiomaiorcriadordepokemondomundo"
            });
                 
        const userToken2 = responseUser2.body.token;

        const {body, status} = await request(app).put(`/pokemons/${pokemon_id}`).
        send(pokemonInfo2).set('Authorization', 'bearer ' + userToken2);

        expect(status).toBe(400);
        expect(body.error).toBe("Doesn\'t exist this pokemon for this user");
           
    });
});

describe('/DELETE in /pokemons/:id', () => {

    it('should delete a pokemon that exists in database', async () =>{
        //Creating the user that will be the pokemons' owner
        const responseUser = await request(app).post('/users').
            send(userInfo);
                 
        const userToken = responseUser.body.token;
        
        //Creating the pokemons
        const {body : pokemon1Body} = await request(app).post('/pokemons').
        send(pokemonInfo).set('Authorization', 'bearer ' + userToken);
        
        await request(app).post('/pokemons').
        send(pokemonInfo2).set('Authorization', 'bearer ' + userToken);
        
        await request(app).post('/pokemons').
        send(pokemonInfo3).set('Authorization', 'bearer ' + userToken);

        const {body : getBodyBefore} = await request(app).get('/pokemons').
        send().set('Authorization', 'bearer ' + userToken);
        
        expect(getBodyBefore).toHaveLength(3);
        
        const {body : bodyDelete, status : statusDelete} = await request(app).delete(`/pokemons/${pokemon1Body._id}`).
        send().set('Authorization', 'bearer ' + userToken);
        
        expect(statusDelete).toBe(200);
        expect(bodyDelete.message).toBe('The Pokemon was successfuly removed.');
        
        const {body : getBodyAfter} = await request(app).get('/pokemons').
        send().set('Authorization', 'bearer ' + userToken);
        
        expect(getBodyAfter).toHaveLength(2);
          
    });

    it('should not delete a pokemon because occur an error', async () =>{
        //Creating the user that will be the pokemons' owner
        const responseUser = await request(app).post('/users').
            send(userInfo);
                 
        const userToken = responseUser.body.token;
        
        //Creating the pokemons
        const {body : pokemon1Body} = await request(app).post('/pokemons').
        send(pokemonInfo).set('Authorization', 'bearer ' + userToken);
        
        await request(app).post('/pokemons').
        send(pokemonInfo2).set('Authorization', 'bearer ' + userToken);
        
        await request(app).post('/pokemons').
        send(pokemonInfo3).set('Authorization', 'bearer ' + userToken);

        const {body : getBodyBefore} = await request(app).get('/pokemons').
        send().set('Authorization', 'bearer ' + userToken);
        
        expect(getBodyBefore).toHaveLength(3);
        
        // Deleting the pokemon with wrong id
        const {body : bodyDelete, status : statusDelete} = await request(app).delete(`/pokemons/${pokemon1Body._id}329`).
        send().set('Authorization', 'bearer ' + userToken);
        
        expect(statusDelete).toBe(400);
        expect(bodyDelete.error).toBe('Error deleting the pokemon');
        
        const {body : getBodyAfter} = await request(app).get('/pokemons').
        send().set('Authorization', 'bearer ' + userToken);
        
        expect(getBodyAfter).toHaveLength(3);
    });

});
