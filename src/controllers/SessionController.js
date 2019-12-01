const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

/**
     *  
     * @api {post} /login Login in the system
     * @apiName CreateSession
     * @apiGroup Sessions
     * 
     * @apiParam {String} email User email, unique
     * @apiParam {String} password User password, not unique
     
     * @apiParamExample JSON Body Example:
     * { 
     *       "email" : "filipe@pokemail.com", 
     *       "password": "123456", 
     *  }
     * 
     * @apiSuccess {ObjectId} _id User id.
     * @apiSuccess {String} name User name.
     * @apiSuccess {String} email User email.
     * @apiSuccess {String} password User password.
     * @apiSuccess {String} token token to the user authentication in the system
     * 
     * @apiSuccessExample Successful Response:
     * HTTP/1.1 200 OK
     * 
     *   {
     *       "user": {
     *           "_id": "5de2a86a929ae9080cb9160d",
     *           "name": "Filipe",
     *           "email": "filipe@pokemail.com",
     *           "__v": 0
     *       },
     *       
     *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTJhODZhOTI5YWU5MDgwY2I5MTYwZCIsImlhdCI6MTU3NTEzNTMzOCwiZXhwIjoxNTc1MjIxNzM4fQ.145vjji6eIC5jEogGoBk_SbcUMCGYTzbrXyWpe8t_iU"
     *   }
     * 
     * @apiError LoginFailed an unexpected error occurs in the user's login
     * 
     * @apiErrorExample Error-response
     * HTTP/1.1 400 Error in the user's login
     * 
     * {
     *    error: "Login failed"
     * }
     * 
     * @apiError UserNotFoundFailed the user doesn't have an email storaged in the data base
     * 
     * @apiErrorExample Error-response
     * HTTP/1.1 400 Error user not found
     * 
     * {
     *    error: "User not found"
     * }
     * 
     * 
    * @apiError InvalidPasswordFailed the user's password is wrong
     * 
     * @apiErrorExample Error-response
     * HTTP/1.1 400 Error invalid password
     * 
     * {
     *    error: "Invalid password"
     * }
     * 
     * @apiVersion 1.0.0
     * 
     */
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
                expiresIn: authConfig.expiration_time
            });

            res.json({user, token});
            
        } catch (error) {
            return res.status(400).send({error : 'Login failed'});
        }

    },

};