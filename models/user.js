const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  email: String,
  hashedPassword: String
})

userSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(9))

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hashedPassword)
}

module.exports = mongoose.model('User', userSchema)