const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken")
const { errorHandler } = require('../utils/errorHandler');
const { hashPassword } = require("../utils/userFunctions");

const createUser = async (req, res) => {

    console.log("Create User")

    try {
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

        res
            .status(200)
            .json({ message: "success", payload: savedUser })

 

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error", error: errorHandler(error) })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const foundUser = await User.findOne({ email: email })
        if (foundUser === null) throw { message: "Email not found" }

        const comparedPassword = await bcrypt.compare(password, foundUser.password)

        if (!comparedPassword) throw { message: "Email and Password do not match" }

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

const updateProfile = async (req, res) => {
    try {
        const decodedToken = res.locals.decodedToken
        let hashedPassword = await hashPassword(req.body.password)

        req.body.password = hashedPassword
        const updatedUser = await User.findOneAndUpdate(
            { email: decodedToken.email },
            req.body,
            { new: true })

        console.log(updatedUser)

        res.status(200).json({ message: "Updated User", payload: updatedUser })
    } catch (error) {
        res.status(500).json({ error: errorHandler(error) })
    }
}

module.exports = {
    createUser,
    userLogin,
    updateProfile,
}