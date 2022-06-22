var express = require('express');
var router = express.Router();
const { createUser, userLogin, updateProfile, getCurrentUser } = require('./controller/usersController')
const { checkIsEmpty, jwtMiddleware, validateUserData, validateEmail, confirmPassword } = require('../lib/validationMiddleware/index')

// Add get current user
// Add get all users

/* Get users listing. */
router.get('/', function (req, res, next) {
  res.send('hello from user router');
});

router.get('/user', jwtMiddleware, getCurrentUser)

router.post('/create-user', checkIsEmpty, validateEmail, validateUserData, createUser)
router.post('/login', validateEmail, userLogin)
router.put('/update-profile', jwtMiddleware, checkIsEmpty, validateUserData, confirmPassword, updateProfile)

module.exports = router