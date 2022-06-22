const { isAlpha, isAlphanumeric, isStrongPassword} = require('validator')

// Validate format of user properties
function validateUserData(req, res, next) {

    // console.log('Validate user data')
    // console.log(req.body)

    const { firstName, lastName, username, email, password } = req.body
    let errObj = {}

    if (!isAlpha(firstName)) {
        errObj.firstName = "First name should only have letters."
    }

    if (!isAlpha(lastName)) {
        errObj.lastName = "Last name should only have letters."
    }

    if (!isAlphanumeric(username)) {
        errObj.username = "Username should not have special characters."
    }

    if (!isStrongPassword(password)) {
        errObj.password = "Password is invalid, must contain: at least 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character."
    }

    if (Object.keys(errObj).length > 0) {
        return res.status(500).json({ message: "error", error: errObj })
    } else {
        next()
    }
}

module.exports = {
    validateUserData,
}
