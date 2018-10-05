const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const fs = require('fs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  email: String,
  hashedPassword: String,
  google_id: String,
  google_token: String
})

userSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(9))

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hashedPassword)
}

userSchema.methods.generateAuthToken = function () {
  const payload = { subject: this._id }
  const privateKey = fs.readFileSync('./jwt-private.key', 'utf8')
  const options = { issuer: 'nodejs-login', expiresIn: "30d", algorithm: "RS256" }

  return jwt.sign(payload, privateKey, options);
}

module.exports = mongoose.model('User', userSchema)