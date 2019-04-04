const config = require('../config')
const library = require('./library')(config.libraryDirectory)

module.exports = (req, res, next) => {
    req.di = {
        library
    }
    next()
}