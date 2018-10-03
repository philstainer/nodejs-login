const Joi = require('joi');

exports.signUpSchema = Joi.object().keys({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required()
});