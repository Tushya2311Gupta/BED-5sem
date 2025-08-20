// scripts/migrateEntries.js
const fs = require('fs');
const mongoose = require('mongoose');
const DiaryEntry = require('../models/DiaryEntry'); // Adjust the path if necessary
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const migrateEntries = async () => {
  await connectDB();
  const entries = JSON.parse(fs.readFileSync('entries.json', 'utf-8'));
  await DiaryEntry.insertMany(entries);
  console.log('Diary entries migrated to MongoDB');
  mongoose.connection.close();
};

migrateEntries();
