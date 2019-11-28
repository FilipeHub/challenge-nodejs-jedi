const express = require('express');

const PokemonController = require('./controllers/PokemonController');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/login', SessionController.store);

routes.post('/logout', authMiddleware, SessionController.delete);

routes.post('/users', UserController.store);

routes.post('/users/edit',authMiddleware, UserController.edit);

routes.post('/pokemons', authMiddleware, PokemonController.store);

routes.get('/pokemons',  authMiddleware, PokemonController.show);

routes.get('/pokemons/:id', authMiddleware, PokemonController.details);

routes.post('/pokemons/:id/delete', authMiddleware, PokemonController.delete);

routes.post('/pokemons/:id/edit', authMiddleware, PokemonController.edit);

module.exports = routes;