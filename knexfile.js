const config = require('config')

module.exports = {
    development: {
        client: 'mysql',
        version: '5.7',
        connection: {
            port: config.get('db.port'),
            host: config.get('db.host'),
            database: config.get('db.name'),
            user: config.get('db.user'),
            password: config.get('db.password'),
        },
    },
}
