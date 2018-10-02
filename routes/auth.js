const express = require('express');
const Joi = require('joi');

const router = express.Router();

/* GET login page. */
router.get('/login', (req, res, next) => {
  res.render('login.ejs');
});

/* GET signup page. */
router.get('/signup', (req, res, next) => {
  res.render('signup.ejs');
});

router.post('/signup', (req, res, next) => {
  const { error } = validate(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);

  res.send(req.body)
})

const schema = {
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required()
};

const validate = (object, schema) => Joi.validate(object, schema);

module.exports = router;
