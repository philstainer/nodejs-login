const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const publicKey = fs.readFileSync(path.resolve(__dirname, '../jwt-public.key'), 'utf8')

const reqAuth = (req, res, next) => {
  let { authorization: token } = req.headers;

  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token.split('bearer ')[1], publicKey);
    req.user = decoded;
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}

module.exports = reqAuth;