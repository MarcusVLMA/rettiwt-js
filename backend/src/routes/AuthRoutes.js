const express = require('express');
const AuthController = require('../controllers/AuthController');

const routes = express.Router();


routes.post('/authenticate', AuthController.authenticate);


module.exports = app => app.use(routes);