const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
     title: { type: String, required: true },
     author: { type: String, required: true },
     genre: { type: String, required: true },
     publishedDate: { type: Date, required: true },
     available: { type: Boolean, default: true },
     createdAt: { type: Date, default: Date.now },
     updatedAt: { type: Date, default: Date.now }
});

bookSchema.pre('save', function (next) {
     this.updatedAt = new Date();
     next();
});

module.exports = mongoose.model('Book', bookSchema);
