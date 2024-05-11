const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  console.log(username,email,password); 

  const existingUser = await User.findOne({ email });
  
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' , ok : true});
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.status(200).json({ message: 'Login successful' , ok : true});
});

module.exports = router;
