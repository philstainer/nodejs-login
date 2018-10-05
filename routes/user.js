const express = require('express');
const router = express.Router();

const passport = require('passport')
const reqAuth = require('../middleware/reqAuth')

const passportjwtAuth = passport.authenticate('jwt', { session: false })

/* GET Secret info. */
router.get('/secret', passportjwtAuth, (req, res, next) => {
  res.send('Success')
});

/* GET Secret info. */
router.get('/anothersecret', reqAuth, (req, res, next) => {
  res.send('Success')
});

module.exports = router;
