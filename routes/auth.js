const express = require('express');
const passport = require('passport')

const router = express.Router();

const { signUpSchema } = require('../JoiSchemas')
const JoiValidateMiddleware = require('../middleware/JoiValidateMiddleware')

const LocalSignup = passport.authenticate('local-signup', { session: false })

/* POST signup */
router.post('/signup', JoiValidateMiddleware(signUpSchema), LocalSignup, (req, res) => {

})

module.exports = router;
