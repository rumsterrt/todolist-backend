const express = require('express')
const router = express.Router()

//routes
const getList = require('./getList')
const getLists = require('./getLists')
const addList = require('./addList')
const removeList = require('./removeList')
const editList = require('./editList')

getLists(router)
getList(router)
addList(router)
removeList(router)
editList(router)

module.exports = { router, name: 'lists' }
