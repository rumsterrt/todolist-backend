const Knex = require('knex')
const config = require('config')

const knex = Knex({
    client: 'mysql',
    connection: {
        host: config.get('db.host'),
        port: config.get('db.port'),
        database: config.get('db.name'),
        user: config.get('db.user'),
        password: config.get('db.password'),
    },
})

module.exports = knex
