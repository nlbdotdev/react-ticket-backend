const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../model/User");
const { userErrorHandler: errorHandler } = require('../utils/userErrorHandler');
const { hashPassword } = require("../utils/userFunctions");

const createUser = async (req, res) => {
    try {
        // Create user with body params and hashed password
        const { firstName, lastName, username, email, password } = req.body
        let hashedPassword = await hashPassword(password)
        let newUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
        })
        let savedUser = await newUser.save()

        res.status(200).json({ message: "success", payload: savedUser })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error", error: errorHandler(error) })
    }
}

const updateProfile = async (req, res) => {

    try {
        // Fetch token from response locals
        const decodedToken = res.locals.decodedToken

        // Hash password and append to request body
        let hashedPassword = await hashPassword(req.body.password)
        req.body.password = hashedPassword

        // Find user via JWT & Email and update
        const updatedUser = await User.findOneAndUpdate(
            { email: decodedToken.email },
            req.body,
            { new: true })
        res.status(200).json({ message: "Updated User", payload: updatedUser })

    } catch (error) {
        res.status(500).json({ error: errorHandler(error) })
    }
}

const userLogin = async (req, res) => {

    try {

        // Validate email
        const { email, password } = req.body
        const foundUser = await User.findOne({ email: email })
        // More secure to use same error to obscure email
        // if (foundUser === null) throw { message: "Email not found" }
        if (foundUser === null) throw { message: "Email and Password do not match" }

        // Validate password
        const comparedPassword = await bcrypt.compare(password, foundUser.password)
        if (!comparedPassword) throw { message: "Email and Password do not match" }

        // Generate a token on sucesful login
        const jwtToken = jwt.sign(
            {
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                email: foundUser.email,
                username: foundUser.username,
            },
            process.env.SECRET_KEY,
            { expiresIn: process.env.JWT_LIFETIME }
        )
        res.status(200).json({ payload: jwtToken })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};


module.exports = {
    createUser,
    userLogin,
    updateProfile,
}