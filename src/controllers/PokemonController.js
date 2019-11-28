const Pokemon = require('../models/Pokemon');

module.exports = {
    async store(req, res) {
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
       
    },

    async show(req, res){
        const pokemons = await Pokemon.find({}, '_id name');

        return res.json(pokemons);
    },

    async details(req, res){
        const { id } = req.params;

        const pokemon = await Pokemon.findById(id);

        return res.json(pokemon);
    },

    async delete(req, res){
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
    },

    async edit(req, res){
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
    }

}
