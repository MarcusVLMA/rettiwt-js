const mongoose = require('mongoose');
const UserMiddleware = require('../middlewares/UserMiddlewares');

const UserSchema = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tweets: [{
        type: mongoose.Schema.ObjectId, 
        ref: 'Tweet'
    }],
    following: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    followed: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
});

UserSchema.pre('save', UserMiddleware.hashPassword);

module.exports = mongoose.model('User', UserSchema);