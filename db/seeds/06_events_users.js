
exports.seed = function(knex, Promise) {
  return knex('events_users').del()
    .then(function () {
      return Promise.all([
        knex('events_users').insert({
          id: 1,
          'event': 1,
          user: 2,
          role: 'student',
          rating: 3,
          review: 'Meh. It was ok.'
        }),
        knex('events_users').insert({
          id: 2,
          'event': 3,
          user: 2,
          role: 'student'
        }),
        knex('events_users').insert({
          id: 3,
          'event': 1,
          user: 4,
          role: 'student'
        }),
        knex('events_users').insert({
          id: 4,
          'event': 3,
          user: 4,
          role: 'teacher'
        }),
        knex('events_users').insert({
          id: 5,
          'event': 1,
          user: 1,
          role: 'student'
        }),
        knex('events_users').insert({
          id: 6,
          'event': 3,
          user: 1,
          role: 'student'
        }),
        knex('events_users').insert({
          id: 7,
          'event': 5,
          user: 5,
          role: 'student'
        }),
        knex('events_users').insert({
          id: 8,
          'event': 5,
          user: 6,
          role: 'student'
        }),
        knex('events_users').insert({
          id: 9,
          'event': 6,
          user: 5,
          role: 'student'
        }),
        knex('events_users').insert({
          id: 10,
          'event': 5,
          user: 7,
          role: 'student'
        }),
        knex('events_users').insert({
          id: 11,
          'event': 7,
          user: 7,
          role: 'student'
        }),
        knex('events_users').insert({
          id: 12,
          'event': 7,
          user: 5,
          role: 'student'
        }),
        knex('events_users').insert({
          id: 13,
          'event': 7,
          user: 6,
          role: 'student'
        }),
        knex('events_users').insert({
          id: 14,
          'event': 6,
          user: 6,
          role: 'student'
        }),
        knex('events_users').insert({
          id: 15,
          'event': 6,
          user: 7,
          role: 'student'
        })
      ]);
    });
};
