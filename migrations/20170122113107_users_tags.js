exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_tags', function(users_tags) {
    users_tags.increments('id');
    users_tags.integer('user').notNullable().references('users.id').onDelete('cascade');
    users_tags.integer('tag').notNullable().references('tags.id').onDelete('cascade');
    users_tags.enu('interest', ['teach', 'learn']).notNullable();
    users_tags.enu('skill_level', ['beginner', 'intermediate', 'advanced']);
    users_tags.unique(['user', 'tag', 'interest']);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_tags');
};
