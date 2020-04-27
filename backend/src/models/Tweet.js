const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Tweet', TweetSchema);