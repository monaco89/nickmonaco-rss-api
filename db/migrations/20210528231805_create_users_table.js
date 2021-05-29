exports.up = async function (knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').unsigned().primary();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('email').notNullable();
        table.string('password').notNullable();
    });
};

exports.down = function () {};
