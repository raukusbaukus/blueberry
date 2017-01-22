
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events_users', function(events_users) {
    events_users.increments('id');
    events_users.integer('event').references('events.id').notNullable();
    events_users.integer('user').references('users.id').notNullable();
    events_users.enu('role', ['student', 'teacher']).notNullable();
    events_users.enu('rating', [1, 2, 3, 4, 5]);
    events_users.timestamp('timestamp').defaultTo(knex.fn.now());
    events_users.text('review');
    events_users.unique(['event', 'user', 'role']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events_users');
};
