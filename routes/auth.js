const express = require('express');
const passport = require('passport')

const router = express.Router();

const AuthController = require('../controllers/AuthController')

const { signUpSchema } = require('../JoiSchemas')
const JoiValidateMiddleware = require('../middleware/JoiValidateMiddleware')

const LocalSignup = passport.authenticate('local-signup', { session: false })

/* POST Passport signup */
router.post('/passportsignup', JoiValidateMiddleware(signUpSchema), LocalSignup, AuthController.passportSignup)

/* POST signup */
router.post('/signup', JoiValidateMiddleware(signUpSchema), AuthController.signup)

/* POST signin */
router.post('/signin', JoiValidateMiddleware(signUpSchema), AuthController.signin)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))

router.get('/google/callback', passport.authenticate('google', { session: false }), AuthController.googleAuth)

module.exports = router;
