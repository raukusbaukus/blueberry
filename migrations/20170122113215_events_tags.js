exports.up = function(knex, Promise) {
    return knex.schema.createTable('events_tags', function(events_tags) {
        events_tags.integer('event').notNullable().references('events.id').onDelete('cascade');
        events_tags.integer('tag').notNullable().references('tags.id').onDelete('cascade');
        events_tags.primary(['event', 'tag']);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('events_tags');
};
