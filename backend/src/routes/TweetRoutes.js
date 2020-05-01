const express = require('express');
const TweetController = require('../controllers/TweetController');
const verifyAuthMiddleware = require('../middlewares/routes/VerifyAuthentication');

const routes = express.Router();


routes.use(verifyAuthMiddleware);

routes.post('/', TweetController.save);
routes.get('/', TweetController.find);
routes.get('/:tweetId', TweetController.find);
routes.delete('/', TweetController.delete);


module.exports = app => app.use('/tweets', routes);