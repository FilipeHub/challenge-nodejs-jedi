const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
 
 
const routes = require('./routes');
 
const app = express();
 
// mongoose.connect('mongodb://localhost/pokemons',
mongoose.connect('mongodb+srv://ash-cation:euescolhovc@filipeserver-8wfhq.mongodb.net/pokemons?retryWrites=true&w=majority', 
    {useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true});
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(routes);
 
app.listen('3333');