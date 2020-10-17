const express = require('express');
const multer = require('multer')
const multerConfig = require('../multerConfig')
const UserController = require('../controllers/UserController');
const verifyAuthMiddleware = require('../middlewares/routes/VerifyAuthentication');

const routes = express.Router();


routes.use(verifyAuthMiddleware);

routes.get('/users', UserController.find);
routes.get('/users/:userId', UserController.find);
routes.get('/all/users', UserController.findAll);
routes.get('/search/users/:username', UserController.searchByName);
routes.put('/users', UserController.update);
routes.put('/users/picture', multer(multerConfig).single('file'), UserController.updateProfilePicture)
routes.delete('/users', UserController.delete);

routes.post('/follow', UserController.follow);
routes.post('/unfollow', UserController.unfollow);

module.exports = app => app.use('/', routes);