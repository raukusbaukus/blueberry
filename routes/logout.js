const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.render('error', {
                err
            });
        } else {
            res.redirect('/');
        }
    })
});

module.exports = router;
