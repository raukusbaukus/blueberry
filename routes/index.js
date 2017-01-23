
const express = require('express'),
    router = express.Router(),
    knex = require('knex'),
    connect = knex(require('../db/knexfile')[process.env.NODE_ENV]);

router.get('/', (req, res, next) => {
    return connect.select('*').then(values => {
        console.log(values)
    }).catch(err => {
        console.error(err)
    }).finally(() => {
      connect.destroy();
    });
});
