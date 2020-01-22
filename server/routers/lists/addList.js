const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')
const auth = require('../../middleware/auth')

module.exports = router =>
    router.post(
        '/',
        auth,
        runHttpHandler(async req => {
            const { name, description } = req.body
            const res = await db.insert({ name, description, ownerId: req.user.userId }).into(Tables.Lists)
            return {
                id: +res[0],
            }
        }),
    )
