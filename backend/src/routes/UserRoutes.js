const express = require('express');
const UserController = require('../controllers/UserController');
const verifyAuthMiddleware = require('../middlewares/routes/VerifyAuthentication');

const routes = express.Router();


routes.use(verifyAuthMiddleware);

routes.get('/users', UserController.find);
routes.get('/users/:userId', UserController.find);
routes.get('/all/users', UserController.findAll);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);


module.exports = app => app.use('/', routes);