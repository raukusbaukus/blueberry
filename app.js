const express = require('express'),
    app = express(),
    path = require('path'),
    routes = require('./routes/index');
var config = require('./db/knexfile.js');
var env = 'development';
var knex = require('knex')(config[env]);
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", routes);
// set the view engine to ejs
app.set('view engine', 'ejs');

const arg = process.argv[2] ? Number(process.argv[2]) : 3000;

app.listen(arg, function() {
    console.log('App is listening on port ' + arg);
});

// app.get('/landing', (req, res) => {
//     // var html = new EJS({url: 'index.ejs'}).render();
//     res.render('../views/index.ejs');
//     // knex.select('*').from('events').then((payload) => {
//     //   if (payload.length > 0) {
//     //     res.status(200).send(payload); //JSON.stringify(payload));
//     //   } else {
//     //     res.status(404).send('No events found.');
//     //   }
//     // });
// });
