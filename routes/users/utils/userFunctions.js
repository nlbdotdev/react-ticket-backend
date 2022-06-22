// consider moving to usersControllers

const User = require('../model/User')
const bcrypt = require("bcryptjs");

const hashPassword = async(password) => {
    let salt = await bcrypt.genSalt(parseInt(process.env.BCRYPTJS_SALTROUNDS))
    let hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

// Currently not used
const getUserFromToken = async(decodedToken) => {
    return await User.findOne({ email: decodedToken.email })
 }

module.exports = {
    getUserFromToken,
    hashPassword,
}