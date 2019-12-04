require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

const mongoose = require('mongoose');

const app = require('./app');

// 'mongodb://localhost/pokemons'
mongoose.connect(process.env.DB_CONNECTION, 
    {useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true});


app.listen(process.env.PORT);