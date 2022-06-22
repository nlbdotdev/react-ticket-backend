var express = require('express');
var router = express.Router();
const { createUser, userLogin, updateProfile, getCurrentUser } = require('./controller/usersController')
const { checkIsEmpty, jwtMiddleware, validateUserData, validateEmail, confirmPassword } = require('../lib/validationMiddleware/index')

// Routes
router.get('/', function (req, res, next) { res.send('hello from user router'); });
router.post('/create-user', checkIsEmpty, validateEmail, validateUserData, createUser)
router.get('/user', jwtMiddleware, getCurrentUser)
router.put('/update-profile', jwtMiddleware, checkIsEmpty, validateUserData, confirmPassword, updateProfile)
router.post('/login', validateEmail, userLogin)

module.exports = router