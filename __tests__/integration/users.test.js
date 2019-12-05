const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const User = require("../../src/models/User");

require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

// Informations of a user that will be used in the
const userInfo = {
    "name": "Rafael", 
    "email": "rafael2@gmail.com", 
    "password": "123456"
};

beforeAll(async () => {
    mongoose.connect(process.env.DB_CONNECTION, 
        {useNewUrlParser:true,
        useCreateIndex: true,
        useUnifiedTopology: true}, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });

});

afterEach(async () => {
    try {
        await User.collection.drop();
    } catch (error) {
        console.warn('Try to drop an inexistent collection: User');
    }
});


afterAll(async () => {
    mongoose.disconnect();
});

describe('/POST in /users', async () => {

    it('should crate a new user', async () =>{
        const response = await request(app).post('/users').send(userInfo);
        
        expect(response.status).toBe(200);
        expect(response.body.user.name).toBe(userInfo.name);
        expect(response.body.user.email).toBe(userInfo.email);
        expect(response.body.user.password).toBe(undefined);
        
    });

    it('should not create a new user because it already exists in the database', async () =>{
        await request(app).post('/users').send(userInfo);
        const response = await request(app).post('/users').send(userInfo);

        expect(response.error.text).toBe('{"error":"User already exists"}');
    });


});

describe('/PUT in /users', async () => {
    
    
    it('should edit a user that exists in the database', async () =>{
        const responseCreate = await request(app).post('/users').
            send({"name": "Mateus",
                 "email": "mateus@gmail.com",
                 "password": "123456"});
                 
        const userToken = responseCreate.body.token;

        const responseUpdate = await request(app).put('/users').
        send(userInfo).set('Authorization', 'bearer ' + userToken);
        
        
        expect(responseUpdate.status).toBe(200);
        
        expect(responseUpdate.body.name).toBe(userInfo.name);
        expect(responseUpdate.body.email).toBe(userInfo.email);
        expect(responseUpdate.body.password).toBe(undefined);
        
    });

});