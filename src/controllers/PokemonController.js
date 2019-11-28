const Pokemon = require('../models/Pokemon');

module.exports = {
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

    async list(req, res){
        try {
            const pokemons = await Pokemon.find({}, '_id name');
    
            return res.json(pokemons);
            
        } catch (error) {
            return res.status(400).send({error: "Error getting the pokemons"});
        }

    },

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
