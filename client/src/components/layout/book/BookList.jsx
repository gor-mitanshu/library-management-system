// src/components/BookList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
     const [books, setBooks] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchBooks = async () => {
               try {
                    const response = await axios.get('http://localhost:8080/api/library/books');
                    setBooks(response.data.data);
               } catch (error) {
                    console.error('Error fetching books:', error);
               } finally {
                    setLoading(false);
               }
          };
          fetchBooks();
     }, []);

     if (loading) {
          return <div className="text-center">Loading...</div>;
     }

     return (
          <div className="container mt-4">
               <h2>Available Books</h2>
               <ul className="list-group">
                    { books.map((book) => (
                         <li className="list-group-item" key={ book._id }>
                              <Link to={ `/books/${book._id}` } className="text-decoration-none">
                                   { book.title } by { book.author }
                              </Link>
                         </li>
                    )) }
               </ul>
          </div>
     );
};

export default BookList;