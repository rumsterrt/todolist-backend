exports.up = function(knex) {
    return knex.schema.createTable('todos', function(table) {
        table
            .increments('id')
            .unsigned()
            .primary()
        table
            .integer('categoryId')
            .unsigned()
            .notNullable()
            .index()
        table.string('name').notNullable()
        table
            .bool('isDone')
            .notNullable()
            .defaultTo(false)
        table.timestamps(true, true)

        table
            .foreign('categoryId')
            .references('id')
            .inTable('lists')
            .onDelete('cascade')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('todos')
}
