const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/AuthSchema');

// User Registration
router.post('/register', async (req, res) => {
     try {
          const { name, email, phone, password } = req.body;

          const existingUser = await User.findOne({ email });
          if (existingUser) {
               return res.status(409).send({ success: false, message: 'User already registered!' });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = new User({
               name,
               email,
               phone,
               password: hashedPassword
          });

          await newUser.save();
          res.status(201).send({ success: true, message: 'User registered successfully', user: newUser });
     } catch (error) {
          console.log(error);
          res.status(500).send({ success: false, message: 'Error in registration', error });
     }
});

// User Login
router.post('/login', async (req, res) => {
     try {
          const { email, password } = req.body;

          const user = await User.findOne({ email });
          if (!user) {
               return res.status(400).send({ success: false, message: 'Email not registered!' });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
               return res.status(401).send({ success: false, message: 'Invalid password!' });
          }

          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.status(200).send({ success: true, message: 'Login successful', token });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error during login', error });
     }
});

module.exports = router;