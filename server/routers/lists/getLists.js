const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')

module.exports = router =>
    router.get(
        '/',
        runHttpHandler(async req => {
            const { offset = 0, limit = 10, id } = req.query

            if (id) {
                const result = await db(Tables.Lists).where({ id })

                return {
                    node: result[0],
                }
            }

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
