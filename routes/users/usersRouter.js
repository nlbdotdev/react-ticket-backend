var express = require('express');
var router = express.Router();
const { createUser, userLogin, updateProfile, getCurrentUser } = require('./controller/usersController')
const { checkIsEmpty, jwtMiddleware, validateUserData, validateEmail, confirmPassword } = require('../lib/validationMiddleware/index')

// Route check
router.get('/', function (req, res, next) { res.send('hello from user router'); });

// Create new user
router.post('/create-user', checkIsEmpty, validateEmail, validateUserData, createUser)

// Get current user from bearer token
router.get('/user', jwtMiddleware, getCurrentUser)

// Update current user with bearer token and req body
router.put('/update-profile', jwtMiddleware, checkIsEmpty, validateUserData, confirmPassword, updateProfile)

// Login with email and password
router.post('/login', validateEmail, userLogin)

module.exports = router