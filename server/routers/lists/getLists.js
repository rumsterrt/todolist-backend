const db = require('../../services/db')
const { runHttpHandler } = require('../../utils/lifecicle')
const { Tables } = require('../../constants')
const auth = require('../../middleware/auth')

module.exports = router =>
    router.get(
        '/',
        auth,
        runHttpHandler(async req => {
            const { offset = 0, limit = 10, id, filter } = req.query
            const { userId } = req.user

            if (id) {
                const result = await db
                    .select(
                        't1.id as id',
                        't1.name as name',
                        't1.description as description',
                        't1.totalTodos as totalTodos',
                        't2.completeTodos as completeTodos',
                    )
                    .from(
                        db
                            .select(
                                `${Tables.Lists}.id as id`,
                                `${Tables.Lists}.name as name`,
                                `${Tables.Lists}.description as description`,
                            )
                            .from(Tables.Lists)
                            .leftJoin(Tables.Todos, `${Tables.Lists}.id`, `${Tables.Todos}.categoryId`)
                            .groupBy(`${Tables.Lists}.id`)
                            .where({ [`${Tables.Lists}.id`]: id, ownerId: userId })
                            .count(`${Tables.Todos}.id as totalTodos`)
                            .as('t1'),
                    )
                    .leftJoin(
                        db
                            .select(`${Tables.Lists}.id as id`)
                            .from(Tables.Lists)
                            .leftJoin(Tables.Todos, `${Tables.Lists}.id`, `${Tables.Todos}.categoryId`)
                            .groupBy(`${Tables.Lists}.id`)
                            .count(`${Tables.Todos}.id as completeTodos`)
                            .where({ [`${Tables.Todos}.isDone`]: 1, [`${Tables.Lists}.id`]: id, ownerId: userId })
                            .as('t2'),
                        't1.id',
                        't2.id',
                    )

                return {
                    node: result[0],
                }
            }

            const request = db
                .select(
                    't1.id as id',
                    't1.name as name',
                    't1.description as description',
                    't1.totalTodos as totalTodos',
                    't2.completeTodos as completeTodos',
                )
                .from(
                    db
                        .select(
                            `${Tables.Lists}.id as id`,
                            `${Tables.Lists}.name as name`,
                            `${Tables.Lists}.description as description`,
                        )
                        .from(Tables.Lists)
                        .limit(limit)
                        .offset(offset)
                        .leftJoin(Tables.Todos, `${Tables.Lists}.id`, `${Tables.Todos}.categoryId`)
                        .groupBy(`${Tables.Lists}.id`)
                        .where({ ownerId: userId })
                        .count(`${Tables.Todos}.id as totalTodos`)
                        .as('t1'),
                )
                .leftJoin(
                    db
                        .select(`${Tables.Lists}.id as id`)
                        .from(Tables.Lists)
                        .limit(limit)
                        .offset(offset)
                        .leftJoin(Tables.Todos, `${Tables.Lists}.id`, `${Tables.Todos}.categoryId`)
                        .groupBy(`${Tables.Lists}.id`)
                        .count(`${Tables.Todos}.id as completeTodos`)
                        .where({ [`${Tables.Todos}.isDone`]: 1, ownerId: userId })
                        .as('t2'),
                    't1.id',
                    't2.id',
                )

            if (filter) {
                request.where('name', 'like', `%${filter}%`)
            }

            const nodes = await request

            return {
                nodes: nodes.map(node => ({ ...node, completeTodos: node.completeTodos || 0 })),
            }
        }),
    )
