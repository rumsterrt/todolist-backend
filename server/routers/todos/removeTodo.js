const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')
const auth = require('../../middleware/auth')

module.exports = router =>
    router.delete(
        '/:id',
        auth,
        runHttpHandler(async req => {
            const { id } = req.params

            await db(Tables.Todos)
                .where({ id })
                .del()

            return {
                id: +id,
            }
        }),
    )
