require('dotenv').load();

module.exports = {

    development: {
        client: 'postgresql', //do pg later
        connection: {
          database: 'blueberry'
          //later
            // host: process.env.HOST,
            // user: process.env.USER,
            // password: process.env.PASSWORD,
            // database: process.env.DATABASE
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
