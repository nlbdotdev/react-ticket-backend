const jwt = require('jsonwebtoken')

const jwtMiddleware = async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization) {
            let token = req.headers.authorization.slice(7)
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            res.locals.decodedToken = decodedToken
            next()
        } else {
            throw { message: "You don't have permission" }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    jwtMiddleware,
}