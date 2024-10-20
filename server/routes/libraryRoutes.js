const express = require('express');
const router = express.Router();
const Book = require('../models/BookSchema');
const Users = require('../models/UserSchema');
const authMiddleware = require('../middleware/authMiddleware');

// Add Book (Protected)
router.post('/addbook', authMiddleware, async (req, res) => {
     try {
          const newBook = new Book({
               ...req.body,
               createdAt: new Date(),
               updatedAt: new Date(),
          });
          await newBook.save();
          res.status(200).send({ success: true, message: 'Book added successfully', book: newBook });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error adding book', error });
     }
});

// Update Book (Protected)
router.put('/updatebook/:id', authMiddleware, async (req, res) => {
     try {
          const book = await Book.findByIdAndUpdate(
               req.params.id,
               { ...req.body, updatedAt: new Date() },
               { new: true }
          );
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

// View a Single Book by ID
router.get('/books/:id', async (req, res) => {
     try {
          const book = await Book.findById(req.params.id);
          if (!book) {
               return res.status(404).send({ success: false, message: 'Book not found' });
          }
          res.status(200).send({ success: true, message: 'Book retrieved successfully', data: book });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error retrieving book', error });
     }
});

// Borrow Book (Protected)
router.post('/borrow/:id', authMiddleware, async (req, res) => {
     try {
          const book = await Book.findById(req.params.id);
          if (!book || !book.available) {
               return res.status(404).send({ success: false, message: 'Book not available' });
          }

          // Update the book's status
          book.available = false;  // Set available to false
          book.borrowed = true;    // Set borrowed to true
          book.returned = false;   // Set returned to false
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
               return res.status(404).send({ success: false, message: 'Book not borrowed or not found' });
          }

          // Update the book's status
          book.available = true;  // Set available to true
          book.borrowed = false;  // Set borrowed to false
          book.returned = true;   // Set returned to true
          await book.save();

          res.status(200).send({ success: true, message: 'Book returned successfully', book });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error returning book', error });
     }
});

// List All Borrowed Books (Protected)
router.get('/borrowed-books', authMiddleware, async (req, res) => {
     try {
          const borrowedBooks = await Book.find({ borrowed: true });
          if (borrowedBooks.length === 0) {
               return res.status(404).send({ success: false, message: 'No borrowed books found' });
          }
          res.status(200).send({ success: true, message: 'Borrowed books retrieved successfully', data: borrowedBooks });
     } catch (error) {
          res.status(500).send({ success: false, message: 'Error retrieving borrowed books', error });
     }
});

// Stats
router.get('/stats', async (req, res) => {
     try {
          const totalBooks = await Book.countDocuments();
          const totalBorrowed = await Book.countDocuments({ borrowed: true });
          const totalReturned = await Book.countDocuments({ available: true });
          const totalUsers = await Users.countDocuments({ role: 'user' });
          const availableBooks = totalBooks - totalBorrowed;

          res.json({
               totalBooks,
               totalBorrowed,
               totalReturned,
               availableBooks,
               totalUsers
          });
     } catch (error) {
          console.error('Error fetching stats:', error);
          res.status(500).json({ message: 'Internal server error' });
     }
});

module.exports = router;