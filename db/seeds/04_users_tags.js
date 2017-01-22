exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users_tags').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('users_tags').insert({
                    id: 1,
                    user: 1,
                    tag: 2,
                    interest: 'learn',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 2,
                    user: 2,
                    tag: 2,
                    interest: 'learn',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 3,
                    user: 1,
                    tag: 2,
                    interest: 'teach',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 4,
                    user: 2,
                    tag: 2,
                    interest: 'teach',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 5,
                    user: 4,
                    tag: 2,
                    interest: 'learn',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 6,
                    user: 5,
                    tag: 2,
                    interest: 'learn',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 7,
                    user: 6,
                    tag: 2,
                    interest: 'learn',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 8,
                    user: 7,
                    tag: 1,
                    interest: 'learn',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 9,
                    user: 7,
                    tag: 5,
                    interest: 'learn',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 10,
                    user: 4,
                    tag: 7,
                    interest: 'learn',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 11,
                    user: 4,
                    tag: 6,
                    interest: 'learn',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 12,
                    user: 4,
                    tag: 5,
                    interest: 'learn',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 13,
                    user: 3,
                    tag: 2,
                    interest: 'learn',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 14,
                    user: 3,
                    tag: 1,
                    interest: 'learn',
                    skill_level: 'intermediate'
                }),
                knex('users_tags').insert({
                    id: 15,
                    user: 3,
                    tag: 6,
                    interest: 'learn',
                    skill_level: 'intermediate'
                })
            ]);
        });
};
