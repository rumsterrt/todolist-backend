require('./initEnvironments')

module.exports = {
    development: {
        client: 'mysql',
        version: '5.7',
        connection: {
            port: process.env.DATABASE_PORT,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_ACCESS_KEY,
        },
    },
}
