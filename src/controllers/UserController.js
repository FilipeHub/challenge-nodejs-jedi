require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
    
    /**
     *  
     * @api {post} /users Create a new User
     * @apiName CreateUser
     * @apiGroup Users
     * 
     * @apiParam {String} name User name, not unique
     * @apiParam {String} email User email, unique
     * @apiParam {String} password User password, not unique
     
     * @apiParamExample JSON Body Example:
     * { 
     *       "name": "Filipe",
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
     * @apiError CreateUserFailed an unexpected error occurs in the storage of the user in the data base
     * 
     * @apiErrorExample Error-response
     * HTTP/1.1 400 Error creating a new user
     * 
     * {
     *    error: "Registration failed"
     * }
     * 
     * @apiError UserAlreadyExistsFailed the user already have an email storaged in the data base
     * 
     * @apiErrorExample Error-response
     * HTTP/1.1 400 Error user already exists
     * 
     * {
     *    error: "User already exists"
     * }
     * 
     * @apiVersion 1.0.0
     * 
     */
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

                //creating the token
                const token = jwt.sign({id: user._id}, process.env.SECRET, {
                    expiresIn: process.env.EXPIRATION_TIME
                });

                res.json({user, token});
            }else{
                return res.status(400).send({ error : "User already exists"});    
            }
        }catch(err){
            return res.status(400).send({ error : "Registration failed"});
        }  
    },

    /**
     *  
     * @api {put} /users Update a User
     * @apiName UpdateUser
     * @apiDescription This endpoint requires a authenticated user. See the Authentication session of this documentation
     * @apiGroup Users
     * 
     * @apiHeader {String} token a Bearer token of the authorizaded user
     * 
     * @apiParam {String} name User name, not unique
     * @apiParam {String} email User email, unique
     * @apiParam {String} password User password, not unique
     
     * @apiParamExample JSON Body Example:
     * { 
     *       "name": "Filipe",
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
     * @apiError UpdateUserFailed an unexpected error occurs in the update of the User
     * 
     * @apiErrorExample Error-response
     * HTTP/1.1 400 Error updating the user
     * 
     * {
     *    error: "User edit failed"
     * }
     * 
     * @apiError UserDoesNotExistsFailed the user doesn't have an email in the data base
     * 
     * @apiErrorExample Error-response
     * HTTP/1.1 400 Error does not exists
     * 
     * {
     *    error: "User doesn't exists"
     * }
     * 
     * @apiVersion 1.0.0
     * 
     */
    async update(req, res){
        try {
            const userId = req.userId;
            
            let user = await User.findById(userId);
            
            if(user){
                const { name, email, password } = req.body;

                user.name = name;
                user.email = email
                user.password = password;

                await user.save();
            }else{
                return res.status(400).send({ error : "User doesn't exists"});
            }

            user.password = undefined;

            return res.json(user);
        } catch (error) {
            return res.status(400).send({ error : "User edit failed"});
        }
    }

}
