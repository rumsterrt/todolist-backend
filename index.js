const express = require('express')
const bodyParser = require('body-parser')
const routers = require('./server/routers')
const cors = require('cors')
const config = require('config')
const { log } = require('./server/utils/log')

const app = express()

const port = config.get('port') || 4000

app.use(
    cors({
        origin: (origin, callback) => {
            const clientUrl = config.get('client_url')
            if (clientUrl && clientUrl.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
    }),
)
app.use(bodyParser.json())

routers.forEach(item => app.use('/' + item.name, item.router))

app.listen(port, function() {
    log(`Start listening at port ${port}`)
})
