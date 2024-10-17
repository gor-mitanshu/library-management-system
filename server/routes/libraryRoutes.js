const express = require('express');
const router = express.Router();
const { Book } = require('../models/BookSchema');
const authMiddleware = require('../middleware/authMiddleware');

// Add Book (Protected)
router.post('/addbook', authMiddleware, async (req, res) => {
     try {
          const newBook = new Book(req.body);
          await newBook.save();
          res.status(200).send({ success: true, message: 'Book added successfully', book: newBook });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error adding book', error });
     }
});

// Update Book (Protected)
router.put('/updatebook/:id', authMiddleware, async (req, res) => {
     try {
          const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!book) {
               return res.status(404).send({ success: false, message: 'Book not found' });
          }
          res.status(200).send({ success: true, message: 'Book updated successfully', book });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error updating book', error });
     }
});

// Delete Book (Protected)
router.delete('/deletebook/:id', authMiddleware, async (req, res) => {
     try {
          const book = await Book.findByIdAndDelete(req.params.id);
          if (!book) {
               return res.status(404).send({ success: false, message: 'Book not found' });
          }
          res.status(200).send({ success: true, message: 'Book deleted successfully' });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error deleting book', error });
     }
});

// View All Books
router.get('/books', async (req, res) => {
     try {
          const books = await Book.find();
          res.status(200).send({ success: true, message: 'Books retrieved successfully', data: books });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error retrieving books', error });
     }
});

// Borrow Book (Protected)
router.post('/borrow/:id', authMiddleware, async (req, res) => {
     try {
          const book = await Book.findById(req.params.id);
          if (!book || !book.available) {
               return res.status(404).send({ success: false, message: 'Book not available' });
          }

          book.available = false;
          await book.save();
          res.status(200).send({ success: true, message: 'Book borrowed successfully', book });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error borrowing book', error });
     }
});

// Return Book (Protected)
router.post('/return/:id', authMiddleware, async (req, res) => {
     try {
          const book = await Book.findById(req.params.id);
          if (!book || book.available) {
               return res.status(404).send({ success: false, message: 'Book not borrowed' });
          }

          book.available = true;
          await book.save();
          res.status(200).send({ success: true, message: 'Book returned successfully', book });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error returning book', error });
     }
});

module.exports = router;