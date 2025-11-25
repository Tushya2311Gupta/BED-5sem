// index.js (Main Application File)
require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Database Configuration
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Security Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// View Engine Setup
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('home', { 
    messages: req.query.message ? [req.query.message] : [] 
  });
});

app.post('/add-user', 
  [
    body('name').trim().notEmpty().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect('/?message=Validation failed');
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });
      res.redirect('/?message=User created successfully');
    } catch (error) {
      res.redirect('/?message=Error creating user');
    }
  }
);

app.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({}, 'name email createdAt');
    res.render('all-users', { users });
  } catch (error) {
    res.redirect('/?message=Error fetching users');
  }
});

app.post('/get-user', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.redirect('/?message=Invalid credentials');
    }
    res.render('user-details', { user });
  } catch (error) {
    res.redirect('/?message=Error finding user');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
