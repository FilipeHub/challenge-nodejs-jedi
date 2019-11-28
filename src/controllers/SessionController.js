const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = {
    async store(req, res){
        try {
            const { email, password} = req.body;
    
            const user = await User.findOne({email}).select('+password');
    
            if(!user){
                return res.status(400).send({error : 'User not found'});
            }
    
            if(!await bcrypt.compare(password, user.password)){
                return res.status(400).send({error : 'Invalid password'});
            }

            user.password = undefined;
            
            const token = jwt.sign({id: user._id}, authConfig.secret, {
                expiresIn: 86400 //1 dia em segundos
            });

            res.json({user, token});
            
        } catch (error) {
            return res.status(400).send({error : 'Login failed'});
        }

    },

    async delete(req, res){
        
    }

};