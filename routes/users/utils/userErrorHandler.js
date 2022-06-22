// Schema Error Parsers
const parseDupe = (err) => {
    let objKeys = Object.keys(err.keyValue)
    let objValue = Object.values(err.keyValue)
    return { [objKeys[0]]: `${objValue[0]} is already in use.` }
}

// Schema Error Handler
const userErrorHandler = (err) => {

    let errObj = {}

    if (err.code) {
        switch (err.code) {
            // duplicate key error
            case 11000:
                errObj = parseDupe(err)
                break;
            default:
                errObj = {
                    user: "Uncaught schema error",
                    error: err
                }
        }
    }
    return errObj
}

module.exports = {
    userErrorHandler,
}