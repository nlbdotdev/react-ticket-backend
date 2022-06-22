const jwt = require('jsonwebtoken')

// Validate token before moving on
const jwtMiddleware = async (req, res, next) => {

    // console.log('jwtMiddleware')
    // console.log(req.headers)

    try {
        if (req.headers && req.headers.authorization) {
            // Cut 'Bearer ' from auth string
            let token = req.headers.authorization.slice(7)
            // Verify token with environment secret key
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            res.locals.decodedToken = decodedToken
            next()
        } else {
            throw { message: "Token Error" }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    jwtMiddleware,
}