// src/components/BorrowedBooks.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BorrowedBooks = () => {
     const [borrowedBooks, setBorrowedBooks] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
          const fetchBorrowedBooks = async () => {
               try {
                    const response = await axios.get('http://localhost:8080/api/library/borrowed');
                    setBorrowedBooks(response.data.data);
               } catch (error) {
                    console.error('Error fetching borrowed books:', error);
                    setError('An error occurred while fetching borrowed books.');
               } finally {
                    setLoading(false);
               }
          };
          fetchBorrowedBooks();
     }, []);

     if (loading) {
          return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
     }

     if (error) {
          return <div className="text-center mt-4 alert alert-danger">{ error }</div>;
     }

     return (
          <div className="container mt-4">
               <h2>Your Borrowed Books</h2>
               { borrowedBooks.length > 0 ? (
                    <ul className="list-group mt-3">
                         { borrowedBooks.map((book) => (
                              <li key={ book._id } className="list-group-item">
                                   { book.title } by { book.author }
                              </li>
                         )) }
                    </ul>
               ) : (
                    <div className="mt-3 alert alert-info">No borrowed books found.</div>
               ) }
          </div>
     );
};

export default BorrowedBooks;
