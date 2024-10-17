// src/components/BookDetail.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookDetail = () => {
     const { id } = useParams();
     const [book, setBook] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const navigate = useNavigate();

     useEffect(() => {
          const fetchBook = async () => {
               try {
                    const response = await axios.get(`http://localhost:8080/api/library/books/${id}`);
                    setBook(response.data.data);
               } catch (error) {
                    console.error('Error fetching book details:', error);
                    setError('Book not found or an error occurred while fetching the book details.');
               } finally {
                    setLoading(false);
               }
          };
          fetchBook();
     }, [id]);

     const borrowBook = async () => {
          try {
               const token = localStorage.getItem('token');
               if (!token) {
                    toast.error('Please log in first');
                    navigate('/login');
                    return;
               }

               // Send the request with the token in the headers
               await axios.post(`http://localhost:8080/api/library/borrow/${id}`, {}, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               });

               alert('Book borrowed successfully!');
               navigate('/books'); // Redirect back to the book list
          } catch (error) {
               console.error('Error borrowing book:', error);
               alert('Could not borrow the book. Please try again.');
          }
     };


     if (loading) {
          return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
     }

     if (error) {
          return <div className="text-center mt-4 alert alert-danger">{ error }</div>;
     }

     return (
          <div className="container mt-4">
               <h2 className="mb-3">{ book.title }</h2>
               <p><strong>Author:</strong> { book.author }</p>
               <p><strong>Genre:</strong> { book.genre }</p>
               <button
                    onClick={ borrowBook }
                    className={ `btn ${book.available ? 'btn-success' : 'btn-secondary'}` }
                    disabled={ !book.available }
               >
                    { book.available ? 'Borrow Book' : 'Not Available' }
               </button>
          </div>
     );
};

export default BookDetail;
