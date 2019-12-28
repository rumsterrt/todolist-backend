const Knex = require('knex')

const knex = Knex({
    client: 'mysql',
    connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_ACCESS_KEY,
        database: process.env.DATABASE_NAME,
    },
})

module.exports = knex
