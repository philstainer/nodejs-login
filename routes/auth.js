const express = require('express');
const router = express.Router();

/* GET login page. */
router.get('/login', (req, res, next) => {
  res.render('login.ejs');
});

/* GET signup page. */
router.get('/signup', (req, res, next) => {
  res.render('signup.ejs');
});

router.post('/signup', (req, res, next) => {
  console.log(req.body)
})

module.exports = router;
