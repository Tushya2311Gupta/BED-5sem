const express = require('express');
const DiaryEntry = require('../models/DiaryEntry');
const router = express.Router();

// Get all diary entries
router.get('/entries', async (req, res) => {
  try {
    const entries = await DiaryEntry.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new diary entry
router.post('/entries', async (req, res) => {
  const { title, content } = req.body;
  const diaryEntry = new DiaryEntry({ title, content });

  try {
    const savedEntry = await diaryEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
