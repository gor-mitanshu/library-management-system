const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const authMiddleware = require('../middleware/authMiddleware');

// Helper function to omit sensitive data
const omitPassword = (user) => {
     const { password, ...userWithoutPassword } = user._doc;
     return userWithoutPassword;
};

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
          const userResponse = omitPassword(newUser);
          res.status(201).send({ success: true, message: 'User registered successfully', user: userResponse });
     } catch (error) {
          console.error(error);
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

          // Generate JWT token
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

          res.status(200).send({ success: true, message: 'Login successful', token });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error during login', error });
     }
});

// Get User Profile (Protected)
router.get('/profile', authMiddleware, async (req, res) => {
     try {
          const user = await User.findById(req.user);
          if (!user) {
               return res.status(404).send({ success: false, message: 'User not found!' });
          }
          const userResponse = omitPassword(user);
          res.status(200).send({ success: true, user: userResponse });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error retrieving profile', error });
     }
});

// 2. POST: Create User Profile (This is typically handled during registration)
// For the sake of clarity, we'll assume profile creation happens during registration.

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
          const userResponse = omitPassword(newUser);
          res.status(201).send({ success: true, message: 'User registered successfully', user: userResponse });
     } catch (error) {
          console.error(error);
          res.status(500).send({ success: false, message: 'Error in registration', error });
     }
});

// 3. PUT: Update User Profile (Protected)
router.put('/update-profile', authMiddleware, async (req, res) => {
     try {
          const { name, email, phone, password } = req.body;

          // Fetch the user by ID (from the token)
          const user = await User.findById(req.user);
          if (!user) {
               return res.status(404).send({ success: false, message: 'User not found!' });
          }

          // Update profile fields if provided
          user.name = name || user.name;
          user.email = email || user.email;
          user.phone = phone || user.phone;

          // If password is provided, hash it and update
          if (password) {
               user.password = await bcrypt.hash(password, 10);
          }

          await user.save();
          const userResponse = omitPassword(user);

          res.status(200).send({ success: true, message: 'Profile updated successfully', user: userResponse });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error updating profile', error });
     }
});

module.exports = router;