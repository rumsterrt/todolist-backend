const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')
const auth = require('../../middleware/auth')

module.exports = router =>
    router.put(
        '/:id',
        auth,
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
