const winston = require('winston');
const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => winston.info(`Connected to ${process.env.MONGO_URL}...`));
}