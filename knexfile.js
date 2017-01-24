require('dotenv').config({
  silent: true
}); //.load()

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
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};

//connection: 'postgres://cesgwooqgbrtfs:3ae12843516085f06a3ffd3d841f7e33ada3d9393d1a95132ca98828cd599b8e@ec2-54-243-197-180.compute-1.amazonaws.com:5432/dcpevkkei4tc4e',
