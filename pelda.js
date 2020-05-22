const router = require('express').Router();
const passport = require('passport');

router.route('/pelda').get((req, res) => {
    return res.status(200).send('yepp, this is an example or példa in hungarian :)');
}).post((req, res) => {
    console.log(req.pointless);
    return res.status(200).send(req.pointless);
}).delete((req, res, next) => {
    next();
});

module.exports = router;