const express = require('express');
const Joi = require('joi');
const _ = require('lodash');

const User = require('../models/user.js')

const router = express.Router();

/* POST signup */
router.post('/signup', async (req, res, next) => {
  const { error } = validate(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);

  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) return res.status(400).send('Invalid email or password.');

  let newUser = new User(_.pick(req.body, ['email', 'password']))
  newUser.password = newUser.generateHash(newUser.password)
  await newUser.save()

  res.send(newUser)
})

const schema = Joi.object().keys({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required()
});

const validate = (object, schema) => Joi.validate(object, schema);

module.exports = router;
