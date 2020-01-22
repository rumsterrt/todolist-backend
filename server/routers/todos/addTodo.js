const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')
const auth = require('../../middleware/auth')

module.exports = router =>
    router.post(
        '/',
        auth,
        runHttpHandler(async req => {
            const { name, categoryId } = req.body
            const { userId } = req.user

            const list = (
                await db(Tables.Lists)
                    .select('*')
                    .where({ id: categoryId })
            )[0]

            if (list.ownerId !== userId) {
                throw new Error('Your have no access')
            }

            const res = await db.insert({ name, categoryId: categoryId }).into(Tables.Todos)

            return {
                id: +res[0],
            }
        }),
    )
