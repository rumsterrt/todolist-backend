const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')

module.exports = router =>
    router.post(
        '/',
        runHttpHandler(async req => {
            const { name, categoryId } = req.body
            const res = await db.insert({ name, list_id: categoryId }).into(Tables.Todos)
            return {
                id: +res[0],
            }
        }),
    )
