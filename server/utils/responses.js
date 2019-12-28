const success = (res, payload = {}) => res.status(200).send({ success: true, ...payload })
const failure = (res, error, message) => res.status(200).send({ success: false, error, message })

module.exports = { success, failure }
