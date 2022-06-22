const { isEmpty } = require('validator');

// Validate every property in request object has data
function checkIsEmpty(req, res, next) {

    // console.log("Check is empty")
    // console.log(req.body)

    let errObj = {}

    const body = req.body
    for (const key in body) {
        if (isEmpty(body[key])) {
            errObj[key] = `${key} cannot be left blank.`
        }
    }

    if (Object.keys(errObj).length > 0) {
        return res.status(500).json({ message: "error", error: errObj })
    } else {
        next()
    }
}

module.exports = {
    checkIsEmpty
}