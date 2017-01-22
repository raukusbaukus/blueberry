exports.up = function(knex, Promise) {
    return knex.schema.hasTable('users').then(function(exists) {
        if (exists) {
            return knex.schema.dropTable('users');
        }
    });
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
}
