const env = 'development',
    knex = require('knex'),
    config = require('./db/knexfile'),
    connect = knex(config[env]);

  module.exports = {
    get_events() {
      return connect.select('*').from('events');
      connect.destroy();
    }
  }
