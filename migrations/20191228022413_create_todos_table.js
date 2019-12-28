exports.up = function(knex) {
    return knex.schema.createTable('todos', function(table) {
        table
            .increments('id')
            .unsigned()
            .primary()
        table
            .integer('list_id')
            .unsigned()
            .notNullable()
            .index()
        table.string('description').notNullable()
        table
            .bool('is_done')
            .notNullable()
            .defaultTo(false)
        table.timestamps(true, true)

        table
            .foreign('list_id')
            .references('id')
            .inTable('lists')
            .onDelete('cascade')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('todos')
}
