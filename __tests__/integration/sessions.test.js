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

describe('Testing the login route', () => {

    it('should edit the user informations with a valid token from login route', async () =>{
        await request(app).post('/users').send({"name": "Mateus",
                                                "email": "mateus@gmail.com",
                                                "password": "123456"});
        
        const {body: bodyLogin} = await request(app).post('/login').
            send({"email": "mateus@gmail.com",
            "password": "123456"});

        const userToken = bodyLogin.token;

        const {body, status } = await request(app).put('/users').
        send(userInfo)
        .set('Authorization', 'bearer ' + userToken);
        
        expect(status).toBe(200);
        expect(body).toHaveProperty('_id');
        expect(body.name).toBe(userInfo.name);
    });

    it('should not give valid token from login route because the user does not exists in the database', async () =>{
        await request(app).post('/users').send({"name": "Mateus",
                                                "email": "mateus@gmail.com",
                                                "password": "123456"});
        
        const {body, status} = await request(app).post('/login').
            send({"email": "mmateus@gmail.com",
            "password": "12345"});
        
        expect(status).toBe(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe('User not found');
    });
    
    it('should not give valid token from login route because the password is wrong', async () =>{
        await request(app).post('/users').send({"name": "Mateus",
                                                "email": "mateus@gmail.com",
                                                "password": "123456"});
        
        const {body, status} = await request(app).post('/login').
            send({"email": "mateus@gmail.com",
            "password": "12345"});

        expect(status).toBe(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe('Invalid password');
    });
});