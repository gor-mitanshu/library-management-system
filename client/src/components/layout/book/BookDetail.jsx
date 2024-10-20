import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Card, Button, Container } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

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

               // Confirm borrow with SweetAlert
               Swal.fire({
                    title: 'Are you sure?',
                    text: `Do you want to borrow "${book.title}"?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, borrow it!',
                    cancelButtonText: 'No, cancel',
               }).then(async (result) => {
                    if (result.isConfirmed) {
                         // Send the request with the token in the headers
                         await axios.post(`http://localhost:8080/api/library/borrow/${id}`, {}, {
                              headers: {
                                   Authorization: `Bearer ${token}`,
                              },
                         });

                         Swal.fire('Success!', 'The book has been borrowed.', 'success');
                         toast.success(`You borrowed "${book.title}" successfully!`);
                         navigate('/books'); // Redirect back to the book list
                    }
               });
          } catch (error) {
               console.error('Error borrowing book:', error);
               toast.error('Could not borrow the book. Please try again.');
          }
     };

     if (loading) {
          return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
     }

     if (error) {
          return <div className="text-center mt-4 alert alert-danger">{ error }</div>;
     }

     return (
          <Container className="mt-4">
               <Card>
                    <Card.Img variant="top" src={ book.imageUrl } alt={ book.title } />
                    <Card.Body>
                         <Card.Title>{ book.title }</Card.Title>
                         <Card.Text><strong>Author:</strong> { book.author }</Card.Text>
                         <Card.Text><strong>Genre:</strong> { book.genre }</Card.Text>
                         <Button
                              onClick={ borrowBook }
                              className={ `btn ${book.available ? 'btn-success' : 'btn-secondary'}` }
                              disabled={ !book.available }
                         >
                              { book.available ? 'Borrow Book' : 'Not Available' }
                         </Button>
                    </Card.Body>
               </Card>
          </Container>
     );
};

export default BookDetail;