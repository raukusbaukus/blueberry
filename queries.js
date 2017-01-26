const env = process.env.NODE_ENV || 'development',
    knex = require('knex'),
    config = require('./knexfile'),
    connect = knex(config[env]);

module.exports = {
    //to connect within any files requiring this 
    connect,
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
                'users.id as user',
                'users.avatar',
                'users.display_name',
                'users.bio',
                'users.rating',
                'users.xp',
                'events.description',
                'events.skill_level',
                'events.capacity'
            )
            .from('events')
            .innerJoin('users', 'events.user', 'users.id')
            .orderBy('list', 'desc')
        connect.destroy();
    },
    find_user(email) {
        return connect.select('*')
            .from('users')
            .where('email', email)
            .limit(1);
    },
    get_event_by_id(id) {
        return connect.select(
                'events.id',
                'events.title',
                'events.venue',
                'events.address',
                'events.area',
                'events.start',
                'events.end',
                'users.id as user',
                'users.avatar',
                'users.display_name',
                'users.bio',
                'users.rating',
                'users.xp',
                'events.description',
                'events.skill_level',
                'events.capacity'
            )
            .from('events')
            .innerJoin('users', 'events.user', 'users.id')
            .where('events.id', id);
        connect.destroy();
    },
    get_users_by_event(event_id) {
        return connect.select(
                'users.id',
                'users.display_name',
                'users.avatar',
                'events_users.role',
                'users.xp',
                'users.rating'
            )
            .from('events_users')
            .innerJoin('users', 'events_users.user', 'users.id')
            .where('events_users.event', event_id);
    },
    get_tags_by_event(event_id) {
        return connect.select(
                'tags.title'
            )
            .from('events_tags')
            .innerJoin('tags', 'events_tags.tag', 'tags.id')
            .where('events_tags.event', event_id)
    }
}
