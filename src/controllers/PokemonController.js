const Pokemon = require('../models/Pokemon');

module.exports = {

    /**
     *  
     * @api {post} /pokemons Create a new Pokemon
     * @apiName CreatePokemon
     * @apiDescription This endpoint requires a authenticated user. See the Authentication session of this documentation
     * @apiGroup Pokemons
     * 
     * @apiHeader {String} token a Bearer token of the authorizaded user
     * 
     * @apiParam {String} name Pokemon name, not unique
     * @apiParam {String} description Pokemon description, not unique
     * @apiParam {String} type Pokemon type, not unique
     * @apiParam {Number} attack Pokemon attack, not unique
     * @apiParam {Number} defense Pokemon defense, not unique
     * @apiParam {Number} speed Pokemon speed, not unique
     * @apiParam {String} abilities String of the abilities of the Pokemon separeted by comma, not unique
     * 
     * @apiParamExample JSON Body Example:
     * { 
     *       "name": "pikachu",
     *       "description" : " Electric mouse", 
     *       "type": "Electric", 
     *       "attack": 40, 
     *       "defense" : 30, 
     *       "speed": 50, 
     *       "health": 55,
     *       "abilities": "super-speed, thunder"
     *  }
     * 
     * @apiSuccess {ObjectId} _id Pokemon id.
     * @apiSuccess {String} name Pokemon name.
     * @apiSuccess {String} description Pokemon description.
     * @apiSuccess {String} type Pokemon type.
     * @apiSuccess {Number} attack Pokemon attack.
     * @apiSuccess {Number} defense Pokemon defense.
     * @apiSuccess {Number} speed Pokemon speed.
     * @apiSuccess {ObjectId} user Pokemon's owner.
     * @apiSuccess {String[]} abilities Array of the abilities of the Pokemon. 
     * 
     * @apiSuccessExample Successful Response:
     * HTTP/1.1 200 OK
     * 
     * {
     *  "_id": "5ddfa6bb8fd756266051cc62",
     *  "name": "pikachu",
     *  "description": " Electric mouse",
     *  "type": "Eletric",
     *  "attack": 40,
     *  "defense": 30,
     *  "speed": 50,
     *  "health": 55,
     *  "user": "5dddbfcff476142216e4a709",
     *  "abilities": [
     *     "super-speed",
     *     "thumder"
     *  ],
     *  "__v": 0
     *  }   
     * 
     * @apiError CreatePokemonFailed an unexpected error occurs in the storage of the pokemon in the data base
     * 
     * @apiErrorExample Error-response
     * HTTP/1.1 400 Error creating a new pokemon
     * 
     * {
     *    error: "Error creating new pokemon"
     * }
     * 
     * @apiVersion 1.0.0
     * 
     */
    async store(req, res) {
        try {
            const { name, description, type, attack, defense, speed, health, abilities } = req.body;
            const user_id = req.userId;
            
            const pokemon = await Pokemon.create(
                    { name,
                      description, 
                      type, 
                      attack, 
                      defense, 
                      speed, 
                      health,
                      user: user_id,
                      abilities: abilities.split(',').map(ability => ability.trim())
                    });

              
            return res.json(pokemon);
           
        } catch (error) {
            return res.status(400).send({error: "Error creating new pokemon"});
        }
    },

    /**
     * @api {get} /pokemons Get the basic informations of all user's pokemons
     * @apiName GetPokemons
     * @apiDescription This endpoint requires a authenticated user. See the Authentication session of this documentation
     * @apiGroup Pokemons
     * 
     * @apiHeader {String} token a Bearer token of the authorizaded user
     *
     * @apiSuccess {Object[]} list Id and name of the pokemons
     * 
     * 
     * @apiSuccessExample Successful Response:
     * HTTP/1.1 200 OK
     *
     * { 
     *   {
     *     "_id": "5ddfa6bb8fd756266051cc62",
     *     "name": "pikachu"
     *   },
     *   {
     *     "_id": "5ddfa6bb8fd12234751caf43",
     *     "name": "squirtle"
     *   },
     * } 
     *  
     * @apiError GetPokemonsFailed an unexpected error occurs getting the list of all user's pokemons
     * 
     * @apiErrorExample Error-response
     * HTTP/1.1 400 Error getting the pokemons' list
     * 
     * {
     *    error: "Error getting the pokemons"
     * }
     * 
     * @apiVersion 1.0.0
     * 
     */
    async list(req, res){
        try {
            const user_id = req.userId;
            const pokemons = await Pokemon.find({user: user_id}, '_id name');

            return res.json(pokemons);
            
        } catch (error) {
            return res.status(400).send({error: "Error getting the pokemons"});
        }

    },

    /**
     * @api {get} /pokemons/:id Show the pokemon's details (all attributes)
     * @apiName GetPokemon
     * @apiDescription This endpoint requires a authenticated user. See the Authentication session of this documentation
     * @apiGroup Pokemons
     * 
     * @apiHeader {String} token a Bearer token of the authorizaded user 
     * 
     * @apiParam {String} id Pokemon id, unique
     * 
     * @apiSuccess {ObjectId} _id Pokemon id.
     * @apiSuccess {String} name Pokemon name.
     * @apiSuccess {String} description Pokemon description.
     * @apiSuccess {String} type Pokemon type.
     * @apiSuccess {Number} attack Pokemon attack.
     * @apiSuccess {Number} defense Pokemon defense.
     * @apiSuccess {Number} speed Pokemon speed.
     * @apiSuccess {ObjectId} user Pokemon's owner.
     * @apiSuccess {String[]} abilities Array of the abilities of the Pokemon. 
     * 
     * @apiSuccessExample Successful Response:
     * HTTP/1.1 200 OK
     * 
     * {
     *  "_id": "5ddfa6bb8fd756266051cc62",
     *  "name": "pikachu",
     *  "description": " Electric mouse",
     *  "type": "Electric",
     *  "attack": 40,
     *  "defense": 30,
     *  "speed": 50,
     *  "health": 55,
     *  "user": "5dddbfcff476142216e4a709",
     *  "abilities": [
     *     "super-speed",
     *     "thumder"
     *  ],
     *  "__v": 0
     *  }   
     * 
     * @apiError PokemonDoesNotExistsFailed the pokemon doesn't exists in the user 's account
     * 
     * @apiErrorExample Error-pokemon doesn't exists
     * HTTP/1.1 400 Error: Pokemon doesn't exists
     * 
     * {
     *    error: "Doesn't exist this pokemon for this user"
     * }
     * 
     * 
     * @apiError GetPokemonFailed an unexpected error occurs getting the details of one user's pokemons
     * 
     * @apiErrorExample Error-response
     * HTTP/1.1 400 Error getting the details of one user's pokemons
     * 
     * {
     *    error: "Error showing the pokemon"
     * }
     * 
     * @apiVersion 1.0.0
     * 
     */
    async show(req, res){
        try {
            const { id } = req.params;
            const user_id = req.userId;
            const pokemon = await Pokemon.findOne({_id: id, user: user_id });

            if(!pokemon){
                return res.status(400).send({error: "Doesn't exist this pokemon for this user"});    
            }
    
            return res.json(pokemon);
            
        } catch (error) {
            return res.status(400).send({error: "Error showing the pokemon"});
        }
    },
    
    /**
     * @api {put} /pokemons/:id Update the pokemon's attributes
     * @apiName UpdatePokemon
     * @apiDescription This endpoint requires a authenticated user. See the Authentication session of this documentation
     * @apiGroup Pokemons
     * 
     * 
     * @apiHeader {String} token a Bearer token of the authorizaded user 
     * 
     * @apiParam {String} id Pokemon id, unique
     * @apiParam {String} name Pokemon name, not unique
     * @apiParam {String} description Pokemon description, not unique
     * @apiParam {String} type Pokemon type, not unique
     * @apiParam {Number} attack Pokemon attack, not unique
     * @apiParam {Number} defense Pokemon defense, not unique
     * @apiParam {Number} speed Pokemon speed, not unique
     * @apiParam {String} abilities String of the abilities of the Pokemon separeted by comma, not unique
     * 
     * @apiParamExample JSON Body Example:
     * { 
     *       "name": "pikachu",
     *       "description" : " Electric mouse with great power", 
     *       "type": "Electric", 
     *       "attack": 40, 
     *       "defense" : 30, 
     *       "speed": 50, 
     *       "health": 55,
     *       "abilities": "super-speed, thunder"
     *  }
     * 
     * 
     * @apiSuccess {ObjectId} _id Pokemon id.
     * @apiSuccess {String} name Pokemon name.
     * @apiSuccess {String} description Pokemon description.
     * @apiSuccess {String} type Pokemon type.
     * @apiSuccess {Number} attack Pokemon attack.
     * @apiSuccess {Number} defense Pokemon defense.
     * @apiSuccess {Number} speed Pokemon speed.
     * @apiSuccess {ObjectId} user Pokemon's owner.
     * @apiSuccess {String[]} abilities Array of the abilities of the Pokemon. 
     * 
     * @apiSuccessExample Successful Response:
     * HTTP/1.1 200 OK
     * 
     * {
     *  "_id": "5ddfa6bb8fd756266051cc62",
     *  "name": "pikachu",
     *  "description": " Electric mouse with great power",
     *  "type": "Electric",
     *  "attack": 40,
     *  "defense": 30,
     *  "speed": 50,
     *  "health": 55,
     *  "user": "5dddbfcff476142216e4a709",
     *  "abilities": [
     *     "super-speed",
     *     "thumder"
     *  ],
     *  "__v": 0
     *  }   
     * 
     * @apiError  the pokemon doesn't exists in the user's account
     * 
     * @apiErrorExample Error-pokemon doesn't exists
     * HTTP/1.1 400 Error: Pokemon doesn't exists
     * 
     * {
     *    error: "Doesn't exist this pokemon for this user"
     * }
     * 
     * 
     * @apiError UpdatePokemonFailed an unexpected error occurs updating the details of one user's pokemons
     * 
     * @apiErrorExample Error-response
     * HTTP/1.1 400 Error updating the attributes of one user's pokemons
     * 
     * {
     *    error: "Error updating the pokemon"
     * }
     * 
     * @apiVersion 1.0.0
     * 
     */
    async update(req, res){
        try {
            const { id } = req.params;
            const user_id = req.userId;

            let pokemon = await Pokemon.findOne({_id: id, user: user_id });
                        
            if(pokemon){
                const { name, description, type, attack, defense, speed, health, abilities } = req.body;
                pokemon.name = name;
                pokemon.description = description; 
                pokemon.type = type; 
                pokemon.attack = attack; 
                pokemon.defense = defense; 
                pokemon.speed = speed; 
                pokemon.health = health;
                pokemon.abilities = abilities;
                pokemon.user = user_id;
                
                await pokemon.save();

                return res.json({pokemon});
            }else{
                return res.status(400).send({error : "Doesn't exist this pokemon for this user"});
            }
        } catch (error) {
            return res.status(400).send({error: "Error updating the pokemon"});
        }
    },

    /**
     * @api {delete} /pokemons/:id Delete the pokemon
     * @apiName DeletePokemon
     * @apiDescription This endpoint requires a authenticated user. See the Authentication session of this documentation
     * @apiGroup Pokemons
     * 
     * 
     * @apiHeader {String} token a Bearer token of the authorizaded user 
     * 
     * @apiParam {String} id Pokemon id, unique
     * 
     * @apiSuccess {String} message success message.
     * 
     * @apiSuccessExample Successful Response:
     * HTTP/1.1 200 OK
     * 
     * {
     *    "message": "The Pokemon was successfuly removed."
     * }   
     * 
     * @apiError PokemonDoesNotExistsFailed the pokemon doesn't exists in the user's account
     * 
     * @apiErrorExample Error-pokemon doesn't exists
     * HTTP/1.1 400 Error: Pokemon doesn't exists
     * 
     * {
     *    error: "Doesn't exist this pokemon for this user"
     * }
     * 
     * 
     * @apiError DeletePokemonFailed an unexpected error occurs deleting one user's pokemon
     * 
     * @apiErrorExample Error-response
     * HTTP/1.1 400 Error deleting the user's pokemon
     * 
     * {
     *    error: "Error deleting the pokemon"
     * }
     * 
     * @apiVersion 1.0.0
     * 
     */
    async delete(req, res){
        try {
            const { id } = req.params;
            const user_id = req.userId;

            const pokemon = await Pokemon.findOne({_id: id, user: user_id });

            if(pokemon){
                await Pokemon.deleteOne({ _id : id, user: user_id});
                return res.json({"message": 'The Pokemon was successfuly removed.'});
            }else{
                return res.status(400).send({error: "Doesn't exist this pokemon for this user"});
            }          
            
        } catch (error) {
            return res.status(400).send({error: "Error deleting the pokemon"});
        }
    }
    
}
