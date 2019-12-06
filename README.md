# Challenge Node JS

## About this project

It's a RESTful API built with NodeJS, Express and MongoDB, that represents the API of a Pokedex system, where the user (pokemon trainer) could:
- Register himself *(POST /users)*
- Do the Login *(POST /login)*

And when he is logged on he could:
- Edit his informations *(PUT /users)*
- Create a pokemon *(POST /pokemons)*
- Delete a pokemon *(DELETE /pokemons/:id)*
- Edit a pokemon *(PUT /pokemons/:id)*
- Show the list of his pokemons *(GET /pokemons)*
- Show the details of one of his pokemons *(GET /pokemons/:id)*

## Why?

It is a project made because of the [Challenge Node JS of the LiveOnSolutions](https://github.com/LiveOnSolutions/challenge-nodejs).

## Getting Start

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment with NodeJS

### Installing

**Cloning the Repository**

```
$ git clone https://github.com/FilipeHub/challenge-nodejs.git
mongodb+srv://ash-cation:euescolhovc@filipeserver-8wfhq.mongodb.net/pokemons?retryWrites=true&w=majority
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```
### Running the Development environment

```
$ yarn dev
```

### Documentation

You can se the documentation of the system's endpoints in the **/docs/index.html file**

To generate new documentation files

```
$ yarn docs
```

### Test

To run the tests 

```
$ yarn test
```


## Built With

- [NodeJS](https://nodejs.org/en/) - Build the server
- [express](https://expressjs.com/) - Router of the Application
- [MongoDB](https://www.mongodb.com/) - Database
- [mongoose](https://mongoosejs.com/) - Object Modeling + DB Connector
- [nodemon](https://nodemon.io/) - Process Manager used in the development
- [JEST](https://jestjs.io/) - Tests
- [body-Parser](https://github.com/expressjs/body-parser#readme) - Node.js body parsing middleware
- [JWT](https://www.npmjs.com/package/jsonwebtoken) - JsonWebToken for Node.js
- [apiDocs](https://apidocjs.com/) - documentation for RESTful web APIs
- [Insominia](https://insomnia.rest) - Simulate the routes (get, post, put and delete)
- [DotEnv](https://www.npmjs.com/package/dotenv) - manipulate environment variables

## Contact

If you have any doubt, suggestion or want to chat with me, you can contact me in my email *filipencavalcante@gmail.com*
