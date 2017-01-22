
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events_users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
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
          'event': 2,
          user: 1,
          role: 'student'
        })
      ]);
    });
};
