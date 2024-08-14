exports.up = async function(knex) {
  await knex.schema.createTable('user', (table) => {
    table.increments('id');
    table.string('name');
    table.string('email');
    table.string('password');
    table.timestamp('created_at', {useTz: true}).defaultTo(knex.fn.now());
    table.timestamp('updated_at', {useTz: true}).defaultTo(knex.fn.now());
    table.timestamp('deleted_at', {useTz: true});
  })
};


exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('user');
};

