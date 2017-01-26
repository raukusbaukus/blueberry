const env = process.env.NODE_ENV || 'development',
    knex = require('knex'),
    config = require('./knexfile'),
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
        return connect.select('id','title')
            .from('events')
            .where('id', id);
        connect.destroy();  
    },
    get_tags_by_event() {
        return connect.select('title')
            .from('tags')
            .innerJoin('tags', 'events_tags.tag', 'tags.id')
         connect.destroy();   
    },
    create_event(event) {
        return connect.insert(event)
            .into(events)
            .then((new_event) => {
                console.log(new_event);
            });
            .finally(() => {
                knex.destroy();
            });
    },
    delete_event(event) {
        return connect.del(event)
            .where(event.title, event)//doubts about this
            .then((deleted) => {
                console.log(deleted);
            }).finally(() => {
                knex.destroy();
            });     
    },
    update_event(event) {
        return connect.update(event)
            .where(events, event)
            .then((updated) => {
                console.log(updated);
            }).finally(() => {
              knex.destroy();         
            });  
    }
    
}







