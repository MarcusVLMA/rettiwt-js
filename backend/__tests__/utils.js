const request = require('supertest');
const { mongoose, app } = require('../src/app');
const factory = require('./factories');

module.exports = { 
    async truncate() {
        await mongoose.connection.dropDatabase();
    },
    async login() {
        const user = await factory.create('User', {
            username: 'user-to-login',
            password: '123456'
        });
        
        const response = await request(app).post('/authenticate').send({
            username: user.username,
            password: '123456'    
        });
        
        let token = response.body.token;
        return token;
    }
};