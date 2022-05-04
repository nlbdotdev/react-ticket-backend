const validator = require('validator')

function validateCreateData(req, res, next) {

    const { firstName, lastName, username, email, password } = req.body
    const body = req.body
    let errObj = {}

    if (!validator.isAlpha(firstName)) {
        errObj.firstName = "First name should only have letters."
    }

    if (!validator.isAlpha(lastName)) {
        errObj.lastName = "Last name should only have letters."
    }

    if (!validator.isAlphanumeric(username)) {
        errObj.password = "Username should not have special characters."
    }

    if (!validator.isEmail(email)) {
        errObj.password = "Email is invalid."
    }

    if (!validator.isStrongPassword(password)) {
        errObj.password = "Password is invalid, must contain: at least 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character."
    }

    if (Object.keys(errObj).length > 0) {
        return res.status(500).json(errObj)
    } else {
        next()
    }
}

module.exports = {
    validateCreateData,
}
