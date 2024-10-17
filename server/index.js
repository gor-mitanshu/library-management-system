const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const libraryRoutes = require('./routes/libraryRoutes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
     .then(() => console.log('Connected to MongoDB'))
     .catch((err) => console.log('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});

// Default route
app.get('/', (req, res) => {
     res.send('Welcome to the Library API');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/library', libraryRoutes); 