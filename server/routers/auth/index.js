const { Router } = require('express')
const router = Router()

const register = require('./register')
const login = require('./login')

register(router)
login(router)

module.exports = { router, name: 'auth' }
