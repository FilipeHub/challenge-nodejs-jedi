require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

const jwt = require('jsonwebtoken');


/**
 * @api {_} /_ Authenticated routes
 * @apiDescription These verifications are made when the route requires a authenticated user
 * @apiName AuthenticatedRoutes
 * @apiGroup Authentication
 * 
 * @apiParam {String} token token returned when the user is created or when a login is done
 * 
 * @apiSuccess {_} _ the route normally follows
 * 
 * 
 * @apiError NoTokenProvidedError the mandatory token for that route was not provide
 * 
 * @apiErrorExample Error- NoTokenProvidedError
 * HTTP/1.1 400 Error: NoTokenProvidedError
 * 
 * {
 *    error: "No token provided"
 * }
 * 
 * 
 * @apiError TokenError the token doesn't have two parts
 * 
 * @apiErrorExample Error- TokenError
 * HTTP/1.1 400 Error: TokenError
 * 
 * {
 *    error: "Token error"
 * }
 * 
 * 
 * @apiError NotABearerTokenError the token provided is not a baerer token
 * 
 * @apiErrorExample Error- NotABearerTokenError
 * HTTP/1.1 400 Error: NotABearerTokenError
 * 
 * {
 *    error: "It is not a Bearer Token"
 * }
 * 
 * @apiError TokenInvalidError the token provided is a Bearer token by it is not valid
 * 
 * @apiErrorExample Error- TokenInvalidError
 * HTTP/1.1 400 Error: TokenInvalidError
 * 
 * {
 *    error: "Token invalid"
 * }
 *  
 * 
 * @apiVersion 1.0.0
 * 
 */
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({error: "No token provided"});
    }

    const tokenParts = authHeader.split(' ');

    if(!tokenParts.length === 2){
        return res.status(401).send({error: "Token error"});
    }

    const [scheme, token] = tokenParts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: "It is not a Bearer Token"});
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
            return res.status(401).send({error: "Token invalid"});
        }
        
        req.userId = decoded.id;
        
        return next();
    });
}