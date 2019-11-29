const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = {
    async store(req, res) {
        try{
            const { name, email, password } = req.body;

            let user = await User.findOne({ email });

            if(!user){
                user = await User.create({
                    name,
                    email,
                    password
                });

                user.password = undefined;

                const token = jwt.sign({id: user._id}, authConfig.secret, {
                    expiresIn: 86400 //1 dia em segundos
                });

                res.json({user, token});
            }else{
                return res.status(400).send({ error : "User already exists"});    
            }
        }catch(err){
            return res.status(400).send({ error : "Registration failed"});
        }  
    },

    async update(req, res){
        try {
            const userId = req.userId;
            
            const { name, email, password } = req.body;
                        
            let user = await User.findById(userId);

            if(user){
                user = await User.update({ name, email, password });
            }

            user.password = undefined;

            return res.json(user);
        } catch (error) {
            return res.status(400).send({ error : "User edit failed"});
        }
    }

}
