exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(events) {
    events.increments('id');
    events.string('title').notNullable();
    events.integer('user').notNullable().references('users.id').onDelete('cascade');
    events.dateTime('start').notNullable();
    events.dateTime('end').notNullable();
    events.text('description');
    events.string('venue', 255);
    events.string('address', 255).notNullable();
    events.string('area', 255).notNullable();
    events.enu('skill_level', ['beginner', 'intermediate', 'advanced']);
    events.integer('capacity').notNullable();
    events.integer('list').notNullable().defaultTo(0);
    events.decimal('rating', 2, 1);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
