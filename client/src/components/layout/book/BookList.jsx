import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container, } from 'react-bootstrap';
import './BookList.css';
import AdminListBooks from './AdminListBooks';
import ListBooks from './ListBooks';

const BookList = () => {
     const [books, setBooks] = useState([]);
     const [loading, setLoading] = useState(true);
     const [isAdmin, setIsAdmin] = useState(false);

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
     useEffect(() => {

          const checkAdminRole = () => {
               const token = localStorage.getItem('token');
               if (token) {
                    const payload = token.split('.')[1];
                    const decodedPayload = JSON.parse(atob(payload));
                    // Check if the user is an admin
                    setIsAdmin(decodedPayload.user.role === 'admin');
               }
          };

          fetchBooks();
          checkAdminRole();
     }, []);

     if (loading) {
          return <div className="text-center">Loading...</div>;
     }
     return (
          <Container className="mt-4">
               {/* Show the Add Book button if the user is an admin */ }
               { isAdmin && (
                    <div className="text-end mb-3">
                         <Link to="/books/add">
                              <Button variant="success">Add Book</Button>
                         </Link>
                    </div>
               ) }
               {
                    isAdmin ? <AdminListBooks books={ books } fetchBooks={ fetchBooks } /> :
                         <ListBooks books={ books } />
               }
          </Container>
     );
};

export default BookList;