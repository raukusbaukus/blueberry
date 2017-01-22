exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('events').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('events').insert({
                    id: 1,
                    title: 'Node',
                    user: 1,
                    start: '2017-01-28 1200:00',
                    end: '2017-01-28 13:00:00',
                    description: 'The awesomest event ever',
                    skill_level: 'beginner',
                    capacity: 50
                }),
                knex('events').insert({
                    id: 2,
                    title: 'JavaScript',
                    user: 1,
                    start: '2017-01-28 12:00:00',
                    end: '2017-01-28 13:00:00',
                    description: 'The awesomest event ever',
                    skill_level: 'beginner',
                    capacity: 50
                }),
                knex('events').insert({
                    id: 3,
                    title: 'NPM',
                    user: 1,
                    start: '2017-01-28 12:00:00',
                    end: '2017-01-28 13:00:00',
                    description: 'The awesomest event ever',
                    skill_level: 'beginner',
                    capacity: 50
                })
            ]);
        });
};
