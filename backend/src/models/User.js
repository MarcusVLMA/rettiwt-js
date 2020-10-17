const mongoose = require('mongoose');
const UserMiddleware = require('../middlewares/models/UserMiddlewares');

const UserSchema = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
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
    }],
    profile_picture: {
        type: String,
        unique: false,
        required: false
    },
});

UserSchema.pre('save', UserMiddleware.hashPasswordOnSave);
UserSchema.pre('updateOne', UserMiddleware.hashPasswordOnUpdate);

module.exports = mongoose.model('User', UserSchema);