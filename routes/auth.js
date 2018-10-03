const express = require('express');
const passport = require('passport')

const router = express.Router();

const AuthController = require('../controllers/AuthController')
const { signUpSchema } = require('../JoiSchemas')
const JoiValidateMiddleware = require('../middleware/JoiValidateMiddleware')

const LocalSignup = passport.authenticate('local-signup', { session: false })

/* POST signup */
router.post('/signup', JoiValidateMiddleware(signUpSchema), LocalSignup, AuthController.signup)

/* POST signin */
router.post('/signin', JoiValidateMiddleware(signUpSchema), AuthController.signin)

module.exports = router;
