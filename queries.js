const env = process.env.NODE_ENV || 'development',
    knex = require('knex'),
    config = require('./knexfile'),
    connect = knex(config[env]);

module.exports = {
    find_user(email) {
        return connect.select('*')
            .from('users')
            .where('email', email)
            .limit(1);
    },
    create_user(data) {
        return connect.insert(data)
            .into('users')
            .returning('*')
    },
    create_tag(title, user) {
        return connect.insert({
                title,
                user
            })
            .into('tags')
            .returning('id')
    },
    add_tag_to_user(tag, user) {
        return connect.insert({
                tag,
                user,
                interest: 'learn'
            })
            .into('users_tags')
            .returning('title')
    },
    check_tag(tag_name) {
        return connect.select('title', 'id')
            .from('tags')
            .where('title', tag_name)
    },
    get_tags() {
        return connect.select('event', 'tag', 'title')
            .from('events_tags')
            .innerJoin('tags', 'events_tags.tag', 'tags.id')
    },
    get_all_tags() {
        return connect.select('title')
            .from('tags')
    },
    get_tags_ids_by_tags_titles(tags) {
        return connect.select('id')
            .from('tags')
            .whereIn('title', tags)
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
    },
    create_event(event) {
        event.start = event.date + " " + event.start;
        event.end = event.date + " " + event.end;
        // Create Date Start And End Handling Here
        // start and end are datetime data types
        // example: '2017-01-29 18:00:00'
        return connect.insert({
                'title': event.event_title,
                'venue': event.venue,
                'address': event.address,
                'area': event.area,
                'start': event.start,
                'end': event.end,
                'description': event.description,
                'skill_level': event.skill,
                'capacity': Number(event.capacity),
                'user': Number(event.user)
            })
            .into('events')
            .returning('id')
    },
    add_tags_to_event(tags, event) {
        //takes and array of tag IDs and an event ID makes it an array of tagID/eventID objects
        let event_tags = [];
        tags.forEach(tag => {
            event_tags.push({
                event: Number(event),
                tag: Number(tag)
            })
        });
        //inserts each object in the events_tags table
        return connect.insert(event_tags)
            .into('events_tags')
    },
    delete_event(event) {
        return connect.del(event)
            .where(event.title, event) //doubts about this
            .then((deleted) => {
                console.log(deleted);
            }).catch(err => {
                console.error(err)
                // res.status(500).send(err);
            }).finally(() => {
                connect.destroy();
            });
    },
    update_event(event) {
        return connect.update(event)
            .where(events, event)
            .then((updated) => {
                console.log(updated);
            }).catch(err => {
                console.error(err)
                // res.status(500).send(err);
            }).finally(() => {
                connect.destroy();
            });
    },
    end_connection() {
        connect.destroy();
    }
}
