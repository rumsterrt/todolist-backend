const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')

module.exports = router =>
    router.post(
        '/',
        runHttpHandler(async req => {
            const { name, description } = req.body
            const res = await db.insert({ name, description }).into(Tables.Lists)
            return {
                id: +res[0],
            }
        }),
    )
