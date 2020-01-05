require('./initEnvironments')
const express = require('express')
const bodyParser = require('body-parser')
const routers = require('./server/routers')
const cors = require('cors')

const app = express()

app.use(
    cors({
        origin: (origin, callback) => {
            if (process.env.CLIENT_URL.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
    }),
)
app.use(bodyParser.json())

routers.forEach(item => app.use('/' + item.name, item.router))

app.listen(process.env.API_ENDPOINT, function() {
    console.log(`Start listening at port ${process.env.API_ENDPOINT}`)
})
