const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register page
router.get('/register', (req, res) => {
  res.render('register', { userId: req.session.userId || null });
});


// Register POST
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.send('Username already exists');

    const newUser = new User({ username, password });
    await newUser.save();

    req.session.userId = newUser._id;
    res.redirect('/journal');
  } catch (err) {
    res.status(500).send('Registration Error');
  }
});

// Login page
router.get('/login', (req, res) => {
  res.render('login', { userId: req.session.userId || null });
});


// Login POST
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.send('Invalid credentials');
    }

    req.session.userId = user._id;
    res.redirect('/journal');
  } catch (err) {
    res.status(500).send('Login Error');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
