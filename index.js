require('./initEnvironments')
const express = require('express')
const bodyParser = require('body-parser')
const routers = require('./server/routers')

const app = express()

app.use(bodyParser.json())

routers.forEach(item => app.use('/' + item.name, item.router))

app.listen(process.env.API_ENDPOINT, function() {
    console.log(`Start listening at port ${process.env.API_ENDPOINT}`)
})
