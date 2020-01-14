const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')

module.exports = router =>
    router.delete(
        '/:id',
        runHttpHandler(async req => {
            const { id } = req.params

            await db(Tables.Lists)
                .where({ id })
                .del()

            return {
                id: +id,
            }
        }),
    )
