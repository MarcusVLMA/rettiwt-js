const express = require('express');
const UserController = require('./controllers/UserController');
const TweetController = require('./controllers/TweetController');

const routes = express.Router();

routes.post('/users', UserController.save);
routes.get('/users', UserController.find);
routes.get('/users/:userId', UserController.find);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

routes.post('/tweets', TweetController.save);
routes.get('/tweets', TweetController.find);
routes.delete('/tweets', TweetController.delete);

module.exports = routes;