const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Show all journal entries for logged-in user
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.session.userId }).sort({ createdAt: -1 });

    let editEntry = null;
    if (req.query.edit) {
      editEntry = await JournalEntry.findById(req.query.edit);
      if (!editEntry || editEntry.user.toString() !== req.session.userId) {
        editEntry = null; // prevent unauthorized editing
      }
    }

    // Pass userId to EJS for header partial user session check
    res.render('journal', { entries, editEntry, userId: req.session.userId });
  } catch (err) {
    res.status(500).send('Error loading journal entries');
  }
});

// Show form to create new entry
router.get('/new', isAuthenticated, (req, res) => {
  // Pass userId for consistent UI (even though form is simple)
  res.render('newEntry', { userId: req.session.userId });
});

// Handle new journal entry submission
router.post('/new', isAuthenticated, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newEntry = new JournalEntry({
      user: req.session.userId,
      title,
      content
    });
    await newEntry.save();
    res.redirect('/journal');
  } catch (err) {
    res.status(500).send('Error saving journal entry');
  }
});

// Show form to edit an entry
router.get('/edit/:id', isAuthenticated, async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry || entry.user.toString() !== req.session.userId) {
      return res.status(403).send('Access denied');
    }
    res.render('editEntry', { entry, userId: req.session.userId });
  } catch (err) {
    res.status(500).send('Error loading entry');
  }
});

// Handle edit form submission
router.post('/edit/:id', isAuthenticated, async (req, res) => {
  const { title, content } = req.body;
  try {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry || entry.user.toString() !== req.session.userId) {
      return res.status(403).send('Access denied');
    }
    entry.title = title;
    entry.content = content;
    await entry.save();
    res.redirect('/journal');
  } catch (err) {
    res.status(500).send('Error updating entry');
  }
});

// Delete an entry
router.post('/delete/:id', isAuthenticated, async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry || entry.user.toString() !== req.session.userId) {
      return res.status(403).send('Access denied');
    }
    await JournalEntry.deleteOne({ _id: req.params.id });
    res.redirect('/journal');
  } catch (err) {
    res.status(500).send('Error deleting entry');
  }
});

module.exports = router;
