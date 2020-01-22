const jwt = require('jsonwebtoken')
const config = require('config')
const { failure } = require('../utils/responses')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return failure(res, null, 'No authorize', 401)
        }

        const decoded = jwt.verify(token, config.get('jwt_secret'))
        req.user = decoded
        next()
    } catch (e) {
        failure(res, null, 'No authorize', 401)
    }
}
