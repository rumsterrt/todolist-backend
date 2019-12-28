const { log } = require('./server/utils/log')
const conf = require('./config.js')

try {
    const keys = Object.keys(conf)
    keys.forEach(key => {
        process.env[key] = conf[key]
    })
} catch (e) {
    log(e)
}
