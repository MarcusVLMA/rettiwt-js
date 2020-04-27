require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

// eslint-disable-next-line no-undef
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@rettiwt-js-cfgyx.gcp.mongodb.net/test?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.json());
app.use(routes);

app.listen(3000);