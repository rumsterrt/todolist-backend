const express = require('express')
const router = express.Router()

//routes
const getTodos = require('./getTodos')
const addTodo = require('./addTodo')
const removeTodo = require('./removeTodo')
const editTodo = require('./editTodo')

getTodos(router)
addTodo(router)
removeTodo(router)
editTodo(router)

module.exports = { router, name: 'todos' }
