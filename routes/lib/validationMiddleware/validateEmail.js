const { isEmail } = require('validator')

// Validate email format only
function validateEmail(req, res, next) {

    // console.log("Validate email")
    // console.log(req.body)

    const { email } = req.body
    let errObj = {}

    console.log(req.body.email)

    if (!isEmail(email)) {
        errObj.email = "Email is invalid."
    }

    if (Object.keys(errObj).length > 0) {
        return res.status(500).json({ message: "error", error: errObj })
    } else {
        next()
    }
}

module.exports = {
    validateEmail,
}