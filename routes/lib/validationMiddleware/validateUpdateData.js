const {
    isAlpha,
    isAlphanumeric,
    isStrongPassword,
} = require('validator')

function validateUpdateData(req, res, next) {

    const { firstName, lastName, username, password, confirmPassword } = req.body
    let errObj = {}

    if (!isAlpha(firstName)) {
        errObj.firstName = "First name should only have letters."
    }

    if (!isAlpha(lastName)) {
        errObj.lastName = "Last name should only have letters."
    }

    if (!isAlphanumeric(username)) {
        errObj.password = "Username should not have special characters."
    }

    if (!isStrongPassword(password)) {
        errObj.password = "Password is invalid, must contain: at least 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character."
    }

    if (password !== confirmPassword) {
        errObj.confirmPassword = "Password and confirm password do not match"
    }

    if (Object.keys(errObj).length > 0) {
        return res.status(500).json(errObj)
    } else {
        console.log("Update Data Validated!")
        next()
    }
}

module.exports = {
    validateUpdateData,
}
