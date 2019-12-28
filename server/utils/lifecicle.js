const responses = require('./responses')

module.exports.runHttpHandler = fn => async (req, res) => {
    try {
        const result = await fn(req, res)
        responses.success(res, result)
    } catch (e) {
        responses.failure(res, e.name === 'Error' ? 'InternalError' : e.name, e.message)
    }
}
