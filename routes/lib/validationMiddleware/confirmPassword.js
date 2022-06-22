// Compares password and confirmation password
function confirmPassword(req, res, next) {

    // console.log('Confirm password')
    // console.log(req.body)

    const { password, confirmPassword } = req.body
    let errObj = {}

    if (password !== confirmPassword) {
        errObj.confirmPassword = "Password and confirmation password do not match"
    }

    if (Object.keys(errObj).length > 0) {
        return res.status(500).json({ message: "error", error: errObj })
    } else {
        console.log("Update Data Validated!")
        next()
    }
}

module.exports = {
    confirmPassword,
}