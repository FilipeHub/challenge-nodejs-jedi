const Pokemon = require('../models/Pokemon');

module.exports = {

    /**
     * @api {post} /pokemons Add a new Pokemon
     * @apiName AddPokemon
     * @apiGroup Pokemons
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
     * @apiSuccess {Number} _id Pokemon id.
     * @apiSuccess {String} name Pokemon name.
     * @apiSuccess {String} description Pokemon description.
     * @apiSuccess {String} type Pokemon type.
     * @apiSuccess {Number} attack Pokemon attack.
     * @apiSuccess {Number} defense Pokemon defense.
     * @apiSuccess {Number} speed Pokemon speed.
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
     *  "abilities": [
     *     "super-speed",
     *     "thumder"
     *  ],
     *  "__v": 0
     *  }   
     * 
     */
    async store(req, res) {
        try {
            const { name, description, type, attack, defense, speed, health, abilities } = req.body;
     
            let pokemon = await Pokemon.findOne({name});
     
            if(!pokemon){
                pokemon = await Pokemon.create(
                    { name,
                      description, 
                      type, 
                      attack, 
                      defense, 
                      speed, 
                      health,
                      abilities: abilities.split(',').map(ability => ability.trim())
                    });
                };
                
            return res.json(pokemon);
            
        } catch (error) {
            return res.status(400).send({error: "Error creating new pokemon"});
        }
    },

    /**
     * @api {get} /pokemons Get the basic pokemons informations
     * @apiName GetPokemons
     * @apiGroup Pokemons
     */
    async list(req, res){
        try {
            const pokemons = await Pokemon.find({}, '_id name');
    
            return res.json(pokemons);
            
        } catch (error) {
            return res.status(400).send({error: "Error getting the pokemons"});
        }

    },

    /**
     * @api {get} /pokemons/:id Get all the pokemons' informations
     * @apiName GetPokemon
     * @apiGroup Pokemons
     * 
     * @apiParam {Number} id Pokemon id
     * 
     * @apiSuccess {Number} _id Pokemon id.
     * @apiSuccess {String} name Pokemon name.
     * @apiSuccess {String} description Pokemon description.
     * @apiSuccess {String} type Pokemon type.
     * @apiSuccess {Number} attack Pokemon attack.
     * @apiSuccess {Number} defense Pokemon defense.
     * @apiSuccess {Number} speed Pokemon speed.
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
     *  "abilities": [
     *     "super-speed",
     *     "thumder"
     *  ],
     *  "__v": 0
     *  }   
     * 
     */
    async show(req, res){
        try {
            const { id } = req.params;
    
            const pokemon = await Pokemon.findById(id);
    
            return res.json(pokemon);
            
        } catch (error) {
            return res.status(400).send({error: "Error showing the pokemon"});
        }
    },

    async delete(req, res){
        try {
            const { id } = req.params;
            
            const pokemon = await Pokemon.findById(id);
            let message;
    
            if(pokemon){
                await Pokemon.deleteOne({ _id : id});
                message = `The Pokemon ${pokemon.name} was successfuly removed.`;
            }else{
                message = "The Pokemon doesn't exists.";
            }
    
            return res.json({"message": message});
            
        } catch (error) {
            return res.status(400).send({error: "Error deleting the pokemon"});
        }
    },

    async update(req, res){
        try {
            const { id } = req.params;
            
            let pokemon = await Pokemon.findById(id);
            let message;
    
            if(pokemon){
                const { name, description, type, attack, defense, speed, health, abilities } = req.body;
                pokemon = await Pokemon.updateOne( {_id: id},
                    { name,
                      description, 
                      type, 
                      attack, 
                      defense, 
                      speed, 
                      health,
                      abilities: abilities.split(',').map(ability => ability.trim())
                    });
    
                return res.json(pokemon);
            }else{
                return res.status(400).send({error : 'The Pokemon does not exists.'});
            }
        } catch (error) {
            return res.status(400).send({error: "Error updating the pokemon"});
        }
    }

}
