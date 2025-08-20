const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Mount authRoutes at root so that /login and /register are accessible directly
app.use('/', authRoutes);

// Mount journalRoutes (example: /journal)
app.use('/journal', journalRoutes);

// Handle undefined routes with 404 response
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

