exports.up = function(knex) {
    return knex.schema.createTable('lists', function(table) {
        table
            .increments('id')
            .unsigned()
            .primary()
        table.string('name').notNullable()
        table.string('description')
        table.timestamps(true, true)
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('lists')
}
