exports.seed = function(knex, Promise) {
    return knex('events').del()
        .then(function() {
            return Promise.all([
                knex('events').insert({
                    id: 1,
                    title: 'Node',
                    user: 1,
                    address: '1644 Platte St',
                    venue: 'Galvanize',
                    area: 'Denver, CO',
                    start: '2017-01-28 12:00:00',
                    end: '2017-01-28 13:00:00',
                    description: 'The awesomest event ever',
                    skill_level: 'advanced',
                    capacity: 50
                }),
                knex('events').insert({
                    id: 2,
                    title: 'Flamenco Guitar',
                    user: 2,
                    address: 'facebook.com',
                    area: 'online',
                    start: '2017-01-27 12:00:00',
                    end: '2017-01-27 13:00:00',
                    description: 'The traditional flamenco guitar is made of Spanish cypress, sycamore, or rosewood for the back and sides, and spruce for the top. This (in the case of cypress and sycamore) accounts for its characteristic body color. Flamenco guitars are built lighter with thinner tops than classical guitars, which produces a “brighter” and more percussive sound quality. Builders also use less internal bracing to keep the top more percussively resonant. The top is typically made of either spruce or cedar, though other tone woods are used today. Volume has traditionally been very important for flamenco guitarists, as they must be heard over the sound of the dancers’ nailed shoes. To increase volume, harder woods, such as rosewood, can be used for the back and sides, with softer woods for the top.',
                    skill_level: 'beginner',
                    capacity: 50
                }),
                knex('events').insert({
                    id: 3,
                    title: 'PHP',
                    user: 3,
                    address: '1644 Platte St',
                    venue: 'Galvanize',
                    area: 'Denver, CO',
                    start: '2017-01-28 15:00:00',
                    end: '2017-01-28 16:00:00',
                    description: 'The awesomest event ever',
                    skill_level: 'beginner',
                    capacity: 2
                }),
                knex('events').insert({
                    id: 4,
                    title: 'Loops',
                    user: 4,
                    address: '1644 Platte St',
                    venue: 'Galvanize',
                    area: 'Denver, CO',
                    start: '2017-01-29 12:00:00',
                    end: '2017-01-29 13:00:00',
                    description: 'The awesomest event ever',
                    skill_level: 'beginner',
                    capacity: 50
                }),
                knex('events').insert({
                    id: 5,
                    title: 'Lessons in Object Oriented Programming',
                    user: 1,
                    address: '1644 Platte St',
                    venue: 'Galvanize',
                    area: 'Denver, CO',
                    start: '2017-01-25 18:30:00',
                    end: '2017-01-25 20:00:00',
                    description: 'The awesomest event ever',
                    skill_level: 'intermediate',
                    capacity: 50
                }),
                knex('events').insert({
                    id: 6,
                    title: 'Intro to React and Redux',
                    user: 1,
                    address: '1644 Platte St',
                    venue: 'Galvanize',
                    area: 'Denver, CO',
                    start: '2017-01-28 12:00:00',
                    end: '2017-01-28 13:00:00',
                    description: 'The awesomest event ever',
                    skill_level: 'beginner',
                    capacity: 50
                }),
                knex('events').insert({
                    id: 7,
                    title: 'NPM',
                    user: 4,
                    address: '1644 Platte St',
                    venue: 'Galvanize',
                    area: 'Denver, CO',
                    start: '2017-01-28 12:00:00',
                    end: '2017-01-28 13:00:00',
                    description: 'The awesomest event ever',
                    skill_level: 'beginner',
                    capacity: 50
                })
            ]);
        });
};
