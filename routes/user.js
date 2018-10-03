const express = require('express');
const router = express.Router();

const passport = require('passport')

const jwtAuth = passport.authenticate('jwt', { session: false })

/* GET Secret info. */
router.get('/secret', jwtAuth, (req, res, next) => {
  res.send('This route requires a valid JWT Token')
});

module.exports = router;
