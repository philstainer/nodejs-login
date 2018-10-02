const winston = require('winston');
require('express-async-errors');

const customFormat = winston.format.printf(info => {
  return `${info.timestamp} - ${info.level}: ${info.message}`;
});

module.exports = () => {
  winston.configure({
    format: winston.format.combine(
      winston.format.timestamp(),
      customFormat
    ),
    transports: [
      new winston.transports.File({ filename: './logs/combined.log', level: 'info' })
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: './logs/exceptions.log' })
    ]
  });

  if (process.env.NODE_ENV !== 'production') {
    winston.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        customFormat
      )
    }));
  }
}