const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('home.hbs');
});


app.post('/add-user', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.redirect('/');
    }
    
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.redirect('/');
  } catch (error) {
    res.redirect('/');
  }
});


app.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('all-users.hbs', { users });
  } catch (error) {
    res.redirect('/');
  }
});


app.post('/get-user', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (!user) {
      return res.redirect('/');
    }
    
    res.render('user-details.hbs', { user });
  } catch (error) {
    res.redirect('/');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
