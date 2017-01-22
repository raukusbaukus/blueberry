
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(events) {
    events.increments('id');
    events.string('title').notNullable();
    events.integer('user').references('users.id').notNullable();
    events.dateTime('start').notNullable();
    events.dateTime('end').notNullable();
    events.text('description');
    events.enu('skill_level', ['beginner', 'intermediate', 'advanced']);
    events.integer('capacity').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
