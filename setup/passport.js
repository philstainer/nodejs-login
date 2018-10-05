const _ = require('lodash')
const passport = require('passport');
const fs = require('fs')
const path = require('path')

const { Strategy: LocalStrategy } = require('passport-local');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');

const User = require('../models/user')

const publicKey = fs.readFileSync(path.resolve(__dirname, '../jwt-public.key'), 'utf8')

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

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey
}, async (payload, done) => {
  let foundUser;

  try {
    foundUser = await User.findById({ _id: payload.subject })
  } catch (err) {
    return done(err);
  }

  if (!foundUser) { return done(null, false) }

  return done(null, foundUser);
}
));