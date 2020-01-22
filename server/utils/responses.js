const success = (res, { status = 200, ...payload } = {}) => res.status(status).send({ success: true, ...payload })
const failure = (res, error, message, status = 200) =>
    res.status(status).send({
        success: false,
        error: { name: (error && error.name) || 'Internal error', message: message || (error && error.message) },
    })

module.exports = { success, failure }
