exports.up = async (knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.string('name');
  });
};

exports.down = async (knex) => {};
