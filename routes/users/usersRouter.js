var express = require('express');
var router = express.Router();
const { createUser, userLogin, updateProfile } = require('./controller/usersController')
const { checkIsEmpty, jwtMiddleware, validateCreateData, validateEmail, validateUpdateData } = require('../lib/validationMiddleware/index')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('hello from user router');
});

router.post('/create-user', checkIsEmpty, validateCreateData, createUser)
// Why is validate email in login, and not on create user?
router.post('/login', validateEmail, userLogin)
router.put('/update-profile', jwtMiddleware, checkIsEmpty, validateUpdateData, updateProfile)

module.exports = router