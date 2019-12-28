const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')

module.exports = router =>
    router.get(
        '/nodes',
        runHttpHandler(async req => {
            const { offset = 0, limit = 10, filter = {} } = req.query
            const nodes = await db
                .select('*')
                .from(Tables.Lists)
                .limit(limit)
                .offset(offset)
            return {
                nodes,
            }
        }),
    )
