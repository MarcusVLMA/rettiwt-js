require('dotenv').config({
    // eslint-disable-next-line no-undef
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const sessionRoutes = require('./routes/SessionRoutes');
const userRoutes = require('./routes/UserRoutes');
const tweetRoutes = require('./routes/TweetRoutes');

const app = express();

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_CONNECTION_STRING, 
    { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(cors());
app.use(express.json());

sessionRoutes(app);
userRoutes(app);
tweetRoutes(app);

module.exports = { app, mongoose };