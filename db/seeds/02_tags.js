exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('tags').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('tags').insert({
                    id: 1,
                    title: 'JavaScript',
                    popularity: 0,
                    user: 1
                }),
                knex('tags').insert({
                    id: 2,
                    title: 'PHP',
                    popularity: 0,
                    user: 2
                }),
                knex('tags').insert({
                    id: 3,
                    title: 'Loops',
                    popularity: 0,
                    user: 2
                }),
                knex('tags').insert({
                    id: 4,
                    title: 'Python',
                    popularity: 0,
                    user: 3
                }),
                knex('tags').insert({
                    id: 5,
                    title: 'NodeJS',
                    popularity: 0,
                    user: 3
                }),
                knex('tags').insert({
                    id: 6,
                    title: 'Object Oriented Programming',
                    popularity: 0,
                    user: 1
                }),
                knex('tags').insert({
                    id: 7,
                    title: 'Ruby',
                    popularity: 0,
                    user: 1
                })
            ]);
        });
};
