const express = require('express');

const PokemonController = require('./controllers/PokemonController');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/login', SessionController.store);

routes.post('/users', UserController.store);

routes.put('/users',authMiddleware, UserController.update);

routes.get('/pokemons',  authMiddleware, PokemonController.list);

routes.get('/pokemons/:id', authMiddleware, PokemonController.show);

routes.post('/pokemons', authMiddleware, PokemonController.store);

routes.delete('/pokemons/:id', authMiddleware, PokemonController.delete);

routes.put('/pokemons/:id', authMiddleware, PokemonController.update);

module.exports = routes;