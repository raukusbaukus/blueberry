const env = 'development',
  knex = require('knex'),
  config = require('./db/knexfile'),
  connect = knex(config[env]);

module.exports = {
  get_tags() {
    return connect.select('event', 'tag', 'title')
      .from('events_tags')
      .innerJoin('tags', 'events_tags.tag', 'tags.id')
    connect.destroy();
  },
  get_all_tags() {
    return connect.select('title')
      .from('tags')
    connect.destroy();
  },
  get_events() {
    return connect.select(
        'events.id',
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
      )
      .from('events')
      .innerJoin('users', 'events.user', 'users.id')
      .orderBy('popularity', 'desc')
    connect.destroy();
  }
}
