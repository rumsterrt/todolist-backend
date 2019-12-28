const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')

module.exports = router =>
    router.patch(
        '/:uuid',
        runHttpHandler(async req => {
            const { uuid } = req.params
            const { name, description } = req.body
            const id = await db(Tables.Lists)
                .where({ id: uuid })
                .update({ name, description })
            return {
                id,
            }
        }),
    )
