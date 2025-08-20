// routes/authRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Login route
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email address.'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Handle login logic here
  res.send('Login successful');
});

// Register route
router.post('/register', [
  body('email').isEmail().withMessage('Please enter a valid email address.'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Handle registration logic here
  res.send('Registration successful');
});

module.exports = router;
