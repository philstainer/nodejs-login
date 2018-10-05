const _ = require('lodash')
const passport = require('passport');
const fs = require('fs')
const path = require('path')

const { Strategy: LocalStrategy } = require('passport-local');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const { OAuth2Strategy: GooglePlusStrategy } = require('passport-google-oauth');

const User = require('../models/user')

const publicKey = fs.readFileSync(path.resolve(__dirname, '../jwt-public.key'), 'utf8')

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  let foundUser;

  try {
    foundUser = await User.findOne({ email })

    if (foundUser) { return done(null, false, 'That email is already taken'); }

    let newUser = new User({ email })
    newUser.hashedPassword = newUser.generateHash(password)
    await newUser.save()

    return done(null, newUser);
  } catch (err) {
    return done(err);
  }

}
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey
}, async (payload, done) => {
  let foundUser;

  try {
    foundUser = await User.findById({ _id: payload.subject })
    if (!foundUser) { return done(null, false) }

    return done(null, foundUser);
  } catch (err) {
    return done(err);
  }

}
));

passport.use(new GooglePlusStrategy({
  clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  let foundUser;

  try {
    foundUser = await User.findOne({ 'google_id': profile.id })

    if (foundUser) return done(null, foundUser)

    let newUser = new User({
      email: profile.emails[0].value,
      google_id: profile.id,
      google_token: accessToken
    })

    await newUser.save()

    done(null, newUser);

  } catch (err) {
    return done(err);
  }
}
));