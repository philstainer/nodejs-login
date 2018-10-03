const User = require('../models/user')

module.exports = {
  signup: (req, res) => {
    const token = req.user.generateAuthToken()

    res.json({ token })
  },
  signin: async (req, res) => {
    const { email, password } = req.body;

    let foundUser;

    try {
      foundUser = await User.findOne({ email })
    } catch (err) {
      return res.status(400).json({ message: 'Invalid password or email' })
    }

    if (!foundUser || !foundUser.validPassword(password)) return res.status(400).json({ message: 'Invalid password or email' })

    const token = foundUser.generateAuthToken()

    res.json({ token })
  }
}