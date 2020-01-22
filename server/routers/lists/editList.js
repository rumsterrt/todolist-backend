const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')
const auth = require('../../middleware/auth')

module.exports = router =>
    router.put(
        '/:uuid',
        auth,
        runHttpHandler(async req => {
            const { uuid } = req.params
            const { name, description } = req.body
            const { userId } = req.user
            const record = (await db(Tables.Lists).select('*'))[0]

            if (!record) {
                throw new Error('List does not exist')
            }

            if (userId !== record.ownerId) {
                throw new Error('Your have no access')
            }

            const id = await db(Tables.Lists)
                .where({ id: uuid })
                .update({ name, description })

            return {
                id: +id,
            }
        }),
    )
