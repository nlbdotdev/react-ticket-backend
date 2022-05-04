const { isEmpty } = require('validator');

function checkIsEmpty(req, res, next) {
    let errObj = {}
    const body = req.body
    for (const key in body) {
        if (isEmpty(body[key])) {
            errObj[key] = `${key} cannot be left blank.`
        }
    }

    let checkObj = Object.keys(errObj)

    if (checkObj.length > 0) {
        return res.status(500).json( { message: "Error", error: errObj })
    } else {
        next()
    }   
}

module.exports = {
    checkIsEmpty
}