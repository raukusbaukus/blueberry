exports.seed = function(knex, Promise) {
    return knex('users').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('users').insert({
                    id: 1,
                    display_name: 'Juan Ignacio',
                    bio: 'I am an afficianado of eveything. I know a lot about a ton. Let me teach you something!',
                    email: 'jiverni@gmail.com',
                    password: 'swordfish',
                    location: 'Denver, CO',
                    remote_irl: 'both',
                    phone: '(303) 717-6970',
                    notifications: 'both',
                    avatar: '/img/users/1/juan_ignacio_verni.jpg'
                }),
                knex('users').insert({
                    id: 2,
                    display_name: 'Mohamed Abdulsalam',
                    bio: 'I am an afficianado of eveything. I know a lot about a ton. Let me teach you something!',
                    email: 'm.salam2016@outlook.com',
                    password: 'swordfish',
                    location: 'Denver, CO',
                    remote_irl: 'both',
                    phone: '(720)256.1016',
                    notifications: 'email',
                    avatar: '/img/users/2/mohamed_abdulsalam.jpg'
                }),
                knex('users').insert({
                    id: 3,
                    display_name: 'Ben Matson',
                    bio: 'I am an afficianado of eveything. I know a lot about a ton. Let me teach you something!',
                    email: 'benjaminmatson@gmail.com',
                    password: 'swordfish',
                    location: 'Denver, CO',
                    remote_irl: 'both',
                    phone: '9703010588',
                    notifications: 'phone',
                    avatar: '/img/users/3/benjamin_matson.jpg'
                }),
                knex('users').insert({
                    id: 4,
                    display_name: 'Patrick Rauls',
                    bio: 'I am an afficianado of eveything. I know a lot about a ton. Let me teach you something!',
                    email: 'patrauls@gmail.com',
                    password: 'swordfish',
                    location: 'Denver, CO',
                    remote_irl: 'both',
                    phone: '706-631-9370',
                    avatar: '/img/users/4/patrick_rauls.jpg'
                }),
                knex('users').insert({
                    id: 5,
                    display_name: 'Sarah D Healey',
                    bio: 'I am an afficianado of eveything. I know a lot about a ton. Let me teach you something!',
                    email: 'p@ruumy.co',
                    password: 'swordfish',
                    location: 'Denver, CO',
                    remote_irl: 'both',
                    phone: '706-631-9370'
                }),
                knex('users').insert({
                    id: 6,
                    display_name: 'Charity Rauls',
                    bio: 'I am an afficianado of eveything. I know a lot about a ton. Let me teach you something!',
                    email: 'p@desdev.co',
                    password: 'swordfish',
                    location: 'Denver, CO',
                    remote_irl: 'both',
                    phone: '706-631-9370'
                }),
                knex('users').insert({
                    id: 7,
                    display_name: 'Nmuta Jones',
                    bio: 'I am an afficianado of eveything. I know a lot about a ton. Let me teach you something!',
                    email: 'support@ruumy.co',
                    password: 'swordfish',
                    location: 'Denver, CO',
                    remote_irl: 'both',
                    phone: '706-631-9370'
                })
            ]);
        });
};
