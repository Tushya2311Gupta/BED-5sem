require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;



// --- Database Connection ---
const connectDB = require('./config/db');

connectDB();


// --- Middleware ---
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// --- Static Files ---
app.use(express.static(path.join(__dirname, 'public')));

// --- View Engine ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Routes ---
const authRoutes = require('./routes/authRoutes');       // you implement
const journalRoutes = require('./routes/journalRoutes'); // provided earlier

app.use('/', authRoutes);     // /login, /register, etc.
app.use('/journal', journalRoutes);

// --- Home Route ---
app.get('/', (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect('/journal');
  }
  res.render('index', { userId: req.session.userId });

});

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// --- Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
