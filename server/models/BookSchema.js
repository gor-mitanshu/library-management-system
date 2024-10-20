const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
     title: { type: String, required: true },
     author: { type: String, required: true },
     description: { type: String, required: true, },
     images: { type: [String], },
     available: { type: Boolean, default: true },
     borrowed: { type: Boolean, default: false, },
     returned: { type: Boolean, default: false, },
     genre: { type: [String], required: true },
     publishedDate: { type: Date, },
     createdAt: { type: Date, default: Date.now },
     updatedAt: { type: Date, default: Date.now }
});

bookSchema.pre('save', function (next) {
     this.updatedAt = new Date();
     next();
});

module.exports = mongoose.model('Book', bookSchema);
