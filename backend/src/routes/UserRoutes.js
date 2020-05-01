const express = require('express');
const UserController = require('../controllers/UserController');
const verifyAuthMiddleware = require('../middlewares/routes/VerifyAuthentication');

const routes = express.Router();


routes.use(verifyAuthMiddleware);

routes.post('/', UserController.save);
routes.get('/', UserController.find);
routes.get('/:userId', UserController.find);
routes.put('/', UserController.update);
routes.delete('/', UserController.delete);


module.exports = app => app.use('/users', routes);