const { isEmail } = require('validator')

function validateEmail(req, res, next) {

    const {email} = req.body
    let errObj = {}

    console.log(req.body.email)

    if (!isEmail(email)) {
        errObj.password = "Email is invalid."
    }

    if (Object.keys(errObj).length > 0) {
        return res.status(500).json( { messag: "Error", error: errObj} )
    } else {
        next()
    }
}

module.exports = {
    validateEmail,
}