const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

module.exports = router =>
    router.post(
        '/register',
        [
            check('email', 'Incorrect email').isEmail(),
            check('password', 'Password need to be 6 symbols at least').isLength({ min: 6 }),
        ],
        runHttpHandler(async req => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error(errors.array()[0].msg)
            }

            const { email, password } = req.body

            const isExist =
                (
                    await db
                        .select('*')
                        .from(Tables.Users)
                        .where({ email })
                ).length > 0

            if (isExist) {
                throw new Error('This email already exist!')
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const res = await db.insert({ email, password: hashedPassword }).into(Tables.Users)

            return {
                id: +res[0],
            }
        }),
    )
