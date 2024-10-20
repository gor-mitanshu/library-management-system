const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     firstName: { type: String, required: true },
     lastName: { type: String, required: true },
     name: { type: String },
     email: { type: String, required: true, unique: true },
     phone: { type: String, required: true },
     password: { type: String, required: true },
     address: { type: String, required: true },
     gender: { type: String, required: true },
     dob: { type: Date, required: true },
     image: { type: String },
     role: { type: String }
});

const User = mongoose.model('User', userSchema);
module.exports = User;