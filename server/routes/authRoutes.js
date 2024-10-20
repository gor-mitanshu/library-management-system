const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Set up Multer for image uploads
const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          const imagesFolder = path.join(__dirname, '..', 'images');
          if (!fs.existsSync(imagesFolder)) {
               fs.mkdirSync(imagesFolder);
          }
          cb(null, imagesFolder);
     },
     filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname));
     }
});
const upload = multer({ storage });

// Helper function to omit sensitive data
const omitPassword = (user) => {
     const { password, ...userWithoutPassword } = user._doc;
     return userWithoutPassword;
};

// User Registration with backend validation
router.post('/register', upload.single('image'), async (req, res) => {
     try {
          const { firstName, lastName, email, phone, password, address, gender, dob } = req.body;

          // Basic validation for missing fields
          if (!firstName || !lastName || !email || !phone || !password || !address || !gender || !dob) {
               return res.status(400).send({ success: false, message: 'All fields are required' });
          }

          // Email format validation
          const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
          if (!emailRegex.test(email)) {
               return res.status(400).send({ success: false, message: 'Invalid email format' });
          }

          const nameRegex = /^[a-zA-Z ]{2,30}$/;
          if (!nameRegex.test(firstName)) {
               return res.status(400).send({ success: false, message: 'Invalid name format' });
          }

          // Phone number format validation
          const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
          if (!phoneRegex.test(phone)) {
               return res.status(400).send({ success: false, message: 'Invalid phone number format' });
          }

          // Password strength validation
          if (password.length < 6) {
               return res.status(400).send({ success: false, message: 'Password must be at least 6 characters long' });
          }

          // Check if the user already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
               return res.status(409).send({ success: false, message: 'User already registered!' });
          }

          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Create new user
          const newUser = new User({
               firstName,
               lastName,
               name: `${firstName} ${lastName}`,
               email,
               phone,
               password: hashedPassword,
               address,
               gender,
               dob,
               image: req.file ? req.file.path : null
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

// Get User Profile by ID (Protected)
router.get('/profile/:id', authMiddleware, async (req, res) => {
     try {
          const userId = req.params.id;
          const user = await User.findById(userId);
          if (!user) {
               return res.status(404).send({ success: false, message: 'User not found!' });
          }
          const userResponse = omitPassword(user);
          res.status(200).send({ success: true, user: userResponse });
     } catch (error) {
          console.error(error);
          res.status(500).send({ success: false, message: 'Error retrieving profile', error });
     }
});

// Update User Profile by ID (Protected)
router.put('/update-profile/:id', authMiddleware, upload.single('image'), async (req, res) => {
     try {
          const userId = req.params.id;
          const { firstName, lastName, email, phone, password, address, gender, dob } = req.body;

          // Check if all required fields except password are provided
          if (!firstName || !lastName || !email || !phone || !address || !gender || !dob) {
               return res.status(400).send({ success: false, message: 'All fields except password are required' });
          }

          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
               return res.status(400).send({ success: false, message: 'Invalid email format' });
          }

          // Validate phone format
          const phoneRegex = /^[0-9]{10}$/;
          if (!phoneRegex.test(phone)) {
               return res.status(400).send({ success: false, message: 'Invalid phone number format' });
          }

          // Fetch user by ID
          const user = await User.findById(userId);
          if (!user) {
               return res.status(404).send({ success: false, message: 'User not found!' });
          }

          // Update fields
          user.firstName = firstName;
          user.lastName = lastName;
          user.email = email;
          user.name = `${firstName} ${lastName}`;
          user.phone = phone;
          user.address = address;
          user.gender = gender;
          user.dob = dob;

          // Check if an image is uploaded and ensure the images folder exists
          if (req.file) {
               const imagesFolder = path.join(__dirname, '..', 'images');
               if (!fs.existsSync(imagesFolder)) {
                    fs.mkdirSync(imagesFolder);
               }

               user.image = req.file.path;
          }

          // Update the password only if it is provided
          if (password) {
               if (password.length < 6) {
                    return res.status(400).send({ success: false, message: 'Password must be at least 6 characters long' });
               }
               user.password = await bcrypt.hash(password, 10);
          }

          await user.save();
          const userResponse = omitPassword(user);
          res.status(200).send({ success: true, message: 'Profile updated successfully', user: userResponse });
     } catch (error) {
          console.error(error);
          res.status(500).send({ success: false, message: 'Error updating profile', error });
     }
});

// Delete User Profile by ID (Protected)
router.delete('/delete-profile/:id', authMiddleware, async (req, res) => {
     try {
          const userId = req.params.id;
          await User.findByIdAndDelete(userId);
          res.status(200).send({ success: true, message: 'Profile deleted successfully' });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error deleting profile', error });
     }
});

module.exports = router;