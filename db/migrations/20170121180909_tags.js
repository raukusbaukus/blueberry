exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(tags) {
    tags.increments('id');
    tags.string('title', 255);
    tags.integer('popularity').notNullable().defaultTo(0);
    tags.integer('user');
    tags.foreign('user').references('users.id').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};
