exports.up = function(knex) {
    return knex.schema.table('lists', table => {
        table
            .integer('ownerId')
            .unsigned()
            .notNullable()
            .index()

        table
            .foreign('ownerId')
            .references('id')
            .inTable('users')
            .onDelete('cascade')
    })
}

exports.down = function(knex) {
    return knex.schema.table('lists', table => {
        table.dropColumn('ownerId')
    })
}
