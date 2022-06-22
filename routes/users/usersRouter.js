var express = require('express');
var router = express.Router();
const { createUser, userLogin, updateProfile } = require('./controller/usersController')
const { checkIsEmpty, jwtMiddleware, validateUserData, validateEmail, confirmPassword } = require('../lib/validationMiddleware/index')

// Add get user
// Add get all users

/* Get users listing. */
router.get('/', function (req, res, next) {
  res.send('hello from user router');
});

router.post('/create-user', checkIsEmpty, validateEmail, validateUserData, createUser)
router.post('/login', validateEmail, userLogin)
router.put('/update-profile', jwtMiddleware, checkIsEmpty, validateUserData, confirmPassword, updateProfile)

module.exports = router