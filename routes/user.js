const express = require('express');
const router = express.Router();

const passport = require('passport')

const jwtAuth = passport.authenticate('jwt', { session: false })

/* GET Secret info. */
router.get('/secret', jwtAuth, (req, res, next) => {
  res.send('Success')
});

module.exports = router;
