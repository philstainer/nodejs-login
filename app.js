const winston = require('winston');
const express = require('express');
const app = express();

// Logging and dotenv setup
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  app.use(require('morgan')('dev'));
}

require('./setup/logging')()
require('./setup/routes')(app);
require('./setup/db')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}`));

module.exports = server;