const express = require('express');
const passport = require('passport');
const user = require('../routes/user');
const auth = require('../routes/auth');
const error = require('../middleware/error')

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(passport.initialize())

  app.use('/api/user', user);
  app.use('/api/auth', auth);

  app.use(error);
}