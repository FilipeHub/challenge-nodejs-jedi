const express = require('express');
const bodyParser = require('body-parser');

class AppController{
    constructor(){
        this.express = express();
        this.middlewares();
        this.routes();

    }

    middlewares(){
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended:false}));
    }

    routes(){
        this.express.use(require('./routes'));
    }
}

module.exports = new AppController().express
