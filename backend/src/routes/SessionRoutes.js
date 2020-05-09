const express = require('express');
const SessionController = require('../controllers/SessionController');

const routes = express.Router();


routes.post('/authenticate', SessionController.authenticate);
routes.post('/register', SessionController.register);


module.exports = app => app.use(routes);