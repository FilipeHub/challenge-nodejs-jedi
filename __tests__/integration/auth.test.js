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


afterAll(async () => {
    mongoose.disconnect();
});

describe('Testing with /PUT in /users by work to any authenticated route', () => {

    it('should edit the user informations with a valid token', async () =>{
        const {body: bodyPostUser} = await request(app).post('/users').send(userInfo);

        const userToken = bodyPostUser.token;

        const {body, status } = await request(app).put('/users').
        send({"name": "Mateus",
            "email": "mateus@gmail.com",
            "password": "123456"})
        .set('Authorization', 'bearer ' + userToken);
        
        expect(status).toBe(200);
        await User.collection.drop();
    });

    it('should not edit the user informations because did not pass a token', async () =>{
        const {body, status } = await request(app).put('/users').send(userInfo);

        expect(status).toBe(401);
        expect(body.error).toBe('No token provided');
    });

    it('should not edit the user informations because did not pass a bearer token', async () =>{
        const {body, status } = await request(app).put('/users').
        send(userInfo).set('Authorization', 'anything');

        expect(status).toBe(401);
        expect(body.error).toBe('It is not a Bearer Token');
    });


    it('should not edit the user informations because did not pass a token', async () =>{
        const {body, status } = await request(app).put('/users').send(userInfo)
        .set('Authorization', 'xyz abc cde');

        
        expect(status).toBe(401);
        expect(body.error).toBe('It is not a Bearer Token');
        
    });

    it('should not edit the user informations because did not pass a token', async () =>{
        const {body, status } = await request(app).put('/users').send(userInfo)
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTcxNjQxZjZhODNhNjc4YTMwMzQzYiIsImlhdCI6MTU3NTQyNTYxMywiZXhwIjoxNTc1NDI1Njk5fQ.H5hxKQFOg_-1hjVpffz1XwwbV7XVb-JlR5FEYW2WOcw');

        expect(status).toBe(401);
        expect(body.error).toBe('Token invalid');
        
    });
});