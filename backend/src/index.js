require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/AuthRoutes');
const userRoutes = require('./routes/UserRoutes');
const tweetRoutes = require('./routes/TweetRoutes');

const app = express();

// eslint-disable-next-line no-undef
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@rettiwt-js-cfgyx.gcp.mongodb.net/test?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(cors());
app.use(express.json());

authRoutes(app);
userRoutes(app);
tweetRoutes(app);

app.listen(3001);