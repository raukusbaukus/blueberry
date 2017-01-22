exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('events_tags').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('events_tags').insert({
                    event: 2,
                    tag: 2;
                }),
                knex('events_tags').insert({
                    event: 2,
                    tag: 3;
                }),
                knex('events_tags').insert({
                    event: 2,
                    tag: 4;
                }),
                knex('events_tags').insert({
                    event: 3,
                    tag: 3;
                }),
                knex('events_tags').insert({
                    event: 3,
                    tag: 1;
                }),
                knex('events_tags').insert({
                    event: 3,
                    tag: 5;
                }),
                knex('events_tags').insert({
                    event: 1,
                    tag: 3;
                }),
                knex('events_tags').insert({
                    event: 3,
                    tag: 6;
                })
            ]);
        });
};
