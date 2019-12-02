require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');

const User = require("../../src/models/User");
const userInfo = {"name": "Aline2", "email": "a@gmail.com", "password": "123456"};

describe('Users', () => {
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
    
    it('should crate a new user', async () =>{
        const response = await request(app).post('/users').send(userInfo);
        console.log(response.body);
        expect(response.status).toBe(200);
        // const newUser = await User.create(userInfo);
        // console.log(newUser);
        // expect(userInfo.email).toBe(newUser.email);
    });

    afterEach(() => {
        User.collection.drop();
      });

});