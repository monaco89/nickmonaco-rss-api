exports.up = async function (knex) {
  await knex.schema.createTable('feeds', (table) => {
    table.increments('id').unsigned().primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('name').notNullable();
    table.string('rss').notNullable();
    table.string('icon');
    table.boolean('enabled').notNullable().defaultTo(false);
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users');
  });
  await knex.schema.createTable('bookmarks', (table) => {
    table.increments('id').unsigned().primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('title').notNullable();
    table.string('url').notNullable();
    table.string('content');
    table.string('pubDate');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users');
    table.integer('feed_id').unsigned();
    table.foreign('feed_id').references('id').inTable('feeds');
  });
};

exports.down = function () {};
