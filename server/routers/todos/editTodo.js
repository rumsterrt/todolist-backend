const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')

module.exports = router =>
    router.put(
        '/:id',
        runHttpHandler(async req => {
            const { id } = req.params
            const { name, isDone } = req.body

            const fields = { name, isDone }
            Object.keys(fields).forEach(key => fields[key] === undefined && delete fields[key])

            const res = await db(Tables.Todos)
                .where({ id })
                .update(fields)

            return {
                id: +id,
            }
        }),
    )
