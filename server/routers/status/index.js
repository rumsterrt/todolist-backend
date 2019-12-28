const express = require('express')
const { runHttpHandler } = require('../../utils/lifecicle')
const router = express.Router()

router.get(
    '/',
    runHttpHandler(req => {
        return {
            res: 'OK',
        }
    }),
)

module.exports = { router, name: 'status' }
