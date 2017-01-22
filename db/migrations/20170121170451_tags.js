exports.up = function(knex, Promise) {
    return knex.schema.hasTable('tags').then(function(exists) {
        if (exists) {
            return knex.schema.dropTable('tags');
        }
    });
}
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tags');
}
