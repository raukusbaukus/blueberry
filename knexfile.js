require('dotenv').config({
  silent: true
});

module.exports = {

  development: {
    client: 'pg', //do pg later
    connection: {
      database: 'blueberry'
      //later
      // host: process.env.HOST,
      // user: process.env.USER,
      // password: process.env.PASSWORD,
      // database: process.env.DATABASE
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};
