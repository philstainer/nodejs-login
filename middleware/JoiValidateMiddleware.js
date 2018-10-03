const Joi = require('joi');

const JoiSchemaValidate = schema => (req, res, next) => {
  const { error } = Joi.validate(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);

  next()
}

module.exports = JoiSchemaValidate