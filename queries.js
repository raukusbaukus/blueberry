const env = 'development',
    knex = require('knex'),
    config = require('./db/knexfile'),
    connect = knex(config[env]);

  module.exports = {
    get_events() {
      return connect.select(
        'events.title',
        'events.venue',
        'events.address',
        'events.area',
        'events.start',
        'events.end',
        'users.avatar',
        'users.display_name',
        'users.bio',
        'users.rating',
        'users.xp',
        'events.description',
        'events.skill_level'
      ).from('events')
      .innerJoin('users', 'events.user', 'users.id')
      .innerJoin('events_tags', 'events.id', 'events_tags.event')
      .innerJoin('tags', 'events_tags.tag', 'tags.id')
      connect.destroy();
    }
  }
