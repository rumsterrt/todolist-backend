const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = router =>
    router.post(
        '/login',
        [
            check('email', 'Incorrect email')
                .normalizeEmail()
                .isEmail(),
            check('password', 'Input password').exists(),
        ],
        runHttpHandler(async req => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error(errors[0])
            }

            const { email, password } = req.body

            const account = (
                await db
                    .select('*')
                    .from(Tables.Users)
                    .where({ email })
            )[0]

            if (!account) {
                throw new Error('Email not found!')
            }

            const isValidPassword = await bcrypt.compare(password, account.password)

            if (!isValidPassword) {
                throw new Error('Wrong password!')
            }

            const token = jwt.sign({ userId: account.id }, config.get('jwt_secret'), {
                expiresIn: config.get('jwt_lifetime') || '1h',
            })

            return {
                token,
                userId: account.id,
            }
        }),
    )
