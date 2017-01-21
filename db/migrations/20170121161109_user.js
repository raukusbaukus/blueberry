
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(users) {
    users.increments('id');
    users.string('display_name', 255).notNullable();
    users.text('bio');
    users.string('email', 255).notNullable();
    users.string('password', 255).notNullable();
    users.string('location', 255);
    users.enu('remote_irl', ['remote', 'irl', 'both']).defaultTo('both').notNullable();
    users.string('phone', 255);
    users.boolean('email_notifications');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
