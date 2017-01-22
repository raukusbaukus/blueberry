exports.up = function(knex, Promise) {
    return knex.schema.createTable('events_tags', function(events_tags) {
        events_tags.integer('event').references('events.id').notNullable();
        events_tags.integer('tag').references('tags.id').notNullable();
        events_tags.primary(['event', 'tag']);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('events_tags');
};
