const User = require('../models/user')

module.exports = {
  passportSignup: (req, res) => {
    const token = req.user.generateAuthToken()

    res.json({ token })
  },
  signup: async (req, res) => {
    let foundUser;
    const { email, password } = req.body;

    try {
      foundUser = await User.findOne({ email })
    } catch (err) {
      return done(err);
    }

    if (foundUser) return res.status(400).json({ message: 'Email already in use' })

    let newUser = new User({ email })
    newUser.hashedPassword = newUser.generateHash(password)
    await newUser.save()

    const token = newUser.generateAuthToken()

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
  },
  googleAuth: async (req, res) => {
    const token = req.user.generateAuthToken()

    res.json({ token })
  }
}