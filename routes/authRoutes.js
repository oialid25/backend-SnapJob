const express=require('express');
const routes=express.Router();
const path=require('path');
const authController=require('../controllers/authController')


routes.get('/register', authController.registerpage);
routes.post('/register', authController.register);


routes.get('/login', authController.loginpage);
routes.post('/login', authController.login);

routes.get('/logout', authController.logout);

routes.get('/refresh', authController.refresh);


routes.post('/logout', authController.logout);


module.exports = routes;