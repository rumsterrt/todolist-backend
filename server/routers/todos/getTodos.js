const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')
const auth = require('../../middleware/auth')

module.exports = router =>
    router.get(
        '/',
        auth,
        runHttpHandler(async req => {
            const { offset = 0, limit = 10, categoryId, id } = req.query

            if (id) {
                const result = await db(Tables.Todos).where({ id })

                return {
                    node: result[0],
                }
            }

            const nodes = (
                await db
                    .select('*')
                    .where({ categoryId: categoryId })
                    .from(Tables.Todos)
                    .limit(limit)
                    .offset(offset)
            ).map(node => ({ ...node, isDone: !!node.isDone }))

            return {
                nodes,
            }
        }),
    )
