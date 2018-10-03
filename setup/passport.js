const _ = require('lodash')
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/user')

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  let foundUser;

  try {
    foundUser = await User.findOne({ email })
  } catch (err) {
    return done(err);
  }

  if (foundUser) { return done(null, false, 'That email is already taken'); }

  let newUser = new User({ email })
  newUser.hashedPassword = newUser.generateHash(password)
  await newUser.save()

  return done(null, newUser);
}
));