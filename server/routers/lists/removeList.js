const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')
const auth = require('../../middleware/auth')

module.exports = router =>
    router.delete(
        '/:id',
        auth,
        runHttpHandler(async req => {
            const { id } = req.params
            const { userId } = req.user
            const record = (await db(Tables.Lists).select('*'))[0]

            if (!record) {
                throw new Error('List does not exist')
            }

            if (userId !== record.ownerId) {
                throw new Error('Your have no access')
            }

            await db(Tables.Lists)
                .where({ id })
                .del()

            return {
                id: +id,
            }
        }),
    )
