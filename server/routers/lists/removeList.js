const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')

module.exports = router =>
    router.delete(
        '/:uuid',
        runHttpHandler(async req => {
            const { uuid } = req.params
            await db(Tables.Lists)
                .where({ id: uuid })
                .del()
            return {
                id,
            }
        }),
    )
