const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')

module.exports = router =>
    router.get(
        '/id/:uuid',
        runHttpHandler(async req => {
            const { uuid } = req.params
            const result = await db(Tables.Lists).where({ id: uuid })
            return {
                id: result[0],
            }
        }),
    )
